import type Lenis from "lenis";

/**
 * The active Lenis instance, or null when smooth scrolling is off
 * (e.g. the visitor prefers reduced motion).
 */
export const lenisStore: { current: Lenis | null } = { current: null };
