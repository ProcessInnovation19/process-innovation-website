/**
 * Fondo vivo della mappa.
 *
 * Lo sfondo di sistema porta la profondità di tutto il sito; qui la mappa
 * aggiunge il proprio strato, e soprattutto il **movimento autonomo**: la
 * scena resta viva anche a puntatore fermo.
 *
 * - `deck`         — piattaforma prospettica le cui linee scorrono verso di noi;
 * - `motes`        — punti sospesi in deriva lenta, danno scala allo spazio;
 * - `scanlines`    — righe di scansione finissime che risalgono: l'interferenza;
 * - `interference` — banda di disturbo che attraversa il quadro a intervalli;
 * - `pulse`        — alone che respira attorno al punto di fuga;
 * - `horizon`      — dove la piattaforma incontra il fondo.
 *
 * Ogni strato in movimento ha un figlio dedicato alla deriva: il genitore porta
 * la trasformazione di profondità, il figlio l'animazione, così le due non si
 * sovrascrivono e il movimento resta composito.
 *
 * Non ha bisogno di JavaScript: legge le variabili di profondità che
 * `PointerDepth` scrive una sola volta su `:root`.
 */
export function MapAmbience() {
  return (
    <div className="map-ambience" aria-hidden="true">
      <div className="map-ambience__pulse" />

      <div className="map-ambience__deck">
        <div className="map-ambience__deck-flow" />
      </div>

      <div className="map-ambience__horizon" />

      <div className="map-ambience__motes">
        <div className="map-ambience__motes-drift" />
      </div>

      <div className="map-ambience__scanlines" />

      <div className="map-ambience__interference-field">
        <div className="map-ambience__interference" />
      </div>
    </div>
  );
}
