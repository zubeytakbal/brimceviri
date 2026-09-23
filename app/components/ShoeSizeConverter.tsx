"use client";

import { useMemo, useState } from "react";
import {
  type ShoeBrandKey,
  type ShoeSizeGroupKey,
  type ShoeSizeRow,
  findShoeSizeRow,
  getShoeSizeRows,
} from "../converter/shoeSizeTable";

type SystemKey = "eu" | "us" | "uk" | "cm";
type Locale = "tr" | "en" | "de" | "ar" | "uz" | "bn" | "fr" | "es" | "es-419" | "pt" | "it" | "nl" | "sv" | "no" | "da";

const systemLabels: Record<Locale, Record<SystemKey, string>> = {
  tr: {
    eu: "TR / Avrupa (EU)",
    us: "ABD (US)",
    uk: "Ingiltere (UK)",
    cm: "Ayak Uzunlugu (cm)",
  },
  en: {
    eu: "EU",
    us: "US",
    uk: "UK",
    cm: "Foot Length (cm)",
  },
  de: {
    eu: "EU",
    us: "US",
    uk: "UK",
    cm: "Fusslaenge (cm)",
  },
  ar: {
    eu: "أوروبا (EU)",
    us: "أمريكا (US)",
    uk: "بريطانيا (UK)",
    cm: "طول القدم (سم)",
  },
  uz: {
    eu: "Yevropa (EU)",
    us: "AQSH (US)",
    uk: "Angliya (UK)",
    cm: "Oyoq Uzunligi (sm)",
  },
  bn: {
    eu: "ইউরোপ (EU)",
    us: "যুক্তরাষ্ট্র (US)",
    uk: "যুক্তরাজ্য (UK)",
    cm: "পায়ের দৈর্ঘ্য (সেমি)",
  },
  fr: {
    eu: "France / Europe (FR/EU)",
    us: "Etats-Unis (US)",
    uk: "Royaume-Uni (UK)",
    cm: "Longueur du pied (cm)",
  },
  es: {
    eu: "España / Europa (EU)",
    us: "Estados Unidos (US)",
    uk: "Reino Unido (UK)",
    cm: "Longitud del pie (cm)",
  },
  "es-419": {
    eu: "Europa (EU)",
    us: "Estados Unidos (US)",
    uk: "Reino Unido (UK)",
    cm: "Longitud del pie (cm)",
  },
  pt: {
    eu: "Europa (EU)",
    us: "Estados Unidos (US)",
    uk: "Reino Unido (UK)",
    cm: "Comprimento do Pe (cm)",
  },
  it: {
    eu: "Italia / Europa (EU)",
    us: "Stati Uniti (US)",
    uk: "Regno Unito (UK)",
    cm: "Lunghezza del Piede (cm)",
  },
  nl: { eu: "Europa (EU)", us: "Verenigde Staten (US)", uk: "Verenigd Koninkrijk (UK)", cm: "Voetlengte (cm)" },
  sv: { eu: "Sverige / Europa (EU)", us: "USA (US)", uk: "Storbritannien (UK)", cm: "Fotlangd (cm)" },
  no: { eu: "Norge / Europa (EU)", us: "USA (US)", uk: "Storbritannia (UK)", cm: "Fotlengde (cm)" },
  da: { eu: "Danmark / Europa (EU)", us: "USA (US)", uk: "Storbritannien (UK)", cm: "Fodlaengde (cm)" },
};

const brandLabels: Record<Locale, Record<ShoeBrandKey, string>> = {
  tr: {
    genel: "Genel (Standart)",
    nike: "Nike",
    adidas: "Adidas",
    puma: "Puma",
    "new-balance": "New Balance",
    converse: "Converse",
  },
  en: {
    genel: "General (Standard)",
    nike: "Nike",
    adidas: "Adidas",
    puma: "Puma",
    "new-balance": "New Balance",
    converse: "Converse",
  },
  de: {
    genel: "Allgemein (Standard)",
    nike: "Nike",
    adidas: "Adidas",
    puma: "Puma",
    "new-balance": "New Balance",
    converse: "Converse",
  },
  ar: {
    genel: "عام",
    nike: "Nike",
    adidas: "Adidas",
    puma: "Puma",
    "new-balance": "New Balance",
    converse: "Converse",
  },
  uz: {
    genel: "Umumiy (Standart)",
    nike: "Nike",
    adidas: "Adidas",
    puma: "Puma",
    "new-balance": "New Balance",
    converse: "Converse",
  },
  bn: {
    genel: "সাধারণ (স্ট্যান্ডার্ড)",
    nike: "Nike",
    adidas: "Adidas",
    puma: "Puma",
    "new-balance": "New Balance",
    converse: "Converse",
  },
  fr: {
    genel: "General (standard)",
    nike: "Nike",
    adidas: "Adidas",
    puma: "Puma",
    "new-balance": "New Balance",
    converse: "Converse",
  },
  es: {
    genel: "General (estandar)",
    nike: "Nike",
    adidas: "Adidas",
    puma: "Puma",
    "new-balance": "New Balance",
    converse: "Converse",
  },
  "es-419": {
    genel: "General (estandar)",
    nike: "Nike",
    adidas: "Adidas",
    puma: "Puma",
    "new-balance": "New Balance",
    converse: "Converse",
  },
  pt: {
    genel: "Geral (Padrao)",
    nike: "Nike",
    adidas: "Adidas",
    puma: "Puma",
    "new-balance": "New Balance",
    converse: "Converse",
  },
  it: {
    genel: "Generale (Standard)",
    nike: "Nike",
    adidas: "Adidas",
    puma: "Puma",
    "new-balance": "New Balance",
    converse: "Converse",
  },
  nl: { genel: "Algemeen (standaard)", nike: "Nike", adidas: "Adidas", puma: "Puma", "new-balance": "New Balance", converse: "Converse" },
  sv: { genel: "Allman (standard)", nike: "Nike", adidas: "Adidas", puma: "Puma", "new-balance": "New Balance", converse: "Converse" },
  no: { genel: "Generell (standard)", nike: "Nike", adidas: "Adidas", puma: "Puma", "new-balance": "New Balance", converse: "Converse" },
  da: { genel: "Generel (standard)", nike: "Nike", adidas: "Adidas", puma: "Puma", "new-balance": "New Balance", converse: "Converse" },
};

const groupLabels: Record<Locale, Record<ShoeSizeGroupKey, string>> = {
  tr: {
    erkek: "Erkek",
    kadin: "Kadin",
    bebek: "Bebek / Kucuk Cocuk",
    "buyuk-cocuk": "Buyuk Cocuk",
  },
  en: {
    erkek: "Men",
    kadin: "Women",
    bebek: "Toddler / Little Kid",
    "buyuk-cocuk": "Big Kid",
  },
  de: {
    erkek: "Herren",
    kadin: "Damen",
    bebek: "Kleinkind",
    "buyuk-cocuk": "Groessere Kinder",
  },
  ar: {
    erkek: "رجال",
    kadin: "نساء",
    bebek: "رضع / أطفال صغار",
    "buyuk-cocuk": "أطفال أكبر سنا",
  },
  uz: {
    erkek: "Erkaklar",
    kadin: "Ayollar",
    bebek: "Chaqaloq / Kichik Bola",
    "buyuk-cocuk": "Katta Bola",
  },
  bn: {
    erkek: "পুরুষ",
    kadin: "নারী",
    bebek: "শিশু / ছোট বাচ্চা",
    "buyuk-cocuk": "বড় বাচ্চা",
  },
  fr: {
    erkek: "Homme",
    kadin: "Femme",
    bebek: "Bebe / Petit enfant",
    "buyuk-cocuk": "Grand enfant",
  },
  es: {
    erkek: "Hombre",
    kadin: "Mujer",
    bebek: "Bebe / Nino pequeno",
    "buyuk-cocuk": "Nino mayor",
  },
  "es-419": {
    erkek: "Hombre",
    kadin: "Mujer",
    bebek: "Bebe / Nino pequeno",
    "buyuk-cocuk": "Nino mayor",
  },
  pt: {
    erkek: "Masculino",
    kadin: "Feminino",
    bebek: "Bebe / Crianca Pequena",
    "buyuk-cocuk": "Crianca Maior",
  },
  it: {
    erkek: "Uomo",
    kadin: "Donna",
    bebek: "Neonato / Bambino Piccolo",
    "buyuk-cocuk": "Bambino Grande",
  },
  nl: { erkek: "Heren", kadin: "Dames", bebek: "Baby / klein kind", "buyuk-cocuk": "Groter kind" },
  sv: { erkek: "Herr", kadin: "Dam", bebek: "Spadbarn / smabarn", "buyuk-cocuk": "Storre barn" },
  no: { erkek: "Herre", kadin: "Dame", bebek: "Spedbarn / smabarn", "buyuk-cocuk": "Storre barn" },
  da: { erkek: "Herre", kadin: "Dame", bebek: "Spaedbarn / smabarn", "buyuk-cocuk": "Storre born" },
};

const copy = {
  tr: {
    group: "Grup",
    brand: "Marka",
    knownSystem: "Bildigin Sistem",
    value: "Deger",
    matchingSizes: "Eslesen Numaralar",
    invalidValue:
      "Gecerli bir sayi girerek sonucu gorebilirsiniz.",
    euResult: "TR / EU",
    usResult: "ABD (US)",
    ukResult: "Ingiltere (UK)",
    footLength: "Ayak Uzunlugu",
    chartSuffix: "ayakkabi numarasi tablosu",
  },
  en: {
    group: "Group",
    brand: "Brand",
    knownSystem: "Known System",
    value: "Value",
    matchingSizes: "Matching Sizes",
    invalidValue:
      "Enter a valid number to see the closest match.",
    euResult: "EU",
    usResult: "US",
    ukResult: "UK",
    footLength: "Foot Length",
    chartSuffix: "shoe size chart",
  },
  de: {
    group: "Gruppe",
    brand: "Marke",
    knownSystem: "Bekanntes System",
    value: "Wert",
    matchingSizes: "Passende Groessen",
    invalidValue:
      "Geben Sie eine gueltige Zahl ein, um den naechsten Treffer zu sehen.",
    euResult: "EU",
    usResult: "US",
    ukResult: "UK",
    footLength: "Fusslaenge",
    chartSuffix: "Schuhgroessentabelle",
  },
  ar: {
    group: "الفئة",
    brand: "العلامة التجارية",
    knownSystem: "النظام المعروف",
    value: "القيمة",
    matchingSizes: "المقاسات المطابقة",
    invalidValue: "أدخل رقما صحيحا لعرض أقرب مقاس.",
    euResult: "EU",
    usResult: "US",
    ukResult: "UK",
    footLength: "طول القدم",
    chartSuffix: "جدول مقاسات الأحذية",
  },
  uz: {
    group: "Guruh",
    brand: "Brend",
    knownSystem: "Ma'lum Tizim",
    value: "Qiymat",
    matchingSizes: "Mos O'lchamlar",
    invalidValue:
      "Natijani ko'rish uchun to'g'ri raqam kiriting.",
    euResult: "Yevropa (EU)",
    usResult: "AQSH (US)",
    ukResult: "Angliya (UK)",
    footLength: "Oyoq Uzunligi",
    chartSuffix: "oyoq kiyimi o'lchamlari jadvali",
  },
  bn: {
    group: "গ্রুপ",
    brand: "ব্র্যান্ড",
    knownSystem: "পরিচিত পদ্ধতি",
    value: "মান",
    matchingSizes: "মিলে যাওয়া মাপ",
    invalidValue: "নিকটতম মিল দেখতে একটি সঠিক সংখ্যা লিখুন।",
    euResult: "ইউরোপ (EU)",
    usResult: "যুক্তরাষ্ট্র (US)",
    ukResult: "যুক্তরাজ্য (UK)",
    footLength: "পায়ের দৈর্ঘ্য",
    chartSuffix: "জুতার মাপের তালিকা",
  },
  fr: {
    group: "Groupe",
    brand: "Marque",
    knownSystem: "Systeme connu",
    value: "Valeur",
    matchingSizes: "Pointures correspondantes",
    invalidValue: "Saisissez un nombre valide pour voir la correspondance.",
    euResult: "France (FR/EU)",
    usResult: "Etats-Unis (US)",
    ukResult: "Royaume-Uni (UK)",
    footLength: "Longueur du pied",
    chartSuffix: "tableau des pointures",
  },
  es: {
    group: "Grupo",
    brand: "Marca",
    knownSystem: "Sistema conocido",
    value: "Valor",
    matchingSizes: "Tallas equivalentes",
    invalidValue: "Introduce un numero valido para ver la equivalencia.",
    euResult: "Espana (EU)",
    usResult: "Estados Unidos (US)",
    ukResult: "Reino Unido (UK)",
    footLength: "Longitud del pie",
    chartSuffix: "tabla de tallas",
  },
  "es-419": {
    group: "Grupo",
    brand: "Marca",
    knownSystem: "Sistema conocido",
    value: "Valor",
    matchingSizes: "Tallas equivalentes",
    invalidValue: "Introduce un numero valido para ver la equivalencia.",
    euResult: "Europa (EU)",
    usResult: "Estados Unidos (US)",
    ukResult: "Reino Unido (UK)",
    footLength: "Longitud del pie",
    chartSuffix: "tabla de tallas",
  },
  pt: {
    group: "Grupo",
    brand: "Marca",
    knownSystem: "Sistema Conhecido",
    value: "Valor",
    matchingSizes: "Tamanhos Equivalentes",
    invalidValue: "Digite um numero valido para ver a equivalencia.",
    euResult: "Europa (EU)",
    usResult: "Estados Unidos (US)",
    ukResult: "Reino Unido (UK)",
    footLength: "Comprimento do Pe",
    chartSuffix: "tabela de tamanhos",
  },
  it: {
    group: "Gruppo",
    brand: "Marca",
    knownSystem: "Sistema Conosciuto",
    value: "Valore",
    matchingSizes: "Taglie Corrispondenti",
    invalidValue: "Inserisci un numero valido per vedere la corrispondenza.",
    euResult: "Italia (EU)",
    usResult: "Stati Uniti (US)",
    ukResult: "Regno Unito (UK)",
    footLength: "Lunghezza del Piede",
    chartSuffix: "tabella delle taglie",
  },
  nl: {
    group: "Groep", brand: "Merk", knownSystem: "Bekend systeem", value: "Waarde",
    matchingSizes: "Overeenkomende maten", invalidValue: "Voer een geldig getal in om de dichtstbijzijnde maat te zien.",
    euResult: "EU", usResult: "US", ukResult: "VK", footLength: "Voetlengte", chartSuffix: "schoenmaattabel",
  },
  sv: {
    group: "Grupp", brand: "Marke", knownSystem: "Kant system", value: "Varde",
    matchingSizes: "Motsvarande storlekar", invalidValue: "Ange ett giltigt tal for att se motsvarigheten.",
    euResult: "EU", usResult: "US", ukResult: "UK", footLength: "Fotlangd", chartSuffix: "storlekstabell",
  },
  no: {
    group: "Gruppe", brand: "Merke", knownSystem: "Kjent system", value: "Verdi",
    matchingSizes: "Tilsvarende storrelser", invalidValue: "Skriv inn et gyldig tall for a se den naermeste storrelsen.",
    euResult: "EU", usResult: "US", ukResult: "UK", footLength: "Fotlengde", chartSuffix: "storrelsestabell",
  },
  da: {
    group: "Gruppe", brand: "Maerke", knownSystem: "Kendt system", value: "Vaerdi",
    matchingSizes: "Tilsvarende storrelser", invalidValue: "Indtast et gyldigt tal for at se den naermeste storrelse.",
    euResult: "EU", usResult: "US", ukResult: "UK", footLength: "Fodlaengde", chartSuffix: "storrelsestabel",
  },
} as const;

const brandOrder: ShoeBrandKey[] = [
  "genel",
  "nike",
  "adidas",
  "puma",
  "new-balance",
  "converse",
];

const groupOrder: ShoeSizeGroupKey[] = [
  "erkek",
  "kadin",
  "bebek",
  "buyuk-cocuk",
];

function getNumberLocale(locale: Locale) {
  if (locale === "tr") {
    return "tr-TR";
  }

  if (locale === "de") {
    return "de-DE";
  }

  if (locale === "ar") {
    return "ar";
  }

  if (locale === "uz") {
    return "uz-UZ";
  }

  if (locale === "bn") {
    return "bn-BD";
  }

  if (locale === "fr") {
    return "fr-FR";
  }

  if (locale === "es") {
    return "es-ES";
  }

  if (locale === "es-419") {
    return "es-419";
  }

  if (locale === "pt") {
    return "pt-BR";
  }

  if (locale === "it") {
    return "it-IT";
  }

  if (locale === "nl") {
    return "nl-NL";
  }

  if (locale === "sv") {
    return "sv-SE";
  }

  if (locale === "no") {
    return "nb-NO";
  }

  if (locale === "da") {
    return "da-DK";
  }

  return "en-US";
}

function formatEu(value: number, locale: Locale) {
  const whole = Math.floor(value);
  const fraction = value - whole;

  if (Math.abs(fraction - 1 / 3) < 0.02) {
    return `${whole} 1/3`;
  }

  if (Math.abs(fraction - 2 / 3) < 0.02) {
    return `${whole} 2/3`;
  }

  if (fraction < 0.02) {
    return `${whole}`;
  }

  return value.toLocaleString(getNumberLocale(locale), {
    maximumFractionDigits: 1,
  });
}

function formatValue(value: number, locale: Locale) {
  return value.toLocaleString(getNumberLocale(locale), {
    maximumFractionDigits: 1,
  });
}

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return null;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

export default function ShoeSizeConverter({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const [group, setGroup] = useState<ShoeSizeGroupKey>("erkek");
  const [brand, setBrand] = useState<ShoeBrandKey>("genel");
  const [system, setSystem] = useState<SystemKey>("eu");
  const [inputValue, setInputValue] = useState("42");

  const hasBrands = group === "erkek" || group === "kadin";
  const rows = useMemo(
    () => getShoeSizeRows(group, hasBrands ? brand : "genel"),
    [group, brand, hasBrands]
  );

  const parsedValue = parseNumericValue(inputValue);
  const matchedRow: ShoeSizeRow | null =
    parsedValue === null || Number.isNaN(parsedValue)
      ? null
      : findShoeSizeRow(
          group,
          system,
          parsedValue,
          hasBrands ? brand : "genel"
        );

  const localizedCopy = copy[locale];
  const localizedSystemLabels = systemLabels[locale];
  const localizedBrandLabels = brandLabels[locale];
  const localizedGroupLabels = groupLabels[locale];

  return (
    <div className="category-general-converter shoe-size-converter">
      <div className="shoe-size-converter-grid">
        <label className="category-general-converter-field">
          <span>{localizedCopy.group}</span>
          <select
            value={group}
            onChange={(event) => {
              setGroup(event.target.value as ShoeSizeGroupKey);
            }}
          >
            {groupOrder.map((groupKey) => (
              <option key={groupKey} value={groupKey}>
                {localizedGroupLabels[groupKey]}
              </option>
            ))}
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>{localizedCopy.brand}</span>
          <select
            value={hasBrands ? brand : "genel"}
            disabled={!hasBrands}
            onChange={(event) => {
              setBrand(event.target.value as ShoeBrandKey);
            }}
          >
            {brandOrder.map((brandKey) => (
              <option key={brandKey} value={brandKey}>
                {localizedBrandLabels[brandKey]}
              </option>
            ))}
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>{localizedCopy.knownSystem}</span>
          <select
            value={system}
            onChange={(event) => {
              setSystem(event.target.value as SystemKey);
            }}
          >
            {(Object.keys(localizedSystemLabels) as SystemKey[]).map(
              (systemKey) => (
                <option key={systemKey} value={systemKey}>
                  {localizedSystemLabels[systemKey]}
                </option>
              )
            )}
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>{localizedCopy.value}</span>
          <input
            inputMode="decimal"
            type="text"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result"
      >
        <p>{localizedCopy.matchingSizes}</p>

        {parsedValue === null || Number.isNaN(parsedValue) || !matchedRow ? (
          <strong>{localizedCopy.invalidValue}</strong>
        ) : (
          <div className="shoe-size-converter-result-grid">
            <div>
              <span>{localizedCopy.euResult}</span>
              <strong>{formatEu(matchedRow.eu, locale)}</strong>
            </div>
            <div>
              <span>{localizedCopy.usResult}</span>
              <strong>{formatValue(matchedRow.us, locale)}</strong>
            </div>
            <div>
              <span>{localizedCopy.ukResult}</span>
              <strong>{formatValue(matchedRow.uk, locale)}</strong>
            </div>
            <div>
              <span>{localizedCopy.footLength}</span>
              <strong>{formatValue(matchedRow.cm, locale)} cm</strong>
            </div>
          </div>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>
            {localizedGroupLabels[group]}
            {hasBrands ? ` - ${localizedBrandLabels[brand]}` : ""}
            {" "}
            {localizedCopy.chartSuffix}
          </caption>
          <thead>
            <tr>
              <th scope="col">{localizedCopy.euResult}</th>
              <th scope="col">{localizedCopy.usResult}</th>
              <th scope="col">{localizedCopy.ukResult}</th>
              <th scope="col">{localizedCopy.footLength}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.eu}-${row.us}`}>
                <td>{formatEu(row.eu, locale)}</td>
                <td>{formatValue(row.us, locale)}</td>
                <td>{formatValue(row.uk, locale)}</td>
                <td>{formatValue(row.cm, locale)} cm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
