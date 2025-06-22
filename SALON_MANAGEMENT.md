# Salon Management System

This system handles multi-tenant WhatsApp bot connections for SalonSync, ensuring each salon gets their own QR code and connection tracking.

## Features

### 🏪 Salon Registration
- Register multiple salons with owner details
- Track salon information (name, owner, contact details)
- Manage salon connection status

### 📱 Smart QR Code Generation
- **Only generates QR codes for disconnected salons**
- Preserves existing connections during redeployment
- Automatic QR session expiry (5 minutes)
- Session cleanup and management

### 🔗 Connection Management
- Track connection status per salon
- Mark salons as connected/disconnected
- Store WhatsApp instance IDs
- Connection heartbeat monitoring

### 🚀 Smart Deployment
- Intelligent deployment script that:
  - Checks existing connections before generating QR codes
  - Only creates new QR codes for unconnected salons
  - Preserves existing connections during redeployment
  - Cleans up expired QR sessions

## Database Structure

### Collections

#### `salons`
```javascript
{
  id: string,
  name: string,
  owner_name: string,
  phone: string,
  email?: string,
  address?: string,
  whatsapp_connected: boolean,
  qr_code_url?: string,
  connection_date?: string,
  last_active?: string,
  created_at: string,
  updated_at?: string
}
```

#### `salon_connections`
```javascript
{
  salon_id: string,
  whatsapp_instance_id: string,
  qr_code: string,
  status: 'pending' | 'connected' | 'disconnected' | 'expired',
  connected_at?: string,
  expires_at?: string,
  last_heartbeat?: string
}
```

#### `qr_sessions`
```javascript
{
  salon_id: string,
  session_id: string,
  qr_code: string,
  status: 'active' | 'scanned' | 'connected' | 'expired',
  created_at: string,
  expires_at: string
}
```

## Usage

### Accessing Salon Management
Navigate to `/salon-management` to access the salon management interface.

### Adding a New Salon
1. Click "Add Salon" button
2. Fill in salon details (name, owner, phone, email, address)
3. Submit the form
4. The salon will be added with `whatsapp_connected: false`

### Connecting a Salon
1. Find the salon in the list (must be "Disconnected")
2. Click "Generate QR" button
3. A QR code will be displayed
4. Scan the QR code with WhatsApp
5. Click "Mark as Connected" once connection is established

### Smart Deployment
Run the smart deployment script to handle QR generation intelligently:

```bash
# Full smart deployment
npm run deploy:smart

# Check connection status only
npm run deploy:check
```

### API Methods

#### SalonService Methods
```javascript
// Register a new salon
await SalonService.registerSalon(salonData);

// Get salon by ID
await SalonService.getSalon(salonId);

// Check if salon is connected
await SalonService.isSalonConnected(salonId);

// Generate QR code (only if not connected)
await SalonService.generateQRCode(salonId);

// Mark salon as connected
await SalonService.markSalonConnected(salonId, whatsappInstanceId);

// Disconnect salon
await SalonService.disconnectSalon(salonId);

// Get all connected/disconnected salons
await SalonService.getConnectedSalons();
await SalonService.getDisconnectedSalons();

// Update connection heartbeat
await SalonService.updateHeartbeat(salonId);

// Clean up expired sessions
await SalonService.cleanupExpiredSessions();
```

## Key Benefits

### 🔒 Connection Preservation
- **No duplicate QR codes**: Already connected salons won't get new QR codes during redeployment
- **Persistent connections**: Existing WhatsApp connections are preserved
- **Smart detection**: System automatically detects and skips connected salons

### ⚡ Efficient Deployment
- **Faster deployments**: Only processes salons that actually need QR codes
- **Resource optimization**: Reduces unnecessary QR generation and API calls
- **Clear reporting**: Deployment script provides detailed status reports

### 📊 Comprehensive Tracking
- **Connection status**: Real-time tracking of salon connection states
- **Session management**: Automatic cleanup of expired QR sessions
- **Audit trail**: Complete history of connections and disconnections

## Integration with WhatsApp Business API

The system is designed to integrate with WhatsApp Business API providers. Replace the placeholder QR generation in `SalonService.generateWhatsAppQR()` with your actual WhatsApp API integration:

```javascript
// Example integration with WhatsApp API
private static async generateWhatsAppQR(salonId: string, sessionId: string): Promise<string> {
  const response = await fetch('YOUR_WHATSAPP_API_ENDPOINT', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${YOUR_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      salon_id: salonId,
      session_id: sessionId,
      webhook_url: `${YOUR_DOMAIN}/api/whatsapp/webhook/${salonId}`
    })
  });
  
  const data = await response.json();
  return data.qr_code_image_url;
}
```

## Security Considerations

1. **Environment Variables**: Store Firebase and WhatsApp API credentials in environment variables
2. **Access Control**: Implement proper authentication for salon management interface
3. **Rate Limiting**: Add rate limiting for QR code generation
4. **Session Expiry**: QR sessions automatically expire after 5 minutes
5. **Audit Logging**: Log all salon management actions for security auditing

## Troubleshooting

### QR Code Not Generating
- Check if salon is already connected
- Verify salon exists in database
- Check for active QR sessions
- Review Firebase permissions

### Connection Not Persisting
- Verify `markSalonConnected()` is called after successful QR scan
- Check WhatsApp instance ID is valid
- Ensure heartbeat updates are working

### Deployment Issues
- Verify Firebase credentials in environment variables
- Check database permissions
- Ensure all collections exist with proper indexes 