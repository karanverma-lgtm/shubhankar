"use client";

import React, { useState, useCallback } from "react";
import ArchSceneWrapper from "@/components/scene/ArchSceneWrapper";
import LoadingSplash from "@/components/LoadingSplash";
import ScrollProgressDots from "@/components/ScrollProgressDots";
import Screen1Hero from "@/components/screens/Screen1Hero";
import Screen2SheSaidYes from "@/components/screens/Screen2SheSaidYes";
import Screen3OurStory from "@/components/screens/Screen3OurStory";
import Screen4Countdown from "@/components/screens/Screen4Countdown";
import Screen5WhereWhen from "@/components/screens/Screen5WhereWhen";
import { useActiveScreenStore } from "@/lib/store";

export default function Home() {
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  const { bgColor } = useActiveScreenStore();

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
    <main
      className="relative overflow-x-hidden min-h-screen transition-colors duration-700 ease-out"
      style={{ backgroundColor: bgColor }}
    >
      {/* 1. AnimatePresence Loading Splash Screen */}
      <LoadingSplash
        isVisible={isSplashVisible}
        onExitComplete={handleSplashExitComplete}
      />

      {/* 2. 3D Arch Scene Background (Fixed in Viewport) */}
      <ArchSceneWrapper onCreated={handleSceneCreated} />

      {/* 3. Fixed Right Progress Dots Navigation */}
      <ScrollProgressDots />

      {/* 4. 5 Full-Viewport Scrollytelling Sections */}
      <div className="relative z-10">
        <Screen1Hero startAnimation={isSplashFinished} />
        <Screen2SheSaidYes />
        <Screen3OurStory />
        <Screen4Countdown />
        <Screen5WhereWhen />
      </div>
    </main>
  );
}
