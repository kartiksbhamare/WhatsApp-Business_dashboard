import React from 'react';
import { CheckCircle, Calendar, Users, Clock } from 'lucide-react';
import { Booking } from '@/types/booking';

interface BookingStatsProps {
  bookings: Booking[];
}

export const BookingStats: React.FC<BookingStatsProps> = ({ bookings }) => {
  const stats = React.useMemo(() => {
    const total = bookings.length;
    const confirmed = bookings.filter(b => b.status === 'confirmed').length;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayBookings = bookings.filter(b => {
      const bookingDate = new Date(b.createdAt);
      bookingDate.setHours(0, 0, 0, 0);
      return bookingDate.getTime() === today.getTime();
    }).length;
    
    // Get unique customers
    const uniqueCustomers = new Set(bookings.map(b => b.phoneNumber)).size;

    return { total, confirmed, todayBookings, uniqueCustomers };
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
      title: 'Confirmed',
      value: stats.confirmed,
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div key={index} className={`${stat.bgColor} rounded-xl p-6 border border-gray-200`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${stat.textColor}`}>{stat.title}</p>
              <p className={`text-3xl font-bold ${stat.textColor} mt-2`}>{stat.value}</p>
            </div>
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 