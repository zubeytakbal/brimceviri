import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SourceMonitorStatusList from "../../components/SourceMonitorStatusList";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { licenseClasses, type LicenseClassId } from "../../converter/licenseClassFinder";
import { getSourceMonitorStatuses } from "../../converter/licenseSourceMonitor";
import { buildSiteUrl } from "../../siteConfig";

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ slug: string }>;
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function findClassBySlug(slug: string) {
  const id = slug.toUpperCase() as LicenseClassId;
  return licenseClasses[id];
}

export function generateStaticParams() {
  return Object.keys(licenseClasses).map((id) => ({ slug: id.toLowerCase() }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const licenseClass = findClassBySlug(slug);

  if (!licenseClass) {
    return { title: "Ehliyet sınıfı bulunamadı", robots: { index: false, follow: false } };
  }

  const title = `${licenseClass.label} Sınıfı Ehliyet Hangi Araçları Kullanır?`;
  const description = `${licenseClass.label} sınıfı ehliyet: ${licenseClass.description} Asgari yaş ${licenseClass.minAge}, geçerlilik süresi ${licenseClass.validityYears} yıl.`;

  return {
    title,
    description,
    alternates: { canonical: `/ehliyet-sinifi-bulma/${slug}` },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/ehliyet-sinifi-bulma/${slug}`),
      siteName: "BirimCeviri.app",
      locale: "tr_TR",
      type: "article",
    },
  };
}

export default async function LicenseClassDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const licenseClass = findClassBySlug(slug);

  if (!licenseClass) {
    notFound();
  }

  const monitorStatuses = await getSourceMonitorStatuses();

  const pageUrl = buildSiteUrl(`/ehliyet-sinifi-bulma/${slug}`);

  const faqItems: FaqItem[] = [
    {
      question: `${licenseClass.label} sınıfı ehliyet hangi araçları kullanır?`,
      answer: licenseClass.description,
    },
    {
      question: `${licenseClass.label} sınıfı ehliyet almak için asgari yaş kaç?`,
      answer: `${licenseClass.label} sınıfı sürücü belgesi için asgari yaş ${licenseClass.minAge}'dir, geçerlilik süresi ${licenseClass.validityYears} yıldır.`,
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Hangi Ehliyet Sınıfı Gerekli?", item: buildSiteUrl("/ehliyet-sinifi-bulma") },
      { "@type": "ListItem", position: 3, name: `${licenseClass.label} Sınıfı`, item: pageUrl },
    ],
  };

  const otherClasses = Object.values(licenseClasses).filter(
    (item) => item.id !== licenseClass.id,
  );

  return (
    <main className="all-conversions-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/ehliyet-sinifi-bulma">Hangi Ehliyet Sınıfı Gerekli?</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{licenseClass.label} Sınıfı</span>
        </nav>

        <header className="all-conversions-header">
          <p className="unit-symbol">{licenseClass.label}</p>
          <h1>{licenseClass.label} Sınıfı Ehliyet Hangi Araçları Kullanır?</h1>
          <p>{licenseClass.description}</p>
        </header>

        <section className="category-article-content">
          <h2>{licenseClass.label} Sınıfı Temel Bilgileri</h2>
          <dl className="unit-facts">
            <div>
              <dt>Kapsam</dt>
              <dd>{licenseClass.description}</dd>
            </div>
            <div>
              <dt>Örnek Araçlar</dt>
              <dd>{licenseClass.exampleVehicles}</dd>
            </div>
            <div>
              <dt>Asgari Yaş</dt>
              <dd>{licenseClass.minAge}</dd>
            </div>
            <div>
              <dt>Geçerlilik Süresi</dt>
              <dd>{licenseClass.validityYears} yıl</dd>
            </div>
          </dl>

          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Diğer Ehliyet Sınıfları</h2>
          <ul className="related-conversion-list">
            {otherClasses.map((item) => (
              <li key={item.id}>
                <Link href={`/ehliyet-sinifi-bulma/${item.id.toLowerCase()}`}>
                  {item.label} Sınıfı
                </Link>{" "}
                — {item.description}
              </li>
            ))}
          </ul>

          <h2>İlgili araçlar</h2>
          <p>
            Kendi aracının hangi sınıfa ihtiyaç duyduğunu hesaplamak
            için{" "}
            <Link href="/ehliyet-sinifi-bulma">Hangi Ehliyet Sınıfı Gerekli?</Link>
            {" "}hesaplayıcısına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Bu bilgiler, 2918 sayılı Karayolları Trafik Kanunu&apos;na
            dayanan Karayolları Trafik Yönetmeliği ile birden fazla
            bağımsız kaynaktan çapraz doğrulanmıştır.{" "}
            <a
              href="https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=8182&MevzuatTur=7&MevzuatTertip=5"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Resmi yönetmeliği görüntüle →
            </a>
            {" "}<em>(Son doğrulama: Eylül 2026)</em>
          </p>

          <SourceMonitorStatusList statuses={monitorStatuses} />
        </section>
      </div>
    </main>
  );
}
