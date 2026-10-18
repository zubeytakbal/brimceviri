export type EngineeringTopicConnection = {
  /** Mühendislik merkezindeki bölüm kimliği (EngineeringHubPage grup id'si). */
  groupId: string;
  title: string;
  /** Mevcut /kategoriler/[slug] dönüştürücü sayfaları. */
  categorySlugs: string[];
  /** Mevcut /birimler/[slug] referans sayfaları. */
  unitSlugs: string[];
  /** Mevcut dönüştürücü niteliğindeki bağımsız araç sayfaları (kök adres sluglarıyla). */
  converterSlugs: { slug: string; label: string }[];
};

export const engineeringTopicMap: EngineeringTopicConnection[] = [
  {
    groupId: "elektrik",
    title: "Elektrik",
    categorySlugs: ["elektrik", "guc"],
    unitSlugs: ["watt", "kilowatt"],
    converterSlugs: [{ slug: "awg-mm2-cevirici", label: "AWG - mm² Çevirici" }],
  },
  {
    groupId: "basinc-ve-akiskanlar",
    title: "Akışkanlar ve Tesisat",
    categorySlugs: ["basinc", "debi", "viskozite"],
    unitSlugs: ["pascal", "bar"],
    converterSlugs: [],
  },
  {
    groupId: "isi-transferi",
    title: "Isı ve Termodinamik",
    categorySlugs: ["sicaklik", "enerji", "isil-iletkenlik"],
    unitSlugs: ["joule"],
    converterSlugs: [],
  },
  {
    groupId: "makine-ve-imalat",
    title: "Makine ve İmalat",
    categorySlugs: ["tork", "uzunluk", "hiz"],
    unitSlugs: ["newton-metre"],
    converterSlugs: [],
  },
  {
    groupId: "statik-mukavemet",
    title: "Statik ve Mukavemet",
    categorySlugs: ["kuvvet", "basinc", "alan"],
    unitSlugs: ["pascal", "newton-metre"],
    converterSlugs: [],
  },
  {
    groupId: "malzeme",
    title: "Malzeme",
    categorySlugs: ["yogunluk", "kutle", "hacim"],
    unitSlugs: [],
    converterSlugs: [],
  },
  {
    groupId: "insaat",
    title: "İnşaat",
    categorySlugs: ["uzunluk", "alan", "hacim", "kutle"],
    unitSlugs: [],
    converterSlugs: [],
  },
  {
    groupId: "isitma-sogutma",
    title: "Isıtma ve Soğutma",
    categorySlugs: ["guc", "enerji", "sicaklik"],
    unitSlugs: ["watt", "kilowatt"],
    converterSlugs: [],
  },
];
