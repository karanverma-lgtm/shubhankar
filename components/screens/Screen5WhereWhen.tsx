"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { motion } from "framer-motion";
import { content } from "@/data/content";
import { useActiveScreenStore } from "@/lib/store";
import { downloadIcsCalendar } from "@/lib/ics";
import LottiePlayer from "@/components/LottiePlayer";

// --- Inline SVG Flourishes ---
function LineFlourishSVG({ className = "w-48 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} mx-auto text-gold opacity-90`}
    >
      <path
        d="M0 8H85M115 8H200"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="100" cy="8" r="3" fill="currentColor" />
      <path
        d="M93 8L100 2L107 8L100 14L93 8Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

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

function PinIconSVG({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CarIconSVG({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`${className} text-maroon`}
    >
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM7.5 17C6.67 17 6 16.33 6 15.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );
}

export default function Screen5WhereWhen() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const roadPathRef = useRef<SVGPathElement>(null);
  const carContainerRef = useRef<HTMLDivElement>(null);
  const pinMarkerRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);

  const { setActiveIndex, setBgColor } = useActiveScreenStore();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=130%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          onToggle: (self) => {
            if (self.isActive) {
              setActiveIndex(4);
              setBgColor("#FBF6EC");
            }
          },
          onEnter: () => {
            setActiveIndex(4);
            setBgColor("#FBF6EC");
          },
        },
      });

      // 1. Card backdrop entrance
      if (cardRef.current) {
        tl.fromTo(
          cardRef.current,
          { opacity: 0, y: 40, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 }
        );
      }

      // 2. MotionPath Car Travel along illustrated SVG road path
      if (carContainerRef.current && roadPathRef.current) {
        tl.to(
          carContainerRef.current,
          {
            motionPath: {
              path: roadPathRef.current,
              align: roadPathRef.current,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
            },
            duration: 1.2,
            ease: "none",
          },
          "-=0.2"
        );
      }

      // 3. Pin Marker bounce drop-in at destination (~80% progress)
      if (pinMarkerRef.current) {
        tl.fromTo(
          pinMarkerRef.current,
          { opacity: 0, y: -40, scale: 0.5 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.8)" },
          "-=0.3"
        );
      }

      // 4. Character wave motif reveal
      if (characterRef.current) {
        tl.fromTo(
          characterRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.4 },
          "-=0.2"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [setActiveIndex, setBgColor]);

  return (
    <section
      id="screen-5"
      ref={sectionRef}
      className="h-screen w-full relative flex flex-col items-center justify-center px-4 overflow-hidden bg-ivory"
    >
      {/* Outer Golden Ambient Frame */}
      <div className="fixed inset-4 border border-gold/40 pointer-events-none rounded-2xl z-40 hidden sm:block" />
      <div className="fixed inset-6 border border-gold/25 pointer-events-none rounded-xl z-40 hidden sm:block" />

      {/* Main Card Layer */}
      <div
        ref={cardRef}
        style={{ opacity: 0 }}
        className="relative max-w-xl md:max-w-2xl w-full text-center p-7 sm:p-11 rounded-3xl bg-ivory/85 backdrop-blur-md border border-gold/30 shadow-[0_25px_60px_rgba(123,30,58,0.15)] pointer-events-auto transition-all duration-300 space-y-5 my-auto z-10"
      >
        {/* Subtle Decorative Corner Accents */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold/50 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold/50 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gold/50 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold/50 rounded-br-sm pointer-events-none" />

        {/* Section Header */}
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-gold font-serif">
            Final Chapter
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-maroon font-serif">
            {content.screen5.title}
          </h2>
          <p className="text-sm sm:text-base text-gold font-script">
            ~ {content.screen5.venue} ~
          </p>
        </div>

        {/* Illustrated SVG Map with MotionPath Dotted Route */}
        <div className="relative w-full h-44 sm:h-52 rounded-2xl bg-ivory/90 border border-gold/30 overflow-hidden p-3 shadow-inner flex items-center justify-center">
          {/* Soft Map Doodles Background */}
          <div className="absolute inset-0 pointer-events-none opacity-15 bg-[radial-gradient(#B8935A_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* SVG Dotted Road Path */}
          <svg viewBox="0 0 500 180" className="absolute inset-0 w-full h-full">
            <path
              ref={roadPathRef}
              d="M 30 140 Q 140 20, 260 140 T 430 80"
              fill="none"
              stroke="#B8935A"
              strokeWidth="3"
              strokeDasharray="6 6"
              className="opacity-75"
            />
          </svg>

          {/* MotionPath Animated Car Element */}
          <div
            ref={carContainerRef}
            className="absolute z-20 top-0 left-0 -translate-x-1/2 -translate-y-1/2"
          >
            <LottiePlayer
              src="/lottie/car-travel.json"
              className="w-12 h-12"
              fallbackColor="#7B1E3A"
            />
          </div>

          {/* Destination Pin Marker at Gurgaon */}
          <div
            ref={pinMarkerRef}
            style={{ opacity: 0 }}
            className="absolute right-8 top-10 flex flex-col items-center z-20"
          >
            <div className="flex items-center gap-1 bg-maroon text-ivory px-3 py-1 rounded-full text-xs font-serif font-bold tracking-widest shadow-md border border-gold/40">
              <PinIconSVG className="w-3.5 h-3.5 text-gold" />
              <span>GURGAON</span>
            </div>
            <div className="w-2 h-2 rotate-45 bg-maroon -mt-1" />
          </div>

          {/* Waving Character Motif */}
          <div
            ref={characterRef}
            style={{ opacity: 0 }}
            className="absolute right-24 bottom-3 z-20"
          >
            <LottiePlayer
              src="/lottie/character-wave.json"
              className="w-14 h-14"
              fallbackColor="#B8935A"
            />
          </div>
        </div>

        {/* Location Subtext */}
        <div className="space-y-1 pt-1">
          <p className="text-lg sm:text-xl font-serif font-semibold text-maroon tracking-wider uppercase">
            {content.screen5.city}
          </p>

          {/* Add to Calendar (.ics Download) Button */}
          <div className="pt-2">
            <motion.button
              onClick={downloadIcsCalendar}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(184, 147, 90, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-maroon text-ivory text-xs sm:text-sm font-serif tracking-widest uppercase font-semibold shadow-md border border-gold/40 transition-colors hover:bg-maroon/90"
            >
              <CalendarIconSVG className="w-4 h-4 text-gold" />
              <span>Add to Calendar</span>
            </motion.button>
          </div>
        </div>

        {/* Closing Copy & Footer Flourish (Matching Screen 1 Home Beat) */}
        <div className="pt-2 space-y-2">
          <LineFlourishSVG className="w-40 sm:w-48 h-3 opacity-75" />
          <div className="space-y-0.5 text-xs sm:text-sm text-maroon/75 font-serif italic tracking-wide">
            <p>{content.footerLine1}</p>
            <p>{content.footerLine2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
