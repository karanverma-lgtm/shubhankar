"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { content } from "@/data/content";

function calculateTimeRemaining(targetIso: string) {
  const targetTime = new Date(targetIso).getTime();
  const now = new Date().getTime();
  const diff = Math.max(0, targetTime - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

function FlipCard({
  value,
  label,
  cardRef,
}: {
  value: string;
  label: string;
  cardRef?: React.RefObject<HTMLDivElement>;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (prevValueRef.current !== value && innerRef.current) {
      prevValueRef.current = value;
      gsap.fromTo(
        innerRef.current,
        { rotateX: -180 },
        { rotateX: 0, duration: 0.5, ease: "back.out(1.5)" }
      );
    }
  }, [value]);

  return (
    <div ref={cardRef} className="flex flex-col items-center perspective-500">
      <div
        ref={innerRef}
        className="relative w-20 h-24 sm:w-28 sm:h-32 md:w-32 md:h-36 rounded-2xl bg-ivory text-maroon border-2 border-gold/50 shadow-[0_15px_35px_rgba(0,0,0,0.4)] flex items-center justify-center transform-style-3d transition-shadow"
      >
        <div className="absolute inset-x-0 top-1/2 h-px bg-gold/30 z-10" />
        <span className="text-3xl sm:text-5xl md:text-6xl font-bold font-serif text-maroon tracking-wider drop-shadow-xs">
          {value}
        </span>
      </div>

      <span className="mt-3 text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold text-gold font-serif">
        {label}
      </span>
    </div>
  );
}

function TwinkleStarsBackground({ isMobile }: { isMobile: boolean }) {
  const count = isMobile ? 8 : 20;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-70">
      {Array.from({ length: count }).map((_, i) => {
        const top = (i * 13) % 90;
        const left = (i * 17) % 95;
        const size = 3 + (i % 3) * 3;
        const duration = 2 + (i % 3);

        return (
          <div
            key={i}
            className="absolute rounded-full bg-gold animate-pulse"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDuration: `${duration}s`,
              boxShadow: "0 0 10px #B8935A",
            }}
          />
        );
      })}
    </div>
  );
}

export default function Screen4Countdown() {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      setTimeLeft(calculateTimeRemaining(content.screen4.targetDateIso));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1,
      });

      if (headerRef.current) {
        tl.fromTo(
          headerRef.current,
          { opacity: 0, y: -25 },
          { opacity: 1, y: 0, duration: 0.6 }
        );
      }

      if (card1Ref.current) {
        tl.fromTo(
          card1Ref.current,
          { opacity: 0, x: -100, rotateY: -20 },
          { opacity: 1, x: 0, rotateY: 0, duration: 0.6, ease: "back.out(1.4)" },
          "-=0.3"
        );
      }

      if (card2Ref.current) {
        tl.fromTo(
          card2Ref.current,
          { opacity: 0, x: 100, rotateY: 20 },
          { opacity: 1, x: 0, rotateY: 0, duration: 0.6, ease: "back.out(1.4)" },
          "-=0.4"
        );
      }

      if (card3Ref.current) {
        tl.fromTo(
          card3Ref.current,
          { opacity: 0, x: -100, rotateY: -20 },
          { opacity: 1, x: 0, rotateY: 0, duration: 0.6, ease: "back.out(1.4)" },
          "-=0.4"
        );
      }

      if (card4Ref.current) {
        tl.fromTo(
          card4Ref.current,
          { opacity: 0, x: 100, rotateY: 20 },
          { opacity: 1, x: 0, rotateY: 0, duration: 0.6, ease: "back.out(1.4)" },
          "-=0.4"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-center px-4 relative overflow-hidden bg-maroon"
    >
      <TwinkleStarsBackground isMobile={isMobile} />

      <div className="relative max-w-3xl w-full text-center p-7 sm:p-12 rounded-3xl bg-maroon/85 backdrop-blur-md border border-gold/40 shadow-[0_30px_70px_rgba(0,0,0,0.4)] space-y-7 z-10 my-auto">
        <div ref={headerRef} style={{ opacity: 0 }} className="space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-gold font-serif">
            Chapter III
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gold font-serif drop-shadow-xs">
            {content.screen4.title}
          </h2>
          <p className="text-base sm:text-lg text-ivory/80 font-script">
            ~ {content.screen4.subtitle} ~
          </p>
        </div>

        <div className="h-px w-24 bg-gold/50 mx-auto" />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 justify-center items-center py-2">
          <FlipCard cardRef={card1Ref} value={timeLeft.days} label="Days" />
          <FlipCard cardRef={card2Ref} value={timeLeft.hours} label="Hours" />
          <FlipCard cardRef={card3Ref} value={timeLeft.minutes} label="Minutes" />
          <FlipCard cardRef={card4Ref} value={timeLeft.seconds} label="Seconds" />
        </div>

        <p className="text-xs sm:text-sm text-gold/80 font-serif italic tracking-widest uppercase pt-1">
          ✦ November 21st, 2026 ✦
        </p>
      </div>
    </div>
  );
}
