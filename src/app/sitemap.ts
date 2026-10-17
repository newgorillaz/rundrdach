import type { MetadataRoute } from "next";
import { indexingEnabled, siteUrl } from "@/config/site";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexingEnabled || !siteUrl) return [];
  // Hub + every service page stay discoverable when indexing is enabled.
  const pages = [
    "/",
    "/leistungen",
    ...services.map((s) => "/" + s.slug),
    "/referenzen",
    "/kontakt",
    "/impressum",
    "/datenschutz",
    "/cookies",
    "/agb",
  ];
  return pages.map((path) => ({
    url: siteUrl + (path === "/" ? "" : path),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : path === "/leistungen" || services.some((s) => "/" + s.slug === path) ? 0.8 : 0.5,
  }));
}
