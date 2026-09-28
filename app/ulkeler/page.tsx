import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { worldRegionPages } from "../converter/geo/worldRegions";
import { timeDiffWithTurkey } from "../converter/geo/worldGeo";
import { worldCountries } from "../converter/geo/worldCountries";
import { buildSiteUrl } from "../siteConfig";

export const revalidate = 86400;

const path = "/ulkeler";
const title = "Ülkeler ve Başkentleri: 196 Ülkenin Tam Listesi";
const description =
  "Dünya ülkeleri ve başkentleri kıtalara göre tam liste: yüzölçümü, Türkiye ile saat farkı ve her ülke için ayrıntılı sayfa. Avrupa, Asya, Afrika, Amerika ve Okyanusya ülkeleri.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const REGIONS = ["Avrupa", "Asya", "Afrika", "Amerika", "Okyanusya"];

const faqItems: FaqItem[] = [
  {
    question: "Hangi kıtada en çok ülke var?",
    answer: `Afrika ${worldCountries.filter((c) => c.region === "Afrika").length} ülkeyle en çok ülkeye sahip kıtadır; ardından Avrupa ve Asya gelir.`,
  },
  {
    question: "Başkenti en kalabalık şehri olmayan ülkeler hangileri?",
    answer:
      "Birçok ülkenin başkenti en büyük şehri değildir: Türkiye (Ankara, en büyük şehir İstanbul), ABD (Washington, New York), Avustralya (Canberra, Sidney), Kanada (Ottawa, Toronto), Brezilya (Brasilia, São Paulo) ve Kazakistan (Astana, Almatı) bunlara örnektir.",
  },
  {
    question: "Birden fazla başkenti olan ülkeler var mı?",
    answer:
      "Evet. Güney Afrika'nın üç başkenti vardır: Pretoria (yürütme), Cape Town (yasama) ve Bloemfontein (yargı). Bolivya'da anayasal başkent Sucre, hükümet merkezi La Paz'dır; Hollanda'nın başkenti Amsterdam, hükümet merkezi Lahey'dir.",
  },
];

export default function CountriesPage() {
  const now = new Date();
  const diffText = (m: number) => (m === 0 ? "0" : `${m > 0 ? "+" : "−"}${(Math.abs(m) / 60).toLocaleString("tr-TR", { maximumFractionDigits: 2 })} sa`);
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/cografya-hesaplamalari", label: "Coğrafya Hesaplamaları" },
        { href: path, label: "Ülkeler" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Ülkeler ve Başkentleri"
      intro={`Dünyadaki ${worldCountries.length} ülkenin başkenti, yüzölçümü ve Türkiye ile saat farkı. Ayrıntılar için ülkenin adına tıklayın ya da dünya haritasını kullanın.`}
      tool={
        <div className="country-region-nav">
          {REGIONS.map((r) => (
            <a key={r} href={`#${r.toLocaleLowerCase("tr-TR")}`} className="time-tool-button is-secondary">
              {r} ({worldCountries.filter((c) => c.region === r).length})
            </a>
          ))}
          <Link href="/dunya-haritasi" className="time-tool-button">
            🗺️ Dünya haritası
          </Link>
        </div>
      }
      related={{
        title: "İlginizi çekebilir",
        links: [{ href: "/dunya-haritasi", label: "Dünya Haritası" }, ...worldRegionPages.map((r) => ({ href: `/bolge-haritalari/${r.id}`, label: r.title })), { href: "/dunya-saatleri", label: "Dünya Saatleri" }],
      }}
      tocTitle="İçindekiler"
      tocItems={[...REGIONS.map((r) => ({ id: r.toLocaleLowerCase("tr-TR"), label: `${r} ülkeleri ve başkentleri` })), { id: "faq", label: "Sık sorulan sorular" }]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      {REGIONS.map((r) => {
        const list = worldCountries.filter((c) => c.region === r).sort((a, b) => a.nameTr.localeCompare(b.nameTr, "tr"));
        return (
          <div key={r}>
            <h2 id={r.toLocaleLowerCase("tr-TR")}>
              {r} ülkeleri ve başkentleri ({list.length})
            </h2>
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th scope="col">Ülke</th>
                    <th scope="col">Başkent</th>
                    <th scope="col">Yüzölçümü</th>
                    <th scope="col">Saat farkı</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((c) => (
                    <tr key={c.iso3}>
                      <td>
                        <Link href={`/ulkeler/${c.id}`} prefetch={false}>
                          {c.flag} {c.nameTr}
                        </Link>
                      </td>
                      <td>{c.capital}</td>
                      <td>{c.area.toLocaleString("tr-TR")} km²</td>
                      <td>{diffText(timeDiffWithTurkey(c, now))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
      <p>
        <small>
          Saat farkı, başkentin saatine göre Türkiye&apos;ye (UTC+3) göre verilmiştir ve yaz saati uygulayan ülkelerde yıl içinde değişir. Kaynak:
          mledoze/countries (ODbL), GeoNames.
        </small>
      </p>
    </TimeToolPage>
  );
}
