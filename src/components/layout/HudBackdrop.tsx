import type { CSSProperties } from "react";

/**
 * Sfondo di sistema.
 *
 * L'interfaccia galleggia davanti a uno spazio profondo. La profondità non è
 * dipinta: i piani stanno a distanze diverse su un asse Z reale dentro una
 * `perspective`, quindi il puntatore e lo scroll producono parallasse vera
 * (vedi `PointerDepth`). Tre indizi lavorano insieme — parallasse fra i piani,
 * prospettiva del tunnel di telai, opacità atmosferica di ciò che è
 * lontano.
 *
 * Tutto decorativo e non interattivo; si muovono solo `transform` e `opacity`.
 */

type Point = { x: number; y: number };

/**
 * Costellazione deterministica: coordinate fisse, così il markup del server e
 * quello del client coincidono. Il viewBox viene ritagliato (`slice`), quindi
 * la composizione regge da mobile a 1920.
 */
const NODES: Point[] = [
  { x: 120, y: 180 },
  { x: 300, y: 110 },
  { x: 300, y: 300 },
  { x: 520, y: 220 },
  { x: 140, y: 520 },
  { x: 330, y: 640 },
  { x: 560, y: 720 },
  { x: 860, y: 140 },
  { x: 1080, y: 250 },
  { x: 1300, y: 170 },
  { x: 940, y: 430 },
  { x: 1180, y: 570 },
  { x: 1340, y: 710 },
  { x: 760, y: 830 },
];

/** Coppie di indici collegate: una dorsale con diramazioni, non linee casuali. */
const LINKS: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [0, 4],
  [4, 5],
  [5, 6],
  [7, 8],
  [8, 9],
  [8, 10],
  [10, 11],
  [11, 12],
  [6, 13],
  [10, 13],
];

/** Distanze dei telai del tunnel, in px lungo Z. */
const RING_DEPTHS = [0, 380, 820, 1340, 1960, 2700];

/** Percorso ortogonale con gomito a metà: la stessa grammatica delle connessioni. */
function link(a: Point, b: Point): string {
  const midX = Math.round((a.x + b.x) / 2);
  return `M ${a.x},${a.y} H ${midX} V ${b.y} H ${b.x}`;
}

export function HudBackdrop() {
  return (
    <div className="hud-backdrop" aria-hidden="true">
      {/* tunnel: la fuga prospettica verso il fondo */}
      <div className="hud-backdrop__tunnel">
        {RING_DEPTHS.map((depth, index) => (
          <span
            key={depth}
            className="hud-backdrop__ring"
            style={{ "--z": depth, "--i": index } as CSSProperties}
          />
        ))}
      </div>

      {/*
       * I piani, dal più lontano al più vicino.
       * Il piano porta la trasformazione di profondità; il figlio `__drift`
       * porta il movimento autonomo. Sono separati perché due animazioni sullo
       * stesso `transform` si sovrascriverebbero, e perché così la deriva resta
       * composita invece di ridipingere lo sfondo a ogni fotogramma.
       */}
      <div className="hud-backdrop__space">
        <div className="hud-backdrop__plane hud-backdrop__plane--far">
          <div className="hud-backdrop__drift" />
        </div>

        <div className="hud-backdrop__plane hud-backdrop__plane--mid">
          <svg
            className="hud-backdrop__net"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <g className="hud-backdrop__net-links">
              {LINKS.map(([from, to]) => (
                <path key={`${from}-${to}`} d={link(NODES[from]!, NODES[to]!)} />
              ))}
            </g>

            {/*
             * Impulsi che percorrono i collegamenti: un tratteggio corto su una
             * copia dello stesso percorso, con `pathLength="1"` così la lunghezza
             * del tratto è una frazione del collegamento e non un valore assoluto.
             * Durate e ritardi primi fra loro: il ciclo non torna mai in fase e
             * il movimento non si legge come ripetizione.
             */}
            <g className="hud-backdrop__net-flow">
              {LINKS.map(([from, to], index) => (
                <path
                  key={`flow-${from}-${to}`}
                  d={link(NODES[from]!, NODES[to]!)}
                  pathLength={1}
                  style={{
                    animationDuration: `${7 + (index % 6) * 1.7}s`,
                    animationDelay: `${-(index * 2.3) % 13}s`,
                  }}
                />
              ))}
            </g>

            <g className="hud-backdrop__net-nodes">
              {NODES.map((node, index) => (
                <rect
                  key={`${node.x}-${node.y}`}
                  x={node.x - 3}
                  y={node.y - 3}
                  width={6}
                  height={6}
                  style={{ animationDelay: `${index * 900}ms` }}
                />
              ))}
            </g>
          </svg>
        </div>

        <div className="hud-backdrop__plane hud-backdrop__plane--near">
          <div className="hud-backdrop__drift" />
        </div>
      </div>

      <div className="hud-backdrop__ticks hud-backdrop__ticks--left" />
      <div className="hud-backdrop__ticks hud-backdrop__ticks--right" />

      <div className="hud-backdrop__sweep" />
      <div className="hud-backdrop__grain" />

      <div className="hud-backdrop__frame">
        <span className="hud-backdrop__corner hud-backdrop__corner--tl" />
        <span className="hud-backdrop__corner hud-backdrop__corner--tr" />
        <span className="hud-backdrop__corner hud-backdrop__corner--bl" />
        <span className="hud-backdrop__corner hud-backdrop__corner--br" />
      </div>
    </div>
  );
}
