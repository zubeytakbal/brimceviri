import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { DOSYA_ARACLARI_YOLU } from "../../converter/gorsel/dosyaAraclari";
import TimeToolPage from "../time/TimeToolPage";
import { takvimMetadata } from "../takvim/takvimMeta";
import DosyaAracCubugu from "./DosyaAracCubugu";
import FotoKirp from "./FotoKirp";

export const FOTO_KIRP_YOLU = "/fotograf-kirpma";

export const fotoKirpMeta = () =>
  takvimMetadata(FOTO_KIRP_YOLU, {
    title: "Fotoğraf Kırpma ve Döndürme: 1:1, 4:5, 16:9 Hazır Oranlar",
    short: "Fotoğraf Kırpma",
    description:
      "Fotoğrafı serbestçe veya 1:1, 4:5, 9:16, 16:9 gibi hazır oranlarla kırpın; 90° döndürün, yatay veya dikey çevirin. Ücretsiz, orijinal çözünürlükte, yüklemesiz.",
  });

const SSS: FaqItem[] = [
  {
    question: "Fotoğraf nasıl kırpılır?",
    answer:
      "Fotoğrafı seçin, üstten bir oran seçin (veya 'Serbest' bırakın), kutuyu sürükleyip köşelerinden boyutlandırın ve 'Kırp' düğmesine basın. Sonucu önizleme bağlantısından indirebilirsiniz.",
  },
  {
    question: "Instagram için hangi oranı seçmeliyim?",
    answer:
      "Kare gönderi için 1:1, dikey gönderi için 4:5, Story ve Reels için 9:16 kullanın. Kırptıktan sonra tam piksel ölçüsü için Resim Boyutlandırma aracının 'Sosyal medya' sekmesini kullanabilirsiniz.",
  },
  {
    question: "Kırpma kaliteyi düşürür mü?",
    answer:
      "Hayır. Kırpma orijinal çözünürlükte yapılır; yalnızca seçtiğiniz alan tutulur. JPG ve WebP'de dosya %92 kaliteyle yeniden kaydedilir, PNG kayıpsızdır.",
  },
  {
    question: "Yan dönmüş fotoğrafı nasıl düzeltirim?",
    answer:
      "'Sola döndür' veya 'Sağa döndür' düğmesiyle fotoğrafı 90° döndürün, ardından istediğiniz gibi kırpıp indirin.",
  },
];

export function FotoKirpSayfasi() {
  return (
    <>
      <DosyaAracCubugu />
      <TimeToolPage
        crumbs={[
          { href: "/", label: "Ana Sayfa" },
          { href: DOSYA_ARACLARI_YOLU, label: "Dosya Araçları" },
          { label: "Fotoğraf Kırpma" },
        ]}
        crumbLabel="Sayfa yolu"
        title="Fotoğraf Kırpma ve Döndürme"
        intro="Fotoğrafınızı serbestçe veya Instagram, Story, YouTube gibi hazır oranlarla kırpın; 90° döndürün, yatay veya dikey çevirin. Kırpma orijinal çözünürlükte yapılır."
        tool={<FotoKirp />}
        related={{
          title: "İlginizi çekebilir",
          links: [
            { href: DOSYA_ARACLARI_YOLU, label: "Tüm Dosya Araçları" },
            { href: "/resim-boyutlandirma", label: "Resim Boyutlandırma" },
            {
              href: "/fotograf-boyutu-kucultme",
              label: "Fotoğraf Boyutu Küçültme",
            },
            {
              href: "/sosyal-medya-gorsel-boyutlari-hesaplama",
              label: "Sosyal Medya Görsel Boyutları",
            },
            {
              href: "/fotograf-konum-bilgisi-silme",
              label: "Konum Bilgisi (EXIF) Silme",
            },
          ],
        }}
        tocTitle="İçindekiler"
        tocItems={[
          { id: "oranlar", label: "Hangi oran nerede kullanılır?" },
          { id: "faq", label: "Sık sorulan sorular" },
        ]}
        faqTitle="Sık sorulan sorular"
        faqItems={SSS}
      >
        <h2 id="oranlar">Hangi oran nerede kullanılır?</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Oran</th>
                <th scope="col">Kullanım</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1:1</th>
                <td>Instagram kare gönderi, profil fotoğrafı</td>
              </tr>
              <tr>
                <th scope="row">4:5</th>
                <td>Instagram dikey gönderi (akışta en çok yer kaplayan)</td>
              </tr>
              <tr>
                <th scope="row">9:16</th>
                <td>Instagram Story ve Reels, TikTok, YouTube Shorts</td>
              </tr>
              <tr>
                <th scope="row">16:9</th>
                <td>YouTube kapak görseli, sunum, bilgisayar ekranı</td>
              </tr>
              <tr>
                <th scope="row">3:2 / 2:3</th>
                <td>10×15 cm fotoğraf baskısı, fotoğraf makinesi kareleri</td>
              </tr>
              <tr>
                <th scope="row">4:3 / 3:4</th>
                <td>Telefon kamerasının varsayılan oranı, tablet ekranı</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Platformların önerdiği piksel ölçüleri için{" "}
          <Link href="/sosyal-medya-gorsel-boyutlari-hesaplama">
            Sosyal Medya Görsel Boyutları
          </Link>{" "}
          sayfasına bakın.
        </p>
      </TimeToolPage>
    </>
  );
}
