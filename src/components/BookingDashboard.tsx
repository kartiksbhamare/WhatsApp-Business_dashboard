'use client';

import React from 'react';
import { useBookings } from '@/hooks/useBookings';
import { BookingCard } from './BookingCard';
import { BookingStats } from './BookingStats';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { Calendar, RefreshCw } from 'lucide-react';

export const BookingDashboard: React.FC = () => {
  const { bookings, loading, error } = useBookings();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading bookings..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Booking Dashboard</h1>
                <p className="text-gray-600">Real-time booking management system</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <RefreshCw className="w-4 h-4" />
              <span>Live updates enabled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <BookingStats bookings={bookings} />

        {/* Bookings Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Bookings ({bookings.length})
            </h2>
            {bookings.length > 0 && (
              <div className="text-sm text-gray-500">
                Most recent first
              </div>
            )}
          </div>

          {bookings.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-gray-100 p-4 rounded-full">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                  <p className="text-gray-500">
                    Bookings from your WhatsApp bot will appear here in real-time.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center text-sm text-gray-500">
            <span>Connected to Firebase • Real-time updates active</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 