import Link from "@/components/Link";
import { ArrowUpRight } from "lucide-react";
import { Media } from "@/components/Media";
import { ClosingCTA } from "@/components/Footer";
import { Reveal } from "@/components/Motion";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "About DGS",
  "Meet the approach behind DGS architectural windows, doors and glass. A thoughtful perspective on openings, light and project-specific details.",
  "/about/",
  "projects-59",
);
export default function About() {
  return (
    <>
      <section className="page-heading section-pad">
        <p className="eyebrow">DGS / Our perspective</p>
        <h1>
          Good spaces begin
          <br />
          with <em>a better view.</em>
        </h1>
        <p>
          Windows. Doors. Architectural glass.
          <br />A thoughtful way to connect a space to what lies beyond.
        </p>
      </section>
      <div className="about-image">
        <Media
          id="projects-59"
          alt="Panoramic black-framed windows around a sunlit room with a wood-toned floor"
          sizes="100vw"
          priority
        />
        <span className="photo-label">LIGHT CHANGES EVERYTHING.</span>
      </div>
      <section className="about-content section-pad">
        <Reveal>
          <h2>
            We see the opening.
            <br />
            And the <em>possibility.</em>
          </h2>
        </Reveal>
        <Reveal>
          <p>
            DGS — Double Glazing Solutions — brings together a collection of
            window forms, sliding profiles and architectural glass installation
            references. Our perspective begins with the relationship between a
            frame, the surrounding architecture and the way a space is used.
          </p>
          <p>
            This portfolio invites you to look closely: at daylight, at
            proportions, at how a glazed boundary can connect spaces. It is a
            starting point for a practical conversation about the right
            direction for your project.
          </p>
          <p>
            Every space has its own requirements. Dimensions, system details,
            material choices and installation arrangements should be confirmed
            against your project, with the information you need to make a
            considered decision.
          </p>
          <Link className="text-link" href="/contact/">
            Start the conversation
            <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </section>
      <section className="about-values section-pad">
        <p className="eyebrow">The principles behind the perspective</p>
        <div className="values-grid">
          {[
            {
              title: "Let light lead.",
              text: "Consider how daylight, the view and the orientation of an opening influence the space around it.",
            },
            {
              title: "Make details matter.",
              text: "Look carefully at proportions, frame arrangements and how glass meets the surrounding materials.",
            },
            {
              title: "Begin with the space.",
              text: "Explore choices against the actual opening, the intended use and the practical needs of your project.",
            },
          ].map((v, i) => (
            <Reveal key={v.title}>
              <span>0{i + 1}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <ClosingCTA />
    </>
  );
}

