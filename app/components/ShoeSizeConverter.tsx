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
type Locale = "tr" | "en" | "de" | "ar" | "bn" | "fr" | "es" | "pt" | "it" | "nl";

const systemLabels: Record<Locale, Record<SystemKey, string>> = {
  tr: {
    eu: "TR / Avrupa (EU)",
    us: "ABD (US)",
    uk: "İngiltere (UK)",
    cm: "Ayak Uzunluğu (cm)",
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
    cm: "Fußlänge (cm)",
  },
  ar: {
    eu: "أوروبا (EU)",
    us: "أمريكا (US)",
    uk: "بريطانيا (UK)",
    cm: "طول القدم (سم)",
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
  pt: {
    eu: "Europa (EU)",
    us: "Estados Unidos (US)",
    uk: "Reino Unido (UK)",
    cm: "Comprimento do Pé (cm)",
  },
  it: {
    eu: "Italia / Europa (EU)",
    us: "Stati Uniti (US)",
    uk: "Regno Unito (UK)",
    cm: "Lunghezza del Piede (cm)",
  },
  nl: { eu: "Europa (EU)", us: "Verenigde Staten (US)", uk: "Verenigd Koninkrijk (UK)", cm: "Voetlengte (cm)" },
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
    genel: "General (estándar)",
    nike: "Nike",
    adidas: "Adidas",
    puma: "Puma",
    "new-balance": "New Balance",
    converse: "Converse",
  },
  pt: {
    genel: "Geral (Padrão)",
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
};

const groupLabels: Record<Locale, Record<ShoeSizeGroupKey, string>> = {
  tr: {
    erkek: "Erkek",
    kadin: "Kadın",
    bebek: "Bebek / Küçük Çocuk",
    "buyuk-cocuk": "Büyük Çocuk",
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
    "buyuk-cocuk": "Größere Kinder",
  },
  ar: {
    erkek: "رجال",
    kadin: "نساء",
    bebek: "رضع / أطفال صغار",
    "buyuk-cocuk": "أطفال أكبر سنا",
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
    bebek: "Bebe / Niño pequeño",
    "buyuk-cocuk": "Niño mayor",
  },
  pt: {
    erkek: "Masculino",
    kadin: "Feminino",
    bebek: "Bebê / Criança Pequena",
    "buyuk-cocuk": "Criança Maior",
  },
  it: {
    erkek: "Uomo",
    kadin: "Donna",
    bebek: "Neonato / Bambino Piccolo",
    "buyuk-cocuk": "Bambino Grande",
  },
  nl: { erkek: "Heren", kadin: "Dames", bebek: "Baby / klein kind", "buyuk-cocuk": "Groter kind" },
};

const copy = {
  tr: {
    group: "Grup",
    brand: "Marka",
    knownSystem: "Bildiğin Sistem",
    value: "Değer",
    matchingSizes: "Eşleşen Numaralar",
    invalidValue:
      "Geçerli bir sayı girerek sonucu görebilirsiniz.",
    euResult: "TR / EU",
    usResult: "ABD (US)",
    ukResult: "İngiltere (UK)",
    footLength: "Ayak Uzunluğu",
    chartSuffix: "ayakkabı numarası tablosu",
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
    matchingSizes: "Passende Größen",
    invalidValue:
      "Geben Sie eine gültige Zahl ein, um den nächsten Treffer zu sehen.",
    euResult: "EU",
    usResult: "US",
    ukResult: "UK",
    footLength: "Fußlänge",
    chartSuffix: "Schuhgrößentabelle",
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
    euResult: "España (EU)",
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
    invalidValue: "Digite um número válido para ver a equivalência.",
    euResult: "Europa (EU)",
    usResult: "Estados Unidos (US)",
    ukResult: "Reino Unido (UK)",
    footLength: "Comprimento do Pé",
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


  if (locale === "bn") {
    return "bn-BD";
  }

  if (locale === "fr") {
    return "fr-FR";
  }

  if (locale === "es") {
    return "es-ES";
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
