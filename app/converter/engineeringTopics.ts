import { categoryPages } from "./categoryPages";
import { unitPages } from "./unitPages";

/**
 * Türkçe mühendislik konu sistemi ve mevcut dönüştürücü / referans sayfalarına bağlantı haritası.
 * Dönüştürücü mantığı burada tekrarlanmaz; yalnızca mevcut /kategoriler ve /birimler rotalarına bağlanır.
 */

export type EngineeringResourceKind = "hesaplayici" | "tablo" | "donusturucu" | "uygulama-notu" | "standart";

export type EngineeringTopic = {
  id: string;
  title: string;
  /** Hub sayfasındaki mevcut grup kimliği (varsa); mevcut yerleşim değişmez. */
  hubGroupId?: string;
  /** /kategoriler/[slug] — mevcut dönüştürücü kategorileri */
  categorySlugs: string[];
  /** /birimler/[slug] — mevcut birim referans sayfaları */
  unitSlugs: string[];
  /** Bu konunun beslediği kaynak türleri */
  resourceKinds: EngineeringResourceKind[];
};

export const engineeringTopics: EngineeringTopic[] = [
  { id: "elektrik", title: "Elektrik", categorySlugs: ["elektrik", "guc", "enerji"], unitSlugs: ["watt", "volt"], resourceKinds: ["hesaplayici", "tablo", "donusturucu", "standart"] },
  { id: "akiskanlar-tesisat", title: "Akışkanlar ve Tesisat", categorySlugs: ["basinc", "debi", "viskozite"], unitSlugs: ["pascal"], resourceKinds: ["hesaplayici", "tablo", "donusturucu"] },
  { id: "isi-termodinamik", title: "Isı ve Termodinamik", categorySlugs: ["enerji", "isil-iletkenlik", "sicaklik"], unitSlugs: ["santigrat"], resourceKinds: ["hesaplayici", "tablo", "donusturucu"] },
  { id: "hvac", title: "HVAC / Isıtma-Soğutma", categorySlugs: ["guc", "enerji", "debi"], unitSlugs: [], resourceKinds: ["hesaplayici", "tablo", "uygulama-notu"] },
  { id: "statik-mukavemet", title: "Statik ve Mukavemet", categorySlugs: ["kuvvet", "tork", "basinc"], unitSlugs: ["newton"], resourceKinds: ["hesaplayici", "tablo", "standart"] },
  { id: "makine-imalat", title: "Makine ve İmalat", categorySlugs: ["tork", "uzunluk"], unitSlugs: [], resourceKinds: ["hesaplayici", "tablo", "donusturucu"] },
  { id: "malzeme", title: "Malzeme", categorySlugs: ["yogunluk", "kutle"], unitSlugs: [], resourceKinds: ["tablo", "donusturucu"] },
  { id: "insaat", title: "İnşaat", categorySlugs: ["alan", "hacim", "uzunluk"], unitSlugs: [], resourceKinds: ["hesaplayici", "donusturucu", "standart"] },
  { id: "turkiye-araclari", title: "Türkiye’ye Özgü Araçlar", categorySlugs: [], unitSlugs: [], resourceKinds: ["hesaplayici", "standart", "uygulama-notu"] },
  { id: "birim-referans", title: "Birimler ve Referans Tabloları", categorySlugs: [], unitSlugs: [], resourceKinds: ["tablo", "donusturucu"] },
];

export function getEngineeringTopicLinks(topic: EngineeringTopic) {
  return [
    ...topic.categorySlugs.map((slug) => ({
      href: `/kategoriler/${slug}`,
      label: categoryPages.find((page) => page.slug === slug)?.title ?? slug,
    })),
    ...topic.unitSlugs.map((slug) => ({
      href: `/birimler/${slug}`,
      label: unitPages.find((page) => page.slug === slug)?.name ?? slug,
    })),
  ];
}
