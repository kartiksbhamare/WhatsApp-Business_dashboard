import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock } from 'lucide-react';
import { Booking } from '@/types/booking';
import { isToday } from 'date-fns';

interface BookingStatsProps {
  bookings: Booking[];
}

// Animation variants
const containerVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.8,
    y: 50,
    rotateX: -30
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 15
    }
  },
  hover: {
    scale: 1.05,
    y: -8,
    rotateX: 5,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25
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
      delay: 0.3
    }
  },
  hover: {
    scale: 1.2,
    rotate: 10,
    transition: { type: "spring" as const, stiffness: 400 }
  }
};

const numberVariants = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 15,
      delay: 0.4
    }
  }
};

const labelVariants = {
  initial: { y: 10, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      delay: 0.5
    }
  }
};

// Counter animation hook
const useCountAnimation = (target: number, duration: number = 1000) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
};

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, color, delay = 0 }) => {
  const animatedValue = useCountAnimation(value, 1500);

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer ${color}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <div>
          <motion.div 
            variants={numberVariants}
            className="text-3xl font-bold text-gray-900 mb-1"
          >
            {animatedValue}
          </motion.div>
          <motion.p 
            variants={labelVariants}
            className="text-sm font-medium text-gray-600"
          >
            {label}
          </motion.p>
        </div>
        <motion.div 
          variants={iconVariants}
          whileHover="hover"
          className={`p-3 rounded-xl bg-gradient-to-br shadow-sm`}
        >
          {icon}
        </motion.div>
      </div>
      
      {/* Animated progress bar */}
      <motion.div 
        className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r`}
          initial={{ width: 0 }}
          animate={{ width: value > 0 ? `${Math.min((value / 10) * 100, 100)}%` : '0%' }}
          transition={{ 
            duration: 1.5, 
            delay: 0.8,
            type: "spring" as const,
            stiffness: 100 
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export const BookingStats: React.FC<BookingStatsProps> = ({ bookings }) => {
  const totalBookings = bookings.length;
  const todayBookings = bookings.filter(booking => isToday(booking.createdAt)).length;
  const uniqueCustomers = new Set(bookings.map(booking => booking.phoneNumber || booking.customerName)).size;

  const stats = [
    {
      icon: <Calendar className="w-6 h-6 text-white" />,
      value: totalBookings,
      label: "Total Bookings",
      color: "hover:border-blue-300",
      bgColor: "from-blue-500 to-blue-600"
    },
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      value: todayBookings,
      label: "Today's Bookings",
      color: "hover:border-green-300",
      bgColor: "from-green-500 to-green-600"
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      value: uniqueCustomers,
      label: "Unique Customers",
      color: "hover:border-purple-300",
      bgColor: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          custom={index}
          variants={cardVariants}
          whileHover="hover"
          className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer ${stat.color}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <motion.div 
                variants={numberVariants}
                className="text-3xl font-bold text-gray-900 mb-1"
              >
                <CounterAnimation target={stat.value} />
              </motion.div>
              <motion.p 
                variants={labelVariants}
                className="text-sm font-medium text-gray-600"
              >
                {stat.label}
              </motion.p>
            </div>
            <motion.div 
              variants={iconVariants}
              whileHover="hover"
              className={`p-3 rounded-xl bg-gradient-to-br ${stat.bgColor} shadow-sm`}
            >
              {stat.icon}
            </motion.div>
          </div>
          
          {/* Animated progress bar */}
          <motion.div 
            className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
          >
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${stat.bgColor}`}
              initial={{ width: 0 }}
              animate={{ width: stat.value > 0 ? `${Math.min((stat.value / 10) * 100, 100)}%` : '0%' }}
              transition={{ 
                duration: 1.5, 
                delay: 0.8 + index * 0.1,
                type: "spring" as const,
                stiffness: 100 
              }}
            />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Counter animation component
const CounterAnimation: React.FC<{ target: number }> = ({ target }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const increment = target / 60; // 60 frames for smooth animation
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 25);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}</span>;
}; 