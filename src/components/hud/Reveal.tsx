"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";
import { useInView } from "@/lib/useInView";

type RevealVariant = "boot" | "slide-left" | "slide-right" | "fade";

type RevealProps = {
  children: ReactNode;
  /** elemento renderizzato (default: div) */
  as?: ElementType;
  variant?: RevealVariant;
  /** ritardo in ms, per sequenze coordinate */
  delay?: number;
  className?: string;
  id?: string;
};

/**
 * Motion "boot": il contenuto entra come un modulo che si inizializza.
 * L'animazione è interamente CSS (`[data-reveal]` in globals.css), quindi
 * `prefers-reduced-motion` la neutralizza senza codice condizionale.
 */
export function Reveal({
  children,
  as: Tag = "div",
  variant = "boot",
  delay = 0,
  className,
  id,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      id={id}
      ref={ref}
      data-reveal={variant}
      data-in={inView ? "true" : "false"}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
