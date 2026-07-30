"use client";

import React from "react";
import { motion } from "framer-motion";
import { useActiveScreenStore } from "@/lib/store";

const SCREENS = [
  { id: 0, label: "Save Date", icon: "✦" },
  { id: 1, label: "She Said Yes", icon: "💍" },
  { id: 2, label: "Our Story", icon: "📖" },
  { id: 3, label: "Countdown", icon: "⏳" },
  { id: 4, label: "Where & When", icon: "📍" },
];

export default function NavBubbles() {
  const { activeIndex, setActiveIndex } = useActiveScreenStore();

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <div className="flex items-center gap-1.5 sm:gap-3 p-2 sm:p-2.5 rounded-full bg-ivory/90 backdrop-blur-md border border-gold/40 shadow-[0_15px_35px_rgba(123,30,58,0.2)]">
        {SCREENS.map((screen) => {
          const isActive = activeIndex === screen.id;

          return (
            <motion.button
              key={screen.id}
              onClick={() => setActiveIndex(screen.id)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-serif transition-colors ${
                isActive
                  ? "bg-maroon text-ivory font-bold shadow-md"
                  : "text-maroon/80 hover:text-maroon hover:bg-gold/15"
              }`}
            >
              {/* Active Indicator Ring Backdrop */}
              {isActive && (
                <motion.div
                  layoutId="activeBubble"
                  className="absolute inset-0 rounded-full border border-gold shadow-sm pointer-events-none"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}

              <span className="text-sm sm:text-base">{screen.icon}</span>
              <span className="hidden md:inline tracking-wider uppercase text-[11px] sm:text-xs">
                {screen.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
