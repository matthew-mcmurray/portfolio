/**
 * Glyph styles for the name animation.
 *
 * FINAL_GLYPHS is the look your name lands on — one entry per character
 * of the name (including the space). Design it in Figma, then copy the
 * choices in here. SCRAMBLE_POOL is what letters flip through on the way.
 */

export const FONTS = {
  sans: "'Inter Variable', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  serif: "'Instrument Serif', Georgia, serif",
  pixel: "'Silkscreen', ui-monospace, monospace",
  stretch: "'Anybody Variable', sans-serif",
  grotesk: "'Bricolage Grotesque Variable', sans-serif",
} as const;

export type GlyphStyle = {
  font: keyof typeof FONTS;
  weight?: number;
  /** Width axis for the "stretch" font: 50 (narrow) → 150 (wide). */
  width?: number;
  italic?: boolean;
  /** Outline only, no fill. */
  outline?: boolean;
  /** Hard offset shadow in the accent color. */
  shadow?: boolean;
  /** Use the accent color. */
  accent?: boolean;
  /** Pixel font reads small; scale it to match the other caps height. */
  scale?: number;
};

/** The plain starting state */
export const BASE_GLYPH: GlyphStyle = { font: "sans", weight: 500 };

// "Matthew McMurray" === 16 entries (index 7 is the space).
export const FINAL_GLYPHS: GlyphStyle[] = [
  { font: "stretch", weight: 800, width: 150 }, // M
  { font: "serif", italic: true }, // a
  { font: "pixel", scale: 0.92 }, // t
  { font: "stretch", weight: 300, width: 50 }, // t
  { font: "sans", weight: 750 }, // h
  { font: "serif", italic: true, accent: true }, // e
  { font: "stretch", weight: 700, width: 140, shadow: true }, // w
  { font: "sans" }, // (space)
  { font: "serif" }, // M
  { font: "pixel", scale: 0.92 }, // c
  { font: "stretch", weight: 900, width: 50 }, // M
  { font: "grotesk", weight: 300 }, // u
  { font: "serif", italic: true }, // r
  { font: "stretch", weight: 500, width: 150, outline: true }, // r
  { font: "pixel", scale: 0.92, accent: true }, // a
  { font: "grotesk", weight: 800 }, // y
];

export const SCRAMBLE_POOL: GlyphStyle[] = [
  { font: "serif", italic: true },
  { font: "pixel", scale: 0.92 },
  { font: "stretch", weight: 900, width: 150 },
  { font: "grotesk", weight: 800 },
  { font: "stretch", weight: 200, width: 50 },
  { font: "serif" },
  { font: "sans", weight: 300 },
  { font: "stretch", weight: 600, width: 120, outline: true },
  { font: "grotesk", weight: 300 },
  { font: "pixel", scale: 0.92, accent: true },
];

export function glyphCss(g: GlyphStyle): React.CSSProperties {
  return {
    fontFamily: FONTS[g.font],
    fontWeight: g.weight ?? 400,
    fontStretch: g.width ? `${g.width}%` : undefined,
    fontStyle: g.italic ? "italic" : "normal",
    color: g.outline ? "transparent" : g.accent ? "var(--accent)" : undefined,
    WebkitTextStroke: g.outline ? "0.022em var(--name-ink, #111110)" : undefined,
    textShadow: g.shadow ? "0.045em 0.045em 0 var(--accent)" : undefined,
    fontSize: g.scale ? `${g.scale}em` : undefined,
  };
}
