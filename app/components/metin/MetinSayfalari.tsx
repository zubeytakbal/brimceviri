import Link from "@/app/components/SiteLink";
import type { ReactNode } from "react";
import type { FaqItem } from "../../converter/faqSchema";
import { DOSYA_ARACLARI_YOLU } from "../../converter/gorsel/dosyaAraclari";
import AracSayfasi from "../gorsel/AracSayfasi";
import { takvimMetadata } from "../takvim/takvimMeta";
import MetinKarsilastir from "./MetinKarsilastir";
import QrOku from "./QrOku";
import QrOlustur from "./QrOlustur";
import SifreOlustur from "./SifreOlustur";

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
  { href: "/qr-kod-olusturucu", label: "QR Kod Oluşturucu" },
  { href: "/qr-kod-okuyucu", label: "QR Kod Okuyucu" },
  { href: "/sifre-olusturucu", label: "Şifre Oluşturucu" },
  { href: "/metin-karsilastirma", label: "Metin Karşılaştırma" },
  { href: "/resimden-yaziya-cevirme", label: "Resimden Yazıya Çevirme" },
  { href: "/json-duzenleyici", label: "JSON Düzenleyici" },
];

export const METIN_SAYFALARI: Record<string, Sayfa> = {
  "qr-kod-olusturucu": {
    yol: "/qr-kod-olusturucu",
    baslik: "QR Kod Oluşturucu",
    seoBaslik:
      "QR Kod Oluşturucu: Ücretsiz, Süresiz, Logolu (Wi-Fi, WhatsApp, Kartvizit)",
    aciklama:
      "Bağlantı, Wi-Fi, kartvizit, WhatsApp, e-posta ve konum için ücretsiz QR kod oluşturun; renk ve logo ekleyin, PNG veya SVG indirin. Süresiz, takipsiz, kayıtsız.",
    giris:
      "Web siteniz, menünüz, Wi-Fi ağınız veya kartvizitiniz için QR kod hazırlayın. Oluşan QR kod doğrudan içeriği taşır; süresi dolmaz, bir hizmete bağlı değildir.",
    arac: <QrOlustur />,
    sss: [
      {
        question: "Oluşturduğum QR kodun süresi dolar mı?",
        answer:
          "Hayır. Bu araç 'statik' QR kod üretir: bağlantı veya bilgi doğrudan kodun içindedir, arada yönlendirme sunucusu yoktur. Bazı sitelerin 'dinamik' QR kodları ise abonelik bitince çalışmayı durdurabilir.",
      },
      {
        question: "Wi-Fi QR kodu nasıl çalışır?",
        answer:
          "Ağ adını ve şifreyi girip QR'ı yazdırın. Misafirleriniz telefon kamerasıyla okuttuğunda şifreyi yazmadan ağa bağlanır. iPhone ve Android'in güncel sürümleri bunu kamera uygulamasında destekler.",
      },
      {
        question: "QR koda logo eklersem okunur mu?",
        answer:
          "Evet. Logo eklendiğinde hata düzeltme otomatik olarak en yüksek düzeye (%30) çıkar ve logo QR alanının küçük bir kısmını kaplar. Yazdırmadan önce birkaç telefonla okutarak deneyin.",
      },
      {
        question: "Baskı için hangi boyut ve biçimi seçmeliyim?",
        answer:
          "Matbaa ve büyük baskılar için SVG indirin; kalite kaybı olmadan her boyuta büyütülür. Dijital kullanım için 1024 px PNG yeterlidir. Basılı QR'ın kenarı en az 2–3 cm olmalı ve çevresinde boş alan bırakılmalıdır.",
      },
      {
        question: "Bilgilerim kaydediliyor mu?",
        answer:
          "Hayır. QR kod tarayıcınızda oluşturulur; Wi-Fi şifresi dahil hiçbir bilgi sunucuya gönderilmez.",
      },
    ],
    bolumler: [
      {
        id: "turler",
        baslik: "Hangi QR türü ne işe yarar?",
        icerik: (
          <ul>
            <li>
              <b>Bağlantı:</b> Menü, web sitesi, anket, Google yorum sayfası.
            </li>
            <li>
              <b>Wi-Fi:</b> Kafe, ofis ve ev misafirleri için şifresiz bağlanma.
            </li>
            <li>
              <b>Kartvizit (vCard):</b> Okutulunca ad, telefon ve e-posta
              rehbere eklenir.
            </li>
            <li>
              <b>WhatsApp:</b> Okutan kişi hazır mesajla size WhatsApp&apos;tan
              yazar.
            </li>
            <li>
              <b>E-posta, telefon, SMS, konum:</b> Tek dokunuşla arama, mesaj
              veya harita.
            </li>
          </ul>
        ),
      },
      {
        id: "ipuclari",
        baslik: "Okunabilir QR için ipuçları",
        icerik: (
          <ul>
            <li>
              Koyu renkli kod, açık renkli zemin kullanın; tersini bazı
              telefonlar okuyamaz.
            </li>
            <li>
              Kodun çevresinde en az dört kare genişliğinde boşluk bırakın (araç
              otomatik ekler).
            </li>
            <li>
              Uzun bağlantılar kodu sıklaştırır; mümkünse kısa adres kullanın.
            </li>
          </ul>
        ),
      },
    ],
  },
  "qr-kod-okuyucu": {
    yol: "/qr-kod-okuyucu",
    baslik: "QR Kod Okuyucu",
    seoBaslik: "QR Kod Okuyucu: Görselden ve Kameradan QR Okuma (Online)",
    aciklama:
      "QR kodu fotoğraftan, ekran görüntüsünden (Ctrl+V) veya kameradan okuyun; Wi-Fi şifresini ve kartvizit bilgilerini görün, bağlantıyı açmadan kontrol edin. Uygulamasız.",
    giris:
      "Bilgisayarınızda veya telefonunuzda QR kodun içeriğini okuyun. Ekran görüntüsü, fotoğraf ya da kamera; bağlantılar açılmadan önce size gösterilir.",
    arac: <QrOku />,
    sss: [
      {
        question: "Bilgisayarda QR kod nasıl okunur?",
        answer:
          "QR kodun ekran görüntüsünü alın (Windows'ta Win + Shift + S) ve bu sayfada Ctrl + V ile yapıştırın; ya da görseli seçin. Dizüstü bilgisayarınızın kamerasıyla da okutabilirsiniz.",
      },
      {
        question: "Wi-Fi QR kodundaki şifreyi görebilir miyim?",
        answer:
          "Evet. Wi-Fi QR kodu okutulduğunda ağ adı, şifre ve güvenlik türü ayrı ayrı gösterilir; şifreyi kopyalayıp başka bir cihaza girebilirsiniz.",
      },
      {
        question: "QR kod güvenli mi, dolandırıcılık olabilir mi?",
        answer:
          "Sahte QR kodlar, özellikle otopark, fatura ve kargo bildirimlerinde, gerçeğine benzeyen ödeme veya giriş sayfalarına yönlendirebilir. Araç bağlantıyı açmadan önce alan adını gösterir; tanımadığınız adreslere kart veya şifre bilgisi girmeyin.",
      },
      {
        question: "Kamera görüntüsü kaydediliyor mu?",
        answer:
          "Hayır. Görüntü yalnızca tarayıcınızda işlenir, QR bulunduğu anda kamera kapanır; hiçbir şey sunucuya gönderilmez.",
      },
    ],
    bolumler: [
      {
        id: "ilgili",
        baslik: "İlgili araçlar",
        icerik: (
          <p>
            Kendi QR kodunuzu hazırlamak için{" "}
            <Link href="/qr-kod-olusturucu">QR Kod Oluşturucu</Link>, görseldeki
            yazıyı metne çevirmek için{" "}
            <Link href="/resimden-yaziya-cevirme">Resimden Yazıya Çevirme</Link>{" "}
            aracını kullanın.
          </p>
        ),
      },
    ],
  },
  "sifre-olusturucu": {
    yol: "/sifre-olusturucu",
    baslik: "Şifre Oluşturucu (Güçlü Parola)",
    seoBaslik: "Şifre Oluşturucu: Güçlü ve Rastgele Parola Üret (Güvenli)",
    aciklama:
      "Harf, rakam ve sembollerle 4–64 karakterlik güçlü, rastgele şifreler üretin; şifre gücünü ve tahmini kırma süresini görün. Şifreler cihazınızda üretilir, kaydedilmez.",
    giris:
      "Her hesabınız için tahmin edilemeyen, benzersiz bir şifre üretin. Uzunluğu ve karakter türlerini seçin; şifre gücü ve tahmini kırma süresi anında gösterilir.",
    arac: <SifreOlustur />,
    sss: [
      {
        question: "Güçlü bir şifre kaç karakter olmalı?",
        answer:
          "Rastgele üretilmiş bir şifre için en az 12, tercihen 16 karakter önerilir. Uzunluk, karmaşıklıktan daha etkilidir: her ek karakter kırma süresini katlarca uzatır.",
      },
      {
        question: "Bu şifreler gerçekten rastgele mi?",
        answer:
          "Evet. Tarayıcınızın şifreleme amaçlı rastgele sayı üreteci (Web Crypto, crypto.getRandomValues) kullanılır ve sapmasız seçim yapılır. Seçtiğiniz her türden en az bir karakter bulunur.",
      },
      {
        question: "Üretilen şifreleri görüyor musunuz?",
        answer:
          "Hayır. Şifreler cihazınızda üretilir; hiçbir sunucuya gönderilmez ve kaydedilmez. Sayfayı kapattığınızda kaybolur.",
      },
      {
        question: "Şifreleri nasıl hatırlayacağım?",
        answer:
          "Her hesap için farklı, rastgele şifre kullanıp bunları bir şifre yöneticisinde (tarayıcınızın veya telefonunuzun yerleşik yöneticisi gibi) saklamak en güvenli yoldur. Önemli hesaplarda iki adımlı doğrulamayı da açın.",
      },
    ],
    bolumler: [
      {
        id: "kirma",
        baslik: "Kırma süresi nasıl hesaplanır?",
        icerik: (
          <p>
            Şifrenin entropisi, uzunluk × log₂(karakter havuzu) formülüyle bit
            olarak hesaplanır. Tahmini süre, saniyede 10 milyar deneme yapabilen
            güçlü bir saldırganın olası şifrelerin yarısını denemesi için
            gereken süredir. Bu hesap yalnızca rastgele üretilmiş şifreler için
            geçerlidir; kelime ve doğum tarihi içeren şifreler çok daha hızlı
            kırılır.
          </p>
        ),
      },
    ],
  },
  "metin-karsilastirma": {
    yol: "/metin-karsilastirma",
    baslik: "Metin Karşılaştırma (Fark Bulma)",
    seoBaslik: "Metin Karşılaştırma: İki Metin Arasındaki Farkı Bul (Online)",
    aciklama:
      "İki metni yan yana karşılaştırın; eklenen, silinen ve değişen satırları ve kelimeleri renkli görün. Boşluk ve büyük/küçük harf yok sayma; metinler yüklenmez.",
    giris:
      "Sözleşmenin iki sürümü, ödevin eski ve yeni hâli ya da iki kod parçası arasındaki farkları bulun. Değişen kelimeler renkli olarak işaretlenir.",
    arac: <MetinKarsilastir />,
    sss: [
      {
        question: "İki metin nasıl karşılaştırılır?",
        answer:
          "Eski metni sol, yeni metni sağ kutuya yapıştırın. Sonuç anında görünür: silinen kısımlar kırmızı, eklenenler yeşil işaretlenir; değişen satırlarda farklı kelimeler ayrıca vurgulanır.",
      },
      {
        question: "Boşluk ve büyük harf farklarını yok sayabilir miyim?",
        answer:
          "Evet. 'Boşluk farklarını yok say' fazladan boşluk ve sekmeleri, 'Büyük/küçük harfi yok say' ise harf büyüklüğünü (Türkçe İ/ı kurallarıyla) dikkate almaz.",
      },
      {
        question: "Metinlerim kaydediliyor mu?",
        answer:
          "Hayır. Karşılaştırma tarayıcınızda yapılır; metinler hiçbir sunucuya gönderilmez.",
      },
    ],
    bolumler: [
      {
        id: "kullanim",
        baslik: "Nerelerde işe yarar?",
        icerik: (
          <ul>
            <li>
              Sözleşme ve dilekçe taslaklarında karşı tarafın yaptığı
              değişiklikleri bulmak
            </li>
            <li>Ödev, tez ve makale sürümlerini karşılaştırmak</li>
            <li>
              İki liste, yapılandırma dosyası veya kod parçası arasındaki farkı
              görmek
            </li>
          </ul>
        ),
      },
      {
        id: "ilgili",
        baslik: "İlgili araçlar",
        icerik: (
          <p>
            PDF&apos;lerdeki metni karşılaştırmak için önce{" "}
            <Link href="/pdf-metin-cikarma">PDF&apos;ten Metin Çıkarma</Link>{" "}
            aracıyla metni alın.
          </p>
        ),
      },
    ],
  },
};

export const metinMeta = (anahtar: string) => {
  const s = METIN_SAYFALARI[anahtar];
  return takvimMetadata(s.yol, {
    title: s.seoBaslik,
    short: s.baslik,
    description: s.aciklama,
  });
};

export function MetinSayfasi({ anahtar }: { anahtar: string }) {
  const s = METIN_SAYFALARI[anahtar];
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
