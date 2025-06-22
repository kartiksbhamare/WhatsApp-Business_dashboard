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
      const barber = booking.barber_name || 'Unknown';
      stats.set(barber, (stats.get(barber) || 0) + 1);
    });
    
    return Array.from(stats.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count); // Sort by appointment count
  }, [bookings]);

  const totalAppointments = bookings.length;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-sm border border-gray-200/50 p-3 sm:p-4 hover:shadow-lg hover:bg-white/95 transition-all duration-500 lg:h-fit lg:sticky lg:top-4">
      <div className="mb-3 sm:mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-1.5 sm:p-2 rounded-lg flex-shrink-0 hover:scale-110 transition-transform duration-300 shadow-sm">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 leading-tight">🎯 Filter Appointments by Barber</h3>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700 font-medium">Click to filter</p>
          {selectedBarber && (
            <button
              onClick={() => onBarberSelect(null)}
              className="flex items-center space-x-1 text-sm text-gray-700 font-medium hover:text-gray-900 bg-gray-100/80 backdrop-blur-sm hover:bg-gray-200/80 px-2 py-1 rounded-md transition-all duration-300 hover:scale-105 animate-slideInRight"
            >
              <X className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile: Horizontal scroll, Desktop: Vertical stack */}
      <div className="lg:space-y-2">
        {/* Mobile: Horizontal scrolling container */}
        <div className="flex lg:hidden space-x-2 overflow-x-auto pb-2 -mx-1 px-1">
          {/* All Appointments Option - Mobile horizontal */}
          <button
            onClick={() => onBarberSelect(null)}
            className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-lg border-2 transition-all duration-500 text-sm font-medium transform hover:scale-[1.02] ${
              selectedBarber === null
                ? 'border-blue-500 bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md text-gray-800'
            }`}
          >
            <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all duration-300 ${
              selectedBarber === null
                ? 'bg-white/20 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}>
              <Users className="w-3 h-3" />
            </div>
            <span className="whitespace-nowrap">All ({totalAppointments})</span>
          </button>

          {/* Individual Barbers - Mobile horizontal */}
          {barberStats.map(({ name, count }) => (
            <button
              key={name}
              onClick={() => onBarberSelect(name)}
              className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-500 text-sm transform hover:scale-[1.02] ${
                selectedBarber === name
                  ? 'border-purple-200 bg-purple-50 text-purple-700 shadow-md shadow-purple-500/10'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 hover:shadow-md text-gray-800'
              }`}
            >
              <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all duration-300 ${
                selectedBarber === name
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
              }`}>
                <User className="w-3 h-3" />
              </div>
              <span className="whitespace-nowrap capitalize">{name} ({count})</span>
            </button>
          ))}
        </div>

        {/* Desktop: Vertical stack (hidden on mobile) */}
        <div className="hidden lg:block space-y-2">
          {/* All Appointments Option - Desktop vertical */}
          <button
            onClick={() => onBarberSelect(null)}
            className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-500 text-sm font-medium transform hover:scale-[1.02] ${
              selectedBarber === null
                ? 'border-blue-500 bg-blue-500 text-white shadow-lg shadow-blue-500/25 animate-pulse-subtle'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md text-gray-800'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-300 ${
                selectedBarber === null
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-700 group-hover:bg-blue-100'
              }`}>
                <Users className="w-3 h-3" />
              </div>
              <span className="font-semibold">All Barbers</span>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full min-w-[24px] transition-all duration-300 ${
              selectedBarber === null
                ? 'bg-white/20 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {totalAppointments}
            </span>
          </button>

          {/* Individual Barbers - Desktop vertical */}
          {barberStats.map(({ name, count }, index) => (
            <button
              key={name}
              onClick={() => onBarberSelect(name)}
              className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-500 text-sm transform hover:scale-[1.02] animate-fadeInUp ${
                selectedBarber === name
                  ? 'border-purple-200 bg-purple-50 text-purple-700 shadow-md shadow-purple-500/10'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 hover:shadow-md text-gray-800'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center space-x-2">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-300 ${
                  selectedBarber === name
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                }`}>
                  <User className="w-3 h-3" />
                </div>
                <span className="font-medium capitalize">{name}</span>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full min-w-[20px] transition-all duration-300 ${
                selectedBarber === name
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {barberStats.length === 0 && (
        <div className="text-center py-4 sm:py-6 animate-fadeIn">
          <div className="bg-gray-100 p-2 rounded-lg w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mx-auto mb-2 animate-float">
            <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
          </div>
          <p className="text-sm text-gray-700 font-medium">No barbers found</p>
        </div>
      )}
    </div>
  );
}; 