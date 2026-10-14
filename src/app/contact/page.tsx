import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";
import { Media } from "@/components/Media";
import { site } from "@/data/site";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Discuss your project",
  "Start your architectural window, door or glass inquiry. Share your system interest and project details with DGS.",
  "/contact/",
);
export default function Contact() {
  return (
    <section className="contact-layout section-pad">
      <div className="contact-intro">
        <p className="eyebrow">A new perspective starts here</p>
        <h1>
          Let’s open
          <br />
          <em>a conversation.</em>
        </h1>
        <p>
          A new space. A renovation. An opening you’re rethinking. Tell us what
          you have in mind.
        </p>
        <div className="contact-details">
          {site.email && (
            <a href={`mailto:${site.email}`}>
              <Mail size={18} />
              {site.email}
              <ArrowUpRight size={16} />
            </a>
          )}
          {site.phone && (
            <a href={`tel:${site.phone}`}>
              <Phone size={18} />
              {site.phone}
            </a>
          )}
          {site.address && <p>{site.address}</p>}
        </div>
        <div className="contact-visual">
          <Media
            id="projects-02"
            alt="Corner glazing and a decorative privacy screen"
            sizes="(max-width:850px) 100vw, 30vw"
          />
        </div>
      </div>
      <InquiryForm />
    </section>
  );
}
