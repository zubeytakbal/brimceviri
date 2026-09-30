// Görsel boyutlandırma ve hedef dosya boyutuna sıkıştırma için saf hesaplar.

export type Olcu = { genislik: number; yukseklik: number };

/**
 * Yeni ölçüyü hesaplar. Yalnız genişlik ya da yalnız yükseklik verilirse oran korunur;
 * ikisi de verilip `oranKoru` açıksa görsel bu kutuya sığdırılır (büyütülmez).
 */
export function olcuHesapla(
  kaynak: Olcu,
  hedef: { genislik?: number; yukseklik?: number; oranKoru?: boolean },
): Olcu {
  const { genislik: w, yukseklik: h, oranKoru = true } = hedef;
  const oran = kaynak.genislik / kaynak.yukseklik;
  const tam = (n: number) => Math.max(1, Math.round(n));
  if (w && h) {
    if (!oranKoru) return { genislik: tam(w), yukseklik: tam(h) };
    const k = Math.min(w / kaynak.genislik, h / kaynak.yukseklik);
    return {
      genislik: tam(kaynak.genislik * k),
      yukseklik: tam(kaynak.yukseklik * k),
    };
  }
  if (w) return { genislik: tam(w), yukseklik: tam(w / oran) };
  if (h) return { genislik: tam(h * oran), yukseklik: tam(h) };
  return { ...kaynak };
}

/** Milimetreyi verilen DPI'da piksele çevirir (1 inç = 25,4 mm). */
export const mmPiksel = (mm: number, dpi: number) =>
  Math.round((mm / 25.4) * dpi);

/**
 * Kayıplı kodlamada hedef boyutun altına inen en yüksek kaliteyi ikili aramayla bulur.
 * `kodla(kalite)` üretilen dosyanın bayt boyutunu döndürür.
 * En düşük kalitede bile hedef aşılıyorsa `null` döner (görsel küçültülmelidir).
 */
export async function kaliteAra(
  kodla: (kalite: number) => Promise<number>,
  hedefBayt: number,
  { min = 0.05, max = 0.95, adim = 7 } = {},
): Promise<{ kalite: number; bayt: number } | null> {
  const ust = await kodla(max);
  if (ust <= hedefBayt) return { kalite: max, bayt: ust };
  const alt = await kodla(min);
  if (alt > hedefBayt) return null;
  let iyi = { kalite: min, bayt: alt };
  let lo = min;
  let hi = max;
  for (let i = 0; i < adim; i++) {
    const q = (lo + hi) / 2;
    const b = await kodla(q);
    if (b <= hedefBayt) {
      iyi = { kalite: q, bayt: b };
      lo = q;
    } else hi = q;
  }
  return iyi;
}

export type Bolge = { x: number; y: number; w: number; h: number };

/**
 * Sabit en-boy oranlı kırpma bölgesi. `olcek` 1 iken sığabilecek en büyük bölgedir;
 * `merkez` verilmezse yatayda ortalanır, dikeyde portre fotoğraflarda yüz genellikle üstte
 * olduğu için biraz yukarıda konumlanır.
 */
export function kirpmaBolgesi(
  kaynak: Olcu,
  oran: number,
  olcek = 1,
  merkez?: { x: number; y: number },
): Bolge {
  const { genislik: W, yukseklik: H } = kaynak;
  let w = W;
  let h = w / oran;
  if (h > H) {
    h = H;
    w = h * oran;
  }
  const s = Math.min(1, Math.max(0.1, olcek));
  w *= s;
  h *= s;
  const cx = merkez?.x ?? W / 2;
  const cy = merkez?.y ?? h / 2 + (H - h) * 0.35;
  return kirpmaSinirla({ x: cx - w / 2, y: cy - h / 2, w, h }, kaynak);
}

/** Bölgeyi görselin sınırları içinde tutar ve tam sayıya yuvarlar. */
export function kirpmaSinirla(b: Bolge, kaynak: Olcu): Bolge {
  const w = Math.min(b.w, kaynak.genislik);
  const h = Math.min(b.h, kaynak.yukseklik);
  const x = Math.min(Math.max(0, b.x), kaynak.genislik - w);
  const y = Math.min(Math.max(0, b.y), kaynak.yukseklik - h);
  return {
    x: Math.round(x),
    y: Math.round(y),
    w: Math.round(w),
    h: Math.round(h),
  };
}

export type Sigdirma = "sigdir" | "bosluk" | "doldur" | "esnet";

export type BoyutAyar =
  | {
      mod: "piksel";
      genislik?: number;
      yukseklik?: number;
      oranKoru: boolean;
      sigdirma: Sigdirma;
    }
  | { mod: "yuzde"; yuzde: number }
  | {
      mod: "cm";
      genislikCm?: number;
      yukseklikCm?: number;
      dpi: number;
      oranKoru: boolean;
      sigdirma: Sigdirma;
    };

/**
 * Boyutlandırma planı: çıktı ölçüsü ve (doldur modunda) kaynaktan alınacak bölge.
 * "sigdir": oran korunur, kutunun içine sığar; "bosluk": kutu ölçüsü korunur, görsel ortalanır ve
 * kalan boşluk arka plan rengiyle dolar; "doldur": kutu tam doldurulur, taşan kısım ortadan kırpılır;
 * "esnet": oran bozulur, tam kutu ölçüsü.
 */
export function boyutPlani(
  kaynak: Olcu,
  a: BoyutAyar,
): Olcu & { bolge?: Bolge; yerlesim?: Bolge } {
  if (a.mod === "yuzde") {
    const k = Math.max(1, a.yuzde) / 100;
    return olcuHesapla(kaynak, { genislik: kaynak.genislik * k });
  }
  const w =
    a.mod === "cm"
      ? a.genislikCm
        ? mmPiksel(a.genislikCm * 10, a.dpi)
        : undefined
      : a.genislik;
  const h =
    a.mod === "cm"
      ? a.yukseklikCm
        ? mmPiksel(a.yukseklikCm * 10, a.dpi)
        : undefined
      : a.yukseklik;
  if (!w || !h || a.oranKoru === false) {
    if (w && h) return { genislik: w, yukseklik: h };
    return olcuHesapla(kaynak, { genislik: w, yukseklik: h });
  }
  if (a.sigdirma === "esnet") return { genislik: w, yukseklik: h };
  if (a.sigdirma === "doldur") {
    const bolge = kirpmaBolgesi(kaynak, w / h, 1, {
      x: kaynak.genislik / 2,
      y: kaynak.yukseklik / 2,
    });
    return { genislik: w, yukseklik: h, bolge };
  }
  const k = Math.min(w / kaynak.genislik, h / kaynak.yukseklik);
  const gw = Math.max(1, Math.round(kaynak.genislik * k));
  const gh = Math.max(1, Math.round(kaynak.yukseklik * k));
  if (a.sigdirma === "bosluk")
    return {
      genislik: w,
      yukseklik: h,
      yerlesim: {
        x: Math.round((w - gw) / 2),
        y: Math.round((h - gh) / 2),
        w: gw,
        h: gh,
      },
    };
  return { genislik: gw, yukseklik: gh };
}
