import { MapPin, Mail, Clock3, ArrowUpRight, Phone, Building2 } from "lucide-react";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumb, Eyebrow } from "@/components/sections";
import { PhoneButton } from "@/components/actions";
import { ContactForm } from "@/components/contact-form";
import { contactReady, phoneHref, site } from "@/config/site";

export const metadata = pageMetadata(
  "Kontakt und Dachangebot in Wien",
  "Planen Sie Ihr Dachprojekt in Wien mit Rundrdach. Fragen Sie Dacheindeckung, Reparatur, Abdichtung, Sanierung oder weitere Dachleistungen an.",
  "/kontakt",
);

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ leistung?: string }> }) {
  const { leistung } = await searchParams;
  return (
    <>
      <section className="page-hero contact-hero">
        <div className="container">
          <Breadcrumb current="Kontakt" href="/kontakt" />
          <Eyebrow>REDEN WIR ÜBER IHR DACH</Eyebrow>
          <h1>
            Ihr Vorhaben.
            <br />
            <span className="muted-line">Unser nächstes Gespräch.</span>
          </h1>
        </div>
      </section>
      <section className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-aside">
            <h2>
              Ein guter Anfang
              <br />
              ist eine gute Frage.
            </h2>
            <p>
              Neueindeckung, Reparatur, Abdichtung, Sanierung oder ein Spezialthema: Erzählen Sie uns, was Ihr Dach
              braucht. Wir klären den nächsten Schritt.
            </p>
            <div className="contact-details">
              {/* Registered company identity — FN and GISA for trust on the contact page. */}
              {site.legalName && (
                <div>
                  <Building2 size={21} />
                  <span>
                    <strong>Unternehmen</strong>
                    {site.legalName}
                    {(site.companyNumber || site.trade.gisaNumber) && (
                      <small>
                        {[site.companyNumber, site.trade.gisaNumber ? "GISA-Zahl " + site.trade.gisaNumber : ""]
                          .filter(Boolean)
                          .join(" · ")}
                      </small>
                    )}
                  </span>
                </div>
              )}
              <div>
                <MapPin size={21} />
                <span>
                  <strong>Einsatzgebiet</strong>
                  Wien, Österreich
                  {site.street && (
                    <small>
                      {site.street}, {site.postalCode} Wien
                    </small>
                  )}
                </span>
              </div>
              {/* Phone is listed as a contact detail, not only as a button. */}
              {phoneHref && (
                <div>
                  <Phone size={21} />
                  <span>
                    <strong>Telefon</strong>
                    <a href={phoneHref}>{site.phone}</a>
                    <small>Anruf oder WhatsApp – wir freuen uns auf Ihre Nachricht.</small>
                  </span>
                </div>
              )}
              {site.email && (
                <div>
                  <Mail size={21} />
                  <span>
                    <strong>E-Mail</strong>
                    <a href={"mailto:" + site.email}>{site.email}</a>
                  </span>
                </div>
              )}
              {site.openingHours && (
                <div>
                  <Clock3 size={21} />
                  <span>
                    <strong>Erreichbarkeit</strong>
                    {site.openingHours}
                  </span>
                </div>
              )}
            </div>
            <PhoneButton location="contact-page" />
            <div className="contact-tip">
              <span className="eyebrow">GUT ZU WISSEN</span>
              <p>
                Hilfreich sind Angaben zur Dachform, zum Zustand und zur Lage des Gebäudes. Betreten Sie das Dach für
                Fotos bitte nicht selbst.
              </p>
              <Link className="text-link" href="/leistungen">
                Alle Leistungen ansehen <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
          <ContactForm ready={contactReady} initialService={leistung} />
        </div>
      </section>
    </>
  );
}
