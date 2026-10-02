import type { Metadata } from "next";
import { UmreMesafe } from "../components/dini/DiniAraclar";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { umreMesafe } from "../converter/diniHesaplar";
import { diniRelated } from "../i18n/diniAraclar";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/umre-mesafe-hesaplama";
const title = "Umre Mesafe Hesaplama: Tavaf ve Sa'y Kaç Km?";
const description = "Tavaf ve sa'y kaç km, kaç adım, kaç dakika sürer? Kâbe'ye uzaklığınıza göre bir şavt ve toplam yürüyüş mesafesini hesaplayın.";

export const metadata: Metadata = {
  title: seoTitle(title, "Umre Mesafe Hesaplama"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const fmt = (n: number) => Math.round(n).toLocaleString("tr-TR");
const ornek = (d: number) => umreMesafe({ duvaraUzaklikM: d, tavafSayisi: 1, sayYapilacak: false, safaMerveM: 400, adimCm: 70, hizKmSaat: 3 })!;
const yakin = ornek(3);
const orta = ornek(15);
const kenar = ornek(35);
const say400 = umreMesafe({ duvaraUzaklikM: 0, tavafSayisi: 0, sayYapilacak: true, safaMerveM: 400, adimCm: 70, hizKmSaat: 3 })!;
// Tavaf + sa'y en kısa (Kâbe'ye yakın, Safâ–Merve 394 m) ve en uzun (Mataf kenarı, 450 m) hâl.
const enKisa = umreMesafe({ duvaraUzaklikM: 3, tavafSayisi: 1, sayYapilacak: true, safaMerveM: 394, adimCm: 70, hizKmSaat: 3 })!;
const enUzun = umreMesafe({ duvaraUzaklikM: 35, tavafSayisi: 1, sayYapilacak: true, safaMerveM: 450, adimCm: 70, hizKmSaat: 3 })!;
const km = (m: number) => (Math.round(m / 100) / 10).toLocaleString("tr-TR");

const faqItems: FaqItem[] = [
  {
    question: "Tavaf kaç metre?",
    answer: `Kâbe'nin yakınından (~3 m) bir şavt yaklaşık ${fmt(yakin.tavafSavtM)} m, 7 şavtlık tavaf ${fmt(yakin.tavafToplamM)} m'dir. Mataf ortasından (~15 m) tavaf ${fmt(orta.tavafToplamM)} m, kenarından (~35 m) ${fmt(kenar.tavafToplamM)} m tutar.`,
  },
  {
    question: "Sa'y kaç km?",
    answer: `Safâ ile Merve arası kaynaklarda 394 ile 450 m arasında verilir. 400 m kabul edilirse 7 şavtlık sa'y ${fmt(say400.sayToplamM)} m, yani yaklaşık ${(say400.sayToplamM / 1000).toLocaleString("tr-TR")} km'dir.`,
  },
  {
    question: "Umre kaç km yürüyüş demek?",
    answer: `Tavaf ve sa'y birlikte, Kâbe'ye uzaklığa ve Safâ–Merve mesafesine göre yaklaşık ${km(enKisa.toplamM)} ile ${km(enUzun.toplamM)} km arasındadır. Üst katlarda tavaf daha uzundur; kalabalıkta yürüme hızı düştüğü için süre uzar.`,
  },
];

export default function UmreMesafePage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dini-araclar", label: "Dini Araçlar" },
        { href: path, label: "Umre Mesafe Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Umre Mesafe Hesaplama"
      intro="Kâbe'ye ne kadar uzaktan tavaf yapacağınızı seçin: bir şavtın uzunluğunu, tavaf ve sa'y toplam mesafesini, yaklaşık adım sayısını ve süreyi görün."
      tool={<UmreMesafe />}
      related={{ title: "Diğer dini araçlar", links: diniRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "hesap", label: "Nasıl hesaplanır?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="hesap">Nasıl hesaplanır?</h2>
      <p>
        Tavafta Kâbe yaklaşık bir daire kabul edilir: Kâbe'nin merkezinden duvarına yaklaşık 6 m vardır. Bir şavt, yarıçapı “duvara uzaklık + 6
        m” olan dairenin çevresidir (2 × π × r); tavaf 7 şavttır. Kâbe'ye yaklaştıkça şavt kısalır, Mataf'ın kenarına ve üst katlara çıktıkça
        uzar. Sa'y, Safâ ile Merve arasında 7 kez yürümektir; bu mesafe kaynaklarda 394 ile 450 m arasında geçtiği için alanı kendiniz
        değiştirebilirsiniz.
      </p>
      <p>
        Sonuçlar yaklaşıktır: kalabalıkta yol uzar, hız düşer. Adım sayısı adım uzunluğunuza bağlıdır; ortalama bir yetişkin için 65–75 cm
        tipiktir.
      </p>
    </TimeToolPage>
  );
}
