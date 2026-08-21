import { ConnectionField, ConnectionNode } from "@/components/connections/ConnectionField";
import { hubEdges } from "@/components/connections/patterns";
import { Reveal, Section, SectionHeader, SystemLabel, TechImageFrame } from "@/components/hud";
import { connectivity } from "@/content/partners";

/** L'infrastruttura progettata raggiunge voce e connettività. */
const EDGES = hubEdges(
  "net-source",
  connectivity.groups.map((group) => `net-${group.id}`),
);

export function ConnectivitySection() {
  return (
    <Section id="comunicazioni" divider>
      <SectionHeader
        code="SEC.09"
        eyebrow="Comunicazioni & connettività"
        title={connectivity.title}
        intro={connectivity.intro}
      />

      <ConnectionField edges={EDGES} className="mt-12 flex flex-col gap-10">
        <Reveal className="flex items-center gap-3">
          <ConnectionNode id="net-source" />
          <SystemLabel tone="active">Rete progettata e gestita</SystemLabel>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {connectivity.groups.map((group, index) => (
            <Reveal key={group.id} delay={index * 110} className="h-full">
              <article className="hud-panel flex h-full flex-col">
                <div className="hud-panel__head">
                  <ConnectionNode id={`net-${group.id}`} />
                  <SystemLabel tone="active" className="tabular-nums">
                    {group.code}
                  </SystemLabel>
                  <span className="text-sm font-medium text-hud-text-strong">{group.title}</span>
                </div>

                <ul className="flex flex-1 flex-col gap-2.5 p-5 md:p-6">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-hud-text-dim">
                      <span
                        aria-hidden="true"
                        className="mt-[0.45rem] h-1 w-1 flex-none bg-hud-accent"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </ConnectionField>

      <Reveal delay={150} className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-4">
          <p className="text-base leading-relaxed text-hud-text">{connectivity.positioning}</p>
          <p className="border-l border-hud-line-strong/70 pl-4 text-sm leading-relaxed text-hud-text-mute">
            {connectivity.message} {connectivity.note}
          </p>
        </div>

        <TechImageFrame
          code="IMG.03"
          label="Connettività"
          caption="Apparati di rete, access point e linea di backup in sede."
          src="/visuals/page-connettivita.jpg"
          ratio="wide"
        />
      </Reveal>
    </Section>
  );
}
