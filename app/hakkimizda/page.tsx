import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import StaticPageLayout from "../components/StaticPageLayout";
import { SITE_NAME, SITE_URL } from "../siteConfig";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "BirimCeviri.app nedir, sitede hangi araçlar var, hesaplamalar hangi kaynaklara dayanıyor ve hatalar nasıl düzeltiliyor?",
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
      description="BirimCeviri.app; birim çevirme, günlük hesaplama ve teknik hesaplama araçlarını ücretsiz ve hesap açmadan kullanılabilir şekilde bir araya getiren bir sitedir."
      sections={[
        {
          heading: "BirimCeviri.app nedir?",
          content: (
            <>
              <p>
                BirimCeviri.app; birim çevirme, günlük hesaplama ve teknik hesaplama araçlarını
                bir arada sunan ücretsiz bir sitedir. Araçları kullanmak için hesap açmanız
                gerekmez; hesaplamalar doğrudan tarayıcınızda yapılır.
              </p>
              <p>
                Amaç, günlük kullanım ile teknik ihtiyaçlar arasında köprü kuran hızlı ve
                anlaşılır araçlar sunmak; sonucun yanında birimin nerede kullanıldığını ve sık
                yapılan hataları da anlatmaktır.
              </p>
            </>
          ),
        },
        {
          heading: "Sitede neler var?",
          content: (
            <ul>
              <li>Birim çeviricileri: uzunluk, kütle, sıcaklık, hacim, alan, basınç, enerji, güç, veri, hız ve tarihî ölçüler.</li>
              <li>Günlük hesaplayıcılar: yaş, kredi, KDV, maaş, vücut kitle indeksi, uyku, yakıt tüketimi, boya ve fayans gibi.</li>
              <li>Tarih ve zaman araçları: Türkiye takvimi, resmî tatiller, özel günler, geri sayım, dünya saatleri ve zamanlayıcılar.</li>
              <li>Mühendislik ve bilim: elektrik, akışkanlar, malzeme özellikleri, kimya, matematik, fizik ve biyoloji hesapları.</li>
              <li>Coğrafya: ülkeler ve başkentleri, iller arası mesafe, il rakımları, harita ölçeği ve koordinat dönüştürücü.</li>
            </ul>
          ),
        },
        {
          heading: "Hesaplamalar ve kaynaklar",
          content: (
            <>
              <p>
                Birim katsayıları uluslararası tanımlara dayanır (SI Birim Sistemi ve ABD Ulusal
                Standartlar ve Teknoloji Enstitüsü NIST yayınları); örneğin 1 inç tam olarak
                2,54 cm, 1 pound tam olarak 0,45359237 kg kabul edilir. Kimyasal hesaplarda IUPAC
                standart atom kütleleri, coğrafi hesaplarda GeoNames koordinatları, dini günlerde
                Diyanet İşleri Başkanlığı takvimi kullanılır.
              </p>
              <p>
                Sayfaların altında o sayfada kullanılan kaynaklar ayrıca belirtilir. Kesin
                tanımı olmayan değerler (örneğin malzeme yoğunluğu, tahmini tarihler) sayfada
                &quot;yaklaşık&quot; ya da &quot;tahmini&quot; olarak işaretlenir.
              </p>
            </>
          ),
        },
        {
          heading: "Doğruluk ve düzeltmeler",
          content: (
            <p>
              Bir hesaplamada ya da bilgide hata görürseniz{" "}
              <Link href="/iletisim">iletişim sayfasındaki</Link> e-posta adresine sayfa adresiyle birlikte
              yazabilirsiniz. Bildirilen hatalar incelenir ve doğrulanırsa sayfa düzeltilir.
            </p>
          ),
        },
        {
          heading: "Reklam ve bağımsızlık",
          content: (
            <p>
              Site ücretsizdir; barındırma ve geliştirme giderlerini karşılamak için sayfalarda
              reklam gösterilebilir. Reklamlar içerikten ayrı alanlarda yer alır ve hesaplama
              sonuçlarını ya da sayfalardaki bilgileri etkilemez. Kişisel verilerin nasıl
              işlendiği <Link href="/gizlilik">Gizlilik Politikası</Link> sayfasında anlatılır.
            </p>
          ),
        },
        {
          heading: "Önemli kullanım notu",
          content: (
            <>
              <p>
                Hesaplayıcılar ve bilgi sayfaları bilgilendirme ve ön değerlendirme amacıyla
                sunulur.
              </p>
              <p>
                Kritik mühendislik, sağlık, hukuk veya güvenlik kararlarında sonuçları proje,
                standart ve profesyonel doğrulama kaynaklarıyla ayrıca kontrol edin.
              </p>
            </>
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
