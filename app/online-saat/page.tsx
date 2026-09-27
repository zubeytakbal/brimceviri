import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import LiveClock from "../components/time/LiveClock";
import TimeToolPage from "../components/time/TimeToolPage";
import { timeRelated } from "../components/time/timeRelatedLinks";
import type { FaqItem } from "../converter/faqSchema";
import { timeToolAlternates } from "../i18n/timeToolPaths";
import { buildSiteUrl } from "../siteConfig";

const title = "Online Saat: Şu An Saat Kaç? Tam Ekran Saat";
const description =
  "Saniyesi saniyesine canlı saat: 13 tema (analog, istasyon, flip, neon, LED, ikili…), 12/24 saat, tarih ve tek tıkla tam ekran masa saati.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/online-saat", ...timeToolAlternates("clock") },
  openGraph: { title, description, url: buildSiteUrl("/online-saat"), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Bu saat ne kadar doğru?",
    answer:
      "Saat, cihazınızın sistem saatini gösterir. Bilgisayar ve telefonlar saati internet üzerinden otomatik eşitlediği için genellikle saniyenin altında doğrudur. Saatiniz yanlışsa cihaz ayarlarında \"otomatik saat\" seçeneğini açın.",
  },
  {
    question: "Türkiye saati kaç GMT?",
    answer: "Türkiye 2016'dan beri yıl boyu UTC+3 (TRT, Türkiye Saati) kullanır; yaz saati uygulaması yoktur. Yani saatler ilkbahar ve sonbaharda ileri-geri alınmaz.",
  },
  {
    question: "Tam ekran saat nasıl açılır?",
    answer: "Saatin sağ üstündeki ⛶ simgesine ya da \"Tam ekran\" düğmesine basın. Çıkmak için Esc tuşuna veya ✕ simgesine basın. Telefonda \"Ekranı açık tut\" ile ekranın kararmasını da önleyebilirsiniz.",
  },
  {
    question: "Seçtiğim tema kaydediliyor mu?",
    answer: "Evet. Tema, 12/24 saat, saniye ve tarih tercihleri bu tarayıcıda saklanır; sayfaya tekrar geldiğinizde aynı görünümle açılır.",
  },
  {
    question: "İkili (binary) saat nasıl okunur?",
    answer:
      "Her sütun saatin bir rakamıdır. Sütundaki noktalar aşağıdan yukarı 1, 2, 4 ve 8 değerindedir; yanan noktaların toplamı o rakamı verir. Örneğin 4 ve 1 yanıyorsa rakam 5'tir. Sütunların altında rakamlar da yazılıdır.",
  },
];

export default function OnlineClockPage() {
  return (
    <TimeToolPage
      crumbs={[{ href: "/", label: "Ana Sayfa" }, { href: "/online-saat", label: "Online Saat" }]}
      crumbLabel="Sayfa yolu"
      title="Online Saat"
      intro="Şu anki saat, saniyesi saniyesine. 13 farklı temadan birini seç, 12/24 saat ve tarihi ayarla, tek tıkla tam ekran masa saatine dönüştür."
      tool={<LiveClock locale="tr" />}
      related={{ title: "Diğer zaman araçları", links: timeRelated.tr.tools.filter((t) => t.href !== "/online-saat") }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "temalar", label: "Saat temaları" },
        { id: "masa-saati", label: "Masa saati ve sunum ekranı olarak kullanım" },
        { id: "turkiye-saati", label: "Türkiye saati ve saat dilimleri" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="temalar">Saat temaları</h2>
      <ul>
        <li>
          <strong>Analog:</strong> Klasik (akıcı saniye ibresi), İstasyon (kalın çubuklar, kırmızı yuvarlak uçlu saniye ibresi), Roma
          rakamlı, Altın ve karanlık odalar için Gece.
        </li>
        <li>
          <strong>Dijital:</strong> Dijital, Sade, Gün batımı, katlanan kartlı Flip, parlayan Neon, kırmızı LED, yeşil Terminal ve
          ikili sistemde gösteren İkili saat.
        </li>
      </ul>

      <h2 id="masa-saati">Masa saati ve sunum ekranı olarak kullanım</h2>
      <p>
        Tam ekran modunda saat ekranı doldurur; ikinci monitör, televizyon ya da tablet için şık bir masa saati olur. Sınıflarda,
        sınav salonlarında ve canlı yayınlarda büyük ve okunaklı bir saat gerektiğinde Dijital ya da LED temaları, gece başucunda
        ise göz yormayan Gece teması uygundur.
      </p>

      <h2 id="turkiye-saati">Türkiye saati ve saat dilimleri</h2>
      <p>
        Türkiye tek saat dilimi kullanır: UTC+3 (TRT). 2016&apos;dan bu yana yaz saati uygulaması yoktur. Saat, tarayıcının
        bulunduğu saat dilimine göre gösterilir; saatin altında saat diliminizin adı yazar. Belirli bir saate uyanmak için{" "}
        <Link href="/online-alarm-kur">online alarm</Link>, geri sayım için <Link href="/zamanlayici">zamanlayıcı</Link>{" "}
        kullanabilirsiniz.
      </p>
    </TimeToolPage>
  );
}
