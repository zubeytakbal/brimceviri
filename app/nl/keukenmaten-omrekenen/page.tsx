import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import KitchenMeasuresConverter from "../../components/KitchenMeasuresConverter";
import { kitchenIngredientLabels } from "../../converter/kitchenIngredientLabels";
import {
  type KitchenIngredientKey,
  convertKitchenValue,
  mlPerKitchenCupStandard,
} from "../../converter/kitchenMeasures";

export const metadata: Metadata = { title: "Keukenmaten omrekenen", description: "Reken kopjes, eetlepels, theelepels, grammen en milliliters om per ingrediënt.", alternates: { canonical: "/nl/keukenmaten-omrekenen" } };

const n = (v: number, d = 1) => v.toLocaleString("nl-NL", { maximumFractionDigits: d });
const TABLE_KEYS: KitchenIngredientKey[] = [
  "un", "tam-bugday-unu", "toz-seker", "pudra-sekeri", "esmer-seker", "tereyagi", "sut", "sivi-yag", "bal", "pirinc",
  "yulaf-ezmesi", "kakao", "nisasta", "tuz",
];
const METRIC_CUP = mlPerKitchenCupStandard.metric;
const US_CUP = mlPerKitchenCupStandard.us;
const usRecipe: Array<[KitchenIngredientKey, number, string]> = [
  ["un", 2, "2 cups bloem"],
  ["toz-seker", 0.75, "¾ cup suiker"],
  ["tereyagi", 0.5, "½ cup boter"],
];
const flourSpoon = convertKitchenValue("un", "gram", 100, "metric").yemekKasigi;

export default function NederlandsKitchenMeasurementsPage() {
  return (
    <main className="calculator-page" lang="nl">
      <div className="calculator-shell">
        <nav className="breadcrumbs" aria-label="Kruimelpad">
          <Link href="/nl">Home</Link>
          <span aria-hidden="true">›</span>
          <span>Keukenmaten</span>
        </nav>
        <header className="calculator-hero">
          <p>Keukenmaten</p>
          <h1>Keukenmaten omrekenen</h1>
          <p>Kies een ingrediënt en reken kopjes, lepels, grammen en milliliters om.</p>
        </header>
        <KitchenMeasuresConverter locale="nl" />

        <section className="conversion-section">
          <h2>Met welke maten rekent deze pagina?</h2>
          <p>
            Een eetlepel (el) is hier 15 ml en een theelepel (tl) 5 ml, telkens afgestreken. Een kopje rekent met de metrische cup van{" "}
            {n(METRIC_CUP, 0)} ml. Nederlandse recepten gebruiken meestal gram, milliliter of deciliter; het kopje kom je vooral tegen in
            vertaalde en Engelstalige recepten. Een Amerikaanse cup is kleiner: {n(US_CUP, 1)} ml. Een koffie- of theekopje uit de kast heeft
            geen vaste inhoud, dus meet dat bij twijfel één keer na met een maatbeker.
          </p>
          <p>
            Volume omrekenen naar gewicht kan alleen per ingrediënt. De rekenhulp gebruikt voor elk product een vaste dichtheid, gebaseerd
            op gangbare gewichtstabellen voor de keuken. Dat is een gemiddelde: losjes geschepte bloem weegt minder dan bloem die in de
            maatbeker is aangedrukt.
          </p>
        </section>

        <section className="conversion-section">
          <h2>Waarom verschilt het gewicht per ingrediënt?</h2>
          <p>
            Een kopje heeft een vast volume, maar ingrediënten hebben verschillende dichtheden. Daarom weegt een kopje bloem niet evenveel
            als een kopje honing. Bloem zit vol lucht en weegt ongeveer een halve gram per milliliter; honing is dikker dan water en weegt
            bijna anderhalf keer zoveel. Kristalsuiker zit daar tussenin. Wie een taart bakt met lepels of kopjes in plaats van een
            weegschaal, krijgt dus pas een betrouwbaar resultaat als het ingrediënt bekend is.
          </p>
        </section>

        <section className="conversion-section">
          <h2>Gewicht per kopje, eetlepel en theelepel</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Afgestreken maten; kopje = {n(METRIC_CUP, 0)} ml, el = 15 ml, tl = 5 ml</caption>
              <thead>
                <tr>
                  <th scope="col">Ingrediënt</th>
                  <th scope="col">1 kopje</th>
                  <th scope="col">1 eetlepel</th>
                  <th scope="col">1 theelepel</th>
                  <th scope="col">Eetlepels voor 100 g</th>
                </tr>
              </thead>
              <tbody>
                {TABLE_KEYS.map((key) => (
                  <tr key={key}>
                    <td>{kitchenIngredientLabels.nl[key]}</td>
                    <td>{n(convertKitchenValue(key, "bardak", 1, "metric").gram, 0)} g</td>
                    <td>{n(convertKitchenValue(key, "yemekKasigi", 1, "metric").gram)} g</td>
                    <td>{n(convertKitchenValue(key, "cayKasigi", 1, "metric").gram)} g</td>
                    <td>{n(convertKitchenValue(key, "gram", 100, "metric").yemekKasigi)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="conversion-section">
          <h2>Voorbeeld: een Amerikaans recept omzetten naar gram</h2>
          <p>
            Een cakerecept van een Amerikaanse site vraagt 2 cups bloem, ¾ cup suiker en ½ cup boter. Die cups zijn {n(US_CUP, 1)} ml, niet{" "}
            {n(METRIC_CUP, 0)} ml. Kies daarom in de rekenhulp milliliter als bekende eenheid en vul het aantal cups × {n(US_CUP, 1)} in. Voor
            de bloem is dat 2 × {n(US_CUP, 1)} = {n(2 * US_CUP, 0)} ml. Zo kom je uit op:
          </p>
          <ul>
            {usRecipe.map(([key, cups, label]) => (
              <li key={key}>
                {label} = {n(cups * US_CUP, 0)} ml ≈ <strong>{n(convertKitchenValue(key, "bardak", cups, "us").gram, 0)} g</strong>
              </li>
            ))}
          </ul>
          <p>
            Had je met het metrische kopje gerekend, dan was de bloem {n(convertKitchenValue("un", "bardak", 2, "metric").gram, 0)} g geworden:
            ruim 5 procent te veel, genoeg om een cake droger te maken.
          </p>
        </section>

        <section className="conversion-section">
          <h2>Veelgemaakte fouten</h2>
          <ul>
            <li>
              <strong>Deciliter en milliliter verwarren:</strong> 1 dl is 100 ml. &quot;2,5 dl melk&quot; is dus 250 ml, precies één
              metrisch kopje.
            </li>
            <li>
              <strong>Volle in plaats van afgestreken lepels:</strong> een opgehoopte eetlepel bloem bevat al snel een flink deel meer dan
              de afgestreken waarde. Voor 100 g bloem heb je volgens de tabel {n(flourSpoon)} afgestreken eetlepels nodig; met volle lepels
              kom je er met minder, maar minder voorspelbaar.
            </li>
            <li>
              <strong>Australische recepten:</strong> daar is een eetlepel 20 ml in plaats van 15 ml. Reken zo&apos;n lepel om via
              milliliters.
            </li>
            <li>
              <strong>Ons en pond:</strong> in het dagelijks Nederlands is een ons 100 gram en een pond 500 gram, niet het Engelse pound van
              453,6 gram.
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
