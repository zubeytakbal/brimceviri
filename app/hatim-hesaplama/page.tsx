import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { HatimHesaplama } from "../components/dini/DiniAraclar2";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { CUZ_SAYISI, hatimPlani, MUSHAF_SAYFA } from "../converter/diniHesaplar";
import { diniRelated } from "../i18n/diniAraclar";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/hatim-hesaplama";
const title = "Hatim Hesaplama: Günde Kaç Sayfa Okumalıyım?";
const description = "Kaç günde hatim etmek istediğinizi girin: günde kaç sayfa ve cüz okumanız gerektiğini, okuma sürenizi görün; grup hatminde cüzleri kişilere dağıtın.";

export const metadata: Metadata = {
  title: seoTitle(title, "Hatim Hesaplama"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const tablo = [7, 15, 30, 40, 60, 90].map((gun) => ({ gun, plan: hatimPlani(gun)! }));
const otuz = hatimPlani(30)!;

const faqItems: FaqItem[] = [
  { question: "30 günde hatim için günde kaç sayfa okunur?", answer: `Günde ${otuz.gunlukSayfa} sayfa, yani yaklaşık 1 cüz. Kur'an ${MUSHAF_SAYFA} sayfa ve ${CUZ_SAYISI} cüzdür.` },
  { question: "Bir cüz kaç sayfa?", answer: "Bir cüz yaklaşık 20 sayfadır; son cüz biraz daha uzundur." },
  { question: "Grup hatmi nasıl dağıtılır?", answer: "30 cüz kişi sayısına olabildiğince eşit bölünür; artan cüzler ilk kişilere birer tane verilir. Örneğin 7 kişide ilk ikisi 5, diğerleri 4 cüz okur." },
];

export default function HatimPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dini-araclar", label: "Dini Araçlar" },
        { href: path, label: "Hatim Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Hatim Hesaplama"
      intro="Kaç günde hatim etmek istediğinizi ve isterseniz okuduğunuz sayfayı girin: günlük sayfa ve cüz miktarını, okuma sürenizi görün. Grup hatmi için cüzleri kişilere dağıtın."
      tool={<HatimHesaplama />}
      related={{ title: "Diğer dini araçlar", links: diniRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "tablo", label: "Hatim süresine göre günlük okuma" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="tablo">Hatim süresine göre günlük okuma</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Hatim süresi</th>
              <th scope="col">Günde sayfa</th>
              <th scope="col">Günde cüz</th>
            </tr>
          </thead>
          <tbody>
            {tablo.map(({ gun, plan }) => (
              <tr key={gun}>
                <td>{gun} gün</td>
                <td>{plan.gunlukSayfa}</td>
                <td>{plan.gunlukCuz.toLocaleString("tr-TR", { maximumFractionDigits: 2 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Hesap {MUSHAF_SAYFA} sayfalık mushafa göredir; günlük sayfa yukarı yuvarlanır. Hangi surenin hangi cüzde olduğunu{" "}
        <Link href="/sure-bulucu">sure bulucu</Link> ile görebilirsiniz.
      </p>
    </TimeToolPage>
  );
}
