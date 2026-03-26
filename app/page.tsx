'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { EASE_OUT, EASE_IN } from '@/lib/easing';
import { PRODUCTS, BG_GLOW } from '@/data/products';
import type { Flavor } from '@/data/products';
import { useProduct } from '@/lib/ProductContext';
import ProductBottleScroll from '@/components/ProductBottleScroll';
import ProductDetails from '@/components/ProductDetails';
import BuyNowSection from '@/components/BuyNowSection';
import FloatingParticles from '@/components/FloatingParticles';
import ArrowButton from '@/components/ArrowButton';
import Footer from '@/components/Footer';

// ─── Transition Variants (Cinematic Crossfade + Scale) ────────────────────────
const pageVariants = {
  enter: {
    opacity: 0,
    scale: 0.95,
    filter: 'blur(10px)',
  },
  center: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    filter: 'blur(10px)',
    transition: { duration: 0.5, ease: EASE_IN },
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const { activeIndex, navigate } = useProduct();
  const activeFlavor: Flavor = PRODUCTS[activeIndex].flavor;

  return (
    <div className="bg-[#050505] min-h-screen relative text-white selection:bg-white/20">

      {/* Animated flavor background glow */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`bg-${activeFlavor}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: EASE_OUT }}
          className="pointer-events-none fixed inset-0 z-0 h-[100vh]"
          style={{ background: BG_GLOW[activeFlavor] }}
        />
      </AnimatePresence>

      <FloatingParticles />

      {/* Cinematic product crossfade transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFlavor}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="relative z-10 w-full overflow-visible origin-center"
        >
          <ProductBottleScroll flavor={activeFlavor} />
          <ProductDetails flavor={activeFlavor} />
          <BuyNowSection flavor={activeFlavor} />
        </motion.div>
      </AnimatePresence>

      {/* Fixed Arrow Navigation */}
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

      {/* Fixed Bottom Pill Navigation */}
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
