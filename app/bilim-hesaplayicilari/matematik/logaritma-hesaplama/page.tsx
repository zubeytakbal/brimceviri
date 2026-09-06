import type { Metadata } from "next";
import Link from "next/link";
import LogarithmCalculator from "../../../components/LogarithmCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Logaritma nedir?",
    answer:
      "Logaritma, üslü sayının tersidir: log_b(x) = y ⟺ b^y = x. 'b tabanında x'in logaritması, b'yi kaçıncı kuvvete yükseltirsek x'i elde ederiz?' sorusunun cevabıdır.",
  },
  {
    question: "log ile ln arasındaki fark nedir?",
    answer:
      "log (bazen log₁₀ yazılır), taban 10 olan logaritmadır. ln (doğal logaritma), taban e (≈2,71828, Euler sayısı) olan logaritmadır. İkisi de aynı logaritma kavramının farklı taban seçimleridir.",
  },
  {
    question: "Taban değiştirme formülü nedir?",
    answer:
      "Herhangi bir tabandaki logaritmayı başka bir tabana çevirmek için log_b(x) = ln(x)/ln(b) formülü kullanılır. Bu formül, hesap makinelerinin (genellikle sadece log ve ln fonksiyonu bulunan) herhangi bir tabanda logaritma hesaplayabilmesini sağlar.",
  },
  {
    question: "Negatif sayıların veya sıfırın logaritması var mı?",
    answer:
      "Hayır, gerçek sayılar kümesinde negatif sayıların ve sıfırın logaritması tanımsızdır — çünkü pozitif bir tabanın hiçbir gerçek kuvveti sıfır veya negatif bir sonuç veremez.",
  },
];

export const metadata: Metadata = {
  title: "Logaritma Hesaplama (log, ln): Adım Adım Çözüm",
  description:
    "log_b(x) = y ifadesindeki taban, sayı veya sonucu hesaplayın — 10 tabanı (log) ve e tabanı (ln) ön ayarlarıyla, adım adım çözümle.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/logaritma-hesaplama",
  },
  openGraph: {
    title: "Logaritma Hesaplama (log, ln): Adım Adım Çözüm",
    description: "log_b(x) = y değerlerini adım adım hesaplayın.",
    url: buildSiteUrl("/bilim-hesaplayicilari/matematik/logaritma-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function LogaritmaHesaplamaPage() {
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
        name: "Bilim Hesaplayıcıları",
        item: buildSiteUrl("/bilim-hesaplayicilari"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Matematik",
        item: buildSiteUrl("/bilim-hesaplayicilari/matematik"),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Logaritma Hesaplama",
        item: buildSiteUrl(
          "/bilim-hesaplayicilari/matematik/logaritma-hesaplama"
        ),
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
          <Link href="/bilim-hesaplayicilari">Bilim Hesaplayıcıları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari/matematik">Matematik</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Logaritma Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Logaritma Hesaplama</h1>
          <p>
            log_b(x) = y ifadesindeki taban, sayı veya sonucu adım adım
            hesapla — 10 tabanı (log) ve e tabanı (ln) dahil.
          </p>
        </header>

        <div className="unit-page-layout wide-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Logaritma nedir?</h2>
          <p>
            <strong>Logaritma</strong>, üslü sayının tersi olan işlemdir:
            log_b(x) = y ⟺ b^y = x. Bu, &ldquo;b tabanını kaçıncı kuvvete
            yükseltirsek x&apos;i elde ederiz?&rdquo; sorusunun cevabıdır. Örneğin
            log₂(8) = 3, çünkü 2³ = 8. Logaritma kavramı 17. yüzyılın
            başında İskoç matematikçi John Napier tarafından, o dönemde
            elle yapılan uzun ve zahmetli çarpma/bölme işlemlerini
            toplama/çıkarmaya indirgeyerek kolaylaştırmak amacıyla
            geliştirilmiştir — astronomlar ve denizciler için devrim
            niteliğinde bir hesaplama aracı olmuştur.
          </p>

          <h2>Yaygın tabanlar: log ve ln</h2>
          <p>
            İki taban özellikle yaygın kullanılır: <strong>log</strong>{" "}
            (taban 10 olan &ldquo;adi/ortak logaritma&rdquo;, genellikle taban
            belirtilmeden sadece &ldquo;log&rdquo; yazılır) ve <strong>ln</strong>{" "}
            (taban e olan &ldquo;doğal logaritma&rdquo; — e, yaklaşık 2,71828 değerine
            sahip, bileşik faiz ve büyüme/azalma modellerinde doğal olarak
            ortaya çıkan matematiksel bir sabittir, Euler sayısı olarak da
            bilinir). Bilgisayar bilimlerinde ayrıca taban 2 logaritma
            (log₂) sıkça kullanılır — ikili sistemle doğrudan ilişkilidir.
          </p>

          <h2>Taban değiştirme formülü</h2>
          <p>
            Çoğu hesap makinesi sadece log (taban 10) ve ln (taban e)
            fonksiyonlarını doğrudan sunar. Herhangi bir tabandaki
            logaritmayı hesaplamak için{" "}
            <strong>taban değiştirme formülü</strong> kullanılır: log_b(x)
            = ln(x) / ln(b) (veya eşdeğer olarak log(x)/log(b)). Bu
            hesaplayıcı da, girdiğin herhangi bir taban için bu formülü
            kullanır.
          </p>

          <h2>Logaritma kuralları</h2>
          <p>
            Logaritmalarla işlem yaparken sıkça kullanılan temel kurallar:
            log_b(x×y) = log_b(x) + log_b(y) (çarpımın logaritması,
            logaritmaların toplamına eşittir — Napier&apos;in asıl motivasyonu
            budur), log_b(x/y) = log_b(x) − log_b(y) (bölümün logaritması,
            logaritmaların farkına eşittir), log_b(x&#8319;) = n×log_b(x) (üssün
            logaritması, üs ile logaritmanın çarpımına eşittir).
          </p>

          <h2>Logaritma ile üslü sayı arasındaki ters ilişki</h2>
          <p>
            Logaritma ve üslü sayı, birbirinin tersi (ters fonksiyonu)
            işlemleridir — tıpkı toplama-çıkarma veya çarpma-bölme gibi.
            Bu nedenle log_b(bˣ) = x ve b^(log_b(x)) = x eşitlikleri her
            zaman geçerlidir. Bu ters ilişki, logaritmik ve üstel
            denklemleri çözerken sürekli kullanılır.
          </p>

          <h2>Gerçek hayatta nerede kullanılır?</h2>
          <p>
            Logaritma, deprem şiddetini ölçen Richter ölçeğinde (her birim
            artış, 10 kat daha büyük sarsıntı demektir), ses şiddetini
            ölçen desibel (dB) biriminde, kimyada pH ölçeğinde (hidrojen
            iyonu derişiminin negatif logaritması), bilgisayar
            biliminde algoritma karmaşıklığı analizinde (log n
            büyüme hızı) ve finans/nüfus artışı gibi üstel süreçlerin
            tersine çözülmesinde (örneğin bir yatırımın belirli bir
            değere ulaşması için gereken süreyi bulma) kullanılır.
          </p>

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
            Logaritmalı bir <strong>denklemi</strong> (örn. log(2x+1,3)=4)
            çözmek istiyorsan{" "}
            <Link href="/bilim-hesaplayicilari/matematik/1-bilinmeyenli-denklem-cozme">
              1 Bilinmeyenli Denklem Çözme
            </Link>{" "}
            aracına, logaritmik bir <strong>denklem sistemin</strong> varsa{" "}
            <Link href="/bilim-hesaplayicilari/matematik/2-bilinmeyenli-denklem-sistemi-cozme">
              2 Bilinmeyenli
            </Link>{" "}
            veya{" "}
            <Link href="/bilim-hesaplayicilari/matematik/3-bilinmeyenli-denklem-sistemi-cozme">
              3 Bilinmeyenli Denklem Sistemi Çözme
            </Link>{" "}
            aracına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Logaritma tanımı, taban değiştirme formülü ve logaritma
            kuralları, standart lise matematik müfredatına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <LogarithmCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
