// Küçük ASN.1 BER/DER okuyucu (CMS / e-imza dosyaları için). Belirsiz uzunluk desteklenir.

export type Asn1 = {
  /** Etiketin ilk baytı (sınıf + yapılı bit + numara), ör. 0x30 SEQUENCE */
  etiket: number;
  yapili: boolean;
  /** Düğümün kaynaktaki başlangıcı (başlık dahil) */
  bas: number;
  /** İçeriğin başlangıcı */
  ic: number;
  /** İçeriğin sonu (belirsiz uzunlukta bitiş işaretinden önce) */
  icSon: number;
  /** Düğümün sonu (bitiş işareti dahil) */
  son: number;
  cocuk: Asn1[];
  kaynak: Uint8Array;
};

const DERIN = 64;

function oku(v: Uint8Array, i: number, sinir: number, derinlik: number): Asn1 {
  if (derinlik > DERIN) throw new Error("ASN.1 çok derin.");
  if (i + 2 > sinir) throw new Error("ASN.1 verisi eksik.");
  const bas = i;
  const etiket = v[i++];
  // çok baytlı etiket numarası
  if ((etiket & 0x1f) === 0x1f) while (i < sinir && v[i++] & 0x80);
  let uz = v[i++];
  let belirsiz = false;
  if (uz === 0x80) belirsiz = true;
  else if (uz & 0x80) {
    const n = uz & 0x7f;
    if (n > 4 || i + n > sinir) throw new Error("ASN.1 uzunluğu geçersiz.");
    uz = 0;
    for (let k = 0; k < n; k++) uz = uz * 256 + v[i++];
  }
  const yapili = (etiket & 0x20) !== 0;
  const ic = i;
  const cocuk: Asn1[] = [];
  if (belirsiz) {
    if (!yapili) throw new Error("ASN.1 belirsiz uzunluk geçersiz.");
    while (true) {
      if (i + 2 > sinir) throw new Error("ASN.1 verisi eksik.");
      if (v[i] === 0 && v[i + 1] === 0) break;
      const c = oku(v, i, sinir, derinlik + 1);
      cocuk.push(c);
      i = c.son;
    }
    return { etiket, yapili, bas, ic, icSon: i, son: i + 2, cocuk, kaynak: v };
  }
  const icSon = ic + uz;
  if (icSon > sinir) throw new Error("ASN.1 verisi eksik.");
  if (yapili) {
    while (i < icSon) {
      const c = oku(v, i, icSon, derinlik + 1);
      cocuk.push(c);
      i = c.son;
    }
  }
  return { etiket, yapili, bas, ic, icSon, son: icSon, cocuk, kaynak: v };
}

export function asn1Oku(v: Uint8Array): Asn1 {
  return oku(v, 0, v.length, 0);
}

export const icerik = (a: Asn1) => a.kaynak.subarray(a.ic, a.icSon);
/** Düğümün tamamı (başlık dahil) */
export const ham = (a: Asn1) => a.kaynak.subarray(a.bas, a.son);

/** OCTET STRING içeriği; yapılı (parçalı) biçimi birleştirir. */
export function oktet(a: Asn1): Uint8Array {
  if (!a.yapili) return icerik(a).slice();
  const parcalar = a.cocuk.map(oktet);
  const out = new Uint8Array(parcalar.reduce((t, p) => t + p.length, 0));
  let k = 0;
  for (const p of parcalar) {
    out.set(p, k);
    k += p.length;
  }
  return out;
}

export function oid(a: Asn1): string {
  const b = icerik(a);
  if (!b.length) return "";
  const out: number[] = [Math.min(2, Math.floor(b[0] / 40)), 0];
  out[1] = b[0] - out[0] * 40;
  let n = 0;
  for (let i = 1; i < b.length; i++) {
    n = n * 128 + (b[i] & 0x7f);
    if (!(b[i] & 0x80)) {
      out.push(n);
      n = 0;
    }
  }
  return out.join(".");
}

export function metinDegeri(a: Asn1): string {
  const b = icerik(a);
  switch (a.etiket) {
    case 0x1e: {
      // BMPString (UTF-16BE)
      let s = "";
      for (let i = 0; i + 1 < b.length; i += 2)
        s += String.fromCharCode((b[i] << 8) | b[i + 1]);
      return s;
    }
    case 0x14: // TeletexString: çoğunlukla Latin-1
    case 0x16: // IA5String
    case 0x13: // PrintableString
      return Array.from(b, (x) => String.fromCharCode(x)).join("");
    default:
      return new TextDecoder().decode(b);
  }
}

/** UTCTime / GeneralizedTime → Date */
export function zaman(a: Asn1): Date | null {
  const s = metinDegeri(a);
  const m =
    a.etiket === 0x17
      ? /^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})?Z$/.exec(s)
      : /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})?(?:[.,]\d+)?Z$/.exec(s);
  if (!m) return null;
  let yil = Number(m[1]);
  if (a.etiket === 0x17) yil += yil < 50 ? 2000 : 1900;
  return new Date(
    Date.UTC(
      yil,
      Number(m[2]) - 1,
      Number(m[3]),
      Number(m[4]),
      Number(m[5]),
      Number(m[6] ?? 0),
    ),
  );
}

export const hex = (b: Uint8Array) =>
  Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
