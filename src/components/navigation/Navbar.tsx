"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassButton from "../ui/GlassButton";

interface NavbarProps {
  onSectionScroll: (sectionId: string) => void;
  onSearchClick: () => void;
}

const NAV_ITEMS = [
  { name: "Flights", id: "flights" },
  { name: "Destinations", id: "destinations" },
  { name: "Fleet", id: "fleet" },
  { name: "Classes", id: "classes" },
  { name: "Contact", id: "footer" },
];

export default function Navbar({ onSectionScroll, onSearchClick }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    // Track active section on scroll
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0.15,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe sections
    const sections = ["hero", "flights", "destinations", "fleet", "classes", "footer"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/10 z-50">
        <motion.div
          className="h-full bg-white origin-left"
          style={{
            scaleX: 0, // Fallback, animated via css or window scroll hook
          }}
          animate={{
            scaleX: typeof window !== "undefined" ? undefined : 0,
          }}
        />
      </div>

      {/* Floating Navbar Container */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-0 right-0 z-40 transition-all duration-500 flex justify-center px-4 md:px-8 ${
          scrolled ? "top-4" : "top-6"
        }`}
      >
        <div
          style={{
            background: scrolled ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(20px) saturate(120%)",
            WebkitBackdropFilter: "blur(20px) saturate(120%)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: scrolled
              ? "0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
              : "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
          className="w-full max-w-5xl h-16 md:h-20 rounded-full px-6 flex items-center justify-between transition-all duration-500"
        >
          {/* Logo / Brand */}
          <button
            onClick={() => onSectionScroll("hero")}
            className="font-mono text-sm md:text-lg font-black tracking-[0.25em] text-white focus:outline-none"
          >
            SKYLUXE
          </button>

          {/* Center Links (Capsule layout) */}
          <nav className="hidden md:flex items-center bg-white/5 border border-white/5 rounded-full p-1 gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.name}
                  onClick={() => onSectionScroll(item.id)}
                  className={`relative px-4 py-2 font-mono text-[10px] uppercase tracking-widest rounded-full transition-colors duration-300 ${
                    isActive ? "text-black font-bold" : "text-white/60 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-white rounded-full z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Book Button */}
          <div>
            <GlassButton
              variant="primary"
              className="!px-5 !py-2.5 !text-[10px] !tracking-widest"
              onClick={onSearchClick}
            >
              Book Now
            </GlassButton>
          </div>
        </div>
      </motion.header>
    </>
  );
}
