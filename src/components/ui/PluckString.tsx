"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

const MID = 20;

/**
 * Divider line that bends toward the cursor and, when released, vibrates
 * like a plucked string (damped sine), as in the reference.
 */
export function PluckString() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const raf = useRef<number | null>(null);
  const amp = useRef(0);
  const phase = useRef(Math.PI / 2);
  const bendX = useRef(0.5);

  const draw = (offset: number) => {
    const w = wrapRef.current?.offsetWidth ?? 0;
    pathRef.current?.setAttribute(
      "d",
      `M 0 ${MID} Q ${bendX.current * w} ${MID + offset} ${w} ${MID}`
    );
  };

  useEffect(() => {
    draw(0);
    const onResize = () => draw(0);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, []);

  const stop = () => {
    if (raf.current != null) cancelAnimationFrame(raf.current);
    raf.current = null;
  };

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion()) return;
    stop();
    const rect = e.currentTarget.getBoundingClientRect();
    bendX.current = (e.clientX - rect.left) / rect.width;
    amp.current = Math.max(-30, Math.min(30, (e.clientY - rect.top - MID) * 2));
    draw(amp.current);
    pathRef.current?.classList.add("stroke-brand");
  };

  const onLeave = () => {
    pathRef.current?.classList.remove("stroke-brand");
    if (prefersReducedMotion()) return draw(0);
    stop();
    phase.current = Math.PI / 2;
    const vibrate = () => {
      draw(amp.current * Math.sin(phase.current));
      amp.current *= 0.95;
      phase.current += 0.5;
      if (Math.abs(amp.current) > 0.1) raf.current = requestAnimationFrame(vibrate);
      else {
        amp.current = 0;
        draw(0);
        raf.current = null;
      }
    };
    raf.current = requestAnimationFrame(vibrate);
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative h-10 w-full -my-3"
    >
      <svg className="pointer-events-none h-10 w-full overflow-visible" aria-hidden="true">
        <path
          ref={pathRef}
          strokeWidth="1.5"
          fill="none"
          className="stroke-white/30 transition-[stroke] duration-300"
        />
      </svg>
    </div>
  );
}
