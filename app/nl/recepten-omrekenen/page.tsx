import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import RecipeScalerConverter from "../../components/RecipeScalerConverter";
import { scaleRecipeText } from "../../converter/recipeScaler";

export const metadata: Metadata = { title: "Recept omrekenen", description: "Pas de hoeveelheden in een recept aan voor het gewenste aantal porties.", alternates: { canonical: "/nl/recepten-omrekenen" } };

const n = (v: number, d = 2) => v.toLocaleString("nl-NL", { maximumFractionDigits: d });
const PANCAKES = ["250 gram bloem", "500 ml melk", "2 eieren", "2 eetlepels gesmolten boter", "halve theelepel zout", "Bak in een hete pan"];
const scaled = scaleRecipeText(PANCAKES.join("\n"), 1.5, "nl", "metric");
const PORTIONS: Array<[number, number]> = [[4, 2], [4, 3], [4, 6], [4, 8], [6, 4], [6, 10], [8, 5]];
const tinFactor = (from: number, to: number) => (to / from) ** 2;

export default function NederlandsRecipeConverterPage() {
  return (
    <main className="calculator-page" lang="nl">
      <div className="calculator-shell">
        <nav className="breadcrumbs" aria-label="Kruimelpad">
          <Link href="/nl">Home</Link>
          <span aria-hidden="true">›</span>
          <span>Recept omrekenen</span>
        </nav>
        <header className="calculator-hero">
          <p>Recepten</p>
          <h1>Recept omrekenen</h1>
          <p>Plak een recept, kies een vermenigvuldiger en krijg direct de aangepaste hoeveelheden.</p>
        </header>
        <RecipeScalerConverter locale="nl" />

        <section className="conversion-section">
          <h2>Zo werkt het omrekenen</h2>
          <p>
            Elke regel die met een getal begint, wordt met dezelfde factor vermenigvuldigd. Die factor is het gewenste aantal porties
            gedeeld door het oorspronkelijke aantal: een recept voor 4 personen dat je voor 6 wilt maken, krijgt factor 6 ÷ 4 = 1,5. Vul je
            beide aantallen porties in, dan rekent de pagina de factor zelf uit.
          </p>
          <p>
            Hoeveelheden mogen als heel getal, als decimaal getal (1,5) of als breuk (3/4) geschreven zijn; ook &quot;halve&quot; en
            &quot;kwart&quot; worden herkend. Staat er een eenheid zoals eetlepel, theelepel, kopje of milliliter én een bekend ingrediënt
            in de regel, dan verschijnt er een geschat gewicht naast. Regels met een oventemperatuur worden niet geschaald; daar zie je
            alleen de omrekening tussen Celsius en Fahrenheit.
          </p>
        </section>

        <section className="conversion-section">
          <h2>Voorbeeld: pannenkoeken voor 6 in plaats van 4</h2>
          <p>Een basisbeslag voor vier personen, met factor 1,5:</p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th scope="col">Recept voor 4</th>
                  <th scope="col">Recept voor 6</th>
                </tr>
              </thead>
              <tbody>
                {scaled.map((line) => (
                  <tr key={line.raw}>
                    <td>{line.raw}</td>
                    <td>{line.scaledLine}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            De drie eieren komen hier mooi uit. Bij factor 1,25 zou je 2,5 ei nodig hebben: klop dan drie eieren los en gebruik ongeveer
            vijf zesde van het mengsel, of neem gewoon drie eieren en een scheutje minder melk. De bakinstructie blijft ongewijzigd, want
            die regel bevat geen hoeveelheid.
          </p>
        </section>

        <section className="conversion-section">
          <h2>Factoren voor veelvoorkomende porties</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th scope="col">Recept voor</th>
                  <th scope="col">Je kookt voor</th>
                  <th scope="col">Factor</th>
                  <th scope="col">250 g wordt</th>
                </tr>
              </thead>
              <tbody>
                {PORTIONS.map(([from, to]) => (
                  <tr key={`${from}-${to}`}>
                    <td>{from} personen</td>
                    <td>{to} personen</td>
                    <td>{n(to / from, 3)}</td>
                    <td>{n((250 * to) / from, 1)} g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="conversion-section">
          <h2>Een andere bakvorm</h2>
          <p>
            Bij taarten en cakes bepaalt de vorm hoeveel beslag je nodig hebt, niet het aantal personen. Voor ronde vormen telt de
            oppervlakte, en die groeit met het kwadraat van de diameter. Een recept voor een springvorm van 24 cm in een vorm van 20 cm
            bakken geeft factor (20 ÷ 24)² = {n(tinFactor(24, 20))}; van 24 naar 28 cm is het (28 ÷ 24)² = {n(tinFactor(24, 28))}. Een vorm
            die maar 4 cm groter is, heeft dus al ruim een derde meer beslag nodig. Houd de laagdikte gelijk, dan blijft de baktijd ongeveer
            hetzelfde; wordt de taart dikker, verlaag dan de temperatuur iets en bak langer.
          </p>
        </section>

        <section className="conversion-section">
          <h2>Waar je op moet letten</h2>
          <ul>
            <li>
              <strong>Gemengde getallen:</strong> schrijf &quot;1,5 kopje&quot; of &quot;3/2 kopje&quot;, niet &quot;1 1/2 kopje&quot;.
              Bij die laatste schrijfwijze wordt alleen het eerste getal herkend.
            </li>
            <li>
              <strong>Zout, kruiden en gist:</strong> bij verdubbelen eerst iets minder toevoegen en op het eind proeven. Smaak schaalt niet
              altijd precies mee.
            </li>
            <li>
              <strong>Pan en kooktijd:</strong> een dubbele hoeveelheid soep of saus in dezelfde pan kookt langzamer in, en een grotere
              ovenschaal vol is dikker dan het origineel.
            </li>
            <li>
              <strong>Ingrediënt niet herkend:</strong> wordt de eenheid wel herkend maar het product niet (bijvoorbeeld &quot;bloem&quot;
              in plaats van &quot;tarwebloem&quot;), kies het dan zelf in het keuzemenu bij die regel. Voor losse omrekeningen
              tussen lepels, kopjes en gram is er de pagina{" "}
              <Link href="/nl/keukenmaten-omrekenen">keukenmaten omrekenen</Link>.
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
