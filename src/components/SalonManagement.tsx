'use client';

import React, { useState, useEffect } from 'react';
import { QrCode, Wifi, WifiOff, Users, Plus, Settings, Check, Clock } from 'lucide-react';
import { SalonService } from '@/lib/salonService';
import { Salon } from '@/types/salon';

export default function SalonManagement() {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedSalon, setSelectedSalon] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [generatingQR, setGeneratingQR] = useState(false);

  const [newSalon, setNewSalon] = useState({
    name: '',
    owner_name: '',
    phone: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    loadSalons();
    // Set up periodic cleanup of expired sessions
    const cleanup = setInterval(() => {
      SalonService.cleanupExpiredSessions();
    }, 60000); // Every minute

    return () => clearInterval(cleanup);
  }, []);

  const loadSalons = async () => {
    try {
      const allSalons = await SalonService.getAllSalons();
      setSalons(allSalons);
    } catch (error) {
      console.error('Error loading salons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSalon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await SalonService.registerSalon(newSalon);
      setNewSalon({ name: '', owner_name: '', phone: '', email: '', address: '' });
      setShowAddForm(false);
      loadSalons();
    } catch (error) {
      console.error('Error adding salon:', error);
    }
  };

  const handleGenerateQR = async (salonId: string) => {
    setGeneratingQR(true);
    setSelectedSalon(salonId);
    try {
      const qrCodeData = await SalonService.generateQRCode(salonId);
      if (qrCodeData) {
        setQrCode(qrCodeData);
      } else {
        alert('Salon is already connected or has an active QR session');
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setGeneratingQR(false);
    }
  };

  const handleMarkConnected = async (salonId: string) => {
    try {
      // In a real implementation, you'd get the WhatsApp instance ID from the connection
      const whatsappInstanceId = `wa_instance_${Date.now()}`;
      await SalonService.markSalonConnected(salonId, whatsappInstanceId);
      setQrCode(null);
      setSelectedSalon(null);
      loadSalons();
      alert('Salon marked as connected!');
    } catch (error) {
      console.error('Error marking salon as connected:', error);
    }
  };

  const handleDisconnect = async (salonId: string) => {
    try {
      await SalonService.disconnectSalon(salonId);
      loadSalons();
      alert('Salon disconnected');
    } catch (error) {
      console.error('Error disconnecting salon:', error);
    }
  };

  const getStatusColor = (connected: boolean) => {
    return connected ? 'text-green-600' : 'text-gray-500';
  };

  const getStatusIcon = (connected: boolean) => {
    return connected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Salon Management</h1>
          <p className="text-gray-600 mt-1">Manage salon WhatsApp connections</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Salon
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Total Salons</h3>
              <p className="text-2xl font-bold text-blue-600">{salons.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Wifi className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Connected</h3>
              <p className="text-2xl font-bold text-green-600">
                {salons.filter(s => s.whatsapp_connected).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <WifiOff className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Pending</h3>
              <p className="text-2xl font-bold text-gray-600">
                {salons.filter(s => !s.whatsapp_connected).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Salon Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Salon</h2>
            <form onSubmit={handleAddSalon} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salon Name *
                </label>
                <input
                  type="text"
                  required
                  value={newSalon.name}
                  onChange={(e) => setNewSalon({ ...newSalon, name: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Owner Name *
                </label>
                <input
                  type="text"
                  required
                  value={newSalon.owner_name}
                  onChange={(e) => setNewSalon({ ...newSalon, owner_name: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={newSalon.phone}
                  onChange={(e) => setNewSalon({ ...newSalon, phone: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newSalon.email}
                  onChange={(e) => setNewSalon({ ...newSalon, email: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  value={newSalon.address}
                  onChange={(e) => setNewSalon({ ...newSalon, address: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Salon
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {qrCode && selectedSalon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-center">
            <h2 className="text-xl font-bold mb-4">WhatsApp QR Code</h2>
            <div className="mb-4">
              <img src={qrCode} alt="WhatsApp QR Code" className="mx-auto border rounded-lg" />
            </div>
            <p className="text-gray-600 mb-4">
              Scan this QR code with WhatsApp to connect the salon
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleMarkConnected(selectedSalon)}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Mark as Connected
              </button>
              <button
                onClick={() => { setQrCode(null); setSelectedSalon(null); }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Salons List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">All Salons</h2>
        </div>
        
        <div className="divide-y">
          {salons.map((salon) => (
            <div key={salon.id} className="p-4 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-800">{salon.name}</h3>
                  <div className={`flex items-center gap-1 ${getStatusColor(salon.whatsapp_connected)}`}>
                    {getStatusIcon(salon.whatsapp_connected)}
                    <span className="text-sm font-medium">
                      {salon.whatsapp_connected ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Owner:</strong> {salon.owner_name}</p>
                  <p><strong>Phone:</strong> {salon.phone}</p>
                  {salon.email && <p><strong>Email:</strong> {salon.email}</p>}
                  {salon.connection_date && (
                    <p><strong>Connected:</strong> {new Date(salon.connection_date).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {!salon.whatsapp_connected ? (
                  <button
                    onClick={() => handleGenerateQR(salon.id)}
                    disabled={generatingQR && selectedSalon === salon.id}
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {generatingQR && selectedSalon === salon.id ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <QrCode className="w-4 h-4" />
                        Generate QR
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => handleDisconnect(salon.id)}
                    className="bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <WifiOff className="w-4 h-4" />
                    Disconnect
                  </button>
                )}
              </div>
            </div>
          ))}
          
          {salons.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No salons registered yet</p>
              <p className="text-sm">Click "Add Salon" to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 