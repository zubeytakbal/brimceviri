import Link from "@/app/components/SiteLink";
import { DOSYA_ARACLARI_YOLU } from "../../converter/gorsel/dosyaAraclari";
import { takvimMetadata } from "../takvim/takvimMeta";
import AracSayfasi from "./AracSayfasi";
import FaviconOlustur from "./FaviconOlustur";
import ResimBase64 from "./ResimBase64";

const BAGLANTILAR = [
  { href: DOSYA_ARACLARI_YOLU, label: "Tüm Dosya Araçları" },
  { href: "/favicon-olusturucu", label: "Favicon Oluşturucu (PNG → ICO)" },
  { href: "/resim-base64-cevirme", label: "Resim Base64 Çevirme" },
  { href: "/svg-png-cevirme", label: "SVG PNG Çevirme" },
  { href: "/resim-boyutlandirma", label: "Resim Boyutlandırma" },
  { href: "/gorsel-donusturucu", label: "Görsel Dönüştürücü" },
  { href: "/grafik-tasarimci-araclari", label: "Grafik Tasarımcı Araçları" },
];

/* /favicon-olusturucu */
export const faviconMeta = () =>
  takvimMetadata("/favicon-olusturucu", {
    title: "Favicon Oluşturucu: PNG'den ICO ve Tüm Boyutlar (Ücretsiz)",
    short: "Favicon Oluşturucu",
    description:
      "Logonuzdan favicon.ico (16, 32, 48 px), Apple ve Android simgeleri ile site.webmanifest üretin; HTML kodunu kopyalayın. PNG, SVG, JPG kabul edilir; yüklemeden.",
  });

export function FaviconSayfasi() {
  return (
    <AracSayfasi
      yol="/favicon-olusturucu"
      baslik="Favicon Oluşturucu (PNG → ICO)"
      giris="Logonuzu veya bir görseli seçin; tarayıcı sekmesinde, yer imlerinde ve telefon ana ekranında görünen tüm simgeler tek tıkla hazırlansın. favicon.ico ve PNG simgelerini ZIP olarak indirin."
      arac={<FaviconOlustur />}
      baglantilar={BAGLANTILAR}
      sss={[
        {
          question: "Favicon nedir?",
          answer:
            "Favicon, tarayıcı sekmesinde site adının yanında, yer imlerinde ve arama sonuçlarında görünen küçük site simgesidir. Telefonda siteyi ana ekrana eklediğinizde de büyük sürümü (Apple için 180 px, Android için 192 ve 512 px) kullanılır.",
        },
        {
          question: "favicon.ico hangi boyutları içeriyor?",
          answer:
            "Oluşturulan favicon.ico içinde 16×16, 32×32 ve 48×48 piksel olmak üzere üç görüntü bulunur. Tarayıcı ve Windows ihtiyaç duyduğu boyutu kendisi seçer.",
        },
        {
          question: "Google arama sonuçlarında favicon nasıl görünür?",
          answer:
            'Google, favicon\'un kare (1:1) olmasını ve kenarının 48 pikselin katı (48×48, 96×96…) olmasını ister; simge ana sayfanızdaki <link rel="icon"> etiketiyle bildirilmeli ve Googlebot tarafından erişilebilir olmalıdır. Pakette bu koşulları karşılayan dosyalar ve HTML kodu vardır.',
        },
        {
          question: "PNG'yi ICO'ya çevirmek için bu araç yeterli mi?",
          answer:
            "Evet. Görseli seçtiğinizde favicon.ico hemen hazırlanır ve 'favicon.ico indir' düğmesiyle tek başına indirilebilir. SVG ve JPG logolar da kabul edilir.",
        },
        {
          question: "Logom bir sunucuya yükleniyor mu?",
          answer:
            "Hayır. Tüm simgeler tarayıcınızda çizilir ve paketlenir; dosyanız bilgisayarınızdan çıkmaz.",
        },
      ]}
      bolumler={[
        {
          id: "paket",
          baslik: "Paketteki dosyalar",
          icerik: (
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th scope="col">Dosya</th>
                    <th scope="col">Boyut</th>
                    <th scope="col">Nerede kullanılır?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>favicon.ico</td>
                    <td>16, 32, 48 px</td>
                    <td>Tüm tarayıcılar, Windows kısayolları</td>
                  </tr>
                  <tr>
                    <td>favicon-16x16.png, favicon-32x32.png</td>
                    <td>16, 32 px</td>
                    <td>Tarayıcı sekmesi</td>
                  </tr>
                  <tr>
                    <td>apple-touch-icon.png</td>
                    <td>180 px</td>
                    <td>iPhone ve iPad ana ekranı (saydamsa beyaz zemin)</td>
                  </tr>
                  <tr>
                    <td>android-chrome-192x192.png, 512x512.png</td>
                    <td>192, 512 px</td>
                    <td>Android ana ekranı ve web uygulaması</td>
                  </tr>
                  <tr>
                    <td>site.webmanifest</td>
                    <td>—</td>
                    <td>Android simgelerini ve tema rengini bildirir</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ),
        },
        {
          id: "kurulum",
          baslik: "Sitenize nasıl eklenir?",
          icerik: (
            <ol>
              <li>
                ZIP paketini açın ve dosyaları sitenizin kök klasörüne yükleyin.
              </li>
              <li>
                Paketteki favicon-html.txt dosyasındaki satırları her sayfanın{" "}
                <code>&lt;head&gt;</code> bölümüne ekleyin.
              </li>
              <li>
                Tarayıcı önbelleği nedeniyle yeni simge hemen görünmeyebilir;
                sayfayı Ctrl + F5 ile yenileyin.
              </li>
            </ol>
          ),
        },
        {
          id: "ipuclari",
          baslik: "İyi bir favicon için ipuçları",
          icerik: (
            <p>
              16 pikselde ayrıntılar kaybolur; logonuzun yalnızca simge kısmını
              veya baş harfini kullanın. Kare olmayan logoyu önce{" "}
              <Link href="/fotograf-kirpma">Fotoğraf Kırpma</Link> aracıyla 1:1
              oranında kırpabilir, SVG logonuzu{" "}
              <Link href="/svg-png-cevirme">SVG PNG Çevirme</Link> ile PNG
              yapabilirsiniz.
            </p>
          ),
        },
      ]}
    />
  );
}

/* /resim-base64-cevirme */
export const base64Meta = () =>
  takvimMetadata("/resim-base64-cevirme", {
    title: "Resim Base64 Çevirme: Görseli Base64'e, Base64'ü Resme",
    short: "Resim Base64 Çevirme",
    description:
      "Görseli Base64 ve data URI'ye çevirin, CSS ve HTML kodunu kopyalayın; Base64 metnini yapıştırıp resmi görün ve indirin. PNG, JPG, SVG, WebP, GIF; yüklemeden.",
  });

export function Base64Sayfasi() {
  return (
    <AracSayfasi
      yol="/resim-base64-cevirme"
      baslik="Resim Base64 Çevirme"
      giris="Görsellerinizi Base64 metnine (data URI) çevirip HTML, CSS veya JSON içine gömün; elinizdeki Base64 metnini de tekrar resme dönüştürüp indirin."
      arac={<ResimBase64 />}
      baglantilar={BAGLANTILAR}
      sss={[
        {
          question: "Base64 nedir?",
          answer:
            "Base64, ikili (binary) veriyi yalnızca harf, rakam, + ve / karakterleriyle yazılan metne çeviren bir kodlamadır. Böylece bir görsel HTML, CSS, JSON veya e-posta gibi yalnızca metin taşıyan yerlere gömülebilir.",
        },
        {
          question: "Data URI ile Base64 farkı nedir?",
          answer:
            "Data URI, Base64 metninin başına türünü bildiren 'data:image/png;base64,' ön ekinin eklenmiş hâlidir. Tarayıcıda <img src> veya CSS url() içinde doğrudan data URI kullanılır; API'ler çoğu zaman yalnız Base64 kısmını ister.",
        },
        {
          question: "Base64 görsel neden daha büyük?",
          answer:
            "Base64 her 3 baytı 4 karakterle yazdığı için boyut yaklaşık %33 artar. Bu yüzden yalnızca küçük simge ve logolar için uygundur; büyük fotoğrafları ayrı dosya olarak kullanmak sayfayı daha hızlı açar.",
        },
        {
          question: "Base64 metnim çözülmüyor, neden?",
          answer:
            "Metin eksik kopyalanmış olabilir ya da görsel olmayan bir veri (ör. PDF) olabilir. Başındaki 'data:…;base64,' kısmı, satır sonları ve boşluklar sorun değildir; araç bunları kendisi temizler.",
        },
        {
          question: "Görsellerim bir yere gönderiliyor mu?",
          answer:
            "Hayır. Kodlama ve çözme tarayıcınızda yapılır; görsel ve metin sunucuya gönderilmez.",
        },
      ]}
      bolumler={[
        {
          id: "kullanim",
          baslik: "Nerelerde kullanılır?",
          icerik: (
            <ul>
              <li>HTML e-posta şablonlarında küçük logo ve simgeler</li>
              <li>CSS içinde arka plan desenleri ve ikonlar</li>
              <li>
                Görsel kabul eden API&apos;lere (ör. yapay zekâ, OCR servisleri)
                JSON içinde görsel göndermek
              </li>
              <li>Tek dosyalık HTML rapor ve belgeler</li>
            </ul>
          ),
        },
        {
          id: "ornek",
          baslik: "Örnek kullanım",
          icerik: (
            <pre className="base64-ornek">
              {`<img src="data:image/png;base64,iVBORw0KGgo…" alt="Logo">

.ikon { background-image: url("data:image/svg+xml;base64,PHN2Zy…"); }`}
            </pre>
          ),
        },
      ]}
    />
  );
}
