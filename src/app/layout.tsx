import type { Metadata } from "next";
import type { CSSProperties } from "react";
import localFont from "next/font/local";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { RouteTransition } from "@/components/Motion";
import { site } from "@/data/site";
import { JsonLd } from "@/lib/seo";
import "./globals.css";
const sans = localFont({
  src: "../fonts/manrope.woff2",
  variable: "--font-sans",
  display: "swap",
});
const display = localFont({
  src: [
    { path: "../fonts/cormorant.woff2", weight: "500", style: "normal" },
    { path: "../fonts/cormorant-italic.woff2", weight: "500", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
});
export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title: { default: site.fullName, template: `%s | ${site.name}` },
  description: site.description,
  robots: {
    index: !!site.url && process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
    follow: true,
  },
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body
        id="top"
        style={
          {
            "--ivory": site.colors.ivory,
            "--ink": site.colors.charcoal,
            "--bronze": site.colors.bronze,
          } as CSSProperties
        }
      >
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        <RouteTransition>
          <main id="main">{children}</main>
        </RouteTransition>
        <Footer />
        {site.url && (
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.fullName,
              url: site.url,
              ...(site.email ? { email: site.email } : {}),
              ...(site.phone ? { telephone: site.phone } : {}),
            }}
          />
        )}
      </body>
    </html>
  );
}
