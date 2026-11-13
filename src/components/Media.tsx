"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { MediaItem } from "@/content/site";
import styles from "./Media.module.css";

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

type Props = MediaItem & {
  className?: string;
  /** Hint for the browser about rendered width, for responsive images. */
  sizes?: string;
  priority?: boolean;
};

/**
 * Image, autoplaying video loop, or (when `src` is empty) a placeholder slot.
 * Videos only play while visible, and never autoplay for reduced-motion users.
 */
export function Media({
  src,
  poster,
  alt,
  aspect = "16 / 10",
  position,
  className,
  sizes = "(max-width: 900px) 100vw, 50vw",
  priority,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = !!src && isVideo(src);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.controls = true;
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [video]);

  return (
    <div className={`${styles.frame} ${className ?? ""}`} style={{ aspectRatio: aspect }}>
      {!src ? (
        <div className={styles.placeholder} role="img" aria-label={`Placeholder: ${alt}`}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              d="M4 5h16v14H4zM4 15l4.5-4.5L13 15m-2-2 2.5-2.5L20 17"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.label}>{alt}</span>
          <span className={styles.hint}>Image or video slot · set src in site.ts</span>
        </div>
      ) : video ? (
        <video
          ref={videoRef}
          className={styles.fill}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
          style={{ objectPosition: position }}
        />
      ) : (
        <Image className={styles.fill} src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectPosition: position }} />
      )}
    </div>
  );
}
