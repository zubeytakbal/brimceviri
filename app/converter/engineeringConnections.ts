export type EngineeringConnectionLink = {
  href: string;
  label: string;
};

export type EngineeringConnection = {
  /** EngineeringHubPage içindeki grup kimliği (tr) */
  groupId: string;
  title: string;
  conversions: EngineeringConnectionLink[];
};

/** Mühendislik konusu -> mevcut dönüştürücü kategorileri ve birim rehberleri. */
export const engineeringConnectionsTr: EngineeringConnection[] = [
  {
    groupId: "elektrik",
    title: "Elektrik",
    conversions: [
      { href: "/kategoriler/elektrik", label: "Elektrik birimleri" },
      { href: "/kategoriler/guc", label: "Güç (kW, W, HP)" },
      { href: "/kategoriler/direnc", label: "Direnç" },
      { href: "/awg-mm2-cevirici", label: "AWG ↔ mm²" },
    ],
  },
  {
    groupId: "basinc-ve-akiskanlar",
    title: "Akışkanlar ve Tesisat",
    conversions: [
      { href: "/kategoriler/basinc", label: "Basınç (Pa, bar, psi)" },
      { href: "/kategoriler/debi", label: "Debi" },
      { href: "/kategoriler/viskozite", label: "Viskozite" },
      { href: "/kategoriler/hiz", label: "Hız" },
    ],
  },
  {
    groupId: "isi-transferi",
    title: "Isı ve Termodinamik",
    conversions: [
      { href: "/kategoriler/sicaklik", label: "Sıcaklık" },
      { href: "/kategoriler/enerji", label: "Enerji (kWh, kcal, BTU)" },
      { href: "/kategoriler/isil-iletkenlik", label: "Isıl iletkenlik" },
      { href: "/kategoriler/ozgul-isi", label: "Özgül ısı" },
    ],
  },
  {
    groupId: "makine-ve-imalat",
    title: "Makine ve İmalat",
    conversions: [
      { href: "/kategoriler/tork", label: "Tork" },
      { href: "/kategoriler/aci", label: "Açı" },
      { href: "/kategoriler/acisal-hiz", label: "Açısal hız (devir)" },
      { href: "/kategoriler/uzunluk", label: "Uzunluk" },
    ],
  },
  {
    groupId: "statik-mukavemet",
    title: "Statik ve Mukavemet",
    conversions: [
      { href: "/kategoriler/kuvvet", label: "Kuvvet" },
      { href: "/kategoriler/tork", label: "Moment (tork)" },
      { href: "/kategoriler/alan", label: "Alan" },
      { href: "/kategoriler/basinc", label: "Gerilim (basınç birimleri)" },
    ],
  },
  {
    groupId: "malzeme",
    title: "Malzeme",
    conversions: [
      { href: "/kategoriler/yogunluk", label: "Yoğunluk" },
      { href: "/kategoriler/kutle", label: "Kütle" },
      { href: "/kategoriler/hacim", label: "Hacim" },
    ],
  },
  {
    groupId: "insaat",
    title: "İnşaat",
    conversions: [
      { href: "/kategoriler/uzunluk", label: "Uzunluk" },
      { href: "/kategoriler/alan", label: "Alan (m²)" },
      { href: "/kategoriler/hacim", label: "Hacim (m³)" },
      { href: "/kategoriler/kutle", label: "Kütle (ton)" },
    ],
  },
  {
    groupId: "isitma-sogutma",
    title: "Isıtma ve Soğutma",
    conversions: [
      { href: "/kategoriler/guc", label: "Güç (kW, BTU/h)" },
      { href: "/kategoriler/enerji", label: "Enerji" },
      { href: "/kategoriler/sicaklik", label: "Sıcaklık" },
      { href: "/kategoriler/hacimsel-debi", label: "Hava debisi" },
    ],
  },
];
