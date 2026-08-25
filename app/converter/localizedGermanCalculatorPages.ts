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
  Omit<
    LocalizedGermanCalculatorPage,
    "locale" | "sourceSlug" | "slug" | "category"
  >
> = {
  "isi-enerjisi": {
    title: "Warmeenergie-Rechner",
    shortTitle: "Warmeenergie",
    formula: "Q = m x c x \u0394T",
    description:
      "Berechnen Sie Warmeenergie, Masse, spezifische Warmekapazitat oder Temperaturdifferenz mit echten Einheitenumrechnungen und SI-Bezug.",
    categoryName: "Energie",
  },
  "isi-iletimi": {
    title: "Warmeleitungs-Rechner",
    shortTitle: "Warmeleitung",
    formula: "Qdot = k x A x \u0394T / L",
    description:
      "Berechnen Sie Warmestrom, Warmeleitfahigkeit, Flache, Temperaturdifferenz oder Schichtdicke mit Materialvorgaben und SI-basierten Umrechnungen.",
    categoryName: "Energie",
  },
  "reynolds-sayisi": {
    title: "Reynolds-Zahl-Rechner",
    shortTitle: "Reynolds-Zahl",
    formula: "Re = \u03c1 x v x D / \u03bc",
    description:
      "Berechnen Sie Reynolds-Zahl, Stromungsgeschwindigkeit oder charakteristischen Durchmesser mit Dichte und dynamischer Viskositat.",
    categoryName: "Viskositat",
  },
  "basinc-kuvvet-alan": {
    title: "Druck-, Kraft- und Flachen-Rechner",
    shortTitle: "Druck, Kraft und Flache",
    formula: "P = F / A",
    description:
      "Berechnen Sie Druck, Kraft oder Flache uber SI-Grossen und geben Sie das Ergebnis in gebrauchlichen technischen Einheiten aus.",
    categoryName: "Druck",
  },
  "hidrostatik-basinc": {
    title: "Rechner fur hydrostatischen Druck",
    shortTitle: "Hydrostatischer Druck",
    formula: "\u0394P = \u03c1gh",
    description:
      "Berechnen Sie hydrostatische Druckdifferenz, Dichte, Tiefe oder Erdbeschleunigung und zeigen Sie das Ergebnis in einer gut lesbaren technischen Einheit an.",
    categoryName: "Druck",
  },
  "ohm-yasasi": {
    title: "Ohmsches-Gesetz-Rechner",
    shortTitle: "Ohmsches Gesetz",
    formula: "V = I x R",
    description:
      "Berechnen Sie Spannung, Strom oder Widerstand mit SI-Bezug und direkt einsetzbarer Formel fur praktische Elektrokontrollen.",
    categoryName: "Elektrizitat",
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
              ? "viskozite_dinamik"
              : sourceSlug === "ohm-yasasi"
                ? "elektrik_direnc"
                : "basinc",
        ...content,
      };
    })
    .filter(
      (page): page is LocalizedGermanCalculatorPage => page !== null
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
