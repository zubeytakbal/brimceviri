import type { Metadata } from "next";
import Link from "next/link";
import KitchenMeasuresConverter from "../../components/KitchenMeasuresConverter";

export const metadata: Metadata = { title: "Keukenmaten omrekenen", description: "Reken kopjes, eetlepels, theelepels, grammen en milliliters om per ingrediënt.", alternates: { canonical: "/nl/kitchen-measurement-converter" } };
export default function NederlandsKitchenMeasurementsPage() { return <main className="calculator-page" lang="nl"><div className="calculator-shell"><nav className="breadcrumbs" aria-label="Kruimelpad"><Link href="/nl">Home</Link><span aria-hidden="true">›</span><span>Keukenmaten</span></nav><header className="calculator-hero"><p>Keukenmaten</p><h1>Keukenmaten omrekenen</h1><p>Kies een ingrediënt en reken kopjes, lepels, grammen en milliliters om.</p></header><KitchenMeasuresConverter locale="nl" /><section className="conversion-section"><h2>Waarom verschilt het gewicht per ingrediënt?</h2><p>Een kopje heeft een vast volume, maar ingrediënten hebben verschillende dichtheden. Daarom weegt een kopje bloem niet evenveel als een kopje honing.</p></section></div></main>; }
