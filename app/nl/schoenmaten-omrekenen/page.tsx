import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import ShoeSizeConverter from "../../components/ShoeSizeConverter";
import { type ShoeBrandKey, findShoeSizeRow } from "../../converter/shoeSizeTable";

export const metadata: Metadata = { title: "Schoenmaat omrekenen: EU, US en UK", description: "Vergelijk Europese, Amerikaanse en Britse schoenmaten en voetlengte.", alternates: { canonical: "/nl/schoenmaten-omrekenen" } };

const n = (v: number, d = 1) => v.toLocaleString("nl-NL", { maximumFractionDigits: d });
function eu(value: number) {
  const whole = Math.floor(value);
  const rest = value - whole;
  if (Math.abs(rest - 1 / 3) < 0.01) return `${whole} 1/3`;
  if (Math.abs(rest - 2 / 3) < 0.01) return `${whole} 2/3`;
  return n(value);
}
const BRANDS: Array<[ShoeBrandKey, string]> = [
  ["genel", "Algemene tabel"],
  ["nike", "Nike"],
  ["adidas", "Adidas"],
  ["puma", "Puma"],
  ["new-balance", "New Balance"],
  ["converse", "Converse"],
];
const MEN_CM = 26.5;
const WOMEN_CM = 24;
const PARIS_POINT_MM = 20 / 3;
const BARLEYCORN_MM = 25.4 / 3;

export default function NederlandsShoeSizePage() {
  const menEu = BRANDS.map(([brand]) => findShoeSizeRow("erkek", "cm", MEN_CM, brand).eu);
  return (
    <main className="calculator-page" lang="nl">
      <div className="calculator-shell">
        <nav className="breadcrumbs" aria-label="Kruimelpad">
          <Link href="/nl">Home</Link>
          <span aria-hidden="true">›</span>
          <span>Schoenmaat omrekenen</span>
        </nav>
        <header className="calculator-hero">
          <p>Schoenmaten</p>
          <h1>Schoenmaat omrekenen</h1>
          <p>Vergelijk EU-, US- en UK-maten met de voetlengte als referentie.</p>
        </header>
        <ShoeSizeConverter locale="nl" />

        <section className="conversion-section">
          <h2>Hoe kies je de juiste schoenmaat?</h2>
          <p>
            Meet de lengte van je voet van hiel tot langste teen. Merken kunnen verschillend vallen; gebruik de maattabel als uitgangspunt
            en controleer altijd de tabel van het merk.
          </p>
          <p>
            Zet een vel papier tegen de muur, ga er met je hiel tegen de muur op staan en zet een streepje bij de punt van je langste teen;
            dat is niet altijd de grote teen. Meet beide voeten en ga uit van de langste. Meet bij voorkeur aan het eind van de dag en
            met de sokken die je in de schoen draagt, want voeten zijn &apos;s avonds iets dikker. Vul de lengte in centimeters in bij
            &quot;Voetlengte&quot;: de rekenhulp zoekt dan de dichtstbijzijnde rij in de gekozen tabel.
          </p>
        </section>

        <section className="conversion-section">
          <h2>Voorbeeld: dezelfde voet, verschillende merken</h2>
          <p>
            Een herenvoet van {n(MEN_CM)} cm en een damesvoet van {n(WOMEN_CM)} cm, opgezocht in elk van de tabellen die de rekenhulp
            gebruikt:
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th scope="col">Tabel</th>
                  <th scope="col">Heren {n(MEN_CM)} cm: EU / UK / US</th>
                  <th scope="col">Dames {n(WOMEN_CM)} cm: EU / UK / US</th>
                </tr>
              </thead>
              <tbody>
                {BRANDS.map(([brand, label]) => {
                  const men = findShoeSizeRow("erkek", "cm", MEN_CM, brand);
                  const women = findShoeSizeRow("kadin", "cm", WOMEN_CM, brand);
                  return (
                    <tr key={brand}>
                      <td>{label}</td>
                      <td>
                        {eu(men.eu)} / {n(men.uk)} / {n(men.us)}
                      </td>
                      <td>
                        {eu(women.eu)} / {n(women.uk)} / {n(women.us)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p>
            Voor dezelfde herenvoet loopt de EU-maat uiteen van {eu(Math.min(...menEu))} tot {eu(Math.max(...menEu))}. Dat is geen
            rekenfout: elk merk gebruikt eigen leesten en een eigen tabel. Adidas werkt bovendien met derde maten zoals 42 2/3. Wie twijfelt
            tussen twee maten, kiest bij sport- en wandelschoenen meestal de grotere.
          </p>
        </section>

        <section className="conversion-section">
          <h2>Waarom EU, UK en US niet gelijk oplopen</h2>
          <p>
            De Europese maat telt in Parijse steken van 2/3 cm: één maat groter is {n(PARIS_POINT_MM, 2)} mm langer. Britse en Amerikaanse
            maten gaan in stappen van een derde inch, {n(BARLEYCORN_MM, 2)} mm. Omdat die stappen verschillen, komen hele EU-maten niet
            netjes op hele UK-maten uit, en daarom bestaan er halve maten. Tussen US en UK zit in de tabellen hierboven bij heren een halve
            tot een hele maat verschil. Amerikaanse damesmaten hebben bovendien een eigen schaal: voor dezelfde voetlengte ligt het getal
            ongeveer 1 tot 1,5 hoger dan bij heren.
          </p>
        </section>

        <section className="conversion-section">
          <h2>Veelgemaakte fouten</h2>
          <ul>
            <li>
              <strong>De binnenzool van een oude schoen meten:</strong> die is langer dan je voet en vaak uitgerekt. Meet de voet zelf.
            </li>
            <li>
              <strong>US-heren en US-dames door elkaar halen:</strong> controleer bij Amerikaanse webwinkels of er &quot;Men&apos;s&quot;
              of &quot;Women&apos;s&quot; bij de maat staat, en kies de bijbehorende groep in de rekenhulp.
            </li>
            <li>
              <strong>Kinderschoenen precies passend kopen:</strong> kindervoeten groeien snel. Een kinderschoen heeft meestal zo&apos;n 1
              tot 1,5 cm ruimte voor de tenen nodig; meet daarom elke paar maanden opnieuw.
            </li>
            <li>
              <strong>Alleen op de lengte letten:</strong> een smalle of brede voet past soms beter in een halve maat groter of kleiner, of
              in een ander model van hetzelfde merk.
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
