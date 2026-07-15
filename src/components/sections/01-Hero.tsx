"use client";

import React from "react";
import { motion } from "framer-motion";
import GlassButton from "../ui/GlassButton";

interface HeroProps {
  onSearchClick: () => void;
  onSectionScroll: (sectionId: string) => void;
}

export default function Hero({ onSearchClick, onSectionScroll }: HeroProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  } as const;

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col justify-between items-center pt-32 pb-12 overflow-hidden">
      {/* Old navbar removed - now global floating navbar */}


      {/* Hero Content */}
      <div className="flex-1 flex flex-col justify-center items-center max-w-5xl mx-auto px-6 text-center z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.span
            variants={itemVariants}
            className="text-white/60 font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-4"
          >
            PREMIUM AIR TRAVEL
          </motion.span>

          {/* H1 Title */}
          <motion.h1
            variants={itemVariants}
            className="text-white font-bold tracking-[0.08em] uppercase text-5xl md:text-8xl leading-tight mb-6"
          >
            FLY BEYOND
            <br />
            LIMITS
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-white/70 text-base md:text-xl font-light tracking-wide max-w-2xl mb-10 leading-relaxed"
          >
            Experience a new standard of luxury aviation. Crafted for the discerning traveler, engineered for safety, defined by pure elegance.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <GlassButton variant="primary" onClick={onSearchClick}>
              Book a Flight
            </GlassButton>
            <GlassButton variant="secondary" onClick={() => onSectionScroll("destinations")}>
              Explore Destinations
            </GlassButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="flex justify-center items-center z-10">
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onSectionScroll("flights")}
        >
          <span className="text-white/40 font-mono text-[9px] tracking-[0.3em] uppercase mb-2">
            Scroll Down
          </span>
          <div className="w-[1px] h-10 bg-white/20 relative overflow-hidden">
            <motion.div
              animate={{
                top: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute left-0 right-0 h-4 bg-white"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
