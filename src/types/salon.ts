export interface Salon {
  id: string;
  name: string;
  owner_name: string;
  phone: string;
  email?: string;
  address?: string;
  whatsapp_connected: boolean;
  qr_code_url?: string;
  connection_date?: string;
  last_active?: string;
  created_at: string;
  updated_at?: string;
}

export interface SalonConnection {
  salon_id: string;
  whatsapp_instance_id: string;
  qr_code: string;
  status: 'pending' | 'connected' | 'disconnected' | 'expired';
  connected_at?: string;
  expires_at?: string;
  last_heartbeat?: string;
}

export interface QRCodeSession {
  salon_id: string;
  session_id: string;
  qr_code: string;
  status: 'active' | 'scanned' | 'connected' | 'expired';
  created_at: string;
  expires_at: string;
} 