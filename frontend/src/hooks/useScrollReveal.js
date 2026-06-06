import { useEffect, useRef } from "react";

/**
 * Hook that adds scroll-reveal animation to elements.
 * Attaches an IntersectionObserver that adds .is-visible when element enters viewport.
 *
 * @param {Object} options
 * @param {number} options.threshold - How much of the element must be visible (0-1). Default 0.15
 * @param {string} options.rootMargin - Margin around root. Default "0px 0px -40px 0px"
 * @returns {React.RefObject} ref to attach to the container element
 */
export const useScrollReveal = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const { threshold = 0.15, rootMargin = "0px 0px -40px 0px" } = options;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // Only animate once
          }
        });
      },
      { threshold, rootMargin }
    );

    const el = ref.current;
    if (el) {
      // Observe the container itself if it has .reveal
      if (el.classList.contains("reveal")) {
        observer.observe(el);
      }
      // Observe all .reveal children
      const children = el.querySelectorAll(".reveal");
      children.forEach((child) => observer.observe(child));
    }

    return () => observer.disconnect();
  }, []);

  return ref;
};

export default useScrollReveal;
