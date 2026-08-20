"use client";

import { useId, useState, type FormEvent } from "react";

import { cn } from "@/lib/cn";
import { StatusIndicator, SystemLabel } from "@/components/hud";
import { contactFields } from "@/content/contact";

type FormState =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

const FIELD_CLASSES =
  // Il placeholder usa il colore pieno: a opacità ridotta il contrasto scende
  // sotto 4.5:1 sul fondo scuro.
  "w-full border border-hud-line-strong/70 bg-hud-bg-raised/80 px-3.5 py-2.5 text-sm text-hud-text placeholder:text-hud-text-mute transition-colors duration-[var(--dur-2)] focus:border-hud-accent";

/**
 * Modulo di contatto.
 *
 * Invia a `/api/contact`. La destinazione finale del lead è un punto aperto
 * (docs/08 §"Conversione"): la route inoltra a `CONTACT_WEBHOOK_URL` se
 * configurata, altrimenti risponde in modo esplicito senza perdere il messaggio
 * dell'utente né simulare un invio riuscito.
 */
export function ContactForm() {
  const [state, setState] = useState<FormState>({ kind: "idle" });
  const statusId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setState({ kind: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: { ok?: boolean; message?: string } = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        setState({ kind: "sent" });
        form.reset();
        return;
      }

      setState({
        kind: "error",
        message:
          data.message ??
          "Non è stato possibile completare l'invio. Riprova più tardi o contattaci direttamente.",
      });
    } catch {
      setState({
        kind: "error",
        message: "Connessione non riuscita. Verifica la rete e riprova.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="hud-panel">
      <div className="hud-panel__head">
        <SystemLabel tone="active">FORM.01</SystemLabel>
        <SystemLabel>Richiesta di analisi</SystemLabel>
        <span className="ml-auto">
          <StatusIndicator
            status={state.kind === "sent" ? "managed" : "optional"}
            label={state.kind === "sending" ? "invio…" : state.kind === "sent" ? "ricevuto" : "in attesa"}
          />
        </span>
      </div>

      <div className="grid gap-5 p-5 md:grid-cols-2 md:p-6">
        {contactFields.map((field) => {
          const isWide = field.type === "textarea";
          return (
            <div key={field.name} className={cn("flex flex-col gap-2", isWide && "md:col-span-2")}>
              <label
                htmlFor={`contact-${field.name}`}
                className="font-mono text-[0.6875rem] tracking-[0.14em] text-hud-text-mute uppercase"
              >
                {field.label}
                {field.required ? (
                  <span className="text-hud-accent"> *</span>
                ) : null}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  id={`contact-${field.name}`}
                  name={field.name}
                  required={field.required}
                  rows={5}
                  placeholder={field.placeholder}
                  className={cn(FIELD_CLASSES, "resize-y")}
                />
              ) : (
                <input
                  id={`contact-${field.name}`}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  min={field.type === "number" ? 0 : undefined}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  className={FIELD_CLASSES}
                />
              )}
            </div>
          );
        })}

        <div className="flex flex-col gap-4 md:col-span-2">
          <button
            type="submit"
            disabled={state.kind === "sending"}
            className="inline-flex w-fit items-center gap-2.5 bg-hud-accent px-5 py-3 text-sm font-medium text-hud-on-accent transition-colors duration-[var(--dur-2)] hover:bg-hud-accent-hover disabled:cursor-not-allowed disabled:opacity-60 [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%-10px))]"
          >
            {state.kind === "sending" ? "Invio in corso…" : "Invia la richiesta"}
          </button>

          <p
            id={statusId}
            role="status"
            aria-live="polite"
            className={cn(
              "text-sm leading-relaxed",
              state.kind === "error" ? "text-hud-text-strong" : "text-hud-text-mute",
            )}
          >
            {state.kind === "sent"
              ? "Richiesta ricevuta. Ti ricontattiamo per fissare la prima analisi."
              : state.kind === "error"
                ? state.message
                : "I dati servono solo a preparare la prima analisi dell'ambiente."}
          </p>
        </div>
      </div>
    </form>
  );
}
