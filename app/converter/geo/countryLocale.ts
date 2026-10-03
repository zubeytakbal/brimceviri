// Ülkeye özel günlük bilgiler: trafik yönü, ölçü sistemi, resmî diller ve tarih/saat/sayı yazımı.
// Biçimler CLDR'den (Intl) üretilir: ülkenin en yaygın dili + bölgesi (und-XX → maximize).
import { COUNTRY_EXTRAS } from "./worldCountryExtras";
import type { WorldCountry } from "./worldCountries";

/** Soldan akan trafik (BM üyeleri ve KKTC). */
const SOLDAN = new Set(
  "AG AU BS BD BB BT BW BN CY DM FJ GD GY IN ID IE JM JP KE KI LS MW MY MV MT MU MZ NA NR NP NZ PK PG WS SC SG SB ZA LK KN LC VC SR SZ TZ TH TL TO TT TV UG GB ZM ZW CT".split(" ")
);
/** Günlük hayatta ABD ölçüleri (mil, pound, galon) kullanılan ülkeler. */
const ABD_OLCU = new Set(["US", "LR", "MM"]);
/** Hava sıcaklığında Fahrenheit kullanılan ülkeler. */
const FAHRENHEIT = new Set(["US", "BS", "BZ", "LR", "PW", "FM", "MH"]);

export function trafikYonu(c: WorldCountry): "sol" | "sag" {
  return SOLDAN.has(c.iso2) ? "sol" : "sag";
}

export function olcuSistemi(c: WorldCountry): { tur: "metrik" | "abd" | "karma"; fahrenheit: boolean } {
  const tur = ABD_OLCU.has(c.iso2) ? "abd" : c.iso2 === "GB" ? "karma" : "metrik";
  return { tur, fahrenheit: FAHRENHEIT.has(c.iso2) };
}

const dilAdi = new Intl.DisplayNames("tr", { type: "language" });

export function resmiDiller(c: WorldCountry): string[] {
  return (COUNTRY_EXTRAS[c.iso3]?.langs ?? []).map((code) => {
    try {
      return dilAdi.of(code) ?? code;
    } catch {
      return code;
    }
  });
}

/** Ülkedeki farklı standart saat farkları (UTC'ye göre dakika). */
export function saatDilimleri(c: WorldCountry): number[] {
  // Çin resmî olarak tek saat (UTC+8) kullanır; Urumçi saati gayriresmîdir.
  if (c.iso2 === "CN") return [480];
  return COUNTRY_EXTRAS[c.iso3]?.offsets ?? [];
}

export function utcMetni(dk: number) {
  const s = dk < 0 ? "−" : "+";
  const a = Math.abs(dk);
  return `UTC${s}${Math.floor(a / 60)}${a % 60 ? `:${String(a % 60).padStart(2, "0")}` : ""}`;
}

export function ulkeYerel(c: WorldCountry): string {
  // KKTC'de Türkiye'deki yazım kullanılır.
  if (c.iso2 === "CT") return "tr-TR";
  const bolge = c.iso2;
  try {
    const m = new Intl.Locale(`und-${bolge}`).maximize();
    return `${m.language}-${bolge}`;
  } catch {
    return `en-${bolge}`;
  }
}

const GUNLER = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

type WeekInfo = { firstDay: number; weekend: number[] };

function haftaBilgisi(loc: string): WeekInfo | null {
  const l = new Intl.Locale(loc) as Intl.Locale & { getWeekInfo?: () => WeekInfo; weekInfo?: WeekInfo };
  try {
    return l.getWeekInfo?.() ?? l.weekInfo ?? null;
  } catch {
    return null;
  }
}

export type YazimBilgisi = {
  yerel: string;
  tarih: string;
  tarihYerelRakam: string | null;
  /** Ülkenin resmî takvimi Miladi değilse aynı günün o takvimdeki yazımı. */
  tarihYerelTakvim: string | null;
  saat: string;
  saat12: boolean;
  sayi: string;
  ondalik: string;
  binlik: string;
  ilkGun: string | null;
  haftaSonu: string[] | null;
  takvim: string;
  sira: "gun-ay" | "ay-gun" | "yil-ay-gun";
};

/** Örnek tarih (ör. 3 Ekim) o ülkenin yaygın biçiminde nasıl yazılır, sayı ve saat nasıl gösterilir. */
export function yazimBilgisi(c: WorldCountry, ornek: Date): YazimBilgisi {
  const yerel = ulkeYerel(c);
  const latn = `${yerel}-u-nu-latn`;
  const tf = new Intl.DateTimeFormat(latn, { timeZone: "UTC" });
  const takvim = tf.resolvedOptions().calendar;
  const gregTf = new Intl.DateTimeFormat(`${yerel}-u-nu-latn-ca-gregory`, { timeZone: "UTC" });
  const temiz = (x: string) => x.replace(/[\u200e\u200f\u061c]/g, "");
  const tarih = temiz(gregTf.format(ornek));
  const yerelTarih = temiz(new Intl.DateTimeFormat(`${yerel}-u-ca-gregory`, { timeZone: "UTC" }).format(ornek));
  const parcalar = gregTf.formatToParts(ornek).filter((p) => p.type === "day" || p.type === "month" || p.type === "year").map((p) => p.type);
  const sira = parcalar[0] === "year" ? "yil-ay-gun" : parcalar[0] === "month" ? "ay-gun" : "gun-ay";
  const saatParcalari = new Intl.DateTimeFormat(latn, { hour: "numeric", minute: "2-digit", timeZone: "UTC" });
  const saatOrnek = new Date(Date.UTC(2026, 0, 1, 15, 30));
  const nf = new Intl.NumberFormat(latn);
  const np = nf.formatToParts(1234567.89);
  const hb = haftaBilgisi(yerel);
  const gunAdi = (n: number) => GUNLER[(n - 1 + 7) % 7];
  return {
    yerel,
    tarih,
    tarihYerelRakam: yerelTarih !== tarih ? yerelTarih : null,
    tarihYerelTakvim: takvim !== "gregory" ? temiz(tf.format(ornek)) : null,
    saat: temiz(saatParcalari.format(saatOrnek)),
    saat12: saatParcalari.resolvedOptions().hour12 === true,
    sayi: temiz(nf.format(1234567.89)),
    ondalik: np.find((p) => p.type === "decimal")?.value ?? ".",
    binlik: np.find((p) => p.type === "group")?.value ?? "",
    ilkGun: hb ? gunAdi(hb.firstDay) : null,
    haftaSonu: hb ? hb.weekend.map(gunAdi) : null,
    takvim,
    sira,
  };
}

export const TAKVIM_ADI: Record<string, string> = {
  gregory: "Miladi (Gregoryen) takvim",
  persian: "İran takvimi (Hicri-Şemsi)",
  "islamic-umalqura": "Hicri takvim (Ümmü'l-Kurâ)",
  islamic: "Hicri takvim",
  buddhist: "Budist takvimi",
  japanese: "Japon imparatorluk takvimi",
  ethiopic: "Etiyopya takvimi",
  hebrew: "İbrani takvimi",
  indian: "Hindistan ulusal takvimi",
  dangi: "Kore takvimi",
  chinese: "Çin takvimi",
  coptic: "Kıpti takvimi",
};

/** Ayırıcı karakterin okunur adı. */
export function ayiriciAdi(ch: string) {
  if (ch === ".") return "nokta";
  if (ch === ",") return "virgül";
  if (ch === "'" || ch === "’") return "kesme işareti";
  if (/\s/.test(ch) || ch === " " || ch === " ") return "boşluk";
  if (ch === "٫" || ch === "٬") return "Arap ayırıcısı";
  if (ch === "") return "yok";
  return `"${ch}"`;
}
