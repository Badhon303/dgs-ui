import Link from "@/components/Link";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { Marquee } from "@/components/Marquee";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Motion";
import { ProductCard } from "@/components/ProductCard";
import { Gallery } from "@/components/Gallery";
import { Story } from "@/components/Story";
import { FAQ } from "@/components/FAQ";
import { ClosingCTA } from "@/components/Footer";
import { Media } from "@/components/Media";
import { products } from "@/data/products";
import { processSteps } from "@/data/site";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Architectural windows, doors & glass",
  "Windows, doors and architectural glass for considered spaces. Explore DGS window systems and real installation photography.",
  "/",
);
export default function Home() {
  return (
    <>
      <Hero />
      <section id="introduction" className="intro section-pad">
        <Reveal className="intro-top">
          <p className="eyebrow">01 / A considered opening</p>
          <span className="outline-symbol" aria-hidden="true">
            ↗
          </span>
        </Reveal>
        <Reveal className="intro-copy">
          <h2>
            A frame is just the beginning.
            <br />
            It’s what you see <em>beyond it.</em>
          </h2>
          <div>
            <p>
              Light that moves through a room. A view that draws you closer. A
              boundary that opens up possibilities.
            </p>
            <p>
              We bring windows, doors, and architectural glass into focus — with
              a thoughtful eye for the spaces they become part of.
            </p>
            <Link className="text-link" href="/about/">
              Get to know DGS
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </Reveal>
        <div className="intro-bottom">
          <span>Thoughtful systems</span>
          <span>Considered details</span>
          <span>Open possibilities</span>
          <span className="intro-bottom-last">DGS / A clearer perspective</span>
        </div>
      </section>
      <section className="systems section-pad">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">02 / The collection</p>
            <h2>
              Every space.
              <br />
              <em>Its own expression.</em>
            </h2>
          </div>
          <div>
            <p>
              A considered collection of window forms
              <br />
              and profiles. Find your starting point.
            </p>
            <Link className="text-link" href="/products/">
              Explore all systems
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </Reveal>
        <div className="product-bento">
          {products.map((p, i) => (
            <Reveal key={p.slug} className={`bento-item bento-${i}`}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>
      <section className="work section-pad">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">03 / Through our lens</p>
            <h2>
              Real spaces.
              <br />
              <em>A fresh perspective.</em>
            </h2>
          </div>
          <p>
            A closer look at architectural glass,
            <br />
            window frames, and installed details.
          </p>
        </Reveal>
        <Gallery featured />
      </section>
      <Story />
      <section className="details-section section-pad">
        <Reveal className="detail-photo">
          <Media
            id="projects-05"
            alt="Black grid-framed glass partition and doors in a bright room"
            sizes="(max-width:768px) 100vw, 50vw"
          />
          <span className="photo-label">A CLOSER LOOK / THE DETAILS</span>
        </Reveal>
        <Reveal className="details-copy">
          <p className="eyebrow">04 / Form meets function</p>
          <h2>
            The difference
            <br />
            is in the <em>details.</em>
          </h2>
          <p>
            How a frame meets a wall. How a panel sits within an opening. How a
            material catches the light. The small decisions shape the whole
            experience.
          </p>
          <div className="detail-list">
            <span>
              01 <b>Proportion & perspective</b>
              <MoveUpRight size={17} />
            </span>
            <span>
              02 <b>Frames & opening arrangements</b>
              <MoveUpRight size={17} />
            </span>
            <span>
              03 <b>Project-specific planning</b>
              <MoveUpRight size={17} />
            </span>
          </div>
          <Link className="text-link" href="/contact/">
            Talk through your ideas
            <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </section>
      <Marquee />
      <section className="process section-pad">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">05 / From idea to opening</p>
            <h2>
              A clearer way <em>forward.</em>
            </h2>
          </div>
          <p>
            Start with a conversation.
            <br />
            Build clarity, one step at a time.
          </p>
        </Reveal>
        <div className="process-grid">
          {processSteps.map((s, i) => (
            <Reveal className="process-step" key={s.title}>
              <span>0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <FAQ />
      <ClosingCTA />
    </>
  );
}

