import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { KazaOrucuHesaplama } from "../components/dini/DiniAraclar";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { kazaOrucu } from "../converter/diniHesaplar";
import { diniRelated } from "../i18n/diniAraclar";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/kaza-orucu-hesaplama";
const title = "Kaza Orucu Hesaplama: Kaç Gün Borcum Var, Ne Zaman Biter?";
const description = "Tutamadığınız Ramazan ve günlerden kaza orucu borcunuzu hesaplayın; haftada kaç gün tutarak kaç haftada bitireceğinizi görün.";

export const metadata: Metadata = {
  title: seoTitle(title, "Kaza Orucu Hesaplama"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const ornek = kazaOrucu(2, 30, 0, 2)!;

const faqItems: FaqItem[] = [
  {
    question: "Kaza orucu nasıl hesaplanır?",
    answer: "Hiç tutulmayan her Ramazan için o Ramazan'ın gün sayısı (29 ya da 30) ve ayrıca tutulamayan günler toplanır. Gün sayısı kesin bilinmiyorsa en kuvvetli tahmine göre hareket edilir.",
  },
  {
    question: "Kaza orucu arka arkaya tutulmak zorunda mı?",
    answer: "Hayır. Kaza oruçları ayrı ayrı günlerde tutulabilir; birçok kişi pazartesi ve perşembe günlerini tercih eder.",
  },
  {
    question: "2 Ramazan kaza orucu kaç haftada biter?",
    answer: `2 Ramazan × 30 gün = ${ornek.gun} gün. Haftada 2 gün tutulursa ${ornek.bitisHafta} haftada biter.`,
  },
];

export default function KazaOrucuPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dini-araclar", label: "Dini Araçlar" },
        { href: path, label: "Kaza Orucu Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Kaza Orucu Hesaplama"
      intro="Hiç tutulmayan Ramazanları ve ayrıca tutulamayan günleri girin: kaza orucu borcunuzu ve haftada kaç gün tutarak ne kadar sürede bitireceğinizi görün."
      tool={<KazaOrucuHesaplama />}
      related={{ title: "Diğer dini araçlar", links: diniRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "nasil", label: "Kaza orucu borcu nasıl bulunur?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="nasil">Kaza orucu borcu nasıl bulunur?</h2>
      <p>
        Hiç tutulmayan Ramazanlar ve hastalık, yolculuk ya da başka bir sebeple tutulamayan günler ayrı ayrı toplanır. Kesin sayı
        bilinmiyorsa kişi en kuvvetli tahminine göre bir sayı belirler. Ayrıntılı dini hükümler için Diyanet İşleri Başkanlığı'nın{" "}
        <a href="https://kurul.diyanet.gov.tr/Cevap-Ara/523/kisinin-cok-sayida-kaza-orucu-varsa-nasil-tutmalidir" target="_blank" rel="noreferrer">
          kaza orucu açıklamasına
        </a>{" "}
        bakabilirsiniz. Bu araç yalnızca gün sayısını ve planı hesaplar; keffâret gibi ayrı hükümler hesaba katılmaz. Ramazan'ın kaç gün
        kaldığını <Link href="/geri-sayim">geri sayım</Link> sayfasında görebilirsiniz.
      </p>
    </TimeToolPage>
  );
}
