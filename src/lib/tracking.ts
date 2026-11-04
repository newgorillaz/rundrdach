"use client";
import { adsConversions, googleAdsId, gtmId } from "@/config/site";

export type Consent = { version: 1; analytics: boolean; marketing: boolean; updatedAt: number };
export const CONSENT_COOKIE = "rundrdach_consent_v1";
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;
/** Fallback so tel/mailto still open if Google Ads is slow to acknowledge the hit. */
const ADS_NAV_TIMEOUT_MS = 2000;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __rdConsentInitialized?: boolean;
    __rdLastPage?: string;
  }
}

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  try {
    const raw = document.cookie.split("; ").find((part) => part.startsWith(CONSENT_COOKIE + "="));
    if (!raw) return null;
    const value = JSON.parse(decodeURIComponent(raw.slice(CONSENT_COOKIE.length + 1)));
    if (value.version !== 1 || typeof value.analytics !== "boolean" || typeof value.marketing !== "boolean" || typeof value.updatedAt !== "number" || Date.now() - value.updatedAt > CONSENT_MAX_AGE * 1000) return null;
    return value as Consent;
  } catch { return null; }
}

export function initializeConsent() {
  if (typeof window === "undefined" || window.__rdConsentInitialized) return;
  window.dataLayer = window.dataLayer || [];
  // Google command queue. No external tag or gtag.js is loaded here.
  window.gtag = function (...args: unknown[]) { window.dataLayer!.push(args); };
  window.gtag("consent", "default", {
    analytics_storage: "denied", ad_storage: "denied",
    ad_user_data: "denied", ad_personalization: "denied",
    functionality_storage: "granted", security_storage: "granted"
  });
  window.__rdConsentInitialized = true;
}

function removeOptionalCookies() {
  const names = document.cookie.split(";").map((entry) => entry.trim().split("=")[0]).filter((name) => /^(_ga|_gid|_gat|_gcl|_fbp|_clck|_clsk)/.test(name));
  const hostParts = location.hostname.split(".");
  for (const name of names) {
    document.cookie = name + "=; Max-Age=0; path=/";
    for (let index = 0; index < hostParts.length - 1; index++) {
      const domain = hostParts.slice(index).join(".");
      document.cookie = name + "=; Max-Age=0; path=/; domain=" + domain;
      document.cookie = name + "=; Max-Age=0; path=/; domain=." + domain;
    }
  }
}

/** Load the Google Ads gtag.js snippet once marketing consent is granted. */
function loadGoogleAdsTag() {
  if (!googleAdsId || document.getElementById("rundrdach-gtag-ads")) return;
  const script = document.createElement("script");
  script.id = "rundrdach-gtag-ads";
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + googleAdsId;
  document.head.appendChild(script);
  window.gtag?.("js", new Date());
  window.gtag?.("config", googleAdsId);
}

export function applyConsent(consent: Consent) {
  initializeConsent();
  const previous = readConsent();
  const hadGoogleTag =
    Boolean(document.getElementById("rundrdach-gtm")) ||
    Boolean(document.getElementById("rundrdach-gtag-ads"));
  // Reload after a full withdrawal so an already-loaded Ads or GTM script stops running.
  const reloadOnWithdrawal =
    !consent.analytics &&
    !consent.marketing &&
    hadGoogleTag &&
    Boolean(previous?.analytics || previous?.marketing);
  window.gtag?.("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied"
  });
  if (!consent.analytics) delete window.__rdLastPage;
  if ((!consent.analytics && previous?.analytics) || (!consent.marketing && previous?.marketing)) removeOptionalCookies();
  document.cookie = CONSENT_COOKIE + "=" + encodeURIComponent(JSON.stringify(consent)) + "; Path=/; Max-Age=" + CONSENT_MAX_AGE + "; SameSite=Lax" + (location.protocol === "https:" ? "; Secure" : "");
  // One GTM container, loaded only after permission for at least one category.
  if ((consent.analytics || consent.marketing) && gtmId && !document.getElementById("rundrdach-gtm")) {
    window.dataLayer!.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const script = document.createElement("script");
    script.id = "rundrdach-gtm";
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtm.js?id=" + gtmId;
    document.head.appendChild(script);
  }
  if (gtmId && document.getElementById("rundrdach-gtm")) {
    window.dataLayer!.push({ event: "consent_preferences_updated", analytics_consent: consent.analytics, marketing_consent: consent.marketing });
  }
  // Google Ads base tag loads only when marketing storage is allowed.
  if (consent.marketing) loadGoogleAdsTag();
  if (reloadOnWithdrawal) window.setTimeout(() => window.location.reload(), 0);
}

type EventName = "phone_click" | "whatsapp_click" | "email_click" | "quote_request_click" | "generate_lead";
export function trackEvent(event: EventName, context: { service_type?: string; cta_location: string }) {
  const consent = readConsent();
  if (!gtmId || !consent || (!consent.analytics && !consent.marketing)) return;
  // Only public route and fixed categories; no query string, name, phone or email.
  window.dataLayer?.push({ event, service_type: context.service_type || "general", cta_location: context.cta_location, page_path: location.pathname });
}

export function trackPageView(path: string) {
  if (!gtmId || !readConsent()?.analytics || window.__rdLastPage === path) return;
  window.dataLayer?.push({ event: "page_view", page_path: path, page_location: location.origin + path, page_title: document.title });
  window.__rdLastPage = path;
}

type AdsConversionType = keyof typeof adsConversions;

/**
 * Fires a Google Ads conversion when marketing consent is active.
 * For tel/mailto, delays navigation until the hit is acknowledged (or the timeout).
 * Returns false when the default click should be cancelled.
 */
export function reportAdsConversion(
  type: AdsConversionType,
  url?: string,
  event?: { preventDefault: () => void },
): boolean {
  if (!googleAdsId || !readConsent()?.marketing) return true;

  const sendTo = adsConversions[type];
  // Email conversion carries the value/currency configured in the Ads account.
  const payload: Record<string, string | number | (() => void)> = {
    send_to: sendTo,
    ...(type === "email" ? { value: 1.0, currency: "RON" } : {}),
  };

  // WhatsApp opens in a new tab — fire immediately without holding this page.
  if (type === "whatsapp" || !url) {
    window.gtag?.("event", "conversion", payload);
    return true;
  }

  event?.preventDefault();
  let navigated = false;
  const navigate = () => {
    if (navigated) return;
    navigated = true;
    window.location.href = url;
  };
  payload.event_callback = navigate;
  window.gtag?.("event", "conversion", payload);
  window.setTimeout(navigate, ADS_NAV_TIMEOUT_MS);
  return false;
}
