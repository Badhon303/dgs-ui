import Link from "@/components/Link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { site, navigation } from "@/data/site";
import { Magnetic } from "./Motion";
export function ClosingCTA() {
  return (
    <section className="closing section-pad">
      <p className="eyebrow">
        <span className="status-dot" /> A new perspective starts here
      </p>
      <div className="closing-row">
        <h2>
          Let’s frame
          <br />
          something <em>remarkable.</em>
        </h2>
        <Magnetic>
          <Link
            className="circle-link"
            href="/contact/"
            aria-label="Discuss your project"
          >
            <ArrowUpRight size={42} />
          </Link>
        </Magnetic>
      </div>
      <p>Bring your ideas. We’ll explore the possibilities together.</p>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer section-pad">
      <div className="footer-top">
        <Link href="/" className="wordmark" aria-label="DGS home">
          dgs
          <span className="brand-square" />
        </Link>
        <p>
          Windows. Doors. Architectural glass.
          <br />
          Architecture framed by light.
        </p>
        <div>
          {navigation
            .filter((n) => n.href !== "/")
            .map((n) => (
              <Link key={n.href} href={n.href}>
                {n.name}
              </Link>
            ))}
          <Link href="/contact/">Contact</Link>
        </div>
        <div>
          {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
          {site.phone && <a href={`tel:${site.phone}`}>{site.phone}</a>}
          {site.address && <p>{site.address}</p>}
          {site.socials.map((s) => (
            <a key={s.url} href={s.url}>
              {s.label}
              <ArrowUpRight size={14} />
            </a>
          ))}
          <a href="#top" className="back-top">
            Back to top
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
      <div className="footer-word">A clearer perspective.</div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
        <span>Considered spaces. Lasting impressions.</span>
      </div>
      {site.whatsapp && /^\+?[1-9]\d{7,14}$/.test(site.whatsapp) && (
        <a
          className="whatsapp"
          href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
          aria-label="Discuss your project on WhatsApp"
        >
          WhatsApp
          <ArrowUpRight size={15} />
        </a>
      )}
    </footer>
  );
}

