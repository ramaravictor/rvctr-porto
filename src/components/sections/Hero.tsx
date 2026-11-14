"use client";

import { useEffect, useRef, useState } from "react";
import { SITE_CONFIG } from "@/lib/constants";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { lenisStore } from "@/lib/lenis";
import { RevealText } from "@/components/ui/RevealText";
import { SHOWCASE_PROJECTS } from "@/data/projects";
import { TECH_STACK } from "@/data/tech-stack";
import { CONTACT_EMAIL } from "@/data/navigation";

// Stage layout after the Nino template hero: a giant condensed name, a tilted
// portrait card in front of it, a short column on each side, and a dark bar
// with the tech stack. On scroll the stage shrinks and reveals a marquee of
// project screenshots behind it.

const THUMBS = SHOWCASE_PROJECTS.slice(0, 3);
const LOGOS = TECH_STACK.filter((t, i, all) => all.findIndex((x) => x.logo === t.logo) === i);
const CARD_TILT = -4;

// Background marquee: the two columns alternate through the project covers.
const COVERS = SHOWCASE_PROJECTS.map((p) => p.image);
const COL_1 = COVERS.filter((_, i) => i % 2 === 0);
const COL_2 = COVERS.filter((_, i) => i % 2 === 1);

/**
 * A column of project screenshots that drifts upward on its own, forever.
 * The list is rendered twice and the track moves by -50%, so the loop is
 * seamless; spacing uses padding (not gap) so both halves are equal height.
 */
function MarqueeColumn({ images, duration }: { images: string[]; duration: string }) {
  return (
    <div
      className="flex flex-col animate-marquee-up will-change-transform motion-reduce:animate-none"
      style={{ animationDuration: duration }}
    >
      {[...images, ...images].map((src, i) => (
        <div key={i} className="w-full pb-[2.5vw]">
          <div className="h-[27vw] w-full overflow-hidden">
            <img src={src} alt="" className="size-full object-cover object-top" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const sidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const [titleOn, setTitleOn] = useState(false);

  // Intro on a fresh home page load: scroll locked, name rises letter by
  // letter, the card swings up into place, the side columns and header follow.
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("intro")) {
      setTitleOn(true);
      return;
    }

    let tl: gsap.core.Timeline | null = null;
    const header = document.getElementById("header");
    const sides = sidesRef.current.filter(Boolean);
    const card = cardRef.current;

    // Deferred a frame so React strict mode's double mount in dev cancels the
    // first run instead of eating the intro.
    const raf = requestAnimationFrame(() => {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
      lenisStore.current?.scrollTo(0, { immediate: true, force: true });
      lenisStore.current?.stop();

      gsap.set(header, { yPercent: -50, opacity: 0 });
      gsap.set(sides, { opacity: 0, y: 30 });
      gsap.set(cardRef.current, { opacity: 0, y: 160, rotate: CARD_TILT - 10 });
      root.classList.remove("intro");

      tl = gsap
        .timeline()
        .call(() => setTitleOn(true), undefined, 0)
        .to(cardRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0.35)
        .to(cardRef.current, { y: 0, rotate: CARD_TILT, duration: 1.5, ease: "expo.out" }, 0.35)
        .to(sides, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }, 0.9)
        .to(
          header,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            onComplete: () => {
              gsap.set(header, { clearProps: "transform,opacity" });
              lenisStore.current?.start();
            },
          },
          1.2
        );
    });

    return () => {
      cancelAnimationFrame(raf);
      if (!tl) return;
      tl.kill();
      gsap.set([header, ...sides], { clearProps: "transform,opacity" });
      gsap.set(card, { opacity: 1, y: 0, rotate: CARD_TILT });
      root.classList.remove("intro");
      lenisStore.current?.start();
      setTitleOn(true);
    };
  }, []);

  // Scroll: the stage shrinks to half size while the blurred project marquee
  // behind it sharpens; marquee columns drift in opposite directions.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      tl.to(stageRef.current, { scale: 0.5, ease: "power2.inOut", duration: 1 }, 0)
        .fromTo(
          bgRef.current,
          { filter: "blur(24px)", opacity: 0.35 },
          { filter: "blur(0px)", opacity: 1, ease: "power2.out", duration: 0.18 },
          0.32
        )
        .fromTo(col1Ref.current, { y: 0 }, { y: -200, ease: "none", duration: 1 }, 0)
        .fromTo(col2Ref.current, { y: -160 }, { y: 40, ease: "none", duration: 1 }, 0);
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative h-[300vh] w-screen text-white">
      {/* Sticky hero stage */}
      <div
        ref={stageRef}
        className="sticky top-0 z-10 flex h-screen w-screen flex-col overflow-hidden will-change-transform"
      >
        {/* Upper area */}
        <div
          className="relative flex-1 px-[5vw] pt-[8vw] max-[1025px]:pt-32"
          style={{
            backgroundColor: "rgb(4, 39, 34)",
            backgroundImage:
              "radial-gradient(60% 70% at 50% 40%, rgb(9, 60, 42) 0%, rgba(9,60,42,0) 70%), linear-gradient(rgb(8, 57, 40) 0%, rgb(4, 39, 34) 60%, rgb(3, 28, 24) 100%)",
          }}
        >
          <RevealText
            as="h1"
            play={titleOn}
            className="hero-intro select-none whitespace-nowrap text-center font-display text-[8.8vw] font-medium uppercase leading-[1.2] text-white max-[1025px]:whitespace-normal max-[1025px]:text-[15vw] max-[1025px]:leading-[1] max-md:text-[19vw]"
          >
            Rama Soni Ravictor
          </RevealText>

          <div className="relative mt-[2vw] flex items-start justify-between max-[1025px]:mt-10 max-[1025px]:flex-col max-[1025px]:items-center max-[1025px]:gap-10">
            {/* Left: real projects in place of the template's reviews */}
            <div
              ref={(el) => {
                sidesRef.current[0] = el;
              }}
              className="hero-intro w-[21vw] pt-[2vw] max-[1025px]:w-full max-[1025px]:pt-0 max-[1025px]:text-center"
            >
              <div className="flex max-[1025px]:justify-center">
                {THUMBS.map((p, i) => (
                  <img
                    key={p.id}
                    src={p.image}
                    alt=""
                    className="size-[4.2vw] rounded-full border-2 border-[#042722] object-cover object-top max-[1025px]:size-14"
                    style={{ marginLeft: i ? "-1.1vw" : 0 }}
                  />
                ))}
              </div>
              <p className="mt-[1.4vw] text-[1.4vw] font-medium max-[1025px]:mt-4 max-[1025px]:text-xl">
                {SHOWCASE_PROJECTS.length} projects <span className="text-white/45">(web, mobile &amp; AI)</span>
              </p>
              <p className="mt-[0.6vw] text-[1.1vw] leading-relaxed text-white/70 max-[1025px]:mt-2 max-[1025px]:text-base">
                From booking sites to AI assistants.{" "}
                <a href="#portfolio" className="text-brand underline-offset-4 hover:underline">
                  See the work
                </a>
              </p>
            </div>

            {/* Right: intro + CTA (desktop; the header's Contact link covers mobile) */}
            <div
              ref={(el) => {
                sidesRef.current[1] = el;
              }}
              className="hero-intro w-[21vw] pt-[2vw] max-[1025px]:hidden"
            >
              <p className="text-[1.1vw] leading-relaxed text-white/80">
                Hi, I&apos;m Rama, a {SITE_CONFIG.title.toLowerCase()} in {SITE_CONFIG.location.split(",")[0]} turning
                ideas into web, mobile and AI products.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-[1.6vw] inline-flex items-center gap-3 rounded-md bg-white px-[1.8vw] py-[0.9vw] text-[1vw] font-medium text-[#070707] transition-colors hover:bg-brand"
              >
                Let&apos;s connect
                <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Centre: tilted portrait card, overlapping the bar below */}
            {/* Hover straightens the tilted card */}
            <div
              onMouseEnter={() => gsap.to(cardRef.current, { rotate: 0, duration: 0.6, ease: "back.out(1.6)" })}
              onMouseLeave={() => gsap.to(cardRef.current, { rotate: CARD_TILT, duration: 0.6, ease: "back.out(1.6)" })}
              className="absolute left-1/2 top-[-4vw] z-20 w-[30vw] -translate-x-1/2 max-[1025px]:relative max-[1025px]:left-auto max-[1025px]:top-auto max-[1025px]:w-[66vw] max-[1025px]:translate-x-0 max-md:w-[76vw]"
            >
              <div
                ref={cardRef}
                className="hero-intro relative aspect-[3/4] overflow-hidden rounded-[1.4vw] border-[0.35vw] border-white/90 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] max-[1025px]:rounded-2xl max-[1025px]:border-4"
                style={{ transform: `rotate(${CARD_TILT}deg)` }}
              >
                {/* Full, uncropped IMG_7516_ai.jpg (3:4), resized for the web; original in assets-source/ */}
                <img
                  src="/images/rama-card.jpg"
                  alt={SITE_CONFIG.name}
                  draggable={false}
                  fetchPriority="high"
                  className="absolute inset-0 size-full origin-[53%_30%] scale-[1.15] select-none object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar: tech stack marquee (desktop) */}
        <div className="relative h-[16vh] min-h-[120px] shrink-0 bg-[#070707] pt-[2.2vw] max-[1025px]:hidden">
          <p className="text-center font-display text-[1.1vw] font-medium uppercase tracking-[0.35em] text-white">
            Tech I work with
          </p>
          <div
            className="mt-[1.6vw] overflow-hidden"
            style={{
              maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
              WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
            }}
          >
            <div className="flex w-max animate-marquee motion-reduce:animate-none">
              {[...LOGOS, ...LOGOS].map((t, i) => (
                <div
                  key={i}
                  aria-hidden={i >= LOGOS.length}
                  className="flex items-center gap-[0.8vw] px-[2.4vw] text-[1.5vw] font-medium text-white/55"
                >
                  <img src={`/images/tech/${t.logo}.svg`} alt="" className="size-[1.8vw] opacity-55 invert" />
                  {t.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project marquee behind the stage, revealed as it shrinks */}
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 size-full bg-[#070707]"
        style={{ opacity: 0.35, filter: "blur(24px)" }}
      >
        <div className="sticky top-0 flex h-screen w-full gap-[2.5vw] overflow-hidden px-[4vw]">
          <div ref={col1Ref} className="h-fit w-1/2 will-change-transform">
            <MarqueeColumn images={COL_1} duration="18s" />
          </div>
          <div
            ref={col2Ref}
            className="h-fit w-1/2 will-change-transform"
            style={{ transform: "translateY(-160px)" }}
          >
            <MarqueeColumn images={COL_2} duration="42s" />
          </div>
        </div>
      </div>
    </section>
  );
}
