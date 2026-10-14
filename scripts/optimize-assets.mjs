import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";

const root = process.cwd();
const out = path.join(root, "public/media");
await fs.mkdir(out, { recursive: true });
await fs.mkdir(path.join(root, "src/data"), { recursive: true });
await fs.mkdir(path.join(root, "qa"), { recursive: true });
const manifest = [];
const hashes = new Map();
const sheets = {};
for (const folder of [
  "products",
  "projects",
  "clients",
  "slider",
  "team",
  "",
]) {
  const dir = path.join(root, "assets", folder);
  const files = (await fs.readdir(dir, { withFileTypes: true }))
    .filter((f) => f.isFile() && /\.(png|jpe?g|svg)$/i.test(f.name))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  let i = 0;
  sheets[folder || "brand"] = [];
  for (const file of files) {
    const sourcePath = path.join(dir, file.name);
    const bytes = await fs.readFile(sourcePath);
    const hash = crypto.createHash("sha256").update(bytes).digest("hex");
    const meta = await sharp(bytes).metadata();
    const id = `${folder || "brand"}-${String(++i).padStart(2, "0")}`;
    const base = file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
    const stem = folder === "projects" ? id : `${folder || "brand"}-${base}`;
    const widths = [
      ...new Set(
        [360, 720, 1200, 1920].map((w) => Math.min(w, meta.width || w)),
      ),
    ].sort((a, b) => a - b);
    const variants = [];
    for (const width of widths) {
      const name = `${stem}-${width}.webp`;
      await sharp(bytes)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80, effort: 4 })
        .toFile(path.join(out, name));
      variants.push({ width, path: `/media/${name}` });
    }
    const placeholder = await sharp(bytes)
      .rotate()
      .resize(16)
      .blur(1)
      .webp({ quality: 30 })
      .toBuffer();
    const thumb = await sharp(bytes)
      .rotate()
      .resize(240, 180, { fit: "contain", background: "#eeece5" })
      .flatten({ background: "#eeece5" })
      .jpeg()
      .toBuffer();
    sheets[folder || "brand"].push({ id, thumb, name: file.name });
    const stats = await sharp(bytes)
      .resize(64, 64, { fit: "fill" })
      .greyscale()
      .stats();
    const pixels = await sharp(bytes)
      .resize(9, 8, { fit: "fill" })
      .greyscale()
      .raw()
      .toBuffer();
    let dhash = "";
    for (let y = 0; y < 8; y++)
      for (let x = 0; x < 8; x++)
        dhash += pixels[y * 9 + x] > pixels[y * 9 + x + 1] ? "1" : "0";
    manifest.push({
      id,
      sourcePath: path.relative(root, sourcePath).replaceAll("\\", "/"),
      optimizedPath: variants.at(-1).path,
      width: meta.width,
      height: meta.height,
      orientation:
        meta.width > meta.height
          ? "landscape"
          : meta.width === meta.height
            ? "square"
            : "portrait",
      variants,
      alt: `${folder} reference ${i}`,
      category: folder || "brand",
      focalPoint: "50% 50%",
      placeholder: `data:image/webp;base64,${placeholder.toString("base64")}`,
      sha256: hash,
      duplicateOf: hashes.get(hash) || null,
      perceptualHash: dhash,
      meanLuminance: stats.channels[0].mean,
      review:
        "Visual review required; no project identity inferred from filename.",
    });
    hashes.set(hash, id);
  }
}
for (const [folder, items] of Object.entries(sheets)) {
  if (!items.length) continue;
  const cols = folder === "projects" ? 6 : 4;
  const cellW = 250,
    cellH = 218;
  const layers = [];
  items.forEach(({ thumb, id }, i) => {
    const left = (i % cols) * cellW,
      top = Math.floor(i / cols) * cellH;
    layers.push({ input: thumb, left: left + 5, top });
    layers.push({
      input: Buffer.from(
        `<svg width="250" height="38"><rect width="250" height="38" fill="#eeece5"/><text x="10" y="23" font-size="15" fill="#222">${id}</text></svg>`,
      ),
      left,
      top: top + 180,
    });
  });
  await sharp({
    create: {
      width: cols * cellW,
      height: Math.ceil(items.length / cols) * cellH,
      channels: 3,
      background: "#eeece5",
    },
  })
    .composite(layers)
    .jpeg({ quality: 88 })
    .toFile(path.join(root, `qa/${folder}-contact-sheet.jpg`));
}
for (const item of manifest) {
  item.nearDuplicates = manifest
    .filter(
      (other) =>
        other.id !== item.id &&
        other.category === item.category &&
        [...item.perceptualHash].filter((b, i) => b !== other.perceptualHash[i])
          .length <= 5,
    )
    .map((other) => other.id);
}
await fs.writeFile(
  path.join(root, "src/data/asset-manifest.json"),
  JSON.stringify(manifest, null, 2),
);
console.log(
  `Audited ${manifest.length} assets; originals preserved. ${manifest.filter((x) => x.duplicateOf).length} exact duplicates. Contact sheets in qa/.`,
);
