import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { HafizlikHesaplama } from "../components/dini/DiniAraclar3";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { hafizlikPlani, MUSHAF_SAYFA } from "../converter/diniHesaplar";
import { diniRelated } from "../i18n/diniAraclar";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/hafizlik-hesaplama";
const title = "Hafızlık Hesaplama: Günde Kaç Sayfa ile Kaç Ayda Hafız Olunur?";
const description = "Günde kaç sayfa ezberlerseniz kaç ayda hafız olursunuz? Haftalık ezber günü ve ezberlediğiniz sayfalarla hafızlık süresini ve bitiş tarihini hesaplayın.";

export const metadata: Metadata = {
  title: seoTitle(title, "Hafızlık Hesaplama: Kaç Ayda Hafız Olunur?", "Hafızlık Hesaplama"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const ay = (sayfa: number, hafta: number) => hafizlikPlani(sayfa, hafta)!.ay.toLocaleString("tr-TR", { maximumFractionDigits: 1 });
const bir7 = hafizlikPlani(1, 7)!;
const tablo: Array<[number, number]> = [
  [0.5, 6],
  [1, 6],
  [2, 6],
  [3, 6],
  [5, 6],
  [10, 6],
];

const faqItems: FaqItem[] = [
  {
    question: "Günde 1 sayfa ezberleyen kaç ayda hafız olur?",
    answer: `Mushaf ${MUSHAF_SAYFA} sayfadır. Her gün 1 sayfa ezberleyen ${bir7.ezberGunu} günde, yani yaklaşık ${ay(1, 7)} ayda bitirir. Haftada 6 gün ezber yapılırsa yaklaşık ${ay(1, 6)} ay sürer.`,
  },
  {
    question: "Günde 2 sayfa ile hafızlık kaç ay sürer?",
    answer: `Haftada 6 gün günde 2 sayfa ezberleyen yaklaşık ${ay(2, 6)} ayda, her gün ezberleyen yaklaşık ${ay(2, 7)} ayda biter.`,
  },
  {
    question: "Hafızlık ortalama kaç yılda biter?",
    answer:
      "Hafızlık kurslarında öğrencinin hızına göre genellikle 1–3 yıl sürer. Yeni ezberin yanında eski cüzlerin her gün tekrar edilmesi gerektiği için gerçek süre, salt ezber süresinden uzundur.",
  },
];

export default function HafizlikPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dini-araclar", label: "Dini Araçlar" },
        { href: path, label: "Hafızlık Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Hafızlık Hesaplama"
      intro="Günde kaç sayfa ve haftada kaç gün ezber yapacağınızı yazın: hafızlığın kaç ay süreceğini ve tahmini bitiş tarihini görün. Ya da hedef sürenizi yazıp günde kaç sayfa ezberlemeniz gerektiğini bulun."
      tool={<HafizlikHesaplama />}
      related={{ title: "Diğer dini araçlar", links: diniRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "tablo", label: "Günlük sayfaya göre hafızlık süresi" },
        { id: "hesap", label: "Nasıl hesaplanır?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="tablo">Günlük sayfaya göre hafızlık süresi</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Günde ezber</th>
              <th scope="col">Haftada 6 gün</th>
              <th scope="col">Her gün</th>
            </tr>
          </thead>
          <tbody>
            {tablo.map(([sayfa]) => (
              <tr key={sayfa}>
                <td>{sayfa.toLocaleString("tr-TR")} sayfa</td>
                <td>≈ {ay(sayfa, 6)} ay</td>
                <td>≈ {ay(sayfa, 7)} ay</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 id="hesap">Nasıl hesaplanır?</h2>
      <p>
        Diyanet mushafı {MUSHAF_SAYFA} sayfa ve 30 cüzdür; bir sayfa 15 satırdır. Kalan sayfa sayısı günlük ezbere bölünerek ezber günü bulunur.
        Haftada 7 günden az ezber yapılıyorsa aradaki günler tekrar ve dinlenme günü sayılır ve süre takvim gününe çevrilir. Ay, ortalama 30,44
        gün kabul edilir. Sonuç yalnızca yeni ezberin süresidir; hastalık, tatil ve toplu tekrar (sağlamlaştırma) dönemleri ayrıca eklenmelidir.
        Ezberlediğiniz cüzleri ve sureleri <Link href="/sure-bulucu">sure bulucu</Link> ile, okuma planınızı{" "}
        <Link href="/hatim-hesaplama">hatim hesaplama</Link> ile çıkarabilirsiniz.
      </p>
    </TimeToolPage>
  );
}
