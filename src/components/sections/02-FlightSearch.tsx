"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Calendar, Users, ArrowLeftRight, Check, MapPin } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import GlassButton from "../ui/GlassButton";

const AIRPORTS = [
  { code: "JFK", name: "John F. Kennedy Intl", city: "New York" },
  { code: "LHR", name: "Heathrow Airport", city: "London" },
  { code: "HND", name: "Haneda Airport", city: "Tokyo" },
  { code: "DXB", name: "Dubai Intl Airport", city: "Dubai" },
  { code: "CDG", name: "Charles de Gaulle", city: "Paris" },
  { code: "SIN", name: "Changi Airport", city: "Singapore" },
];

export default function FlightSearch() {
  const [tripType, setTripType] = useState<"round-trip" | "one-way" | "multi-city">("round-trip");
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [fromSelected, setFromSelected] = useState(AIRPORTS[0]);
  const [toSelected, setToSelected] = useState(AIRPORTS[1]);
  const [showFromDrop, setShowFromDrop] = useState(false);
  const [showToDrop, setShowToDrop] = useState(false);
  
  const [departureDate, setDepartureDate] = useState("2026-07-20");
  const [returnDate, setReturnDate] = useState("2026-07-27");
  
  const [showPaxDrop, setShowPaxDrop] = useState(false);
  const [adults, setAdults] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [cabinClass, setCabinClass] = useState("Business");

  const [swapRotate, setSwapRotate] = useState(0);

  const handleSwap = () => {
    setSwapRotate((prev) => prev + 180);
    const temp = fromSelected;
    setFromSelected(toSelected);
    setToSelected(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching flights from ${fromSelected.code} to ${toSelected.code} (${tripType}, Class: ${cabinClass}, Passengers: ${adults + childrenCount})`);
  };

  return (
    <section id="flights" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 -mt-24 md:-mt-32 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <GlassCard className="p-8 md:p-10 relative overflow-visible" hoverEffect={false}>
          {/* Tab Toggles */}
          <div className="flex justify-start gap-2 mb-8 border-b border-white/10 pb-4">
            {(["round-trip", "one-way", "multi-city"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setTripType(type)}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-widest rounded-lg transition-all duration-300 ${
                  tripType === type
                    ? "bg-white/10 text-white border border-white/20"
                    : "text-white/50 hover:text-white/80 border border-transparent"
                }`}
              >
                {type.replace("-", " ")}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
              {/* Departure Port */}
              <div className="relative">
                <label className="block text-white/50 font-mono text-[10px] uppercase tracking-wider mb-2">From</label>
                <div
                  onClick={() => {
                    setShowFromDrop(true);
                    setShowToDrop(false);
                    setShowPaxDrop(false);
                  }}
                  className="flex items-center gap-3 bg-white/5 border border-white/15 rounded-xl px-4 py-3 cursor-pointer hover:border-white/30 transition-all duration-300"
                >
                  <Plane className="w-4 h-4 text-white/40" />
                  <div className="text-left">
                    <div className="text-white font-mono text-sm font-bold">{fromSelected.code}</div>
                    <div className="text-white/60 text-xs truncate max-w-[130px]">{fromSelected.city}</div>
                  </div>
                </div>

                <AnimatePresence>
                  {showFromDrop && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 right-0 mt-2 z-50 rounded-xl bg-black/90 border border-white/20 p-2 backdrop-blur-md max-h-60 overflow-y-auto"
                    >
                      {AIRPORTS.map((ap) => (
                        <div
                          key={ap.code}
                          onClick={() => {
                            setFromSelected(ap);
                            setShowFromDrop(false);
                          }}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-all duration-200"
                        >
                          <div>
                            <div className="text-white font-mono text-sm font-bold">{ap.code}</div>
                            <div className="text-white/60 text-xs">{ap.name}</div>
                          </div>
                          {fromSelected.code === ap.code && <Check className="w-4 h-4 text-white" />}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Swap Button (between From & To) */}
              <div className="flex justify-center md:mb-3">
                <motion.button
                  type="button"
                  onClick={handleSwap}
                  animate={{ rotate: swapRotate }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="p-3 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white transition-all duration-300"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Arrival Port */}
              <div className="relative">
                <label className="block text-white/50 font-mono text-[10px] uppercase tracking-wider mb-2">To</label>
                <div
                  onClick={() => {
                    setShowToDrop(true);
                    setShowFromDrop(false);
                    setShowPaxDrop(false);
                  }}
                  className="flex items-center gap-3 bg-white/5 border border-white/15 rounded-xl px-4 py-3 cursor-pointer hover:border-white/30 transition-all duration-300"
                >
                  <Plane className="w-4 h-4 text-white/40 rotate-90" />
                  <div className="text-left">
                    <div className="text-white font-mono text-sm font-bold">{toSelected.code}</div>
                    <div className="text-white/60 text-xs truncate max-w-[130px]">{toSelected.city}</div>
                  </div>
                </div>

                <AnimatePresence>
                  {showToDrop && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 right-0 mt-2 z-50 rounded-xl bg-black/90 border border-white/20 p-2 backdrop-blur-md max-h-60 overflow-y-auto"
                    >
                      {AIRPORTS.map((ap) => (
                        <div
                          key={ap.code}
                          onClick={() => {
                            setToSelected(ap);
                            setShowToDrop(false);
                          }}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-all duration-200"
                        >
                          <div>
                            <div className="text-white font-mono text-sm font-bold">{ap.code}</div>
                            <div className="text-white/60 text-xs">{ap.name}</div>
                          </div>
                          {toSelected.code === ap.code && <Check className="w-4 h-4 text-white" />}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Departure Date */}
              <div>
                <label className="block text-white/50 font-mono text-[10px] uppercase tracking-wider mb-2">Departure</label>
                <div className="flex items-center gap-3 bg-white/5 border border-white/15 rounded-xl px-4 py-3 hover:border-white/30 transition-all duration-300 relative">
                  <Calendar className="w-4 h-4 text-white/40" />
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="bg-transparent text-white font-mono text-sm outline-none w-full [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Return Date */}
              <div>
                <label className={`block font-mono text-[10px] uppercase tracking-wider mb-2 ${tripType === "one-way" ? "text-white/20" : "text-white/50"}`}>Return</label>
                <div
                  className={`flex items-center gap-3 border rounded-xl px-4 py-3 transition-all duration-300 relative ${
                    tripType === "one-way"
                      ? "bg-white/2 border-white/5 opacity-40 pointer-events-none"
                      : "bg-white/5 border-white/15 hover:border-white/30"
                  }`}
                >
                  <Calendar className="w-4 h-4 text-white/40" />
                  <input
                    type="date"
                    value={returnDate}
                    disabled={tripType === "one-way"}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="bg-transparent text-white font-mono text-sm outline-none w-full [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 pt-4 items-end">
              {/* Passengers & Class Selection */}
              <div className="relative md:col-span-3">
                <label className="block text-white/50 font-mono text-[10px] uppercase tracking-wider mb-2">Passengers & Class</label>
                <div
                  onClick={() => {
                    setShowPaxDrop(!showPaxDrop);
                    setShowFromDrop(false);
                    setShowToDrop(false);
                  }}
                  className="flex items-center gap-3 bg-white/5 border border-white/15 rounded-xl px-4 py-3 cursor-pointer hover:border-white/30 transition-all duration-300"
                >
                  <Users className="w-4 h-4 text-white/40" />
                  <div className="flex-1 flex justify-between text-sm font-mono">
                    <span className="text-white font-bold">{adults + childrenCount} Traveler{adults + childrenCount > 1 ? "s" : ""}</span>
                    <span className="text-white/60">{cabinClass}</span>
                  </div>
                </div>

                <AnimatePresence>
                  {showPaxDrop && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 right-0 mt-2 z-50 rounded-xl bg-black/90 border border-white/20 p-6 backdrop-blur-md"
                    >
                      <div className="space-y-4">
                        {/* Adults */}
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-white text-sm font-bold">Adults</div>
                            <div className="text-white/40 text-xs">Age 12+</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setAdults(Math.max(1, adults - 1))}
                              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10"
                            >
                              -
                            </button>
                            <span className="text-white font-mono w-4 text-center">{adults}</span>
                            <button
                              type="button"
                              onClick={() => setAdults(adults + 1)}
                              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Children */}
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-white text-sm font-bold">Children</div>
                            <div className="text-white/40 text-xs">Age 2-11</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10"
                            >
                              -
                            </button>
                            <span className="text-white font-mono w-4 text-center">{childrenCount}</span>
                            <button
                              type="button"
                              onClick={() => setChildrenCount(childrenCount + 1)}
                              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <hr className="border-white/10" />

                        {/* Class Toggles */}
                        <div>
                          <div className="text-white text-sm font-bold mb-3">Cabin Class</div>
                          <div className="grid grid-cols-3 gap-2">
                            {["Economy", "Business", "First"].map((cls) => (
                              <button
                                key={cls}
                                type="button"
                                onClick={() => setCabinClass(cls)}
                                className={`py-2 rounded-lg font-mono text-xs uppercase tracking-wider border transition-all duration-300 ${
                                  cabinClass === cls
                                    ? "bg-white/10 border-white/40 text-white"
                                    : "border-white/10 text-white/50 hover:text-white"
                                }`}
                              >
                                {cls}
                              </button>
                            ))}
                          </div>
                        </div>

                        <GlassButton
                          variant="primary"
                          className="w-full text-center py-2"
                          onClick={() => setShowPaxDrop(false)}
                        >
                          Confirm
                        </GlassButton>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Search */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-transparent border border-white/30 text-white hover:bg-white hover:text-black hover:border-white font-mono text-sm tracking-widest uppercase rounded-xl py-3 px-6 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Search Flights
                </button>
              </div>
            </div>
          </form>
        </GlassCard>
      </motion.div>
    </section>
  );
}
