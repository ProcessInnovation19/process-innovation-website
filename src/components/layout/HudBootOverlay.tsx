"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { site } from "@/content/site";

type BootPhase = "loading" | "exit" | "done";

const MIN_VISIBLE_MS = 700;
const EXIT_MS = 280;

/**
 * Velo di avvio, stesso linguaggio del sinottico Cloud Workspace:
 * onde concentriche, riga di scansione e etichetta. Resta finché la pagina
 * non è pronta, poi svanisce.
 */
export function HudBootOverlay() {
  const [phase, setPhase] = useState<BootPhase>("loading");
  const startedRef = useRef(0);

  useEffect(() => {
    startedRef.current = performance.now();
    const root = document.documentElement;
    root.classList.add("is-booting");

    let cancelled = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pageReady =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            window.addEventListener("load", () => resolve(), { once: true });
          });

    const finish = async () => {
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
      root.classList.remove("is-booting");
    };
  }, []);

  useEffect(() => {
    if (phase !== "done") return;
    document.documentElement.classList.remove("is-booting");
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={cn("hud-boot", phase === "exit" && "hud-boot--exit")}
      role="status"
      aria-live="polite"
      aria-busy={phase === "loading"}
      aria-label="Caricamento interfaccia di sistema"
    >
      <div className="hud-boot__field" aria-hidden="true">
        <span className="hud-boot__ring" />
        <span className="hud-boot__ring hud-boot__ring--delayed" />
        <span className="hud-boot__scan" />
      </div>

      <div className="hud-boot__caption">
        <p className="hud-boot__kicker">Avvio sistema</p>
        <p className="hud-boot__title">{site.name}</p>
      </div>
    </div>
  );
}
