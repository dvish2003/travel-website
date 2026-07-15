"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import GlassButton from "../ui/GlassButton";

interface FooterProps {
  onSearchClick: () => void;
  onSectionScroll: (sectionId: string) => void;
}

export default function FooterCTA({ onSearchClick, onSectionScroll }: FooterProps) {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed ${email} to SkyLuxe newsletter.`);
      setEmail("");
    }
  };

  return (
    <footer id="footer" className="relative z-10 bg-gradient-to-b from-transparent via-black/80 to-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
        
        {/* Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <GlassCard className="p-10 md:p-16 text-center space-y-8 relative overflow-hidden" hoverEffect={false}>
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <span className="text-white/60 font-mono text-xs uppercase tracking-[0.2em]">
                YOUR JOURNEY AWAITS
              </span>
              <h2 className="text-white font-bold tracking-wider uppercase text-4xl md:text-6xl">
                Ready for Takeoff?
              </h2>
              <p className="text-white/70 text-sm sm:text-base font-light tracking-wide">
                Secure your seat today and experience aviation like never before. Exceptional cabin classes, refined service, and global reach.
              </p>
            </div>

            <div className="relative z-10">
              <GlassButton variant="primary" className="!px-10 !py-4" onClick={onSearchClick}>
                Book Your Flight
              </GlassButton>
            </div>
          </GlassCard>
        </motion.div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pt-8">
          
          {/* Brand & Socials */}
          <div className="space-y-6">
            <h3 className="font-mono text-lg font-bold tracking-[0.25em] text-white">
              SKYLUXE
            </h3>
            <p className="text-white/60 font-light text-xs leading-relaxed max-w-[240px]">
              Defining premium travel through precision engineering and timeless luxury.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { 
                  name: "Twitter", 
                  url: "#", 
                  svg: (
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  )
                },
                { 
                  name: "Instagram", 
                  url: "#", 
                  svg: (
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  )
                },
                { 
                  name: "Facebook", 
                  url: "#", 
                  svg: (
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  )
                },
              ].map((soc, i) => {
                return (
                  <a
                    key={i}
                    href={soc.url}
                    aria-label={soc.name}
                    className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-white/45 hover:bg-white/10 transition-all duration-300"
                  >
                    {soc.svg}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 font-light text-xs text-white/60">
              {[
                { name: "Book Flights", id: "flights" },
                { name: "Destinations", id: "destinations" },
                { name: "Fleet Showcase", id: "fleet" },
                { name: "Cabin Classes", id: "classes" },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => onSectionScroll(link.id)}
                    className="hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2.5 font-light text-xs text-white/60">
              {["About Us", "Careers", "Press & Media", "Contact Support"].map((lnk) => (
                <li key={lnk}>
                  <a href="#" className="hover:text-white transition-colors duration-300">
                    {lnk}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-4">
            <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider">
              Stay Updated
            </h4>
            <p className="text-white/60 font-light text-xs leading-relaxed">
              Subscribe to receive private jet alerts, premium fare offerings, and company updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 font-light outline-none focus:border-white/40 transition-all duration-300"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] tracking-wider text-white/40 uppercase">
          <div>
            © {new Date().getFullYear()} SKYLUXE AIRLINE. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
