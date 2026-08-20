"use client";

import { useEffect, useState } from "react";

/**
 * `prefers-reduced-motion` lato JS.
 * Il CSS lo gestisce già globalmente (globals.css); questo hook serve solo
 * dove il comportamento va cambiato, non solo attenuato.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
