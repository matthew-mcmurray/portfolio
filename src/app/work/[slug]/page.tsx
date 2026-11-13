import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Media } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { chapters, site } from "@/content/site";
import { codeToHtml } from "shiki";
import styles from "./case.module.css";


type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return chapters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const chapter = chapters.find((c) => c.slug === slug);
  return chapter ? { title: `${chapter.title} — ${site.name}` } : {};
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const index = chapters.findIndex((c) => c.slug === slug);
  if (index < 0) notFound();
  
  const chapter = chapters[index];
  const cs = chapter.caseStudy;
  const next = chapters[(index + 1) % chapters.length];
  const year = chapter.meta.find((m) => m.label === "Year")?.value;
  const role = chapter.meta.find((m) => m.label === "Role")?.value;
  const heroes = Array.isArray(cs.hero) ? cs.hero : [cs.hero];
  const isPair = heroes.length > 1;

  return (
    <>
      <Nav home={false} />
      <main id="main" className={styles.page} style={{ ["--cs-accent" as string]: chapter.theme.bg }}>
        <div className={`container ${styles.top}`}>
          <Link href={`/#${chapter.slug}`} className={styles.back}>
            <span aria-hidden="true">←</span> Back to work
          </Link>
        </div>

        <header className={`container ${styles.header}`}>
          <p className={styles.eyebrow}>Case study</p>
          <h1 className={styles.title}>{chapter.title}</h1>
          <p className={styles.intro}>{cs.intro}</p>

          <div className={styles.metaRow}>
            <dl className={styles.meta}>
              <div>
                <dt>Category</dt>
                <dd>{cs.category}</dd>
              </div>
              {role && (
                <div>
                  <dt>Role</dt>
                  <dd>{role}</dd>
                </div>
              )}
              {year && (
                <div>
                  <dt>Year</dt>
                  <dd>{year}</dd>
                </div>
              )}
            </dl>
            {cs.projectUrl && (
              <a href={cs.projectUrl} className={styles.cta} target="_blank" rel="noreferrer">
                View project <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </header>

        <div className={`container ${styles.hero} ${isPair ? styles.heroPair : ""}`}>
          {heroes.map((m, i) => (
            <Reveal as="figure" key={i} delay={i * 100} className={styles.heroItem}>
              <Media
                {...m}
                sizes={isPair ? "(max-width: 800px) 100vw, 50vw" : "100vw"}
                priority={i === 0}
              />
              {m.label && <figcaption className={styles.heroLabel}>{m.label}</figcaption>}
            </Reveal>
          ))}
        </div>

        <div className={`container ${styles.sections}`}>
          {cs.sections.map(async (s) => (
            <section key={s.heading} className={styles.section}>
              <Reveal as="h2" className={styles.sectionTitle}>
                {s.heading}
              </Reveal>
              <div className={styles.sectionBody}>
                {s.body.map((p, i) => (
                  <Reveal as="p" key={i} delay={80}>
                    {p}
                  </Reveal>
                ))}
                {s.bullets && (
                  <Reveal as="ul" className={styles.bullets} delay={120}>
                    {s.bullets.map((b) => (
                      <li key={b.title}>
                        <strong>{b.title}:</strong> {b.text}
                      </li>
                    ))}
                  </Reveal>
                )}
                {s.code &&
                  (await Promise.all(
                    s.code.map(async (c) => ({
                      ...c,
                      html: await codeToHtml(c.content, { lang: c.lang ?? "javascript", theme: "github-dark-default" }),
                    })),
                  )).map((c) => (
                    <Reveal key={c.title} className={styles.snippet}>
                      <h3 className={styles.snippetTitle}>{c.title}</h3>
                      <p>{c.text}</p>
                      <figure className={styles.code}>
                        <figcaption>{c.filename}</figcaption>
                        <div dangerouslySetInnerHTML={{ __html: c.html }} />
                      </figure>
                    </Reveal>
                  ))}
                {s.media && (
                  <Reveal className={styles.sectionMedia} delay={120}>
                    <Media {...s.media} sizes="(max-width: 900px) 100vw, 60vw" />
                  </Reveal>
                )}
              </div>
            </section>
          ))}
        </div>

        {next.slug !== chapter.slug && (
          <Link
            href={`/work/${next.slug}`}
            className={styles.next}
            style={{ background: next.theme.bg, color: next.theme.fg }}
          >
            <div className="container">
              <span className={styles.nextLabel}>Next project</span>
              <span className={styles.nextTitle}>
                {next.title} <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        )}
      </main>
    </>
  );
}
