import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { DOSYA_ARACLARI_YOLU } from "../../converter/gorsel/dosyaAraclari";
import TimeToolPage from "../time/TimeToolPage";
import { takvimMetadata } from "../takvim/takvimMeta";
import DosyaAracCubugu from "./DosyaAracCubugu";
import FiligranEkle from "./FiligranEkle";

export const FILIGRAN_YOLU = "/fotografa-filigran-ekleme";

export const filigranMeta = () =>
  takvimMetadata(FILIGRAN_YOLU, {
    title: "Fotoğrafa Filigran Ekleme: Yazı, Logo ve Kimlik Fotokopisi",
    short: "Filigran Ekleme",
    description:
      "Fotoğraflarınıza yazı veya logo filigranı ekleyin; tek köşeye ya da tüm görsele döşeyin. Kimlik fotokopisi için hazır ayar, toplu işlem, yüklemesiz.",
  });

const SSS: FaqItem[] = [
  {
    question: "Fotoğrafa filigran nasıl eklenir?",
    answer:
      "Fotoğrafları seçin, 'Yazı' veya 'Logo' sekmesinden filigranınızı belirleyin; boyut, opaklık, açı ve konumu ayarlayın. Önizlemede sonucu görün ve 'Filigranı uygula' ile tüm fotoğraflara uygulayıp indirin.",
  },
  {
    question: "Kimlik fotokopisine neden filigran eklenmeli?",
    answer:
      "Kimlik fotokopisi veya fotoğrafı bir kuruma verirken üzerine hangi amaçla ve hangi tarihte verildiğini yazmak, belgenin başka bir işte kullanılmasını zorlaştırır. 'Kimlik fotokopisi' düğmesi bu yazıyı tüm belgeye çapraz olarak döşer; noktalı yeri kurumun veya başvurunun adıyla doldurun.",
  },
  {
    question: "Döşeme filigran ne işe yarar?",
    answer:
      "Tek köşedeki filigran kırpılarak kolayca silinebilir. 'Tüm görsele döşe' seçeneği yazıyı veya logoyu görselin her yerine çapraz ve tekrarlı yerleştirir; kaldırmak çok daha zordur.",
  },
  {
    question: "Logo filigranı için hangi dosyayı kullanmalıyım?",
    answer:
      "Arka planı saydam bir PNG logo en iyi sonucu verir. Logonun boyutu görselin kısa kenarına göre yüzde olarak ayarlanır, böylece farklı boyuttaki fotoğraflarda aynı oranda görünür.",
  },
  {
    question: "Fotoğraflarım bir yere yükleniyor mu?",
    answer:
      "Hayır. Filigran tarayıcınızda eklenir; kimlik belgeleri dahil hiçbir dosya internete gönderilmez. Konum ve kamera bilgileri de çıktıya aktarılmaz.",
  },
];

export function FiligranSayfasi() {
  return (
    <>
      <DosyaAracCubugu />
      <TimeToolPage
        crumbs={[
          { href: "/", label: "Ana Sayfa" },
          { href: DOSYA_ARACLARI_YOLU, label: "Dosya Araçları" },
          { label: "Filigran Ekleme" },
        ]}
        crumbLabel="Sayfa yolu"
        title="Fotoğrafa Filigran Ekleme"
        intro="Fotoğraflarınıza yazı veya logo filigranı ekleyin, köşeye yerleştirin ya da tüm görsele döşeyin. Kimlik fotokopisini bir kuruma vermeden önce üzerine amacını ve tarihini yazmak için hazır ayarı kullanın."
        tool={<FiligranEkle />}
        related={{
          title: "İlginizi çekebilir",
          links: [
            { href: DOSYA_ARACLARI_YOLU, label: "Tüm Dosya Araçları" },
            {
              href: "/fotograf-bulaniklastirma",
              label: "Fotoğraf Bulanıklaştırma",
            },
            {
              href: "/fotograf-konum-bilgisi-silme",
              label: "Konum Bilgisi (EXIF) Silme",
            },
            { href: "/resim-boyutlandirma", label: "Resim Boyutlandırma" },
            {
              href: "/fotograf-boyutu-kucultme",
              label: "Fotoğraf Boyutu Küçültme",
            },
            { href: "/renk-kodu-cevirici", label: "Renk Kodu Çevirici" },
          ],
        }}
        tocTitle="İçindekiler"
        tocItems={[
          { id: "kullanim", label: "Filigran ne zaman kullanılır?" },
          { id: "kimlik", label: "Kimlik fotokopisine filigran" },
          { id: "faq", label: "Sık sorulan sorular" },
        ]}
        faqTitle="Sık sorulan sorular"
        faqItems={SSS}
      >
        <h2 id="kullanim">Filigran ne zaman kullanılır?</h2>
        <ul>
          <li>
            Fotoğrafçılar ve tasarımcılar, işlerinin izinsiz kullanılmasını
            önlemek için adlarını veya logolarını ekler.
          </li>
          <li>
            E-ticaret satıcıları ürün fotoğraflarının başka ilanlarda
            kopyalanmasını zorlaştırır.
          </li>
          <li>
            Taslak veya önizleme görsellerine &quot;TASLAK&quot;,
            &quot;ÖRNEKTİR&quot; gibi uyarılar yazılır.
          </li>
          <li>
            Kişisel belgelerin fotokopilerine hangi amaçla verildiği yazılır.
          </li>
        </ul>
        <h2 id="kimlik">Kimlik fotokopisine filigran</h2>
        <p>
          &quot;Kimlik fotokopisi&quot; düğmesi, belgenin tamamına kırmızı ve
          yarı saydam şekilde &quot;YALNIZCA ……… BAŞVURUSU İÇİN
          VERİLMİŞTİR&quot; yazısını ve bugünün tarihini döşer. Noktalı yeri
          kurum veya başvuru adıyla değiştirin; yazı bilgileri okunaklı
          bırakacak kadar saydamdır. Belgenin çekildiği fotoğraftaki konum
          bilgisini de silmek için{" "}
          <Link href="/fotograf-konum-bilgisi-silme">Konum Bilgisi Silme</Link>{" "}
          aracını kullanabilirsiniz.
        </p>
      </TimeToolPage>
    </>
  );
}
