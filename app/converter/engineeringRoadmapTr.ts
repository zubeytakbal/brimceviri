export type EngineeringRoadmapPriority = "P0" | "P1" | "P2";

export type EngineeringRoadmapItem = {
  groupId: string;
  priority: EngineeringRoadmapPriority;
  title: string;
  standards?: string;
  plannedTools: string[];
};

export const ENGINEERING_ROADMAP_TR_TITLE = "Türkiye mühendislik yol haritası";
export const ENGINEERING_ROADMAP_TR_LEAD =
  "Bu bölümler için planlanan araçlar. Mevcut araçlar değişmez; yeni araçlar hazır olunca ilgili bölüme eklenir.";

export const ENGINEERING_ROADMAP_TR: EngineeringRoadmapItem[] = [
  {
    groupId: "elektrik",
    priority: "P0",
    title: "Elektrik koruma ve tesisat",
    standards: "TS HD 60364, TS EN 60947",
    plannedTools: ["Sigorta ve şalter seçimi", "Kısa devre akımı", "Topraklama", "Trafo ve jeneratör boyutlandırma"],
  },
  {
    groupId: "statik-mukavemet",
    priority: "P0",
    title: "Statik ve taşıyıcı sistem",
    standards: "TS 500, TBDY 2018, TS EN 1991",
    plannedTools: ["Yük kombinasyonları", "Betonarme ön boyutlandırma", "Rüzgar ve kar yükü", "Temel ve zemin hesapları"],
  },
  {
    groupId: "isitma-sogutma",
    priority: "P1",
    title: "Isı ve HVAC",
    standards: "TS 825, TS EN 12831",
    plannedTools: ["Psikrometri", "Hava kanalı boyutlandırma", "Fan gücü", "Şehir bazlı iklim verileri"],
  },
  {
    groupId: "basinc-ve-akiskanlar",
    priority: "P1",
    title: "Akışkanlar ve tesisat",
    standards: "TS EN 806, TS EN 12056",
    plannedTools: ["Vana ve fitting kayıpları", "Cv/Kv dönüşümü", "Pompa eğrisi", "Genleşme tankı"],
  },
  {
    groupId: "insaat",
    priority: "P2",
    title: "İnşaat ve metraj",
    plannedTools: ["Donatı metrajı", "Kalıp metrajı", "Yalıtım ve doğalgaz tüketimi"],
  },
  {
    groupId: "malzeme",
    priority: "P2",
    title: "Malzeme ve makine",
    plannedTools: ["Cıvata tork ve ön yükleme", "Kaynak boyutlandırma"],
  },
];
