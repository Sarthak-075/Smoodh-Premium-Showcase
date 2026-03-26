'use client';

import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { useRef, MouseEvent } from 'react';

interface Props {
  flavor: string;
}

const pricingData = {
  lassi: { price: "$4.99", accent: "from-yellow-300 to-amber-500", glow: "hover:shadow-[0_0_40px_rgba(251,191,36,0.3)]", shadow: "rgba(251,191,36,0.2)" },
  chocolate: { price: "$5.49", accent: "from-stone-400 to-stone-600", glow: "hover:shadow-[0_0_40px_rgba(168,162,158,0.3)]", shadow: "rgba(168,162,158,0.2)" },
  hazelnut: { price: "$5.99", accent: "from-orange-400 to-amber-600", glow: "hover:shadow-[0_0_40px_rgba(251,146,60,0.3)]", shadow: "rgba(251,146,60,0.2)" }
};

const easing = [0.16, 1, 0.3, 1] as const; // Premium cubic-bezier

export default function BuyNowSection({ flavor }: Props) {
  const data = pricingData[flavor as keyof typeof pricingData] || pricingData.lassi;
  const sectionRef = useRef<HTMLElement>(null);
  
  // Magnetic effect coordinates for button
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

  // Parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const yCard = useTransform(scrollYProgress, [0, 1], [100, -50]);

  return (
    <section ref={sectionRef} className="relative z-10 w-full bg-[#050505] pt-12 pb-48 px-6 perspective-1000">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          style={{ y: yCard }}
          initial={{ opacity: 0, scale: 0.95, rotateX: 5 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: easing }}
          className="relative rounded-[3rem] bg-white/[0.015] border border-white/10 p-10 md:p-20 flex flex-col items-center text-center group shadow-2xl backdrop-blur-3xl overflow-hidden"
        >
          {/* Animated gradient spotlight matching cursor (premium glassy effect) */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${data.shadow}, transparent 70%)` }} />

          <motion.h2 
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: easing }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter relative z-10 drop-shadow-lg"
          >
            Ready to Experience <span className="capitalize text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{flavor}</span>?
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex items-end justify-center gap-2 mb-12 relative z-10"
          >
            <span className={`text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b ${data.accent} drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]`}>
              {data.price}
            </span>
            <span className="text-gray-400 text-2xl font-medium mb-3">/ bottle</span>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mb-14 relative z-10">
            {[
              { icon: "✧", title: "Premium", desc: "Highest quality ingredients" },
              { icon: "🧊", title: "Chilled", desc: "Delivered ice cold" },
              { icon: "⚡", title: "Energy", desc: "Natural daily boost" }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 + 0.3, ease: easing }}
                whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.08)" }}
                className="flex flex-col items-center p-8 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-md transition-all duration-500"
              >
                <span className="text-3xl mb-4 opacity-80">{feature.icon}</span>
                <span className="text-lg text-white font-bold tracking-tight mb-1">{feature.title}</span>
                <span className="text-sm text-gray-400 text-center">{feature.desc}</span>
              </motion.div>
            ))}
          </div>

          <motion.button 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: useTransform(mouseX, [0, 100], [0, 15]), y: useTransform(mouseY, [0, 100], [0, 15]) }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`relative overflow-hidden rounded-full bg-white px-14 py-5 text-xl font-black text-black tracking-tight z-10 ${data.glow} shadow-[0_10px_40px_rgba(255,255,255,0.1)]`}
          >
            Order Delivery Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
