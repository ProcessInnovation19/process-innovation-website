# Brand assets — Process & Innovation

Logo ufficiale e token colore per il sito (HUD dark).

## File

| File | Uso |
|------|-----|
| `logo/LOGO_P-and-I.ai` | Master vettoriale Adobe Illustrator |
| `logo/wordmark-full.png` | Wordmark completo (PROCESS & INNOVATION + monogramma) su nero |
| `logo/wordmark-full.jpg` | Stessa wordmark, JPG |
| `logo/mark-pi.png` | Solo marchio P/i geometrico |
| `logo/mark-pi-small.png` | Variante small / favicon-oriented |

Sorgente Drive: `…/RISORSE/` (LOGO_P&I.ai, Risorsa 3/7, ecc.).

## Palette (campionata dai PNG ufficiali)

| Token | Hex | Ruolo nel logo |
|-------|-----|--------|
| `--pi-black` | `#000000` | Riferimento |
| `--pi-blue-deep` | `#30549C` | “PROCESS”, arco della P, punto della i |
| `--pi-blue-bright` | `#3CA8E4` | “INNOVATION”, stelo della P/i |
| `--pi-white` | `#FFFFFF` | Outline lettere, `&` |

Questi quattro colori sono **invarianti del brand**. Non descrivono da soli il tema del sito: come vengono usati a schermo lo decide il livello di token semantici del design system.

## Tema del sito: chiaro (dal 16 agosto 2026)

Il sito usa un **tema chiaro**. La versione precedente era su fondo nero; il cambio è una decisione di direzione, documentata in `docs/06_VISUAL_AND_INTERACTION_DIRECTION.md`.

Conseguenza principale sull'uso dei colori brand:

- **`#30549C` è il colore d'accento** — testo, tratti significativi, riempimenti dei comandi;
- **`#3CA8E4` non va usato come testo o come tratto portatore di significato su fondo chiaro**: si ferma a 2,4:1. Resta un colore di segnale sulle superfici scure.

## Implicazioni UI

- Geometrie del mark (stelo arrotondato in alto, taglio diagonale in basso, arco P, quadrato i) → linguaggio pannelli/nodi.
- Tratti sottili → bordi HUD / stroke SVG.
- Non introdurre viola/gradient SaaS generici in contrasto col brand.

## Dove vivono i token

I colori brand e i token semantici del tema stanno insieme nel blocco `@theme` di `src/app/globals.css`. I componenti usano **solo** i token semantici (`--color-hud-accent`, `--color-hud-text-strong`, …), mai i colori brand diretti: cambiare tema significa riscrivere quel blocco e nient'altro.

```css
/* invarianti del brand */
--color-pi-black: #000000;
--color-pi-blue-deep: #30549c;
--color-pi-blue-bright: #3ca8e4;
--color-pi-white: #ffffff;
```
