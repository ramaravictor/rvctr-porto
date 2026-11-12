"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, EASE_OUT } from "@/lib/gsap";

// Module-level so it survives remounts: the first page load gets no curtain
// (the hero has its own intro), every client-side navigation after that does.
let hasNavigated = false;

/** Page transition: a curtain wipes up and the new page rises into place. */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(
    () => hasNavigated && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const curtainRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  useLayoutEffect(() => {
    if (!animate) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(curtainRef.current, { yPercent: 0 }, { yPercent: -100, duration: 0.8, ease: EASE_OUT, delay: 0.05 });
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 40 },
        // clearProps: a leftover transform would break position: fixed/sticky inside the page.
        { opacity: 1, y: 0, duration: 0.8, ease: EASE_OUT, delay: 0.25, clearProps: "transform,opacity" }
      );
    });
    return () => ctx.revert();
  }, [animate]);

  return (
    <>
      {animate && (
        <div ref={curtainRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] bg-night" />
      )}
      <div ref={pageRef}>{children}</div>
    </>
  );
}
