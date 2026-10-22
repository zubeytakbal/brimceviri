import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { HasatHesaplama } from "../components/HayvancilikAraclari";
import SeedRateCalculator from "../components/SeedRateCalculator";
import { URUNLER } from "../converter/ekimNormu";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const kg = (n: number) => n.toLocaleString("tr-TR", { maximumFractionDigits: 1 });
const urun = (id: string) => URUNLER.find((u) => u.id === id)!;

const faqItems: FaqItem[] = [
  {
    question: "Buğday dekara kaç kilo ekilir?",
    answer: `Buğdayda dekara genellikle ${kg(urun("bugday").tohum[0])}–${kg(urun("bugday").tohum[1])} kg tohum atılır; hedef metrekarede yaklaşık 450–550 çimlenebilir tanedir. Sertifikalı tohum desteğinde dekar başına en fazla ${kg(urun("bugday").destek!)} kg esas alınır. Kuru tarımda ve geç ekimde üst sınıra yakın atılır.`,
  },
  {
    question: "Buğday dekara kaç kilo verir?",
    answer: "Kuru tarımda dekara 250–400 kg, sulu tarımda 500–700 kg verim yaygındır; iyi çeşit ve bakımla daha yüksek verimler de alınır.",
  },
  {
    question: "Nohut ve mercimek dekara kaç kilo ekilir?",
    answer: `Nohutta dekara ${kg(urun("nohut").tohum[0])}–${kg(urun("nohut").tohum[1])} kg, kırmızı mercimekte ${kg(urun("mercimek").tohum[0])}–${kg(urun("mercimek").tohum[1])} kg tohum kullanılır. Destek için ikisinde de dekar başına en fazla ${kg(urun("nohut").destek!)} kg esas alınır.`,
  },
  {
    question: "Bin dane ağırlığı (TDW) nedir?",
    answer:
      "Bin dane ağırlığı, 1000 adet tohum tanesinin gram cinsinden ağırlığıdır; genelde tohum etiketinde veya sertifikasında belirtilir. Tane iriliği arttıkça bin dane ağırlığı da artar.",
  },
  {
    question: "Tohum miktarı (tohumluk) nasıl hesaplanır?",
    answer:
      "Dekara Gerekli Tohumluk (kg/da) = (Hedef Bitki Sayısı/m² × Bin Dane Ağırlığı (g)) ÷ (Çimlenme Oranı % × Saflık Oranı % × 1000). Çimlenme ve saflık oranı düştükçe, aynı bitki sayısını yakalamak için daha fazla tohum ekmen gerekir.",
  },
  {
    question: "Hedef bitki sayısı ve bin dane ağırlığı nereden bulunur?",
    answer:
      "Hedef bitki sayısı (sıklık) ürün çeşidine, ekim zamanına ve bölgeye göre değişir; bin dane ağırlığı ise kullandığın tohum partisine özgüdür ve etiketinde yazar. Bu değerleri bir ziraat mühendisinden veya tohum etiketinden almalısın.",
  },
];

export const metadata: Metadata = {
  title: "Tohum Miktarı Hesaplama: Dekara Kaç Kilo Buğday, Arpa, Nohut Ekilir?",
  description:
    "Dekara kaç kilo tohum atılır, dekara kaç kilo verir? 16 ürün için ekim normu ve verim tablosu; bin dane ağırlığından tohumluk ve hasattan toplam ürün hesaplama.",
  alternates: {
    canonical: "/tohum-miktari-hesaplama",
  },
  openGraph: {
    title: "Tohum Miktarı Hesaplama: Dekara Kaç Kilo Ekilir?",
    description: "Bin dane ağırlığından tohumluk miktarını hesapla.",
    url: buildSiteUrl("/tohum-miktari-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function SeedRateCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Çiftçi Araçları", item: buildSiteUrl("/ciftci-araclari") },
      { "@type": "ListItem", position: 4, name: "Tohum Miktarı Hesaplama", item: buildSiteUrl("/tohum-miktari-hesaplama") },
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
          <Link href="/ciftci-araclari">Çiftçi Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Tohum Miktarı Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Tohum Miktarı ve Verim Hesaplama</h1>
          <p>
            Hedef bitki sayısını, bin dane ağırlığını, çimlenme ve
            saflık oranını gir: dekara ve toplam alana gereken
            tohumluk miktarını (kg) hesapla.
          </p>
        </header>

        <SeedRateCalculator />

        <section className="category-article-content">
          <h2 id="tablo">Ürünlere göre dekara tohum ve verim</h2>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">Ürün</th>
                  <th scope="col">Dekara tohum</th>
                  <th scope="col">Destek tavanı</th>
                  <th scope="col">Dekara verim</th>
                </tr>
              </thead>
              <tbody>
                {URUNLER.map((u) => (
                  <tr key={u.id}>
                    <th scope="row">{u.ad}</th>
                    <td>
                      {kg(u.tohum[0])}–{kg(u.tohum[1])} kg
                    </td>
                    <td>{u.destek === null ? "—" : `${kg(u.destek)} kg`}</td>
                    <td>
                      {kg(u.verim[0])}–{kg(u.verim[1])} kg{u.verimNot ? ` (${u.verimNot})` : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Değerler Türkiye için tipik aralıklardır; çeşit, bölge, ekim zamanı, toprak ve sulamaya göre değişir. &quot;Destek tavanı&quot;, sertifikalı tohum
            kullanım desteğinde dekar başına esas alınan en yüksek tohum miktarıdır. Kendi tarlanız için il veya ilçe tarım müdürlüğünün önerisini esas alın.
          </p>

          <h2 id="hasat">Hasat: dekara verimden toplam ürün</h2>
        </section>
        <HasatHesaplama />

        <section className="category-article-content">
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
            Diğer çiftçi araçları için{" "}
            <Link href="/ciftci-araclari">Çiftçi Araçları</Link>
            {" "}sayfasına, gübre ihtiyacı hesaplama için{" "}
            <Link href="/gubre-ihtiyaci-hesaplama">Gübre İhtiyacı Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, tarımda standart kabul edilen bin dane ağırlığı
            (TDW) tabanlı tohumluk hesabına dayanır. Bu araç
            tarımsal danışmanlık yerine geçmez; hedef bitki sayısını
            veya çeşit seçimini belirlemez.
          </p>
        </section>
      </div>
    </main>
  );
}
