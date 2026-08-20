import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SystemLabelProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "active";
};

/** Microtesto tecnico monospaziato: label di modulo, coordinate, identificatori. */
export function SystemLabel({ children, className, tone = "default" }: SystemLabelProps) {
  return (
    <span className={cn("hud-label", tone === "active" && "text-hud-accent", className)}>
      {children}
    </span>
  );
}
