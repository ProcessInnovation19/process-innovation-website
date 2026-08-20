import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** spaziatura verticale */
  space?: "default" | "tight" | "loose";
  /** separatore superiore a filo tecnico */
  divider?: boolean;
};

const SPACE: Record<NonNullable<SectionProps["space"]>, string> = {
  tight: "py-14 md:py-16",
  default: "py-16 md:py-24",
  loose: "py-20 md:py-32",
};

/** Contenitore di sezione: larghezza massima, padding responsive, ancora di navigazione. */
export function Section({ id, children, className, space = "default", divider = false }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full max-w-[var(--shell-max)] px-[var(--shell-pad)]",
        SPACE[space],
        className,
      )}
    >
      {divider ? (
        <span
          aria-hidden="true"
          className="absolute inset-x-[var(--shell-pad)] top-0 h-px bg-gradient-to-r from-hud-line-strong/70 via-hud-line/40 to-transparent"
        />
      ) : null}
      {children}
    </section>
  );
}
