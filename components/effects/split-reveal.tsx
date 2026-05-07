"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type SplitRevealProps = {
  text: string;
  className?: string;
};

export function SplitReveal({ text, className }: SplitRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const split = new SplitType(node, { types: "words,chars" });
    gsap.fromTo(
      split.chars,
      { yPercent: 100, filter: "blur(6px)", opacity: 0 },
      {
        yPercent: 0,
        filter: "blur(0px)",
        opacity: 1,
        stagger: 0.012,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: node,
          start: "top 80%",
        },
      },
    );

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((item) => {
        if (item.trigger === node) item.kill();
      });
    };
  }, []);

  return (
    <h2 ref={ref} className={className}>
      {text}
    </h2>
  );
}
