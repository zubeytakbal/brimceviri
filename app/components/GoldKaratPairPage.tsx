import type { Metadata } from "next";
import GoldPurityCalculator from "./GoldPurityCalculator";
import TimeToolPage from "./time/TimeToolPage";
import { findKaratPair, karatPairRow, type KaratPair } from "../converter/goldKaratPairs";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const f = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
const pathOf = (pair: KaratPair) => `/en/${pair.slug}`;

export function goldKaratPairMetadata(slug: string): Metadata {
  const pair = findKaratPair(slug)!;
  const path = pathOf(pair);
  return {
    title: seoTitle(pair.title, pair.shortTitle),
    description: pair.description,
    alternates: { canonical: path },
    openGraph: { title: pair.title, description: pair.description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
  };
}

function WeightTable({ pair }: { pair: KaratPair }) {
  const a = `${pair.from}K`;
  const b = `${pair.to}K`;
  const rows = pair.weights.map((w) => ({ w, ...karatPairRow(pair, w) }));
  const kind = pair.to === 24 ? "pure" : pair.to < pair.from ? "down" : "up";
  return (
    <div className="holiday-table-wrap">
      <table className="holiday-table">
        <thead>
          <tr>
            <th scope="col">{a} weight</th>
            {kind === "pure" ? (
              <>
                <th scope="col">Pure gold (24K)</th>
                <th scope="col">Alloy in it</th>
              </>
            ) : kind === "down" ? (
              <>
                <th scope="col">{b} gold made</th>
                <th scope="col">Alloy added</th>
              </>
            ) : (
              <>
                <th scope="col">24K gold to add</th>
                <th scope="col">{b} gold made</th>
                <th scope="col">Same gold as</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.w}>
              <th scope="row">{r.w} g</th>
              {kind === "pure" ? (
                <>
                  <td>{f(r.pure)} g</td>
                  <td>{f(r.w - r.pure)} g</td>
                </>
              ) : kind === "down" ? (
                <>
                  <td>{f(r.same)} g</td>
                  <td>{f(r.addAlloy ?? 0)} g</td>
                </>
              ) : (
                <>
                  <td>{f(r.addGold ?? 0)} g</td>
                  <td>{f(r.w + (r.addGold ?? 0))} g</td>
                  <td>
                    {f(r.same)} g {b}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function GoldKaratPairPage({ slug }: { slug: string }) {
  const pair = findKaratPair(slug)!;
  const path = pathOf(pair);
  return (
    <TimeToolPage
      crumbs={[
        { href: "/en", label: "Home" },
        { href: "/en/gold-karat-calculator", label: "Gold Karat Calculator" },
        { href: path, label: pair.h1 },
      ]}
      crumbLabel="Breadcrumb"
      title={pair.h1}
      intro={pair.intro}
      tool={<GoldPurityCalculator lang="en" defaultBasis="karat" defaultKarat={pair.from} defaultTarget={pair.to} />}
      related={{ title: "Related gold tools", links: pair.related }}
      tocTitle="Contents"
      tocItems={[
        { id: "table", label: `${pair.from}K to ${pair.to}K table` },
        ...pair.sections.map((s) => ({ id: s.id, label: s.heading })),
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqTitle="Frequently asked questions"
      faqItems={pair.faq}
    >
      <h2 id="table">
        {pair.from}K to {pair.to}K table
      </h2>
      <WeightTable pair={pair} />
      {pair.sections.map((s) => (
        <section key={s.id}>
          <h2 id={s.id}>{s.heading}</h2>
          {s.paragraphs.map((t) => (
            <p key={t.slice(0, 40)}>{t}</p>
          ))}
        </section>
      ))}
      <p>
        <small>Calculated with karat ÷ 24 (22K = 91.67%). Hallmarks round slightly differently (916, 750, 585); switch the calculator to the hallmark basis to match a buyer who prices by the stamp.</small>
      </p>
    </TimeToolPage>
  );
}
