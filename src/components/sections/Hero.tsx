"use client";

import { useEffect, useRef, useState } from "react";
import { SITE_CONFIG } from "@/lib/constants";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { lenisStore } from "@/lib/lenis";
import { RevealText } from "@/components/ui/RevealText";

const COL_1 = ["lisa-home-stay", "tembi", "tanikasir", "pandawa-ai"];
const COL_2 = ["undang-in", "tanikasir-storefront", "lisa-home-stay", "tembi"];

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
      {[...images, ...images].map((name, i) => (
        <div key={i} className="w-full pb-[2.5vw]">
          <div className="h-[27vw] w-full overflow-hidden">
            <img src={`/images/work/${name}.jpg`} alt="" className="object-cover object-top size-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const avatarImgRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const [titleOn, setTitleOn] = useState(false);

  // Intro on a fresh home page load: scroll locked, title rises in letter by
  // letter, badges follow, then the header drops in and scrolling unlocks.
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("intro")) {
      setTitleOn(true);
      return;
    }

    let tl: gsap.core.Timeline | null = null;
    const header = document.getElementById("header");

    // Deferred a frame so React strict mode's mount/unmount/mount in dev
    // cancels the first run instead of eating the intro.
    const raf = requestAnimationFrame(() => {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
      lenisStore.current?.scrollTo(0, { immediate: true, force: true });
      lenisStore.current?.stop();

      gsap.set(header, { yPercent: -50, opacity: 0 });
      gsap.set(badgesRef.current, { opacity: 0, y: 20 });
      gsap.set(avatarRef.current, { opacity: 0, "--reveal": "-40%" });
      root.classList.remove("intro");

      tl = gsap
        .timeline()
        // Portrait wipes in diagonally over 3.5s while fading up, as in the reference.
        .to(avatarRef.current, { "--reveal": "125%", duration: 3.5, ease: "power2.out" }, 0)
        .to(avatarRef.current, { opacity: 1, duration: 1.5, ease: "power2.out" }, 0)
        .call(() => setTitleOn(true), undefined, 1.0)
        .to(badgesRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 1.5)
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
          1.8
        );
    });

    return () => {
      cancelAnimationFrame(raf);
      if (!tl) return;
      tl.kill();
      gsap.set([header, badgesRef.current], { clearProps: "transform,opacity" });
      gsap.set(avatarRef.current, { opacity: 1, "--reveal": "125%" });
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

  // Mouse parallax (desktop only): portrait ±30px, text ±12px, lerp 0.08.
  useEffect(() => {
    if (window.innerWidth <= 1024 || prefersReducedMotion()) return;
    const s = { nx: 0, ny: 0, x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      s.nx = (e.clientX / window.innerWidth) * 2 - 1;
      s.ny = (e.clientY / window.innerHeight) * 2 - 1;
    };
    let raf = 0;
    const tick = () => {
      s.x += (s.nx - s.x) * 0.08;
      s.y += (s.ny - s.y) * 0.08;
      gsap.set(textRef.current, { x: -12 * s.x, y: -12 * s.y });
      gsap.set(avatarImgRef.current, { x: -30 * s.x, y: -30 * s.y });
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative h-[300vh] w-screen">
      {/* Sticky Hero Stage */}
      <div
        ref={stageRef}
        className="sticky top-0 z-10 flex h-screen w-screen items-center justify-between overflow-hidden px-[4vw] will-change-transform max-[1025px]:items-start max-[1025px]:px-[5vw] max-[1025px]:pt-[30vw]"
        style={{
          backgroundColor: "rgb(2, 22, 18)",
          backgroundImage: `
            radial-gradient(65% 55% at 92% 6%, rgb(8, 57, 40) 0%, rgba(8, 57, 40, 0) 65%),
            radial-gradient(60% 55% at 4% 82%, rgb(9, 60, 42) 0%, rgba(9, 60, 42, 0) 65%),
            radial-gradient(75% 80% at 48% 42%, rgb(4, 39, 34) 0%, rgba(4, 39, 34, 0) 70%),
            linear-gradient(rgb(8, 57, 40) 0%, rgb(6, 47, 35) 28%, rgb(4, 39, 34) 46%, rgb(3, 28, 24) 68%, rgb(3, 25, 21) 88%, rgb(2, 22, 18) 100%)
          `,
        }}
      >
        <div
          ref={textRef}
          className="hero-intro relative z-20 flex w-full justify-between max-[1025px]:flex-col max-[1025px]:gap-8"
        >
          <div className="w-[50%] max-[1025px]:w-[70%] max-md:w-full">
            <RevealText
              as="h1"
              play={titleOn}
              className="select-none font-sans text-[7.5vw] font-normal leading-[1.05] tracking-tight text-white max-[1025px]:text-[12vw] max-md:text-[15vw]"
            >
              Turning<br />
              Ideas into<br />
              Products
            </RevealText>
          </div>

          <div
            ref={badgesRef}
            className="flex w-[18%] flex-col justify-between py-[2vw] text-end text-[1.25vw] leading-[1.2] max-[1025px]:w-[45%] max-[1025px]:flex-col-reverse max-[1025px]:gap-16 max-[1025px]:text-start max-[1025px]:text-[3.5vw] max-md:gap-[7vw] max-md:py-0 max-md:text-[4.5vw]"
          >
            <div>
              <p className="text-white/90">
                Web, Mobile<br />
                &amp; AI Engineering
              </p>
            </div>
            <div className="mt-8">
              <p className="text-white/90">
                {SITE_CONFIG.title}<br />
                {SITE_CONFIG.location}
              </p>
            </div>
          </div>
        </div>

        {/* Backlight glow behind the portrait */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[12%] z-[5] h-[75vh] w-[60vh] -translate-x-1/2 rounded-full blur-3xl max-[1025px]:top-auto max-[1025px]:bottom-0 max-[1025px]:h-[55vh] max-[1025px]:w-[45vh]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(45,159,94,0.55) 0%, rgba(8,57,40,0.35) 55%, rgba(8,57,40,0) 100%)",
          }}
        />

        {/* Portrait in front of the title, with diagonal mask reveal */}
        <div
          ref={avatarRef}
          className="hero-intro hero-mask-reveal pointer-events-none absolute inset-0 z-30"
          style={{ "--reveal": "125%" } as React.CSSProperties}
        >
          {/* Viewport-sized frame: crops to chest-up and fades the bottom edge */}
          <div className="hero-portrait-frame absolute inset-0 overflow-hidden">
            {/* Scaled so the head sits ~8vh from the top and the chest meets the
                bottom edge; nudged right so the face lands just right of centre. */}
            <div className="hero-portrait-crop absolute inset-x-0 flex justify-center">
              <div ref={avatarImgRef} className="relative h-full will-change-transform">
                <div
                  className="relative h-full"
                  style={{ transform: "rotate(-2.5deg)", transformOrigin: "50% 100%" }}
                >
                  <img
                    src="/images/rama-hero.png"
                    alt={SITE_CONFIG.name}
                    draggable={false}
                    fetchPriority="high"
                    className="block h-full w-auto max-w-none select-none"
                    style={{ filter: "saturate(0.55) contrast(1.1) brightness(0.9)" }}
                  />
                  {/* Colour grade + rim light, clipped to the subject's silhouette */}
                  <div aria-hidden="true" className="hero-portrait-grade absolute inset-0" />
                  <div aria-hidden="true" className="hero-portrait-rim absolute inset-0" />
                </div>
              </div>
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
          <div ref={col1Ref} className="w-1/2 h-fit will-change-transform">
            <MarqueeColumn images={COL_1} duration="18s" />
          </div>
          <div
            ref={col2Ref}
            className="w-1/2 h-fit will-change-transform"
            style={{ transform: "translateY(-160px)" }}
          >
            <MarqueeColumn images={COL_2} duration="42s" />
          </div>
        </div>
      </div>
    </section>
  );
}
