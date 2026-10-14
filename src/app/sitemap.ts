import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { products } from "@/data/products";
import { projects } from "@/data/projects";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  return [
    "/",
    "/products/",
    "/projects/",
    "/about/",
    "/contact/",
    ...products.map((p) => `/products/${p.slug}/`),
    ...projects.map((p) => `/projects/${p.slug}/`),
  ].map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified: site.contentUpdatedAt,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
