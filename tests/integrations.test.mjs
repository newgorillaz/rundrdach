import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const nativeRequire = createRequire(import.meta.url);
const sourceRoot = fileURLToPath(new URL("../src/", import.meta.url));

function moduleLoader({ globals = {}, stubs = {} } = {}) {
  const cache = new Map();
  function load(path) {
    if (cache.has(path)) return cache.get(path).exports;
    const testModule = { exports: {} };
    cache.set(path, testModule);
    const code = ts.transpileModule(readFileSync(path, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
    const resolve = (id) => {
      if (Object.hasOwn(stubs, id)) return stubs[id];
      if (id.startsWith("@/")) return load(sourceRoot + id.slice(2) + ".ts");
      return nativeRequire(id);
    };
    runInNewContext(code, { module: testModule, exports: testModule.exports, require: resolve, process, URL, console, AbortSignal, fetch, ...globals }, { filename: path });
    return testModule.exports;
  }
  return load;
}
function trackingHarness(gtmId = "GTM-TEST123") {
  const cookies = new Map();
  const nodes = new Map();
  const scripts = [];
  let reloads = 0;
  const location = { pathname: "/dachreparatur", origin: "https://roof.test", hostname: "roof.test", protocol: "https:", reload() { reloads++; } };
  const document = {
    title: "Dachreparatur in Wien",
    getElementById(id) { return nodes.get(id) || null; },
    createElement(tag) { return { tag }; },
    head: { appendChild(node) { scripts.push(node); nodes.set(node.id, node); } },
    get cookie() { return [...cookies].map(([key, value]) => key + "=" + value).join("; "); },
    set cookie(raw) {
      const first = raw.split(";")[0];
      const split = first.indexOf("=");
      const key = first.slice(0, split), value = first.slice(split + 1);
      if (/Max-Age=0(?:;|$)/i.test(raw)) cookies.delete(key);
      else cookies.set(key, value);
    }
  };
  const window = { location, setTimeout(callback) { callback(); } };
  const api = moduleLoader({ globals: { document, window, location }, stubs: { "@/config/site": { gtmId } } })(sourceRoot + "lib/tracking.ts");
  return { api, cookies, scripts, window, get reloads() { return reloads; }, events() { return (window.dataLayer || []).filter((value) => value?.event); } };
}
const selection = (analytics, marketing) => ({ version: 1, analytics, marketing, updatedAt: Date.now() });

test("no container or measurement before a choice", () => {
  const h = trackingHarness();
  h.api.initializeConsent();
  h.api.trackEvent("phone_click", { cta_location: "hero" });
  h.api.trackPageView("/");
  assert.equal(h.scripts.length, 0);
  assert.equal(h.events().length, 0);
  assert.equal(h.window.dataLayer[0][0], "consent");
  assert.equal(h.window.dataLayer[0][2].analytics_storage, "denied");
  assert.equal(h.window.dataLayer[0][2].ad_user_data, "denied");
});

test("rejection persists without loading GTM", () => {
  const h = trackingHarness();
  h.api.applyConsent(selection(false, false));
  assert.equal(h.scripts.length, 0);
  assert.equal(h.api.readConsent().analytics, false);
  assert.equal(h.api.readConsent().marketing, false);
  h.api.trackEvent("generate_lead", { cta_location: "form" });
  assert.equal(h.events().length, 0);
});

test("statistics consent loads one container and deduplicates page views", () => {
  const h = trackingHarness();
  h.api.applyConsent(selection(true, false));
  h.api.trackPageView("/");
  h.api.trackPageView("/");
  h.api.trackPageView("/dachreparatur");
  h.api.applyConsent(selection(true, true));
  h.api.trackPageView("/dachreparatur");
  assert.equal(h.scripts.length, 1);
  const views = h.events().filter((event) => event.event === "page_view");
  assert.equal(views.length, 2);
  assert.equal(views[1].page_location, "https://roof.test/dachreparatur");
  const update = h.window.dataLayer.find((entry) => Array.isArray(entry) && entry[1] === "update");
  assert.equal(update[2].ad_storage, "denied");
});

test("marketing-only selection has no analytics page view or personal fields", () => {
  const h = trackingHarness();
  h.api.applyConsent(selection(false, true));
  h.api.trackPageView("/");
  h.api.trackEvent("whatsapp_click", { cta_location: "floating", service_type: "general" });
  assert.equal(h.events().filter((event) => event.event === "page_view").length, 0);
  const action = h.events().find((event) => event.event === "whatsapp_click");
  assert.deepEqual(Object.keys(action).sort(), ["cta_location", "event", "page_path", "service_type"]);
  assert.equal(action.page_path, "/dachreparatur");
});

test("full withdrawal removes accessible cookies, stops new events and reloads", () => {
  const h = trackingHarness();
  h.api.applyConsent(selection(true, true));
  h.cookies.set("_ga", "example");
  h.api.applyConsent(selection(false, false));
  const before = h.events().length;
  h.api.trackEvent("phone_click", { cta_location: "footer" });
  h.api.trackPageView("/");
  assert.equal(h.events().length, before);
  assert.equal(h.cookies.has("_ga"), false);
  assert.equal(h.api.readConsent().analytics, false);
  assert.equal(h.reloads, 1);
});

test("missing container ID never emits measurement", () => {
  const h = trackingHarness("");
  h.api.applyConsent(selection(true, true));
  h.api.trackPageView("/");
  h.api.trackEvent("generate_lead", { cta_location: "form" });
  assert.equal(h.scripts.length, 0);
  assert.equal(h.events().length, 0);
});

test("invalid saved choices are ignored", () => {
  const h = trackingHarness();
  h.cookies.set("rundrdach_consent_v1", "invalid");
  assert.equal(h.api.readConsent(), null);
  h.cookies.set("rundrdach_consent_v1", encodeURIComponent(JSON.stringify({ version: 1, analytics: "yes", marketing: true, updatedAt: Date.now() })));
  assert.equal(h.api.readConsent(), null);
});

const { NextRequest } = nativeRequire("next/server");
function formHarness() {
  const requests = [];
  const environment = { RESEND_API_KEY: "local-test-only", CONTACT_FROM_EMAIL: "sender@example.test", CONTACT_TO_EMAIL: "recipient@example.test" };
  const api = moduleLoader({
    globals: {
      process: { env: environment },
      fetch: async (url, options) => { requests.push({ url, body: JSON.parse(options.body) }); return { ok: true, json: async () => ({ id: "test-accepted" }) }; }
    },
    stubs: { "@/lib/rate-limit": { allowRequest: async () => true } }
  })(sourceRoot + "app/api/kontakt/route.ts");
  return { api, requests, environment };
}
function request(data, origin = "https://roof.test") {
  return new NextRequest("https://roof.test/api/kontakt", { method: "POST", headers: { origin, "content-type": "application/json" }, body: JSON.stringify(data) });
}
const validForm = { name: "Test Person", phone: "+43 123456789", email: "", service: "dachreparatur", message: "Please inspect a leaking roof in Wien.", website: "" };

test("contact endpoint rejects invalid origins, payloads and honeypots", async () => {
  const h = formHarness();
  assert.equal((await h.api.POST(request(validForm, "https://other.test"))).status, 403);
  assert.equal((await h.api.POST(request({ ...validForm, phone: "bad" }))).status, 400);
  assert.equal((await h.api.POST(request({ ...validForm, website: "spam" }))).status, 400);
  assert.equal(h.requests.length, 0);
});

test("missing delivery configuration cannot report success", async () => {
  const h = formHarness();
  delete h.environment.RESEND_API_KEY;
  assert.equal((await h.api.POST(request(validForm))).status, 503);
  assert.equal(h.requests.length, 0);
});

test("provider acceptance is required and HTML in messages is escaped", async () => {
  const h = formHarness();
  const response = await h.api.POST(request({ ...validForm, message: 'A roof <script>alert("x")</script> needs work.' }));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).success, true);
  assert.equal(h.requests.length, 1);
  assert.ok(h.requests[0].body.html.includes("&lt;script&gt;"));
  assert.ok(!h.requests[0].body.html.includes("<script>"));
});
