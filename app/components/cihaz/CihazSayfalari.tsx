import Link from "@/app/components/SiteLink";
import type { ReactNode } from "react";
import { AG_ARACLARI_YOLU } from "../../converter/ag/agAraclari";
import type { FaqItem } from "../../converter/faqSchema";
import AracSayfasi from "../gorsel/AracSayfasi";
import { takvimMetadata } from "../takvim/takvimMeta";
import EkranKaydi from "./EkranKaydi";
import FareTesti from "./FareTesti";
import HoparlorTesti from "./HoparlorTesti";
import KameraTesti from "./KameraTesti";
import KlavyeTesti from "./KlavyeTesti";
import MikrofonTesti from "./MikrofonTesti";
import OluPikselTesti from "./OluPikselTesti";

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
  { href: AG_ARACLARI_YOLU, label: "Tüm Ağ ve Cihaz Araçları" },
  { href: "/mikrofon-testi", label: "Mikrofon Testi" },
  { href: "/kamera-testi", label: "Kamera Testi" },
  { href: "/hoparlor-testi", label: "Hoparlör Testi" },
  { href: "/klavye-testi", label: "Klavye Testi" },
  { href: "/fare-testi", label: "Fare Testi" },
  { href: "/olu-piksel-testi", label: "Ölü Piksel Testi" },
  { href: "/ekran-kaydi", label: "Ekran Kaydı Alma" },
  { href: "/tarayici-bilgisi", label: "Tarayıcı ve Cihaz Bilgim" },
];

const KAYIT_YOK: FaqItem = {
  question: "Görüntü veya ses bir yere gönderiliyor mu?",
  answer:
    "Hayır. Test tamamen tarayıcınızda, cihazınızda yapılır; görüntü, ses ve kayıtlar hiçbir sunucuya gönderilmez ve sayfayı kapattığınızda silinir.",
};

export const CIHAZ_SAYFALARI: Record<string, Sayfa> = {
  "mikrofon-testi": {
    yol: "/mikrofon-testi",
    baslik: "Mikrofon Testi",
    seoBaslik:
      "Mikrofon Testi: Mikrofonum Çalışıyor mu? (Online, Kayıt ve Dinleme)",
    aciklama:
      "Mikrofonunuzu çevrim içi test edin: canlı ses seviyesi, dalga görünümü, 5 saniyelik kayıt ve dinleme. Kulaklık, USB ve dizüstü mikrofonları. Kurulum yok.",
    giris:
      "Toplantıdan veya oyundan önce mikrofonunuzun çalışıp çalışmadığını ve sesinizin nasıl duyulduğunu kontrol edin.",
    arac: <MikrofonTesti />,
    sss: [
      {
        question: "Mikrofonum algılanmıyor, ne yapmalıyım?",
        answer:
          "Önce tarayıcının adres çubuğundaki kilit simgesinden mikrofon iznini kontrol edin. Windows'ta Ayarlar → Gizlilik ve güvenlik → Mikrofon bölümünde masaüstü uygulamalarının erişimine izin verin; Ayarlar → Sistem → Ses → Giriş'te doğru mikrofonun seçili olduğuna bakın. macOS'ta Sistem Ayarları → Gizlilik ve Güvenlik → Mikrofon'da tarayıcınıza izin verin.",
      },
      {
        question: "Mikrofon çalışıyor ama sesim çok kısık, neden?",
        answer:
          "Sistemin giriş düzeyi düşük olabilir. Windows'ta Ayarlar → Sistem → Ses → mikrofonunuzun özellikleri → Giriş düzeyi'ni artırın. Kulaklık mikrofonlarında mikrofonun ağzınıza yakın ve doğru yönde durduğundan emin olun.",
      },
      {
        question: "Çubuk hareket ediyor ama karşı taraf beni duymuyor?",
        answer:
          "Mikrofon çalışıyor demektir; sorun kullandığınız programın ayarındadır. Zoom, Teams, Discord gibi programların ses ayarlarında giriş cihazı olarak bu mikrofonu seçin ve programın sessize alınmadığından emin olun.",
      },
      KAYIT_YOK,
    ],
    bolumler: [
      {
        id: "nasil",
        baslik: "Mikrofon testi nasıl yapılır?",
        icerik: (
          <ol>
            <li>
              &quot;Mikrofonu test et&quot;e basın ve tarayıcının izin isteğini
              onaylayın.
            </li>
            <li>
              Konuşun: ses çubuğu ve dalga hareket ediyorsa mikrofon
              çalışıyordur.
            </li>
            <li>
              &quot;5 saniye kaydet ve dinle&quot; ile sesinizin netliğini,
              cızırtı ve yankıyı kontrol edin.
            </li>
          </ol>
        ),
      },
      {
        id: "ilgili",
        baslik: "Diğer testler",
        icerik: (
          <p>
            Görüntülü görüşme öncesi{" "}
            <Link href="/kamera-testi">Kamera Testi</Link> ve{" "}
            <Link href="/hoparlor-testi">Hoparlör Testi</Link> ile hazırlığınızı
            tamamlayın.
          </p>
        ),
      },
    ],
  },
  "kamera-testi": {
    yol: "/kamera-testi",
    baslik: "Kamera Testi",
    seoBaslik: "Kamera Testi: Web Kameramı Test Et (Çözünürlük, FPS, Fotoğraf)",
    aciklama:
      "Web kameranızı çevrim içi test edin: canlı görüntü, çözünürlük, kare hızı (fps) ve fotoğraf çekme. Dizüstü ve USB kameralar; görüntü hiçbir yere gönderilmez.",
    giris:
      "Görüntülü görüşmeden önce kameranızın çalıştığını, görüntü kalitesini ve kare hızını kontrol edin.",
    arac: <KameraTesti />,
    sss: [
      {
        question: "Kamera siyah ekran veriyor, ne yapmalıyım?",
        answer:
          "Kameranın üzerinde fiziksel kapak veya klavyede kamera kapatma tuşu olup olmadığını kontrol edin. Kamerayı kullanan başka bir program (Zoom, Teams, Skype) açıksa kapatın. Windows'ta Ayarlar → Gizlilik ve güvenlik → Kamera bölümünde erişime izin verin.",
      },
      {
        question: "Görüntü neden ters (ayna gibi)?",
        answer:
          "Çoğu görüntülü görüşme programı kendi görüntünüzü ayna gibi gösterir; karşı taraf sizi düz görür. Bu sayfada 'Ayna görüntüsü' kutusuyla iki görünüm arasında geçiş yapabilirsiniz.",
      },
      {
        question: "Kare hızı (fps) neden düşük?",
        answer:
          "Loş ortamda kameralar pozlamayı uzatır ve kare hızı düşer. Ortamı aydınlatmak genellikle görüntüyü hem daha net hem daha akıcı yapar. USB 2.0 bağlantı da yüksek çözünürlükte kare hızını sınırlayabilir.",
      },
      KAYIT_YOK,
    ],
    bolumler: [
      {
        id: "degerler",
        baslik: "Değerler ne anlama gelir?",
        icerik: (
          <ul>
            <li>
              <b>Çözünürlük:</b> 1280 × 720 (HD) görüntülü görüşme için
              yeterlidir; 1920 × 1080 (Full HD) daha nettir.
            </li>
            <li>
              <b>Kare hızı:</b> 30 fps akıcı görüntü demektir; 15 fps ve altı
              takılmalı görünür.
            </li>
          </ul>
        ),
      },
      {
        id: "ilgili",
        baslik: "Diğer testler",
        icerik: (
          <p>
            Sesiniz için <Link href="/mikrofon-testi">Mikrofon Testi</Link>,
            çekilen fotoğrafı küçültmek için{" "}
            <Link href="/fotograf-boyutu-kucultme">
              Fotoğraf Boyutu Küçültme
            </Link>
            .
          </p>
        ),
      },
    ],
  },
  "hoparlor-testi": {
    yol: "/hoparlor-testi",
    baslik: "Hoparlör Testi (Sol Sağ)",
    seoBaslik:
      "Hoparlör Testi: Sol Sağ Ses Testi, Stereo ve Frekans (Kulaklık)",
    aciklama:
      "Hoparlör ve kulaklığınızı test edin: sol ve sağ kanal, stereo, 50 Hz'den 15 kHz'e frekans tonları ve 20 Hz–20 kHz tarama. Kulaklığın sol-sağ yönünü bulun.",
    giris:
      "Kulaklığınızın sol ve sağ tarafının doğru çalıştığını, hoparlörlerin bas ve tiz seslerini kontrol edin.",
    arac: <HoparlorTesti />,
    sss: [
      {
        question: "Sol düğmeye basınca ses sağdan geliyor, neden?",
        answer:
          "Kulaklık ters takılmış veya hoparlör kabloları yer değiştirmiş olabilir. Kulaklıklarda sol tarafta 'L', sağ tarafta 'R' işareti bulunur. Ses her iki taraftan eşit geliyorsa sistemde 'Mono ses' ayarı açık olabilir (Windows: Ayarlar → Erişilebilirlik → Ses).",
      },
      {
        question: "Tek taraftan hiç ses gelmiyor?",
        answer:
          "Başka bir cihazla aynı kulaklığı deneyin: yine tek taraf çalışmıyorsa sorun kulaklıktadır (çoğunlukla kablo veya soket). Diğer cihazda çalışıyorsa bilgisayarın ses dengesi (balans) ayarını kontrol edin.",
      },
      {
        question: "Yüksek frekans tonlarını duyamıyorum, normal mi?",
        answer:
          "Evet. İnsan kulağı yaşla birlikte yüksek frekansları daha az duyar; birçok yetişkin 15 kHz üstünü duymaz. Ayrıca küçük hoparlörler 100 Hz altındaki basları zayıf verir.",
      },
    ],
    bolumler: [
      {
        id: "nasil",
        baslik: "Nasıl test edilir?",
        icerik: (
          <ol>
            <li>
              Sesi kısın, ardından &quot;◀ Sol&quot; ve &quot;Sağ ▶&quot;
              düğmelerine sırayla basın.
            </li>
            <li>Her seste yalnızca ilgili taraftan bip duymalısınız.</li>
            <li>
              Frekans düğmeleriyle bas (50–100 Hz) ve tiz (10–15 kHz) tepkisini
              dinleyin.
            </li>
          </ol>
        ),
      },
      {
        id: "ilgili",
        baslik: "Diğer testler",
        icerik: (
          <p>
            <Link href="/mikrofon-testi">Mikrofon Testi</Link> ve{" "}
            <Link href="/kamera-testi">Kamera Testi</Link>.
          </p>
        ),
      },
    ],
  },
  "klavye-testi": {
    yol: "/klavye-testi",
    baslik: "Klavye Testi",
    seoBaslik: "Klavye Testi: Tuşlar Çalışıyor mu? (Online, Türkçe Q Klavye)",
    aciklama:
      "Klavyenizi çevrim içi test edin: bastığınız tuş Türkçe Q klavye görselinde yanar, denenen tuşlar işaretli kalır; takılan ve çalışmayan tuşları bulun.",
    giris:
      "Yeni veya ikinci el klavyeyi, dizüstü klavyesini ya da sıvı döküldükten sonra tuşları tek tek kontrol edin.",
    arac: <KlavyeTesti />,
    sss: [
      {
        question: "Bazı tuşlar görselde yanmıyor, klavye bozuk mu?",
        answer:
          "Bastığınız hâlde hiç yanmayan tuş büyük olasılıkla arızalıdır. Ancak Fn, bazı medya tuşları ve üreticiye özel tuşlar tarayıcıya iletilmez; bunlar hiçbir sitede görünmez. Windows tuşu ve Alt+Tab gibi kısayolları da işletim sistemi yakalayabilir.",
      },
      {
        question: "Aynı anda birkaç tuşa basınca bazıları algılanmıyor?",
        answer:
          "Buna 'ghosting' denir. Birçok standart klavye aynı anda yalnızca belirli sayıda tuşu algılayabilir. Oyun klavyelerindeki 'anti-ghosting' veya 'N-key rollover' özelliği bu sınırı kaldırır.",
      },
      {
        question: "Bir tuş basılı kalıyor gibi görünüyor?",
        answer:
          "Bir tuş 4 saniyeden uzun basılı algılanırsa üstte uyarı çıkar. Parmağınızı çektiğiniz hâlde uyarı sürüyorsa tuşun altında kir veya sıvı kalıntısı olabilir.",
      },
    ],
    bolumler: [
      {
        id: "nasil",
        baslik: "Klavye testi nasıl yapılır?",
        icerik: (
          <ol>
            <li>Sayfaya bir kez tıklayın, sonra tuşlara sırayla basın.</li>
            <li>
              Basılı tuş yeşil yanar; bıraktığınızda gri kalır (çalışıyor).
            </li>
            <li>
              Tüm tuşları denedikten sonra gri olmayan tuşlar sorunlu olabilir.
            </li>
          </ol>
        ),
      },
      {
        id: "ilgili",
        baslik: "Diğer testler",
        icerik: (
          <p>
            <Link href="/fare-testi">Fare Testi</Link> ve{" "}
            <Link href="/olu-piksel-testi">Ölü Piksel Testi</Link>.
          </p>
        ),
      },
    ],
  },
  "fare-testi": {
    yol: "/fare-testi",
    baslik: "Fare Testi (Çift Tıklama)",
    seoBaslik:
      "Fare Testi: Çift Tıklama Sorunu, Tuş ve Tekerlek Testi (Online)",
    aciklama:
      "Farenizin sol, sağ, orta ve yan tuşlarını, tekerleğini test edin; tek tıklamada iki tık gönderen arızalı fareyi (çift tıklama sorunu) yakalayın.",
    giris:
      "Fareniz bazen kendiliğinden çift tıklıyor veya sürükleme bırakılıyorsa sorunu burada ölçün.",
    arac: <FareTesti />,
    sss: [
      {
        question: "Fare kendiliğinden çift tıklıyor, neden?",
        answer:
          "Genellikle sol tuşun altındaki mikro anahtar (switch) zamanla aşınır ve tek basışta iki temas oluşturur. Testte yavaşça tek tek tıkladığınızda 'Şüpheli çift tıklama' sayısı artıyorsa sorun fareden kaynaklanıyordur; garanti kapsamında değiştirilebilir.",
      },
      {
        question: "Çift tıklama hızı ayarı sorunu çözer mi?",
        answer:
          "Windows'taki çift tıklama hızı ayarı yalnızca iki tıklamanın ne kadar arayla çift sayılacağını değiştirir; arızalı anahtarın gönderdiği fazladan tıklamayı engellemez.",
      },
      {
        question: "Yan tuşlar (geri/ileri) algılanmıyor?",
        answer:
          "Bazı farelerde yan tuşlar üreticinin yazılımıyla başka işlevlere atanmıştır ve tarayıcıya geri/ileri olarak iletilmez. Üretici yazılımında varsayılan ayara dönmeyi deneyin.",
      },
    ],
    bolumler: [
      {
        id: "nasil",
        baslik: "Çift tıklama sorunu nasıl anlaşılır?",
        icerik: (
          <p>
            Test alanında sol tuşa yavaş ve tek tek, 20–30 kez tıklayın. İki tık
            arasındaki en kısa süre 80 milisaniyenin altındaysa ve &quot;Şüpheli
            çift tıklama&quot; sayacı artıyorsa fare tek basışta iki sinyal
            gönderiyordur.
          </p>
        ),
      },
      {
        id: "ilgili",
        baslik: "Diğer testler",
        icerik: (
          <p>
            <Link href="/klavye-testi">Klavye Testi</Link> ve{" "}
            <Link href="/tarayici-bilgisi">Tarayıcı ve Cihaz Bilgim</Link>.
          </p>
        ),
      },
    ],
  },
  "olu-piksel-testi": {
    yol: "/olu-piksel-testi",
    baslik: "Ölü Piksel Testi",
    seoBaslik: "Ölü Piksel Testi: Ekran Testi (Takılı Piksel, Işık Sızması)",
    aciklama:
      "Monitör, dizüstü, telefon ve televizyon ekranında ölü ve takılı pikselleri tam ekran düz renklerle bulun; siyah ekranda ışık sızmasını kontrol edin.",
    giris:
      "Yeni aldığınız veya ikinci el ekranı iade süresi dolmadan kontrol edin: ölü piksel, takılı piksel ve ışık sızması.",
    arac: <OluPikselTesti />,
    sss: [
      {
        question: "Ölü piksel ile takılı piksel arasındaki fark nedir?",
        answer:
          "Ölü piksel hiç ışık vermez ve her renkte siyah görünür; en iyi beyaz ekranda fark edilir. Takılı piksel ise hep aynı renkte (kırmızı, yeşil, mavi veya beyaz) yanar; en iyi siyah ekranda görülür. Takılı pikseller bazen kendiliğinden düzelebilir, ölü pikseller genellikle düzelmez.",
      },
      {
        question: "Ölü piksel garanti kapsamında mı?",
        answer:
          "Üreticiler piksel hataları için farklı politikalar uygular; bazıları belirli sayının altındaki hataları kusur saymaz. Satın aldıktan hemen sonra test edip bulduğunuz noktanın fotoğrafını çekin ve satıcının iade/değişim koşullarına bakın.",
      },
      {
        question: "Işık sızması (backlight bleed) nedir?",
        answer:
          "Siyah ekranda, özellikle köşelerde ve kenarlarda görülen parlak lekelerdir. LCD ekranlarda bir miktar sızma normal kabul edilebilir; testi karanlık odada ve orta parlaklıkta yapın.",
      },
    ],
    bolumler: [
      {
        id: "nasil",
        baslik: "Nasıl test edilir?",
        icerik: (
          <ol>
            <li>
              Ekranı yumuşak bir bezle silin; tozlar ölü piksel gibi
              görünebilir.
            </li>
            <li>&quot;Tam ekran testi başlat&quot;a basın.</li>
            <li>
              Her renkte ekranı yakından tarayın; tıklayarak veya → tuşuyla
              sonraki renge geçin.
            </li>
          </ol>
        ),
      },
      {
        id: "ilgili",
        baslik: "İlgili araçlar",
        icerik: (
          <p>
            Ekran çözünürlüğünüzü görmek için{" "}
            <Link href="/tarayici-bilgisi">Tarayıcı ve Cihaz Bilgim</Link>,
            ekran boyutu hesabı için{" "}
            <Link href="/piksel-cm-dpi-hesaplama">
              Piksel, CM ve DPI Hesaplama
            </Link>
            .
          </p>
        ),
      },
    ],
  },
  "ekran-kaydi": {
    yol: "/ekran-kaydi",
    baslik: "Ekran Kaydı Alma",
    seoBaslik:
      "Ekran Kaydı Alma: Programsız, Sesli ve Ücretsiz (Online Kaydedici)",
    aciklama:
      "Program kurmadan tarayıcıdan ekran kaydı alın: tüm ekran, pencere veya sekme; sistem sesi ve mikrofonla. Süre sınırı ve filigran yok, kayıt yüklenmez.",
    giris:
      "Ders anlatımı, hata bildirimi veya sunum için ekranınızı kaydedin; kayıt bilgisayarınızda oluşur ve doğrudan iner.",
    arac: <EkranKaydi />,
    sss: [
      {
        question: "Ekran kaydına ses de alınır mı?",
        answer:
          "Evet. Paylaşım penceresinde 'Sesi de paylaş' kutusunu işaretlerseniz sekme veya sistem sesi kaydedilir (Chrome ve Edge'de; sistem sesi desteği işletim sistemine göre değişir). Anlatım için 'Mikrofonu da kaydet' seçeneğini açın; iki ses birleştirilir.",
      },
      {
        question: "Kayıt hangi biçimde iner?",
        answer:
          "Tarayıcınız destekliyorsa MP4, desteklemiyorsa WebM olarak iner. WebM dosyaları Chrome, Firefox ve VLC'de açılır; MP4 gerekiyorsa Video Sıkıştırma aracıyla dönüştürebilirsiniz.",
      },
      {
        question: "Telefonda ekran kaydı alabilir miyim?",
        answer:
          "Telefon tarayıcıları ekran paylaşımına izin vermez. iPhone'da Denetim Merkezi'ndeki, Android'de hızlı ayarlardaki 'Ekran kaydı' özelliğini kullanın.",
      },
      {
        question: "Süre sınırı veya filigran var mı?",
        answer:
          "Hayır. Kayıt süresi yalnızca bilgisayarınızın belleğiyle sınırlıdır; videoya filigran eklenmez. Uzun kayıtlarda dosya büyüyeceği için 30 dakikanın üzerindeki kayıtları parçalara bölmek daha güvenlidir.",
      },
      {
        question: "Kayıt bir yere yükleniyor mu?",
        answer:
          "Hayır. Video tarayıcınızda oluşturulur ve doğrudan bilgisayarınıza iner. Başka kişilerin görüntü veya sesini kaydederken izin almayı unutmayın.",
      },
    ],
    bolumler: [
      {
        id: "nasil",
        baslik: "Ekran kaydı nasıl alınır?",
        icerik: (
          <ol>
            <li>İsterseniz &quot;Mikrofonu da kaydet&quot;i işaretleyin.</li>
            <li>
              &quot;Kaydı başlat&quot;a basın; tüm ekranı, bir pencereyi veya
              sekmeyi seçin.
            </li>
            <li>
              İşiniz bitince &quot;Kaydı bitir&quot;e basın, önizleyip indirin.
            </li>
          </ol>
        ),
      },
      {
        id: "sonra",
        baslik: "Kayıttan sonra",
        icerik: (
          <p>
            Videoyu kısaltmak için <Link href="/video-kesme">Video Kesme</Link>,
            küçültmek için{" "}
            <Link href="/video-sikistirma">Video Sıkıştırma</Link>, GIF yapmak
            için <Link href="/video-gif-cevirme">Videodan GIF</Link>.
          </p>
        ),
      },
    ],
  },
};

export const cihazMeta = (anahtar: string) => {
  const s = CIHAZ_SAYFALARI[anahtar];
  return takvimMetadata(s.yol, {
    title: s.seoBaslik,
    short: s.baslik,
    description: s.aciklama,
  });
};

export function CihazSayfasi({ anahtar }: { anahtar: string }) {
  const s = CIHAZ_SAYFALARI[anahtar];
  return (
    <AracSayfasi
      koleksiyon="ag"
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
