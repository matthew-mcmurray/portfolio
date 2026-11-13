"use client";

import { useRef } from "react";
import { visualWork } from "@/content/site";
import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { themeVars } from "./themeVars";
import styles from "./VisualWork.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

export function VisualWork({ index, total }: { index: number; total: number }) {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      id="visual"
      className={`panel ${styles.section}`}
      style={themeVars(visualWork.theme)}
      aria-labelledby="visual-title"
    >
      <div className={`container ${styles.bar}`}>
        <span className={styles.barLabel}>
          <span className={styles.barIndex}>{pad(index + 1)}</span>
          {visualWork.eyebrow}
        </span>
        <span className={styles.barIndex}>
          {pad(index + 1)} / {pad(total)}
        </span>
      </div>

      <div className={`container ${styles.head}`}>
        <Reveal>
          <h2 id="visual-title" className={styles.title}>
            {visualWork.title}
          </h2>
        </Reveal>
        <Reveal className={styles.headRight} delay={100}>
          <p className={styles.summary}>{visualWork.summary}</p>
          <div className={styles.controls}>
            <button type="button" onClick={() => scrollBy(-1)} aria-label="Scroll left">
              ←
            </button>
            <button type="button" onClick={() => scrollBy(1)} aria-label="Scroll right">
              →
            </button>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <ul
          ref={trackRef}
          className={styles.track}
          tabIndex={0}
          aria-label="Posters and video work, scrolls horizontally"
        >
          {visualWork.items.map((item, i) => (
            <li key={i} className={styles.card}>
              <Media {...item} sizes="(max-width: 700px) 75vw, 26vw" />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
