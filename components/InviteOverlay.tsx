"use client";

import React from "react";
import { motion } from "framer-motion";
import { downloadIcsCalendar } from "@/lib/ics";

function CalendarIconSVG({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19 4H5C3.89 4 3 4.89 3 6V20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.89 20.1 4 19 4ZM19 20H5V9H19V20ZM19 7H5V6H19V7ZM7 2H9V5H7V2ZM15 2H17V5H15V2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export interface InviteOverlayProps {
  startAnimation?: boolean;
}

export default function InviteOverlay({ startAnimation = true }: InviteOverlayProps) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
      <motion.button
        onClick={downloadIcsCalendar}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.06, boxShadow: "0 0 25px rgba(184, 147, 90, 0.4)" }}
        whileTap={{ scale: 0.94 }}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7B1E3A] text-[#FBF6EC] text-xs sm:text-sm font-serif tracking-widest uppercase font-semibold shadow-xl border border-[#B8935A]/50 backdrop-blur-md transition-all"
      >
        <CalendarIconSVG className="w-4 h-4 text-[#B8935A]" />
        <span>Add to Calendar</span>
      </motion.button>
    </div>
  );
}
