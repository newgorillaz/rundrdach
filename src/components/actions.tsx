"use client";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { mailtoHref, phoneHref, site, whatsappHref } from "@/config/site";
import { reportAdsConversion, trackEvent } from "@/lib/tracking";

export function QuoteButton({
  location = "content",
  service = "general",
  className = "",
  label = "Projekt anfragen",
}: {
  location?: string;
  service?: string;
  className?: string;
  label?: string;
}) {
  return (
    <Link
      className={"button " + className}
      href={"/kontakt?leistung=" + encodeURIComponent(service)}
      onClick={() => trackEvent("quote_request_click", { service_type: service, cta_location: location })}
    >
      {label}
      <ArrowUpRight size={19} />
    </Link>
  );
}

export function PhoneButton({ location = "content", className = "" }: { location?: string; className?: string }) {
  // Renders only when a validated phone number exists in site config.
  if (!phoneHref) return null;
  // Local string so the onClick closure is not typed as string | null.
  const href = phoneHref;
  return (
    <a
      className={"button button-outline " + className}
      href={href}
      onClick={(event) => {
        trackEvent("phone_click", { cta_location: location });
        reportAdsConversion("phone", href, event);
      }}
    >
      <Phone size={16} /> {site.phone}
    </a>
  );
}

/** Outline mailto CTA — opens the visitor's mail client with a pre-filled subject. */
export function EmailButton({ location = "content", className = "" }: { location?: string; className?: string }) {
  if (!mailtoHref) return null;
  // Local string so the onClick closure is not typed as string | null.
  const href = mailtoHref;
  return (
    <a
      className={"button button-outline " + className}
      href={href}
      onClick={(event) => {
        trackEvent("email_click", { cta_location: location });
        reportAdsConversion("email", href, event);
      }}
    >
      <Mail size={16} /> E-Mail schreiben
    </a>
  );
}

/** Compact tel link for top bar, header, and footer — same number as PhoneButton. */
export function PhoneLink({
  location = "content",
  className = "",
  children,
  onClick,
}: {
  location?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  if (!phoneHref) return null;
  // Local string so the onClick closure is not typed as string | null.
  const href = phoneHref;
  return (
    <a
      className={className}
      href={href}
      onClick={(event) => {
        trackEvent("phone_click", { cta_location: location });
        onClick?.();
        reportAdsConversion("phone", href, event);
      }}
    >
      {children ?? site.phone}
    </a>
  );
}

/** Compact mailto link for footer, contact cards, and trust sections. */
export function EmailLink({
  location = "content",
  className = "",
  href,
  children,
}: {
  location?: string;
  className?: string;
  /** Defaults to the pre-filled subject mailto; pass a plain address mailto when needed. */
  href?: string;
  children?: React.ReactNode;
}) {
  const target = href || mailtoHref;
  if (!target) return null;
  return (
    <a
      className={className}
      href={target}
      onClick={(event) => {
        trackEvent("email_click", { cta_location: location });
        reportAdsConversion("email", target, event);
      }}
    >
      {children ?? site.email}
    </a>
  );
}

/** Official WhatsApp glyph — recognizable mark for Austrian trade sites. */
function WhatsAppIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/** Fixed bottom-right WhatsApp CTA — always present when a number is configured. */
export function WhatsAppButton() {
  if (!whatsappHref) return null;
  return (
    <a
      className="whatsapp"
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp: Rundrdach kontaktieren"
      title="WhatsApp"
      onClick={() => {
        trackEvent("whatsapp_click", { cta_location: "floating" });
        // New-tab link — fire the Ads conversion without delaying navigation.
        reportAdsConversion("whatsapp");
      }}
    >
      <WhatsAppIcon />
      <span className="whatsapp-label">WhatsApp</span>
    </a>
  );
}

/** Fixed floating mailto CTA — stacked above WhatsApp in the shared actions column. */
export function FloatingEmailButton() {
  if (!mailtoHref) return null;
  // Local string so the onClick closure is not typed as string | null.
  const href = mailtoHref;
  return (
    <a
      className="floating-email"
      href={href}
      aria-label="E-Mail: Rundrdach kontaktieren"
      title="E-Mail"
      onClick={(event) => {
        trackEvent("email_click", { cta_location: "floating" });
        reportAdsConversion("email", href, event);
      }}
    >
      <Mail size={22} strokeWidth={1.8} aria-hidden="true" />
      <span className="floating-email-label">E-Mail</span>
    </a>
  );
}
