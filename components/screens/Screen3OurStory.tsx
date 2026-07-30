"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { content } from "@/data/content";
import LottiePlayer from "@/components/LottiePlayer";

function MilestoneIcon({
  idx,
  lottieSrc,
  fallbackSvg,
}: {
  idx: number;
  lottieSrc: string;
  fallbackSvg: React.ReactNode;
}) {
  return (
    <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-ivory border-2 border-gold/70 shadow-md flex items-center justify-center shrink-0 overflow-hidden">
      <LottiePlayer
        src={lottieSrc}
        className="w-8 h-8 sm:w-12 sm:h-12"
        fallbackColor="#B8935A"
      />
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-gold opacity-90">
        {fallbackSvg}
      </div>
    </div>
  );
}

export default function Screen3OurStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const m1Ref = useRef<HTMLDivElement>(null);
  const m2Ref = useRef<HTMLDivElement>(null);
  const m3Ref = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const totalLength = path.getTotalLength();
    path.style.strokeDasharray = `${totalLength}`;
    path.style.strokeDashoffset = `${totalLength}`;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        delay: 0.1,
      });

      // 1. Draw SVG path
      tl.to(path, {
        strokeDashoffset: 0,
        duration: 1.4,
      });

      // 2. Milestone 1 Pop-in
      if (m1Ref.current) {
        tl.fromTo(
          m1Ref.current,
          { scale: 0, opacity: 0, rotation: -20 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: "back.out(1.7)" },
          "-=1.1"
        );
      }

      // 3. Milestone 2 Pop-in
      if (m2Ref.current) {
        tl.fromTo(
          m2Ref.current,
          { scale: 0, opacity: 0, rotation: 20 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.7"
        );
      }

      // 4. Milestone 3 Pop-in
      if (m3Ref.current) {
        tl.fromTo(
          m3Ref.current,
          { scale: 0, opacity: 0, rotation: -20 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.3"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  const desktopPathD = "M 50 100 C 300 120, 600 350, 450 500 C 300 650, 600 800, 850 850";
  const mobilePathD = "M 200 80 C 120 250, 280 450, 200 650 C 120 850, 280 1050, 200 1250";

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-between py-8 px-4 relative overflow-hidden"
      style={{ backgroundColor: "#EFEFE3" }}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0">
        <filter id="paper-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-noise)" />
      </svg>

      <div className="text-center space-y-1 z-10 pt-2">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-leaf font-serif">
          Chapter II
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold text-maroon font-serif">
          {content.screen3.title}
        </h2>
        <p className="text-xs sm:text-base text-gold font-script">
          ~ {content.screen3.subtitle} ~
        </p>
      </div>

      <div className="relative w-full max-w-4xl h-[60vh] flex items-center justify-center z-10">
        <svg
          viewBox={isMobile ? "0 0 400 1300" : "0 0 900 950"}
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            d={isMobile ? mobilePathD : desktopPathD}
            fill="none"
            stroke="#B8935A"
            strokeWidth="3"
            strokeLinecap="round"
            className="opacity-80"
          />
        </svg>

        <div
          ref={m1Ref}
          style={{ opacity: 0 }}
          className="absolute top-[15%] left-[8%] sm:left-[12%] flex items-center gap-3 max-w-xs bg-ivory/85 backdrop-blur-xs p-3 rounded-2xl border border-gold/30 shadow-md"
        >
          <MilestoneIcon
            idx={1}
            lottieSrc="/lottie/coffee-cup.json"
            fallbackSvg={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 21h18v-2H2v2zm2-4h14V5H4v12zm16-7h2a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2v5z" />
              </svg>
            }
          />
          <div className="space-y-0.5 text-left">
            <h3 className="text-sm sm:text-base font-bold text-maroon font-serif">
              {content.screen3.milestones[0].title}
            </h3>
            <p className="text-[11px] sm:text-xs text-maroon/75 font-serif italic">
              {content.screen3.milestones[0].caption}
            </p>
          </div>
        </div>

        <div
          ref={m2Ref}
          style={{ opacity: 0 }}
          className="absolute top-[45%] right-[8%] sm:right-[14%] flex items-center gap-3 max-w-xs bg-ivory/85 backdrop-blur-xs p-3 rounded-2xl border border-gold/30 shadow-md"
        >
          <MilestoneIcon
            idx={2}
            lottieSrc="/lottie/heart-burst.json"
            fallbackSvg={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            }
          />
          <div className="space-y-0.5 text-left">
            <h3 className="text-sm sm:text-base font-bold text-maroon font-serif">
              {content.screen3.milestones[1].title}
            </h3>
            <p className="text-[11px] sm:text-xs text-maroon/75 font-serif italic">
              {content.screen3.milestones[1].caption}
            </p>
          </div>
        </div>

        <div
          ref={m3Ref}
          style={{ opacity: 0 }}
          className="absolute bottom-[10%] left-[12%] sm:left-[35%] flex items-center gap-3 max-w-xs bg-ivory/85 backdrop-blur-xs p-3 rounded-2xl border border-gold/30 shadow-md"
        >
          <MilestoneIcon
            idx={3}
            lottieSrc="/lottie/ring-pop.json"
            fallbackSvg={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
            }
          />
          <div className="space-y-0.5 text-left">
            <h3 className="text-sm sm:text-base font-bold text-maroon font-serif">
              {content.screen3.milestones[2].title}
            </h3>
            <p className="text-[11px] sm:text-xs text-maroon/75 font-serif italic">
              {content.screen3.milestones[2].caption}
            </p>
          </div>
        </div>
      </div>

      <div className="z-10 pb-2 text-center">
        <p className="text-[10px] sm:text-xs text-leaf font-serif italic tracking-widest uppercase">
          ✦ Every step led us to each other ✦
        </p>
      </div>
    </div>
  );
}
