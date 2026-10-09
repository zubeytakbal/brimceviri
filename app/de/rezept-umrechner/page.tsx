import { seoTitle } from "../../seoTitle";
import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import RecipeScalerConverter from "../../components/RecipeScalerConverter";
import {
  type KitchenIngredientKey,
  convertKitchenValue,
  mlPerKitchenCupStandard,
} from "../../converter/kitchenMeasures";
import { scaleRecipeText } from "../../converter/recipeScaler";
import { buildSiteUrl } from "../../siteConfig";

const n = (v: number, d = 2) => v.toLocaleString("de-DE", { maximumFractionDigits: d });
const WAFFLES = [
  "250 g Weizenmehl",
  "125 g Butter",
  "100 g Zucker",
  "3 Eier",
  "250 ml Milch",
  "1 Teelöffel Backpulver",
  "1 Prise Salz",
];
const waffles = scaleRecipeText(WAFFLES.join("\n"), 1.5, "de");
const CUP_HERE = mlPerKitchenCupStandard.turkish;
const CUP_US = mlPerKitchenCupStandard.us;
const CUP_METRIC = mlPerKitchenCupStandard.metric;
const CUP_ROWS: Array<[KitchenIngredientKey, string]> = [
  ["un", "Weizenmehl"],
  ["toz-seker", "Zucker"],
  ["tereyagi", "Butter"],
  ["sut", "Milch"],
];
const TIN_DIAMETERS = [18, 20, 22, 24, 28, 30];
const roundArea = (d: number) => Math.PI * (d / 2) ** 2;
const tinFactor = (d: number) => roundArea(d) / roundArea(26);

export const metadata: Metadata = {
  title: seoTitle("Rezept Umrechner: Rezept skalieren und Tassen in Gramm", "Rezept-Umrechner: Rezept skalieren"),
  description:
    "Fügen Sie Ihr Rezept ein, wählen Sie einen Faktor und skalieren Sie alle Mengen sofort. Erkannte Zutaten erhalten passende Grammwerte.",
  alternates: {
    canonical: "/de/rezept-umrechner",
    languages: {
      tr: "/tarif-cevirici",
      en: "/en/recipe-converter",
      de: "/de/rezept-umrechner",
      "x-default": "/tarif-cevirici",
    },
  },
  openGraph: {
    title: "Rezept Umrechner: Rezept skalieren und Tassen in Gramm",
    description:
      "Verdoppeln, halbieren oder skalieren Sie ein Rezept und sehen Sie Grammwerte für erkannte Zutaten.",
    url: buildSiteUrl("/de/rezept-umrechner"),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

export default function GermanRecipeScalerPage() {
  return (
    <main className="all-conversions-page" lang="de">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Brotkrumen">
          <Link href="/de">Startseite</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Rezept Umrechner</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Rezept Umrechner</h1>
          <p>
            Fügen Sie Ihr Rezept zeilenweise ein, wählen Sie einen
            Multiplikator und skalieren Sie jede Menge sofort. Wenn Zutat
            und Einheit erkannt werden, erscheint auch ein Grammwert.
          </p>
        </header>

        <RecipeScalerConverter locale="de" />

        <section className="category-article-content">
          <h2>Wie verdoppelt man ein Rezept?</h2>
          <p>
            Jede Mengenangabe wird mit dem gewünschten Faktor
            multipliziert. Diese Seite übernimmt das automatisch für
            ganze Zahlen, Dezimalwerte und einfache Brüche.
          </p>
          <p>
            Der Faktor ist die gewünschte Portionszahl geteilt durch die
            Portionszahl im Rezept. Aus einem Rezept für 4 Personen wird
            eines für 6 mit dem Faktor 6 ÷ 4 = 1,5; für 2 Personen halbieren
            Sie mit 0,5. Tragen Sie beide Portionszahlen ein, berechnet die
            Seite den Faktor selbst. Erkannt werden Zahlen wie 2, 1,5 oder
            3/4 sowie die Wörter „halb“ und „viertel“ am Zeilenanfang.
            Zeilen mit einer Ofentemperatur bleiben unverändert und erhalten
            nur einen Hinweis in Fahrenheit.
          </p>

          <h2>Beispiel: Waffelteig für 6 statt 4 Personen</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th scope="col">Rezept für 4</th>
                  <th scope="col">Faktor 1,5</th>
                  <th scope="col">Grammwert</th>
                </tr>
              </thead>
              <tbody>
                {waffles.map((line) => (
                  <tr key={line.raw}>
                    <td>{line.raw}</td>
                    <td>{line.scaledLine}</td>
                    <td>{line.gramEquivalent === null ? "–" : `${n(line.gramEquivalent, 0)} g`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Beim Ei hilft keine Waage im Rezept, sondern in der Küche: Eier
            der Gewichtsklasse M wiegen nach EU-Vermarktungsnorm 53 bis 63 g
            mit Schale. Für 4,5 Eier schlagen Sie 5 Eier auf, verquirlen sie
            und lassen etwa ein Zehntel der Masse weg, oder Sie nehmen 4 Eier
            der Größe L. Die Prise Salz muss nicht exakt mitwachsen; bei
            1,5 Prisen reicht eine gute Prise.
          </p>

          <h2>Tasse, Cup und Löffel</h2>
          <p>
            Für die Grammwerte rechnet diese Seite mit einer Tasse von{" "}
            {n(CUP_HERE, 0)} ml, einem Esslöffel von 15 ml und einem
            Teelöffel von 5 ml, jeweils gestrichen. Amerikanische Rezepte
            meinen mit „cup“ dagegen {n(CUP_US, 1)} ml, australische und
            kanadische oft {n(CUP_METRIC, 0)} ml, und eine Kaffeetasse aus
            dem Schrank fasst je nach Form deutlich weniger. Bei einem
            US-Rezept rechnen Sie die Cups deshalb am besten zuerst in
            Milliliter um und schreiben diese in die Zeile.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th scope="col">Zutat</th>
                  <th scope="col">1 Tasse ({n(CUP_HERE, 0)} ml)</th>
                  <th scope="col">1 US-Cup ({n(CUP_US, 1)} ml)</th>
                </tr>
              </thead>
              <tbody>
                {CUP_ROWS.map(([key, label]) => (
                  <tr key={key}>
                    <td>{label}</td>
                    <td>{n(convertKitchenValue(key, "bardak", 1, "turkish").gram, 0)} g</td>
                    <td>{n(convertKitchenValue(key, "bardak", 1, "us").gram, 0)} g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Prise und Messerspitze sind keine genormten Maße. Eine Prise ist
            die Menge, die zwischen Daumen und Zeigefinger passt, eine
            Messerspitze das, was auf der Spitze eines Messers liegen bleibt.
            Beide skaliert man nach Gefühl: Bei doppelter Menge eine kräftige
            Prise statt zwei, und am Ende abschmecken.
          </p>

          <h2>Backform umrechnen</h2>
          <p>
            Bei Kuchen entscheidet die Form über die Teigmenge. Maßgeblich ist
            die Fläche, und die wächst bei runden Formen mit dem Quadrat des
            Durchmessers. Viele deutsche Rezepte gehen von einer 26-cm-Springform
            aus. Soll der Kuchen in einer 24-cm-Form gebacken werden, ist der
            Faktor (24 ÷ 26)² = {n(tinFactor(24), 3)}: aus 3 Eiern werden rund{" "}
            {n(3 * tinFactor(24), 1)}, aus 300 g Mehl etwa {n(300 * tinFactor(24), 0)} g.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Ausgangsrezept: Springform 26 cm</caption>
              <thead>
                <tr>
                  <th scope="col">Neue Form</th>
                  <th scope="col">Fläche</th>
                  <th scope="col">Faktor</th>
                </tr>
              </thead>
              <tbody>
                {TIN_DIAMETERS.map((d) => (
                  <tr key={d}>
                    <td>⌀ {d} cm</td>
                    <td>{n(roundArea(d), 0)} cm²</td>
                    <td>{n(tinFactor(d), 2)}</td>
                  </tr>
                ))}
                <tr>
                  <td>Rechteck 20 × 30 cm</td>
                  <td>600 cm²</td>
                  <td>{n(600 / roundArea(26), 2)}</td>
                </tr>
                <tr>
                  <td>Blech 30 × 40 cm</td>
                  <td>1.200 cm²</td>
                  <td>{n(1200 / roundArea(26), 2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Bleibt die Teighöhe gleich, ändert sich die Backzeit kaum. Wird
            der Teig in einer kleineren Form höher, braucht er länger und
            eventuell etwas weniger Hitze; machen Sie die Stäbchenprobe.
          </p>

          <h2>Häufige Fehler beim Skalieren</h2>
          <ul>
            <li>
              <strong>Gemischte Zahlen:</strong> Schreiben Sie „1,5 Tassen“
              statt „1 1/2 Tassen“, sonst wird nur die erste Zahl erkannt.
            </li>
            <li>
              <strong>Zutat ohne Grammwert:</strong> Erkennt die Seite die
              Einheit, aber nicht die Zutat (etwa „Mehl“ statt
              „Weizenmehl“), wählen Sie die Zutat im Auswahlfeld der Zeile.
            </li>
            <li>
              <strong>Hefe, Salz und Gewürze:</strong> Bei großen Faktoren
              lieber etwas weniger nehmen und nachwürzen; bei Hefeteig
              verlängert etwas weniger Hefe vor allem die Gehzeit.
            </li>
            <li>
              <strong>Topf und Garzeit:</strong> Eine doppelte Menge Soße im
              gleichen Topf reduziert langsamer ein, und ein voller Bräter
              gart länger als ein halb voller.
            </li>
          </ul>
          <p>
            Wenn Sie lieber einzelne Zutaten direkt zwischen Tasse,
            Löffel und Gramm umrechnen möchten, nutzen Sie den{" "}
            <Link href="/de/kuechenmass-umrechner">
              Küchenmaß Umrechner
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
