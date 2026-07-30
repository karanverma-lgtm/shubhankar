"use client";

import React, { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export interface LottiePlayerProps {
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  onComplete?: () => void;
  className?: string;
  fallbackColor?: string;
  aspectRatio?: string;
}

export default function LottiePlayer({
  src,
  loop = true,
  autoplay = true,
  onComplete,
  className = "w-24 h-24",
  fallbackColor = "#B8935A",
}: LottiePlayerProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Verify asset availability via HEAD request to handle 404 gracefully
    fetch(src, { method: "HEAD" })
      .then((res) => {
        if (!res.ok) {
          setHasError(true);
        }
      })
      .catch(() => {
        setHasError(true);
      });
  }, [src]);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl border border-gold/40 bg-ivory/50 backdrop-blur-xs p-3 transition-all ${className}`}
      >
        <div className="relative flex items-center justify-center">
          <div
            className="w-10 h-10 rounded-full animate-ping opacity-25"
            style={{ backgroundColor: fallbackColor }}
          />
          <div
            className="w-8 h-8 rounded-full shadow-inner flex items-center justify-center text-ivory font-serif text-xs font-bold"
            style={{ backgroundColor: fallbackColor }}
          >
            ❖
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <DotLottieReact
        src={src}
        loop={loop}
        autoplay={autoplay}
        dotLottieRefCallback={(dotLottie) => {
          if (dotLottie && onComplete) {
            dotLottie.addEventListener("complete", onComplete);
          }
        }}
      />
    </div>
  );
}
