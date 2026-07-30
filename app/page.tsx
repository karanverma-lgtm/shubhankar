"use client";

import React, { useState, useCallback } from "react";
import ArchSceneWrapper from "@/components/scene/ArchSceneWrapper";
import InviteOverlay from "@/components/InviteOverlay";
import LoadingSplash from "@/components/LoadingSplash";

export default function Home() {
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  // Triggered when 3D Canvas onCreated completes
  const handleSceneCreated = useCallback(() => {
    setIsSceneLoaded(true);
    // Allow small delay for smooth transition then dismiss splash
    setTimeout(() => {
      setIsSplashVisible(false);
    }, 400);
  }, []);

  // Triggered after LoadingSplash exit animation completes
  const handleSplashExitComplete = useCallback(() => {
    setIsSplashFinished(true);
  }, []);

  return (
    <main className="min-h-screen relative overflow-x-hidden bg-ivory">
      {/* 1. AnimatePresence Loading Splash Screen */}
      <LoadingSplash
        isVisible={isSplashVisible}
        onExitComplete={handleSplashExitComplete}
      />

      {/* 2. 3D Arch Scene Background */}
      <ArchSceneWrapper onCreated={handleSceneCreated} />

      {/* 3. Main Invitation Overlay Layer (Starts GSAP reveal when splash exits) */}
      <InviteOverlay startAnimation={isSplashFinished} />
    </main>
  );
}
