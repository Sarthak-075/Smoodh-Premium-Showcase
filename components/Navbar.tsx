'use client';

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const easing = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: easing }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-700 ${
        isScrolled
          ? 'bg-[#020202]/50 backdrop-blur-[32px] border-b border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.5)]'
          : 'bg-transparent border-b border-transparent shadow-none'
      }`}
    >
      {/* Logo */}
      <Link href="/" className="relative z-10 group overflow-hidden">
        <motion.span 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="block text-2xl font-black tracking-tighter uppercase relative"
        >
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(232,121,249,0.3)]">
            Smoodh
          </span>
        </motion.span>
      </Link>

      {/* Desktop Links (Apple-style pill nav on hover) */}
      <nav className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 rounded-full px-8 py-2.5 transition-all duration-700 has-[:hover]:bg-white/[0.02] has-[:hover]:backdrop-blur-2xl has-[:hover]:border has-[:hover]:border-white/[0.08] border border-transparent">
        {['Flavors', 'Process', 'Story'].map((item) => (
          <div 
            key={item}
            className="relative px-6 py-2"
            onMouseEnter={() => setIsHovered(item)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <AnimatePresence>
              {isHovered === item && (
                <motion.span
                  layoutId="navPill"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  className="absolute inset-0 z-0 bg-white/[0.08] border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] rounded-full"
                />
              )}
            </AnimatePresence>
            <Link
              href={`#${item.toLowerCase()}`}
              className={`relative z-10 text-sm font-semibold tracking-wide transition-colors duration-300 ${isHovered === item ? 'text-white drop-shadow-md' : 'text-gray-400'}`}
            >
              {item}
            </Link>
          </div>
        ))}
      </nav>

      {/* CTA Button */}
      <div className="flex items-center">
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(217,70,239,0.5)' }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="group relative rounded-full bg-white px-8 py-3 text-sm font-black tracking-tight text-black shadow-[0_5px_20px_rgba(255,255,255,0.1)] overflow-hidden"
        >
          {/* subtle moving beam inside button */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-[150%] transition-transform duration-[1.5s] ease-in-out group-hover:animate-[shimmer_1.5s_infinite]" />
          
          <span className="relative z-10 flex items-center gap-2">
            Order Now
            <motion.span 
              className="inline-block relative top-[1px]"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.4, ease: easing }}
            >
              →
            </motion.span>
          </span>
        </motion.button>
      </div>
    </motion.header>
  );
}
