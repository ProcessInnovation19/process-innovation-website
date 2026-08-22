"use client";

import { useEffect } from "react";

const MIN_VISIBLE_MS = 1400;
const EXIT_MS = 320;

/**
 * Non disegna il velo: quello è HTML del layout, visibile dal primo paint.
 * Qui resta solo lo spegnimento, dopo che la pagina sotto è pronta.
 */
export function HudBootOverlay() {
  useEffect(() => {
    const root = document.documentElement;
    const veil = document.getElementById("hud-boot");
    if (!veil) {
      root.classList.remove("is-booting");
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const started =
      typeof window.__hudBootStarted === "number" ? window.__hudBootStarted : performance.now();

    let cancelled = false;
    let exitTimer = 0;

    const dismiss = () => {
      if (cancelled) return;
      root.classList.remove("is-booting");
      veil.remove();
    };

    const exit = () => {
      if (cancelled) return;
      if (reduced) {
        dismiss();
        return;
      }
      veil.classList.add("hud-boot--exit");
      veil.setAttribute("aria-busy", "false");
      exitTimer = window.setTimeout(dismiss, EXIT_MS);
    };

    const finish = async () => {
      const elapsed = performance.now() - started;
      const wait = reduced ? 0 : MIN_VISIBLE_MS - elapsed;
      if (wait > 0) await new Promise((resolve) => window.setTimeout(resolve, wait));
      exit();
    };

    if (document.readyState === "complete") {
      void finish();
    } else {
      window.addEventListener("load", () => void finish(), { once: true });
    }

    return () => {
      cancelled = true;
      window.clearTimeout(exitTimer);
    };
  }, []);

  return null;
}

declare global {
  interface Window {
    __hudBootStarted?: number;
  }
}
