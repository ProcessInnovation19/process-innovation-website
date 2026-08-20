import { ConnectionField, ConnectionNode } from "@/components/connections/ConnectionField";
import { chainEdges } from "@/components/connections/patterns";
import { CtaButton, Reveal, Section, SectionHeader, SystemLabel } from "@/components/hud";
import { aepIntro, howItWorks } from "@/content/aep";

/** Sequenza operativa: ogni fase è collegata alla successiva. */
const EDGES = chainEdges(howItWorks.map((phase) => `phase-${phase.id}`));

export function HowItWorksSection({ withCta = true }: { withCta?: boolean }) {
  return (
    <Section id="come-funziona" divider>
      <SectionHeader
        code="SEC.03"
        eyebrow="Come funziona"
        title={aepIntro.title}
        intro={aepIntro.body}
      />

      <ConnectionField edges={EDGES} className="mt-12 grid gap-4 lg:grid-cols-5">
        {howItWorks.map((phase, index) => (
          <Reveal key={phase.id} variant="boot" delay={index * 100} className="h-full">
            <article className="hud-panel hud-panel--quiet flex h-full flex-col gap-3 p-5">
              <div className="flex items-center gap-2.5">
                <ConnectionNode id={`phase-${phase.id}`} />
                <SystemLabel tone="active" className="tabular-nums">
                  {phase.code}
                </SystemLabel>
              </div>
              <h3 className="text-base font-semibold tracking-tight text-hud-text-strong">{phase.title}</h3>
              <p className="text-sm leading-relaxed text-hud-text-dim">{phase.description}</p>
            </article>
          </Reveal>
        ))}
      </ConnectionField>

      {withCta ? (
        <Reveal delay={200} className="mt-10">
          <CtaButton href="/assistenza-e-prevenzione" variant="ghost">
            Come lavora Assistenza &amp; Prevenzione
          </CtaButton>
        </Reveal>
      ) : null}
    </Section>
  );
}
