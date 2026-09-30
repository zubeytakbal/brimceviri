// JPEG/PNG meta verisini okuma ve kayıpsız temizleme (görüntü verisi yeniden sıkıştırılmaz).

export type ExifBilgi = {
  marka?: string;
  model?: string;
  yazilim?: string;
  tarih?: string;
  lens?: string;
  yon?: number;
  gps?: { enlem: number; boylam: number; yukseklik?: number };
  /** Bulunan meta veri türleri: EXIF, XMP, IPTC, yorum, PNG metni. */
  turler: string[];
};

const ASCII = (v: Uint8Array) =>
  new TextDecoder("latin1").decode(v).replace(/\0+$/, "").trim();

/** TIFF yapısındaki EXIF bloğunu okur (JPEG APP1 veya PNG eXIf içeriği, "Exif\0\0" öneki olmadan). */
export function tiffOku(t: Uint8Array): Omit<ExifBilgi, "turler"> {
  const dv = new DataView(t.buffer, t.byteOffset, t.byteLength);
  const le = t[0] === 0x49;
  const u16 = (o: number) => dv.getUint16(o, le);
  const u32 = (o: number) => dv.getUint32(o, le);
  const sonuc: Omit<ExifBilgi, "turler"> = {};
  const BOY: Record<number, number> = {
    1: 1,
    2: 1,
    3: 2,
    4: 4,
    5: 8,
    7: 1,
    9: 4,
    10: 8,
  };

  const ifd = (
    ofs: number,
    isle: (tag: number, tur: number, sayi: number, veriOfs: number) => void,
  ) => {
    if (ofs <= 0 || ofs + 2 > t.length) return;
    const n = u16(ofs);
    for (let i = 0; i < n; i++) {
      const e = ofs + 2 + i * 12;
      if (e + 12 > t.length) return;
      const tur = u16(e + 2);
      const sayi = u32(e + 4);
      const boy = (BOY[tur] ?? 1) * sayi;
      const veriOfs = boy <= 4 ? e + 8 : u32(e + 8);
      if (veriOfs + boy > t.length) continue;
      isle(u16(e), tur, sayi, veriOfs);
    }
  };
  const metin = (o: number, n: number) => ASCII(t.subarray(o, o + n));
  const oran = (o: number) => {
    const b = u32(o + 4);
    return b ? u32(o) / b : 0;
  };
  const derece = (o: number) =>
    oran(o) + oran(o + 8) / 60 + oran(o + 16) / 3600;

  let exifOfs = 0;
  let gpsOfs = 0;
  ifd(u32(4), (tag, tur, sayi, o) => {
    if (tag === 0x010f) sonuc.marka = metin(o, sayi);
    else if (tag === 0x0110) sonuc.model = metin(o, sayi);
    else if (tag === 0x0131) sonuc.yazilim = metin(o, sayi);
    else if (tag === 0x0132) sonuc.tarih ??= metin(o, sayi);
    else if (tag === 0x0112) sonuc.yon = u16(o);
    else if (tag === 0x8769) exifOfs = u32(o);
    else if (tag === 0x8825) gpsOfs = u32(o);
  });
  ifd(exifOfs, (tag, tur, sayi, o) => {
    if (tag === 0x9003) sonuc.tarih = metin(o, sayi);
    else if (tag === 0xa434) sonuc.lens = metin(o, sayi);
  });
  const g: {
    enlemYon?: string;
    enlem?: number;
    boylamYon?: string;
    boylam?: number;
    yukseklik?: number;
    alti?: number;
  } = {};
  ifd(gpsOfs, (tag, tur, sayi, o) => {
    if (tag === 1) g.enlemYon = metin(o, sayi);
    else if (tag === 2 && sayi === 3) g.enlem = derece(o);
    else if (tag === 3) g.boylamYon = metin(o, sayi);
    else if (tag === 4 && sayi === 3) g.boylam = derece(o);
    else if (tag === 5) g.alti = t[o];
    else if (tag === 6) g.yukseklik = oran(o);
  });
  if (
    g.enlem !== undefined &&
    g.boylam !== undefined &&
    (g.enlem !== 0 || g.boylam !== 0)
  ) {
    sonuc.gps = {
      enlem: g.enlemYon === "S" ? -g.enlem : g.enlem,
      boylam: g.boylamYon === "W" ? -g.boylam : g.boylam,
      ...(g.yukseklik !== undefined
        ? { yukseklik: g.alti === 1 ? -g.yukseklik : g.yukseklik }
        : {}),
    };
  }
  return sonuc;
}

type Bolum = { isaret: number; bas: number; son: number };

/** JPEG bölümlerini (SOS'a kadar) listeler. */
function jpegBolumleri(
  v: Uint8Array,
): { bolumler: Bolum[]; veriBas: number } | null {
  if (v[0] !== 0xff || v[1] !== 0xd8) return null;
  const bolumler: Bolum[] = [];
  let i = 2;
  while (i + 4 <= v.length) {
    if (v[i] !== 0xff) return null;
    const isaret = v[i + 1];
    if (
      isaret === 0xd8 ||
      (isaret >= 0xd0 && isaret <= 0xd7) ||
      isaret === 0x01
    ) {
      i += 2;
      continue;
    }
    if (isaret === 0xda) return { bolumler, veriBas: i };
    const uz = (v[i + 2] << 8) | v[i + 3];
    bolumler.push({ isaret, bas: i, son: i + 2 + uz });
    i += 2 + uz;
  }
  return null;
}

const bas = (v: Uint8Array, b: Bolum, s: string) =>
  String.fromCharCode(...v.subarray(b.bas + 4, b.bas + 4 + s.length)) === s;

export function jpegExifOku(v: Uint8Array): ExifBilgi | null {
  const j = jpegBolumleri(v);
  if (!j) return null;
  const bilgi: ExifBilgi = { turler: [] };
  for (const b of j.bolumler) {
    if (b.isaret === 0xe1 && bas(v, b, "Exif\0\0")) {
      bilgi.turler.push("EXIF");
      try {
        Object.assign(bilgi, tiffOku(v.subarray(b.bas + 10, b.son)));
      } catch {
        /* bozuk EXIF: türü yine de bildir */
      }
    } else if (b.isaret === 0xe1 && bas(v, b, "http://ns.adobe.com/xap/"))
      bilgi.turler.push("XMP");
    else if (b.isaret === 0xed) bilgi.turler.push("IPTC");
    else if (b.isaret === 0xfe) bilgi.turler.push("Yorum");
  }
  bilgi.turler = [...new Set(bilgi.turler)];
  return bilgi;
}

/** Yalnızca yön (Orientation) etiketini içeren küçük bir EXIF bölümü üretir. */
function yonExif(yon: number): Uint8Array {
  const tiff = [
    0x4d,
    0x4d,
    0,
    0x2a,
    0,
    0,
    0,
    8,
    0,
    1,
    0x01,
    0x12,
    0,
    3,
    0,
    0,
    0,
    1,
    0,
    yon,
    0,
    0,
    0,
    0,
    0,
    0,
  ];
  const govde = [0x45, 0x78, 0x69, 0x66, 0, 0, ...tiff];
  const uz = govde.length + 2;
  return new Uint8Array([0xff, 0xe1, uz >> 8, uz & 0xff, ...govde]);
}

/**
 * JPEG'den EXIF, XMP, IPTC ve yorumları kayıpsız siler. Renk profili (ICC) ve Adobe bölümleri korunur.
 * Fotoğraf döndürülmüş kaydedildiyse doğru görünmesi için yalnızca yön bilgisi bırakılır.
 */
export function jpegTemizle(v: Uint8Array): Uint8Array {
  const j = jpegBolumleri(v);
  if (!j) throw new Error("JPEG dosyası okunamadı");
  const yon = jpegExifOku(v)?.yon;
  const parcalar: Uint8Array[] = [v.subarray(0, 2)];
  let yonEklendi = false;
  for (const b of j.bolumler) {
    const sil = b.isaret === 0xe1 || b.isaret === 0xed || b.isaret === 0xfe;
    if (!sil) {
      parcalar.push(v.subarray(b.bas, b.son));
      if (b.isaret === 0xe0 && yon && yon !== 1 && !yonEklendi) {
        parcalar.push(yonExif(yon));
        yonEklendi = true;
      }
    }
  }
  if (yon && yon !== 1 && !yonEklendi) parcalar.splice(1, 0, yonExif(yon));
  parcalar.push(v.subarray(j.veriBas));
  const out = new Uint8Array(parcalar.reduce((s, p) => s + p.length, 0));
  let k = 0;
  for (const p of parcalar) {
    out.set(p, k);
    k += p.length;
  }
  return out;
}

const PNG_META = new Set(["eXIf", "tEXt", "iTXt", "zTXt", "tIME"]);

function pngParcalari(v: Uint8Array) {
  const imza = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (!imza.every((b, i) => v[i] === b)) return null;
  const dv = new DataView(v.buffer, v.byteOffset, v.byteLength);
  const out: Array<{ tur: string; bas: number; son: number }> = [];
  let i = 8;
  while (i + 8 <= v.length) {
    const uz = dv.getUint32(i);
    const tur = String.fromCharCode(...v.subarray(i + 4, i + 8));
    out.push({ tur, bas: i, son: i + 12 + uz });
    i += 12 + uz;
    if (tur === "IEND") break;
  }
  return out;
}

export function pngExifOku(v: Uint8Array): ExifBilgi | null {
  const p = pngParcalari(v);
  if (!p) return null;
  const bilgi: ExifBilgi = { turler: [] };
  for (const c of p) {
    if (c.tur === "eXIf") {
      bilgi.turler.push("EXIF");
      try {
        Object.assign(bilgi, tiffOku(v.subarray(c.bas + 8, c.son - 4)));
      } catch {
        /* yok say */
      }
    } else if (PNG_META.has(c.tur)) bilgi.turler.push("PNG metni");
  }
  bilgi.turler = [...new Set(bilgi.turler)];
  return bilgi;
}

/** PNG'den EXIF ve metin parçalarını kayıpsız siler. */
export function pngTemizle(v: Uint8Array): Uint8Array {
  const p = pngParcalari(v);
  if (!p) throw new Error("PNG dosyası okunamadı");
  const kalan = [
    v.subarray(0, 8),
    ...p
      .filter((c) => !PNG_META.has(c.tur))
      .map((c) => v.subarray(c.bas, c.son)),
  ];
  const out = new Uint8Array(kalan.reduce((s, x) => s + x.length, 0));
  let k = 0;
  for (const x of kalan) {
    out.set(x, k);
    k += x.length;
  }
  return out;
}
