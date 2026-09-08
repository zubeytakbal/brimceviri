// Ehliyet siniflari gibi mevzuata dayanan araclar icin izlenen resmi
// kaynak listesi. Yeni bir mevzuat-tabanli arac eklendiginde buraya
// yeni bir hedef eklemek yeterli -- tek bir cron job bu listenin
// tamamini tarar, her kaynak icin ayri bir job gerekmez.

export type SourceMonitorTarget = {
  id: string;
  label: string;
  url: string;
};

export const licenseSourceMonitorTargets: SourceMonitorTarget[] = [
  {
    id: "karayollari-trafik-yonetmeligi",
    label: "Karayolları Trafik Yönetmeliği (mevzuat.gov.tr)",
    url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=8182&MevzuatTur=7&MevzuatTertip=5",
  },
  // GECICI TANI HEDEFI: mevzuat.gov.tr Vercel'den asili kaliyor mu yoksa
  // ayni paylasilan tccb.gov.tr altyapisindaki TUM siteler mi bloklu,
  // bunu ayirt etmek icin eklendi. Sonuc alinca kaldirilacak.
  {
    id: "TEST-resmigazete",
    label: "[TEST] Resmi Gazete (resmigazete.gov.tr)",
    url: "https://www.resmigazete.gov.tr/",
  },
  // Ikinci tani hedefi: tccb.gov.tr paylasimli kumesinden tamamen farkli,
  // ayri barindirilan bir .gov.tr sitesi -- eger bu da tikanirsa sorun tum
  // gov.tr'ye yonelik genel bir bulut-IP engeli demektir, tikanmazsa sorun
  // sadece o paylasimli kumeye ozeldir.
  {
    id: "TEST-tbmm",
    label: "[TEST] TBMM (tbmm.gov.tr)",
    url: "https://www.tbmm.gov.tr/",
  },
];

export type SourceMonitorStatus =
  | "baseline_established"
  | "unchanged"
  | "changed"
  | "fetch_error";

export type SourceMonitorDisplayEntry = {
  id: string;
  label: string;
  url: string;
  status: SourceMonitorStatus | "not_configured";
  checkedAt: string | null;
};

// Vercel'in Upstash Marketplace entegrasyonu kimlik bilgilerini
// KV_REST_API_URL/KV_REST_API_TOKEN adiyla enjekte ediyor (eski "Vercel
// KV" isimlendirmesinden kalma); bazi kurulumlarda UPSTASH_REDIS_REST_*
// adiyla da gelebiliyor, o yuzden ikisi de kontrol edilir.
export function getRedisCredentials(): { url: string; token: string } | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

// Sayfada gosterilecek son durumu Redis'ten okur. Cron endpoint'i her
// gun bu degerleri yazar; Redis henuz kurulmadiysa (Upstash entegrasyonu
// eklenmediyse) veya hic calismadiysa "not_configured" doner -- sayfa
// bu durumda kirmizi/yesil isik yerine notr bir "henuz kurulmadi" notu
// gosterir, hicbir zaman yanlis bir "OK" iddia etmez.
export async function getSourceMonitorStatuses(): Promise<SourceMonitorDisplayEntry[]> {
  const credentials = getRedisCredentials();

  if (!credentials) {
    return licenseSourceMonitorTargets.map((target) => ({
      id: target.id,
      label: target.label,
      url: target.url,
      status: "not_configured",
      checkedAt: null,
    }));
  }

  const { Redis } = await import("@upstash/redis");
  const redis = new Redis(credentials);

  const entries = await Promise.all(
    licenseSourceMonitorTargets.map(async (target) => {
      const storageKey = `kaynak-kontrol:${target.id}`;
      const [status, checkedAt] = await Promise.all([
        redis.get<SourceMonitorStatus>(`${storageKey}:status`),
        redis.get<string>(`${storageKey}:checkedAt`),
      ]);
      const entry: SourceMonitorDisplayEntry = {
        id: target.id,
        label: target.label,
        url: target.url,
        status: status ?? "not_configured",
        checkedAt: checkedAt ?? null,
      };
      return entry;
    }),
  );

  return entries;
}
