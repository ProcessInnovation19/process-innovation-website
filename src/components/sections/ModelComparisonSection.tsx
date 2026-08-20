import { ConnectionField, ConnectionNode } from "@/components/connections/ConnectionField";
import { chainEdges } from "@/components/connections/patterns";
import { Reveal, Section, SectionHeader, SystemLabel } from "@/components/hud";
import { modelComparison } from "@/content/aep";

const ids = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, index) => `${prefix}-${index}`);

/** Ogni flusso è una catena: la linea segue letteralmente la sequenza descritta. */
const EDGES = [
  ...chainEdges(ids("bf", modelComparison.breakFix.steps.length), "structural"),
  ...chainEdges(ids("ap", modelComparison.aep.steps.length), "active"),
];

export function ModelComparisonSection() {
  return (
    <Section id="modello" divider>
      <SectionHeader
        code="SEC.01"
        eyebrow="Modello"
        title={modelComparison.title}
        intro={modelComparison.body}
      />

      <ConnectionField edges={EDGES} className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
        <Reveal variant="slide-left" className="h-full">
          <FlowPanel
            prefix="bf"
            code={modelComparison.breakFix.code}
            label={modelComparison.breakFix.label}
            steps={modelComparison.breakFix.steps}
            note={modelComparison.breakFix.note}
            tone="muted"
          />
        </Reveal>

        <Reveal variant="slide-right" delay={120} className="h-full">
          <FlowPanel
            prefix="ap"
            code={modelComparison.aep.code}
            label={modelComparison.aep.label}
            steps={modelComparison.aep.steps}
            note={modelComparison.aep.note}
            tone="active"
          />
        </Reveal>
      </ConnectionField>
    </Section>
  );
}

function FlowPanel({
  prefix,
  code,
  label,
  steps,
  note,
  tone,
}: {
  prefix: string;
  code: string;
  label: string;
  steps: readonly string[];
  note: string;
  tone: "muted" | "active";
}) {
  return (
    <div className={`hud-panel ${tone === "muted" ? "hud-panel--quiet" : ""} flex h-full flex-col`}>
      <div className="hud-panel__head">
        <SystemLabel tone={tone === "active" ? "active" : "default"} className="tabular-nums">
          {code}
        </SystemLabel>
        <span className="text-sm font-medium text-hud-text-strong">{label}</span>
      </div>

      <ol className="flex flex-1 flex-col gap-0 p-5">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-3.5 py-2.5">
            <ConnectionNode id={`${prefix}-${index}`} tone={tone === "active" ? "active" : "muted"} />
            <SystemLabel className="w-6 tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </SystemLabel>
            <span
              className={
                tone === "active"
                  ? "text-sm font-medium text-hud-text-strong"
                  : "text-sm text-hud-text-dim"
              }
            >
              {step}
            </span>
          </li>
        ))}
      </ol>

      <p className="border-t border-hud-line/60 px-5 py-4 text-xs leading-relaxed text-hud-text-mute">
        {note}
      </p>
    </div>
  );
}
