"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./NameScramble.module.css";
import {
  BASE_GLYPH,
  FINAL_GLYPHS,
  FONTS,
  SCRAMBLE_POOL,
  glyphCss,
  type GlyphStyle,
} from "./glyphs";

// Timing (ms). Total ≈ HOLD + letters × STAGGER + SCRAMBLE ≈ 1.4s.
const HOLD = 260; // plain sans-serif before anything moves
const STAGGER = 48; // delay between letters starting to settle
const SCRAMBLE = 420; // how long each letter flips before landing
const FLIP_EVERY = 70; // ms per font change while flipping
const TICK = 35;
const FONT_WAIT_MAX = 800; // never wait longer than this for fonts

type Props = { text: string; className?: string };

type Phase = "base" | "running" | "done";

export function NameScramble({ text, className }: Props) {
  const chars = useMemo(() => Array.from(text), [text]);
  const finals = useMemo(
    () => chars.map((_, i) => FINAL_GLYPHS[i] ?? BASE_GLYPH),
    [chars],
  );

  const [glyphs, setGlyphs] = useState<GlyphStyle[]>(() => chars.map(() => BASE_GLYPH));
  const [phase, setPhase] = useState<Phase>("base");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setGlyphs(finals);
      setPhase("done");
      return;
    }

    let interval: number | undefined;
    let cancelled = false;

    // Load every font up front so no letter flashes a fallback mid-flip.
    const fontLoads = Object.values(FONTS).flatMap((family) => [
      document.fonts.load(`400 1em ${family}`, text),
      document.fonts.load(`italic 400 1em ${family}`, text),
    ]);
    const ready = Promise.race([
      Promise.allSettled(fontLoads),
      new Promise((r) => setTimeout(r, FONT_WAIT_MAX)),
    ]);

    ready.then(() => {
      if (cancelled) return;
      setPhase("running");
      const start = performance.now();
      // Letter order: index among non-space characters.
      let n = 0;
      const order = chars.map((c) => (c === " " ? -1 : n++));

      interval = window.setInterval(() => {
        const t = performance.now() - start;
        let allDone = true;

        const next = chars.map((c, i) => {
          const k = order[i];
          if (k < 0) return finals[i];
          const startAt = HOLD + k * (STAGGER * 0.45);
          const settleAt = HOLD + k * STAGGER + SCRAMBLE;
          if (t >= settleAt) return finals[i];
          allDone = false;
          if (t < startAt) return BASE_GLYPH;
          const step = Math.floor((t - startAt) / FLIP_EVERY);
          return SCRAMBLE_POOL[(k * 3 + step) % SCRAMBLE_POOL.length];
        });

        setGlyphs(next);
        if (allDone) {
          window.clearInterval(interval);
          setPhase("done");
        }
      }, TICK);
    });

    return () => {
      cancelled = true;
      if (interval) window.clearInterval(interval);
    };
  }, [chars, finals, text]);

  // Split into words so the name only ever wraps between first/last name.
  const words: { ch: string; i: number }[][] = [[]];
  chars.forEach((ch, i) => {
    if (ch === " ") words.push([]);
    else words[words.length - 1].push({ ch, i });
  });

  return (
    <h1 className={`${styles.name} ${className ?? ""}`} aria-label={text} data-phase={phase}>
      {words.map((word, w) => (
        <span key={w} className={styles.word} aria-hidden="true">
          {word.map(({ ch, i }) => (
            <span key={i} className={styles.slot}>
              {/* Invisible final glyph reserves the space, so nothing jumps around. */}
              <span className={styles.sizer} style={glyphCss(finals[i])}>
                {ch}
              </span>
              <span className={styles.glyph} style={glyphCss(glyphs[i])}>
                {ch}
              </span>
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
