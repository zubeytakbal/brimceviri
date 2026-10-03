import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { ZekatHesaplama } from "../components/dini/DiniAraclar2";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { maasZekat, NISAP_ALTIN_GRAM, ZEKAT_ORANI } from "../converter/diniHesaplar";
import { diniRelated } from "../i18n/diniAraclar";
import { seoTitle } from "../seoTitle";
import { islamicAlternates } from "../i18n/islamicToolPaths";
import { buildSiteUrl } from "../siteConfig";

const path = "/zekat-hesaplama";
const title = "Zekât Hesaplama: Nisap 80,18 g Altın, Kırkta Bir";
const description = "Nakit, mevduat, döviz, altın ve ticari mallarınızı girin; borçlar düşülür. Nisap 80,18 g altın, zekât kırkta bir. Maaştan biriken para için aylık zekât planı.";

export const metadata: Metadata = {
  title: seoTitle(title, "Zekât Hesaplama"),
  description,
  alternates: { canonical: path, languages: islamicAlternates("zakat") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const g = NISAP_ALTIN_GRAM.toLocaleString("tr-TR");
const oran = (ZEKAT_ORANI * 100).toLocaleString("tr-TR");

// Örnek: 4.000 TL gram fiyatı, 100.000 TL birikim, ayda 25.000 TL.
const maasOrnek = maasZekat(100000, 25000, 4000)!;
const tlYazi = (n: number) => Math.round(n).toLocaleString("tr-TR");

const faqItems: FaqItem[] = [
  { question: "Zekâtın nisabı ne kadar?", answer: `Diyanet İşleri Başkanlığı'na göre nisap ${g} gram altın veya bunun değerindeki paradır. Nisabın TL karşılığı altın fiyatına göre değiştiği için güncel gram fiyatını kendiniz girersiniz.` },
  { question: "Zekât yüzde kaç?", answer: `Para, altın ve ticari mallarda zekât kırkta bir, yani %${oran}'tir.` },
  { question: "Borçlar zekâttan düşülür mü?", answer: "Evet. Zekât, borçlar düşüldükten sonra kalan ve temel ihtiyaçların dışındaki net varlık üzerinden hesaplanır." },
  {
    question: "Maaştan zekât verilir mi?",
    answer:
      "Maaşın kendisi zekâta tabi değildir; ay içinde harcanan kısma zekât düşmez. Harcanmayıp biriken para ise diğer paralarınızla toplanır: toplam nisaba ulaşmışsa ve üzerinden bir kamerî yıl geçmişse, yıl sonunda elinizde bulunanın kırkta biri zekât olarak verilir.",
  },
  {
    question: "Zekât aylık taksitle ödenebilir mi?",
    answer: `Evet. Zekât yılı dolmadan peşin olarak bölüm bölüm verilebilir. Örneğin 100.000 TL birikimi olan ve ayda 25.000 TL biriktiren kişinin yıl sonu birikimi ${tlYazi(maasOrnek.yilSonuBirikim)} TL, zekâtı ${tlYazi(maasOrnek.zekat)} TL olur; bu da ayda yaklaşık ${tlYazi(maasOrnek.aylikTaksit)} TL'dir. Yıl dolunca gerçek tutarla karşılaştırıp eksik kalan tamamlanır.`,
  },
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
        { id: "maas", label: "Maaştan biriken paranın zekâtı" },
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
      <h2 id="maas">Maaştan biriken paranın zekâtı</h2>
      <p>
        Maaşla geçinenler için asıl soru, ay ay biriken paranın zekâtının nasıl verileceğidir. “Maaştan biriken” sekmesinde şu anki
        birikiminizi ve her ay kenara koyduğunuz tutarı yazın: araç yıl sonunda elinizde olacak toplamı tahmin eder, nisaba ulaşıyorsa
        kırkta birini ve bunun 12 aya bölünmüş taksitini gösterir. Taksitler peşin ödenmiş zekât sayılır; zekât yılınız dolduğunda
        elinizdeki gerçek tutarla yeniden hesaplayıp aradaki farkı tamamlayın.
      </p>
    </TimeToolPage>
  );
}
