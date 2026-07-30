"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { content } from "@/data/content";

function SplitText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`inline-block ${className}`}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block split-char"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

// --- Exact SVG Flourishes matching IMG_9318.JPG ---
function DiamondFlourishSVG({ className = "w-56 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} mx-auto text-[#B8935A] opacity-95`}
    >
      <path
        d="M0 8H105M135 8H240"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="120" cy="8" r="3" fill="currentColor" />
      <path
        d="M112 8L120 2L128 8L120 14L112 8Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <circle cx="106" cy="8" r="1.5" fill="currentColor" />
      <circle cx="134" cy="8" r="1.5" fill="currentColor" />
    </svg>
  );
}

function HeartFlourishSVG({ className = "w-48 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} mx-auto text-[#B8935A] opacity-95`}
    >
      <path
        d="M0 10H85M115 10H200"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M100 15C100 15 93 10 93 6.5C93 4.5 94.5 3 96.5 3C98 3 99.3 3.8 100 5C100.7 3.8 102 3 103.5 3C105.5 3 107 4.5 107 6.5C107 10 100 15 100 15Z"
        fill="#7B1E3A"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path
        d="M80 10C86 10 91 7 91 7M120 10C114 10 109 7 109 7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BottomFlourishSVG({ className = "w-44 h-4" }: { className?: string }) {
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

function MapPinIconSVG({ className = "w-4 h-4" }: { className?: string }) {
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

export interface InviteOverlayProps {
  startAnimation?: boolean;
}

export default function InviteOverlay({ startAnimation = true }: InviteOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startAnimation) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1,
      });

      if (contentBoxRef.current) {
        tl.fromTo(
          contentBoxRef.current,
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 0.8 }
        );

        const chars = contentBoxRef.current.querySelectorAll(".split-char");
        tl.to(
          chars,
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.03, ease: "back.out(1.4)" },
          "-=0.5"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [startAnimation]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center pointer-events-none px-4 py-6 z-30"
    >
      {/* Floating Exact Replica Typography Container (IMG_9318.JPG) */}
      <div
        ref={contentBoxRef}
        style={{ opacity: 0 }}
        className="relative max-w-lg md:max-w-xl w-full text-center p-3 sm:p-6 pointer-events-auto space-y-3 sm:space-y-4 my-auto select-none"
      >
        {/* Subtle Radial Glow Backdrop behind central text for 100% legibility */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,249,238,0.75)_0%,_rgba(255,249,238,0.45)_55%,_transparent_90%)] blur-sm -z-10 rounded-full pointer-events-none" />

        {/* Line 1: SAVE THE DATE */}
        <div className="space-y-1">
          <h2 className="text-xs sm:text-sm uppercase tracking-[0.38em] font-semibold text-[#7B1E3A] font-serif drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
            SAVE THE DATE
          </h2>
          <DiamondFlourishSVG className="w-48 sm:w-56 h-3.5" />
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] font-semibold text-[#B8935A] font-serif drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
            TO CELEBRATE THE WEDDING OF
          </p>
        </div>

        {/* Lines 2 & 3: SHUBHANKAR ~ and ~ SHOURYA */}
        <div className="py-0.5 space-y-1 overflow-hidden">
          <div>
            <h1 className="text-[clamp(2.5rem,6.5vw,4.5rem)] font-bold uppercase tracking-[0.14em] text-[#7B1E3A] font-serif leading-none drop-shadow-[0_2px_6px_rgba(255,255,255,0.95)]">
              <SplitText text={content.names.first} />
            </h1>
          </div>

          <div className="font-script text-[clamp(2.2rem,5vw,3.6rem)] text-[#B8935A] py-0.5 drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
            ~ {content.names.connector} ~
          </div>

          <div>
            <h1 className="text-[clamp(2.5rem,6.5vw,4.5rem)] font-bold uppercase tracking-[0.14em] text-[#7B1E3A] font-serif leading-none drop-shadow-[0_2px_6px_rgba(255,255,255,0.95)]">
              <SplitText text={content.names.second} />
            </h1>
          </div>
        </div>

        {/* Line 4: Heart Flourish */}
        <HeartFlourishSVG className="w-44 sm:w-52 h-4.5" />

        {/* Line 5: SATURDAY | 21 | NOVEMBER */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-3 sm:gap-5 text-[#7B1E3A] font-serif">
            <span className="uppercase text-xs sm:text-sm tracking-[0.25em] font-semibold text-[#B8935A] drop-shadow-xs">
              SATURDAY
            </span>
            <span className="h-6 w-px bg-[#B8935A]/60" />
            <span className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-[#7B1E3A] leading-none font-serif drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)]">
              21
            </span>
            <span className="h-6 w-px bg-[#B8935A]/60" />
            <span className="uppercase text-xs sm:text-sm tracking-[0.25em] font-semibold text-[#B8935A] drop-shadow-xs">
              NOVEMBER
            </span>
          </div>

          {/* Line 6: 2026 */}
          <div className="text-sm sm:text-base tracking-[0.3em] font-bold text-[#7B1E3A] font-serif drop-shadow-xs">
            2026
          </div>
          <div className="w-2 h-2 rotate-45 bg-[#B8935A] mx-auto opacity-80" />
        </div>

        {/* Line 7: GURGAON */}
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="flex items-center gap-1.5 pt-1">
            <MapPinIconSVG className="w-4 h-4" />
            <span className="text-xs sm:text-sm tracking-[0.28em] font-bold text-[#7B1E3A] font-serif uppercase">
              GURGAON
            </span>
          </div>
          <HeartFlourishSVG className="w-36 sm:w-44 h-3.5 opacity-85" />
        </div>

        {/* Lines 8 & 9: INVITATION TO FOLLOW WITH ALL DETAILS OF CELEBRATIONS */}
        <div className="pt-1 space-y-1">
          <div className="space-y-0.5 text-[11px] sm:text-xs text-[#7B1E3A] font-serif font-bold tracking-[0.16em] uppercase drop-shadow-xs">
            <p>INVITATION TO FOLLOW</p>
            <p className="text-[10px] sm:text-[11px] text-[#7B1E3A]/90">
              WITH ALL DETAILS OF CELEBRATIONS
            </p>
          </div>
          <BottomFlourishSVG className="w-36 sm:w-44 h-3 opacity-80" />
        </div>
      </div>
    </div>
  );
}
