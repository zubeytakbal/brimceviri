import { buildFullLanguageAlternates } from "@/app/i18n/routing";
import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import WallpaperCalculator from "../components/WallpaperCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Duvar kağıdında fire payı neden diğer araçlardan yüksek?",
    answer:
      "Desenli duvar kağıtlarında rulolar arasında motifin eşleşmesi gerekir; bu eşleştirme kaybı yüzünden fire payı genellikle %10-15 civarında tutulur, düz/desensiz kağıtlarda %10 yeterli olabilir.",
  },
  {
    question: "Standart rulo ölçüleri nedir?",
    answer:
      "Avrupa standardı rulolar genellikle 53 cm eninde ve 10,05 m uzunluğundadır; bazı geniş rulolar 106 cm ene sahiptir. Ürün ambalajındaki ölçüyü kullanmak en doğrusudur.",
  },
];

const GENISLIKLER = [1.5, 3, 4.5, 6, 10, 14, 18];
/** Şerit yöntemi: üst ve alt 5'er cm kesim payı, 10,05 m rulo. */
const rulo = (genislikM: number, enM: number, tavanM: number) => {
  const seritBasi = Math.floor(10.05 / (tavanM + 0.1));
  return Math.ceil(Math.ceil(genislikM / enM) / seritBasi);
};
const sayi = (n: number, basamak = 0) => n.toLocaleString("tr-TR", { maximumFractionDigits: basamak });

export const metadata: Metadata = {
  title: "Duvar Kağıdı Hesaplama: Kaç Rulo Gerekir?",
  description:
    "Oda duvar ölçülerini ve rulo boyutlarını gir; döşeme için gereken duvar kağıdı rulosu sayısını anında hesapla.",
  alternates: {
    canonical: "/duvar-kagidi-hesaplama",
    ...buildFullLanguageAlternates("/duvar-kagidi-hesaplama"),
  },
  openGraph: {
    title: "Duvar Kağıdı Hesaplama: Kaç Rulo Gerekir?",
    description:
      "Oda ölçülerinden gereken duvar kağıdı rulosu sayısını hesaplayın.",
    url: buildSiteUrl("/duvar-kagidi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function WallpaperCalculatorPage() {
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
        name: "Duvar Kağıdı Hesaplama",
        item: buildSiteUrl("/duvar-kagidi-hesaplama"),
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
          <span>Duvar Kağıdı Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Duvar Kağıdı Hesaplama</h1>
          <p>
            Odanın dört duvarının genişliğini, tavan yüksekliğini ve rulo
            ölçülerini gir: gereken duvar kağıdı rulosu sayısını anında gör.
          </p>
        </header>

        <WallpaperCalculator />

        <section className="category-article-content">
          <h2>Duvar genişliğine göre kaç rulo gerekir?</h2>
          <p>
            Duvar kağıdı alana göre değil, şeride göre tükenir: rulo tavan boyunda şeritlere kesilir ve her şerit duvarın 53
            cm&apos;sini kaplar. Tavan yüksekliği 2,5–3,2 m arasındaysa, üst ve alttaki 5&apos;er cm kesim payıyla birlikte
            10,05 m&apos;lik bir rulodan 3 tam şerit çıkar; yani bir rulo yaklaşık {sayi(3 * 0.53, 2)} m genişliğinde duvar
            kaplar. Tablo bu kurala göre, kapı ve pencere düşülmeden hesaplandı.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Kaplanacak duvar genişliği</th>
                  <th>Şerit</th>
                  <th>53 cm rulo</th>
                  <th>106 cm rulo</th>
                </tr>
              </thead>
              <tbody>
                {GENISLIKLER.map((g) => (
                  <tr key={g}>
                    <td>{sayi(g, 1)} m</td>
                    <td>{Math.ceil(g / 0.53)}</td>
                    <td>{rulo(g, 0.53, 2.7)} rulo</td>
                    <td>{rulo(g, 1.06, 2.7)} rulo</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Bütün odayı kaplayacaksanız &quot;duvar genişliği&quot; olarak oda çevresini kullanın: 3 × 4 m&apos;lik bir oda{" "}
            {sayi(2 * (3 + 4))} m çevre demektir ve 53 cm rulodan {rulo(14, 0.53, 2.7)} rulo gerekir. Bir yedek rulo almak,
            sonradan farklı üretim partisinden gelen ve tonu az da olsa farklı rulolarla uğraşmamak için iyi bir alışkanlıktır.
          </p>

          <h2>Duvar metrekaresine göre kaç rulo?</h2>
          <p>
            Elinizde yalnızca duvarın metrekaresi varsa, 53 cm × 10,05 m rulonun {sayi(0.53 * 10.05, 2)} m² kağıt taşıdığını,
            ama kesim payları yüzünden bunun yaklaşık {sayi(3 * 0.53 * 2.7, 2)} m²&apos;sinin (2,7 m tavanda 3 şerit) duvara
            geçtiğini hesaba katın. Bu oranla:
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Duvar alanı</th>
                  <th>53 cm rulo</th>
                </tr>
              </thead>
              <tbody>
                {[8, 10, 16, 20, 25, 30, 40].map((a) => (
                  <tr key={a}>
                    <td>{a} m²</td>
                    <td>{Math.ceil(a / (3 * 0.53 * 2.7))} rulo</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Tavan yüksekliği rulo sayısını nasıl değiştirir?</h2>
          <p>
            Şerit sayısı aşamalı değişir. Tavan 3,25 m&apos;yi geçince bir rulodan 3 yerine 2 şerit çıkar ve aynı duvar için
            gereken rulo sayısı yaklaşık %50 artar. Örneğin 4,5 m genişliğindeki bir duvar 2,7 m tavanda {rulo(4.5, 0.53, 2.7)}{" "}
            rulo isterken 3,4 m tavanda {rulo(4.5, 0.53, 3.4)} rulo ister. Bu yüzden yüksek tavanlı salonlarda metrekare
            hesabı rulo sayısını eksik gösterir.
          </p>

          <h2>Desen tekrarı (rapor) hesabı nasıl etkiler?</h2>
          <p>
            Etikette yazan rapor, desenin kendini kaç santimde bir tekrar ettiğidir. Desensiz ve serbest eşleşmeli kağıtta şerit
            boyu tavan yüksekliği kadardır. Desenli kağıtta her şerit, bir öncekiyle motifi tutturmak için raporun katlarına
            yuvarlanır; 64 cm raporlu bir kağıtta 2,7 m&apos;lik tavan için şerit {sayi(Math.ceil(2.8 / 0.64) * 0.64, 2)} m
            olur ve rulodan çıkan şerit sayısı {Math.floor(10.05 / (Math.ceil(2.8 / 0.64) * 0.64))}&apos;e düşer.
            Kaydırmalı (yarım rapor) desenlerde kayıp daha da artabilir. Araçtaki fire payını desenli kağıtta bu yüzden yüksek
            tutmak gerekir.
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
            Aynı yenileme projesinde işine yarayabilecek diğer araçlar:{" "}
            <Link href="/boya-hesaplama">Boya Hesaplama</Link>,{" "}
            <Link href="/fayans-hesaplama">Fayans Hesaplama</Link>,{" "}
            <Link href="/tugla-hesaplama">Tuğla Hesaplama</Link>,{" "}
            <Link href="/parke-hesaplama">Parke Hesaplama</Link>,{" "}
            <Link href="/siva-hesaplama">Sıva Hesaplama</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
