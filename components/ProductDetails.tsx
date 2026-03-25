'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

interface Props {
  flavor: string;
}

const flavorData = {
  lassi: {
    title: "Vibrant & Refreshing",
    description: "Authentic Indian lassi blended to perfection. Experience the traditional taste with a premium modern twist.",
    image: "/lassi.png",
    glow: "bg-amber-400"
  },
  chocolate: {
    title: "Decadent Dark Cocoa",
    description: "Rich, velvety European cocoa crafted for the ultimate chocolate connoisseur. A luxurious escape in every sip.",
    image: "/chocolate.png",
    glow: "bg-stone-500"
  },
  hazelnut: {
    title: "Roasted Hazelnut Delight",
    description: "Premium roasted hazelnuts combined with our signature creamy base. A sophisticated and nutty indulgence.",
    image: "/hazelnut.png",
    glow: "bg-orange-500"
  }
};

const easing = [0.16, 1, 0.3, 1]; // Premium cubic-bezier

export default function ProductDetails({ flavor }: Props) {
  const data = flavorData[flavor as keyof typeof flavorData] || flavorData.lassi;
  const sectionRef = useRef<HTMLElement>(null);
  
  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const yText = useTransform(scrollYProgress, [0, 1], [150, -50]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scaleImage = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);

  return (
    <section ref={sectionRef} className="relative z-10 w-full bg-[#050505] py-32 px-6 md:px-12 lg:px-24 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24 relative">
        
        {/* Left: Text Content with parallax */}
        <motion.div 
          style={{ y: yText }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: easing }}
          className="flex-1 space-y-8 relative z-20"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: easing }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1]"
          >
            {data.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.1, ease: easing }}
            className="text-lg md:text-2xl text-gray-400 leading-relaxed font-medium max-w-lg"
          >
            {data.description}
          </motion.p>
          
          <ul className="space-y-5 pt-6">
            {['100% Natural Ingredients', 'No Artificial Preservatives', 'Locally Sourced Dairy'].map((item, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -25, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1 + 0.2, ease: easing }}
                className="flex items-center text-gray-300 font-medium text-lg tracking-tight hover:text-white transition-colors duration-300 cursor-default"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.1 + 0.5, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }} // Springy pop
                  className="w-2 h-2 rounded-full bg-white mr-4 opacity-80" 
                />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Right: Image Element with deep parallax */}
        <motion.div 
          style={{ y: yImage, scale: scaleImage }}
          className="flex-1 w-full max-w-lg relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: easing }}
            className="relative aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden bg-white/[0.01] border border-white/5 p-12 flex items-center justify-center group"
          >
            {/* Soft ambient glow behind image */}
            <div className={`absolute inset-0 opacity-10 blur-[80px] rounded-full transition-opacity duration-1000 group-hover:opacity-30 ${data.glow}`} />
            
            <motion.div
              whileHover={{ scale: 1.08, rotate: 2 }}
              transition={{ duration: 0.8, ease: easing }}
              className="relative w-full h-full z-10"
            >
              <Image 
                src={data.image} 
                alt={data.title} 
                fill 
                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
