import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { DOSYA_ARACLARI_YOLU } from "../../converter/gorsel/dosyaAraclari";
import { mmPiksel } from "../../converter/gorsel/sikistirma";
import TimeToolPage from "../time/TimeToolPage";
import { takvimMetadata } from "../takvim/takvimMeta";
import DosyaAracCubugu from "./DosyaAracCubugu";
import ResimBoyutlandir from "./ResimBoyutlandir";

export const RESIM_BOYUT_YOLU = "/resim-boyutlandirma";

export const resimBoyutMeta = () =>
  takvimMetadata(RESIM_BOYUT_YOLU, {
    title: "Resim Boyutlandırma: Piksel, CM ve Instagram Ölçüleri (Toplu)",
    short: "Resim Boyutlandırma",
    description:
      "Resimleri piksel, yüzde veya santimetre (DPI) ile yeniden boyutlandırın; Instagram, Facebook, X ve LinkedIn ölçüleri hazır. Toplu, ücretsiz, yüklemesiz.",
  });

const BASKI = [
  { ad: "4,5 × 6 cm", w: 4.5, h: 6 },
  { ad: "Biyometrik 5 × 6 cm", w: 5, h: 6 },
  { ad: "Fotoğraf 10 × 15 cm", w: 10, h: 15 },
  { ad: "Fotoğraf 13 × 18 cm", w: 13, h: 18 },
  { ad: "A5 (14,8 × 21 cm)", w: 14.8, h: 21 },
  { ad: "A4 (21 × 29,7 cm)", w: 21, h: 29.7 },
];

const SSS: FaqItem[] = [
  {
    question: "Resmi kalite kaybı olmadan nasıl boyutlandırırım?",
    answer:
      "Küçültmede kalite kaybı gözle görülmez; araç yüksek kaliteli yeniden örnekleme kullanır ve JPG/WebP kalitesini %90 tutar. Büyütmede ise görsel yeni ayrıntı kazanamaz, bu yüzden büyütülen resim yumuşak görünür.",
  },
  {
    question: "Oran farklı olduğunda ne olur?",
    answer:
      "Hem genişlik hem yükseklik verdiğinizde dört seçenek vardır: doldur (taşan kısım ortadan kırpılır), boşluklu sığdır (resmin tamamı görünür, kenarlar seçtiğiniz renkle dolar), sığdır (resim kutunun içine sığacak kadar küçülür) ve esnet (oran bozulur).",
  },
  {
    question: "Santimetre ile boyutlandırmada DPI ne işe yarar?",
    answer:
      "DPI bir inçe (2,54 cm) düşen piksel sayısıdır. 10 cm genişlik 300 DPI'da 1181 piksel eder. Araç seçtiğiniz DPI değerini JPG ve PNG dosyasının içine de yazar; baskı ve tasarım programları resmi doğru santimetrede açar.",
  },
  {
    question: "Instagram için hangi ölçüyü seçmeliyim?",
    answer:
      "Kare gönderi 1080×1080, dikey gönderi 1080×1350, Story ve Reels 1080×1920 pikseldir. 'Sosyal medya' sekmesinden seçip 'Boşluklu sığdır' ile fotoğrafınızı kırpmadan paylaşabilirsiniz.",
  },
  {
    question: "Resimlerim bir sunucuya yükleniyor mu?",
    answer:
      "Hayır. Boyutlandırma tarayıcınızda yapılır; dosyalar bilgisayarınızdan çıkmaz.",
  },
];

export function ResimBoyutlandirSayfasi() {
  return (
    <>
      <DosyaAracCubugu />
      <TimeToolPage
        crumbs={[
          { href: "/", label: "Ana Sayfa" },
          { href: DOSYA_ARACLARI_YOLU, label: "Dosya Araçları" },
          { label: "Resim Boyutlandırma" },
        ]}
        crumbLabel="Sayfa yolu"
        title="Resim Boyutlandırma"
        intro="Resimlerinizi piksel, yüzde veya santimetre ile yeniden boyutlandırın. Instagram, Facebook, X ve LinkedIn ölçüleri hazır; birden fazla resmi aynı anda işleyip ZIP olarak indirin."
        tool={<ResimBoyutlandir />}
        related={{
          title: "İlginizi çekebilir",
          links: [
            { href: DOSYA_ARACLARI_YOLU, label: "Tüm Dosya Araçları" },
            {
              href: "/fotograf-boyutu-kucultme",
              label: "Fotoğraf Boyutu Küçültme (KB)",
            },
            { href: "/gorsel-donusturucu", label: "Görsel Dönüştürücü" },
            {
              href: "/sosyal-medya-gorsel-boyutlari-hesaplama",
              label: "Sosyal Medya Görsel Boyutları",
            },
            {
              href: "/piksel-cm-dpi-hesaplama",
              label: "Piksel, CM ve DPI Hesaplama",
            },
            {
              href: "/e-okul-fotograf-kucultme",
              label: "e-Okul Fotoğraf Küçültme",
            },
          ],
        }}
        tocTitle="İçindekiler"
        tocItems={[
          { id: "yontemler", label: "Boyutlandırma yöntemleri" },
          { id: "baski", label: "Baskı ölçüleri piksel karşılıkları" },
          { id: "faq", label: "Sık sorulan sorular" },
        ]}
        faqTitle="Sık sorulan sorular"
        faqItems={SSS}
      >
        <h2 id="yontemler">Boyutlandırma yöntemleri</h2>
        <ul>
          <li>
            <b>Piksel:</b> Web sitesi, e-posta ve başvuru formları için. Yalnız
            genişliği yazarsanız yükseklik orantılı hesaplanır.
          </li>
          <li>
            <b>Yüzde:</b> Tüm resimleri aynı oranda küçültmek için; %50,
            genişliği ve yüksekliği yarıya indirir.
          </li>
          <li>
            <b>Santimetre (baskı):</b> Fotoğraf baskısı, vesikalık veya afiş
            için; santimetreyi seçtiğiniz DPI&apos;da piksele çevirir ve DPI
            bilgisini dosyaya yazar.
          </li>
          <li>
            <b>Sosyal medya:</b> Instagram, Facebook, X ve LinkedIn&apos;in
            önerdiği ölçüler tek tıkla.
          </li>
        </ul>
        <h2 id="baski">Baskı ölçüleri piksel karşılıkları</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Ölçü</th>
                <th scope="col">300 DPI</th>
                <th scope="col">150 DPI</th>
              </tr>
            </thead>
            <tbody>
              {BASKI.map((b) => (
                <tr key={b.ad}>
                  <th scope="row">{b.ad}</th>
                  <td>
                    {mmPiksel(b.w * 10, 300)} × {mmPiksel(b.h * 10, 300)} px
                  </td>
                  <td>
                    {mmPiksel(b.w * 10, 150)} × {mmPiksel(b.h * 10, 150)} px
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Başka ölçüler için{" "}
          <Link href="/piksel-cm-dpi-hesaplama">
            Piksel, CM ve DPI Hesaplama
          </Link>{" "}
          aracını, dosya boyutunu KB olarak düşürmek için{" "}
          <Link href="/fotograf-boyutu-kucultme">Fotoğraf Boyutu Küçültme</Link>{" "}
          aracını kullanabilirsiniz.
        </p>
      </TimeToolPage>
    </>
  );
}
