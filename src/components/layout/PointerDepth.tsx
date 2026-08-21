"use client";

import { useEffect } from "react";

/** Allineato al blocco CSS «bilancio GPU»: niente parallasse 3D su touch/compact. */
const LIGHT_GPU = "(max-width: 63.99rem), (hover: none) and (pointer: coarse)";

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
 * Lo smorzamento del puntatore è in JS, non in CSS: una `transition` sul
 * `transform` che usa variabili aggiornate a ogni frame fa ripartire
 * l'interpolazione e produce lo scatto in scroll. Lo scroll è applicato
 * subito, allineato al contenuto. Durante lo scroll le animazioni decorative
 * si mettono in pausa (`html.is-scrolling`).
 *
 * Su viewport compatte o puntatore touch non scrive nulla: il compositor
 * mobile non regge i piani 3D aggiornati in scroll.
 *
 * Non rende nulla nel DOM.
 */
export function PointerDepth() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const lightGpu = window.matchMedia(LIGHT_GPU);

    let frame: number | null = null;
    let idleTimer: number | null = null;
    let scrolling = false;

    let pointer = { x: 0, y: 0 };
    let pointerTarget = { x: 0, y: 0 };
    let scroll = 0;

    const setScrolling = (value: boolean) => {
      if (scrolling === value) return;
      scrolling = value;
      root.classList.toggle("is-scrolling", value);
    };

    const apply = () => {
      frame = null;

      pointer.x += (pointerTarget.x - pointer.x) * 0.14;
      pointer.y += (pointerTarget.y - pointer.y) * 0.14;

      root.style.setProperty("--pointer-x", pointer.x.toFixed(3));
      root.style.setProperty("--pointer-y", pointer.y.toFixed(3));
      root.style.setProperty("--scroll-depth", `${scroll.toFixed(1)}px`);

      const chasing =
        Math.abs(pointerTarget.x - pointer.x) > 0.002 ||
        Math.abs(pointerTarget.y - pointer.y) > 0.002;

      if (chasing) frame = requestAnimationFrame(apply);
    };

    const schedule = () => {
      if (frame == null) frame = requestAnimationFrame(apply);
    };

    const readScroll = () => {
      // smorzato e limitato: oltre una certa corsa la parallasse smetterebbe
      // di leggersi come profondità e diventerebbe deriva
      scroll = Math.min(window.scrollY * 0.35, 420);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerTarget = {
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * 2,
      };
      schedule();
    };

    const onScroll = () => {
      readScroll();
      setScrolling(true);
      if (idleTimer != null) window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        idleTimer = null;
        setScrolling(false);
      }, 160);
      schedule();
    };

    const freeze = () => {
      pointer = { x: 0, y: 0 };
      pointerTarget = { x: 0, y: 0 };
      scroll = 0;
      setScrolling(false);
      root.style.setProperty("--pointer-x", "0");
      root.style.setProperty("--pointer-y", "0");
      root.style.setProperty("--scroll-depth", "0px");
    };

    const attach = () => {
      detach();
      if (reduced.matches || lightGpu.matches) {
        freeze();
        return;
      }

      if (finePointer.matches) {
        window.addEventListener("pointermove", onPointerMove, { passive: true });
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      readScroll();
      schedule();
    };

    const detach = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      if (idleTimer != null) {
        window.clearTimeout(idleTimer);
        idleTimer = null;
      }
      setScrolling(false);
      if (frame != null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    };

    attach();
    reduced.addEventListener("change", attach);
    finePointer.addEventListener("change", attach);
    lightGpu.addEventListener("change", attach);

    return () => {
      detach();
      reduced.removeEventListener("change", attach);
      finePointer.removeEventListener("change", attach);
      lightGpu.removeEventListener("change", attach);
      root.style.removeProperty("--pointer-x");
      root.style.removeProperty("--pointer-y");
      root.style.removeProperty("--scroll-depth");
    };
  }, []);

  return null;
}
