import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  User, 
  Phone, 
  Clock,
  Calendar,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Booking } from '@/types/booking';

interface BookingCardProps {
  booking: Booking;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
    <div 
      className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-sm border border-gray-200/50 p-4 sm:p-6 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 hover:bg-white transition-all duration-500 group cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      
      {/* Essential Info - Always Visible */}
      <div className="space-y-4">
        
        {/* Contact Name - Largest */}
        {booking.contact_name && (
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              {booking.contact_name}
            </h3>
            <p className="text-sm text-gray-600 font-medium">Customer</p>
          </div>
        )}

        {/* Time & Barber - Side by Side, Large */}
        <div className="grid grid-cols-2 gap-4">
          {/* Time */}
          <div className="bg-gradient-to-r from-green-50 to-green-100/80 border border-green-200 rounded-xl p-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <Clock className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-green-600 mb-1">Time</p>
                <p className="text-xl sm:text-2xl font-bold text-green-900">{booking.time_slot}</p>
              </div>
            </div>
          </div>
          
          {/* Barber */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100/80 border border-purple-200 rounded-xl p-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <User className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-purple-600 mb-1">Barber</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-900 capitalize">{booking.barber_name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Expand/Collapse Indicator */}
        <div className="flex items-center justify-center pt-2">
          <div className="flex items-center space-x-2 text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                <span className="text-sm font-medium">Less Details</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                <span className="text-sm font-medium">More Details</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Details - Show on Click */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-gray-200 space-y-4 animate-fadeIn">
          
          {/* Date */}
          <div className="bg-gradient-to-r from-indigo-50 to-indigo-100/80 border border-indigo-200 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 mb-1">Appointment Date</p>
                <p className="text-lg font-bold text-indigo-900">{formatDate(booking.date)}</p>
              </div>
            </div>
          </div>

          {/* Phone & Service */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-gray-600" />
                <span className="text-base font-semibold text-gray-800">Phone</span>
              </div>
              <span className="text-base font-bold text-gray-900">{formatPhoneNumber(displayPhone)}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-base font-semibold text-gray-800">Service</span>
              </div>
              <span className="text-base font-bold text-gray-900">{booking.service_name}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-base font-semibold text-gray-800">Booked</span>
              </div>
              <span className="text-base font-bold text-gray-900">{formatCreatedAt(booking.created_at)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 