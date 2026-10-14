import type { MetadataRoute } from "next";
import { site } from "@/data/site";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      ...(process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "true" || !site.url
        ? { disallow: "/" }
        : {}),
    },
    ...(site.url
      ? { sitemap: new URL("/sitemap.xml", site.url).toString() }
      : {}),
  };
}
