import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  MapPin,
  ShieldCheck,
  ScanLine,
  Layers3,
  Mail,
  Phone,
  BadgeCheck,
  Landmark,
  FileText,
  CalendarCheck,
  Hammer,
} from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { Eyebrow, ServiceCards, Process, FAQ, CTABand } from "@/components/sections";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { QuoteButton, PhoneButton, EmailButton } from "@/components/actions";
import { HomeMotion } from "@/components/home-motion";
import { SplitLines } from "@/components/split-lines";
import { homeImages } from "@/data/gallery";
import { projects } from "@/data/projects";
import { phoneHref, site } from "@/config/site";

export const metadata = pageMetadata(
  "Dacharbeiten in Wien",
  "Dacheindeckung, Dachreparatur, Dachabdichtung, Dachsanierung und weitere Dachleistungen in Wien. Entdecken Sie Rundrdach und fragen Sie Ihr Projekt an.",
);

export default function HomePage() {
  // Homepage preview: three finished results that link into the portfolio.
  const previewCards = projects.length
    ? projects.slice(0, 3).map((project) => ({
        key: project.slug,
        src: project.image,
        alt: project.alt,
        objectPosition: project.objectPosition,
        meta: project.service + (project.location ? " · " + project.location : ""),
        title: project.title,
        description: project.description,
        href: "/referenzen#" + project.slug,
      }))
    : homeImages.preview.map((photo) => ({
        key: photo.id,
        src: photo.src,
        alt: photo.alt,
        objectPosition: photo.objectPosition,
        meta: photo.caption,
        title: photo.caption,
        description: undefined as string | undefined,
        href: "/referenzen",
      }));

  // Marquee phrase — company identity repeated for scroll-driven strip.
  const marqueePhrase =
    (site.legalName || "Rundrdach").toUpperCase() +
    " · DACHARBEITEN IN WIEN · " +
    (site.street ? site.street.toUpperCase() + ", " + site.postalCode + " WIEN · " : "") +
    (site.email ? site.email.toUpperCase() + " · " : "");

  return (
    <HomeMotion>
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div data-hero="eyebrow">
              <Eyebrow>RUND UM IHR DACH. IN WIEN.</Eyebrow>
            </div>
            <h1>
              {/* Masked line reveals — SplitLines wraps each line for GSAP. */}
              <span data-hero="line">
                <SplitLines>
                  Dacharbeiten
                  <br />
                  in Wien.
                  <br />
                  <span className="muted-line">Klar geplant. Sorgfältig umgesetzt.</span>
                </SplitLines>
              </span>
            </h1>
            <p className="hero-description" data-hero="copy">
              Rundrdach ist Ihr Ansprechpartner für Dacharbeiten in Wien: von der{" "}
              <Link href="/dacheindeckung">Dacheindeckung</Link> über{" "}
              <Link href="/dachreparatur">Reparatur</Link> und{" "}
              <Link href="/dachabdichtung">Abdichtung</Link> bis zur{" "}
              <Link href="/dachsanierung">Sanierung</Link>. Wir betrachten Dachhaut, Anschlüsse und
              Entwässerung gemeinsam – und erklären Ihnen verständlich, was Ihr Gebäude braucht. Der nächste Schritt
              beginnt mit einem Gespräch oder einem Anruf.
            </p>
            <div className="hero-buttons" data-hero="buttons">
              <QuoteButton location="home-hero" label="Projekt anfragen" />
              <PhoneButton location="home-hero" />
              <EmailButton location="home-hero" />
            </div>
            <Link href="#leistungen" className="hero-scroll" data-hero="scroll">
              <span>
                <ArrowDown size={16} />
              </span>
              UNSERE LEISTUNGEN ENTDECKEN
            </Link>
          </div>
          <div className="hero-visual">
            {/* Primary finished-house photo — LCP hero with higher quality and preload. */}
            <div data-hero="photo" data-parallax="0.12" className="hero-parallax-frame">
              <ImagePlaceholder
                src={homeImages.hero.src}
                alt={homeImages.hero.alt}
                className="hero-placeholder hero-photo-main"
                sizes="(max-width: 760px) 100vw, 48vw"
                preload
                quality={85}
                objectPosition={homeImages.hero.objectPosition}
              />
            </div>
            {/* Secondary craft photo stacked for a photographic, less template-like hero. */}
            <div className="hero-photo-secondary" data-hero="photo-2" data-parallax="0.2">
              <ImagePlaceholder
                src={homeImages.heroSecondary.src}
                alt={homeImages.heroSecondary.alt}
                className="hero-placeholder-secondary"
                sizes="(max-width: 760px) 40vw, 18vw"
                quality={75}
                objectPosition={homeImages.heroSecondary.objectPosition}
              />
            </div>
            {/* Company identity — legal name and address for client visibility. */}
            <div className="location-label" data-hero="label">
              <MapPin size={18} />
              <div>
                <strong>{site.legalName || "Hier zu Hause."}</strong>
                <span>
                  {site.street
                    ? site.street + " · " + site.postalCode + " Wien"
                    : "Wien, Österreich"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="value-strip">
        <div className="container" data-reveal-group>
          <div data-reveal-item>
            <ScanLine size={23} strokeWidth={1.4} />
            <span>Das Dach als Ganzes betrachten.</span>
          </div>
          <div data-reveal-item>
            <Layers3 size={23} strokeWidth={1.4} />
            <span>Die passende Ausführung planen.</span>
          </div>
          <div data-reveal-item>
            <ShieldCheck size={23} strokeWidth={1.4} />
            <span>Auf die Details achten.</span>
          </div>
        </div>
      </div>

      {/* Austrian trust block — Firmenbuch and GISA make the business verifiable. */}
      <section className="section trust-section">
        <div className="container trust-layout">
          <div className="trust-copy" data-reveal>
            <Eyebrow>GEPRÜFT &amp; EINGETRAGEN</Eyebrow>
            <h2 data-split>
              <SplitLines>
                Eingetragener Fachbetrieb.
                <br />
                In Wien zu Hause.
              </SplitLines>
            </h2>
            <p>
              Die {site.legalName} ist ein im Firmenbuch eingetragenes Wiener Unternehmen mit aufrechter
              Gewerbeberechtigung für das reglementierte Spenglerhandwerk. Alle Angaben können Sie jederzeit selbst im
              öffentlichen Gewerbeinformationssystem (GISA) überprüfen.
            </p>
            <div className="trust-links">
              <a
                href={site.trade.verifyUrl}
                className="text-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Im GISA-Register überprüfen <ArrowUpRight size={17} />
              </a>
              <Link href="/impressum" className="text-link">
                Zum Impressum <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
          <div className="trust-grid" data-reveal-group>
            <article className="trust-card" data-reveal-item>
              <Hammer size={22} strokeWidth={1.4} aria-hidden="true" />
              <span>Gewerbe</span>
              <strong>{site.trade.wording}</strong>
            </article>
            <article className="trust-card" data-reveal-item>
              <BadgeCheck size={22} strokeWidth={1.4} aria-hidden="true" />
              <span>GISA-Zahl</span>
              <strong>{site.trade.gisaNumber}</strong>
            </article>
            <article className="trust-card" data-reveal-item>
              <FileText size={22} strokeWidth={1.4} aria-hidden="true" />
              <span>Firmenbuch</span>
              <strong>
                {site.companyNumber}
                <br />
                {site.companyCourt}
              </strong>
            </article>
            <article className="trust-card" data-reveal-item>
              <Landmark size={22} strokeWidth={1.4} aria-hidden="true" />
              <span>Gewerbebehörde</span>
              <strong>{site.tradeAuthority}</strong>
            </article>
            <article className="trust-card" data-reveal-item>
              <CalendarCheck size={22} strokeWidth={1.4} aria-hidden="true" />
              <span>Gewerbe seit</span>
              <strong>{site.trade.since}</strong>
            </article>
            <article className="trust-card" data-reveal-item>
              <MapPin size={22} strokeWidth={1.4} aria-hidden="true" />
              <span>Standort</span>
              <strong>
                {site.street}
                <br />
                {site.postalCode} Wien
              </strong>
            </article>
          </div>
        </div>
      </section>

      {/* Scroll-driven company marquee — reinforces legal identity with motion. */}
      <div className="identity-marquee" aria-hidden="true">
        <div className="identity-marquee-track" data-marquee>
          <span>{marqueePhrase}</span>
          <span>{marqueePhrase}</span>
        </div>
      </div>

      <section id="leistungen" className="section services-section">
        <div className="container">
          <div className="section-header" data-reveal>
            <div>
              <Eyebrow>UNSERE LEISTUNGEN</Eyebrow>
              <h2 data-split>
                <SplitLines>
                  Vier Kernbereiche.
                  <br />
                  Ein Blick fürs Ganze.
                </SplitLines>
              </h2>
            </div>
            <p>
              Ob neues Dach, einzelne Reparatur oder eine neue Abdichtung: Hier beginnt Ihr Projekt in Wien. Jede
              Leistung führt zu einer eigenen Seite mit Ablauf, Details und häufigen Fragen.
            </p>
          </div>
          <ServiceCards />
          <div className="services-hub-link" data-reveal>
            <Link href="/leistungen" className="text-link">
              Alle Leistungen und Spezialthemen <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Vienna-specific reading section for on-page SEO and trust. */}
      <section className="section vienna-section">
        <div className="container vienna-grid">
          <div data-reveal>
            <Eyebrow>DACHARBEITEN IN WIEN</Eyebrow>
            <h2 data-split>
              <SplitLines>
                Wiener Dächer.
                <br />
                Vielfältig – und anspruchsvoll.
              </SplitLines>
            </h2>
          </div>
          <div className="vienna-copy" data-reveal>
            <p>
              In Wien prägen Steildächer aus der Gründerzeit und späteren Epochen ganze Straßenzüge. Ziegeldeckungen,
              Gauben und sorgfältige Anschlüsse an Kamine und Dachfenster bestimmen das Bild – und den Unterhalt. Mit
              den Jahrzehnten kommen Undichtigkeiten, alternde Unterspannbahnen oder beschädigte Firste hinzu. Eine
              gezielte <Link href="/dachreparatur">Dachreparatur</Link> kann oft ausreichen; manchmal ist eine
              umfassendere <Link href="/dachsanierung">Dachsanierung</Link> die nachhaltigere Lösung.
            </p>
            <p>
              Daneben stehen Flachdächer auf Wohn- und Gewerbebauten. Hier zählt vor allem die{" "}
              <Link href="/dachabdichtung">Abdichtung</Link>: Wasser muss kontrolliert abfließen, Anschlüsse an
              Attika und Durchdringungen müssen dicht bleiben. Entwässerung und Spenglerarbeiten gehören dazu – Rinnen,
              Fallrohre und Blechdetails schützen Fassade und Bausubstanz.
            </p>
            <p>
              Sturm, Hagel und starke Niederschläge belasten jedes Dach. Wer Schäden früh erkennt, vermeidet Folgekosten
              im Innenraum. Ob Neueindeckung, lokale Instandsetzung oder eine Beratung zum nächsten Schritt: Wir
              besprechen Ihr Vorhaben verständlich und planen die Ausführung passend zu Gebäude und Dachform.{" "}
              <Link href="/dacheindeckung">Mehr zur Dacheindeckung</Link> und zu allen weiteren Leistungen finden Sie
              auf den jeweiligen Seiten – oder direkt im Gespräch mit uns.
            </p>
          </div>
        </div>
      </section>

      {/* Four-image craft band from real project photos. */}
      <section className="section craft-band-section">
        <div className="container">
          <div className="section-header" data-reveal>
            <div>
              <Eyebrow>HANDWERK IM BILD</Eyebrow>
              <h2 data-split>
                <SplitLines>Material und Detail.</SplitLines>
              </h2>
            </div>
            <p>
              Einblicke in Deckung, Metall, Abdichtung und Spenglerarbeiten – aus ausgeführten Projekten, ohne
              gestellte Stockfotos.
            </p>
          </div>
          <div className="craft-band-grid" data-reveal-group>
            {homeImages.craftBand.map((item) => (
              <article key={item.photo.id} className="craft-band-card" data-reveal-item>
                <div data-parallax="0.14" className="parallax-frame">
                  <ImagePlaceholder
                    src={item.photo.src}
                    alt={item.photo.alt}
                    className="craft-band-image"
                    sizes="(max-width: 760px) 100vw, 25vw"
                    objectPosition={item.photo.objectPosition}
                  />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section approach-section">
        <div className="container approach-grid">
          {/* Detail photo for the craftsmanship section — lazy-loaded below the fold. */}
          <div data-reveal data-parallax="0.15" className="parallax-frame">
            <ImagePlaceholder
              src={homeImages.approach.src}
              alt={homeImages.approach.alt}
              number="02"
              className="approach-image"
              sizes="(max-width: 760px) 100vw, 45vw"
              objectPosition={homeImages.approach.objectPosition}
            />
          </div>
          <div className="approach-copy" data-reveal>
            <Eyebrow>DER RUNDRDACH ANSATZ</Eyebrow>
            <h2 data-split>
              <SplitLines>
                Nicht nur oben drauf.
                <br />
                Bis ins Detail.
              </SplitLines>
            </h2>
            <p className="large-copy">
              Ein gutes Dach entsteht im Zusammenspiel. Dachhaut, Anschlüsse und Entwässerung müssen zusammenpassen.
              Deshalb schauen wir auf das gesamte Vorhaben – und erklären die Möglichkeiten Schritt für Schritt.
            </p>
            <p>
              Wir besprechen den notwendigen Umfang und planen die Ausführung passend zu Ihrem Gebäude. Verständlich,
              nachvollziehbar und ohne unnötige Fachsprache. So wissen Sie, worauf Sie sich einlassen, bevor die Arbeit
              beginnt.
            </p>
            <Link href="/kontakt" className="text-link">
              Ihr Vorhaben besprechen <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <Process
        intro={
          <>
            Von der ersten Nachricht bis zur fertigen Arbeit:
            <br />
            ein Ablauf, den Sie nachvollziehen können.
          </>
        }
      />

      {/* Service area — Vienna only, plus Standort card with company identity. */}
      <section className="section area-section">
        <div className="container area-grid">
          <div data-reveal>
            <Eyebrow>EINSATZGEBIET</Eyebrow>
            <h2 data-split>
              <SplitLines>
                Wien.
                <br />
                <span className="muted-line">Unser Arbeitsgebiet.</span>
              </SplitLines>
            </h2>
            {/* Standort card — legal name, address, email for inquiries. */}
            <aside className="standort-card" data-reveal>
              <Eyebrow>STANDORT</Eyebrow>
              <strong className="standort-name">{site.legalName}</strong>
              <ul className="standort-list">
                {site.street && (
                  <li>
                    <MapPin size={16} aria-hidden="true" />
                    <span>
                      {site.street}
                      <br />
                      {site.postalCode}, Wien
                    </span>
                  </li>
                )}
                {site.email && (
                  <li>
                    <Mail size={16} aria-hidden="true" />
                    <a href={"mailto:" + site.email}>{site.email}</a>
                  </li>
                )}
                {phoneHref && (
                  <li>
                    <Phone size={16} aria-hidden="true" />
                    <a href={phoneHref}>{site.phone}</a>
                  </li>
                )}
              </ul>
            </aside>
          </div>
          <div className="area-copy" data-reveal>
            <p>
              Rundrdach ist in Wien für Dacharbeiten erreichbar – in allen Bezirken, sobald die Lage des Gebäudes und
              die Zugänglichkeit des Dachs geklärt sind. Ob Wohnhaus, Mehrfamilienhaus oder ein kleineres Objekt: Für
              eine sinnvolle Planung brauchen wir die genaue Adresse. So lassen sich Anfahrt, Gerüst und Ablauf realistisch
              einschätzen.
            </p>
            <p>
              Beschreiben Sie bei Ihrer Anfrage gerne Bezirk, Dachform und das beobachtete Problem. Fotos vom Boden aus
              helfen – betreten Sie das Dach dafür bitte nicht selbst. Wir melden uns und klären den nächsten Schritt.
            </p>
            <Link href="/kontakt" className="text-link">
              Jetzt anfragen <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section portfolio-preview">
        <div className="container">
          <div className="section-header" data-reveal>
            <div>
              <Eyebrow>EINBLICK INS HANDWERK</Eyebrow>
              <h2 data-split>
                <SplitLines>Das Dach im Fokus.</SplitLines>
              </h2>
            </div>
            <Link href="/referenzen" className="text-link">
              Zum Portfolio <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="portfolio-grid" data-reveal-group>
            {previewCards.map((card, i) => (
              <article key={card.key} className="project-card" data-reveal-item>
                <div data-parallax="0.1" className="parallax-frame">
                  <ImagePlaceholder
                    src={card.src}
                    alt={card.alt}
                    number={"0" + (i + 1)}
                    sizes="(max-width: 760px) 100vw, 33vw"
                    objectPosition={card.objectPosition}
                  />
                </div>
                <span>{card.meta}</span>
                <h3>{card.title}</h3>
                {card.description ? <p>{card.description}</p> : null}
                <Link href={card.href} className="text-link">
                  Mehr im Portfolio <ArrowUpRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQ
        items={[
          {
            question: "Welche Dacharbeiten bietet Rundrdach in Wien an?",
            answer:
              "Die Website informiert über Dacheindeckung, Dachreparatur, Dachabdichtung und Dachzubehör sowie ergänzende Themen wie Sanierung, Flachdach, Spenglerarbeiten, Wartung, Sturmschäden, Dachfenster und Dämmung. Der konkrete Leistungsumfang für Ihr Vorhaben wird individuell abgestimmt.",
          },
          {
            question: "Wie beginne ich eine Anfrage?",
            answer:
              "Beschreiben Sie die Art der Arbeit, die Lage des Gebäudes und die beobachteten Probleme. Sie können das Kontaktformular nutzen, anrufen oder uns über WhatsApp schreiben. Für eine konkrete Einschätzung kann eine Besichtigung erforderlich sein.",
          },
          {
            question: "Kann ich ein Angebot ohne Besichtigung erhalten?",
            answer:
              "Erste Angaben helfen bei der Einordnung. Ein belastbares Angebot benötigt jedoch ausreichend Informationen über Zustand, Aufbau und Zugänglichkeit des Dachs.",
          },
          {
            question: "Werden auch bestehende Dächer repariert?",
            answer:
              "Eine Reparatur ist bei geeigneten Voraussetzungen möglich. Die Prüfung zeigt, ob eine lokale Maßnahme ausreicht oder weitergehende Arbeiten sinnvoll sind.",
          },
          {
            question: "Ist mein Bezirk in Wien im Einsatzgebiet?",
            answer:
              "Das angegebene Einsatzgebiet ist Wien. Beschreiben Sie bei Ihrer Anfrage die Lage des Gebäudes, damit die Möglichkeiten konkret abgestimmt werden können.",
          },
          {
            question: "Wann sollte ich wegen meines Dachs Kontakt aufnehmen?",
            answer:
              "Typische Anlässe sind sichtbare Undichtigkeiten, Feuchtigkeitsflecken unter dem Dach, lose oder gebrochene Ziegel, beschädigte Rinnen, Stürme oder der Wunsch nach einer geplanten Neueindeckung bzw. Sanierung. Je früher Sie Bescheid geben, desto besser lassen sich Folgeschäden vermeiden.",
          },
          {
            question: "Was sollte ich vor einer Besichtigung vorbereiten?",
            answer:
              "Hilfreich sind die Adresse, Angaben zur Dachform, zum Baujahr soweit bekannt und eine kurze Beschreibung des Problems. Fotos vom Boden oder aus dem Dachboden unterstützen die Vorbereitung. Betreten Sie das Dach bitte nicht selbst – die sichere Begutachtung übernehmen wir vor Ort.",
          },
        ]}
      />
      <CTABand />
    </HomeMotion>
  );
}
