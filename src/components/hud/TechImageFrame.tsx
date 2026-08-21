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

    let cancelled = false;

    const go = () => {
      if (cancelled) return;
      setReveal((current) =>
        current.src === src && current.phase === "revealed"
          ? current
          : { src, phase: "running" },
      );
    };

    const img = clipRef.current?.querySelector("img");
    if (img?.complete && img.naturalWidth > 0) {
      const frame = window.requestAnimationFrame(go);
      return () => {
        cancelled = true;
        window.cancelAnimationFrame(frame);
      };
    }

    /*
     * Copre il raro caso in cui il callback di Next/Image non arrivi, senza
     * far correre il fascio davanti a una variante ottimizzata ancora in decode.
     */
    const fallback = window.setTimeout(go, 1200);
    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
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
            scanReveal
              ? cn(
                  "brief-visual-clip",
                  run && "brief-visual-clip--run",
                  revealed && "brief-visual-clip--revealed",
                )
              : "absolute inset-[var(--hud-border)]",
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
            onLoad={
              scanReveal && !revealed
                ? () =>
                    setReveal((current) =>
                      current.src === src && current.phase === "revealed"
                        ? current
                        : { src, phase: "running" },
                    )
                : undefined
            }
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

        <div className="max-w-[36ch] bg-hud-bg/75 p-2 text-xs leading-relaxed text-hud-text-dim backdrop-blur-sm">
          {src ? caption : <>Placeholder asset — {caption}</>}
        </div>
      </figcaption>
    </figure>
  );
}
