import { ConnectionField, ConnectionNode } from "@/components/connections/ConnectionField";
import { hubEdges } from "@/components/connections/patterns";
import {
  CtaButton,
  ExpandableModule,
  Reveal,
  Section,
  SectionHeader,
  SystemLabel,
} from "@/components/hud";
import { capabilityModules, scopeNote } from "@/content/capabilities";

/**
 * Pannello di sistema: un hub centrale raggiunge i sei moduli gestiti.
 * Il significato è quello di docs/06: rete → sicurezza → backup → continuità.
 */
const EDGES = hubEdges(
  "manage-hub",
  capabilityModules.map((module) => `manage-${module.id}`),
  // Sei moduli: il ventaglio ha senso solo quando la griglia è a tre colonne.
  // La griglia passa a 3 colonne al breakpoint xl (viewport 1280px); con il
  // padding di shell (2rem per lato) il field misura lì 1216px. Sotto, la
  // catena fra moduli consecutivi tiene le linee corte.
  { stackedBelow: 1216 },
);

export function WhatWeManageSection({ withCta = true }: { withCta?: boolean }) {
  return (
    <Section id="cosa-gestiamo" divider>
      <SectionHeader
        code="SEC.06"
        eyebrow="Cosa gestiamo"
        title="Un pannello di sistema, non un elenco di interventi."
        intro="Ogni modulo è una parte dello stesso ambiente gestito. Apri un modulo per vedere cosa comprende in funzione del piano e dell'incarico."
      />

      <ConnectionField edges={EDGES} className="mt-12 flex flex-col gap-10">
        <Reveal className="flex items-center gap-3">
          <ConnectionNode id="manage-hub" />
          <SystemLabel tone="active">Ambiente gestito</SystemLabel>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {capabilityModules.map((module, index) => (
            <Reveal key={module.id} delay={(index % 3) * 90} className="h-full">
              <ExpandableModule
                code={module.code}
                title={module.title}
                summary={module.summary}
                details={module.details}
                note={module.note}
                status={module.status}
                anchorId={`manage-${module.id}`}
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      </ConnectionField>

      <Reveal delay={150} className="mt-8 flex flex-col gap-6">
        <p className="max-w-3xl border-l border-hud-line-strong/70 pl-4 text-sm leading-relaxed text-hud-text-mute">
          {scopeNote}
        </p>

        {withCta ? (
          <CtaButton href="/cosa-gestiamo" variant="ghost">
            Vedi tutti i moduli gestiti
          </CtaButton>
        ) : null}
      </Reveal>
    </Section>
  );
}
