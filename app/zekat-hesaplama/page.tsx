import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { ZekatHesaplama } from "../components/dini/DiniAraclar2";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { NISAP_ALTIN_GRAM, ZEKAT_ORANI } from "../converter/diniHesaplar";
import { diniRelated } from "../i18n/diniAraclar";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/zekat-hesaplama";
const title = "Zekât Hesaplama: Nisap 80,18 g Altın, Kırkta Bir";
const description = "Nakit, mevduat, döviz, altın ve ticari mallarınızı girin; borçlar düşülür. Net varlık nisabı (80,18 g altın) geçiyorsa kırkta bir (%2,5) zekâtı hesaplayın.";

export const metadata: Metadata = {
  title: seoTitle(title, "Zekât Hesaplama"),
  description,
  alternates: { canonical: path, languages: { tr: path, ar: "/ar/zakat-calculator", "x-default": path } },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const g = NISAP_ALTIN_GRAM.toLocaleString("tr-TR");
const oran = (ZEKAT_ORANI * 100).toLocaleString("tr-TR");

const faqItems: FaqItem[] = [
  { question: "Zekâtın nisabı ne kadar?", answer: `Diyanet İşleri Başkanlığı'na göre nisap ${g} gram altın veya bunun değerindeki paradır. Nisabın TL karşılığı altın fiyatına göre değiştiği için güncel gram fiyatını kendiniz girersiniz.` },
  { question: "Zekât yüzde kaç?", answer: `Para, altın ve ticari mallarda zekât kırkta bir, yani %${oran}'tir.` },
  { question: "Borçlar zekâttan düşülür mü?", answer: "Evet. Zekât, borçlar düşüldükten sonra kalan ve temel ihtiyaçların dışındaki net varlık üzerinden hesaplanır." },
  { question: "Zekât için ne kadar süre geçmesi gerekir?", answer: "Nisaba ulaşan varlığın üzerinden bir kamerî (Hicrî) yıl geçmiş olması gerekir." },
];

export default function ZekatPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dini-araclar", label: "Dini Araçlar" },
        { href: path, label: "Zekât Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Zekât Hesaplama"
      intro={`Önce has altının güncel gram fiyatını, sonra varlıklarınızı ve borçlarınızı girin. Net varlığınız ${g} g altın değerindeki nisabı geçiyorsa verilecek zekâtı görürsünüz.`}
      tool={<ZekatHesaplama />}
      related={{ title: "Diğer dini araçlar", links: diniRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "hesap", label: "Zekât nasıl hesaplanır?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="hesap">Zekât nasıl hesaplanır?</h2>
      <p>
        Nakit, banka mevduatı, döviz, altın (ayarına göre has altın karşılığı), ticari mallar ve tahsili umulan alacaklar toplanır; borçlar
        düşülür. Kalan net varlık, Diyanet'in esas aldığı {g} gram altın değerindeki nisaba ulaşıyorsa üzerinden bir kamerî yıl geçtiğinde
        kırkta bir (%{oran}) zekât verilir. Bu araç para, altın ve ticaret mallarının zekâtını hesaplar; tarım ürünleri ve hayvanların zekâtı
        farklı ölçülere tabidir. Altın gramlarını ayar dönüşümüyle görmek için{" "}
        <Link href="/altin-hesaplama">altın hesaplama</Link> aracına bakabilirsiniz.
      </p>
    </TimeToolPage>
  );
}
