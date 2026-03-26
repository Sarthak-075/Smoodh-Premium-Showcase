'use client';

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { EASE_OUT } from '@/lib/easing';
import { PRODUCTS } from '@/data/products';
import { useProduct } from '@/lib/ProductContext';

const NAV_ITEMS = PRODUCTS.map((p, i) => ({ label: p.navLabel, index: i }));

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const { activeIndex, navigate } = useProduct();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: EASE_OUT }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-1000 ${
        isScrolled
          ? 'bg-black/20 backdrop-blur-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.8)]'
          : 'bg-transparent shadow-none'
      }`}
    >
      {/* Gradient border glow on scroll */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent transition-opacity duration-1000 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Logo */}
      <Link href="/" className="relative z-10 group overflow-hidden">
        <motion.span
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="block text-2xl font-black tracking-tighter uppercase relative"
        >
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(232,121,249,0.3)]">
            Smoodh
          </span>
        </motion.span>
      </Link>

      {/* Desktop Nav — switches product on click, shows active highlight */}
      <nav className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 rounded-full px-8 py-2.5 transition-all duration-700 border border-transparent has-[:hover]:bg-white/[0.02] has-[:hover]:backdrop-blur-2xl has-[:hover]:border-white/[0.08]">
        {NAV_ITEMS.map((item) => {
          const isActive = item.index === activeIndex;
          return (
            <div
              key={item.label}
              className="relative px-6 py-2 cursor-pointer"
              onMouseEnter={() => setIsHovered(item.label)}
              onMouseLeave={() => setIsHovered(null)}
              onClick={() => navigate(item.index)}
            >
              {/* Hover pill */}
              <AnimatePresence>
                {isHovered === item.label && !isActive && (
                  <motion.span
                    layoutId="navPill"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="absolute inset-0 z-0 bg-white/[0.08] border border-white/10 rounded-full"
                  />
                )}
              </AnimatePresence>

              {/* Active product pill */}
              {isActive && (
                <motion.span
                  layoutId="activeNavPill"
                  className={`absolute inset-0 z-0 rounded-full bg-gradient-to-r ${PRODUCTS[item.index].accent} opacity-80`}
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}

              <span
                className={`relative z-10 text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  isActive ? 'text-white drop-shadow-md' : isHovered === item.label ? 'text-white drop-shadow-md' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </nav>

      {/* CTA Button */}
      <div className="flex items-center">
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(217,70,239,0.8)' }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="group relative rounded-full bg-gradient-to-r from-pink-600 to-fuchsia-600 px-8 py-3 text-sm font-black tracking-tight text-white shadow-[0_10px_30px_rgba(217,70,239,0.4)] border border-white/20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover:animate-[shimmer_1.5s_infinite]" />
          <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
            Order Now
            <motion.span
              className="inline-block relative top-[1px]"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            >
              →
            </motion.span>
          </span>
        </motion.button>
      </div>
    </motion.header>
  );
}
