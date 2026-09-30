import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { DOSYA_ARACLARI_YOLU } from "../../converter/gorsel/dosyaAraclari";
import TimeToolPage from "../time/TimeToolPage";
import { takvimMetadata } from "../takvim/takvimMeta";
import DosyaAracCubugu from "./DosyaAracCubugu";
import ExifTemizle from "./ExifTemizle";

export const EXIF_YOLU = "/fotograf-konum-bilgisi-silme";

export const exifMeta = () =>
  takvimMetadata(EXIF_YOLU, {
    title: "Fotoğraftan Konum Bilgisi (EXIF) Silme ve Görüntüleme",
    short: "Konum Bilgisi Silme",
    description:
      "Fotoğrafınızda konum, telefon modeli ve çekim tarihi kayıtlı mı görün; EXIF bilgilerini kalite kaybı olmadan silin. Toplu, ücretsiz, yüklemesiz.",
  });

const SSS: FaqItem[] = [
  {
    question: "Fotoğraftaki konum bilgisi nasıl silinir?",
    answer:
      "Fotoğrafı bu araca bırakın; konum ve diğer EXIF bilgileri gösterilir ve temizlenmiş bir kopyası hazırlanır. 'Temiz halini indir' ile kopyayı kaydedip paylaşın. Orijinal dosyanız değişmez.",
  },
  {
    question: "EXIF silmek fotoğrafın kalitesini düşürür mü?",
    answer:
      "JPG ve PNG dosyalarında hayır. Araç görüntü verisine dokunmadan yalnızca bilgi bölümlerini çıkarır; fotoğraf piksel piksel aynı kalır. Diğer biçimler yeniden kaydedilerek temizlenir.",
  },
  {
    question: "Temizlenen fotoğraf neden yan dönmüyor?",
    answer:
      "Telefonlar dikey fotoğrafları çoğu zaman yatay kaydedip doğru yönü EXIF'e yazar. Araç bu yön bilgisini korur, konum, cihaz ve tarih gibi kişisel bilgileri siler.",
  },
  {
    question: "Fotoğraflarımda konum kaydedilmesini nasıl kapatırım?",
    answer:
      "iPhone'da Ayarlar > Gizlilik ve Güvenlik > Konum Servisleri > Kamera'yı 'Hiçbir Zaman' yapın. Android'de kamera uygulamasının ayarlarındaki konum etiketi (konumu kaydet) seçeneğini kapatın; seçeneğin adı üreticiye göre değişebilir.",
  },
  {
    question: "Fotoğraflarım bir sunucuya yükleniyor mu?",
    answer:
      "Hayır. Okuma ve temizleme tarayıcınızda yapılır. Sayfa yalnızca siz 'haritada gör' bağlantısına tıklarsanız OpenStreetMap'i açar.",
  },
];

export function ExifSayfasi() {
  return (
    <>
      <DosyaAracCubugu />
      <TimeToolPage
        crumbs={[
          { href: "/", label: "Ana Sayfa" },
          { href: DOSYA_ARACLARI_YOLU, label: "Dosya Araçları" },
          { label: "Konum Bilgisi (EXIF) Silme" },
        ]}
        crumbLabel="Sayfa yolu"
        title="Fotoğraftan Konum Bilgisi Silme"
        intro="Telefonla çekilen fotoğraflar çoğu zaman çekildiği yerin koordinatlarını, telefon modelini ve tarihini içinde taşır. Fotoğrafınızı bırakın, nelerin kayıtlı olduğunu görün ve kalite kaybı olmadan temizleyin."
        tool={<ExifTemizle />}
        related={{
          title: "İlginizi çekebilir",
          links: [
            { href: DOSYA_ARACLARI_YOLU, label: "Tüm Dosya Araçları" },
            {
              href: "/fotograf-boyutu-kucultme",
              label: "Fotoğraf Boyutu Küçültme",
            },
            { href: "/resim-boyutlandirma", label: "Resim Boyutlandırma" },
            { href: "/gorsel-donusturucu", label: "Görsel Dönüştürücü" },
            { href: "/koordinat-donusturucu", label: "Koordinat Dönüştürücü" },
          ],
        }}
        tocTitle="İçindekiler"
        tocItems={[
          { id: "exif-nedir", label: "EXIF nedir, neleri içerir?" },
          { id: "risk", label: "Neden silmelisiniz?" },
          { id: "faq", label: "Sık sorulan sorular" },
        ]}
        faqTitle="Sık sorulan sorular"
        faqItems={SSS}
      >
        <h2 id="exif-nedir">EXIF nedir, neleri içerir?</h2>
        <p>
          EXIF, fotoğraf makinesi ve telefonların her fotoğrafa eklediği bir
          bilgi bölümüdür. İçinde telefonun markası ve modeli, çekim tarihi ve
          saati, pozlama ayarları, fotoğrafın yönü ve konum servisi açıksa
          çekildiği yerin enlem ve boylamı bulunabilir. Bazı düzenleme
          programları ayrıca XMP veya IPTC bölümlerine yazar, yazılım ve yazar
          adı ekler.
        </p>
        <h2 id="risk">Neden silmelisiniz?</h2>
        <ul>
          <li>
            Evde çekilen bir fotoğrafın koordinatları evinizin adresini birkaç
            metre hassasiyetle gösterebilir.
          </li>
          <li>
            İlan sitesine, foruma, e-postaya veya bulut paylaşım bağlantısına
            dosya olarak eklenen fotoğraflar bu bilgileri çoğu zaman olduğu gibi
            taşır.
          </li>
          <li>
            Çocuklarınızın okulu, işyeriniz veya tatil yeriniz gibi bilgileri
            istemeden paylaşmış olabilirsiniz.
          </li>
        </ul>
        <p>
          Koordinatları farklı biçimlere çevirmek için{" "}
          <Link href="/koordinat-donusturucu">Koordinat Dönüştürücü</Link>{" "}
          aracını kullanabilirsiniz.
        </p>
      </TimeToolPage>
    </>
  );
}
