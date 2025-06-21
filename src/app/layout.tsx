import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SalonSync - Real-time Booking Management",
  description: "Modern real-time dashboard for managing salon bookings from WhatsApp bot",
  icons: {
    icon: [
      {
        url: '/salon-icon.svg',
        type: 'image/svg+xml',
      }
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      }
    ],
  },
  manifest: '/manifest.json',
  themeColor: '#6366f1',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
