export type Point = { x: number; y: number };

export type Route = "auto" | "horizontal" | "vertical";

const CORNER_RADIUS = 12;

/**
 * Costruisce un path ortogonale (spezzata con angoli raccordati) fra due punti.
 *
 * Le coordinate arrivano sempre da `getBoundingClientRect()` degli elementi reali
 * riportate nello spazio locale del layer: nessuna coordinata hardcoded e nessuna
 * dipendenza dalla viewport (docs/07, Fase 3).
 */
export function buildOrthogonalPath(a: Point, b: Point, route: Route = "auto"): string {
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  // Allineati: segmento dritto.
  if (Math.abs(dx) < 1.5 || Math.abs(dy) < 1.5) {
    return `M ${round(a.x)},${round(a.y)} L ${round(b.x)},${round(b.y)}`;
  }

  const horizontal = route === "horizontal" || (route === "auto" && Math.abs(dx) >= Math.abs(dy));

  const sx = Math.sign(dx);
  const sy = Math.sign(dy);
  const r = Math.max(0, Math.min(CORNER_RADIUS, Math.abs(dx) / 2 - 1, Math.abs(dy) / 2 - 1));

  if (horizontal) {
    // ─┐  gomito sulla mezzeria orizzontale
    //  └─
    const mx = a.x + dx / 2;
    return [
      `M ${round(a.x)},${round(a.y)}`,
      `L ${round(mx - r * sx)},${round(a.y)}`,
      `Q ${round(mx)},${round(a.y)} ${round(mx)},${round(a.y + r * sy)}`,
      `L ${round(mx)},${round(b.y - r * sy)}`,
      `Q ${round(mx)},${round(b.y)} ${round(mx + r * sx)},${round(b.y)}`,
      `L ${round(b.x)},${round(b.y)}`,
    ].join(" ");
  }

  const my = a.y + dy / 2;
  return [
    `M ${round(a.x)},${round(a.y)}`,
    `L ${round(a.x)},${round(my - r * sy)}`,
    `Q ${round(a.x)},${round(my)} ${round(a.x + r * sx)},${round(my)}`,
    `L ${round(b.x - r * sx)},${round(my)}`,
    `Q ${round(b.x)},${round(my)} ${round(b.x)},${round(my + r * sy)}`,
    `L ${round(b.x)},${round(b.y)}`,
  ].join(" ");
}

/** Centro di un rect riportato nello spazio locale di `origin`. */
export function localCenter(rect: DOMRect, origin: DOMRect): Point {
  return {
    x: rect.left - origin.left + rect.width / 2,
    y: rect.top - origin.top + rect.height / 2,
  };
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
