import { PageHero } from "@/components/layout/PageHero";
import { StatusIndicator, SystemLabel } from "@/components/hud";
import { ContactCtaSection } from "@/components/sections/ContactCtaSection";
import { HardwareModesSection } from "@/components/sections/HardwareModesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { LevelsSection } from "@/components/sections/LevelsSection";
import { ModelComparisonSection } from "@/components/sections/ModelComparisonSection";
import { OutcomesSection } from "@/components/sections/OutcomesSection";
import { aepIntro } from "@/content/aep";

const PILLARS = [
  "Analisi iniziale dell'ambiente.",
  "Piano costruito sulle esigenze reali.",
  "Monitoraggio e manutenzione nel tempo.",
  "Standardizzazione degli strumenti.",
  "Intervento rapido quando serve.",
  "Un unico interlocutore.",
];

/**
 * Contenuto della sezione Assistenza & Prevenzione.
 * Reso identico in pagina intera e dentro la finestra di sezione.
 */
export function AepView({ inWindow = false }: { inWindow?: boolean }) {
  return (
    <>
      <PageHero
        code="01"
        eyebrow="Assistenza & Prevenzione"
        title={aepIntro.title}
        intro={aepIntro.body}
        dense={inWindow}
        aside={
          <div className="hud-panel hud-panel--quiet">
            <div className="hud-panel__head">
              <SystemLabel tone="active">A&amp;P.CORE</SystemLabel>
              <span className="ml-auto">
                <StatusIndicator status="managed" label="gestione continuativa" />
              </span>
            </div>
            <ul className="flex flex-col gap-2.5 p-5">
              {PILLARS.map((pillar) => (
                <li key={pillar} className="flex gap-3 text-sm leading-relaxed text-hud-text-dim">
                  <span
                    aria-hidden="true"
                    className="mt-[0.45rem] h-1 w-1 flex-none bg-hud-accent"
                  />
                  {pillar}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <ModelComparisonSection />
      <HowItWorksSection withCta={false} />
      <LevelsSection />
      <OutcomesSection />
      <HardwareModesSection />
      <ContactCtaSection />
    </>
  );
}
