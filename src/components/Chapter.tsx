"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Chapter as ChapterData } from "@/content/site";
import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { themeVars } from "./themeVars";
import styles from "./Chapter.module.css";
import Image from "next/image";

type Props = {
  chapter: ChapterData;
  index: number;
  total: number;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * A full-width color panel: sticky project intro on the left,
 * media + captions scrolling past on the right. The caption nearest
 * the middle of the screen is highlighted, and the counter follows along.
 */
export function Chapter({ chapter, index, total }: Props) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const titleId = `${chapter.slug}-title`;

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      // A thin band across the middle of the viewport.
      { rootMargin: "-45% 0px -45% 0px" },
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const count = chapter.items.length;

  return (
    <section
      id={chapter.slug}
      className={`panel ${styles.chapter}`}
      style={themeVars(chapter.theme)}
      aria-labelledby={titleId}
    >
      {/* Top bar — this is the strip that peeks up under the hero. */}
      <div className={`container ${styles.bar}`}>
        <span className={styles.barLabel}>
          <span className={styles.barIndex}>{pad(index + 1)}</span>
          {chapter.eyebrow}
        </span>
        <span className={styles.barCount} aria-hidden="true">
          {pad(index + 1)} / {pad(total)}
          <span className={styles.barArrow}>↓</span>
        </span>
      </div>

      <div className={`container ${styles.grid}`}>
        <aside className={styles.aside}>
          <Reveal className={styles.asideInner}>
            <div className={styles.titleRow}>
              {chapter.logo && (
                <Image
                  src={chapter.logo.src}
                  alt={chapter.logo.alt}
                  width={chapter.logo.width}
                  height={chapter.logo.height}
                  className={styles.logo}
                  data-invert={chapter.logo.invert || undefined}
                />
              )}
              <h2 id={titleId} className={styles.title}>
                {chapter.title}
              </h2>
            </div>
            {chapter.status && (
              <p className={styles.status}>
                <span className={styles.statusDot} aria-hidden="true" />
                {chapter.status}
              </p>
            )}
            <p className={styles.summary}>{chapter.summary}</p>

            <dl className={styles.meta}>
              {chapter.meta.map((m) => (
                <div key={m.label} className={styles.metaRow}>
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>

            <ul className={styles.tags} aria-label="Topics">
              {chapter.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>

            <Link href={`/work/${chapter.slug}`} className={styles.view}>
              View case study
              <span className={styles.viewIcon} aria-hidden="true">
                →
              </span>
            </Link>

            <div className={styles.progress} aria-hidden="true">
              <span className={styles.progressNum}>{pad(active + 1)}</span>
              <span className={styles.progressTrack}>
                <span
                  className={styles.progressFill}
                  style={{ transform: `scaleX(${(active + 1) / count})` }}
                />
              </span>
              <span className={styles.progressNum}>{pad(count)}</span>
            </div>
          </Reveal>
        </aside>

        <ol className={styles.items}>
          {chapter.items.map((item, i) => (
            <li
              key={i}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              data-index={i}
              data-active={i === active}
              className={styles.item}
            >
              <Reveal className={styles.media}>
                <Media {...item} sizes="(max-width: 900px) 100vw, 42vw" />
              </Reveal>
              <Reveal className={styles.caption} delay={120}>
                <div className={styles.captionInner}>
                  <span className={styles.captionNum}>{pad(i + 1)}</span>
                  <h3 className={styles.captionTitle}>{item.header}</h3>
                  <p className={styles.captionBody}>{item.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
