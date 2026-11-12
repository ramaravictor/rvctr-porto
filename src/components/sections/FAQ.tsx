"use client";

import { useEffect, useId, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { RevealText } from "@/components/ui/RevealText";
import { FadeIn } from "@/components/ui/FadeIn";
import { FAQ_ITEMS } from "@/data/faq";
import { CONTACT_EMAIL } from "@/data/navigation";

// Split layout (pattern from 21st.dev FAQ sections): header on the left,
// accordion on the right. Answers open with a GSAP height tween.
export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const baseId = useId();

  useEffect(() => {
    const reduced = prefersReducedMotion();
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;
      const open = i === openIdx;
      gsap.killTweensOf(panel);
      if (reduced) {
        gsap.set(panel, { height: open ? "auto" : 0, opacity: open ? 1 : 0 });
      } else {
        gsap.to(panel, {
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
          duration: open ? 0.6 : 0.45,
          ease: open ? "expo.out" : "power3.inOut",
        });
      }
    });
  }, [openIdx]);

  return (
    <section
      id="faq"
      className="relative w-screen bg-[#070707] px-[4vw] py-[8vw] text-white max-[1025px]:px-[5vw] max-[1025px]:py-24"
    >
      <div className="grid grid-cols-[1fr_1.6fr] gap-[6vw] max-[1025px]:grid-cols-1 max-[1025px]:gap-12">
        {/* Header */}
        <div className="self-start lg:sticky lg:top-[8vw]">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[0.85vw] uppercase tracking-[0.14em] text-white/60 max-[1025px]:text-xs">
              <span className="size-1.5 rounded-full bg-brand" />
              FAQ
            </span>
          </FadeIn>
          <RevealText
            as="h2"
            className="mt-[2vw] font-sans text-[4.2vw] font-normal leading-[1.08] tracking-tight max-[1025px]:mt-6 max-[1025px]:text-[7vw] max-md:text-[10vw]"
          >
            Questions, answered
          </RevealText>
          <FadeIn>
            <p className="mt-[1.6vw] max-w-[28vw] text-[1.15vw] leading-relaxed text-white/60 max-[1025px]:mt-5 max-[1025px]:max-w-none max-[1025px]:text-[2.4vw] max-md:text-[4.2vw]">
              The things people usually ask before we start working together. Still curious about something?
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="roll-btn mt-[2.4vw] gap-3 border border-white/20 px-[1.6vw] py-[0.8vw] text-[1vw] transition-colors hover:border-brand hover:bg-brand hover:text-[#070707] max-[1025px]:mt-8 max-[1025px]:px-6 max-[1025px]:py-3 max-[1025px]:text-base"
            >
              Ask me directly
              <span aria-hidden="true">→</span>
            </a>
          </FadeIn>
        </div>

        {/* Accordion */}
        <div className="border-t border-white/10">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            const btnId = `${baseId}-q-${idx}`;
            const panelId = `${baseId}-a-${idx}`;
            return (
              <FadeIn key={item.q}>
                <div className="border-b border-white/10">
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      className="group flex w-full items-start gap-[2vw] py-[2.2vw] text-left max-[1025px]:gap-5 max-[1025px]:py-7"
                    >
                      <span
                        className={`pt-[0.35vw] font-mono text-[0.9vw] tabular-nums transition-colors max-[1025px]:pt-1 max-[1025px]:text-xs ${
                          isOpen ? "text-brand" : "text-white/35"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex-1 font-sans text-[1.6vw] font-normal leading-snug transition-colors group-hover:text-brand max-[1025px]:text-[2.8vw] max-md:text-[4.6vw] ${
                          isOpen ? "text-white" : "text-white/85"
                        }`}
                      >
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`relative flex size-[2.8vw] shrink-0 items-center justify-center rounded-full border transition-colors duration-300 max-[1025px]:size-10 ${
                          isOpen
                            ? "border-brand bg-brand text-[#070707]"
                            : "border-white/20 text-white group-hover:border-brand"
                        }`}
                      >
                        <span className="absolute h-[2px] w-[0.9vw] rounded-full bg-current max-[1025px]:w-3.5" />
                        <span
                          className={`absolute h-[2px] w-[0.9vw] rounded-full bg-current transition-transform duration-300 max-[1025px]:w-3.5 ${
                            isOpen ? "rotate-0" : "rotate-90"
                          }`}
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    ref={(el) => {
                      panelRefs.current[idx] = el;
                    }}
                    className="overflow-hidden"
                    style={idx === 0 ? undefined : { height: 0, opacity: 0 }}
                  >
                    <p className="pb-[2.2vw] pl-[calc(2vw+1.6vw)] pr-[4.8vw] text-[1.15vw] leading-relaxed text-white/60 max-[1025px]:pb-7 max-[1025px]:pl-10 max-[1025px]:pr-0 max-[1025px]:text-[2.2vw] max-md:text-[3.9vw]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
