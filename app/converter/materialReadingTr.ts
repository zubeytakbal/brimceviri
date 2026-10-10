// Malzeme sayfasi: yogunluktan turetilmis hacim-kutle ornekleri.
import type { MaterialProfile } from "./materialsHub";
import { buoyancy, densityRank, litresPerKg } from "./materialPractical";
import { materialCategoryLabels } from "./materialsDatabase";

const tr = (value: number, digits = 3) =>
  value.toLocaleString("tr-TR", { maximumFractionDigits: digits });

function massText(kg: number) {
  if (kg >= 1000) return `${tr(kg / 1000)} ton`;
  if (kg >= 1) return `${tr(kg)} kg`;
  if (kg >= 0.001) return `${tr(kg * 1000, 2)} g`;
  return `${tr(kg * 1e6, 2)} mg`;
}

const VOLUMES: Array<{ label: string; m3: number }> = [
  { label: "1 mL", m3: 1e-6 },
  { label: "2 mL", m3: 2e-6 },
  { label: "15 mL", m3: 15e-6 },
  { label: "50 mL", m3: 5e-5 },
  { label: "100 mL", m3: 1e-4 },
  { label: "200 mL", m3: 2e-4 },
  { label: "250 mL", m3: 2.5e-4 },
  { label: "500 mL", m3: 5e-4 },
  { label: "1 litre", m3: 0.001 },
  { label: "2 litre", m3: 0.002 },
  { label: "5 litre", m3: 0.005 },
  { label: "10 litre", m3: 0.01 },
  { label: "20 litre", m3: 0.02 },
  { label: "50 litre", m3: 0.05 },
  { label: "100 litre", m3: 0.1 },
  { label: "200 litre", m3: 0.2 },
  { label: "0,5 m³", m3: 0.5 },
  { label: "1 m³", m3: 1 },
  { label: "2 m³", m3: 2 },
  { label: "3 m³", m3: 3 },
];

export type MaterialReading = {
  heading: string;
  paragraphs: string[];
  headers: string[];
  rows: string[][];
};

export function buildMaterialReading(material: MaterialProfile): MaterialReading {
  const name = material.nameTr;
  const density = material.densityKgM3;
  const perLitre = density / 1000;
  const perKg = litresPerKg(material);
  const float = buoyancy(material);
  const rank = densityRank(material);
  const behavior =
    float.kind === "gas"
      ? float.lighterThanAir
        ? `${name} havadan ${tr(1 / float.ratio, 2)} kat hafif`
        : `${name} havadan ${tr(float.ratio, 2)} kat ağır`
      : float.ratio < 1.01 && float.ratio > 0.99
        ? `${name} suya çok yakın`
        : float.floats
          ? `${name} suyun ${tr(float.ratio, 3)} katı, yüzer`
          : `${name} suyun ${tr(float.ratio, 3)} katı, batar`;
  const neighbor =
    rank.denser && rank.lighter
      ? `${name} sırasında üstte ${rank.denser.nameTr} (${tr(rank.denser.densityKgM3, 2)} kg/m³), altta ${rank.lighter.nameTr} (${tr(rank.lighter.densityKgM3, 2)} kg/m³) vardır`
      : "";
  const extras = [
    material.thermalConductivityWmK !== null
      ? `${name} ısıl iletkenliği ${tr(material.thermalConductivityWmK, 3)} W/(m·K)`
      : "",
    material.elasticModulusGPa !== null ? `${name} elastisite modülü ${tr(material.elasticModulusGPa, 2)} GPa` : "",
    material.viscosityMPaS !== null ? `${name} viskozitesi ${tr(material.viscosityMPaS, 3)} mPa·s` : "",
  ].filter(Boolean);

  return {
    heading: `${name} hesap örneği`,
    paragraphs: [
      `${name} yoğunluğu ${tr(density, 4)} kg/m³, yani ${tr(density / 1000, 4)} g/cm³ ve ${tr(perLitre, 4)} kg/L. 1 litre ${name} ${massText(perLitre)} eder, 1 m³ ${name} ${massText(density)} eder. 1 kg ${name} ${tr(perKg, 3)} litre yer kaplar.`,
      `${behavior}. ${name} sırası ${rank.overall}/${rank.total}, ${materialCategoryLabels[material.category].toLocaleLowerCase("tr")} içinde ${rank.inCategory}/${rank.categoryTotal}.${neighbor ? ` ${neighbor}.` : ""}`,
      extras.join(". "),
      `${name} başvurusu ${tr(density, 4)} kg/m³ tipik değerdir. Föy farklıysa ${name} föyü esas alınır.`,
    ].filter(Boolean),
    headers: [`${name} ölçüsü`, `${name} kütlesi`],
    rows: VOLUMES.map((volume) => [`${name} ${volume.label}`, `${massText(volume.m3 * density)} ${name}`]),
  };
}

export function materialReadingPlain(material: MaterialProfile) {
  const reading = buildMaterialReading(material);
  return [...reading.paragraphs, reading.headers.join(" "), ...reading.rows.map((row) => row.join(" "))].join(" ");
}
