// Fırtına takvimi (halk arasında "Kocakarı takvimi"): kıyılarda uzun yıllar gözlemle belirlenmiş,
// denizcilerin ve balıkçıların kullandığı mevsimsel fırtınalar. Deniz Kuvvetleri Seyir, Hidrografi ve
// Oşinografi Dairesi ajandasındaki takvime dayanır; kaynaklar arasında 1-3 gün farklar vardır ve
// fırtınalar bu sapmayla gerçekleşir. Yalnızca adı kaynaklarda tutarlı olan fırtınalar listelenir.
import type { YMD } from "../time/calendars";
import { diffDays } from "../time/dateMath";

export type Firtina = { ay: number; gun: number; ad: string; sure?: number };

export const FIRTINALAR: Firtina[] = [
  { ay: 1, gun: 14, ad: "Karakoncolos fırtınası" },
  { ay: 1, gun: 25, ad: "Kış şiddeti fırtınası" },
  { ay: 1, gun: 28, ad: "Ayandon fırtınası", sure: 2 },
  { ay: 1, gun: 31, ad: "Balık fırtınası" },
  { ay: 2, gun: 1, ad: "Hamsin fırtınası", sure: 3 },
  { ay: 3, gun: 11, ad: "Kocakarı fırtınası (Kocakarı soğukları)", sure: 7 },
  { ay: 3, gun: 12, ad: "Husum fırtınası" },
  { ay: 3, gun: 21, ad: "Mart dokuzu fırtınası", sure: 2 },
  { ay: 3, gun: 24, ad: "Koz kavuran fırtınası", sure: 2 },
  { ay: 3, gun: 26, ad: "Çaylak fırtınası" },
  { ay: 4, gun: 8, ad: "Kırlangıç fırtınası", sure: 2 },
  { ay: 4, gun: 16, ad: "Kuğu (Sitte-i Sevir) fırtınası", sure: 3 },
  { ay: 5, gun: 19, ad: "Kokulya fırtınası" },
  { ay: 5, gun: 30, ad: "Çabak meltemi", sure: 2 },
  { ay: 6, gun: 10, ad: "Ülker doğumu fırtınası", sure: 3 },
  { ay: 6, gun: 22, ad: "Gündönümü fırtınası" },
  { ay: 6, gun: 27, ad: "Kızılerik fırtınası", sure: 2 },
  { ay: 7, gun: 11, ad: "Çark dönümü fırtınası" },
  { ay: 7, gun: 22, ad: "Karaerik fırtınası" },
  { ay: 8, gun: 31, ad: "Mercan fırtınası" },
  { ay: 9, gun: 2, ad: "Mihrican fırtınası" },
  { ay: 9, gun: 7, ad: "Bıldırcın geçimi fırtınası" },
  { ay: 9, gun: 13, ad: "Çaylak fırtınası" },
  { ay: 9, gun: 28, ad: "Kestane karası fırtınası" },
  { ay: 9, gun: 30, ad: "Turna geçimi fırtınası" },
  { ay: 10, gun: 3, ad: "Kuş geçimi fırtınası" },
  { ay: 10, gun: 14, ad: "Meryemana fırtınası" },
  { ay: 10, gun: 21, ad: "Bağbozumu fırtınası" },
  { ay: 10, gun: 28, ad: "Balık fırtınası" },
  { ay: 11, gun: 7, ad: "Kasım fırtınası" },
  { ay: 11, gun: 12, ad: "Lodos fırtınası" },
  { ay: 11, gun: 17, ad: "Koç katımı fırtınası" },
  { ay: 12, gun: 2, ad: "Ülker dönümü fırtınası" },
  { ay: 12, gun: 9, ad: "Karakış fırtınası" },
];

export const firtinaTarihi = (f: Firtina, year: number): YMD => ({
  year,
  month: f.ay,
  day: f.gun,
});

/** Bugünden itibaren ilk n fırtına (sürmekte olan dahil). */
export function siradakiFirtinalar(bugun: YMD, n: number) {
  const out: Array<{ f: Firtina; tarih: YMD; kalan: number }> = [];
  for (const y of [bugun.year, bugun.year + 1]) {
    for (const f of FIRTINALAR) {
      const tarih = firtinaTarihi(f, y);
      const kalan = diffDays(bugun, tarih);
      if (kalan + (f.sure ?? 1) - 1 >= 0) out.push({ f, tarih, kalan });
    }
  }
  return out.slice(0, n);
}

export const ayFirtinalari = (month: number) =>
  FIRTINALAR.filter((f) => f.ay === month);
