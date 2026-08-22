"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { SystemLabel } from "@/components/hud";
import { site } from "@/content/site";

type BootPhase = "loading" | "exit" | "done";

const MIN_VISIBLE_MS = 520;
const EXIT_MS = 480;

/**
 * Schermata di avvio collegata al caricamento reale della pagina.
 * Compare solo al primo paint del documento (il layout non si smonta in SPA).
 */
export function HudBootOverlay() {
  const [phase, setPhase] = useState<BootPhase>("loading");
  const [progress, setProgress] = useState(0);
  const startedRef = useRef(0);

  useEffect(() => {
    startedRef.current = performance.now();
    const root = document.documentElement;
    root.classList.add("is-booting");

    let cancelled = false;
    let frame = 0;
    let target = 6;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const bump = (value: number) => {
      target = Math.max(target, value);
    };

    const tick = () => {
      setProgress((current) => {
        const next = current + (target - current) * (reduced ? 0.35 : 0.14);
        return target - current < 0.4 ? target : next;
      });
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    bump(18);

    if (document.readyState === "interactive" || document.readyState === "complete") {
      bump(42);
    } else {
      document.addEventListener("DOMContentLoaded", () => bump(42), { once: true });
    }

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    void fontsReady.then(() => bump(68));

    const pageReady =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            window.addEventListener("load", () => resolve(), { once: true });
          });

    const finish = async () => {
      bump(100);

      if (reduced) {
        if (!cancelled) setPhase("done");
        return;
      }

      const elapsed = performance.now() - startedRef.current;
      const wait = MIN_VISIBLE_MS - elapsed;
      if (wait > 0) await new Promise((resolve) => window.setTimeout(resolve, wait));

      if (cancelled) return;

      setPhase("exit");
      window.setTimeout(() => {
        if (!cancelled) setPhase("done");
      }, EXIT_MS);
    };

    void pageReady.then(finish);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      root.classList.remove("is-booting");
    };
  }, []);

  useEffect(() => {
    if (phase !== "done") return;
    document.documentElement.classList.remove("is-booting");
  }, [phase]);

  if (phase === "done") return null;

  const pct = Math.min(100, Math.round(progress));

  return (
    <div
      className={cn("hud-boot", phase === "exit" && "hud-boot--exit")}
      role="status"
      aria-live="polite"
      aria-busy={phase === "loading"}
      aria-label="Caricamento interfaccia di sistema"
    >
      <div className="hud-boot__panel">
        <div className="hud-boot__head">
          <SystemLabel tone="active">SYS.BOOT</SystemLabel>
          <span aria-hidden="true" className="hud-rule w-8 flex-none" />
          <SystemLabel>Inizializzazione</SystemLabel>
          <span className="ml-auto font-mono text-[0.6875rem] tracking-[0.14em] text-hud-accent tabular-nums">
            {String(pct).padStart(3, " ")}%
          </span>
        </div>

        <div className="hud-boot__body">
          <Image
            src="/brand/wordmark.png"
            alt=""
            width={1053}
            height={540}
            sizes="(min-width: 48rem) 220px, 180px"
            priority
            className="h-11 w-auto md:h-14"
          />

          <p className="max-w-[28ch] text-pretty text-center text-sm leading-relaxed text-hud-text-dim">
            {site.tagline}
          </p>

          <div className="hud-boot__track" aria-hidden="true">
            <span className="hud-boot__fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <span className="hud-boot__scan" aria-hidden="true" />
    </div>
  );
}
