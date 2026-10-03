import type { Metadata } from "next";
import TimeToolPage from "../components/time/TimeToolPage";
import YasHesaplama from "../components/YasHesaplama";
import type { FaqItem } from "../converter/faqSchema";
import { dogumYilinaGoreYas, yasBilgisi } from "../converter/yasHesap";
import { buildSiteUrl } from "../siteConfig";

const path = "/yas-hesaplama";
const title = "Yaş Hesaplama: Kaç Yaşındayım? Yıl, Ay, Gün ve Yaş Farkı";
const description =
  "Doğum tarihini gir: kaç yaşında olduğunu yıl, ay ve gün olarak, kaç gün yaşadığını ve doğum gününe kaç gün kaldığını gör. İki kişi arası yaş farkı ve prematüre bebekler için düzeltilmiş yaş.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

export default function YasHesaplamaPage() {
  const now = new Date();
  const yil = now.getUTCFullYear();
  const initialDate = `${yil}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-${String(now.getUTCDate()).padStart(2, "0")}`;
  const ornek = yasBilgisi({ year: 2000, month: 1, day: 1 }, { year: yil, month: now.getUTCMonth() + 1, day: now.getUTCDate() })!;
  const yillar = Array.from({ length: yil - 1950 }, (_, i) => yil - 1 - i);

  const faqItems: FaqItem[] = [
    {
      question: "Yaşımı nasıl hesaplarım?",
      answer:
        "Bulunduğun yıldan doğum yılını çıkar; bu yılki doğum günün henüz gelmediyse sonuçtan 1 düş. Ay ve gün için de aynı mantık geçerlidir: doğum gününden bugüne kaç tam ay geçtiğini, kalan günleri sayarsın. Hesaplayıcı ay uzunluklarını (28–31 gün) ve artık yılları kendisi hesaba katar.",
    },
    {
      question: `2000 doğumlu kaç yaşında?`,
      answer: `${yil} yılında 2000 doğumlu biri doğum günü geldiyse ${dogumYilinaGoreYas(2000, yil).geldiyse}, gelmediyse ${dogumYilinaGoreYas(2000, yil).gelmediyse} yaşındadır. Aşağıdaki tabloda 1950'den bu yana her doğum yılının karşılığını bulabilirsin.`,
    },
    {
      question: "Kaç gün yaşadım?",
      answer: `Doğum tarihini girdiğinde "Toplam yaşadığınız" kutusunda gün, hafta, ay ve saat olarak görünür. Örneğin 1 Ocak 2000'de doğan biri bugün ${ornek.toplamGun.toLocaleString("tr-TR")} günlüktür.`,
    },
    {
      question: "Aramızda kaç yaş var, nasıl hesaplanır?",
      answer:
        "\"İki kişi arası yaş farkı\" sekmesine iki doğum tarihini gir; aradaki fark yıl, ay ve gün olarak ve kimin daha büyük olduğu gösterilir. Yalnızca doğum yıllarını çıkarmak doğum günleri farklı aylardaysa bir yıla kadar yanıltabilir.",
    },
    {
      question: "Düzeltilmiş yaş nedir?",
      answer:
        "Prematüre doğan bebeklerde gelişim takibi için kullanılan yaştır: bebeğin takvim yaşından, 40 haftadan ne kadar erken doğduysa o kadar hafta düşülür. 32. haftada doğan 6 aylık bir bebeğin düzeltilmiş yaşı yaklaşık 4 aydır. Genellikle 2 yaşına kadar kullanılır; aşılar ise takvim yaşına göre yapılır.",
    },
    {
      question: "29 Şubat doğumlular ne zaman yaş alır?",
      answer: "Artık yıl olmayan yıllarda 29 Şubat bulunmadığı için hesaplayıcı yaşı 28 Şubat'ta tamamlanmış sayar; bazı kurumlar 1 Mart'ı esas alır.",
    },
    {
      question: "Excel'de yaş nasıl hesaplanır?",
      answer:
        "Doğum tarihi A2 hücresindeyse Türkçe Excel'de =ETARİHLİ(A2;BUGÜN();\"Y\") tam yılı verir; İngilizce Excel'de aynı formül =DATEDIF(A2,TODAY(),\"Y\") şeklindedir. Ay için \"YM\", gün için \"MD\" kullanılır.",
    },
  ];

  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/hesaplayicilar", label: "Hesaplayıcılar" },
        { href: path, label: "Yaş Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Yaş Hesaplama: Kaç Yaşındayım?"
      intro="Doğum tarihini girin; yaşınızı yıl, ay ve gün olarak, toplam kaç gün yaşadığınızı ve bir sonraki doğum gününüze kaç gün kaldığını görün. İki kişi arasındaki yaş farkını ve prematüre bebeklerin düzeltilmiş yaşını da hesaplayabilirsiniz."
      tool={<YasHesaplama initialDate={initialDate} />}
      related={{
        title: "İlgili araçlar",
        links: [
          { href: "/hicri-yas-hesaplama", label: "Hicri Yaş Hesaplama" },
          { href: "/dogdugum-gun-hangi-gun", label: "Doğduğum Gün Hangi Gündü?" },
          { href: "/iki-tarih-arasi-gun-hesaplama", label: "İki Tarih Arası Gün Hesaplama" },
          { href: "/gebelik-haftasi-hesaplama", label: "Gebelik Haftası Hesaplama" },
          { href: "/tarihe-gun-ekleme", label: "Tarihe Gün Ekleme" },
          { href: "/geri-sayim", label: "Geri Sayım" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "tablo", label: `Doğum yılına göre yaş (${yil})` },
        { id: "excel", label: "Excel'de yaş hesaplama" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="tablo">Doğum yılına göre yaş ({yil})</h2>
      <p>
        {yil} yılında kaç yaşında olduğunuzu doğum yılınızdan bulun: doğum gününüz bu yıl geldiyse ilk sütun, henüz gelmediyse ikinci sütun geçerlidir.
      </p>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Doğum yılı</th>
              <th scope="col">Doğum günü geldiyse</th>
              <th scope="col">Henüz gelmediyse</th>
            </tr>
          </thead>
          <tbody>
            {yillar.map((y) => {
              const r = dogumYilinaGoreYas(y, yil);
              return (
                <tr key={y}>
                  <th scope="row">{y} doğumlu</th>
                  <td>{r.geldiyse} yaşında</td>
                  <td>{r.gelmediyse} yaşında</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 id="excel">Excel&apos;de yaş hesaplama</h2>
      <p>Doğum tarihi A2 hücresinde olduğunu varsayalım:</p>
      <ul>
        <li>
          <strong>Tam yaş (yıl):</strong> =ETARİHLİ(A2;BUGÜN();&quot;Y&quot;) — İngilizce Excel&apos;de =DATEDIF(A2,TODAY(),&quot;Y&quot;)
        </li>
        <li>
          <strong>Yıldan artan ay:</strong> =ETARİHLİ(A2;BUGÜN();&quot;YM&quot;)
        </li>
        <li>
          <strong>Aydan artan gün:</strong> =ETARİHLİ(A2;BUGÜN();&quot;MD&quot;)
        </li>
        <li>
          <strong>Toplam gün:</strong> =BUGÜN()-A2
        </li>
      </ul>
      <p>Google E-Tablolar&apos;da da aynı formül =DATEDIF(A2;TODAY();&quot;Y&quot;) şeklinde çalışır.</p>
    </TimeToolPage>
  );
}
