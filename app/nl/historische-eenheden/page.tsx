import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import CategoryUnitConverter from "../../components/CategoryUnitConverter";

export const metadata: Metadata = { title: "Historische eenheden", description: "Lees over historische lengtes en gewichten en vergelijk ze met moderne eenheden.", alternates: { canonical: "/nl/historische-eenheden" } };

const n = (v: number, d = 2) => v.toLocaleString("nl-NL", { maximumFractionDigits: d });

// Waarden in de wet van 1816 (Nederlands metriek stelsel, ingevoerd 1820).
const METRIC_1820: Array<[string, string, string]> = [
  ["Lengte", "mijl", "1 kilometer"],
  ["Lengte", "roede", "10 meter"],
  ["Lengte", "el", "1 meter"],
  ["Lengte", "palm", "1 decimeter"],
  ["Lengte", "duim", "1 centimeter"],
  ["Lengte", "streep", "1 millimeter"],
  ["Oppervlakte", "bunder", "1 hectare"],
  ["Oppervlakte", "vierkante roede", "1 are (100 m²)"],
  ["Inhoud", "vat", "1 hectoliter (natte waren)"],
  ["Inhoud", "kan", "1 liter (natte waren)"],
  ["Inhoud", "mud", "1 hectoliter (droge waren)"],
  ["Inhoud", "schepel", "10 liter (droge waren)"],
  ["Inhoud", "kop", "1 liter (droge waren)"],
  ["Gewicht", "pond", "1 kilogram"],
  ["Gewicht", "ons", "100 gram"],
  ["Gewicht", "lood", "10 gram"],
  ["Gewicht", "wigtje", "1 gram"],
];

const RIJNLANDSE_VOET_M = 0.313947;
const RIJNLANDSE_ROEDE_M = 12 * RIJNLANDSE_VOET_M;
const RIJNLANDSE_MORGEN_M2 = 600 * RIJNLANDSE_ROEDE_M ** 2;
const AMSTERDAMSE_VOET_M = 0.2831;
const AMSTERDAMSE_EL_M = 0.6878;
const AMSTERDAMS_POND_G = 494.09;
const ENGELSE_VOET_M = 0.3048;

const LOCAL_UNITS: Array<[string, string, string]> = [
  ["Rijnlandse voet", `${n(RIJNLANDSE_VOET_M * 100)} cm`, "veel gebruikt in landmeting en waterstaat"],
  ["Rijnlandse roede", `${n(RIJNLANDSE_ROEDE_M, 3)} m`, "12 Rijnlandse voet"],
  ["Rijnlandse morgen", `${n(RIJNLANDSE_MORGEN_M2, 0)} m²`, "600 vierkante Rijnlandse roeden"],
  ["Amsterdamse voet", `${n(AMSTERDAMSE_VOET_M * 100)} cm`, "Amsterdam en omgeving"],
  ["Amsterdamse el", `${n(AMSTERDAMSE_EL_M * 100)} cm`, "maat voor textiel"],
  ["Amsterdams pond", `${n(AMSTERDAMS_POND_G)} g`, "handelsgewicht"],
];

export default function NederlandsHistoricalUnitsPage() {
  return (
    <main className="calculator-page" lang="nl">
      <div className="calculator-shell">
        <nav className="breadcrumbs" aria-label="Kruimelpad">
          <Link href="/nl">Home</Link>
          <span aria-hidden="true">›</span>
          <span>Historische eenheden</span>
        </nav>
        <header className="calculator-hero">
          <p>Historische maten</p>
          <h1>Historische eenheden</h1>
          <p>Vergelijk traditionele lengtes en gewichten met moderne referentie-eenheden.</p>
        </header>
        <section className="conversion-section">
          <h2>Lengte omrekenen</h2>
          <CategoryUnitConverter category="uzunluk" locale="nl" />
        </section>
        <section className="conversion-section">
          <h2>Massa omrekenen</h2>
          <CategoryUnitConverter category="kutle" locale="nl" />
        </section>

        <section className="conversion-section">
          <h2>Oude Nederlandse maten: twee soorten</h2>
          <p>
            Wie in een oude akte, boedelbeschrijving of krant een el, roede of pond tegenkomt, moet eerst weten uit welke tijd de tekst
            komt. Tot 1820 had bijna elke stad of streek eigen maten: een Amsterdamse voet was korter dan een Rijnlandse, en een pond in
            Amsterdam woog anders dan een pond elders. Bij de wet van 21 augustus 1816 voerde het Koninkrijk der Nederlanden per 1 januari
            1820 het metrieke stelsel in, maar met vertrouwde Nederlandse namen. Vanaf dat moment betekende &quot;el&quot; gewoon een meter
            en &quot;pond&quot; een kilogram. Pas later in de negentiende eeuw werden de internationale namen zoals meter en kilogram de
            officiële.
          </p>
          <p>
            Een el in een tekst uit 1850 is dus 1 meter, terwijl een el in een Amsterdamse rekening uit 1750 ongeveer 69 cm is. De
            omrekenaars hierboven werken met moderne eenheden zoals meter, Engelse voet en kilogram; gebruik de tabellen hieronder om een
            historische maat eerst naar meters of kilo&apos;s te vertalen.
          </p>
        </section>

        <section className="conversion-section">
          <h2>Het Nederlandse metrieke stelsel van 1820</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th scope="col">Grootheid</th>
                  <th scope="col">Naam na 1820</th>
                  <th scope="col">Waarde</th>
                </tr>
              </thead>
              <tbody>
                {METRIC_1820.map(([kind, name, value]) => (
                  <tr key={name}>
                    <td>{kind}</td>
                    <td>{name}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Een paar van deze namen leven voort. In de winkel is een ons nog steeds 100 gram, maar het pond is in de spreektaal een halve
            kilo geworden: &quot;een pond gehakt&quot; is 500 gram. In de massa-omrekenaar hierboven staat dat dagelijkse pond van 500 g
            apart van het Engelse pound van 453,59 g.
          </p>
        </section>

        <section className="conversion-section">
          <h2>Enkele lokale maten van vóór 1820</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th scope="col">Maat</th>
                  <th scope="col">Metrisch (afgerond)</th>
                  <th scope="col">Toelichting</th>
                </tr>
              </thead>
              <tbody>
                {LOCAL_UNITS.map(([name, value, note]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{value}</td>
                    <td>{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>Drie rekenvoorbeelden met deze waarden:</p>
          <ul>
            <li>
              Een weiland van 3 morgen Rijnlands: 3 × {n(RIJNLANDSE_MORGEN_M2, 0)} m² = {n(3 * RIJNLANDSE_MORGEN_M2, 0)} m², ruim{" "}
              {n(Math.floor((3 * RIJNLANDSE_MORGEN_M2) / 100) / 100)} hectare.
            </li>
            <li>
              Een balk van 20 Rijnlandse voet: 20 × {n(RIJNLANDSE_VOET_M, 4)} m = {n(20 * RIJNLANDSE_VOET_M)} m. Met de Engelse voet van{" "}
              {n(ENGELSE_VOET_M, 4)} m uit de omrekenaar zou je {n(20 * ENGELSE_VOET_M)} m krijgen, bijna 20 cm te kort.
            </li>
            <li>
              Veertig Amsterdamse ellen laken: 40 × {n(AMSTERDAMSE_EL_M, 4)} m = {n(40 * AMSTERDAMSE_EL_M)} m. Dezelfde 40 ellen in een
              tekst van na 1820 zijn gewoon 40 meter.
            </li>
          </ul>
        </section>

        <section className="conversion-section">
          <h2>Historische maten in context</h2>
          <p>
            Historische eenheden varieerden vaak per periode en regio. Gebruik de resultaten als praktische referentie en raadpleeg voor
            historisch onderzoek altijd een gespecialiseerde bron.
          </p>
          <p>
            Let vooral op drie valkuilen. Ten eerste gebruikten steden naast elkaar verschillende ponden, bijvoorbeeld voor handel en voor
            edelmetaal. Ten tweede was een mud of schepel graan vóór 1820 per plaats verschillend en soms per graansoort; daarvoor bestaat
            geen enkele landelijke omrekening. Ten derde kan een oppervlakte in &quot;roeden&quot; zowel een lengte als een vierkante maat
            bedoelen; uit de context (een sloot of een perceel) blijkt welke. Archieven en heemkundige verenigingen in de betreffende streek
            hebben vaak lijsten met de maten die daar golden.
          </p>
        </section>
      </div>
    </main>
  );
}
