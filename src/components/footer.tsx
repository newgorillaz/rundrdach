import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import { Brand } from "@/components/brand";
import { mainServices, specialistServices } from "@/data/services";
import { phoneHref, site } from "@/config/site";
import { CookieSettingsButton } from "@/components/consent-manager";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Brand light />
            {/* Legal company name — important for a registered, tax-paying business. */}
            {site.legalName && <p className="footer-legal-name">{site.legalName}</p>}
            {/* Firmenbuch and GISA numbers — verifiable Austrian trade identity. */}
            {site.companyNumber && site.trade.gisaNumber && (
              <p className="footer-register">
                {site.companyNumber} · GISA-Zahl {site.trade.gisaNumber} · Spengler
              </p>
            )}
            <p>
              Dacharbeiten in Wien.
              <br />
              Von der ersten Frage bis zum letzten Detail.
            </p>
            <span className="footer-location">
              <MapPin size={15} />
              {site.street
                ? site.street + ", " + site.postalCode + " Wien"
                : "Wien, Österreich"}
            </span>
            {/* Phone number is listed in the footer on every page. */}
            {phoneHref && (
              <a className="footer-phone" href={phoneHref}>
                <Phone size={15} aria-hidden="true" />
                {site.phone}
              </a>
            )}
            {site.email && (
              <a className="footer-email" href={"mailto:" + site.email}>
                <Mail size={15} aria-hidden="true" />
                {site.email}
              </a>
            )}
          </div>
          {/* Main services stay primary; hub + specialists keep crawl depth without overcrowding. */}
          <div>
            <h2>Leistungen</h2>
            {mainServices.map((service) => (
              <Link href={"/" + service.slug} key={service.slug}>
                {service.label}
                <ArrowUpRight size={12} />
              </Link>
            ))}
            <Link href="/leistungen">
              Alle Leistungen
              <ArrowUpRight size={12} />
            </Link>
          </div>
          <div>
            <h2>Spezialthemen</h2>
            {specialistServices.map((service) => (
              <Link href={"/" + service.slug} key={service.slug}>
                {service.label}
                <ArrowUpRight size={12} />
              </Link>
            ))}
          </div>
          <div>
            <h2>Rundrdach</h2>
            <Link href="/referenzen">Referenzen</Link>
            <Link href="/kontakt">Kontakt</Link>
            {phoneHref && <a href={phoneHref}>{site.phone}</a>}
            {site.email && <a href={"mailto:" + site.email}>{site.email}</a>}
            {site.openingHours && <p>{site.openingHours}</p>}
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.legalName || "Rundrdach"}
            {site.legalName ? " · Rundrdach" : ""}
          </span>
          <div>
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/agb">AGB</Link>
            <CookieSettingsButton />
          </div>
          <span className="footer-country">WIEN / AT</span>
        </div>
      </div>
    </footer>
  );
}
