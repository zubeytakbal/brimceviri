import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import NumberFactsCalculator from "../../../components/NumberFactsCalculator";
import { getNumberFacts } from "../../../converter/numberFacts";
import { buildSiteUrl } from "../../../siteConfig";

export const metadata: Metadata = {
  title: "Sayı Özellikleri Hesaplama: Asal mı, Bölenleri, Karesi",
  description:
    "1 ile 1.000.000 arasındaki herhangi bir sayının asal olup olmadığını, bölenlerini, karesini, küpünü, karekökünü ve Romen rakamını anında hesapla. 1-100 asal sayılar ve tam kareler tablosu.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik/sayilar",
  },
  openGraph: {
    title: "Sayı Özellikleri Hesaplama: Asal mı, Bölenleri, Karesi",
    description: "Herhangi bir sayının asallık, bölen, kare ve karekök bilgilerini anında hesapla.",
    url: buildSiteUrl("/bilim-hesaplayicilari/matematik/sayilar"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
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
    <a href={`?n=${n}#hesapla`} rel="nofollow">
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

export default function SayilarHubPage() {
  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari">Bilim Hesaplayıcıları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari/matematik">Matematik</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Sayılar</span>
        </nav>

        <header className="all-conversions-header" id="hesapla">
          <h1>Sayı Özellikleri Hesaplama</h1>
          <p>
            Bir sayı yaz; asal olup olmadığı, bölenleri, karesi, küpü, karekökü,
            faktöriyeli ve Romen rakamı karşılığı anında çıkar. 1 ile 1.000.000
            arasındaki her tam sayı için çalışır.
          </p>
        </header>

        <NumberFactsCalculator initialNumber={12} readQuery />

        <section className="category-article-content">
          <h2>1&apos;den 100&apos;e kadar asal sayılar</h2>
          <p>
            1 ile 100 arasında {PRIMES.length} asal sayı vardır: {joinLinks(PRIMES)}. 2 tek
            çift asal sayıdır; 1 ise asal sayılmaz, çünkü yalnızca bir böleni vardır.
          </p>

          <h2>1&apos;den 100&apos;e kadar tam kareler</h2>
          <p>
            Karekökü tam sayı olan sayılar: {joinLinks(PERFECT_SQUARES)}. Tam karelerin bölen
            sayısı her zaman tektir, çünkü kökü kendisiyle eşleşir.
          </p>

          <h2>En çok böleni olan sayılar (1-100)</h2>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">Sayı</th>
                  <th scope="col">Bölen sayısı</th>
                  <th scope="col">Bölenleri</th>
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

          <h2>Mükemmel sayılar</h2>
          <p>
            Kendisi hariç bölenlerinin toplamı kendisine eşit olan sayılara mükemmel sayı
            denir. 1.000.000&apos;a kadar dört tane vardır: <NumberLink n={6} /> (1+2+3),{" "}
            <NumberLink n={28} /> (1+2+4+7+14), <NumberLink n={496} /> ve <NumberLink n={8128} />.
          </p>

          <h2>Bir sayının asal olup olmadığı nasıl anlaşılır?</h2>
          <p>
            Sayının karekökünden küçük ya da eşit asal sayılara bölünüp bölünmediğine bakmak
            yeterlidir. Örneğin 97 için √97 ≈ 9,8 olduğundan 2, 3, 5 ve 7&apos;ye bakılır; hiçbiri
            tam bölmediği için 97 asaldır. Hesaplayıcı bu denetimi her sayı için kendisi yapar ve
            sonucu gerekçesiyle gösterir.
          </p>

          <h2>İlginizi Çekebilir</h2>
          <p>
            Ortalama, medyan, mod ve standart sapma için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/ortalama-hesaplama">Ortalama Hesaplama</Link>,{" "}
            olasılık için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/olasilik-hesaplama">Olasılık Hesaplama</Link>,{" "}
            aritmetik/geometrik diziler için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/aritmetik-dizi-hesaplama">Aritmetik Dizi Hesaplama</Link>
            {" "}sayfasına, tüm matematik araçlarını görmek için{" "}
            <Link href="/bilim-hesaplayicilari/matematik">Matematik Hesaplayıcıları</Link>
            {" "}ana sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
