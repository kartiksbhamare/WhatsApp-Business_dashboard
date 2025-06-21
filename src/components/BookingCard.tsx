import React from 'react';
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

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  // Check if customerName is actually a phone number (to avoid showing phone twice)
  const isPhoneNumber = booking.customerName && booking.customerName.match(/^\+?[\d\s\-\(\)]+$/);
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all duration-200 group">
      {/* Main Focus: Phone, Barber, Time */}
      <div className="space-y-4">
        {/* Phone Number - Most Prominent */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-blue-900">{formatPhoneNumber(displayPhone)}</p>
            </div>
          </div>
        </div>

        {/* Barber & Time - Equal Prominence */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <User className="w-4 h-4 text-purple-600" />
              <span className="text-xs text-purple-600 font-medium uppercase tracking-wide">Barber</span>
            </div>
            <p className="text-base font-bold text-purple-900 capitalize">{booking.barber}</p>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="text-xs text-orange-600 font-medium uppercase tracking-wide">Time</span>
            </div>
            <p className="text-base font-bold text-orange-900">{booking.timeSlot}</p>
          </div>
        </div>
      </div>

      {/* Secondary Info - Service (smaller, less prominent) */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="font-medium">{booking.service}</span>
          <span>{format(booking.createdAt, 'MMM dd, HH:mm')}</span>
        </div>
      </div>
    </div>
  );
}; 