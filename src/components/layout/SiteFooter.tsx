import Image from "next/image";

import { site } from "@/content/site";

/**
 * Footer: marchio, payoff e dati societari. Nient'altro.
 *
 * Non contiene navigazione: il sito si percorre dalla mappa (`/`), raggiungibile
 * dalla barra di sistema.
 *
 * Il payoff usato qui è il descrittore di servizio già documentato in
 * `docs/01` §"Formulazioni utili". Il payoff *istituzionale* vero e proprio è
 * ancora un punto aperto (`docs/08` §Brand): quando verrà deciso, si sostituisce
 * `site.tagline` senza toccare questo componente.
 */
export function SiteFooter() {
  const year = 2026;

  return (
    <footer className="relative z-10 border-t border-hud-line bg-hud-bg-raised/80">
      {/*
        `items-start` è necessario: in colonna il contenitore allungherebbe il
        logo a tutta larghezza, deformandolo (l'altezza è fissa e la larghezza
        è `auto`).
      */}
      <div className="mx-auto flex w-full max-w-[var(--shell-max)] flex-col items-start gap-3 px-[var(--shell-pad)] py-5 sm:flex-row sm:items-center sm:gap-5">
        <Image
          src="/brand/wordmark.png"
          alt={site.name}
          width={1053}
          height={540}
          sizes="63px"
          className="h-8 w-auto flex-none"
        />

        <span
          aria-hidden="true"
          className="hidden h-6 w-px flex-none bg-hud-line sm:block"
        />

        <p className="text-sm leading-snug text-hud-text-dim">{site.tagline}</p>

        <p className="text-xs leading-snug text-hud-text-mute sm:ml-auto sm:text-right">
          {site.legalEntity} · © {year}
        </p>
      </div>
    </footer>
  );
}
