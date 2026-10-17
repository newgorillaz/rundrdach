import type { MetadataRoute } from "next";
import { indexingEnabled, siteUrl } from "@/config/site";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", ...(indexingEnabled ? { allow: "/", disallow: ["/api/"] } : { disallow: "/" }) }, ...(indexingEnabled && siteUrl ? { sitemap: siteUrl + "/sitemap.xml", host: siteUrl } : {}) };
}
