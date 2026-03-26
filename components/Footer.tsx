'use client';

import { memo } from 'react';

/**
 * Site-wide footer with brand logo, copyright, and nav links.
 */
const Footer = memo(() => (
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
));

Footer.displayName = 'Footer';
export default Footer;
