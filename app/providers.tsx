"use client";

import React from "react";
import { useLenisScroll } from "@/lib/lenis";

export function Providers({ children }: { children: React.ReactNode }) {
  // Initialize Lenis smooth scroll and GSAP ScrollTrigger integration
  useLenisScroll();

  return <>{children}</>;
}
