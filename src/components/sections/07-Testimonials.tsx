"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const TESTIMONIALS = [
  {
    name: "Alexander Mercer",
    role: "Verified First Class Passenger",
    avatar: "/images/testimonials/avatar1.jpg",
    quote: "Aeroline completely redefined what I expect from commercial air travel. The private suite was a masterclass in spatial design, and the dine-on-demand was better than most Michelin-starred restaurants I visit.",
    rating: 5,
  },
  {
    name: "Helena Rostova",
    role: "Verified Business Class Passenger",
    avatar: "/images/testimonials/avatar2.jpg",
    quote: "The lie-flat seats are exceptionally comfortable. I arrived in Tokyo completely rested and ready for a heavy week of meetings. The lounge access in Heathrow was quiet, spacious, and highly professional.",
    rating: 5,
  },
  {
    name: "Marcus Vance",
    role: "Verified First Class Passenger",
    avatar: "/images/testimonials/avatar3.jpg",
    quote: "A flawless experience. From the booking concierge who handled last-minute baggage extensions, to the onboard crew who anticipated everything before I asked. Truly a premium tier of aviation.",
    rating: 5,
  },
  {
    name: "Chloe Dupont",
    role: "Verified Business Class Passenger",
    avatar: "/images/testimonials/avatar4.jpg",
    quote: "I travel constantly for design consultations, and Aeroline is the only airline where I feel my environment remains creative and calming. The cabin sound isolation is absolutely state-of-the-art.",
    rating: 5,
  },
];

export default function Testimonials() {
  // Duplicate testimonials array for continuous loop
  const marqueeItems = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="relative z-10 py-24 md:py-32 overflow-hidden">
      {/* Inject custom styling for marquee animation to keep the component fully modular */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
        .animate-marquee-scroll {
          animation: marquee 30s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-scroll {
            animation: none !important;
            overflow-x: auto;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-3"
        >
          <span className="text-white/60 font-mono text-xs uppercase tracking-[0.2em] block">
            TRUSTED BY TRAVELERS
          </span>
          <h2 className="text-white font-bold tracking-wider uppercase text-4xl md:text-6xl">
            What Our Passengers Say
          </h2>
        </motion.div>
      </div>

      {/* Marquee Row Container */}
      <div className="w-full relative flex overflow-hidden">
        {/* Soft fading gradient edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

        {/* Marquee Inner Track */}
        <div className="flex gap-6 animate-marquee-scroll hover:[animation-play-state:paused] py-4">
          {marqueeItems.map((test, index) => (
            <div
              key={`${test.name}-${index}`}
              className="w-[360px] flex-shrink-0"
            >
              <GlassCard className="p-8 h-full flex flex-col justify-between" hoverEffect={true}>
                <div className="space-y-6">
                  {/* Rating */}
                  <div className="flex gap-1">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-white/70 italic text-sm font-light leading-relaxed">
                    &quot;{test.quote}&quot;
                  </p>
                </div>

                {/* Profile */}
                <div className="flex items-center gap-4 mt-8 border-t border-white/10 pt-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-neutral-900">
                    <img
                      src={test.avatar}
                      alt={test.name}
                      className="w-full h-full object-cover grayscale"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider">
                      {test.name}
                    </h4>
                    <span className="text-white/40 text-[10px] tracking-wider uppercase">
                      {test.role}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
