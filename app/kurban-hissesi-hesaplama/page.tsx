import type { Metadata } from "next";
import { KurbanHissesiHesaplama } from "../components/dini/DiniAraclar2";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { BUYUKBAS_MAX_HISSE } from "../converter/diniHesaplar";
import { diniRelated } from "../i18n/diniAraclar";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/kurban-hissesi-hesaplama";
const title = "Kurban Hissesi Hesaplama: Hisse Başı Tutar ve Et Payı";
const description = `Büyükbaş kurbanın bedelini ve masrafları en çok ${BUYUKBAS_MAX_HISSE} hisseye bölün; toplam eti girerseniz hisse başına düşen eti de görün.`;

export const metadata: Metadata = {
  title: seoTitle(title, "Kurban Hissesi Hesaplama"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  { question: "Büyükbaş kurbana kaç kişi ortak olabilir?", answer: `Sığır ve deve gibi büyükbaş hayvanlara en çok ${BUYUKBAS_MAX_HISSE} kişi ortak olabilir; koyun ve keçi tek kişi adına kesilir.` },
  { question: "Hisseler eşit mi olmalı?", answer: "Ortakların payı en az yedide bir olmalıdır. Bu araç bedeli ve masrafları hisse sayısına eşit böler." },
  { question: "Bir hisseye kaç kilo et düşer?", answer: "Bu, hayvanın ağırlığına ve kesimden çıkan ete göre çok değişir. Kesimden sonra tartılan toplam eti girerseniz araç hisse başına düşen miktarı hesaplar." },
];

export default function KurbanPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dini-araclar", label: "Dini Araçlar" },
        { href: path, label: "Kurban Hissesi Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Kurban Hissesi Hesaplama"
      intro={`Hayvanın bedelini ve kesim, bakım, nakliye gibi masrafları girin; hisse sayısını seçin (büyükbaşta en çok ${BUYUKBAS_MAX_HISSE}). Hisse başına düşen tutarı ve isterseniz et payını görün.`}
      tool={<KurbanHissesiHesaplama />}
      related={{ title: "Diğer dini araçlar", links: diniRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "hesap", label: "Hisse nasıl hesaplanır?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="hesap">Hisse nasıl hesaplanır?</h2>
      <p>
        Hayvanın bedeli ile kesim, bakım ve nakliye gibi ortak masraflar toplanır ve hisse sayısına bölünür. Fiyatlar her yıl ve bölgeye göre
        değiştiği için araçta hazır bir fiyat yoktur; kendi bedelinizi yazarsınız. Et miktarı hayvana göre değiştiğinden tahmin yapılmaz:
        kesimden sonra tartılan toplam et girilirse hisse başına düşen hesaplanır.
      </p>
    </TimeToolPage>
  );
}
