/**
 * Centralized product/flavor data for the Smoodh website.
 * All components should import flavor metadata from here.
 */

export type Flavor = 'lassi' | 'chocolate' | 'hazelnut';

// ─── Navigation Products ──────────────────────────────────────────────────────
export const PRODUCTS: {
  flavor: Flavor;
  label: string;
  /** Tailwind gradient classes for the bottom-pill active state */
  accent: string;
}[] = [
  { flavor: 'lassi',     label: 'Lassi',     accent: 'from-yellow-300 to-amber-500' },
  { flavor: 'chocolate', label: 'Chocolate', accent: 'from-amber-700 to-stone-900' },
  { flavor: 'hazelnut',  label: 'Hazelnut',  accent: 'from-orange-400 to-amber-800' },
];

// ─── Background Radial Glow per Flavor ────────────────────────────────────────
export const BG_GLOW: Record<Flavor, string> = {
  lassi:     'radial-gradient(circle at 50% 20%, rgba(251,191,36,0.08) 0%, transparent 60%)',
  chocolate: 'radial-gradient(circle at 50% 20%, rgba(168,162,158,0.06) 0%, transparent 60%)',
  hazelnut:  'radial-gradient(circle at 50% 20%, rgba(251,146,60,0.08) 0%, transparent 60%)',
};

// ─── Backlight Color per Flavor (for canvas glow) ────────────────────────────
export const BACKLIGHT_COLOR: Record<Flavor, string> = {
  lassi:     '#fbbf24',
  chocolate: '#a8a29e',
  hazelnut:  '#f97316',
};

// ─── Product Details Section ──────────────────────────────────────────────────
export const FLAVOR_DETAILS: Record<Flavor, {
  title: string;
  description: string;
  image: string;
  /** Tailwind bg color for the ambient glow blob */
  glow: string;
}> = {
  lassi: {
    title: 'Vibrant & Refreshing',
    description: 'Authentic Indian lassi blended to perfection. Experience the traditional taste with a premium modern twist.',
    image: '/lassi.png',
    glow: 'bg-amber-400',
  },
  chocolate: {
    title: 'Decadent Dark Cocoa',
    description: 'Rich, velvety European cocoa crafted for the ultimate chocolate connoisseur. A luxurious escape in every sip.',
    image: '/chocolate.png',
    glow: 'bg-stone-500',
  },
  hazelnut: {
    title: 'Roasted Hazelnut Delight',
    description: 'Premium roasted hazelnuts combined with our signature creamy base. A sophisticated and nutty indulgence.',
    image: '/hazelnut.png',
    glow: 'bg-orange-500',
  },
};

// ─── Buy Now (Pricing) Section ─────────────────────────────────────────────────
export const PRICING_DATA: Record<Flavor, {
  price: string;
  /** Tailwind gradient for price text */
  accent: string;
  /** Tailwind hover shadow for card */
  glow: string;
  /** rgba shadow color for radial card glow */
  shadow: string;
}> = {
  lassi:     { price: '$4.99', accent: 'from-yellow-300 to-amber-500',  glow: 'hover:shadow-[0_0_40px_rgba(251,191,36,0.3)]',  shadow: 'rgba(251,191,36,0.2)'  },
  chocolate: { price: '$5.49', accent: 'from-stone-400 to-stone-600',   glow: 'hover:shadow-[0_0_40px_rgba(168,162,158,0.3)]', shadow: 'rgba(168,162,158,0.2)' },
  hazelnut:  { price: '$5.99', accent: 'from-orange-400 to-amber-600',  glow: 'hover:shadow-[0_0_40px_rgba(251,146,60,0.3)]',  shadow: 'rgba(251,146,60,0.2)'  },
};
