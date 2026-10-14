import raw from "@/data/media-manifest.json";
export type Asset = (typeof raw)[number];
export const assets: Asset[] = raw;
export function asset(id: string): Asset {
  const found = assets.find((x) => x.id === id);
  if (!found) throw new Error(`Missing asset ${id}`);
  return found;
}
export function imageSrc(id: string, width = 1200) {
  const a = asset(id);
  return a.variants.find((v) => v.width >= width)?.path || a.optimizedPath;
}
