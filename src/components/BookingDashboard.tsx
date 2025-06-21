'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookings } from '@/hooks/useBookings';
import { BookingCard } from './BookingCard';
import { BookingStats } from './BookingStats';
import { BarberFilter } from './BarberFilter';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { Calendar, RefreshCw, Zap, Filter } from 'lucide-react';

// Advanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
};

const headerVariants = {
  hidden: { 
    y: -100, 
    opacity: 0,
    scale: 0.8
  },
  visible: { 
    y: 0, 
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      duration: 0.8
    }
  }
};

const bannerVariants = {
  hidden: { 
    x: -100, 
    opacity: 0,
    rotateX: -90
  },
  visible: { 
    x: 0, 
    opacity: 1,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 12,
      delay: 0.3
    }
  }
};

const statsVariants = {
  hidden: { 
    y: 50, 
    opacity: 0,
    scale: 0.9
  },
  visible: { 
    y: 0, 
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      delay: 0.5
    }
  }
};

const mainContentVariants = {
  hidden: { 
    opacity: 0,
    y: 100
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 20,
      delay: 0.7,
      staggerChildren: 0.1
    }
  }
};

const filterVariants = {
  hidden: { 
    x: 100, 
    opacity: 0,
    rotateY: 90
  },
  visible: { 
    x: 0, 
    opacity: 1,
    rotateY: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      delay: 0.9
    }
  }
};

const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, 2, -2, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

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
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.5, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <LoadingSpinner size="lg" text="Loading bookings..." />
        </motion.div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4"
      >
        <ErrorMessage message={error} />
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
    >
      {/* Fixed Header */}
      <motion.div 
        variants={headerVariants}
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div 
                variants={floatingVariants}
                animate="animate"
                className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-sm"
              >
                <Calendar className="w-7 h-7 text-white" />
              </motion.div>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              >
                <h1 className="text-3xl font-bold text-gray-900">📅 Real-Time Booking Manager</h1>
                <p className="text-gray-600 mt-1">Track appointments as they happen — live from WhatsApp.</p>
              </motion.div>
            </div>
            <div className="flex items-center space-x-4">
              <AnimatePresence>
                {selectedBarber && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 50 }}
                    className="flex items-center space-x-2 bg-purple-50 px-3 py-2 rounded-full border border-purple-200"
                  >
                    <Filter className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">
                      Filtered by: {selectedBarber}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div 
                variants={pulseVariants}
                animate="animate"
                className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-full border border-green-200"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <Zap className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">Live Updates</span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content with top padding to account for fixed header */}
      <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Live Mode Banner */}
        <motion.div 
          variants={bannerVariants}
          className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 mb-6"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="flex items-center space-x-2">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-3 h-3 bg-green-500 rounded-full"
              />
              <span className="text-green-700 font-semibold">Live Mode Enabled</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-green-300"></div>
            <p className="text-green-600 text-sm text-center">
              This dashboard updates instantly as customers book through WhatsApp. No refresh needed. Blazing fast.
            </p>
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div variants={statsVariants}>
          <BookingStats bookings={filteredBookings} />
        </motion.div>

        {/* Main Layout - Bookings + Barber Filter */}
        <motion.div 
          variants={mainContentVariants}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6"
        >
          {/* Bookings Section - Takes 4/5 of the width */}
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, type: "spring", stiffness: 80 }}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {selectedBarber ? `${selectedBarber}'s Appointments` : 'All Appointments'}
                  </h2>
                  <p className="text-gray-500 mt-1">
                    {filteredBookings.length} {filteredBookings.length === 1 ? 'appointment' : 'appointments'} 
                    {selectedBarber ? ` for ${selectedBarber}` : ' total'} • Focus: Phone, Barber, Time
                  </p>
                </motion.div>
                {filteredBookings.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, rotate: 180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 1.4, type: "spring" }}
                    className="flex items-center space-x-2 text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Most recent first</span>
                  </motion.div>
                )}
              </div>

              <AnimatePresence mode="wait">
                {filteredBookings.length === 0 ? (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center py-16"
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <motion.div 
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 0.9, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-2xl"
                      >
                        <Calendar className="w-12 h-12 text-gray-400" />
                      </motion.div>
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
                  </motion.div>
                ) : (
                  <motion.div 
                    key="bookings"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6"
                  >
                    <AnimatePresence>
                      {filteredBookings.map((booking, index) => (
                        <motion.div
                          key={booking.id}
                          initial={{ 
                            opacity: 0, 
                            y: 50,
                            scale: 0.9,
                            rotateX: -30
                          }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            scale: 1,
                            rotateX: 0
                          }}
                          exit={{ 
                            opacity: 0, 
                            y: -50,
                            scale: 0.9,
                            rotateX: 30
                          }}
                          transition={{ 
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 100,
                            damping: 15
                          }}
                          whileHover={{ 
                            scale: 1.02,
                            y: -5,
                            transition: { type: "spring", stiffness: 400 }
                          }}
                        >
                          <BookingCard booking={booking} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Barber Filter Sidebar - Takes 1/5 of the width */}
          <motion.div 
            variants={filterVariants}
            className="lg:col-span-1"
          >
            <BarberFilter
              bookings={bookings}
              selectedBarber={selectedBarber}
              onBarberSelect={setSelectedBarber}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="bg-white border-t border-gray-200 mt-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-green-500 rounded-full"
              />
              <span>Connected to Firebase</span>
            </div>
            <span>•</span>
            <span>Real-time updates active</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}; 