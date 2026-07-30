"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArchSceneWrapper from "@/components/scene/ArchSceneWrapper";
import LoadingSplash from "@/components/LoadingSplash";
import NavBubbles from "@/components/NavBubbles";
import Screen1Hero from "@/components/screens/Screen1Hero";
import Screen2SheSaidYes from "@/components/screens/Screen2SheSaidYes";
import Screen3OurStory from "@/components/screens/Screen3OurStory";
import Screen4Countdown from "@/components/screens/Screen4Countdown";
import Screen5WhereWhen from "@/components/screens/Screen5WhereWhen";
import { useActiveScreenStore } from "@/lib/store";

const BG_COLORS = ["#FBF6EC", "#F7DCE0", "#EFEFE3", "#7B1E3A", "#FBF6EC"];

export default function Home() {
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  const { activeIndex, setActiveIndex } = useActiveScreenStore();

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

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setActiveIndex((activeIndex + 1) % 5);
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((activeIndex - 1 + 5) % 5);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, setActiveIndex]);

  const currentBgColor = BG_COLORS[activeIndex] || "#FBF6EC";

  return (
    <main
      className="h-screen w-full relative overflow-hidden flex flex-col items-center justify-center transition-colors duration-700 ease-out"
      style={{ backgroundColor: currentBgColor }}
    >
      {/* 1. AnimatePresence Loading Splash Screen */}
      <LoadingSplash
        isVisible={isSplashVisible}
        onExitComplete={handleSplashExitComplete}
      />

      {/* 2. 3D Arch Scene Background (Fixed in Viewport) */}
      <ArchSceneWrapper onCreated={handleSceneCreated} />

      {/* 3. Interactive Floating Section Navigation Bar */}
      <NavBubbles />

      {/* 4. Active Screen Component Container with Framer Motion AnimatePresence */}
      <div className="relative w-full h-full z-10">
        <AnimatePresence mode="wait">
          {activeIndex === 0 && (
            <motion.div
              key="screen-1"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Screen1Hero startAnimation={isSplashFinished} />
            </motion.div>
          )}

          {activeIndex === 1 && (
            <motion.div
              key="screen-2"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Screen2SheSaidYes />
            </motion.div>
          )}

          {activeIndex === 2 && (
            <motion.div
              key="screen-3"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Screen3OurStory />
            </motion.div>
          )}

          {activeIndex === 3 && (
            <motion.div
              key="screen-4"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Screen4Countdown />
            </motion.div>
          )}

          {activeIndex === 4 && (
            <motion.div
              key="screen-5"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Screen5WhereWhen />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
