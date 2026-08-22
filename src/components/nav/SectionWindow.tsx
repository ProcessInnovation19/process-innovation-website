"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { SystemLabel } from "@/components/hud";

/** Durata dell'animazione di chiusura, allineata a `window-close` in globals.css. */
const CLOSE_MS = 240;

type SectionWindowProps = {
  code: string;
  label: string;
  children: ReactNode;
};

/**
 * Finestra di sezione.
 *
 * Aperta dalla mappa tramite route intercettata: sta sopra a tutto, scorre in
 * autonomia e si chiude tornando indietro nella cronologia, così il tasto
 * «indietro» del browser fa la stessa cosa del comando di chiusura.
 *
 * L'apertura è una sequenza: velo → fascio orizzontale → apertura del telaio a
 * diaframma → ingresso del contenuto.
 */
export function SectionWindow({ code, label, children }: SectionWindowProps) {
  const router = useRouter();
  const frameRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const closingRef = useRef(false);
  const [closing, setClosing] = useState(false);
  const titleId = useId();

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    window.setTimeout(() => router.back(), CLOSE_MS);
  }, [router]);

  /* --- blocco dello scroll di pagina e focus iniziale --- */
  useEffect(() => {
    const root = document.documentElement;
    const previousOverflow = document.body.style.overflow;
    root.classList.add("is-modal-open");
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("pi:depth-freeze"));

    closeRef.current?.focus();

    return () => {
      root.classList.remove("is-modal-open");
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  /* --- Esc e trap del focus --- */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const frame = frameRef.current;
      if (!frame) return;

      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = Array.from(
        frame.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null || element === document.activeElement);

      if (focusables.length === 0) return;

      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close]);

  return (
    <div
      className={cn("section-window", closing && "section-window--closing")}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="section-window__veil"
        onClick={close}
        tabIndex={-1}
        aria-label="Chiudi la finestra"
      />

      <span aria-hidden="true" className="section-window__beam" />

      <div ref={frameRef} className="section-window__frame">
        <div className="section-window__corner section-window__corner--tl" aria-hidden="true" />
        <div className="section-window__corner section-window__corner--tr" aria-hidden="true" />
        <div className="section-window__corner section-window__corner--bl" aria-hidden="true" />
        <div className="section-window__corner section-window__corner--br" aria-hidden="true" />

        <header className="section-window__bar">
          <SystemLabel tone="active" className="tabular-nums">
            {code}
          </SystemLabel>
          <span aria-hidden="true" className="hud-rule w-8 flex-none" />
          <h2 id={titleId} className="truncate text-sm font-medium text-hud-text-strong">
            {label}
          </h2>

          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="ml-auto inline-flex items-center gap-2.5 border border-hud-line-strong/80 px-3 py-2 font-mono text-[0.6875rem] tracking-[0.16em] text-hud-text uppercase transition-colors duration-[var(--dur-2)] hover:border-hud-accent hover:text-hud-text-strong"
          >
            <span aria-hidden="true" className="relative block h-3 w-3">
              <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 rotate-45 bg-current" />
              <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 -rotate-45 bg-current" />
            </span>
            Chiudi
            <kbd className="ml-1 hidden border border-hud-line/90 px-1.5 py-0.5 text-[0.625rem] text-hud-text-mute md:inline">
              Esc
            </kbd>
          </button>
        </header>

        <span aria-hidden="true" className="section-window__scan" />

        <div ref={bodyRef} className="section-window__body">
          {children}
        </div>
      </div>
    </div>
  );
}
