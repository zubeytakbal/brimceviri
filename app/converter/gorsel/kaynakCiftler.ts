// Yalnızca okunabilen kaynak biçimlerden (AVIF, GIF, BMP, SVG, TIFF, JFIF) JPG/PNG'ye dönüştürme sayfaları.
import type { FaqItem } from "../faqSchema";

export type KaynakFormat = "avif" | "gif" | "bmp" | "svg" | "tiff" | "jfif";

export type KaynakCift = {
  slug: string;
  kaynak: KaynakFormat;
  kaynakAd: string;
  hedef: "jpg" | "png";
  kabul: string;
  baslik: string;
  seoBaslik: string;
  aciklama: string;
  /** Dosya Araçları kartındaki kısa açıklama. */
  kart: string;
  giris: string;
  bolumler: Array<{ id: string; baslik: string; paragraflar: string[] }>;
  sss: FaqItem[];
};

const GIZLILIK: FaqItem = {
  question: "Dosyalarım bir sunucuya yükleniyor mu?",
  answer:
    "Hayır. Dönüştürme tarayıcınızda, bilgisayarınızda yapılır; görseller internete gönderilmez. Tek seferde 30 dosya seçip hepsini ZIP olarak indirebilirsiniz.",
};

const KABUL = {
  avif: ".avif,image/avif",
  gif: ".gif,image/gif",
  bmp: ".bmp,.dib,image/bmp",
  svg: ".svg,image/svg+xml",
  tiff: ".tif,.tiff,image/tiff",
  jfif: ".jfif,.jpe,.jpg,.jpeg,image/jpeg",
} as const;

export const KAYNAK_CIFTLER: KaynakCift[] = [
  {
    slug: "avif-jpg-cevirme",
    kaynak: "avif",
    kaynakAd: "AVIF",
    hedef: "jpg",
    kabul: KABUL.avif,
    baslik: "AVIF JPG Çevirme",
    seoBaslik: "AVIF JPG Çevirme: Ücretsiz, Yüklemeden, Toplu",
    aciklama:
      "AVIF görselleri tarayıcınızda JPG'ye çevirin; Windows'ta, telefonda ve başvuru sitelerinde açılsın. Toplu dönüştürme, kalite ayarı, ZIP; dosyalar sunucuya yüklenmez.",
    kart: "Web'den inen AVIF görselleri her yerde açılan JPG'ye çevirin.",
    giris:
      "İnternetten kaydettiğiniz .avif uzantılı görseller açılmıyor ya da bir siteye yüklenmiyor mu? Tarayıcınızda JPG'ye çevirin; birden fazla dosyayı aynı anda dönüştürüp ZIP olarak indirin.",
    bolumler: [
      {
        id: "avif-nedir",
        baslik: "AVIF nedir, neden karşıma çıkıyor?",
        paragraflar: [
          "AVIF (AV1 Image File Format), Alliance for Open Media'nın AV1 video sıkıştırmasını temel alan görsel biçimidir. Aynı kalitedeki bir JPG'den genellikle belirgin biçimde küçüktür; bu yüzden haber, alışveriş ve fotoğraf siteleri görselleri giderek AVIF olarak sunuyor.",
          "Chrome, Edge, Firefox ve Safari'nin güncel sürümleri AVIF'i gösterir; ancak Windows'un Fotoğraflar uygulaması Microsoft Store'daki AV1 uzantısı olmadan açamayabilir. Eski fotoğraf programları, yazıcı yazılımları ve birçok form yükleme alanı da AVIF kabul etmez.",
        ],
      },
      {
        id: "kalite",
        baslik: "Dönüştürünce ne değişir?",
        paragraflar: [
          "JPG de kayıplı bir biçim olduğu için dosya genellikle AVIF'ten büyük çıkar; %90 kalitede görüntü farkı gözle seçilmez. AVIF'teki saydam alanlar JPG'de seçtiğiniz renkle (varsayılan beyaz) doldurulur; saydamlığı korumak için AVIF'i PNG'ye çevirin.",
        ],
      },
    ],
    sss: [
      {
        question: "AVIF dosyası Windows'ta nasıl açılır?",
        answer:
          "Güncel bir tarayıcıya (Chrome, Edge, Firefox) sürükleyip bırakarak görüntüleyebilirsiniz. Fotoğraflar uygulamasında açmak için Microsoft Store'dan AV1 Video Extension kurulması gerekebilir. Uzantı kurmadan kalıcı çözüm için dosyayı JPG'ye çevirin.",
      },
      {
        question: "Hareketli AVIF çevrilebilir mi?",
        answer:
          "JPG tek karelik bir biçimdir; hareketli AVIF'lerde yalnızca ilk kare dönüştürülür.",
      },
      {
        question: "AVIF mi WebP mi daha küçük?",
        answer:
          "Fotoğraflarda AVIF çoğunlukla WebP'den de küçük dosya verir, ancak kodlaması daha yavaştır ve desteği biraz daha yenidir. Paylaşmak ve yüklemek içinse en uyumlu seçim hâlâ JPG'dir.",
      },
      GIZLILIK,
    ],
  },
  {
    slug: "avif-png-cevirme",
    kaynak: "avif",
    kaynakAd: "AVIF",
    hedef: "png",
    kabul: KABUL.avif,
    baslik: "AVIF PNG Çevirme",
    seoBaslik: "AVIF PNG Çevirme: Saydamlığı Koruyarak (Ücretsiz)",
    aciklama:
      "AVIF görselleri saydamlığı koruyarak kayıpsız PNG'ye çevirin. Toplu dönüştürme ve ZIP indirme; dosyalar sunucuya yüklenmez, tarayıcınızda işlenir.",
    kart: "Saydam AVIF logo ve çizimleri saydamlığı koruyarak PNG yapın.",
    giris:
      "AVIF görsellerinizi saydam alanları bozulmadan PNG'ye çevirin. PNG her tasarım ve ofis programında açılır, düzenlemeye uygundur.",
    bolumler: [
      {
        id: "ne-zaman",
        baslik: "AVIF'i ne zaman PNG'ye çevirmeli?",
        paragraflar: [
          "Görsel saydam arka planlı bir logo, çıkartma veya ikon ise ya da üzerinde düzenleme yapacaksanız PNG en güvenli seçimdir: kayıpsızdır ve saydamlığı destekler. Word, PowerPoint, Canva ve eski tasarım programları PNG'yi sorunsuz açar.",
          "Fotoğraflarda PNG dosyası AVIF'e göre çok daha büyük olur. Yalnızca paylaşmak istiyorsanız AVIF JPG çevirme daha küçük dosya verir.",
        ],
      },
    ],
    sss: [
      {
        question: "Saydam arka plan korunur mu?",
        answer:
          "Evet. PNG saydamlığı desteklediği için AVIF'teki saydam pikseller aynen korunur.",
      },
      {
        question: "PNG neden bu kadar büyük?",
        answer:
          "AVIF çok verimli bir kayıplı sıkıştırma kullanır; PNG ise her pikseli kayıpsız saklar. Fotoğraflarda 5–20 kat büyüklük farkı normaldir.",
      },
      GIZLILIK,
    ],
  },
  {
    slug: "jfif-jpg-cevirme",
    kaynak: "jfif",
    kaynakAd: "JFIF",
    hedef: "jpg",
    kabul: KABUL.jfif,
    baslik: "JFIF JPG Çevirme",
    seoBaslik: "JFIF JPG Çevirme: .jfif Dosyasını JPG Yap (Ücretsiz)",
    aciklama:
      "Windows'ta .jfif olarak kaydedilen görselleri JPG'ye çevirin; başvuru sitelerine ve her programa yüklensin. Toplu dönüştürme, ZIP; dosyalar yüklenmez.",
    kart: "Tarayıcıdan .jfif olarak inen görselleri .jpg dosyasına çevirin.",
    giris:
      "İnternetten kaydettiğiniz resim .jfif uzantısıyla mı indi ve bir site kabul etmiyor mu? Görselleri seçin, hepsi tek seferde .jpg olsun.",
    bolumler: [
      {
        id: "jfif-nedir",
        baslik: "JFIF nedir?",
        paragraflar: [
          "JFIF (JPEG File Interchange Format), JPEG görüntülerin dosyada saklanma biçimidir; yani bir .jfif dosyası aslında sıradan bir JPEG fotoğraftır. Sorun yalnızca uzantıdadır: bazı Windows ayarlarında tarayıcılar web'den kaydedilen JPEG'leri .jfif uzantısıyla kaydeder.",
          "Birçok başvuru sitesi, e-Devlet ve okul sistemleri yalnızca .jpg ve .jpeg uzantılarını kabul ettiği için .jfif dosyası reddedilir. Bu araç görseli her programın tanıdığı .jpg dosyası olarak yeniden kaydeder.",
        ],
      },
      {
        id: "yeniden-adlandirma",
        baslik: "Uzantıyı değiştirmek yeterli mi?",
        paragraflar: [
          "Çoğu durumda evet: dosya adındaki .jfif kısmını .jpg yapmak da işe yarar, çünkü içerik zaten JPEG'dir. Ancak Windows uzantıları gizliyorsa bu zordur ve dosyaları tek tek değiştirmeniz gerekir. Araç ise birden fazla dosyayı aynı anda dönüştürür, isterseniz kaliteyi ve genişliği de ayarlar.",
        ],
      },
    ],
    sss: [
      {
        question: "Windows neden resimleri .jfif olarak kaydediyor?",
        answer:
          "Windows kayıt defterinde image/jpeg türü .jfif uzantısıyla eşleşmişse Chrome ve Edge web'den kaydedilen JPEG'lere bu uzantıyı verir. Kayıt defterindeki 'HKEY_CLASSES_ROOT\\MIME\\Database\\Content Type\\image/jpeg' anahtarında Extension değerini .jpg yapmak kalıcı çözümdür; düzenlemeden önce yedek almanız önerilir.",
      },
      {
        question: "JFIF ile JPG arasında kalite farkı var mı?",
        answer:
          "Hayır, ikisi de aynı JPEG sıkıştırmasını kullanır. Dönüştürmede %90 kalite ile yeniden kaydedilir; fark gözle görülmez. En yüksek kaliteyi korumak için kalite ayarını %100 yapabilirsiniz.",
      },
      GIZLILIK,
    ],
  },
  {
    slug: "gif-jpg-cevirme",
    kaynak: "gif",
    kaynakAd: "GIF",
    hedef: "jpg",
    kabul: KABUL.gif,
    baslik: "GIF JPG Çevirme",
    seoBaslik: "GIF JPG Çevirme: GIF'i Resme Dönüştür (Ücretsiz)",
    aciklama:
      "GIF dosyalarını JPG resme çevirin; hareketli GIF'in ilk karesi kaydedilir. Toplu dönüştürme, kalite ve arka plan rengi ayarı; dosyalar yüklenmez.",
    kart: "GIF'i JPG fotoğrafa çevirin; hareketli GIF'te ilk kare alınır.",
    giris:
      "GIF görsellerinizi JPG'ye çevirin. Hareketli GIF'lerin ilk karesi fotoğraf olarak kaydedilir; saydam alanlar seçtiğiniz renkle doldurulur.",
    bolumler: [
      {
        id: "gif-nedir",
        baslik: "GIF'in sınırları",
        paragraflar: [
          "GIF, 1987'den beri kullanılan ve en fazla 256 renk saklayabilen bir biçimdir. Basit animasyonlar ve logolar için uygundur, ancak fotoğraflarda renk kademeleri bozulur. JPG milyonlarca rengi saklar ve fotoğraflarda çok daha küçük dosya verir.",
          "GIF'i JPG'ye çevirmek kaybolan renkleri geri getirmez; ama görseli yalnızca JPG kabul eden sitelere yüklemenizi ve her programda düzenlemenizi sağlar.",
        ],
      },
    ],
    sss: [
      {
        question: "Hareketli GIF'in tüm kareleri çevrilir mi?",
        answer:
          "Hayır. JPG tek karelik bir biçim olduğu için hareketli GIF'in ilk karesi kaydedilir.",
      },
      {
        question: "Saydam GIF ne olur?",
        answer:
          "JPG saydamlığı desteklemez; saydam pikseller 'Saydam alanların rengi' ayarındaki renkle (varsayılan beyaz) doldurulur. Saydamlığı korumak isterseniz Görsel Dönüştürücü'de PNG seçin.",
      },
      GIZLILIK,
    ],
  },
  {
    slug: "bmp-jpg-cevirme",
    kaynak: "bmp",
    kaynakAd: "BMP",
    hedef: "jpg",
    kabul: KABUL.bmp,
    baslik: "BMP JPG Çevirme",
    seoBaslik: "BMP JPG Çevirme: Büyük BMP Dosyalarını Küçült (Ücretsiz)",
    aciklama:
      "BMP görselleri JPG'ye çevirin; dosya boyutu çoğu zaman 10 kattan fazla küçülür. Toplu dönüştürme, kalite ayarı, ZIP; dosyalar sunucuya yüklenmez.",
    kart: "Sıkıştırmasız dev BMP dosyalarını küçük JPG'lere çevirin.",
    giris:
      "Paint, tarayıcı veya eski programların kaydettiği BMP görselleri JPG'ye çevirin. Sıkıştırmasız BMP'ler JPG olunca çok daha küçük olur ve her yere yüklenebilir.",
    bolumler: [
      {
        id: "bmp-nedir",
        baslik: "BMP neden bu kadar büyük?",
        paragraflar: [
          "BMP (bitmap), Windows'un her pikseli genellikle sıkıştırmadan sakladığı biçimdir. 1920×1080 bir ekran görüntüsü BMP olarak yaklaşık 6 MB tutarken aynı görüntü JPG olarak çoğu zaman birkaç yüz KB'tır.",
          "E-posta eki, form yükleme ya da web sitesi için BMP uygun değildir; birçok sistem BMP'yi hiç kabul etmez.",
        ],
      },
      {
        id: "ekran-goruntusu",
        baslik: "Ekran görüntüsü için ipucu",
        paragraflar: [
          "Yazı ve keskin çizgi içeren ekran görüntülerinde JPG harflerin çevresinde hafif lekeler oluşturabilir. Bu tür görsellerde kaliteyi %90'ın üstünde tutun ya da Görsel Dönüştürücü'den PNG seçin; PNG de BMP'den çok daha küçüktür.",
        ],
      },
    ],
    sss: [
      {
        question: "BMP'yi JPG'ye çevirince kalite düşer mi?",
        answer:
          "JPG kayıplı olduğu için çok küçük bir kayıp olur; %90 kalitede fotoğraflarda fark edilmez. Dosya boyutu ise genellikle %90'dan fazla azalır.",
      },
      GIZLILIK,
    ],
  },
  {
    slug: "svg-png-cevirme",
    kaynak: "svg",
    kaynakAd: "SVG",
    hedef: "png",
    kabul: KABUL.svg,
    baslik: "SVG PNG Çevirme",
    seoBaslik: "SVG PNG Çevirme: Yüksek Çözünürlük, Saydam (Ücretsiz)",
    aciklama:
      "SVG vektör çizimleri saydam arka planlı, yüksek çözünürlüklü PNG'ye çevirin. Genişlik seçimi, toplu dönüştürme, ZIP; dosyalar sunucuya yüklenmez.",
    kart: "SVG logo ve ikonları net, saydam arka planlı PNG yapın.",
    giris:
      "SVG logo, ikon ve çizimlerinizi PNG'ye çevirin. Vektör çizim uzun kenarı en az 2048 piksel olacak şekilde net olarak çizilir; saydam arka plan korunur.",
    bolumler: [
      {
        id: "svg-nedir",
        baslik: "SVG ile PNG farkı",
        paragraflar: [
          "SVG, şekilleri matematiksel olarak tanımlayan bir vektör biçimidir; ne kadar büyütülürse büyütülsün netliğini korur. PNG ise piksellerden oluşur. Web sitesinde logo için SVG idealdir, ancak Word, PowerPoint, sosyal medya ve birçok baskı servisi PNG ister.",
          "Dönüştürmede çizim, uzun kenarı en az 2048 piksel olacak biçimde vektörden çizilir. Daha küçük bir PNG istiyorsanız 'En fazla genişlik' ayarıyla küçültebilirsiniz; büyütmede olduğu gibi bulanıklık olmaz.",
        ],
      },
      {
        id: "yazi-tipleri",
        baslik: "Yazı tipleri ve dış bağlantılar",
        paragraflar: [
          "SVG içinde bilgisayarınızda yüklü olmayan bir yazı tipi kullanılmışsa yerine benzer bir yazı tipi çizilir. Harfleri tasarım programında 'dış hatlara dönüştürülmüş' SVG'ler her yerde aynı görünür. Dışarıdan bağlantıyla yüklenen görseller güvenlik nedeniyle çizilmez.",
        ],
      },
    ],
    sss: [
      {
        question: "Saydam arka plan korunur mu?",
        answer:
          "Evet. SVG'de arka plan yoksa PNG de saydam olur. Beyaz arka plan istiyorsanız SVG JPG çevirme sayfasını kullanın.",
      },
      {
        question: "PNG kaç piksel olur?",
        answer:
          "SVG'de belirtilen boyut 2048 pikselden küçükse uzun kenar 2048 piksele büyütülür; daha büyükse kendi boyutunda çizilir. 'En fazla genişlik' seçeneğiyle 512, 1024 gibi değerlere indirebilirsiniz.",
      },
      {
        question: "PNG'yi SVG'ye çevirebilir miyim?",
        answer:
          "Piksel görseli vektöre çevirmek (vektörleştirme) otomatik bir çizim tahmini gerektirir ve bu araçta yoktur. Basit logolar için tasarım programlarının 'görüntü izleme' özelliğini kullanabilirsiniz.",
      },
      GIZLILIK,
    ],
  },
  {
    slug: "svg-jpg-cevirme",
    kaynak: "svg",
    kaynakAd: "SVG",
    hedef: "jpg",
    kabul: KABUL.svg,
    baslik: "SVG JPG Çevirme",
    seoBaslik: "SVG JPG Çevirme: Vektörü Resme Dönüştür (Ücretsiz)",
    aciklama:
      "SVG çizimleri istediğiniz arka plan rengiyle yüksek çözünürlüklü JPG'ye çevirin. Toplu dönüştürme, kalite ayarı, ZIP; dosyalar sunucuya yüklenmez.",
    kart: "SVG çizimleri arka plan rengi seçerek JPG resme çevirin.",
    giris:
      "SVG vektör çizimlerinizi JPG'ye çevirin. Saydam alanlar seçtiğiniz renkle doldurulur; çizim uzun kenarı en az 2048 piksel olacak şekilde net olarak üretilir.",
    bolumler: [
      {
        id: "ne-zaman",
        baslik: "SVG'yi ne zaman JPG'ye çevirmeli?",
        paragraflar: [
          "SVG'yi yalnızca JPG kabul eden bir yere (başvuru formu, bazı mesajlaşma ve e-ticaret panelleri) yükleyecekseniz ya da infografiği fotoğraf gibi paylaşacaksanız JPG uygundur. Logo ve ikonlar için saydamlığı koruyan PNG daha iyi bir seçimdir.",
        ],
      },
      {
        id: "arka-plan",
        baslik: "Arka plan rengi",
        paragraflar: [
          "SVG'lerin çoğunda arka plan saydamdır. JPG saydamlığı desteklemediği için bu alanlar varsayılan olarak beyaz olur; 'Saydam alanların rengi' ayarından kurumsal renginizi seçebilirsiniz.",
        ],
      },
    ],
    sss: [
      {
        question: "JPG'de kenarlar neden bulanık görünüyor?",
        answer:
          "JPG keskin çizgili çizimlerde kenarların çevresinde hafif lekeler oluşturabilir. Kaliteyi %95'in üstüne çıkarın ya da SVG PNG çevirme sayfasını kullanın.",
      },
      GIZLILIK,
    ],
  },
  {
    slug: "tiff-jpg-cevirme",
    kaynak: "tiff",
    kaynakAd: "TIFF",
    hedef: "jpg",
    kabul: KABUL.tiff,
    baslik: "TIFF JPG Çevirme",
    seoBaslik: "TIFF JPG Çevirme: TIF Dosyasını JPG Yap (Ücretsiz)",
    aciklama:
      "Tarayıcı ve fotoğraf makinesi TIFF/TIF dosyalarını JPG'ye çevirin; boyut büyük ölçüde küçülür. LZW, ZIP ve faks (CCITT) sıkıştırma desteği; dosyalar yüklenmez.",
    kart: "Tarayıcı ve baskı TIFF/TIF dosyalarını küçük JPG'lere çevirin.",
    giris:
      "Tarayıcıdan (scanner), fakstan veya baskı işlerinden gelen TIFF ve TIF dosyalarını JPG'ye çevirin. Dosya boyutu küçülür, görsel her yerde açılır.",
    bolumler: [
      {
        id: "tiff-nedir",
        baslik: "TIFF nerede kullanılır?",
        paragraflar: [
          "TIFF, kayıpsız ve yüksek çözünürlüklü görüntüleri saklamak için tarayıcılar, faks sistemleri, matbaalar ve arşivler tarafından yaygın olarak kullanılır. Dosyalar bu nedenle çok büyüktür ve tarayıcılar, telefonlar ile birçok web sitesi TIFF'i açamaz.",
          "Araç sıkıştırmasız, LZW, ZIP (Deflate), PackBits ve siyah-beyaz faks (CCITT G3/G4) TIFF'lerini okur. TIFF çözücü (yaklaşık 80 KB) ilk TIFF dosyasında bir kez indirilir.",
        ],
      },
      {
        id: "cok-sayfa",
        baslik: "Çok sayfalı TIFF",
        paragraflar: [
          "Faks ve taranmış belgeler birden fazla sayfayı tek TIFF'te saklayabilir. JPG tek sayfalık olduğu için dosyadaki ana (en büyük) sayfa dönüştürülür. Çok sayfalı belgeleri tek dosyada tutmak için sayfaları JPG'ye çevirdikten sonra JPG PDF çevirme aracıyla PDF yapabilirsiniz.",
        ],
      },
    ],
    sss: [
      {
        question: "TIF ile TIFF farklı mı?",
        answer:
          "Hayır, aynı biçimdir. Eski sistemlerdeki üç harfli uzantı sınırı nedeniyle .tif de kullanılır; araç ikisini de açar.",
      },
      {
        question: "Baskı kalitesi korunur mu?",
        answer:
          "Çözünürlük (piksel sayısı) aynen korunur. JPG kayıplı olduğu için %95 ve üstü kalite seçmek baskıya gidecek görsellerde en iyi sonucu verir. Kayıpsız çıktı gerekiyorsa Görsel Dönüştürücü'den PNG seçin.",
      },
      GIZLILIK,
    ],
  },
];
