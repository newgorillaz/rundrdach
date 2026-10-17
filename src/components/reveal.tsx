"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * One-shot entrance when the block enters the viewport.
 * Respects prefers-reduced-motion via CSS; no looping animation.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms for sibling cards. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Skip observer when the user prefers reduced motion — show immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={"reveal" + (visible ? " reveal-visible" : "") + (className ? " " + className : "")}
      style={delay ? { transitionDelay: delay + "ms" } : undefined}
    >
      {children}
    </div>
  );
}
