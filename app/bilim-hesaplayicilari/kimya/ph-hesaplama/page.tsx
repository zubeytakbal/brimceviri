import type { Metadata } from "next";
import Link from "next/link";
import PhCalculator from "../../../components/PhCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "pH nedir?",
    answer:
      "pH, bir çözeltinin asitlik veya bazlık derecesini ifade eden, 0-14 arasında değişen bir ölçektir. pH = -log[H⁺] formülüyle hesaplanır; 7'nin altı asidik, 7 nötr, 7'nin üstü bazik kabul edilir.",
  },
  {
    question: "pH ve pOH arasındaki ilişki nedir?",
    answer:
      "25°C'de saf suda pH + pOH = 14 bağıntısı geçerlidir. Bu, suyun kendiliğinden iyonlaşma sabiti Kw = 1×10⁻¹⁴ değerinden gelir.",
  },
  {
    question: "[H⁺] derişiminden pH nasıl hesaplanır?",
    answer:
      "pH, hidrojen iyonu derişiminin eksi logaritması alınarak bulunur: pH = -log[H⁺]. Örneğin [H⁺] = 1×10⁻⁷ mol/L ise pH = 7 (nötr) olur.",
  },
  {
    question: "Bir çözeltinin asidik mi bazik mi olduğu nasıl anlaşılır?",
    answer:
      "pH değeri 7'den küçükse çözelti asidiktir, 7'ye eşitse nötrdür, 7'den büyükse baziktir. pH ne kadar düşükse asidik özellik o kadar güçlü, ne kadar yüksekse bazik özellik o kadar güçlüdür.",
  },
];

export const metadata: Metadata = {
  title: "pH Hesaplama: pH, pOH, [H⁺] ve [OH⁻] Hesaplayıcı",
  description:
    "pH, pOH, hidrojen iyonu derişimi [H⁺] veya hidroksit iyonu derişiminden [OH⁻] herhangi birini gir, diğer üçünü ve asidik/bazik/nötr sınıflandırmasını anında gör.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/kimya/ph-hesaplama",
  },
  openGraph: {
    title: "pH Hesaplama: pH, pOH, [H⁺] ve [OH⁻] Hesaplayıcı",
    description:
      "pH, pOH, [H⁺] veya [OH⁻] değerlerinden birini gir, diğerlerini anında hesapla.",
    url: buildSiteUrl("/bilim-hesaplayicilari/kimya/ph-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function PhHesaplamaPage() {
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
        name: "Kimya",
        item: buildSiteUrl("/bilim-hesaplayicilari/kimya"),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "pH Hesaplama",
        item: buildSiteUrl("/bilim-hesaplayicilari/kimya/ph-hesaplama"),
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
          <Link href="/bilim-hesaplayicilari/kimya">Kimya</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>pH Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>pH Hesaplama</h1>
          <p>
            pH, pOH, [H⁺] veya [OH⁻] değerlerinden herhangi birini gir;
            diğer üçünü ve çözeltinin asidik, nötr veya bazik olduğunu
            anında gör.
          </p>
        </header>

        <div className="unit-page-layout chem-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>pH nedir?</h2>
          <p>
            pH, bir çözeltideki hidrojen iyonu (H⁺) derişimini ifade eden,
            logaritmik bir ölçektir. Formülü <strong>pH = -log[H⁺]</strong>{" "}
            şeklindedir; [H⁺] mol/L cinsinden hidrojen iyonu derişimini
            ifade eder. Ölçek genellikle 0-14 arasında değişir, ancak çok
            güçlü asit veya baz çözeltilerinde bu aralığın dışına da
            çıkabilir.
          </p>

          <h2>pH, pOH, [H⁺] ve [OH⁻] ilişkisi</h2>
          <p>
            Suyun kendiliğinden iyonlaşması sonucu ortaya çıkan iyon çarpımı
            sabiti (Kw), 25°C'de <strong>1×10⁻¹⁴</strong> değerindedir; bu
            da <strong>pH + pOH = 14</strong> bağıntısını verir. Aynı
            şekilde [H⁺] × [OH⁻] = 1×10⁻¹⁴ bağıntısı geçerlidir. Bu dört
            büyüklükten herhangi biri bilindiğinde, diğer üçü doğrudan
            hesaplanabilir.
          </p>
          <p>
            Örneğin nötr suyun [H⁺] derişimi 1×10⁻⁷ mol/L'dir; bu değerin
            eksi logaritması alındığında pH = 7 bulunur — tam olarak asidik
            ile bazik arasındaki sınır noktasıdır.
          </p>

          <h2>pH kavramının tarihi: bir bira fabrikasında doğuş</h2>
          <p>
            pH ölçeği, 1909'da Danimarkalı biyokimyager Søren Peter Lauritz
            Sørensen tarafından, çalıştığı Carlsberg Laboratuvarı'nda bira
            üretiminin enzimatik süreçlerini kalite kontrolden geçirmek
            amacıyla tanıtıldı. "p" harfinin kökeni tam olarak netlik
            kazanmamıştır; yaygın kabul gören açıklamalardan biri Almanca
            "Potenz" (güç, kuvvet) kelimesinden geldiği, bir diğeri ise
            Sørensen'in laboratuvar notlarında hidrojen iyonu derişimi için
            kullandığı "p" ve "q" değişkenlerinden türediği yönündedir.
          </p>
          <p>
            Sørensen'in orijinal tanımı derişime dayanıyordu; modern IUPAC
            tanımı ise <strong>aktiviteye</strong> (a_H⁺) dayanır: pH =
            -log(a_H⁺). Seyreltik çözeltilerde aktivite derişime çok yakın
            olduğu için bu fark pratikte ihmal edilebilir, ancak derişik
            çözeltilerde iyonlar arası elektrostatik etkileşimler (iyonik
            şiddet) nedeniyle aktivite ile derişim birbirinden belirgin
            biçimde ayrışır — bu etkiyi niceliksel olarak açıklayan teori,
            Peter Debye ve Erich Hückel'in 1923'te geliştirdiği Debye-Hückel
            teorisidir.
          </p>

          <h2>0-14 sınırının ötesi: süperasitler ve Hammett fonksiyonu</h2>
          <p>
            pH ölçeğinin 0 ile 14 arasında olduğu yaygın bir yanlış
            algıdır; çok güçlü asit veya baz çözeltilerinde pH teorik
            olarak negatif değerlere inebilir veya 14'ün üzerine çıkabilir.
            Ancak saf sülfürik asit gibi "süperasitler" söz konusu
            olduğunda su bazlı pH kavramının kendisi anlamını yitirir; bu
            durumlarda asitliği ölçmek için Louis Hammett'in 1932'de
            geliştirdiği <strong>Hammett asitlik fonksiyonu</strong> (H₀)
            kullanılır — florosülfürik asit-antimon pentaflorür karışımı
            gibi "sihirli asitler" H₀ değeri -20'lere kadar inebilir.
          </p>

          <h2>Sıcaklığın Kw üzerindeki etkisi: 100°C'de "nötr" pH</h2>
          <p>
            Suyun kendiliğinden iyonlaşma sabiti Kw, sıcaklıkla birlikte
            artar; 25°C'de 1×10⁻¹⁴ olan bu değer, 100°C'de yaklaşık 1×10⁻¹²
            civarına yükselir. Bu, kaynayan suyun pH'ının 7 değil, yaklaşık
            6,14 olduğu anlamına gelir — ancak su hâlâ kimyasal olarak
            nötrdür, çünkü [H⁺] ve [OH⁻] derişimleri hâlâ birbirine eşittir.
            Bu incelik, "nötr = pH 7" eşitliğinin yalnızca 25°C referans
            sıcaklığında geçerli bir yaklaşım olduğunu, evrensel bir
            tanım olmadığını gösterir.
          </p>

          <h2>Asidik, nötr ve bazik sınıflandırma</h2>
          <p>
            pH değeri 7'den küçük olan çözeltiler <strong>asidik</strong>{" "}
            (mide asidi pH≈1,5-3,5, limon suyu pH≈2), pH değeri tam 7 olan
            çözeltiler <strong>nötr</strong> (saf su, 25°C'de), pH değeri
            7'den büyük olan çözeltiler ise <strong>bazik</strong> (sabunlu
            su pH≈9-10, çamaşır suyu pH≈13) olarak sınıflandırılır. pH her
            bir birim azaldığında veya arttığında, hidrojen iyonu derişimi
            10 kat değişir — bu yüzden pH 3 olan bir çözelti, pH 5 olan bir
            çözeltiden 100 kat daha asidiktir.
          </p>

          <h2>Biyolojik ve çevresel önemi</h2>
          <p>
            İnsan kanının pH'ı, 7,35-7,45 gibi son derece dar bir aralıkta
            sıkı biçimde düzenlenir (homeostaz); bu aralığın dışına çıkılması
            (asidoz veya alkaloz) ciddi fizyolojik sonuçlar doğurur. Toprak
            pH'ı, bitkilerin hangi besin maddelerini alabildiğini doğrudan
            belirler ve tarımsal verimliliği etkiler. Atmosferdeki artan
            karbon dioksit, okyanuslar tarafından emilerek karbonik asit
            oluşturur ve deniz suyunun pH'ını kademeli olarak düşürür — bu
            olgu "okyanus asitleşmesi" olarak adlandırılır ve mercan
            resifleri gibi kalsiyum karbonat iskeletine sahip deniz
            canlıları için ciddi bir tehdit oluşturur.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Kaynaklar</h2>
          <p>
            pH tanımı ve Kw sabiti, IUPAC&apos;ın standart kimya
            tanımlarına ve 25°C referans sıcaklığına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <PhCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
