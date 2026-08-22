"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type AnimationEvent,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";
import { SystemLabel } from "./SystemLabel";

type TechImageFrameProps = {
  /** etichetta tecnica del riquadro */
  label: string;
  /** cosa dovrà contenere l'asset definitivo */
  caption: string;
  /** identificatore di sistema */
  code?: string;
  /** percorso dell'immagine definitiva; se assente resta il placeholder */
  src?: string;
  alt?: string;
  className?: string;
  ratio?: "wide" | "square" | "tall";
  /**
   * Svela l'immagine dall'alto verso il basso insieme al fascio di scansione.
   * Parte a bitmap pronta, con un timeout di sicurezza: senza di esso il
   * clip resterebbe chiuso se `onLoad` non arriva.
   */
  scanReveal?: boolean;
  /** overlay decorativi ritagliati dal riquadro (es. linea di scansione) */
  children?: ReactNode;
};

const RATIO: Record<NonNullable<TechImageFrameProps["ratio"]>, string> = {
  wide: "aspect-[16/9]",
  square: "aspect-square",
  tall: "aspect-[4/5]",
};

type RevealState = {
  src?: string;
  phase: "idle" | "running" | "revealed";
};

/**
 * Riquadro tecnico per immagini di infrastruttura.
 *
 * Finché `src` non è valorizzato mostra un placeholder HUD chiaramente
 * identificabile: l'asset definitivo si sostituisce passando `src`, senza
 * toccare il layout (docs/07 — Fase 6).
 *
 * `next/image` serve una variante ridimensionata (WebP/AVIF su Vercel): i PNG
 * sorgente pesano ~2 MB e su mobile saturano decode + compositing.
 */
export function TechImageFrame({
  label,
  caption,
  code,
  src,
  alt,
  className,
  ratio = "wide",
  scanReveal = false,
  children,
}: TechImageFrameProps) {
  const clipRef = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState<RevealState>({ src, phase: "idle" });
  const phase = reveal.src === src ? reveal.phase : "idle";
  const run = phase === "running";
  const revealed = phase === "revealed";

  useEffect(() => {
    if (!scanReveal || !src) return;

    const img = clipRef.current?.querySelector("img");
    let cancelled = false;
    let settled = false;
    let frame: number | null = null;
    let fallback: number | null = null;

    const go = () => {
      if (cancelled) return;
      setReveal((current) =>
        current.src === src && current.phase === "revealed"
          ? current
          : { src, phase: "running" },
      );
    };

    /*
     * `load` indica che i byte sono arrivati; `decode()` aspetta anche la bitmap.
     * In questo modo decode e clip-path non competono durante i 440 ms del reveal.
     */
    const startDecoded = () => {
      if (!img || settled || cancelled) return;
      const decoded =
        typeof img.decode === "function" ? img.decode().catch(() => undefined) : Promise.resolve();

      void decoded.then(() => {
        if (settled || cancelled) return;
        settled = true;
        frame = window.requestAnimationFrame(go);
      });
    };

    const revealWithoutScan = () => {
      if (settled || cancelled) return;
      settled = true;
      setReveal({ src, phase: "revealed" });
    };

    if (!img) {
      revealWithoutScan();
    } else if (img.complete) {
      if (img.naturalWidth > 0) startDecoded();
      else revealWithoutScan();
    } else {
      img.addEventListener("load", startDecoded, { once: true });
      img.addEventListener("error", revealWithoutScan, { once: true });

      /* Safety net: un errore/callback perso non deve lasciare il clip chiuso. */
      fallback = window.setTimeout(() => {
        if (img.complete && img.naturalWidth > 0) startDecoded();
        else revealWithoutScan();
      }, 2000);
    }

    return () => {
      cancelled = true;
      if (frame != null) window.cancelAnimationFrame(frame);
      if (fallback != null) window.clearTimeout(fallback);
      img?.removeEventListener("load", startDecoded);
      img?.removeEventListener("error", revealWithoutScan);
    };
  }, [scanReveal, src]);

  const finishReveal = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.animationName !== "brief-image-reveal") return;
    setReveal({ src, phase: "revealed" });
  };

  return (
    <figure
      className={cn(
        "hud-panel hud-panel--quiet relative overflow-hidden",
        RATIO[ratio],
        src && "tech-image-frame",
        scanReveal && "brief-visual",
        scanReveal && run && "brief-visual--run",
        scanReveal && revealed && "brief-visual--revealed",
        className,
      )}
      data-asset-placeholder={src ? undefined : "true"}
    >
      {src ? (
        <div
          ref={scanReveal ? clipRef : undefined}
          className={cn(
            "tech-image-frame__media",
            scanReveal && "brief-visual-clip",
            scanReveal && run && "brief-visual-clip--run",
            scanReveal && revealed && "brief-visual-clip--revealed",
          )}
          onAnimationEnd={scanReveal ? finishReveal : undefined}
        >
          <Image
            src={src}
            alt={alt ?? caption}
            fill
            sizes="(max-width: 48rem) 92vw, (max-width: 64rem) 70vw, 28rem"
            className="object-cover opacity-90"
            loading={scanReveal ? "eager" : "lazy"}
            decoding="async"
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-px bg-[repeating-linear-gradient(135deg,color-mix(in_srgb,var(--color-hud-accent-deep)_18%,transparent)_0_2px,transparent_2px_12px)]"
        />
      )}

      {children}

      <figcaption className="absolute inset-0 z-10 flex flex-col justify-between p-4">
        <div className="flex items-center gap-2">
          {code ? <SystemLabel tone="active">{code}</SystemLabel> : null}
          <SystemLabel>{label}</SystemLabel>
        </div>

        {/* Testo guida solo senza asset: con l'immagine resta solo il chrome HUD. */}
        {!src ? (
          <div className="max-w-[36ch] bg-hud-bg/75 p-2 text-xs leading-relaxed text-hud-text-dim backdrop-blur-sm">
            Placeholder asset — {caption}
          </div>
        ) : null}
      </figcaption>
    </figure>
  );
}
