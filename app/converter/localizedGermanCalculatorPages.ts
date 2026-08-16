import type { CalculatorPage } from "./calculatorPages";
import { getGermanCalculatorSlug } from "../i18n/germanRoutes";

export type LocalizedGermanCalculatorPage = CalculatorPage & {
  locale: "de";
  sourceSlug: string;
  slug: string;
  categoryName: string;
};

const germanCalculatorContent: Record<
  string,
  Omit<LocalizedGermanCalculatorPage, "locale" | "sourceSlug" | "slug" | "category">
> = {
  "isi-enerjisi": {
    title: "Wärmeenergie-Rechner",
    shortTitle: "Wärmeenergie",
    formula: "Q = m × c × ΔT",
    description:
      "Berechnen Sie Wärmeenergie, Masse, spezifische Wärmekapazität oder Temperaturdifferenz mit echten Einheitumrechnungen und SI-Bezug.",
    categoryName: "Energie",
  },
  "isi-iletimi": {
    title: "Wärmeleitungs-Rechner",
    shortTitle: "Wärmeleitung",
    formula: "Q̇ = k × A × ΔT / L",
    description:
      "Berechnen Sie Wärmestrom, Wärmeleitfähigkeit, Fläche, Temperaturdifferenz oder Schichtdicke mit Materialvorgaben und SI-basierten Umrechnungen.",
    categoryName: "Energie",
  },
  "reynolds-sayisi": {
    title: "Reynolds-Zahl-Rechner",
    shortTitle: "Reynolds-Zahl",
    formula: "Re = ρ × v × D / μ",
    description:
      "Berechnen Sie Reynolds-Zahl, Strömungsgeschwindigkeit oder charakteristischen Durchmesser mit Dichte und dynamischer Viskosität.",
    categoryName: "Geschwindigkeit",
  },
  "basinc-kuvvet-alan": {
    title: "Druck-, Kraft- und Flächen-Rechner",
    shortTitle: "Druck, Kraft und Fläche",
    formula: "P = F / A",
    description:
      "Berechnen Sie Druck, Kraft oder Fläche über SI-Größen und geben Sie das Ergebnis in gebräuchlichen technischen Einheiten aus.",
    categoryName: "Druck",
  },
  "hidrostatik-basinc": {
    title: "Rechner für hydrostatischen Druck",
    shortTitle: "Hydrostatischer Druck",
    formula: "ΔP = ρgh",
    description:
      "Berechnen Sie hydrostatische Druckdifferenz, Dichte, Tiefe oder Erdbeschleunigung und zeigen Sie das Ergebnis in einer gut lesbaren technischen Einheit an.",
    categoryName: "Druck",
  },
};

export const germanCalculatorPages: LocalizedGermanCalculatorPage[] =
  Object.entries(germanCalculatorContent)
    .map(([sourceSlug, content]) => {
      const slug = getGermanCalculatorSlug(sourceSlug);

      if (!slug) {
        return null;
      }

      return {
        locale: "de",
        sourceSlug,
        slug,
        category:
          sourceSlug === "isi-enerjisi" || sourceSlug === "isi-iletimi"
            ? "enerji"
            : sourceSlug === "reynolds-sayisi"
              ? "hiz"
              : "basinc",
        ...content,
      };
    })
    .filter(
      (
        page
      ): page is LocalizedGermanCalculatorPage => page !== null
    );

export function findGermanCalculatorPage(slug: string) {
  return germanCalculatorPages.find((page) => page.slug === slug);
}

export function findGermanCalculatorPageByTurkishSlug(
  sourceSlug: string
) {
  return germanCalculatorPages.find(
    (page) => page.sourceSlug === sourceSlug
  );
}
