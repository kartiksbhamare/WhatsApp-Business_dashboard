import { useState, useEffect } from 'react';
import { collection, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Booking } from '@/types/booking';

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to convert date strings to Date objects
  const parseDate = (dateValue: unknown): Date => {
    if (!dateValue) return new Date();
    
    // If it's already a Date object
    if (dateValue instanceof Date) return dateValue;
    
    // If it's a Firestore Timestamp
    if (dateValue && typeof dateValue === 'object' && 'toDate' in dateValue && typeof dateValue.toDate === 'function') {
      return dateValue.toDate();
    }
    
    // If it's a string, parse it
    if (typeof dateValue === 'string') {
      const parsed = new Date(dateValue);
      return isNaN(parsed.getTime()) ? new Date() : parsed;
    }
    
    // Default fallback
    return new Date();
  };

  useEffect(() => {
    console.log('🔥 useBookings: Setting up Firebase listener...');
    console.log('🔥 Firebase db object:', db);
    console.log('🔥 Firebase app config check:', {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      hasApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      hasAuthDomain: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    });

    try {
      // For now, let's just get all bookings without ordering to avoid the orderBy issue
      const bookingsQuery = collection(db, 'bookings');

      console.log('🔥 Created bookings query, setting up onSnapshot...');

      // Set up real-time listener
      const unsubscribe = onSnapshot(
        bookingsQuery,
        (snapshot: QuerySnapshot<DocumentData>) => {
          console.log('🔥 onSnapshot success! Document count:', snapshot.size);
          console.log('🔥 Snapshot metadata:', {
            hasPendingWrites: snapshot.metadata.hasPendingWrites,
            isFromCache: snapshot.metadata.fromCache,
          });

          const bookingsData: Booking[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            console.log('🔥 Document data:', { id: doc.id, data });
            
            // Map your actual Firestore fields to the Booking interface
            bookingsData.push({
              id: doc.id,
              customerName: data.customer_name || data.customerName || 'Unknown Customer',
              phoneNumber: data.phone || data.phoneNumber || '',
              service: data.service_name || data.service || '',
              barber: data.barber_name || data.barber || '',
              timeSlot: data.time_slot || data.timeSlot || '',
              bookingSource: data.source || data.bookingSource || 'WhatsApp',
              status: data.status || 'pending',
              createdAt: parseDate(data.created_at || data.createdAt),
              updatedAt: parseDate(data.updated_at || data.updatedAt),
            });
          });
          
          // Sort by created date (most recent first) in memory
          bookingsData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
          
          console.log('🔥 Processed bookings:', bookingsData.length);
          console.log('🔥 Sample booking:', bookingsData[0]);
          setBookings(bookingsData);
          setLoading(false);
        },
        (err) => {
          console.error('🚨 Firebase onSnapshot error:', err);
          console.error('🚨 Error code:', err.code);
          console.error('🚨 Error message:', err.message);
          console.error('🚨 Full error object:', err);
          
          let userFriendlyMessage = 'Failed to fetch bookings';
          if (err.code === 'permission-denied') {
            userFriendlyMessage = 'Permission denied. Please check Firestore security rules.';
          } else if (err.code === 'unavailable') {
            userFriendlyMessage = 'Firebase service temporarily unavailable. Please try again.';
          } else if (err.code === 'unauthenticated') {
            userFriendlyMessage = 'Authentication required. Please check your Firebase config.';
          }
          
          setError(userFriendlyMessage);
          setLoading(false);
        }
      );

      console.log('🔥 onSnapshot listener set up successfully');

      // Cleanup listener on unmount
      return () => {
        console.log('🔥 Cleaning up Firebase listener');
        unsubscribe();
      };
    } catch (err) {
      console.error('🚨 Error setting up bookings listener:', err);
      setError('Failed to initialize bookings');
      setLoading(false);
    }
  }, []);

  return { bookings, loading, error };
}; 