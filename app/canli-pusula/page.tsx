import type { Metadata } from "next";
import CanliPusula from "../components/pusula/CanliPusula";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { manyetikSapma } from "../converter/diniHesaplar";
import { findProvince } from "../converter/geo/turkeyProvinces";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/canli-pusula";
const title = "Canlı Pusula: Online Pusula ile Kuzey Yönünü Bul";
const description =
  "Telefonunuzda uygulama yüklemeden canlı pusula: derece ve yön, gerçek ve manyetik kuzey, kıble işareti, su terazisi ve konumunuza göre dönen dünya haritası.";

export const metadata: Metadata = {
  title: seoTitle(title, "Canlı Pusula: Online Pusula"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const fmt1 = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const sapmaIlleri = ["edirne", "istanbul", "izmir", "ankara", "antalya", "trabzon", "diyarbakir", "van"]
  .map((id) => findProvince(id)!)
  .map((p) => ({ p, sapma: manyetikSapma(p.lat, p.lon) }));
const enAz = sapmaIlleri.reduce((a, b) => (b.sapma < a.sapma ? b : a));
const enCok = sapmaIlleri.reduce((a, b) => (b.sapma > a.sapma ? b : a));

const faqItems: FaqItem[] = [
  {
    question: "Canlı pusula neden bilgisayarda çalışmıyor?",
    answer:
      "Pusula, telefondaki manyetometre (manyetik alan sensörü) ile çalışır. Dizüstü ve masaüstü bilgisayarlarda bu sensör bulunmaz; sayfayı telefonunuzda ya da tabletinizde açın.",
  },
  {
    question: "iPhone'da neden “Pusulayı başlat” düğmesine dokunmam gerekiyor?",
    answer:
      "Safari, sitelerin hareket ve yön sensörlerini kullanıcının izni olmadan okumasına izin vermez. Düğmeye dokununca çıkan izin isteğine “İzin Ver” demeniz yeterli; Android'de pusula düğmeye dokunur dokunmaz çalışır.",
  },
  {
    question: "Pusula gerçek kuzeyi mi manyetik kuzeyi mi gösteriyor?",
    answer: `Gerçek (coğrafi) kuzeyi. Telefon manyetik kuzeyi ölçer; sayfa aradaki farkı (manyetik sapma) Dünya Manyetik Modeli ile hesaplayıp ekler. Türkiye'de bu fark ${fmt1(enAz.sapma)}° ile ${fmt1(enCok.sapma)}° doğu arasındadır.`,
  },
  {
    question: "Okuma neden zıplıyor ya da yanlış yönü gösteriyor?",
    answer:
      "Telefon kılıfındaki mıknatıslar, yakındaki metal eşyalar, hoparlörler ve araç içindeki elektronik aksam pusulayı şaşırtır. Bunlardan uzaklaşın, telefonu havada birkaç kez 8 çizerek kalibre edin ve yere paralel tutun.",
  },
  {
    question: "Konumumu kaydediyor musunuz?",
    answer:
      "Hayır. Konum yalnızca manyetik sapmayı, kıble yönünü ve haritanın merkezini hesaplamak için tarayıcınızda kullanılır; hiçbir sunucuya gönderilmez. Konum izni vermezseniz hesaplar İstanbul'a göre yapılır.",
  },
  {
    question: "Pusula internetsiz çalışır mı?",
    answer: "Sayfa bir kez açıldıktan sonra pusula sensörden okur; sekme açık kaldığı sürece internet bağlantısı gerekmez.",
  },
];

export default function CanliPusulaPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/cografya-hesaplamalari", label: "Coğrafya Hesaplamaları" },
        { href: path, label: "Canlı Pusula" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Canlı Pusula"
      intro="Telefonu yere paralel tutun, “Pusulayı başlat”a dokunun. Yeşil işaret telefonun baktığı yönü gösterir."
      tool={<CanliPusula />}
      related={{
        title: "İlgili araçlar",
        links: [
          { href: "/kible-yonu-hesaplama", label: "Kıble Yönü" },
          { href: "/koordinat-donusturucu", label: "Koordinat Dönüştürücü" },
          { href: "/il-rakimlari", label: "İllerin Rakımı" },
          { href: "/dunya-saatleri", label: "Dünya Saatleri" },
          { href: "/cografya-hesaplamalari", label: "Coğrafya Hesaplamaları" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "nasil", label: "Canlı pusula nasıl kullanılır?" },
        { id: "izin", label: "iPhone ve Android'de pusula izni" },
        { id: "harita", label: "Pusuladaki dünya haritası" },
        { id: "sapma", label: "Gerçek kuzey ve manyetik sapma" },
        { id: "dogruluk", label: "Telefon pusulası ne kadar doğru?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="nasil">Canlı pusula nasıl kullanılır?</h2>
      <ol>
        <li>Telefonu ekranı yukarı bakacak şekilde, yere paralel tutun. Ortadaki kabarcık yeşile dönünce telefon düzdür.</li>
        <li>“Pusulayı başlat”a dokunun. iPhone'da çıkan izin isteğine “İzin Ver” deyin.</li>
        <li>Kendi etrafınızda dönün: üstteki yeşil işaretin altındaki derece ve yön (örneğin 135° GD · Güneydoğu) telefonun baktığı yöndür.</li>
        <li>Bir yönü takip etmek için “Yönü kilitle”ye dokunun; ekran hedefe kaç derece sağa ya da sola dönmeniz gerektiğini söyler.</li>
      </ol>
      <p>
        Kadrandaki harfler Türkçe yön kısaltmalarıdır: K kuzey, D doğu, G güney, B batı; KD kuzeydoğu, GD güneydoğu, GB güneybatı, KB
        kuzeybatı. Kırmızı uç her zaman kuzeyi gösterir.
      </p>

      <h2 id="izin">iPhone ve Android'de pusula izni</h2>
      <p>
        <strong>iPhone ve iPad (Safari):</strong> “Pusulayı başlat”a dokununca Safari hareket ve yön erişimi ister; “İzin Ver” deyin. Yanlışlıkla
        reddettiyseniz Safari'yi tamamen kapatıp sayfayı yeniden açın.
      </p>
      <p>
        <strong>Android (Chrome):</strong> Ayrı bir izin gerekmez. Pusula çalışmıyorsa Chrome'da adres çubuğundaki kilit simgesi &gt; Site
        ayarları &gt; Hareket sensörleri iznini açın.
      </p>

      <h2 id="harita">Pusuladaki dünya haritası</h2>
      <p>
        Kadranın ortasındaki harita, bulunduğunuz yeri merkeze alan eş uzaklıklı azimut izdüşümüdür. Bu haritada her şehir, sizden bakıldığında
        gerçekten bulunduğu yöndedir ve merkeze uzaklığı gerçek uzaklıkla orantılıdır. Kesikli halkalar yaklaşık 3.300, 6.700 ve 10.000 km'yi
        gösterir. Yeşil nokta Kâbe'dir; kıble açıkken kadranın kenarındaki Kâbe işareti kıble yönünü gösterir ve telefon kıbleye dönünce telefon
        titrer.
      </p>

      <h2 id="sapma">Gerçek kuzey ve manyetik sapma</h2>
      <p>
        Pusula iğnesi manyetik kuzeyi gösterir; haritalardaki kuzey ise coğrafi (gerçek) kuzeydir. Aradaki açıya manyetik sapma denir ve
        yerden yere, yıldan yıla değişir. Bu sayfa sapmayı Dünya Manyetik Modeli (WMM2025) ile hesaplar ve gerçek kuzeyi gösterir. Türkiye'de
        manyetik kuzey gerçek kuzeyin birkaç derece doğusundadır:
      </p>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">İl</th>
              <th scope="col">Manyetik sapma</th>
            </tr>
          </thead>
          <tbody>
            {sapmaIlleri.map(({ p, sapma }) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{fmt1(sapma)}° doğu</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="dogruluk">Telefon pusulası ne kadar doğru?</h2>
      <p>
        Kalibre edilmiş bir telefon, metal eşyalardan uzakta ve yere paralel tutulduğunda genellikle birkaç derece içinde doğru sonuç verir.
        Mıknatıslı kılıflar, araç içi, beton içindeki demir ve elektronik cihazlar sapmayı 10–20 dereceye çıkarabilir. Okuma tutarsızsa
        telefonu havada birkaç kez 8 çizerek kalibre edin. Doğa yürüyüşü ve dağcılık gibi güvenliğin önemli olduğu durumlarda gerçek bir pusula
        da yanınızda bulunsun.
      </p>
    </TimeToolPage>
  );
}
