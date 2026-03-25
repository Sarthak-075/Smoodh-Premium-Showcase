'use client';

import { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FloatingParticles() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Generate 15 minimal particles (Memoized)
  const particles = useMemo(() => Array.from({ length: 15 }).map((_, i) => {
    const size = Math.random() * 3 + 1;
    const xBase = Math.random() * 100; // vw
    const yBase = Math.random() * 100; // vh
    const duration = Math.random() * 20 + 20;
    const delay = Math.random() * -20;
    const opacity = Math.random() * 0.15 + 0.05;

    return { size, xBase, yBase, duration, delay, opacity, id: i };
  }), []);

  return (
    <motion.div 
      style={{ y }} 
      className="pointer-events-none fixed inset-0 z-0 h-[200vh] w-full"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.xBase}vw`,
            top: `${p.yBase}vh`,
            opacity: p.opacity,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -30, 0, 30, 0],
            x: [0, 20, 0, -20, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </motion.div>
  );
}
