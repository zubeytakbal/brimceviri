import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import OkumaPlani from "../components/christian/OkumaPlani";
import TimeToolPage from "../components/time/TimeToolPage";
import { KAPSAMLAR, kapsamKitaplari, type KitapGrubu } from "../converter/christian/kutsalKitap";
import { KITAPLAR } from "../converter/christian/kutsalKitapVeri";
import type { FaqItem } from "../converter/faqSchema";
import { ymdKey } from "../converter/time/dateMath";
import { buildSiteUrl } from "../siteConfig";

// Türkçe Kutsal Kitap okuma planı: Türkiye'deki kiliselerde kullanılan kitap adlarıyla, tarihli günlük okuma listesi.
export const revalidate = 86400;

const path = "/kutsal-kitap-okuma-plani";
const title = "Kutsal Kitap Okuma Planı: Bir Yılda Kutsal Kitap ve İncil Okuma";
const description =
  "Kutsal Kitap'ı 1 yılda, Yeni Antlaşma'yı (İncil) 3 ayda ya da Müjdeleri 30 günde okumak için tarihli günlük okuma planı. 66 kitabın bölüm sayıları ve geride kalınca günde kaç bölüm okunmalı hesabı.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const toplam = (k: typeof KITAPLAR) => k.reduce((t, b) => t + b.bolum, 0);
const TUMU = toplam(KITAPLAR);
const ESKI = kapsamKitaplari(KITAPLAR, "eski");
const YENI = kapsamKitaplari(KITAPLAR, "yeni");
const GRUPLAR = [...new Set(KITAPLAR.map((k) => k.grup))] as KitapGrubu[];
const SURELER = [30, 90, 180, 365];
const tekBolum = KITAPLAR.filter((k) => k.bolum === 1).map((k) => k.ad);
const fmt = (x: number) => x.toLocaleString("tr-TR", { maximumFractionDigits: 1 });

// Derleme günü (Türkiye saati); araç tarayıcıda bugüne geçer.
const DERLEME = new Date(Date.now() + 3 * 3600000);
const derlemeGunu = ymdKey({ year: DERLEME.getUTCFullYear(), month: DERLEME.getUTCMonth() + 1, day: DERLEME.getUTCDate() });

const faqItems: FaqItem[] = [
  {
    question: "Kutsal Kitap kaç kitaptan oluşur?",
    answer: `Protestan kiliselerinin kullandığı Kutsal Kitap ${KITAPLAR.length} kitaptan oluşur: Eski Antlaşma'da ${ESKI.length}, Yeni Antlaşma'da (İncil) ${YENI.length} kitap vardır. Katolik ve Ortodoks kiliselerinin Eski Antlaşma'sında bunlara ek olarak Tobit, Yudit ve Makabeler gibi kitaplar da bulunur.`,
  },
  {
    question: "Kutsal Kitap'ta kaç bölüm var?",
    answer: `Toplam ${fmt(TUMU)} bölüm vardır: Eski Antlaşma ${fmt(toplam(ESKI))}, Yeni Antlaşma ${toplam(YENI)} bölüm. En çok bölümü olan kitap 150 bölümle Mezmurlar'dır. ${tekBolum.join(", ")} tek bölümlük kitaplardır.`,
  },
  {
    question: "Kutsal Kitap bir yılda nasıl okunur?",
    answer: `${fmt(TUMU)} bölüm 365 güne bölününce günde ortalama ${fmt(TUMU / 365)} bölüm eder; yani günde 3 ya da 4 bölüm okuyan biri Kutsal Kitap'ı bir yılda bitirir. Yukarıdaki plan bölümleri günlere eşit dağıtır ve her günün tarihini gösterir.`,
  },
  {
    question: "İncil (Yeni Antlaşma) kaç günde okunur?",
    answer: `Yeni Antlaşma ${toplam(YENI)} bölümdür. Günde 1 bölümle ${toplam(YENI)} günde, günde 3 bölümle yaklaşık ${Math.ceil(toplam(YENI) / 3)} günde biter. Dört Müjde (Matta, Markos, Luka, Yuhanna) toplam ${toplam(kapsamKitaplari(KITAPLAR, "mujdeler"))} bölümdür ve günde 3 bölümle bir ayda okunur.`,
  },
  {
    question: "Plandan geri kaldım, ne yapmalıyım?",
    answer: "Araçtaki \"Plana yetişmek için\" kutusuna şimdiye kadar okuduğunuz bölüm sayısını yazın. Başlangıç tarihine göre kaç bölüm geride olduğunuzu ve planı zamanında bitirmek için kalan günlerde günde kaç bölüm okumanız gerektiğini gösterir.",
  },
];

export default function KutsalKitapOkumaPlaniPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/takvim", label: "Türkiye Takvimi" },
        { href: path, label: "Kutsal Kitap Okuma Planı" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Kutsal Kitap Okuma Planı"
      intro={`Neyi, kaç günde okumak istediğinizi seçin; plan ${fmt(TUMU)} bölümü günlere eşit dağıtır ve her günün okumasını tarihiyle gösterir. Kitap adları Türkçe Kutsal Kitap çevirilerindeki adlardır.`}
      tool={<OkumaPlani kitaplar={KITAPLAR} derlemeGunu={derlemeGunu} />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/paskalya-ne-zaman", label: "Paskalya ne zaman?" },
          { href: "/geri-sayim/noel", label: "Noel'e kaç gün kaldı?" },
          { href: "/ozel-gunler#kat-hristiyan", label: "Hristiyan bayramları" },
          { href: "/takvim", label: "Türkiye Takvimi" },
          { href: "/iki-tarih-arasi-gun-hesaplama", label: "İki tarih arası gün hesaplama" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "hiz", label: "Günde kaç bölüm okumalı?" },
        { id: "kitaplar", label: "Kutsal Kitap'ın kitapları ve bölüm sayıları" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="hiz">Günde kaç bölüm okumalı?</h2>
      <p>Seçtiğiniz bölümü belli bir sürede bitirmek için günde ortalama okunması gereken bölüm sayısı:</p>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Okunacak</th>
              <th scope="col">Bölüm</th>
              {SURELER.map((g) => (
                <th scope="col" key={g}>
                  {g} gün
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {KAPSAMLAR.map((k) => {
              const b = toplam(kapsamKitaplari(KITAPLAR, k.id));
              return (
                <tr key={k.id}>
                  <td>{k.ad}</td>
                  <td>{fmt(b)}</td>
                  {SURELER.map((g) => (
                    <td key={g}>{b <= g ? "1 (erken biter)" : fmt(b / g)}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 id="kitaplar">Kutsal Kitap&apos;ın kitapları ve bölüm sayıları</h2>
      <p>
        Eski Antlaşma {ESKI.length} kitap ve {fmt(toplam(ESKI))} bölüm, Yeni Antlaşma {YENI.length} kitap ve {toplam(YENI)} bölümdür. Kitaplar
        aşağıda Kutsal Kitap&apos;taki sırasıyla ve geleneksel gruplarına göre listelenmiştir.
      </p>
      {GRUPLAR.map((g) => {
        const liste = KITAPLAR.filter((k) => k.grup === g);
        return (
          <section key={g} className="kitap-grubu">
            <h3>
              {g} <small>({liste.length} kitap, {toplam(liste)} bölüm)</small>
            </h3>
            <p className="kitap-listesi">
              {liste.map((k) => (
                <span key={k.sira}>
                  {k.ad} <small>{k.bolum}</small>
                </span>
              ))}
            </p>
          </section>
        );
      })}
      <p>
        Paskalya ve Noel gibi hareketli ve sabit Hristiyan bayramlarının tarihleri için <Link href="/paskalya-ne-zaman">Paskalya ne zaman?</Link>{" "}
        sayfasına ve <Link href="/ozel-gunler#kat-hristiyan">Hristiyan bayramları</Link> listesine bakabilirsiniz.
      </p>
    </TimeToolPage>
  );
}
