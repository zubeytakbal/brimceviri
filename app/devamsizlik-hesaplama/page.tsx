import type { Metadata } from "next";
import Link from "next/link";
import AttendanceCalculator from "../components/AttendanceCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Devamsızlık için sabit, tek bir kural var mı?",
    answer:
      "Hayır. Türkiye'de tüm okul ve üniversiteler için geçerli tek bir sabit devamsızlık sayısı yoktur — her okul, her üniversite, hatta bazen her ders kendi yönetmeliğine göre farklı bir limit uygular. Aşağıdaki 10 gün, %30 gibi rakamlar sık görülen örneklerdir, resmi/evrensel bir kural değildir. Kendi limitini okulunun e-Okul bildirimi, üniversitenin yönetmeliği veya dersin hocasından öğrenip bu araca girmen gerekir.",
  },
  {
    question: "Okulda devamsızlık sınırı kaç gündür?",
    answer:
      "Devamsızlık sınırı okul türüne ve kuruma göre değişir; birçok ilkokul/ortaokul/lisede özürsüz devamsızlık sınırı 10 gün, özürlü+özürsüz toplam sınır ise genellikle 30 güne kadar çıkabilir. Kesin sayı için okulunun e-Okul üzerinden bildirdiği veya yönetmeliğinde belirttiği rakamı kullan — bu araç, sana bildirilen günleri girerek kalan hakkını hesaplamanı sağlar.",
  },
  {
    question: "Üniversitede devamsızlık %30 kuralı nedir?",
    answer:
      "Çoğu üniversitede teorik derslerde devamsızlık sınırı toplam ders saatinin %30'u, uygulamalı/laboratuvar derslerinde ise genellikle %20'sidir; ancak bu oranlar üniversiteden üniversiteye ve dersin yönetmeliğine göre değişebilir. Bu araç, dersin toplam saatini ve sınıfının uyguladığı yüzdeyi girerek kaç saat daha devamsızlık hakkın kaldığını gösterir.",
  },
  {
    question: "Devamsızlık sınırını aşarsam ne olur?",
    answer:
      "Devamsızlık sınırını aşan öğrenciler genellikle o dersten/döneminden başarısız sayılır (üniversitede 'devamsız' notu, okulda ise sınıf tekrarı veya yıl sonu değerlendirmesine alınmama gibi sonuçlar olabilir). Kesin sonuç, kurumunun yönetmeliğine göre değişir; sınırı aşmadan önce öğrenci işleri veya rehberlik servisiyle iletişime geçmen önerilir.",
  },
  {
    question: "Raporlu/özürlü devamsızlık, devamsızlık sınırına dahil mi?",
    answer:
      "Bu genellikle kuruma göre değişir: bazı okul ve üniversitelerde sağlık raporuyla belgelenen devamsızlık ayrı bir kotaya sayılırken, bazılarında toplam devamsızlık sınırına dahil edilir. Bu araçta 'kullanılan devamsızlık' alanına, kurumunun kurallarına göre sayılan günü/saati girmen gerekir.",
  },
];

export const metadata: Metadata = {
  title: "Devamsızlık Hesaplama: Kalan Devamsızlık Hakkını Öğren",
  description:
    "Okul (gün bazlı) veya üniversite (yüzde/saat bazlı) devamsızlık limitine göre kalan devamsızlık hakkını ve kullanım oranını anında hesapla.",
  alternates: {
    canonical: "/devamsizlik-hesaplama",
  },
  openGraph: {
    title: "Devamsızlık Hesaplama: Kalan Devamsızlık Hakkını Öğren",
    description:
      "Toplam gün/ders saatini ve izin verilen limiti gir, kalan devamsızlık hakkını ve kullanım oranını anında hesapla.",
    url: buildSiteUrl("/devamsizlik-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function AttendanceCalculatorPage() {
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
        name: "Devamsızlık Hesaplama",
        item: buildSiteUrl("/devamsizlik-hesaplama"),
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
          <span>Devamsızlık Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Devamsızlık Hesaplama</h1>
          <p>
            Okul (gün bazlı) veya üniversite (yüzde/saat bazlı) devamsızlık
            limitine göre kalan devamsızlık hakkını ve kullanım oranını
            anında hesapla.
          </p>
        </header>

        <AttendanceCalculator />

        <section className="category-article-content">
          <h2>Gün bazlı mı, yüzde bazlı mı?</h2>
          <p>
            İlkokul, ortaokul ve lisede devamsızlık genellikle{" "}
            <strong>gün</strong> üzerinden sayılır — öğretim yılı boyunca
            izin verilen toplam özürsüz/özürlü gün sayısı okul tarafından
            e-Okul üzerinden bildirilir. Üniversitede ise devamsızlık
            genellikle dersin toplam <strong>ders saatinin bir yüzdesi</strong>{" "}
            olarak hesaplanır (örneğin teorik derste %30, uygulamalı derste
            %20 gibi). Bu araç her iki hesaplama biçimini de destekler.
          </p>

          <h2>Kalan hak nasıl hesaplanır?</h2>
          <p>
            Gün bazlı modda: kalan hak = izin verilen devamsızlık günü −
            kullanılan devamsızlık günü. Yüzde bazlı modda: önce izin
            verilen toplam saat, toplam ders saati × izin verilen yüzde /
            100 formülüyle bulunur; ardından kalan hak, bu toplamdan
            kullanılan devamsızlık saati çıkarılarak hesaplanır. Sonuç
            negatifse, devamsızlık sınırı aşılmış demektir.
          </p>

          <h2>Devamsızlık kuralları neden kuruma göre değişir?</h2>
          <p>
            Türkiye&apos;de devamsızlık limitleri; ilkokul-ortaokul-lise için
            Milli Eğitim Bakanlığı&apos;nın ilgili yönetmeliklerine,
            üniversitelerde ise her üniversitenin ve hatta bazen her
            dersin kendi öğretim ve sınav yönetmeliğine göre belirlenir. Bu
            yüzden bu araç, sabit bir kural varsaymak yerine sana bildirilen
            limitleri girmeni ister — böylece sonuç, senin kurumunun gerçek
            kuralına göre doğru çıkar.
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
            Devamsızlık sınırlarına ilişkin genel oranlar (özürsüz 10 gün,
            teorik derste %30 gibi), okul ve üniversitelerin yaygın olarak
            uyguladığı örnek yönetmelik değerlerine dayanır; kesin ve
            güncel kural için kurumunun kendi yönetmeliğini esas almalısın.
          </p>
        </section>
      </div>
    </main>
  );
}
