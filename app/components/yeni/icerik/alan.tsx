// /alan sayfasinin icerigi. Sayilar cevirici ile ayni fonksiyondan (convert) uretilir.
import Link from "@/app/components/SiteLink";
import { convert } from "../../../converter/convert";
import { formatSayi } from "../sayi";
import type { KategoriIcerigi } from "./tipler";

const a = (deger: number, kimden: string, kime: string) => formatSayi(convert("alan", deger, kimden, kime));
// "yaklaşık" denen yerlerde yuvarlanmis deger.
const y = (deger: number, kimden: string, kime: string, basamak = 1) =>
  formatSayi(Number(convert("alan", deger, kimden, kime).toFixed(basamak)));

// 105 m x 68 m futbol sahasi
const SAHA = 105 * 68;

export const alanIcerigi: KategoriIcerigi = {
  baslik: "Alan Çevirici: Metrekare, Dönüm, Dekar, Hektar ve Akre",
  aciklama:
    "Metrekare, dönüm, dekar, hektar, akre ve fitkare arasında anında çeviri. Hesaplanmış çeviri tablosu, tarla ve arsa ölçüleri, brüt ve net metrekare farkı ve eski Türk arazi ölçüleri.",
  ozet: (
    <>
      Bir kutuya değer yazın, diğer bütün birimler aynı anda hesaplansın. Metrekare ve kilometrekarenin yanında
      tarlada kullanılan dönüm, dekar ve hektar, yurt dışı ilanlarında görülen akre ve fitkare ile eski dönüm ve
      evlek de burada.
    </>
  ),
  cevirici: {
    baslangic: { birim: "dönüm", deger: 1 },
    gruplar: [
      { ad: "Metrik", birimler: ["cm²", "m²", "km²"] },
      { ad: "Arazi", birimler: ["a", "dekar", "dönüm", "ha"] },
      { ad: "İngiliz / ABD", birimler: ["in²", "ft²", "yd²", "ac", "mi²"] },
      { ad: "Eski Türk ölçüleri", birimler: ["atik dönüm", "atik evlek", "zirai arşın²"] },
    ],
  },
  ilgili: [
    { href: "/uzunluk", ad: "Uzunluk çevirici" },
    { href: "/tarla-donum-hesaplama", ad: "Tarla dönüm hesaplama" },
    { href: "/emsal-kaks-hesaplama", ad: "Emsal (KAKS) hesaplama" },
    { href: "/fayans-hesaplama", ad: "Fayans hesaplama" },
    { href: "/parke-hesaplama", ad: "Parke hesaplama" },
  ],
  // Yayindaki cift sayfalari; tarla ve arsa cevirileri once.
  populer: [
    "donum-metrekare", "metrekare-donum", "hektar-metrekare", "donum-hektar", "hektar-donum", "donum-dekar",
    "dekar-donum", "dekar-metrekare", "metrekare-dekar", "metrekare-santimetrekare", "santimetrekare-metrekare",
    "kilometrekare-metrekare",
  ],
  tablo: { baslik: "Sık kullanılan birimler arasında çeviri tablosu", birimler: ["m²", "a", "dönüm", "ha", "ft²", "ac"] },
  bolumler: [
    {
      id: "kare-birimler",
      baslik: "Kare birimlerde en sık yapılan hata",
      govde: (
        <>
          <p>
            1 metre 100 santimetredir, ama 1 metrekare 100 santimetrekare değildir. Bir kenarı 1 metre olan kareyi
            düşünün: her kenarı 100 santimetre, alanı da 100 × 100 = {a(1, "m²", "cm²")} santimetrekaredir. Uzunlukta
            çarpan 100 ise alanda çarpanın karesi, yani 10.000 kullanılır.
          </p>
          <p>
            Aynı kural her birimde geçerlidir. 1 kilometre 1.000 metre, ama 1 kilometrekare {a(1, "km²", "m²")}{" "}
            metrekaredir. 1 fit 30,48 cm, ama 1 fitkare {a(1, "ft²", "cm²")} santimetrekare eder. Kâğıt üzerinde çeviri
            yaparken sonuç beklediğinizden 100 ya da 1.000 kat küçük çıkıyorsa, büyük ihtimalle çarpanın karesini almayı
            unutmuşsunuzdur.
          </p>
        </>
      ),
    },
    {
      id: "donum",
      baslik: "Dönüm, dekar ve hektar",
      govde: (
        <>
          <p>
            Tarla ve arsa konuşulurken metrekare yerine çoğu zaman dönüm kullanılır. Bugün Türkiye'de 1 dönüm, 1 dekarla
            aynıdır: {a(1, "dönüm", "m²")} metrekare. Resmî yazışmalarda, tarım desteklerinde ve verim hesaplarında
            &quot;dekar&quot;, günlük konuşmada &quot;dönüm&quot; denir; ikisi arasında çeviri yapmaya gerek yoktur.
          </p>
          <p>
            Hektar daha büyük arazilerin birimidir: kenarları 100 metre olan bir kare, yani {a(1, "ha", "m²")}{" "}
            metrekare. 1 hektar {a(1, "ha", "dönüm")} dönüm eder; 50 dönümlük bir arazi {a(50, "dönüm", "ha")} hektardır.
            Ar ise 100 metrekaredir (10 m × 10 m) ve bugün daha çok hektarın yüzde biri olarak geçer.
          </p>
          <p>
            Tarlanın kenar ölçüleri elinizdeyse, şekli düzgün olmasa da alanı dönüm olarak{" "}
            <Link href="/tarla-donum-hesaplama">tarla dönüm hesaplama</Link> aracıyla bulabilirsiniz.
          </p>
        </>
      ),
    },
    {
      id: "eski-donum",
      baslik: "Eski dönüm ve evlek",
      govde: (
        <>
          <p>
            1931'de kabul edilen 1782 sayılı Ölçüler Kanunu'ndan önce dönüm 1.000 metrekare değildi. Eski dönüm
            (atik dönüm) kenarı 40 zirai arşın olan bir kare kabul edilirdi; zirai arşın yaklaşık 75,8 cm olduğu için bu
            alan {a(1, "atik dönüm", "m²")} metrekare eder. Dönümün dörtte biri olan evlek de buna göre{" "}
            {a(1, "atik evlek", "m²")} metrekaredir.
          </p>
          <p>
            Fark küçük görünse de büyük arazide önemlidir: 100 eski dönüm, bugünkü ölçüyle yaklaşık{" "}
            {y(100, "atik dönüm", "dönüm")} dönümdür. Eski bir tapu kaydında, miras paylaşımında ya da köy kayıtlarında
            dönüm geçiyorsa, kaydın tarihine bakmak ve hangi dönümün kastedildiğini bilmek gerekir. Ölçünün değeri bölgeden
            bölgeye de değişebildiği için kesin sonuç için tapu müdürlüğüne ya da bir harita mühendisine danışın.
          </p>
        </>
      ),
    },
    {
      id: "brut-net",
      baslik: "Ev alırken: brüt ve net metrekare",
      govde: (
        <>
          <p>
            Konut ilanlarında iki ayrı metrekare görürsünüz. Net metrekare, dairenin içinde gerçekten kullanılan alandır:
            odaların, mutfağın, banyonun ve koridorun zemini. Brüt metrekareye ise bunlara ek olarak duvarların kapladığı
            alan, balkon ve bazen merdiven boşluğu gibi ortak alanlardan düşen pay da girer. Bu yüzden brüt metrekare
            her zaman netten büyüktür.
          </p>
          <p>
            İki ilanı karşılaştırırken aynı türden metrekareye bakın: birinin brüt, diğerinin net alanını yan yana koymak
            daireyi olduğundan büyük ya da küçük gösterir. Boya, parke ya da fayans alırken de hesabı net alan ve duvar
            ölçüleri üzerinden yapın; <Link href="/parke-hesaplama">parke</Link> ve{" "}
            <Link href="/fayans-hesaplama">fayans</Link> hesaplama araçları fire payını da ekler.
          </p>
        </>
      ),
    },
    {
      id: "akre-fitkare",
      baslik: "Akre, fitkare ve başka ülkelerin birimleri",
      govde: (
        <>
          <p>
            ABD ve İngiltere'de ev büyüklüğü fitkare (square feet) ile yazılır. 1 fitkare {a(1, "ft²", "m²")} metrekaredir;
            1.000 fitkarelik bir ev yaklaşık {y(1000, "ft²", "m²")} metrekare eder. Kabaca hesap için fitkareyi 10,76'ya
            bölmek yeterlidir.
          </p>
          <p>
            Arazi ise akre ile ölçülür. 1 akre {a(1, "ac", "m²")} metrekare, yani yaklaşık {y(1, "ac", "dönüm", 2)} dönümdür.
            Akre, Orta Çağ İngiltere'sinde bir çift öküzün bir günde sürebildiği tarla olarak doğdu; değeri sonradan
            sabitlendi. 640 akre de 1 mil kareyi yapar.
          </p>
          <p>
            Başka ülkelerin ilanlarında da yerel birimler karşınıza çıkabilir. Japonya'da daire ve arsa büyüklüğü için
            kullanılan tsubo yaklaşık {y(1, "tsubo", "m²", 2)} metrekaredir (kabaca iki tatami). Mısır'da tarla feddan ile
            ölçülür ve 1 feddan yaklaşık {y(1, "feddan", "m²", 0)} metrekaredir. Hindistan'daki bigha gibi bazı birimlerin
            değeri eyaletten eyalete değişir; çeviricideki değer en yaygın karşılıktır.
          </p>
        </>
      ),
    },
    {
      id: "buyukluk",
      baslik: "Bir hektar ne kadar büyük?",
      govde: (
        <>
          <p>
            Büyük alanları akılda canlandırmanın en kolay yolu futbol sahasıdır. Uluslararası maçlarda sık kullanılan 105
            × 68 metrelik bir saha {formatSayi(SAHA)} metrekare, yani yaklaşık {formatSayi(Number((SAHA / 10000).toFixed(2)))}{" "}
            hektardır. Bir hektar bu sahadan biraz büyüktür; 10 dönümlük bir tarla da kabaca bir buçuk futbol sahası
            eder.
          </p>
          <p>
            Kilometrekare şehir ve ülke ölçeğidir. 1 kilometrekare {a(1, "km²", "ha")} hektar ya da{" "}
            {a(1, "km²", "dönüm")} dönümdür. Türkiye'nin yüzölçümü yaklaşık 783.562 kilometrekaredir; bu, kabaca 78
            milyon hektar eder.
          </p>
        </>
      ),
    },
  ],
  sss: [
    {
      question: "1 dönüm kaç metrekare?",
      answer: `Bugün Türkiye'de 1 dönüm ${a(1, "dönüm", "m²")} metrekaredir ve 1 dekara eşittir. 1931 öncesinden kalan eski dönüm ise yaklaşık ${y(1, "atik dönüm", "m²")} metrekaredir.`,
    },
    {
      question: "1 hektar kaç dönüm?",
      answer: `1 hektar ${a(1, "ha", "dönüm")} dönüm, yani ${a(1, "ha", "m²")} metrekaredir.`,
    },
    {
      question: "1 metrekare kaç santimetrekare?",
      answer: `1 metrekare ${a(1, "m²", "cm²")} santimetrekaredir. Uzunlukta çarpan 100 olduğu için alanda çarpan 100 × 100 = 10.000 olur.`,
    },
    {
      question: "1 dekar kaç dönüm?",
      answer: "1 dekar 1 dönümdür. İkisi de 1.000 metrekaredir; dekar resmî yazışmalarda, dönüm günlük konuşmada kullanılır.",
    },
    {
      question: "1 akre kaç dönüm?",
      answer: `1 akre ${a(1, "ac", "m²")} metrekare, yani yaklaşık ${y(1, "ac", "dönüm", 2)} dönümdür.`,
    },
    {
      question: "Brüt ve net metrekare arasındaki fark nedir?",
      answer:
        "Net metrekare dairenin içinde kullanılan zemin alanıdır. Brüt metrekareye duvarların kapladığı alan ve ortak alanlardan düşen pay da girer, bu yüzden brüt her zaman netten büyüktür.",
    },
  ],
  kaynaklar: [
    { ad: "BIPM, Uluslararası Birimler Sistemi (SI Broşürü), 9. baskı", href: "https://www.bipm.org/en/publications/si-brochure" },
    { ad: "NIST, Inch-pound ve SI birimleri arasında dönüşüm faktörleri (SP 811)", href: "https://www.nist.gov/pml/special-publication-811" },
    { ad: "1782 sayılı Ölçüler Kanunu (Resmî Gazete, 1931)" },
    { ad: "Harita Genel Müdürlüğü, il ve ilçe yüzölçümleri" },
  ],
  guncelleme: "2026-11-11",
};
