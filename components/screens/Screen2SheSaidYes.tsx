"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";
import { content } from "@/data/content";
import { useActiveScreenStore } from "@/lib/store";
import LottiePlayer from "@/components/LottiePlayer";

// --- Helper component to split string into animated character spans ---
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
          className="inline-block split-char-s2"
          style={{ opacity: 0, transform: "translateY(24px) scale(0.8)" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

// --- Floating Heart Particles Component ---
function FloatingHeartsBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-60">
      {Array.from({ length: 14 }).map((_, i) => {
        const left = 5 + (i * 7.5) % 90;
        const duration = 6 + (i % 4) * 2;
        const delay = (i % 5) * 1.2;
        const size = 12 + (i % 3) * 8;
        const colors = ["#7B1E3A", "#B8935A", "#E89DA2"];

        return (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${left}%`,
              bottom: `-20px`,
              animation: `floatUp ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
            }}
          >
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill={colors[i % colors.length]}
              className="opacity-70"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        );
      })}

      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-105vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default function Screen2SheSaidYes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heartSvgRef = useRef<SVGSVGElement>(null);
  const ringLottieRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const coupleLottieRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  const confettiFiredRef = useRef(false);
  const { setActiveIndex, setBgColor } = useActiveScreenStore();

  const fireConfettiBursts = () => {
    if (confettiFiredRef.current) return;
    confettiFiredRef.current = true;

    const defaults = {
      origin: { y: 0.85 },
      colors: ["#B8935A", "#7B1E3A", "#F7DCE0", "#FFFFFF"],
    };

    confetti({
      ...defaults,
      particleCount: 50,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.85 },
    });

    confetti({
      ...defaults,
      particleCount: 50,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.85 },
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          onUpdate: (self) => {
            // Trigger confetti burst at ~30% progress
            if (self.progress >= 0.28) {
              fireConfettiBursts();
            }
          },
          onToggle: (self) => {
            if (self.isActive) {
              setActiveIndex(1);
              setBgColor("#F7DCE0");
            }
          },
          onEnter: () => {
            setActiveIndex(1);
            setBgColor("#F7DCE0");
          },
        },
      });

      // 1. Heart SVG scales in with bouncy ease
      if (heartSvgRef.current) {
        tl.fromTo(
          heartSvgRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
        );
      }

      // 2. Ring Lottie reveal
      if (ringLottieRef.current) {
        tl.fromTo(
          ringLottieRef.current,
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.6 },
          "-=0.2"
        );
      }

      // 3. Staggered headline letters ("SHE SAID YES")
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll(".split-char-s2");
        tl.to(
          chars,
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.03, ease: "back.out(1.4)" },
          "-=0.3"
        );
      }

      // 4. Subtitle
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        );
      }

      // 5. Couple Hug Lottie
      if (coupleLottieRef.current) {
        tl.fromTo(
          coupleLottieRef.current,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.7 },
          "-=0.2"
        );
      }

      // 6. Quote reveal
      if (quoteRef.current) {
        tl.fromTo(
          quoteRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [setActiveIndex, setBgColor]);

  return (
    <section
      id="screen-2"
      ref={sectionRef}
      className="h-screen w-full relative flex flex-col items-center justify-center px-4 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, rgba(255,230,236,0.95) 0%, rgba(247,220,224,0.95) 100%)",
      }}
    >
      {/* Floating Heart Particles Background */}
      <FloatingHeartsBackground />

      {/* Main Content Container */}
      <div className="relative max-w-xl md:max-w-2xl w-full text-center p-8 sm:p-12 rounded-3xl bg-ivory/85 backdrop-blur-md border border-gold/30 shadow-[0_25px_60px_rgba(123,30,58,0.15)] space-y-5 z-10 my-auto">
        {/* Subtle Decorative Heart SVG Header */}
        <svg
          ref={heartSvgRef}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 mx-auto text-maroon drop-shadow-xs animate-pulse"
          style={{ opacity: 0 }}
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="currentColor"
          />
        </svg>

        {/* Ring Pop Lottie Container */}
        <div ref={ringLottieRef} style={{ opacity: 0 }} className="flex justify-center -my-2">
          <LottiePlayer
            src="/lottie/ring-pop.json"
            className="w-20 h-20 sm:w-24 sm:h-24"
            fallbackColor="#B8935A"
          />
        </div>

        {/* Headline & Subtitle */}
        <div className="space-y-1 overflow-hidden">
          <h2
            ref={titleRef}
            className="text-[clamp(2rem,5vw,3.8rem)] font-bold uppercase tracking-[0.12em] text-maroon font-serif leading-none drop-shadow-xs"
          >
            <SplitText text={content.screen2.title} />
          </h2>
          <p
            ref={subtitleRef}
            style={{ opacity: 0 }}
            className="text-base sm:text-lg text-gold font-script pt-1"
          >
            ~ {content.screen2.subtitle} ~
          </p>
        </div>

        <div className="h-px w-20 bg-gold/40 mx-auto" />

        {/* Couple Hug Lottie Container */}
        <div ref={coupleLottieRef} style={{ opacity: 0 }} className="flex justify-center py-1">
          <LottiePlayer
            src="/lottie/couple-hug.json"
            className="w-24 h-24 sm:w-28 sm:h-28"
            fallbackColor="#7B1E3A"
          />
        </div>

        {/* Quote Caption */}
        <p
          ref={quoteRef}
          style={{ opacity: 0 }}
          className="text-xs sm:text-sm text-maroon/80 font-serif italic max-w-md mx-auto leading-relaxed tracking-wide"
        >
          "{content.screen2.quote}"
        </p>
      </div>
    </section>
  );
}
