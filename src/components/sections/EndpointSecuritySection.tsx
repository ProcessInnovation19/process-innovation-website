import {
  ConnectionField,
  ConnectionNode,
  type ConnectionEdge,
} from "@/components/connections/ConnectionField";
import { Reveal, Section, SectionHeader, StatusIndicator, SystemLabel } from "@/components/hud";
import { endpointSecurity } from "@/content/partners";

/** La gestione centralizzata raggiunge i dispositivi: è quello il messaggio. */
const EDGES: ConnectionEdge[] = [
  { from: "sec-console", to: "sec-features", route: "horizontal", tone: "active" },
  { from: "sec-console", to: "sec-message", route: "horizontal", tone: "structural" },
];

export function EndpointSecuritySection() {
  return (
    <Section id="sicurezza-endpoint" divider>
      <SectionHeader
        code="SEC.08"
        eyebrow="Sicurezza endpoint"
        title={endpointSecurity.title}
        intro={endpointSecurity.intro}
      />

      <ConnectionField
        edges={EDGES}
        className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
      >
        <Reveal variant="slide-left" className="flex flex-col gap-6">
          <div className="hud-panel hud-panel--active">
            <div className="hud-panel__head">
              <ConnectionNode id="sec-console" />
              <SystemLabel tone="active">SEC.CTRL</SystemLabel>
              <span className="ml-auto">
                <StatusIndicator status="managed" label="controllo centrale" />
              </span>
            </div>
            <blockquote className="p-5 text-base leading-relaxed text-hud-text-strong md:p-6">
              {endpointSecurity.message}
            </blockquote>
          </div>

          <div className="hud-panel hud-panel--quiet flex flex-col gap-3 p-5">
            <ConnectionNode id="sec-message" tone="muted" />
            <p className="text-sm leading-relaxed text-hud-text-mute">{endpointSecurity.note}</p>
          </div>
        </Reveal>

        <Reveal variant="slide-right" delay={120}>
          <div className="hud-panel h-full">
            <div className="hud-panel__head">
              <ConnectionNode id="sec-features" />
              <SystemLabel>Funzioni della soluzione</SystemLabel>
            </div>

            <ul className="grid gap-x-6 gap-y-3 p-5 sm:grid-cols-2 md:p-6">
              {endpointSecurity.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm leading-relaxed text-hud-text-dim">
                  <span aria-hidden="true" className="mt-[0.45rem] h-1 w-1 flex-none bg-hud-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </ConnectionField>
    </Section>
  );
}
