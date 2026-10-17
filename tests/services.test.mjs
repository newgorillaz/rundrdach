import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const nativeRequire = createRequire(import.meta.url);
const sourceRoot = fileURLToPath(new URL("../src/", import.meta.url));

function loadServices() {
  const path = sourceRoot + "data/services.ts";
  const code = ts.transpileModule(readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const testModule = { exports: {} };
  runInNewContext(code, { module: testModule, exports: testModule.exports, require: nativeRequire }, { filename: path });
  return testModule.exports;
}

const {
  services,
  mainServices,
  specialistServices,
  serviceBySlug,
  relatedServices,
} = loadServices();

test("service slugs are unique and follow SEO-friendly patterns", () => {
  const slugs = services.map((service) => service.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const slug of slugs) {
    assert.match(slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  }
});

test("main and specialist groups match the intended Vienna page set", () => {
  assert.equal(mainServices.length, 4);
  assert.equal(specialistServices.length, 7);
  assert.equal(
    specialistServices.map((service) => service.slug).join(","),
    [
      "dachsanierung",
      "flachdachsanierung",
      "spenglerarbeiten",
      "dachwartung",
      "sturmschaden-dach",
      "dachfenster",
      "dachdaemmung",
    ].join(","),
  );
});

test("each service has Vienna-focused SEO fields and complete page content", () => {
  for (const service of services) {
    assert.ok(service.title.includes("Wien"), service.slug + " title should mention Wien");
    assert.ok(service.description.includes("Wien"), service.slug + " description should mention Wien");
    assert.ok(service.description.length >= 80 && service.description.length <= 170, service.slug + " meta description length");
    assert.ok(service.heading.includes("\n"), service.slug + " heading should be two lines");
    assert.ok(service.intro.length > 80);
    assert.ok(service.overview.length > 80);
    assert.equal(service.items.length, 4);
    assert.equal(service.steps.length, 4);
    assert.ok(service.factors.length >= 3);
    assert.ok(service.faqs.length >= 4);
    for (const faq of service.faqs) {
      assert.ok(faq.question.length > 10);
      assert.ok(faq.answer.length > 40);
    }
  }
});

test("related links resolve to other services and stay curated", () => {
  for (const service of services) {
    assert.ok(service.related.length >= 3 && service.related.length <= 4);
    const related = relatedServices(service);
    assert.equal(related.length, service.related.length);
    assert.ok(related.every((entry) => entry.slug !== service.slug));
    assert.ok(related.every((entry) => Boolean(serviceBySlug(entry.slug))));
  }
});

test("conservative claims avoid unverified emergency or price guarantees", () => {
  const banned = [/24\s*\/\s*7/i, /garantiert günstig/i, /festpreis für alle/i, /beste in wien/i];
  const blob = JSON.stringify(services);
  for (const pattern of banned) {
    assert.equal(pattern.test(blob), false, "unexpected claim: " + pattern);
  }
  const storm = serviceBySlug("sturmschaden-dach");
  assert.ok(storm.faqs.some((faq) => /24-Stunden-Notdienst wird derzeit nicht zugesagt/i.test(faq.answer)));
});
