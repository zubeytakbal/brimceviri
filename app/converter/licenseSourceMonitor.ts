// Ehliyet siniflari gibi mevzuata dayanan araclar icin izlenen resmi
// kaynak listesi. Yeni bir mevzuat-tabanli arac eklendiginde buraya
// yeni bir hedef eklemek yeterli -- tek bir cron job bu listenin
// tamamini tarar, her kaynak icin ayri bir job gerekmez.

export type SourceMonitorTarget = {
  id: string;
  label: string;
  url: string;
};

// mevzuat.gov.tr (asil metnin bulundugu, sayfada link verilen otorite
// kaynak) Vercel'den paylasimli tccb.gov.tr altyapisi engeli yuzunden
// erisilemiyor (resmigazete.gov.tr de ayni kumede, o da engelli); ayni
// engel tbmm.gov.tr'de yok, yani sorun tum gov.tr'ye degil sadece o
// kumeye ozel. Bu yuzden otomatik izleme, ayri barindirilan ve
// erisilebilir oldugu dogrulanan EGM Trafik Baskanligi'nin canli
// mevzuat sayfasina yonlendirildi -- sayfadaki tiklanabilir kaynak
// linki hala mevzuat.gov.tr'ye gidiyor, sadece arka plandaki
// degisiklik-tespit hedefi farkli.
export const licenseSourceMonitorTargets: SourceMonitorTarget[] = [
  {
    id: "trafik-mevzuat-egm",
    label: "EGM Trafik Mevzuatı (trafik.gov.tr)",
    url: "https://www.trafik.gov.tr/trafik-mevzuat",
  },
];

export type SourceMonitorStatus =
  | "baseline_established"
  | "unchanged"
  | "changed"
  | "fetch_error";

export const sourceMonitorStatusLabels: Record<
  SourceMonitorStatus | "not_configured",
  { icon: string; text: string }
> = {
  baseline_established: { icon: "🟢", text: "İzleniyor (ilk kontrol yapıldı)" },
  unchanged: { icon: "🟢", text: "İzleniyor, değişiklik yok" },
  changed: { icon: "🔴", text: "İçerik değişmiş olabilir — manuel kontrol gerekli" },
  fetch_error: { icon: "🟡", text: "Kaynağa şu an erişilemedi" },
  not_configured: { icon: "⚪", text: "Otomatik izleme henüz kurulmadı" },
};

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
