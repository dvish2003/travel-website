import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkyLuxe Airline | Premium Air Travel",
  description: "Experience luxury air travel with SkyLuxe. Premium cabins, exceptional service, and unforgettable journeys. Book your next flight today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
