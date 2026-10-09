import { kitchenIngredientRows, mlPerVolumeUnit } from "../converter/kitchenMeasures";
import { shoeBrands } from "../converter/shoeSizeTable";

// Extra uitleg voor de Nederlandse rekenpagina's: voorbeelden en tabellen die uit dezelfde
// gegevens komen als de rekenhulpen.

const nl = (v: number, d = 1) => v.toLocaleString("nl-NL", { maximumFractionDigits: d });

function Tabel({ kop, rijen }: { kop: string[]; rijen: Array<Array<string | number>> }) {
  return (
    <div className="conversion-table-wrap">
      <table className="conversion-table">
        <thead>
          <tr>
            {kop.map((k) => (
              <th key={k}>{k}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rijen.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const RECEPT: Array<[string, number, string]> = [
  ["Bloem", 250, "g"],
  ["Suiker", 150, "g"],
  ["Eieren", 3, "stuks"],
  ["Melk", 200, "ml"],
  ["Boter", 125, "g"],
];

export function ReceptUitleg() {
  return (
    <section className="category-article-content">
      <h2>Voorbeeld: cake voor 4 wordt cake voor 6</h2>
      <p>De factor is 6 / 4 = 1,5. Elke hoeveelheid wordt met 1,5 vermenigvuldigd:</p>
      <Tabel kop={["Ingrediënt", "Voor 4", "Voor 6"]} rijen={RECEPT.map(([n, q, e]) => [n, `${nl(q)} ${e}`, `${nl(q * 1.5)} ${e}`])} />
      <p>
        4,5 eieren kun je niet afwegen: neem 4 grote of 5 kleine eieren, of klop een vijfde ei los en gebruik daar ongeveer de helft
        van.
      </p>
      <h2>Bakvorm en baktijd</h2>
      <p>
        De oppervlakte van een ronde vorm groeit met het kwadraat van de diameter. Van een springvorm van 20 cm naar een van 26 cm
        is (26 / 20)² ≈ 1,69 keer zo veel oppervlak: geschikt voor een recept dat met ongeveer 1,7 is vermenigvuldigd, bij dezelfde
        hoogte. De baktijd verdubbelt niet met de hoeveelheid; de dikte van het deeg bepaalt hoe lang het duurt. Wordt het deeg
        dikker, bak dan iets lager en langer en controleer met een satéprikker.
      </p>
    </section>
  );
}

const KEUKEN: Array<[string, string]> = [
  ["un", "Bloem"],
  ["toz-seker", "Kristalsuiker"],
  ["sut", "Melk"],
  ["tereyagi", "Boter"],
];

export function KeukenmatenUitleg() {
  const beker = mlPerVolumeUnit.bardak;
  return (
    <section className="category-article-content">
      <h2>Hoeveel gram is een beker, eetlepel of theelepel?</h2>
      <p>
        Deze rekenhulp gaat uit van een beker van {beker} ml, een eetlepel van 15 ml en een theelepel van 5 ml. Een Amerikaanse cup is
        groter, ongeveer 240 ml; reken bij Amerikaanse recepten dus met ongeveer 20% meer.
      </p>
      <Tabel
        kop={["Ingrediënt", `Beker (${beker} ml)`, "Eetlepel (15 ml)", "Theelepel (5 ml)"]}
        rijen={KEUKEN.map(([key, naam]) => {
          const g = kitchenIngredientRows.find((r) => r.key === key)?.gramsPerBardak ?? 0;
          return [naam, `${nl(g, 0)} g`, `${nl((g * 15) / beker)} g`, `${nl((g * 5) / beker)} g`];
        })}
      />
      <p>
        Bloem weegt per lepel veel minder dan suiker of boter, omdat er lucht tussen de deeltjes zit. Schep bloem losjes in de maat en
        strijk af; aandrukken kan tot een kwart meer opleveren. Voor bakken is een keukenweegschaal het nauwkeurigst.
      </p>
    </section>
  );
}

export function HistorischUitleg() {
  return (
    <section className="category-article-content">
      <h2>Oude Nederlandse maten</h2>
      <p>
        Voor de invoering van het metrieke stelsel in 1820 had bijna elke stad of streek eigen maten. De bekendste zijn hieronder
        omgerekend; de waarden zijn de gangbare omrekeningen en kunnen per bron licht verschillen.
      </p>
      <Tabel
        kop={["Maat", "Waarde", "In meter of gram"]}
        rijen={[
          ["Amsterdamse voet", "11 duim", "0,2831 m"],
          ["Rijnlandse voet", "12 duim", "0,3139 m"],
          ["Amsterdamse el", "—", "0,688 m"],
          ["Amsterdams pond", "16 ons (oud)", "494 g"],
        ]}
      />
      <h2>Ons en pond in de winkel</h2>
      <p>
        Bij de invoering van het metrieke stelsel kregen metrieke eenheden Nederlandse namen: de el werd de meter en het pond de
        kilogram. In de volksmond leven vooral &quot;ons&quot; en &quot;pond&quot; voort, maar met een metrieke waarde: een ons is 100 gram
        en een pond 500 gram. Wie bij de bakker &quot;een half pond&quot; vraagt, krijgt dus 250 gram.
      </p>
    </section>
  );
}

export function SchoenmatenUitleg() {
  const heren = shoeBrands.genel.men.filter((r) => Number.isInteger(r.eu));
  return (
    <section className="category-article-content">
      <h2>Herenmaten: EU, VS, VK en voetlengte</h2>
      <Tabel kop={["EU", "VS", "VK", "Voetlengte (cm)"]} rijen={heren.map((r) => [nl(r.eu), nl(r.us), nl(r.uk), nl(r.cm)])} />
      <h2>Zo meet je je voet</h2>
      <p>
        Zet je hiel tegen een muur op een vel papier en markeer de punt van je langste teen. Meet de afstand in centimeters, bij
        voorkeur aan het eind van de dag, wanneer voeten iets dikker zijn. Meet beide voeten en ga uit van de langste. Zit je tussen
        twee maten in, kies dan de grotere, zeker bij wandel- en sportschoenen.
      </p>
      <p>
        Merken gebruiken eigen leesten: dezelfde voet kan bij Nike een andere EU-maat hebben dan bij Adidas. Kies daarom in de
        rekenhulp het merk als je dat weet.
      </p>
    </section>
  );
}
