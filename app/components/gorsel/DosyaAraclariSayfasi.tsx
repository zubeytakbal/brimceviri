import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { DOSYA_ARACLARI_YOLU } from "../../converter/gorsel/dosyaAraclari";
import DosyaAracCubugu from "./DosyaAracCubugu";
import TimeToolPage from "../time/TimeToolPage";
import { takvimMetadata } from "../takvim/takvimMeta";
import DosyaAracPaneli from "./DosyaAracPaneli";

export const dosyaAraclariMeta = () =>
  takvimMetadata(DOSYA_ARACLARI_YOLU, {
    title: "Dosya Araçları: Görsel Dönüştürme ve Küçültme (Yüklemeden)",
    short: "Dosya Araçları",
    description:
      "JPG, PNG ve WebP dönüştürme ve görsel araçları tek panelde. Ücretsiz, kayıtsız, filigransız; dosyalarınız sunucuya yüklenmez, tarayıcınızda işlenir.",
  });

const SSS: FaqItem[] = [
  {
    question: "Dosyalarım gerçekten hiçbir yere yüklenmiyor mu?",
    answer:
      "Evet. Araçlar tarayıcınızın yerleşik görsel işleme özelliğini kullanır; dosya bilgisayarınızda açılır, dönüştürülür ve yine bilgisayarınıza kaydedilir. Sayfa yüklendikten sonra internet bağlantısı kesilse bile dönüştürme çalışır.",
  },
  {
    question: "Kullanım sınırı veya ücret var mı?",
    answer:
      "Hayır. Kayıt, günlük sınır ya da filigran yoktur. İşlem bilgisayarınızın gücüyle yapıldığı için yalnızca tek seferde seçilebilecek dosya sayısı sınırlıdır.",
  },
  {
    question: "Telefonda kullanabilir miyim?",
    answer:
      "Evet. Android ve iPhone'daki güncel tarayıcılarda dosya veya galeri fotoğrafı seçip dönüştürebilir, sonucu telefonunuza indirebilirsiniz.",
  },
  {
    question: "Hangi araçlar eklenecek?",
    answer:
      "Hedef KB'a fotoğraf küçültme, resim boyutlandırma ve kırpma, e-Okul ve biyometrik fotoğraf hazır ölçüleri gibi araçlar sırayla bu panele eklenir.",
  },
];

export function DosyaAraclariSayfasi() {
  return (
    <>
      <DosyaAracCubugu />
      <TimeToolPage
        crumbs={[
          { href: "/", label: "Ana Sayfa" },
          { label: "Dosya Araçları" },
        ]}
        crumbLabel="Sayfa yolu"
        title="Dosya Araçları"
        intro="Görsellerinizi dönüştürmek için ihtiyacınız olan araçlar tek yerde. Hepsi ücretsiz ve kayıtsız; dosyalarınız bilgisayarınızdan çıkmadan tarayıcınızda işlenir."
        tool={<DosyaAracPaneli />}
        related={{
          title: "İlginizi çekebilir",
          links: [
            {
              href: "/piksel-cm-dpi-hesaplama",
              label: "Piksel, CM ve DPI Hesaplama",
            },
            {
              href: "/sosyal-medya-gorsel-boyutlari-hesaplama",
              label: "Sosyal Medya Görsel Boyutları",
            },
            {
              href: "/kategoriler/veri",
              label: "Veri Depolama Dönüşümleri (KB, MB, GB)",
            },
            { href: "/renk-kodu-cevirici", label: "Renk Kodu Çevirici" },
            { href: "/fotografci-araclari", label: "Fotoğrafçı Araçları" },
            {
              href: "/grafik-tasarimci-araclari",
              label: "Grafik Tasarımcı Araçları",
            },
          ],
        }}
        tocTitle="İçindekiler"
        tocItems={[
          { id: "nasil", label: "Nasıl çalışır?" },
          { id: "gizlilik", label: "Dosyalarınız neden yüklenmez?" },
          { id: "faq", label: "Sık sorulan sorular" },
        ]}
        faqTitle="Sık sorulan sorular"
        faqItems={SSS}
      >
        <h2 id="nasil">Nasıl çalışır?</h2>
        <ol>
          <li>
            Paneldeki kartlardan ihtiyacınız olan aracı seçin; üstteki
            düğmelerle araçları türüne göre süzebilirsiniz.
          </li>
          <li>
            Dosyalarınızı seçin veya sürükleyip bırakın. Birden fazla dosyayı
            aynı anda işleyebilirsiniz.
          </li>
          <li>Sonuçları tek tek ya da tek bir ZIP dosyası olarak indirin.</li>
        </ol>
        <h2 id="gizlilik">Dosyalarınız neden yüklenmez?</h2>
        <p>
          Birçok çevrimiçi dönüştürücü dosyanızı kendi sunucusuna gönderir,
          orada işler ve bir süre sonra siler. Buradaki araçlar ise işi
          tarayıcınızın içinde yapar: kimlik fotoğrafı, belge taraması veya
          kişisel fotoğraflarınız hiçbir zaman internete çıkmaz. Dönüştürülen
          görsellere konum ve kamera bilgileri (EXIF) de aktarılmaz.
        </p>
        <p>
          Dosya boyutunun KB ve MB karşılıklarını görmek için{" "}
          <Link href="/kilobayt-megabayt">Kilobayt → Megabayt</Link>, baskı
          ölçüsünü hesaplamak için{" "}
          <Link href="/piksel-cm-dpi-hesaplama">
            Piksel, CM ve DPI Hesaplama
          </Link>{" "}
          araçlarını kullanabilirsiniz.
        </p>
      </TimeToolPage>
    </>
  );
}
