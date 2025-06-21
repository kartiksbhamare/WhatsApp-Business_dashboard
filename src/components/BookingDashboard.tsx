'use client';

import React, { useState, useMemo } from 'react';
import { useBookings } from '@/hooks/useBookings';
import { BookingCard } from './BookingCard';
import { BookingStats } from './BookingStats';
import { BarberFilter } from './BarberFilter';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { Calendar, RefreshCw, Zap, Filter } from 'lucide-react';

export const BookingDashboard: React.FC = () => {
  const { bookings, loading, error } = useBookings();
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);

  // Filter bookings based on selected barber
  const filteredBookings = useMemo(() => {
    if (!selectedBarber) return bookings;
    return bookings.filter(booking => booking.barber === selectedBarber);
  }, [bookings, selectedBarber]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading bookings..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200 animate-slideDown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 animate-fadeInLeft">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-sm hover:scale-105 transition-transform duration-300">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">📅 Real-Time Booking Manager</h1>
                <p className="text-gray-600 mt-1">Track appointments as they happen — live from WhatsApp.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 animate-fadeInRight">
              {selectedBarber && (
                <div className="flex items-center space-x-2 bg-purple-50 px-3 py-2 rounded-full border border-purple-200 animate-bounceIn">
                  <Filter className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">
                    Filtered by: {selectedBarber}
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-full border border-green-200 hover:bg-green-100 transition-colors duration-300">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <Zap className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">Live Updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with top padding to account for fixed header */}
      <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Live Mode Banner */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 mb-6 animate-fadeInUp hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 font-semibold">Live Mode Enabled</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-green-300"></div>
            <p className="text-green-600 text-sm text-center">
              This dashboard updates instantly as customers book through WhatsApp. No refresh needed. Blazing fast.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <BookingStats bookings={filteredBookings} />
        </div>

        {/* Main Layout - Bookings + Barber Filter */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          {/* Bookings Section - Takes 4/5 of the width */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-500">
              <div className="flex items-center justify-between mb-6">
                <div className="animate-fadeInLeft">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {selectedBarber ? `${selectedBarber}'s Appointments` : 'All Appointments'}
                  </h2>
                  <p className="text-gray-500 mt-1">
                    {filteredBookings.length} {filteredBookings.length === 1 ? 'appointment' : 'appointments'} 
                    {selectedBarber ? ` for ${selectedBarber}` : ' total'} • Focus: Phone, Barber, Time
                  </p>
                </div>
                {filteredBookings.length > 0 && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg animate-fadeInRight hover:bg-gray-100 transition-colors duration-300">
                    <RefreshCw className="w-4 h-4" />
                    <span>Most recent first</span>
                  </div>
                )}
              </div>

              {filteredBookings.length === 0 ? (
                <div className="text-center py-16 animate-fadeIn">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-2xl animate-float">
                      <Calendar className="w-12 h-12 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {selectedBarber ? `No appointments for ${selectedBarber}` : 'No bookings yet'}
                      </h3>
                      <p className="text-gray-500 max-w-md">
                        {selectedBarber 
                          ? `${selectedBarber} doesn't have any appointments yet.`
                          : 'Bookings from your WhatsApp bot will appear here automatically in real-time.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                  {filteredBookings.map((booking, index) => (
                    <div 
                      key={booking.id} 
                      className="animate-fadeInUp hover:animate-none"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <BookingCard booking={booking} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Barber Filter Sidebar - Takes 1/5 of the width */}
          <div className="lg:col-span-1 animate-fadeInRight" style={{ animationDelay: '0.3s' }}>
            <BarberFilter
              bookings={bookings}
              selectedBarber={selectedBarber}
              onBarberSelect={setSelectedBarber}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2 hover:text-green-600 transition-colors duration-300">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Connected to Firebase</span>
            </div>
            <span>•</span>
            <span className="hover:text-blue-600 transition-colors duration-300">Real-time updates active</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 