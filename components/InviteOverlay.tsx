"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { content } from "@/data/content";
import { downloadIcsCalendar } from "@/lib/ics";

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
          style={{ opacity: 0, transform: "translateY(24px) rotateX(-90deg)" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

// --- Animated SVG Flourish Components ---
function DiamondFlourishSVG({
  pathRef,
  className = "w-44 sm:w-52 h-4",
}: {
  pathRef?: React.RefObject<SVGPathElement>;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 240 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} mx-auto text-[#B8935A] opacity-95`}
    >
      <path
        ref={pathRef}
        d="M0 8H105M135 8H240"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        style={{ strokeDasharray: 240, strokeDashoffset: 240 }}
      />
      <circle cx="120" cy="8" r="3" fill="currentColor" className="flourish-node" style={{ opacity: 0 }} />
      <path
        d="M112 8L120 2L128 8L120 14L112 8Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        className="flourish-node"
        style={{ opacity: 0 }}
      />
      <circle cx="106" cy="8" r="1.5" fill="currentColor" className="flourish-node" style={{ opacity: 0 }} />
      <circle cx="134" cy="8" r="1.5" fill="currentColor" className="flourish-node" style={{ opacity: 0 }} />
    </svg>
  );
}

function HeartFlourishSVG({
  pathRef,
  className = "w-36 sm:w-44 h-4.5",
}: {
  pathRef?: React.RefObject<SVGPathElement>;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} mx-auto text-[#B8935A] opacity-95`}
    >
      <path
        ref={pathRef}
        d="M0 10H85M115 10H200"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
      />
      <motion.path
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        d="M100 15C100 15 93 10 93 6.5C93 4.5 94.5 3 96.5 3C98 3 99.3 3.8 100 5C100.7 3.8 102 3 103.5 3C105.5 3 107 4.5 107 6.5C107 10 100 15 100 15Z"
        fill="#7B1E3A"
        stroke="currentColor"
        strokeWidth="0.8"
        className="heart-node"
        style={{ transformOrigin: "100px 10px", opacity: 0 }}
      />
    </svg>
  );
}

function BottomFlourishSVG({ className = "w-32 sm:w-36 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} mx-auto text-[#B8935A] opacity-90`}
    >
      <path
        d="M0 8C30 8 45 3 60 8C75 13 82 8 90 8C98 8 105 13 120 8C135 3 150 8 180 8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M90 12C90 12 86 9 86 7C86 5.8 86.8 5 88 5C88.8 5 89.5 5.4 90 6C90.5 5.4 91.2 5 92 5C93.2 5 94 5.8 94 7C94 9 90 12 90 12Z"
        fill="#7B1E3A"
      />
    </svg>
  );
}

function MapPinIconSVG({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
        fill="#7B1E3A"
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
  const contentBoxRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLHeadingElement>(null);
  const subEyebrowRef = useRef<HTMLParagraphElement>(null);
  const flourishPath1Ref = useRef<SVGPathElement>(null);
  const flourishPath2Ref = useRef<SVGPathElement>(null);
  const firstNameRef = useRef<HTMLDivElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);
  const secondNameRef = useRef<HTMLDivElement>(null);
  const dateBlockRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startAnimation) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });

      // 1. Container reveal
      if (contentBoxRef.current) {
        tl.fromTo(
          contentBoxRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.8 }
        );
      }

      // 2. Eyebrow "SAVE THE DATE"
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 15, letterSpacing: "0.2em" },
          { opacity: 1, y: 0, letterSpacing: "0.38em", duration: 0.7 },
          "-=0.4"
        );
      }

      // 3. Draw SVG Flourish Line 1
      if (flourishPath1Ref.current) {
        tl.to(
          flourishPath1Ref.current,
          { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" },
          "-=0.3"
        );
        tl.to(
          ".flourish-node",
          { opacity: 1, duration: 0.4, stagger: 0.08 },
          "-=0.4"
        );
      }

      // 4. Sub-eyebrow "TO CELEBRATE THE WEDDING OF"
      if (subEyebrowRef.current) {
        tl.fromTo(
          subEyebrowRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        );
      }

      // 5. Staggered 3D Name Reveal: "SHUBHANKAR"
      if (firstNameRef.current) {
        const chars = firstNameRef.current.querySelectorAll(".split-char");
        tl.to(
          chars,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.55,
            stagger: 0.04,
            ease: "back.out(1.5)",
          },
          "-=0.2"
        );
      }

      // 6. Calligraphic Connector: "~ and ~"
      if (connectorRef.current) {
        tl.fromTo(
          connectorRef.current,
          { opacity: 0, scale: 0.7, y: 10 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.4)" },
          "-=0.2"
        );
      }

      // 7. Staggered 3D Name Reveal: "SHOURYA"
      if (secondNameRef.current) {
        const chars = secondNameRef.current.querySelectorAll(".split-char");
        tl.to(
          chars,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.55,
            stagger: 0.04,
            ease: "back.out(1.5)",
          },
          "-=0.2"
        );
      }

      // 8. Draw SVG Heart Flourish 2
      if (flourishPath2Ref.current) {
        tl.to(
          flourishPath2Ref.current,
          { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" },
          "-=0.2"
        );
        tl.to(
          ".heart-node",
          { opacity: 1, duration: 0.4 },
          "-=0.3"
        );
      }

      // 9. Date Block Reveal ("SATURDAY | 21 | NOVEMBER 2026")
      if (dateBlockRef.current) {
        tl.fromTo(
          dateBlockRef.current,
          { opacity: 0, y: 18, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.4)" },
          "-=0.2"
        );
      }

      // 10. Location Pin Reveal ("📍 GURGAON")
      if (locationRef.current) {
        tl.fromTo(
          locationRef.current,
          { opacity: 0, y: -20, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.8)" },
          "-=0.3"
        );
      }

      // 11. Footer Copy Reveal
      if (footerRef.current) {
        tl.fromTo(
          footerRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [startAnimation]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-none p-2 sm:p-4 z-30"
    >
      {/* Animated Text Container Centered Directly Inside Floral Arch Corridor */}
      <div
        ref={contentBoxRef}
        style={{ opacity: 0 }}
        className="relative max-w-[340px] sm:max-w-[400px] w-full text-center p-2 sm:p-3 pointer-events-auto space-y-1.5 sm:space-y-2.5 my-auto select-none"
      >
        {/* Line 1: SAVE THE DATE */}
        <div className="space-y-0.5">
          <h2
            ref={eyebrowRef}
            style={{ opacity: 0 }}
            className="text-[11px] sm:text-xs uppercase tracking-[0.38em] font-semibold text-[#7B1E3A] font-serif drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)]"
          >
            SAVE THE DATE
          </h2>
          <DiamondFlourishSVG pathRef={flourishPath1Ref} className="w-40 sm:w-48 h-3.5" />
          <p
            ref={subEyebrowRef}
            style={{ opacity: 0 }}
            className="text-[10px] sm:text-[11px] uppercase tracking-[0.26em] font-semibold text-[#B8935A] font-serif drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)]"
          >
            TO CELEBRATE THE WEDDING OF
          </p>
        </div>

        {/* Lines 2 & 3: SHUBHANKAR ~ and ~ SHOURYA */}
        <div className="py-0.5 space-y-0.5 overflow-hidden perspective-500">
          <div ref={firstNameRef}>
            <h1 className="text-[clamp(1.9rem,5.5vw,3.6rem)] font-bold uppercase tracking-[0.14em] text-[#7B1E3A] font-serif leading-none drop-shadow-[0_2px_5px_rgba(255,255,255,0.95)]">
              <SplitText text={content.names.first} />
            </h1>
          </div>

          <div
            ref={connectorRef}
            style={{ opacity: 0 }}
            className="font-script text-[clamp(1.8rem,4.5vw,3rem)] text-[#B8935A] py-0.5 drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)]"
          >
            ~ {content.names.connector} ~
          </div>

          <div ref={secondNameRef}>
            <h1 className="text-[clamp(1.9rem,5.5vw,3.6rem)] font-bold uppercase tracking-[0.14em] text-[#7B1E3A] font-serif leading-none drop-shadow-[0_2px_5px_rgba(255,255,255,0.95)]">
              <SplitText text={content.names.second} />
            </h1>
          </div>
        </div>

        {/* Line 4: Heart Flourish */}
        <HeartFlourishSVG pathRef={flourishPath2Ref} className="w-36 sm:w-44 h-4" />

        {/* Line 5: SATURDAY | 21 | NOVEMBER 2026 */}
        <div ref={dateBlockRef} style={{ opacity: 0 }} className="space-y-0.5">
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-[#7B1E3A] font-serif">
            <span className="uppercase text-[10px] sm:text-xs tracking-[0.22em] font-semibold text-[#B8935A] drop-shadow-xs">
              SATURDAY
            </span>
            <span className="h-5 w-px bg-[#B8935A]/60" />
            <span className="text-[clamp(1.8rem,4.5vw,2.8rem)] font-bold text-[#7B1E3A] leading-none font-serif drop-shadow-[0_2px_4px_rgba(255,255,255,0.95)]">
              21
            </span>
            <span className="h-5 w-px bg-[#B8935A]/60" />
            <span className="uppercase text-[10px] sm:text-xs tracking-[0.22em] font-semibold text-[#B8935A] drop-shadow-xs">
              NOVEMBER
            </span>
          </div>

          <div className="text-xs sm:text-sm tracking-[0.26em] font-bold text-[#7B1E3A] font-serif drop-shadow-xs">
            2026
          </div>
        </div>

        {/* Line 6: GURGAON */}
        <div ref={locationRef} style={{ opacity: 0 }} className="flex flex-col items-center justify-center gap-0.5">
          <div className="flex items-center gap-1 pt-0.5">
            <MapPinIconSVG className="w-3.5 h-3.5" />
            <span className="text-[11px] sm:text-xs tracking-[0.24em] font-bold text-[#7B1E3A] font-serif uppercase">
              GURGAON
            </span>
          </div>
          <BottomFlourishSVG className="w-28 sm:w-36 h-3 opacity-85" />
        </div>

        {/* Line 7: Footer Copy */}
        <div ref={footerRef} style={{ opacity: 0 }} className="pt-0.5 space-y-0.5">
          <div className="space-y-0.5 text-[9px] sm:text-[11px] text-[#7B1E3A] font-serif font-bold tracking-[0.14em] uppercase drop-shadow-xs">
            <p>INVITATION TO FOLLOW</p>
            <p className="text-[8px] sm:text-[10px] text-[#7B1E3A]/90">
              WITH ALL DETAILS OF CELEBRATIONS
            </p>
          </div>
        </div>
      </div>

      {/* Floating Add to Calendar Interactive Action Button */}
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
    </div>
  );
}
