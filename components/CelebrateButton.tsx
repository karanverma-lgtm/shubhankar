"use client";

import React from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function CelebrateButton() {
  const triggerFireworks = () => {
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 40 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
        colors: ["#B8935A", "#7B1E3A", "#F7DCE0", "#FFFFFF"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
        colors: ["#B8935A", "#7B1E3A", "#FFE2A8", "#4A5D3A"],
      });
    }, 250);
  };

  return (
    <div className="fixed top-5 right-5 z-50 pointer-events-auto">
      <motion.button
        onClick={triggerFireworks}
        whileHover={{ scale: 1.08, boxShadow: "0 0 25px rgba(184, 147, 90, 0.5)" }}
        whileTap={{ scale: 0.92 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold/90 text-ivory text-xs sm:text-sm font-serif font-semibold tracking-wider shadow-lg border border-ivory/40 backdrop-blur-md transition-all hover:bg-gold"
      >
        <span className="text-base animate-bounce">🎉</span>
        <span className="hidden sm:inline uppercase">Celebrate</span>
      </motion.button>
    </div>
  );
}
