"use client";

import React, { useRef } from "react";
import AnimatedBackground from "@/components/background/AnimatedBackground";
import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/sections/01-Hero";
import FlightSearch from "@/components/sections/02-FlightSearch";
import Destinations from "@/components/sections/03-Destinations";
import WhyChooseUs from "@/components/sections/04-WhyChooseUs";
import FleetShowcase from "@/components/sections/05-FleetShowcase";
import ClassComparison from "@/components/sections/06-ClassComparison";
import Testimonials from "@/components/sections/07-Testimonials";
import FooterCTA from "@/components/sections/08-FooterCTA";

export default function Home() {
  const searchRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBookNowClick = () => {
    if (searchRef.current) {
      searchRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-transparent overflow-x-hidden">
      {/* Scroll-Animated Canvas Background Layer */}
      <AnimatedBackground />

      {/* Floating Modern Navbar */}
      <Navbar onSectionScroll={scrollToSection} onSearchClick={handleBookNowClick} />

      {/* Hero Section */}
      <Hero onSearchClick={handleBookNowClick} onSectionScroll={scrollToSection} />

      {/* Flight Search Widget */}
      <div ref={searchRef}>
        <FlightSearch />
      </div>

      {/* Featured Destinations */}
      <Destinations />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Fleet Showcase */}
      <FleetShowcase />

      {/* Cabin Class Comparison */}
      <ClassComparison />

      {/* Testimonials Marquee */}
      <Testimonials />

      {/* Footer and final Booking CTA */}
      <FooterCTA onSearchClick={handleBookNowClick} onSectionScroll={scrollToSection} />
    </main>
  );
}
