import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { HatimDagitici } from "../components/dini/KuranAraclari";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { ayetId, cuzAraligi, parcalara, parcaMetni, sayfaOf } from "../converter/kuranPlan";
import { SURELER } from "../converter/sureler";
import { CUZ_CEYREKLERI } from "../converter/sureMeta";
import { diniRelated } from "../i18n/diniAraclar";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/cuzler";
const title = "Cüzler ve Hatim Dağıtımı: 30 Cüz Nerede Başlar?";
const description =
  "Kur'an-ı Kerim'in 30 cüzünün başladığı ve bittiği ayetler, hizb ve çeyrek başları, Medine mushafındaki sayfaları. Hatim ya da bir cüzü kişi sayısına göre eşit sayfalarla paylaştırın.";

export const metadata: Metadata = {
  title: seoTitle(title, "Cüzler ve Hatim Dağıtımı"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const ad = (no: number) => SURELER[no - 1].ad;
const yer = ([s, a]: [number, number]) => `${ad(s)} ${a}`;

const CUZLER = Array.from({ length: 30 }, (_, i) => {
  const cuz = i + 1;
  const [ilk, son] = cuzAraligi(cuz);
  return { cuz, ilk, son, parcalar: parcalara(ilk, son), sayfaBas: sayfaOf(ilk), sayfaSon: sayfaOf(son), ceyrekler: CUZ_CEYREKLERI[i] };
});

const enUzun = [...CUZLER].sort((a, b) => b.son - b.ilk - (a.son - a.ilk))[0];
const enKisa = [...CUZLER].sort((a, b) => a.son - a.ilk - (b.son - b.ilk))[0];

const faqItems: FaqItem[] = [
  {
    question: "Bir cüz kaç sayfadır?",
    answer:
      "Medine mushafında cüzlerin çoğu 20 sayfadır; 1. cüz Fatiha ile birlikte 21, 30. cüz 23 sayfa tutar. Ayet sayısı ise cüzden cüze çok değişir, çünkü sondaki surelerin ayetleri kısadır.",
  },
  {
    question: "Hizb ve çeyrek (rub) nedir?",
    answer:
      "Her cüz iki hizbe, her hizb de dört çeyreğe ayrılır; böylece bir cüz 8 çeyrek, Kur'an'ın tamamı 240 çeyrek olur. Mukabele ve hatimlerde okuma paylaşılırken bu bölümler kullanılır.",
  },
  {
    question: "Hatim dağıtıcısı nasıl böler?",
    answer:
      "Seçilen bölüm Medine mushafının sayfalarına göre kişi sayısına eşit bölünür; sayfa sayısı tam bölünmüyorsa ilk kişilere birer sayfa fazla düşer. Ayet sayısıyla bölmek adil olmaz, çünkü ayet uzunlukları çok farklıdır.",
  },
];

export default function CuzlerPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dini-araclar", label: "Dini Araçlar" },
        { href: path, label: "Cüzler ve Hatim Dağıtımı" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Cüzler ve Hatim Dağıtımı"
      intro="Hatmin tamamını ya da tek bir cüzü seçin, kaç kişinin okuyacağını yazın: herkesin hangi sayfaları ve ayetleri okuyacağı eşit paylarla çıkar."
      tool={<HatimDagitici />}
      related={{ title: "Diğer dini araçlar", links: diniRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "cuzler", label: "30 cüz tablosu" },
        { id: "ceyrekler", label: "Hizb ve çeyrek başları" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="cuzler">30 cüz tablosu</h2>
      <p>
        Ayet sayısına göre en uzun cüz {enUzun.cuz}. cüz ({enUzun.son - enUzun.ilk + 1} ayet), en kısası {enKisa.cuz}. cüzdür (
        {enKisa.son - enKisa.ilk + 1} ayet). Sayfalar Medine mushafına göredir. Sure bilgileri için{" "}
        <Link href="/sure-bulucu">Sure Bulucu</Link>.
      </p>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Cüz</th>
              <th scope="col">İçerdiği sureler</th>
              <th scope="col">Ayet</th>
              <th scope="col">Sayfa</th>
            </tr>
          </thead>
          <tbody>
            {CUZLER.map((c) => (
              <tr key={c.cuz} id={`cuz-${c.cuz}`}>
                <th scope="row">{c.cuz}.</th>
                <td>{parcaMetni(c.parcalar)}</td>
                <td>{c.son - c.ilk + 1}</td>
                <td>
                  {c.sayfaBas}–{c.sayfaSon}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="ceyrekler">Hizb ve çeyrek başları</h2>
      <p>
        Her cüzün 8 çeyreğinin başladığı ayet. 1. ve 5. çeyrekler aynı zamanda hizb başıdır; Kur&apos;an&apos;ın tamamında
        60 hizb ve 240 çeyrek vardır.
      </p>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Cüz</th>
              <th scope="col">1. hizb (çeyrekler)</th>
              <th scope="col">2. hizb (çeyrekler)</th>
            </tr>
          </thead>
          <tbody>
            {CUZLER.map((c) => (
              <tr key={c.cuz}>
                <th scope="row">{c.cuz}.</th>
                <td>{c.ceyrekler.slice(0, 4).map(yer).join(" · ")}</td>
                <td>{c.ceyrekler.slice(4).map(yer).join(" · ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Örneğin 1. cüzün ikinci hizbi Bakara {CUZLER[0].ceyrekler[4][1]}. ayette, Medine mushafının{" "}
        {sayfaOf(ayetId(...CUZLER[0].ceyrekler[4]))}. sayfasında başlar.
      </p>
    </TimeToolPage>
  );
}
