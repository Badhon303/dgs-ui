import { notFound } from "next/navigation";
import Link from "@/components/Link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { StoryGallery } from "@/components/Gallery";
import { Media } from "@/components/Media";
import { ClosingCTA } from "@/components/Footer";
import { metadata as meta, JsonLd, breadcrumbData } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p ? meta(p.title, p.alt, `/projects/${slug}/`, p.image) : {};
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const related = projects
    .filter((x) => x.category === p.category && x.slug !== p.slug)
    .slice(0, 3);
  return (
    <>
      <section className="project-detail section-pad">
        <div className="breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/projects/">Our work</Link>
          <span>/</span>
          <span>{p.title}</span>
        </div>
        <div className="project-title-row">
          <div>
            <p className="eyebrow">{p.category} / Photographed view</p>
            <h1>{p.title}</h1>
          </div>
          <p>
            A closer look.
            <br />A fresh point of view.
          </p>
        </div>
        <StoryGallery project={p} />
        <div className="project-context">
          <div>
            <h2>
              The opening.
              <br />
              <em>The surrounding space.</em>
            </h2>
            <p>{p.description}</p>
            <p>{p.alt}.</p>
            <Link
              className="text-link"
              href={`/contact/?project=${encodeURIComponent(p.title)}`}
            >
              Discuss a similar direction
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <div>
            <dl>
              <div>
                <dt>Collection</dt>
                <dd>{p.category}</dd>
              </div>
              <div>
                <dt>Visual reference</dt>
                <dd>Supplied installation photograph</dd>
              </div>
              <div>
                <dt>Project details</dt>
                <dd>Awaiting confirmation</dd>
              </div>
            </dl>
            <p>
              Location, project name and technical specifications have not been
              verified. This descriptive view is presented on its own until
              related photographs can be confidently grouped.
            </p>
            <Link className="text-link" href="/products/">
              Explore system options
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="related section-pad">
        <div className="section-heading">
          <h2>
            Another <em>perspective.</em>
          </h2>
          <Link className="text-link" href="/projects/">
            All photographed views
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="related-projects">
          {related.map((x) => (
            <Link key={x.slug} href={`/projects/${x.slug}/`}>
              <Media
                id={x.image}
                alt={x.alt}
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <h3>{x.title}</h3>
            </Link>
          ))}
        </div>
      </section>
      <ClosingCTA />
      <JsonLd
        data={breadcrumbData([
          { name: "Home", path: "/" },
          { name: "Our work", path: "/projects/" },
          { name: p.title, path: `/projects/${slug}/` },
        ])}
      />
    </>
  );
}

