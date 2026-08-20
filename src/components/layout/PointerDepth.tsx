"use client";

import { useEffect } from "react";

/**
 * Alimenta la profondità dello sfondo.
 *
 * Scrive tre variabili su `:root` — `--pointer-x`, `--pointer-y` (da -1 a 1) e
 * `--scroll-depth` (px smorzati). Il CSS le usa per inclinare lo spazio 3D e
 * per far scorrere i piani a velocità diverse: è quella differenza a produrre
 * la parallasse, cioè la percezione di spazio dietro l'interfaccia.
 *
 * Un solo listener per tutta la pagina: sfondo e ambiente della mappa leggono
 * le stesse variabili invece di installarne uno ciascuno.
 *
 * Non rende nulla nel DOM.
 */
export function PointerDepth() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");

    let frame: number | null = null;
    let pointer = { x: 0, y: 0 };
    let scroll = 0;

    const apply = () => {
      frame = null;
      root.style.setProperty("--pointer-x", pointer.x.toFixed(3));
      root.style.setProperty("--pointer-y", pointer.y.toFixed(3));
      root.style.setProperty("--scroll-depth", `${scroll.toFixed(1)}px`);
    };

    const schedule = () => {
      if (frame == null) frame = requestAnimationFrame(apply);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer = {
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * 2,
      };
      schedule();
    };

    const onScroll = () => {
      // smorzato e limitato: oltre una certa corsa la parallasse smetterebbe
      // di leggersi come profondità e diventerebbe deriva
      scroll = Math.min(window.scrollY * 0.35, 420);
      schedule();
    };

    const attach = () => {
      detach();
      if (reduced.matches) {
        root.style.setProperty("--pointer-x", "0");
        root.style.setProperty("--pointer-y", "0");
        root.style.setProperty("--scroll-depth", "0px");
        return;
      }

      if (finePointer.matches) {
        window.addEventListener("pointermove", onPointerMove, { passive: true });
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    };

    const detach = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };

    attach();
    reduced.addEventListener("change", attach);
    finePointer.addEventListener("change", attach);

    return () => {
      detach();
      reduced.removeEventListener("change", attach);
      finePointer.removeEventListener("change", attach);
      if (frame != null) cancelAnimationFrame(frame);
      root.style.removeProperty("--pointer-x");
      root.style.removeProperty("--pointer-y");
      root.style.removeProperty("--scroll-depth");
    };
  }, []);

  return null;
}
