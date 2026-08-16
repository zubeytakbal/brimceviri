export type LocalizedGermanCategoryFact = {
  label: string;
  value: string;
};

export type LocalizedGermanCategorySection = {
  title: string;
  paragraphs: string[];
};

export type LocalizedGermanCategoryPage = {
  locale: "de";
  slug: string;
  sourceSlug: string;
  category: string;
  title: string;
  description: string;
  introduction: string[];
  facts: LocalizedGermanCategoryFact[];
  sections: LocalizedGermanCategorySection[];
};

export const germanCategoryPages: LocalizedGermanCategoryPage[] = [
  {
    locale: "de",
    slug: "laenge",
    sourceSlug: "uzunluk",
    category: "uzunluk",
    title: "L\u00E4ngeneinheiten und Umrechnungen",
    description:
      "Rechnen Sie zwischen Meter, Kilometer, Zentimeter, Millimeter, Meilen, Fu\u00DF, Zoll und Yard um und vergleichen Sie metrische sowie angloamerikanische L\u00E4ngeneinheiten.",
    introduction: [
      "L\u00E4nge beschreibt den Abstand zwischen zwei Punkten oder die Ausdehnung eines Objekts in einer Richtung. Sie geh\u00F6rt zu den grundlegenden physikalischen Gr\u00F6\u00DFen in Technik, Naturwissenschaft und Alltag.",
      "Der Meter ist die SI-Basiseinheit der L\u00E4nge. Viele praktische Umrechnungen wechseln jedoch zwischen metrischen und nichtmetrischen Einheiten wie Zoll, Fu\u00DF, Yard oder Meile.",
    ],
    facts: [
      { label: "Physikalische Gr\u00F6\u00DFe", value: "L\u00E4nge" },
      { label: "SI-Basiseinheit", value: "Meter" },
      { label: "SI-Symbol", value: "m" },
      { label: "Dimensionssymbol", value: "L" },
      {
        label: "Typische Anwendungen",
        value: "Geometrie, Bauwesen, Fertigung und Entfernungsmessung",
      },
    ],
    sections: [
      {
        title: "Was beschreibt die L\u00E4nge?",
        paragraphs: [
          "Die L\u00E4nge beschreibt eine eindimensionale Ausdehnung. Je nach Zusammenhang steht sie f\u00FCr Distanz, H\u00F6he, Breite, Tiefe oder Dicke.",
          "Viele abgeleitete Gr\u00F6\u00DFen wie Fl\u00E4che, Volumen, Geschwindigkeit und Druck bauen direkt auf einer L\u00E4ngendefinition auf.",
        ],
      },
      {
        title: "Metrische und nichtmetrische L\u00E4ngeneinheiten",
        paragraphs: [
          "Im metrischen System sind die Einheiten \u00FCber Zehnerpotenzen mit dem Meter verbunden. Kilometer, Zentimeter und Millimeter lassen sich daher mit einfachen Dezimalfaktoren umrechnen.",
          "Fu\u00DF, Zoll, Yard und Meile stammen aus angloamerikanischen Ma\u00DFsystemen. Ihre Beziehungen zum Meter sind genau festgelegt und deshalb zuverl\u00E4ssig umrechenbar.",
        ],
      },
      {
        title: "Wie funktionieren L\u00E4ngenumrechnungen?",
        paragraphs: [
          "Bei einer Umrechnung bleibt die physikalische Strecke gleich, nur die Zahl und die Einheit \u00E4ndern sich. Dazu wird mit dem definierten Umrechnungsfaktor multipliziert oder dividiert.",
          "Gerade im Ingenieuralltag ist eine saubere Umrechnung wichtig, damit Zeichnungen, Spezifikationen und Messwerte nicht missverstanden werden.",
        ],
      },
    ],
  },
  {
    locale: "de",
    slug: "masse",
    sourceSlug: "kutle",
    category: "kutle",
    title: "Masseneinheiten und Umrechnungen",
    description:
      "Rechnen Sie zwischen Kilogramm, Gramm, Milligramm, Tonne, Pfund und Unze um und vergleichen Sie metrische sowie angloamerikanische Masseneinheiten.",
    introduction: [
      "Die Masse beschreibt, wie viel Materie ein Objekt besitzt und wie tr\u00E4ge es auf Beschleunigung reagiert. Im SI ist das Kilogramm die Basiseinheit der Masse.",
      "In Praxis und Handel werden neben Kilogramm und Gramm auch Pfund, Unzen und Tonnen verwendet. Deshalb sind saubere Umrechnungen zwischen den Systemen besonders wichtig.",
    ],
    facts: [
      { label: "Physikalische Gr\u00F6\u00DFe", value: "Masse" },
      { label: "SI-Basiseinheit", value: "Kilogramm" },
      { label: "SI-Symbol", value: "kg" },
      { label: "Dimensionssymbol", value: "M" },
      {
        label: "Typische Anwendungen",
        value: "Handel, Labor, Logistik und Produktion",
      },
    ],
    sections: [
      {
        title: "Was ist Masse?",
        paragraphs: [
          "Die Masse ist eine grundlegende physikalische Gr\u00F6\u00DFe. Sie wird in der Mechanik, Werkstofftechnik, Chemie, Logistik und in allt\u00E4glichen Messungen verwendet.",
          "In der Alltagssprache wird oft von Gewicht gesprochen, technisch ist damit jedoch h\u00E4ufig die Masse gemeint. Das Gewicht ist dagegen eine Kraft.",
        ],
      },
      {
        title: "Kilogramm, Gramm und nichtmetrische Einheiten",
        paragraphs: [
          "Das Kilogramm ist die SI-Basiseinheit. Gramm und Milligramm sind dezimale Untereinheiten, die sich direkt aus dem Kilogramm ableiten.",
          "Pfund und Unze geh\u00F6ren zu angloamerikanischen Ma\u00DFsystemen. Die Tonne ist eine gro\u00DFe metrische Einheit f\u00FCr Industrie und Transport.",
        ],
      },
      {
        title: "Wie werden Masseneinheiten umgerechnet?",
        paragraphs: [
          "Eine Masseneinheit wird mit einem definierten Faktor in eine andere Einheit \u00FCberf\u00FChrt, ohne dass sich die physikalische Masse \u00E4ndert.",
          "Metrische Umrechnungen folgen meist Zehnerpotenzen. F\u00FCr Pfund und Unzen werden standardisierte internationale Beziehungen verwendet.",
        ],
      },
    ],
  },
  {
    locale: "de",
    slug: "druck",
    sourceSlug: "basinc",
    category: "basinc",
    title: "Druckeinheiten und Umrechnungen",
    description:
      "Rechnen Sie zwischen Pascal, Kilopascal, Bar, PSI, Atmosph\u00E4re, mmHg und kgf/cm\u00B2 um und vergleichen Sie Druckeinheiten f\u00FCr Technik, Labor und Praxis.",
    introduction: [
      "Druck beschreibt, wie stark eine Kraft auf eine bestimmte Fl\u00E4che verteilt ist. Er spielt in der Fluidmechanik, Thermodynamik, Verfahrenstechnik und im Maschinenbau eine zentrale Rolle.",
      "Die SI-Einheit des Drucks ist das Pascal. In der Praxis werden jedoch oft besser lesbare Einheiten wie Kilopascal, Bar oder PSI verwendet.",
    ],
    facts: [
      { label: "Physikalische Gr\u00F6\u00DFe", value: "Druck" },
      { label: "SI-Einheit", value: "Pascal" },
      { label: "SI-Symbol", value: "Pa" },
      {
        label: "Definition",
        value: "1 Pa = 1 Newton pro Quadratmeter",
      },
      {
        label: "Typische Anwendungen",
        value: "Fluidtechnik, Wetterdaten, Hydraulik und Prozessanlagen",
      },
    ],
    sections: [
      {
        title: "Was ist Druck?",
        paragraphs: [
          "Druck ist Kraft pro Fl\u00E4che. Wenn dieselbe Kraft auf eine kleinere Fl\u00E4che wirkt, steigt der Druck; verteilt sie sich auf eine gr\u00F6\u00DFere Fl\u00E4che, sinkt der Druck.",
          "Druckwerte begegnen uns in Reifendruckanzeigen, Rohrleitungen, Beh\u00E4ltern, Laborger\u00E4ten und Wetterberichten.",
        ],
      },
      {
        title: "Pascal, Bar und PSI",
        paragraphs: [
          "Das Pascal ist die SI-Referenz, f\u00E4llt im Alltag jedoch oft sehr klein aus. Deshalb werden in technischen Dokumenten h\u00E4ufig Kilopascal oder Bar verwendet.",
          "PSI ist in angloamerikanischen technischen Anwendungen verbreitet. Atmosph\u00E4re und mmHg bleiben in bestimmten Fachgebieten ebenfalls gebr\u00E4uchlich.",
        ],
      },
      {
        title: "Wie werden Druckeinheiten umgerechnet?",
        paragraphs: [
          "Bei einer Druckumrechnung bleibt derselbe physikalische Druck erhalten, nur die Zahlendarstellung \u00E4ndert sich entsprechend dem definierten Faktor der Zielgr\u00F6\u00DFe.",
          "Genaue Umrechnungsfaktoren sind im Maschinenbau, in der Prozess\u00FCberwachung und bei Sicherheitsgrenzen besonders wichtig.",
        ],
      },
    ],
  },
];

export function findGermanCategoryPage(slug: string) {
  return germanCategoryPages.find(
    (categoryPage) => categoryPage.slug === slug
  );
}

export function findGermanCategoryPageByTurkishSlug(
  sourceSlug: string
) {
  return germanCategoryPages.find(
    (categoryPage) => categoryPage.sourceSlug === sourceSlug
  );
}
