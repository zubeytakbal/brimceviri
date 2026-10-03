// Ehliyet sınıfı sayfaları için sınıfa özel bağlam: aracın hangi sınırı aşınca bir üst sınıf
// gerektiği ve bir sınıftan önce hangi belgenin alınması gerektiği. Değerler licenseClasses
// açıklamalarındaki sınırlarla aynıdır (Karayolları Trafik Yönetmeliği).
import type { LicenseClassId } from "./licenseClassFinder";

export type UstSinif = { kosul: string; sinif: LicenseClassId; /** SSS için araç tarifi */ arac: string };

/** Bu sınıf yetmediğinde: hangi koşulda hangi sınıf gerekir. */
export const UST_SINIF: Record<LicenseClassId, UstSinif[]> = {
  M: [
    { kosul: "Motor 50 cm³'ü ya da hız 45 km/sa'i geçerse", sinif: "A1", arac: "50 cm³ üstü motosiklet" },
    { kosul: "Dört tekerlekli hafif araç (ATV, mikro otomobil) ise", sinif: "B1", arac: "ATV ya da mikro otomobil" },
  ],
  A1: [{ kosul: "Motor 125 cm³'ü ya da gücü 11 kW'ı geçerse", sinif: "A2", arac: "125 cm³ üstü motosiklet" }],
  A2: [{ kosul: "Motor gücü 35 kW'ı geçerse", sinif: "A", arac: "35 kW üstü motosiklet" }],
  A: [],
  B1: [{ kosul: "Gücü 15 kW'ı ya da boş ağırlığı 400 kg'ı (yük tipinde 550 kg) geçerse", sinif: "B", arac: "otomobil" }],
  B: [
    { kosul: "750 kg'ı aşan römork ya da karavan çekilecekse", sinif: "BE", arac: "750 kg üstü römork ya da karavan" },
    { kosul: "Azami yüklü ağırlık 3.500 kg'ı geçerse", sinif: "C1", arac: "3.500 kg üstü kamyonet ya da kamyon" },
    { kosul: "Sürücü dahil 9'dan fazla koltuk varsa", sinif: "D1", arac: "minibüs (9 koltuktan fazla)" },
  ],
  BE: [{ kosul: "Çeken araç 3.500 kg'ı geçerse", sinif: "C1E", arac: "3.500 kg üstü araçla römork" }],
  C1: [
    { kosul: "Azami yüklü ağırlık 7.500 kg'ı geçerse", sinif: "C", arac: "7.500 kg üstü kamyon" },
    { kosul: "750 kg'ı aşan römork çekilecekse", sinif: "C1E", arac: "kamyona 750 kg üstü römork" },
  ],
  C1E: [{ kosul: "Çeken araç 7.500 kg'ı geçerse", sinif: "CE", arac: "TIR (7.500 kg üstü çekici ve dorse)" }],
  C: [{ kosul: "750 kg'ı aşan römork ya da dorse çekilecekse", sinif: "CE", arac: "TIR (dorse ya da 750 kg üstü römork)" }],
  CE: [],
  D1: [
    { kosul: "Sürücü dahil 17'den fazla koltuk varsa", sinif: "D", arac: "otobüs (17 koltuktan fazla)" },
    { kosul: "750 kg'ı aşan römork çekilecekse", sinif: "D1E", arac: "minibüse 750 kg üstü römork" },
  ],
  D1E: [{ kosul: "Çeken araç 17'den fazla koltuklu otobüsse", sinif: "DE", arac: "römorklu otobüs" }],
  D: [{ kosul: "750 kg'ı aşan römork çekilecekse", sinif: "DE", arac: "otobüse 750 kg üstü römork" }],
  DE: [],
};

/** Bu sınıfı almadan önce sahip olunması gereken belge. */
export const ON_SART: Partial<Record<LicenseClassId, { sinif: LicenseClassId; not: string }>> = {
  BE: { sinif: "B", not: "BE, B sınıfı bir araca römork bağlanmasıdır; önce B sınıfı belge gerekir." },
  C1E: { sinif: "C1", not: "C1E için önce C1 sınıfı belge gerekir." },
  CE: { sinif: "C", not: "CE (TIR) için önce C sınıfı belge gerekir." },
  D1E: { sinif: "D1", not: "D1E için önce D1 sınıfı belge gerekir." },
  DE: { sinif: "D", not: "DE için önce D sınıfı belge gerekir." },
  A: { sinif: "A2", not: "20 yaşında A almak için en az 2 yıllık A2 belgesi gerekir; 24 yaşından sonra bu şart aranmaz." },
};

/** Bu sınıfa hangi alt sınıflardan geçilir (ters ilişki). */
export function altSiniflar(id: LicenseClassId): LicenseClassId[] {
  return (Object.entries(UST_SINIF) as [LicenseClassId, UstSinif[]][]).filter(([, l]) => l.some((u) => u.sinif === id)).map(([k]) => k);
}

export const SINIF_GRUPLARI: { baslik: string; siniflar: LicenseClassId[] }[] = [
  { baslik: "Motosiklet ve moped", siniflar: ["M", "A1", "A2", "A"] },
  { baslik: "Otomobil", siniflar: ["B1", "B", "BE"] },
  { baslik: "Kamyon", siniflar: ["C1", "C1E", "C", "CE"] },
  { baslik: "Minibüs ve otobüs", siniflar: ["D1", "D1E", "D", "DE"] },
];
