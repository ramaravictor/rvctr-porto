"use client";

import { useEffect, useState, type RefObject } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/** Devices that can't hover (phones, tablets). */
export const TOUCH_QUERY = "(hover: none)";

/**
 * Stand-in for hover on touch screens: returns the index of the element whose
 * centre is closest to the middle of the screen (vertically or horizontally),
 * updated while scrolling. Returns -1 on hover-capable devices, or when none
 * of the elements is on screen.
 */
export function useCenterActive(refs: RefObject<(HTMLElement | null)[]>, axis: "x" | "y" = "y") {
  const touch = useMediaQuery(TOUCH_QUERY);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (!touch) {
      setActive(-1);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = axis === "y" ? innerHeight / 2 : innerWidth / 2;
      let best = -1;
      let dist = Infinity;
      refs.current?.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight || r.right < 0 || r.left > innerWidth) return;
        const d = Math.abs((axis === "y" ? r.top + r.height / 2 : r.left + r.width / 2) - mid);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [touch, axis, refs]);

  return active;
}
