import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import StaticPageLayout from "../components/StaticPageLayout";
import { categoryPages } from "../converter/categoryPages";
import { SITE_CONTACT_EMAIL, SITE_NAME, SITE_URL } from "../siteConfig";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "BirimCeviri.app'i kim hazırlıyor, sitede hangi araçlar var, hesaplamalar hangi kaynaklara dayanıyor ve nasıl doğrulanıyor?",
  alternates: {
    canonical: "/hakkimizda",
    languages: {
      tr: "/hakkimizda",
      en: "/en/about",
      "x-default": "/hakkimizda",
    },
  },
  openGraph: {
    title: `Hakkımızda | ${SITE_NAME}`,
    description:
      "BirimCeviri.app nedir, sitede hangi araçlar var, hesaplamalar hangi kaynaklara dayanıyor ve hatalar nasıl düzeltiliyor?",
    url: `${SITE_URL}/hakkimizda`,
    siteName: SITE_NAME,
    locale: "tr_TR",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <StaticPageLayout
      locale="tr"
      breadcrumbAriaLabel="Sayfa yolu"
      breadcrumbs={[
        { href: "/", label: "Ana Sayfa" },
        { label: "Hakkımızda" },
      ]}
      title="Hakkımızda"
      description="BirimCeviri.app; birim çevirilerini, Türkiye'ye özgü ölçüleri ve günlük hesaplama araçlarını ücretsiz, hesap açmadan ve kaynaklarıyla birlikte sunan bağımsız bir sitedir."
      sections={[
        {
          heading: "BirimCeviri.app nedir?",
          content: (
            <>
              <p>
                BirimCeviri.app, birim çevirilerini ve hesaplama araçlarını ücretsiz sunan bağımsız bir sitedir. Sitedeki
                çeviriciler, açıklamalar ve tablolar tek tek hazırlanır; her yeni araç yayımlanmadan önce hesaplamaları kaynaklarıyla
                karşılaştırılarak denenir.
              </p>
              <p>
                Sitenin çıkış noktası basit bir ihtiyaçtır: Türkçe kaynaklarda birim çevirileri dağınık, çoğu zaman eksik ya da yanlış
                yuvarlanmış durumda. Dönüm, okka, arşın, ezani saat, eski Türk lirası gibi Türkiye&apos;ye özgü ölçülerin doğru karşılığını
                bulmak ise daha da zor. BirimCeviri.app bu çevirileri tek bir yerde, açıklamaları ve hesap yöntemiyle birlikte sunmak
                için hazırlandı.
              </p>
            </>
          ),
        },
        {
          heading: "Sitede neler var?",
          content: (
            <ul>
              <li>
                <Link href="/tum-birimler">Birim çeviricileri</Link>: uzunluk, kütle, alan, hacim, sıcaklık ve basınçtan elektrik
                iletkenliğine, su sertliğine ve kumaş gramajına kadar {categoryPages.length} kategori.
              </li>
              <li>
                Türkiye&apos;ye özgü çeviriler: <Link href="/eski-para-yeni-para-cevirme">eski para - yeni para</Link>,{" "}
                <Link href="/ezani-saat-cevirme">ezani saat</Link>, <Link href="/ebced-hesabi">ebced hesabı</Link>,{" "}
                <Link href="/tarih-cevirici">hicri ve Rumi tarih</Link>, dönüm ve eski Osmanlı ölçüleri.
              </li>
              <li>
                Ölçü numaraları ve tablolar: <Link href="/kagit-boyutlari">kâğıt boyutları</Link>,{" "}
                <Link href="/bofor-cevirme">bofor</Link>, <Link href="/mesh-mikron-cevirme">elek numaraları</Link>,{" "}
                <Link href="/egim-cevirme">eğim</Link>, ayakkabı, beden ve yüzük ölçüleri.
              </li>
              <li>Günlük hesaplayıcılar: yaş, KDV, maaş, kredi, yakıt tüketimi, boya ve fayans gibi.</li>
              <li>Tarih ve zaman araçları: Türkiye takvimi, resmî tatiller, ay evreleri, gün doğumu ve batımı, geri sayım.</li>
              <li>Mühendislik araçları: elektrik, akışkanlar, malzeme ve çelik profil tabloları.</li>
            </ul>
          ),
        },
        {
          heading: "Hesaplamalar nasıl doğrulanıyor?",
          content: (
            <>
              <p>
                Birim katsayıları uluslararası tanımlardan alınır: SI Birim Sistemi (BIPM) ve ABD Ulusal Standartlar ve Teknoloji
                Enstitüsü&apos;nün NIST SP 811 yayını. Örneğin 1 inç tam olarak 2,54 cm, 1 pound tam olarak 0,45359237 kg&apos;dır. Sitedeki
                bütün katsayılar her güncellemede otomatik testlerle bu tanım değerlerine karşı yeniden kontrol edilir; bir katsayı
                yanlış girilirse site yayımlanmadan önce hata verir.
              </p>
              <p>
                Tablolar ilgili standartlardan hazırlanır: kâğıt boyutları ISO 216, elek açıklıkları ASTM E11, bofor ölçeği Dünya
                Meteoroloji Örgütü tabloları, para sadeleştirmeleri ilgili kanunlar ve merkez bankası duyurularıdır. Kaynağı
                doğrulanamayan bir değer siteye eklenmez; kesin tanımı olmayan değerler (örneğin malzeme yoğunluğu) sayfada
                &quot;yaklaşık&quot; olarak işaretlenir ve kullanılan kaynak sayfanın altında belirtilir.
              </p>
            </>
          ),
        },
        {
          heading: "Hata bildirimi ve düzeltmeler",
          content: (
            <p>
              Bir hesaplamada ya da bilgide hata görürseniz sayfa adresiyle birlikte{" "}
              <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a> adresine yazabilirsiniz (
              <Link href="/iletisim">iletişim sayfası</Link>). Bildirilen hatalar incelenir; doğrulanırsa sayfa düzeltilir ve aynı
              hatanın tekrar etmemesi için gerekirse otomatik testlere eklenir.
            </p>
          ),
        },
        {
          heading: "Reklam ve bağımsızlık",
          content: (
            <p>
              Site ücretsizdir ve hesap açmadan kullanılır; hesaplamalar tarayıcınızda yapılır, girdiğiniz değerler saklanmaz. Barındırma
              ve geliştirme giderlerini karşılamak için sayfalarda reklam gösterilebilir. Reklamlar içerikten ayrı alanlarda yer alır ve
              hesaplama sonuçlarını etkilemez. Kişisel verilerin nasıl işlendiği <Link href="/gizlilik">Gizlilik Politikası</Link>{" "}
              sayfasında, kullanım şartları <Link href="/kullanim-kosullari">Kullanım Koşulları</Link> sayfasında anlatılır.
            </p>
          ),
        },
        {
          heading: "Önemli kullanım notu",
          content: (
            <p>
              Araçlar bilgilendirme ve ön değerlendirme amacıyla sunulur. Kritik mühendislik, sağlık, hukuk veya güvenlik kararlarında
              sonuçları ilgili standart ve uzman görüşüyle ayrıca kontrol edin.
            </p>
          ),
        },
      ]}
      alternateLink={{
        href: "/en/about",
        hrefLang: "en",
        label: "English version",
      }}
    />
  );
}
