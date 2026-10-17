"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { mainServices, specialistServices, services } from "@/data/services";
import { trackEvent } from "@/lib/tracking";
export function ContactForm({ ready, initialService = "general" }: { ready: boolean; initialService?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  // Preselect from ?leistung= so ads and service CTAs attribute correctly.
  const selected = services.some((service) => service.slug === initialService) ? initialService : "general";
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready || status === "sending") return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending"); setMessage("");
    try {
      const response = await fetch("/api/kontakt", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Die Anfrage konnte nicht gesendet werden.");
      trackEvent("generate_lead", { service_type: String(data.service), cta_location: "contact-form" });
      setStatus("success"); setMessage("Vielen Dank. Ihre Anfrage wurde übermittelt.");
      form.reset();
    } catch (error) {
      setStatus("error"); setMessage(error instanceof Error ? error.message : "Bitte versuchen Sie es später erneut.");
    }
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-heading"><span className="eyebrow">IHR VORHABEN</span><h2>Worum geht es<br/>bei Ihrem Dach?</h2></div>
    <div className="form-row"><label>Ihr Name <span>*</span><input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Vor- und Nachname"/></label><label>Telefonnummer <span>*</span><input name="phone" autoComplete="tel" type="tel" required pattern="[+0-9 ()/.-]{7,30}" maxLength={30} placeholder="+43 …"/></label></div>
    <div className="form-row"><label>E-Mail <small>(optional)</small><input name="email" autoComplete="email" type="email" maxLength={254} placeholder="ihre@email.at"/></label><label>Gewünschte Leistung<select name="service" defaultValue={selected}><option value="general">Bitte auswählen / allgemeine Anfrage</option><optgroup label="Hauptleistungen">{mainServices.map((service) => <option value={service.slug} key={service.slug}>{service.label}</option>)}</optgroup><optgroup label="Spezialthemen">{specialistServices.map((service) => <option value={service.slug} key={service.slug}>{service.label}</option>)}</optgroup></select></label></div>
    <label>Ihre Nachricht <span>*</span><textarea name="message" required minLength={10} maxLength={4000} rows={5} placeholder="Beschreiben Sie Ihr Vorhaben und den Standort des Gebäudes in Wien."/></label>
    <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <p className="form-privacy">Ihre Angaben werden zur Bearbeitung Ihrer Anfrage verwendet. Informationen finden Sie in unserer <Link href="/datenschutz">Datenschutzerklärung</Link>. Es erfolgt keine automatische Anmeldung für Werbung.</p>
    {!ready && <p className="form-notice" role="status">Online-Anfragen stehen in Kürze zur Verfügung. Der Versand ist noch nicht eingerichtet.</p>}
    {status !== "success" && <button className="button button-dark" disabled={!ready || status === "sending"} type="submit">{status === "sending" ? <><LoaderCircle className="spin" size={18}/>Wird gesendet …</> : <>Anfrage senden<ArrowUpRight size={18}/></>}</button>}
    {message && <p className={"form-feedback " + status} role={status === "error" ? "alert" : "status"}>{status === "success" && <CheckCircle2 size={19}/>} {message}</p>}
  </form>;
}
