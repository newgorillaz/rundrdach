import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumb, CTABand, Eyebrow } from "@/components/sections";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { projects } from "@/data/projects";
import {
  photos,
  photosByCategory,
  portfolioCategories,
  type PhotoKey,
} from "@/data/gallery";

export const metadata = pageMetadata(
  "Referenzen und Dachprojekte in Wien",
  "Portfolio von Rundrdach: Dachsanierungen, Ziegel- und Metalldächer, Abdichtung, Spenglerarbeiten und Dachstuhl — Einblicke in ausgeführte Arbeiten.",
  "/referenzen",
);

export default function PortfolioPage() {
  return (
    <>
      <section className="page-hero portfolio-hero">
        <div className="container">
          <Breadcrumb current="Referenzen" href="/referenzen" />
          <Eyebrow>EINBLICK IN UNSERE ARBEIT</Eyebrow>
          <h1>
            Dächer. Details.
            <br />
            <span className="muted-line">Perspektiven.</span>
          </h1>
          <p className="hero-description">
            Ausgewählte Projekte und Arbeitsfotos — von der Ausgangssituation bis zu den entscheidenden Details. Ohne
            erfundene Standorte oder Kundenangaben.
          </p>
          {/* Server-rendered anchor nav — no client JavaScript required. */}
          <nav className="portfolio-nav" aria-label="Portfolio-Kategorien">
            <a href="#fallstudien">Fallstudien</a>
            {portfolioCategories.map((category) => (
              <a key={category.id} href={"#" + category.id}>
                {category.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Verified before / during / after sequences for the same buildings. */}
      <section id="fallstudien" className="section case-studies-section">
        <div className="container">
          <div className="section-header">
            <div>
              <Eyebrow>FALLSTUDIEN</Eyebrow>
              <h2>Vom Ausgangspunkt zum Ergebnis.</h2>
            </div>
            <p>Nur zusammengefügt, wenn dasselbe Gebäude erkennbar ist.</p>
          </div>
          <div className="case-study-list">
            {projects.map((project) => (
              <article className="case-study" id={project.slug} key={project.slug}>
                <div className="case-study-copy">
                  <span>
                    {project.service}
                    {project.location ? " · " + project.location : ""}
                  </span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="case-study-stages">
                  {(project.stages ?? []).map((stage) => (
                    <figure className="case-study-stage" key={stage.photo.id}>
                      <ImagePlaceholder
                        src={stage.photo.src}
                        alt={stage.photo.alt}
                        className="case-study-image"
                        sizes="(max-width: 760px) 100vw, 30vw"
                        objectPosition={stage.photo.objectPosition}
                      />
                      <figcaption>{stage.label}</figcaption>
                    </figure>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Category grids — finished results ordered first in gallery.ts. */}
      {portfolioCategories.map((category) => {
        const keys = photosByCategory[category.id];
        return (
          <section id={category.id} className="section portfolio-category" key={category.id}>
            <div className="container">
              <div className="section-header">
                <div>
                  <Eyebrow>KATEGORIE</Eyebrow>
                  <h2>{category.label}</h2>
                </div>
                <Link href="#fallstudien" className="text-link">
                  Zu den Fallstudien
                </Link>
              </div>
              <div className="portfolio-grid">
                {keys.map((key: PhotoKey, i) => {
                  const photo = photos[key];
                  return (
                    <article className="project-card" key={photo.id}>
                      <ImagePlaceholder
                        src={photo.src}
                        alt={photo.alt}
                        number={String(i + 1).padStart(2, "0")}
                        className="portfolio-photo"
                        sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        objectPosition={photo.objectPosition}
                      />
                      <span>{category.label}</span>
                      <h3>{photo.caption}</h3>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      <CTABand />
    </>
  );
}
