'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useSpring, useTransform, cubicBezier, useMotionValueEvent } from 'framer-motion';
import ProductTextOverlays from './ProductTextOverlays';
import type { Flavor } from '@/data/products';

// Re-export Flavor so other files that imported it from here continue to work
export type { Flavor };

interface ProductBottleScrollProps {
  flavor: Flavor;
  totalFrames?: number;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function getFramePath(flavor: Flavor, index: number) {
  return `/images/${flavor}/ (${index + 1}).webp`;
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function ProductBottleScroll({
  flavor,
  totalFrames = 120,
}: ProductBottleScrollProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isInViewRef = useRef(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // ─── Draw a single frame (Memoized) ─────────────────────────────────────────
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Safety clamp
    const idx = Math.round(Math.min(Math.max(frameIndex, 0), totalFrames - 1));
    const img = imagesRef.current[idx];
    if (!img?.complete || img.naturalWidth === 0) return;

    // Cover-fit: maintains aspect ratio, fills canvas, centered
    const { width: cw, height: ch } = canvas;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, [totalFrames]);

  // ─── Intersection Observer for RAF control ──────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.01 } // Trigger even if barely visible
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // ─── Preload all frames ─────────────────────────────────────────────────────
  useEffect(() => {
    setIsReady(false);
    setLoadProgress(0);
    currentFrameRef.current = 0;
    targetFrameRef.current = 0;

    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(totalFrames);
    imagesRef.current = images;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = getFramePath(flavor, i);
      img.onload = img.onerror = () => {
        loadedCount++;
        setLoadProgress(Math.floor((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          setIsReady(true);
          drawFrame(0);
        }
      };
      images[i] = img;
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flavor, totalFrames, drawFrame]);

  // ─── Scroll physics with Framer Motion ──────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 1. Cinematic custom easing (adds pace variation across the scroll length)
  const customEase = cubicBezier(0.16, 1, 0.3, 1);
  const easedProgress = useTransform(scrollYProgress, [0, 1], [0, 1], { ease: customEase });

  // 2. Spring Physics (creates organic acceleration / deceleration)
  const smoothProgress = useSpring(easedProgress, {
    stiffness: 80,    // Balance between responsiveness and floatiness
    damping: 25,      // Friction to prevent bouncy overshoot
    mass: 1.5         // Heavier mass generates buttery-smooth momentum and deceleration
  });

  // 3. React to physics updates at screen refresh rate
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (!isReady || !isInViewRef.current) return;
    
    // Map physical progress strictly to the frame range
    const targetFrame = latest * (totalFrames - 1);
    
    // Safety clamp in case the physics spring overshoots boundaries
    const clampedFrame = Math.max(0, Math.min(targetFrame, totalFrames - 1));
    
    // Update ref so resize event can redraw the current state
    currentFrameRef.current = clampedFrame;
    
    // drawFrame handles the integer rounding mapping to image arrays internally
    drawFrame(clampedFrame);
  });

  // ─── Responsive DPR-correct canvas sizing ──────────────────────────────────
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Reset transform before setting new dimensions
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawFrame]);

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div 
      ref={containerRef} 
      style={{ height: '500vh', position: 'relative' }}
    >

      {/* Loading overlay */}
      {!isReady && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: '#050505',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            color: '#fff',
          }}
        >
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.25em', opacity: 0.4, marginBottom: '1rem', textTransform: 'uppercase' }}>
            {flavor}
          </p>
          <div
            style={{
              width: 180,
              height: 1,
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 999,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${loadProgress}%`,
                background: '#fff',
                borderRadius: 999,
                transition: 'width 0.08s linear',
              }}
            />
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.7rem', opacity: 0.3 }}>
            {loadProgress}%
          </p>
        </div>
      )}

      {/* Sticky canvas and overlays */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
        {/* Cinematic backlight glow */}
        <div
          style={{
            position: 'absolute',
            width: '60vw',
            height: '60vw',
            borderRadius: '50%',
            opacity: isReady ? 0.6 : 0,
            transition: 'opacity 1.5s ease 0.5s',
            filter: 'blur(100px)',
            background: flavor === 'lassi' ? '#fbbf24' : flavor === 'chocolate' ? '#a8a29e' : '#f97316',
            zIndex: 0,
            transform: 'translateY(-10%)',
          }}
        />

        {/* Soft simulated floor shadow beneath the bottle */}
        <div 
          style={{
            position: 'absolute',
            bottom: '15vh',
            width: '40vw',
            height: '5vh',
            borderRadius: '50%',
            opacity: isReady ? 0.5 : 0,
            transition: 'opacity 1.5s ease 0.5s',
            filter: 'blur(20px)',
            background: '#000000',
            zIndex: 0,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            background: 'transparent',
            opacity: isReady ? 1 : 0,
            transition: 'opacity 0.6s ease',
            imageRendering: 'auto',
            willChange: 'transform, opacity',
            position: 'relative',
            zIndex: 5,
          }}
        />
        {/* Render overlays when ready to prevent weird un-synced text jumping initially */}
        {isReady && <ProductTextOverlays targetRef={containerRef} flavor={flavor} />}
      </div>
    </div>
  );
}
