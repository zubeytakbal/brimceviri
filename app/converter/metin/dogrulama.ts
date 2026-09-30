// Kontrol hanesi doğrulamaları: TC kimlik no, vergi kimlik no (VKN), IBAN (ISO 13616, mod 97).
// Yalnızca numaranın yazım kuralına uygunluğunu denetler; kişinin/kurumun varlığını sorgulamaz.

export type Sonuc = { gecerli: boolean; neden?: string };

const rakamlar = (s: string) => s.replace(/[\s.-]/g, "");

/** TC kimlik numarası: 11 hane, ilk hane 0 olamaz, 10. ve 11. haneler kontrol hanesidir. */
export function tcknDogrula(girdi: string): Sonuc {
  const s = rakamlar(girdi);
  if (!/^\d+$/.test(s))
    return { gecerli: false, neden: "Yalnızca rakam içermeli." };
  if (s.length !== 11)
    return {
      gecerli: false,
      neden: `11 hane olmalı (${s.length} hane yazıldı).`,
    };
  if (s[0] === "0") return { gecerli: false, neden: "İlk hane 0 olamaz." };
  const d = Array.from(s, Number);
  const tek = d[0] + d[2] + d[4] + d[6] + d[8];
  const cift = d[1] + d[3] + d[5] + d[7];
  const h10 = (((tek * 7 - cift) % 10) + 10) % 10;
  if (h10 !== d[9])
    return { gecerli: false, neden: "10. hane (kontrol hanesi) tutmuyor." };
  const h11 = d.slice(0, 10).reduce((a, b) => a + b, 0) % 10;
  if (h11 !== d[10])
    return { gecerli: false, neden: "11. hane (kontrol hanesi) tutmuyor." };
  return { gecerli: true };
}

/** Vergi kimlik numarası: 10 hane, son hane kontrol hanesi. */
export function vknDogrula(girdi: string): Sonuc {
  const s = rakamlar(girdi);
  if (!/^\d+$/.test(s))
    return { gecerli: false, neden: "Yalnızca rakam içermeli." };
  if (s.length === 11)
    return {
      gecerli: false,
      neden:
        "11 haneli numaralar TC kimlik numarasıdır; şahıs şirketlerinde vergi numarası yerine TC kimlik no kullanılır.",
    };
  if (s.length !== 10)
    return {
      gecerli: false,
      neden: `10 hane olmalı (${s.length} hane yazıldı).`,
    };
  let t = 0;
  const ilk9 = s.slice(0, 9);
  for (let i = 1; i <= 9; i++) {
    const n = Number(ilk9[9 - i]);
    const c1 = (n + i) % 10;
    if (c1) t += (c1 * 2 ** i) % 9 || 9;
  }
  const kontrol = (10 - (t % 10)) % 10;
  if (kontrol !== Number(s[9]))
    return { gecerli: false, neden: "Son hane (kontrol hanesi) tutmuyor." };
  return { gecerli: true };
}

/** ISO 13616 IBAN uzunlukları (sık kullanılan ülkeler). */
export const IBAN_UZUNLUK: Record<string, [number, string]> = {
  TR: [26, "Türkiye"],
  DE: [22, "Almanya"],
  FR: [27, "Fransa"],
  GB: [22, "Birleşik Krallık"],
  NL: [18, "Hollanda"],
  BE: [16, "Belçika"],
  AT: [20, "Avusturya"],
  CH: [21, "İsviçre"],
  IT: [27, "İtalya"],
  ES: [24, "İspanya"],
  SE: [24, "İsveç"],
  NO: [15, "Norveç"],
  DK: [18, "Danimarka"],
  AZ: [28, "Azerbaycan"],
  GE: [22, "Gürcistan"],
  BG: [22, "Bulgaristan"],
  GR: [27, "Yunanistan"],
  CY: [28, "Kıbrıs"],
  SA: [24, "Suudi Arabistan"],
  AE: [23, "Birleşik Arap Emirlikleri"],
};

export type IbanSonuc = Sonuc & {
  bicimli?: string;
  ulke?: string;
  bankaKodu?: string;
  hesap?: string;
};

export function ibanDogrula(girdi: string): IbanSonuc {
  const s = girdi.replace(/[\s-]/g, "").toUpperCase();
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(s))
    return {
      gecerli: false,
      neden:
        "IBAN iki harfli ülke kodu ve iki haneli kontrol numarasıyla başlamalı (ör. TR12…).",
    };
  const bicimli = s.replace(/(.{4})/g, "$1 ").trim();
  const ulke = s.slice(0, 2);
  const u = IBAN_UZUNLUK[ulke];
  if (u && s.length !== u[0])
    return {
      gecerli: false,
      bicimli,
      ulke: u[1],
      neden: `${u[1]} IBAN'ı ${u[0]} karakter olmalı (${s.length} yazıldı).`,
    };
  if (s.length < 15 || s.length > 34)
    return { gecerli: false, bicimli, neden: "IBAN 15–34 karakter olmalı." };
  // mod 97: ilk 4 karakter sona alınır, harfler 10–35'e çevrilir
  const yeniden = s.slice(4) + s.slice(0, 4);
  let kalan = 0;
  for (const c of yeniden) {
    const v = c >= "A" ? String(c.charCodeAt(0) - 55) : c;
    for (const r of v) kalan = (kalan * 10 + Number(r)) % 97;
  }
  const ek =
    ulke === "TR" ? { bankaKodu: s.slice(4, 9), hesap: s.slice(10) } : {};
  if (kalan !== 1)
    return {
      gecerli: false,
      bicimli,
      ulke: u?.[1],
      ...ek,
      neden: "Kontrol numarası tutmuyor; bir hane yanlış yazılmış olabilir.",
    };
  if (ulke === "TR" && s[9] !== "0")
    return {
      gecerli: false,
      bicimli,
      ulke: u?.[1],
      ...ek,
      neden: "Türkiye IBAN'ında 11. karakter (rezerv alan) 0 olmalı.",
    };
  return { gecerli: true, bicimli, ulke: u?.[1], ...ek };
}
