"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, SlidersHorizontal, X } from "lucide-react";
import { applyConsent, initializeConsent, readConsent, trackPageView, type Consent } from "@/lib/tracking";
export function CookieSettingsButton() {
  return <button className="footer-cookie" onClick={() => window.dispatchEvent(new Event("rundrdach:consent-settings"))}>Cookie-Einstellungen</button>;
}
export function ConsentManager() {
  const path = usePathname();
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState<Consent | null>(null);
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const dialog = useRef<HTMLElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    initializeConsent();
    const existing = readConsent();
    if (existing) applyConsent(existing);
    // Cookie state is deliberately read after hydration to keep server/client HTML identical.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSaved(existing);
    setAnalytics(existing?.analytics ?? false);
    setMarketing(existing?.marketing ?? false);
    setOpen(!existing);
    setReady(true);
    const showSettings = () => {
      returnFocus.current = document.activeElement as HTMLElement;
      setOpen(true); setCustom(true);
      const value = readConsent();
      setAnalytics(value?.analytics ?? false); setMarketing(value?.marketing ?? false);
    };
    window.addEventListener("rundrdach:consent-settings", showSettings);
    return () => window.removeEventListener("rundrdach:consent-settings", showSettings);
  }, []);
  useEffect(() => { if (ready && saved?.analytics) trackPageView(path); }, [path, ready, saved]);
  useEffect(() => {
    if (!ready || !open) return;
    if (!returnFocus.current) returnFocus.current = document.activeElement as HTMLElement;
    dialog.current?.focus();
    const trap = (event: KeyboardEvent) => {
      const items = dialog.current?.querySelectorAll<HTMLElement>('button, a[href], input:not([disabled])');
      if (!items?.length) return;
      const first = items[0], last = items[items.length - 1];
      if (event.key === "Tab") {
        if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
      if (event.key === "Escape" && saved) setOpen(false);
    };
    document.addEventListener("keydown", trap);
    return () => { document.removeEventListener("keydown", trap); returnFocus.current?.focus(); returnFocus.current = null; };
  }, [ready, open, saved]);
  function save(a: boolean, m: boolean) {
    const consent: Consent = { version: 1, analytics: a, marketing: m, updatedAt: Date.now() };
    applyConsent(consent);
    setSaved(consent); setOpen(false); setCustom(false);
  }
  if (!ready || !open) return null;
  return <div className="consent-backdrop"><section ref={dialog} className="consent-panel" role="dialog" aria-modal="true" aria-labelledby="consent-title" aria-describedby="consent-description" tabIndex={-1}>
    <div className="consent-heading"><span className="eyebrow">IHRE ENTSCHEIDUNG</span>{saved && <button className="icon-button" aria-label="Cookie-Einstellungen schließen" onClick={() => setOpen(false)}><X size={20}/></button>}</div>
    <h2 id="consent-title">Datenschutz beginnt<br/>mit Ihrer Wahl.</h2>
    <p id="consent-description">Notwendige Cookies speichern Ihre Einstellungen. Mit Ihrer Zustimmung können optionale Dienste für Statistik und Marketing geladen werden. Sie können Ihre Auswahl jederzeit ändern.</p>
    <div className="consent-links"><Link href="/datenschutz" onClick={() => setOpen(false)}>Datenschutz <ArrowUpRight size={13}/></Link><Link href="/cookies" onClick={() => setOpen(false)}>Cookie-Informationen <ArrowUpRight size={13}/></Link></div>
    {custom && <div className="consent-options">
      <label><span><strong>Notwendig</strong><small>Speichert Ihre Cookie-Auswahl.</small></span><input type="checkbox" checked disabled/></label>
      <label><span><strong>Statistik</strong><small>Google Analytics, wenn eingerichtet.</small></span><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)}/></label>
      <label><span><strong>Marketing</strong><small>Google Ads, wenn eingerichtet.</small></span><input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)}/></label>
    </div>}
    <div className="consent-buttons"><button className="button button-dark" onClick={() => save(true, true)}>Alle akzeptieren</button><button className="button button-outline" onClick={() => save(false, false)}>Optionale ablehnen</button></div>
    <button className="consent-custom" onClick={() => custom ? save(analytics, marketing) : setCustom(true)}><SlidersHorizontal size={15}/>{custom ? "Auswahl speichern" : "Einstellungen anpassen"}</button>
  </section></div>;
}
