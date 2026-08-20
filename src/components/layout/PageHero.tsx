import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { Reveal, SystemLabel } from "@/components/hud";

type PageHeroProps = {
  code: string;
  eyebrow: string;
  title: string;
  intro: string;
  aside?: ReactNode;
  /** dentro la finestra di sezione non c'è l'intestazione fissa: meno spazio sopra */
  dense?: boolean;
};

/** Intestazione di sezione, usata sia in pagina intera sia in finestra. */
export function PageHero({ code, eyebrow, title, intro, aside, dense = false }: PageHeroProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[var(--shell-max)] px-[var(--shell-pad)] pb-12 md:pb-16",
        dense ? "pt-8 md:pt-10" : "pt-[calc(var(--header-h)+3.5rem)]",
      )}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end">
        <Reveal className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <SystemLabel tone="active" className="tabular-nums">
              {code}
            </SystemLabel>
            <span aria-hidden="true" className="hud-rule w-10 flex-none" />
            <SystemLabel>{eyebrow}</SystemLabel>
          </div>

          <h1 className="max-w-3xl text-balance text-3xl leading-[1.1] font-semibold tracking-tight text-hud-text-strong sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          <p className="max-w-2xl text-pretty text-base leading-relaxed text-hud-text-dim md:text-lg">
            {intro}
          </p>
        </Reveal>

        {aside ? (
          <Reveal variant="slide-right" delay={120}>
            {aside}
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
