"use client";

import React, { useState, useCallback } from "react";
import ArchSceneWrapper from "@/components/scene/ArchSceneWrapper";
import InviteOverlay from "@/components/InviteOverlay";
import LoadingSplash from "@/components/LoadingSplash";
import MagicTrail from "@/components/MagicTrail";
import CelebrateButton from "@/components/CelebrateButton";
import InteractiveCouple from "@/components/InteractiveCouple";

export default function Home() {
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  // Triggered when 3D Canvas onCreated completes
  const handleSceneCreated = useCallback(() => {
    setIsSceneLoaded(true);
    setTimeout(() => {
      setIsSplashVisible(false);
    }, 400);
  }, []);

  // Triggered after LoadingSplash exit animation completes
  const handleSplashExitComplete = useCallback(() => {
    setIsSplashFinished(true);
  }, []);

  return (
    <main className="h-screen w-full relative overflow-hidden bg-ivory flex items-center justify-center">
      {/* 1. Magical Sparkle Cursor & Touch Trail */}
      <MagicTrail />

      {/* 2. Floating Celebration Fireworks Button */}
      <CelebrateButton />

      {/* 3. Interactive Couple Avatars */}
      <InteractiveCouple />

      {/* 4. AnimatePresence Loading Splash Screen */}
      <LoadingSplash
        isVisible={isSplashVisible}
        onExitComplete={handleSplashExitComplete}
      />

      {/* 5. 3D Arch Scene Background (Matching IMG_9318.JPG) */}
      <ArchSceneWrapper onCreated={handleSceneCreated} />

      {/* 6. Main Invitation UI Overlay */}
      <InviteOverlay startAnimation={isSplashFinished} />
    </main>
  );
}
