import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { mainServices, specialistServices } from "@/data/services";
import { leistungenExtra } from "@/data/gallery";
import { Breadcrumb, CTABand, Eyebrow, ServiceCards } from "@/components/sections";
import { ImagePlaceholder } from "@/components/image-placeholder";

// Indexable hub for all roof services: main offers + specialist SEO/ads landings.
export const metadata = pageMetadata(
  "Dachleistungen in Wien",
  "Alle Dachleistungen von Rundrdach in Wien: Dacheindeckung, Reparatur, Abdichtung, Sanierung, Spenglerarbeiten, Wartung und weitere Spezialthemen.",
  "/leistungen",
);

export default function LeistungenPage() {
  return (
    <>
      <section className="page-hero leistungen-hero">
        <div className="container">
          <Breadcrumb current="Leistungen" href="/leistungen" />
          <Eyebrow>DACHARBEITEN IN WIEN</Eyebrow>
          <h1>
            Unsere Leistungen.
            <br />
            <span className="muted-line">Klar gegliedert.</span>
          </h1>
          <p className="hero-description">
            Vier zentrale Bereiche bilden den Ausgangspunkt. Ergänzende Spezialseiten helfen bei gezielten Fragen – von
            Sanierung bis Dachfenster. Jedes Vorhaben in Wien wird individuell abgestimmt.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <Eyebrow>HAUPTLEISTUNGEN</Eyebrow>
              <h2>
                Die vier Kernbereiche.
                <br />
                Für die meisten Anfragen.
              </h2>
            </div>
            <p>
              Eindeckung, Reparatur, Abdichtung
              <br />
              und Zubehör – verständlich erklärt.
            </p>
          </div>
          <ServiceCards items={mainServices} />
        </div>
      </section>

      <section className="section leistungen-specialist">
        <div className="container">
          <div className="section-header">
            <div>
              <Eyebrow>SPEZIALTHEMEN</Eyebrow>
              <h2>
                Wenn es um ein
                <br />
                konkretes Ziel geht.
              </h2>
            </div>
            <p>
              Sanierung, Flachdach, Spenglerarbeiten,
              <br />
              Wartung und weitere Schwerpunkte.
            </p>
          </div>
          <ServiceCards items={specialistServices} />
          <p className="leistungen-note">
            Der konkrete Leistungsumfang für Ihr Gebäude wird erst nach Klärung von Zustand, Zugang und gewünschtem Ziel
            vereinbart.{" "}
            <Link href="/kontakt" className="text-link">
              Angebot anfragen <ArrowUpRight size={15} />
            </Link>
          </p>
        </div>
      </section>

      {/* Extra work illustrated with photos — no new routes, links to contact. */}
      <section className="section leistungen-extra">
        <div className="container">
          <div className="section-header">
            <div>
              <Eyebrow>WEITERE ARBEITEN</Eyebrow>
              <h2>
                Was oft dazugehört.
                <br />
                <span className="muted-line">Im Überblick.</span>
              </h2>
            </div>
            <p>
              Dachstuhl, Unterkonstruktion
              <br />
              und Beschichtung — bei Bedarf.
            </p>
          </div>
          <div className="portfolio-grid">
            {leistungenExtra.map((item, i) => (
              <article className="project-card" key={item.title}>
                <ImagePlaceholder
                  src={item.photo.src}
                  alt={item.photo.alt}
                  number={"0" + (i + 1)}
                  sizes="(max-width: 760px) 100vw, 33vw"
                  objectPosition={item.photo.objectPosition}
                />
                <span>ERGÄNZENDE ARBEIT</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link href="/kontakt" className="text-link">
                  Anfragen <ArrowUpRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
