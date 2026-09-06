import type { Metadata } from "next";
import Link from "next/link";
import StoichiometryCalculator from "../../../components/StoichiometryCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Stokiyometri nedir?",
    answer:
      "Stokiyometri, dengelenmiş bir kimyasal denklemdeki katsayıları kullanarak reaktan ve ürünlerin mol, kütle veya hacim ilişkilerini hesaplama yöntemidir.",
  },
  {
    question: "Stokiyometrik hesaplama nasıl yapılır?",
    answer:
      "Önce bilinen maddenin mol sayısı bulunur (kütle biliniyorsa n = m/M ile). Ardından denklem katsayıları oranı kullanılarak hedef maddenin mol sayısı bulunur: n(hedef) = n(bilinen) × (katsayı hedef / katsayı bilinen). Son olarak mol sayısı, molar kütleyle çarpılarak kütleye çevrilir.",
  },
  {
    question: "Denklem katsayısı nedir, neden önemlidir?",
    answer:
      "Denklem katsayısı, dengelenmiş bir kimyasal denklemde her maddenin kaç mol tepkimeye girdiğini/oluştuğunu gösteren sayıdır (örneğin 2H₂ + O₂ → 2H₂O denkleminde H₂'nin katsayısı 2'dir). Bu oranlar, mol bazında tepkimenin gerçek stokiyometrisini yansıtır.",
  },
  {
    question: "Katsayıları bilmiyorsam ne yapmalıyım?",
    answer:
      "Basit 1:1 mol oranına sahip bir tepkime varsayıyorsan her iki katsayı alanını da 1 bırakabilirsin. Gerçek bir tepkime için doğru katsayıları denklemi dengeleyerek (veya kaynaklardan bularak) girmen gerekir.",
  },
];

export const metadata: Metadata = {
  title: "Stokiyometri Hesaplama: Mol Oranı ve Kütle Hesaplayıcı",
  description:
    "Dengelenmiş bir kimyasal denklemdeki katsayıları kullanarak bilinen maddenin kütle veya mol sayısından hedef maddenin miktarını anında hesaplayın.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/kimya/stokiyometri-hesaplama",
  },
  openGraph: {
    title: "Stokiyometri Hesaplama: Mol Oranı ve Kütle Hesaplayıcı",
    description:
      "Dengelenmiş denklem katsayılarından reaktan/ürün miktarlarını hesaplayın.",
    url: buildSiteUrl("/bilim-hesaplayicilari/kimya/stokiyometri-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function StokiyometriHesaplamaPage() {
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
        name: "Stokiyometri Hesaplama",
        item: buildSiteUrl(
          "/bilim-hesaplayicilari/kimya/stokiyometri-hesaplama"
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
          <Link href="/bilim-hesaplayicilari/kimya">Kimya</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Stokiyometri Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Stokiyometri Hesaplama</h1>
          <p>
            Dengelenmiş denklem katsayılarını ve bilinen maddenin kütle
            veya mol sayısını gir, hedef maddenin miktarını hesapla.
          </p>
        </header>

        <div className="unit-page-layout chem-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Stokiyometri nedir?</h2>
          <p>
            Stokiyometri, kimyasal tepkimelerdeki madde miktarları
            arasındaki nicel ilişkileri inceleyen kimya dalıdır. Adı,
            Yunanca "stoicheion" (element, temel bileşen) ve "metron"
            (ölçü) kelimelerinden türetilmiştir. Bir tepkimenin dengelenmiş
            denklemi, reaktanların ürünlere hangi mol oranında dönüştüğünü
            gösterir; stokiyometrik hesaplamalar bu oranları kullanarak
            "bu kadar reaktandan ne kadar ürün elde edilir" gibi soruları
            yanıtlar.
          </p>

          <h2>Stokiyometrik hesabın üç adımı</h2>
          <p>
            Bir stokiyometri probleminin çözümü klasik olarak üç adımdan
            oluşur: <strong>(1)</strong> bilinen maddenin kütlesi, molar
            kütlesine bölünerek mol sayısına çevrilir (n = m/M);{" "}
            <strong>(2)</strong> dengelenmiş denklemin katsayı oranı
            kullanılarak hedef maddenin mol sayısı bulunur (n_hedef =
            n_bilinen × katsayı_hedef / katsayı_bilinen);{" "}
            <strong>(3)</strong> hedef maddenin mol sayısı, kendi molar
            kütlesiyle çarpılarak kütleye çevrilir (m = n × M). Bu üç adım
            zinciri, kimyagerlerin "mol köprüsü" (mole bridge) olarak
            adlandırdığı, tüm stokiyometri hesaplarının temelini oluşturan
            yöntemdir.
          </p>
          <p>
            Örneğin 2H₂ + O₂ → 2H₂O tepkimesinde, 36 g suyun (2 mol, çünkü
            36/18,02 ≈ 2) elektroliz yoluyla ayrışmasıyla kaç gram oksijen
            gazı oluşacağını bulmak istersek: su ile oksijenin katsayı
            oranı 2:1'dir, bu yüzden 2 mol H₂O'dan 1 mol O₂ (32 g) elde
            edilir.
          </p>

          <h2>Sınırlayıcı reaktif kavramı</h2>
          <p>
            Gerçek tepkimelerde genellikle reaktanlar tam stokiyometrik
            oranda karıştırılmaz; bu durumda bir reaktan diğerinden önce
            tükenir ve tepkimenin ne kadar ürün verebileceğini sınırlar. Bu
            reaktana <strong>sınırlayıcı reaktif</strong> (limiting
            reagent) denir. Sınırlayıcı reaktifi belirlemek için, her
            reaktanın mevcut mol sayısı kendi denklem katsayısına
            bölünerek karşılaştırılır — en küçük orana sahip olan reaktan
            sınırlayıcıdır ve ürün miktarı ona göre hesaplanır.
          </p>

          <h2>Teorik verim ve gerçek verim</h2>
          <p>
            Stokiyometrik hesaplamalar, bir tepkimeden elde edilebilecek
            maksimum ürün miktarını (teorik verim) verir. Ancak
            laboratuvar koşullarında yan tepkimeler, tamamlanmamış
            tepkimeler veya madde kayıpları nedeniyle gerçekte elde edilen
            miktar (gerçek verim) her zaman teorik verimden azdır. Bu
            ikisi arasındaki oran, yüzde verim (% verim = gerçek
            verim/teorik verim × 100) olarak ifade edilir ve endüstriyel
            kimyasal üretim süreçlerinin verimliliğini değerlendirmede
            kritik bir ölçüttür.
          </p>

          <h2>Antoine Lavoisier ve kütlenin korunumu</h2>
          <p>
            Stokiyometrinin bilimsel temeli, 18. yüzyıl sonunda Fransız
            kimyager Antoine Lavoisier'in titiz tartım deneyleriyle
            kanıtladığı <strong>kütlenin korunumu yasasına</strong> dayanır:
            kapalı bir sistemde kimyasal bir tepkimede kütle ne yaratılır
            ne de yok edilir. Lavoisier'in bu bulgusu, kimyasal
            denklemlerin neden dengelenmesi gerektiğinin (her iki tarafta
            aynı sayıda atom bulunması gerektiğinin) temel dayanağıdır ve
            modern kimyanın bir bilim dalı olarak kurulmasında dönüm
            noktası kabul edilir.
          </p>

          <h2>Gerçek dünyada stokiyometri kullanımı</h2>
          <p>
            Stokiyometri, ilaç üretiminde etken madde miktarlarının
            hesaplanmasından, roket yakıtı formülasyonlarının doğru
            oranlarda hazırlanmasına, gübre üretiminde hammadde
            miktarlarının planlanmasından otomobil hava yastıklarında
            sodyum azidin ne kadar hızlı gaz üreteceğinin hesaplanmasına
            kadar geniş bir endüstriyel uygulama alanına sahiptir.
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
            Stokiyometri hesaplamaları, kütlenin korunumu yasasına ve
            IUPAC&apos;ın mol ve derişim tanımlarına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <StoichiometryCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
