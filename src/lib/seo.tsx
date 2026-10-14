import type { Metadata } from "next";
import { site } from "@/data/site";
import { imageSrc } from "@/lib/media";
export function metadata(
  title: string,
  description: string,
  path: string,
  image = "projects-59",
): Metadata {
  const url = site.url ? new URL(path, site.url).toString() : undefined;
  return {
    title,
    description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      type: "website",
      ...(url
        ? {
            url,
            images: [{ url: new URL(imageSrc(image), site.url).toString() }],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      ...(site.url
        ? { images: [new URL(imageSrc(image), site.url).toString()] }
        : {}),
    },
  };
}
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
export function breadcrumbData(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(site.url ? { item: new URL(item.path, site.url).toString() } : {}),
    })),
  };
}
