import { PageHero } from "@/components/layout/PageHero";
import { Reveal, Section, SectionHeader, StatusIndicator, SystemLabel } from "@/components/hud";
import { AiSupervisionSection } from "@/components/sections/AiSupervisionSection";
import { ConnectivitySection } from "@/components/sections/ConnectivitySection";
import { ContactCtaSection } from "@/components/sections/ContactCtaSection";
import { EndpointSecuritySection } from "@/components/sections/EndpointSecuritySection";

/**
 * Le soluzioni di terzi restano tali: nessuna è presentata come tecnologia
 * proprietaria Process & Innovation (docs/04).
 */
const SOLUTIONS = [
  {
    code: "SOL.01",
    title: "Protezione endpoint",
    partner: "Tecnologia Bitdefender",
    body: "Installata, configurata e controllata all'interno della gestione IT dei dispositivi previsti.",
    status: "managed" as const,
  },
  {
    code: "SOL.02",
    title: "Supervisione assistita da AI",
    partner: "Analisi sui dati tecnici raccolti",
    body: "Segnali di rete analizzati a supporto del team tecnico; la supervisione delle email è una funzionalità in evoluzione.",
    status: "evolving" as const,
  },
  {
    code: "SOL.03",
    title: "Comunicazioni e connettività",
    partner: "Soluzione partner Voxloud",
    body: "Centralino in cloud e connettività business inseriti in un disegno di rete, QoS, continuità, utenti e sedi.",
    status: "optional" as const,
  },
];

/** Contenuto della sezione «Soluzioni & Partner». */
export function PartnersView({ inWindow = false }: { inWindow?: boolean }) {
  return (
    <>
      <PageHero
        code="03"
        eyebrow="Soluzioni & Partner"
        title="Soluzioni scelte, integrate e gestite dentro l'infrastruttura."
        intro="Non rivendiamo prodotti isolati: selezioniamo soluzioni coerenti con l'ambiente del cliente e le rendiamo parte del sistema che gestiamo."
        dense={inWindow}
      />

      <Section space="tight">
        <SectionHeader
          code="SEC.00"
          eyebrow="Quadro"
          title="Tre ambiti, un solo criterio: coerenza con l'ambiente gestito."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {SOLUTIONS.map((solution, index) => (
            <Reveal key={solution.code} delay={index * 90} className="h-full">
              <article className="hud-panel hud-panel--quiet flex h-full flex-col">
                <div className="hud-panel__head">
                  <SystemLabel tone="active" className="tabular-nums">
                    {solution.code}
                  </SystemLabel>
                  <span className="ml-auto">
                    <StatusIndicator status={solution.status} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2.5 p-5">
                  <h3 className="text-base font-semibold tracking-tight text-hud-text-strong">
                    {solution.title}
                  </h3>
                  <SystemLabel>{solution.partner}</SystemLabel>
                  <p className="text-sm leading-relaxed text-hud-text-dim">{solution.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <EndpointSecuritySection />
      <AiSupervisionSection />
      <ConnectivitySection />
      <ContactCtaSection />
    </>
  );
}
