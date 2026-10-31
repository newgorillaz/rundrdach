import type { Metadata } from "next";
import "@fontsource/source-sans-3/400.css";
import "@fontsource/source-sans-3/500.css";
import "@fontsource/source-sans-3/600.css";
import "@fontsource/source-sans-3/700.css";
import "@fontsource/source-serif-4/400.css";
import "@fontsource/source-serif-4/600.css";
import "@fontsource/source-serif-4/700.css";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ConsentManager } from "@/components/consent-manager";
import { FloatingEmailButton, WhatsAppButton } from "@/components/actions";
import { JsonLd } from "@/lib/seo";
import { indexingEnabled, site, siteUrl } from "@/config/site";

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: { default: "Rundrdach – Dacharbeiten in Wien", template: "%s | Rundrdach" },
  description:
    "Rundrdach in Wien: Dacheindeckung, Dachreparatur, Dachabdichtung, Dachsanierung und weitere Dachleistungen. Ihr Dachprojekt verständlich planen und ein Angebot anfragen.",
  applicationName: site.name,
  robots: { index: indexingEnabled, follow: indexingEnabled },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Schema waits for full legal address; phone alone is not enough for RoofingContractor.
  const businessReady = siteUrl && site.street && site.postalCode && site.phone && site.legalName;
  return (
    <html lang="de-AT" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">
          Zum Inhalt springen
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {/* Floating contact stack — E-Mail above WhatsApp, fixed bottom-right. */}
        <div className="floating-actions">
          <FloatingEmailButton />
          <WhatsAppButton />
        </div>
        <ConsentManager />
        {businessReady && (
          <JsonLd
            value={{
              "@context": "https://schema.org",
              "@type": "RoofingContractor",
              "@id": siteUrl + "/#business",
              name: site.name,
              legalName: site.legalName,
              url: siteUrl,
              telephone: site.phone,
              ...(site.email ? { email: site.email } : {}),
              // GLN is the official Austrian location number from the GISA entry.
              ...(site.trade.gln ? { globalLocationNumber: site.trade.gln } : {}),
              // Firmenbuch number as a structured identifier for search engines.
              ...(site.companyNumber
                ? {
                    identifier: {
                      "@type": "PropertyValue",
                      name: "Firmenbuchnummer",
                      value: site.companyNumber,
                    },
                  }
                : {}),
              address: {
                "@type": "PostalAddress",
                streetAddress: site.street,
                postalCode: site.postalCode,
                addressLocality: site.city,
                addressCountry: "AT",
              },
              areaServed: { "@type": "City", name: site.city },
              ...(site.socialLinks.length ? { sameAs: site.socialLinks } : {}),
            }}
          />
        )}
      </body>
    </html>
  );
}
