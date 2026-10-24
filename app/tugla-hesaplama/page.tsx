import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import BrickCalculator from "../components/BrickCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Tuğlanın derinlik (kalınlık) ölçüsünü neden sormuyorsunuz?",
    answer:
      "Adet hesabı yalnızca duvarın yüzeyinde görünen en × yükseklik alanına bağlıdır; tuğlanın derinliği duvarın kalınlığını belirler ama yüzeyde kaç tuğla göründüğünü değiştirmez.",
  },
  {
    question: "Kapı ve pencere alanlarını düşmem gerekiyor mu?",
    answer:
      "Evet — \"Duvar Alanı\" alanına, kapı ve pencere gibi boşlukları zaten düşülmüş net duvar alanını girmelisin. Brüt alan/boşluk hesaplama mantığı için boya hesaplama aracına bakabilirsin.",
  },
];

/** [ad, en (cm), yükseklik (cm), derz (cm)] */
const MALZEMELER: Array<[string, number, number, number]> = [
  ["Dolu tuğla (yarım tuğla duvar)", 19, 5.5, 1],
  ["Yatay delikli tuğla", 19, 19, 1],
  ["Bims blok", 39, 19, 1],
  ["Gazbeton (ince derz)", 60, 25, 0.2],
];
const adet = (enCm: number, boyCm: number, derzCm: number) => 10000 / ((enCm + derzCm) * (boyCm + derzCm));
const sayi = (n: number, basamak = 0) => n.toLocaleString("tr-TR", { maximumFractionDigits: basamak });

export const metadata: Metadata = {
  title: "Tuğla Hesaplama: Kaç Adet Tuğla Gerekir?",
  description:
    "Duvar alanını ve tuğla ölçüsünü gir, derz payı ve fire dahil gereken tuğla adedini anında hesapla.",
  alternates: {
    canonical: "/tugla-hesaplama",
  },
  openGraph: {
    title: "Tuğla Hesaplama: Kaç Adet Tuğla Gerekir?",
    description:
      "Duvar alanından derz ve fire payı dahil gereken tuğla adedini hesaplayın.",
    url: buildSiteUrl("/tugla-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function BrickCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: buildSiteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tuğla Hesaplama",
        item: buildSiteUrl("/tugla-hesaplama"),
      },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildFaqSchema(faqItems)),
        }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Tuğla Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Tuğla Hesaplama</h1>
          <p>
            Duvar alanını, tuğlanın en/yükseklik ölçüsünü ve derz
            kalınlığını gir; gereken tuğla adedini fire payı dahil
            anında gör.
          </p>
        </header>

        <BrickCalculator />

        <section className="category-article-content">
          <h2>1 m² duvara kaç tuğla gider?</h2>
          <p>
            Adet, tuğlanın duvarda görünen yüzüne ve derz kalınlığına bağlıdır. Tablo yaygın duvar malzemelerinin yüz ölçüleri
            için hesaplandı; fire dahil değildir. Kendi ürününüzün ölçüsü farklıysa yukarıdaki araca girin.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Malzeme</th>
                  <th>Duvarda görünen yüz</th>
                  <th>Derz</th>
                  <th>1 m²&apos;ye adet</th>
                </tr>
              </thead>
              <tbody>
                {MALZEMELER.map(([ad, en, boy, derz]) => (
                  <tr key={ad}>
                    <td>{ad}</td>
                    <td>
                      {sayi(en, 1)} × {sayi(boy, 1)} cm
                    </td>
                    <td>{sayi(derz * 10, 1)} mm</td>
                    <td>{sayi(adet(en, boy, derz), 1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            &quot;13,5&apos;luk&quot; ya da &quot;8,5&apos;luk&quot; tuğla adı tuğlanın kalınlığını, yani duvarın ne kadar kalın
            olacağını anlatır. İkisinin de duvara bakan yüzü 19 × 19 cm olduğunda metrekareye giden adet aynıdır; değişen,
            harç miktarı ve duvarın ağırlığıdır.
          </p>

          <h2>Örnek: kapılı bir bölme duvar</h2>
          <p>
            4 m uzunluğunda, 2,7 m yüksekliğinde bir duvarda 90 × 210 cm&apos;lik bir kapı boşluğu olsun. Brüt alan{" "}
            {sayi(4 * 2.7, 2)} m², kapı {sayi(0.9 * 2.1, 2)} m², net alan {sayi(4 * 2.7 - 0.9 * 2.1, 2)} m²&apos;dir. 19 × 19
            cm yüzlü tuğlayla 1 cm derzde metrekareye {sayi(adet(19, 19, 1))} tuğla düştüğünden net alan{" "}
            {Math.ceil((4 * 2.7 - 0.9 * 2.1) * adet(19, 19, 1))} tuğla eder; %5 kırık payıyla sipariş{" "}
            {Math.ceil((4 * 2.7 - 0.9 * 2.1) * adet(19, 19, 1) * 1.05)} adettir.
          </p>

          <h2>Derz kalınlığı adedi ne kadar değiştirir?</h2>
          <p>
            19 × 19 cm yüzlü tuğlada derz 5 mm olursa metrekareye {sayi(adet(19, 19, 0.5), 1)}, 10 mm olursa{" "}
            {sayi(adet(19, 19, 1), 1)}, 15 mm olursa {sayi(adet(19, 19, 1.5), 1)} tuğla gider. Küçük yüzlü dolu tuğlada aynı
            fark çok daha büyüktür, çünkü metrekaredeki derz sayısı artar.
          </p>

          <h2>Derz kalınlığı hesaba neden dahil ediliyor?</h2>
          <p>
            Tuğlalar duvara yan yana değil, aralarında harç dolgusu
            (derz) bırakılarak örülür. Bu derz payı hesaba katılmazsa
            gereken tuğla sayısı olduğundan fazla çıkar, çünkü her tuğla
            duvarda kendi ölçüsünden biraz daha fazla yer kaplar.
            Yaygın kullanılan derz kalınlığı 10 mm civarındadır; ince
            derzli uygulamalarda bu değer 5-8 mm&apos;ye kadar
            düşebilir.
          </p>

          <h2>Hesaplama nasıl yapılıyor?</h2>
          <p>
            Tuğlanın en ve yükseklik ölçüsüne, girdiğin derz kalınlığı
            eklenerek tuğlanın duvarda gerçekte kapladığı alan bulunur.
            Duvar alanı, seçtiğin fire payı oranıyla çarpılıp bu birim
            alana bölünür ve sonuç yukarı yuvarlanarak gereken tuğla
            adedi elde edilir. Kırılma ve kesim payı için varsayılan
            fire oranı %5&apos;tir; alışılmadık ölçülerde kesim yapılan
            duvarlarda bu oranı artırmak daha güvenlidir.
          </p>
          <p>
            Bu hesap yalnızca tuğla adedini verir; harç (çimento-kum)
            miktarı duvar kalınlığına ve harç karışım oranına göre ayrıca
            hesaplanmalıdır, bu yüzden sonuca dahil edilmemiştir.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Tuğlanın derinlik (kalınlık) ölçüsünü neden sormuyorsunuz?</strong>
            <br />
            Adet hesabı yalnızca duvarın yüzeyinde görünen en × yükseklik
            alanına bağlıdır; tuğlanın derinliği duvarın kalınlığını
            belirler ama yüzeyde kaç tuğla göründüğünü değiştirmez.
          </p>
          <p>
            <strong>Kapı ve pencere alanlarını düşmem gerekiyor mu?</strong>
            <br />
            Evet — &quot;Duvar Alanı&quot; alanına, kapı ve pencere gibi
            boşlukları zaten düşülmüş net duvar alanını girmelisin.
            Brüt alan/boşluk hesaplama mantığı için{" "}
            <Link href="/boya-hesaplama">boya hesaplama aracına</Link>{" "}
            bakabilirsin.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Aynı yenileme projesinde işine yarayabilecek diğer araçlar:{" "}
            <Link href="/boya-hesaplama">Boya Hesaplama</Link>,{" "}
            <Link href="/fayans-hesaplama">Fayans Hesaplama</Link>,{" "}
            <Link href="/duvar-kagidi-hesaplama">Duvar Kağıdı Hesaplama</Link>,{" "}
            <Link href="/parke-hesaplama">Parke Hesaplama</Link>,{" "}
            <Link href="/siva-hesaplama">Sıva Hesaplama</Link>.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Derz kalınlığı ve fire payı aralıkları, yaygın duvar tuğlası
            üreticilerinin ve inşaat uygulama rehberlerinin önerdiği
            pratik değerlerden derlenmiştir.
          </p>
        </section>
      </div>
    </main>
  );
}
