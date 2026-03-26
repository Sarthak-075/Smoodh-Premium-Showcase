'use client';

import { useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function FloatingParticles() {
  const { scrollYProgress } = useScroll();
  
  // Cinematic organic physics for scroll tracking
  const smoothY = useSpring(scrollYProgress, { stiffness: 40, damping: 20, mass: 1 });

  // 3 distinct layers of parallax mapping
  const bgY = useTransform(smoothY, [0, 1], [0, -100]); // Far: Moves up slowly
  const midY = useTransform(smoothY, [0, 1], [0, -400]); // Mid: Moves up normally
  const fgY = useTransform(smoothY, [0, 1], [0, 800]);  // Fore: Moves DOWN incredibly fast to simulate passing camera

  // Helper to generate a particle layer
  const generateLayer = (count: number, sizeRange: [number, number], opacityRange: [number, number]) => {
    return Array.from({ length: count }).map(() => ({
      size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
      xBase: Math.random() * 100, // vw
      yBase: Math.random() * 200 - 50, // spread across 200vh
      duration: Math.random() * 20 + 30, // slow ambient float
      delay: Math.random() * -30,
      opacity: Math.random() * (opacityRange[1] - opacityRange[0]) + opacityRange[0],
      id: Math.random(),
    }));
  };

  // Memoize layers heavily to prevent CPU spikes on re-render
  const bgParticles = useMemo(() => generateLayer(25, [1, 2], [0.05, 0.15]), []);
  const midParticles = useMemo(() => generateLayer(15, [2, 4], [0.1, 0.3]), []);
  // Foreground particles are massive, heavily blurred blobs
  const fgParticles = useMemo(() => generateLayer(6, [20, 60], [0.05, 0.15]), []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-screen w-full overflow-visible">
      
      {/* Background (Far depth focus - deeply integrated into the backdrop) */}
      <motion.div style={{ y: bgY }} className="absolute inset-x-0 top-0 h-[200vh] w-full z-0">
        {bgParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            style={{ width: p.size, height: p.size, left: `${p.xBase}vw`, top: `${p.yBase}vh`, opacity: p.opacity, filter: 'blur(1px)' }}
            animate={{ y: [0, -20, 0, 20, 0], x: [0, 15, 0, -15, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay }}
          />
        ))}
      </motion.div>

      {/* Midground (Standard floating depth) */}
      <motion.div style={{ y: midY }} className="absolute inset-x-0 top-0 h-[200vh] w-full z-10">
        {midParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.6)]"
            style={{ width: p.size, height: p.size, left: `${p.xBase}vw`, top: `${p.yBase}vh`, opacity: p.opacity }}
            animate={{ y: [0, -40, 0, 40, 0], x: [0, 30, 0, -30, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay }}
          />
        ))}
      </motion.div>

      {/* Foreground (Macro depth-of-field effect - massive blur, passes *over* UI layers) */}
      <motion.div style={{ y: fgY }} className="absolute inset-x-0 top-0 h-[200vh] w-full z-[100]">
        {fgParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{ width: p.size, height: p.size, left: `${p.xBase}vw`, top: `${p.yBase}vh`, opacity: p.opacity, filter: 'blur(20px)' }}
            animate={{ y: [0, -60, 0, 60, 0], x: [0, 50, 0, -50, 0] }}
            transition={{ duration: p.duration * 0.5, repeat: Infinity, ease: "linear", delay: p.delay }}
          />
        ))}
      </motion.div>

    </div>
  );
}
