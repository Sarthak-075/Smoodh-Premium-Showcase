'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';

interface ArrowButtonProps {
  onClick: () => void;
  direction: 'left' | 'right';
  disabled: boolean;
}

/**
 * Glassmorphism arrow button used for left/right product navigation.
 */
const ArrowButton = memo(({ onClick, direction, disabled }: ArrowButtonProps) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    whileHover={{ scale: disabled ? 1 : 1.1 }}
    whileTap={{ scale: disabled ? 1 : 0.9 }}
    className={`w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 ${
      disabled
        ? 'opacity-20 cursor-not-allowed'
        : 'hover:bg-white/15 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]'
    }`}
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
));

ArrowButton.displayName = 'ArrowButton';
export default ArrowButton;
