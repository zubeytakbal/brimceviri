import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/app/components/SiteLink";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { CUZ_BASLANGIC, SURELER, cuzIcerigi } from "../../converter/sureler";
import { CUZ_CEYREKLERI, SAYFA_BASLANGIC, SECDE_AYETLERI, SURE_META } from "../../converter/sureMeta";
import { diniRelated } from "../../i18n/diniAraclar";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: 30 }, (_, i) => ({ cuz: `${i + 1}-cuz` }));
}

function numara(param: string) {
  const m = /^(\d{1,2})-cuz$/.exec(param);
  const n = m ? Number(m[1]) : Number.NaN;
  return n >= 1 && n <= 30 ? n : null;
}

const once = (a: [number, number], b: [number, number]) => a[0] < b[0] || (a[0] === b[0] && a[1] <= b[1]);

/** Medine mushafında (604 sayfa) [sure, ayet] konumunun bulunduğu sayfa. */
function sayfa(konum: [number, number]) {
  let n = 1;
  for (let i = 0; i < SAYFA_BASLANGIC.length; i++) if (once(SAYFA_BASLANGIC[i], konum)) n = i + 1;
  return n;
}

const aralik = (p: ReturnType<typeof cuzIcerigi>[number]) =>
  p.ilkAyet === 1 && p.sonAyet === p.sure.ayet ? `${p.sure.ad} (tamamı)` : `${p.sure.ad} ${p.ilkAyet}–${p.sonAyet}`;

export async function generateMetadata({ params }: { params: Promise<{ cuz: string }> }): Promise<Metadata> {
  const n = numara((await params).cuz);
  if (!n) return {};
  const parcalar = cuzIcerigi(n);
  const ilk = parcalar[0];
  const son = parcalar[parcalar.length - 1];
  const title = `${n}. Cüz Hangi Sureler? ${ilk.sure.ad} ${ilk.ilkAyet} – ${son.sure.ad} ${son.sonAyet}`;
  const description = `Kur'an-ı Kerim ${n}. cüz ${ilk.sure.ad} Suresi ${ilk.ilkAyet}. ayetten başlar, ${son.sure.ad} Suresi ${son.sonAyet}. ayette biter. İçerdiği ${parcalar.length} sure ve ayet aralıkları.`;
  const path = `/cuzler/${n}-cuz`;
  return {
    title: seoTitle(title, `${n}. Cüz Hangi Sureler?`),
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "article" },
  };
}

export default async function CuzPage({ params }: { params: Promise<{ cuz: string }> }) {
  const n = numara((await params).cuz);
  if (!n) notFound();
  const parcalar = cuzIcerigi(n);
  const ilk = parcalar[0];
  const son = parcalar[parcalar.length - 1];
  const ayet = parcalar.reduce((sum, p) => sum + p.sonAyet - p.ilkAyet + 1, 0);
  const path = `/cuzler/${n}-cuz`;
  const sayfaBas = sayfa(CUZ_BASLANGIC[n - 1]);
  const sayfaSon = n < 30 ? sayfa(CUZ_BASLANGIC[n]) - 1 : SAYFA_BASLANGIC.length;
  const baslayan = parcalar.filter((p) => p.ilkAyet === 1).map((p) => p.sure);
  const biten = parcalar.filter((p) => p.sonAyet === p.sure.ayet).map((p) => p.sure);
  const mekki = parcalar.filter((p) => SURE_META[p.sure.no].mekki).length;
  const secdeler = SECDE_AYETLERI.filter(([no, a]) => parcalar.some((p) => p.sure.no === no && a >= p.ilkAyet && a <= p.sonAyet));
  const sureAdi = (no: number) => SURELER[no - 1].ad;

  const faqItems: FaqItem[] = [
    { question: `${n}. cüzde hangi sureler var?`, answer: `${n}. cüz şunları içerir: ${parcalar.map(aralik).join(", ")}.` },
    { question: `${n}. cüz hangi ayetten başlar?`, answer: `${ilk.sure.ad} Suresi ${ilk.ilkAyet}. ayetten başlar ve ${son.sure.ad} Suresi ${son.sonAyet}. ayette biter.` },
    { question: `${n}. cüz kaç ayet?`, answer: `${n}. cüzde ${ayet} ayet vardır.` },
    {
      question: `${n}. cüz kaç sayfa?`,
      answer: `Medine mushafında (604 sayfa) ${n}. cüz ${sayfaBas}–${sayfaSon}. sayfalar arasındadır, ${sayfaSon - sayfaBas + 1} sayfadır.`,
    },
  ];

  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/sure-bulucu", label: "Sure Bulucu" },
        { href: path, label: `${n}. Cüz` },
      ]}
      crumbLabel="Sayfa yolu"
      title={`${n}. Cüz`}
      intro={`${n}. cüz ${ilk.sure.ad} Suresi ${ilk.ilkAyet}. ayetten başlar, ${son.sure.ad} Suresi ${son.sonAyet}. ayette biter: ${parcalar.length} sure, ${ayet} ayet.`}
      tool={
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Sure</th>
                <th scope="col">Ayetler</th>
                <th scope="col">Ayet sayısı</th>
              </tr>
            </thead>
            <tbody>
              {parcalar.map((p) => (
                <tr key={p.sure.no}>
                  <td>
                    <Link href={`/sureler/${p.sure.slug}-suresi`}>
                      {p.sure.no}. {p.sure.ad}
                    </Link>
                  </td>
                  <td>
                    {p.ilkAyet}–{p.sonAyet}
                    {p.ilkAyet === 1 && p.sonAyet === p.sure.ayet ? " (tamamı)" : ""}
                  </td>
                  <td>{p.sonAyet - p.ilkAyet + 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
      related={{ title: "Diğer dini araçlar", links: diniRelated("/sure-bulucu") }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "hakkinda", label: `${n}. cüz hakkında` },
        { id: "ceyrek", label: "Hizipler ve çeyrekler" },
        { id: "diger", label: "Diğer cüzler" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="hakkinda">{n}. cüz hakkında</h2>
      <p>
        {n}. cüz Medine mushafında (604 sayfa) {sayfaBas}–{sayfaSon}. sayfalar arasındadır ({sayfaSon - sayfaBas + 1} sayfa) ve{" "}
        {2 * n - 1}. ile {2 * n}. hizipleri kapsar. İçindeki {parcalar.length} surenin{" "}
        {mekki === parcalar.length ? "hepsi Mekkî" : mekki === 0 ? "hepsi Medenî" : `${mekki} tanesi Mekkî, ${parcalar.length - mekki} tanesi Medenî`}.{" "}
        {baslayan.length > 0 ? `Bu cüzde başlayan sureler: ${baslayan.map((x) => x.ad).join(", ")}. ` : `Bu cüzde yeni başlayan sure yoktur; ${ilk.sure.ad} Suresi'nin devamıyla açılır. `}
        {biten.length > 0 ? `Bu cüzde tamamlanan sureler: ${biten.map((x) => x.ad).join(", ")}.` : `Bu cüzde tamamlanan sure yoktur; ${son.sure.ad} Suresi sonraki cüzde devam eder.`}{" "}
        {secdeler.length > 0
          ? `Cüzde ${secdeler.length} secde ayeti var: ${secdeler.map(([no, a]) => `${sureAdi(no)} ${a}`).join(", ")}.`
          : "Cüzde secde ayeti yoktur."}{" "}
        Ramazan mukabelesinde her gün bir cüz okunduğu için {n}. cüz Ramazan&apos;ın {n}. günü okunur. Okuma planı için{" "}
        <Link href="/hatim-hesaplama">hatim hesaplama</Link> aracı kullanılabilir.
      </p>

      <h2 id="ceyrek">Hizipler ve çeyrekler</h2>
      <p>Her cüz iki hizip, her hizip dört çeyrekten (rub) oluşur. {n}. cüzün çeyreklerinin başladığı ayetler:</p>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Çeyrek</th>
              <th scope="col">Başladığı ayet</th>
              <th scope="col">Sayfa</th>
            </tr>
          </thead>
          <tbody>
            {CUZ_CEYREKLERI[n - 1].map(([no, a], i) => (
              <tr key={`${no}-${a}`}>
                <td>
                  {i < 4 ? 2 * n - 1 : 2 * n}. hizip, {(i % 4) + 1}. çeyrek
                </td>
                <td>
                  {sureAdi(no)} {a}
                </td>
                <td>{sayfa([no, a])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="diger">Diğer cüzler</h2>
      <ul className="tool-hub-list">
        {n > 1 && (
          <li>
            <Link href={`/cuzler/${n - 1}-cuz`}>← {n - 1}. cüz</Link>
          </li>
        )}
        {n < 30 && (
          <li>
            <Link href={`/cuzler/${n + 1}-cuz`}>{n + 1}. cüz →</Link>
          </li>
        )}
        <li>
          <Link href="/sure-bulucu">Tüm sureler ve cüzler</Link>
        </li>
      </ul>
      <p>
        Cüz başlangıçları Hafs rivayetine ve yaygın cüz taksimine göredir. Sayfa numaraları 604 sayfalık Medine mushafına
        göredir; başka baskılarda farklı olabilir.
      </p>
    </TimeToolPage>
  );
}
