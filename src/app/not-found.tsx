import Link from "@/components/Link";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <section className="not-found section-pad">
      <p className="eyebrow">404 / A different opening</p>
      <h1>
        This view
        <br />
        <em>isn’t here.</em>
      </h1>
      <p>Explore the collection to find another perspective.</p>
      <Link className="button" href="/projects/">
        Explore our work
        <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}

