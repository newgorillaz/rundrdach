export const site = {
  name: "Rundrdach",
  city: "Wien",
  country: "Österreich",
  locale: "de_AT",
  serviceArea: ["Wien"],
  // Display format for the phone; WhatsApp expects digits only for wa.me.
  phone: "+43 681 20735980",
  whatsapp: "+4368120735980",
  // Business contact — used in footer, Kontakt, Impressum and schema.
  email: "Dach2021gmbh@gmail.com",
  // Street address matches the GISA trade-licence location exactly.
  street: "Braunhirschengasse 31/1A",
  postalCode: "1150",
  legalName: "R&R Dach Profi GmbH",
  // Austrian Firmenbuch number — standard display form "FN … i".
  companyNumber: "FN 651531 i",
  // Register court for every Vienna company number.
  companyCourt: "Handelsgericht Wien",
  // Austrian VAT ID — standard form ATU + digits, no spaces.
  vatId: "ATU82318047",
  tradeAuthority: "Magistrat der Stadt Wien",
  chamber: "Wirtschaftskammer Wien, Landesinnung der Dachdecker, Glaser und Spengler",
  professionalRules: "Gewerbeordnung 1994 (GewO), abrufbar unter www.ris.bka.gv.at",
  // Managing director shown in the Impressum as the vertretungsberechtigte Person.
  managingDirector: "Samu Rupi",
  openingHours: "",
  socialLinks: [] as string[],
  // Official GISA trade licence data, shown in the Impressum and the homepage trust section.
  trade: {
    gisaNumber: "38530739",
    legalForm: "Gesellschaft mit beschränkter Haftung",
    gln: "9110037564862",
    type: "reglementiertes Gewerbe",
    wording: "Spengler verbunden mit Kupferschmiede (verbundenes Handwerk)",
    since: "26.06.2025",
    locationSince: "26.06.2025",
    municipality: "Wien",
    verifyUrl: "https://www.gisa.gv.at/abfrage",
  },
  // Set true after checking the offered materials and services with the business.
  contentApproved: false,
};

function validSiteUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !url.hostname.includes(".") || url.hostname === "localhost" || url.username || url.password) return null;
    return url.origin;
  } catch { return null; }
}

/** Production domain for canonicals, sitemap, Open Graph and JSON-LD. */
const PRODUCTION_SITE_URL = "https://www.r-und-r-dach.at";
/** Google Ads conversion ID — used for the base tag and send_to labels. */
const DEFAULT_GOOGLE_ADS_ID = "AW-18521702973";
/** Search Console HTML verification token for the production domain. */
const DEFAULT_GOOGLE_SITE_VERIFICATION = "YdFJNuk6dv7W_EJRskOmtMxzbdkI0N1M7doDMV6OBw4";

export const siteUrl = validSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ?? PRODUCTION_SITE_URL;
// Indexing stays on for production unless explicitly disabled; Vercel previews remain noindex.
export const indexingEnabled = Boolean(
  siteUrl &&
    process.env.NEXT_PUBLIC_INDEXING_ENABLED !== "false" &&
    (process.env.VERCEL_ENV === undefined || process.env.VERCEL_ENV === "production"),
);
export const gtmId = /^GTM-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GTM_ID ?? "") ? process.env.NEXT_PUBLIC_GTM_ID! : "";
// Google Ads ID from env when valid; otherwise the production account ID.
export const googleAdsId = /^AW-\d+$/.test(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "")
  ? process.env.NEXT_PUBLIC_GOOGLE_ADS_ID!
  : DEFAULT_GOOGLE_ADS_ID;
// Phone / WhatsApp / email click conversion labels from the Google Ads account.
export const adsConversions = {
  phone: `${DEFAULT_GOOGLE_ADS_ID}/As6YCJ_l760dEL2E6_9E`,
  whatsapp: `${DEFAULT_GOOGLE_ADS_ID}/uDMaCKLl760dEL2E6_9E`,
  email: `${DEFAULT_GOOGLE_ADS_ID}/IieACLDI57EdEL2E6_9E`,
} as const;
export const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || DEFAULT_GOOGLE_SITE_VERIFICATION;
export const contactReady = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL && process.env.CONTACT_TO_EMAIL);
export const phoneHref = /^\+?[0-9 ()/-]{7,}$/.test(site.phone) ? "tel:" + site.phone.replace(/[^+\d]/g, "") : null;
// Opens the visitor's mail client with the business address and a concrete subject.
export const mailtoHref = site.email
  ? "mailto:" + site.email + "?subject=" + encodeURIComponent("Anfrage Dacharbeiten Wien")
  : null;
// Pre-filled German greeting keeps the first WhatsApp message concrete for Vienna roofing enquiries.
const whatsappDigits = site.whatsapp.replace(/\D/g, "");
export const whatsappHref = /^\+?\d{8,15}$/.test(site.whatsapp)
  ? "https://wa.me/" +
    whatsappDigits +
    "?text=" +
    encodeURIComponent("Guten Tag, ich interessiere mich für Dacharbeiten in Wien und hätte gerne eine kurze Beratung.")
  : null;
