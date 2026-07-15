"use client";

import React, { useEffect, useRef, useState } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const stateRef = useRef({
    currentFrameIndex: 0,
    targetFrameIndex: 0,
    isAnimating: false,
    frameCount: 300,
  });

  useEffect(() => {
    const frameCount = stateRef.current.frameCount;
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    // Preload images
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, "0");
      img.src = `/ezgif-714d268d3f5d511b-jpg/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        loadedCount++;
        const pct = Math.round((loadedCount / frameCount) * 100);
        setProgress(pct);

        if (loadedCount === frameCount) {
          console.log("All 300 frames preloaded successfully");
          setLoaded(true);
        }
      };

      img.onerror = (err) => {
        console.error("Failed to preload frame image path:", img.src, err);
        loadedCount++;
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderCurrentFrame();
    };

    const drawImageProp = (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      x = 0,
      y = 0,
      w = canvas.width,
      h = canvas.height,
      offsetX = 0.5,
      offsetY = 0.5
    ) => {
      // Keep bounds
      offsetX = Math.max(0, Math.min(1, offsetX));
      offsetY = Math.max(0, Math.min(1, offsetY));

      const iw = img.width;
      const ih = img.height;
      const r = Math.min(w / iw, h / ih);
      let nw = iw * r;
      let nh = ih * r;
      let ar = 1;

      // Decide which gap to fill
      if (nw < w) ar = w / nw;
      if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;
      nw *= ar;
      nh *= ar;

      // Calc source rectangle
      const cw = iw / (nw / w);
      const ch = ih / (nh / h);

      const cx = (iw - cw) * offsetX;
      const cy = (ih - ch) * offsetY;

      ctx.drawImage(
        img,
        Math.max(0, cx),
        Math.max(0, cy),
        Math.min(iw, cw),
        Math.min(ih, ch),
        x,
        y,
        w,
        h
      );
    };

    const renderCurrentFrame = () => {
      const { currentFrameIndex, frameCount } = stateRef.current;
      const imgIndex = Math.max(
        0,
        Math.min(frameCount - 1, Math.round(currentFrameIndex))
      );
      const img = imagesRef.current[imgIndex];
      console.log("Rendering frame:", imgIndex, "Image complete:", img?.complete, "Image src:", img?.src);
      if (img && img.complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawImageProp(context, img);
      } else {
        console.warn("Image not ready or missing for frame:", imgIndex);
      }
    };

    const updateAnimation = () => {
      const { targetFrameIndex } = stateRef.current;
      const lerpFactor = 0.12;
      const diff = targetFrameIndex - stateRef.current.currentFrameIndex;

      if (Math.abs(diff) > 0.01) {
        stateRef.current.currentFrameIndex += diff * lerpFactor;
        renderCurrentFrame();
        requestAnimationFrame(updateAnimation);
        stateRef.current.isAnimating = true;
      } else {
        stateRef.current.currentFrameIndex = targetFrameIndex;
        renderCurrentFrame();
        stateRef.current.isAnimating = false;
      }
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScrollTop =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = maxScrollTop <= 0 ? 0 : scrollTop / maxScrollTop;

      stateRef.current.targetFrameIndex = Math.min(
        stateRef.current.frameCount - 1,
        Math.floor(scrollFraction * stateRef.current.frameCount)
      );

      if (!stateRef.current.isAnimating) {
        updateAnimation();
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loaded]);

  return (
    <>
      {/* Premium preloader screen */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-all duration-1000 ${
          loaded ? "opacity-0 pointer-events-none invisible" : "opacity-100"
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-t-2 border-white/40 animate-spin" />
            <div className="absolute inset-2 rounded-full border-b-2 border-white/80 animate-spin [animation-direction:reverse]" />
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-white/60">
            SKYLUXE EXPERIENCE <span className="text-white ml-2">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Background Canvas */}
      <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </>
  );
}
