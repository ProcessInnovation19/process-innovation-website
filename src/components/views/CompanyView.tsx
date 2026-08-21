import { PageHero } from "@/components/layout/PageHero";
import { Reveal, Section, SectionHeader, SystemLabel, TechImageFrame } from "@/components/hud";
import { CompanySection } from "@/components/sections/CompanySection";
import { ContactCtaSection } from "@/components/sections/ContactCtaSection";
import { scopeNote } from "@/content/capabilities";
import { company, perceivedOutcomes } from "@/content/company";

/** Contenuto della sezione «Process & Innovation». */
export function CompanyView({ inWindow = false }: { inWindow?: boolean }) {
  return (
    <>
      <PageHero
        code="04"
        eyebrow="Process & Innovation"
        title={company.title}
        intro={company.body}
        dense={inWindow}
        aside={
          <TechImageFrame
            code="IMG.05"
            label="Postazioni"
            caption="Postazioni di lavoro moderne in un ambiente standardizzato."
            src="/visuals/page-postazioni.jpg"
            ratio="wide"
          />
        }
      />

      <Section space="tight" divider>
        <SectionHeader
          code="SEC.00"
          eyebrow="Identità"
          title="Referente unico della gestione tecnologica quotidiana."
          intro={company.identity}
        />

        <Reveal delay={120} className="mt-10">
          <div className="hud-panel hud-panel--quiet">
            <div className="hud-panel__head">
              <SystemLabel tone="active">OUT.01</SystemLabel>
              <SystemLabel>Come dovrebbe sentirsi il cliente</SystemLabel>
            </div>
            <ul className="grid gap-3 p-5 md:grid-cols-2 md:p-6">
              {perceivedOutcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3 text-sm leading-relaxed text-hud-text-dim">
                  <span
                    aria-hidden="true"
                    className="mt-[0.45rem] h-1 w-1 flex-none bg-hud-accent"
                  />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-8 max-w-3xl border-l border-hud-line-strong/70 pl-4 text-sm leading-relaxed text-hud-text-mute">
            {scopeNote}
          </p>
        </Reveal>
      </Section>

      <CompanySection />
      <ContactCtaSection />
    </>
  );
}
