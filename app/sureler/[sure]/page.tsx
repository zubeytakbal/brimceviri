import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/app/components/SiteLink";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { SURELER, findSure, sureCuzBolumleri, type Sure } from "../../converter/sureler";
import { diniRelated } from "../../i18n/diniAraclar";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

export const dynamicParams = false;

const SUFFIX = "-suresi";

export function generateStaticParams() {
  return SURELER.map((s) => ({ sure: `${s.slug}${SUFFIX}` }));
}

function bul(param: string) {
  return param.endsWith(SUFFIX) ? findSure(param.slice(0, -SUFFIX.length)) : null;
}

const cuzMetni = (s: Sure) => (s.cuzBas === s.cuzSon ? `${s.cuzBas}. cüzde` : `${s.cuzBas}. ve ${s.cuzSon}. cüzlerde`);

export async function generateMetadata({ params }: { params: Promise<{ sure: string }> }): Promise<Metadata> {
  const s = bul((await params).sure);
  if (!s) return {};
  const title = `${s.ad} Suresi Kaç Ayet, Hangi Cüzde? (${s.no}. Sure)`;
  const description = `${s.ad} Suresi Kur'an-ı Kerim'in ${s.no}. suresidir, ${s.ayet} ayettir ve ${cuzMetni(s)} yer alır. Cüzlere göre ayet aralıkları ve önceki/sonraki sure.`;
  const path = `/sureler/${s.slug}${SUFFIX}`;
  return {
    title: seoTitle(title, `${s.ad} Suresi Kaç Ayet, Hangi Cüzde?`),
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "article" },
  };
}

export default async function SurePage({ params }: { params: Promise<{ sure: string }> }) {
  const s = bul((await params).sure);
  if (!s) notFound();
  const path = `/sureler/${s.slug}${SUFFIX}`;
  const bolumler = sureCuzBolumleri(s);
  const onceki = SURELER[s.no - 2];
  const sonraki = SURELER[s.no];
  const ayniCuz = SURELER.filter((x) => x.no !== s.no && x.cuzBas <= s.cuzSon && x.cuzSon >= s.cuzBas).slice(0, 12);

  const faqItems: FaqItem[] = [
    { question: `${s.ad} Suresi kaç ayet?`, answer: `${s.ad} Suresi ${s.ayet} ayettir.` },
    {
      question: `${s.ad} Suresi hangi cüzde?`,
      answer:
        bolumler.length === 1
          ? `${s.ad} Suresi'nin tamamı ${s.cuzBas}. cüzdedir.`
          : `${s.ad} Suresi ${bolumler.map((b) => `${b.cuz}. cüzde ${b.ilkAyet}–${b.sonAyet}. ayetler`).join(", ")} olarak yer alır.`,
    },
    { question: `${s.ad} Suresi Kur'an'ın kaçıncı suresi?`, answer: `${s.ad} Suresi mushaf sıralamasında ${s.no}. suredir.` },
  ];

  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/sure-bulucu", label: "Sure Bulucu" },
        { href: path, label: `${s.ad} Suresi` },
      ]}
      crumbLabel="Sayfa yolu"
      title={`${s.ad} Suresi`}
      intro={`${s.ad} Suresi Kur'an-ı Kerim'in ${s.no}. suresidir, ${s.ayet} ayettir ve ${cuzMetni(s)} yer alır.`}
      tool={
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Ayet sayısı</span>
            <strong>{s.ayet} ayet</strong>
            <em>Hafs rivayeti, Kûfe sayımı</em>
          </div>
          <div className="date-calc-stat">
            <span>Cüz</span>
            <strong>{s.cuzBas === s.cuzSon ? `${s.cuzBas}. cüz` : `${s.cuzBas}–${s.cuzSon}. cüz`}</strong>
          </div>
          <div className="date-calc-stat">
            <span>Sıra</span>
            <strong>{s.no}. sure</strong>
            <em>114 sureden</em>
          </div>
        </div>
      }
      related={{ title: "Diğer dini araçlar", links: diniRelated("/sure-bulucu") }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "cuz", label: "Cüzlere göre ayetler" },
        { id: "komsu", label: "Önceki ve sonraki sure" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="cuz">Cüzlere göre ayetler</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Cüz</th>
              <th scope="col">Ayetler</th>
              <th scope="col">Ayet sayısı</th>
            </tr>
          </thead>
          <tbody>
            {bolumler.map((b) => (
              <tr key={b.cuz}>
                <td>
                  <Link href={`/cuzler/${b.cuz}-cuz`}>{b.cuz}. cüz</Link>
                </td>
                <td>
                  {b.ilkAyet}–{b.sonAyet}
                </td>
                <td>{b.sonAyet - b.ilkAyet + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>Sayfa numarası mushaf baskısına göre değişebildiği için verilmemiştir. Ayet ve cüz bilgisi Hafs rivayetine ve yaygın cüz taksimine göredir.</p>

      <h2 id="komsu">Önceki ve sonraki sure</h2>
      <ul className="tool-hub-list">
        {onceki && (
          <li>
            <Link href={`/sureler/${onceki.slug}${SUFFIX}`}>
              ← {onceki.no}. {onceki.ad} ({onceki.ayet} ayet)
            </Link>
          </li>
        )}
        {sonraki && (
          <li>
            <Link href={`/sureler/${sonraki.slug}${SUFFIX}`}>
              {sonraki.no}. {sonraki.ad} ({sonraki.ayet} ayet) →
            </Link>
          </li>
        )}
      </ul>
      {ayniCuz.length > 0 && (
        <>
          <h3>Aynı cüzdeki diğer sureler</h3>
          <ul className="tool-hub-list">
            {ayniCuz.map((x) => (
              <li key={x.no}>
                <Link href={`/sureler/${x.slug}${SUFFIX}`}>
                  {x.ad} Suresi ({x.ayet} ayet)
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </TimeToolPage>
  );
}
