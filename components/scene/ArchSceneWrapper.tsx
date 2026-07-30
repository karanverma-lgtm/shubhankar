"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export interface ArchSceneWrapperProps {
  onCreated?: () => void;
}

export default function ArchSceneWrapper({ onCreated }: ArchSceneWrapperProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Notify parent when background image and elements ready
    const timer = setTimeout(() => {
      setIsLoaded(true);
      onCreated?.();
    }, 200);
    return () => clearTimeout(timer);
  }, [onCreated]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none">
      {/* 1. Photorealistic Floral Archway Backdrop (Exact IMG_9318.JPG) */}
      <div className="relative w-full h-full">
        <Image
          src="/images/IMG_9318.JPG"
          alt="Shubhankar & Shourya Floral Archway Wedding Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transition-opacity duration-700"
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      </div>

      {/* 2. Left Candle Lantern Flickering Light Overlay */}
      <div
        className="absolute left-[7%] sm:left-[9%] bottom-[8%] sm:bottom-[10%] w-12 h-16 pointer-events-none z-10 flex items-center justify-center"
      >
        <div className="w-5 h-5 rounded-full bg-[#FFB03A] blur-md animate-pulse opacity-85" />
        <div className="absolute w-3 h-3 rounded-full bg-[#FFE4A0] blur-xs animate-ping opacity-75" />
      </div>

      {/* 3. Right Candle Lantern Flickering Light Overlay */}
      <div
        className="absolute right-[7%] sm:right-[9%] bottom-[8%] sm:bottom-[10%] w-12 h-16 pointer-events-none z-10 flex items-center justify-center"
      >
        <div className="w-5 h-5 rounded-full bg-[#FFB03A] blur-md animate-pulse opacity-85" />
        <div className="absolute w-3 h-3 rounded-full bg-[#FFE4A0] blur-xs animate-ping opacity-75" />
      </div>

      {/* 4. Warm Golden Sunlight Center Rays Halo */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,235,190,0.25)_0%,_transparent_70%)]" />
    </div>
  );
}
