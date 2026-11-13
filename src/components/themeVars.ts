import type { CSSProperties } from "react";
import type { Theme } from "@/content/site";

/** Turns a theme object into CSS custom properties for a `.panel`. */
export function themeVars(t: Theme): CSSProperties {
  return {
    "--panel-bg": t.bg,
    "--panel-fg": t.fg,
    "--panel-muted": t.muted,
    "--panel-line": t.line,
    "--panel-accent": t.accent,
  } as CSSProperties;
}
