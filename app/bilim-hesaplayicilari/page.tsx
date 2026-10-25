import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { BILIM_ARAMA, BILIM_GRUPLARI } from "../components/bilim/bilimListeleri";
import HesapHubHero from "../components/hesap/HesapHubHero";
import { DecorativeIcon, type SiteIconName } from "../components/siteIcons";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const aracSayisi = BILIM_GRUPLARI.reduce((t, g) => t + g.linkler.length, 0);

const description = `Kimya, matematik ve gökcisimleri için ${aracSayisi} araç: mol, periyodik tablo, EBOB-EKOK, denklem çözme, olasılık ve gezegen karşılaştırmaları. Adım adım çözümlü, ücretsiz.`;

export const metadata: Metadata = {
  title: "Bilim Hesaplayıcıları",
  description,
  alternates: {
    canonical: "/bilim-hesaplayicilari",
  },
  openGraph: {
    title: "Bilim Hesaplayıcıları",
    description,
    url: buildSiteUrl("/bilim-hesaplayicilari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

const IKON: Record<string, SiteIconName> = {
  matematik: "mathCalculator",
  kimya: "chemistryCalculator",
  gokcisimleri: "physicsCalculator",
};

const ACIKLAMA: Record<string, string> = {
  matematik: "Sayılar ve bölünebilme, yüzde, denklemler, istatistik ve olasılık; geometride Pisagor teoremi. Her araç sonuca giden adımları da gösterir.",
  kimya: "Mol ve atom kütlesi hesapları, pil potansiyeli; 118 elementin periyodik tablosu, yaygın bileşiklerin molar kütleleri ve kodon tablosu.",
  gokcisimleri: "Gezegenlerin ve uyduların çapı, kütlesi ve yerçekimi; iki gökcismini yan yana karşılaştırma ve kilonun her gezegende kaç kilo ettiği.",
};

const siPrefixTable = [
  ["Tera", "T", "10¹²"],
  ["Giga", "G", "10⁹"],
  ["Mega", "M", "10⁶"],
  ["Kilo", "k", "10³"],
  ["Hekto", "h", "10²"],
  ["Deka", "da", "10¹"],
  ["Desi", "d", "10⁻¹"],
  ["Santi", "c", "10⁻²"],
  ["Mili", "m", "10⁻³"],
  ["Mikro", "µ", "10⁻⁶"],
  ["Nano", "n", "10⁻⁹"],
  ["Piko", "p", "10⁻¹²"],
];

const faq: FaqItem[] = [
  {
    question: "Hesaplamalar nerede yapılıyor?",
    answer: "Hesaplamalar tarayıcınızda yapılır; girdiğiniz sayılar bir sunucuya gönderilmez ve kayıt gerekmez.",
  },
  {
    question: "Araçlar çözümü adım adım gösteriyor mu?",
    answer:
      "Evet. EBOB-EKOK'ta asal çarpanlara ayırma, ikinci dereceden denklemde diskriminant, denklem sistemlerinde her çözüm adımı ve mol hesabında kullanılan formül sonucu ile birlikte gösterilir.",
  },
  {
    question: "Periyodik tablodaki her elementin ayrı sayfası var mı?",
    answer:
      "Tablo 118 elementin atom numarasını, atom kütlesini, periyodunu ve grubunu gösterir. Karbon, hidrojen, oksijen ve demir gibi sık aranan elementlerin ayrıca kullanım alanlarını da anlatan kendi sayfası vardır.",
  },
];

export default function BilimHesaplayicilariHubPage() {
  const araclar = BILIM_ARAMA.map((o) => ({ href: o.href, ad: o.ad, grup: o.ulke }));

  return (
    <TimeToolPage
      crumbs={[{ href: "/", label: "Ana Sayfa" }, { label: "Bilim Hesaplayıcıları" }]}
      crumbLabel="Sayfa yolu"
      title="Bilim Hesaplayıcıları"
      intro="Matematik ödevinden kimya sorusuna, gezegenlerin büyüklüğünden periyodik tabloya kadar öğrencilerin en çok baktığı hesaplar tek yerde. Araçlar ücretsizdir, kayıt istemez ve sonuca giden adımları da gösterir."
      tool={
        <HesapHubHero
          araclar={araclar}
          gruplar={BILIM_GRUPLARI.map((g) => ({ id: g.id, baslik: g.baslik, sayi: g.linkler.length }))}
          metin={{
            etiket: "bilim aracı",
            ara: "Bilim aracı, element ya da gökcismi ara",
            ornek: "Ne arıyorsunuz? Örn. ebob, mol, karbon, mars",
            yok: "Bu aramaya uyan araç ya da sayfa bulunamadı.",
            birim: "araç",
          }}
        />
      }
      tocTitle="İçindekiler"
      tocItems={[
        ...BILIM_GRUPLARI.map((g) => ({ id: g.id, label: g.baslik })),
        { id: "si-onekleri", label: "SI önekleri" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faq}
    >
      {BILIM_GRUPLARI.map((g) => (
        <section key={g.id} className="hesap-hub-grup">
          <h2 id={g.id}>
            <span className="home-category-icon-box" aria-hidden="true">
              <DecorativeIcon className="home-category-icon-svg" name={IKON[g.id]} size={26} />
            </span>
            {g.baslik}
            <small>{g.linkler.length} araç</small>
          </h2>
          <p>{ACIKLAMA[g.id]}</p>
          <ul className="timehub-group hesap-hub-kartlar">
            {g.linkler.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>
                  <strong>{l.label}</strong>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="category-article-content">
        <h2 id="si-onekleri">SI Önekleri (Kilo, Mega, Mili, Mikro...)</h2>
        <p>Fizik ve kimya derslerinde sıkça karşılaşılan SI (Uluslararası Birim Sistemi) önekleri ve kaç katı ifade ettikleri:</p>
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <caption>SI önekleri ve ondalık karşılıkları</caption>
            <thead>
              <tr>
                <th scope="col">Önek</th>
                <th scope="col">Simge</th>
                <th scope="col">Çarpan</th>
              </tr>
            </thead>
            <tbody>
              {siPrefixTable.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => (
                    <td key={`${row[0]}-${index}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Örneğin 1 kilometre (km) = 10³ metre = 1000 metre, 1 milimetre (mm) = 10⁻³ metre. Bu önekler yalnızca uzunlukta değil; kütle (kg, mg), hacim
          (kL, mL), elektrik (kV, mA) ve diğer tüm SI birimlerinde aynı mantıkla kullanılır.
        </p>
      </section>
    </TimeToolPage>
  );
}
