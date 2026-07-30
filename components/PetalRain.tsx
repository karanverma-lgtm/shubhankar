"use client";

import React, { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  color: string;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  swayAmp: number;
  swayFreq: number;
  opacity: number;
}

export default function PetalRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const isMobile = width < 768;
    const petalCount = isMobile ? 35 : 75;
    const petals: Petal[] = [];

    const colors = [
      "#E83D67", // Rose Pink
      "#FF9E1B", // Marigold Orange
      "#9B1B30", // Ruby Red
      "#E89DA2", // Blush Pink
      "#FFF0D4", // Cream Jasmine
    ];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 1.2 + 0.6,
        speedX: Math.random() * 0.4 - 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        swayAmp: Math.random() * 1.5 + 0.5,
        swayFreq: Math.random() * 0.02 + 0.01,
        opacity: Math.random() * 0.4 + 0.6,
      });
    }

    let animationFrameId: number;
    let time = 0;

    const drawPetal = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
      opacity: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;

      // Draw realistic curved flower petal shape
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.8, -size * 0.5, size * 0.8, size * 0.5, 0, size);
      ctx.bezierCurveTo(-size * 0.8, size * 0.5, -size * 0.8, -size * 0.5, 0, -size);
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 1;

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time * p.swayFreq) * p.swayAmp;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.color, p.opacity);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-20 opacity-90"
    />
  );
}
