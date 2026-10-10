
"use client";

import { useEffect, useRef } from "react";

export default function BackgroundDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let frame = 0;
    let scrollY = window.scrollY;
    let previousScrollY = scrollY;
    let scrollOffset = 0;
    let targetOffset = 0;
    let lastTime = 0;

    const dots = Array.from({ length: 200 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 1.8 + 0.5,
      speed: Math.random() * 0.0020 + 0.00004,
      phase: Math.random() * Math.PI * 2,
    }));

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function handleScroll() {
      scrollY = window.scrollY;
    }

    function draw(time: number) {
      const delta = lastTime ? Math.min(time - lastTime, 32) : 16;
      lastTime = time;

      if (!reduceMotion) {
        const scrollDelta = scrollY - previousScrollY;
        targetOffset -= scrollDelta * 0.35;
        previousScrollY = scrollY;

        // Smoothly catch up with the page's scroll movement.
        scrollOffset += (targetOffset - scrollOffset) * 0.12;

        // Keep the offset bounded during long scrolling sessions.
        if (Math.abs(scrollOffset) > height * 100) {
          scrollOffset %= height;
          targetOffset = scrollOffset;
        }
      }

      ctx!.clearRect(0, 0, width, height);

      for (const dot of dots) {
        const drift = reduceMotion
          ? 0
          : Math.sin(time * dot.speed + dot.phase) * 0.012;

        const x = ((dot.x + drift + 1) % 1) * width;
        const baseY = dot.y * height;
        const y = ((baseY + scrollOffset) % height + height) % height;

        ctx!.beginPath();
        ctx!.arc(x, y, dot.radius, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(65, 145, 255, 0.75)";
        ctx!.shadowBlur = 8;
        ctx!.shadowColor = "rgba(40, 120, 255, 0.35)";
        ctx!.fill();
      }

      ctx!.shadowBlur = 0;

      if (!reduceMotion) {
        frame = requestAnimationFrame(draw);
      }
    }

    resize();
    draw(0);

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="background-dots"
    />
  );
}
