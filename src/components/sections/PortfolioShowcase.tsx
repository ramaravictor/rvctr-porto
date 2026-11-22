"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useMediaQuery, COMPACT_QUERY } from "@/hooks/useMediaQuery";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { RevealText } from "@/components/ui/RevealText";
import { SHOWCASE_PROJECTS } from "@/data/projects";
import { SOCIAL_LINKS } from "@/data/navigation";

// Showcase entries, in the order of src/data/projects.ts.
const PROJECTS = SHOWCASE_PROJECTS.map((p) => ({
  id: p.id,
  title: p.title,
  category: p.tags.slice(0, 2).join(" • "),
  image: p.image,
}));

const DOT_ON = { backgroundColor: "#ffffff", borderColor: "#ffffff" };
const DOT_OFF = { backgroundColor: "#073224", borderColor: "rgba(255,255,255,0.5)" };
// Titles not reached yet stay grey; they light up with their dot.
const TEXT_ON = { opacity: 1 };
const TEXT_OFF = { opacity: 0.4 };

export function PortfolioShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery(COMPACT_QUERY);


  // Size the timeline line to run from the first dot to the last one.
  useEffect(() => {
    const fit = () => {
      const first = dotRefs.current[0];
      const last = dotRefs.current[PROJECTS.length - 1];
      const box = trackRef.current;
      if (!first || !last || !box) return;
      const base = box.getBoundingClientRect().top;
      const a = first.getBoundingClientRect();
      const b = last.getBoundingClientRect();
      const top = a.top + a.height / 2 - base;
      const height = b.top + b.height / 2 - base - top;
      for (const el of [box.children[0], box.children[1]] as HTMLElement[]) {
        el.style.top = `${top}px`;
        el.style.height = `${height}px`;
      }
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [isMobile]);

  useEffect(() => {
    const steps = PROJECTS.length - 1;
    const dots = dotRefs.current;
    const texts = textRefs.current;
    const slides = slideRefs.current;
    // The inline translateY(100%) only hides slides before hydration. GSAP would
    // read it as a px `y` offset and stack yPercent on top, so clear it first.
    gsap.set(slides, { clearProps: "transform" });

    if (prefersReducedMotion()) {
      // Static fallback: active slide follows scroll position without motion.
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "10% top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const idx = Math.round(self.progress * steps);
          slides.forEach((s, i) => gsap.set(s, { opacity: i <= idx ? 1 : 0 }));
          dots.forEach((d, i) => gsap.set(d, i <= idx ? DOT_ON : DOT_OFF));
          texts.forEach((t, i) => gsap.set(t, i <= idx ? TEXT_ON : TEXT_OFF));
          gsap.set(barRef.current, { scaleY: self.progress });
        },
      });
      triggerRef.current = st;
      return () => st.kill();
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "10% top",
          end: "bottom bottom",
          scrub: true,
          ...(isMobile
            ? {}
            : { snap: { snapTo: 1 / steps, duration: { min: 0.2, max: 0.6 }, ease: "power1.inOut" } }),
        },
      });
      triggerRef.current = tl.scrollTrigger ?? null;

      gsap.set(barRef.current, { scaleY: 0 });
      gsap.set(dots[0], DOT_ON);
      dots.slice(1).forEach((d) => gsap.set(d, DOT_OFF));
      gsap.set(texts[0], TEXT_ON);
      texts.slice(1).forEach((t) => gsap.set(t, TEXT_OFF));
      gsap.set(slides, { filter: "brightness(1)" });
      slides.slice(1).forEach((s) => gsap.set(s, isMobile ? { opacity: 0 } : { yPercent: 100 }));

      // Keep the first dot owned by the timeline too, so a re-run of this
      // effect (desktop -> mobile layout) can't leave it switched off.
      tl.set(dots[0], DOT_ON, 0).set(texts[0], TEXT_ON, 0);
      tl.to(barRef.current, { scaleY: 1, ease: "none", duration: steps }, 0);
      for (let i = 0; i < steps; i++) {
        tl.to(
          slides[i + 1],
          isMobile
            ? { opacity: 1, ease: "none", duration: 1 }
            : { yPercent: 0, ease: "power2.inOut", duration: 1 },
          i
        )
          .to(slides[i], { filter: "brightness(0.3)", ease: "power2.inOut", duration: 1 }, i)
          // Light the dot just before the slide settles, so the last one
          // still turns on when scroll stops a hair short of the end.
          .set(dots[i + 1], DOT_ON, i + 0.9)
          .set(texts[i + 1], TEXT_ON, i + 0.9);
      }

      if (!isMobile) {
        // Curved top edge narrows and lifts as the section scrolls in.
        const enter = {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "30% bottom",
          scrub: true,
        };
        gsap.fromTo(
          clipRef.current,
          { clipPath: "ellipse(150% 100% at 50% 100%)" },
          { clipPath: "ellipse(60% 100% at 50% 100%)", ease: "power2.out", scrollTrigger: enter }
        );
        gsap.to(clipRef.current, {
          yPercent: window.innerWidth > 1024 ? -70 : -50,
          ease: "none",
          scrollTrigger: { ...enter },
        });
      }
    });

    return () => {
      triggerRef.current = null;
      ctx.revert();
    };
  }, [isMobile]);


  return (
    <section
      ref={sectionRef}
      id="portfolio"
      style={{ height: `${PROJECTS.length * 90}vh` }}
      className="relative w-screen pt-[8vw] text-white max-[1025px]:pt-[30vw]"
    >
      {/* Curved Ellipse Top Transition */}
      <div
        ref={clipRef}
        className="absolute left-0 top-0 z-10 h-[50vh] w-full bg-gradient-to-r from-[#083928] to-[#042722] will-change-[clip-path]"
        style={{ clipPath: "ellipse(150% 100% at 50% 100%)" }}
      />

      {/* Sticky Showcase Stage */}
      <div className="sticky top-0 z-20 flex h-screen w-screen flex-col items-center justify-center gap-[5vw] overflow-hidden bg-gradient-to-r from-[#083928] to-[#042722] px-[4vw] max-[1025px]:gap-12 max-[1025px]:px-[5vw] max-md:gap-[8vw]">
        <RevealText
          as="h2"
          className="text-center font-sans text-[5.5vw] font-normal tracking-tight max-[1025px]:text-[6.5vw] max-md:text-[9vw]"
        >
          Featured Projects &amp; Work
        </RevealText>

        <div className="flex w-full items-center gap-[4vw] max-[1025px]:flex-col max-[1025px]:items-start max-[1025px]:gap-16 max-md:gap-[8vw]">
          {/* Left Timeline & Titles */}
          <div ref={trackRef} className="relative w-[34%] max-[1025px]:w-[50%] max-md:w-full">
            <div className="absolute left-[calc(0.25rem+0.5px)] w-px -translate-x-1/2 bg-white/20" />
            <div
              ref={barRef}
              className="absolute left-[calc(0.25rem+0.5px)] w-px origin-top -translate-x-1/2 bg-white"
              style={{ transform: "scaleY(0)" }}
            />

            <div className="flex flex-col max-[1025px]:gap-[2vw] max-md:gap-0">
              {PROJECTS.map((proj, idx) => (
                <Link
                  key={proj.id}
                  href={`/work/${proj.id}`}
                  className="group relative flex h-[5.4vw] cursor-pointer items-center gap-[1.2vw] text-left max-md:h-auto max-md:min-h-11 max-md:gap-[5vw]"
                >
                  <span
                    ref={(el) => {
                      dotRefs.current[idx] = el;
                    }}
                    className="mt-[-1.5vw] size-2.5 shrink-0 rounded-full border border-white/50 bg-[#073224] max-[1025px]:mt-[-4vw] max-md:mt-0"
                  />
                  <span
                    ref={(el) => {
                      textRefs.current[idx] = el;
                    }}
                    className="transition-opacity duration-300"
                    style={{ opacity: idx === 0 ? 1 : 0.4 }}
                  >
                    <span className="block font-sans text-[1.5vw] font-normal transition-colors duration-300 group-hover:text-black max-[1025px]:text-[3.5vw] max-md:text-[5.5vw]">
                      {proj.title}
                    </span>
                    <span className="block text-[1vw] text-white/80 max-[1025px]:text-[2.5vw] max-md:hidden">
                      {proj.category}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
            {/* Not a timeline stop: points to everything else */}
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[1vw] inline-block pl-[calc(0.625rem+1.2vw)] text-[1.1vw] text-white/60 transition-colors hover:text-white max-[1025px]:mt-2 max-[1025px]:py-2 max-[1025px]:pl-8 max-[1025px]:text-base"
            >
              &amp; many more →
            </a>
          </div>

          {/* Right Image Stack Deck */}
          {/* 16:9 box, images pinned to the top: full width (logo, nav) always shows */}
          <div className="relative aspect-[16/9] max-h-[38vw] w-full overflow-hidden rounded-xl shadow-2xl max-[1025px]:max-h-none max-[1025px]:rounded-lg">
            {PROJECTS.map((proj, idx) => (
              <div
                key={proj.id}
                ref={(el) => {
                  slideRefs.current[idx] = el;
                }}
                className="absolute inset-0 overflow-hidden rounded-xl bg-[#070707] will-change-transform"
                style={{ zIndex: idx + 1, transform: idx === 0 ? undefined : "translateY(100%)" }}
              >
                <Link
                  href={`/work/${proj.id}`}
                  aria-label={`View ${proj.title}`}
                  className="group/img block size-full"
                >
                  <img
                    alt={proj.title}
                    src={proj.image}
                    className="size-full object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-[1.03]"
                  />
                  <span className="pointer-events-none absolute bottom-[1.5vw] right-[1.5vw] rounded-full bg-white px-[1.4vw] py-[0.6vw] text-[0.95vw] font-medium text-[#111] opacity-0 transition-opacity duration-300 group-hover/img:opacity-100 max-[1025px]:hidden">
                    View project →
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Glowing Ambience */}
      <div className="pointer-events-none absolute bottom-[-10%] left-0 h-[60vh] w-screen overflow-hidden">
        <div className="absolute bottom-[35%] left-[-7.5%] z-2 h-[40vh] w-[115%] bg-gradient-to-r from-[#083928] to-[#042722] opacity-50 blur-3xl" />
      </div>
    </section>
  );
}
