"use client";

import { useState } from "react";
import { RevealText } from "@/components/ui/RevealText";
import { FadeIn } from "@/components/ui/FadeIn";
import { FAQ_ITEMS } from "@/data/faq";


export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="relative w-screen bg-[#070707] px-[10vw] py-[6vw] text-white max-[1025px]:px-[5vw]"
    >
      <RevealText
        as="h2"
        className="mb-[6vw] text-center font-sans text-[5.5vw] font-normal tracking-tight max-[1025px]:text-[7vw] max-md:text-[9vw]"
      >
        Frequently Asked Questions
      </RevealText>

      <div className="mx-auto w-full divide-y divide-white/10">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <FadeIn key={idx}>
            <div
              onClick={() => toggle(idx)}
              className="group cursor-pointer py-8 max-md:py-5"
            >
              <div className="flex items-center justify-between gap-6">
                <span className="font-sans text-[1.5vw] font-normal transition-colors group-hover:text-brand max-[1025px]:text-[2.6vw] max-md:text-[4.2vw]">
                  {item.q}
                </span>

                {/* Plus / Minus Indicator */}
                <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 max-[1025px]:size-11 max-md:size-9">
                  <span className="absolute z-10 h-[2px] w-4 rounded-full bg-white max-md:w-3" />
                  <span
                    className={`absolute z-10 h-[2px] w-4 rounded-full bg-white transition-transform duration-300 max-md:w-3 ${
                      isOpen ? "rotate-0" : "rotate-90"
                    }`}
                  />
                  <div
                    className={`absolute inset-0 size-full rounded-full bg-gradient-to-r from-[#083928] to-[#042722] transition-transform duration-300 ${
                      isOpen ? "scale-100" : "scale-0 group-hover:scale-100"
                    }`}
                  />
                </div>
              </div>

              {/* Accordion Content */}
              <div
                className={`overflow-hidden transition-all duration-400 ease-out ${
                  isOpen ? "max-h-96 pt-4 opacity-100" : "max-h-0 pt-0 opacity-0"
                }`}
              >
                <p className="w-[85%] text-[1.25vw] leading-relaxed text-white/70 max-[1025px]:w-full max-[1025px]:text-[2.2vw] max-md:text-[3.8vw]">
                  {item.a}
                </p>
              </div>
            </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
