import React from 'react';
import { Calendar, Users, Clock } from 'lucide-react';
import { Booking } from '@/types/booking';

interface BookingStatsProps {
  bookings: Booking[];
}

export const BookingStats: React.FC<BookingStatsProps> = ({ bookings }) => {
  const stats = React.useMemo(() => {
    const total = bookings.length;
    const today = new Date().toISOString().split('T')[0]; // Get today in YYYY-MM-DD format
    
    const todayBookings = bookings.filter(b => b.date === today).length;
    
    // Get unique customers by phone number
    const uniqueCustomers = new Set(bookings.map(b => b.phone)).size;

    return { total, todayBookings, uniqueCustomers };
  }, [bookings]);

  const statCards = [
    {
      title: 'Total Bookings',
      value: stats.total,
      icon: Calendar,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Today\'s Bookings',
      value: stats.todayBookings,
      icon: Clock,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      title: 'Unique Customers',
      value: stats.uniqueCustomers,
      icon: Users,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
      {statCards.map((stat, index) => (
        <div 
          key={index} 
          className={`${stat.bgColor}/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200/50 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 hover:${stat.bgColor}/90 transition-all duration-500 cursor-pointer animate-fadeInUp group`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className={`text-xs sm:text-sm font-medium ${stat.textColor} group-hover:opacity-80 transition-opacity duration-300`}>{stat.title}</p>
              <p className={`text-2xl sm:text-3xl font-bold ${stat.textColor} mt-1 sm:mt-2 group-hover:scale-110 transition-transform duration-300 origin-left`}>{stat.value}</p>
            </div>
            <div className={`${stat.color} p-2 sm:p-3 rounded-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md flex-shrink-0`}>
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 