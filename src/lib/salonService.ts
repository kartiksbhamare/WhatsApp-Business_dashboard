import { collection, doc, getDoc, setDoc, updateDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { Salon, SalonConnection, QRCodeSession } from '@/types/salon';

export class SalonService {
  private static COLLECTIONS = {
    SALONS: 'salons',
    CONNECTIONS: 'salon_connections',
    QR_SESSIONS: 'qr_sessions'
  };

  // Register a new salon
  static async registerSalon(salonData: Omit<Salon, 'id' | 'created_at' | 'whatsapp_connected'>): Promise<string> {
    const salonId = doc(collection(db, this.COLLECTIONS.SALONS)).id;
    
    const salon: Salon = {
      id: salonId,
      ...salonData,
      whatsapp_connected: false,
      created_at: new Date().toISOString()
    };

    await setDoc(doc(db, this.COLLECTIONS.SALONS, salonId), salon);
    return salonId;
  }

  // Get salon by ID
  static async getSalon(salonId: string): Promise<Salon | null> {
    const salonDoc = await getDoc(doc(db, this.COLLECTIONS.SALONS, salonId));
    return salonDoc.exists() ? salonDoc.data() as Salon : null;
  }

  // Get all salons
  static async getAllSalons(): Promise<Salon[]> {
    const salonsQuery = query(collection(db, this.COLLECTIONS.SALONS));
    const snapshot = await getDocs(salonsQuery);
    return snapshot.docs.map(doc => doc.data() as Salon);
  }

  // Check if salon is connected
  static async isSalonConnected(salonId: string): Promise<boolean> {
    const salon = await this.getSalon(salonId);
    if (!salon) return false;

    // Check if connection is still active
    const connectionQuery = query(
      collection(db, this.COLLECTIONS.CONNECTIONS),
      where('salon_id', '==', salonId),
      where('status', '==', 'connected')
    );
    
    const connectionDocs = await getDocs(connectionQuery);
    return connectionDocs.size > 0;
  }

  // Generate QR code for salon (only if not connected)
  static async generateQRCode(salonId: string): Promise<string | null> {
    // Check if already connected
    const isConnected = await this.isSalonConnected(salonId);
    if (isConnected) {
      console.log(`Salon ${salonId} is already connected. Skipping QR generation.`);
      return null;
    }

    // Check if there's an active QR session
    const activeSessionQuery = query(
      collection(db, this.COLLECTIONS.QR_SESSIONS),
      where('salon_id', '==', salonId),
      where('status', 'in', ['active', 'scanned'])
    );
    
    const activeSessions = await getDocs(activeSessionQuery);
    if (activeSessions.size > 0) {
      const activeSession = activeSessions.docs[0].data() as QRCodeSession;
      console.log(`Active QR session exists for salon ${salonId}`);
      return activeSession.qr_code;
    }

    // Generate new QR code
    const sessionId = doc(collection(db, this.COLLECTIONS.QR_SESSIONS)).id;
    const qrCode = await this.generateWhatsAppQR(salonId, sessionId);
    
    const qrSession: QRCodeSession = {
      salon_id: salonId,
      session_id: sessionId,
      qr_code: qrCode,
      status: 'active',
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutes
    };

    await setDoc(doc(db, this.COLLECTIONS.QR_SESSIONS, sessionId), qrSession);
    
    // Update salon with QR code URL
    await updateDoc(doc(db, this.COLLECTIONS.SALONS, salonId), {
      qr_code_url: qrCode,
      updated_at: new Date().toISOString()
    });

    return qrCode;
  }

  // Mark salon as connected
  static async markSalonConnected(salonId: string, whatsappInstanceId: string): Promise<void> {
    const connectionId = doc(collection(db, this.COLLECTIONS.CONNECTIONS)).id;
    
    const connection: SalonConnection = {
      salon_id: salonId,
      whatsapp_instance_id: whatsappInstanceId,
      qr_code: '',
      status: 'connected',
      connected_at: new Date().toISOString(),
      last_heartbeat: new Date().toISOString()
    };

    await setDoc(doc(db, this.COLLECTIONS.CONNECTIONS, connectionId), connection);
    
    // Update salon status
    await updateDoc(doc(db, this.COLLECTIONS.SALONS, salonId), {
      whatsapp_connected: true,
      connection_date: new Date().toISOString(),
      last_active: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    // Expire any active QR sessions
    const activeSessionQuery = query(
      collection(db, this.COLLECTIONS.QR_SESSIONS),
      where('salon_id', '==', salonId),
      where('status', 'in', ['active', 'scanned'])
    );
    
    const activeSessions = await getDocs(activeSessionQuery);
    for (const sessionDoc of activeSessions.docs) {
      await updateDoc(sessionDoc.ref, {
        status: 'connected'
      });
    }
  }

  // Disconnect salon
  static async disconnectSalon(salonId: string): Promise<void> {
    // Update connections
    const connectionQuery = query(
      collection(db, this.COLLECTIONS.CONNECTIONS),
      where('salon_id', '==', salonId),
      where('status', '==', 'connected')
    );
    
    const connections = await getDocs(connectionQuery);
    for (const connectionDoc of connections.docs) {
      await updateDoc(connectionDoc.ref, {
        status: 'disconnected'
      });
    }

    // Update salon
    await updateDoc(doc(db, this.COLLECTIONS.SALONS, salonId), {
      whatsapp_connected: false,
      updated_at: new Date().toISOString()
    });
  }

  // Get connected salons
  static async getConnectedSalons(): Promise<Salon[]> {
    const connectedSalonsQuery = query(
      collection(db, this.COLLECTIONS.SALONS),
      where('whatsapp_connected', '==', true)
    );
    
    const snapshot = await getDocs(connectedSalonsQuery);
    return snapshot.docs.map(doc => doc.data() as Salon);
  }

  // Get disconnected salons
  static async getDisconnectedSalons(): Promise<Salon[]> {
    const disconnectedSalonsQuery = query(
      collection(db, this.COLLECTIONS.SALONS),
      where('whatsapp_connected', '==', false)
    );
    
    const snapshot = await getDocs(disconnectedSalonsQuery);
    return snapshot.docs.map(doc => doc.data() as Salon);
  }

  // Update salon heartbeat
  static async updateHeartbeat(salonId: string): Promise<void> {
    const connectionQuery = query(
      collection(db, this.COLLECTIONS.CONNECTIONS),
      where('salon_id', '==', salonId),
      where('status', '==', 'connected')
    );
    
    const connections = await getDocs(connectionQuery);
    for (const connectionDoc of connections.docs) {
      await updateDoc(connectionDoc.ref, {
        last_heartbeat: new Date().toISOString()
      });
    }

    await updateDoc(doc(db, this.COLLECTIONS.SALONS, salonId), {
      last_active: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }

  // Clean up expired QR sessions
  static async cleanupExpiredSessions(): Promise<void> {
    const now = new Date().toISOString();
    const expiredSessionsQuery = query(
      collection(db, this.COLLECTIONS.QR_SESSIONS),
      where('expires_at', '<', now),
      where('status', 'in', ['active', 'scanned'])
    );
    
    const expiredSessions = await getDocs(expiredSessionsQuery);
    for (const sessionDoc of expiredSessions.docs) {
      await updateDoc(sessionDoc.ref, {
        status: 'expired'
      });
    }
  }

  // Generate WhatsApp QR code (placeholder - implement with your WhatsApp API)
  private static async generateWhatsAppQR(salonId: string, sessionId: string): Promise<string> {
    // This is a placeholder. Replace with actual WhatsApp Business API integration
    // For now, returning a mock QR code data
    const qrData = `whatsapp://connect?salon=${salonId}&session=${sessionId}&timestamp=${Date.now()}`;
    
    // You would typically generate an actual QR code image here
    // For example, using a QR code library or service
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="white"/>
        <text x="100" y="100" text-anchor="middle" font-family="Arial" font-size="12" fill="black">
          QR Code for Salon ${salonId}
        </text>
        <text x="100" y="120" text-anchor="middle" font-family="Arial" font-size="8" fill="gray">
          ${qrData}
        </text>
      </svg>
    `)}`;
  }
} 