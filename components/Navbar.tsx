'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { EASE_OUT } from '@/lib/easing';

// Section IDs matching the `id` props on the page components
const NAV_LINKS = [
  { label: 'Products', href: '#hero'     },
  { label: 'About',    href: '#about'    },
  { label: 'Benefits', href: '#benefits' },
] as const;

function smoothScrollTo(id: string) {
  if (id === '#hero') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled]     = useState(false);
  const [activeSection, setActiveSection] = useState<string>('#hero');
  const [isHovered, setIsHovered]       = useState<string | null>(null);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  // IntersectionObserver to highlight active section
  useEffect(() => {
    const sectionIds = ['#about', '#benefits'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.querySelector(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    // Default to hero if nothing else intersects
    const heroObs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveSection('#hero'); },
      { threshold: 0.1 }
    );
    const heroEl = document.querySelector('#hero');
    if (heroEl) heroObs.observe(heroEl);
    observers.push(heroObs);

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleOrderNow = useCallback(() => {
    smoothScrollTo('#buy');
  }, []);

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
      <button
        onClick={() => smoothScrollTo('#hero')}
        className="relative z-10 group overflow-hidden"
      >
        <motion.span
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="block text-2xl font-black tracking-tighter uppercase"
        >
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(232,121,249,0.3)]">
            Smoodh
          </span>
        </motion.span>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 rounded-full px-6 py-2 border border-transparent transition-all duration-700 has-[:hover]:bg-white/[0.03] has-[:hover]:backdrop-blur-2xl has-[:hover]:border-white/[0.08]">
        {NAV_LINKS.map(({ label, href }) => {
          const isActive = activeSection === href;
          return (
            <div
              key={label}
              className="relative px-5 py-2 cursor-pointer"
              onMouseEnter={() => setIsHovered(label)}
              onMouseLeave={() => setIsHovered(null)}
              onClick={() => smoothScrollTo(href)}
            >
              {/* Hover pill */}
              <AnimatePresence>
                {isHovered === label && !isActive && (
                  <motion.span
                    layoutId="navHoverPill"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="absolute inset-0 z-0 bg-white/[0.08] border border-white/10 rounded-full"
                  />
                )}
              </AnimatePresence>

              {/* Active section pill */}
              {isActive && (
                <motion.span
                  layoutId="navActivePill"
                  className="absolute inset-0 z-0 rounded-full bg-white/10 border border-white/20"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}

              <span
                className={`relative z-10 text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  isActive || isHovered === label ? 'text-white drop-shadow-sm' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </nav>

      {/* Order Now CTA */}
      <motion.button
        onClick={handleOrderNow}
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
    </motion.header>
  );
}
