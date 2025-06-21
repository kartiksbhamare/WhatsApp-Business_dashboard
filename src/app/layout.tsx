import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Booking Dashboard - Real-time Booking Management",
  description: "Modern real-time dashboard for managing bookings from WhatsApp bot",
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
