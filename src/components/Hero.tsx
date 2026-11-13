import { site } from "@/content/site";
import { NameScramble } from "./name-scramble/NameScramble";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-label="Introduction">
      <div className={`container ${styles.inner}`}>
        <p className={styles.eyebrow}>{site.role}</p>
        <NameScramble text={site.name} />
        <p className={styles.statement}>
          <span className={styles.lead}>{site.statementLead}</span> {site.statementRest}
        </p>
        <div className={styles.cta}>
          <a href="#contact" className={styles.button}>
            Get in touch
            <span aria-hidden="true" className={styles.arrow}>
              →
            </span>
          </a>
          {/*
          <p className={styles.status}>
            <span className={styles.dot} aria-hidden="true" />
            {site.availability}
          </p>
          */}
        </div>
      </div>
    </section>
  );
}
