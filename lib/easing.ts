/**
 * Shared animation easing constants for consistent motion across all components.
 * Uses a premium cubic-bezier curve that mirrors Apple's system spring feel.
 */

/** Premium ease-out — fast in, soft landing. Use for entrances. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Premium ease-in — slow start, fast exit. Use for exits. */
export const EASE_IN = [0.7, 0, 0.84, 0] as const;

/** Springy overshoot — use for pop / scale-in micro-interactions. */
export const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const;
