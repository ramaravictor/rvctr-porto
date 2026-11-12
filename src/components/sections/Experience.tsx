"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { RevealText } from "@/components/ui/RevealText";
import { FadeIn } from "@/components/ui/FadeIn";
import { PluckString } from "@/components/ui/PluckString";
import { BACKGROUND_GROUPS } from "@/data/background";

const ITEMS = BACKGROUND_GROUPS.flatMap((g) => g.items);

export function Experience() {
  const boxRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef<number | null>(null);
  const zRef = useRef(ITEMS.length);
  const pointer = useRef<{ x: number; y: number } | null>(null);

  // Initial stack: first preview shown, the rest collapsed.
  useEffect(() => {
    gsap.set(boxRef.current, { y: 0, opacity: 0 });
    cardRefs.current.forEach((c, i) => gsap.set(c, { zIndex: i + 1, scale: i === 0 ? 1.05 : 0 }));
  }, []);

  // Divider lines draw in from the left as they scroll into view.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      lineRefs.current.filter(Boolean).forEach((line) =>
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.inOut",
            scrollTrigger: { trigger: line, start: "top 85%", toggleActions: "play none none none" },
          }
        )
      );
    });
    return () => ctx.revert();
  }, []);

  // Preview box glides to the hovered row; the new card grows from scale 0.
  const activate = useCallback((idx: number) => {
    const reduced = prefersReducedMotion();
    const row = rowRefs.current[idx];
    const box = boxRef.current;
    if (row && box) {
      const curY = Number(gsap.getProperty(box, "y"));
      const b = box.getBoundingClientRect();
      const r = row.getBoundingClientRect();
      const y = r.top + r.height / 2 - (b.top + b.height / 2 - curY);
      if (reduced) gsap.set(box, { y });
      else gsap.to(box, { y, duration: 0.65, ease: "back.out(1.6)" });
    }
    const card = cardRefs.current[idx];
    if (card) {
      zRef.current += 1;
      gsap.killTweensOf(card);
      gsap.set(card, { zIndex: zRef.current });
      if (reduced) gsap.set(card, { scale: 1.05 });
      else gsap.fromTo(card, { scale: 0 }, { scale: 1.05, duration: 0.45, ease: "power2.out" });
    }
  }, []);

  const hitTest = useCallback(
    (x: number, y: number) => {
      const idx = rowRefs.current.findIndex((row) => {
        const r = row?.getBoundingClientRect();
        return r && y >= r.top && y < r.bottom && x >= r.left && x < r.right;
      });
      if (idx !== -1 && idx !== activeRef.current) {
        activeRef.current = idx;
        activate(idx);
      }
    },
    [activate]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
      hitTest(e.clientX, e.clientY);
    };
    const onScroll = () => {
      if (pointer.current) hitTest(pointer.current.x, pointer.current.y);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [hitTest]);

  const showBox = (on: boolean) =>
    gsap.to(boxRef.current, { opacity: on ? 1 : 0, duration: 0.3, ease: "power2.out" });

  let idx = 0;

  return (
    <section
      id="experience"
      className="relative w-screen bg-[#070707] pb-[7vw] pt-[25vw] text-white max-[1025px]:pt-[65vw]"
    >
      <div className="relative flex w-screen items-center gap-[4vw] px-[4vw] max-[1025px]:px-[5vw]">
        <div className="w-full">
          <div className="mb-[4vw] flex items-end justify-between gap-8 max-[1025px]:flex-col max-[1025px]:items-start">
            <RevealText
              as="h2"
              className="font-sans text-[5.5vw] font-normal leading-[1.15] tracking-tight max-[1025px]:text-[7vw] max-md:text-[9vw]"
            >
              Stories
            </RevealText>
            <FadeIn className="w-[34%] max-[1025px]:w-full">
              <p className="text-[1.15vw] leading-relaxed text-white/70 max-[1025px]:text-[2.5vw] max-md:text-[4.2vw]">
                A few chapters from how I got here: the jobs, the classrooms, and what I picked up along the way.
              </p>
            </FadeIn>
          </div>

          <div onMouseEnter={() => showBox(true)} onMouseLeave={() => showBox(false)}>
            {BACKGROUND_GROUPS.map((group) => (
              <div key={group.label} className="mt-[3vw] first:mt-0 max-[1025px]:mt-12">
                <p className="mb-2 text-[0.95vw] uppercase tracking-[0.14em] text-white/45 max-[1025px]:text-sm">
                  {group.label}
                </p>
                {group.items.map((item) => {
                  const i = idx++;
                  return (
                    <div key={item.title}>
                      <div
                        ref={(el) => {
                          rowRefs.current[i] = el;
                        }}
                        className="group relative cursor-default py-8 max-md:py-6"
                      >
                        <p className="text-[0.95vw] uppercase tracking-[0.12em] text-white/45 max-[1025px]:text-[2vw] max-md:text-[3.2vw]">
                          {item.meta}
                        </p>
                        <h3 className="mt-2 w-[55%] font-sans text-[1.9vw] font-normal leading-[1.2] transition-colors group-hover:text-brand max-[1025px]:w-full max-[1025px]:text-[3.6vw] max-md:text-[5.6vw]">
                          {item.title}
                        </h3>
                        <p className="mt-3 w-[50%] text-[1.1vw] leading-relaxed text-white/65 max-[1025px]:w-full max-[1025px]:text-[2.2vw] max-md:text-[3.8vw]">
                          {item.story}
                        </p>
                      </div>
                      <div
                        ref={(el) => {
                          lineRefs.current[i] = el;
                        }}
                        className="origin-left"
                      >
                        <PluckString />
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Preview card that follows the hovered row */}
        <div
          ref={boxRef}
          aria-hidden="true"
          className="pointer-events-none absolute right-[10%] z-30 h-[20vw] w-[36vw] overflow-hidden rounded-xl opacity-0 shadow-2xl max-[1025px]:hidden"
        >
          {ITEMS.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute inset-0 overflow-hidden rounded-xl"
            >
              {item.image ? (
                <img src={item.image} alt="" className="size-full object-cover object-top" />
              ) : (
                <div className="flex size-full flex-col justify-between bg-gradient-to-br from-[#083928] to-[#042722] p-[2vw]">
                  <span className="self-start rounded-full bg-white/10 px-[0.9vw] py-[0.3vw] text-[0.85vw] uppercase tracking-[0.14em] text-white/80">
                    {item.badge}
                  </span>
                  <span className="font-sans text-[2.2vw] leading-[1.1] text-white">{item.org}</span>
                  <span className="text-[0.95vw] uppercase tracking-[0.12em] text-white/60">{item.meta}</span>
                </div>
              )}
              {item.image && (
                <span className="absolute left-[1.2vw] top-[1.2vw] rounded-full bg-black/55 px-[0.9vw] py-[0.3vw] text-[0.85vw] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
