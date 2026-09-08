import type { Metadata } from "next";
import Link from "next/link";
import LicenseClassFinderCalculator from "../components/LicenseClassFinderCalculator";
import LicenseCostCalculator from "../components/LicenseCostCalculator";
import SourceMonitorStatusList from "../components/SourceMonitorStatusList";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { getSourceMonitorStatuses } from "../converter/licenseSourceMonitor";
import { buildSiteUrl } from "../siteConfig";

export const revalidate = 3600;

const faqItems: FaqItem[] = [
  {
    question: "B sınıfı ehliyetle hangi araçlar kullanılabilir?",
    answer:
      "B sınıfı ehliyet, azami yüklü ağırlığı 3.500 kg'ı ve sürücü dahil koltuk sayısı 9'u (8 yolcu) geçmeyen otomobil, kamyonet ve karavan tipi araçları kapsar.",
  },
  {
    question: "Minibüs kullanmak için hangi ehliyet gerekir?",
    answer:
      "Sürücü dahil koltuk sayısı 10-17 arasında olan minibüsler için D1 sınıfı sürücü belgesi gereklidir. 2016 sonrası alınan B sınıfı ehliyetler minibüs kullanımı için yeterli değildir.",
  },
  {
    question: "Römork çektiğimde ehliyet sınıfım değişir mi?",
    answer:
      "Römorkun azami yüklü ağırlığı 750 kg'ı geçiyorsa, mevcut sınıfının 'E' (römorklu) versiyonuna ihtiyacın olur — örneğin B sınıfı yerine BE, C1 yerine C1E gibi. 750 kg altındaki römorklar için ek bir sınıf gerekmez.",
  },
  {
    question: "125cc motosiklet için hangi ehliyet gerekir?",
    answer:
      "Motor hacmi 125 cm³'ü, gücü 11 kW'ı geçmeyen motosikletler için A1 sınıfı sürücü belgesi yeterlidir; asgari yaş 16'dır.",
  },
  {
    question: "A2 ehliyetle her motosiklet kullanılabilir mi?",
    answer:
      "Hayır. A2 sınıfı, motor gücü 35 kW'ı ve güç/ağırlık oranı 0,2 kW/kg'ı geçmeyen motosikletlerle sınırlıdır. Daha güçlü motosikletler için A sınıfı gerekir.",
  },
];

export const metadata: Metadata = {
  title: "Hangi Ehliyet Sınıfı Gerekli? Araç Bilgine Göre Hesapla",
  description:
    "Aracının koltuk sayısı/ağırlığı ya da motosikletinin motor hacmi/gücüyle, Türkiye'de hangi ehliyet sınıfına (B, C, D, A1, A2, A ve diğer alt sınıflar) ihtiyacın olduğunu hesapla.",
  alternates: {
    canonical: "/ehliyet-sinifi-bulma",
  },
  openGraph: {
    title: "Hangi Ehliyet Sınıfı Gerekli? Araç Bilgine Göre Hesapla",
    description: "Kendi araç bilgilerinle gereken ehliyet sınıfını hesapla.",
    url: buildSiteUrl("/ehliyet-sinifi-bulma"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function LicenseClassFinderPage() {
  const monitorStatuses = await getSourceMonitorStatuses();
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Hangi Ehliyet Sınıfı Gerekli?", item: buildSiteUrl("/ehliyet-sinifi-bulma") },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Hangi Ehliyet Sınıfı Gerekli?</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Hangi Ehliyet Sınıfı Gerekli?</h1>
          <p>
            Otomobil/kamyon/otobüs için koltuk sayısı, azami yüklü
            ağırlık ve römork bilgisini; motosiklet/moped için motor
            hacmi ve gücünü gir — Türkiye&apos;de hangi ehliyet
            sınıfına ihtiyacın olduğunu hesapla.
          </p>
        </header>

        <LicenseClassFinderCalculator />

        <section className="category-article-content">
          <h2>Ehliyet Maliyeti Hesaplama</h2>
          <p>
            Kendi aldığın sürücü kursu teklifi ve sınav harcıyla
            toplam ehliyet maliyetini hesapla.
          </p>
        </section>

        <LicenseCostCalculator />

        <section className="category-article-content">
          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>İlgili araçlar</h2>
          <p>
            Ehliyetinin ne zaman yenilenmesi gerektiğini hesaplamak
            için{" "}
            <Link href="/ehliyet-yenileme-suresi-hesaplama">Ehliyet Yenileme Süresi Hesaplama</Link>
            {" "}aracına, diğer otomotiv araçları için{" "}
            <Link href="/otomotiv-araclari">Otomotiv Araçları</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Bu sayfadaki bilgiler, 2918 sayılı Karayolları Trafik
            Kanunu&apos;na dayanan Karayolları Trafik Yönetmeliği ile
            birden fazla bağımsız kaynaktan (sürücü kursları, sigorta
            şirketleri) çapraz doğrulanan yaş/ağırlık/koltuk
            değerlerine dayanmaktadır. Bu düzenleme sık değişmez
            (son büyük değişiklik 2016&apos;dadır), ancak kesin ve en
            güncel bilgi için resmi kaynağı kontrol etmen önerilir:
          </p>
          <p>
            <a
              href="https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=8182&MevzuatTur=7&MevzuatTertip=5"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              → Resmi Karayolları Trafik Yönetmeliği&apos;ni Görüntüle (mevzuat.gov.tr)
            </a>
          </p>
          <p>
            <em>Son doğrulama: Eylül 2026.</em> Bu araç
            otomobil/kamyon/otobüs ve motosiklet/moped sınıflarını
            kapsar; iş makinesi/traktör sınıfları şu an dahil
            değildir.
          </p>

          <SourceMonitorStatusList statuses={monitorStatuses} />
        </section>
      </div>
    </main>
  );
}
