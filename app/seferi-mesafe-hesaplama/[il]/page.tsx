import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/app/components/SiteLink";
import { SeferiHesaplama } from "../../components/dini/DiniAraclar";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { ayrilmaEki, IKAMET_GUN, SEFER_KM, SEFER_METIN, seferDurumu } from "../../converter/diniHesaplar";
import { distancesFrom } from "../../converter/geo/provinceDistances";
import { findProvince, turkeyProvinces } from "../../converter/geo/turkeyProvinces";
import { diniRelated } from "../../i18n/diniAraclar";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

const base = "/seferi-mesafe-hesaplama";

export const dynamicParams = false;

export function generateStaticParams() {
  return turkeyProvinces.map((p) => ({ il: p.id }));
}

function satirlar(il: string) {
  const origin = findProvince(il)!;
  return distancesFrom(origin)
    .map((row) => ({ ...row, durum: seferDurumu(row.road)! }))
    .sort((a, b) => a.road - b.road);
}

export async function generateMetadata({ params }: { params: Promise<{ il: string }> }): Promise<Metadata> {
  const { il } = await params;
  const p = findProvince(il);
  if (!p) return {};
  const rows = satirlar(il);
  const yakin = rows.filter((r) => r.durum !== "degil").slice(0, 3).map((r) => r.province.name).join(", ");
  const title = `${ayrilmaEki(p.name)} Seferî Olunan İller: Mesafe Listesi`;
  const description = `${ayrilmaEki(p.name)} 80 ile karayolu mesafesi ve seferîlik durumu (${SEFER_KM} km). En yakın seferî iller: ${yakin}. Kendi mesafenizi de hesaplayın.`;
  const path = `${base}/${p.id}`;
  return {
    title: seoTitle(title, `${ayrilmaEki(p.name)} Seferî Mesafe`),
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
  };
}

export default async function SeferiIlPage({ params }: { params: Promise<{ il: string }> }) {
  const { il } = await params;
  const p = findProvince(il);
  if (!p) notFound();
  const rows = satirlar(il);
  const seferiDegil = rows.filter((r) => r.durum === "degil");
  const enYakinSeferi = rows.find((r) => r.durum === "seferi");
  const path = `${base}/${p.id}`;

  const faqItems: FaqItem[] = [
    {
      question: `${ayrilmaEki(p.name)} hangi illere gidince seferî olunur?`,
      answer: seferiDegil.length
        ? `${seferiDegil.map((r) => r.province.name).join(", ")} dışındaki tüm illere gidince il merkezleri arası mesafe ${SEFER_KM} km'yi aşar. En yakın kesin seferî il ${enYakinSeferi?.province.name ?? "—"} (${enYakinSeferi?.road ?? "—"} km).`
        : `Tüm illere il merkezleri arası mesafe ${SEFER_KM} km'yi aşar. En yakın il ${rows[0].province.name} (${rows[0].road} km).`,
    },
    {
      question: `${p.name} içinde seferî olunur mu?`,
      answer: `İl içinde ilçeler arası yol ${SEFER_KM} km'yi aşıyorsa evet; seferîlik il sınırına değil, yaşanan yerleşim yerinin sınırından ölçülen mesafeye bağlıdır.`,
    },
    {
      question: "Kaç gün kalırsam seferîlik biter?",
      answer: `Hanefî mezhebine göre gidilen yerde ${IKAMET_GUN} gün ya da daha fazla kalmaya niyet eden kişi mukîm olur.`,
    },
  ];

  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: base, label: "Seferî Mesafe" },
        { href: path, label: p.name },
      ]}
      crumbLabel="Sayfa yolu"
      title={`${ayrilmaEki(p.name)} Seferî Olunan İller`}
      intro={`${ayrilmaEki(p.name)} diğer 80 ile Karayolları Genel Müdürlüğü'ne göre il merkezleri arası mesafe ve seferîlik durumu (${SEFER_KM} km). Kendi çıkış noktanızdan ölçtüğünüz mesafeyi de yazabilirsiniz.`}
      tool={<SeferiHesaplama initialA={p.plate} initialB={(enYakinSeferi ?? rows[0]).province.plate} />}
      related={{ title: "Diğer dini araçlar", links: diniRelated(base) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "liste", label: `${ayrilmaEki(p.name)} tüm iller` },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="liste">{ayrilmaEki(p.name)} illere mesafe ve seferîlik</h2>
      <p>
        Liste yakından uzağa sıralıdır. “Sınırda” görünen illerde (90–120 km) kesin sonuç için yaşadığınız yerin sınırından gideceğiniz yerin
        sınırına kadar olan yol mesafesine bakın.
      </p>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">İl</th>
              <th scope="col">Karayolu</th>
              <th scope="col">Seferîlik</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.province.id} className={`sefer-satir sefer-${r.durum}`}>
                <td>
                  <Link href={`${base}/${r.province.id}`}>{r.province.name}</Link>
                </td>
                <td>{r.road.toLocaleString("tr-TR")} km</td>
                <td>{SEFER_METIN[r.durum].baslik}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TimeToolPage>
  );
}
