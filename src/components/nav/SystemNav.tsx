"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { mapNode, sections } from "@/content/site";
import { SystemBar } from "./SystemBar";

/**
 * Navigazione del sito.
 *
 * Una sola superficie persistente: la barra di sistema, che mostra la
 * posizione corrente e riporta alla mappa. La navigazione vera è la mappa
 * stessa (`/`), da cui le sezioni si aprono in finestra.
 */
export function SystemNav() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  const current = pathname === mapNode.href
    ? mapNode
    : sections.find((item) => item.href === pathname);

  const onMap = pathname === mapNode.href;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* --- scorciatoia "M": torna alla mappa --- */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "m" && event.key !== "M") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      // non intercettare la digitazione nei campi del modulo
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || target.closest("input, textarea, select") != null)
      ) {
        return;
      }

      event.preventDefault();
      router.push(mapNode.href);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return (
    <SystemBar
      activeCode={current?.code ?? "—"}
      activeLabel={current?.label ?? "Sezione"}
      scrolled={scrolled}
      onMap={onMap}
    />
  );
}
