/**
 * Türkçe mühendislik merkezi (/muhendislik-hesaplayicilari) için uzun vadeli konu sistemi.
 * Yapı: katman → ana konu → alt konu → araç türü. Yeni araçlar önce burada konumlandırılır.
 * `hubGroupId` mevcut EngineeringHubPage gruplarının kimliğidir; mevcut rotalar değişmez.
 */

export type EngineeringTopicLayer = "core" | "turkey" | "reference";
export type EngineeringTopicStatus = "live" | "planned";
export type EngineeringToolType = "calculator" | "table" | "converter" | "note";
export type EngineeringPriority = "P0" | "P1" | "P2";

export type EngineeringSubtopic = {
  id: string;
  title: string;
  status: EngineeringTopicStatus;
  toolTypes: EngineeringToolType[];
  priority?: EngineeringPriority;
  examples: string[];
  turkeyNote?: string;
};

export type EngineeringTopic = {
  id: string;
  layer: EngineeringTopicLayer;
  title: string;
  /** Mevcut hub grubu varsa kimliği; yoksa henüz hub'da yüzeye çıkmamış konudur. */
  hubGroupId?: string;
  subtopics: EngineeringSubtopic[];
};

export const ENGINEERING_TOPIC_LAYERS: Record<EngineeringTopicLayer, string> = {
  core: "Temel mühendislik alanları",
  turkey: "Türkiye odaklı uygulama alanları",
  reference: "Referans ve tablolar",
};

export const ENGINEERING_TOPICS: EngineeringTopic[] = [
  {
    id: "elektrik",
    layer: "core",
    title: "Elektrik",
    hubGroupId: "elektrik",
    subtopics: [
      { id: "koruma", title: "Koruma ve şalter seçimi", status: "planned", priority: "P0", toolTypes: ["calculator", "table"], examples: ["Sigorta/şalter seçimi", "Kısa devre hesabı", "Topraklama"] },
      { id: "kaynak-boyutlandirma", title: "Trafo ve jeneratör boyutlandırma", status: "planned", priority: "P1", toolTypes: ["calculator"], examples: ["Trafo gücü", "Jeneratör kVA"] },
    ],
  },
  {
    id: "akiskanlar-tesisat",
    layer: "core",
    title: "Akışkanlar ve Tesisat",
    hubGroupId: "basinc-ve-akiskanlar",
    subtopics: [
      { id: "boru-kayiplari", title: "Boru, vana ve fitting kayıpları", status: "planned", priority: "P0", toolTypes: ["calculator", "table"], examples: ["Cv/Kv dönüşümü", "Fitting kayıpları"] },
      { id: "pompa", title: "Pompa", status: "planned", priority: "P1", toolTypes: ["calculator"], examples: ["Pompa eğrisi", "Pompa gücü"] },
    ],
  },
  {
    id: "isi-termodinamik",
    layer: "core",
    title: "Isı ve Termodinamik",
    hubGroupId: "isi-transferi",
    subtopics: [
      { id: "isi-iletimi", title: "Isı iletimi ve enerji", status: "live", toolTypes: ["calculator", "table"], examples: ["Isı transferi", "Özgül ısı"] },
    ],
  },
  {
    id: "hvac",
    layer: "core",
    title: "HVAC / Isıtma-Soğutma",
    hubGroupId: "isitma-sogutma",
    subtopics: [
      { id: "havalandirma", title: "Havalandırma ve psikrometri", status: "planned", priority: "P0", toolTypes: ["calculator", "table"], examples: ["Psikrometri", "Kanal boyutlandırma", "Fan gücü"] },
      { id: "yuk", title: "Isıtma/soğutma yükü", status: "planned", priority: "P0", toolTypes: ["calculator"], examples: ["Isı kaybı", "Soğutma yükü"], turkeyNote: "Şehir/iklim bölgesi verileri (TS 825)" },
    ],
  },
  {
    id: "statik-mukavemet",
    layer: "core",
    title: "Statik ve Mukavemet",
    hubGroupId: "statik-mukavemet",
    subtopics: [
      { id: "yuk-kombinasyonlari", title: "Yükler ve kombinasyonlar", status: "planned", priority: "P0", toolTypes: ["calculator"], examples: ["Yük kombinasyonları", "Rüzgar/kar yükü"], turkeyNote: "TS 498 / TBDY" },
      { id: "betonarme", title: "Betonarme ön boyutlandırma", status: "planned", priority: "P1", toolTypes: ["calculator"], examples: ["Kiriş/kolon ön boyut", "Temel/zemin"] },
    ],
  },
  {
    id: "makine-imalat",
    layer: "core",
    title: "Makine ve İmalat",
    hubGroupId: "makine-ve-imalat",
    subtopics: [
      { id: "makine-elemanlari", title: "Makine elemanları ve imalat", status: "live", toolTypes: ["calculator", "table"], examples: ["Metrik vida", "Tolerans"] },
    ],
  },
  {
    id: "malzeme",
    layer: "core",
    title: "Malzeme",
    hubGroupId: "malzeme",
    subtopics: [
      { id: "malzeme-ozellikleri", title: "Malzeme özellikleri", status: "live", toolTypes: ["table", "calculator"], examples: ["Çelik tabloları", "Yoğunluk"] },
    ],
  },
  {
    id: "insaat",
    layer: "core",
    title: "İnşaat",
    hubGroupId: "insaat",
    subtopics: [
      { id: "metraj", title: "Metraj ve şantiye", status: "live", toolTypes: ["calculator"], examples: ["Beton hacmi", "Demir metrajı"] },
    ],
  },
  {
    id: "turkiye-uygulama",
    layer: "turkey",
    title: "Türkiye'ye Özgü Araçlar",
    subtopics: [
      { id: "standartlar", title: "TS / EN standartlı araçlar", status: "planned", priority: "P1", toolTypes: ["calculator", "note"], examples: ["TS 825 yalıtım", "TS EN 12831"] },
      { id: "iklim", title: "İklim / şehir bazlı hesaplar", status: "planned", priority: "P1", toolTypes: ["calculator", "table"], examples: ["Derece-gün", "İklim bölgesi"] },
      { id: "dogalgaz-tesisat", title: "Kombi, petek, doğalgaz", status: "planned", priority: "P1", toolTypes: ["calculator"], examples: ["Petek boyutu", "Doğalgaz tüketimi"] },
      { id: "elektrik-tuketim", title: "Kompanzasyon ve elektrik tüketimi", status: "planned", priority: "P2", toolTypes: ["calculator"], examples: ["Reaktif güç kompanzasyonu", "EPDK tarife maliyeti"] },
    ],
  },
  {
    id: "referans",
    layer: "reference",
    title: "Birim / Referans / Tablolar",
    subtopics: [
      { id: "tablolar", title: "Özellik ve profil tabloları", status: "planned", priority: "P2", toolTypes: ["table", "converter"], examples: ["Su/hava özellikleri", "Buhar tabloları", "Profil tabloları", "DN/NPS, mm²"] },
    ],
  },
];
