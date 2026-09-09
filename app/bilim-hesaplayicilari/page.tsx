import type { Metadata } from "next";
import Link from "next/link";
import { DecorativeIcon } from "../components/siteIcons";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Bilim Hesaplayıcıları",
  description:
    "Kimya, fizik ve diğer fen derslerine yönelik hesaplayıcıları bir arada bulun.",
  alternates: {
    canonical: "/bilim-hesaplayicilari",
  },
  openGraph: {
    title: "Bilim Hesaplayıcıları",
    description:
      "Kimya, fizik ve diğer fen derslerine yönelik hesaplayıcıları bir arada bulun.",
    url: buildSiteUrl("/bilim-hesaplayicilari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

const categories = [
  {
    id: "fizik",
    href: "/bilim-hesaplayicilari/fizik",
    title: "Fizik",
    description:
      "Eğik atış, hareket, kuvvet ve daha fazlası.",
    iconName: "physicsCalculator" as const,
  },
  {
    id: "kimya",
    href: "/bilim-hesaplayicilari/kimya",
    title: "Kimya",
    description:
      "Mol, molarite, pH, stokiyometri ve daha fazlası.",
    iconName: "chemistryCalculator" as const,
  },
  {
    id: "matematik",
    href: "/bilim-hesaplayicilari/matematik",
    title: "Matematik",
    description:
      "EBOB-EKOK, olasılık, türev, denklem çözme ve daha fazlası.",
    iconName: "mathCalculator" as const,
  },
  {
    id: "geometri",
    href: "/bilim-hesaplayicilari/geometri",
    title: "Geometri",
    description:
      "Pisagor teoremi, alan, çevre, hacim ve daha fazlası.",
    iconName: "geometryCalculator" as const,
  },
];

const siPrefixTable = [
  ["Tera", "T", "10¹²"],
  ["Giga", "G", "10⁹"],
  ["Mega", "M", "10⁶"],
  ["Kilo", "k", "10³"],
  ["Hekto", "h", "10²"],
  ["Deka", "da", "10¹"],
  ["Desi", "d", "10⁻¹"],
  ["Santi", "c", "10⁻²"],
  ["Mili", "m", "10⁻³"],
  ["Mikro", "µ", "10⁻⁶"],
  ["Nano", "n", "10⁻⁹"],
  ["Piko", "p", "10⁻¹²"],
];

export default function BilimHesaplayicilariHubPage() {
  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Bilim Hesaplayıcıları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Bilim Hesaplayıcıları</h1>
          <p>
            Öğrenciler için fizik, kimya, matematik ve geometri
            hesaplayıcıları — 35&apos;ten fazla araç tek yerde. Liste
            zamanla büyüyecek.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>1 kilo-</strong> (k) = 10³, <strong>1 mega-</strong>{" "}
              (M) = 10⁶
            </li>
            <li>
              <strong>1 mili-</strong> (m) = 10⁻³, <strong>1 mikro-</strong>{" "}
              (µ) = 10⁻⁶
            </li>
            <li>35+ fizik, kimya, matematik ve geometri hesaplayıcısı</li>
          </ul>
        </div>

        <section className="other-categories-section">
          <div className="directory-home-category-grid">
            {categories.map((category) => (
              <Link
                className="directory-home-card"
                href={category.href}
                key={category.id}
                aria-label={`${category.title} - ${category.description}`}
              >
                <div className="directory-card-body directory-card-body-icon">
                  <span className="home-category-icon-box" aria-hidden="true">
                    <DecorativeIcon
                      name={category.iconName}
                      size={48}
                      className="home-category-icon-svg"
                    />
                  </span>
                  <h3 className="home-category-title">{category.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="category-article-content">
          <h2>SI Önekleri (Kilo, Mega, Mili, Mikro...)</h2>
          <p>
            Fizik ve kimya derslerinde sıkça karşılaşılan SI
            (Uluslararası Birim Sistemi) önekleri ve kaç katı ifade
            ettikleri:
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>SI önekleri ve ondalık karşılıkları</caption>
              <thead>
                <tr>
                  <th scope="col">Önek</th>
                  <th scope="col">Simge</th>
                  <th scope="col">Çarpan</th>
                </tr>
              </thead>
              <tbody>
                {siPrefixTable.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Örneğin 1 kilometre (km) = 10³ metre = 1000 metre, 1
            milimetre (mm) = 10⁻³ metre. Bu önekler yalnızca uzunlukta
            değil; kütle (kg, mg), hacim (kL, mL), elektrik (kV, mA) ve
            diğer tüm SI birimlerinde aynı mantıkla kullanılır.
          </p>
        </section>
      </div>
    </main>
  );
}
