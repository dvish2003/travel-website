"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hoverEffect = true,
}: GlassCardProps) {
  const cardStyle = {
    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(20px) saturate(120%)",
    WebkitBackdropFilter: "blur(20px) saturate(120%)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "24px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
  };

  if (!hoverEffect) {
    return (
      <div style={cardStyle} className={`transition-all duration-300 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      style={cardStyle}
      whileHover={{
        y: -6,
        borderColor: "rgba(255, 255, 255, 0.30)",
        backgroundColor: "rgba(255, 255, 255, 0.10)",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`transition-colors duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}
