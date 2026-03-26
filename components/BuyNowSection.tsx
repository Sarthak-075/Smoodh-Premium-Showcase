'use client';

import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { useRef, MouseEvent } from 'react';
import { EASE_OUT, EASE_SPRING } from '@/lib/easing';
import { PRICING_DATA } from '@/data/products';
import type { Flavor } from '@/data/products';

interface Props {
  flavor: Flavor;
}

const FEATURES = [
  { icon: '✧', title: 'Premium',  desc: 'Highest quality ingredients' },
  { icon: '🧊', title: 'Chilled',  desc: 'Delivered ice cold'          },
  { icon: '⚡', title: 'Energy',   desc: 'Natural daily boost'         },
] as const;

export default function BuyNowSection({ flavor }: Props) {
  const data = PRICING_DATA[flavor];
  const sectionRef = useRef<HTMLElement>(null);

  // Magnetic CTA effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yCard = useTransform(scrollYProgress, [0, 1], [100, -50]);

  return (
    <section id="buy" ref={sectionRef} className="relative z-10 w-full bg-[#050505] pt-12 pb-48 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          style={{ y: yCard }}
          initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: EASE_OUT }}
          className="relative rounded-[3rem] bg-white/[0.015] border border-white/10 p-10 md:p-20 flex flex-col items-center text-center group shadow-2xl backdrop-blur-3xl overflow-hidden"
        >
          {/* Hover radial spotlight */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 0%, ${data.shadow}, transparent 70%)` }}
          />

          <motion.h2
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: EASE_OUT }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter relative z-10 drop-shadow-lg"
          >
            Ready to Experience{' '}
            <span className="capitalize text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              {flavor}
            </span>
            ?
          </motion.h2>

          {/* Price */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: EASE_SPRING }}
            className="flex items-end justify-center gap-2 mb-12 relative z-10"
          >
            <span className={`text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b ${data.accent} drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]`}>
              {data.price}
            </span>
            <span className="text-gray-400 text-2xl font-medium mb-3">/ 150ml bottle</span>
          </motion.div>

          {/* Feature grid */}
          <div id="benefits" className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mb-14 relative z-10">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 + 0.3, ease: EASE_OUT }}
                whileHover={{ y: -10, scale: 1.05, backgroundColor: 'rgba(255,255,255,0.12)' }}
                className="flex flex-col items-center p-8 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-md transition-all duration-300"
              >
                <span className="text-4xl mb-5 opacity-90 drop-shadow-md">{feature.icon}</span>
                <span className="text-xl text-white font-black tracking-tight mb-2 drop-shadow-sm">{feature.title}</span>
                <span className="text-sm text-gray-400 text-center font-medium leading-relaxed">{feature.desc}</span>
              </motion.div>
            ))}
          </div>

          {/* Magnetic CTA Button */}
          <motion.button
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              x: useTransform(mouseX, [0, 100], [0, 15]),
              y: useTransform(mouseY, [0, 100], [0, 15]),
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`relative overflow-hidden rounded-full bg-white px-14 py-5 text-xl font-black text-black tracking-tight z-10 ${data.glow} shadow-[0_10px_40px_rgba(255,255,255,0.1)]`}
          >
            Order Delivery Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
