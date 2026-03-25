'use client';

import { useState, useCallback, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProductBottleScroll, { Flavor } from '@/components/ProductBottleScroll';
import ProductDetails from '@/components/ProductDetails';
import BuyNowSection from '@/components/BuyNowSection';
import FloatingParticles from '@/components/FloatingParticles';

// ─── Product Definitions ───────────────────────────────────────────────────────
const PRODUCTS: {
  flavor: Flavor;
  label: string;
  accent: string; // Tailwind gradient classes for pill active state
}[] = [
  {
    flavor: 'lassi',
    label: 'Lassi',
    accent: 'from-yellow-300 to-amber-500',
  },
  {
    flavor: 'chocolate',
    label: 'Chocolate',
    accent: 'from-amber-700 to-stone-900',
  },
  {
    flavor: 'hazelnut',
    label: 'Hazelnut',
    accent: 'from-orange-400 to-amber-800',
  },
];

// ─── Transition Variants ───────────────────────────────────────────────────────
const pageVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 60 : -60,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -60 : 60,
    transition: { duration: 0.45, ease: [0.7, 0, 0.84, 0] as const },
  }),
};

// ─── Arrow Button ──────────────────────────────────────────────────────────────
const ArrowButton = memo(({
  onClick,
  direction,
  disabled,
}: {
  onClick: () => void;
  direction: 'left' | 'right';
  disabled: boolean;
}) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.9 }}
      className={`w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300
        ${disabled ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white/15 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]'}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {direction === 'left' ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </motion.button>
  );
});

ArrowButton.displayName = 'ArrowButton';

// ─── Footer ────────────────────────────────────────────────────────────────────
const Footer = memo(() => {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#050505] py-10 px-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
        Smoodh
      </span>
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} Smoodh. All rights reserved.
      </p>
      <div className="flex gap-6 text-sm text-gray-400">
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
        <a href="#" className="hover:text-white transition-colors">Contact</a>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

const BG_GLOW: Record<Flavor, string> = {
  lassi: 'radial-gradient(circle at 50% 20%, rgba(251,191,36,0.08) 0%, transparent 60%)',
  chocolate: 'radial-gradient(circle at 50% 20%, rgba(168,162,158,0.06) 0%, transparent 60%)',
  hazelnut: 'radial-gradient(circle at 50% 20%, rgba(251,146,60,0.08) 0%, transparent 60%)',
};

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const navigate = useCallback(
    (nextIndex: number) => {
      if (nextIndex < 0 || nextIndex >= PRODUCTS.length) return;
      setDirection(nextIndex > activeIndex ? 1 : -1);
      setActiveIndex(nextIndex);
      // Reset scroll to top when switching products
      window.scrollTo({ top: 0, behavior: 'instant' });
    },
    [activeIndex]
  );

  const activeFlavor = PRODUCTS[activeIndex].flavor;

  return (
    <div className="bg-[#050505] min-h-screen relative overflow-hidden text-white selection:bg-white/20">
      
      {/* Animated Subtle Background Glow based on flavor */}
      <motion.div
        key={`bg-${activeFlavor}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed inset-0 z-0 h-[100vh]"
        style={{ background: BG_GLOW[activeFlavor] }}
      />
      
      <FloatingParticles />
      
      {/* Product Switcher */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={activeFlavor}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <ProductBottleScroll flavor={activeFlavor} />
          <ProductDetails flavor={activeFlavor} />
          <BuyNowSection flavor={activeFlavor} />
        </motion.div>
      </AnimatePresence>

      {/* Left / Right Arrow Navigation — fixed, vertically centered */}
      <div className="fixed top-1/2 -translate-y-1/2 left-4 md:left-8 z-40">
        <ArrowButton
          direction="left"
          onClick={() => navigate(activeIndex - 1)}
          disabled={activeIndex === 0}
        />
      </div>
      <div className="fixed top-1/2 -translate-y-1/2 right-4 md:right-8 z-40">
        <ArrowButton
          direction="right"
          onClick={() => navigate(activeIndex + 1)}
          disabled={activeIndex === PRODUCTS.length - 1}
        />
      </div>

      {/* Pill Navigation — fixed bottom center */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-3 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {PRODUCTS.map((product, i) => {
          const isActive = i === activeIndex;
          return (
            <motion.button
              key={product.flavor}
              onClick={() => navigate(i)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {/* Active pill background */}
              {isActive && (
                <motion.span
                  layoutId="pill-bg"
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${product.accent} opacity-90`}
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">{product.label}</span>
            </motion.button>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}
