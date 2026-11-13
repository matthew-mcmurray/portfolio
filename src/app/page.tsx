import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Chapter } from "@/components/Chapter";
import { VisualWork } from "@/components/VisualWork";
import { AboutContact } from "@/components/AboutContact";
import { chapters } from "@/content/site";

export default function Home() {
  const total = chapters.length + 1; // + visual work

  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <div id="work">
          {chapters.map((chapter, i) => (
            <Chapter key={chapter.slug} chapter={chapter} index={i} total={total} />
          ))}
          <VisualWork index={chapters.length} total={total} />
        </div>
        <AboutContact />
      </main>
    </>
  );
}
