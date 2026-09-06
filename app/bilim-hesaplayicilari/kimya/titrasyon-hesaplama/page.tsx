import type { Metadata } from "next";
import Link from "next/link";
import TitrationCalculator from "../../../components/TitrationCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Titrasyon nedir?",
    answer:
      "Titrasyon, derişimi bilinmeyen bir asit (veya baz) çözeltisinin, derişimi bilinen bir baz (veya asit) çözeltisiyle tam olarak nötrleştirilmesi yoluyla derişiminin belirlendiği laboratuvar yöntemidir.",
  },
  {
    question: "Titrasyon formülü nedir?",
    answer:
      "Eşdeğerlik noktasında Cₐ × Vₐ × asit değerliği = Cb × Vb × baz değerliği bağıntısı geçerlidir. Tek değerlikli (monoprotik) asit-baz çiftlerinde bu basitçe CₐVₐ = CbVb'ye indirgenir.",
  },
  {
    question: "Asit ve baz değerliği ne anlama gelir?",
    answer:
      "Asit değerliği, bir asit molekülünün açığa çıkarabildiği H⁺ iyonu sayısıdır (HCl için 1, H₂SO₄ için 2). Baz değerliği ise bir baz molekülünün nötrleyebildiği OH⁻ iyonu sayısıdır (NaOH için 1, Ca(OH)₂ için 2).",
  },
  {
    question: "Eşdeğerlik noktası ne demektir?",
    answer:
      "Eşdeğerlik noktası, asitten açığa çıkan H⁺ mol sayısının, bazın nötrlediği OH⁻ mol sayısına tam olarak eşit olduğu andır — titrasyonun tamamlandığı, indikatörün renk değiştirdiği noktadır.",
  },
];

export const metadata: Metadata = {
  title: "Titrasyon Hesaplama: Asit-Baz Nötrleşme Hesaplayıcı",
  description:
    "Asit ve baz derişimi, hacmi ve değerliğinden eksik değeri CₐVₐ × asit değerliği = CbVb × baz değerliği bağıntısıyla anında hesaplayın.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/kimya/titrasyon-hesaplama",
  },
  openGraph: {
    title: "Titrasyon Hesaplama: Asit-Baz Nötrleşme Hesaplayıcı",
    description:
      "Asit-baz titrasyonunda eksik derişim veya hacmi anında hesaplayın.",
    url: buildSiteUrl("/bilim-hesaplayicilari/kimya/titrasyon-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function TitrasyonHesaplamaPage() {
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
        name: "Titrasyon Hesaplama",
        item: buildSiteUrl("/bilim-hesaplayicilari/kimya/titrasyon-hesaplama"),
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
          <span>Titrasyon Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Titrasyon Hesaplama</h1>
          <p>
            Asit veya baz derişimi, hacmi ve değerliğinden eksik olan
            değeri, eşdeğerlik noktası bağıntısıyla hesapla.
          </p>
        </header>

        <div className="unit-page-layout chem-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Titrasyon nedir?</h2>
          <p>
            Titrasyon, kimyada bir çözeltinin derişimini belirlemek için
            kullanılan temel bir laboratuvar yöntemidir. Derişimi bilinen
            bir çözelti (genellikle baz), derişimi bilinmeyen bir asit
            çözeltisine, indikatör renk değiştirene kadar yavaş yavaş
            eklenir. Renk değişiminin gerçekleştiği an, eşdeğerlik noktası
            olarak kabul edilir.
          </p>

          <h2>Eşdeğerlik noktası bağıntısı</h2>
          <p>
            Eşdeğerlik noktasında, asitten açığa çıkan toplam H⁺ mol
            sayısı, bazın nötrlediği toplam OH⁻ mol sayısına eşittir:{" "}
            <strong>Cₐ × Vₐ × asit değerliği = Cb × Vb × baz değerliği</strong>.
            Tek değerlikli (monoprotik) asit ve bazlar için (HCl, NaOH gibi)
            değerlik 1 olduğundan bu bağıntı basitçe CₐVₐ = CbVb'ye
            indirgenir.
          </p>
          <p>
            Örneğin 25 mL, 0,1 mol/L'lik bir HCl çözeltisini tam olarak
            nötrlemek için gereken 0,1 mol/L'lik NaOH hacmi, (0,1 × 25) /
            0,1 = <strong>25 mL</strong> olur — çünkü ikisi de tek
            değerliklidir.
          </p>

          <h2>Çok değerlikli asit ve bazlarda dikkat</h2>
          <p>
            H₂SO₄ gibi iki değerlikli bir asit titre edilirken, her bir mol
            H₂SO₄ iki mol H⁺ açığa çıkarır; bu yüzden hesaplamada asit
            değerliği 2 olarak girilmelidir. Aksi hâlde hesaplanan derişim
            veya hacim gerçek değerin yarısı ya da iki katı çıkabilir.
          </p>

          <h2>Titrasyonun kısa tarihi</h2>
          <p>
            Titrasyon yönteminin temelleri 18. yüzyıl sonlarına dayanır;
            Fransız kimyager François Antoine Henri Descroizilles, 1791'de
            ilk büret benzeri aleti tasarlayarak çamaşır suyu üreticilerinin
            ürünlerindeki aktif klor miktarını standart biçimde ölçmesini
            sağladı. Yöntem henüz kaba ve zahmetliydi.
          </p>
          <p>
            1824'te Joseph Louis Gay-Lussac, bugünkü büret tasarımına çok
            daha yakın, hassas ölçüm yapılabilen bir alet geliştirdi ve bunu
            gümüş içeriğini belirlemek için kullandı; bu, titrasyonun
            endüstriyel kalite kontrolünde ciddi biçimde kullanılmaya
            başlandığı dönüm noktasıdır. 1855'te Karl Friedrich Mohr,
            büretin musluk (stopcock) tasarımını iyileştirerek yöntemi
            bugün laboratuvarlarda kullanılan hâline yaklaştırdı ve
            "Titrimetrische Methoden" adlı kitabıyla analitik kimyanın
            standart bir dalı hâline getirdi.
          </p>

          <h2>İndikatör seçimi neden önemlidir?</h2>
          <p>
            İndikatörler, kendileri de zayıf asit veya zayıf baz olan ve
            belirli bir pH aralığında renk değiştiren boyar maddelerdir.
            Fenolftalein, pH 8,2-10 aralığında renksizden pembeye döner;
            metil oranj ise pH 3,1-4,4 aralığında kırmızıdan sarıya döner.
            Bu farklı dönüm aralıkları, indikatörün kendi ayrışma sabitine
            (pKa) bağlıdır.
          </p>
          <p>
            Güçlü asit-güçlü baz titrasyonunda (örneğin HCl-NaOH),
            eşdeğerlik noktası tam pH 7'de gerçekleşir ve pH, eşdeğerlik
            noktası civarında çok dik bir sıçrama gösterir — bu yüzden
            fenolftalein de metil oranj da kullanılabilir. Ancak zayıf
            asit-güçlü baz titrasyonunda (örneğin asetik asit-NaOH),
            eşdeğerlik noktası 7'nin üzerinde gerçekleştiği için yalnızca
            fenolftalein doğru sonuç verir; metil oranj kullanılırsa
            titrasyon noktası gerçek eşdeğerlik noktasından önce, yanlış
            bir yerde tespit edilir.
          </p>

          <h2>Adım adım çözümlü örnek problem</h2>
          <p>
            <strong>Soru:</strong> Derişimi bilinmeyen 20 mL'lik bir H₂SO₄
            çözeltisi, 0,2 mol/L'lik NaOH çözeltisiyle titre ediliyor.
            Eşdeğerlik noktasına ulaşmak için 30 mL NaOH harcandığına göre,
            H₂SO₄ çözeltisinin derişimi kaç mol/L'dir?
          </p>
          <p>
            <strong>Çözüm:</strong> H₂SO₄ iki değerlikli bir asit (asit
            değerliği = 2), NaOH ise tek değerlikli bir bazdır (baz
            değerliği = 1). Eşdeğerlik bağıntısını kurarız:
          </p>
          <p>
            Cₐ × Vₐ × 2 = C_NaOH × V_NaOH × 1
            <br />
            Cₐ × 20 × 2 = 0,2 × 30 × 1
            <br />
            Cₐ × 40 = 6
            <br />
            Cₐ = 6 / 40 = <strong>0,15 mol/L</strong>
          </p>
          <p>
            Bu sonucu yukarıdaki hesap makinesine Cₐ hedefini seçip Vₐ=20
            mL, Cb=0,2 mol/L, Vb=30 mL, asit değerliği=2, baz değerliği=1
            girerek doğrulayabilirsin.
          </p>

          <h2>Titrasyonda sık yapılan hatalar</h2>
          <p>
            <strong>Değerlik faktörünü unutmak:</strong> H₂SO₄, H₃PO₄ gibi
            çok değerlikli asitlerde değerlik sayısını 1 olarak bırakmak,
            en sık yapılan hatadır ve sonucu doğrudan iki (veya üç) kat
            yanlış çıkarır.
          </p>
          <p>
            <strong>Hacim birimlerini karıştırmak:</strong> Bir taraf mL,
            diğer taraf L cinsinden girilirse sonuç 1000 kat yanlış çıkar;
            bu yüzden formülde her iki hacmin de aynı birimde olması
            gerekir.
          </p>
          <p>
            <strong>Paralaks okuma hatası:</strong> Büretteki sıvı
            seviyesini okurken göz, ölçek ile aynı yükseklikte olmazsa,
            gerçek hacimden farklı bir değer okunur — bu, deneysel
            titrasyonlarda gerçek hesaplama hatası değil ama ölçüm hatası
            kaynağıdır ve sonucu doğrudan etkiler.
          </p>
          <p>
            <strong>Yanlış indikatör seçimi:</strong> Zayıf asit-güçlü baz
            veya güçlü asit-zayıf baz titrasyonlarında indikatörün dönüm
            aralığı eşdeğerlik noktasıyla örtüşmezse, titrasyon gerçek
            eşdeğerlik noktasından farklı bir hacimde "bitmiş" gibi
            görünür.
          </p>

          <h2>Titrasyon eğrisinin matematiksel modeli</h2>
          <p>
            Bir titrasyon sırasında pH, eklenen titrant hacmine karşı
            çizildiğinde S biçimli bir eğri elde edilir. Güçlü asit-güçlü
            baz titrasyonunda başlangıçta pH yavaş değişir, eşdeğerlik
            noktasına yaklaşırken birkaç damla titrantla bile pH birkaç
            birim birden sıçrar, ardından tekrar yavaşlar. Bu dik sıçrama
            bölgesi, [H⁺] derişiminin eşdeğerlik noktası civarında
            logaritmik ölçekte çok küçük hacim değişimlerine karşı aşırı
            duyarlı hâle gelmesinden kaynaklanır.
          </p>
          <p>
            Zayıf asit-güçlü baz titrasyonlarında ise eşdeğerlik noktasına
            kadar olan bölgede bir <strong>tamponlama bölgesi</strong>{" "}
            oluşur; bu bölgede pH,{" "}
            <strong>Henderson-Hasselbalch denklemi</strong> ile modellenir:
            pH = pKa + log([A⁻]/[HA]). Titrasyonun tam yarısına
            (yarı-eşdeğerlik noktasına) ulaşıldığında [A⁻] = [HA]
            olduğundan log terimi sıfırlanır ve pH = pKa olur — bu, zayıf
            bir asidin ayrışma sabitini deneysel olarak belirlemenin
            standart yöntemlerinden biridir.
          </p>

          <h2>İndikatörlerin kimyasal denge teorisi</h2>
          <p>
            Bir asit-baz indikatörü, kendisi de zayıf bir asit (HIn) veya
            zayıf bir bazdır ve şu dengeye uyar: HIn ⇌ H⁺ + In⁻. HIn ve
            In⁻ formları farklı renklere sahiptir; gözlenen renk, bu iki
            formun derişim oranına ([In⁻]/[HIn]) bağlıdır. Bu oranı
            derişimlerle ilişkilendiren denge ifadesi Ka(indikatör) =
            [H⁺][In⁻]/[HIn] şeklindedir ve buradan pH = pKa(In) +
            log([In⁻]/[HIn]) elde edilir — insan gözü genellikle oranın
            yaklaşık 1:10 ile 10:1 arasında olduğu, yani pH'ın pKa(In) ±1
            aralığında olduğu bölgede net bir renk değişimi algılar. Bu
            kuramsal çerçeve, 1894'te Alman fizikokimyacı Wilhelm Ostwald
            tarafından geliştirilen "iyonik indikatör teorisi"ne dayanır.
          </p>

          <h2>Asit-baz dışındaki titrasyon türleri</h2>
          <p>
            Titrimetrik analiz, asit-baz nötrleşmesiyle sınırlı değildir.{" "}
            <strong>Redoks titrasyonunda</strong>, potasyum permanganat
            (KMnO₄) gibi güçlü bir yükseltgen, kendi rengi sayesinde ayrı
            bir indikatöre gerek duymadan (kendinden indikatörlü) demir(II)
            gibi indirgen maddelerin derişimini belirlemede kullanılır.{" "}
            <strong>Çöktürme titrasyonunda</strong> (Mohr yöntemi), gümüş
            nitrat (AgNO₃) çözeltisiyle klorür iyonu derişimi, gümüş
            kromatın karakteristik kırmızımsı çökeltisinin oluşumu izlenerek
            tayin edilir. <strong>Kompleksometrik titrasyonda</strong> ise
            EDTA (etilendiamintetraasetik asit), kalsiyum ve magnezyum gibi
            metal iyonlarıyla kararlı kompleksler oluşturarak su sertliği
            gibi ölçümlerde kullanılır.
          </p>

          <h2>Potansiyometrik titrasyon: indikatörsüz yöntem</h2>
          <p>
            Modern analitik laboratuvarlarda, renk değişimine dayanan görsel
            indikatörler yerine bir pH-metre veya iyon-seçici elektrot
            kullanılarak eşdeğerlik noktası doğrudan ölçülebilir. Bu
            yöntemde pH, titrant hacmine karşı sürekli kaydedilir ve
            eşdeğerlik noktası, eğrinin birinci türevinin (dpH/dV) maksimum
            olduğu nokta olarak matematiksel şekilde belirlenir — bu, renkli
            veya bulanık çözeltilerde görsel indikatörlerin yetersiz kaldığı
            durumlarda çok daha hassas bir sonuç sağlar.
          </p>

          <h2>Birincil standart kavramı ve doğruluk</h2>
          <p>
            Titrasyonun güvenilirliği, kullanılan standart çözeltinin
            derişiminin ne kadar kesin bilindiğine bağlıdır. Analitik
            kimyada bu amaçla <strong>birincil standart</strong> adı verilen,
            yüksek saflıkta, havada kararlı, kolay tartılabilen ve bilinen
            kesin bir molar kütleye sahip maddeler kullanılır — potasyum
            hidrojen ftalat (KHP), asit çözeltilerinin derişimini kesin
            olarak belirlemek için yaygın kullanılan bir birincil standarttır.
            NaOH gibi çözeltiler ise havadaki CO₂'yi hızla absorbe ettiği
            için birincil standart olarak kullanılamaz; bunun yerine önce
            bir birincil standartla titre edilerek derişimi belirlenir, bu
            sürece <strong>standardizasyon</strong> denir.
          </p>

          <h2>Titrasyonun gerçek dünyadaki kullanım alanları</h2>
          <p>
            Titrasyon, laboratuvar duvarlarının çok ötesinde günlük hayatı
            etkileyen bir yöntemdir. Su arıtma tesislerinde suyun sertliği
            (kalsiyum ve magnezyum iyonu miktarı) EDTA titrasyonuyla
            ölçülür. Gıda ve içecek endüstrisinde sirkenin asetik asit
            oranı, meyve sularının asitlik derecesi titrasyonla belirlenir
            ve ürün etiketlerindeki değerlerin doğruluğu bu şekilde
            denetlenir. İlaç sanayinde, üretilen bir ilacın etken madde
            miktarının belirtilen dozla uyumlu olup olmadığı titrasyon
            yöntemiyle kalite kontrolden geçirilir. Çevre laboratuvarlarında
            ise atık sulardaki kirletici madde derişimleri, deşarj
            standartlarına uygunluk açısından titrasyonla test edilir.
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
            Titrasyon eşdeğerlik bağıntısı, asit-baz nötrleşme
            stokiyometrisine ve IUPAC&apos;ın derişim tanımlarına dayanır.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <TitrationCalculator />
        </div>
        </div>
      </div>
    </main>
  );
}
