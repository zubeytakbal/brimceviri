// Görsel dönüştürme sayfalarının içeriği. Her çiftin metni o dönüşüme özeldir.
import type { FaqItem } from "../faqSchema";
import type { GorselFormat } from "./formatlar";

export type GorselCift = {
  slug: string;
  kaynak: GorselFormat;
  hedef: GorselFormat;
  baslik: string;
  seoBaslik: string;
  kisa: string;
  aciklama: string;
  giris: string;
  bolumler: Array<{ id: string; baslik: string; paragraflar: string[] }>;
  sss: FaqItem[];
};

export const GORSEL_HUB = "/gorsel-donusturucu";

export const GORSEL_CIFTLER: GorselCift[] = [
  {
    slug: "png-jpg-cevirme",
    kaynak: "png",
    hedef: "jpg",
    baslik: "PNG JPG Çevirme",
    seoBaslik: "PNG JPG Çevirme: Ücretsiz, Yüklemeden, Toplu",
    kisa: "PNG JPG Çevirme",
    aciklama:
      "PNG dosyalarını tarayıcınızda JPG'ye çevirin: dosya sunucuya yüklenmez, toplu dönüştürme, kalite ayarı ve saydam alan rengi seçimi.",
    giris:
      "PNG görsellerinizi saniyeler içinde JPG'ye çevirin. Dosyalar bilgisayarınızdan çıkmaz; birden fazla dosyayı aynı anda dönüştürüp tek ZIP olarak indirebilirsiniz.",
    bolumler: [
      {
        id: "neden",
        baslik: "PNG'yi neden JPG'ye çevirmeli?",
        paragraflar: [
          "PNG kayıpsız bir formattır: her pikseli olduğu gibi saklar. Ekran görüntüsü, logo veya çizim için idealdir ama fotoğraflarda dosya boyutu çok büyür. Aynı fotoğraf JPG olarak kaydedildiğinde çoğu zaman birkaç kat daha küçük olur.",
          "E-posta eki, form yükleme sınırı olan başvuru siteleri ya da web sitesine görsel eklemek gibi işlerde küçük dosya avantaj sağlar. Birçok başvuru sistemi de yalnızca JPG kabul eder.",
        ],
      },
      {
        id: "saydamlik",
        baslik: "Saydam arka plan ne olur?",
        paragraflar: [
          "JPG saydamlığı desteklemez. PNG'deki saydam alanlar dönüştürmede bir renkle doldurulur; varsayılan beyazdır, isterseniz araçtan farklı bir renk seçebilirsiniz. Logonun saydam kalması gerekiyorsa PNG veya WebP kullanmaya devam edin.",
        ],
      },
      {
        id: "kalite",
        baslik: "Hangi kalite ayarını seçmeliyim?",
        paragraflar: [
          "%85–90 kalite fotoğraflarda gözle fark edilmeyecek kadar iyi sonuç verir ve dosyayı belirgin şekilde küçültür. Metin veya keskin çizgiler içeren görsellerde %90 ve üstü önerilir; düşük kalitede harflerin etrafında bulanık lekeler oluşabilir.",
        ],
      },
    ],
    sss: [
      {
        question: "PNG'yi JPG'ye çevirince kalite düşer mi?",
        answer:
          "JPG kayıplı sıkıştırma kullandığı için bir miktar bilgi kaybolur. %90 kalitede fotoğraflarda fark çoğunlukla gözle görülmez; çok düşük kalitede ise bloklanma ve bulanıklık belirginleşir.",
      },
      {
        question: "Dosyalarım bir sunucuya yükleniyor mu?",
        answer:
          "Hayır. Dönüştürme tarayıcınızın kendi görsel işleme özelliğiyle bilgisayarınızda yapılır; dosyalar internete gönderilmez.",
      },
      {
        question: "Aynı anda kaç PNG çevirebilirim?",
        answer:
          "Tek seferde 30 dosyaya kadar seçebilirsiniz. Hepsi dönüştürüldüğünde tek tek ya da tek bir ZIP dosyası olarak indirebilirsiniz.",
      },
      {
        question: "Saydam PNG'nin arka planı neden beyaz oldu?",
        answer:
          "JPG formatında saydamlık yoktur; saydam pikseller bir renkle doldurulmak zorundadır. Araçta 'Saydam alanların rengi' seçeneğiyle istediğiniz rengi belirleyebilirsiniz.",
      },
    ],
  },
  {
    slug: "jpg-png-cevirme",
    kaynak: "jpg",
    hedef: "png",
    baslik: "JPG PNG Çevirme",
    seoBaslik: "JPG PNG Çevirme: Ücretsiz, Yüklemeden, Toplu",
    kisa: "JPG PNG Çevirme",
    aciklama:
      "JPG fotoğraflarınızı tarayıcınızda PNG'ye çevirin: sunucuya yükleme yok, toplu dönüştürme, ZIP indirme. PNG'ye geçmenin ne zaman işe yaradığını öğrenin.",
    giris:
      "JPG ve JPEG dosyalarınızı PNG formatına çevirin. Dönüştürme tarayıcınızda yapılır; birden fazla dosyayı aynı anda seçip tek ZIP olarak indirebilirsiniz.",
    bolumler: [
      {
        id: "ne-zaman",
        baslik: "JPG'yi PNG'ye çevirmek ne zaman işe yarar?",
        paragraflar: [
          "Görseli düzenlemeye devam edecekseniz PNG iyi bir ara formattır: her kaydetmede yeniden sıkıştırılmadığı için kalite kaybı birikmez. Bazı programlar, baskı servisleri veya çıkartma (sticker) siteleri de PNG ister.",
          "Görselin üzerine metin, ok veya işaret ekleyecekseniz de PNG'de çalışmak keskin kenarları korur.",
        ],
      },
      {
        id: "kalite-artmaz",
        baslik: "PNG'ye çevirmek kaliteyi artırır mı?",
        paragraflar: [
          "Hayır. JPG kaydedilirken kaybolan ayrıntı geri gelmez; PNG sadece mevcut görüntüyü kayıpsız saklar. Bu yüzden dönüştürülen dosya genellikle JPG'den birkaç kat büyük olur ama daha net görünmez.",
          "Arka planı saydam bir görsel istiyorsanız dönüştürme tek başına yetmez; arka planı bir düzenleme programıyla silmeniz gerekir. JPG'de saydam alan olmadığı için PNG'si de tamamen opak olur.",
        ],
      },
    ],
    sss: [
      {
        question: "JPG ile JPEG arasında fark var mı?",
        answer:
          "Hayır, ikisi aynı formattır. Eski Windows sürümleri dosya uzantılarını üç harfle sınırladığı için '.jpg' yaygınlaştı. Araç her iki uzantıyı da kabul eder.",
      },
      {
        question: "PNG dosyası neden daha büyük çıktı?",
        answer:
          "PNG kayıpsız olduğu için fotoğraftaki her renk geçişini ayrı ayrı saklar. JPG ise gözün fark etmeyeceği ayrıntıları atarak küçülür. Fotoğraflarda PNG'nin 3–10 kat büyük olması normaldir.",
      },
      {
        question: "JPG'yi PNG yapınca arka plan saydam olur mu?",
        answer:
          "Olmaz. Dönüştürme yalnızca formatı değiştirir; JPG'de saydam piksel bulunmadığı için PNG de opak kalır.",
      },
      {
        question: "Dosyalarım internete yükleniyor mu?",
        answer:
          "Hayır. Tüm işlem tarayıcınızda, bilgisayarınızda yapılır; dosyalar hiçbir sunucuya gönderilmez.",
      },
    ],
  },
  {
    slug: "webp-jpg-cevirme",
    kaynak: "webp",
    hedef: "jpg",
    baslik: "WebP JPG Çevirme",
    seoBaslik: "WebP JPG Çevirme: Ücretsiz, Yüklemeden, Toplu",
    kisa: "WebP JPG Çevirme",
    aciklama:
      "WebP görselleri tarayıcınızda JPG'ye çevirin: sunucuya yükleme yok, toplu dönüştürme, kalite ayarı. İnternetten indirdiğiniz WebP dosyaları her programda açılsın.",
    giris:
      "İnternetten kaydettiğiniz WebP görselleri açılmıyor mu? Tarayıcınızda JPG'ye çevirin; dosyalar bilgisayarınızdan çıkmaz, birden fazla dosyayı tek seferde dönüştürebilirsiniz.",
    bolumler: [
      {
        id: "neden-webp",
        baslik: "Kaydettiğim görsel neden WebP çıkıyor?",
        paragraflar: [
          "Web siteleri sayfaları hızlı açmak için görselleri WebP olarak sunar; aynı görüntü JPG'ye göre genellikle daha küçük bir dosyadır. Sağ tıklayıp kaydettiğinizde de dosya WebP olarak iner.",
          "Güncel tarayıcılar WebP'yi sorunsuz gösterir, ancak bazı eski fotoğraf programları, yazıcı yazılımları, e-devlet ve başvuru sitelerinin yükleme alanları WebP kabul etmeyebilir. JPG ise neredeyse her yerde açılır.",
        ],
      },
      {
        id: "saydamlik",
        baslik: "Saydam WebP görseller",
        paragraflar: [
          "WebP saydamlığı destekler, JPG desteklemez. Saydam bir WebP'yi (ör. logo veya çıkartma) JPG'ye çevirdiğinizde saydam alanlar seçtiğiniz renkle doldurulur. Saydamlığı korumak istiyorsanız WebP'yi PNG'ye çevirin.",
        ],
      },
    ],
    sss: [
      {
        question: "WebP'yi JPG'ye çevirmek kaliteyi düşürür mü?",
        answer:
          "JPG de kayıplı bir format olduğu için çok küçük bir kayıp olur. %90 kalitede bu fark gözle görülmez. Dosya boyutu çoğunlukla WebP'den biraz büyük çıkar.",
      },
      {
        question: "Hareketli (animasyonlu) WebP çevrilebilir mi?",
        answer:
          "JPG tek kareli bir formattır. Hareketli WebP dönüştürüldüğünde yalnızca ilk kare JPG olarak kaydedilir.",
      },
      {
        question: "Telefonda da çalışır mı?",
        answer:
          "Evet. Güncel Chrome, Safari veya Samsung Internet'te dosya seçip dönüştürebilir, sonucu telefonunuza indirebilirsiniz.",
      },
      {
        question: "Dosyalarım bir sunucuya gönderiliyor mu?",
        answer:
          "Hayır. Dönüştürme tarayıcınızda yapılır; dosyalarınız internete yüklenmez.",
      },
    ],
  },
  {
    slug: "jpg-webp-cevirme",
    kaynak: "jpg",
    hedef: "webp",
    baslik: "JPG WebP Çevirme",
    seoBaslik: "JPG WebP Çevirme: Web Sitesi İçin Küçük Görseller",
    kisa: "JPG WebP Çevirme",
    aciklama:
      "JPG fotoğrafları tarayıcınızda WebP'ye çevirin ve dosya boyutunu küçültün: sunucuya yükleme yok, toplu dönüştürme, kalite ve genişlik ayarı.",
    giris:
      "Web siteniz, blogunuz veya e-ticaret mağazanız için JPG görselleri WebP'ye çevirin. Kaliteyi ve en fazla genişliği ayarlayarak sayfalarınızı hızlandırın; dosyalar bilgisayarınızdan çıkmaz.",
    bolumler: [
      {
        id: "avantaj",
        baslik: "WebP'nin avantajı ne?",
        paragraflar: [
          "Google'ın ölçümlerine göre kayıplı WebP görseller, benzer kalitedeki JPG'lerden yüzde 25–34 daha küçüktür. Daha küçük görsel, sayfanın daha hızlı açılması ve mobil veriden tasarruf demektir; sayfa hızı arama sonuçlarındaki kullanıcı deneyimini de etkiler.",
          "Chrome, Edge, Firefox ve Safari'nin güncel sürümleri WebP'yi destekler, bu yüzden web siteleri için güvenle kullanılabilir.",
        ],
      },
      {
        id: "ipucu",
        baslik: "Web için en iyi ayarlar",
        paragraflar: [
          "Telefon fotoğrafları genellikle 4000 pikselden geniştir; bir blog yazısında 1200–1600 piksel genişlik yeterlidir. 'En fazla genişlik' alanına 1600 yazıp %80 kalite seçmek, dosyayı çoğu zaman onda birine indirir.",
          "WebP'yi e-posta eki veya resmi başvuru için kullanmayın; bazı programlar ve yükleme sistemleri hâlâ yalnızca JPG veya PNG kabul eder.",
        ],
      },
    ],
    sss: [
      {
        question: "Safari'de WebP'ye çeviremiyorum, neden?",
        answer:
          "Bazı Safari sürümleri WebP'yi gösterebilir ama tarayıcı içinde WebP dosyası oluşturamaz. Böyle bir durumda araç sizi uyarır; Chrome, Edge veya Firefox ile dönüştürebilirsiniz.",
      },
      {
        question: "WebP dosyası JPG'den ne kadar küçük olur?",
        answer:
          "Görsele göre değişir; aynı kalite ayarında genellikle yüzde 25–35 civarında küçülme görülür. Araç her dosyanın önceki ve sonraki boyutunu gösterir.",
      },
      {
        question: "WordPress WebP kabul ediyor mu?",
        answer:
          "Evet. WordPress 5.8 sürümünden itibaren WebP görsellerin yüklenmesini destekler.",
      },
      {
        question: "Dosyalarım internete yükleniyor mu?",
        answer:
          "Hayır. Dönüştürme tarayıcınızda yapılır; dosyalar hiçbir sunucuya gönderilmez.",
      },
    ],
  },
  {
    slug: "webp-png-cevirme",
    kaynak: "webp",
    hedef: "png",
    baslik: "WebP PNG Çevirme",
    seoBaslik: "WebP PNG Çevirme: Saydamlığı Koruyarak, Ücretsiz",
    kisa: "WebP PNG Çevirme",
    aciklama:
      "WebP görselleri tarayıcınızda PNG'ye çevirin, saydam arka plan korunur: sunucuya yükleme yok, toplu dönüştürme ve ZIP indirme.",
    giris:
      "Saydam arka planlı WebP logoları, çıkartmaları ve simgeleri PNG'ye çevirin; saydamlık korunur. Dönüştürme tarayıcınızda yapılır, dosyalarınız internete gönderilmez.",
    bolumler: [
      {
        id: "neden-png",
        baslik: "Neden JPG değil de PNG?",
        paragraflar: [
          "WebP ile PNG'nin ortak özelliği saydamlığı desteklemeleridir. Logo, simge, çıkartma veya arka planı silinmiş ürün görseli gibi dosyalarda PNG'ye çevirmek saydam alanları korur; JPG'ye çevirseydiniz arka plan beyaz olurdu.",
          "PNG, sunum ve belge programlarında, baskı sitelerinde ve eski tasarım yazılımlarında WebP'den daha geniş destek görür.",
        ],
      },
      {
        id: "boyut",
        baslik: "PNG dosyası neden büyük?",
        paragraflar: [
          "PNG kayıpsızdır; WebP ise çoğu zaman kayıplı sıkıştırılmıştır. Bu yüzden özellikle fotoğraf içeren görsellerde PNG birkaç kat büyük çıkabilir. Saydamlık gerekmiyorsa ve dosya boyutu önemliyse WebP'yi JPG'ye çevirmek daha uygundur.",
        ],
      },
    ],
    sss: [
      {
        question: "Saydam arka plan korunuyor mu?",
        answer:
          "Evet. PNG saydamlığı desteklediği için WebP'deki saydam alanlar olduğu gibi aktarılır.",
      },
      {
        question: "Kalite kaybı olur mu?",
        answer:
          "Hayır. PNG kayıpsız olduğu için WebP'deki görüntü piksel piksel korunur. Yalnız WebP'nin kendi sıkıştırmasında kaybolan ayrıntı geri gelmez.",
      },
      {
        question: "Hareketli WebP'yi PNG yapabilir miyim?",
        answer:
          "Araç yalnızca ilk kareyi PNG olarak kaydeder; animasyon aktarılmaz.",
      },
      {
        question: "Dosyalarım bir sunucuya yükleniyor mu?",
        answer: "Hayır. İşlem tamamen tarayıcınızda yapılır.",
      },
    ],
  },
  {
    slug: "png-webp-cevirme",
    kaynak: "png",
    hedef: "webp",
    baslik: "PNG WebP Çevirme",
    seoBaslik: "PNG WebP Çevirme: Saydamlıkla, Daha Küçük Dosya",
    kisa: "PNG WebP Çevirme",
    aciklama:
      "PNG görselleri tarayıcınızda WebP'ye çevirin: saydamlık korunur, dosya küçülür. Sunucuya yükleme yok, toplu dönüştürme, kalite ayarı.",
    giris:
      "Web sitenizdeki PNG görselleri saydamlığı koruyarak WebP'ye çevirin ve sayfalarınızı hızlandırın. Dosyalar tarayıcınızda işlenir, internete yüklenmez.",
    bolumler: [
      {
        id: "avantaj",
        baslik: "PNG'den WebP'ye geçmenin faydası",
        paragraflar: [
          "WebP hem saydamlığı hem kayıplı sıkıştırmayı aynı anda destekler. Google'ın ölçümlerine göre kayıpsız WebP bile benzer PNG'den yaklaşık yüzde 26 küçüktür; kayıplı modda fark çok daha büyük olabilir.",
          "Ürün fotoğrafları, arka planı silinmiş görseller ve büyük banner'lar PNG'den WebP'ye çevrildiğinde sayfa yüklenme süresi belirgin şekilde kısalır.",
        ],
      },
      {
        id: "kalite",
        baslik: "Kalite ayarı",
        paragraflar: [
          "Bu araç WebP'yi kayıplı modda kaydeder ve kaliteyi sizin seçmenize izin verir. Logo ve metin içeren görsellerde %90 ve üstü, fotoğraflarda %75–85 iyi bir dengedir. Her dosyanın önceki ve sonraki boyutu listede görünür.",
        ],
      },
    ],
    sss: [
      {
        question: "Saydamlık korunur mu?",
        answer:
          "Evet. WebP saydamlığı desteklediği için PNG'deki saydam alanlar aynen aktarılır.",
      },
      {
        question: "Dönüştürme her tarayıcıda çalışır mı?",
        answer:
          "Chrome, Edge ve Firefox'un güncel sürümleri WebP dosyası oluşturabilir. Bazı Safari sürümleri oluşturamaz; bu durumda araç sizi uyarır.",
      },
      {
        question: "WebP ekran görüntülerinde de işe yarar mı?",
        answer:
          "Evet, ancak ekran görüntüsündeki küçük yazıların net kalması için kaliteyi yüksek tutun (%90 ve üstü).",
      },
      {
        question: "Dosyalarım internete gönderiliyor mu?",
        answer: "Hayır. Dönüştürme bilgisayarınızda, tarayıcınızda yapılır.",
      },
    ],
  },
];

export const findGorselCift = (slug: string) =>
  GORSEL_CIFTLER.find((c) => c.slug === slug) ?? null;

/** Karşılaştırma tablosu: formatların temel özellikleri. */
export const FORMAT_TABLOSU: Array<{
  ozellik: string;
  jpg: string;
  png: string;
  webp: string;
}> = [
  {
    ozellik: "Sıkıştırma",
    jpg: "Kayıplı",
    png: "Kayıpsız",
    webp: "Kayıplı veya kayıpsız",
  },
  { ozellik: "Saydamlık", jpg: "Yok", png: "Var", webp: "Var" },
  { ozellik: "Animasyon", jpg: "Yok", png: "Yok (APNG hariç)", webp: "Var" },
  {
    ozellik: "Fotoğrafta dosya boyutu",
    jpg: "Küçük",
    png: "Büyük",
    webp: "En küçük",
  },
  {
    ozellik: "Uyumluluk",
    jpg: "Neredeyse her yer",
    png: "Neredeyse her yer",
    webp: "Güncel tarayıcılar ve programlar",
  },
  {
    ozellik: "En uygun kullanım",
    jpg: "Fotoğraf, e-posta, başvuru",
    png: "Logo, ekran görüntüsü, çizim",
    webp: "Web siteleri",
  },
];
