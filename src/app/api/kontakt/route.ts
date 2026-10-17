import { NextRequest, NextResponse } from "next/server";
import { allowRequest } from "@/lib/rate-limit";
import { services } from "@/data/services";
export const runtime = "nodejs";
function escapeHtml(value: string) { return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]!)); }
export async function POST(request: NextRequest) {
  const error = (text: string, status: number) => NextResponse.json({ error: text }, { status });
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return error("Die Anfrage konnte nicht geprüft werden.", 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return error("Ungültiges Anfrageformat.", 415);
  if (Number(request.headers.get("content-length") || 0) > 18000) return error("Die Anfrage ist zu groß.", 413);
  let data: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 18000) return error("Die Anfrage ist zu groß.", 413);
    data = JSON.parse(raw);
    if (!data || typeof data !== "object" || Array.isArray(data)) return error("Ungültige Anfrage.", 400);
  } catch { return error("Ungültige Anfrage.", 400); }
  if (data.website) return error("Die Anfrage konnte nicht gesendet werden.", 400);
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";
  const service = typeof data.service === "string" ? data.service : "general";
  if (name.length < 2 || name.length > 100 || !/^[+0-9 ()/.-]{7,30}$/.test(phone) || message.length < 10 || message.length > 4000 || email.length > 254 || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) || !["general", ...services.map((s) => s.slug)].includes(service)) return error("Bitte prüfen Sie Ihre Angaben.", 400);
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) return error("Online-Anfragen sind noch nicht verfügbar.", 503);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (!await allowRequest(ip)) return error("Zu viele Anfragen. Bitte versuchen Sie es später erneut.", 429);
  const label = services.find((s) => s.slug === service)?.label || "Allgemeine Anfrage";
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: "Bearer " + apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], ...(email ? { reply_to: email } : {}), subject: "Rundrdach – " + label, html: "<h2>Neue Dachanfrage</h2><p><b>Name:</b> " + escapeHtml(name) + "</p><p><b>Telefon:</b> " + escapeHtml(phone) + "</p><p><b>E-Mail:</b> " + escapeHtml(email || "Nicht angegeben") + "</p><p><b>Leistung:</b> " + escapeHtml(label) + "</p><p><b>Nachricht:</b><br>" + escapeHtml(message).replace(/\n/g, "<br>") + "</p>" }),
      signal: AbortSignal.timeout(12000)
    });
    if (!response.ok) return error("Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.", 502);
    const result = await response.json();
    if (!result.id) return error("Der Versand konnte nicht bestätigt werden.", 502);
    return NextResponse.json({ success: true });
  } catch { return error("Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.", 502); }
}
