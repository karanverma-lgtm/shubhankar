"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { content } from "@/data/content";

// --- Helper component to split string into animated character spans ---
function SplitText({
  text,
  className = "",
  spanClassName = "",
}: {
  text: string;
  className?: string;
  spanClassName?: string;
}) {
  return (
    <span className={`inline-block ${className}`}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`inline-block split-char ${spanClassName}`}
          style={{ opacity: 0, transform: "translateY(24px)" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

// --- Inline SVG Flourishes with Animatable Paths ---
function LineFlourishSVG({
  pathRef,
  className = "w-48 h-4",
}: {
  pathRef?: React.RefObject<SVGPathElement>;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} mx-auto text-gold opacity-90`}
    >
      <path
        ref={pathRef}
        d="M0 8H85M115 8H200"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
      />
      <circle cx="100" cy="8" r="3" fill="currentColor" className="flourish-icon" style={{ opacity: 0 }} />
      <path
        d="M93 8L100 2L107 8L100 14L93 8Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="flourish-icon"
        style={{ opacity: 0 }}
      />
    </svg>
  );
}

function HeartOrnamentSVG({
  ornamentRef,
  className = "w-12 h-6",
}: {
  ornamentRef?: React.RefObject<SVGSVGElement>;
  className?: string;
}) {
  return (
    <svg
      ref={ornamentRef}
      viewBox="0 0 40 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} mx-auto text-gold opacity-85`}
      style={{ opacity: 0, transform: "scale(0.5)" }}
    >
      <path
        d="M20 15C20 15 13 10 13 6.5C13 4.5 14.5 3 16.5 3C18 3 19.3 3.8 20 5C20.7 3.8 22 3 23.5 3C25.5 3 27 4.5 27 6.5C27 10 20 15 20 15Z"
        fill="currentColor"
      />
      <path
        d="M5 10C9 10 12 7 12 7M35 10C31 10 28 7 28 7"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PinIconSVG({ className = "w-4 h-4" }: { className?: string }) {
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
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLHeadingElement>(null);
  const subEyebrowRef = useRef<HTMLParagraphElement>(null);
  const flourishPathRef = useRef<SVGPathElement>(null);
  const firstNameRef = useRef<HTMLDivElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);
  const secondNameRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<SVGSVGElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startAnimation) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1,
      });

      // 1. Card container backdrop fade in
      if (cardRef.current) {
        tl.fromTo(
          cardRef.current,
          { opacity: 0, y: 30, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9 }
        );
      }

      // 2. Eyebrow "Save the Date"
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        );
      }

      // 3. SVG flourish line drawing
      if (flourishPathRef.current) {
        tl.to(
          flourishPathRef.current,
          { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" },
          "-=0.3"
        );
        tl.to(
          ".flourish-icon",
          { opacity: 1, duration: 0.4, stagger: 0.1 },
          "-=0.4"
        );
      }

      // 4. Sub-eyebrow "To celebrate the wedding of"
      if (subEyebrowRef.current) {
        tl.fromTo(
          subEyebrowRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.4"
        );
      }

      // 5. First Name ("SHUBHANKAR") staggered character reveal
      if (firstNameRef.current) {
        const chars = firstNameRef.current.querySelectorAll(".split-char");
        tl.to(
          chars,
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: "back.out(1.4)" },
          "-=0.2"
        );
      }

      // 6. Script Connector ("~ and ~")
      if (connectorRef.current) {
        tl.fromTo(
          connectorRef.current,
          { opacity: 0, scale: 0.8, y: 10 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6 },
          "-=0.2"
        );
      }

      // 7. Second Name ("SHOURYA") staggered character reveal
      if (secondNameRef.current) {
        const chars = secondNameRef.current.querySelectorAll(".split-char");
        tl.to(
          chars,
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: "back.out(1.4)" },
          "-=0.2"
        );
      }

      // 8. Heart Ornament scale in
      if (heartRef.current) {
        tl.to(
          heartRef.current,
          { opacity: 0.85, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.2"
        );
      }

      // 9. Date Block reveal
      if (dateRef.current) {
        tl.fromTo(
          dateRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        );
      }

      // 10. Location reveal
      if (locationRef.current) {
        tl.fromTo(
          locationRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        );
      }

      // 11. Action Buttons reveal
      if (actionsRef.current) {
        tl.fromTo(
          actionsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2"
        );
      }

      // 12. Footer details reveal
      if (footerRef.current) {
        tl.fromTo(
          footerRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [startAnimation]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center pointer-events-none px-4 py-10 z-10"
    >
      {/* Outer Golden Ambient Frame */}
      <div className="fixed inset-4 border border-gold/40 pointer-events-none rounded-2xl z-40 hidden sm:block" />
      <div className="fixed inset-6 border border-gold/25 pointer-events-none rounded-xl z-40 hidden sm:block" />

      {/* Main Invitation Card Layer */}
      <div
        ref={cardRef}
        style={{ opacity: 0 }}
        className="relative max-w-xl md:max-w-2xl w-full text-center p-7 sm:p-10 md:p-12 rounded-3xl bg-ivory/85 backdrop-blur-md border border-gold/30 shadow-[0_25px_60px_rgba(123,30,58,0.15)] pointer-events-auto transition-all duration-300 space-y-5 sm:space-y-6 my-auto"
      >
        {/* Subtle Decorative Corner Accents */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold/50 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold/50 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gold/50 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold/50 rounded-br-sm pointer-events-none" />

        {/* Eyebrow Header */}
        <div className="space-y-2">
          <h2
            ref={eyebrowRef}
            style={{ opacity: 0 }}
            className="text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold text-gold font-serif drop-shadow-xs"
          >
            {content.eyebrow}
          </h2>
          <LineFlourishSVG pathRef={flourishPathRef} className="w-44 sm:w-56 h-4" />
          <p
            ref={subEyebrowRef}
            style={{ opacity: 0 }}
            className="text-sm sm:text-base md:text-lg text-maroon/80 font-serif italic tracking-wide"
          >
            {content.subEyebrow}
          </p>
        </div>

        {/* Couple Names */}
        <div className="py-1 space-y-1 sm:space-y-2 overflow-hidden">
          <div ref={firstNameRef}>
            <h1 className="text-[clamp(2.2rem,5.5vw,4.2rem)] font-bold uppercase tracking-[0.12em] text-maroon font-serif leading-none drop-shadow-[0_2px_4px_rgba(251,246,236,0.9)]">
              <SplitText text={content.names.first} />
            </h1>
          </div>

          <div
            ref={connectorRef}
            style={{ opacity: 0 }}
            className="font-script text-[clamp(2rem,4.5vw,3.2rem)] text-gold py-0.5 drop-shadow-xs select-none"
          >
            ~ {content.names.connector} ~
          </div>

          <div ref={secondNameRef}>
            <h1 className="text-[clamp(2.2rem,5.5vw,4.2rem)] font-bold uppercase tracking-[0.12em] text-maroon font-serif leading-none drop-shadow-[0_2px_4px_rgba(251,246,236,0.9)]">
              <SplitText text={content.names.second} />
            </h1>
          </div>
        </div>

        {/* Heart / Floral Divider */}
        <HeartOrnamentSVG ornamentRef={heartRef} className="w-12 sm:w-16 h-5" />

        {/* Date & Year Section */}
        <div ref={dateRef} style={{ opacity: 0 }} className="space-y-1.5">
          <div className="flex items-center justify-center gap-3 sm:gap-6 text-maroon font-serif">
            <span className="uppercase text-xs sm:text-sm md:text-base tracking-[0.2em] font-semibold text-maroon/90">
              {content.date.day}
            </span>
            <span className="h-6 w-px bg-gold/50" />
            <span className="text-[clamp(2rem,4.5vw,3.2rem)] font-bold text-gold leading-none font-serif drop-shadow-xs">
              {content.date.date}
            </span>
            <span className="h-6 w-px bg-gold/50" />
            <span className="uppercase text-xs sm:text-sm md:text-base tracking-[0.2em] font-semibold text-maroon/90">
              {content.date.month}
            </span>
          </div>

          <div className="text-sm sm:text-base tracking-[0.3em] font-bold text-gold font-serif">
            {content.date.year}
          </div>
        </div>

        {/* Location Section */}
        <div
          ref={locationRef}
          style={{ opacity: 0 }}
          className="flex items-center justify-center gap-2 text-maroon font-serif text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase font-semibold"
        >
          <PinIconSVG className="w-4 h-4 text-gold shrink-0" />
          <span>{content.location}</span>
        </div>

        {/* Interactive Action Buttons (Framer Motion Micro-Interactions) */}
        <div
          ref={actionsRef}
          style={{ opacity: 0 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2 pointer-events-auto"
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(184, 147, 90, 0.35)" }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-maroon text-ivory text-xs sm:text-sm font-serif tracking-wider uppercase font-medium shadow-md border border-gold/40 transition-colors hover:bg-maroon/90"
          >
            <CalendarIconSVG className="w-4 h-4 text-gold" />
            <span>Add to Calendar</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(184, 147, 90, 0.35)" }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-ivory text-maroon text-xs sm:text-sm font-serif tracking-wider uppercase font-medium shadow-md border border-gold/60 transition-colors hover:bg-ivory/90"
          >
            <PinIconSVG className="w-4 h-4 text-gold" />
            <span>View Location</span>
          </motion.button>
        </div>

        {/* Footer Details */}
        <div ref={footerRef} style={{ opacity: 0 }} className="pt-1 space-y-2">
          <LineFlourishSVG className="w-40 sm:w-48 h-3 opacity-75" />
          <div className="space-y-0.5 text-xs sm:text-sm text-maroon/75 font-serif italic tracking-wide">
            <p>{content.footerLine1}</p>
            <p>{content.footerLine2}</p>
          </div>
        </div>
      </div>

      {/* Floating Scroll Cue Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="fixed bottom-6 z-40 text-center pointer-events-none hidden sm:block"
      >
        <div className="w-5 h-8 border border-gold/60 rounded-full mx-auto flex items-start justify-center p-1 backdrop-blur-xs bg-ivory/40">
          <div className="w-1 h-2 bg-gold rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}
