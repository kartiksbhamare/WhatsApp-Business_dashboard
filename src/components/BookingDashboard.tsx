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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Animated Particle System */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Particles - Layer 1 (Small dots) */}
        <div className="absolute top-[10%] left-[15%] w-1 h-1 bg-purple-500/60 rounded-full animate-particle-drift-1"></div>
        <div className="absolute top-[25%] left-[80%] w-1.5 h-1.5 bg-blue-500/50 rounded-full animate-particle-drift-2"></div>
        <div className="absolute top-[40%] left-[20%] w-1 h-1 bg-pink-500/55 rounded-full animate-particle-drift-3"></div>
        <div className="absolute top-[60%] left-[70%] w-2 h-2 bg-cyan-500/45 rounded-full animate-particle-drift-4"></div>
        <div className="absolute top-[75%] left-[30%] w-1 h-1 bg-indigo-500/60 rounded-full animate-particle-drift-5"></div>
        <div className="absolute top-[15%] left-[60%] w-1.5 h-1.5 bg-violet-500/50 rounded-full animate-particle-drift-6"></div>
        
        {/* Floating Particles - Layer 2 (Medium dots) */}
        <div className="absolute top-[30%] left-[10%] w-2 h-2 bg-purple-600/40 rounded-full animate-particle-float-up-1"></div>
        <div className="absolute top-[50%] left-[85%] w-1.5 h-1.5 bg-blue-600/45 rounded-full animate-particle-float-up-2"></div>
        <div className="absolute top-[70%] left-[15%] w-2.5 h-2.5 bg-pink-600/35 rounded-full animate-particle-float-up-3"></div>
        <div className="absolute top-[20%] left-[40%] w-1 h-1 bg-cyan-600/50 rounded-full animate-particle-float-up-4"></div>
        <div className="absolute top-[80%] left-[75%] w-2 h-2 bg-indigo-600/40 rounded-full animate-particle-float-up-5"></div>
        
        {/* Sparkle Particles */}
        <div className="absolute top-[35%] left-[25%] w-1 h-1 bg-yellow-500/70 rounded-full animate-sparkle-1"></div>
        <div className="absolute top-[45%] left-[65%] w-1 h-1 bg-yellow-400/60 rounded-full animate-sparkle-2"></div>
        <div className="absolute top-[65%] left-[45%] w-1 h-1 bg-amber-500/65 rounded-full animate-sparkle-3"></div>
        <div className="absolute top-[55%] left-[90%] w-1 h-1 bg-yellow-600/55 rounded-full animate-sparkle-4"></div>
        
        {/* Drifting Particles - Layer 3 (Slow movers) */}
        <div className="absolute top-[5%] left-[50%] w-3 h-3 bg-slate-500/25 rounded-full animate-drift-slow-1"></div>
        <div className="absolute top-[85%] left-[20%] w-2 h-2 bg-gray-500/30 rounded-full animate-drift-slow-2"></div>
        <div className="absolute top-[45%] left-[5%] w-2.5 h-2.5 bg-slate-600/28 rounded-full animate-drift-slow-3"></div>
        <div className="absolute top-[25%] left-[95%] w-2 h-2 bg-gray-600/25 rounded-full animate-drift-slow-4"></div>
        
        {/* Bubble Particles */}
        <div className="absolute top-[90%] left-[35%] w-4 h-4 bg-blue-400/20 rounded-full animate-bubble-rise-1"></div>
        <div className="absolute top-[95%] left-[70%] w-3 h-3 bg-cyan-400/25 rounded-full animate-bubble-rise-2"></div>
        <div className="absolute top-[88%] left-[55%] w-5 h-5 bg-teal-400/18 rounded-full animate-bubble-rise-3"></div>
        
        {/* Dark Trendy Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/3 via-transparent to-gray-900/3 animate-mesh-shift"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-900/2 via-transparent to-blue-900/2 animate-mesh-shift-reverse"></div>
      </div>

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 animate-slideDown">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4 animate-fadeInLeft flex-1 min-w-0">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 sm:p-3 rounded-xl shadow-sm hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <Calendar className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">📅 Real-Time Booking Manager</h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 hidden sm:block">Track appointments as they happen — live from WhatsApp.</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 animate-fadeInRight flex-shrink-0">
              {selectedBarber && (
                <div className="hidden sm:flex items-center space-x-2 bg-purple-50 px-2 sm:px-3 py-1 sm:py-2 rounded-full border border-purple-200 animate-bounceIn">
                  <Filter className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                  <span className="text-xs sm:text-sm font-medium text-purple-700 truncate max-w-20">
                    {selectedBarber}
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-1 sm:space-x-2 bg-green-50 px-2 sm:px-3 py-1 sm:py-2 rounded-full border border-green-200 hover:bg-green-100 transition-colors duration-300">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                <span className="text-xs sm:text-sm font-medium text-green-700 hidden sm:inline">Live Updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with top padding to account for fixed header */}
      <div className="pt-20 sm:pt-32 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Live Mode Banner */}
        <div className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-sm border border-green-200/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 animate-fadeInUp hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 font-semibold text-sm sm:text-base">Live Mode Enabled</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-green-300"></div>
            <p className="text-green-600 text-xs sm:text-sm">
              This dashboard updates instantly as customers book through WhatsApp. No refresh needed. Blazing fast.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <BookingStats bookings={filteredBookings} />
        </div>

        {/* Main Layout - Mobile: Stack, Desktop: Side by side */}
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-4 sm:gap-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          {/* Barber Filter - Mobile: Top, Desktop: Right sidebar */}
          <div className="lg:order-2 lg:col-span-1 animate-fadeInRight" style={{ animationDelay: '0.3s' }}>
            <BarberFilter
              bookings={bookings}
              selectedBarber={selectedBarber}
              onBarberSelect={setSelectedBarber}
            />
          </div>

          {/* Bookings Section - Mobile: Bottom, Desktop: Left main area */}
          <div className="lg:order-1 lg:col-span-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-sm border border-gray-200/50 p-4 sm:p-6 hover:shadow-lg hover:bg-white/95 transition-all duration-500">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
                <div className="animate-fadeInLeft">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                    {selectedBarber ? `${selectedBarber}'s Appointments` : 'All Appointments'}
                  </h2>
                  <p className="text-gray-500 mt-1 text-sm sm:text-base">
                    {filteredBookings.length} {filteredBookings.length === 1 ? 'appointment' : 'appointments'} 
                    {selectedBarber ? ` for ${selectedBarber}` : ' total'}
                  </p>
                  <p className="text-xs text-gray-400 sm:hidden">Focus: Phone, Barber, Time</p>
                </div>
                {filteredBookings.length > 0 && (
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 bg-gray-50/80 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg animate-fadeInRight hover:bg-gray-100/80 transition-colors duration-300 self-start sm:self-auto">
                    <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Most recent first</span>
                  </div>
                )}
              </div>

              {filteredBookings.length === 0 ? (
                <div className="text-center py-12 sm:py-16 animate-fadeIn">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 sm:p-6 rounded-xl sm:rounded-2xl animate-float">
                      <Calendar className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                        {selectedBarber ? `No appointments for ${selectedBarber}` : 'No bookings yet'}
                      </h3>
                      <p className="text-gray-500 max-w-md text-sm sm:text-base px-4 sm:px-0">
                        {selectedBarber 
                          ? `${selectedBarber} doesn't have any appointments yet.`
                          : 'Bookings from your WhatsApp bot will appear here automatically in real-time.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6">
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
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-6 sm:mt-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center space-x-2 hover:text-green-600 transition-colors duration-300">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Connected to Firebase</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <span className="hover:text-blue-600 transition-colors duration-300">Real-time updates active</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 