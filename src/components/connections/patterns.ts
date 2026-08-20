import type { ConnectionEdge } from "./ConnectionField";

/**
 * Larghezza del *field* (non della viewport) sotto la quale il layout è
 * impilato verticalmente. Corrisponde grosso modo a una viewport di ~700px,
 * tenendo conto del padding di shell.
 */
export const STACKED_FIELD_WIDTH = 660;

type Tone = ConnectionEdge["tone"];

/**
 * Un hub che raggiunge più moduli.
 *
 * - Layout ampio: ventaglio hub → ogni modulo.
 * - Layout impilato: hub → primo modulo, poi catena fra moduli consecutivi.
 *   docs/06 chiede su mobile "meno linee contemporanee, connessioni più corte":
 *   la catena evita linee che attraversano l'intera sezione.
 */
export function hubEdges(
  hub: string,
  targets: string[],
  { tone = "active", stackedBelow = STACKED_FIELD_WIDTH }: { tone?: Tone; stackedBelow?: number } = {},
): ConnectionEdge[] {
  const wide: ConnectionEdge[] = targets.map((target) => ({
    from: hub,
    to: target,
    route: "vertical",
    tone,
    minFieldWidth: stackedBelow,
  }));

  const stacked: ConnectionEdge[] = [];
  const first = targets[0];

  if (first) {
    stacked.push({
      from: hub,
      to: first,
      route: "vertical",
      tone,
      maxFieldWidth: stackedBelow,
    });
  }

  for (let index = 0; index < targets.length - 1; index += 1) {
    stacked.push({
      from: targets[index]!,
      to: targets[index + 1]!,
      route: "vertical",
      tone,
      maxFieldWidth: stackedBelow,
    });
  }

  return [...wide, ...stacked];
}

/** Catena lineare fra elementi consecutivi (sequenze e progressioni). */
export function chainEdges(
  ids: string[],
  tone: Tone = "active",
  route: ConnectionEdge["route"] = "vertical",
): ConnectionEdge[] {
  const edges: ConnectionEdge[] = [];
  for (let index = 0; index < ids.length - 1; index += 1) {
    edges.push({ from: ids[index]!, to: ids[index + 1]!, route, tone });
  }
  return edges;
}
