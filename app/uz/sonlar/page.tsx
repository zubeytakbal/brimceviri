import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import NumberFactsCalculator from "../../components/NumberFactsCalculator";
import { getNumberFacts } from "../../converter/numberFacts";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/sonlar";

export const metadata: Metadata = {
  title: "Son Xossalari: Tub Sonlar, Kvadrat va Bo'luvchilar",
  description:
    "Istalgan sonni yozing: tub son ekanligi, bo'luvchilari, kvadrati, kubi, kvadrat ildizi va Rim raqami darhol chiqadi. 1-100 oralig'idagi tub sonlar va to'liq kvadratlar jadvali.",
  alternates: {
    canonical: pagePath,
    ...buildFullLanguageAlternates(pagePath),
  },
  openGraph: {
    title: "Son Xossalari: Tub Sonlar, Kvadrat va Bo'luvchilar",
    description: "Istalgan sonning tub son, bo'luvchi, kvadrat va kvadrat ildiz ma'lumotlarini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

const ONE_TO_HUNDRED = Array.from({ length: 100 }, (_, i) => i + 1);
const PRIMES = ONE_TO_HUNDRED.filter((n) => getNumberFacts(n)?.isPrime);
const PERFECT_SQUARES = ONE_TO_HUNDRED.filter((n) => getNumberFacts(n)?.isPerfectSquare);
const MOST_DIVISORS = [...ONE_TO_HUNDRED]
  .map((n) => ({ n, count: getNumberFacts(n)?.divisorCount ?? 0 }))
  .sort((a, b) => b.count - a.count || a.n - b.n)
  .slice(0, 5);

function NumberLink({ n }: { n: number }) {
  return (
    <a href={`?n=${n}#hisoblash`} rel="nofollow">
      {n}
    </a>
  );
}

function joinLinks(list: number[]) {
  return list.map((n, i) => (
    <span key={n}>
      {i > 0 && ", "}
      <NumberLink n={n} />
    </span>
  ));
}

export default function UzbekSonlarHubPage() {
  return (
    <main className="all-conversions-page" lang="uz">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Sonlar</span>
        </nav>

        <header className="all-conversions-header" id="hisoblash">
          <h1>Son Xossalarini Hisoblash</h1>
          <p>
            Sonni yozing: tub son ekanligi, bo&apos;luvchilari, kvadrati, kubi, kvadrat ildizi,
            faktoriali va Rim raqami ko&apos;rinishi darhol chiqadi. 1 dan 1 000 000 gacha bo&apos;lgan
            har bir butun son uchun ishlaydi.
          </p>
        </header>

        <NumberFactsCalculator initialNumber={12} locale="uz" readQuery />

        <section className="category-article-content">
          <h2>1 dan 100 gacha tub sonlar</h2>
          <p>
            1 va 100 oralig&apos;ida {PRIMES.length} ta tub son bor: {joinLinks(PRIMES)}. 2 yagona juft
            tub sondir; 1 esa tub son hisoblanmaydi, chunki uning faqat bitta bo&apos;luvchisi bor.
          </p>

          <h2>1 dan 100 gacha to&apos;liq kvadratlar</h2>
          <p>
            Kvadrat ildizi butun son bo&apos;lgan sonlar: {joinLinks(PERFECT_SQUARES)}. To&apos;liq
            kvadratlarning bo&apos;luvchilari soni doim toq bo&apos;ladi, chunki ildiz o&apos;zi bilan juft hosil qiladi.
          </p>

          <h2>Eng ko&apos;p bo&apos;luvchiga ega sonlar (1-100)</h2>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">Son</th>
                  <th scope="col">Bo&apos;luvchilar soni</th>
                  <th scope="col">Bo&apos;luvchilari</th>
                </tr>
              </thead>
              <tbody>
                {MOST_DIVISORS.map(({ n, count }) => (
                  <tr key={n}>
                    <th scope="row">
                      <NumberLink n={n} />
                    </th>
                    <td>{count}</td>
                    <td>{getNumberFacts(n)?.divisors.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Mukammal sonlar</h2>
          <p>
            O&apos;zidan boshqa bo&apos;luvchilarining yig&apos;indisi o&apos;ziga teng bo&apos;lgan son mukammal son
            deyiladi. 1 000 000 gacha to&apos;rttasi bor: <NumberLink n={6} /> (1+2+3),{" "}
            <NumberLink n={28} /> (1+2+4+7+14), <NumberLink n={496} /> va <NumberLink n={8128} />.
          </p>

          <h2>Son tub ekanligi qanday aniqlanadi?</h2>
          <p>
            Sonni kvadrat ildizidan kichik yoki unga teng tub sonlarga bo&apos;lib ko&apos;rish yetarli.
            Masalan, 97 uchun √97 ≈ 9,8, shuning uchun 2, 3, 5 va 7 ga bo&apos;linishi tekshiriladi;
            hech biriga qoldiqsiz bo&apos;linmagani uchun 97 tub sondir. Hisoblagich bu tekshiruvni har
            bir son uchun o&apos;zi bajaradi va natijani sababi bilan ko&apos;rsatadi.
          </p>
        </section>
      </div>
    </main>
  );
}
