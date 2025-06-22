import React from 'react';
import { Calendar, Clock, CalendarDays, Timer } from 'lucide-react';
import { DateFilter as DateFilterType } from '@/types/booking';

interface DateFilterProps {
  selectedDate: DateFilterType;
  onDateSelect: (date: DateFilterType) => void;
}

export const DateFilter: React.FC<DateFilterProps> = ({ selectedDate, onDateSelect }) => {
  const dateOptions = [
    {
      id: 'all' as DateFilterType,
      label: 'All Dates',
      icon: Calendar,
      color: 'gray'
    },
    {
      id: 'today' as DateFilterType,
      label: 'Today',
      icon: Clock,
      color: 'green'
    },
    {
      id: 'tomorrow' as DateFilterType,
      label: 'Tomorrow',
      icon: Timer,
      color: 'blue'
    },
    {
      id: 'this-week' as DateFilterType,
      label: 'This Week',
      icon: CalendarDays,
      color: 'purple'
    }
  ];

  const getButtonStyles = (optionId: DateFilterType, color: string) => {
    const isSelected = selectedDate === optionId;
    const baseStyles = "flex items-center justify-center space-x-2 px-3 py-2 rounded-lg border-2 transition-all duration-300 text-sm font-medium transform hover:scale-[1.02]";
    
    if (isSelected) {
      return `${baseStyles} border-${color}-500 bg-${color}-500 text-white shadow-lg shadow-${color}-500/25`;
    }
    
    return `${baseStyles} border-gray-200 hover:border-${color}-300 hover:bg-${color}-50 hover:text-${color}-700 text-gray-700`;
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/50 p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center space-x-2 mb-3">
        <Calendar className="w-4 h-4 text-gray-600" />
        <h3 className="font-semibold text-gray-900">Filter by Date</h3>
      </div>
      
      {/* Mobile: Horizontal scroll */}
      <div className="flex space-x-2 overflow-x-auto pb-2 lg:hidden">
        {dateOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onDateSelect(option.id)}
            className={`${getButtonStyles(option.id, option.color)} whitespace-nowrap flex-shrink-0`}
          >
            <option.icon className="w-4 h-4" />
            <span>{option.label}</span>
          </button>
        ))}
      </div>

      {/* Desktop: Vertical stack */}
      <div className="hidden lg:flex lg:flex-col lg:space-y-2">
        {dateOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onDateSelect(option.id)}
            className={`${getButtonStyles(option.id, option.color)} w-full`}
          >
            <option.icon className="w-4 h-4" />
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}; 