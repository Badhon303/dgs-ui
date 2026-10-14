import Link from "@/components/Link";
import { Gallery } from "@/components/Gallery";
import { ClosingCTA } from "@/components/Footer";
import { projects } from "@/data/projects";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Installation portfolio",
  "Explore supplied architectural window, door and glass installation photography. Filter the collection and discover each photographed view.",
  "/projects/",
  "projects-29",
);
export default function Projects() {
  return (
    <>
      <section className="page-heading section-pad">
        <p className="eyebrow">The portfolio / A collection of perspectives</p>
        <h1>
          Spaces, opened.
          <br />
          <em>Ideas, made visible.</em>
        </h1>
        <p>
          Explore window installations, glass details, and building exteriors.
          <br />
          Real photographs. A closer look at the possibilities.
        </p>
      </section>
      <section className="portfolio-page section-pad">
        <Gallery />
        <details className="crawlable-index">
          <summary>Browse every photographed view</summary>
          <div>
            {projects.map((p) => (
              <Link href={`/projects/${p.slug}/`} key={p.slug}>
                {p.title}
              </Link>
            ))}
          </div>
        </details>
        <p className="editorial-note">
          Titles describe the photographs. Project locations, dates and
          identities are not published until confirmed. Related views remain
          separate where their grouping is uncertain.
        </p>
      </section>
      <ClosingCTA />
    </>
  );
}

