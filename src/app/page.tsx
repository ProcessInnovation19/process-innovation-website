import { BriefingMap } from "@/components/nav/BriefingMap";

/**
 * Home: la mappa di sistema.
 *
 * Non è una landing a scorrimento — le sezioni si aprono in finestra dal
 * comando «Scopri di più» (route intercettate in `src/app/@modal/`).
 */
export default function HomePage() {
  return <BriefingMap />;
}
