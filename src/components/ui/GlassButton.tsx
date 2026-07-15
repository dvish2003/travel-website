"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlassButtonProps {
  variant: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function GlassButton({
  variant,
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: GlassButtonProps) {
  const baseClasses =
    "px-6 py-3 font-mono text-sm tracking-wider uppercase rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed";

  const primaryStyle = {
    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    color: "#FFFFFF",
  };

  const secondaryStyle = {
    background: "transparent",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    color: "#FFFFFF",
  };

  if (variant === "primary") {
    return (
      <motion.button
        type={type}
        style={primaryStyle}
        onClick={onClick}
        disabled={disabled}
        whileHover={{
          scale: 1.03,
          borderColor: "rgba(255, 255, 255, 0.6)",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.15)",
        }}
        whileTap={{ scale: 0.98 }}
        className={`${baseClasses} ${className}`}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.button
      type={type}
      style={secondaryStyle}
      onClick={onClick}
      disabled={disabled}
      whileHover={{
        scale: 1.02,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderColor: "rgba(255, 255, 255, 0.8)",
      }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </motion.button>
  );
}
