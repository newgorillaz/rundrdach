"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once on the client — never call gsap/ScrollTrigger during SSR.
gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Homepage motion shell: hero intro timeline, scroll reveals, image parallax,
 * marquee drift, and process-step draws. Scoped to this tree via data-* hooks.
 * Respects prefers-reduced-motion (matchMedia); no-JS visitors see content via noscript CSS.
 */
export function HomeMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      // Only animate when the user has not asked for reduced motion.
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // --- Hero load timeline: masked lines, copy, buttons, photos ---
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Line wrapper must be visible; only the masked inners start off-screen.
        const heroLineWrap = root.querySelector('[data-hero="line"]');
        if (heroLineWrap) gsap.set(heroLineWrap, { opacity: 1 });
        const heroLines = root.querySelectorAll('[data-hero="line"] .line-inner');
        if (heroLines.length) {
          gsap.set(heroLines, { yPercent: 100 });
          heroTl.to(heroLines, { yPercent: 0, duration: 0.95, stagger: 0.1 }, 0.15);
        }

        const heroEyebrow = root.querySelector('[data-hero="eyebrow"]');
        if (heroEyebrow) {
          gsap.set(heroEyebrow, { opacity: 0, y: 16 });
          heroTl.to(heroEyebrow, { opacity: 1, y: 0, duration: 0.6 }, 0);
        }

        const heroCopy = root.querySelector('[data-hero="copy"]');
        if (heroCopy) {
          gsap.set(heroCopy, { opacity: 0, y: 24 });
          heroTl.to(heroCopy, { opacity: 1, y: 0, duration: 0.7 }, 0.45);
        }

        const heroButtons = root.querySelector('[data-hero="buttons"]');
        if (heroButtons) {
          gsap.set(heroButtons, { opacity: 0, y: 20 });
          heroTl.to(heroButtons, { opacity: 1, y: 0, duration: 0.65 }, 0.55);
        }

        const heroScroll = root.querySelector('[data-hero="scroll"]');
        if (heroScroll) {
          gsap.set(heroScroll, { opacity: 0, y: 12 });
          heroTl.to(heroScroll, { opacity: 1, y: 0, duration: 0.55 }, 0.7);
        }

        const heroPhoto = root.querySelector('[data-hero="photo"]');
        if (heroPhoto) {
          // Opacity must flip to 1 — CSS hides all [data-hero] until GSAP takes over.
          gsap.set(heroPhoto, { clipPath: "inset(0 0 100% 0)", scale: 1.12, opacity: 1 });
          heroTl.to(
            heroPhoto,
            { clipPath: "inset(0 0 0% 0)", scale: 1, duration: 1.05, ease: "power2.out" },
            0.2,
          );
        }

        const heroPhoto2 = root.querySelector('[data-hero="photo-2"]');
        if (heroPhoto2) {
          gsap.set(heroPhoto2, { opacity: 0, y: 28, scale: 0.96 });
          heroTl.to(heroPhoto2, { opacity: 1, y: 0, scale: 1, duration: 0.75 }, 0.55);
        }

        const heroLabel = root.querySelector('[data-hero="label"]');
        if (heroLabel) {
          gsap.set(heroLabel, { opacity: 0, x: -20 });
          heroTl.to(heroLabel, { opacity: 1, x: 0, duration: 0.65 }, 0.75);
        }

        // --- Scroll reveals: batch fade-up for cards and section blocks ---
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 88%",
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { opacity: 0, y: 28 },
              { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power2.out", overwrite: true },
            );
          },
        });

        // Group containers: animate children with a slightly longer stagger.
        root.querySelectorAll("[data-reveal-group]").forEach((group) => {
          const kids = group.querySelectorAll(":scope > [data-reveal-item]");
          if (!kids.length) return;
          gsap.set(kids, { opacity: 0, y: 32 });
          ScrollTrigger.create({
            trigger: group,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(kids, {
                opacity: 1,
                y: 0,
                duration: 0.65,
                stagger: 0.1,
                ease: "power2.out",
              });
            },
          });
        });

        // --- Masked section headlines (lines prepared via SplitLines / line-mask) ---
        root.querySelectorAll("[data-split] .line-inner").forEach((line) => {
          gsap.set(line, { yPercent: 100 });
        });
        root.querySelectorAll("[data-split]").forEach((heading) => {
          const lines = heading.querySelectorAll(".line-inner");
          if (!lines.length) return;
          ScrollTrigger.create({
            trigger: heading,
            start: "top 90%",
            once: true,
            onEnter: () => {
              gsap.to(lines, {
                yPercent: 0,
                duration: 0.85,
                stagger: 0.08,
                ease: "power3.out",
              });
            },
          });
        });

        // --- Parallax on images (inner img or the frame itself) ---
        const desktop = window.matchMedia("(min-width: 761px)").matches;
        root.querySelectorAll("[data-parallax]").forEach((el) => {
          const amount = Number((el as HTMLElement).dataset.parallax) || 0.12;
          // Mobile uses a gentler shift so photos stay framed.
          const yPercent = desktop ? amount * 100 : amount * 40;
          const target = el.querySelector("img") ?? el;
          gsap.fromTo(
            target,
            { yPercent: -yPercent * 0.5 },
            {
              yPercent: yPercent * 0.5,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
        });

        // --- Craft-band staggered settle on desktop ---
        if (desktop) {
          root.querySelectorAll(".craft-band-card:nth-child(odd)").forEach((card) => {
            gsap.fromTo(
              card,
              { y: 40 },
              {
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "top 55%",
                  scrub: 0.5,
                },
              },
            );
          });
        }

        // --- Process step border draw + number fade ---
        root.querySelectorAll("[data-draw]").forEach((step) => {
          gsap.set(step, { scaleX: 0, transformOrigin: "left center" });
          ScrollTrigger.create({
            trigger: step.parentElement ?? step,
            start: "top 80%",
            once: true,
            onEnter: () => {
              gsap.to(step, { scaleX: 1, duration: 0.8, ease: "power2.out" });
              const num = step.parentElement?.querySelector(".step-number");
              if (num) {
                gsap.fromTo(num, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.15 });
              }
            },
          });
        });

        // --- Marquee: idle drift + scroll-linked nudge ---
        const marqueeTrack = root.querySelector("[data-marquee]");
        if (marqueeTrack) {
          // Slow continuous drift for ambient motion.
          gsap.to(marqueeTrack, {
            xPercent: -50,
            duration: 28,
            ease: "none",
            repeat: -1,
          });
          // Extra scroll scrub so scrolling feels connected to the strip.
          gsap.to(marqueeTrack, {
            x: "-8vw",
            ease: "none",
            scrollTrigger: {
              trigger: marqueeTrack.parentElement ?? marqueeTrack,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        }

        // --- CTA decorative square rotation ---
        const rotateEl = root.querySelector("[data-rotate]");
        if (rotateEl) {
          gsap.to(rotateEl, {
            rotation: 45,
            ease: "none",
            scrollTrigger: {
              trigger: rotateEl.parentElement ?? rotateEl,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        // Refresh after layout/images settle so trigger positions stay accurate.
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh, { once: true });
        // Fonts can shift line heights; refresh when ready.
        if (document.fonts?.ready) {
          document.fonts.ready.then(refresh).catch(() => undefined);
        }

        return () => {
          window.removeEventListener("load", refresh);
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="home-motion">
      {/* No-JS fallback: force visible content when scripts never run. */}
      <noscript>
        <style>{`.home-motion [data-hero], .home-motion [data-reveal], .home-motion [data-reveal-item], .home-motion [data-split] .line-inner { opacity: 1 !important; transform: none !important; }`}</style>
      </noscript>
      {children}
    </div>
  );
}
