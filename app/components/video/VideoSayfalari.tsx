import Link from "@/app/components/SiteLink";
import type { ReactNode } from "react";
import type { FaqItem } from "../../converter/faqSchema";
import { DOSYA_ARACLARI_YOLU } from "../../converter/gorsel/dosyaAraclari";
import AracSayfasi from "../gorsel/AracSayfasi";
import { takvimMetadata } from "../takvim/takvimMeta";
import VideoGif from "./VideoGif";
import VideoIslem, { type VideoMod } from "./VideoIslem";

const GIZLILIK: FaqItem = {
  question: "Videom bir sunucuya yükleniyor mu?",
  answer:
    "Hayır. Video tarayıcınızda, bilgisayarınızın veya telefonunuzun kendi kodlayıcısıyla işlenir; internete gönderilmez. Bu yüzden büyük videolarda yükleme beklemezsiniz ve dosya boyutu sınırı yoktur (yalnızca cihazınızın belleği sınırdır).",
};

const TARAYICI: FaqItem = {
  question: "Hangi tarayıcıda çalışır?",
  answer:
    "Chrome, Edge ve Safari'nin güncel sürümlerinde (bilgisayar ve telefon) en iyi sonucu verir. Firefox'ta da çalışır; ancak bazı sürümlerde H.264 kodlama desteği olmayabilir. iPhone videolarındaki HEVC (H.265) kodeki bazı Windows bilgisayarlarda çözülemeyebilir.",
};

type Sayfa = {
  yol: string;
  baslik: string;
  seoBaslik: string;
  aciklama: string;
  giris: string;
  arac: ReactNode;
  sss: FaqItem[];
  bolumler: Array<{ id: string; baslik: string; icerik: ReactNode }>;
};

const BAGLANTILAR = [
  { href: DOSYA_ARACLARI_YOLU, label: "Tüm Dosya Araçları" },
  { href: "/video-sikistirma", label: "Video Sıkıştırma" },
  { href: "/mov-mp4-cevirme", label: "MOV MP4 Çevirme" },
  { href: "/video-kesme", label: "Video Kesme" },
  { href: "/video-dondurme", label: "Video Döndürme" },
  { href: "/videodan-sesi-kaldirma", label: "Videodan Sesi Kaldırma" },
  { href: "/video-gif-cevirme", label: "Video GIF Çevirme" },
  { href: "/gif-mp4-cevirme", label: "GIF MP4 Çevirme" },
  { href: "/mp4-mp3-cevirme", label: "MP4 MP3 Çevirme" },
];

const islem = (mod: VideoMod) => <VideoIslem mod={mod} />;

export const VIDEO_SAYFALARI: Record<string, Sayfa> = {
  "video-sikistirma": {
    yol: "/video-sikistirma",
    baslik: "Video Sıkıştırma (Video Boyutu Küçültme)",
    seoBaslik: "Video Sıkıştırma: Hedef MB'a Küçült (Ücretsiz, Yüklemeden)",
    aciklama:
      "Videoyu e-posta (25 MB), Discord (10 MB) veya istediğiniz MB değerine sığacak şekilde sıkıştırın; ya da kalite ve çözünürlük seçin. Video sunucuya yüklenmez.",
    giris:
      "Videonuzu e-posta, WhatsApp, Discord veya başvuru sistemlerinin boyut sınırına sığacak şekilde küçültün. Hedef boyutu seçin; bit hızı ve çözünürlük otomatik hesaplanır.",
    arac: islem("sikistir"),
    sss: [
      {
        question: "Video nasıl belirli bir MB'a küçültülür?",
        answer:
          "'Hedef boyut' sekmesinde 25 MB gibi bir değer seçin. Araç videonun süresine göre gereken bit hızını hesaplar (dosya boyutu ≈ bit hızı × süre), gerekirse çözünürlüğü de düşürür ve videoyu bu değerin biraz altında kalacak şekilde yeniden kodlar.",
      },
      {
        question: "Kalite ne kadar düşer?",
        answer:
          "Küçülme oranına bağlıdır. Telefonların 1080p videoları genellikle gereğinden yüksek bit hızıyla kaydedilir; 3–5 kat küçültmede fark çoğu zaman gözle seçilmez. Çok uzun bir videoyu çok küçük bir hedefe sığdırmak ise görüntüyü bulanıklaştırır; bu durumda videoyu kesip kısaltmak daha iyi sonuç verir.",
      },
      {
        question: "Discord ve e-posta sınırları kaç MB?",
        answer:
          "Gmail ve Outlook ekleri için sınır 25 MB (Outlook.com'da 20 MB) civarındadır; daha büyük dosyalar bulut bağlantısı olarak gönderilir. Discord'un ücretsiz hesaplarında dosya sınırı 10 MB'tır. Sınırlar değişebileceği için güncel değeri hizmetin yardım sayfasından kontrol edin.",
      },
      {
        question: "Ne kadar sürer?",
        answer:
          "Kodlamayı cihazınızın donanım kodlayıcısı yaptığı için bilgisayarlarda 1 dakikalık 1080p video genellikle birkaç saniye ile bir dakika arasında sıkıştırılır. Telefonlarda ve eski bilgisayarlarda daha uzun sürebilir.",
      },
      TARAYICI,
      GIZLILIK,
    ],
    bolumler: [
      {
        id: "yontemler",
        baslik: "İki sıkıştırma yöntemi",
        icerik: (
          <ul>
            <li>
              <b>Hedef boyut:</b> 8, 10, 16, 25, 50 MB veya yazdığınız değer.
              Sınırı olan yerlere göndermek için en kolay yol.
            </li>
            <li>
              <b>Kalite ve çözünürlük:</b> 1080p, 720p, 480p gibi çözünürlük ve
              yüksek/orta/düşük kalite. Arşivlemek veya web sitesine koymak
              için.
            </li>
          </ul>
        ),
      },
      {
        id: "ipuclari",
        baslik: "Daha küçük dosya için ipuçları",
        icerik: (
          <ul>
            <li>
              Gereksiz başı ve sonu önce{" "}
              <Link href="/video-kesme">Video Kesme</Link> ile atın; süre
              kısaldıkça aynı boyutta kalite artar.
            </li>
            <li>
              Ses gerekmiyorsa{" "}
              <Link href="/videodan-sesi-kaldirma">sesi kaldırmak</Link> birkaç
              MB kazandırır.
            </li>
            <li>
              Telefonda izlenecek videolar için 720p çoğu zaman yeterlidir.
            </li>
          </ul>
        ),
      },
    ],
  },
  "mov-mp4-cevirme": {
    yol: "/mov-mp4-cevirme",
    baslik: "MOV MP4 Çevirme",
    seoBaslik: "MOV MP4 Çevirme: iPhone Videolarını MP4 Yap (Ücretsiz)",
    aciklama:
      "iPhone ve Mac MOV videolarını MP4'e çevirin; çoğu zaman kalite kaybı olmadan saniyeler içinde. HEVC videoları H.264'e çevirme seçeneği; video yüklenmez.",
    giris:
      "iPhone'da çekilen veya Mac'te kaydedilen MOV videoları Windows'ta, Android'de ve web sitelerinde açılan MP4'e çevirin. Video zaten H.264 ise yeniden kodlanmaz, kalite birebir korunur.",
    arac: islem("mp4"),
    sss: [
      {
        question: "MOV ile MP4 arasındaki fark nedir?",
        answer:
          "İkisi de video ve sesi taşıyan dosya kaplarıdır; MOV Apple'ın QuickTime biçimi, MP4 ise uluslararası standarttır. İçlerindeki görüntü çoğu zaman aynı kodektir (H.264 veya HEVC). Bu yüzden dönüştürme genellikle yalnızca kabı değiştirir ve kalite kaybı olmaz.",
      },
      {
        question: "iPhone videosu neden Windows'ta açılmıyor?",
        answer:
          "iPhone varsayılan olarak 'Yüksek Verimlilik' ayarıyla HEVC (H.265) kaydeder; Windows'ta HEVC için ek uzantı gerekebilir. 'H.264'e çevir' seçeneğini işaretlerseniz video her cihazda açılan H.264'e yeniden kodlanır. iPhone'da Ayarlar > Kamera > Biçimler > 'En Uyumlu' seçilirse yeni videolar doğrudan H.264 kaydedilir.",
      },
      TARAYICI,
      GIZLILIK,
    ],
    bolumler: [
      {
        id: "hizli",
        baslik: "Neden bu kadar hızlı?",
        icerik: (
          <p>
            Video H.264 veya HEVC ise görüntü ve ses verisi yeniden
            sıkıştırılmadan MP4 kabına kopyalanır. Bu işlem birkaç saniye sürer
            ve dosya boyutu neredeyse aynı kalır. Dosyayı küçültmek de
            istiyorsanız <Link href="/video-sikistirma">Video Sıkıştırma</Link>{" "}
            aracı hem MP4&apos;e çevirir hem küçültür.
          </p>
        ),
      },
    ],
  },
  "video-kesme": {
    yol: "/video-kesme",
    baslik: "Video Kesme",
    seoBaslik: "Video Kesme: Videonun Başını ve Sonunu Kes (Ücretsiz)",
    aciklama:
      "Videonun istediğiniz bölümünü saniye hassasiyetinde kesin; oynatıcıdan 'Şu an' ile başlangıç ve bitiş seçin. Kalite kaybı olmadan hızlı kesim; video yüklenmez.",
    giris:
      "Videonuzun gereksiz başını ve sonunu atın ya da içinden bir bölüm alın. Oynatıcıda istediğiniz ana gelip 'Şu an' düğmesine basmanız yeterli.",
    arac: islem("kes"),
    sss: [
      {
        question: "Video nasıl kesilir?",
        answer:
          "Videoyu seçin, oynatıcıda başlamasını istediğiniz ana gelip Başlangıç'taki 'Şu an' düğmesine, bitmesini istediğiniz ana gelip Bitiş'teki 'Şu an' düğmesine basın. Ardından 'Kes ve indir' deyin.",
      },
      {
        question: "Kesilen video neden birkaç kare erken başlıyor?",
        answer:
          "Hızlı kesimde görüntü yeniden kodlanmaz; video yalnızca anahtar karelerden başlatılabildiği için kesim en yakın önceki anahtar kareye genişletilir. Tam karesinde kesmek için 'Kare hassasiyetinde kes' seçeneğini işaretleyin; video yeniden kodlanır ve biraz daha uzun sürer.",
      },
      TARAYICI,
      GIZLILIK,
    ],
    bolumler: [
      {
        id: "ilgili",
        baslik: "Kestikten sonra",
        icerik: (
          <p>
            Kesilen bölümü GIF yapmak için{" "}
            <Link href="/video-gif-cevirme">Video GIF Çevirme</Link>, yalnızca
            sesini almak için{" "}
            <Link href="/mp4-mp3-cevirme">MP4 MP3 Çevirme</Link> veya{" "}
            <Link href="/ses-kesme">Ses Kesme</Link> araçlarını kullanın.
          </p>
        ),
      },
    ],
  },
  "video-dondurme": {
    yol: "/video-dondurme",
    baslik: "Video Döndürme",
    seoBaslik: "Video Döndürme: Yan veya Ters Videoyu Düzelt (Ücretsiz)",
    aciklama:
      "Yan veya ters çekilmiş videoyu 90°, 180° döndürün ya da aynalayın; önizlemede görün, kalite kaybı olmadan kaydedin. Video sunucuya yüklenmez.",
    giris:
      "Telefonla yan veya baş aşağı çekilmiş videoları düzeltin. Döndürme yönünü seçin, önizlemede kontrol edin ve kaydedin.",
    arac: islem("dondur"),
    sss: [
      {
        question: "Döndürünce kalite düşer mi?",
        answer:
          "Varsayılan olarak hayır: video yeniden kodlanmaz, dosyaya döndürme bilgisi yazılır ve tüm modern oynatıcılar videoyu doğru yönde gösterir. Bu bilgiyi dikkate almayan eski bir program kullanıyorsanız 'Görüntüye kalıcı işle' seçeneğini işaretleyin.",
      },
      {
        question: "Ön kamera videosundaki ters yazıyı düzeltebilir miyim?",
        answer:
          "Evet. 'Yatay aynala' seçeneği görüntüyü soldan sağa çevirir; ayna görüntüsündeki yazılar düzelir.",
      },
      TARAYICI,
      GIZLILIK,
    ],
    bolumler: [
      {
        id: "neden",
        baslik: "Videolar neden yan çıkar?",
        icerik: (
          <p>
            Telefonlar videoyu sensörün yönünde kaydeder ve dosyaya bir döndürme
            bilgisi ekler. Kayda başlarken telefon düz tutulmuşsa veya yön
            kilidi açıksa bu bilgi yanlış olabilir; bazı programlar ise bilgiyi
            hiç okumaz. Döndürme aracı bu bilgiyi düzeltir ya da görüntüye
            kalıcı olarak işler.
          </p>
        ),
      },
    ],
  },
  "videodan-sesi-kaldirma": {
    yol: "/videodan-sesi-kaldirma",
    baslik: "Videodan Sesi Kaldırma",
    seoBaslik: "Videodan Sesi Kaldırma: Videoyu Sessize Al (Ücretsiz)",
    aciklama:
      "Videodaki sesi tamamen silin; görüntü yeniden kodlanmadan saniyeler içinde sessiz MP4 elde edin. Rüzgâr ve ortam gürültüsü için ideal; video yüklenmez.",
    giris:
      "Videonun ses parçasını tamamen kaldırın. Görüntü kalitesi değişmez, işlem saniyeler sürer ve dosya bir miktar küçülür.",
    arac: islem("sessiz"),
    sss: [
      {
        question: "Sesi kaldırınca görüntü kalitesi değişir mi?",
        answer:
          "Hayır. Görüntü verisi yeniden kodlanmadan kopyalanır; yalnızca ses parçası çıkarılır.",
      },
      {
        question: "Sesi silmek yerine başka bir müzik ekleyebilir miyim?",
        answer:
          "Bu araç yalnızca sesi kaldırır. Sessiz videoya müzik eklemek için video düzenleme uygulaması kullanabilirsiniz; müziği kesmek için Ses Kesme aracımız işinize yarar.",
      },
      TARAYICI,
      GIZLILIK,
    ],
    bolumler: [
      {
        id: "kullanim",
        baslik: "Ne zaman işe yarar?",
        icerik: (
          <ul>
            <li>Rüzgâr, trafik veya kalabalık gürültüsünü tamamen atmak</li>
            <li>
              Arka planda konuşma veya kişisel bilgi geçen videoları paylaşmak
            </li>
            <li>
              Sunum ve web sitesi için sessiz arka plan videosu hazırlamak
            </li>
          </ul>
        ),
      },
    ],
  },
  "video-gif-cevirme": {
    yol: "/video-gif-cevirme",
    baslik: "Video GIF Çevirme",
    seoBaslik: "Video GIF Çevirme: MP4'ten GIF Yap (Ücretsiz, Yüklemeden)",
    aciklama:
      "MP4, MOV veya WebM videonun istediğiniz bölümünü GIF'e çevirin; kare hızı ve genişlik seçin, tahmini boyutu görün. Video sunucuya yüklenmez.",
    giris:
      "Videonuzdan kısa bir bölüm seçip hareketli GIF yapın. Başlangıcı oynatıcıdan seçin, süreyi, kare hızını ve genişliği belirleyin.",
    arac: <VideoGif mod="video-gif" />,
    sss: [
      {
        question: "GIF neden bu kadar büyük?",
        answer:
          "GIF her kareyi en fazla 256 renkle ve verimsiz bir sıkıştırmayla saklar; aynı animasyon MP4 olarak genellikle 5–10 kat küçüktür. GIF'i küçültmek için süreyi kısaltın, genişliği 320–480 piksele ve kare hızını 8–10 fps'ye indirin.",
      },
      {
        question: "Ne kadar uzun GIF yapılabilir?",
        answer:
          "En fazla 20 saniye seçilebilir. Daha uzun animasyonlar için MP4 kullanmak hem daha küçük hem daha kaliteli sonuç verir.",
      },
      TARAYICI,
      GIZLILIK,
    ],
    bolumler: [
      {
        id: "ayarlar",
        baslik: "Önerilen ayarlar",
        icerik: (
          <ul>
            <li>Tepki ve mesajlaşma GIF&apos;i: 320 px, 10 fps, 2–4 saniye</li>
            <li>Ürün veya ekran kaydı gösterimi: 480–640 px, 12–15 fps</li>
            <li>
              Sunum ve e-posta: 480 px, 8–10 fps; boyutu kontrol etmek için
              tahmini boyuta bakın
            </li>
          </ul>
        ),
      },
    ],
  },
  "gif-mp4-cevirme": {
    yol: "/gif-mp4-cevirme",
    baslik: "GIF MP4 Çevirme",
    seoBaslik: "GIF MP4 Çevirme: GIF'i Videoya Dönüştür (Ücretsiz)",
    aciklama:
      "Hareketli GIF'leri çok daha küçük MP4 videoya çevirin; Instagram, WhatsApp ve sunumlar için. Tekrar sayısı seçimi; dosya sunucuya yüklenmez.",
    giris:
      "Hareketli GIF'inizi MP4 videoya çevirin. MP4 aynı animasyonu çok daha küçük boyutta saklar ve GIF kabul etmeyen yerlere yüklenebilir.",
    arac: <VideoGif mod="gif-video" />,
    sss: [
      {
        question: "GIF'i neden MP4'e çevirmeliyim?",
        answer:
          "Instagram gibi bazı platformlar GIF yüklemeye izin vermez; MP4 ise her yerde kabul edilir. Ayrıca MP4 dosyası aynı animasyonu genellikle GIF'in onda biri boyutunda saklar ve web sayfalarını hızlandırır.",
      },
      {
        question: "MP4 GIF gibi sürekli döner mi?",
        answer:
          "MP4 dosyası kendi başına döngü bilgisi taşımaz; oynatıcı ayarlıysa döner. Mesajlaşma uygulamaları kısa videoları çoğu zaman otomatik döngüye alır. Birkaç kez tekrar etmesini istiyorsanız 'Tekrar sayısı' seçeneğiyle animasyonu videoya art arda ekleyebilirsiniz.",
      },
      TARAYICI,
      GIZLILIK,
    ],
    bolumler: [
      {
        id: "saydamlik",
        baslik: "Saydam GIF'ler",
        icerik: (
          <p>
            MP4 saydamlığı desteklemez; saydam alanlar beyaz olur. Saydamlığı
            korumak gerekiyorsa GIF&apos;i olduğu gibi kullanın ya da tek kare
            için <Link href="/gorsel-donusturucu">PNG&apos;ye</Link> çevirin.
          </p>
        ),
      },
    ],
  },
};

export const videoMeta = (anahtar: string) => {
  const s = VIDEO_SAYFALARI[anahtar];
  return takvimMetadata(s.yol, {
    title: s.seoBaslik,
    short: s.baslik,
    description: s.aciklama,
  });
};

export function VideoSayfasi({ anahtar }: { anahtar: string }) {
  const s = VIDEO_SAYFALARI[anahtar];
  return (
    <AracSayfasi
      yol={s.yol}
      baslik={s.baslik}
      giris={s.giris}
      arac={s.arac}
      sss={s.sss}
      bolumler={s.bolumler}
      baglantilar={BAGLANTILAR}
    />
  );
}
