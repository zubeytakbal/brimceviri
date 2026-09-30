// Ses dönüştürme sayfalarının içeriği. Her sayfanın metni o dönüşüme özeldir.
import type { FaqItem } from "../faqSchema";

export type SesKaynak = "mp4" | "wav" | "m4a" | "opus" | "ogg" | "flac" | "mp3";

export type SesCift = {
  slug: string;
  kaynak: SesKaynak;
  kaynakAd: string;
  hedef: "mp3" | "wav";
  kabul: string;
  baslik: string;
  seoBaslik: string;
  aciklama: string;
  kart: string;
  giris: string;
  varsayilanKbps?: number;
  bolumler: Array<{ id: string; baslik: string; paragraflar: string[] }>;
  sss: FaqItem[];
};

const GIZLILIK: FaqItem = {
  question: "Dosyalarım bir sunucuya yükleniyor mu?",
  answer:
    "Hayır. Ses tarayıcınızda çözülür ve yeniden kodlanır; dosyalar internete gönderilmez. Tek seferde 20 dosya seçip hepsini ZIP olarak indirebilirsiniz.",
};

const KALITE: FaqItem = {
  question: "Hangi MP3 kalitesini seçmeliyim?",
  answer:
    "Müzik için 192 kbps çoğu kulakta orijinalden ayırt edilemez; 320 kbps en yüksek MP3 kalitesidir. Konuşma, ders ve toplantı kayıtlarında 96 kbps ve 'Tek kanal (mono)' seçeneği dosyayı çok küçültür.",
};

export const SES_CIFTLERI: SesCift[] = [
  {
    slug: "mp4-mp3-cevirme",
    kaynak: "mp4",
    kaynakAd: "MP4 / video",
    hedef: "mp3",
    kabul: "video/*,audio/*,.mp4,.m4v,.mov,.webm,.mkv,.3gp",
    baslik: "MP4 MP3 Çevirme (Videodan Ses Çıkarma)",
    seoBaslik: "MP4 MP3 Çevirme: Videodan Sesi Çıkar (Ücretsiz, Yüklemeden)",
    aciklama:
      "MP4, MOV ve WebM videolardaki sesi MP3 olarak kaydedin. 320 kbps'e kadar kalite, toplu dönüştürme, ZIP; videonuz sunucuya yüklenmez, tarayıcıda işlenir.",
    kart: "Videodaki sesi MP3 olarak kaydedin; MP4, MOV, WebM desteklenir.",
    giris:
      "Videolarınızdaki müziği, konuşmayı veya ders kaydını MP3 olarak alın. Video dosyası bilgisayarınızdan çıkmaz; büyük videolarda bile yükleme beklemezsiniz.",
    bolumler: [
      {
        id: "nasil",
        baslik: "Videodan ses nasıl çıkarılır?",
        paragraflar: [
          "Video dosyanızı seçin veya sürükleyip bırakın. Araç videodaki ses parçasını tarayıcınızın kendi çözücüsüyle açar ve seçtiğiniz kalitede MP3'e kodlar. Görüntü kısmı işlenmediği için dönüştürme, videonun süresine göre birkaç saniye ile birkaç dakika arasında sürer.",
          "Telefonla çekilen MOV (iPhone), ekran kayıtları ve WebM videolar da desteklenir. Birden fazla videoyu aynı anda seçip hepsinin MP3'ünü tek ZIP dosyasında indirebilirsiniz.",
        ],
      },
      {
        id: "kalite",
        baslik: "Ses kalitesi değişir mi?",
        paragraflar: [
          "Videolardaki ses genellikle AAC biçimindedir; MP3'e çevirmek yeniden kodlama gerektirir. 192 kbps ve üstü seçildiğinde fark kulakla fark edilmez. Kaynak sesten daha yüksek kalite seçmek sesi iyileştirmez, yalnızca dosyayı büyütür.",
        ],
      },
      {
        id: "telif",
        baslik: "Hatırlatma",
        paragraflar: [
          "Yalnızca kendi çektiğiniz ya da kullanma izniniz olan videoların sesini dönüştürün. Bu araç internetten video indirmez; bilgisayarınızdaki dosyalarla çalışır.",
        ],
      },
    ],
    sss: [
      {
        question: "Büyük videolar (1 GB ve üstü) dönüştürülebilir mi?",
        answer:
          "Tarayıcı videonun tamamını belleğe aldığı için çok büyük dosyalarda bilgisayarın belleği yetmeyebilir. Genellikle 1 saate kadar olan videolar sorunsuz dönüştürülür; daha uzun kayıtları bölerek deneyin.",
      },
      {
        question: "Videonun yalnızca bir bölümünün sesini alabilir miyim?",
        answer:
          "Evet. Videoyu Ses Kesme aracında açın, istediğiniz aralığı seçin ve MP3 olarak indirin.",
      },
      {
        question: "Telefonda çalışır mı?",
        answer:
          "Evet, güncel Android ve iPhone tarayıcılarında çalışır. Uzun videolarda bilgisayar daha hızlıdır.",
      },
      KALITE,
      GIZLILIK,
    ],
  },
  {
    slug: "opus-mp3-cevirme",
    kaynak: "opus",
    kaynakAd: "OPUS / WhatsApp ses kaydı",
    hedef: "mp3",
    kabul: ".opus,.ogg,.oga,audio/ogg,audio/opus,audio/*",
    varsayilanKbps: 128,
    baslik: "OPUS MP3 Çevirme (WhatsApp Ses Kaydı)",
    seoBaslik: "OPUS MP3 Çevirme: WhatsApp Ses Kaydını MP3 Yap (Ücretsiz)",
    aciklama:
      "WhatsApp ve Telegram sesli mesajlarını (.opus) her cihazda açılan MP3'e çevirin. Toplu dönüştürme, ZIP; ses kayıtlarınız sunucuya yüklenmez.",
    kart: "WhatsApp ve Telegram sesli mesajlarını her yerde açılan MP3 yapın.",
    giris:
      "WhatsApp'tan dışa aktardığınız .opus uzantılı sesli mesajlar bilgisayarda veya bazı programlarda açılmıyor mu? MP3'e çevirin; kayıtlar bilgisayarınızdan çıkmaz.",
    bolumler: [
      {
        id: "opus-nedir",
        baslik: "OPUS nedir?",
        paragraflar: [
          "Opus, düşük bit hızında bile konuşmayı çok net saklayan açık bir ses kodlamasıdır. WhatsApp, Telegram, Signal ve Discord sesli mesajları bu biçimde kaydeder; dosya genellikle .opus veya .ogg uzantılıdır.",
          "Windows Medya Oynatıcı, eski araç teyp sistemleri, bazı telefonlar ve ses düzenleme programları Opus'u açamaz. MP3 ise neredeyse her yerde çalar.",
        ],
      },
      {
        id: "whatsapp",
        baslik: "WhatsApp sesli mesajı dosya olarak nasıl alınır?",
        paragraflar: [
          "Android'de: sesli mesaja basılı tutun, Paylaş simgesine dokunun ve dosyayı Drive'a, e-postaya ya da Dosyalar uygulamasına gönderin. Sesli notlar ayrıca telefonun Android/media/com.whatsapp/WhatsApp/Media/WhatsApp Voice Notes klasöründe bulunur.",
          "iPhone'da: mesaja basılı tutun, İlet'e dokunun, ardından paylaş simgesiyle Dosyalar'a kaydedin veya kendinize e-posta ile gönderin.",
          "Sohbeti 'Sohbeti dışa aktar' seçeneğiyle medyayla birlikte dışa aktardığınızda da sesli mesajlar .opus dosyaları olarak gelir; hepsini tek seferde seçip dönüştürebilirsiniz.",
        ],
      },
    ],
    sss: [
      {
        question: "OPUS dosyası açılmıyor, ne yapmalıyım?",
        answer:
          "Dosyayı bu sayfada seçin; MP3'e çevrildikten sonra her oynatıcıda açılır. Safari'nin eski sürümleri Opus çözemeyebilir; sorun olursa Chrome, Edge veya Firefox kullanın.",
      },
      {
        question: "Konuşma kayıtları için hangi kalite yeterli?",
        answer:
          "Sesli mesajlar zaten konuşma için sıkıştırıldığından 96–128 kbps ve 'Tek kanal (mono)' seçeneği yeterlidir; daha yüksek kalite dosyayı büyütür ama sesi iyileştirmez.",
      },
      GIZLILIK,
    ],
  },
  {
    slug: "m4a-mp3-cevirme",
    kaynak: "m4a",
    kaynakAd: "M4A",
    hedef: "mp3",
    kabul: ".m4a,.aac,.mp4,audio/mp4,audio/aac,audio/x-m4a,audio/*",
    baslik: "M4A MP3 Çevirme",
    seoBaslik: "M4A MP3 Çevirme: iPhone Ses Kaydını MP3 Yap (Ücretsiz)",
    aciklama:
      "iPhone Sesli Notlar ve iTunes M4A/AAC dosyalarını MP3'e çevirin. Kalite seçimi, toplu dönüştürme, ZIP; dosyalar sunucuya yüklenmez.",
    kart: "iPhone Sesli Notlar ve AAC kayıtlarını MP3'e çevirin.",
    giris:
      "iPhone'daki Sesli Notlar uygulamasının kaydettiği ya da iTunes'tan gelen M4A dosyalarını MP3'e çevirin; her araba teybinde, telefonda ve programda çalsın.",
    bolumler: [
      {
        id: "m4a-nedir",
        baslik: "M4A nedir?",
        paragraflar: [
          "M4A, genellikle AAC kodlamalı sesi taşıyan MPEG-4 ses dosyasıdır. iPhone'un Sesli Notlar uygulaması, WhatsApp'ın iPhone'dan gönderdiği bazı ses dosyaları ve iTunes satın alımları bu biçimdedir.",
          "AAC, aynı bit hızında MP3'ten biraz daha verimlidir; ancak bazı araç müzik sistemleri, eski MP3 çalarlar ve web siteleri yalnızca MP3 kabul eder.",
        ],
      },
    ],
    sss: [
      {
        question: "DRM korumalı M4P dosyaları çevrilebilir mi?",
        answer:
          "Hayır. Kopya korumalı (DRM) dosyalar tarayıcıda çözülemez. Günümüzdeki iTunes müzik satın alımları korumasızdır ve dönüştürülebilir.",
      },
      KALITE,
      GIZLILIK,
    ],
  },
  {
    slug: "wav-mp3-cevirme",
    kaynak: "wav",
    kaynakAd: "WAV",
    hedef: "mp3",
    kabul: ".wav,.wave,audio/wav,audio/x-wav,audio/*",
    baslik: "WAV MP3 Çevirme",
    seoBaslik: "WAV MP3 Çevirme: Büyük WAV Dosyalarını Küçült (Ücretsiz)",
    aciklama:
      "WAV ses dosyalarını MP3'e çevirin; dosya boyutu yaklaşık 7–10 kat küçülür. 320 kbps'e kadar kalite, toplu dönüştürme, ZIP; yüklemeden.",
    kart: "Dev WAV kayıtlarını 7–10 kat küçük MP3'e çevirin.",
    giris:
      "Stüdyo, ses kayıt cihazı veya bilgisayar kayıtlarından çıkan büyük WAV dosyalarını MP3'e çevirin; e-postayla gönderin, telefonda dinleyin.",
    bolumler: [
      {
        id: "boyut",
        baslik: "WAV neden bu kadar büyük?",
        paragraflar: [
          "WAV sesi sıkıştırmadan saklar: CD kalitesinde (44,1 kHz, 16 bit, stereo) bir dakikalık kayıt yaklaşık 10 MB tutar. Aynı dakika 192 kbps MP3 olarak yaklaşık 1,4 MB'tır.",
          "Kayıt ve düzenleme aşamasında WAV kullanmak doğrudur; paylaşmak ve arşivlemek içinse MP3 çok daha pratiktir.",
        ],
      },
    ],
    sss: [
      {
        question: "24 bit veya 96 kHz WAV dosyaları desteklenir mi?",
        answer:
          "Evet. Yüksek çözünürlüklü WAV dosyaları açılır ve MP3 için 44,1 kHz'e dönüştürülür.",
      },
      KALITE,
      GIZLILIK,
    ],
  },
  {
    slug: "flac-mp3-cevirme",
    kaynak: "flac",
    kaynakAd: "FLAC",
    hedef: "mp3",
    kabul: ".flac,audio/flac,audio/x-flac,audio/*",
    varsayilanKbps: 320,
    baslik: "FLAC MP3 Çevirme",
    seoBaslik: "FLAC MP3 Çevirme: 320 kbps, Toplu (Ücretsiz, Yüklemeden)",
    aciklama:
      "Kayıpsız FLAC müzik dosyalarını telefon ve araç için MP3'e çevirin. 320 kbps kalite, toplu dönüştürme, ZIP; dosyalar sunucuya yüklenmez.",
    kart: "Kayıpsız FLAC albümlerini telefona uygun 320 kbps MP3 yapın.",
    giris:
      "FLAC albümlerinizi telefonunuza, araç müzik sistemine veya MP3 çalarınıza sığacak MP3 dosyalarına çevirin. Tüm albümü tek seferde seçebilirsiniz.",
    bolumler: [
      {
        id: "flac-nedir",
        baslik: "FLAC ile MP3 farkı",
        paragraflar: [
          "FLAC kayıpsız bir sıkıştırmadır: CD'deki sesi bit bit korur ve WAV'ın yaklaşık yarısı kadar yer kaplar. MP3 ise kulağın duymakta zorlandığı ayrıntıları atarak dosyayı FLAC'ın 3–5'te birine indirir.",
          "Arşiv için FLAC'ı saklayın, günlük dinleme için 320 kbps MP3 kopyası çıkarın. Şarkı adı ve kapak gibi etiketler dönüştürmede aktarılmaz.",
        ],
      },
    ],
    sss: [
      {
        question: "Şarkı adı, sanatçı ve kapak resmi korunur mu?",
        answer:
          "Hayır, şu an etiketler (ID3) aktarılmaz; dosya adı korunur. Etiketleri müzik programınızla ekleyebilirsiniz.",
      },
      KALITE,
      GIZLILIK,
    ],
  },
  {
    slug: "ogg-mp3-cevirme",
    kaynak: "ogg",
    kaynakAd: "OGG",
    hedef: "mp3",
    kabul: ".ogg,.oga,audio/ogg,audio/*",
    baslik: "OGG MP3 Çevirme",
    seoBaslik: "OGG MP3 Çevirme: Ücretsiz, Toplu, Yüklemeden",
    aciklama:
      "OGG Vorbis ve Opus ses dosyalarını MP3'e çevirin; her cihazda çalsın. Kalite seçimi, toplu dönüştürme, ZIP; dosyalar sunucuya yüklenmez.",
    kart: "Oyun, uygulama ve Telegram OGG seslerini MP3 yapın.",
    giris:
      "Oyunlardan, uygulamalardan veya Telegram'dan gelen OGG ses dosyalarını MP3'e çevirin. Birden fazla dosyayı aynı anda dönüştürüp ZIP olarak indirin.",
    bolumler: [
      {
        id: "ogg-nedir",
        baslik: "OGG nedir?",
        paragraflar: [
          "OGG, içinde genellikle Vorbis veya Opus kodlamalı ses taşıyan açık bir dosya kabıdır. Oyunlarda, Linux uygulamalarında, Wikipedia ses dosyalarında ve Telegram sesli mesajlarında sık görülür.",
          "iPhone, Windows'un eski sürümleri ve birçok araç teybi OGG çalamaz; MP3'e çevirmek uyumluluk sorununu çözer.",
        ],
      },
    ],
    sss: [KALITE, GIZLILIK],
  },
  {
    slug: "mp3-wav-cevirme",
    kaynak: "mp3",
    kaynakAd: "MP3",
    hedef: "wav",
    kabul: ".mp3,audio/mpeg,audio/*",
    baslik: "MP3 WAV Çevirme",
    seoBaslik: "MP3 WAV Çevirme: Düzenleme ve Program İçin WAV (Ücretsiz)",
    aciklama:
      "MP3 dosyalarını 16 bit, 44,1 kHz WAV'a çevirin; ses düzenleme programları, santral (IVR) ve donanımlar için. Toplu dönüştürme, ZIP; yüklemeden.",
    kart: "MP3'leri düzenleme ve santral sistemleri için WAV'a çevirin.",
    giris:
      "MP3 dosyalarını ses düzenleme programlarının, bazı santral (IVR) ve anons sistemlerinin ya da donanımların istediği WAV biçimine çevirin.",
    bolumler: [
      {
        id: "ne-zaman",
        baslik: "MP3'ü ne zaman WAV'a çevirmeli?",
        paragraflar: [
          "Bazı video ve ses düzenleme programları, santral bekletme müzikleri, oyun motorları ve elektronik cihazlar yalnızca sıkıştırılmamış WAV kabul eder. Düzenleme sırasında her kaydetmede kalite kaybı birikmesini önlemek için de WAV ile çalışmak iyi bir yöntemdir.",
          "WAV'a çevirmek MP3'te kaybolmuş ayrıntıyı geri getirmez; ses aynı kalır, dosya yaklaşık 7–10 kat büyür.",
        ],
      },
    ],
    sss: [
      {
        question: "Çıktı WAV hangi ayarlarda?",
        answer:
          "16 bit PCM, 44,1 kHz; stereo ya da isterseniz tek kanal (mono). Bu, CD kalitesidir ve hemen her program ve cihaz tarafından desteklenir.",
      },
      {
        question: "Santral (IVR) için 8 kHz mono WAV gerekiyor, olur mu?",
        answer:
          "Mono seçeneği vardır; ancak örnekleme hızı şu an 44,1 kHz'tir. 8 kHz isteyen sistemler çoğunlukla dosyayı kendileri dönüştürür; emin değilseniz sistem sağlayıcınıza danışın.",
      },
      GIZLILIK,
    ],
  },
];
