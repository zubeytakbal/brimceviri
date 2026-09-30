import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { DOSYA_ARACLARI_YOLU } from "../../converter/gorsel/dosyaAraclari";
import TimeToolPage from "../time/TimeToolPage";
import { takvimMetadata } from "../takvim/takvimMeta";
import FotoKucult from "./FotoKucult";

export const FOTO_KUCULT_YOLU = "/fotograf-boyutu-kucultme";

export const fotoKucultMeta = () =>
  takvimMetadata(FOTO_KUCULT_YOLU, {
    title: "Fotoğraf Boyutu Küçültme: 20, 50, 100, 200 KB'a Düşür",
    short: "Fotoğraf Boyutu Küçültme",
    description:
      "Fotoğrafı istediğiniz KB sınırının altına düşürün: 20 KB, 50 KB, 100 KB, 200 KB veya 1 MB. Ücretsiz, toplu, yüklemesiz; işlem tarayıcınızda yapılır.",
  });

const SSS: FaqItem[] = [
  {
    question: "Fotoğraf boyutu nasıl KB olarak küçültülür?",
    answer:
      "Fotoğrafı seçin ve hedef boyutu (ör. 100 KB) işaretleyin. Araç JPG kalitesini adım adım düşürerek hedefin altındaki en yüksek kaliteyi bulur; kalite yeterince düşürüldüğü halde hedef aşılıyorsa fotoğrafın piksel ölçüsünü de küçültür.",
  },
  {
    question: "Fotoğraf kalitesi bozulur mu?",
    answer:
      "Hedefe ulaşmak için gereken kadar sıkıştırma yapılır. 100–200 KB gibi hedeflerde telefon fotoğrafları genellikle gözle fark edilmeyecek kalitede kalır; 20 KB gibi çok küçük hedeflerde fotoğrafın ölçüsü küçülür ve ayrıntı azalır.",
  },
  {
    question: "Sonuç neden seçtiğim değerden biraz küçük çıkıyor?",
    answer:
      "Bazı sistemler 1 KB'ı 1000, bazıları 1024 bayt sayar. Araç güvenli tarafta kalmak için 1000 bayt hesabını kullanır; böylece dosya her iki hesapta da sınırın altında kalır ve yükleme sırasında reddedilmez.",
  },
  {
    question: "Aynı anda birden fazla fotoğraf küçültebilir miyim?",
    answer:
      "Evet. Tek seferde 30 fotoğraf seçebilir, sonuçları tek tek veya tek bir ZIP dosyası olarak indirebilirsiniz.",
  },
  {
    question: "Fotoğraflarım bir yere yükleniyor mu?",
    answer:
      "Hayır. Küçültme tarayıcınızın içinde yapılır; fotoğraflar internete gönderilmez. Konum ve kamera bilgileri de (EXIF) çıktı dosyasına aktarılmaz.",
  },
];

export function FotoKucultSayfasi() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: DOSYA_ARACLARI_YOLU, label: "Dosya Araçları" },
        { label: "Fotoğraf Boyutu Küçültme" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Fotoğraf Boyutu Küçültme"
      intro="Fotoğrafınızı başvuru formunun, e-postanın veya web sitenizin istediği KB sınırının altına indirin. Hedefi seçin, fotoğrafları bırakın; araç kaliteyi mümkün olan en yüksek seviyede tutarak küçültür."
      tool={<FotoKucult />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: DOSYA_ARACLARI_YOLU, label: "Tüm Dosya Araçları" },
          { href: "/gorsel-donusturucu", label: "Görsel Dönüştürücü" },
          { href: "/png-jpg-cevirme", label: "PNG JPG Çevirme" },
          { href: "/jpg-webp-cevirme", label: "JPG WebP Çevirme" },
          { href: "/kilobayt-megabayt", label: "Kilobayt → Megabayt" },
          { href: "/gigabayt-megabayt", label: "Gigabayt → Megabayt" },
          {
            href: "/piksel-cm-dpi-hesaplama",
            label: "Piksel, CM ve DPI Hesaplama",
          },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "nasil", label: "Küçültme nasıl yapılır?" },
        { id: "kb-mb", label: "KB, MB ve 1000/1024 farkı" },
        { id: "ipuclari", label: "Başvuru sistemleri için ipuçları" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={SSS}
    >
      <h2 id="nasil">Küçültme nasıl yapılır?</h2>
      <p>
        Bir fotoğrafın dosya boyutunu iki şey belirler: piksel ölçüsü ve
        sıkıştırma kalitesi. Telefonla çekilen bir fotoğraf genellikle 4000
        piksel genişliğinde ve 2–5 MB boyutundadır. Araç önce JPG kalitesini
        düşürerek hedefin altındaki en iyi kaliteyi arar. Kalite %40'ın altına
        inmeden hedefe ulaşılamıyorsa fotoğrafın ölçüsünü orantılı olarak
        küçültür ve aramayı tekrarlar. Böylece fotoğraf hem hedefin altında
        kalır hem de gereksiz yere bozulmaz.
      </p>
      <h2 id="kb-mb">KB, MB ve 1000/1024 farkı</h2>
      <p>
        1 MB, 1000 KB olarak da 1024 KB olarak da hesaplanabilir. Windows dosya
        boyutlarını 1024 tabanıyla gösterir; bazı başvuru siteleri ise 1000
        tabanıyla kontrol eder. Bu araç hedefi her zaman 1000 bayt üzerinden
        hesapladığı için ortaya çıkan dosya iki yöntemde de sınırı aşmaz.
        Birimler arasında çevirmek için{" "}
        <Link href="/kilobayt-megabayt">Kilobayt → Megabayt</Link> ve{" "}
        <Link href="/kategoriler/veri">Veri Depolama Dönüşümleri</Link>{" "}
        sayfalarını kullanabilirsiniz.
      </p>
      <h2 id="ipuclari">Başvuru sistemleri için ipuçları</h2>
      <ul>
        <li>
          Sınırı başvuru sayfasındaki uyarıdan kontrol edin ve hedefi o değere
          eşit ya da biraz altında seçin.
        </li>
        <li>
          Sistem en az bir boyut da istiyorsa (ör. &quot;20 KB'tan büyük&quot;),
          çok küçük bir hedef seçmeyin.
        </li>
        <li>
          Fotoğrafın belirli bir piksel ölçüsünde olması gerekiyorsa önce
          ölçüyü, sonra dosya boyutunu ayarlayın. Ölçüleri santimetreden piksele
          çevirmek için{" "}
          <Link href="/piksel-cm-dpi-hesaplama">
            Piksel, CM ve DPI Hesaplama
          </Link>{" "}
          aracını kullanın.
        </li>
        <li>Çoğu sistem JPG ister; WebP'yi yalnızca web siteniz için seçin.</li>
      </ul>
    </TimeToolPage>
  );
}
