"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { RevealText } from "@/components/ui/RevealText";
import { TECH_STACK } from "@/data/tech-stack";


export function ClientBlur() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Names arrive in random groups of 2-3: from deep behind (blurred), sharp
  // at the centre, then past the viewer and blurred again.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const items = Array.from(grid.querySelectorAll<HTMLElement>(".grid__item"));
      const desktop = window.innerWidth > 1024;
      const inDur = desktop ? 1.5 : 4;
      const outDur = desktop ? 1.5 : 3.5;
      const groupGap = inDur + 0.4;
      const itemGap = desktop ? 0.4 : 0.5;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          end: "bottom center",
          scrub: true,
        },
      });

      const groups: number[][] = [];
      for (let i = 0; i < items.length; ) {
        const n = Math.min(items.length - i, gsap.utils.random(2, 3, 1));
        groups.push(Array.from({ length: n }, (_, k) => i + k));
        i += n;
      }

      groups.forEach((group, g) => {
        group.forEach((itemIdx, k) => {
          const el = items[itemIdx];
          const at = g * groupGap + k * itemGap;
          gsap.set(el, {
            transformOrigin: "0% 0%",
            opacity: 0,
            x: desktop ? gsap.utils.random(-180, 180) : 0,
            y: gsap.utils.random(-180, 180),
            filter: "blur(10px)",
            z: desktop ? gsap.utils.random(-2200, -1600) : gsap.utils.random(-550, -400),
          });
          tl.to(el, { z: 0, opacity: 1, filter: "blur(0px)", duration: inDur }, at).to(
            el,
            {
              filter: "blur(10px)",
              opacity: 0,
              z: desktop ? gsap.utils.random(1400, 1800) : gsap.utils.random(500, 700),
              duration: outDur,
            },
            at + inDur
          );
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="clientblur"
      className="relative z-20 h-[240vh] w-screen bg-[#070707] text-center"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center">
        <div className="w-3/5 max-lg:w-4/5">
          <RevealText
            as="h3"
            className="font-sans text-[5.5vw] font-normal leading-[1.15] tracking-tight text-white max-lg:text-[7vw] max-md:text-[8vw]"
          >
            Built with the Tools I Trust, Every Single Day.
          </RevealText>
        </div>
      </div>

      <div className="pointer-events-none sticky top-0 z-20 -mt-[100vh] flex h-screen w-screen items-center justify-center overflow-hidden">
        <div
          ref={gridRef}
          className="grid grid-cols-5 gap-[3vw] max-md:grid-cols-3 max-md:gap-[6vw]"
          style={{ perspective: "350vw" }}
        >
          {TECH_STACK.map((item, idx) => (
            <div
              key={idx}
              className="grid__item flex h-[8vw] w-[14vw] items-center justify-center gap-[0.8vw] will-change-transform max-md:h-[22vw] max-md:w-[26vw] max-md:flex-col max-md:gap-[2vw]"
            >
              <img
                src={`/images/tech/${item.logo}.svg`}
                alt=""
                className="size-[3vw] shrink-0 object-contain invert max-md:size-[9vw]"
              />
              <span className="font-sans text-[1.3vw] font-medium leading-tight text-white/90 max-[1025px]:text-[13px] max-md:text-center max-md:text-[3.2vw]">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
