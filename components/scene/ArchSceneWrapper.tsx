"use client";

import dynamic from "next/dynamic";
import React from "react";

const ArchScene = dynamic(() => import("./ArchScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-ivory flex items-center justify-center">
      <div className="text-gold font-serif text-sm italic tracking-widest animate-pulse">
        Loading 3D Atmosphere...
      </div>
    </div>
  ),
});

export default function ArchSceneWrapper({ onCreated }: { onCreated?: () => void }) {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10">
      <ArchScene onCreated={onCreated} />
    </div>
  );
}
