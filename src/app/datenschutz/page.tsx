import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { LegalPage, LegalDraftNotice } from "@/components/legal-page";
import { CookieSettingsButton } from "@/components/consent-manager";
import { site } from "@/config/site";
export const metadata = pageMetadata("Datenschutz", "Informationen zur Verarbeitung personenbezogener Daten auf der Website von Rundrdach.", "/datenschutz");
export default function Page() {
  return <LegalPage title="Datenschutz" href="/datenschutz"><LegalDraftNotice/>
    <h2>Verantwortlicher</h2><p>{site.legalName || "[Unternehmensname ergänzen]"}<br/>{site.street ? site.street + ", " + site.postalCode + " Wien" : "[Anschrift ergänzen]"}<br/>{site.email || "[Datenschutz-Kontakt ergänzen]"}</p>
    <h2>Bereitstellung der Website</h2><p>Beim Aufruf einer Website können technische Verbindungsdaten wie IP-Adresse, Zeitpunkt und aufgerufene URL vom Hostinganbieter verarbeitet werden. Der tatsächlich eingesetzte Anbieter, die Verarbeitungszwecke, Rechtsgrundlagen, Aufbewahrungsfristen und gegebenenfalls Übermittlungen in Drittländer sind vor dem Start konkret zu ergänzen.</p>
    <h2>Kontaktanfragen</h2><p>Wenn das Anfrageformular eingerichtet ist, werden Name, Telefonnummer, gewählte Leistung, Nachricht und optional E-Mail-Adresse zur Bearbeitung der Anfrage an den konfigurierten Empfänger übermittelt. Die Formularsoftware ist für den E-Mail-Dienst Resend vorbereitet. Anbieterangaben, Auftragsverarbeitung, Speicherfristen und Rechtsgrundlage müssen entsprechend dem tatsächlichen Einsatz ergänzt werden. Es erfolgt keine automatische Aufnahme in einen Werbeverteiler.</p>
    <h2>Missbrauchsschutz</h2><p>Das Formular verwendet ein nicht sichtbares Prüffeld und eine Begrenzung von Anfragen. Für die technische Begrenzung wird die IP-Adresse gehasht. Optional kann ein externer Speicheranbieter eingesetzt werden. Bei dessen Aktivierung sind Anbieter, Speicherfristen und die vertraglichen Grundlagen zu ergänzen.</p>
    <h2>Cookies und optionale Dienste</h2><p>Das Cookie „rundrdach_consent_v1“ speichert Ihre Auswahl für 180 Tage. Optionale Statistik- und Marketingdienste werden nur nach entsprechender Zustimmung geladen. Ohne konfigurierte Tracking-ID wird kein Google Tag Manager geladen. Einzelheiten finden Sie in den <Link href="/cookies">Cookie-Informationen</Link>.</p>
    <h2>Google Analytics und Google Ads</h2><p>Die Website ist für Google Analytics und Google Ads über Google Tag Manager vorbereitet. Vor der Aktivierung müssen die konkrete Konfiguration, Empfänger, Rechtsgrundlagen, Cookie-Namen, Speicherfristen und gegebenenfalls internationale Datenübermittlungen beschrieben werden. Diese Dienste sind nicht allein durch die Bereitstellung des Codes eingerichtet. Formularinhalte und Kontaktdaten werden nicht an Analytics übergeben.</p>
    <h2>Ändern und Widerrufen Ihrer Auswahl</h2><p>Sie können die Cookie-Einstellungen jederzeit aufrufen und Ihre Auswahl ändern. Ein Widerruf verhindert zukünftige optionale Ereignisse aus dieser Website; bereits übermittelte Daten werden dadurch nicht automatisch gelöscht.</p><CookieSettingsButton/>
    <h2>Ihre Rechte und Kontakt</h2><p>Die für den tatsächlichen Betrieb geltenden Informationen über Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch und Beschwerdemöglichkeiten sind zu vervollständigen. Für Datenschutzfragen verwenden Sie nach Einrichtung die oben genannten Kontaktdaten. Zuständigkeitsangaben zur österreichischen Datenschutzbehörde sind vor Veröffentlichung zu prüfen.</p>
  </LegalPage>;
}
