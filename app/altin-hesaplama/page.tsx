import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import AltinHesaplama from "../components/AltinHesaplama";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import {
  AYARLAR,
  hasGram,
  SIKKELER,
  ZIYNET_MILYEM,
} from "../converter/turkishAltin";
import {
  ALTIN_SAYFALARI,
  altinSayfaPath,
} from "../converter/turkishAltinPages";
import { buildSiteUrl } from "../siteConfig";

const path = "/altin-hesaplama";
const title = "Altın Hesaplama: Çeyrek, Yarım, Tam Altın Kaç Gram?";
const description =
  "Altın hesaplama: çeyrek, yarım, tam, gremse, beşli ve Cumhuriyet altını kaç gram, içinde kaç gram has altın var? Bilezik ve takıda ayar ve işçilikle has karşılığı ve TL değeri.";

export const metadata: Metadata = {
  title,
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

const gr = (n: number) =>
  n.toLocaleString("tr-TR", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });

const faqItems: FaqItem[] = [
  {
    question: "Çeyrek altın kaç gram?",
    answer: `Ziynet çeyrek altın 1,754 gramdır ve 22 ayardır; içinde ${gr(hasGram(1.754, ZIYNET_MILYEM))} gram saf altın vardır. Atatürk portreli Ata çeyrek ise 1,804 gramdır.`,
  },
  {
    question: "Tam altın ile Cumhuriyet altını aynı mı?",
    answer:
      "Değer olarak ikisi de bir tam (teklik) altındır ama ağırlıkları farklıdır: ziynet tam altın 7,016 gram, Atatürk portreli Cumhuriyet altını (Ata lira) 7,216 gramdır. Bu yüzden Ata lira biraz daha pahalıdır ve yatırım için tercih edilir.",
  },
  {
    question: "Kaç çeyrek bir tam eder?",
    answer:
      "Dört çeyrek bir tam, iki çeyrek bir yarım altın eder. Gremse (ikibuçukluk) 10 çeyreğe, beşli 20 çeyreğe eşdeğerdir. Ağırlık olarak da dört çeyrek (4 × 1,754 = 7,016 g) tam altın kadar gelir.",
  },
  {
    question: "Bilezik fiyatı nasıl hesaplanır?",
    answer:
      "Kuyumcular bileziği gram, ayar ve işçilikle fiyatlar: gram × (ayar milyemi + işçilik milyemi) / 1000 × has altın fiyatı. 20 gram 22 ayar bilezik, 20 milyem işçilikle 20 × 0,936 = 18,72 gram has altın fiyatına satılır; bozdurulurken ise işçilik düşülür ve 20 × 0,916 = 18,32 gram has üzerinden hesaplanır.",
  },
  {
    question: "Milyem nedir?",
    answer:
      "Bir alaşımdaki saf altının binde kaç olduğunu gösterir. 22 ayar 916 milyem, 18 ayar 750 milyem, 14 ayar 585 milyem demektir. Ayarı milyeme çevirmek için ayar / 24 × 1000 hesaplanır.",
  },
];

export default function AltinHesaplamaPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana sayfa" },
        { href: "/kuyumcu-araclari", label: "Kuyumcu Araçları" },
        { href: path, label: "Altın Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Altın Hesaplama"
      intro="Çeyrek, yarım, tam ve Cumhuriyet altınlarınızın toplam ağırlığını ve içindeki has altını hesaplayın; bilezik ve takılarda ayar ve işçilikle has karşılığını ve güncel gram fiyatıyla TL değerini bulun."
      tool={<AltinHesaplama />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          ...ALTIN_SAYFALARI.map((id) => ({
            href: altinSayfaPath(id),
            label: `${SIKKELER.find((s) => s.id === id)!.ad} kaç gram?`,
          })),
          {
            href: "/24-ayar-altin-22-ayar-altin",
            label: "24 ayar altını 22 ayara çevirme",
          },
          { href: "/has-hesaplama", label: "Has altın ve alaşım hesaplama" },
          { href: "/kuyumcu-araclari", label: "Kuyumcu Araçları" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "tablo", label: "Altın çeşitleri ve gramları" },
        { id: "ayarlar", label: "Ayar ve milyem tablosu" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="tablo">Altın çeşitleri ve gramları</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Altın</th>
              <th scope="col">Ağırlık</th>
              <th scope="col">Has altın</th>
              <th scope="col">Çeyrek karşılığı</th>
            </tr>
          </thead>
          <tbody>
            {SIKKELER.map((s) => (
              <tr key={s.id}>
                <td>
                  {ALTIN_SAYFALARI.includes(s.id) ? (
                    <Link href={altinSayfaPath(s.id)}>{s.ad}</Link>
                  ) : (
                    s.ad
                  )}
                </td>
                <td>{gr(s.gram)} g</td>
                <td>{gr(hasGram(s.gram, ZIYNET_MILYEM))} g</td>
                <td>{(s.deger * 4).toLocaleString("tr-TR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Hepsi Darphane tarafından 22 ayar (916,6 milyem) basılır. Ziynet serisi
        düğün ve hediye için, Atatürk portreli Ata (Cumhuriyet) serisi daha ağır
        olduğu için yatırım için tercih edilir.
      </p>

      <h2 id="ayarlar">Ayar ve milyem tablosu</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Ayar</th>
              <th scope="col">Milyem</th>
              <th scope="col">10 gramda has altın</th>
            </tr>
          </thead>
          <tbody>
            {AYARLAR.map((a) => (
              <tr key={a.ayar}>
                <td>{a.ayar} ayar</td>
                <td>{a.milyem}</td>
                <td>{gr(hasGram(10, a.milyem))} g</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Ayarlar arasında dönüşüm için{" "}
        <Link href="/kategoriler/altin-ayar">altın ayar çeviricisi</Link>,
        birden fazla parçanın karışım ayarı için{" "}
        <Link href="/has-hesaplama">has hesaplama</Link> aracını
        kullanabilirsiniz.
      </p>
      <p>
        <small>
          Ağırlıklar Darphane ve Damga Matbaası Genel Müdürlüğü&apos;nün ziynet
          ve Cumhuriyet altını standartlarına göredir. TL değerleri girdiğiniz
          gram fiyatıyla hesaplanır; kuyumcu alış-satış fiyatları işçilik ve
          marj nedeniyle farklıdır.
        </small>
      </p>
    </TimeToolPage>
  );
}
