"use client";

import React, { useState, useCallback } from "react";
import ArchSceneWrapper from "@/components/scene/ArchSceneWrapper";
import InviteOverlay from "@/components/InviteOverlay";
import LoadingSplash from "@/components/LoadingSplash";
import MagicTrail from "@/components/MagicTrail";
import PetalRain from "@/components/PetalRain";
import CelebrateButton from "@/components/CelebrateButton";
import InteractiveCouple from "@/components/InteractiveCouple";

export default function Home() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  const handleSceneCreated = useCallback(() => {
    setTimeout(() => {
      setIsSplashVisible(false);
    }, 400);
  }, []);

  const handleSplashExitComplete = useCallback(() => {
    setIsSplashFinished(true);
  }, []);

  return (
    <main className="h-screen w-full relative overflow-hidden bg-[#FBF6EC] flex items-center justify-center">
      {/* 1. Photorealistic Background Backdrop & Lantern Candle Overlay */}
      <ArchSceneWrapper onCreated={handleSceneCreated} />

      {/* 2. Continuous Falling Flower Petals */}
      <PetalRain />

      {/* 3. Magical Sparkle Cursor & Touch Trail */}
      <MagicTrail />

      {/* 4. Floating Celebration Fireworks Button */}
      <CelebrateButton />

      {/* 5. Interactive Couple Avatars */}
      <InteractiveCouple />

      {/* 6. AnimatePresence Loading Splash Screen */}
      <LoadingSplash
        isVisible={isSplashVisible}
        onExitComplete={handleSplashExitComplete}
      />

      {/* 7. Exact Replica Invitation UI Overlay (IMG_9318.JPG) */}
      <InviteOverlay startAnimation={isSplashFinished} />
    </main>
  );
}
