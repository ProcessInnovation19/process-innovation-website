import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { CornerMarks } from "./CornerMarks";
import { SystemLabel } from "./SystemLabel";

type HudPanelProps = {
  children: ReactNode;
  /** etichetta tecnica nell'header del pannello */
  label?: string;
  /** identificatore di sistema (es. "MOD.03") */
  code?: string;
  /** contenuto extra a destra nell'header */
  headerAside?: ReactNode;
  tone?: "default" | "quiet" | "active";
  /** reagisce a hover/focus: usare solo dove il pannello è realmente interattivo */
  interactive?: boolean;
  /** marker tecnici agli angoli */
  brackets?: boolean;
  className?: string;
  bodyClassName?: string;
};

/**
 * Pannello HUD: rettangolo con due angoli tagliati, bordo sottile,
 * header a modulo di interfaccia (docs/06 — "Geometria").
 */
export function HudPanel({
  children,
  label,
  code,
  headerAside,
  tone = "default",
  interactive = false,
  brackets = false,
  className,
  bodyClassName,
}: HudPanelProps) {
  const hasHeader = Boolean(label || code || headerAside);

  return (
    <div
      className={cn(
        "hud-panel",
        tone === "quiet" && "hud-panel--quiet",
        tone === "active" && "hud-panel--active",
        interactive && "hud-panel--interactive",
        className,
      )}
    >
      {brackets ? <CornerMarks /> : null}

      {hasHeader ? (
        <div className="hud-panel__head">
          {code ? (
            <span className="hud-label text-hud-accent/90 tabular-nums">{code}</span>
          ) : null}
          {label ? <SystemLabel>{label}</SystemLabel> : null}
          {headerAside ? <div className="ml-auto flex items-center gap-2">{headerAside}</div> : null}
        </div>
      ) : null}

      <div className={cn("p-5 md:p-6", bodyClassName)}>{children}</div>
    </div>
  );
}
