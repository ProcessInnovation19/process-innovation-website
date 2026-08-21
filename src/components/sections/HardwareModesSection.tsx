import { ConnectionField, ConnectionNode } from "@/components/connections/ConnectionField";
import { hubEdges } from "@/components/connections/patterns";
import { Reveal, Section, SectionHeader, SystemLabel, TechImageFrame } from "@/components/hud";
import { hardwareModes } from "@/content/aep";

/** Il piano A&P si dirama nelle due modalità hardware. */
const EDGES = hubEdges(
  "hw-source",
  hardwareModes.modes.map((mode) => `hw-${mode.id}`),
);

export function HardwareModesSection() {
  return (
    <Section id="hardware" divider>
      <SectionHeader
        code="SEC.05"
        eyebrow="Due modi di avere l'infrastruttura"
        title={hardwareModes.title}
        intro="A&P funziona sia sull'hardware che hai già, sia su un'infrastruttura fornita e gestita da noi nell'ambito del servizio."
      />

      <ConnectionField edges={EDGES} className="mt-12 flex flex-col gap-10">
        <Reveal className="flex items-center gap-3">
          <ConnectionNode id="hw-source" />
          <SystemLabel tone="active">Piano A&amp;P</SystemLabel>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {hardwareModes.modes.map((mode, index) => (
            <Reveal
              key={mode.id}
              variant={index === 0 ? "slide-left" : "slide-right"}
              delay={index * 120}
              className="h-full"
            >
              <article
                className={`hud-panel flex h-full flex-col ${index === 1 ? "" : "hud-panel--quiet"}`}
              >
                <div className="hud-panel__head">
                  <ConnectionNode id={`hw-${mode.id}`} tone={index === 1 ? "active" : "muted"} />
                  <SystemLabel tone="active" className="tabular-nums">
                    {mode.code}
                  </SystemLabel>
                  <span className="text-sm font-medium text-hud-text-strong">{mode.name}</span>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
                  <p className="text-sm leading-relaxed text-hud-text-dim">{mode.lead}</p>

                  <ul className="flex flex-col gap-2.5">
                    {mode.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-hud-text-dim">
                        <span
                          aria-hidden="true"
                          className="mt-[0.45rem] h-1 w-1 flex-none bg-hud-accent"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </ConnectionField>

      <Reveal delay={150} className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <p className="border-l border-hud-line-strong/70 pl-4 text-sm leading-relaxed text-hud-text-mute">
          {hardwareModes.note}
        </p>

        <TechImageFrame
          code="IMG.01"
          label="Infrastruttura"
          caption="Rack, cablaggio ordinato e apparati di rete gestiti."
          src="/visuals/page-aep-infrastruttura.jpg"
          ratio="wide"
        />
      </Reveal>
    </Section>
  );
}
