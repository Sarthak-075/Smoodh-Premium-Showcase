/**
 * Centralized product/flavor data for the Smoodh website.
 * All components should import flavor metadata from here.
 */

export type Flavor = 'lassi' | 'chocolate' | 'hazelnut';

// ─── Navigation Products ──────────────────────────────────────────────────────
export const PRODUCTS: {
  flavor: Flavor;
  label: string;
  /** Full brand name shown in navbar */
  navLabel: string;
  /** Tailwind gradient classes for the bottom-pill active state */
  accent: string;
}[] = [
  { flavor: 'lassi',     label: 'Lassi',               navLabel: 'Lassi',              accent: 'from-yellow-300 to-amber-500' },
  { flavor: 'chocolate', label: 'Chocolate',            navLabel: 'Chocolate',          accent: 'from-amber-700 to-stone-900'  },
  { flavor: 'hazelnut',  label: 'Chocolate Hazelnut',   navLabel: 'Choco Hazelnut',     accent: 'from-orange-400 to-amber-800' },
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

// ─── Scroll-overlay Text Sections per Flavor ─────────────────────────────────
export const FLAVOR_SECTIONS: Record<Flavor, {
  title: string;
  subtitle: string;
  sections: { heading: string; body: string }[];
}> = {
  lassi: {
    title: 'Smoodh Lassi.',
    subtitle: 'Creamy tradition, reimagined.',
    sections: [
      {
        heading: 'Made with real dahi.',
        body: 'A rich, creamy lassi crafted using real milk and traditional fermentation, delivering authentic taste in every sip.',
      },
      {
        heading: 'Naturally refreshing.',
        body: 'Smooth texture, light sweetness, and cooling freshness — perfect for any time of the day.',
      },
      {
        heading: 'Everyday energy boost.',
        body: 'A wholesome dairy drink that satisfies your cravings while giving you a quick refresh.',
      },
    ],
  },
  chocolate: {
    title: 'Smoodh Chocolate.',
    subtitle: 'Rich. Smooth. Indulgent.',
    sections: [
      {
        heading: 'Real cocoa richness.',
        body: 'A perfect blend of creamy milk and rich cocoa for a smooth chocolate experience.',
      },
      {
        heading: 'Silky texture.',
        body: 'Thick, velvety consistency that delivers a satisfying mouthfeel in every sip.',
      },
      {
        heading: 'Your daily chocolate fix.',
        body: 'A delicious drink that satisfies sweet cravings while providing energy.',
      },
    ],
  },
  hazelnut: {
    title: 'Smoodh Chocolate Hazelnut.',
    subtitle: 'Indulgence meets sophistication.',
    sections: [
      {
        heading: 'Chocolate + hazelnut fusion.',
        body: 'A rich blend of cocoa and nutty hazelnut flavors for a premium taste experience.',
      },
      {
        heading: 'Creamy and smooth.',
        body: 'Made with milk solids and cocoa, delivering a balanced and satisfying texture.',
      },
      {
        heading: 'Next-level flavor.',
        body: 'A unique twist on chocolate milk with a nutty, indulgent finish.',
      },
    ],
  },
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
    title: 'Smoodh Lassi.',
    description: 'Milk-based lassi drink with a smooth, creamy texture and refreshing taste.',
    image: '/lassi.png',
    glow: 'bg-amber-400',
  },
  chocolate: {
    title: 'Smoodh Chocolate.',
    description: 'Chocolate flavoured milk drink combining creamy dairy and cocoa goodness.',
    image: '/chocolate.png',
    glow: 'bg-stone-500',
  },
  hazelnut: {
    title: 'Smoodh Chocolate Hazelnut.',
    description: 'Milk-based beverage with cocoa, hazelnut flavor, and creamy texture.',
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
  lassi:     { price: '₹30', accent: 'from-yellow-300 to-amber-500',  glow: 'hover:shadow-[0_0_40px_rgba(251,191,36,0.3)]',  shadow: 'rgba(251,191,36,0.2)'  },
  chocolate: { price: '₹30', accent: 'from-stone-400 to-stone-600',   glow: 'hover:shadow-[0_0_40px_rgba(168,162,158,0.3)]', shadow: 'rgba(168,162,158,0.2)' },
  hazelnut:  { price: '₹30', accent: 'from-orange-400 to-amber-600',  glow: 'hover:shadow-[0_0_40px_rgba(251,146,60,0.3)]',  shadow: 'rgba(251,146,60,0.2)'  },
};
