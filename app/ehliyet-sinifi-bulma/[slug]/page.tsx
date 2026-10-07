import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { notFound } from "next/navigation";
import TrustBar from "../../components/TrustBar";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { altSiniflar, ON_SART, SINIF_GRUPLARI, UST_SINIF } from "../../converter/licenseClassContext";
import { licenseClasses, type LicenseClassId } from "../../converter/licenseClassFinder";
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

  const pageUrl = buildSiteUrl(`/ehliyet-sinifi-bulma/${slug}`);

  const ustler = UST_SINIF[licenseClass.id];
  const alttan = altSiniflar(licenseClass.id);
  const onSart = ON_SART[licenseClass.id];
  const buYil = new Date().getUTCFullYear();
  const L = licenseClass.label;

  const faqItems: FaqItem[] = [
    {
      question: `${licenseClass.label} sınıfı ehliyet hangi araçları kullanır?`,
      answer: licenseClass.description,
    },
    {
      question: `${licenseClass.label} sınıfı ehliyet almak için asgari yaş kaç?`,
      answer: `${licenseClass.label} sınıfı sürücü belgesi için asgari yaş ${licenseClass.minAge}'dir, geçerlilik süresi ${licenseClass.validityYears} yıldır.`,
    },
    {
      question: `${L} ehliyeti kaç yılda bir yenilenir?`,
      answer: `${L} sınıfı belge ${licenseClass.validityYears} yıl geçerlidir: ${buYil} yılında alınan belge ${buYil + licenseClass.validityYears} yılında yenilenir.`,
    },
    ...ustler.map((u) => ({
      question: `${L} ehliyetle ${u.arac} kullanılır mı?`,
      answer: `Hayır. ${u.kosul} ${licenseClasses[u.sinif].label} sınıfı belge gerekir (asgari yaş ${licenseClasses[u.sinif].minAge}).`,
    })),
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

        <TrustBar
          sources={[
            {
              label: "Karayolları Trafik Yönetmeliği (mevzuat.gov.tr)",
              href: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=8182&MevzuatTur=7&MevzuatTertip=5",
            },
          ]}
          lastVerified="Eylül 2026"
        />

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

          {ustler.length > 0 && (
            <>
              <h2>{L} Ehliyeti Ne Zaman Yetmez?</h2>
              <div className="holiday-table-wrap">
                <table className="holiday-table">
                  <thead>
                    <tr>
                      <th scope="col">Durum</th>
                      <th scope="col">Gereken sınıf</th>
                      <th scope="col">Asgari yaş</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ustler.map((u) => (
                      <tr key={u.sinif + u.kosul}>
                        <th scope="row">{u.kosul}</th>
                        <td>
                          <Link href={`/ehliyet-sinifi-bulma/${u.sinif.toLowerCase()}`}>{licenseClasses[u.sinif].label}</Link>
                        </td>
                        <td>{licenseClasses[u.sinif].minAge}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {ustler.length === 0 && (
            <>
              <h2>{L} Kendi Grubunun En Üst Sınıfı</h2>
              <p>
                {L} sınıfı, kendi grubundaki en geniş belgedir; bu grupta daha büyük bir araç için ek sınıf yoktur. Başka türde bir araç (ör. otobüs ya da kamyon)
                için o grubun belgesini ayrıca almanız gerekir.
              </p>
            </>
          )}

          {(onSart || alttan.length > 0) && (
            <>
              <h2>{L} Sınıfına Nasıl Geçilir?</h2>
              <p>
                {onSart ? <>{onSart.not} </> : null}
                {alttan.length > 0 && (
                  <>
                    {L},{" "}
                    {alttan.map((a, i) => (
                      <span key={a}>
                        {i > 0 ? (i === alttan.length - 1 ? " ya da " : ", ") : ""}
                        <Link href={`/ehliyet-sinifi-bulma/${a.toLowerCase()}`}>{licenseClasses[a].label}</Link>
                      </span>
                    ))}{" "}
                    sınıfının bir üst basamağıdır: araç o sınıfın sınırını aştığında {L} gerekir.
                  </>
                )}
              </p>
            </>
          )}

          <h2>{L} Ehliyetinin Geçerlilik Süresi</h2>
          <p>
            {L} sınıfı belge <strong>{licenseClass.validityYears} yıl</strong> geçerlidir. {buYil} yılında alınan bir belgenin yenileme yılı{" "}
            <strong>{buYil + licenseClass.validityYears}</strong>, ondan sonraki {buYil + 2 * licenseClass.validityYears} olur. Kendi belgenizin tarihini{" "}
            <Link href="/ehliyet-yenileme-suresi-hesaplama">ehliyet yenileme süresi hesaplama</Link> aracıyla bulabilirsiniz.
          </p>

          <h2>Aynı Gruptaki Diğer Sınıflar</h2>
          {SINIF_GRUPLARI.filter((g) => g.siniflar.includes(licenseClass.id)).map((g) => (
            <p key={g.baslik}>
              <strong>{g.baslik}:</strong>{" "}
              {g.siniflar
                .filter((id) => id !== licenseClass.id)
                .map((id, i) => (
                  <span key={id}>
                    {i > 0 ? " · " : ""}
                    <Link href={`/ehliyet-sinifi-bulma/${id.toLowerCase()}`}>{licenseClasses[id].label}</Link>
                  </span>
                ))}
              . Tüm sınıflar ve araç tipine göre hesaplama: <Link href="/ehliyet-sinifi-bulma">Hangi Ehliyet Sınıfı Gerekli?</Link>
            </p>
          ))}
          <p>
            <small>
              Kaynak:{" "}
              <a href="https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=8182&MevzuatTur=7&MevzuatTertip=5" target="_blank" rel="noopener noreferrer nofollow">
                Karayolları Trafik Yönetmeliği
              </a>{" "}
              (son doğrulama: Eylül 2026).
            </small>
          </p>
        </section>
      </div>
    </main>
  );
}
