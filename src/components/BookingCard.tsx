import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  User, 
  Phone, 
  Clock
} from 'lucide-react';
import { Booking } from '@/types/booking';

interface BookingCardProps {
  booking: Booking;
}

// Animation variants for the card elements
const cardVariants = {
  initial: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      staggerChildren: 0.1
    }
  },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25
    }
  }
};

const phoneVariants = {
  initial: { x: -30, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 15,
      delay: 0.1
    }
  }
};

const iconVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: { 
    scale: 1, 
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
      delay: 0.2
    }
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: { type: "spring" as const, stiffness: 400 }
  }
};

const barberTimeVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      delay: 0.3
    }
  }
};

const serviceVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      delay: 0.4
    }
  }
};

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  // Get the phone number to display
  const displayPhone = booking.phoneNumber || booking.customerName;
  
  // Format phone number with +91- prefix if it doesn't already have it
  const formatPhoneNumber = (phone: string) => {
    if (!phone) return phone;
    // If it already starts with +91, return as is
    if (phone.startsWith('+91')) return phone;
    // If it starts with 91, add the + prefix
    if (phone.startsWith('91')) return `+${phone}`;
    // Otherwise, add +91- prefix
    return `+91-${phone}`;
  };

  return (
    <motion.div 
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all duration-200 group cursor-pointer"
    >
      {/* Main Focus: Phone, Barber, Time */}
      <div className="space-y-4">
        {/* Phone Number - Most Prominent */}
        <motion.div 
          variants={phoneVariants}
          className="bg-blue-50 border border-blue-200 rounded-xl p-4"
        >
          <div className="flex items-center space-x-3">
            <motion.div 
              variants={iconVariants}
              whileHover="hover"
              className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center"
            >
              <Phone className="w-5 h-5 text-white" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, type: "spring" as const }}
            >
              <motion.p 
                className="text-lg font-bold text-blue-900"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring" as const, stiffness: 400 }}
              >
                {formatPhoneNumber(displayPhone)}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* Barber & Time - Equal Prominence */}
        <motion.div 
          variants={barberTimeVariants}
          className="grid grid-cols-2 gap-3"
        >
          <motion.div 
            className="bg-purple-50 border border-purple-200 rounded-xl p-4"
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "#f3e8ff",
              transition: { type: "spring" as const, stiffness: 400 }
            }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <User className="w-4 h-4 text-purple-600" />
              </motion.div>
              <span className="text-xs text-purple-600 font-medium uppercase tracking-wide">Barber</span>
            </div>
            <motion.p 
              className="text-base font-bold text-purple-900 capitalize"
              whileHover={{ scale: 1.05 }}
            >
              {booking.barber}
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="bg-orange-50 border border-orange-200 rounded-xl p-4"
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "#fff7ed",
              transition: { type: "spring" as const, stiffness: 400 }
            }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Clock className="w-4 h-4 text-orange-600" />
              </motion.div>
              <span className="text-xs text-orange-600 font-medium uppercase tracking-wide">Time</span>
            </div>
            <motion.p 
              className="text-base font-bold text-orange-900"
              whileHover={{ scale: 1.05 }}
            >
              {booking.timeSlot}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Secondary Info - Service (smaller, less prominent) */}
      <motion.div 
        variants={serviceVariants}
        className="mt-4 pt-3 border-t border-gray-100"
      >
        <motion.div 
          className="flex items-center justify-between text-sm text-gray-500"
          whileHover={{ y: -2 }}
          transition={{ type: "spring" as const, stiffness: 400 }}
        >
          <motion.span 
            className="font-medium"
            whileHover={{ 
              color: "#374151", 
              scale: 1.05,
              transition: { type: "spring" as const, stiffness: 400 }
            }}
          >
            {booking.service}
          </motion.span>
          <motion.span
            whileHover={{ 
              color: "#374151",
              scale: 1.05,
              transition: { type: "spring" as const, stiffness: 400 }
            }}
          >
            {format(booking.createdAt, 'MMM dd, HH:mm')}
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}; 