import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

const CUT =
  "[clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%-10px))]";

/** CTA con la stessa geometria dei pannelli (angoli tagliati). */
export function CtaButton({ href, children, variant = "primary", className }: CtaButtonProps) {
  const isInternal = href.startsWith("/") || href.startsWith("#");

  const classes = cn(
    "group inline-flex items-center gap-2.5 px-5 py-3 text-sm font-medium tracking-tight transition-colors duration-[var(--dur-2)]",
    CUT,
    variant === "primary"
      ? "bg-hud-accent text-hud-on-accent hover:bg-hud-accent-hover"
      : "border border-hud-line-strong/80 bg-hud-accent-deep/10 text-hud-text hover:border-hud-accent hover:text-hud-text-strong",
    className,
  );

  const content = (
    <>
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-[var(--dur-2)] group-hover:translate-x-1"
      >
        →
      </span>
    </>
  );

  if (isInternal) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} rel="noopener noreferrer">
      {content}
    </a>
  );
}
