import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Users, X } from 'lucide-react';
import { Booking } from '@/types/booking';

interface BarberFilterProps {
  bookings: Booking[];
  selectedBarber: string | null;
  onBarberSelect: (barber: string | null) => void;
}

// Animation variants
const containerVariants = {
  initial: { opacity: 0, x: 50, rotateY: 30 },
  animate: { 
    opacity: 1, 
    x: 0, 
    rotateY: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      staggerChildren: 0.1
    }
  }
};

const headerVariants = {
  initial: { y: -20, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 15
    }
  }
};

const buttonVariants = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    scale: 1.02,
    y: -2,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      type: "spring" as const,
      stiffness: 600,
      damping: 30
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

const countVariants = {
  initial: { scale: 0 },
  animate: { 
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
      delay: 0.3
    }
  },
  hover: {
    scale: 1.1,
    transition: { type: "spring" as const, stiffness: 400 }
  }
};

export const BarberFilter: React.FC<BarberFilterProps> = ({ 
  bookings, 
  selectedBarber, 
  onBarberSelect 
}) => {
  // Get unique barbers with their appointment counts
  const barberStats = React.useMemo(() => {
    const stats = new Map<string, number>();
    
    bookings.forEach(booking => {
      const barber = booking.barber || 'Unknown';
      stats.set(barber, (stats.get(barber) || 0) + 1);
    });
    
    return Array.from(stats.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count); // Sort by appointment count
  }, [bookings]);

  const totalAppointments = bookings.length;

  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 h-fit sticky top-4"
    >
      <motion.div 
        variants={headerVariants}
        className="mb-4"
      >
        <div className="flex items-center space-x-2 mb-2">
          <motion.div 
            variants={iconVariants}
            whileHover="hover"
            className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-lg flex-shrink-0"
          >
            <Users className="w-4 h-4 text-white" />
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" as const }}
          >
            <h3 className="text-sm font-semibold text-gray-900 leading-tight">🎯 Filter Appointments by Barber</h3>
          </motion.div>
        </div>
        <div className="flex items-center justify-between">
          <motion.p 
            className="text-xs text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Click to filter
          </motion.p>
          <AnimatePresence>
            {selectedBarber && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onBarberSelect(null)}
                className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-md transition-colors"
              >
                <X className="w-3 h-3" />
                <span>Clear</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, staggerChildren: 0.1 }}
      >
        {/* All Appointments Option - Styled as Active Toggle Pill */}
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => onBarberSelect(null)}
          className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all text-sm font-medium ${
            selectedBarber === null
              ? 'border-blue-500 bg-blue-500 text-white shadow-md transform scale-[1.02]'
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700'
          }`}
        >
          <div className="flex items-center space-x-2">
            <motion.div 
              variants={iconVariants}
              whileHover="hover"
              className={`w-6 h-6 rounded-md flex items-center justify-center ${
                selectedBarber === null
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Users className="w-3 h-3" />
            </motion.div>
            <span className="font-semibold">All Barbers</span>
          </div>
          <motion.span 
            variants={countVariants}
            whileHover="hover"
            className={`text-xs font-bold px-2.5 py-1 rounded-full min-w-[24px] ${
              selectedBarber === null
                ? 'bg-white/20 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {totalAppointments}
          </motion.span>
        </motion.button>

        {/* Individual Barbers */}
        <AnimatePresence>
          {barberStats.map(({ name, count }, index) => (
            <motion.button
              key={name}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              whileHover="hover"
              whileTap="tap"
              transition={{ delay: index * 0.05 }}
              onClick={() => onBarberSelect(name)}
              className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all text-sm ${
                selectedBarber === name
                  ? 'border-purple-200 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <motion.div 
                  variants={iconVariants}
                  whileHover="hover"
                  className={`w-6 h-6 rounded-md flex items-center justify-center ${
                    selectedBarber === name
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <User className="w-3 h-3" />
                </motion.div>
                <motion.span 
                  className="font-medium capitalize"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring" as const, stiffness: 400 }}
                >
                  {name}
                </motion.span>
              </div>
              <motion.span 
                variants={countVariants}
                whileHover="hover"
                className={`text-xs font-bold px-2 py-1 rounded-full min-w-[20px] ${
                  selectedBarber === name
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {count}
              </motion.span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {barberStats.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center py-6"
          >
            <motion.div 
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 0.9, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-gray-100 p-2 rounded-lg w-8 h-8 flex items-center justify-center mx-auto mb-2"
            >
              <User className="w-4 h-4 text-gray-400" />
            </motion.div>
            <p className="text-xs text-gray-500">No barbers found</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}; 