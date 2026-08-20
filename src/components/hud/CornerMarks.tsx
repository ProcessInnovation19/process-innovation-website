/**
 * Marker tecnici agli angoli opposti di un pannello.
 * Elementi reali: `.hud-panel` usa già `::before` per la superficie interna.
 */
export function CornerMarks() {
  return (
    <>
      <span aria-hidden="true" className="hud-corner hud-corner--tl" />
      <span aria-hidden="true" className="hud-corner hud-corner--br" />
    </>
  );
}
