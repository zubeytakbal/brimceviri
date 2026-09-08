import type { Metadata } from "next";
import Link from "next/link";
import LicenseRenewalCalculator from "../components/LicenseRenewalCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Ehliyet kaç yılda bir yenilenir?",
    answer:
      "B, B1, BE, M, A1, A2, A sınıfı sürücü belgeleri 10 yılda bir; C, C1, C1E, CE, D1, D1E, D, DE gibi ticari/ağır vasıta sınıfları 5 yılda bir yenilenir.",
  },
  {
    question: "Süresi dolan ehliyetle araç kullanılabilir mi?",
    answer:
      "Hayır. Süresi dolan sürücü belgesiyle trafiğe çıkmak yasal değildir; belge geçersiz sayılır ve fiziki olarak geri alınabilir. Yeni belge çıkana kadar araç kullanılmamalıdır.",
  },
  {
    question: "65 yaş üstü sürücüler için yenileme süresi değişir mi?",
    answer:
      "65 yaş ve üzeri sürücülerde yenileme süresi, doktorun düzenlediği sağlık raporunun geçerlilik süresine bağlı olarak daha kısa olabilir (genellikle 65+ için 3 yıl, 80+ için 2 yıl civarında) — bu, kişinin sağlık durumuna göre değişen bir değer olup sabit bir yasa maddesi değildir.",
  },
  {
    question: "Ehliyet yenilemek için hangi belgeler gerekir?",
    answer:
      "Güncel bir sağlık raporu ve harç/değerli kağıt ücretinin ödenmesi gerekir. Kesin belge listesi için nüfus müdürlüğü veya resmi kaynak kontrol edilmelidir.",
  },
];

export const metadata: Metadata = {
  title: "Ehliyet Yenileme Süresi Hesaplama",
  description:
    "Ehliyet sınıfın ve veriliş tarihine göre sürücü belgenin ne zaman yenilenmesi gerektiğini hesapla; yenileme süreci ve gerekli belgeler hakkında bilgi al.",
  alternates: {
    canonical: "/ehliyet-yenileme-suresi-hesaplama",
  },
  openGraph: {
    title: "Ehliyet Yenileme Süresi Hesaplama",
    description: "Sürücü belgenin ne zaman yenilenmesi gerektiğini hesapla.",
    url: buildSiteUrl("/ehliyet-yenileme-suresi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function LicenseRenewalPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Ehliyet Yenileme Süresi Hesaplama",
        item: buildSiteUrl("/ehliyet-yenileme-suresi-hesaplama"),
      },
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
          <span>Ehliyet Yenileme Süresi Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Ehliyet Yenileme Süresi Hesaplama</h1>
          <p>
            Ehliyet sınıfını, veriliş/son yenileme tarihini ve doğum
            tarihini gir; sürücü belgenin ne zaman yenilenmesi
            gerektiğini hesapla.
          </p>
        </header>

        <LicenseRenewalCalculator />

        <section className="category-article-content">
          <h2>Ehliyet Yenileme Süresi Nasıl Belirlenir?</h2>
          <p>
            Türkiye&apos;de sürücü belgeleri sınıfına göre belirli
            aralıklarla yenilenir:
          </p>
          <ul>
            <li>
              <strong>B, B1, BE, M, A1, A2, A</strong> (otomobil,
              hafif dört tekerlekli araç, motosiklet/moped): 10
              yılda bir.
            </li>
            <li>
              <strong>C, C1, C1E, CE, D1, D1E, D, DE</strong> (kamyon,
              otobüs, ticari/ağır vasıta): 5 yılda bir.
            </li>
            <li>
              <strong>65 yaş ve üzeri</strong> sürücülerde yenileme
              süresi, doktorun düzenlediği sağlık raporunun
              geçerlilik süresine bağlı olarak daha kısa olabilir.
            </li>
          </ul>

          <h2>Yenileme İçin Ne Gerekir?</h2>
          <p>
            Yenileme sırasında güncel bir sağlık raporu alınması ve
            harç/değerli kağıt ücretinin ödenmesi gerekir. Süreç ve
            gerekli belgeler zamanla değişebileceği için, kesin ve
            güncel bilgi için resmi kaynağı veya nüfus müdürlüğünü
            kontrol etmen önerilir.
          </p>

          <h2>Süresi Dolarsa Ne Olur?</h2>
          <p>
            Süresi dolan bir sürücü belgesiyle trafiğe çıkmak yasal
            değildir — sürücü araç kullanmaktan men edilir ve belge
            geçersiz sayılabilir. Yeni belge çıkana kadar araç
            kullanılmamalıdır.
          </p>

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
            Aracına göre hangi ehliyet sınıfına ihtiyacın olduğunu
            görmek için{" "}
            <Link href="/ehliyet-sinifi-bulma">Hangi Ehliyet Sınıfı Gerekli?</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Bu sayfadaki sürelere ilişkin bilgiler, Karayolları Trafik
            Yönetmeliği ile birden fazla bağımsız kaynaktan çapraz
            doğrulanmıştır. 65/80 yaş eşiklerine ilişkin bilgi,
            kaynaklarda sabit bir yasa maddesi olarak değil, sağlık
            raporuna bağlı değişken bir uygulama olarak belirtildiği
            için genel bir yönlendirme niteliğindedir.
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
            <em>Son doğrulama: Eylül 2026.</em>
          </p>
        </section>
      </div>
    </main>
  );
}
