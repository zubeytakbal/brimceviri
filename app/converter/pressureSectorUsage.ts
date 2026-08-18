export type PressureSectorUsageKey =
  | "scientific"
  | "industrial"
  | "automotive"
  | "meteorology"
  | "medical";

export const pressureSectorUsageOrder: PressureSectorUsageKey[] = [
  "scientific",
  "industrial",
  "automotive",
  "meteorology",
  "medical",
];

export const pressureSectorUsageUnit: Record<
  PressureSectorUsageKey,
  string
> = {
  scientific: "Pa / kPa",
  industrial: "bar / kgf/cm²",
  automotive: "PSI / bar",
  meteorology: "hPa",
  medical: "mmHg",
};

type PressureSectorUsageLabel = {
  sector: string;
  note: string;
};

export const pressureSectorUsageLabels: Record<
  "tr" | "en" | "de",
  Record<PressureSectorUsageKey, PressureSectorUsageLabel>
> = {
  tr: {
    scientific: {
      sector: "Bilimsel ve mühendislik hesaplamaları",
      note: "SI uyumlu raporlamada, teorik hesaplarda ve malzeme biliminde doğrudan pascal ve katları (kPa, MPa) kullanılır.",
    },
    industrial: {
      sector: "Endüstriyel proses ve hidrolik sistemler",
      note: "Kompresör, kazan, hidrolik pres ve proses hatlarında bar veya eski göstergelerde kgf/cm² tercih edilir.",
    },
    automotive: {
      sector: "Otomotiv ve lastik basıncı",
      note: "Lastik ve hidrolik sistem basınçları küresel olarak çoğunlukla PSI, bazı ülkelerde ise bar cinsinden etiketlenir.",
    },
    meteorology: {
      sector: "Meteoroloji",
      note: "Hava durumu raporlarında, basınç haritalarında ve barometrik ölçümlerde hektopascal (hPa) standart birimdir.",
    },
    medical: {
      sector: "Tıp ve sağlık",
      note: "Kan basıncı ölçümleri ve bazı solunum/vakum cihazları geleneksel olarak mmHg cinsinden ifade edilir.",
    },
  },

  en: {
    scientific: {
      sector: "Scientific and engineering calculations",
      note: "SI-compliant reporting, theoretical calculations and materials science use pascal and its multiples (kPa, MPa) directly.",
    },
    industrial: {
      sector: "Industrial process and hydraulic systems",
      note: "Compressors, boilers, hydraulic presses and process lines typically use bar, with kgf/cm² still seen on older gauges.",
    },
    automotive: {
      sector: "Automotive and tire pressure",
      note: "Tire and hydraulic system pressures are most commonly labeled in PSI worldwide, with bar used in many other regions.",
    },
    meteorology: {
      sector: "Meteorology",
      note: "Weather reports, pressure maps and barometric readings use hectopascal (hPa) as the standard unit.",
    },
    medical: {
      sector: "Medicine and healthcare",
      note: "Blood pressure readings and some respiratory or vacuum equipment are traditionally expressed in mmHg.",
    },
  },

  de: {
    scientific: {
      sector: "Wissenschaft und Technik",
      note: "SI-konforme Berichte, theoretische Berechnungen und Materialwissenschaft verwenden direkt Pascal und seine Vielfachen (kPa, MPa).",
    },
    industrial: {
      sector: "Industrielle Prozesse und Hydraulik",
      note: "Kompressoren, Kessel, Hydraulikpressen und Prozessleitungen nutzen meist bar, ältere Anzeigen zeigen teils kgf/cm².",
    },
    automotive: {
      sector: "Automobil und Reifendruck",
      note: "Reifen- und Hydrauliksystemdrücke werden weltweit meist in PSI angegeben, in vielen Regionen auch in bar.",
    },
    meteorology: {
      sector: "Meteorologie",
      note: "Wetterberichte, Druckkarten und barometrische Messungen verwenden Hektopascal (hPa) als Standardeinheit.",
    },
    medical: {
      sector: "Medizin und Gesundheitswesen",
      note: "Blutdruckmessungen und manche Beatmungs- oder Vakuumgeräte werden traditionell in mmHg angegeben.",
    },
  },
};
