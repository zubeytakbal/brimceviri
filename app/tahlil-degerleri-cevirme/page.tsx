import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import LabValueTool from "../components/lab/LabValueTool";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { estimatedAverageGlucose, hba1cToIfcc, LAB_TESTS, toSi } from "../converter/lab/labValues";
import { buildSiteUrl } from "../siteConfig";

const PATH = "/tahlil-degerleri-cevirme";

// Tabloda her tahlil için yuvarlak bir örnek değer (referans aralığı değildir).
const EXAMPLES: Record<string, number> = {
  kolesterol: 200, trigliserid: 150, glukoz: 100, kreatinin: 1, ure: 30, bun: 15, "urik-asit": 6, kalsiyum: 10,
  magnezyum: 2, fosfor: 4, bilirubin: 1, albumin: 4, "total-protein": 7, hemoglobin: 14, demir: 100, b12: 400, folat: 10, "d-vitamini": 30,
};

const fmt = (v: number) => Number(v.toPrecision(4)).toLocaleString("tr-TR", { maximumFractionDigits: 6 });
const test = (id: string) => LAB_TESTS.find((t) => t.id === id)!;

const title = "Tahlil Değerleri mg/dL mmol/L Çevirme";
const description = `Kolesterol, trigliserid, kreatinin, ürik asit, HbA1c ve 15 tahlil daha: 200 mg/dL kolesterol = ${fmt(toSi(test("kolesterol"), 200))} mmol/L, 1 mg/dL kreatinin = 88,4 µmol/L, HbA1c %6,5 = ${Math.round(hba1cToIfcc(6.5))} mmol/mol.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: buildSiteUrl(PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Tahlil sonuçlarında neden farklı birimler var?",
    answer: "Türkiye ve ABD laboratuvarları çoğu değeri kütle birimiyle (mg/dL, g/dL) verir; Avrupa, Kanada ve Avustralya ise uluslararası birim sistemindeki (SI) madde miktarı birimlerini (mmol/L, µmol/L) kullanır. Yurt dışında yapılan bir tahlili, yabancı bir kılavuzu ya da ilaç prospektüsünü okurken birimi çevirmek gerekir.",
  },
  {
    question: "200 mg/dL kolesterol kaç mmol/L?",
    answer: `Kolesterolde mg/dL değeri 0,02586 ile çarpılır (ya da 38,67'ye bölünür): 200 mg/dL = ${fmt(toSi(test("kolesterol"), 200))} mmol/L. Aynı katsayı total, LDL ve HDL kolesterol için geçerlidir; trigliseridde katsayı farklıdır (0,01129).`,
  },
  {
    question: "HbA1c %7 kaç mmol/mol eder?",
    answer: `HbA1c yüzdesi (NGSP) ile mmol/mol (IFCC) arasındaki ilişki doğrusal ama orantılı değildir: IFCC = (% − 2,152) × 10,929. %7 = ${Math.round(hba1cToIfcc(7))} mmol/mol, %6,5 = ${Math.round(hba1cToIfcc(6.5))} mmol/mol. %7 HbA1c son 2–3 ayda ortalama ${Math.round(estimatedAverageGlucose(7))} mg/dL kan şekerine karşılık gelir.`,
  },
  {
    question: "Üre ile BUN aynı şey mi?",
    answer: "Hayır. BUN (kan üre azotu) yalnızca üre molekülündeki azotun ağırlığıdır. Türkiye'deki raporların çoğunda üre verilir; BUN = üre ÷ 2,14. Örneğin 30 mg/dL üre yaklaşık 14 mg/dL BUN'a karşılık gelir. Hesaplayıcıda ikisi ayrı seçenek olarak yer alır.",
  },
  {
    question: "Çevirdiğim değer normal mi?",
    answer: "Bu araç yalnızca birimi çevirir. Referans (normal) aralıkları yaşa, cinsiyete, yönteme ve laboratuvara göre değişir; raporunuzdaki referans aralığını kendi biriminde karşılaştırın ve sonuçlarınızı hekiminizle değerlendirin.",
  },
];

export default function LabValuesPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/hesaplayicilar#klinik", label: "Klinik Skorlar" },
        { href: PATH, label: "Tahlil Değerleri Çevirme" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Tahlil Değerleri Birim Çevirme"
      intro="Kan tahlili sonucunu mg/dL ile mmol/L (ya da µmol/L, g/L) arasında çevirin: kolesterol, trigliserid, glukoz, kreatinin, üre, ürik asit, kalsiyum, bilirubin, hemoglobin, demir, B12, D vitamini ve HbA1c (% ↔ mmol/mol)."
      tool={<LabValueTool />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/kategoriler/kan-sekeri", label: "Kan Şekeri mg/dL ↔ mmol/L" },
          { href: "/kategoriler/vitamin-d", label: "D Vitamini ng/mL ↔ nmol/L" },
          { href: "/kreatinin-klirensi-hesaplama", label: "Kreatinin Klirensi Hesaplama" },
          { href: "/bmi-hesaplama", label: "Vücut Kitle İndeksi" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "tablo", label: "Tahlillere göre çevirme katsayıları" },
        { id: "hba1c", label: "HbA1c: yüzde ve mmol/mol" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="tablo">Tahlillere göre çevirme katsayıları</h2>
      <p>
        Geleneksel birimden SI birimine geçmek için değeri katsayıyla çarpın, ters yönde katsayıya bölün. Katsayı maddenin mol kütlesinden gelir; bu yüzden
        her tahlilin katsayısı farklıdır. Örnek sütunundaki değerler yalnızca hesabı göstermek içindir, referans aralığı değildir.
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Tahlil</th>
              <th>Çevirme</th>
              <th>Örnek</th>
            </tr>
          </thead>
          <tbody>
            {LAB_TESTS.map((t) => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>
                  {t.conventional} × {fmt(t.factor)} = {t.si}
                </td>
                <td>
                  {fmt(EXAMPLES[t.id])} {t.conventional} = {fmt(toSi(t, EXAMPLES[t.id]))} {t.si}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="hba1c">HbA1c: yüzde ve mmol/mol</h2>
      <p>
        HbA1c, kırmızı kan hücrelerindeki hemoglobinin ne kadarının şekere bağlandığını gösterir ve son 2–3 ayın ortalama kan şekerini yansıtır. Türkiye ve
        ABD&apos;de yüzde (NGSP/DCCT), Avrupa&apos;nın birçok ülkesinde mmol/mol (IFCC) olarak raporlanır. İki birim arasındaki ilişki orantılı değildir:
        IFCC (mmol/mol) = (NGSP % − 2,152) × 10,929.
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>HbA1c (%)</th>
              <th>HbA1c (mmol/mol)</th>
              <th>Tahmini ortalama kan şekeri</th>
            </tr>
          </thead>
          <tbody>
            {[5, 5.5, 5.7, 6, 6.5, 7, 7.5, 8, 9, 10, 11, 12].map((p) => (
              <tr key={p}>
                <td>%{fmt(p)}</td>
                <td>{Math.round(hba1cToIfcc(p))}</td>
                <td>
                  {Math.round(estimatedAverageGlucose(p))} mg/dL ({fmt(estimatedAverageGlucose(p) / 18.016)} mmol/L)
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Tahmini ortalama kan şekeri ADAG çalışmasındaki eAG = 28,7 × HbA1c − 46,7 denklemiyle hesaplanır. Bu sayfa yalnızca birim çevirir; tanı ve tedavi
        için sonuçlarınızı laboratuvarınızın referans aralığıyla birlikte hekiminize danışın. Kan şekeri için ayrıntılı tablo{" "}
        <Link href="/kategoriler/kan-sekeri">kan şekeri dönüşümleri</Link> sayfasındadır.
      </p>
    </TimeToolPage>
  );
}
