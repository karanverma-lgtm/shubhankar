"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const LOVE_QUOTES = [
  "Together is our favorite place to be! ❤️",
  "Counting down the days! 💍",
  "Can't wait to celebrate with you! ✨",
  "Forever & Always! 🥂",
  "See you in Gurgaon! 📍",
];

export default function InteractiveCouple() {
  const [activeQuote, setActiveQuote] = useState<string | null>(null);
  const [heartCount, setHeartCount] = useState(0);

  const handleCoupleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 1. Pick a random love quote
    const nextQuote = LOVE_QUOTES[Math.floor(Math.random() * LOVE_QUOTES.length)];
    setActiveQuote(nextQuote);

    // 2. Increment heart burst counter
    setHeartCount((prev) => prev + 1);

    // 3. Mini heart confetti pop from click coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 20,
      spread: 45,
      origin: { x, y },
      colors: ["#7B1E3A", "#B8935A", "#E89DA2"],
      shapes: ["circle"],
    });

    // Dismiss quote bubble after 3 seconds
    setTimeout(() => {
      setActiveQuote(null);
    }, 3000);
  };

  return (
    <div className="fixed top-5 left-5 z-50 pointer-events-auto flex items-center gap-3">
      {/* Couple Interactive Avatar Button */}
      <motion.button
        onClick={handleCoupleClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative flex items-center gap-2 p-1.5 sm:p-2 rounded-full bg-ivory/90 backdrop-blur-md border border-gold/40 shadow-md group focus:outline-none"
        title="Tap us!"
      >
        {/* Avatars */}
        <div className="relative flex -space-x-2">
          {/* Groom Avatar */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-maroon text-gold flex items-center justify-center font-serif text-xs font-bold border-2 border-ivory shadow-xs">
            S
          </div>

          {/* Bride Avatar */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gold text-ivory flex items-center justify-center font-serif text-xs font-bold border-2 border-ivory shadow-xs">
            S
          </div>
        </div>

        <span className="hidden sm:inline text-xs font-serif text-maroon font-bold pr-1">
          Shubhankar & Shourya
        </span>

        {/* Pulse Dot */}
        <span className="w-2 h-2 rounded-full bg-gold animate-ping mr-1" />
      </motion.button>

      {/* Floating Love Quote Bubble */}
      <AnimatePresence>
        {activeQuote && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            className="hidden sm:block px-3 py-1.5 rounded-2xl bg-maroon text-ivory text-xs font-serif italic shadow-lg border border-gold/40 pointer-events-none"
          >
            {activeQuote}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
