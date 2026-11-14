"use client";

import { useEffect, useRef } from "react";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { useMediaQuery, COMPACT_QUERY } from "@/hooks/useMediaQuery";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { RevealText } from "@/components/ui/RevealText";
import { FadeIn } from "@/components/ui/FadeIn";
import { SERVICES } from "@/data/services";


const HIDDEN = -40;
const SHOWN = 100;

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRefs = useRef<(HTMLDivElement | null)[]>([]);
  // First card starts lit, as in the reference.
  const reveal = useRef(SERVICES.map((_, i) => ({ value: i === 0 ? SHOWN : HIDDEN })));
  const activeRef = useRef(0);
  const isGrid = useMediaQuery(COMPACT_QUERY);


  // Desktop: the card row slides left as the section scrolls through.
  useEffect(() => {
    if (isGrid || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      // Cards enter from the right edge as the section scrolls in, then the
      // row keeps sliding left until the last card is in view.
      gsap.fromTo(
        trackRef.current,
        // Start fully off-screen to the right, as in the reference.
        { x: () => window.innerWidth + 66 },
        {
          x: () => -Math.max(0, (trackRef.current?.scrollWidth ?? 0) - window.innerWidth + 120),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 20%",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [isGrid]);

  const tweenFill = (idx: number, value: number, duration: number) => {
    gsap.to(reveal.current[idx], {
      value,
      duration,
      ease: "power2.out",
      overwrite: true,
      onUpdate: () => {
        fillRefs.current[idx]?.style.setProperty("--reveal", `${reveal.current[idx].value}%`);
      },
    });
  };

  // The glow stays on the last hovered card and hands over to the next one.
  const onEnter = (idx: number) => {
    if (idx === activeRef.current) return;
    const duration = isGrid || prefersReducedMotion() ? 0 : 0.45;
    if (activeRef.current !== -1) tweenFill(activeRef.current, HIDDEN, duration);
    tweenFill(idx, SHOWN, duration);
    activeRef.current = idx;
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`services-section relative w-screen bg-[#070707] text-white ${isGrid ? "" : "h-[275vh]"}`}
    >
      <div className="relative w-[60%] px-[4vw] pt-[6vw] max-[1025px]:w-[85%] max-[1025px]:px-[5vw] max-[1025px]:pt-[15vw] max-md:w-full">
        <RevealText
          as="h2"
          className="font-sans text-[5.5vw] font-normal leading-[1.1] tracking-tight max-[1025px]:text-[7vw] max-md:text-[9vw]"
        >
          Engineering That Speaks<br />
          to Real Needs
        </RevealText>
        <FadeIn className="mt-[1.5vw] w-[75%] max-[1025px]:mt-[5vw] max-[1025px]:w-full">
          <p className="text-[1.25vw] leading-relaxed text-white/70 max-[1025px]:text-[2.5vw] max-md:text-[4.5vw]">
            My practice bridges thoughtful frontend aesthetics with rock-solid fullstack architecture. Whether you need an MVP launched in record time or an enterprise system optimized for scale, I build with clarity and performance.
          </p>
        </FadeIn>
      </div>

      <div
        className={
          isGrid
            ? "w-screen pb-[6vw]"
            : "services-sticky sticky top-0 flex h-screen w-screen flex-col justify-center overflow-hidden"
        }
      >
        <div
          ref={trackRef}
          className={
            isGrid
              ? "grid grid-cols-2 gap-[2.5vw] px-[5vw] pt-[5vw] max-md:grid-cols-1 max-md:gap-[6vw]"
              : "services-row flex gap-[1.6vw] px-[4vw] will-change-transform"
          }
        >
          {SERVICES.map((srv, idx) => (
            <div
              key={idx}
              onMouseEnter={() => onEnter(idx)}
              className={`services-card group relative flex shrink-0 flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[#161616] ${
                isGrid
                  ? "min-h-[32vw] p-[3vw] max-md:min-h-[70vw] max-md:p-[5vw]"
                  : "h-[30vw] w-[27vw] p-[2vw]"
              }`}
            >
              <div
                ref={(el) => {
                  fillRefs.current[idx] = el;
                  el?.style.setProperty("--reveal", `${reveal.current[idx].value}%`);
                }}
                className="radial-mask-bg-fill absolute inset-0 bg-gradient-to-r from-[#083928] to-[#042722]"
              />

              <div className="relative flex justify-end">
                <div className="relative flex size-[3.2vw] items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 duration-300 ease-out group-hover:bg-white group-hover:text-black max-[1025px]:size-[7vw] max-md:size-[9vw]">
                  <div className="duration-300 ease-out group-hover:-translate-y-[150%] group-hover:translate-x-[150%]">
                    <ArrowIcon className="text-[20px]" />
                  </div>
                  <div className="absolute -translate-x-[150%] translate-y-[150%] duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0">
                    <ArrowIcon className="text-[20px]" />
                  </div>
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="mb-[1vw] font-sans text-[2.2vw] font-normal max-[1025px]:text-[5vw] max-md:text-[6.5vw]">
                  {srv.title}
                </h3>
                <ul className="space-y-[0.5vw] pl-1 max-[1025px]:space-y-[1vw] max-md:space-y-[1.8vw]">
                  {srv.tags.map((tag, tIdx) => (
                    <li
                      key={tIdx}
                      className="flex items-center gap-[0.7vw] text-[1.1vw] text-white/90 max-[1025px]:text-[3vw] max-md:text-[4vw]"
                    >
                      <span className="size-1.5 rounded-full bg-white" />
                      <span>{tag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
