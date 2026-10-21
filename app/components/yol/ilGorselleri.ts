// İl fotoğrafları (navigasyon ekranının arka planı): Wikimedia Commons'tan serbest lisanslı. Dosyalar
// <taban>-1920.webp ve <taban>-960.webp; fotoğrafı olmayan ilde düz koyu zemin kullanılır.
export type IlGorseli = { taban: string; yer: string; yazar: string; lisans: string; kaynak: string };

const GORSELLER: Record<string, IlGorseli> = {
  ankara: { taban: "/saat/ankara", yer: "Anıtkabir", yazar: "William Neuheisel from DC, US", lisans: "CC BY 2.0", kaynak: "https://commons.wikimedia.org/wiki/File:Ataturk%27s_Mausoleum_(6225341313).jpg" },
  istanbul: { taban: "/saat/istanbul", yer: "Ayasofya", yazar: "Arild Vågen", lisans: "CC BY-SA 3.0", kaynak: "https://commons.wikimedia.org/wiki/File:Hagia_Sophia_Mars_2013.jpg" },
  izmir: { taban: "/saat/izmir", yer: "Saat Kulesi, Konak", yazar: "Mors et Vita", lisans: "CC BY 4.0", kaynak: "https://commons.wikimedia.org/wiki/File:Izmir_Konak_Square_and_Clock_Tower,_2026.jpg" },
};

export function ilGorseli(ilId: string): IlGorseli | null {
  return GORSELLER[ilId] ?? null;
}
