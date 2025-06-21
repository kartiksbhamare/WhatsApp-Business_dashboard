export interface Booking {
  id: string;
  customerName: string;
  phoneNumber: string;
  service: string;
  barber: string;
  timeSlot: string;
  bookingSource: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt?: Date;
}

export interface BookingFormData {
  customerName: string;
  phoneNumber: string;
  service: string;
  barber: string;
  timeSlot: string;
  bookingSource: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
} 