import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return <section className="section not-found"><div className="container"><span className="eyebrow">404 · SEITE NICHT GEFUNDEN</span><h1>Hier ist kein Dach.<br/>Aber ein Weg zurück.</h1><p>Die gesuchte Seite ist nicht verfügbar.</p><Link href="/" className="button button-dark">Zur Startseite<ArrowUpRight size={19}/></Link></div></section>;
}
