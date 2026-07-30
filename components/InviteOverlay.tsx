"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
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

// --- Inline SVG Flourishes (Matching IMG_9318.JPG) ---
function LineFlourishSVG({
  pathRef,
  className = "w-52 h-4",
}: {
  pathRef?: React.RefObject<SVGPathElement>;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 220 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} mx-auto text-gold opacity-95`}
    >
      <path
        ref={pathRef}
        d="M0 8H95M125 8H220"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        style={{ strokeDasharray: 220, strokeDashoffset: 220 }}
      />
      <circle cx="110" cy="8" r="3.5" fill="currentColor" className="flourish-icon" style={{ opacity: 0 }} />
      <path
        d="M102 8L110 2L118 8L110 14L102 8Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        className="flourish-icon"
        style={{ opacity: 0 }}
      />
    </svg>
  );
}

function HeartOrnamentSVG({
  ornamentRef,
  className = "w-16 h-6",
}: {
  ornamentRef?: React.RefObject<SVGSVGElement>;
  className?: string;
}) {
  return (
    <svg
      ref={ornamentRef}
      viewBox="0 0 50 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} mx-auto text-gold opacity-90`}
      style={{ opacity: 0, transform: "scale(0.5)" }}
    >
      <path
        d="M25 15C25 15 18 10 18 6.5C18 4.5 19.5 3 21.5 3C23 3 24.3 3.8 25 5C25.7 3.8 27 3 28.5 3C30.5 3 32 4.5 32 6.5C32 10 25 15 25 15Z"
        fill="#7B1E3A"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path
        d="M5 10C11 10 16 7 16 7M45 10C39 10 34 7 34 7"
        stroke="currentColor"
        strokeWidth="1.2"
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
  const eyebrowRef = useRef<HTMLHeadingElement>(null);
  const subEyebrowRef = useRef<HTMLParagraphElement>(null);
  const flourishPathRef = useRef<SVGPathElement>(null);
  const firstNameRef = useRef<HTMLDivElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);
  const secondNameRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<SVGSVGElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startAnimation) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.15,
      });

      // 1. Content container reveal
      if (contentBoxRef.current) {
        tl.fromTo(
          contentBoxRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.9 }
        );
      }

      // 2. Eyebrow "SAVE THE DATE"
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.5"
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

      // 4. Sub-eyebrow "TO CELEBRATE THE WEDDING OF"
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
          { opacity: 0, scale: 0.85, y: 10 },
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
          { opacity: 0.9, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
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

      // 11. Footer details reveal
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
      className="relative min-h-screen w-full flex flex-col items-center justify-center pointer-events-none px-4 py-8 z-10"
    >
      {/* Direct Floating Content Layer (No Heavy Card Box - Matching IMG_9318.JPG) */}
      <div
        ref={contentBoxRef}
        style={{ opacity: 0 }}
        className="relative max-w-xl md:max-w-2xl w-full text-center p-4 sm:p-8 pointer-events-auto space-y-4 sm:space-y-5 my-auto"
      >
        {/* Subtle Radial Glow Backdrop for Perfect Contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(251,246,236,0.85)_0%,_rgba(251,246,236,0.6)_60%,_transparent_100%)] blur-md -z-10 rounded-full pointer-events-none" />

        {/* Eyebrow Header */}
        <div className="space-y-1.5">
          <h2
            ref={eyebrowRef}
            style={{ opacity: 0 }}
            className="text-xs sm:text-sm uppercase tracking-[0.35em] font-semibold text-maroon font-serif drop-shadow-[0_1px_2px_rgba(251,246,236,0.9)]"
          >
            {content.eyebrow}
          </h2>
          <LineFlourishSVG pathRef={flourishPathRef} className="w-48 sm:w-60 h-4" />
          <p
            ref={subEyebrowRef}
            style={{ opacity: 0 }}
            className="text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold text-gold font-serif drop-shadow-[0_1px_2px_rgba(251,246,236,0.9)]"
          >
            {content.subEyebrow}
          </p>
        </div>

        {/* Couple Names (Exact IMG_9318.JPG Styling) */}
        <div className="py-1 space-y-1 sm:space-y-2 overflow-hidden">
          <div ref={firstNameRef}>
            <h1 className="text-[clamp(2.4rem,6vw,4.6rem)] font-bold uppercase tracking-[0.14em] text-maroon font-serif leading-none drop-shadow-[0_2px_6px_rgba(251,246,236,0.95)]">
              <SplitText text={content.names.first} />
            </h1>
          </div>

          <div
            ref={connectorRef}
            style={{ opacity: 0 }}
            className="font-script text-[clamp(2.2rem,5vw,3.6rem)] text-gold py-0.5 drop-shadow-[0_1px_3px_rgba(251,246,236,0.9)] select-none"
          >
            ~ {content.names.connector} ~
          </div>

          <div ref={secondNameRef}>
            <h1 className="text-[clamp(2.4rem,6vw,4.6rem)] font-bold uppercase tracking-[0.14em] text-maroon font-serif leading-none drop-shadow-[0_2px_6px_rgba(251,246,236,0.95)]">
              <SplitText text={content.names.second} />
            </h1>
          </div>
        </div>

        {/* Heart / Floral Divider */}
        <HeartOrnamentSVG ornamentRef={heartRef} className="w-14 sm:w-16 h-5" />

        {/* Date Section (SATURDAY | 21 | NOVEMBER) */}
        <div ref={dateRef} style={{ opacity: 0 }} className="space-y-1">
          <div className="flex items-center justify-center gap-3 sm:gap-6 text-maroon font-serif">
            <span className="uppercase text-xs sm:text-sm tracking-[0.25em] font-semibold text-gold drop-shadow-xs">
              {content.date.day}
            </span>
            <span className="h-7 w-px bg-gold/60" />
            <span className="text-[clamp(2.2rem,5vw,3.6rem)] font-bold text-maroon leading-none font-serif drop-shadow-[0_2px_4px_rgba(251,246,236,0.9)]">
              {content.date.date}
            </span>
            <span className="h-7 w-px bg-gold/60" />
            <span className="uppercase text-xs sm:text-sm tracking-[0.25em] font-semibold text-gold drop-shadow-xs">
              {content.date.month}
            </span>
          </div>

          <div className="text-sm sm:text-base tracking-[0.3em] font-bold text-maroon font-serif drop-shadow-xs">
            {content.date.year}
          </div>
        </div>

        {/* Location Section */}
        <div
          ref={locationRef}
          style={{ opacity: 0 }}
          className="flex flex-col items-center justify-center gap-1 text-maroon font-serif text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold"
        >
          <LineFlourishSVG className="w-36 sm:w-44 h-3 opacity-80" />
          <div className="flex items-center gap-1.5 pt-1">
            <PinIconSVG className="w-4 h-4 text-maroon" />
            <span className="text-maroon font-bold">{content.location}</span>
          </div>
        </div>

        {/* Footer Details (Exact Copy & Flourishes) */}
        <div ref={footerRef} style={{ opacity: 0 }} className="pt-2 space-y-2">
          <LineFlourishSVG className="w-44 sm:w-52 h-3 opacity-80" />
          <div className="space-y-1 text-xs sm:text-sm text-maroon/90 font-serif font-medium tracking-[0.15em] uppercase drop-shadow-xs">
            <p>{content.footerLine1}</p>
            <p className="text-[11px] sm:text-xs text-maroon/80">{content.footerLine2}</p>
          </div>
          <LineFlourishSVG className="w-36 sm:w-44 h-3 opacity-70" />
        </div>
      </div>
    </div>
  );
}
