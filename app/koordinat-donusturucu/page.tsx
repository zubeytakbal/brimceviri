import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import CoordinateConverter from "../components/geo/CoordinateConverter";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { geoRelated } from "../converter/geo/geoTools";
import { buildLanguageAlternates } from "../i18n/routing";
import { buildSiteUrl } from "../siteConfig";

const path = "/koordinat-donusturucu";
const title = "Koordinat Dönüştürücü: Derece Dakika Saniye, UTM, ITRF96";
const description =
  "Enlem-boylamı derece-dakika-saniye (DMS), ondalık derece ve UTM arasında çevirin; Türkiye tapu ve kadastrosunda kullanılan ITRF96 3 derecelik TM koordinatlarını hesaplayın. Konumumu bul düğmesiyle.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, ...buildLanguageAlternates({ tr: path, en: "/en/coordinate-converter" }, "tr") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Derece dakika saniye ondalık dereceye nasıl çevrilir?",
    answer:
      "Ondalık derece = derece + dakika ÷ 60 + saniye ÷ 3600. Örneğin 39°55′15″ = 39 + 55/60 + 15/3600 = 39,920833°. Güney enlemleri ve batı boylamları eksi işaretle yazılır.",
  },
  {
    question: "Google Haritalar'da bir yerin koordinatı nasıl alınır?",
    answer:
      "Bilgisayarda haritada ilgili noktaya sağ tıklayın; açılan menünün en üstündeki sayılar ondalık enlem ve boylamdır. Tıklayınca kopyalanır; bu değeri dönüştürücüye yapıştırabilirsiniz.",
  },
  {
    question: "Türkiye hangi UTM dilimlerinde yer alır?",
    answer:
      "Türkiye üç UTM diliminde yer alır: 35 (Trakya ve Ege, 24°–30° D), 36 (İç Anadolu ve Akdeniz'in büyük bölümü, 30°–36° D) ve 37 (Doğu Karadeniz, Doğu ve Güneydoğu Anadolu'nun büyük bölümü, 36°–42° D). 42° doğunun ötesi (Van, Hakkari, Iğdır ve Ağrı'nın doğusu gibi) 38. dilime girer.",
  },
  {
    question: "ITRF96 3 derecelik koordinat nedir?",
    answer:
      "Türkiye'de tapu, kadastro ve imar planlarında kullanılan TUREF/ITRF96 sisteminde ülke 3 derecelik dilimlere ayrılır; dilim orta meridyenleri 27°, 30°, 33°, 36°, 39°, 42° ve 45°'dir. Ölçek katsayısı 1'dir, Y (sağa) değerine 500.000 m eklenir. Dönüştürücü bu değerleri GRS80 elipsoidiyle hesaplar.",
  },
  {
    question: "Eski ED50 koordinatları da çevrilebilir mi?",
    answer:
      "Hayır. Eski paftalarda kullanılan ED50 datumu ile ITRF96/WGS84 arasında Türkiye'de 100 metreyi aşabilen kayıklık vardır; bu dönüşüm bölgesel parametre gerektirir. Resmî işler için Tapu ve Kadastro Genel Müdürlüğü'nün dönüşüm hizmetlerini kullanın.",
  },
];

export default function CoordinateConverterPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/cografya-hesaplamalari", label: "Coğrafya Hesaplamaları" },
        { href: path, label: "Koordinat Dönüştürücü" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Koordinat Dönüştürücü"
      intro="Koordinatı istediğiniz biçimde yazın ya da konumunuzu bulun: ondalık derece, derece-dakika-saniye, UTM ve Türkiye için ITRF96 3° TM karşılıkları anında hesaplansın."
      tool={<CoordinateConverter />}
      related={{ title: "İlginizi çekebilir", links: geoRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "bicimler", label: "Koordinat biçimleri" },
        { id: "utm", label: "UTM koordinatları" },
        { id: "itrf96", label: "ITRF96 ve 3° TM (tapu, kadastro)" },
        { id: "dogruluk", label: "Doğruluk ve sınırlar" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="bicimler">Koordinat biçimleri</h2>
      <p>
        Coğrafi koordinat, bir noktanın enlemi (Ekvator&apos;un kuzeyi ya da güneyi) ve boylamıyla (Greenwich&apos;in doğusu ya da batısı) verilir.
        Aynı nokta üç yaygın biçimde yazılabilir:
      </p>
      <ul>
        <li>
          <strong>Ondalık derece (DD):</strong> 39.92077, 32.85411 — GPS, Google Haritalar ve çoğu uygulama bu biçimi kullanır.
        </li>
        <li>
          <strong>Derece-dakika-saniye (DMS):</strong> 39°55′14.8″ K, 32°51′14.8″ D — atlas ve ders kitaplarında yaygındır. 1° = 60′, 1′ = 60″.
        </li>
        <li>
          <strong>Derece-ondalık dakika (DDM):</strong> 39°55.2462′ K — denizcilik ve bazı GPS cihazlarında kullanılır.
        </li>
      </ul>
      <p>Dönüştürücü; virgüllü ondalık yazımı (39,92), K/G/D/B ya da N/S/E/W harflerini ve eksi işaretini tanır.</p>

      <h2 id="utm">UTM koordinatları</h2>
      <p>
        UTM (Evrensel Enine Merkator) sistemi dünyayı 6 derecelik 60 dilime böler ve her dilimde noktanın konumunu metre cinsinden doğu (easting)
        ve kuzey (northing) değerleriyle verir. Dilim orta meridyeninde doğu değeri 500.000 m kabul edilir; ölçek katsayısı 0,9996&apos;dır.
        Türkiye'nin büyük bölümü 35, 36 ve 37. dilimlerde, 42° doğunun ötesi 38. dilimde yer alır. Metre cinsinden olduğu için UTM, haritada mesafe ve alan ölçmeyi kolaylaştırır.
      </p>

      <h2 id="itrf96">ITRF96 ve 3° TM (tapu, kadastro)</h2>
      <p>
        Türkiye&apos;de tapu, kadastro ve imar çalışmalarında Türkiye Ulusal Referans Çerçevesi (TUREF/ITRF96) ile 3 derecelik enine Merkator
        projeksiyonu kullanılır. Dilim orta meridyenleri (DOM) 27°, 30°, 33°, 36°, 39°, 42° ve 45°&apos;dir; ölçek katsayısı 1&apos;dir. Türkiye&apos;deki
        uygulamada doğu yönündeki değer <strong>Y (sağa değer)</strong>, kuzey yönündeki değer <strong>X (yukarı değer)</strong> olarak yazılır.
        Parselinizin köşe koordinatlarıyla alan hesaplamak için sonuçları <Link href="/tarla-donum-hesaplama">tarla dönüm hesaplayıcısıyla</Link>{" "}
        birlikte kullanabilirsiniz.
      </p>

      <h2 id="dogruluk">Doğruluk ve sınırlar</h2>
      <p>
        Dönüşümler Krüger serisiyle hesaplanır ve dilim içinde milimetre altı doğruluktadır. WGS84 ile ITRF96 arasındaki fark günlük kullanım için
        santimetre düzeyindedir. Eski ED50 datumundaki koordinatlar bu araçla çevrilmez. İki koordinat arasındaki mesafe için{" "}
        <Link href="/buyuk-daire-mesafesi-hesaplama">büyük daire mesafesi hesaplayıcısını</Link> kullanın.
      </p>
    </TimeToolPage>
  );
}
