import React from 'react';
import { format } from 'date-fns';
import { 
  User, 
  Phone, 
  Scissors, 
  Clock, 
  MessageCircle, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Calendar
} from 'lucide-react';
import { Booking } from '@/types/booking';

interface BookingCardProps {
  booking: Booking;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{booking.customerName}</h3>
            <p className="text-sm text-gray-500 flex items-center mt-1">
              <Phone className="w-3 h-3 mr-1" />
              {booking.phoneNumber}
            </p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center space-x-1 ${getStatusColor(booking.status)}`}>
          {getStatusIcon(booking.status)}
          <span className="capitalize">{booking.status}</span>
        </div>
      </div>

      {/* Booking Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-gray-700">
          <Scissors className="w-4 h-4 text-gray-500" />
          <span className="font-medium">Service:</span>
          <span>{booking.service}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-700">
          <User className="w-4 h-4 text-gray-500" />
          <span className="font-medium">Barber:</span>
          <span>{booking.barber}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-700">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="font-medium">Time:</span>
          <span>{booking.timeSlot}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-700">
          <MessageCircle className="w-4 h-4 text-gray-500" />
          <span className="font-medium">Source:</span>
          <span>{booking.bookingSource}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>Created: {format(booking.createdAt, 'MMM dd, yyyy HH:mm')}</span>
        </div>
        {booking.updatedAt && (
          <div className="text-sm text-gray-500">
            Updated: {format(booking.updatedAt, 'MMM dd, HH:mm')}
          </div>
        )}
      </div>
    </div>
  );
}; 