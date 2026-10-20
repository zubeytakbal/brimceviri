import type { SehirGorseli } from "./SehirSaatiHero";

// Şehir sayfalarının arka plan fotoğrafları: o şehri tanıtan tarihi ya da simge yapı. Dosyalar public/saat/
// altında, kaynak, yazar ve lisans bilgisiyle (Wikimedia Commons, serbest lisanslı). Fotoğrafı olmayan şehirde
// koyu düz arka plan kullanılır.
const GORSELLER: Record<string, SehirGorseli> = {
  londra: { dosya: "londra", yer: "Tower Bridge", yazar: "Fuzzypiggy", lisans: "CC BY-SA 3.0", kaynak: "https://commons.wikimedia.org/wiki/File:Tower_Bridge_at_Dawn.jpg" },
};

export function sehirGorseli(sehirSlug: string): SehirGorseli | null {
  return GORSELLER[sehirSlug] ?? null;
}
