import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  CloudLightning,
  Droplets,
  Hammer,
  House,
  Layers3,
  ScanLine,
  SquareStack,
  Waves,
  Wrench,
  AppWindow,
} from "lucide-react";
import { mainServices, relatedServices, type Service, type ServiceIcon } from "@/data/services";
import { QuoteButton, PhoneButton } from "@/components/actions";
import { JsonLd } from "@/lib/seo";
import { siteUrl } from "@/config/site";

// Map each service icon key to a Lucide glyph for cards and hubs.
export const icons: Record<ServiceIcon, typeof House> = {
  roof: House,
  tool: Hammer,
  water: Droplets,
  gutter: Waves,
  renovate: Wrench,
  flat: SquareStack,
  metal: Layers3,
  inspect: ScanLine,
  storm: CloudLightning,
  window: AppWindow,
  insulation: Layers3,
};

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className={"eyebrow" + (light ? " eyebrow-light" : "")}>
      <span aria-hidden="true" /> {children}
    </span>
  );
}

export function Breadcrumb({ current, href }: { current: string; href: string }) {
  return (
    <>
      <nav className="breadcrumb" aria-label="Brotkrümelnavigation">
        <Link href="/">Startseite</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{current}</span>
      </nav>
      {siteUrl && (
        <JsonLd
          value={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Startseite", item: siteUrl },
              { "@type": "ListItem", position: 2, name: current, item: siteUrl + href },
            ],
          }}
        />
      )}
    </>
  );
}

/** Service cards for a curated list; defaults to main services on the homepage. */
export function ServiceCards({
  items = mainServices,
  exclude,
}: {
  items?: Service[];
  exclude?: string;
}) {
  const list = items.filter((service) => service.slug !== exclude);
  return (
    // data-reveal-group: HomeMotion staggers children; inert on other pages.
    <div
      className={"service-grid" + (list.length > 4 ? " service-grid-wide" : "")}
      data-reveal-group
    >
      {list.map((service) => {
        const Icon = icons[service.icon];
        return (
          <Link
            href={"/" + service.slug}
            className="service-card"
            key={service.slug}
            data-reveal-item
          >
            <div className="service-card-top">
              <span className="service-number">{service.number}</span>
              <Icon size={27} strokeWidth={1.3} />
            </div>
            <div>
              <h3>{service.label}</h3>
              <p>{service.short}</p>
            </div>
            <div className="service-card-bottom">
              <span>LEISTUNG ENTDECKEN</span>
              <ArrowUpRight size={21} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

/** Related cards for a detail page using curated slugs from the service model. */
export function RelatedServiceCards({ service }: { service: Service }) {
  return <ServiceCards items={relatedServices(service)} />;
}

export function FAQ({ items, title = "Gute Fragen. Klare Antworten." }: { items: Service["faqs"]; title?: string }) {
  return (
    <section className="section faq-section">
      <div className="container faq-grid">
        <div>
          <Eyebrow>HÄUFIGE FRAGEN</Eyebrow>
          <h2>{title}</h2>
          <p>
            Sie haben eine andere Frage?
            <br />
            Wir besprechen Ihr Vorhaben gerne.
          </p>
          <Link className="text-link" href="/kontakt">
            Kontakt aufnehmen <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="faq-list">
          {items.map((faq) => (
            <details key={faq.question}>
              <summary>
                {faq.question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Default process steps — homepage can rely on these longer descriptions. */
const defaultProcessSteps = [
  {
    title: "Zuhören.",
    description:
      "Sie schildern Ihr Vorhaben: Undichtigkeit, Alterserscheinungen, geplante Neueindeckung oder eine gezielte Reparatur. Wir klären die ersten Fragen und welche Angaben für den nächsten Schritt hilfreich sind.",
  },
  {
    title: "Genau hinsehen.",
    description:
      "Das Dach und die relevanten Bauteile werden vor Ort oder anhand Ihrer Unterlagen bewertet. Zustand, Zugänglichkeit und Zusammenhänge zu Anschlüssen und Entwässerung fließen in die Einschätzung ein.",
  },
  {
    title: "Klar vereinbaren.",
    description:
      "Leistungsumfang, Ausführung und Ablauf werden verständlich besprochen. Sie wissen, was geplant ist, bevor die Arbeit beginnt – ohne Überraschungen im Kleingedruckten.",
  },
  {
    title: "Sauber umsetzen.",
    description:
      "Das vereinbarte Projekt wird fachgerecht umgesetzt. Am Ende prüfen wir gemeinsam das Ergebnis und klären offene Punkte, damit Ihr Dach wieder zuverlässig schützt.",
  },
];

export function Process({
  items,
  intro,
}: {
  items?: Service["steps"];
  /** Optional intro paragraph under the section header. */
  intro?: ReactNode;
}) {
  const steps = items ?? defaultProcessSteps;
  return (
    <section className="section process-section">
      <div className="container">
        <div className="section-header" data-reveal>
          <div>
            <Eyebrow>DER WEG ZU IHREM DACH</Eyebrow>
            <h2>
              Ein klarer Ablauf.
              <br />
              Von Anfang an.
            </h2>
          </div>
          <p>
            {intro ?? (
              <>
                Gute Dacharbeiten beginnen
                <br />
                mit einer verständlichen Planung.
              </>
            )}
          </p>
        </div>
        {/* data-reveal-group + data-draw: HomeMotion animates steps and border draw. */}
        <div className="process-grid" data-reveal-group>
          {steps.map((step, i) => (
            <div key={step.title} className="process-step" data-reveal-item>
              <span className="process-draw" data-draw aria-hidden="true" />
              <span className="step-number">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTABand({ service = "general" }: { service?: string }) {
  return (
    <section className="cta-band">
      {/* Real element replaces ::after so GSAP can rotate it with scroll. */}
      <span className="cta-deco" data-rotate aria-hidden="true" />
      <div className="container cta-inner" data-reveal>
        <div>
          <Eyebrow light>RUND UMS DACH. IN WIEN.</Eyebrow>
          <h2>
            Was braucht
            <br />
            Ihr Dach?
          </h2>
          <p>
            Erzählen Sie uns von Ihrem Vorhaben.
            <br />
            Der nächste Schritt beginnt mit einem Gespräch.
          </p>
        </div>
        <div className="cta-actions">
          <QuoteButton location="cta-band" service={service} label="Angebot anfragen" />
          <PhoneButton location="cta-band" />
          <span>Neueindeckung · Reparatur · Abdichtung · Zubehör</span>
        </div>
      </div>
    </section>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <Check size={17} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
