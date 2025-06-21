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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 h-fit sticky top-4 hover:shadow-lg transition-shadow duration-500">
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-lg flex-shrink-0 hover:scale-110 transition-transform duration-300">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 leading-tight">🎯 Filter Appointments by Barber</h3>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">Click to filter</p>
          {selectedBarber && (
            <button
              onClick={() => onBarberSelect(null)}
              className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-md transition-all duration-300 hover:scale-105 animate-slideInRight"
            >
              <X className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {/* All Appointments Option - Styled as Active Toggle Pill */}
        <button
          onClick={() => onBarberSelect(null)}
          className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-500 text-sm font-medium transform hover:scale-[1.02] ${
            selectedBarber === null
              ? 'border-blue-500 bg-blue-500 text-white shadow-lg shadow-blue-500/25 animate-pulse-subtle'
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md'
          }`}
        >
          <div className="flex items-center space-x-2">
            <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-300 ${
              selectedBarber === null
                ? 'bg-white/20 text-white'
                : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100'
            }`}>
              <Users className="w-3 h-3" />
            </div>
            <span className="font-semibold">All Barbers</span>
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full min-w-[24px] transition-all duration-300 ${
            selectedBarber === null
              ? 'bg-white/20 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}>
            {totalAppointments}
          </span>
        </button>

        {/* Individual Barbers */}
        {barberStats.map(({ name, count }, index) => (
          <button
            key={name}
            onClick={() => onBarberSelect(name)}
            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-500 text-sm transform hover:scale-[1.02] animate-fadeInUp ${
              selectedBarber === name
                ? 'border-purple-200 bg-purple-50 text-purple-700 shadow-md shadow-purple-500/10'
                : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 hover:shadow-md'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-300 ${
                selectedBarber === name
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-purple-100'
              }`}>
                <User className="w-3 h-3" />
              </div>
              <span className="font-medium capitalize">{name}</span>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full min-w-[20px] transition-all duration-300 ${
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
        <div className="text-center py-6 animate-fadeIn">
          <div className="bg-gray-100 p-2 rounded-lg w-8 h-8 flex items-center justify-center mx-auto mb-2 animate-float">
            <User className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-xs text-gray-500">No barbers found</p>
        </div>
      )}
    </div>
  );
}; 