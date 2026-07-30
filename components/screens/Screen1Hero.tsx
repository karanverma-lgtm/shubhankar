"use client";

import React from "react";
import InviteOverlay from "@/components/InviteOverlay";

export interface Screen1HeroProps {
  startAnimation?: boolean;
}

export default function Screen1Hero({ startAnimation = true }: Screen1HeroProps) {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <InviteOverlay startAnimation={startAnimation} />
    </div>
  );
}
