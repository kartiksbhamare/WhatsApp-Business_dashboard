import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SalonSync - Real-time Booking Management",
  description: "Modern real-time dashboard for managing salon bookings from WhatsApp bot",
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
