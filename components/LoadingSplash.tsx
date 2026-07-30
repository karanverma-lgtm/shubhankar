"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingSplashProps {
  isVisible: boolean;
  onExitComplete?: () => void;
}

export default function LoadingSplash({
  isVisible,
  onExitComplete,
}: LoadingSplashProps) {
  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isVisible && (
        <motion.div
          key="loading-splash"
          initial={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(12px)", transition: { duration: 0.85, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] bg-ivory flex flex-col items-center justify-center pointer-events-auto p-4"
        >
          {/* Subtle Ambient Border */}
          <div className="absolute inset-6 border border-gold/30 rounded-2xl pointer-events-none" />

          <div className="text-center space-y-6 max-w-sm">
            {/* Monogram Header */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-2"
            >
              <span className="font-script text-6xl md:text-7xl text-gold tracking-wider drop-shadow-xs block">
                S & S
              </span>
              <div className="h-px w-20 bg-gold/50 mx-auto" />
            </motion.div>

            {/* Subtext & Pulse Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-3"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-maroon/70 font-serif font-medium">
                Shubhankar & Shourya
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}
                  className="w-2 h-2 rounded-full bg-gold"
                />
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
                  className="w-2 h-2 rounded-full bg-gold"
                />
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
                  className="w-2 h-2 rounded-full bg-gold"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
