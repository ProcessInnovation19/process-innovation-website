import { BriefingMap } from "@/components/nav/BriefingMap";

/**
 * Fallback dello slot `children`.
 *
 * Quando una sezione viene aperta in finestra (route intercettata), lo slot
 * `children` non ha una corrispondenza propria: senza questo file resterebbe
 * vuoto e la finestra si aprirebbe sul nulla. Qui sotto resta la mappa, che è
 * esattamente ciò da cui la finestra è stata aperta.
 *
 * Sul caricamento diretto di `/sezione` questo file non entra in gioco:
 * `children` corrisponde alla pagina intera e lo slot `@modal` va sul suo
 * `default` vuoto.
 */
export default function RootDefault() {
  return <BriefingMap />;
}
