/**
 * Türkçe mühendislik konu sistemi → mevcut dönüştürücü/birim sayfaları bağlantı haritası.
 * Dönüştürücüleri çoğaltmaz; yalnızca mühendislik konularının hangi mevcut
 * kategori sayfalarına bağlanacağını tek yerde tutar. Yeni araçlar buradan bakar.
 */

export type EngineeringTopicLayer = "core" | "turkey" | "reference";

export type EngineeringTopicLink = {
  href: string;
  label: string;
};

export type EngineeringTopic = {
  id: string;
  title: string;
  layer: EngineeringTopicLayer;
  /** Mevcut mühendislik hub bölümü (varsa) */
  hubAnchor?: string;
  /** İlgili mevcut dönüştürücü kategori sayfaları */
  converters: EngineeringTopicLink[];
  /** Türkiye'ye özgü planlanan genişletme notları */
  turkeyNotes?: string[];
};

const cat = (slug: string, label: string): EngineeringTopicLink => ({
  href: `/kategoriler/${slug}`,
  label,
});

export const ENGINEERING_TOPICS: EngineeringTopic[] = [
  {
    id: "elektrik",
    title: "Elektrik",
    layer: "core",
    hubAnchor: "#elektrik",
    converters: [cat("elektrik", "Elektrik birimi dönüşümleri"), cat("guc", "Güç dönüşümleri")],
    turkeyNotes: ["Kompanzasyon", "EPDK tarife mantığı ile tüketim hesabı"],
  },
  {
    id: "akiskanlar-tesisat",
    title: "Akışkanlar ve Tesisat",
    layer: "core",
    converters: [
      cat("basinc", "Basınç dönüşümleri"),
      cat("debi", "Debi dönüşümleri"),
      cat("viskozite", "Viskozite dönüşümleri"),
    ],
    turkeyNotes: ["DN boru çapı pratikleri"],
  },
  {
    id: "isi-hvac",
    title: "Isı, Termodinamik ve HVAC",
    layer: "core",
    converters: [
      cat("enerji", "Enerji dönüşümleri"),
      cat("isil-iletkenlik", "Isıl iletkenlik dönüşümleri"),
      cat("guc", "Güç dönüşümleri"),
    ],
    turkeyNotes: ["Kombi/petek", "Doğalgaz", "Şehir bazlı iklim verisi"],
  },
  {
    id: "makine-imalat",
    title: "Makine ve İmalat",
    layer: "core",
    converters: [cat("tork", "Tork dönüşümleri"), cat("kuvvet", "Kuvvet dönüşümleri")],
    turkeyNotes: ["Metrik vida"],
  },
  {
    id: "statik-mukavemet",
    title: "Statik ve Mukavemet",
    layer: "core",
    converters: [cat("kuvvet", "Kuvvet dönüşümleri"), cat("basinc", "Basınç dönüşümleri")],
    turkeyNotes: ["TS/EN standartlı kontroller"],
  },
  {
    id: "malzeme-insaat",
    title: "Malzeme ve İnşaat",
    layer: "core",
    converters: [cat("uzunluk", "Uzunluk dönüşümleri"), cat("alan", "Alan dönüşümleri"), cat("hacim", "Hacim dönüşümleri")],
    turkeyNotes: ["Şantiye metrajı"],
  },
  {
    id: "birim-referans",
    title: "Birimler ve Referans Tabloları",
    layer: "reference",
    converters: [cat("uzunluk", "Uzunluk dönüşümleri"), cat("basinc", "Basınç dönüşümleri")],
  },
];

export function getEngineeringTopic(id: string) {
  return ENGINEERING_TOPICS.find((topic) => topic.id === id);
}
