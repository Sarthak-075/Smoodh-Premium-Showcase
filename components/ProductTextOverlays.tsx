import { memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RefObject } from 'react';

// You can pass the flavor specific texts or generic ones
interface ProductTextOverlaysProps {
  targetRef: RefObject<HTMLElement | null>;
  flavor: string;
}

const ProductTextOverlays = memo(({ targetRef, flavor }: ProductTextOverlaysProps) => {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // We have 4 phases based on user requirements: 0.1, 0.3, 0.6, 0.8
  // Fade IN -> Hold -> Fade OUT

  // ─── Section 1 (Peak at 0.1)
  const o1 = useTransform(scrollYProgress, [0.02, 0.1, 0.15, 0.22], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.02, 0.1, 0.15, 0.22], [80, 0, 0, -80]);
  const b1 = useTransform(scrollYProgress, [0.02, 0.1, 0.15, 0.22], ["blur(16px)", "blur(0px)", "blur(0px)", "blur(16px)"]);

  // ─── Section 2 (Peak at 0.3)
  const o2 = useTransform(scrollYProgress, [0.22, 0.3, 0.4, 0.48], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.22, 0.3, 0.4, 0.48], [80, 0, 0, -80]);
  const b2 = useTransform(scrollYProgress, [0.22, 0.3, 0.4, 0.48], ["blur(16px)", "blur(0px)", "blur(0px)", "blur(16px)"]);

  // ─── Section 3 (Peak at 0.6)
  const o3 = useTransform(scrollYProgress, [0.52, 0.6, 0.75, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.52, 0.6, 0.75, 0.8], [80, 0, 0, -80]);
  const b3 = useTransform(scrollYProgress, [0.52, 0.6, 0.75, 0.8], ["blur(16px)", "blur(0px)", "blur(0px)", "blur(16px)"]);

  // ─── Section 4 (Peak at 0.8)
  const o4 = useTransform(scrollYProgress, [0.8, 0.85, 0.95, 1.0], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.8, 0.85, 0.95, 1.0], [80, 0, 0, -80]);
  const b4 = useTransform(scrollYProgress, [0.8, 0.85, 0.95, 1.0], ["blur(16px)", "blur(0px)", "blur(0px)", "blur(16px)"]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center overflow-hidden">
      
      {/* Section 1 */}
      <motion.div 
        style={{ opacity: o1, y: y1, filter: b1 }}
        className="absolute w-full px-8 md:px-24 flex flex-col items-center md:items-start text-center md:text-left drop-shadow-2xl"
      >
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">
          Pure <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
            Indulgence
          </span>
        </h2>
        <p className="mt-4 text-lg md:text-2xl text-gray-300 font-medium max-w-lg tracking-wide">
          Experience the rich, velvety texture of our premium <span className="capitalize">{flavor}</span> blend.
        </p>
      </motion.div>

      {/* Section 2 */}
      <motion.div 
        style={{ opacity: o2, y: y2, filter: b2 }}
        className="absolute w-full px-8 md:px-24 flex flex-col items-center md:items-end text-center md:text-right drop-shadow-2xl"
      >
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">
          Perfectly <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
            Crafted
          </span>
        </h2>
        <p className="mt-4 text-lg md:text-2xl text-gray-300 font-medium max-w-lg tracking-wide">
          Meticulously formulated for the ultimate taste experience. Every sip is a masterpiece.
        </p>
      </motion.div>

      {/* Section 3 */}
      <motion.div 
        style={{ opacity: o3, y: y3, filter: b3 }}
        className="absolute w-full px-8 md:px-24 flex flex-col items-center md:items-start text-center md:text-left drop-shadow-2xl"
      >
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">
          Uncompromised <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-emerald-500">
            Quality
          </span>
        </h2>
        <p className="mt-4 text-lg md:text-2xl text-gray-300 font-medium max-w-lg tracking-wide">
          Sourced from the finest ingredients to deliver a bold, unforgettable flavor.
        </p>
      </motion.div>

      {/* Section 4 */}
      <motion.div 
        style={{ opacity: o4, y: y4, filter: b4 }}
        className="absolute w-full px-8 flex flex-col items-center text-center drop-shadow-2xl"
      >
        <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white">
          Taste the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
            Difference
          </span>
        </h2>
        <p className="mt-6 text-xl md:text-3xl text-gray-300 font-medium max-w-2xl tracking-wide">
          Elevate your daily routine. Try <span className="capitalize">{flavor}</span> today.
        </p>
      </motion.div>

    </div>
  );
});

ProductTextOverlays.displayName = 'ProductTextOverlays';

export default ProductTextOverlays;
