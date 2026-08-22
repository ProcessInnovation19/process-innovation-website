"use client";

import { useEffect } from "react";

const MIN_VISIBLE_MS = 1400;
const EXIT_MS = 320;

/**
 * Il velo vive nel markup del layout (html::before + #hud-boot).
 * Qui: mostra la pagina opacizzata sotto, poi spegne il velo a pagina pronta.
 */
export function HudBootOverlay() {
  useEffect(() => {
    const root = document.documentElement;
    const veil = document.getElementById("hud-boot");
    root.classList.add("is-booting");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const started =
      typeof window.__hudBootStarted === "number" ? window.__hudBootStarted : performance.now();

    let cancelled = false;
    let exitTimer = 0;
    let revealTimer = 0;

    const revealBehind = () => {
      if (cancelled) return;
      root.classList.add("is-boot-ready");
    };

    const dismiss = () => {
      if (cancelled) return;
      root.classList.remove("is-booting", "is-boot-ready", "hud-boot--exit");
      veil?.remove();
    };

    const exit = () => {
      if (cancelled) return;
      if (reduced) {
        dismiss();
        return;
      }
      root.classList.add("hud-boot--exit");
      veil?.classList.add("hud-boot--exit");
      veil?.setAttribute("aria-busy", "false");
      exitTimer = window.setTimeout(dismiss, EXIT_MS);
    };

    const finish = async () => {
      const elapsed = performance.now() - started;
      const wait = reduced ? 0 : MIN_VISIBLE_MS - elapsed;
      if (wait > 0) await new Promise((resolve) => window.setTimeout(resolve, wait));
      exit();
    };

    if (reduced) {
      revealBehind();
    } else if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", revealBehind, { once: true });
    } else {
      revealTimer = window.setTimeout(revealBehind, 120);
    }

    if (document.readyState === "complete") {
      void finish();
    } else {
      window.addEventListener("load", () => void finish(), { once: true });
    }

    return () => {
      cancelled = true;
      window.clearTimeout(exitTimer);
      window.clearTimeout(revealTimer);
    };
  }, []);

  return null;
}

declare global {
  interface Window {
    __hudBootStarted?: number;
  }
}
