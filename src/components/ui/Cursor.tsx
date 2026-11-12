"use client";

import { useEffect, useRef, useState } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";
import { gsap, prefersReducedMotion, EASE_OUT } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type CursorState = { mode: "default" | "link" | "label"; label?: string };

const SIZE = { default: 10, link: 44, label: 92 } as const;

/**
 * A dot that follows the mouse. It grows over links and buttons, and shows a
 * label over elements with `data-cursor="Label"`. The native cursor stays
 * visible; this only renders on mouse / trackpad devices.
 */
export function Cursor() {
  const fine = useFinePointer();
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>({ mode: "default" });
  const [visible, setVisible] = useState(false);

  // Position: a short smoothed follow (instant with reduced motion).
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!fine || !wrap) return;
    const reduce = prefersReducedMotion();
    gsap.set(wrap, { x: -100, y: -100 });
    const xTo = gsap.quickTo(wrap, "x", { duration: reduce ? 0.01 : 0.18, ease: "power3.out" });
    const yTo = gsap.quickTo(wrap, "y", { duration: reduce ? 0.01 : 0.18, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      setVisible(true);
    };
    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-cursor], a, button");
      const label = el?.getAttribute("data-cursor");
      setState((prev) => {
        const next: CursorState = !el ? { mode: "default" } : label ? { mode: "label", label } : { mode: "link" };
        return prev.mode === next.mode && prev.label === next.label ? prev : next;
      });
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [fine]);

  // Size and visibility.
  const size = SIZE[state.mode];
  useEffect(() => {
    if (!dotRef.current) return;
    gsap.to(dotRef.current, {
      width: size,
      height: size,
      opacity: visible ? 1 : 0,
      duration: prefersReducedMotion() ? 0 : 0.35,
      ease: EASE_OUT,
      overwrite: true,
    });
  }, [size, visible, fine]);

  if (!fine) return null;

  return (
    <div ref={wrapRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[100]">
      <div className="-translate-x-1/2 -translate-y-1/2">
        <div
          ref={dotRef}
          style={{ width: SIZE.default, height: SIZE.default, opacity: 0 }}
          className={cn(
            "flex items-center justify-center rounded-full transition-colors duration-300",
            state.mode === "link" ? "border border-accent bg-accent/15" : "bg-accent"
          )}
        >
          {state.mode === "label" && (
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#141414]">{state.label}</span>
          )}
        </div>
      </div>
    </div>
  );
}
