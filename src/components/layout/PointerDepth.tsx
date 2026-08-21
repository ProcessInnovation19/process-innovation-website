"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Allineato al blocco CSS «bilancio GPU»: niente parallasse 3D su touch/compact. */
const LIGHT_GPU = "(max-width: 63.99rem), (hover: none) and (pointer: coarse)";
/** Inseguimento breve: abbastanza morbido da dare massa, senza sembrare input lag. */
const POINTER_EASE = 0.22;

/**
 * Alimenta la profondità dello sfondo.
 *
 * Scrive tre variabili solo sui due layer che le consumano (`.hud-backdrop` e
 * `.map-ambience`), non su `:root`: così ogni frame non invalida gli stili di
 * tutta la pagina. Il CSS le usa per inclinare lo spazio 3D e far scorrere i
 * piani a velocità diverse.
 *
 * Un solo listener per tutta la pagina: sfondo e ambiente della mappa leggono
 * le stesse variabili invece di installarne uno ciascuno.
 *
 * Lo smorzamento del puntatore è in JS, non in CSS: una `transition` sul
 * `transform` che usa variabili aggiornate a ogni frame fa ripartire
 * l'interpolazione e produce lo scatto in scroll. Lo scroll è applicato
 * subito, allineato al contenuto. Durante scroll e inseguimento del puntatore
 * le derive autonome si fermano per lasciare il compositor alla profondità.
 *
 * Su viewport compatte o puntatore touch non scrive nulla: il compositor
 * mobile non regge i piani 3D aggiornati in scroll.
 *
 * Non rende nulla nel DOM.
 */
export function PointerDepth() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const root = document.documentElement;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(".hud-backdrop, .map-ambience"),
    );
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const lightGpu = window.matchMedia(LIGHT_GPU);

    let frame: number | null = null;
    let scrollIdleTimer: number | null = null;
    let pointerIdleTimer: number | null = null;
    let scrolling = false;
    let depthMoving = false;

    let pointer = { x: 0, y: 0 };
    let pointerTarget = { x: 0, y: 0 };
    let scroll = 0;
    const written = new Map<string, string>();

    const setScrolling = (value: boolean) => {
      if (scrolling === value) return;
      scrolling = value;
      root.classList.toggle("is-scrolling", value);
    };

    const setDepthMoving = (value: boolean) => {
      if (depthMoving === value) return;
      depthMoving = value;
      root.classList.toggle("is-depth-moving", value);
    };

    const writeDepth = (name: string, value: string) => {
      if (written.get(name) === value) return;
      written.set(name, value);
      for (const target of targets) target.style.setProperty(name, value);
    };

    const apply = () => {
      frame = null;

      pointer.x += (pointerTarget.x - pointer.x) * POINTER_EASE;
      pointer.y += (pointerTarget.y - pointer.y) * POINTER_EASE;

      writeDepth("--pointer-x", pointer.x.toFixed(3));
      writeDepth("--pointer-y", pointer.y.toFixed(3));
      writeDepth("--scroll-depth", `${scroll.toFixed(1)}px`);

      const chasing =
        Math.abs(pointerTarget.x - pointer.x) > 0.002 ||
        Math.abs(pointerTarget.y - pointer.y) > 0.002;

      if (chasing) {
        frame = requestAnimationFrame(apply);
      } else if (pointerIdleTimer == null) {
        setDepthMoving(false);
      }
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
      setDepthMoving(true);
      if (pointerIdleTimer != null) window.clearTimeout(pointerIdleTimer);
      pointerIdleTimer = window.setTimeout(() => {
        pointerIdleTimer = null;
        if (frame == null) setDepthMoving(false);
      }, 160);
      schedule();
    };

    const onScroll = () => {
      readScroll();
      setScrolling(true);
      if (scrollIdleTimer != null) window.clearTimeout(scrollIdleTimer);
      scrollIdleTimer = window.setTimeout(() => {
        scrollIdleTimer = null;
        setScrolling(false);
      }, 160);
      schedule();
    };

    const freeze = () => {
      pointer = { x: 0, y: 0 };
      pointerTarget = { x: 0, y: 0 };
      scroll = 0;
      setScrolling(false);
      setDepthMoving(false);
      writeDepth("--pointer-x", "0");
      writeDepth("--pointer-y", "0");
      writeDepth("--scroll-depth", "0px");
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
      if (scrollIdleTimer != null) {
        window.clearTimeout(scrollIdleTimer);
        scrollIdleTimer = null;
      }
      if (pointerIdleTimer != null) {
        window.clearTimeout(pointerIdleTimer);
        pointerIdleTimer = null;
      }
      setScrolling(false);
      setDepthMoving(false);
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
      for (const target of targets) {
        target.style.removeProperty("--pointer-x");
        target.style.removeProperty("--pointer-y");
        target.style.removeProperty("--scroll-depth");
      }
    };
  }, [pathname]);

  return null;
}
