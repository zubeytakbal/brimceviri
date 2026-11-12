// /radyasyon sayfasinin icerigi: eskiden ayri olan bes kategori (radyasyon dozu, sogurulan doz, doz hizi,
// radyoaktivite, isinlama) tek sayfada. Sayilar cevirici ile ayni fonksiyondan (convert) uretilir.
import Link from "@/app/components/SiteLink";
import { convert } from "../../../converter/convert";
import { formatSayi } from "../sayi";
import type { BirlesikIcerik } from "./tipler";

const r = (kategori: string, deger: number, kimden: string, kime: string) => formatSayi(convert(kategori, deger, kimden, kime));

export const radyasyonIcerigi: BirlesikIcerik = {
  baslik: "Radyasyon Birimleri Çevirici: Sievert, Gray, Becquerel, Rem ve Röntgen",
  aciklama:
    "Sievert, milisievert, rem, gray, rad, becquerel, curie ve röntgen arasında çeviri. µSv/saat değerini yıllık doza çevirme, hangi birimin neyi ölçtüğü ve doğal radyasyon, tıbbi çekim ve doz sınırlarıyla karşılaştırma.",
  h1: "Radyasyon Birimleri Çevirici",
  ozet: (
    <>
      Radyasyon tek bir birimle ölçülmez. Bir kaynağın ne kadar aktif olduğu becquerel ile, vücudun soğurduğu enerji
      gray ile, bunun sağlığa etkisi sievert ile, saatte ne kadar doz alındığı da µSv/saat ile ifade edilir. Bu birimler
      birbirine doğrudan çevrilemediği için aşağıda her biri için ayrı bir çevirici var.
    </>
  ),
  giris: [
    {
      id: "hangi-birim",
      baslik: "Hangi birim neyi ölçer?",
      govde: (
        <>
          <p>
            Radyasyonla ilgili bir haberde ya da tahlil sonucunda gördüğünüz sayının ne anlattığını anlamak için önce
            birimine bakın:
          </p>
          <ul>
            <li>
              <strong>Becquerel (Bq) ve curie (Ci):</strong> Kaynağın kendisini anlatır. Bir saniyede kaç atomun
              bozunduğunu, yani maddenin ne kadar radyoaktif olduğunu söyler.
            </li>
            <li>
              <strong>Gray (Gy) ve rad:</strong> Vücudun ya da bir malzemenin kilogram başına soğurduğu enerjidir.
              Radyoterapide ve yüksek dozlarda kullanılır.
            </li>
            <li>
              <strong>Sievert (Sv) ve rem:</strong> Soğurulan dozun sağlığa etkisini anlatır. Radyasyon türüne ve
              organa göre düzeltilmiş dozdur; çalışan ve halk için konan sınırlar bu birimle yazılır.
            </li>
            <li>
              <strong>µSv/saat:</strong> Doz hızıdır. Dozimetre ve Geiger sayaçlarının ekranında görülen değer budur.
            </li>
            <li>
              <strong>Röntgen (R):</strong> X ve gama ışınlarının havada oluşturduğu iyonlaşmadır. Eski cihazlarda ve
              kaynaklarda kalmış bir birimdir.
            </li>
          </ul>
          <p>
            Becquerel ile sievert arasında sabit bir çarpan yoktur. 1.000 Bq&apos;lik bir kaynağın size vereceği doz,
            hangi radyoaktif madde olduğuna, ne kadar uzakta durduğunuza, ne kadar süre yanında kaldığınıza ve maddenin
            vücuda girip girmediğine bağlıdır.
          </p>
        </>
      ),
    },
  ],
  parcalar: [
    {
      id: "esdeger-doz",
      kategori: "radyasyon-dozu",
      sekme: "Eşdeğer doz",
      baslik: "Eşdeğer ve etkin doz: sievert ve rem",
      govde: (
        <>
          <p>
            Aynı miktarda soğurulan enerji, radyasyonun türüne göre vücuda farklı zarar verir. Alfa parçacıkları,
            aynı enerjideki gama ışınlarından çok daha fazla hasar bırakır. Sievert bu farkı hesaba katar: gray
            cinsinden doz, radyasyon türüne göre bir ağırlık katsayısıyla çarpılır. X ışını, gama ve beta için bu
            katsayı 1, alfa için 20&apos;dir; nötronlarda enerjiye göre değişir. Bu yüzden röntgen çekimlerinde 1 mGy
            yaklaşık 1 mSv kabul edilir.
          </p>
          <p>
            Günlük hayatta en sık görülen birim milisievert (mSv) ve mikrosievert&apos;tir (µSv). ABD&apos;de hâlâ rem
            kullanılır: 1 rem {r("radyasyon_dozu", 1, "rem", "mSv")} mSv, 1 milirem de{" "}
            {r("radyasyon_dozu", 1, "mrem", "µSv")} µSv&apos;dir. Amerikan kaynaklı bir metinde &quot;100 mrem&quot;
            görüyorsanız bu 1 mSv demektir.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "mSv", deger: 1 },
        gruplar: [
          { ad: "Sievert", birimler: ["Sv", "mSv", "µSv", "nSv"] },
          { ad: "Rem (ABD)", birimler: ["rem", "mrem", "µrem"] },
        ],
      },
      tablo: { baslik: "Sievert ve rem karşılaştırma tablosu", birimler: ["Sv", "mSv", "µSv", "rem", "mrem"] },
    },
    {
      id: "sogurulan-doz",
      kategori: "sogurulan-doz",
      sekme: "Soğurulan doz",
      baslik: "Soğurulan doz: gray ve rad",
      govde: (
        <>
          <p>
            Gray, maddenin kilogramı başına soğurduğu enerjidir: 1 Gy = 1 joule/kilogram. Radyasyonun türüne
            bakmaz, yalnızca bırakılan enerjiyi ölçer. Eski birim rad&apos;dır ve 1 Gy {r("sogurulan_doz", 1, "Gy", "rad")}{" "}
            rad eder; bu yüzden eski kaynaklardaki 1 rad bugünkü 1 santigraya (cGy) eşittir.
          </p>
          <p>
            Gray en çok radyoterapide görülür. Kanser tedavisinde toplam doz onlarca gray olabilir ama genellikle
            günde yaklaşık 2 Gy&apos;lik parçalara bölünerek verilir; sağlıklı dokunun arada toparlanmasına fırsat
            tanınır. Sanayide ise kilogray kullanılır: tıbbi malzemelerin sterilizasyonu ve bazı gıdaların
            ışınlanması birkaç kGy ile birkaç on kGy arasındaki dozlarla yapılır.
          </p>
          <p>
            Kısa sürede tüm vücuda alınan birkaç gray, akut radyasyon hastalığına yol açar. Bu kadar yüksek dozlarda
            sievert yerine gray kullanılır, çünkü sievert uzun vadeli kanser riskini anlatmak için tanımlanmıştır.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "Gy", deger: 1 },
        gruplar: [
          { ad: "Gray", birimler: ["kGy", "Gy", "cGy", "mGy", "µGy"] },
          { ad: "Rad (eski birim)", birimler: ["krad", "rad", "mrad"] },
        ],
      },
      tablo: { baslik: "Gray ve rad karşılaştırma tablosu", birimler: ["Gy", "cGy", "mGy", "rad", "mrad"] },
    },
    {
      id: "doz-hizi",
      kategori: "doz-hizi",
      sekme: "Doz hızı",
      baslik: "Doz hızı: µSv/saat değerini yıllık doza çevirme",
      govde: (
        <>
          <p>
            Dozimetre ve Geiger sayaçları anlık doz hızını, çoğunlukla mikrosievert/saat (µSv/h) olarak gösterir. Bir
            yılda 8.760 saat olduğu için saatlik değeri yıllık doza çevirmek kolaydır: sürekli 0,1 µSv/h ortamında
            kalan biri bir yılda {r("doz_hizi", 0.1, "µSv/h", "mSv/yıl")} mSv alır. Çeviricide µSv/h kutusuna kendi
            ölçümünüzü yazıp mSv/yıl satırına bakabilirsiniz.
          </p>
          <p>
            Açık havada ölçülen doğal doz hızı çoğu yerde saatte birkaç onda bir mikrosievertin altındadır; kayanın ve
            toprağın türüne, yüksekliğe göre değişir. Uçakta yükseldikçe kozmik radyasyon arttığı için doz hızı da
            yerdekinin birkaç katına çıkar. Tek bir ölçüm yerine birkaç dakikalık ortalamaya bakın; sayaçların
            gösterdiği değer saniyeden saniyeye oynar.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "µSv/h", deger: 0.1 },
        gruplar: [
          { ad: "Saatlik", birimler: ["Sv/h", "mSv/h", "µSv/h", "nSv/h"] },
          { ad: "Günlük ve yıllık", birimler: ["mSv/gün", "µSv/gün", "mSv/yıl", "µSv/yıl"] },
          { ad: "Rem (ABD)", birimler: ["rem/h", "mrem/h", "µrem/h", "mrem/yıl"] },
        ],
      },
      tablo: { baslik: "Doz hızı karşılaştırma tablosu", birimler: ["µSv/h", "nSv/h", "µSv/gün", "mSv/yıl", "mrem/h"] },
    },
    {
      id: "aktivite",
      kategori: "radyoaktivite",
      sekme: "Aktivite",
      baslik: "Radyoaktivite: becquerel ve curie",
      govde: (
        <>
          <p>
            Becquerel, saniyede bir atomun bozunmasıdır. Çok küçük bir birim olduğu için gerçek kaynaklar kilo-,
            mega- ya da gigabecquerel ile anlatılır. Eski birim curie, 1 gram radyumun aktivitesinden doğmuştur ve
            çok büyüktür: 1 Ci {r("radyoaktivite", 1, "Ci", "GBq")} GBq, yani saniyede 37 milyar bozunmadır.
          </p>
          <p>
            Becquerel gıda ve çevre ölçümlerinde de karşınıza çıkar: gıdada Bq/kg, suda Bq/L, evdeki radon gazında
            Bq/m³. Radon, topraktan sızan doğal bir gazdır ve kapalı, iyi havalandırılmayan bodrumlarda birikebilir.
            Dünya Sağlık Örgütü, evlerde yıllık ortalama radon düzeyinin 100 Bq/m³&apos;ün altında tutulmasını
            öneriyor.
          </p>
          <p>
            Nükleer tıpta hastaya verilen ilacın miktarı da aktiviteyle yazılır, çoğunlukla MBq cinsinden. ABD
            kaynaklarında bu değer milicurie ile verilir: 1 mCi {r("radyoaktivite", 1, "mCi", "MBq")} MBq&apos;tir.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "Bq", deger: 1000 },
        gruplar: [
          { ad: "Becquerel", birimler: ["Bq", "kBq", "MBq", "GBq", "TBq"] },
          { ad: "Curie", birimler: ["Ci", "mCi", "µCi", "nCi", "pCi"] },
          { ad: "Bozunma sayısı", birimler: ["dps", "dpm", "Rd"] },
        ],
      },
      tablo: { baslik: "Becquerel ve curie karşılaştırma tablosu", birimler: ["Bq", "kBq", "MBq", "GBq", "Ci", "mCi", "µCi"] },
    },
    {
      id: "isinlama",
      kategori: "isinlama",
      sekme: "Işınlama",
      baslik: "Işınlama: röntgen ve coulomb/kilogram",
      govde: (
        <>
          <p>
            Röntgen, X ve gama ışınlarının havada ne kadar iyonlaşma yaptığını ölçer: 1 R,{" "}
            {r("isinlama", 1, "R", "µC/kg")} µC/kg&apos;dır. Yalnızca havada ve yalnızca bu iki ışın türü için
            tanımlıdır; vücudun aldığı dozu doğrudan söylemez. Bu yüzden bugün yerini gray ve sievert&apos;e
            bırakmıştır ve SI sisteminde ayrı bir adı yoktur, coulomb/kilogram ile yazılır.
          </p>
          <p>
            Röntgen yine de eski dozimetrelerde, sivil savunma cihazlarında ve eski kitaplarda karşınıza çıkar. Kaba
            bir fikir vermek için X ve gama ışınlarında 1 R&apos;lik ışınlamanın havada yaklaşık 8,7 mGy soğurulan
            doza karşılık geldiği söylenebilir; bu yüzden eski metinlerde röntgen, rad ve rem çoğu zaman yaklaşık
            olarak birbirinin yerine kullanılmıştır.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "R", deger: 1 },
        gruplar: [
          { ad: "Coulomb/kilogram", birimler: ["C/kg", "mC/kg", "µC/kg"] },
          { ad: "Röntgen", birimler: ["R", "mR", "µR"] },
        ],
      },
      tablo: { baslik: "Röntgen ve coulomb/kilogram karşılaştırma tablosu", birimler: ["C/kg", "mC/kg", "µC/kg", "R", "mR"] },
    },
  ],
  bolumler: [
    {
      id: "karsilastirma",
      baslik: "Dozları karşılaştırmak: doğal radyasyon, tıbbi çekimler ve sınırlar",
      govde: (
        <>
          <p>
            Bir dozun büyük mü küçük mü olduğunu anlamanın en kolay yolu, herkesin her yıl aldığı doğal radyasyonla
            karşılaştırmaktır. Birleşmiş Milletler&apos;in radyasyon komitesi UNSCEAR&apos;a göre dünyada bir
            kişinin doğal kaynaklardan (radon, kozmik ışınlar, toprak ve vücuttaki doğal radyoaktif maddeler) yılda
            aldığı ortalama doz yaklaşık 2,4 mSv&apos;dir. Bu değer yaşanan yere göre birkaç kat değişebilir.
          </p>
          <p>
            Tıbbi çekimlerin dozu çekilen bölgeye ve cihaza göre değişir. Akciğer grafisi gibi düz bir röntgen
            çekimi milisievertin onda biri ya da daha azıdır; bilgisayarlı tomografi ise bölgeye göre birkaç
            milisievert tutar. Uzun bir uçak yolculuğunda alınan ek doz da on mikrosievertler düzeyindedir.
          </p>
          <p>
            Uluslararası Radyolojik Korunma Komisyonu&apos;nun (ICRP) önerdiği ve Türkiye&apos;deki radyasyon
            güvenliği mevzuatının da esas aldığı sınırlar şöyledir: halk için doğal radyasyon ve tıbbi işlemler
            dışında yılda 1 mSv; radyasyonla çalışanlar için beş yılın ortalaması yılda 20 mSv, tek bir yılda en çok
            50 mSv. Hastalara tıbbi gerekçeyle yapılan çekimler bu sınırlara dahil değildir; orada doz, hekimin
            gerekçelendirmesi ile sınırlanır.
          </p>
          <p>
            Becquerel ile verilen değerleri bu sınırlarla doğrudan karşılaştırmayın. Gıdada ya da toprakta ölçülen
            Bq değerinin doza çevrilmesi, maddenin cinsine ve ne kadar tüketildiğine göre ayrı bir hesap gerektirir.
          </p>
          <p>
            Diğer fizik birimleri için <Link href="/kategoriler/enerji">enerji birimleri</Link> ve{" "}
            <Link href="/kategoriler/aydinlatma-siddeti">aydınlatma şiddeti</Link> sayfalarına bakabilirsiniz.
          </p>
        </>
      ),
    },
  ],
  ilgili: [
    { href: "/kategoriler/enerji", ad: "Enerji birimleri" },
    { href: "/kategoriler/aydinlatma-siddeti", ad: "Aydınlatma şiddeti" },
    { href: "/bilim-hesaplayicilari/kimya/periyodik-tablo", ad: "Periyodik tablo" },
    { href: "/bilim-hesaplayicilari/kimya/atom-kutlesi-hesaplama", ad: "Atom kütlesi hesaplama" },
  ],
  sss: [
    {
      question: "1 sievert kaç milisievert?",
      answer: `1 sievert ${r("radyasyon_dozu", 1, "Sv", "mSv")} milisievert, 1 milisievert de ${r("radyasyon_dozu", 1, "mSv", "µSv")} mikrosievertdir.`,
    },
    {
      question: "1 rem kaç milisievert?",
      answer: `1 rem ${r("radyasyon_dozu", 1, "rem", "mSv")} mSv eder. 1 sievert de ${r("radyasyon_dozu", 1, "Sv", "rem")} remdir.`,
    },
    {
      question: "1 gray kaç rad?",
      answer: `1 gray ${r("sogurulan_doz", 1, "Gy", "rad")} rad eder; 1 rad 1 santigraya (cGy) eşittir.`,
    },
    {
      question: "Gray ile sievert aynı şey mi?",
      answer:
        "İkisi de joule/kilogram ile tanımlanır ama farklı şeyleri anlatır. Gray soğurulan enerjidir; sievert bu enerjinin radyasyon türüne ve organa göre düzeltilmiş sağlık etkisidir. X ışını ve gama için 1 Gy yaklaşık 1 Sv kabul edilir, alfa için 1 Gy 20 Sv sayılır.",
    },
    {
      question: "µSv/saat değeri yılda kaç mSv eder?",
      answer: `Saatlik değeri 8.760 ile çarpıp 1.000'e bölün. Örneğin sürekli 0,1 µSv/h ortamında bir yılda ${r("doz_hizi", 0.1, "µSv/h", "mSv/yıl")} mSv alınır.`,
    },
    {
      question: "1 curie kaç becquerel?",
      answer: `1 curie ${r("radyoaktivite", 1, "Ci", "GBq")} gigabecquerel, yani saniyede 37 milyar bozunmadır.`,
    },
    {
      question: "Becquerel sievert'e çevrilebilir mi?",
      answer:
        "Doğrudan çevrilemez. Becquerel kaynağın aktivitesini, sievert vücudun aldığı dozu anlatır. Aradaki ilişki radyoaktif maddenin cinsine, mesafeye, süreye ve maddenin solunup yutulmasına göre değişir.",
    },
  ],
  kaynaklar: [
    { ad: "BIPM, Uluslararası Birimler Sistemi (SI Broşürü), 9. baskı", href: "https://www.bipm.org/en/publications/si-brochure" },
    { ad: "ICRP Yayın 103: Uluslararası Radyolojik Korunma Komisyonu 2007 önerileri", href: "https://www.icrp.org/publication.asp?id=ICRP%20Publication%20103" },
    { ad: "UNSCEAR, Sources and Effects of Ionizing Radiation (2008 raporu)", href: "https://www.unscear.org/unscear/en/publications.html" },
    { ad: "Dünya Sağlık Örgütü, WHO Handbook on Indoor Radon (2009)", href: "https://www.who.int/publications/i/item/9789241547673" },
    { ad: "Radyasyon Güvenliği Yönetmeliği (Resmî Gazete, 24 Mart 2000)" },
  ],
  guncelleme: "2026-11-12",
};
