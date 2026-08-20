"use client";

import { useId, useState } from "react";

import { cn } from "@/lib/cn";
import { useConnectionAnchor } from "@/components/connections/ConnectionField";
import { SystemLabel } from "./SystemLabel";
import { StatusIndicator } from "./StatusIndicator";

type ExpandableModuleProps = {
  code: string;
  title: string;
  summary: string;
  details: string[];
  /** nota di ambito/limite, resa come microtesto */
  note?: string;
  status?: "managed" | "monitored" | "evolving" | "optional";
  /** id anchor per il layer di connessione */
  anchorId?: string;
  className?: string;
};

/**
 * Modulo espandibile: motion "expand" — dal sintetico al dettagliato.
 * Interazione da tastiera nativa (button + aria-expanded), niente hover-only.
 */
export function ExpandableModule({
  code,
  title,
  summary,
  details,
  note,
  status,
  anchorId,
  className,
}: ExpandableModuleProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const anchorRef = useConnectionAnchor(anchorId ?? `module-${code}`);

  return (
    <div className={cn("hud-panel hud-panel--interactive flex flex-col", className)}>
      <div className="hud-panel__head">
        <span ref={anchorRef} className="hud-node" aria-hidden="true" />
        <SystemLabel tone="active" className="tabular-nums">
          {code}
        </SystemLabel>
        {status ? (
          <span className="ml-auto">
            <StatusIndicator status={status} />
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold tracking-tight text-hud-text-strong">{title}</h3>
        <p className="text-sm leading-relaxed text-hud-text-dim">{summary}</p>

        <div
          id={panelId}
          hidden={!open}
          className="border-t border-hud-line-strong/45 pt-3"
        >
          <ul className="flex flex-col gap-2">
            {details.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-hud-text-dim">
                <span
                  aria-hidden="true"
                  className="mt-[0.45rem] h-1 w-1 flex-none bg-hud-accent"
                />
                {item}
              </li>
            ))}
          </ul>

          {note ? (
            <p className="mt-3 border-l border-hud-line-strong/60 pl-3 text-xs leading-relaxed text-hud-text-mute">
              {note}
            </p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 pt-2 font-mono text-[0.6875rem] tracking-[0.16em] text-hud-accent uppercase transition-colors duration-[var(--dur-2)] hover:text-hud-text-strong"
        >
          <span
            aria-hidden="true"
            className={cn(
              "inline-block transition-transform duration-[var(--dur-2)]",
              open && "rotate-45",
            )}
          >
            +
          </span>
          {open ? "Riduci" : "Dettaglio"}
          <span className="sr-only"> — {title}</span>
        </button>
      </div>
    </div>
  );
}
