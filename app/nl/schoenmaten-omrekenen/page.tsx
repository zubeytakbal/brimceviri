import type { Metadata } from "next";
import Link from "next/link";
import ShoeSizeConverter from "../../components/ShoeSizeConverter";

export const metadata: Metadata = { title: "Schoenmaat omrekenen: EU, US en UK", description: "Vergelijk Europese, Amerikaanse en Britse schoenmaten en voetlengte.", alternates: { canonical: "/nl/schoenmaten-omrekenen" } };
export default function NederlandsShoeSizePage() { return <main className="calculator-page" lang="nl"><div className="calculator-shell"><nav className="breadcrumbs" aria-label="Kruimelpad"><Link href="/nl">Home</Link><span aria-hidden="true">›</span><span>Schoenmaat omrekenen</span></nav><header className="calculator-hero"><p>Schoenmaten</p><h1>Schoenmaat omrekenen</h1><p>Vergelijk EU-, US- en UK-maten met de voetlengte als referentie.</p></header><ShoeSizeConverter locale="nl" /><section className="conversion-section"><h2>Hoe kies je de juiste schoenmaat?</h2><p>Meet de lengte van je voet van hiel tot langste teen. Merken kunnen verschillend vallen; gebruik de maattabel als uitgangspunt en controleer altijd de tabel van het merk.</p></section></div></main>; }
