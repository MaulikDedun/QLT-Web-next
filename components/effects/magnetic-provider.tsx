"use client";

import { useEffect } from "react";

export function MagneticProvider() {
  useEffect(() => {
    const cleanup: Array<() => void> = [];
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));

    elements.forEach((element) => {
      const strength = Number(element.dataset.magneticStrength ?? "18");

      const onMove = (event: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        element.style.transform = `translate3d(${x / strength}px, ${y / strength}px, 0)`;
      };

      const onLeave = () => {
        element.style.transform = "translate3d(0, 0, 0)";
      };

      element.addEventListener("mousemove", onMove);
      element.addEventListener("mouseleave", onLeave);

      cleanup.push(() => {
        element.removeEventListener("mousemove", onMove);
        element.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanup.forEach((fn) => fn());
  }, []);

  return null;
}
