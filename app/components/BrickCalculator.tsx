"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculateBrickNeeds,
  type BrickCalculatorInput,
} from "../converter/brickCalculator";

const copyByLocale: Record<
  Exclude<Locale, "ru">,
  {
    labels: {
      wallArea: string;
      brickWidth: string;
      brickHeight: string;
      joint: string;
      waste: string;
    };
    resultLabels: {
      brickArea: string;
      totalArea: string;
      count: string;
    };
    emptyState: string;
  }
> = {
  tr: {
    labels: {
      wallArea: "Duvar Alani (m2)",
      brickWidth: "Tugla Eni (cm)",
      brickHeight: "Tugla Yuksekligi (cm)",
      joint: "Derz Kalinligi (mm)",
      waste: "Fire Payi (%)",
    },
    resultLabels: {
      brickArea: "1 tuglanin derzli alani",
      totalArea: "Fire dahil toplam alan",
      count: "Gereken tugla adedi",
    },
    emptyState: "Gecerli degerler girerek sonucu gorebilirsin.",
  },
  fr: {
    labels: {
      wallArea: "Surface du mur (m²)",
      brickWidth: "Largeur de la brique (cm)",
      brickHeight: "Hauteur de la brique (cm)",
      joint: "Épaisseur du joint (mm)",
      waste: "Marge de perte (%)",
    },
    resultLabels: {
      brickArea: "Joint-inclusive area per brick",
      totalArea: "Total area including waste",
      count: "Bricks needed",
    },
    emptyState: "Saisissez des valeurs valides pour voir le résultat.",
  },
  es: {
    labels: {
      wallArea: "Superficie del muro (m²)",
      brickWidth: "Ancho del ladrillo (cm)",
      brickHeight: "Alto del ladrillo (cm)",
      joint: "Espesor de la junta (mm)",
      waste: "Margen de desperdicio (%)",
    },
    resultLabels: {
      brickArea: "Joint-inclusive area per brick",
      totalArea: "Total area including waste",
      count: "Bricks needed",
    },
    emptyState: "Introduce valores válidos para ver el resultado.",
  },
  "es-419": {
    labels: {
      wallArea: "Superficie del muro (m²)",
      brickWidth: "Ancho del ladrillo (cm)",
      brickHeight: "Alto del ladrillo (cm)",
      joint: "Espesor de la junta (mm)",
      waste: "Margen de desperdicio (%)",
    },
    resultLabels: {
      brickArea: "Joint-inclusive area per brick",
      totalArea: "Total area including waste",
      count: "Bricks needed",
    },
    emptyState: "Ingresa valores válidos para ver el resultado.",
  },
  pt: {
    labels: {
      wallArea: "Área da parede (m²)",
      brickWidth: "Largura do tijolo (cm)",
      brickHeight: "Altura do tijolo (cm)",
      joint: "Espessura da junta (mm)",
      waste: "Margem de perda (%)",
    },
    resultLabels: {
      brickArea: "Joint-inclusive area per brick",
      totalArea: "Total area including waste",
      count: "Bricks needed",
    },
    emptyState: "Digite valores válidos para ver o resultado.",
  },
  it: {
    labels: {
      wallArea: "Superficie del muro (m²)",
      brickWidth: "Larghezza del mattone (cm)",
      brickHeight: "Altezza del mattone (cm)",
      joint: "Spessore del giunto (mm)",
      waste: "Margine di sfrido (%)",
    },
    resultLabels: {
      brickArea: "Joint-inclusive area per brick",
      totalArea: "Total area including waste",
      count: "Bricks needed",
    },
    emptyState: "Inserisci valori validi per vedere il risultato.",
  },
  nl: {
    labels: {
      wallArea: "Muuroppervlak (m²)",
      brickWidth: "Breedte van de steen (cm)",
      brickHeight: "Hoogte van de steen (cm)",
      joint: "Voegdikte (mm)",
      waste: "Snijverlies (%)",
    },
    resultLabels: {
      brickArea: "Joint-inclusive area per brick",
      totalArea: "Total area including waste",
      count: "Bricks needed",
    },
    emptyState: "Voer geldige waarden in om het resultaat te zien.",
  },
  sv: {
    labels: {
      wallArea: "Väggyta (m²)",
      brickWidth: "Tegelstenens bredd (cm)",
      brickHeight: "Tegelstenens höjd (cm)",
      joint: "Fogtjocklek (mm)",
      waste: "Spillmarginal (%)",
    },
    resultLabels: {
      brickArea: "Joint-inclusive area per brick",
      totalArea: "Total area including waste",
      count: "Bricks needed",
    },
    emptyState: "Ange giltiga värden för att se resultatet.",
  },
  no: {
    labels: {
      wallArea: "Veggareal (m²)",
      brickWidth: "Murstein bredde (cm)",
      brickHeight: "Murstein høyde (cm)",
      joint: "Fugetykkelse (mm)",
      waste: "Svinnmargin (%)",
    },
    resultLabels: {
      brickArea: "Joint-inclusive area per brick",
      totalArea: "Total area including waste",
      count: "Bricks needed",
    },
    emptyState: "Angi gyldige verdier for å se resultatet.",
  },
  da: {
    labels: {
      wallArea: "Vægareal (m²)",
      brickWidth: "Murstenens bredde (cm)",
      brickHeight: "Murstenens højde (cm)",
      joint: "Fugetykkelse (mm)",
      waste: "Spildmargin (%)",
    },
    resultLabels: {
      brickArea: "Joint-inclusive area per brick",
      totalArea: "Total area including waste",
      count: "Bricks needed",
    },
    emptyState: "Indtast gyldige værdier for at se resultatet.",
  },
  en: {
    labels: {
      wallArea: "Wall Area (m2)",
      brickWidth: "Brick Width (cm)",
      brickHeight: "Brick Height (cm)",
      joint: "Joint Thickness (mm)",
      waste: "Waste Allowance (%)",
    },
    resultLabels: {
      brickArea: "Area of one brick with joint",
      totalArea: "Total area with waste",
      count: "Required brick count",
    },
    emptyState: "Enter valid values to see the result.",
  },
  de: {
    labels: {
      wallArea: "Wandflaeche (m2)",
      brickWidth: "Ziegelbreite (cm)",
      brickHeight: "Ziegelhoehe (cm)",
      joint: "Fugenstaerke (mm)",
      waste: "Verschnitt (%)",
    },
    resultLabels: {
      brickArea: "Flaeche eines Ziegels mit Fuge",
      totalArea: "Gesamtflaeche inklusive Verschnitt",
      count: "Benoetigte Anzahl Ziegel",
    },
    emptyState: "Geben Sie gueltige Werte ein, um das Ergebnis zu sehen.",
  },
  ar: {
    labels: {
      wallArea: "مساحة الجدار (م2)",
      brickWidth: "عرض الطوبة (سم)",
      brickHeight: "ارتفاع الطوبة (سم)",
      joint: "سماكة الفاصل (مم)",
      waste: "نسبة الهدر (%)",
    },
    resultLabels: {
      brickArea: "مساحة الطوبة مع الفاصل",
      totalArea: "إجمالي المساحة مع الهدر",
      count: "عدد الطوب المطلوب",
    },
    emptyState: "أدخل قيمًا صحيحة لعرض النتيجة.",
  },
uz: {
    labels: {
      wallArea: "Devor Maydoni (m2)",
      brickWidth: "G'isht Eni (sm)",
      brickHeight: "G'isht Balandligi (sm)",
      joint: "Chok Qalinligi (mm)",
      waste: "Zaxira Foizi (%)",
    },
    resultLabels: {
      brickArea: "1 g'ishtning chok bilan maydoni",
      totalArea: "Zaxira bilan jami maydon",
      count: "Kerakli g'isht soni",
    },
    emptyState: "Natijani ko'rish uchun to'g'ri qiymatlar kiriting.",
  },
bn: {
    labels: {
      wallArea: "দেয়ালের ক্ষেত্রফল (বর্গমিটার)",
      brickWidth: "ইটের প্রস্থ (সেমি)",
      brickHeight: "ইটের উচ্চতা (সেমি)",
      joint: "জোড়ার পুরুত্ব (মিমি)",
      waste: "অপচয়ের মার্জিন (%)",
    },
    resultLabels: {
      brickArea: "জোড়াসহ একটি ইটের ক্ষেত্রফল",
      totalArea: "অপচয়সহ মোট ক্ষেত্রফল",
      count: "প্রয়োজনীয় ইটের সংখ্যা",
    },
    emptyState: "ফলাফল দেখতে বৈধ মান লিখুন।",
  },
};

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatArea(value: number, locale: Locale) {
  return `${formatLocalizedNumber(value, locale, { maximumFractionDigits: 3 })} m2`;
}

export default function BrickCalculator({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const copy = copyByLocale[locale === "ru" ? "en" : locale];
  const [wallArea, setWallArea] = useState("20");
  const [brickWidthCm, setBrickWidthCm] = useState("19");
  const [brickHeightCm, setBrickHeightCm] = useState("13.5");
  const [jointMm, setJointMm] = useState("10");
  const [wastePercent, setWastePercent] = useState("5");

  const input: BrickCalculatorInput = useMemo(
    () => ({
      wallArea: parseNumericValue(wallArea),
      brickWidthCm: parseNumericValue(brickWidthCm),
      brickHeightCm: parseNumericValue(brickHeightCm),
      jointMm: parseNumericValue(jointMm),
      wastePercent: parseNumericValue(wastePercent),
    }),
    [wallArea, brickWidthCm, brickHeightCm, jointMm, wastePercent]
  );

  const result = useMemo(() => calculateBrickNeeds(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>{copy.labels.wallArea}</span>
          <input
            inputMode="decimal"
            type="text"
            value={wallArea}
            onChange={(event) => setWallArea(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.brickWidth}</span>
          <input
            inputMode="decimal"
            type="text"
            value={brickWidthCm}
            onChange={(event) => setBrickWidthCm(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.brickHeight}</span>
          <input
            inputMode="decimal"
            type="text"
            value={brickHeightCm}
            onChange={(event) => setBrickHeightCm(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.joint}</span>
          <input
            inputMode="decimal"
            type="text"
            value={jointMm}
            onChange={(event) => setJointMm(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.waste}</span>
          <input
            inputMode="decimal"
            type="text"
            value={wastePercent}
            onChange={(event) => setWastePercent(event.target.value)}
          />
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <>
            <div className="paint-calculator-result-grid">
              <div>
                <span>{copy.resultLabels.brickArea}</span>
                <strong>{formatArea(result.brickUnitAreaM2, locale)}</strong>
              </div>
              <div>
                <span>{copy.resultLabels.totalArea}</span>
                <strong>{formatArea(result.requiredAreaWithWaste, locale)}</strong>
              </div>
            </div>

            <p className="paint-calculator-liters">
              {copy.resultLabels.count}: <strong>{result.requiredBrickCount}</strong>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
