import fs from "node:fs/promises";
import path from "node:path";
// Next's Windows export can write segment payloads as nested paths while
// the client requests dot-separated names (upstream issue #92339).
// Keep the exported originals and add the correctly named static payloads.
let fixed = 0;
async function walk(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.name.endsWith(".txt")) {
      const parts = path.relative("out", full).split(path.sep);
      const segment = parts.findIndex((p) => p.startsWith("__next."));
      if (segment >= 0 && segment < parts.length - 1) {
        const target = path.join(
          "out",
          ...parts.slice(0, segment),
          parts.slice(segment).join("."),
        );
        await fs.copyFile(full, target);
        fixed++;
      }
    }
  }
}
await walk("out");
console.log(
  `Static export compatibility: ${fixed} segment payloads normalized.`,
);
