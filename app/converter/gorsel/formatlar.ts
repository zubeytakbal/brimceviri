// Görsel formatları: tarayıcıda okunup yazılabilen biçimler ve temel özellikleri.
// Tüm dönüştürme kullanıcının tarayıcısında yapılır; dosya sunucuya gönderilmez.

export type GorselFormat = "jpg" | "png" | "webp";

export type FormatBilgi = {
  id: GorselFormat;
  ad: string;
  mime: string;
  uzanti: string;
  /** Okuma için kabul edilen uzantılar ve MIME türleri (input accept). */
  kabul: string;
  kayipli: boolean;
  seffaflik: boolean;
  /** Kalite ayarı anlamlı mı (kayıplı kodlama)? */
  kaliteli: boolean;
};

export const FORMATLAR: Record<GorselFormat, FormatBilgi> = {
  jpg: {
    id: "jpg",
    ad: "JPG",
    mime: "image/jpeg",
    uzanti: "jpg",
    kabul: ".jpg,.jpeg,.jfif,image/jpeg",
    kayipli: true,
    seffaflik: false,
    kaliteli: true,
  },
  png: {
    id: "png",
    ad: "PNG",
    mime: "image/png",
    uzanti: "png",
    kabul: ".png,image/png",
    kayipli: false,
    seffaflik: true,
    kaliteli: false,
  },
  webp: {
    id: "webp",
    ad: "WebP",
    mime: "image/webp",
    uzanti: "webp",
    kabul: ".webp,image/webp",
    kayipli: true,
    seffaflik: true,
    kaliteli: true,
  },
};

export const FORMAT_LISTESI = Object.values(FORMATLAR);

/** Dosya adından formatı tahmin eder (MIME boşsa). */
export function formatTahmin(ad: string, mime = ""): GorselFormat | null {
  const m = mime.toLowerCase();
  if (m === "image/jpeg" || m === "image/pjpeg") return "jpg";
  if (m === "image/png") return "png";
  if (m === "image/webp") return "webp";
  const u = ad.toLowerCase().split(".").pop() ?? "";
  if (["jpg", "jpeg", "jfif", "jpe"].includes(u)) return "jpg";
  if (u === "png") return "png";
  if (u === "webp") return "webp";
  return null;
}

/** Çıktı dosya adı: uzantıyı yeni formatla değiştirir. */
export function ciktiAdi(ad: string, hedef: GorselFormat) {
  const taban = ad.replace(/\.[^./\\]+$/, "") || "gorsel";
  return `${taban}.${FORMATLAR[hedef].uzanti}`;
}

/** Bayt değerini okunur biçime çevirir (Windows gibi 1 KB = 1024 bayt). */
export function boyutMetni(bayt: number, kb = 1024) {
  if (bayt < kb) return `${bayt} B`;
  if (bayt < kb * kb)
    return `${(bayt / kb).toLocaleString("tr-TR", { maximumFractionDigits: 1 })} KB`;
  return `${(bayt / kb / kb).toLocaleString("tr-TR", { maximumFractionDigits: 2 })} MB`;
}
