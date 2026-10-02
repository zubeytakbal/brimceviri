import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { SureBulucu } from "../components/dini/DiniAraclar";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { SURELER, TOPLAM_AYET, cuzIcerigi } from "../converter/sureler";
import { diniRelated } from "../i18n/diniAraclar";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/sure-bulucu";
const title = "Sure Bulucu: Hangi Sure Kaç Ayet, Hangi Cüzde?";
const description = `Kur'an-ı Kerim'in 114 suresi: sıra numarası, ayet sayısı ve hangi cüzde olduğu. Sure adıyla arayın; 30 cüzün hangi sureleri içerdiğini görün.`;

export const metadata: Metadata = {
  title: seoTitle(title, "Sure Bulucu"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const enUzun = [...SURELER].sort((a, b) => b.ayet - a.ayet)[0];
const enKisa = SURELER.filter((s) => s.ayet === Math.min(...SURELER.map((x) => x.ayet)));

const faqItems: FaqItem[] = [
  { question: "Kur'an-ı Kerim'de kaç sure ve kaç ayet var?", answer: `114 sure ve ${TOPLAM_AYET.toLocaleString("tr-TR")} ayet vardır (Hafs rivayeti, Kûfe sayımı). Kur'an 30 cüze ayrılır.` },
  { question: "En uzun ve en kısa sure hangisi?", answer: `En uzun sure ${enUzun.ayet} ayetle ${enUzun.ad} Suresi'dir. En kısa sureler 3'er ayetle ${enKisa.map((s) => s.ad).join(", ")} sureleridir.` },
  { question: "Neden sayfa numarası verilmiyor?", answer: "Sayfa numarası mushafın baskısına göre bir iki sayfa değişebilir. Bu yüzden surenin yerini, Türkiye'de okunan Hafs rivayetine ve yaygın cüz taksimine göre cüz ve ayetle veriyoruz." },
];

export default function SureBulucuPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dini-araclar", label: "Dini Araçlar" },
        { href: path, label: "Sure Bulucu" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Sure Bulucu"
      intro="Sure adını ya da sıra numarasını yazın: ayet sayısını ve hangi cüzde olduğunu görün. Her surenin ayrıntı sayfasında cüzlere göre ayet aralıkları yer alır."
      tool={<SureBulucu />}
      related={{ title: "Diğer dini araçlar", links: diniRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "cuzler", label: "30 cüz ve içerdiği sureler" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="cuzler">30 cüz ve içerdiği sureler</h2>
      <p>Her cüzün hangi sureden ve hangi ayetten başladığını görmek için cüze tıklayın.</p>
      <ul className="tool-hub-list">
        {Array.from({ length: 30 }, (_, i) => i + 1).map((cuz) => {
          const parca = cuzIcerigi(cuz)[0];
          return (
            <li key={cuz}>
              <Link href={`/cuzler/${cuz}-cuz`}>
                {cuz}. cüz · {parca.sure.ad} {parca.ilkAyet}
              </Link>
            </li>
          );
        })}
      </ul>
    </TimeToolPage>
  );
}
