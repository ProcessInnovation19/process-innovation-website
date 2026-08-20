import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";
import { SystemLabel } from "./SystemLabel";

type SectionHeaderProps = {
  /** identificatore di sistema, es. "SEC.04" */
  code?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "start" | "center";
  className?: string;
};

/** Intestazione di sezione con identificatore di sistema e riga tecnica. */
export function SectionHeader({
  code,
  eyebrow,
  title,
  intro,
  align = "start",
  className,
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {(code || eyebrow) && (
        <div className="flex items-center gap-3">
          {code ? <SystemLabel tone="active">{code}</SystemLabel> : null}
          {code && eyebrow ? (
            <span aria-hidden="true" className="hud-rule w-8 flex-none" />
          ) : null}
          {eyebrow ? <SystemLabel>{eyebrow}</SystemLabel> : null}
        </div>
      )}

      <h2 className="max-w-3xl text-balance text-2xl leading-tight font-semibold tracking-tight text-hud-text-strong sm:text-3xl lg:text-4xl">
        {title}
      </h2>

      {intro ? (
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-hud-text-dim">{intro}</p>
      ) : null}
    </Reveal>
  );
}
