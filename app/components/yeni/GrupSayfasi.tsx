// Grup sayfasi (/hesaplayicilar/<grup>; donusum dahil): baslik, sayi, kisa giris ve alt basliklar altinda
// iki sutunlu duz link listesi.
import { GRUP_ACIKLAMASI } from "./grupAciklamalari";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import "./yeni.css";
import Link from "@/app/components/SiteLink";
import { buildSiteUrl, SITE_NAME } from "../../siteConfig";
import { ALT_GRUPLAR, GRUP_GIRISI, grupRengi, type AnaSayfaGrubu, type AnaSayfaLinki } from "./anaSayfaVerisi";
import { GrupIkonu } from "./grupIkonlari";

export type GrupTuru = "hesap" | "birim";

const KOK = { hesap: "/hesaplayicilar", birim: "/ceviriciler" } as const;
/** "Finans araçları"; "Diğer" ile tamlama kurulmaz: "Diğer araçlar". */
const baslik = (tur: GrupTuru, ad: string) => (tur === "hesap" ? (ad === "Diğer" ? "Diğer araçlar" : `${ad} araçları`) : `${ad} birim çeviricileri`);
const birimAdi = (tur: GrupTuru) => (tur === "hesap" ? "araç" : "çevirici");

export const grupYolu = (tur: GrupTuru, slug: string) => `${KOK[tur]}/${slug}`;

export function grupMetadata(tur: GrupTuru, grup: AnaSayfaGrubu): Metadata {
  const yol = grupYolu(tur, grup.slug);
  const aciklama = GRUP_GIRISI[grup.slug] ?? `${grup.ad} için ${grup.linkler.length} ${birimAdi(tur)}.`;
  return {
    title: baslik(tur, grup.ad),
    description: aciklama,
    alternates: { canonical: yol },
    openGraph: { title: `${baslik(tur, grup.ad)} | ${SITE_NAME}`, description: aciklama, url: buildSiteUrl(yol), siteName: SITE_NAME, locale: "tr_TR", type: "website" },
  };
}

function LinkListesi({ linkler }: { linkler: readonly AnaSayfaLinki[] }) {
  return (
    <ul className="yy-duz-liste">
      {linkler.map((l) => (
        <li key={l.href}>
          <Link href={l.href}>{l.ad}</Link>
        </li>
      ))}
    </ul>
  );
}

export default function GrupSayfasi({
  tur,
  grup,
  digerGruplar,
  altGruplar: verilenAltGruplar,
}: {
  tur: GrupTuru;
  grup: AnaSayfaGrubu;
  digerGruplar: readonly AnaSayfaGrubu[];
  altGruplar?: readonly { ad: string; hrefler: readonly string[] }[];
}) {
  const ust = tur === "hesap" ? { href: "/hesaplayicilar", ad: "Hesaplama araçları" } : { href: "/tum-birimler", ad: "Birim çeviriciler" };
  const bul = (href: string) => grup.linkler.find((l) => l.href === href)!;
  const altGruplar = verilenAltGruplar ?? ALT_GRUPLAR[grup.slug];
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
        <ol className="yy-yol" aria-label="Sayfa yolu">
          <li>
            <Link href="/">Ana sayfa</Link>
          </li>
          <li>
            <Link href={ust.href}>{ust.ad}</Link>
          </li>
          <li aria-current="page">{grup.ad}</li>
        </ol>
        <h1>
          <span className="yy-grup-ikon">
            <GrupIkonu slug={grup.slug} />
          </span>
          {baslik(tur, grup.ad)}
        </h1>
        <p className="yy-grup-sayi">
          {grup.linkler.length} {birimAdi(tur)}
        </p>
        {GRUP_GIRISI[grup.slug] && <p className="yy-grup-giris">{GRUP_GIRISI[grup.slug]}</p>}

        {altGruplar ? (
          altGruplar.map((a) => (
            <section key={a.ad}>
              <h2>{a.ad}</h2>
              <LinkListesi linkler={a.hrefler.map(bul)} />
            </section>
          ))
        ) : (
          <section>
            <LinkListesi linkler={grup.linkler} />
          </section>
        )}

        {GRUP_ACIKLAMASI[grup.slug] && (
          <section className="yy-grup-aciklama">
            <h2>{GRUP_ACIKLAMASI[grup.slug].baslik}</h2>
            {GRUP_ACIKLAMASI[grup.slug].paragraflar.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </section>
        )}

        <nav className="yy-diger-gruplar" aria-label="Diğer gruplar">
          <h2>Diğer gruplar</h2>
          <p>
            {digerGruplar
              .filter((g) => g.slug !== grup.slug)
              .map((g, i) => (
                <span key={g.slug}>
                  {i > 0 && " · "}
                  <Link href={grupYolu(tur, g.slug)}>{g.ad}</Link>
                </span>
              ))}
          </p>
        </nav>
      </main>
    </div>
  );
}
