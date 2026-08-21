"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

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
   * Parte solo a bitmap pronta, altrimenti il clip gira a vuoto e poi l'asset
   * (già in cache) compare tutto insieme.
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
  const [run, setRun] = useState(false);

  const start = useCallback(() => {
    setRun(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setRun(true));
    });
  }, []);

  useEffect(() => {
    if (!scanReveal || !src) return;
    setRun(false);
    const img = clipRef.current?.querySelector("img");
    if (img?.complete && img.naturalWidth > 0) start();
  }, [scanReveal, src, start]);

  return (
    <figure
      className={cn(
        "hud-panel hud-panel--quiet relative overflow-hidden",
        RATIO[ratio],
        scanReveal && "brief-visual",
        scanReveal && run && "brief-visual--run",
        className,
      )}
      data-asset-placeholder={src ? undefined : "true"}
    >
      {src ? (
        scanReveal ? (
          <div ref={clipRef} className={cn("brief-visual-clip", run && "brief-visual-clip--run")}>
            <Image
              src={src}
              alt={alt ?? caption}
              fill
              sizes="(max-width: 48rem) 92vw, (max-width: 64rem) 70vw, 28rem"
              className="object-cover opacity-90"
              onLoad={start}
            />
          </div>
        ) : (
          <Image
            src={src}
            alt={alt ?? caption}
            fill
            sizes="(max-width: 48rem) 92vw, (max-width: 64rem) 70vw, 28rem"
            className="object-cover opacity-90"
          />
        )
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-px bg-[repeating-linear-gradient(135deg,color-mix(in_srgb,var(--color-hud-accent-deep)_18%,transparent)_0_2px,transparent_2px_12px)]"
        />
      )}

      {children}

      <figcaption className="absolute inset-0 flex flex-col justify-between p-4">
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
