# Booking Dashboard - Real-time Firebase Dashboard

A modern, real-time web dashboard built with Next.js, TypeScript, and Firebase to display bookings from WhatsApp bot integrations.

## Features

- 🔥 **Real-time updates** with Firebase onSnapshot()
- 📱 **Responsive design** with Tailwind CSS
- 📊 **Live statistics** showing booking metrics
- 🎨 **Modern UI** with beautiful cards and components
- ⚡ **Fast performance** with Next.js 14+ App Router
- 🔄 **Auto-refresh** - no manual refresh needed
- 📈 **Status tracking** - confirmed, pending, cancelled, completed

## Tech Stack

- **Frontend**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Real-time**: Firebase onSnapshot

## Prerequisites

1. Node.js 18+ installed
2. Firebase project set up
3. Firestore database enabled
4. Firebase config credentials

## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Enable Firestore Database
4. Get your Firebase configuration from Project Settings > General > Your apps

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Firestore Data Structure

The dashboard expects booking documents in the `bookings` collection with this structure:

```javascript
{
  customerName: "John Doe",
  phoneNumber: "+1234567890",
  service: "Haircut",
  barber: "Mike Johnson",
  timeSlot: "2024-01-15 10:00 AM",
  bookingSource: "WhatsApp",
  status: "confirmed", // "confirmed" | "pending" | "cancelled" | "completed"
  createdAt: Timestamp,
  updatedAt: Timestamp (optional)
}
```

## WhatsApp Bot Integration

Your WhatsApp bot should write to the `bookings` collection in this format. The dashboard will automatically detect new bookings and display them in real-time.

Example Firebase write operation from your bot:

```javascript
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

await addDoc(collection(db, 'bookings'), {
  customerName: "John Doe",
  phoneNumber: "+1234567890",
  service: "Haircut",
  barber: "Mike Johnson", 
  timeSlot: "2024-01-15 10:00 AM",
  bookingSource: "WhatsApp",
  status: "confirmed",
  createdAt: serverTimestamp()
});
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

The dashboard will be live and update in real-time as new bookings are added to Firestore.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── BookingCard.tsx     # Individual booking card
│   ├── BookingDashboard.tsx # Main dashboard component
│   ├── BookingStats.tsx    # Statistics component
│   ├── ErrorMessage.tsx    # Error handling
│   └── LoadingSpinner.tsx  # Loading states
├── hooks/
│   └── useBookings.ts      # Real-time bookings hook
├── lib/
│   └── firebase.ts         # Firebase configuration
└── types/
    └── booking.ts          # TypeScript types
```

## Features Included

- **Real-time Dashboard**: Updates automatically when new bookings are added
- **Beautiful Cards**: Each booking displayed in a clean, modern card
- **Status Indicators**: Visual status badges with colors and icons
- **Statistics**: Live counts of total, confirmed, pending, and cancelled bookings
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Loading States**: Smooth loading spinners while data loads
- **Error Handling**: Graceful error messages with retry options
- **No Refresh Needed**: Real-time updates without page refresh

## Customization

### Adding New Fields

1. Update the `Booking` interface in `src/types/booking.ts`
2. Modify the `BookingCard` component to display the new field
3. Update your WhatsApp bot to include the new field

### Styling Changes

All styling is done with Tailwind CSS. You can customize:
- Colors in component files
- Layout in `BookingDashboard.tsx`
- Card design in `BookingCard.tsx`

## Support

For issues or questions:
1. Check the console for Firebase connection errors
2. Verify your environment variables are correct
3. Ensure Firestore rules allow read access
4. Check Firebase project settings

## License

MIT License - feel free to use this in your projects!
