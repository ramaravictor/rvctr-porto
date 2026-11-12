"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion, EASE_OUT } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Fades + lifts its children into view once, when scrolled to. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = prefersReducedMotion();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: reduce ? 0 : 28 },
        {
          opacity: 1,
          y: 0,
          duration: reduce ? 0.2 : 0.9,
          delay,
          ease: EASE_OUT,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        }
      );
    });
    return () => ctx.revert();
  }, [delay]);

  // Starts hidden in the server HTML so it doesn't flash before hydration.
  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

interface RevealLinesProps {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** Animate on mount instead of on scroll (for content above the fold). */
  immediate?: boolean;
}

/** Slides each line up from behind a mask, one after another. */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  immediate = false,
}: RevealLinesProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = prefersReducedMotion();
    const items = el.querySelectorAll<HTMLElement>("[data-line]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        // y: 0 in both states so GSAP never stacks a parsed px offset on yPercent.
        reduce ? { opacity: 0, y: 0, yPercent: 0 } : { opacity: 1, y: 0, yPercent: 105 },
        {
          opacity: 1,
          y: 0,
          yPercent: 0,
          duration: reduce ? 0.2 : 1.1,
          delay,
          stagger: 0.09,
          ease: EASE_OUT,
          scrollTrigger: immediate ? undefined : { trigger: el, start: "top 90%", once: true },
        }
      );
    });
    return () => ctx.revert();
  }, [delay, immediate]);

  return (
    <span ref={ref} className={cn("block", className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <span data-line="" className={cn("block", lineClassName)} style={{ transform: "translateY(105%)" }}>
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
