import { cn } from "@/lib/cn";
import { ConnectionNode } from "@/components/connections/ConnectionField";
import { SystemLabel } from "./SystemLabel";

type BenefitTileProps = {
  code: string;
  title: string;
  description: string;
  /** id anchor per il layer di connessione */
  anchorId: string;
  className?: string;
};

/** Nodo-risultato: continuità, controllo, sicurezza, prevedibilità. */
export function BenefitTile({ code, title, description, anchorId, className }: BenefitTileProps) {
  return (
    <div className={cn("hud-panel hud-panel--quiet flex flex-col gap-3 p-5", className)}>
      <div className="flex items-center gap-2.5">
        <ConnectionNode id={anchorId} />
        <SystemLabel tone="active" className="tabular-nums">
          {code}
        </SystemLabel>
      </div>
      <h3 className="text-base font-semibold tracking-tight text-hud-text-strong">{title}</h3>
      <p className="text-sm leading-relaxed text-hud-text-dim">{description}</p>
    </div>
  );
}
