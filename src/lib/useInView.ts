"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** margine di attivazione rispetto alla viewport */
  rootMargin?: string;
  /** frazione visibile necessaria */
  threshold?: number;
  /** una volta entrato, non torna più a false */
  once?: boolean;
};

/**
 * Osserva l'ingresso in viewport di un elemento.
 * Usato dal motion language per "boot" e "connect": nessuna animazione
 * parte prima che la sezione sia realmente visibile.
 */
export function useInView<T extends HTMLElement>({
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.15,
  once = true,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Ambienti senza IntersectionObserver: nessuna animazione, contenuto
    // immediatamente visibile invece che bloccato a opacità zero.
    if (typeof IntersectionObserver === "undefined") {
      const timer = setTimeout(() => setInView(true), 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return { ref, inView } as const;
}
