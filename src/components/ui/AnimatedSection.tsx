"use client";

import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "fadeIn";
  delay?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  animation = "fadeInUp",
  delay = 0,
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const animations = {
    fadeInUp: "translate-y-8 opacity-0",
    fadeInLeft: "-translate-x-8 opacity-0",
    fadeInRight: "translate-x-8 opacity-0",
    fadeIn: "opacity-0",
  };

  return (
    <div
      // ref={ref}
      className={`
        transition-all duration-700 ease-out
        ${
          isIntersecting
            ? "translate-y-0 translate-x-0 opacity-100"
            : animations[animation]
        }
        ${className}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
