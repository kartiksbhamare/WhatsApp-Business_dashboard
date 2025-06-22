export interface Booking {
  id: string;
  contact_name: string;
  phone: string;
  service_name: string;
  service_id: string;
  barber_name: string;
  time_slot: string;
  date: string; // Format: YYYY-MM-DD
  source: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  created_at: string; // ISO timestamp
  updated_at?: string;
}

export interface BookingFormData {
  contact_name: string;
  phone: string;
  service_name: string;
  service_id: string;
  barber_name: string;
  time_slot: string;
  date: string;
  source: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
}

export type DateFilter = 'all' | 'today' | 'tomorrow' | 'this-week';

export interface BookingFilters {
  barber: string | null;
  date: DateFilter;
} 