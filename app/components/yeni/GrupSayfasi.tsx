// Grup sayfasi (/hesaplayicilar/<grup>, /ceviriciler/<grup>): o gruptaki butun araclar, kisa aciklamalariyla.
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import "./yeni.css";
import Link from "@/app/components/SiteLink";
import { buildSiteUrl, SITE_NAME } from "../../siteConfig";
import type { AnaSayfaGrubu } from "./anaSayfaVerisi";
import { grupRengi } from "./anaSayfaVerisi";

export type GrupTuru = "hesap" | "birim";
export type GrupOgesi = { href: string; ad: string; aciklama?: string };

const KOK = { hesap: "/hesaplayicilar", birim: "/ceviriciler" } as const;
const baslik = (tur: GrupTuru, ad: string) => (tur === "hesap" ? `${ad} hesaplayıcıları` : `${ad} birim çeviricileri`);

export const grupYolu = (tur: GrupTuru, slug: string) => `${KOK[tur]}/${slug}`;

export function grupMetadata(tur: GrupTuru, grup: AnaSayfaGrubu): Metadata {
  const yol = grupYolu(tur, grup.slug);
  const aciklama = `${grup.linkler.slice(0, 4).map((l) => l.ad).join(", ")} ve diğer ${grup.ad.toLocaleLowerCase("tr-TR")} araçları; ücretsiz ve Türkçe.`;
  return {
    title: baslik(tur, grup.ad),
    description: aciklama,
    alternates: { canonical: yol },
    openGraph: { title: `${baslik(tur, grup.ad)} | ${SITE_NAME}`, description: aciklama, url: buildSiteUrl(yol), siteName: SITE_NAME, locale: "tr_TR", type: "website" },
  };
}

export default function GrupSayfasi({
  tur,
  grup,
  ogeler,
  digerGruplar,
}: {
  tur: GrupTuru;
  grup: AnaSayfaGrubu;
  ogeler: GrupOgesi[];
  digerGruplar: readonly AnaSayfaGrubu[];
}) {
  const ust = tur === "hesap" ? { href: "/hesaplayicilar", ad: "Hesaplayıcılar" } : { href: "/tum-birimler", ad: "Birim çeviriciler" };
  const yolSemasi = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: ust.ad, item: buildSiteUrl(ust.href) },
      { "@type": "ListItem", position: 3, name: grup.ad, item: buildSiteUrl(grupYolu(tur, grup.slug)) },
    ],
  };
  return (
    <div className="yy yy-sayfa">
      <main className="yy-grup-sayfasi" style={{ "--g": grupRengi(grup.slug) } as CSSProperties}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(yolSemasi).replace(/</g, "\\u003c") }} />
        <header>
          <ol className="yy-yol" aria-label="Sayfa yolu">
            <li>
              <Link href="/">Ana sayfa</Link>
            </li>
            <li>
              <Link href={ust.href}>{ust.ad}</Link>
            </li>
            <li aria-current="page">{grup.ad}</li>
          </ol>
          <h1>{baslik(tur, grup.ad)}</h1>
          <p className="yy-kurumsal-ozet">
            Bu grupta {ogeler.length} {tur === "hesap" ? "hesaplayıcı" : "çevirici"} var. İstediğinizi seçin; hepsi
            ücretsiz ve üyelik gerektirmez.
          </p>
        </header>
        <ul className="yy-grup-listesi">
          {ogeler.map((o) => (
            <li key={o.href}>
              <Link href={o.href}>{o.ad}</Link>
              {o.aciklama && <p>{o.aciklama}</p>}
            </li>
          ))}
        </ul>
        <nav className="yy-diger-gruplar" aria-label="Diğer gruplar">
          <h2>Diğer gruplar</h2>
          <ul>
            {digerGruplar
              .filter((g) => g.slug !== grup.slug)
              .map((g) => (
                <li key={g.slug} style={{ "--g": grupRengi(g.slug) } as CSSProperties}>
                  <Link href={grupYolu(tur, g.slug)}>{g.ad}</Link>
                </li>
              ))}
          </ul>
        </nav>
      </main>
    </div>
  );
}
