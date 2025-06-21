import React from 'react';
import { User, Users, X } from 'lucide-react';
import { Booking } from '@/types/booking';

interface BarberFilterProps {
  bookings: Booking[];
  selectedBarber: string | null;
  onBarberSelect: (barber: string | null) => void;
}

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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 h-fit sticky top-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-lg">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">Filter by Barber</h3>
            <p className="text-xs text-gray-500">Click to filter</p>
          </div>
        </div>
        {selectedBarber && (
          <button
            onClick={() => onBarberSelect(null)}
            className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-md transition-colors"
          >
            <X className="w-3 h-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="space-y-2">
        {/* All Appointments Option */}
        <button
          onClick={() => onBarberSelect(null)}
          className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all text-sm ${
            selectedBarber === null
              ? 'border-blue-200 bg-blue-50 text-blue-700'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-2">
            <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
              selectedBarber === null
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}>
              <Users className="w-3 h-3" />
            </div>
            <span className="font-medium">All Barbers</span>
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-full min-w-[20px] ${
            selectedBarber === null
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-600'
          }`}>
            {totalAppointments}
          </span>
        </button>

        {/* Individual Barbers */}
        {barberStats.map(({ name, count }) => (
          <button
            key={name}
            onClick={() => onBarberSelect(name)}
            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all text-sm ${
              selectedBarber === name
                ? 'border-purple-200 bg-purple-50 text-purple-700'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                selectedBarber === name
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                <User className="w-3 h-3" />
              </div>
              <span className="font-medium capitalize">{name}</span>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full min-w-[20px] ${
              selectedBarber === name
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {barberStats.length === 0 && (
        <div className="text-center py-6">
          <div className="bg-gray-100 p-2 rounded-lg w-8 h-8 flex items-center justify-center mx-auto mb-2">
            <User className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-xs text-gray-500">No barbers found</p>
        </div>
      )}
    </div>
  );
}; 