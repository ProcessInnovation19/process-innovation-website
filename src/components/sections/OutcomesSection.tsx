import { ConnectionField, ConnectionNode } from "@/components/connections/ConnectionField";
import { hubEdges } from "@/components/connections/patterns";
import { BenefitTile, Reveal, Section, SectionHeader, SystemLabel } from "@/components/hud";
import { outcomes } from "@/content/aep";

/** La gestione continuativa è il nodo sorgente; i quattro risultati i terminali. */
const EDGES = hubEdges(
  "outcome-source",
  outcomes.map((outcome) => `outcome-${outcome.id}`),
);

export function OutcomesSection() {
  return (
    <Section id="risultati" divider>
      <SectionHeader
        code="SEC.02"
        eyebrow="Risultati"
        title="Quattro risultati che dipendono dalla gestione, non dalle emergenze."
        intro="Continuità, controllo, sicurezza e prevedibilità non sono promesse separate: sono l'effetto di un ambiente conosciuto, documentato e mantenuto nel tempo."
      />

      <ConnectionField edges={EDGES} className="mt-12 flex flex-col gap-10">
        <Reveal className="flex items-center gap-3">
          <ConnectionNode id="outcome-source" />
          <SystemLabel tone="active">Gestione continuativa A&amp;P</SystemLabel>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {outcomes.map((outcome, index) => (
            <Reveal key={outcome.id} delay={index * 90} className="h-full">
              <BenefitTile
                code={outcome.code}
                title={outcome.title}
                description={outcome.description}
                anchorId={`outcome-${outcome.id}`}
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      </ConnectionField>
    </Section>
  );
}
