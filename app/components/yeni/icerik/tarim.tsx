// /tarim sayfasinin icerigi: dekar basina verim, dekar basina doz, yagis miktari ve alana gore fiyat tek sayfada.
// Sayilar cevirici ile ayni fonksiyondan (convert) uretilir.
import Link from "@/app/components/SiteLink";
import { convert } from "../../../converter/convert";
import { formatSayi } from "../sayi";
import type { BirlesikIcerik } from "./tipler";

const t = (kategori: string, deger: number, kimden: string, kime: string) => formatSayi(convert(kategori, deger, kimden, kime));
// "yaklaşık" denen yerlerde yuvarlanmis deger.
const y = (kategori: string, deger: number, kimden: string, kime: string, basamak = 1) =>
  formatSayi(Number(convert(kategori, deger, kimden, kime).toFixed(basamak)));

export const tarimIcerigi: BirlesikIcerik = {
  baslik: "Tarım ve Arazi Birimleri: kg/da, t/ha, L/da, mm Yağış ve ₺/dönüm Çevirici",
  aciklama:
    "Dekar başına verim (kg/da, t/ha), ilaç ve gübre dozu (mL/da, L/ha), yağış (mm, kg/m², ton/dekar) ve arazi fiyatı (₺/m², ₺/dönüm, ₺/ha) arasında çeviri. Hektar ile dekar, ilaç etiketi okuma ve yağışın sulama karşılığı.",
  h1: "Tarım ve Arazi Birimleri Çevirici",
  ozet: (
    <>
      Verim, ilaç dozu, yağış ve arazi fiyatı hep bir alan birimine bölünerek yazılır: dekar başına kilogram, hektar
      başına litre, metrekare başına lira. Kaynaklar farklı alan birimleri kullandığı için aynı değer bir yerde kg/da,
      başka yerde t/ha olarak karşınıza çıkar. Aşağıdaki çeviriciler bu farkı kapatır.
    </>
  ),
  giris: [
    {
      id: "dekar-hektar",
      baslik: "Dekar, dönüm, hektar: önce alan birimleri",
      govde: (
        <>
          <p>
            Türkiye&apos;de tarımda temel alan birimi dekardır: 1 dekar 1.000 m²&apos;dir. Günlük dilde dönüm de aynı
            anlamda kullanılır; tapuda ve resmî kayıtlarda 1 dönüm = 1 dekar = 1.000 m² kabul edilir. Uluslararası
            istatistikler ve yabancı kaynaklar ise hektar kullanır: 1 hektar 10.000 m², yani 10 dekardır. ABD&apos;de
            karşınıza çıkan acre yaklaşık {y("alan", 1, "ac", "dekar", 2)} dekardır.
          </p>
          <p>
            Bu yüzden &quot;dekar başına&quot; bir değeri &quot;hektar başına&quot; değere çevirmek için 10 ile
            çarpmak yeterlidir: 300 kg/da, {t("alan_verim", 300, "kg/da", "kg/ha")} kg/ha ya da{" "}
            {t("alan_verim", 300, "kg/da", "t/ha")} t/ha eder. Arazinin kendisini m², dönüm ve hektar arasında çevirmek
            için <Link href="/alan">alan çeviricisini</Link> kullanabilirsiniz.
          </p>
        </>
      ),
    },
  ],
  parcalar: [
    {
      id: "verim",
      kategori: "dekar-basina-verim",
      sekme: "Verim",
      baslik: "Verim: kg/dekar, ton/hektar",
      govde: (
        <>
          <p>
            Türkiye&apos;de çiftçi verimi dekar başına kilogramla konuşur: &quot;buğday dekara 400 kilo verdi&quot;
            gibi. TÜİK ve FAO gibi kurumların istatistiklerinde ise verim hektar başına ton ya da kilogram ile yazılır.
            Türkiye&apos;de buğdayın ülke ortalaması son yıllarda hektar başına 3 ton civarındadır; bu da dekar başına
            yaklaşık 300 kg demektir. Sulanan ve iyi bakılan tarlalarda bu değer çok daha yüksek olabilir.
          </p>
          <p>
            ABD kaynaklı tohum kataloglarında verim çoğu zaman pound/acre ya da bushel/acre ile verilir. 1.000 lb/acre
            yaklaşık {y("alan_verim", 1000, "lb/acre", "kg/da", 0)} kg/da eder. Bushel ürünün cinsine göre farklı
            ağırlıktadır (buğdayda yaklaşık 27,2 kg, mısırda yaklaşık 25,4 kg), bu yüzden önce kilograma çevrilmesi
            gerekir.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "kg/da", deger: 300 },
        gruplar: [
          { ad: "Dekar", birimler: ["kg/da", "t/da"] },
          { ad: "Hektar", birimler: ["kg/ha", "t/ha"] },
          { ad: "Metrekare ve acre", birimler: ["g/m²", "kg/m²", "lb/acre"] },
        ],
      },
      tablo: { baslik: "Verim birimleri karşılaştırma tablosu", birimler: ["kg/da", "t/da", "kg/ha", "t/ha", "g/m²"] },
    },
    {
      id: "doz",
      kategori: "dekar-basina-doz",
      sekme: "İlaç dozu",
      baslik: "İlaç ve sıvı gübre dozu: mL/dekar, L/hektar",
      govde: (
        <>
          <p>
            Tarım ilaçlarının etiketinde doz genellikle dekar başına mililitre (mL/da) ya da 100 litre suya katılacak
            miktar olarak yazılır. Yabancı kaynaklı ürünlerde ve araştırmalarda ise hektar başına litre (L/ha)
            kullanılır. 1 L/ha {t("alan_doz", 1, "L/ha", "mL/da")} mL/da&apos;ya eşittir; yani hektar başına litre
            değeri, dekar başına mililitre değerinin tam yüz katıdır.
          </p>
          <p>
            Doz, tarlanın tamamına atılacak toplam ilacı bulmak için kullanılır: 80 mL/da dozla 25 dekarlık bir tarla
            için 80 × 25 = 2.000 mL, yani 2 litre ilaç gerekir. Bu ilacın kaç litre suyla karıştırılacağını ve
            pülverizatörün kaç depo atacağını{" "}
            <Link href="/ilaclama-hesaplama">ilaçlama hesaplama</Link> aracı hesaplar. Etiketteki dozu aşmayın;
            fazlası hem bitkiye zarar verir hem de üründe kalıntı bırakır.
          </p>
          <p>
            ABD kaynaklarında doz galon/acre ya da sıvı ons/acre ile yazılır: 1 gal/acre yaklaşık{" "}
            {y("alan_doz", 1, "gal/acre", "L/ha")} L/ha, 1 fl oz/acre yaklaşık {y("alan_doz", 1, "fl oz/acre", "mL/da")}{" "}
            mL/da eder.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "mL/da", deger: 100 },
        gruplar: [
          { ad: "Dekar", birimler: ["mL/da", "L/da"] },
          { ad: "Hektar", birimler: ["mL/ha", "L/ha"] },
          { ad: "Metrekare ve acre", birimler: ["mL/m²", "gal/acre", "fl oz/acre"] },
        ],
      },
      tablo: { baslik: "Doz birimleri karşılaştırma tablosu", birimler: ["mL/da", "L/da", "L/ha", "mL/m²"] },
    },
    {
      id: "yagis",
      kategori: "yagis-miktari",
      sekme: "Yağış",
      baslik: "Yağış: milimetre, kg/m² ve dekara düşen su",
      govde: (
        <>
          <p>
            Meteoroloji yağışı kg/m² ya da milimetre ile verir ve ikisi aynı şeydir: 1 mm yağış, her metrekareye 1 litre
            (1 kilogram) su düşmesi demektir. Bunu tarlaya taşıyınca hesap kolaylaşır: 1 mm yağış, dekar başına 1
            metreküp, yani 1 ton su eder. 20 mm yağmur yağdığında 10 dekarlık bir tarlaya{" "}
            {t("yagis", 20, "mm", "m³/da")} × 10 = 200 ton su düşmüş olur.
          </p>
          <p>
            Bu eşitlik sulamada da işe yarar. Bir ürünün haftada 25 mm suya ihtiyacı varsa dekar başına 25 m³ su vermek
            gerekir; yağan yağmur bu ihtiyaçtan düşülür. Türkiye&apos;de uzun yıllar yıllık yağış ortalaması 570 mm
            civarındadır ama Karadeniz kıyısıyla İç Anadolu arasında birkaç kat fark vardır.
          </p>
          <p>
            Yabancı kaynaklarda yağış inç ile verilir: 1 inç {t("yagis", 1, "inç", "mm")} mm&apos;dir. Kar ise yağmurla
            aynı ölçülmez; taze karın yoğunluğu değiştiği için kaba bir kural olarak 10 cm kar yaklaşık 10 mm suya
            karşılık gelir, ıslak ve ağır karda bu oran daha yüksektir.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "mm", deger: 10 },
        gruplar: [
          { ad: "Yağış yüksekliği", birimler: ["mm", "cm", "inç"] },
          { ad: "Düşen su", birimler: ["L/m²", "kg/m²", "m³/da", "m³/ha"] },
        ],
      },
      tablo: { baslik: "Yağış birimleri karşılaştırma tablosu", birimler: ["mm", "cm", "inç", "m³/da", "m³/ha"] },
    },
    {
      id: "fiyat",
      kategori: "alana-gore-fiyat",
      sekme: "Arazi fiyatı",
      baslik: "Arazi fiyatı: ₺/m², ₺/dönüm, ₺/hektar",
      govde: (
        <>
          <p>
            Tarla ilanlarında fiyat çoğu zaman dönüm başına, arsa ve konut ilanlarında metrekare başına verilir. İki
            ilanı karşılaştırmak için aynı birime çevirmek gerekir: 1 dönüm 1.000 m² olduğu için 250.000 ₺/dönüm,{" "}
            {t("alan_fiyat", 250000, "₺/dönüm", "₺/m²")} ₺/m² eder. Hektar fiyatı ise dönüm fiyatının 10 katıdır.
          </p>
          <p>
            Yurt dışındaki arazi fiyatları acre ya da fitkare başına verilir. Çevirici yalnızca alan birimini değiştirir;
            para birimi lira olarak kalır. Dolar ya da euro ile verilen bir fiyatı önce liraya çevirip sonra buraya
            yazın. 1 acre yaklaşık {y("alan", 1, "ac", "dekar", 2)} dönüm olduğu için acre başına fiyat, dönüm başına
            fiyatın yaklaşık 4 katıdır.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "₺/m²", deger: 100 },
        gruplar: [
          { ad: "Türkiye", birimler: ["₺/m²", "₺/dönüm", "₺/ha", "₺/km²"] },
          { ad: "Yabancı ilanlar", birimler: ["₺/acre", "₺/ft²"] },
        ],
      },
      tablo: { baslik: "Alana göre fiyat karşılaştırma tablosu", birimler: ["₺/m²", "₺/dönüm", "₺/ha", "₺/acre"] },
    },
  ],
  bolumler: [],
  ilgili: [
    { href: "/tarla-donum-hesaplama", ad: "Tarla dönüm hesaplama" },
    { href: "/ilaclama-hesaplama", ad: "İlaçlama hesaplama" },
    { href: "/gubre-ihtiyaci-hesaplama", ad: "Gübre ihtiyacı hesaplama" },
    { href: "/tohum-miktari-hesaplama", ad: "Tohum miktarı hesaplama" },
    { href: "/dekara-fidan-sayisi-hesaplama", ad: "Dekara fidan sayısı" },
    { href: "/alan", ad: "Alan çevirici" },
  ],
  sss: [
    {
      question: "1 ton/hektar kaç kg/dekar?",
      answer: `1 t/ha ${t("alan_verim", 1, "t/ha", "kg/da")} kg/da eder. 1 hektar 10 dekar olduğu için 1 tonun onda biri bir dekara düşer.`,
    },
    {
      question: "Dekar ile dönüm aynı mı?",
      answer: "Evet. Bugün tapuda ve tarımda 1 dönüm = 1 dekar = 1.000 m² kabul edilir. 1 hektar 10 dekardır.",
    },
    {
      question: "1 L/ha kaç mL/dekar?",
      answer: `1 L/ha ${t("alan_doz", 1, "L/ha", "mL/da")} mL/da eder. Örneğin 0,5 L/ha doz, dekara 50 mL demektir.`,
    },
    {
      question: "1 mm yağış kaç litre?",
      answer: "1 mm yağış metrekareye 1 litre su demektir. Dekara 1 m³ (1 ton), hektara 10 m³ su düşer.",
    },
    {
      question: "kg/m² ile mm yağış aynı mı?",
      answer: "Evet. Meteorolojinin kg/m² olarak verdiği yağış, milimetre ile aynı sayıdır: 15 kg/m² = 15 mm.",
    },
    {
      question: "Dönüm fiyatı metrekare fiyatına nasıl çevrilir?",
      answer: `Dönüm fiyatını 1.000'e bölün. ${t("alan_fiyat", 500000, "₺/dönüm", "₺/dönüm")} ₺/dönüm, ${t("alan_fiyat", 500000, "₺/dönüm", "₺/m²")} ₺/m² eder.`,
    },
  ],
  kaynaklar: [
    { ad: "TÜİK, Bitkisel Üretim İstatistikleri", href: "https://data.tuik.gov.tr/" },
    { ad: "FAO, FAOSTAT tarımsal üretim verileri", href: "https://www.fao.org/faostat/" },
    { ad: "Meteoroloji Genel Müdürlüğü, yağış verileri", href: "https://www.mgm.gov.tr/" },
    { ad: "NIST, Inch-pound ve SI birimleri arasında dönüşüm faktörleri (SP 811)", href: "https://www.nist.gov/pml/special-publication-811" },
  ],
  guncelleme: "2026-11-12",
};
