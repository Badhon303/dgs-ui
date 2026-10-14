import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { createGzip } from "node:zlib";
const root = path.resolve("out");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".webp": "image/webp",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain",
};
const port = Number(process.env.PORT || 3000);
http
  .createServer((req, res) => {
    let pathname;
    try {
      pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
    } catch {
      res.writeHead(400);
      res.end();
      return;
    }
    let file = path.resolve(root, "." + pathname);
    if (!file.startsWith(root + path.sep) && file !== root) {
      res.writeHead(403);
      res.end();
      return;
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory())
      file = path.join(file, "index.html");
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      const missing = path.join(root, "404.html");
      res.end(fs.existsSync(missing) ? fs.readFileSync(missing) : "Not found");
      return;
    }
    const gzip =
      /gzip/.test(req.headers["accept-encoding"] || "") &&
      /\.(html|js|css|json|xml|svg|txt)$/.test(file);
    res.writeHead(200, {
      "Content-Type": mime[path.extname(file)] || "application/octet-stream",
      "Cache-Control": pathname.startsWith("/_next/")
        ? "public, max-age=31536000, immutable"
        : "no-cache",
      Vary: "Accept-Encoding",
      ...(gzip ? { "Content-Encoding": "gzip" } : {}),
    });
    const stream = fs.createReadStream(file);
    if (gzip) stream.pipe(createGzip()).pipe(res);
    else stream.pipe(res);
  })
  .listen(port, "0.0.0.0", () =>
    console.log("Local: http://localhost:" + port),
  );
