// Cografya hesaplamalari kategorisindeki Turkce araclar (hub, "ilginizi cekebilir" ve anasayfa icin).
export type GeoTool = { href: string; title: string; description: string; group: "harita" | "zaman" | "turkiye" | "dunya" };

export const geoToolsTr: GeoTool[] = [
  { href: "/harita-olcegi-hesaplama", title: "Harita Ölçeği Hesaplama", description: "Haritadaki cm'nin gerçekte kaç km olduğu, gerçek alan, ölçek bulma ve çizgi ölçek.", group: "harita" },
  { href: "/koordinat-donusturucu", title: "Koordinat Dönüştürücü", description: "Derece-dakika-saniye, ondalık derece, UTM ve ITRF96 3° TM arasında dönüşüm.", group: "harita" },
  { href: "/iller-arasi-mesafe", title: "İller Arası Mesafe", description: "81 il arası karayolu (KGM) ve kuş uçuşu mesafe, yol süresi ve yakıt maliyeti.", group: "turkiye" },
  { href: "/turkiye-il-haritasi", title: "Türkiye İl Haritası", description: "81 il, plaka kodları, bölgeler ve rakımlar; tıklanabilir harita.", group: "turkiye" },
  { href: "/buyuk-daire-mesafesi-hesaplama", title: "Kuş Uçuşu Mesafe (Büyük Daire)", description: "İki koordinat arasındaki en kısa mesafe ve başlangıç rotası.", group: "harita" },
  { href: "/tarla-donum-hesaplama", title: "Tarla Dönüm Hesaplama", description: "Kenar ölçülerinden arazi alanı; dönüm, dekar ve m².", group: "harita" },
  { href: "/yerel-saat-hesaplama", title: "Yerel Saat Farkı Hesaplama", description: "Boylam farkından yerel saat; her meridyen 4 dakika.", group: "zaman" },
  { href: "/dunya-saatleri", title: "Dünya Saatleri", description: "97 şehrin canlı saati ve Türkiye ile saat farkı.", group: "zaman" },
  { href: "/saat-dilimi-cevirici", title: "Saat Dilimi Çevirici", description: "Bir saati birden çok ülkenin saatine çevir.", group: "zaman" },
  { href: "/altin-saat", title: "Gün Doğumu ve Altın Saat", description: "Güneşin doğuş-batış saatleri, altın ve mavi saat.", group: "zaman" },
  { href: "/ay-evreleri", title: "Ay Evreleri", description: "Bugün Ay hangi evrede, dolunay ne zaman?", group: "zaman" },
  { href: "/il-rakimlari", title: "İllerin Rakımı", description: "Türkiye'nin 81 ilinin denizden yüksekliği.", group: "turkiye" },
  { href: "/dunya-haritasi", title: "Dünya Haritası", description: "Tıklanabilir siyasi harita: 196 ülkenin başkenti, yüzölçümü ve saat farkı.", group: "dunya" },
  { href: "/ulkeler", title: "Ülkeler ve Başkentleri", description: "Kıtalara göre tüm ülkeler, başkentler ve Türkiye ile saat farkları.", group: "dunya" },
  { href: "/bolge-haritalari/orta-dogu", title: "Orta Doğu Haritası", description: "Bölge ülkeleri, başkentleri ve Ankara'ya uzaklıkları.", group: "dunya" },
  { href: "/bolge-haritalari/turk-devletleri", title: "Türk Devletleri Haritası", description: "Türk Devletleri Teşkilatı üyeleri ve gözlemcileri.", group: "dunya" },
  { href: "/dunyanin-en-yuksek-daglari", title: "Dünyanın En Yüksek Dağları", description: "8.000 metreyi aşan 14 zirve.", group: "dunya" },
  { href: "/seyahat-priz-voltaj-hesaplama", title: "Ülkelere Göre Priz ve Voltaj", description: "Seyahatte adaptör gerekir mi?", group: "dunya" },
  { href: "/gokcisimleri-ozellikleri", title: "Gezegenler ve Uydular", description: "Kütle, çap, yerçekimi ve karşılaştırmalar.", group: "dunya" },
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
  { href: "/en/world-map", title: "World Map", description: "Clickable political map of 196 countries with capitals, area and time zones.", group: "dunya" },
  { href: "/en/countries", title: "Countries and Capitals", description: "Every country by continent with its capital, UTC offset and calling code.", group: "dunya" },
  { href: "/en/world-clock", title: "World Clock", description: "Live time in 97 cities.", group: "zaman" },
  { href: "/en/time-zone-converter", title: "Time Zone Converter", description: "Convert a time across several countries.", group: "zaman" },
  { href: "/en/golden-hour", title: "Golden Hour Calculator", description: "Sunrise, sunset, golden and blue hour.", group: "zaman" },
  { href: "/en/moon-phases", title: "Moon Phases", description: "Today's moon phase and the next full moon.", group: "zaman" },
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
