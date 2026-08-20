import { NextResponse } from "next/server";

/**
 * Ricezione del modulo di contatto.
 *
 * PUNTO APERTO (docs/08 §"Conversione"): la destinazione definitiva del lead
 * non è ancora decisa. La route è già l'integrazione point: impostando
 * `CONTACT_WEBHOOK_URL` il messaggio viene inoltrato, altrimenti risponde
 * esplicitamente che la destinazione non è configurata — senza simulare
 * un invio riuscito.
 */

const REQUIRED_FIELDS = ["nome", "azienda", "email", "messaggio"] as const;

type Payload = Record<string, unknown>;

export async function POST(request: Request) {
  let payload: Payload;

  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, message: "Richiesta non valida." }, { status: 400 });
  }

  const missing = REQUIRED_FIELDS.filter((field) => {
    const value = payload[field];
    return typeof value !== "string" || value.trim().length === 0;
  });

  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, message: "Compila i campi obbligatori prima di inviare." },
      { status: 422 },
    );
  }

  const email = String(payload.email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json(
      { ok: false, message: "L'indirizzo email non sembra valido." },
      { status: 422 },
    );
  }

  const endpoint = process.env.CONTACT_WEBHOOK_URL;

  if (!endpoint) {
    return NextResponse.json(
      {
        ok: false,
        code: "NOT_CONFIGURED",
        message:
          "Il recapito del modulo non è ancora configurato su questo ambiente. Il messaggio non è stato inviato.",
      },
      { status: 503 },
    );
  }

  try {
    const forwarded = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "process-innovation-website", ...payload }),
    });

    if (!forwarded.ok) {
      return NextResponse.json(
        { ok: false, message: "Invio non riuscito. Riprova più tardi." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invio non riuscito. Riprova più tardi." },
      { status: 502 },
    );
  }
}
