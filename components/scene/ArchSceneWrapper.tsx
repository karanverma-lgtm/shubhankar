"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export interface ArchSceneWrapperProps {
  onCreated?: () => void;
}

export default function ArchSceneWrapper({ onCreated }: ArchSceneWrapperProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      onCreated?.();
    }, 150);
    return () => clearTimeout(timer);
  }, [onCreated]);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4 select-none">
      {/* Aspect Ratio Container matching IMG_9318.JPG (approx 3:4 portrait ratio) */}
      <div className="relative w-full h-full max-w-[520px] max-h-[92vh] aspect-[3/4] rounded-2xl shadow-2xl overflow-hidden border border-gold/30">
        {/* Photorealistic Floral Arch Background Image */}
        <Image
          src="/images/IMG_9318.JPG"
          alt="Shubhankar & Shourya Wedding Invitation"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 520px"
          className="object-cover object-center transition-opacity duration-500"
          style={{ opacity: isLoaded ? 1 : 0 }}
        />

        {/* Left Lantern Candle Flickering Light */}
        <div className="absolute left-[12%] bottom-[11%] w-8 h-10 pointer-events-none z-10 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-[#FFB03A] blur-md animate-pulse opacity-90" />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-[#FFE4A0] blur-xs animate-ping opacity-80" />
        </div>

        {/* Right Lantern Candle Flickering Light */}
        <div className="absolute right-[12%] bottom-[11%] w-8 h-10 pointer-events-none z-10 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-[#FFB03A] blur-md animate-pulse opacity-90" />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-[#FFE4A0] blur-xs animate-ping opacity-80" />
        </div>
      </div>
    </div>
  );
}
