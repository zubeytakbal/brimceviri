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
];

const englishManualNotifications: SiteNotification[] = [
  {
    id: "chemistry-calculators-2026-09",
    date: "2026-09-16",
    title: "New: Chemistry Calculators",
    message: "Explore 12 tools for solution chemistry, reaction calculations, equilibrium and electrochemistry.",
    href: "/en/chemistry-calculators",
  },
  {
    id: "everyday-calculators-2026-09",
    date: "2026-09-16",
    title: "Everyday Calculators are now grouped",
    message: "Browse 19 practical tools for home projects, routines, transport and personal planning.",
    href: "/en/everyday-calculators",
  },
];

const germanManualNotifications: SiteNotification[] = [
  {
    id: "gumus-kan-vitamin-2026-09",
    date: "2026-09-18",
    title: "Neu: Silberreinheit, Blutzucker und Vitamin D",
    message:
      "Rechnen Sie jetzt auch auf Deutsch zwischen Silber-Feingehalten (999/925/900/800) sowie Blutzucker- und Vitamin-D-Einheiten um.",
    href: "/de/kategorien/silberreinheit",
  },
];



const manualNotificationsByLocale: Partial<Record<NotificationLocale, SiteNotification[]>> = {
  en: englishManualNotifications,
  de: germanManualNotifications,
};

type NotificationLocale = "tr" | "en" | "de";

const byDateDesc = (a: SiteNotification, b: SiteNotification) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0);

export async function getSiteNotifications(locale: NotificationLocale = "tr"): Promise<SiteNotification[]> {
  // Turkce duyurular ve ehliyet kaynak uyarisi yalnizca Turkce sayfa icin.
  // Kendi duyuru listesi olmayan diller bos liste alir.
  if (locale === "en") {
    // CGPA formul kaynagi degisen kurumlar: formul yeniden dogrulanana kadar.
    const { getCgpaSourceAlerts } = await import("./cgpaSourceMonitor");
    const alerts = await getCgpaSourceAlerts().catch(() => []);
    const alertNotifications: SiteNotification[] = alerts.map(({ university, changedAt }) => ({
      id: `cgpa-source-changed-${university.slug}-${changedAt.slice(0, 10)}`,
      date: changedAt.slice(0, 10),
      title: `${university.shortName}: CGPA formula being re-checked`,
      message: `The official ${university.shortName} source changed on ${changedAt.slice(0, 10)}. We are re-checking the CGPA to percentage formula.`,
      href: `/en/cgpa-to-percentage#${university.slug}`,
    }));
    return [...alertNotifications, ...englishManualNotifications].sort(byDateDesc);
  }

  if (locale !== "tr") {
    return [...(manualNotificationsByLocale[locale] ?? [])].sort(byDateDesc);
  }

  const { getSourceMonitorStatuses } = await import("./licenseSourceMonitor");
  const monitorStatuses = await getSourceMonitorStatuses().catch(() => []);

  const monitorNotifications: SiteNotification[] = monitorStatuses
    .filter((entry) => entry.status === "changed")
    .map((entry) => ({
      id: `kaynak-degisti-${entry.id}`,
      date: entry.checkedAt ? entry.checkedAt.slice(0, 10) : new Date().toISOString().slice(0, 10),
      title: "Ehliyet bilgileri güncellenmiş olabilir",
      message: `${entry.label} kaynağında değişiklik tespit edildi, içerik kontrol ediliyor.`,
      href: "/ehliyet-yenileme-suresi-hesaplama",
    }));

  return [...monitorNotifications, ...manualNotifications].sort(byDateDesc);
}
