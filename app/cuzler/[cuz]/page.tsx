import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/app/components/SiteLink";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { cuzIcerigi } from "../../converter/sureler";
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

  const faqItems: FaqItem[] = [
    { question: `${n}. cüzde hangi sureler var?`, answer: `${n}. cüz şunları içerir: ${parcalar.map(aralik).join(", ")}.` },
    { question: `${n}. cüz hangi ayetten başlar?`, answer: `${ilk.sure.ad} Suresi ${ilk.ilkAyet}. ayetten başlar ve ${son.sure.ad} Suresi ${son.sonAyet}. ayette biter.` },
    { question: `${n}. cüz kaç ayet?`, answer: `${n}. cüzde ${ayet} ayet vardır.` },
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
        { id: "diger", label: "Diğer cüzler" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
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
      <p>Sayfa numarası mushaf baskısına göre değişebildiği için verilmemiştir. Cüz başlangıçları Hafs rivayetine ve yaygın cüz taksimine göredir.</p>
    </TimeToolPage>
  );
}
