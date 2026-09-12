import { useEffect } from "react";

/*
  Scroll reveal, matching the design's behaviour: anything marked
  data-reveal starts faded and shifted down, then settles once it scrolls
  into view. Elements already on screen at mount are revealed immediately so
  the first paint is never blank.

  Pass a key that changes whenever the visible content changes (the route,
  a tab) so newly mounted nodes get picked up.
*/
export default function useReveal(resetKey) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!nodes.length) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      nodes.forEach((node) => node.classList.add("kz-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (!entry.isIntersecting) return;
          const node = entry.target;
          // Stagger siblings slightly so a grid does not pop all at once.
          window.setTimeout(() => node.classList.add("kz-in"), i * 100);
          observer.unobserve(node);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    nodes.forEach((node) => {
      const box = node.getBoundingClientRect();
      if (box.top < window.innerHeight * 0.95 && box.bottom > 0) {
        node.classList.add("kz-in");
        return;
      }
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, [resetKey]);
}
