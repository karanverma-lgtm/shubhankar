"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export interface UseDrawSVGPathOptions {
  duration?: number;
  ease?: string;
  delay?: number;
  scrollTrigger?: gsap.DOMTarget | object;
}

export function useDrawSVGPath(options: UseDrawSVGPathOptions = {}) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    // Get exact length of the SVG path
    const length = path.getTotalLength();

    // Prepare initial stroke dash properties
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: options.duration || 1.2,
        ease: options.ease || "power2.inOut",
        delay: options.delay || 0,
        ...(options.scrollTrigger ? { scrollTrigger: options.scrollTrigger } : {}),
      });
    });

    return () => ctx.revert();
  }, [options.duration, options.ease, options.delay, options.scrollTrigger]);

  return pathRef;
}
