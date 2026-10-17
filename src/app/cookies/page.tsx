import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { LegalPage, LegalDraftNotice } from "@/components/legal-page";
import { CookieSettingsButton } from "@/components/consent-manager";
export const metadata = pageMetadata("Cookie-Informationen", "Cookie-Auswahl, notwendige Speicherung und optionale Statistik- und Marketingdienste auf rundrdach.", "/cookies");
export default function Page() {
  return <LegalPage title="Cookies" href="/cookies"><LegalDraftNotice/><h2>Ihre Auswahl</h2><p>Sie können alle optionalen Kategorien akzeptieren, ablehnen oder Statistik und Marketing getrennt auswählen. Beide optionalen Kategorien sind zunächst ausgeschaltet.</p><CookieSettingsButton/>
  <h2>Notwendiges Cookie</h2><div className="table-scroll"><table><thead><tr><th>Name</th><th>Zweck</th><th>Dauer</th></tr></thead><tbody><tr><td>rundrdach_consent_v1</td><td>Speichert Kategorieauswahl, Version und Zeitpunkt der Entscheidung.</td><td>180 Tage</td></tr></tbody></table></div>
  <h2>Statistik</h2><p>Nach Zustimmung kann Google Analytics über den konfigurierten Tag Manager eingebunden werden. Ohne passende Konfiguration wird kein Statistikdienst geladen. Die tatsächlich gesetzten Cookies und deren Laufzeiten müssen nach Einrichtung dokumentiert werden.</p>
  <h2>Marketing</h2><p>Nach Zustimmung können Google-Ads-Tags über den Tag Manager geladen werden. Diese können zur Messung von Anfragen und Werbekampagnen verwendet werden. Tatsächliche Cookies, Empfänger und Laufzeiten sind nach der finalen Konfiguration zu ergänzen.</p>
  <h2>Widerruf</h2><p>Bei Ablehnung oder Widerruf werden aus den Website-Funktionen keine weiteren optionalen Ereignisse erzeugt. Zugängliche, erkannte Tracking-Cookies werden bei Widerruf entfernt, soweit dies technisch möglich ist. Eine vollständige Löschung historischer Daten bei externen Anbietern kann die Website nicht selbst vornehmen.</p>
  <p>Weitere Informationen finden Sie unter <Link href="/datenschutz">Datenschutz</Link>.</p></LegalPage>;
}
