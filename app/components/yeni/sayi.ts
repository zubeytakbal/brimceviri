// Turkce sayi bicimlendirme ve okuma (sunucu ve istemcide ortak).

const BILIMSEL = (v: number) => v !== 0 && (Math.abs(v) >= 1e12 || Math.abs(v) < 1e-6);

/** Bilimsel gosterimde mantis ve us: 6,213712e-7 -> ["6,213712", -7]; mantisin sondaki sifirlari atilir. */
function parcala(value: number): [string, number] {
  const [m, e] = value.toExponential(6).split("e");
  return [m.replace(/\.?0+$/, "").replace(".", ","), Number(e)];
}

/** 7 anlamli basamak, Turkce ayirac; cok buyuk/kucuk degerler bilimsel gosterimle (1e-9). Cevirici kutulari icin: sayiOku geri okuyabilir. */
export function formatSayi(value: number) {
  if (!Number.isFinite(value)) return "—";
  if (BILIMSEL(value)) {
    const [m, e] = parcala(value);
    return `${m}e${e}`;
  }
  return Number(value.toPrecision(7)).toLocaleString("tr-TR", { maximumFractionDigits: 12 });
}

const UST = "⁰¹²³⁴⁵⁶⁷⁸⁹";
/** Metin ve tablolar icin okunur bicim: cok buyuk/kucuk degerler 1 × 10⁻⁹ olarak yazilir. */
export function formatOkunur(value: number) {
  if (!Number.isFinite(value) || !BILIMSEL(value)) return formatSayi(value);
  const [m, e] = parcala(value);
  const us = (e < 0 ? "⁻" : "") + String(Math.abs(e)).replace(/\d/g, (d) => UST[Number(d)]);
  return `${m} × 10${us}`;
}

/** "1.234,5" / "1234.5" / "1234,5" / "1e-9" girdisini sayiya cevirir; gecersizse null. */
export function sayiOku(metin: string): number | null {
  const t = metin.trim().replace(/\s/g, "");
  if (!t) return null;
  let s = t;
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

/** Kutuya yazilacak baslangic metni: binlik noktasi olmadan ("1000"), cunku sayiOku virgulsuz noktayi ondalik sayar
 * ve "1.000" degerini 1 okurdu. */
export function girisMetni(n: number): string {
  return formatSayi(n).replace(/\./g, "");
}
