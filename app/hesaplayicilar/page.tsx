import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import {
  TURKISH_TOOL_HUB_PATH,
  turkishToolGroups,
} from "../i18n/turkishToolDirectory";
import { buildSiteUrl } from "../siteConfig";

const toolCount = turkishToolGroups.reduce((sum, group) => sum + group.links.length, 0);

const description = `Kredi, KDV, maaş, yaş, BMI, tarih, saat, inşaat, enerji ve dosya araçları dahil ${toolCount} ücretsiz hesaplama aracı, konularına göre gruplanmış tek listede.`;

export const metadata: Metadata = {
  title: "Tüm Hesaplama Araçları: Kredi, Maaş, Yaş, Tarih ve Daha Fazlası",
  description,
  alternates: {
    canonical: TURKISH_TOOL_HUB_PATH,
  },
  openGraph: {
    title: "Tüm Hesaplama Araçları",
    description,
    url: buildSiteUrl(TURKISH_TOOL_HUB_PATH),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function HesaplayicilarPage() {
  return (
    <main className="other-categories-page">
      <div className="directory-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Tüm Hesaplamalar</span>
        </nav>

        <header className="other-categories-header">
          <h1>Tüm Hesaplama Araçları</h1>
          <p>
            Sitedeki {toolCount} hesaplama aracını konularına göre grupladık.
            Hepsi ücretsizdir, kayıt istemez ve hesaplamalar tarayıcınızda
            yapılır. Birim çevirmek için{" "}
            <Link href="/tum-birimler">tüm birim dönüşümlerine</Link>, mesleğinize
            özel araçlar için <Link href="/meslekler">mesleğe göre araçlara</Link>{" "}
            bakabilirsiniz.
          </p>
        </header>

        <nav className="tool-hub-jump" aria-label="Gruplar">
          {turkishToolGroups.map((group) => (
            <a href={`#${group.id}`} key={group.id}>
              {group.title}
            </a>
          ))}
        </nav>

        {turkishToolGroups.map((group) => (
          <section className="tool-hub-group" id={group.id} key={group.id}>
            <h2>{group.title}</h2>
            <p>{group.description}</p>
            <ul className="tool-hub-list">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
