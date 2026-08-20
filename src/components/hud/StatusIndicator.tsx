import { cn } from "@/lib/cn";

type Status = "managed" | "monitored" | "evolving" | "optional";

const STATUS_COPY: Record<Status, string> = {
  managed: "gestito",
  monitored: "monitorato",
  evolving: "in evoluzione",
  optional: "in funzione del piano",
};

const STATUS_TONE: Record<Status, string> = {
  managed: "text-hud-accent border-hud-accent/45 bg-hud-accent/10",
  monitored: "text-hud-accent border-hud-accent/45 bg-hud-accent/10",
  evolving: "text-hud-text-dim border-hud-line-strong/70 bg-hud-accent-deep/15",
  optional: "text-hud-text-mute border-hud-line/90 bg-hud-line/25",
};

const DOT_TONE: Record<Status, string> = {
  managed: "bg-hud-accent",
  monitored: "bg-hud-accent",
  evolving: "bg-hud-text-dim",
  optional: "bg-hud-text-mute",
};

/**
 * Indicatore di stato: cambia stato ma non lampeggia in continuazione
 * (docs/06 — motion "status").
 */
export function StatusIndicator({
  status,
  label,
  className,
}: {
  status: Status;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border px-2 py-1 font-mono text-[0.625rem] leading-none tracking-[0.14em] uppercase",
        STATUS_TONE[status],
        className,
      )}
    >
      <span className={cn("hud-status-dot h-1.5 w-1.5 flex-none", DOT_TONE[status])} />
      {label ?? STATUS_COPY[status]}
    </span>
  );
}
