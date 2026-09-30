import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { DOSYA_ARACLARI_YOLU } from "../../converter/gorsel/dosyaAraclari";
import TimeToolPage from "../time/TimeToolPage";
import { takvimMetadata } from "../takvim/takvimMeta";
import DosyaAracCubugu from "./DosyaAracCubugu";
import GorselDonusturucu from "./GorselDonusturucu";

export const HEIC_YOLU = "/heic-jpg-cevirme";

export const heicMeta = () =>
  takvimMetadata(HEIC_YOLU, {
    title: "HEIC JPG Çevirme: iPhone Fotoğraflarını JPG Yap (Toplu, Ücretsiz)",
    short: "HEIC JPG Çevirme",
    description:
      "iPhone'un HEIC fotoğraflarını JPG'ye çevirin; Windows'ta ve her programda açılsın. Toplu dönüştürme, ZIP indirme; fotoğraflar sunucuya yüklenmez.",
  });

const SSS: FaqItem[] = [
  {
    question: "HEIC nedir?",
    answer:
      "HEIC (High Efficiency Image Container), iPhone ve iPad'in iOS 11'den beri varsayılan olarak kullandığı fotoğraf biçimidir. Aynı kalitedeki bir JPG'ye göre çoğu zaman yaklaşık yarı boyutta yer kaplar, ancak her program ve sistem tarafından desteklenmez.",
  },
  {
    question: "HEIC fotoğraflar Windows'ta neden açılmıyor?",
    answer:
      "Windows HEIC'i kendiliğinden açamaz; Microsoft Store'dan 'HEIF Görüntü Uzantıları' ve HEVC codec'inin yüklenmesi gerekir. Uzantı kurmadan açmak ya da dosyayı başkasına göndermek için fotoğrafları bu araçla JPG'ye çevirebilirsiniz.",
  },
  {
    question: "iPhone'da fotoğraflar doğrudan JPG olarak nasıl çekilir?",
    answer:
      "Ayarlar > Kamera > Biçimler bölümünde 'Yüksek Verimlilik' yerine 'En Uyumlu' seçeneğini seçin. Bundan sonra çektiğiniz fotoğraflar JPG olarak kaydedilir; önceki fotoğraflar HEIC olarak kalır.",
  },
  {
    question: "iPhone fotoğrafları bilgisayara JPG olarak aktarılabilir mi?",
    answer:
      "Evet. Ayarlar > Fotoğraflar > 'Mac veya PC'ye Aktar' bölümünde 'Otomatik' seçiliyse iPhone, kabloyla aktarırken fotoğrafları uyumlu biçime (JPG) çevirir.",
  },
  {
    question: "Fotoğraflarım bir sunucuya yükleniyor mu?",
    answer:
      "Hayır. Dönüştürme tarayıcınızda yapılır. HEIC çözücü (yaklaşık 3 MB) ilk HEIC dosyasında jsDelivr'den bir kez indirilir; fotoğraflarınız yine bilgisayarınızdan çıkmaz.",
  },
];

export function HeicSayfasi() {
  return (
    <>
      <DosyaAracCubugu />
      <TimeToolPage
        crumbs={[
          { href: "/", label: "Ana Sayfa" },
          { href: DOSYA_ARACLARI_YOLU, label: "Dosya Araçları" },
          { href: "/gorsel-donusturucu", label: "Görsel Dönüştürücü" },
          { label: "HEIC JPG Çevirme" },
        ]}
        crumbLabel="Sayfa yolu"
        title="HEIC JPG Çevirme"
        intro="iPhone'da çekilen HEIC fotoğrafları JPG'ye çevirin; Windows'ta, e-postada ve başvuru sitelerinde sorunsuz açılsın. Birden fazla fotoğrafı aynı anda dönüştürüp ZIP olarak indirin."
        tool={
          <GorselDonusturucu
            hedef="jpg"
            kaynakAd="HEIC"
            kabul=".heic,.heif,image/heic,image/heif,image/*"
          />
        }
        related={{
          title: "İlginizi çekebilir",
          links: [
            { href: DOSYA_ARACLARI_YOLU, label: "Tüm Dosya Araçları" },
            { href: "/gorsel-donusturucu", label: "Görsel Dönüştürücü" },
            { href: "/webp-jpg-cevirme", label: "WebP JPG Çevirme" },
            { href: "/png-jpg-cevirme", label: "PNG JPG Çevirme" },
            {
              href: "/fotograf-boyutu-kucultme",
              label: "Fotoğraf Boyutu Küçültme",
            },
            {
              href: "/fotograf-konum-bilgisi-silme",
              label: "Konum Bilgisi (EXIF) Silme",
            },
            {
              href: "/e-okul-fotograf-kucultme",
              label: "e-Okul Fotoğraf Küçültme",
            },
          ],
        }}
        tocTitle="İçindekiler"
        tocItems={[
          { id: "neden", label: "Neden JPG'ye çevirmeli?" },
          { id: "karsilastirma", label: "HEIC ile JPG karşılaştırması" },
          { id: "faq", label: "Sık sorulan sorular" },
        ]}
        faqTitle="Sık sorulan sorular"
        faqItems={SSS}
      >
        <h2 id="neden">Neden JPG'ye çevirmeli?</h2>
        <p>
          HEIC depolamadan tasarruf sağlar, ancak Windows'un eski sürümleri,
          bazı fotoğraf düzenleme programları, e-Devlet ve başvuru sitelerinin
          yükleme alanları ile birçok web sitesi HEIC kabul etmez. JPG ise
          neredeyse her cihazda ve sistemde açılır. Dönüştürürken konum ve cihaz
          bilgileri (EXIF) de çıktı dosyasına aktarılmaz.
        </p>
        <p>
          Aslında bu sitedeki bütün görsel araçları HEIC dosyalarını doğrudan
          açabilir: bir iPhone fotoğrafını{" "}
          <Link href="/e-okul-fotograf-kucultme">e-Okul ölçüsüne</Link> getirmek
          ya da{" "}
          <Link href="/fotograf-boyutu-kucultme">
            100 KB'ın altına indirmek
          </Link>{" "}
          için önce çevirmenize gerek yoktur.
        </p>
        <h2 id="karsilastirma">HEIC ile JPG karşılaştırması</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Özellik</th>
                <th scope="col">HEIC</th>
                <th scope="col">JPG</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Dosya boyutu</th>
                <td>Küçük (aynı kalitede çoğu zaman yarısı kadar)</td>
                <td>Daha büyük</td>
              </tr>
              <tr>
                <th scope="row">Uyumluluk</th>
                <td>Apple cihazları, güncel Android ve eklentili Windows</td>
                <td>Neredeyse her yer</td>
              </tr>
              <tr>
                <th scope="row">Canlı fotoğraf, derinlik bilgisi</th>
                <td>Saklayabilir</td>
                <td>Tek kare</td>
              </tr>
              <tr>
                <th scope="row">En uygun kullanım</th>
                <td>Telefonda saklamak</td>
                <td>Paylaşmak, yazdırmak, başvurularda yüklemek</td>
              </tr>
            </tbody>
          </table>
        </div>
      </TimeToolPage>
    </>
  );
}
