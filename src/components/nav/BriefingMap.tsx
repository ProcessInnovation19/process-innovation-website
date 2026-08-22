"use client";

import Link from "next/link";
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import { cn } from "@/lib/cn";
import {
  ConnectionField,
  ConnectionNode,
  type ConnectionEdge,
} from "@/components/connections/ConnectionField";
import { CornerMarks, StatusIndicator, SystemLabel, TechImageFrame } from "@/components/hud";
import { MapAmbience } from "@/components/layout/MapAmbience";
import { sections, site } from "@/content/site";

/** Sotto questa larghezza del field il briefing si impila. */
const SIDE_BY_SIDE = 900;

const PANEL_ID = "briefing-dettaglio";

/**
 * Mappa di sistema — è la home.
 *
 * Le voci al centro **selezionano soltanto**: aprono il riquadro visivo a
 * sinistra e il pannello di dettaglio a destra. L'unico comando che apre la
 * sezione è «Scopri di più», che porta alla finestra di sezione.
 */
export function BriefingMap() {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [selected, setSelected] = useState(0);
  const selectedRef = useRef(0);

  const select = useCallback((index: number, moveFocus = true) => {
    selectedRef.current = index;
    setSelected(index);
    if (moveFocus) tabRefs.current[index]?.focus();
  }, []);

  const section = sections[selected]!;

  /** Il cursore del briefing è l'anchor della voce selezionata. */
  const edges = useMemo<ConnectionEdge[]>(() => {
    const cursor = `map-item-${selected}`;
    return [
      { from: cursor, to: "map-visual", route: "horizontal", tone: "active", minFieldWidth: SIDE_BY_SIDE },
      { from: cursor, to: "map-detail", route: "horizontal", tone: "active", minFieldWidth: SIDE_BY_SIDE },
      { from: cursor, to: "map-detail", route: "vertical", tone: "active", maxFieldWidth: SIDE_BY_SIDE },
      { from: "map-detail", to: "map-visual", route: "vertical", tone: "structural", maxFieldWidth: SIDE_BY_SIDE },
    ];
  }, [selected]);

  const onTabKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    const last = sections.length - 1;
    const current = selectedRef.current;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      select(current === last ? 0 : current + 1);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      select(current === 0 ? last : current - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      select(0);
    } else if (event.key === "End") {
      event.preventDefault();
      select(last);
    }
  };

  return (
    <div className="relative">
      <MapAmbience />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-var(--header-h))] w-full max-w-[var(--shell-max)] flex-col gap-8 px-[var(--shell-pad)] pt-[calc(var(--header-h)+2rem)] pb-14">
        {/* ------------------------------------------------- intestazione */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <SystemLabel tone="active" className="tabular-nums">
              NAV.MAP
            </SystemLabel>
            <span aria-hidden="true" className="hud-rule w-10 flex-none" />
            <SystemLabel>Briefing di sistema</SystemLabel>

            <span aria-hidden="true" className="ml-auto hidden items-center gap-4 md:flex">
              <Readout label="Sezioni" value={String(sections.length).padStart(2, "0")} />
              <Readout label="Sel" value={section.code} />
            </span>
          </div>

          <h1 className="max-w-[22ch] text-balance text-3xl leading-[1.05] font-semibold tracking-tight text-hud-text-strong sm:text-4xl xl:text-5xl">
            {site.tagline}
          </h1>
        </div>

        {/* ------------------------------------------------------ briefing */}
        {/*
         * Le voci del menu non devono muoversi al cambio di selezione.
         * Due accorgimenti, per due cause distinte:
         *
         * - `items-start` — con `items-center` l'altezza della riga la
         *   decideva il pannello di dettaglio, che cambia contenuto: la
         *   colonna centrale veniva ricentrata e le voci scorrevano su e giù.
         * - colonna centrale a **larghezza fissa** — con `auto` la sua
         *   larghezza dipendeva dal contenuto delle colonne `fr` accanto, e
         *   cambiava di qualche pixel a ogni selezione.
         *
         * `min-h` riserva l'altezza della riga: i pannelli di dettaglio delle
         * cinque sezioni misurano fra 363 e 431 px, quindi senza riserva la
         * riga cambiava altezza e faceva saltare riga comandi e footer.
         * Se i contenuti si allungano, la riga cresce e basta: va solo
         * rimisurato il valore per tornare a stabilizzarla.
         */}
        <ConnectionField
          edges={edges}
          redrawKey={selected}
          className="grid flex-1 items-start gap-8 lg:min-h-[27.5rem] lg:grid-cols-[minmax(0,0.8fr)_23rem_minmax(0,1.05fr)] lg:gap-10"
        >
          {/*
           * DOM = ordine di lettura mobile: voci, visivo, dettaglio.
           * Su desktop `lg:order-*` rimette il visivo a sinistra.
           */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Sezioni del sito"
            className="relative z-10 flex flex-col gap-2.5 lg:order-2"
          >
            {sections.map((entry, index) => {
              const isSelected = index === selected;

              return (
                <button
                  key={entry.href}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`briefing-tab-${entry.code}`}
                  aria-selected={isSelected}
                  aria-controls={PANEL_ID}
                  tabIndex={isSelected ? 0 : -1}
                  onFocus={() => select(index, false)}
                  onMouseEnter={() => select(index, false)}
                  onClick={() => select(index, false)}
                  onKeyDown={onTabKeyDown}
                  className={cn(
                    "hud-panel hud-panel--tight group flex items-center gap-3.5 px-4 py-3.5 text-left",
                    isSelected ? "hud-panel--active" : "hud-panel--quiet hud-panel--interactive",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-7 w-[3px] flex-none origin-center transition-all duration-[var(--dur-2)]",
                      isSelected
                        ? "scale-y-100 bg-hud-accent"
                        : "scale-y-50 bg-hud-line-strong group-hover:bg-hud-accent-deep",
                    )}
                  />

                  <ConnectionNode
                    id={`map-item-${index}`}
                    tone={isSelected ? "active" : "muted"}
                    size={isSelected ? "md" : "sm"}
                  />

                  <SystemLabel
                    tone={isSelected ? "active" : "default"}
                    className="w-6 flex-none tabular-nums"
                  >
                    {entry.code}
                  </SystemLabel>

                  <span
                    className={cn(
                      "min-w-0 flex-1 text-base leading-tight font-semibold transition-colors duration-[var(--dur-2)] lg:text-lg",
                      isSelected ? "text-hud-text-strong" : "text-hud-text-dim group-hover:text-hud-text-strong",
                    )}
                  >
                    {entry.label}
                  </span>

                  <span
                    aria-hidden="true"
                    className={cn(
                      "font-mono text-sm transition-all duration-[var(--dur-2)]",
                      isSelected
                        ? "translate-x-0 text-hud-accent opacity-100"
                        : "-translate-x-1 opacity-0",
                    )}
                  >
                    ▸
                  </span>
                </button>
              );
            })}
          </div>

          {/* riquadro visivo — dopo le voci su mobile, a sinistra su desktop.
           * L'animazione sta solo sull'immagine: se avvolge tutta la colonna
           * diventa uno stacking context e le linee SVG spariscono sotto.
           * Etichette z-2, SVG z-1, foto z-auto → tratto dietro 01.IMG / label,
           * davanti alla foto. */}
          <div
            key={`visual-${selected}`}
            className="flex flex-col gap-3 lg:order-1"
          >
            <div className="flex items-center gap-2.5">
              <ConnectionNode id="map-visual" className="relative z-[2]" />
              <SystemLabel tone="active" className="relative z-[2] bg-hud-bg px-0.5 tabular-nums">
                {section.code}.IMG
              </SystemLabel>
              <SystemLabel className="relative z-[2] ml-auto bg-hud-bg px-0.5">
                {section.visual.label}
              </SystemLabel>
            </div>

            <TechImageFrame
              code={`IMG.${section.code}`}
              label={section.visual.label}
              caption={section.visual.caption}
              src={section.visual.src}
              ratio="square"
              scanReveal
              className="brief-panel-left"
            >
              <span className="brief-scan" aria-hidden="true" />
            </TechImageFrame>
          </div>

          {/* dettaglio della voce */}
          <div
            key={`detail-${selected}`}
            className="brief-panel-right relative z-[2] flex lg:order-3 lg:h-full"
          >
            <article
              id={PANEL_ID}
              role="tabpanel"
              aria-labelledby={`briefing-tab-${section.code}`}
              className="hud-panel hud-panel--glass flex w-full flex-col"
            >
              <CornerMarks />

              <div className="hud-panel__head">
                <ConnectionNode id="map-detail" />
                <SystemLabel tone="active" className="tabular-nums">
                  {section.code}.DET
                </SystemLabel>
                <span className="ml-auto">
                  <StatusIndicator status="optional" label="pronta" />
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
                <div className="brief-stagger flex flex-col gap-3">
                  <h2 className="text-2xl leading-tight font-semibold tracking-tight text-hud-text-strong">
                    {section.label}
                  </h2>
                  <p className="text-sm leading-relaxed text-hud-text-dim">{section.descriptor}</p>
                </div>

                <ul className="brief-stagger flex flex-col gap-2.5 border-t border-hud-line/60 pt-4">
                  {section.highlights.map((highlight, index) => (
                    <li
                      key={highlight}
                      style={{ "--i": index + 2 } as CSSProperties}
                      className="flex gap-3 text-sm leading-relaxed text-hud-text-dim"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.45rem] h-1 w-1 flex-none bg-hud-accent"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <Link
                  href={section.href}
                  className="group mt-auto inline-flex w-fit items-center gap-2.5 bg-hud-accent px-5 py-3 text-sm font-medium text-hud-on-accent transition-colors duration-[var(--dur-2)] hover:bg-hud-accent-hover [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%-10px))]"
                >
                  Scopri di più
                  <span className="sr-only"> su {section.label}</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-[var(--dur-2)] group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </article>
          </div>
        </ConnectionField>

        <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-hud-text-mute uppercase">
          ↑ ↓ scorri le sezioni · «scopri di più» apre la finestra di dettaglio
        </p>
      </div>
    </div>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="hud-label">{label}</span>
      <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-hud-accent tabular-nums">
        {value}
      </span>
    </span>
  );
}
