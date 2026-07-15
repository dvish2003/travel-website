"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import GlassButton from "../ui/GlassButton";

const CLASSES = [
  {
    id: "economy",
    name: "Economy Class",
    price: "$550",
    image: "/images/classes/economy.jpg",
    features: [
      "Ergonomic seats with adjustable headrests",
      "Complimentary hot meals and beverages",
      "9-inch personal touchscreen display",
      "USB charging ports at every seat",
      "23kg checked baggage allowance",
      "Standard Wi-Fi connectivity package",
    ],
  },
  {
    id: "business",
    name: "Business Class",
    price: "$1,850",
    image: "/images/classes/business.jpg",
    features: [
      "Fully flat-bed seats with luxury bedding",
      "Gourmet dine-on-demand chef menu",
      "Exclusive airport lounge access worldwide",
      "Priority check-in, boarding & baggage",
      "15-inch high-definition screen & noise headphones",
      "2 x 32kg checked baggage allowance",
    ],
  },
  {
    id: "first",
    name: "First Class",
    price: "$4,200",
    image: "/images/classes/first.jpg",
    features: [
      "Private sliding-door suite with ambient lighting",
      "Pre-flight caviar service & vintage Champagne",
      "Chauffeur-driven luxury airport transfers",
      "Personal onboard wardrobe & vanity desk",
      "Bespoke Italian pajamas & amenity kits",
      "Zero-gravity seating position adjustments",
    ],
  },
];

export default function ClassComparison() {
  const [activeClassTab, setActiveClassTab] = useState(CLASSES[1]);

  return (
    <section id="classes" className="relative z-10 py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-16"
      >
        <div className="text-center space-y-4">
          <span className="text-white/60 font-mono text-xs uppercase tracking-[0.2em] block">
            TRAVEL YOUR WAY
          </span>
          <h2 className="text-white font-bold tracking-wider uppercase text-4xl md:text-6xl">
            Choose Your Class
          </h2>

          <div className="inline-flex rounded-full border border-white/10 p-1.5 bg-white/5 mt-4">
            {CLASSES.map((cls) => (
              <button
                key={cls.id}
                type="button"
                onClick={() => setActiveClassTab(cls)}
                className={`px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-500 ${
                  activeClassTab.id === cls.id
                    ? "bg-white text-black font-bold shadow-lg"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {cls.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeClassTab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <GlassCard className="p-8 md:p-12 overflow-hidden" hoverEffect={false}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10">
                  <img
                     src={activeClassTab.image}
                     alt={activeClassTab.name}
                     className="w-full h-full object-cover grayscale contrast-115 brightness-90 transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                <div className="flex flex-col justify-between h-full space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-white font-mono font-bold tracking-wider uppercase text-xl md:text-2xl border-b border-white/10 pb-4">
                      {activeClassTab.name} Amenities
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeClassTab.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full border border-white/20 bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-white/70 text-xs sm:text-sm font-light leading-snug">
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-6 mt-auto">
                    <div>
                      <span className="block text-[10px] text-white/40 uppercase tracking-widest font-mono">
                        Base Fare
                      </span>
                      <span className="text-white font-mono font-bold text-2xl md:text-3xl">
                        {activeClassTab.price}
                      </span>
                    </div>

                    <GlassButton variant="primary">
                      Select {activeClassTab.name.split(" ")[0]}
                    </GlassButton>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
