import Link from "next/link";
export function RoofMark({ className = "" }: { className?: string }) {
  return <svg className={className} width="40" height="35" viewBox="0 0 40 35" fill="none" aria-hidden="true"><path d="M2 21 20 5l18 16M9 17v14h22V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/><path d="m7 15 13-12 13 12" stroke="var(--gold)" strokeWidth="2.5"/><path d="M16 31V21h8v10" stroke="currentColor" strokeWidth="2"/></svg>;
}
export function Brand({ light = false }: { light?: boolean }) {
  return <Link href="/" className={"brand" + (light ? " brand-light" : "")} aria-label="Rundrdach – Startseite"><RoofMark/><span>rundrdach<span className="brand-dot">.</span><small>DACHARBEITEN · WIEN</small></span></Link>;
}
