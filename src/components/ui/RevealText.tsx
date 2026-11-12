"use client";

import {
  Children,
  isValidElement,
  useLayoutEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  children: ReactNode;
  stagger?: number;
  /** Omit to play when scrolled into view; pass false/true to control it. */
  play?: boolean;
};

function plainText(node: ReactNode): string {
  let out = "";
  Children.forEach(node, (child) => {
    if (typeof child === "string" || typeof child === "number") out += String(child);
    else if (isValidElement(child)) out += " ";
  });
  return out.replace(/\s+/g, " ").trim();
}

function splitChars(node: ReactNode): ReactNode[] {
  const out: ReactNode[] = [];
  let key = 0;
  Children.forEach(node, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      for (const part of String(child).split(/(\s+)/)) {
        if (!part) continue;
        if (/^\s+$/.test(part)) {
          out.push(" ");
          continue;
        }
        out.push(
          <span key={key++} className="inline-block whitespace-nowrap">
            {Array.from(part).map((c, i) => (
              <span key={i} data-char="" className="inline-block">
                {c}
              </span>
            ))}
          </span>
        );
      }
    } else if (isValidElement(child)) {
      out.push(<span key={key++}>{child}</span>);
    }
  });
  return out;
}

/** Heading text that rises in letter by letter (0.015s stagger), like the reference. */
export function RevealText({ as = "div", className, children, stagger = 0.015, play }: Props) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const chars = el.querySelectorAll("[data-char]");
    const ctx = gsap.context(() => {
      if (play === false) {
        gsap.set(chars, { opacity: 0, yPercent: 60 });
        return;
      }
      gsap.fromTo(
        chars,
        { opacity: 0, yPercent: 60 },
        {
          opacity: 1,
          yPercent: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger,
          scrollTrigger:
            play === undefined
              ? { trigger: el, start: "top 85%", toggleActions: "play none none none" }
              : undefined,
        }
      );
    }, el);
    return () => ctx.revert();
  }, [play, stagger]);

  return (
    <Tag ref={ref} className={className} aria-label={plainText(children)}>
      <span aria-hidden="true">{splitChars(children)}</span>
    </Tag>
  );
}
