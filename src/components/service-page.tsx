import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Service } from "@/data/services";
import { siteUrl, site } from "@/config/site";
import { JsonLd } from "@/lib/seo";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { Breadcrumb, CheckList, CTABand, Eyebrow, FAQ, Process, RelatedServiceCards } from "@/components/sections";
import { QuoteButton } from "@/components/actions";
import { serviceImages } from "@/data/gallery";

export function ServicePage({ service }: { service: Service }) {
  // Optional photos from the shared gallery map — pages without an entry keep the placeholder.
  const images = serviceImages[service.slug];

  return (
    <>
      {/* Structured data for local service SEO and future Google Ads landing quality. */}
      {siteUrl && (
        <JsonLd
          value={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.description,
            serviceType: service.label,
            areaServed: { "@type": "City", name: "Wien" },
            provider: { "@type": "Organization", name: site.name, url: siteUrl },
            url: siteUrl + "/" + service.slug,
          }}
        />
      )}
      <section className="page-hero">
        <div className="container">
          <Breadcrumb current={service.label} href={"/" + service.slug} />
          <div className="service-hero-grid">
            <div>
              <Eyebrow>{service.label.toUpperCase()} IN WIEN</Eyebrow>
              <h1>
                {service.heading.split("\n").map((line, i) => (
                  <span key={line} className={i === 1 ? "muted-line" : ""}>
                    {line}
                  </span>
                ))}
              </h1>
              <p className="hero-description">{service.intro}</p>
              <QuoteButton service={service.slug} location="service-hero" label="Angebot anfragen" />
            </div>
            <ImagePlaceholder
              label={service.label + " · Wien"}
              number={service.number}
              className="service-hero-image"
              src={images?.hero.src}
              alt={images?.hero.alt ?? ""}
              sizes="(max-width: 760px) 100vw, 45vw"
              preload={Boolean(images?.hero)}
              quality={images?.hero ? 85 : 75}
              objectPosition={images?.hero.objectPosition}
            />
          </div>
        </div>
      </section>
      <section className="section overview-section">
        <div className="container overview-grid">
          <div>
            <Eyebrow>DIE LEISTUNG IM DETAIL</Eyebrow>
            <h2>{service.overviewTitle}</h2>
            <p className="large-copy">{service.overview}</p>
            <Link href="/referenzen" className="text-link">
              Zum Portfolio <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="detail-grid">
            {service.items.map((item, i) => (
              <article key={item.title}>
                <span>0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* Material / process gallery — only when the service has curated photos. */}
      {images && images.gallery.length > 0 && (
        <section className="section service-gallery-section">
          <div className="container">
            <div className="section-header">
              <div>
                <Eyebrow>EINBLICKE</Eyebrow>
                <h2>{images.galleryTitle ?? "Aus der Praxis"}</h2>
              </div>
              <Link href="/referenzen" className="text-link">
                Alle Referenzen <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="service-gallery">
              {images.gallery.map((photo) => (
                <figure className="service-gallery-item" key={photo.id}>
                  <ImagePlaceholder
                    src={photo.src}
                    alt={photo.alt}
                    className="service-gallery-image"
                    sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    objectPosition={photo.objectPosition}
                  />
                  <figcaption>{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}
      <Process items={service.steps} />
      <section className="section">
        <div className="container cost-grid">
          <div>
            <Eyebrow>TRANSPARENTE PLANUNG</Eyebrow>
            <h2>
              Jedes Dach ist anders.
              <br />
              Auch das Angebot.
            </h2>
            <p>
              Ein passendes Angebot berücksichtigt Ihr Gebäude und die tatsächlich erforderlichen Arbeiten. Diese Punkte
              beeinflussen den Leistungsumfang:
            </p>
          </div>
          <div className="factor-box">
            <CheckList items={service.factors} />
            <p>Die Ausführung wird nach Bewertung Ihres Vorhabens vereinbart.</p>
            <QuoteButton service={service.slug} location="cost-section" label="Vorhaben besprechen" className="button-dark" />
          </div>
        </div>
      </section>
      <FAQ items={service.faqs} />
      {/* Curated related links keep crawl paths strong without dumping all 11 services. */}
      <section className="section related-section">
        <div className="container">
          <div className="section-header">
            <div>
              <Eyebrow>GUT ERGÄNZT</Eyebrow>
              <h2>Was noch dazugehört.</h2>
            </div>
            <Link href="/leistungen" className="text-link">
              Alle Leistungen <ArrowUpRight size={17} />
            </Link>
          </div>
          <RelatedServiceCards service={service} />
        </div>
      </section>
      <CTABand service={service.slug} />
    </>
  );
}
