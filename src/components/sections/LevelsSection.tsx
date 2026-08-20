import { ConnectionField, ConnectionNode } from "@/components/connections/ConnectionField";
import { chainEdges } from "@/components/connections/patterns";
import { Reveal, Section, SectionHeader, SystemLabel } from "@/components/hud";
import { levelsNote, networkLevels } from "@/content/aep";

/** Progressione: ogni livello estende il precedente. */
const EDGES = chainEdges(networkLevels.map((level) => `level-${level.id}`));

const MAX_DEPTH = networkLevels[networkLevels.length - 1]!.depth;

export function LevelsSection() {
  return (
    <Section id="livelli" divider>
      <SectionHeader
        code="SEC.04"
        eyebrow="Livelli di gestione rete"
        title="Quattro livelli, una sola logica: quanta profondità di controllo serve."
        intro="La progressione va da una gestione essenziale per ambienti semplici fino a una gestione più avanzata con maggiore segmentazione, sicurezza, monitoraggio, backup e ridondanza."
      />

      <ConnectionField edges={EDGES} className="mt-12 grid gap-4 lg:grid-cols-4">
        {networkLevels.map((level, index) => (
          <Reveal key={level.id} delay={index * 100} className="h-full">
            <article className="hud-panel flex h-full flex-col">
              <div className="hud-panel__head">
                <ConnectionNode id={`level-${level.id}`} />
                <SystemLabel tone="active" className="tabular-nums">
                  {level.code}
                </SystemLabel>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="text-lg font-semibold tracking-tight text-hud-text-strong">{level.name}</h3>
                <p className="text-sm leading-relaxed text-hud-text-dim">{level.description}</p>

                <div className="mt-auto flex flex-col gap-2 pt-3">
                  <SystemLabel>Profondità di controllo</SystemLabel>
                  <div
                    className="flex gap-1"
                    role="img"
                    aria-label={`Profondità di controllo: livello ${level.depth} di ${MAX_DEPTH}`}
                  >
                    {Array.from({ length: MAX_DEPTH }).map((_, step) => (
                      <span
                        key={step}
                        className={
                          step < level.depth
                            ? "h-1.5 flex-1 bg-hud-accent"
                            : "h-1.5 flex-1 bg-hud-line"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </ConnectionField>

      <Reveal delay={150}>
        <p className="mt-8 max-w-3xl border-l border-hud-line-strong/70 pl-4 text-sm leading-relaxed text-hud-text-mute">
          {levelsNote}
        </p>
      </Reveal>
    </Section>
  );
}
