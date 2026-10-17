import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { join } from "node:path";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const root = fileURLToPath(new URL("..", import.meta.url));
const sourceRoot = join(root, "src");
const imagesDir = join(root, "public", "images", "projekte");
const nativeRequire = createRequire(import.meta.url);

/** Expected filenames — must match files on disk and the gallery registry. */
const expectedFilenames = [
  "aco-vopsit.jpeg",
  "acop-frumos.jpeg",
  "acop-juma-2.jpeg",
  "acop-jumate-gata.jpeg",
  "acoperis-central3.jpeg",
  "acoperis.jpeg",
  "acoperix.jpeg",
  "asta444.jpeg",
  "dulgherie-3.jpeg",
  "dulgherie.jpeg",
  "hidroizolatie-2.jpeg",
  "hidroizolatie.jpeg",
  "imbinare-acop.jpeg",
  "imbinare-acoperis.jpeg",
  "inac-25.jpeg",
  "reno-acop-01.jpeg",
  "reno-acop-02.jpeg",
  "reno-acop-03.jpeg",
  "reno-acop-20.jpeg",
  "reno-acop-21.jpeg",
  "reno-acop-22.jpeg",
  "reno-acop-31.jpeg",
  "reno-acop-32.jpeg",
  "reno-acop-33.jpeg",
  "sist-pluvial-3.jpeg",
  "sist-pluvial-4.jpeg",
  "sist-pluvial.jpeg",
  "sistem-pluvial.jpeg",
  "tabla-acop.jpeg",
  "tabla.jpeg",
  "tigla-aranjata.jpeg",
  "tigla-ceramica-1.jpeg",
  "tigla-ceramica-2.jpeg",
  "tigla-metalica-05grosime.jpeg",
  "tigla-metalica.jpeg",
  "tigla-tip-solzi.jpeg.jpeg",
];

test("all 36 project photos exist in public/images/projekte", () => {
  assert.ok(existsSync(imagesDir), "images directory missing: " + imagesDir);
  const onDisk = new Set(readdirSync(imagesDir).filter((name) => /\.jpe?g$/i.test(name)));
  assert.equal(onDisk.size, 36, "expected exactly 36 jpeg files");
  for (const file of expectedFilenames) {
    assert.ok(onDisk.has(file), "missing file: " + file);
  }
});

test("gallery.ts registers every expected filename with German alt text", () => {
  const path = join(sourceRoot, "data", "gallery.ts");
  const source = readFileSync(path, "utf8");
  for (const file of expectedFilenames) {
    assert.ok(source.includes(file), "gallery.ts missing reference to " + file);
  }
  // photo(id, file, src, alt, caption, category) — alt is the 4th string argument.
  const photoCalls = source.match(/photo\(\s*"[^"]+",\s*"[^"]+",\s*\w+,\s*"[^"]{20,}"/g) || [];
  assert.ok(photoCalls.length >= 36, "expected at least 36 photo() entries with alt text, got " + photoCalls.length);
});

test("serviceImages slugs resolve to known services", () => {
  const servicesPath = join(sourceRoot, "data", "services.ts");
  const servicesCode = ts.transpileModule(readFileSync(servicesPath, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const servicesModule = { exports: {} };
  runInNewContext(
    servicesCode,
    { module: servicesModule, exports: servicesModule.exports, require: nativeRequire },
    { filename: servicesPath },
  );
  const { serviceBySlug } = servicesModule.exports;

  const gallerySource = readFileSync(join(sourceRoot, "data", "gallery.ts"), "utf8");
  // Extract keys from the serviceImages object literals.
  const slugMatches = [...gallerySource.matchAll(/^\s{2}([a-z0-9-]+):\s*\{/gm)].map((m) => m[1]);
  const serviceSlugs = slugMatches.filter((slug) =>
    [
      "dacheindeckung",
      "dachreparatur",
      "dachabdichtung",
      "dachzubehoer",
      "dachsanierung",
      "spenglerarbeiten",
      "flachdachsanierung",
    ].includes(slug),
  );
  assert.ok(serviceSlugs.length >= 7, "expected serviceImages entries");
  for (const slug of serviceSlugs) {
    assert.ok(serviceBySlug(slug), "unknown service slug in serviceImages: " + slug);
  }
});
