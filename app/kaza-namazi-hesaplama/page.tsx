import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { KazaNamaziHesaplama } from "../components/dini/DiniAraclar2";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { GUNLUK_FARZ_REKAT, kazaNamazi, VITIR_REKAT } from "../converter/diniHesaplar";
import { diniRelated } from "../i18n/diniAraclar";
import { seoTitle } from "../seoTitle";
import { islamicAlternates } from "../i18n/islamicToolPaths";
import { buildSiteUrl } from "../siteConfig";

const path = "/kaza-namazi-hesaplama";
const title = "Kaza Namazı Hesaplama: Kaç Vakit, Kaç Rekât Borcum Var?";
const description = "Kılınmayan süreyi ya da tarih aralığını girin: kaza namazı borcunuzu vakit ve rekât olarak, günde kaç vakit kılarak ne zaman bitireceğinizi görün.";

export const metadata: Metadata = {
  title: seoTitle(title, "Kaza Namazı Hesaplama"),
  description,
  alternates: { canonical: path, languages: islamicAlternates("kaza") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const birYil = kazaNamazi(1, 0, 0, true, 6)!;
const fmt = (n: number) => n.toLocaleString("tr-TR");

const faqItems: FaqItem[] = [
  {
    question: "1 yıllık kaza namazı kaç vakit?",
    answer: `365 gün × 6 vakit (beş vakit farz ve vitir) = ${fmt(birYil.vakit)} vakit, ${fmt(birYil.rekat)} rekâttır. Her gün altı vakit kaza kılan kişi bir yıllık borcu ${fmt(birYil.bitisGun)} günde bitirir.`,
  },
  {
    question: "Kaza namazında sünnetler kılınır mı?",
    answer: `Hayır. Kaza edilen yalnızca farzlar ve Hanefî mezhebinde vâcip olan vitir namazıdır: günde ${GUNLUK_FARZ_REKAT} rekât farz ve ${VITIR_REKAT} rekât vitir.`,
  },
  {
    question: "Kaza borcumu tam bilmiyorsam ne yapmalıyım?",
    answer: "Kesin sayı bilinmiyorsa en kuvvetli tahmine göre bir süre belirlenir ve kılınmaya başlanır. Ayrıntılı hükümler için Diyanet İşleri Başkanlığı'nın açıklamalarına bakabilirsiniz.",
  },
];

export default function KazaNamaziPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dini-araclar", label: "Dini Araçlar" },
        { href: path, label: "Kaza Namazı Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Kaza Namazı Hesaplama"
      intro="Namaz kılınmayan süreyi yıl, ay ve gün olarak ya da tarih aralığı olarak girin. Kaza borcunuzu vakit ve rekât olarak, günde kaç vakit kılarak ne zaman bitireceğinizle birlikte görün."
      tool={<KazaNamaziHesaplama />}
      related={{ title: "Diğer dini araçlar", links: diniRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "hesap", label: "Kaza namazı nasıl hesaplanır?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="hesap">Kaza namazı nasıl hesaplanır?</h2>
      <p>
        Her gün için beş vakit farz namaz (sabah 2, öğle 4, ikindi 4, akşam 3, yatsı 4 rekât; toplam {GUNLUK_FARZ_REKAT} rekât) ve Hanefî
        mezhebine göre vâcip olan {VITIR_REKAT} rekâtlık vitir namazı kaza edilir. Gün sayısı vakit sayısıyla çarpılarak borç bulunur. Süre
        girerken yıl 365, ay 30 gün kabul edilir; kesin gün sayısı için tarih aralığı seçeneğini kullanın. Kaza orucu için{" "}
        <Link href="/kaza-orucu-hesaplama">kaza orucu hesaplama</Link> aracına bakabilirsiniz.
      </p>
    </TimeToolPage>
  );
}
