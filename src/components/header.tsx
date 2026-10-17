"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Phone, X, ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/brand";
import { mainServices, specialistServices } from "@/data/services";
import { PhoneLink, QuoteButton } from "@/components/actions";
import { site } from "@/config/site";

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  const close = () => setOpen(false);
  // Desktop keeps the four main services + hub link; mobile lists specialists under the hub.
  const onLeistungen = path === "/leistungen" || specialistServices.some((service) => path === "/" + service.slug);

  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>DACHARBEITEN. KLAR GEPLANT.</span>
          <span className="topbar-meta">
            <i className="status-dot" /> WIEN, ÖSTERREICH
            {/* Phone sits in the top bar so the number is visible on every page. */}
            <PhoneLink location="topbar" className="topbar-phone">
              {site.phone}
            </PhoneLink>
          </span>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <div onClick={close}>
            <Brand />
          </div>
          <nav aria-label="Hauptnavigation" className="desktop-nav">
            {mainServices.map((service) => (
              <Link
                key={service.slug}
                href={"/" + service.slug}
                aria-current={path === "/" + service.slug ? "page" : undefined}
              >
                {service.label}
              </Link>
            ))}
            <Link href="/leistungen" aria-current={onLeistungen ? "page" : undefined}>
              Weitere Leistungen
            </Link>
            <Link href="/referenzen" aria-current={path === "/referenzen" ? "page" : undefined}>
              Referenzen
            </Link>
          </nav>
          <div className="header-action">
            {/* Desktop header shows the call number next to the quote CTA. */}
            <PhoneLink location="header" className="header-phone">
              <Phone size={15} aria-hidden="true" />
              {site.phone}
            </PhoneLink>
            <QuoteButton location="header" label="Kontakt" className="button-small" />
          </div>
          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav id="mobile-menu" aria-label="Mobile Navigation" className="mobile-nav">
            <Link href="/" onClick={close}>
              Startseite
            </Link>
            {mainServices.map((service) => (
              <Link
                key={service.slug}
                href={"/" + service.slug}
                onClick={close}
                aria-current={path === "/" + service.slug ? "page" : undefined}
              >
                {service.label}
                <ArrowUpRight size={18} />
              </Link>
            ))}
            <Link href="/leistungen" onClick={close} aria-current={path === "/leistungen" ? "page" : undefined}>
              Alle Leistungen
              <ArrowUpRight size={18} />
            </Link>
            {specialistServices.map((service) => (
              <Link
                key={service.slug}
                href={"/" + service.slug}
                onClick={close}
                className="mobile-nav-sub"
                aria-current={path === "/" + service.slug ? "page" : undefined}
              >
                {service.label}
                <ArrowUpRight size={16} />
              </Link>
            ))}
            <Link href="/referenzen" onClick={close}>
              Referenzen
            </Link>
            <Link href="/kontakt" onClick={close}>
              Kontakt
            </Link>
            {/* Tappable phone row in the mobile drawer. */}
            <PhoneLink location="mobile-menu" className="mobile-nav-phone" onClick={close}>
              Anrufen · {site.phone}
              <Phone size={18} />
            </PhoneLink>
          </nav>
        )}
      </header>
    </>
  );
}
