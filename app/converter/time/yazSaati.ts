// Yaz saati (DST) geçişleri: tarihler elle yazılmaz, çalışma ortamının saat dilimi verisinden (IANA tz, Intl)
// hesaplanır; her yıl kendiliğinden güncellenir. Türkiye 2016'dan beri yıl boyu UTC+3'tür, geçişi yoktur.

export type Gecis = { an: number; once: number; sonra: number };

/** Saat diliminin o andaki UTC farkı (dakika). */
export function utcFarki(tz: string, an: number): number {
  const s = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "longOffset" }).formatToParts(an).find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  const m = s.match(/GMT([+-])(\d\d):?(\d\d)?/);
  return m ? (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3] ?? 0)) : 0;
}

/** Bir yılın içindeki saat geçişleri (dakika hassasiyetinde). */
export function yilGecisleri(tz: string, yil: number): Gecis[] {
  const out: Gecis[] = [];
  const son = Date.UTC(yil + 1, 0, 1);
  let t = Date.UTC(yil, 0, 1);
  let o = utcFarki(tz, t);
  for (; t < son; t += 3600000) {
    const o2 = utcFarki(tz, t);
    if (o2 === o) continue;
    let a = t - 3600000;
    let b = t;
    while (b - a > 60000) {
      const m = a + Math.floor((b - a) / 120000) * 60000;
      if (utcFarki(tz, m) === o) a = m;
      else b = m;
    }
    out.push({ an: b, once: o, sonra: o2 });
    o = o2;
  }
  return out;
}

/** Verilen andan sonraki geçişler (en fazla adet kadar). */
export function sonrakiGecisler(tz: string, an: number, adet: number): Gecis[] {
  const yil = new Date(an).getUTCFullYear();
  return [yil, yil + 1, yil + 2, yil + 3].flatMap((y) => yilGecisleri(tz, y)).filter((g) => g.an > an).slice(0, adet);
}

export const TR_FARK = 180;

/** Türkiye ile saat farkı tablosunda gösterilen şehirler (yaz saati uygulayan ve Türkiye'den çok aranan yerler). */
export const YAZ_SAATI_SEHIRLERI = [
  { ad: "Berlin", ulke: "Almanya", tz: "Europe/Berlin", slug: "berlin" },
  { ad: "Londra", ulke: "İngiltere", tz: "Europe/London", slug: "londra" },
  { ad: "Paris", ulke: "Fransa", tz: "Europe/Paris", slug: "paris" },
  { ad: "Amsterdam", ulke: "Hollanda", tz: "Europe/Amsterdam", slug: "amsterdam" },
  { ad: "Viyana", ulke: "Avusturya", tz: "Europe/Vienna", slug: "viyana" },
  { ad: "Atina", ulke: "Yunanistan", tz: "Europe/Athens", slug: "atina" },
  { ad: "Kiev", ulke: "Ukrayna", tz: "Europe/Kyiv", slug: "kiev" },
  { ad: "New York", ulke: "ABD", tz: "America/New_York", slug: "new-york" },
  { ad: "Los Angeles", ulke: "ABD", tz: "America/Los_Angeles", slug: "los-angeles" },
  { ad: "Toronto", ulke: "Kanada", tz: "America/Toronto", slug: "toronto" },
  { ad: "Sidney", ulke: "Avustralya", tz: "Australia/Sydney", slug: "sidney" },
] as const;

/** Bölgelerin geçiş kuralı (açıklama metni; tarihler yukarıdaki hesaptan gelir). */
export const BOLGELER = [
  { ad: "Avrupa Birliği ve İngiltere", tz: "Europe/Berlin", kural: "Mart ve ekim ayının son pazarı, UTC 01:00 (Türkiye saatiyle 04:00)" },
  { ad: "ABD ve Kanada", tz: "America/New_York", kural: "Martın ikinci pazarı ve kasımın ilk pazarı, yerel saatle 02:00" },
  { ad: "Avustralya (Sidney)", tz: "Australia/Sydney", kural: "Ekimin ilk pazarı ileri, nisanın ilk pazarı geri, yerel saatle 02:00 ve 03:00" },
] as const;

/** "2 saat", "1,5 saat" */
export function farkMetni(dk: number) {
  const s = Math.abs(dk) / 60;
  return `${s.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} saat`;
}
