"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Grid, Columns } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const DESTINATIONS = [
  {
    city: "Tokyo",
    country: "Japan",
    price: "$1,250",
    image: "/images/destinations/tokyo.jpg",
  },
  {
    city: "Paris",
    country: "France",
    price: "$980",
    image: "/images/destinations/paris.jpg",
  },
  {
    city: "Reykjavik",
    country: "Iceland",
    price: "$1,450",
    image: "/images/destinations/reykjavik.jpg",
  },
  {
    city: "New York",
    country: "United States",
    price: "$850",
    image: "/images/destinations/newyork.jpg",
  },
];

export default function Destinations() {
  const [layoutMode, setLayoutMode] = useState<"grid" | "carousel">("grid");

  return (
    <section id="destinations" className="relative z-10 py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      {/* Scroll Entrance Animation Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-12"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-white/60 font-mono text-xs uppercase tracking-[0.2em] block">
              WHERE TO NEXT
            </span>
            <h2 className="text-white font-bold tracking-wider uppercase text-4xl md:text-6xl">
              Featured Destinations
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white/50 text-sm font-light hidden md:inline">
              Select layout:
            </span>
            <div className="flex rounded-lg border border-white/10 p-1 bg-white/5">
              <button
                type="button"
                onClick={() => setLayoutMode("carousel")}
                className={`p-2 rounded-md transition-all duration-300 ${
                  layoutMode === "carousel" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
                }`}
                title="Carousel View"
              >
                <Columns className="w-4 h-4 rotate-90" />
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode("grid")}
                className={`p-2 rounded-md transition-all duration-300 ${
                  layoutMode === "grid" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Layouts */}
        {layoutMode === "grid" ? (
          // Grid View (Default for Desktop)
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESTINATIONS.map((dest, i) => (
              <DestinationCard key={dest.city} dest={dest} index={i} />
            ))}
          </div>
        ) : (
          // Carousel View (Horizontal Scroll Snap)
          <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scroll-smooth scrollbar-thin scrollbar-thumb-white/10">
            {DESTINATIONS.map((dest, i) => (
              <div key={dest.city} className="min-w-[280px] sm:min-w-[320px] snap-start flex-1">
                <DestinationCard dest={dest} index={i} />
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}

function DestinationCard({ dest, index }: { dest: typeof DESTINATIONS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group"
    >
      <GlassCard className="h-full overflow-hidden flex flex-col" hoverEffect={true}>
        {/* Full-Bleed Image Frame */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-[23px] border-b border-white/10 bg-neutral-900">
          <img
            src={dest.image}
            alt={`${dest.city}, ${dest.country}`}
            className="w-full h-full object-cover grayscale contrast-[1.1] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Body Info */}
        <div className="p-6 flex flex-col justify-between flex-1 relative">
          <div className="space-y-1">
            <h3 className="text-white font-bold font-mono tracking-wider uppercase text-lg group-hover:text-white transition-colors duration-300">
              {dest.city}
            </h3>
            <p className="text-white/60 font-light text-xs tracking-wider uppercase">
              {dest.country}
            </p>
          </div>

          <div className="flex items-end justify-between mt-6">
            <div>
              <span className="block text-[10px] text-white/40 uppercase tracking-widest font-mono">
                From
              </span>
              <span className="text-white font-mono font-bold text-base">
                {dest.price}
              </span>
            </div>

            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 group-hover:text-white group-hover:border-white/50 group-hover:bg-white/5 transition-all duration-300">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
