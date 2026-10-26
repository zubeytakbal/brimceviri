import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import SofaCalculator from "../components/SofaCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "SOFA skoru ne için kullanılır?",
    answer:
      "SOFA (Sequential Organ Failure Assessment), yoğun bakımda 6 organ sisteminin (solunum, koagülasyon, karaciğer, kardiyovasküler, santral sinir sistemi, böbrek) fonksiyon bozukluğunu 0-4 puan üzerinden değerlendiren, organ yetmezliği ciddiyetini izlemek için kullanılan kapsamlı bir skordur.",
  },
  {
    question: "SOFA puanları nereden gelir?",
    answer:
      "Her alt sistem için standart klinik/laboratuvar kriter aralıklarından (örneğin PaO2/FiO2 oranı, trombosit sayısı, bilirubin, GKS, kreatinin) uygun puan seçilir; bu araç seçtiğin puanları toplar, laboratuvar hesabı yapmaz.",
  },
];

export const metadata: Metadata = {
  title: "SOFA Skoru Hesaplama (Organ Yetmezliği)",
  description:
    "6 organ sisteminin (solunum, koagülasyon, karaciğer, kardiyovasküler, SSS, böbrek) puanlarını seç: SOFA toplam skorunu hesapla.",
  alternates: { canonical: "/sofa-skoru-hesaplama" },
  openGraph: {
    title: "SOFA Skoru Hesaplama (Organ Yetmezliği)",
    description: "SOFA toplam skorunu hesaplayın.",
    url: buildSiteUrl("/sofa-skoru-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function SofaPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "SOFA Skoru Hesaplama", item: buildSiteUrl("/sofa-skoru-hesaplama") },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>SOFA Skoru Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>SOFA Skoru Hesaplama</h1>
          <p>
            6 organ sisteminin puanlarını seç: SOFA (Sequential Organ
            Failure Assessment) toplam skorunu anında hesapla.
          </p>
        </header>

        <SofaCalculator />

        <section className="category-article-content">
          <h2 id="yorum">SOFA skoru nasıl değerlendirilir?</h2>
          <p>
            SOFA, altı organ sisteminin her birine 0–4 puan vererek 0–24 arası bir toplam üretir; yüksek puan daha ağır organ
            yetmezliği demektir. Skorun en sık kullanıldığı yer sepsis tanımıdır: 2016&apos;da yayımlanan Sepsis-3
            uzlaşısına göre, enfeksiyon şüphesi olan bir hastada SOFA puanında başlangıca göre <strong>2 ya da daha fazla
            artış</strong> sepsis olarak kabul edilir. Önceden bilinen organ yetmezliği yoksa başlangıç puanı 0 sayılır.
          </p>
          <p>
            Tek bir ölçümden çok puanın zaman içindeki seyri anlamlıdır; yoğun bakımda SOFA genellikle 24 saatte bir
            yeniden hesaplanır. Yatak başında hızlı tarama için laboratuvar gerektirmeyen{" "}
            <Link href="/qsofa-hesaplama">qSOFA</Link> kullanılır. Bu araç klinik değerlendirmenin yerine geçmez.
          </p>

          <h2 id="esikler">Organ sistemlerine göre puan eşikleri</h2>
          <p>Vincent ve arkadaşlarının 1996&apos;da tanımladığı SOFA tablosuna göre her sistem 0–4 puan alır:</p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Sistem ve ölçüt</th>
                  <th>Puan eşikleri</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Solunum</strong>: PaO2/FiO2 (mmHg)
                  </td>
                  <td>1: &lt;400 · 2: &lt;300 · 3: &lt;200* · 4: &lt;100*</td>
                </tr>
                <tr>
                  <td>
                    <strong>Pıhtılaşma</strong>: Trombosit (×10³/µL)
                  </td>
                  <td>1: &lt;150 · 2: &lt;100 · 3: &lt;50 · 4: &lt;20</td>
                </tr>
                <tr>
                  <td>
                    <strong>Karaciğer</strong>: Bilirubin (mg/dL)
                  </td>
                  <td>1: 1,2–1,9 · 2: 2,0–5,9 · 3: 6,0–11,9 · 4: ≥12</td>
                </tr>
                <tr>
                  <td>
                    <strong>Dolaşım</strong>: Ortalama arter basıncı ve vazopressör
                  </td>
                  <td>1: OAB &lt;70 · 2: dopamin ≤5 ya da dobutamin · 3: dopamin &gt;5, adrenalin ya da noradrenalin ≤0,1 · 4: dopamin &gt;15, adrenalin ya da noradrenalin &gt;0,1 (µg/kg/dk)</td>
                </tr>
                <tr>
                  <td>
                    <strong>Sinir sistemi</strong>: Glasgow Koma Skalası
                  </td>
                  <td>1: 13–14 · 2: 10–12 · 3: 6–9 · 4: &lt;6</td>
                </tr>
                <tr>
                  <td>
                    <strong>Böbrek</strong>: Kreatinin (mg/dL) ya da idrar
                  </td>
                  <td>1: 1,2–1,9 · 2: 2,0–3,4 · 3: 3,5–4,9 ya da &lt;500 mL/gün · 4: ≥5,0 ya da &lt;200 mL/gün</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <small>* Solunum desteği altındayken. Bilinç puanı için <Link href="/glasgow-koma-skalasi-hesaplama">Glasgow Koma Skalası</Link> hesaplanabilir.</small>
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>SOFA skoru ne için kullanılır?</strong>
            <br />
            SOFA, yoğun bakımda 6 organ sisteminin fonksiyon
            bozukluğunu 0-4 puan üzerinden değerlendiren, organ
            yetmezliği ciddiyetini izlemek için kullanılan kapsamlı
            bir skordur.
          </p>
          <p>
            <strong>SOFA puanları nereden gelir?</strong>
            <br />
            Her alt sistem için standart klinik/laboratuvar kriter
            aralıklarından (örneğin PaO2/FiO2 oranı, trombosit
            sayısı, bilirubin, GKS, kreatinin) uygun puan seçilir; bu
            araç seçtiğin puanları toplar.
          </p>

          <h2>Diğer Risk Skorlama Araçları</h2>
          <ul className="related-conversion-list">
            <li><Link href="/qsofa-hesaplama">qSOFA Hesaplama</Link></li>
            <li><Link href="/glasgow-koma-skalasi-hesaplama">Glasgow Koma Skalası Hesaplama</Link></li>
            <li><Link href="/meld-skoru-hesaplama">MELD Skoru Hesaplama</Link></li>
            <li><Link href="/wells-skoru-hesaplama">Wells Skoru Hesaplama</Link></li>
            <li><Link href="/cha2ds2-vasc-skoru-hesaplama">CHA2DS2-VASc Skoru Hesaplama</Link></li>
          </ul>

          <h2>İlgili araçlar</h2>
          <p>
            Hızlı sepsis taraması için{" "}
            <Link href="/qsofa-hesaplama">qSOFA Hesaplama</Link>, diğer
            doktor ve hemşire araçları için{" "}
            <Link href="/hesaplayicilar#klinik">Klinik Skorlar</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Skor, Vincent JL ve ark. (1996) tarafından geliştirilmiş
            ve Sepsis-3 (2016) tanımlarında güncellenmiştir. Bu araç
            tıbbi tavsiye yerine geçmez; klinik karar için bir hekime
            danışılmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
