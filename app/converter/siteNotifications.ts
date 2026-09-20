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

const arabicManualNotifications: SiteNotification[] = [
  {
    id: "arabic-tools-hub-2026-09",
    date: "2026-09-18",
    title: "أدوات عربية متاحة الآن",
    message:
      "استعرض الحاسبات والمحولات المتاحة بالعربية بالكامل: من مقاييس المطبخ إلى مقاسات الأحذية والخواتم ووصفات الطبخ.",
    href: "/ar/other-conversions",
  },
];

const bengaliManualNotifications: SiteNotification[] = [
  {
    id: "bengali-homepage-redesign-2026-09",
    date: "2026-09-19",
    title: "নতুন হোমপেজ ডিজাইন",
    message:
      "একক রূপান্তরকারীর হোমপেজ এখন কার্ড আকারে, দ্রুত অনুসন্ধানসহ নতুন করে সাজানো হয়েছে।",
    href: "/bn/categories",
  },
];

export async function getSiteNotifications(locale: "tr" | "en" | "de" | "ar" | "bn" | "fr" | "es" | "es-419" = "tr"): Promise<SiteNotification[]> {
  if (locale === "fr" || locale === "es" || locale === "es-419") {
    return [];
  }

  if (locale === "en") {
    return [...englishManualNotifications].sort((a, b) =>
      a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
    );
  }

  if (locale === "de") {
    return [...germanManualNotifications].sort((a, b) =>
      a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
    );
  }

  if (locale === "ar") {
    return [...arabicManualNotifications].sort((a, b) =>
      a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
    );
  }

  if (locale === "bn") {
    return [...bengaliManualNotifications].sort((a, b) =>
      a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
    );
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
      href: "/ehliyet-sinifi-bulma",
    }));

  return [...monitorNotifications, ...manualNotifications].sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
  );
}
