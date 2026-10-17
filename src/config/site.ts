export const site = {
  name: "Rundrdach",
  city: "Wien",
  country: "Österreich",
  locale: "de_AT",
  serviceArea: ["Wien"],
  // Display format for the phone; WhatsApp expects digits only for wa.me.
  phone: "+43 681 20735980",
  whatsapp: "+4368120735980",
  email: "",
  street: "",
  postalCode: "",
  legalName: "",
  companyNumber: "",
  vatId: "",
  tradeAuthority: "",
  chamber: "",
  professionalRules: "",
  managingDirector: "",
  openingHours: "",
  socialLinks: [] as string[],
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
export const siteUrl = validSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const indexingEnabled = Boolean(siteUrl && process.env.NEXT_PUBLIC_INDEXING_ENABLED === "true" && (process.env.VERCEL_ENV === undefined || process.env.VERCEL_ENV === "production"));
export const gtmId = /^GTM-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GTM_ID ?? "") ? process.env.NEXT_PUBLIC_GTM_ID! : "";
export const contactReady = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL && process.env.CONTACT_TO_EMAIL);
export const phoneHref = /^\+?[0-9 ()/-]{7,}$/.test(site.phone) ? "tel:" + site.phone.replace(/[^+\d]/g, "") : null;
// Pre-filled German greeting keeps the first WhatsApp message concrete for Vienna roofing enquiries.
const whatsappDigits = site.whatsapp.replace(/\D/g, "");
export const whatsappHref = /^\+?\d{8,15}$/.test(site.whatsapp)
  ? "https://wa.me/" +
    whatsappDigits +
    "?text=" +
    encodeURIComponent("Guten Tag, ich interessiere mich für Dacharbeiten in Wien und hätte gerne eine kurze Beratung.")
  : null;
