"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import styles from "./Nav.module.css";

/**
 * Transparent over the hero. Once you scroll past it, it turns into a
 * compact dark pill that tucks away while scrolling down and comes back
 * when scrolling up, so it never sits on top of what you're reading.
 */
export function Nav({ home = true }: { home?: boolean }) {
  const prefix = home ? "" : "/";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const threshold = window.innerHeight * 0.6;
      setScrolled(y > threshold);
      const delta = y - lastY;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > threshold);
        lastY = y;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={styles.nav}
      data-scrolled={scrolled}
      data-hidden={hidden}
      // Keyboard users must always be able to reach the nav.
      onFocusCapture={() => setHidden(false)}
    >
      <nav className={styles.inner} aria-label="Primary">
        <Link href="/" className={styles.mark} aria-label={`${site.name}, home`}>
          {site.initials}
        </Link>
        <ul className={styles.links}>
          <li>
            <a href={`${prefix}#work`}>Work</a>
          </li>
          <li>
            <a href={`${prefix}#about`}>About</a>
          </li>
          <li>
            <a href={`${prefix}#contact`}>Contact</a>
          </li>
        </ul>
        <a href={site.resumeUrl} className={styles.resume} target="_blank" rel="noreferrer">
          Resume <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
