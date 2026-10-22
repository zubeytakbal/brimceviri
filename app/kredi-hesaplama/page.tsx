import type { Metadata } from "next";
import KrediHesaplama from "../components/KrediHesaplama";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { krediHesapla } from "../converter/turkishKredi";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/kredi-hesaplama";
const title = "Kredi Hesaplama";
const description =
  "Kredi hesaplama: ihtiyaç, taşıt ve konut kredisinde aylık taksit, toplam geri ödeme, faiz, KKDF ve BSMV tutarı ile ay ay ödeme planı.";

export const metadata: Metadata = {
  title: seoTitle(`${title}: Taksit, KKDF, BSMV ve Ödeme Planı`, title),
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: buildSiteUrl(path),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

const tl = (n: number) =>
  `${n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL`;

// Örnek: sayfadaki rakamlar hesap fonksiyonundan gelir, elle yazılmaz.
const ornek = krediHesapla({ anapara: 100_000, vade: 12, aylikFaiz: 3, kkdf: 15, bsmv: 15 })!;
const ilkAy = ornek.plan[0];

const faqItems: FaqItem[] = [
  {
    question: "KKDF ve BSMV nedir?",
    answer:
      "KKDF (Kaynak Kullanımını Destekleme Fonu) ve BSMV (Banka ve Sigorta Muameleleri Vergisi), kredinin anaparasına değil faizine uygulanan yasal kesintilerdir. İhtiyaç ve taşıt kredilerinde ikisi de faizin %15'i kadardır; bu yüzden aylık %3 faiz, vergilerle birlikte fiilen %3,9 olur.",
  },
  {
    question: "Konut kredisinde KKDF ve BSMV var mı?",
    answer:
      "Konut kredileri KKDF ve BSMV'den muaftır. Ancak kredi kullanıldığı tarihte üzerine kayıtlı başka bir konut bulunanlarda istisna uygulanmayabilir; bu durumda bankanızın bildirdiği oranları KKDF ve BSMV alanlarına girin.",
  },
  {
    question: "Bankanın ödeme planıyla neden birkaç kuruş fark çıkıyor?",
    answer:
      "Bankalar her ayın tutarını kuruşa yuvarlar ve son taksitte farkı kapatır. Bazı bankalar dosya masrafı, sigorta veya hesap işletim ücreti de ekler. Bu araç yalnızca faiz, KKDF ve BSMV'yi hesaplar; kesin tutar için bankanın size verdiği ödeme planını esas alın.",
  },
  {
    question: "Yıllık faiz oranını aylığa nasıl çeviririm?",
    answer:
      "Türkiye'de kredi teklifleri genellikle aylık oranla verilir. Elinizde yıllık (nominal) oran varsa 12'ye bölerek aylık oranı bulabilirsiniz; örneğin yıllık %36, aylık %3'tür.",
  },
];

export default function KrediHesaplamaPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana sayfa" },
        { href: "/muhasebeci-araclari", label: "Muhasebeci Araçları" },
        { href: path, label: title },
      ]}
      crumbLabel="Sayfa yolu"
      title={title}
      intro="Kredi tutarını, vadeyi ve bankanın aylık faiz oranını girin: aylık taksitinizi, toplam geri ödemeyi ve faiz, KKDF, BSMV tutarlarını ay ay görün. Kredi türünü seçince yasal vergi oranları otomatik gelir."
      tool={<KrediHesaplama />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/kdv-hesaplama", label: "KDV Hesaplama" },
          { href: "/brutten-nete-maas-hesaplama", label: "Brütten Nete Maaş Hesaplama" },
          { href: "/emlak-komisyonu-hesaplama", label: "Emlak Komisyonu Hesaplama" },
          { href: "/doviz-cevirici", label: "Döviz Çevirici" },
          { href: "/muhasebeci-araclari", label: "Muhasebeci Araçları" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "formul", label: "Kredi taksiti nasıl hesaplanır?" },
        { id: "vergiler", label: "Kredi türüne göre KKDF ve BSMV" },
        { id: "ornek", label: "Örnek hesaplama" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="formul">Kredi taksiti nasıl hesaplanır?</h2>
      <p>
        Bankalar eşit taksitli kredilerde önce aylık faiz oranına KKDF ve BSMV&apos;yi
        ekler: <strong>vergili oran = faiz × (1 + KKDF + BSMV)</strong>. Taksit bu
        oranla bulunur: <strong>taksit = anapara × i / (1 − (1 + i)<sup>−n</sup>)</strong>;
        burada <em>i</em> vergili aylık oran, <em>n</em> vade (ay sayısı). Her ay
        ödenen faiz kalan anapara üzerinden hesaplandığı için ilk aylarda taksitin
        çoğu faize, son aylarda anaparaya gider.
      </p>

      <h2 id="vergiler">Kredi türüne göre KKDF ve BSMV</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Kredi türü</th>
              <th scope="col">KKDF</th>
              <th scope="col">BSMV</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>İhtiyaç kredisi</td>
              <td>%15</td>
              <td>%15</td>
            </tr>
            <tr>
              <td>Taşıt kredisi</td>
              <td>%15</td>
              <td>%15</td>
            </tr>
            <tr>
              <td>Konut kredisi</td>
              <td>Muaf</td>
              <td>Muaf*</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        * Kredi kullanıldığı tarihte üzerine kayıtlı başka bir konut bulunanlarda
        istisna uygulanmayabilir. Oranlar faiz tutarı üzerinden alınır; anaparaya
        uygulanmaz. Oranlar mevzuatla değişebileceği için araçta değiştirilebilir
        bırakıldı.
      </p>

      <h2 id="ornek">Örnek hesaplama</h2>
      <p>
        100.000 TL ihtiyaç kredisi, 12 ay vade, aylık %3 faiz. Vergilerle birlikte
        aylık oran %{ornek.vergiliAylikOran.toLocaleString("tr-TR")} olur ve aylık
        taksit <strong>{tl(ornek.taksit)}</strong> çıkar. İlk ay {tl(ilkAy.faiz)} faiz,{" "}
        {tl(ilkAy.kkdf)} KKDF ve {tl(ilkAy.bsmv)} BSMV ödenir; taksitin kalan{" "}
        {tl(ilkAy.anapara)} kısmı anaparadan düşer. 12 ayda toplam{" "}
        <strong>{tl(ornek.toplamOdeme)}</strong> geri ödenir; kredinin maliyeti{" "}
        {tl(ornek.toplamMaliyet)} olur.
      </p>

      <h2>Kaynaklar</h2>
      <p>
        BSMV: 6802 sayılı Gider Vergileri Kanunu (konut kredisi istisnası md. 29).
        KKDF: Kaynak Kullanımını Destekleme Fonu mevzuatı. Hesaplama yalnızca faiz,
        KKDF ve BSMV&apos;yi kapsar; dosya masrafı ve sigorta dahil değildir.
      </p>
    </TimeToolPage>
  );
}
