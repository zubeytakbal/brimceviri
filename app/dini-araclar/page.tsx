import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { DINI_ARACLAR_PATH, diniAraclar } from "../i18n/diniAraclar";
import { ISLAMIC_HUB_ALTERNATES } from "../i18n/islamicToolPaths";
import { buildSiteUrl } from "../siteConfig";

const title = "Dini Araçlar: Kıble Pusulası, Kaza Namazı, Zekât, Hatim";
const description = "Canlı kıble pusulası, kaza namazı ve orucu, zekât, hatim ve hafızlık planı, seferî mesafe, zikirmatik, Esmaül Hüsna ve daha fazlası: ücretsiz dini araçlar.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: DINI_ARACLAR_PATH, languages: ISLAMIC_HUB_ALTERNATES },
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
            Hesaplamaya dayalı dini araçlar: kıble pusulası, kaza namazı ve orucu, zekât, hatim ve hafızlık, seferî mesafe, sure ve cüz bilgileri. Araçlar değişmeyen
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
