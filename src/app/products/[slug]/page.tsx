import { notFound } from "next/navigation";
import Link from "@/components/Link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { products } from "@/data/products";
import { ImageViewer } from "@/components/ImageViewer";
import { ProductCard } from "@/components/ProductCard";
import { ClosingCTA } from "@/components/Footer";
import { metadata as meta, JsonLd, breadcrumbData } from "@/lib/seo";
import { site } from "@/data/site";
import { imageSrc } from "@/lib/media";
export const dynamicParams = false;
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  return p ? meta(p.name, p.description, `/products/${slug}/`, p.image) : {};
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <>
      <section className="product-detail section-pad">
        <div className="breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/products/">Systems</Link>
          <span>/</span>
          <span>{p.name}</span>
        </div>
        <div className="product-detail-layout">
          <div className="product-detail-image">
            <ImageViewer id={p.image} caption={`${p.name} illustration`} />
            <span className="eyebrow">
              System illustration / Supplied reference
            </span>
          </div>
          <div className="product-detail-copy">
            <p className="eyebrow">{p.eyebrow}</p>
            <h1>{p.name}</h1>
            <p className="lead">{p.description}</p>
            <p>{p.detail}</p>
            <Link
              href={`/contact/?interest=${encodeURIComponent(p.name)}`}
              className="button"
            >
              Inquire about this system
              <ArrowUpRight size={18} />
            </Link>
            <div className="spec-list">
              <h2>Applications to explore</h2>
              <ul>
                {p.applications.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
              <h2>Details to discuss</h2>
              <ul>
                {p.notes.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
              <p>
                No technical ratings or guarantees are published without
                verified specifications.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="related section-pad">
        <div className="section-heading">
          <h2>
            Other ways <em>to frame.</em>
          </h2>
          <Link href="/products/" className="text-link">
            <ArrowLeft size={17} />
            All systems
          </Link>
        </div>
        <div className="related-products">
          {products
            .filter((x) => x.slug !== p.slug)
            .slice(0, 3)
            .map((x, i) => (
              <ProductCard key={x.slug} product={x} index={i} />
            ))}
        </div>
      </section>
      <ClosingCTA />
      <JsonLd
        data={breadcrumbData([
          { name: "Home", path: "/" },
          { name: "Systems", path: "/products/" },
          { name: p.name, path: `/products/${slug}/` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.name,
          description: p.detail,
          brand: { "@type": "Brand", name: site.name },
          ...(site.url
            ? { image: new URL(imageSrc(p.image), site.url).toString() }
            : {}),
        }}
      />
    </>
  );
}

