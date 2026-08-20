import { CornerMarks, CtaButton, Reveal, Section, SystemLabel } from "@/components/hud";
import { contact } from "@/content/contact";

export function ContactCtaSection() {
  return (
    <Section id="contatti" divider space="tight">
      <Reveal>
        <div className="hud-panel hud-panel--active">
          <CornerMarks />
          <div className="hud-panel__head">
            <SystemLabel tone="active">{contact.code}</SystemLabel>
            <SystemLabel>Prima analisi</SystemLabel>
          </div>

          <div className="flex flex-col gap-6 p-6 md:flex-row md:items-end md:justify-between md:p-10">
            <div className="flex flex-col gap-4">
              <h2 className="max-w-[20ch] text-balance text-2xl leading-tight font-semibold tracking-tight text-hud-text-strong sm:text-3xl lg:text-4xl">
                {contact.title}
              </h2>
              <p className="max-w-xl text-pretty text-base leading-relaxed text-hud-text-dim">
                {contact.body}
              </p>
            </div>

            <CtaButton href="/contatti" className="flex-none">
              Apri il modulo di contatto
            </CtaButton>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
