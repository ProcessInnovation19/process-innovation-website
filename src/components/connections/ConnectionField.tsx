"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";
import { buildOrthogonalPath, localCenter, type Point, type Route } from "./geometry";

/* ------------------------------------------------------------------ types */

export type ConnectionEdge = {
  /** id di un anchor registrato nel field */
  from: string;
  /** id di un anchor registrato nel field */
  to: string;
  /** preferenza di instradamento; "auto" sceglie in base alla distanza dominante */
  route?: Route;
  /** disegna la linea solo se il field è largo almeno N px (semplificazione mobile) */
  minFieldWidth?: number;
  /** disegna la linea solo se il field è largo al massimo N px */
  maxFieldWidth?: number;
  /** tono: "active" = collegamento vivo, "structural" = struttura di fondo */
  tone?: "active" | "structural";
};

type Registry = {
  register: (id: string, el: HTMLElement | null) => void;
};

const ConnectionContext = createContext<Registry | null>(null);

/* ------------------------------------------------------------------ hooks */

/**
 * Registra un elemento qualsiasi come punto di aggancio delle connessioni.
 * Restituisce una ref callback da applicare all'elemento.
 */
export function useConnectionAnchor(id: string) {
  const ctx = useContext(ConnectionContext);

  return useCallback(
    (el: HTMLElement | null) => {
      ctx?.register(id, el);
    },
    [ctx, id],
  );
}

/* -------------------------------------------------------------- component */

type ConnectionFieldProps = {
  edges: ConnectionEdge[];
  children: ReactNode;
  className?: string;
  /**
   * Cambiando questo valore i path vengono rimontati e l'animazione di
   * disegno riparte da capo. Serve quando gli anchor si spostano per una
   * scelta dell'utente (per esempio la voce selezionata nel briefing) e la
   * linea deve essere ri-tracciata invece di scivolare nella nuova posizione.
   */
  redrawKey?: string | number;
};

type ComputedEdge = {
  key: string;
  d: string;
  from: Point;
  to: Point;
  tone: "active" | "structural";
};

/**
 * Layer di connessione.
 *
 * Misura gli anchor realmente presenti nel DOM, calcola i path nello spazio
 * locale del field e li ridisegna a ogni resize del contenitore o degli anchor.
 * Le linee entrano con `stroke-dashoffset` quando la sezione entra in viewport.
 */
export function ConnectionField({ edges, children, className, redrawKey }: ConnectionFieldProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const anchors = useRef(new Map<string, HTMLElement>());
  const observerRef = useRef<ResizeObserver | null>(null);
  const frameRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const signatureRef = useRef("");

  const [computed, setComputed] = useState<ComputedEdge[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [inView, setInView] = useState(false);

  const reactId = useId();
  const gradientId = `conn-grad-${reactId.replace(/[:]/g, "")}`;

  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;

    const origin = root.getBoundingClientRect();
    if (origin.width === 0 || origin.height === 0) return;

    const next: ComputedEdge[] = [];
    const centers = new Map<string, Point>();

    const centerFor = (id: string) => {
      const cached = centers.get(id);
      if (cached) return cached;

      const anchor = anchors.current.get(id);
      if (!anchor) return undefined;

      const center = localCenter(anchor.getBoundingClientRect(), origin);
      centers.set(id, center);
      return center;
    };

    for (const edge of edges) {
      if (edge.minFieldWidth != null && origin.width < edge.minFieldWidth) continue;
      if (edge.maxFieldWidth != null && origin.width > edge.maxFieldWidth) continue;

      /* Un anchor condiviso da più linee viene misurato una sola volta per frame. */
      const from = centerFor(edge.from);
      const to = centerFor(edge.to);
      if (!from || !to) continue;

      next.push({
        key: `${edge.from}__${edge.to}`,
        d: buildOrthogonalPath(from, to, edge.route ?? "auto"),
        from,
        to,
        tone: edge.tone ?? "active",
      });
    }

    const signature = `${Math.round(origin.width)}x${Math.round(origin.height)}|${next
      .map((e) => `${e.key}:${e.d}`)
      .join("|")}`;

    if (signature === signatureRef.current) return;
    signatureRef.current = signature;

    setSize({ width: origin.width, height: origin.height });
    setComputed(next);
  }, [edges]);

  const scheduleMeasure = useCallback(() => {
    if (typeof window === "undefined") return;

    // In una tab nascosta `requestAnimationFrame` non viene eseguito: senza
    // fallback le linee resterebbero non calcolate finché la tab non torna
    // visibile. Il timeout copre quel caso, la rAF batcha le letture di layout
    // insieme al paint quando la pagina è visibile.
    const run = () => {
      frameRef.current = null;
      timerRef.current = null;
      measure();
    };

    if (typeof document !== "undefined" && document.visibilityState === "hidden") {
      if (timerRef.current != null) return;
      if (frameRef.current != null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      timerRef.current = window.setTimeout(run, 0);
      return;
    }

    /* Più eventi nello stesso frame leggono tutti la geometria finale: uno basta. */
    if (frameRef.current != null || timerRef.current != null) return;
    frameRef.current = requestAnimationFrame(run);
  }, [measure]);

  const register = useCallback(
    (id: string, el: HTMLElement | null) => {
      const previous = anchors.current.get(id);
      if (previous && previous !== el) observerRef.current?.unobserve(previous);

      if (el) {
        anchors.current.set(id, el);
        observerRef.current?.observe(el);
      } else {
        anchors.current.delete(id);
      }

      scheduleMeasure();
    },
    [scheduleMeasure],
  );

  const registry = useMemo<Registry>(() => ({ register }), [register]);

  /* --- osservazione layout: contenitore + anchor + finestra + font --- */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof ResizeObserver === "undefined") {
      measure();
      return;
    }

    const observer = new ResizeObserver(scheduleMeasure);
    observerRef.current = observer;
    observer.observe(root);
    for (const el of anchors.current.values()) observer.observe(el);

    // Le animazioni di ingresso ("boot", "brief") spostano i pannelli con
    // `transform`: un ResizeObserver non se ne accorge, quindi gli anchor
    // misurati durante il movimento risulterebbero fuori posizione.
    // Ricalcoliamo quando il movimento è finito — sia per transizioni sia per
    // animazioni, perché il briefing usa `@keyframes` per poterle rigiocare.
    const onTransitionEnd = (event: TransitionEvent) => {
      if (
        event.propertyName === "transform" &&
        event.target instanceof HTMLElement &&
        event.target.hasAttribute("data-reveal")
      ) {
        scheduleMeasure();
      }
    };
    const onAnimationEnd = (event: AnimationEvent) => {
      if (event.animationName === "brief-in-left" || event.animationName === "brief-in-right") {
        scheduleMeasure();
      }
    };

    root.addEventListener("transitionend", onTransitionEnd);
    root.addEventListener("animationend", onAnimationEnd);

    window.addEventListener("resize", scheduleMeasure);
    window.addEventListener("orientationchange", scheduleMeasure);
    document.addEventListener("visibilitychange", scheduleMeasure);

    // il layout si assesta dopo il caricamento dei font
    if (typeof document !== "undefined" && "fonts" in document) {
      void document.fonts.ready.then(scheduleMeasure).catch(() => undefined);
    }

    scheduleMeasure();

    return () => {
      observer.disconnect();
      observerRef.current = null;
      root.removeEventListener("transitionend", onTransitionEnd);
      root.removeEventListener("animationend", onAnimationEnd);
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("orientationchange", scheduleMeasure);
      document.removeEventListener("visibilitychange", scheduleMeasure);
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
      if (timerRef.current != null) clearTimeout(timerRef.current);
    };
  }, [measure, scheduleMeasure]);

  /* --- ingresso in viewport: avvia l'animazione "connect" --- */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Ambienti senza IntersectionObserver: le linee vengono disegnate subito.
    if (typeof IntersectionObserver === "undefined") {
      const timer = setTimeout(() => setInView(true), 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  /* --- assestamento: le posizioni cambiano mentre i pannelli entrano --- */
  useEffect(() => {
    if (!inView) return;

    // `transitionend` copre il caso normale; questi checkpoint coprono le
    // transizioni interrotte o mai completate (tab in background, motion
    // ridotta, elementi rimossi durante l'animazione).
    const timers = [450, 950].map((delay) => window.setTimeout(scheduleMeasure, delay));
    return () => timers.forEach(clearTimeout);
  }, [inView, scheduleMeasure]);

  return (
    <ConnectionContext.Provider value={registry}>
      <div
        ref={rootRef}
        className={cn("connection-field", className)}
        data-connections-in={inView ? "true" : "false"}
      >
        {size.width > 0 && computed.length > 0 ? (
          <svg
            className="hud-connections"
            width={size.width}
            height={size.height}
            viewBox={`0 0 ${size.width} ${size.height}`}
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--color-hud-accent-deep)" />
                <stop offset="100%" stopColor="var(--color-hud-accent)" />
              </linearGradient>
            </defs>

            {computed.map((edge, index) => (
              <g
                key={redrawKey == null ? edge.key : `${edge.key}#${redrawKey}`}
                style={{ "--edge-index": index } as CSSProperties}
              >
                <path
                  d={edge.d}
                  pathLength={1}
                  className={cn(
                    "hud-connections__path",
                    edge.tone === "structural" && "hud-connections__path--structural",
                  )}
                  stroke={edge.tone === "active" ? `url(#${gradientId})` : undefined}
                />
                <rect
                  className="hud-connections__terminal"
                  x={edge.to.x - 3}
                  y={edge.to.y - 3}
                  width={6}
                  height={6}
                />
              </g>
            ))}
          </svg>
        ) : null}

        {children}
      </div>
    </ConnectionContext.Provider>
  );
}

/* ------------------------------------------------------------ anchor node */

type ConnectionNodeProps = {
  id: string;
  className?: string;
  tone?: "active" | "muted";
  size?: "sm" | "md";
};

/**
 * Nodo visibile: il quadrato del monogramma "i" del logo, usato come
 * terminale delle connessioni.
 */
export function ConnectionNode({
  id,
  className,
  tone = "active",
  size = "md",
}: ConnectionNodeProps) {
  const ref = useConnectionAnchor(id);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        "hud-node",
        tone === "muted" && "hud-node--muted",
        size === "sm" && "hud-node--sm",
        className,
      )}
    />
  );
}

/**
 * Anchor invisibile: aggancia una connessione a un elemento esistente
 * (header di pannello, titolo, icona) senza aggiungere grafica.
 */
export function ConnectionAnchor({ id, className }: { id: string; className?: string }) {
  const ref = useConnectionAnchor(id);
  return <span ref={ref} aria-hidden="true" className={cn("block h-0 w-0", className)} />;
}
