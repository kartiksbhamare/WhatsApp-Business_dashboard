import { Booking, DateFilter } from '@/types/booking';

export const filterBookingsByDate = (bookings: Booking[], dateFilter: DateFilter): Booking[] => {
  if (dateFilter === 'all') return bookings;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const endOfWeek = new Date();
  endOfWeek.setDate(today.getDate() + (7 - today.getDay()));
  endOfWeek.setHours(23, 59, 59, 999);

  return bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    bookingDate.setHours(0, 0, 0, 0);

    switch (dateFilter) {
      case 'today':
        return bookingDate.getTime() === today.getTime();
      case 'tomorrow':
        return bookingDate.getTime() === tomorrow.getTime();
      case 'this-week':
        return bookingDate >= today && bookingDate <= endOfWeek;
      default:
        return true;
    }
  });
};

export const getDateFilterLabel = (dateFilter: DateFilter, count: number): string => {
  switch (dateFilter) {
    case 'today':
      return `Today (${count})`;
    case 'tomorrow':
      return `Tomorrow (${count})`;
    case 'this-week':
      return `This Week (${count})`;
    default:
      return `All Dates (${count})`;
  }
}; 