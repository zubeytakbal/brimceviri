// Turkce sayi bicimlendirme ve okuma (sunucu ve istemcide ortak).

/** 7 anlamli basamak, Turkce ayirac; cok buyuk/kucuk degerler bilimsel gosterimle. */
export function formatSayi(value: number) {
  if (!Number.isFinite(value)) return "—";
  if (value !== 0 && (Math.abs(value) >= 1e12 || Math.abs(value) < 1e-6)) {
    return value.toExponential(6).replace(".", ",");
  }
  return Number(value.toPrecision(7)).toLocaleString("tr-TR", { maximumFractionDigits: 12 });
}

/** "1.234,5" / "1234.5" / "1234,5" girdisini sayiya cevirir; gecersizse null. */
export function sayiOku(metin: string): number | null {
  const t = metin.trim().replace(/\s/g, "");
  if (!t) return null;
  let s = t;
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}
