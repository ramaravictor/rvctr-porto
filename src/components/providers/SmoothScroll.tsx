"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { lenisStore } from "@/lib/lenis";
import { ScrollTrigger } from "@/lib/gsap";

const HEADER_OFFSET = -80;

function scrollTarget(hash: string): number | HTMLElement | null {
  if (hash === "#top") return 0;
  try {
    return document.querySelector<HTMLElement>(hash);
  } catch {
    return null;
  }
}

/** Lenis smooth scrolling, plus smooth scrolling for same-page `#hash` links. */
export function SmoothScroll() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // autoRaf: Lenis drives its own requestAnimationFrame loop. Without it,
    // Lenis swallows wheel events but never moves the page.
    const lenis = new Lenis({ lerp: 0.1, autoRaf: true });
    lenisStore.current = lenis;
    // Keep GSAP ScrollTrigger in step with Lenis' smoothed scroll position.
    lenis.on("scroll", ScrollTrigger.update);

    // Capture phase so this runs before next/link handles the click.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank") return;

      const url = new URL(anchor.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;

      const target = scrollTarget(url.hash);
      if (target === null) return;

      e.preventDefault();
      lenis.start();
      lenis.scrollTo(target, { offset: target === 0 ? 0 : HEADER_OFFSET, force: true });
      history.replaceState(history.state, "", url.hash === "#top" ? url.pathname : url.hash);
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      lenis.destroy();
      lenisStore.current = null;
    };
  }, []);

  // Keep Lenis in sync with the scroll position Next.js sets on navigation.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      const lenis = lenisStore.current;
      if (!lenis) return;
      const target = location.hash ? scrollTarget(location.hash) : 0;
      lenis.scrollTo(target ?? 0, {
        immediate: true,
        force: true,
        offset: target === 0 || target === null ? 0 : HEADER_OFFSET,
      });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  // ScrollTrigger measures start/end positions once. When content above a
  // trigger grows later (web fonts reflowing text, images loading), those
  // positions go stale and scroll animations fire too early. Re-measure
  // whenever the page height changes, plus after fonts and images load.
  useEffect(() => {
    let timer = 0;
    let lastHeight = document.documentElement.scrollHeight;
    const refresh = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    const ro = new ResizeObserver(() => {
      const h = document.documentElement.scrollHeight;
      if (h !== lastHeight) {
        lastHeight = h;
        refresh();
      }
    });
    ro.observe(document.body);
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", refresh);
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
