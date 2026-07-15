"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Compass, Clock, HeartHandshake } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const FEATURES = [
  {
    icon: Compass,
    title: "Spacious Comfort",
    desc: "Ergonomically designed lie-flat seating, ambient climate control, and unmatched cabin roominess.",
  },
  {
    icon: ShieldCheck,
    title: "Uncompromising Safety",
    desc: "State-of-the-art aircraft maintenance and rigorous safety standards overseen by top-tier crews.",
  },
  {
    icon: Clock,
    title: "On-Time Performance",
    desc: "A commitment to precision logistics ensuring you arrive exactly when you are expected.",
  },
  {
    icon: HeartHandshake,
    title: "24/7 Premium Service",
    desc: "Personalized concierge support from booking to baggage claim, catering to your every request.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative z-10 py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12 text-center">
      {/* Scroll Entrance Animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-16"
      >
        {/* Section Header */}
        <div className="space-y-3">
          <span className="text-white/60 font-mono text-xs uppercase tracking-[0.2em] block">
            THE AEROLINE DIFFERENCE
          </span>
          <h2 className="text-white font-bold tracking-wider uppercase text-4xl md:text-6xl">
            Why Choose Us
          </h2>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              >
                <GlassCard className="p-8 h-full flex flex-col items-center justify-start text-center group" hoverEffect={true}>
                  {/* Icon Badge */}
                  <div className="w-16 h-16 rounded-full border border-white/15 bg-white/5 flex items-center justify-center mb-6 group-hover:border-white/40 group-hover:bg-white/10 transition-all duration-300">
                    <Icon className="w-6 h-6 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-mono font-bold tracking-wider uppercase text-sm mb-4">
                    {feat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 font-light text-xs sm:text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
