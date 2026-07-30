"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InviteOverlay from "@/components/InviteOverlay";
import { useActiveScreenStore } from "@/lib/store";

export interface Screen1HeroProps {
  startAnimation?: boolean;
}

export default function Screen1Hero({ startAnimation = true }: Screen1HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { setActiveIndex, setBgColor } = useActiveScreenStore();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onToggle: (self) => {
          if (self.isActive) {
            setActiveIndex(0);
            setBgColor("#FBF6EC");
          }
        },
        onEnterBack: () => {
          setActiveIndex(0);
          setBgColor("#FBF6EC");
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [setActiveIndex, setBgColor]);

  return (
    <section
      id="screen-1"
      ref={sectionRef}
      className="h-screen w-full relative flex items-center justify-center overflow-hidden"
    >
      <InviteOverlay startAnimation={startAnimation} />
    </section>
  );
}
