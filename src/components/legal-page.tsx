import { Breadcrumb, Eyebrow } from "@/components/sections";
export function LegalPage({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
  return <><section className="page-hero legal-hero"><div className="container"><Breadcrumb current={title} href={href}/><Eyebrow>RUNDRDACH · WIEN</Eyebrow><h1>{title}</h1></div></section><section className="section legal-section"><div className="container"><article className="legal-content">{children}</article></div></section></>;
}
export function LegalDraftNotice() {
  return <div className="legal-draft"><strong>Entwurf – vor Veröffentlichung ergänzen.</strong><p>Diese Informationen enthalten noch offene Unternehmens- und Verarbeitungsangaben. Sie müssen an die tatsächlichen Abläufe angepasst und vor dem öffentlichen Start geprüft werden.</p></div>;
}
