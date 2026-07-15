import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkyLuxe Airline | Premium Air Travel",
  description: "High-performance scroll-animated canvas image scroller for premium travel.",
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
