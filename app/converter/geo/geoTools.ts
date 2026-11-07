// Cografya hesaplamalari kategorisindeki Turkce araclar (hub, "ilginizi cekebilir" ve anasayfa icin).
export type GeoTool = { href: string; title: string; description: string; group: "harita" | "zaman" | "turkiye" | "dunya" };

export const geoToolsTr: GeoTool[] = [
  { href: "/harita-olcegi-hesaplama", title: "Harita Ölçeği Hesaplama", description: "Haritadaki cm'nin gerçekte kaç km olduğu, gerçek alan, ölçek bulma ve çizgi ölçek.", group: "harita" },
  { href: "/koordinat-donusturucu", title: "Koordinat Dönüştürücü", description: "Derece-dakika-saniye, ondalık derece, UTM ve ITRF96 3° TM arasında dönüşüm.", group: "harita" },
  { href: "/buyuk-daire-mesafesi-hesaplama", title: "Kuş Uçuşu Mesafe (Büyük Daire)", description: "İki koordinat arasındaki en kısa mesafe ve başlangıç rotası.", group: "harita" },
  { href: "/tarla-donum-hesaplama", title: "Tarla Dönüm Hesaplama", description: "Kenar ölçülerinden arazi alanı; dönüm, dekar ve m².", group: "harita" },
  { href: "/yerel-saat-hesaplama", title: "Yerel Saat Farkı Hesaplama", description: "Boylam farkından yerel saat; her meridyen 4 dakika.", group: "zaman" },
  { href: "/saat-dilimi-cevirici", title: "Saat Dilimi Çevirici", description: "Bir saati birden çok ülkenin saatine çevir.", group: "zaman" },
  { href: "/gunes-acisi-ve-golge-boyu-hesaplama", title: "Güneş Açısı ve Gölge Boyu", description: "Güneşin yüksekliği, gölge boyu ve kışın güneş alma süresi.", group: "zaman" },
  { href: "/seyahat-priz-voltaj-hesaplama", title: "Ülkelere Göre Priz ve Voltaj", description: "Seyahatte adaptör gerekir mi?", group: "dunya" },
];

export const geoGroupLabels: Record<GeoTool["group"], string> = {
  harita: "Harita ve ölçüm",
  zaman: "Zaman ve Güneş",
  turkiye: "Türkiye",
  dunya: "Dünya",
};

export function geoRelated(exclude: string, limit = 8) {
  const seen = new Set<string>([exclude]);
  return geoToolsTr
    .filter((t) => !seen.has(t.href) && seen.add(t.href))
    .slice(0, limit)
    .map((t) => ({ href: t.href, label: t.title }));
}

// Ingilizce cografya araclari.
export const geoToolsEn: GeoTool[] = [
  { href: "/en/map-scale-calculator", title: "Map Scale Calculator", description: "Map distance to ground distance, real area, find the scale and draw a scale bar.", group: "harita" },
  { href: "/en/coordinate-converter", title: "Coordinate Converter", description: "Decimal degrees, DMS, degrees decimal minutes and UTM.", group: "harita" },
  { href: "/en/solar-time-calculator", title: "Solar Time Calculator", description: "Local mean time and true solar noon from longitude.", group: "zaman" },
  { href: "/en/time-zone-converter", title: "Time Zone Converter", description: "Convert a time across several countries.", group: "zaman" },
  { href: "/en/acres-to-hectares", title: "Acres to Hectares", description: "Land area conversion.", group: "harita" },
];

export const geoGroupLabelsEn: Record<GeoTool["group"], string> = {
  harita: "Maps and measurement",
  zaman: "Time and the Sun",
  turkiye: "Turkey",
  dunya: "World",
};

export function geoRelatedEn(exclude: string, limit = 8) {
  return geoToolsEn
    .filter((t) => t.href !== exclude)
    .slice(0, limit)
    .map((t) => ({ href: t.href, label: t.title }));
}
