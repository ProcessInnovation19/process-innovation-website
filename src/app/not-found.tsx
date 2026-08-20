import { CtaButton, SystemLabel } from "@/components/hud";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-[var(--shell-max)] flex-col items-start gap-6 px-[var(--shell-pad)] pt-[calc(var(--header-h)+6rem)] pb-24">
      <div className="flex items-center gap-3">
        <SystemLabel tone="active">ERR.404</SystemLabel>
        <span aria-hidden="true" className="hud-rule w-12 flex-none" />
        <SystemLabel>Modulo non trovato</SystemLabel>
      </div>

      <h1 className="max-w-2xl text-balance text-3xl leading-tight font-semibold tracking-tight text-hud-text-strong sm:text-4xl">
        Questa pagina non fa parte del sistema.
      </h1>

      <p className="max-w-xl text-base leading-relaxed text-hud-text-dim">
        L&apos;indirizzo richiesto non corrisponde a nessuna sezione del sito. Torna alla home
        oppure vai direttamente ad Assistenza &amp; Prevenzione.
      </p>

      <div className="flex flex-wrap gap-3">
        <CtaButton href="/">Torna alla home</CtaButton>
        <CtaButton href="/assistenza-e-prevenzione" variant="ghost">
          Assistenza &amp; Prevenzione
        </CtaButton>
      </div>
    </div>
  );
}
