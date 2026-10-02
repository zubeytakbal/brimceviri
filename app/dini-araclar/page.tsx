import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { DINI_ARACLAR_PATH, diniAraclar } from "../i18n/diniAraclar";
import { buildSiteUrl } from "../siteConfig";

const title = "Dini Araçlar: Seferî Mesafe, Sure Bulucu, Kaza Orucu";
const description = "Seferî mesafe hesaplama, sure bulucu, umre tavaf ve sa'y mesafesi, kaza orucu, Hicri takvim ve kandiller: hesaplamaya dayalı ücretsiz dini araçlar.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: DINI_ARACLAR_PATH },
  openGraph: { title, description, url: buildSiteUrl(DINI_ARACLAR_PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

export default function DiniAraclarPage() {
  return (
    <main className="other-categories-page">
      <div className="directory-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Dini Araçlar</span>
        </nav>

        <header className="other-categories-header">
          <h1>Dini Araçlar</h1>
          <p>
            Hesaplamaya dayalı dini araçlar: seferî mesafe, sure ve cüz bilgileri, umre yürüyüş mesafesi ve kaza orucu. Araçlar değişmeyen
            kurallarla ve sabit verilerle çalışır; yıldan yıla değişen tutarlar ve vakitler bu sayfada yer almaz. Dini hükümlerle ilgili
            ayrıntılar için Diyanet İşleri Başkanlığı'na başvurabilirsiniz.
          </p>
        </header>

        <ul className="tool-hub-list dini-hub-list">
          {diniAraclar.map((tool) => (
            <li key={tool.href}>
              <Link href={tool.href}>
                <span>{tool.label}</span>
                <small>{tool.description}</small>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
