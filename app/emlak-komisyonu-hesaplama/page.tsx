import type { Metadata } from "next";
import Link from "next/link";
import RealEstateCommissionCalculator from "../components/RealEstateCommissionCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Emlak komisyonu yasal olarak en fazla ne kadar olabilir?",
    answer:
      "Taşınmaz Ticareti Hakkında Yönetmelik'e göre satış işlemlerinde alıcı ve satıcının her birinden ayrı ayrı en fazla %2 + KDV, kiralama işlemlerinde kiracı ve kiraya verenin her birinden ayrı ayrı en fazla 1 aylık kira bedeli + KDV komisyon alınabilir. Bunlar yasal tavan değerlerdir; taraflar bu tavanın altında serbestçe anlaşabilir.",
  },
  {
    question: "Bu oranlar değişebilir mi?",
    answer:
      "Evet, bu oranlar T.C. Ticaret Bakanlığı'nın yönetmeliğiyle belirlenir ve zaman içinde değişebilir. Bu araç güncel bilinen tavan oranları varsayılan olarak sunar; kesin ve güncel oran için Ticaret Bakanlığı'nın resmî duyurularını kontrol etmelisin.",
  },
  {
    question: "Komisyona KDV dahil mi?",
    answer:
      "Hayır, yasal tavan oranları (%2 satışta, 1 aylık kira kirada) KDV hariç tutarlardır; üzerine ayrıca KDV eklenir. Bu araç KDV'yi ayrı satırda gösterir.",
  },
];

export const metadata: Metadata = {
  title: "Emlak Komisyonu Hesaplama: Satış ve Kiralama",
  description:
    "Satış bedeli veya aylık kiradan, yasal tavan oranlarına (satışta %2+KDV, kirada 1 aylık kira+KDV) göre emlak komisyonunu hesapla.",
  alternates: {
    canonical: "/emlak-komisyonu-hesaplama",
  },
  openGraph: {
    title: "Emlak Komisyonu Hesaplama: Satış ve Kiralama",
    description:
      "Satış veya kiralama işleminde emlak komisyonunu yasal tavan oranlarına göre hesaplayın.",
    url: buildSiteUrl("/emlak-komisyonu-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function RealEstateCommissionPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: buildSiteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Emlak Komisyonu Hesaplama",
        item: buildSiteUrl("/emlak-komisyonu-hesaplama"),
      },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildFaqSchema(faqItems)),
        }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Emlak Komisyonu Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Emlak Komisyonu Hesaplama</h1>
          <p>
            İşlem türünü (satış veya kiralama) seç, bedeli gir: yasal
            tavan oranlarına göre KDV dahil ve KDV hariç emlak
            komisyonunu anında hesapla.
          </p>
        </header>

        <RealEstateCommissionCalculator />

        <section className="category-article-content">
          <h2>Emlak komisyonu nasıl hesaplanır?</h2>
          <p>
            <strong>Satışta:</strong> Komisyon = Satış Bedeli × Oran (%),
            üzerine KDV eklenir. Taşınmaz Ticareti Hakkında Yönetmelik&apos;e
            göre alıcı ve satıcının her birinden ayrı ayrı en fazla %2 +
            KDV alınabilir.
          </p>
          <p>
            <strong>Kiralamada:</strong> Komisyon = 1 Aylık Kira Bedeli,
            üzerine KDV eklenir. Kiracı ve kiraya verenin her birinden
            ayrı ayrı en fazla 1 aylık kira bedeli + KDV alınabilir.
          </p>
          <p>
            Bu oranlar <strong>yasal tavan (üst sınır)</strong> değerleridir
            — taraflar bu tavanın altında serbestçe anlaşabilir, daha
            düşük bir oran üzerinde uzlaşmak mümkündür.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>
              Emlak komisyonu yasal olarak en fazla ne kadar olabilir?
            </strong>
            <br />
            Taşınmaz Ticareti Hakkında Yönetmelik&apos;e göre satış
            işlemlerinde alıcı ve satıcının her birinden ayrı ayrı en
            fazla %2 + KDV, kiralama işlemlerinde kiracı ve kiraya
            verenin her birinden ayrı ayrı en fazla 1 aylık kira bedeli
            + KDV komisyon alınabilir.
          </p>
          <p>
            <strong>Bu oranlar değişebilir mi?</strong>
            <br />
            Evet, bu oranlar T.C. Ticaret Bakanlığı&apos;nın
            yönetmeliğiyle belirlenir ve zaman içinde değişebilir. Bu
            araç güncel bilinen tavan oranları varsayılan olarak sunar;
            kesin ve güncel oran için Ticaret Bakanlığı&apos;nın resmî
            duyurularını kontrol etmelisin.
          </p>
          <p>
            <strong>Komisyona KDV dahil mi?</strong>
            <br />
            Hayır, yasal tavan oranları (%2 satışta, 1 aylık kira
            kirada) KDV hariç tutarlardır; üzerine ayrıca KDV eklenir.
            Bu araç KDV&apos;yi ayrı satırda gösterir.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Diğer emlak/gayrimenkul araçları için{" "}
            <Link href="/emlakci-araclari">Emlakçı Araçları</Link>{" "}
            sayfasına, KDV oranını değiştirerek genel hesap yapmak
            için <Link href="/kdv-hesaplama">KDV Hesaplama</Link>{" "}
            aracına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Komisyon tavan oranları, T.C. Ticaret Bakanlığı&apos;nın
            Taşınmaz Ticareti Hakkında Yönetmeliği&apos;nde belirtilen
            güncel üst sınır değerlerine dayanmaktadır. Bu araç genel
            bilgilendirme amaçlıdır, hukuki/mali tavsiye yerine geçmez.
          </p>
        </section>
      </div>
    </main>
  );
}
