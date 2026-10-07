"use client";

import { useEffect, useMemo, useState } from "react";
import MaterialDensityConverter from "./MaterialDensityConverter";
import MaterialMassVolumeCalculator from "./MaterialMassVolumeCalculator";
import MaterialDensityConverterUz from "./calculators/MaterialDensityConverterUz";
import MaterialMassVolumeCalculatorUz from "./calculators/MaterialMassVolumeCalculatorUz";
import { getAllMaterialProfiles, type MaterialProfile } from "../converter/materialsHub";
import { materialComparisonDefinitions } from "../converter/materialComparisons";
import { materialComparisonContextDe } from "../converter/materialComparisonsDe";
import { materialComparisonContextUz } from "../converter/materialComparisonsUz";
import { materialCategoryLabelsDe, materialNamesDe, materialVariabilityNotesDe } from "../converter/materialsDatabaseDe";
import { materialCategoryLabelsUz, materialNamesUz, materialVariabilityNotesUz } from "../converter/materialsDatabaseUz";
import { materialCategoryLabels, type MaterialCategory } from "../converter/materialsDatabase";
import { buoyancy, densityRank, litresPerKg, practicalRows, sharedShapes } from "../converter/materialPractical";
import { materialNotesDe, materialNotesTr } from "../converter/materialNotes";

type Locale = "de" | "uz" | "tr";

const CATEGORY_ORDER: MaterialCategory[] = ["metal", "sivi", "gida", "plastik", "yapi-malzemesi", "ahsap", "gaz"];

const USE_NOTES: Record<Locale, Record<MaterialCategory, string>> = {
  tr: {
    metal: "Metal yoğunluğu alaşım bileşimine, ısıl işleme ve sıcaklığa göre değişir. Bu değer, malzeme sınıfı belirtilmemiş ilk kütle ve hacim hesapları için nominal referanstır.",
    sivi: "Sıvı yoğunluğu özellikle sıcaklığa ve karışım oranına bağlıdır. Hassas dolum, ticari ürün veya güvenlik hesabında ürünün teknik föyündeki sıcaklığa bağlı değeri kullanın.",
    gaz: "Gaz yoğunluğu sıcaklık ve basınca güçlü biçimde bağlıdır. Bu değer, ilk karşılaştırma ve yaklaşık kütle hesabı içindir; proses hesabında aynı sıcaklık ve basınç koşullarındaki ölçülmüş değeri kullanın.",
    plastik: "Polimer yoğunluğu reçine türüne, dolgu maddesine ve üretim yöntemine göre değişebilir. Ürün tasarımı için üreticinin teknik veri föyündeki sınıfa özgü değeri doğrulayın.",
    "yapi-malzemesi": "Yapı malzemelerinde nem, gözeneklilik ve sıkışma derecesi yoğunluğu değiştirir. Hesap, kuru ve tipik malzeme için ilk tahmindir.",
    ahsap: "Ahşap yoğunluğu türün yanı sıra nem oranı ve lif yönüyle değişir. Kesin ağırlık hesabında ölçülen nem oranını ve gerçek parça hacmini kullanın.",
    gida: "Gıda ve mutfak malzemelerinde su, yağ ve hava oranı markaya ve hazırlama biçimine göre değişir. Sonuç, yaklaşık mutfak ve hacim hesabı içindir.",
  },
  de: {
    metal: "Die Dichte von Metallen hängt von Legierungszusammensetzung, Wärmebehandlung und Temperatur ab. Dieser Wert ist ein nominaler Ausgangspunkt für erste Massen- und Volumenberechnungen ohne festgelegte Werkstoffgüte.",
    sivi: "Die Dichte von Flüssigkeiten hängt besonders von Temperatur und Mischungsverhältnis ab. Für präzise Befüllung, Handelsprodukte oder Sicherheitsrechnungen verwenden Sie den temperaturbezogenen Wert aus dem technischen Datenblatt.",
    gaz: "Die Gasdichte hängt stark von Temperatur und Druck ab. Dieser Wert dient dem ersten Vergleich und einer groben Massenrechnung; für Prozessrechnungen ist ein Messwert unter denselben Temperatur- und Druckbedingungen nötig.",
    plastik: "Die Dichte von Polymeren kann je nach Harztyp, Füllstoff und Herstellverfahren variieren. Prüfen Sie für die Produktkonstruktion den werkstoffspezifischen Wert im Datenblatt des Herstellers.",
    "yapi-malzemesi": "Bei Baustoffen verändern Feuchte, Porosität und Verdichtungsgrad die Dichte. Die Rechnung ist eine erste Näherung für einen trockenen, typischen Werkstoff.",
    ahsap: "Die Dichte von Holz hängt neben der Holzart von Feuchte und Faserrichtung ab. Für eine genaue Gewichtsrechnung benötigen Sie die gemessene Holzfeuchte und das tatsächliche Bauteilvolumen.",
    gida: "Bei Lebensmitteln und Küchenzutaten verändern Wasser-, Fett- und Luftanteil die Dichte je nach Marke und Zubereitung. Das Ergebnis ist für eine grobe Küchen- und Volumenrechnung gedacht.",
  },
  uz: {
    metal: "Metall zichligi qotishma tarkibi, issiqlik bilan ishlov berish va haroratga qarab o'zgaradi. Bu qiymat material sinfi ko'rsatilmagan dastlabki massa va hajm hisoblari uchun nominal ma'lumotdir.",
    sivi: "Suyuqlik zichligi ayniqsa harorat va aralashma nisbatiga bog'liq. Aniq to'ldirish, tijoriy mahsulot yoki xavfsizlik hisobi uchun mahsulotning texnik varag'idagi haroratga bog'liq qiymatdan foydalaning.",
    gaz: "Gaz zichligi harorat va bosimga juda bog'liq. Bu qiymat dastlabki taqqoslash va taxminiy massa hisobi uchun; jarayon hisobida ayni harorat va bosim sharoitidagi o'lchangan qiymatdan foydalaning.",
    plastik: "Polimer zichligi smola turi, to'ldirgich va ishlab chiqarish usuliga qarab o'zgarishi mumkin. Mahsulot loyihalashda ishlab chiqaruvchining texnik varag'idagi sinfga xos qiymatni tekshiring.",
    "yapi-malzemesi": "Qurilish materiallarida namlik, g'ovaklik va siqilish darajasi zichlikni o'zgartiradi. Hisob quruq va odatiy material uchun dastlabki bahodir.",
    ahsap: "Yog'och zichligi turdan tashqari namlik va tolalar yo'nalishiga qarab o'zgaradi. Aniq og'irlik hisobida o'lchangan namlik hamda haqiqiy qism hajmidan foydalaning.",
    gida: "Oziq-ovqat va oshxona materiallarida suv, yog' va havo miqdori markaga hamda tayyorlash usuliga bog'liq. Natija taxminiy oshxona va hajm hisobi uchundir.",
  },
};

const COPY = {
  tr: {
    material: "Malzeme",
    compare: "Karşılaştır",
    none: "— karşılaştırma yok —",
    props: "Özellikler",
    density: "Yoğunluk",
    conductivity: "Isıl iletkenlik",
    modulus: "Elastisite modülü (Young modülü)",
    expansion: "Isıl genleşme katsayısı",
    viscosity: "Dinamik viskozite",
    variability: "Değişkenlik notu:",
    weighs: (n: string) => `${n} ne kadar gelir?`,
    measure: "Ölçü",
    weight: "Yaklaşık ağırlık",
    difference: "Fark",
    sameSize: "Aynı ölçüde hangisi ne kadar gelir?",
    equal: (a: string, b: string) => `${a} ve ${b} yaklaşık aynı yoğunluktadır.`,
    denser: (a: string, b: string, r: string) => `${a}, ${b} ile karşılaştırıldığında yaklaşık ${r} kat daha yoğundur (ağırdır).`,
    tonne: (a: string, va: string, b: string, vb: string) => `Ters yönden bakınca: 1 ton ${a} ${va}, 1 ton ${b} ise ${vb} yer kaplar.`,
    litre: "litre",
  },
  de: {
    material: "Material",
    compare: "Vergleichen mit",
    none: "— kein Vergleich —",
    props: "Eigenschaften",
    density: "Dichte",
    conductivity: "Wärmeleitfähigkeit",
    modulus: "Elastizitätsmodul (E-Modul)",
    expansion: "Wärmeausdehnungskoeffizient",
    viscosity: "Dynamische Viskosität",
    variability: "Hinweis zur Schwankungsbreite:",
    weighs: (n: string) => `Wie viel wiegt ${n}?`,
    measure: "Maß",
    weight: "Ungefähres Gewicht",
    difference: "Unterschied",
    sameSize: "Gleiche Maße, unterschiedliches Gewicht",
    equal: (a: string, b: string) => `${a} und ${b} haben etwa die gleiche Dichte.`,
    denser: (a: string, b: string, r: string) => `${a} ist etwa ${r}-mal so dicht (schwer) wie ${b}.`,
    tonne: (a: string, va: string, b: string, vb: string) => `Umgekehrt: 1 Tonne ${a} nimmt ${va} ein, 1 Tonne ${b} ${vb}.`,
    litre: "Liter",
  },
  uz: {
    material: "Material",
    compare: "Solishtirish",
    none: "— solishtirmaslik —",
    props: "Asosiy xususiyatlar",
    density: "Zichlik",
    conductivity: "Issiqlik o'tkazuvchanligi",
    modulus: "Elastiklik moduli (Yung moduli)",
    expansion: "Issiqlik kengayish koeffitsienti",
    viscosity: "Dinamik qovushqoqlik",
    variability: "O'zgaruvchanlik ogohlantirishi:",
    weighs: (n: string) => `${n} qancha og'ir keladi?`,
    measure: "O'lcham",
    weight: "Taxminiy og'irlik",
    difference: "Farq",
    sameSize: "Bir xil o'lchamda qaysi biri qancha keladi?",
    equal: (a: string, b: string) => `${a} va ${b} taxminan bir xil zichlikka ega.`,
    denser: (a: string, b: string, r: string) => `${a} ${b}dan taxminan ${r} marta zichroq (og'irroq).`,
    tonne: (a: string, va: string, b: string, vb: string) => `Teskari tomondan: 1 tonna ${a} ${va}, 1 tonna ${b} esa ${vb} joy egallaydi.`,
    litre: "litr",
  },
} as const;

const NAMES: Record<Locale, Record<string, string>> = { de: materialNamesDe, uz: materialNamesUz, tr: {} };
const CATEGORY_LABELS = { de: materialCategoryLabelsDe, uz: materialCategoryLabelsUz, tr: materialCategoryLabels };
const VARIABILITY: Record<Locale, Record<string, string>> = { de: materialVariabilityNotesDe, uz: materialVariabilityNotesUz, tr: {} };
const CONTEXT: Record<Locale, Record<string, string>> = {
  de: materialComparisonContextDe,
  uz: materialComparisonContextUz,
  tr: Object.fromEntries(materialComparisonDefinitions.map((d) => [d.slug, d.context])),
};
const NUMBER_LOCALE = { de: "de-DE", uz: "uz-UZ", tr: "tr-TR" };

/** Malzeme sayfalarının tek sayfadaki hali: ?m= malzeme, ?vs= karşılaştırılan, ?v= hazır karşılaştırma. */
export default function MaterialExplorer({ locale, aliases = {} }: { locale: Locale; aliases?: Record<string, string> }) {
  const materials = useMemo(() => getAllMaterialProfiles(), []);
  const byId = useMemo(() => new Map(materials.map((m) => [m.id, m])), [materials]);
  const [firstId, setFirstId] = useState("aluminyum");
  const [secondId, setSecondId] = useState("");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const q = new URLSearchParams(window.location.search);
      const resolve = (value: string | null) => {
        if (!value) return null;
        const id = aliases[value] ?? value;
        return byId.has(id) ? id : null;
      };
      const comparison = q.get("v");
      const definition = comparison ? materialComparisonDefinitions.find((d) => d.slug === (aliases[comparison] ?? comparison)) : undefined;
      if (definition) {
        setFirstId(definition.firstId);
        setSecondId(definition.secondId);
        return;
      }
      const m = resolve(q.get("m"));
      if (m) setFirstId(m);
      const vs = resolve(q.get("vs"));
      if (vs) setSecondId(vs);
    });
    return () => cancelAnimationFrame(frame);
  }, [aliases, byId]);

  const t = COPY[locale];
  const fmt = (value: number, digits = 4) => value.toLocaleString(NUMBER_LOCALE[locale], { maximumFractionDigits: digits });
  const mass = (kg: number) =>
    kg >= 1000 ? `${fmt(kg / 1000, 2)} t` : kg >= 1 ? `${fmt(kg, 2)} kg` : kg >= 0.001 ? `${fmt(kg * 1000, 1)} g` : `${fmt(kg * 1e6, 1)} mg`;
  const nameOf = (m: MaterialProfile) => NAMES[locale][m.id] ?? m.nameTr;

  const first = byId.get(firstId)!;
  const second = secondId && secondId !== firstId ? byId.get(secondId) : undefined;
  const name = nameOf(first);
  const perKg = litresPerKg(first);
  const float = buoyancy(first);
  const rank = densityRank(first);
  const variability = locale === "tr" ? first.variabilityNote : VARIABILITY[locale][first.id];
  const note = locale === "de" ? materialNotesDe[first.id] : locale === "tr" ? materialNotesTr[first.id] : undefined;
  const definition = second
    ? materialComparisonDefinitions.find(
        (d) => (d.firstId === first.id && d.secondId === second.id) || (d.firstId === second.id && d.secondId === first.id),
      )
    : undefined;

  const options = CATEGORY_ORDER.map((category) => (
    <optgroup key={category} label={CATEGORY_LABELS[locale][category]}>
      {materials
        .filter((m) => m.category === category)
        .map((m) => ({ id: m.id, label: nameOf(m) }))
        .sort((a, b) => a.label.localeCompare(b.label, locale))
        .map((m) => (
          <option key={m.id} value={m.id}>
            {m.label}
          </option>
        ))}
    </optgroup>
  ));

  const floatText =
    locale === "tr"
      ? float.kind === "gas"
        ? float.lighterThanAir
          ? `Havadan yaklaşık ${fmt(1 / float.ratio, 1)} kat hafif olduğu için yükselir ve kapalı ortamda tavana yakın birikir.`
          : `Havadan yaklaşık ${fmt(float.ratio, 1)} kat ağır olduğu için zemine çöker; sızıntıda bodrum ve çukurlarda birikir.`
        : float.floats
          ? `Suyun ${fmt(float.ratio, 2)} katı yoğunlukta olduğu için suda yüzer.`
          : float.ratio < 1.01
            ? "Yoğunluğu suya çok yakındır."
            : `Sudan ${fmt(float.ratio, 2)} kat yoğun olduğu için suda batar.`
      : locale === "de"
      ? float.kind === "gas"
        ? float.lighterThanAir
          ? `Es ist etwa ${fmt(1 / float.ratio, 1)}-mal leichter als Luft und steigt auf.`
          : `Es ist etwa ${fmt(float.ratio, 1)}-mal schwerer als Luft und sammelt sich bei einem Leck am Boden, in Kellern und Gruben.`
        : float.floats
          ? `Mit dem ${fmt(float.ratio, 2)}-Fachen der Dichte von Wasser schwimmt es.`
          : float.ratio < 1.01
            ? "Die Dichte liegt sehr nahe an der von Wasser."
            : `Mit dem ${fmt(float.ratio, 2)}-Fachen der Dichte von Wasser geht es unter.`
      : float.kind === "gas"
        ? float.lighterThanAir
          ? `Havodan taxminan ${fmt(1 / float.ratio, 1)} marta yengil, shuning uchun yuqoriga ko'tariladi.`
          : `Havodan taxminan ${fmt(float.ratio, 1)} marta og'ir, sizib chiqqanda pastda, yerto'la va chuqurlarda to'planadi.`
        : float.floats
          ? `Zichligi suvnikining ${fmt(float.ratio, 2)} qismiga teng, shuning uchun suvda suzadi.`
          : float.ratio < 1.01
            ? "Zichligi suvnikiga juda yaqin."
            : `Suvdan ${fmt(float.ratio, 2)} marta zich, shuning uchun suvga cho'kadi.`;
  const volumeText = perKg >= 1000 ? `${fmt(perKg / 1000, 2)} m³` : perKg >= 1 ? `${fmt(perKg, 2)} ${t.litre}` : `${fmt(perKg * 1000, 1)} ${locale === "uz" ? "sm³" : "cm³"}`;
  const tonVolume = (m: MaterialProfile) => {
    const m3 = litresPerKg(m);
    return m3 >= 1 ? `${fmt(m3, 2)} m³` : `${fmt(m3 * 1000, 0)} ${t.litre}`;
  };

  return (
    <div className="date-calc" id={{ de: "rechner", uz: "hisoblash", tr: "hesapla" }[locale]}>
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>{t.material}</span>
            <select value={firstId} onChange={(e) => setFirstId(e.target.value)}>
              {options}
            </select>
          </label>
          <label className="date-calc-field">
            <span>{t.compare}</span>
            <select value={secondId} onChange={(e) => setSecondId(e.target.value)}>
              <option value="">{t.none}</option>
              {options}
            </select>
          </label>
        </div>
      </div>

      <section className="category-article-content">
        <h2>
          {name} — {t.props}
        </h2>
        <dl className="unit-facts">
          <div>
            <dt>{t.density}</dt>
            <dd>
              {fmt(first.densityKgM3)} kg/m³ ({fmt(first.densityKgM3 / 1000)} {locale === "uz" ? "g/sm³" : "g/cm³"})
            </dd>
          </div>
          {first.thermalConductivityWmK !== null && (
            <div>
              <dt>{t.conductivity}</dt>
              <dd>
                {first.variabilityNote && "~"}
                {first.thermalConductivityWmK} W/(m·K)
              </dd>
            </div>
          )}
          {first.elasticModulusGPa !== null && (
            <div>
              <dt>{t.modulus}</dt>
              <dd>{first.elasticModulusGPa} GPa</dd>
            </div>
          )}
          {first.thermalExpansionPerMillionK !== null && (
            <div>
              <dt>{t.expansion}</dt>
              <dd>{first.thermalExpansionPerMillionK} × 10⁻⁶/K</dd>
            </div>
          )}
          {first.viscosityMPaS !== null && (
            <div>
              <dt>{t.viscosity}</dt>
              <dd>
                {first.variabilityNote && "~"}
                {first.viscosityMPaS} mPa·s
              </dd>
            </div>
          )}
        </dl>
        {variability && (
          <p>
            <strong>{t.variability}</strong> {variability}
          </p>
        )}

        {second ? (
          <>
            <h2>{t.sameSize}</h2>
            <p>
              {Math.abs(first.densityKgM3 - second.densityKgM3) / Math.max(first.densityKgM3, second.densityKgM3) < 0.01
                ? t.equal(name, nameOf(second))
                : first.densityKgM3 > second.densityKgM3
                  ? t.denser(name, nameOf(second), fmt(first.densityKgM3 / second.densityKgM3, 2))
                  : t.denser(nameOf(second), name, fmt(second.densityKgM3 / first.densityKgM3, 2))}{" "}
              {definition && (CONTEXT[locale][definition.slug] ?? "")}
            </p>
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th scope="col">{t.measure}</th>
                    <th scope="col">{name}</th>
                    <th scope="col">{nameOf(second)}</th>
                    <th scope="col">{t.difference}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">{t.density}</th>
                    <td>{fmt(first.densityKgM3)} kg/m³</td>
                    <td>{fmt(second.densityKgM3)} kg/m³</td>
                    <td>{fmt(Math.abs(first.densityKgM3 - second.densityKgM3))} kg/m³</td>
                  </tr>
                  {sharedShapes(first, second, locale).map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td>{mass(row.firstKg)}</td>
                      <td>{mass(row.secondKg)}</td>
                      <td>{mass(Math.abs(row.firstKg - row.secondKg))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>{t.tonne(name, tonVolume(first), nameOf(second), tonVolume(second))}</p>
          </>
        ) : (
          <>
            <h2>{t.weighs(name)}</h2>
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th scope="col">{t.measure}</th>
                    <th scope="col">{t.weight}</th>
                  </tr>
                </thead>
                <tbody>
                  {practicalRows(first, locale).map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td>{mass(row.massKg)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              {locale === "de"
                ? `1 kg ${name} nimmt etwa ${volumeText} ein. `
                : locale === "tr"
                  ? `1 kg ${name} yaklaşık ${volumeText} yer kaplar. `
                  : `1 kg ${name} taxminan ${volumeText} joy egallaydi. `}
              {floatText}
            </p>
            <p>
              {locale === "tr"
                ? `Bu sitedeki ${rank.total} malzeme en yoğundan en hafife sıralandığında ${rank.overall}. sırada, ${CATEGORY_LABELS.tr[first.category].toLocaleLowerCase("tr")} arasında ${rank.categoryTotal} malzemenin ${rank.inCategory}. sırasındadır. `
                : locale === "de"
                ? `Unter ${rank.total} Materialien steht ${name} nach Dichte auf Platz ${rank.overall}, in der Gruppe ${CATEGORY_LABELS.de[first.category]} auf Platz ${rank.inCategory} von ${rank.categoryTotal}. `
                : `${rank.total} material ichida zichlik bo'yicha ${rank.overall}-o'rinda, ${CATEGORY_LABELS.uz[first.category]} guruhida ${rank.categoryTotal} tadan ${rank.inCategory}-o'rinda. `}
              {USE_NOTES[locale][first.category]}
            </p>
            {note && (
              <>
                <h3>{note.heading}</h3>
                {note.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </>
            )}
          </>
        )}
      </section>

      {locale === "uz" ? (
        <>
          <MaterialMassVolumeCalculatorUz key={`m-${first.id}`} densityKgM3={first.densityKgM3} materialName={name} />
          <MaterialDensityConverterUz key={`d-${first.id}`} densityKgM3={first.densityKgM3} materialName={name} />
        </>
      ) : (
        <>
          <MaterialMassVolumeCalculator key={`m-${first.id}`} locale={locale} densityKgM3={first.densityKgM3} materialName={name} />
          <MaterialDensityConverter key={`d-${first.id}`} locale={locale} densityKgM3={first.densityKgM3} materialName={name} />
        </>
      )}
    </div>
  );
}
