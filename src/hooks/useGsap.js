import { useLayoutEffect } from "react";
import { gsap } from "../lib/gsap";

/**
 * Runs GSAP code scoped to a ref'd element and cleans it up automatically
 * (kills tweens + ScrollTriggers created inside). This is the React-safe way
 * to port the Part 1 scroll animations.
 */
export function useGsap(scopeRef, setup, deps = []) {
  useLayoutEffect(() => {
    const ctx = gsap.context(setup, scopeRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
