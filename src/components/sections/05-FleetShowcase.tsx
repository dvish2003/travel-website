"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../ui/GlassCard";

const FLEET = [
  {
    id: "a350",
    name: "Airbus A350-1000",
    desc: "The ultimate modern widebody flagship. Engineered with advanced aerodynamics and carbon-fibre composites, offering exceptional fuel efficiency, quietest-in-class cabin atmosphere, and state-of-the-art entertainment capabilities.",
    image: "/images/fleet/a350.jpg",
    specs: [
      { label: "Maximum Range", value: "16,100 km" },
      { label: "Cruise Speed", value: "Mach 0.85 (903 km/h)" },
      { label: "Overall Length", value: "73.79 meters" },
      { label: "Cabin Capacity", value: "366 to 412 passengers" },
      { label: "Wing Span", value: "64.75 meters" },
    ],
  },
  {
    id: "b787",
    name: "Boeing 787 Dreamliner",
    desc: "A revolution in passenger flight comfort. The Dreamliner is renowned for its larger dimmable windows, cleaner cabin air with higher humidity levels, and specialized design that reduces flight turbulence fatigue.",
    image: "/images/fleet/b787.jpg",
    specs: [
      { label: "Maximum Range", value: "14,140 km" },
      { label: "Cruise Speed", value: "Mach 0.85 (903 km/h)" },
      { label: "Overall Length", value: "62.8 meters" },
      { label: "Cabin Capacity", value: "296 passengers" },
      { label: "Wing Span", value: "60.1 meters" },
    ],
  },
  {
    id: "g700",
    name: "Gulfstream G700",
    desc: "The pinnacle of private executive travel. Offering a spacious, ultra-refined cabin with up to five living areas, bespoke seating layouts, and a clean-air system refreshing cabin atmosphere every two minutes.",
    image: "/images/fleet/g700.jpg",
    specs: [
      { label: "Maximum Range", value: "13,890 km" },
      { label: "Cruise Speed", value: "Mach 0.90 (956 km/h)" },
      { label: "Overall Length", value: "33.48 meters" },
      { label: "Cabin Capacity", value: "Up to 19 passengers" },
      { label: "Wing Span", value: "31.39 meters" },
    ],
  },
];

export default function FleetShowcase() {
  const [activeModel, setActiveModel] = useState(FLEET[0]);

  return (
    <section id="fleet" className="relative z-10 py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <span className="text-white/60 font-mono text-xs uppercase tracking-[0.2em] block">
              OUR WORLD-CLASS FLEET
            </span>
            <h2 className="text-white font-bold tracking-wider uppercase text-4xl md:text-6xl">
              Fleet Showcase
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {FLEET.map((aircraft) => (
              <button
                key={aircraft.id}
                type="button"
                onClick={() => setActiveModel(aircraft)}
                className={`px-5 py-2.5 font-mono text-xs uppercase tracking-widest rounded-lg border transition-all duration-300 ${
                  activeModel.id === aircraft.id
                    ? "bg-white/10 border-white/30 text-white"
                    : "border-transparent text-white/50 hover:text-white"
                }`}
              >
                {aircraft.name.split(" ")[0] + " " + aircraft.name.split(" ")[1]}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeModel.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            <GlassCard className="p-4 overflow-hidden aspect-video lg:aspect-[4/3]" hoverEffect={true}>
              <div className="relative w-full h-full overflow-hidden rounded-2xl bg-neutral-950">
                <img
                  src={activeModel.image}
                  alt={activeModel.name}
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </GlassCard>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-white font-bold tracking-wider uppercase text-2xl md:text-4xl">
                  {activeModel.name}
                </h3>
                <p className="text-white/70 font-light text-sm sm:text-base leading-relaxed">
                  {activeModel.desc}
                </p>
              </div>

              <GlassCard className="p-6" hoverEffect={false}>
                <div className="divide-y divide-white/10 font-mono text-xs md:text-sm">
                  {activeModel.specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between py-3.5 first:pt-0 last:pb-0">
                      <span className="text-white/40 uppercase tracking-widest">{spec.label}</span>
                      <span className="text-white font-bold tracking-wider">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
