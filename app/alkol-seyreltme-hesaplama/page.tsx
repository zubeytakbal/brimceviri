import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import AlcoholDilutionCalculator from "../components/AlcoholDilutionCalculator";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "Alkol seyreltme nasıl hesaplanır?",
    answer:
      "Aynı C₁V₁ = C₂V₂ bağıntısı, mol/L yerine yüzde (%) derişimle kullanılır: Stok Derişim (%) × Stok Hacim (mL) = Hedef Derişim (%) × Hedef Hacim (mL). Formül, yüzde derişimlerin ikisi de aynı tanıma (örneğin hacimce %, v/v) dayandığı sürece geçerlidir.",
  },
  {
    question: "%96 alkolden %70 alkol nasıl hazırlanır?",
    answer:
      "Örnek: 1000 mL %70 alkol hazırlamak için, %96'lık stoktan V₁ = (70 × 1000) / 96 ≈ 729 mL alınır ve üzerine su eklenerek 1000 mL'ye tamamlanır.",
  },
  {
    question: "%70 alkol neden yaygın bir dezenfeksiyon standardı?",
    answer:
      "DSÖ (WHO) ve CDC gibi kuruluşlar, etanol bazlı dezenfektanlar için %60-90 aralığını, en sık da %70'i referans gösterir; bu kamuya açık, genel bir halk sağlığı standardıdır. Bu araç bu bilgiyi hesaplamana yardımcı olmak için kullanır, senin özel durumun için hangi derişimin uygun olduğuna karar vermez.",
  },
];

const HEDEFLER = [80, 70, 60, 50, 40];
/** 100 ml %96 alkolden hedef derişimde elde edilen toplam hacim (C1V1 = C2V2). */
const SON = (hedef: number) => (100 * 96) / hedef;
const ml = (x: number) => Math.round(x).toLocaleString("tr-TR");

export const metadata: Metadata = {
  title: "Alkol Seyreltme Hesaplama: %96 Alkolden %70 Nasıl Yapılır?",
  description:
    "Stok alkol derişimi ve hacminden, hedef derişim veya hacimden eksik değeri C₁V₁ = C₂V₂ bağıntısıyla yüzde (%) derişim cinsinden hesapla.",
  alternates: {
    canonical: "/alkol-seyreltme-hesaplama",
  },
  openGraph: {
    title: "Alkol Seyreltme Hesaplama (% Derişim)",
    description: "Yüzde derişimle alkol seyreltme hesabı yap.",
    url: buildSiteUrl("/alkol-seyreltme-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


export default function AlcoholDilutionCalculatorPage() {

  return (
    <AracSayfasi
      yol="/alkol-seyreltme-hesaplama"
      baslik="Alkol Seyreltme Hesaplama"
      hesap={<AlcoholDilutionCalculator />}
      sss={faqItems}
      serbestIcindekiler={[{"id":"96-alkol","baslik":"%96 alkolü seyreltmek: 100 ml'ye ne kadar su?"},{"id":"kaynaklar","baslik":"Kaynaklar"}]}
      serbestIcerik={
        <>
          <h2 id="96-alkol">%96 alkolü seyreltmek: 100 ml&apos;ye ne kadar su?</h2>
          <p>
            En sık yapılan iş, eczaneden alınan %96&apos;lık etil alkolü daha düşük derişime indirmektir. Hesap{" "}
            <strong>başlangıç derişimi × başlangıç hacmi = hedef derişim × son hacim</strong> eşitliğine dayanır: 100 ml %96
            alkol, %70&apos;e indirildiğinde 100 × 96 ÷ 70 ≈ {ml(SON(70))} ml olur, yani yaklaşık {ml(SON(70) - 100)} ml su
            eklenir.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Hedef derişim</th>
                  <th>100 ml %96 alkole eklenecek su</th>
                  <th>Elde edilen</th>
                </tr>
              </thead>
              <tbody>
                {HEDEFLER.map((h) => (
                  <tr key={h}>
                    <td>%{h}</td>
                    <td>{ml(SON(h) - 100)} ml</td>
                    <td>{ml(SON(h))} ml</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Alkol ile su karıştırılınca toplam hacim, iki hacmin toplamından biraz az çıkar (birkaç yüzde). Bu yüzden
            tablodaki su miktarıyla elde edilen sıvı hedeften çok az güçlü olur; derişim önemliyse ölçüyü bir alkolmetreyle
            doğrulayın. Ev kullanımı dışındaki işlerde (laboratuvar, ilaç) üreticinin talimatı esastır.
          </p>
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            Diğer eczacı araçları için{" "}
            <Link href="/hesaplayicilar#kimya">Kimya Hesaplayıcıları</Link>
            {" "}sayfasına bakabilirsin.
          </p>
          <h2 id="kaynaklar">Kaynaklar</h2>
          <p>
            Formül, derişim korunumu ilkesine (C₁V₁ = C₂V₂) dayanır.
            %70 gibi referans değerler DSÖ/CDC gibi kuruluşların kamuya
            açık genel dezenfeksiyon rehberlerinden alınmıştır; bu araç
            tıbbi/eczacılık tavsiyesi yerine geçmez.
          </p>
        </>
      }
    />
  );
}
