import type { Metadata } from "next";
import CanliPusula from "../components/pusula/CanliPusula";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { kabeMesafesi, kibleAcisi, kibleSaati, manyetikSapma, pusulaKibleAcisi } from "../converter/diniHesaplar";
import { findProvince, turkeyProvinces } from "../converter/geo/turkeyProvinces";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/kible-yonu-hesaplama";
const title = "Kıble Yönü Bulma: Canlı Pusula ve 81 İl Kıble Açısı";
const description =
  "Telefonda canlı pusulayla kıbleyi bulun: kıbleye kaç derece dönmeniz gerektiğini söyler. Bilgisayarda güneşle kıble, bugünün kıble saati ve 81 il kıble açısı.";

export const metadata: Metadata = {
  title: seoTitle(title, "Kıble Yönü Bulma: Canlı Pusula"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const fmt1 = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
// Site her gün yeniden derlendiği için kıble saati sütunu derleme gününe göredir.
const bugun = new Date();
const bugunYazi = bugun.toLocaleDateString("tr-TR", { day: "numeric", month: "long", timeZone: "Europe/Istanbul" });
const saatYaz = (t: Date | null) => (t ? t.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Istanbul" }) : "—");
const ist = findProvince("istanbul")!;
const istSaat = kibleSaati(ist.lat, ist.lon, bugun);
const satirlar = [...turkeyProvinces]
  .sort((a, b) => a.name.localeCompare(b.name, "tr"))
  .map((p) => ({
    p,
    gercek: kibleAcisi(p.lat, p.lon),
    pusula: pusulaKibleAcisi(p.lat, p.lon),
    km: kabeMesafesi(p.lat, p.lon),
    saat: kibleSaati(p.lat, p.lon, bugun),
  }));

const ilgili = [
  { href: "/canli-pusula", label: "Canlı Pusula" },
  { href: "/namaz-rekat-tablosu", label: "Namaz Rekât Tablosu" },
  { href: "/zikirmatik", label: "Online Zikirmatik" },
  { href: "/seferi-mesafe-hesaplama", label: "Seferî Mesafe" },
  { href: "/umre-mesafe-hesaplama", label: "Umre Mesafe" },
  { href: "/dini-araclar", label: "Tüm Dini Araçlar" },
];

const faqItems: FaqItem[] = [
  {
    question: "İstanbul'da kıble kaç derece?",
    answer: `İstanbul il merkezinden kıble, gerçek kuzeyden saat yönünde ${fmt1(kibleAcisi(ist.lat, ist.lon))}°'dir. Pusulada ise manyetik sapma (${fmt1(manyetikSapma(ist.lat, ist.lon))}°) düşülerek ${fmt1(pusulaKibleAcisi(ist.lat, ist.lon))}° okunur.`,
  },
  {
    question: "Kıble saati nedir?",
    answer: `Güneşin tam kıble yönünde bulunduğu andır. O saatte güneşe dönen kişi kıbleye dönmüş olur; pusula gerekmez. Saat her gün birkaç saniye kayar; ${bugunYazi} günü İstanbul için ${saatYaz(istSaat)}'dir.`,
  },
  {
    question: "Bilgisayarda kıble nasıl bulunur?",
    answer:
      "Bilgisayarlarda pusula sensörü olmadığı için canlı pusula çalışmaz. Bu sayfa bilgisayarda güneşin şu anki yönünü ve kıblenin güneşe göre kaç derece sağında ya da solunda olduğunu gösterir; kıble saatinde güneşe dönmek de yeterlidir.",
  },
  {
    question: "Pusula açısı ile kıble açısı neden farklı?",
    answer:
      "Pusula manyetik kuzeyi gösterir, kıble açısı ise coğrafi (gerçek) kuzeye göre hesaplanır. Türkiye'de manyetik kuzey gerçek kuzeyin birkaç derece doğusundadır; bu fark Dünya Manyetik Modeli (WMM2025) ile hesaplanır. Canlı pusula bu farkı kendisi düzeltir.",
  },
  {
    question: "Canlı pusula ne kadar doğru?",
    answer:
      "Telefon pusulaları birkaç derece hata yapabilir. Doğru sonuç için telefonu yere paralel tutun, metal eşyalardan ve mıknatıslı kılıflardan uzak durun ve gerekirse telefonu havada 8 çizerek kalibre edin.",
  },
];

export default function KiblePage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dini-araclar", label: "Dini Araçlar" },
        { href: path, label: "Kıble Yönü" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Kıble Yönü Bulma"
      intro="Telefonu yere paralel tutun, “Pusulayı başlat”a dokunun: ekran kıbleye kaç derece dönmeniz gerektiğini söyler, kıbleye dönünce telefon titrer."
      tool={<CanliPusula mod="kible" />}
      related={{ title: "İlgili araçlar", links: ilgili }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "nasil", label: "Canlı pusulayla kıble nasıl bulunur?" },
        { id: "gunes", label: "Pusulasız kıble: güneş ve kıble saati" },
        { id: "hesap", label: "Kıble açısı nasıl hesaplanır?" },
        { id: "iller", label: "81 il kıble açısı ve kıble saati" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="nasil">Canlı pusulayla kıble nasıl bulunur?</h2>
      <ol>
        <li>İlinizi seçin ya da “Konumumu kullan”a dokunun; konumla sonuç daha doğrudur.</li>
        <li>Telefonu ekranı yukarı bakacak şekilde yere paralel tutun. Ortadaki kabarcık yeşile dönünce telefon düzdür.</li>
        <li>“Pusulayı başlat”a dokunun (iPhone'da izin isteğine “İzin Ver” deyin).</li>
        <li>Ekranın söylediği yöne dönün. Üstteki yeşil işaret kadranın kenarındaki Kâbe simgesine gelince “Kıbleye dönüksünüz” yazar ve telefon titrer.</li>
      </ol>

      <h2 id="gunes">Pusulasız kıble: güneş ve kıble saati</h2>
      <p>
        Bilgisayarda ya da pusulası olmayan bir cihazda kıbleyi güneşle bulabilirsiniz. Sayfa güneşin şu anki yönünü kadranda sarı daireyle
        gösterir ve kıblenin güneşin kaç derece sağında ya da solunda olduğunu yazar. Daha kolayı kıble saatidir: güneş her gün bir an tam kıble
        yönünden geçer; o saatte güneşe dönen kişi kıbleye dönmüş olur. Türkiye'de kıble saati öğleden önce ya da öğle vaktine yakındır; doğudaki
        illerde kıble güneyin batısında kaldığı için öğleden sonraya kayar.
      </p>

      <h2 id="hesap">Kıble açısı nasıl hesaplanır?</h2>
      <p>
        Kıble, bulunduğunuz yerden Kâbe'ye giden en kısa yolun (büyük daire) başladığı yöndür. Açı coğrafi kuzeyden saat yönünde ölçülür. Pusula
        ile bakarken manyetik sapmayı hesaba katmak gerekir: bu sayfa sapmayı Dünya Manyetik Modeli WMM2025 ile bulunduğunuz yer ve bugünün
        tarihi için hesaplar. Model 2029 sonuna kadar geçerlidir.
      </p>

      <h2 id="iller">81 il kıble açısı ve kıble saati</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table kible-tablo">
          <thead>
            <tr>
              <th scope="col">İl</th>
              <th scope="col">Kıble</th>
              <th scope="col">Pusulada</th>
              <th scope="col">Kıble saati ({bugunYazi})</th>
              <th scope="col">Kâbe&apos;ye</th>
            </tr>
          </thead>
          <tbody>
            {satirlar.map(({ p, gercek, pusula, km, saat }) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{fmt1(gercek)}°</td>
                <td>{fmt1(pusula)}°</td>
                <td>{saatYaz(saat)}</td>
                <td>{Math.round(km).toLocaleString("tr-TR")} km</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Açılar il merkezine göredir; “Kıble” sütunu gerçek kuzeye, “Pusulada” sütunu manyetik kuzeye göredir. Kıble saati Türkiye saatiyle ve
        sayfanın oluşturulduğu gün içindir.
      </p>
    </TimeToolPage>
  );
}
