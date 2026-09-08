// Ana sayfada gosterilen bildirim kutusu icin veri kaynagi. Iki kaynak
// birlestirilir:
// 1) elle eklenen genel duyurular (asagidaki dizi) -- yeni bir duyuru
//    eklemek icin buraya bir obje eklemek yeterli, id benzersiz olmali
//    (ziyaretcinin "gordum" durumu bu id'ye gore takip edilir).
// 2) ehliyet kaynak izlemesinden (licenseSourceMonitor) otomatik uretilen
//    bildirim -- izlenen resmi kaynak degistiginde tek seferlik bir uyari
//    olusturur, kaynak tekrar "unchanged" olunca kendiliginden kaybolur.

export type SiteNotification = {
  id: string;
  date: string;
  title: string;
  message: string;
  href?: string;
};

const manualNotifications: SiteNotification[] = [
  {
    id: "ehliyet-yenileme-suresi-2026-09",
    date: "2026-09-08",
    title: "Yeni araç: Ehliyet Yenileme Süresi Hesaplama",
    message:
      "Ehliyet sınıfına ve veriliş tarihine göre sürücü belgenin ne zaman yenilenmesi gerektiğini hesapla.",
    href: "/ehliyet-yenileme-suresi-hesaplama",
  },
  {
    id: "ehliyet-sinifi-bulma-2026-09",
    date: "2026-09-08",
    title: "Yeni araç: Hangi Ehliyet Sınıfı Gerekli?",
    message:
      "Aracının koltuk sayısı/ağırlığı ya da motosikletinin motor hacmi/gücüyle hangi ehliyet sınıfına ihtiyacın olduğunu hesapla.",
    href: "/ehliyet-sinifi-bulma",
  },
];

export async function getSiteNotifications(): Promise<SiteNotification[]> {
  const { getSourceMonitorStatuses } = await import("./licenseSourceMonitor");
  const monitorStatuses = await getSourceMonitorStatuses().catch(() => []);

  const monitorNotifications: SiteNotification[] = monitorStatuses
    .filter((entry) => entry.status === "changed")
    .map((entry) => ({
      id: `kaynak-degisti-${entry.id}`,
      date: entry.checkedAt ? entry.checkedAt.slice(0, 10) : new Date().toISOString().slice(0, 10),
      title: "Ehliyet bilgileri güncellenmiş olabilir",
      message: `${entry.label} kaynağında değişiklik tespit edildi, içerik kontrol ediliyor.`,
      href: "/ehliyet-sinifi-bulma",
    }));

  return [...monitorNotifications, ...manualNotifications].sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
  );
}
