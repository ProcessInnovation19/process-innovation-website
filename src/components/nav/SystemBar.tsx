"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { SystemLabel } from "@/components/hud";
import { mapNode, site } from "@/content/site";

type SystemBarProps = {
  /** codice della sezione attiva, es. "02" */
  activeCode: string;
  /** etichetta della sezione attiva */
  activeLabel: string;
  scrolled: boolean;
  /** true quando siamo già sulla mappa */
  onMap: boolean;
};

/**
 * Barra di sistema.
 *
 * Non è un menu: mostra marchio, posizione corrente e il ritorno alla mappa.
 * La navigazione vera vive nel rail laterale e nella mappa.
 */
export function SystemBar({ activeCode, activeLabel, scrolled, onMap }: SystemBarProps) {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--dur-2)]",
        scrolled
          ? "border-b border-hud-line/80 bg-hud-bg/88 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-[var(--header-h)] w-full max-w-[var(--shell-max)] items-center gap-4 px-[var(--shell-pad)]">
        <Link href="/" className="flex items-center" aria-label={`${site.name} — mappa di sistema`}>
          <Image
            src="/brand/wordmark.png"
            alt={site.name}
            width={1053}
            height={540}
            priority
            className="h-10 w-auto md:h-12"
          />
        </Link>

        {/* posizione corrente nel sistema — lettura, non navigazione */}
        <div className="ml-5 hidden items-center gap-3 md:flex" aria-hidden="true">
          <span className="hud-rule w-8 flex-none" />
          <SystemLabel tone="active" className="tabular-nums">
            {activeCode}
          </SystemLabel>
          <span className="hud-label text-hud-text-dim normal-case tracking-normal">
            {activeLabel}
          </span>
        </div>

        {onMap ? (
          <span
            className="ml-auto inline-flex items-center gap-2.5 border border-hud-accent/50 bg-hud-accent/10 px-3 py-2 font-mono text-[0.6875rem] tracking-[0.16em] text-hud-accent uppercase"
            aria-current="page"
          >
            <MapGlyph />
            Mappa
          </span>
        ) : (
          <Link
            href={mapNode.href}
            className="ml-auto inline-flex items-center gap-2.5 border border-hud-line-strong/80 px-3 py-2 font-mono text-[0.6875rem] tracking-[0.16em] text-hud-text uppercase transition-colors duration-[var(--dur-2)] hover:border-hud-accent hover:text-hud-text-strong"
          >
            <MapGlyph />
            Mappa
            <kbd className="ml-1 hidden border border-hud-line/90 px-1.5 py-0.5 text-[0.625rem] text-hud-text-mute md:inline">
              M
            </kbd>
          </Link>
        )}
      </div>
    </header>
  );
}

/** Glifo schematico: quattro nodi collegati. */
function MapGlyph() {
  return (
    <span aria-hidden="true" className="relative block h-3.5 w-3.5">
      <span className="absolute top-0 left-0 h-1 w-1 bg-current" />
      <span className="absolute top-0 right-0 h-1 w-1 bg-current" />
      <span className="absolute bottom-0 left-0 h-1 w-1 bg-current" />
      <span className="absolute right-0 bottom-0 h-1 w-1 bg-current" />
      <span className="absolute top-[1px] left-[1.5px] h-px w-[11px] bg-current opacity-70" />
      <span className="absolute bottom-[1px] left-[1.5px] h-px w-[11px] bg-current opacity-70" />
      <span className="absolute top-[1.5px] left-[1px] h-[11px] w-px bg-current opacity-70" />
      <span className="absolute top-[1.5px] right-[1px] h-[11px] w-px bg-current opacity-70" />
    </span>
  );
}
