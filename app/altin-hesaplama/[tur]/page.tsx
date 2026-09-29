import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/app/components/SiteLink";
import AltinHesaplama from "../../components/AltinHesaplama";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { hasGram, SIKKELER, ZIYNET_MILYEM } from "../../converter/turkishAltin";
import {
  ALTIN_SAYFALARI,
  altinOzet,
  altinSayfaPath,
  altinSayfasi,
  esdeger,
} from "../../converter/turkishAltinPages";
import { buildSiteUrl } from "../../siteConfig";

export const dynamicParams = false;

type PageProps = { params: Promise<{ tur: string }> };

export function generateStaticParams() {
  return ALTIN_SAYFALARI.map((tur) => ({ tur }));
}

const gr = (n: number) =>
  n.toLocaleString("tr-TR", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
const kisaAd = (ad: string) => ad.replace(/ \(.*\)$/, "");

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const s = altinSayfasi((await params).tur);
  if (!s) return {};
  const o = altinOzet(s);
  const path = altinSayfaPath(s.id);
  const title = `${kisaAd(s.ad)} Kaç Gram? Has Altın ve Hesaplama`;
  const description = `${o.cumle} Adet girerek toplam gram, has altın ve TL değerini hesaplayın.`;
  return {
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
}

export default async function AltinTurPage({ params }: PageProps) {
  const s = altinSayfasi((await params).tur);
  if (!s) notFound();
  const o = altinOzet(s);
  const karsi = esdeger(s);
  const ad = kisaAd(s.ad);
  const adetler = [1, 2, 3, 4, 5, 10, 20];

  const faqItems: FaqItem[] = [
    { question: `${ad} kaç gram?`, answer: o.cumle },
    {
      question: `${ad} kaç ayar?`,
      answer: `22 ayar. Darphane ziynet ve Cumhuriyet altınlarını ${ZIYNET_MILYEM.toLocaleString("tr-TR")} milyem saflıkta basar; yani ağırlığın yaklaşık %91,7'si saf altındır.`,
    },
    ...(s.deger !== 0.25
      ? [
          {
            question: `${ad} kaç çeyrek eder?`,
            answer: `${o.ceyrek.toLocaleString("tr-TR")} çeyrek altın eder (1 tam = 4 çeyrek).`,
          },
        ]
      : [
          {
            question: "Kaç çeyrek bir tam altın eder?",
            answer: "Dört çeyrek bir tam, iki çeyrek bir yarım altın eder.",
          },
        ]),
    ...(karsi
      ? [
          {
            question: `${ad} ile ${kisaAd(karsi.ad)} arasındaki fark nedir?`,
            answer: `Değerleri aynı (${s.deger.toLocaleString("tr-TR")} tam) ama ${s.seri === "ziynet" ? "ziynet" : "Ata"} serisindeki ${ad} ${gr(s.gram)} gram, ${kisaAd(karsi.ad)} ${gr(karsi.gram)} gramdır. Ağır olan Ata serisi içerdiği fazla altın kadar daha pahalıdır.`,
          },
        ]
      : []),
  ];

  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana sayfa" },
        { href: "/altin-hesaplama", label: "Altın Hesaplama" },
        { href: altinSayfaPath(s.id), label: ad },
      ]}
      crumbLabel="Sayfa yolu"
      title={`${ad} kaç gram?`}
      intro={`${o.cumle} ${s.aciklama}`}
      tool={<AltinHesaplama baslangic={s.id} />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          ...ALTIN_SAYFALARI.filter((id) => id !== s.id).map((id) => ({
            href: altinSayfaPath(id),
            label: `${kisaAd(SIKKELER.find((x) => x.id === id)!.ad)} kaç gram?`,
          })),
          { href: "/altin-hesaplama", label: "Altın hesaplama" },
          {
            href: "/24-ayar-altin-22-ayar-altin",
            label: "24 ayar altını 22 ayara çevirme",
          },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "tablo", label: `${ad} adet – gram tablosu` },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="tablo">{ad} adet – gram tablosu</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Adet</th>
              <th scope="col">Toplam ağırlık</th>
              <th scope="col">Has altın</th>
            </tr>
          </thead>
          <tbody>
            {adetler.map((n) => (
              <tr key={n}>
                <td>
                  {n} {ad.toLocaleLowerCase("tr-TR")}
                </td>
                <td>{gr(n * s.gram)} g</td>
                <td>{gr(hasGram(n * s.gram, ZIYNET_MILYEM))} g</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Diğer altın türlerinin ağırlıkları ve bilezik hesaplaması için{" "}
        <Link href="/altin-hesaplama">altın hesaplama</Link> sayfasına
        bakabilirsiniz.
      </p>
      <p>
        <small>
          Ağırlıklar Darphane ziynet ve Cumhuriyet altını standartlarına
          göredir.
        </small>
      </p>
    </TimeToolPage>
  );
}
