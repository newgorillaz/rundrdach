import { pageMetadata } from "@/lib/seo";
import { LegalPage, LegalDraftNotice } from "@/components/legal-page";
import { site } from "@/config/site";

export const metadata = pageMetadata(
  "Impressum",
  "Impressum der R&R Dach Profi GmbH (Marke Rundrdach) in Wien: Firmenbuch, GISA-Gewerbeberechtigung und Kontaktangaben.",
  "/impressum",
);

export default function Page() {
  // Draft banner stays until UID and managing director are confirmed.
  const impressumIncomplete = !site.vatId || !site.managingDirector;
  const addressLine = site.street
    ? site.street + ", " + site.postalCode + " Wien, Österreich"
    : "[Vollständige Geschäftsanschrift ergänzen]";

  return (
    <LegalPage title="Impressum" href="/impressum">
      {impressumIncomplete ? <LegalDraftNotice /> : null}

      {/* Core company identity required by the Austrian Impressumspflicht. */}
      <h2>Unternehmen</h2>
      <dl className="legal-dl">
        <dt>Markenname</dt>
        <dd>Rundrdach</dd>
        <dt>Unternehmensname</dt>
        <dd>{site.legalName}</dd>
        <dt>Rechtsform</dt>
        <dd>{site.trade.legalForm}</dd>
        <dt>Anschrift</dt>
        <dd>{addressLine}</dd>
        <dt>Telefon</dt>
        <dd>{site.phone || "[Telefonnummer ergänzen]"}</dd>
        <dt>E-Mail</dt>
        <dd>{site.email || "[E-Mail-Adresse ergänzen]"}</dd>
        <dt>Firmenbuchnummer</dt>
        <dd>{site.companyNumber}</dd>
        <dt>Firmenbuchgericht</dt>
        <dd>{site.companyCourt}</dd>
        <dt>UID-Nummer</dt>
        <dd>{site.vatId || "[Soweit zutreffend ergänzen]"}</dd>
        <dt>Vertretungsberechtigte Person</dt>
        <dd>{site.managingDirector || "[Soweit erforderlich ergänzen]"}</dd>
      </dl>

      {/* Official trade licence — GISA is the public Austrian register. */}
      <h2>Gewerbeberechtigung</h2>
      <dl className="legal-dl">
        <dt>Gewerbebehörde</dt>
        <dd>{site.tradeAuthority}</dd>
        <dt>GISA-Zahl</dt>
        <dd>{site.trade.gisaNumber}</dd>
        <dt>Entstehung</dt>
        <dd>{site.trade.since}</dd>
        <dt>Gewerbeart</dt>
        <dd>{site.trade.type}</dd>
        <dt>Gewerbewortlaut</dt>
        <dd>{site.trade.wording}</dd>
        <dt>Prüfung</dt>
        <dd>
          <a href={site.trade.verifyUrl} target="_blank" rel="noopener noreferrer">
            Eintrag im GISA prüfen
          </a>
        </dd>
      </dl>

      {/* Location of the registered trade licence. */}
      <h2>Standort der Gewerbeberechtigung</h2>
      <dl className="legal-dl">
        <dt>Entstehung</dt>
        <dd>{site.trade.locationSince}</dd>
        <dt>Gemeinde</dt>
        <dd>{site.trade.municipality}</dd>
        <dt>Anschrift</dt>
        <dd>
          {site.postalCode} {site.trade.municipality}, {site.street}
        </dd>
        <dt>GLN</dt>
        <dd>{site.trade.gln}</dd>
      </dl>

      {/* Chamber membership and applicable professional rules. */}
      <h2>Kammer und Berufsrecht</h2>
      <dl className="legal-dl">
        <dt>Kammerzugehörigkeit</dt>
        <dd>{site.chamber}</dd>
        <dt>Berufsrechtliche Vorschriften</dt>
        <dd>{site.professionalRules}</dd>
      </dl>

      {/* Media ownership disclosure under Austrian MedienG. */}
      <h2>Offenlegung gemäß § 25 MedienG</h2>
      <p>
        Medieninhaber: {site.legalName}. Unternehmensgegenstand: Spengler-, Kupferschmiede- und Dacharbeiten in Wien.
        Die Website dient der Information über Leistungen und der Kontaktaufnahme.
      </p>
    </LegalPage>
  );
}
