import React from 'react';
import { format } from 'date-fns';
import { 
  User, 
  Phone, 
  Clock,
  Calendar
} from 'lucide-react';
import { Booking } from '@/types/booking';

interface BookingCardProps {
  booking: Booking;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  // Get the phone number to display
  const displayPhone = booking.phone || booking.contact_name;
  
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

  // Format date
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return dateStr; // Return original string if invalid
      }
      return format(date, 'MMM dd, yyyy');
    } catch {
      return dateStr;
    }
  };

  // Format created timestamp
  const formatCreatedAt = (timestamp: string) => {
    try {
      if (!timestamp) return 'Recently';
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        return 'Recently'; // Fallback for invalid dates
      }
      return format(date, 'MMM dd, HH:mm');
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-sm border border-gray-200/50 p-4 sm:p-6 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 hover:bg-white transition-all duration-500 group cursor-pointer">
      
      {/* Primary Info: Contact Name, Barber, Time - Most Important */}
      <div className="space-y-3 sm:space-y-4 mb-4">
        
        {/* Contact Name - Top Priority */}
        {booking.contact_name && (
          <div className="bg-gradient-to-r from-blue-50 to-blue-100/80 border border-blue-200 rounded-xl p-3 sm:p-4 group-hover:from-blue-100 group-hover:to-blue-150 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg sm:text-xl font-bold text-blue-900 group-hover:text-blue-800 transition-colors duration-300 truncate">
                  {booking.contact_name}
                </p>
                <p className="text-sm text-blue-700 font-medium">Customer</p>
              </div>
            </div>
          </div>
        )}

        {/* Barber & Time - Equal Priority */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Barber */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100/80 border border-purple-200 rounded-xl p-3 sm:p-4 group-hover:from-purple-100 group-hover:to-purple-150 transition-all duration-300">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform duration-300">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-purple-600 mb-1">Barber</p>
                <p className="text-base sm:text-lg font-bold text-purple-900 capitalize truncate">{booking.barber_name}</p>
              </div>
            </div>
          </div>
          
          {/* Time */}
          <div className="bg-gradient-to-r from-green-50 to-green-100/80 border border-green-200 rounded-xl p-3 sm:p-4 group-hover:from-green-100 group-hover:to-green-150 transition-all duration-300">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-green-600 mb-1">Time</p>
                <p className="text-base sm:text-lg font-bold text-green-900 truncate">{booking.time_slot}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Date - Important but secondary */}
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100/80 border border-indigo-200 rounded-xl p-3 sm:p-4 group-hover:from-indigo-100 group-hover:to-indigo-150 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 mb-1">Appointment Date</p>
              <p className="text-base sm:text-lg font-bold text-indigo-900">{formatDate(booking.date)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Info - Phone & Service (smaller but visible) */}
      <div className="space-y-2 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-800 truncate">{formatPhoneNumber(displayPhone)}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-800 truncate">{booking.service_name}</span>
          </div>
          <span className="text-xs font-medium text-gray-700 ml-2 flex-shrink-0">{formatCreatedAt(booking.created_at)}</span>
        </div>
      </div>
    </div>
  );
}; 