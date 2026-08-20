import { ConnectionField, ConnectionNode } from "@/components/connections/ConnectionField";
import { hubEdges } from "@/components/connections/patterns";
import {
  Reveal,
  Section,
  SectionHeader,
  StatusIndicator,
  SystemLabel,
  TechImageFrame,
} from "@/components/hud";
import { aiSupervision } from "@/content/partners";

/** I segnali tecnici raccolti alimentano le due aree di supervisione. */
const EDGES = hubEdges(
  "ai-source",
  aiSupervision.areas.map((area) => area.id),
);

export function AiSupervisionSection() {
  return (
    <Section id="ai-supervision" divider>
      <SectionHeader
        code="SEC.07"
        eyebrow="AI supervision"
        title={aiSupervision.title}
        intro={aiSupervision.intro}
      />

      <ConnectionField edges={EDGES} className="mt-12 flex flex-col gap-10">
        <Reveal className="flex items-center gap-3">
          <ConnectionNode id="ai-source" />
          <SystemLabel tone="active">Segnali tecnici dell&apos;infrastruttura gestita</SystemLabel>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)]">
          {aiSupervision.areas.map((area, index) => (
            <Reveal key={area.id} delay={index * 110} className="h-full">
              <article className="hud-panel flex h-full flex-col">
                <div className="hud-panel__head">
                  <ConnectionNode id={area.id} />
                  <SystemLabel tone="active" className="tabular-nums">
                    {area.code}
                  </SystemLabel>
                  <span className="ml-auto">
                    <StatusIndicator status={area.status} />
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-hud-text-strong">{area.title}</h3>
                  <p className="text-sm leading-relaxed text-hud-text-dim">{area.body}</p>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal delay={220} className="h-full">
            <TechImageFrame
              code="IMG.02"
              label="Segnali"
              caption="Visual astratto di flussi dati, eventi e nodi di rete."
              ratio="tall"
              className="h-full"
            />
          </Reveal>
        </div>
      </ConnectionField>

      <Reveal delay={150}>
        <p className="mt-8 max-w-3xl border-l border-hud-line-strong/70 pl-4 text-sm leading-relaxed text-hud-text-mute">
          {aiSupervision.note}
        </p>
      </Reveal>
    </Section>
  );
}
