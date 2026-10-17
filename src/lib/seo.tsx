import type { Metadata } from "next";
import { indexingEnabled, site, siteUrl } from "@/config/site";
export function pageMetadata(title: string, description: string, path = "/"): Metadata {
  const url = siteUrl ? new URL(path, siteUrl).toString() : undefined;
  return {
    title, description,
    ...(url ? { alternates: { canonical: url } } : {}),
    robots: { index: indexingEnabled, follow: indexingEnabled },
    openGraph: { title: title + " | " + site.name, description, type: "website", locale: site.locale, siteName: site.name, ...(url ? { url } : {}) },
    twitter: { card: "summary", title, description },
  };
}
export function JsonLd({ value }: { value: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(value).replace(/</g, "\\u003c") }} />;
}
