import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Motion";
import { ClosingCTA } from "@/components/Footer";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Window systems",
  "Explore clad, gable, louvered and sash windows, plus sliding profiles. Find a window form for your architectural project.",
  "/products/",
  "products-02",
);
export default function Products() {
  return (
    <>
      <section className="page-heading section-pad">
        <p className="eyebrow">The system collection / 05 forms</p>
        <h1>
          A new frame.
          <br />
          <em>A new possibility.</em>
        </h1>
        <p>
          Explore the form. Imagine the opening. Find the starting
          <br className="desktop-break" /> point for a system shaped around your
          space.
        </p>
      </section>
      <section className="section-pad products-collection">
        <div className="product-bento">
          {products.map((p, i) => (
            <Reveal className={`bento-item bento-${i}`} key={p.slug}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
        <p className="editorial-note">
          Illustrations are supplied system references. Final dimensions,
          finishes, glazing, hardware and suitability require confirmation for
          your project.
        </p>
      </section>
      <ClosingCTA />
    </>
  );
}
