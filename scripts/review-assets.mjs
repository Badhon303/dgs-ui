import fs from "node:fs/promises";
import sharp from "sharp";
import { projects } from "../src/data/projects.ts";
import { products } from "../src/data/products.ts";
const manifest = JSON.parse(
  await fs.readFile("src/data/asset-manifest.json", "utf8"),
);
const review = JSON.parse(
  await fs.readFile("src/data/asset-review.json", "utf8"),
);
const logos = [
  "Ibrahim Cardiac Hospital & Research Institute",
  "Assure Group",
  "Bashundhara Group",
  "Confidence Group",
  "Ibrahim Cardiac Hospital & Research Institute",
  "Impress Group",
  "JCX",
  "BAT Bangladesh",
  "New Hope Group",
  "NTMC",
  "OneICT",
  "Shakti",
  "S.A.I.L.",
];
for (const a of manifest) {
  const p = projects.find((p) => p.image === a.id);
  const product = products.find((p) => p.image === a.id);
  a.alt = p?.alt || product?.name + " frame cross-section illustration";
  if (a.category === "clients")
    a.alt = logos[Number(a.id.slice(-2)) - 1] + " supplied logo";
  if (a.category === "team")
    a.alt = "Supplied studio portrait; identity not confirmed";
  if (a.category === "slider")
    a.alt = [
      "Wide folding glass doors in a lit interior",
      "Black-framed sliding glass doors beneath a translucent ceiling",
      "Frosted glass partition panels with dark frames",
    ][Number(a.id.slice(-2)) - 1];
  if (a.category === "brand") a.alt = "Double Glazing Solutions supplied logo";
  if (a.category === "projects" && !p)
    a.alt =
      a.id === "projects-26"
        ? "Group seated at an interior table"
        : "Supplied promotional layout containing architectural glazing photography";
  a.focalPoint = review.focalPoints[a.id] || "50% 50%";
  a.visualCategory = p?.category || a.category;
  a.review = review.notes[a.category] || review.notes["brand-01"];
  a.placement = p?.featured
    ? "Featured portfolio"
    : a.category === "projects"
      ? p
        ? "Supporting portfolio"
        : "Excluded from public portfolio"
      : a.category === "clients" || a.category === "team"
        ? "Withheld until confirmed"
        : a.category === "products"
          ? "System collection"
          : "Brand reference";
  a.quality = {
    resolution:
      a.width < 800
        ? "Supporting placement only"
        : a.width >= 1200
          ? "Large placement suitable"
          : "Medium placement suitable",
    exposure:
      a.meanLuminance < 65
        ? "Dark scene; preserve atmosphere"
        : a.meanLuminance > 210
          ? "Bright scene; inspect highlight detail"
          : "Balanced for editorial placement",
    focus: "Visually inspected in contact sheet; no artificial detail added",
    composition:
      a.category === "projects"
        ? "Crop with subject and embedded marks preserved"
        : "Contain illustration or logo to preserve geometry",
  };
}
await fs.writeFile(
  "src/data/asset-manifest.json",
  JSON.stringify(manifest, null, 2),
);
await fs.writeFile(
  "src/data/media-manifest.json",
  JSON.stringify(
    manifest.map(
      ({
        id,
        width,
        height,
        optimizedPath,
        variants,
        alt,
        focalPoint,
        placeholder,
        category,
      }) => ({
        id,
        width,
        height,
        optimizedPath,
        variants,
        alt,
        focalPoint,
        placeholder,
        category,
      }),
    ),
  ),
);
await sharp("public/icon.svg")
  .resize(180, 180)
  .png()
  .toFile("public/apple-icon.png");
console.log(
  "Visual audit annotations, captions, focal points and app icon updated.",
);
