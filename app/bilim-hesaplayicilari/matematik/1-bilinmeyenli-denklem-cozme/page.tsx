import type { Metadata } from "next";
import Link from "next/link";
import EquationSolverCalculator from "../../../components/EquationSolverCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bu araç hangi denklem türlerini çözer?",
    answer:
      "Tek bilinmeyenli doğrusal, karesel ve daha yüksek dereceli denklemler, logaritmik denklemler, eşitsizlikler (<, >, ≤, ≥) çözülür; ayrıca türev, belirli integral ve limit hesaplamaları da yapılabilir.",
  },
  {
    question: "Denklemi nasıl yazmalıyım?",
    answer:
      "Çarpma için * (örn. 2*x), üs için ^ (örn. x^2) kullan. Bilinmeyeni x, y, t gibi herhangi bir harfle yazabilirsin — hangi harfi kullandığını otomatik tanırız. '=' işareti olmadan sadece bir ifade yazarsan (örn. log(43)) direkt değerini hesaplarız.",
  },
  {
    question: "Sonucu görsel matematik yazısıyla girebilir miyim?",
    answer:
      "Evet — 'Görsel Editör' sekmesinde üs, kesir, kök gibi ifadeleri gerçek matematik yazısı gibi (kağıt üzerindeki gibi) girebilir, dokunmatik matematik klavyesini kullanabilirsin.",
  },
  {
    question: "Denklemin çözümü yoksa ne olur?",
    answer:
      "Örneğin negatif sayının karekökü gibi gerçek sayılarda çözümü olmayan durumlarda, veya girilen ifade ayrıştırılamadığında bunu açıkça belirten bir mesaj gösterilir.",
  },
];

export const metadata: Metadata = {
  title: "1 Bilinmeyenli Denklem Çözme: Adım Adım Çözüm",
  description:
    "Tek (1) bilinmeyenli denklem ve eşitsizlikleri, türev/integral/limit ifadelerini adım adım çöz — yazıyla veya görsel matematik editörüyle.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/1-bilinmeyenli-denklem-cozme",
  },
  openGraph: {
    title: "1 Bilinmeyenli Denklem Çözme: Adım Adım Çözüm",
    description: "Tek bilinmeyenli denklemleri adım adım çöz.",
    url: buildSiteUrl("/bilim-hesaplayicilari/matematik/1-bilinmeyenli-denklem-cozme"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function BirBilinmeyenliDenklemCozmePage() {
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
        name: "1 Bilinmeyenli Denklem Çözme",
        item: buildSiteUrl("/bilim-hesaplayicilari/matematik/1-bilinmeyenli-denklem-cozme"),
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
          <span>1 Bilinmeyenli Denklem Çözme</span>
        </nav>

        <header className="all-conversions-header">
          <h1>1 Bilinmeyenli Denklem Çözme</h1>
          <p>
            Tek (1) bilinmeyenli denklem ve eşitsizlikleri adım adım çöz —
            yazıyla veya görsel matematik editörüyle, fotoğraftan okutarak
            bile.
          </p>
        </header>

        <div className="unit-page-layout wide-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Denklem çözmek ne demektir?</h2>
          <p>
            Bir <strong>denklem</strong>, içinde bilinmeyen (genellikle x ile
            gösterilen) bir veya daha fazla terim barındıran, iki ifadenin
            eşitliğini belirten bir matematiksel cümledir. Denklemi{" "}
            <strong>çözmek</strong>, eşitliği doğru yapan bilinmeyen
            değer(ler)i — köklerini — bulmak demektir. Örneğin 2x + 3 = 11
            denkleminde x = 4 tek çözümdür, çünkü 2×4 + 3 = 11 doğrudur.
          </p>

          <h2>Bu araç ne yapabilir?</h2>
          <p>
            Doğrusal denklemler (2x+3=11), karesel ve daha yüksek dereceli
            polinom denklemleri (x²-5x+6=0), logaritmik denklemler
            (log(x,2)=5), eşitsizlikler (x²-4&gt;0) çözülür. Ayrıca sadece bir
            ifade girip (&quot;=&quot; işareti olmadan) değerini direkt hesaplatabilir,
            veya türev (d(...)), belirli integral (integral(...)) ve limit
            (lim(...)) işlemleri yapabilirsin.
          </p>

          <h2>Nasıl çözülür — hangi yöntem kullanılır?</h2>
          <p>
            Denklem türüne göre farklı yöntemler devreye girer: logaritmik
            denklemler, taban değiştirme ve logaritma kurallarıyla
            cebirsel olarak; doğrusal ve polinom denklemler cebirsel/kök
            bulma yöntemleriyle; kapalı formda çözümü olmayan veya karışık
            (örn. üstel + polinom) denklemler ise sayısal yöntemle (kök
            arama) çözülür. Eşitsizlikler işaret analiziyle — ifadenin sıfır
            olduğu ve tanımsız olduğu noktalar arasındaki her aralıkta
            işaretin sabit kaldığından yararlanılarak — çözülür.
          </p>

          <h2>Yazıyla mı, görsel editörle mi?</h2>
          <p>
            İki giriş yöntemi de aynı çözücüyü kullanır. <strong>Yazıyla Gir</strong>{" "}
            sekmesinde klavyeyle düz metin olarak yazarsın (çarpma için *, üs
            için ^) ve isteğe bağlı olarak bir denklem fotoğrafını
            yükleyip otomatik okutabilirsin (deneysel özellik).{" "}
            <strong>Görsel Editör</strong> sekmesinde ise üs, kesir, kök gibi
            ifadeleri kağıt üzerindeki gibi gerçek matematik yazısıyla
            girersin — dokunmatik cihazlarda matematik klavyesi otomatik
            açılır.
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
            İkinci dereceden bir denklemin varsa, delta (diskriminant) ile{" "}
            <Link href="/bilim-hesaplayicilari/matematik/ikinci-dereceden-denklem-cozme">
              İkinci Dereceden Denklem Çözme
            </Link>{" "}
            aracını; iki bilinmeyenli bir denklem sistemin varsa{" "}
            <Link href="/bilim-hesaplayicilari/matematik/2-bilinmeyenli-denklem-sistemi-cozme">
              2 Bilinmeyenli Denklem Sistemi Çözme
            </Link>{" "}
            aracını, üç bilinmeyenli bir sistemin varsa{" "}
            <Link href="/bilim-hesaplayicilari/matematik/3-bilinmeyenli-denklem-sistemi-cozme">
              3 Bilinmeyenli Denklem Sistemi Çözme
            </Link>{" "}
            aracını kullanabilirsin. Sadece logaritma taban/sayı/sonuç
            hesaplamak istiyorsan{" "}
            <Link href="/bilim-hesaplayicilari/matematik/logaritma-hesaplama">
              Logaritma Hesaplama
            </Link>{" "}
            aracına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Denklem çözme yöntemleri (cebirsel çözüm, işaret analizi,
            sayısal kök bulma), türev/integral/limit tanımları standart
            lise ve üniversite matematik müfredatına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <EquationSolverCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
