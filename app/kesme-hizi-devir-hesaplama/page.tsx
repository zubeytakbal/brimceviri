import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import CuttingSpeedCalculator from "../components/CuttingSpeedCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Kesme hızından devir (RPM) nasıl hesaplanır?",
    answer:
      "Devir (N) = (Kesme Hızı (Vc, m/dakika) × 1000) / (π × Çap (D, mm)). Bu formül, torna ve frezede kesici takım veya iş parçasının dönüş hızını belirlemek için kullanılır.",
  },
  {
    question: "Kesme hızı (Vc) nasıl seçilir?",
    answer:
      "Kesme hızı; iş parçası malzemesi, kesici takım tipi (HSS, karbür vb.) ve soğutma sıvısı kullanımına göre değişir. Doğru değer için kesici takım üreticisinin kataloğuna bakılmalıdır.",
  },
];

// Devir tablosu: N = Vc × 1000 / (π × D).
const CAPLAR = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100];
const KESME_HIZLARI = [30, 80, 150, 250];
const devir = (vc: number, d: number) => Math.round((vc * 1000) / (Math.PI * d));

export const metadata: Metadata = {
  title: "Kesme Hızı - Devir (RPM) Hesaplama",
  description:
    "Kesme hızı (Vc), çap (D) ve devirden (N) ikisini gir, üçüncüsünü torna/freze formülüyle hesapla.",
  alternates: {
    canonical: "/kesme-hizi-devir-hesaplama",
  },
  openGraph: {
    title: "Kesme Hızı - Devir (RPM) Hesaplama",
    description: "Kesme hızı, çap ve devir arasında hesaplama yap.",
    url: buildSiteUrl("/kesme-hizi-devir-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function CuttingSpeedCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "CNC/Torna Operatörü Araçları", item: buildSiteUrl("/cnc-torna-araclari") },
      { "@type": "ListItem", position: 4, name: "Kesme Hızı - Devir Hesaplama", item: buildSiteUrl("/kesme-hizi-devir-hesaplama") },
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
          <Link href="/cnc-torna-araclari">CNC/Torna Operatörü Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Kesme Hızı - Devir Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kesme Hızı - Devir (RPM) Hesaplama</h1>
          <p>
            Kesme hızı (Vc), çap (D) ve devirden (N) hangisini
            hesaplamak istediğini seç; diğer ikisini gir.
          </p>
        </header>

        <CuttingSpeedCalculator />

        <section className="category-article-content">
          <h2>Örnek hesap</h2>
          <p>
            Ø40 mm çaplı bir parça, takım kataloğunda önerilen 150 m/dk kesme hızıyla tornalanacak. Devir = 150 × 1000 / (3,1416 × 40) ≈{" "}
            <strong>1194 dev/dk</strong>. Tezgâh kademeli ise en yakın alt kademe seçilir; daha yüksek kademe takım ömrünü kısaltır.
            Ters yönde de hesap yapılabilir: en fazla 3000 dev/dk dönebilen bir tezgâhta Ø10 mm parmak freze ile ulaşılabilecek kesme
            hızı 3,1416 × 10 × 3000 / 1000 ≈ 94 m/dk&apos;dır. Bu değer katalogdaki önerinin altında kalıyorsa ilerleme ve talaş derinliği
            buna göre ayarlanır.
          </p>

          <h2>Çapa ve kesme hızına göre devir tablosu (dev/dk)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Çap (mm)</th>
                  {KESME_HIZLARI.map((vc) => (
                    <th key={vc}>Vc = {vc} m/dk</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CAPLAR.map((d) => (
                  <tr key={d}>
                    <td>Ø{d}</td>
                    {KESME_HIZLARI.map((vc) => (
                      <td key={vc}>{devir(vc, d).toLocaleString("tr-TR")}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Tablodaki kesme hızları yalnızca hesap örneğidir. Doğru değer iş parçası malzemesine, takım malzemesine (HSS takımlarda
            karbür takımlara göre belirgin biçimde düşüktür), kaplamaya ve soğutmaya bağlıdır ve takım üreticisinin kataloğundan alınmalıdır.
          </p>

          <h2>Devirden ilerleme hızına</h2>
          <p>
            Frezede devir bulunduktan sonra tabla ilerleme hızı hesaplanır: Vf (mm/dk) = fz × z × n. Burada fz diş başına ilerleme (mm),
            z kesici ağız sayısı, n devirdir. Örneğin 4 ağızlı, diş başına 0,05 mm ilerlemeyle çalışan bir freze 1194 dev/dk&apos;da 0,05 × 4 ×
            1194 ≈ 239 mm/dk ilerler. Tornada ilerleme dev başına verilir (mm/dev).
          </p>

          <h2>Sık yapılan hatalar</h2>
          <ul>
            <li>
              <strong>Tornada takım çapını kullanmak:</strong> Tornada formüldeki çap iş parçasının işlenen çapıdır; frezede ve delmede ise
              kesici takımın çapıdır.
            </li>
            <li>
              <strong>Alın tornalamada sabit devir:</strong> Merkeze yaklaştıkça çap küçülür ve aynı devirde kesme hızı düşer; CNC
              tezgâhlarda bunun için sabit kesme hızı (G96) kullanılır ve en yüksek devir sınırlanır.
            </li>
            <li>
              <strong>Birim karışıklığı:</strong> Formül m/dk ve mm içindir; inç ile çalışan kataloglarda SFM (ayak/dakika) kullanılır ve
              katsayı farklıdır.
            </li>
          </ul>

          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>İlgili araçlar</h2>
          <p>
            Diğer CNC/torna araçları için{" "}
            <Link href="/cnc-torna-araclari">CNC/Torna Operatörü Araçları</Link>
            {" "}sayfasına, mm/inç dönüşümü için{" "}
            <Link href="/kategoriler/uzunluk">Uzunluk Dönüşümleri</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, torna ve freze işlemlerinde standart kabul edilen
            kesme hızı-devir bağıntısına dayanır. Kesici takım
            üreticisinin katalog değerleri her zaman esas alınmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
