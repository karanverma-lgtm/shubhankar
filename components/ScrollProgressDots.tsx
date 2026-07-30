"use client";

import React from "react";
import { motion } from "framer-motion";
import { useActiveScreenStore } from "@/lib/store";

const SCREENS = [
  { id: 0, label: "Hero" },
  { id: 1, label: "She Said Yes" },
  { id: 2, label: "Our Story" },
  { id: 3, label: "Countdown" },
  { id: 4, label: "Where & When" },
];

export default function ScrollProgressDots() {
  const { activeIndex } = useActiveScreenStore();

  const handleDotClick = (index: number) => {
    const el = document.getElementById(`screen-${index + 1}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3.5 pointer-events-auto">
      {SCREENS.map((screen, idx) => {
        const isActive = activeIndex === idx;

        return (
          <button
            key={screen.id}
            onClick={() => handleDotClick(idx)}
            aria-label={`Scroll to ${screen.label}`}
            className="group relative flex items-center justify-center p-1 focus:outline-none"
          >
            {/* Tooltip on Hover */}
            <span className="absolute right-7 px-2.5 py-1 rounded bg-maroon/90 text-ivory text-xs font-serif tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
              {screen.label}
            </span>

            {/* Dot Indicator */}
            <motion.div
              animate={{
                scale: isActive ? 1.4 : 1,
                backgroundColor: isActive ? "#B8935A" : "rgba(123, 30, 58, 0.35)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-2.5 h-2.5 rounded-full border border-gold/40 shadow-xs"
            />
          </button>
        );
      })}
    </div>
  );
}
