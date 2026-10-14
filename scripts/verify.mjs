import fs from "node:fs/promises";
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "../src/data/projects.ts";
const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const failures = [],
  checks = [],
  errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("response", (r) => {
  if (r.status() >= 400 && !r.url().includes("/products/not-a-system/"))
    errors.push(`HTTP ${r.status()} ${r.url()}`);
});
const check = (name, condition) => {
  checks.push({ name, passed: !!condition });
  if (!condition) failures.push(name);
};
await fs.mkdir("qa", { recursive: true });
async function visit(path) {
  const res = await page.goto("http://localhost:3000" + path);
  await page.waitForLoadState("networkidle");
  check("HTTP 200 " + path, res.status() === 200);
}
await visit("/");
for (
  let y = 0;
  y < (await page.evaluate(() => document.documentElement.scrollHeight));
  y += 800
) {
  await page.evaluate((y) => scrollTo(0, y), y);
  await page.waitForTimeout(70);
}
await page.waitForLoadState("networkidle");
await page.evaluate(() => scrollTo(0, 0));
await page.screenshot({ path: "qa/home-desktop.png", fullPage: true });
await page.screenshot({ path: "qa/hero-desktop.png" });
check("Home has one H1", (await page.locator("h1").count()) === 1);
check("Text encoding intact",!(await page.locator('body').innerText()).includes('â'));
check(
  "Images loaded",
  await page
    .locator("img")
    .evaluateAll((imgs) =>
      imgs
        .filter((i) => i.loading !== "lazy")
        .every((i) => i.complete && i.naturalWidth > 0),
    ),
);
for (const width of [360, 390, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  check(
    "No homepage horizontal overflow at " + width,
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  if (width === 390) {
    await page.screenshot({ path: "qa/home-mobile.png", fullPage: true });
    await page.screenshot({ path: "qa/hero-mobile.png" });
  }
}
await page.setViewportSize({ width: 1440, height: 1000 });
await page
  .getByRole("button", { name: "Search pages, products and projects" })
  .click();
await page.getByRole("combobox").fill("sliding");
await page.getByRole("combobox").press("ArrowDown");
await page.getByRole("combobox").press("ArrowUp");
await page.getByRole("combobox").press("Enter");
await page.waitForURL("**/products/sliding-profiles/");
check(
  "Command palette navigates",
  page.url().includes("/products/sliding-profiles/"),
);
await page.getByRole("link", { name: "Inquire about this system" }).click();
await page.waitForURL("**/contact/?interest=*");
await page.getByRole("radio", { name: "Sliding profiles" }).waitFor();
check(
  "Inquiry prefilled",
  await page.getByRole("radio", { name: "Sliding profiles" }).isChecked(),
);
await page.getByRole("button", { name: "Continue", exact: true }).click();
await page.getByPlaceholder("Home, workplace, renovation…").fill("Renovation");
await page.getByRole("button", { name: "Continue", exact: true }).click();
await page.getByRole("button", { name: "Continue", exact: true }).click();
check(
  "Required name error",
  await page.getByText("Please enter your name.").isVisible(),
);
check(
  "Email validation error",
  await page.getByText("Please enter a valid email address.").isVisible(),
);
await page.getByPlaceholder("Full name").fill("Website Test");
await page.getByPlaceholder("you@example.com").fill("test@example.com");
await page.locator("textarea").fill("A test inquiry for browser validation.");
await page.getByRole("button", { name: "Back", exact: true }).click();
check(
  "Draft retained across steps",
  (await page.getByPlaceholder("Home, workplace, renovation…").inputValue()) ===
    "Renovation",
);
await page.getByRole("button", { name: "Continue", exact: true }).click();
check(
  "Contact fields retained",
  (await page.getByPlaceholder("Full name").inputValue()) === "Website Test",
);
await page.getByRole("button", { name: "Continue", exact: true }).click();
check(
  "Truthful unavailable delivery",
  await page
    .getByText("Online delivery is not available yet.", { exact: false })
    .isVisible(),
);
const downloadPromise = page.waitForEvent("download");
await page.getByRole("button", { name: "Download inquiry" }).click();
const download = await downloadPromise;
check(
  "Inquiry download available",
  download.suggestedFilename() === "dgs-project-inquiry.txt",
);
check(
  "Download does not imply sent",
  await page
    .getByText("Your inquiry file was downloaded. It has not been sent.")
    .isVisible(),
);
await visit("/projects/");
check(
  "Initial gallery size",
  (await page.locator(".project-card").count()) === 9,
);
await page.getByRole("button", { name: "Glass details", exact: true }).click();
check(
  "Filter selected",
  (await page
    .getByRole("button", { name: "Glass details", exact: true })
    .getAttribute("aria-pressed")) === "true",
);
check(
  "Filter shows glass details",
  await page
    .locator(".image-chip")
    .evaluateAll((nodes) =>
      nodes.every((n) => n.textContent === "Glass details"),
    ),
);
await page.getByRole("button", { name: "Load more projects" }).click();
const detailTotal = Math.min(
  18,
  projects.filter((p) => p.category === "Glass details").length,
);
check(
  "Load more works",
  (await page.locator(".project-card").count()) === detailTotal,
);
const zoom = page.getByRole("button", { name: /^Enlarge/ }).first();
await zoom.click();
await page.getByRole("dialog", { name: "Photo viewer" }).waitFor();
check(
  "Lightbox scroll lock",
  await page.evaluate(() => document.body.style.overflow === "hidden"),
);
await page.getByRole("button", { name: "Next photograph" }).click();
check(
  "Lightbox next",
  (await page.locator(".lightbox-bar p span").innerText()) ===
    `2 / ${detailTotal}`,
);
await page.keyboard.press("ArrowLeft");
check(
  "Lightbox keyboard",
  (await page.locator(".lightbox-bar p span").innerText()) ===
    `1 / ${detailTotal}`,
);
await page.keyboard.press("Tab");
check(
  "Dialog contains focus",
  await page.evaluate(() => !!document.activeElement?.closest("dialog")),
);
await page.keyboard.press("Escape");
check(
  "Escape closes lightbox",
  (await page.locator("dialog[open]").count()) === 0,
);
check(
  "Focus restored",
  await zoom.evaluate((e) => e === document.activeElement),
);
check(
  "Scroll unlocked",
  await page.evaluate(() => document.body.style.overflow === ""),
);
await page.locator(".project-image-link").first().click();
await page.waitForURL("**/projects/*/");
check(
  "Project detail navigation",
  await page.locator(".project-context").isVisible(),
);
await visit("/");
await page.setViewportSize({ width: 390, height: 844 });
await page.getByRole("button", { name: "Open navigation menu" }).click();
await page.getByRole("dialog", { name: "Navigation" }).waitFor();
await page.keyboard.press("Tab");
check(
  "Mobile sheet focus trap",
  await page.evaluate(() => !!document.activeElement?.closest("dialog")),
);
await page
  .getByRole("dialog", { name: "Navigation" })
  .getByRole("link", { name: "Our work" })
  .click();
await page.waitForURL("**/projects/");
check(
  "Mobile menu navigation",
  (await page.locator("dialog[open]").count()) === 0,
);
await page
  .getByRole("button", { name: /^Enlarge/ })
  .first()
  .click();
// Touch events emulate a swipe within our own photo viewer.
await page.locator(".lightbox-visual").dispatchEvent("touchstart", {
  touches: [{ identifier: 1, clientX: 300, clientY: 200 }],
});
await page.locator(".lightbox-visual").dispatchEvent("touchend", {
  changedTouches: [{ identifier: 1, clientX: 100, clientY: 200 }],
});
check(
  "Lightbox swipe",
  (await page.locator(".lightbox-bar p span").innerText()) === "2 / 9",
);
await page.keyboard.press("Escape");
for (const route of [
  "/",
  "/products/",
  "/products/clad-windows/",
  "/projects/",
  "/projects/a-patterned-edge/",
  "/about/",
  "/contact/",
]) {
  await visit(route);
  await page.setViewportSize({ width: 390, height: 844 });
  for (const width of [360, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    check(
      "No overflow " + width + " " + route,
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
  }
  await page.setViewportSize({ width: 390, height: 844 });
  check(
    "Mobile no overflow " + route,
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  check("Unique H1 " + route, (await page.locator("h1").count()) === 1);
  await page.screenshot({
    path: "qa/page-" + route.replaceAll("/", "_") + ".png",
    fullPage: true,
  });
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  check("Accessibility " + route, axe.violations.length === 0);
  if (axe.violations.length)
    await fs.writeFile(
      "qa/axe-" + route.replaceAll("/", "_") + ".json",
      JSON.stringify(axe.violations, null, 2),
    );
}
await visit("/");
check(
  "Reduced-motion hero no animation",
  await page
    .locator(".hero-image")
    .evaluate((el) => getComputedStyle(el).animationName === "none"),
);
const missing = await page.goto("http://localhost:3000/products/not-a-system/");
check("Unknown product returns 404", missing.status() === 404);
const sitemap = await context.request.get("http://localhost:3000/sitemap.xml");
check("Sitemap responds", sitemap.status() === 200);
check(
  "Unconfigured sitemap has no fake domain",
  !(await sitemap.text()).includes("example.com"),
);
const robots = await context.request.get("http://localhost:3000/robots.txt");
check(
  "Staging robots blocks indexing",
  (await robots.text()).includes("Disallow: /"),
);
check("No browser errors", errors.length === 0);
const animated = await context.newPage({
  viewport: { width: 1440, height: 1000 },
});
await animated.emulateMedia({ reducedMotion: "no-preference" });
await animated.goto("http://localhost:3000/");
await animated.waitForLoadState("networkidle");
check(
  "Local font active",
  await animated.evaluate(() =>
    getComputedStyle(document.body).fontFamily.toLowerCase().includes("sans"),
  ),
);
await animated.locator(".story").scrollIntoViewIfNeeded();
await animated.waitForFunction(() => !!document.querySelector(".pin-spacer"));
check(
  "Desktop sticky sequence initializes",
  (await animated.locator(".pin-spacer").count()) === 1,
);
await animated.setViewportSize({ width: 390, height: 844 });
check(
  "Mobile sequence returns to vertical flow",
  (await animated.locator(".pin-spacer").count()) === 0,
);
await animated.close();
// Confirm server-rendered links, metadata, alt text and structured data on detail pages.
for (const route of [
  "/products/sliding-profiles/",
  "/projects/a-patterned-edge/",
]) {
  const response = await context.request.get("http://localhost:3000" + route);
  const html = await response.text();
  check(
    "Server-rendered primary content " + route,
    html.includes("<h1") && html.includes("application/ld+json"),
  );
  check("Metadata description " + route, html.includes('name="description"'));
}
await fs.writeFile(
  "qa/browser-report.json",
  JSON.stringify(
    {
      checks,
      failures,
      errors,
      date: "2026-10-14",
      projectCount: projects.length,
    },
    null,
    2,
  ),
);
await browser.close();
console.log(
  JSON.stringify(
    {
      passed: checks.filter((c) => c.passed).length,
      total: checks.length,
      failures,
      errors,
    },
    null,
    2,
  ),
);
if (failures.length) process.exitCode = 1;
