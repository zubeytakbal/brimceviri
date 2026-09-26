// Doviz verisi katmani. Iki ayri, ucretsiz ve anahtar gerektirmeyen kaynak
// kullanilir ve sayfada ikisi de ayri ayri belirtilir:
//
// 1) Guncel kur + zaman damgalari: open.er-api.com (ExchangeRate-API'nin
//    acik ucu). Gunde bir kez guncellenir ve yanitta hem son guncelleme
//    ("time_last_update_unix") hem de bir sonraki planli guncelleme
//    ("time_next_update_unix") zamani bulunur. Sayfadaki "X dakika once
//    guncellendi" ve "sonraki guncellemeye kalan sure" sayaclari bu iki
//    alandan beslenir -- yani sayaclar bizim veriyi cektigimiz andan degil,
//    kaynagin kuru yayinladigi andan sayar.
//
// 2) Gecmis kurlar (grafik ve istatistikler): fawazahmed0/exchange-api
//    (jsDelivr uzerinden, tarih bazli dosyalar). Gecmis gunlerin dosyasi bir
//    daha degismedigi icin kalici olarak onbellege alinir; her gun yalnizca
//    yeni gunun dosyasi indirilir.
//
// Her iki fonksiyon da hata durumunda null / bos seri dondurur; sayfalar
// veri yoksa ilgili bolumu gizler (liveFuelPrice.ts ile ayni yaklasim).

export const FX_CACHE_TAG = "fx";

// Guncel kur verisi en fazla bu kadar saniye onbellekte tutulur. Asil
// yenileme, kaynak yeni kuru yayinladiktan sonra gunluk cron'daki
// revalidateTag(FX_CACHE_TAG) ile tetiklenir; bu sure yalnizca guvenlik agi.
// (Daha kisa bir sure sayfalari da o siklikta yeniden urettirir ve Vercel
// ISR yazma kotasini gereksiz harcar.)
const LATEST_REVALIDATE_SECONDS = 43200;

// Yayindaki bir sayfa arka planda yenilenirken kaynaga ulasilamazsa hata
// firlatilir: Next.js bu durumda yeni surumu kaydetmez ve son basarili
// (kurlu) sayfayi sunmaya devam eder. Derleme sirasinda ise hata
// firlatilmaz; sayfa "kur alinamadi" haliyle uretilir ve ilk yenilemede duzelir.
export function requireFxDataOutsideBuild(hasData: boolean): void {
  if (hasData) return;
  if (process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== "phase-production-build") {
    throw new Error("Doviz verisi alinamadi; onceki sayfa korunuyor.");
  }
}

export type FxLatest = {
  // 1 USD = rates[code] birim
  rates: Record<string, number>;
  lastUpdateUnix: number;
  nextUpdateUnix: number | null;
  providerName: string;
  providerUrl: string;
};

export type FxHistoryPoint = {
  date: string; // YYYY-MM-DD (UTC)
  // 1 USD = rates[code] birim; yalnizca istenen para birimleri
  rates: Record<string, number>;
};

export type FxHistory = {
  daily: FxHistoryPoint[]; // son ~30 gun, eskiden yeniye
  yearly: FxHistoryPoint[]; // son ~1 yil, iki haftalik ornekler, eskiden yeniye
  providerName: string;
  providerUrl: string;
};

const DAY_MS = 24 * 60 * 60 * 1000;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function isPositiveFinite(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

// open.er-api yanitini dogrular. Beklenmeyen/eksik bir yanitta null doner;
// yanlis bir kuru gostermektense hic gostermemek tercih edilir.
export function parseOpenErApiLatest(data: unknown, nowMs: number = Date.now()): FxLatest | null {
  if (!data || typeof data !== "object") return null;
  const record = data as Record<string, unknown>;

  if (record.result !== "success" || record.base_code !== "USD") return null;

  const rawRates = record.rates;
  if (!rawRates || typeof rawRates !== "object") return null;

  const rates: Record<string, number> = {};
  for (const [code, value] of Object.entries(rawRates as Record<string, unknown>)) {
    if (/^[A-Z]{3}$/.test(code) && isPositiveFinite(value)) {
      rates[code] = value;
    }
  }
  if (rates.USD !== 1 || Object.keys(rates).length < 20) return null;

  const lastUpdateUnix = record.time_last_update_unix;
  // 2020 oncesi veya gelecekteki (1 saatten fazla) bir zaman damgasi bozuk veridir.
  if (
    !isPositiveFinite(lastUpdateUnix) ||
    lastUpdateUnix < 1_577_836_800 ||
    lastUpdateUnix * 1000 > nowMs + 60 * 60 * 1000
  ) {
    return null;
  }

  const rawNext = record.time_next_update_unix;
  const nextUpdateUnix = isPositiveFinite(rawNext) && rawNext > lastUpdateUnix ? rawNext : null;

  return {
    rates,
    lastUpdateUnix,
    nextUpdateUnix,
    providerName: "ExchangeRate-API",
    providerUrl: "https://www.exchangerate-api.com",
  };
}

export async function getFxLatest(): Promise<FxLatest | null> {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: LATEST_REVALIDATE_SECONDS, tags: [FX_CACHE_TAG] },
    });
    if (!response.ok) return null;
    return parseOpenErApiLatest(await response.json());
  } catch {
    return null;
  }
}

// exchange-api tarih dosyasini dogrular: { date, usd: { try: 41.2, ... } }.
// Kodlar kaynakta kucuk harflidir; burada buyuk harfe cevrilir ve yalnizca
// istenen kodlar tutulur (sayfaya gereksiz veri tasinmasin diye).
export function parseCurrencyApiDay(data: unknown, codes: readonly string[]): FxHistoryPoint | null {
  if (!data || typeof data !== "object") return null;
  const record = data as Record<string, unknown>;
  if (typeof record.date !== "string" || !ISO_DATE.test(record.date)) return null;

  const usd = record.usd;
  if (!usd || typeof usd !== "object") return null;
  const source = usd as Record<string, unknown>;

  const rates: Record<string, number> = { USD: 1 };
  for (const code of codes) {
    if (code === "USD") continue;
    const value = source[code.toLowerCase()];
    if (!isPositiveFinite(value)) return null;
    rates[code] = value;
  }

  return { date: record.date, rates };
}

export function toIsoDate(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

function isoDateToMs(iso: string): number {
  return Date.parse(`${iso}T00:00:00Z`);
}

// Grafik icin istenecek tarihler. Yillik seri, "epoch'tan bu yana gun
// sayisi 14'e bolunebilen" sabit gunlere baglanir: boylece her gun yeni bir
// tarih seti olusmaz, gecmis dosyalar kalici onbellekten okunur ve her gun en
// fazla bir-iki yeni dosya indirilir.
export function buildHistoryDates(endIsoDate: string, dailyCount = 30, yearDays = 365, yearStepDays = 14) {
  const endMs = isoDateToMs(endIsoDate);
  const daily: string[] = [];
  for (let i = dailyCount - 1; i >= 0; i -= 1) {
    daily.push(toIsoDate(endMs - i * DAY_MS));
  }

  const endDay = Math.floor(endMs / DAY_MS);
  const startDay = endDay - yearDays;
  const firstAnchor = Math.ceil(startDay / yearStepDays) * yearStepDays;
  // Tam bir yil onceki gun de eklenir ki "1 yillik degisim" gercekten bir
  // yili kapsasin (gunde yalnizca bir yeni dosya demek).
  const yearly: string[] = firstAnchor === startDay ? [] : [toIsoDate(startDay * DAY_MS)];
  for (let day = firstAnchor; day < endDay; day += yearStepDays) {
    yearly.push(toIsoDate(day * DAY_MS));
  }
  yearly.push(endIsoDate);

  return { daily, yearly };
}

async function fetchHistoryDay(date: string, codes: readonly string[], isRecent: boolean) {
  // Son iki gunun dosyasi henuz yayinlanmamis olabilir; bunlar kalici
  // onbellege alinmaz, saatlik tekrar denenir.
  const cacheOptions: RequestInit = isRecent
    ? { next: { revalidate: LATEST_REVALIDATE_SECONDS, tags: [FX_CACHE_TAG] } }
    : { cache: "force-cache" };

  const urls = [
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/usd.min.json`,
    `https://${date}.currency-api.pages.dev/v1/currencies/usd.min.json`,
  ];

  for (const url of urls) {
    try {
      const response = await fetch(url, cacheOptions);
      if (!response.ok) continue;
      const point = parseCurrencyApiDay(await response.json(), codes);
      // Dosyanin icindeki tarih istenen tarihle ayni olmali; aksi halde
      // (ornegin bir yonlendirme sonucu) o gunu atla.
      if (point && point.date === date) return point;
    } catch {
      // bir sonraki adresi dene
    }
  }
  return null;
}

async function mapWithConcurrency<T, R>(items: T[], limit: number, worker: (item: T) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  async function run() {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await worker(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

export async function getFxHistory(codes: readonly string[], endIsoDate: string): Promise<FxHistory> {
  const { daily, yearly } = buildHistoryDates(endIsoDate);
  const uniqueDates = [...new Set([...daily, ...yearly])];
  const recentLimitMs = isoDateToMs(endIsoDate) - 2 * DAY_MS;

  const sortedCodes = [...new Set(codes)].sort();
  const points = await mapWithConcurrency(uniqueDates, 6, (date) =>
    fetchHistoryDay(date, sortedCodes, isoDateToMs(date) >= recentLimitMs)
  );

  const byDate = new Map<string, FxHistoryPoint>();
  points.forEach((point) => {
    if (point) byDate.set(point.date, point);
  });

  const pick = (dates: string[]) => dates.flatMap((date) => (byDate.has(date) ? [byDate.get(date)!] : []));

  return {
    daily: pick(daily),
    yearly: pick(yearly),
    providerName: "fawazahmed0/exchange-api",
    providerUrl: "https://github.com/fawazahmed0/exchange-api",
  };
}
