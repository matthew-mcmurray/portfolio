import { about, site } from "@/content/site";
import { Reveal } from "./Reveal";
import { CopyEmail } from "./CopyEmail";
import Image from "next/image";
import styles from "./AboutContact.module.css";

export function AboutContact() {
  const year = new Date().getFullYear();

  return (
    <section className={`panel ${styles.panel}`} aria-label="About and contact">
      <div id="about" className={`container ${styles.about}`}>
        <Reveal>
          <h2 className={styles.heading}>About Me</h2>
          <div className={styles.photo}>
            <Image
              src={about.photo.src}
              alt={about.photo.alt}
              width={1000}
              height={1168}
              sizes="320px"
              style={{
                display: "block",
                width: "100%",
                maxWidth: 250,
                height: "auto",
                marginTop: "2rem",
                borderRadius: 16,
              }}
            />
          </div>
        </Reveal>
        <div className={styles.aboutBody}>
          {about.paragraphs.map((p, i) => (
            <Reveal as="p" key={i} delay={i * 80} className={styles.paragraph}>
              {p}
            </Reveal>
          ))}

          <Reveal className={styles.toolkit} delay={160}>
            {about.toolkit.map((group) => (
              <div key={group.group}>
                <h3 className={styles.toolkitTitle}>{group.group}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      <div id="contact" className={styles.contact}>
        <div className="container">
          <Reveal>
            <p className={styles.contactEyebrow}>Contact</p>
            <h2 className={styles.contactHeading}>
              <span className={styles.headingLine}>Let&apos;s build something</span>{" "}
              <em>meaningful</em>.
            </h2>
          </Reveal>
          <Reveal delay={100} className={styles.contactRow}>
            <div className={styles.emailGroup}>
              <a href={`mailto:${site.email}`} className={styles.email}>
                {site.email}
                <span aria-hidden="true">↗</span>
              </a>
              <CopyEmail email={site.email} className={styles.copy} />
            </div>
            <ul className={styles.socials}>
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={site.resumeUrl} target="_blank" rel="noreferrer">
                  Resume
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>

      <footer className={`container ${styles.footer}`}>
        <span>
          © {year} {site.name}
        </span>
        <a href={site.sourceUrl} target="_blank" rel="noreferrer">
          Designed &amp; built by me · View source ↗
        </a>
      </footer>
    </section>
  );
}
