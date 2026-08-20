import { PageHero } from "@/components/layout/PageHero";
import { Reveal, Section, SystemLabel } from "@/components/hud";
import { ContactForm } from "@/components/sections/ContactForm";
import { contact, contactPlaceholderNote, publicContacts } from "@/content/contact";
import { site } from "@/content/site";

const NEXT_STEPS = [
  "Leggiamo la richiesta e prepariamo le domande giuste.",
  "Facciamo una breve analisi di sedi, rete, dispositivi e servizi.",
  "Costruiamo un piano A&P coerente con ciò che serve davvero.",
];

/** Contenuto della sezione «Contatti». */
export function ContactView({ inWindow = false }: { inWindow?: boolean }) {
  return (
    <>
      <PageHero
        code="05"
        eyebrow="Contatti"
        title={contact.title}
        intro={contact.body}
        dense={inWindow}
      />

      <Section space="tight">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal variant="slide-right" delay={120} className="flex flex-col gap-5">
            <div className="hud-panel hud-panel--quiet">
              <div className="hud-panel__head">
                <SystemLabel tone="active">REF.01</SystemLabel>
                <SystemLabel>Riferimenti</SystemLabel>
              </div>

              <div className="flex flex-col gap-4 p-5">
                <div className="flex flex-col gap-1">
                  <SystemLabel>Società</SystemLabel>
                  <p className="text-sm text-hud-text">{site.legalEntity}</p>
                </div>

                {publicContacts.length > 0 ? (
                  <ul className="flex flex-col gap-3">
                    {publicContacts.map((item) => (
                      <li key={item.label} className="flex flex-col gap-1">
                        <SystemLabel>{item.label}</SystemLabel>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm text-hud-accent transition-colors duration-[var(--dur-2)] hover:text-hud-text-strong"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-hud-text">{item.value}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div
                    data-placeholder="contatti-pubblici"
                    className="border border-dashed border-hud-line-strong/70 p-4"
                  >
                    <SystemLabel>Placeholder — recapiti</SystemLabel>
                    <p className="mt-2 text-sm leading-relaxed text-hud-text-mute">
                      {contactPlaceholderNote}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="hud-panel hud-panel--quiet p-5">
              <SystemLabel>Cosa succede dopo</SystemLabel>
              <ol className="mt-3 flex flex-col gap-2.5">
                {NEXT_STEPS.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm leading-relaxed text-hud-text-dim">
                    <span className="hud-label tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
