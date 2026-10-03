import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { SeferiHesaplama } from "../components/dini/DiniAraclar";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { ayrilmaEki, IKAMET_GUN, SEFER_KM } from "../converter/diniHesaplar";
import { KGM_DISTANCE_DATE } from "../converter/geo/kgmDistances";
import { turkeyProvinces } from "../converter/geo/turkeyProvinces";
import { diniRelated } from "../i18n/diniAraclar";
import { seoTitle } from "../seoTitle";
import { islamicAlternates } from "../i18n/islamicToolPaths";
import { buildSiteUrl } from "../siteConfig";

const path = "/seferi-mesafe-hesaplama";
const title = "Seferî Mesafe Hesaplama: Kaç Km'de Seferî Olunur?";
const description = `Seferî olmak için gidilecek yer en az ${SEFER_KM} km uzakta olmalı. İki il seçin, Karayolları mesafesine göre seferî olup olmadığınızı görün; 81 il için liste.`;

export const metadata: Metadata = {
  title: seoTitle(title, "Seferî Mesafe Hesaplama"),
  description,
  alternates: { canonical: path, languages: islamicAlternates("qasr") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Kaç km'de seferî olunur?",
    answer: `Diyanet İşleri Başkanlığı'na göre gidilecek yer en az ${SEFER_KM} km uzaktaysa ve orada ${IKAMET_GUN} günden az kalınacaksa kişi seferî olur.`,
  },
  {
    question: "Seferî mesafesi nereden ölçülür?",
    answer: "Yaşanan yerleşim yerinin (ilçe ya da şehir) sınırından çıkıldığı andan itibaren, gidilecek yere kadar olan yol mesafesi esas alınır. Dönüş yolu hesaba katılmaz.",
  },
  {
    question: "Aynı il içinde seferî olunur mu?",
    answer: `Evet. Seferîlik il sınırına değil mesafeye bağlıdır; büyük illerde ilçeler arası yol ${SEFER_KM} km'yi aşıyorsa seferî olunur.`,
  },
  {
    question: `${IKAMET_GUN} gün kalırsam yine seferî miyim?`,
    answer: `Hayır. Hanefî mezhebine göre gidilen yerde ${IKAMET_GUN} gün ya da daha fazla kalmaya niyet eden kişi mukîm olur.`,
  },
];

export default function SeferiMesafePage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dini-araclar", label: "Dini Araçlar" },
        { href: path, label: "Seferî Mesafe Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Seferî Mesafe Hesaplama"
      intro={`İki il seçin: Karayolları Genel Müdürlüğü'nün il merkezleri arası mesafesine göre ${SEFER_KM} km sınırını geçip geçmediğinizi görün. Kendi yol mesafenizi de yazabilirsiniz.`}
      tool={<SeferiHesaplama />}
      related={{ title: "Diğer dini araçlar", links: diniRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "kural", label: "Seferîlik için mesafe ve süre" },
        { id: "olcum", label: "Mesafe nasıl ölçülür?" },
        { id: "iller", label: "İllere göre seferî mesafe" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="kural">Seferîlik için mesafe ve süre</h2>
      <p>
        Diyanet İşleri Başkanlığı'na göre bulunduğu yerden en az <strong>{SEFER_KM} km</strong> uzaklıktaki bir yere gitmek üzere yola çıkan ve
        orada <strong>{IKAMET_GUN} günden az</strong> kalmaya niyet eden kişi seferîdir. Seferî kişi dört rekâtlı farz namazları iki rekât kılar;
        Ramazan'da orucunu sonra tutmak üzere ertelemesine ruhsat vardır. {IKAMET_GUN} gün ya da daha uzun kalmaya niyet eden kişi gittiği yerde
        mukîm olur.
      </p>

      <h2 id="olcum">Mesafe nasıl ölçülür?</h2>
      <p>
        Mesafe, yaşanan yerleşim yerinin sınırından çıkıldığı noktadan gidilecek yere kadar olan yol uzunluğudur; dönüş yolu eklenmez. Bu araç
        Karayolları Genel Müdürlüğü'nün il merkezleri arası mesafe cetvelini ({KGM_DISTANCE_DATE.slice(0, 4)}) kullanır. İl merkezleri arası
        mesafe, sınırlar arası mesafeden biraz fazladır; bu yüzden 90–120 km arası sonuçlar “sınırda” olarak gösterilir. Kesin karar için kendi
        çıkış noktanızdan ölçtüğünüz yol mesafesini yazın. İller arası sürüş süresi ve yakıt maliyeti için{" "}
        <Link href="/iller-arasi-mesafe">iller arası mesafe</Link> aracına bakabilirsiniz.
      </p>

      <h2 id="iller">İllere göre seferî mesafe</h2>
      <p>Bir il seçerek oradan hangi illere gidince seferî olunduğunu liste hâlinde görün:</p>
      <ul className="tool-hub-list">
        {[...turkeyProvinces]
          .sort((a, b) => a.name.localeCompare(b.name, "tr"))
          .map((p) => (
            <li key={p.id}>
              <Link href={`${path}/${p.id}`}>{ayrilmaEki(p.name)} seferî</Link>
            </li>
          ))}
      </ul>
    </TimeToolPage>
  );
}
