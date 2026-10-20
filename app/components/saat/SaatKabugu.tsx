import type { ReactNode } from "react";
import Link from "@/app/components/SiteLink";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { trSaatSehirleri } from "../../converter/time/worldCities";
import { ulkeSaatleri } from "../../converter/time/ulkeSaatDilimleri";
import { buildSiteUrl } from "../../siteConfig";
import { SAAT_MENUSU } from "./saatBolumu";
import { saatEski, saatFraktur, saatGazete, saatMetin, saatRakam } from "./saatFontlari";
import SaatUstMenu from "./SaatUstMenu";

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const POPULER = ["istanbul", "londra", "new-york", "berlin", "paris", "amsterdam", "dubai", "mekke", "moskova", "tokyo", "toronto", "los-angeles"]
  .map((slug) => trSaatSehirleri.find((c) => c.tr === slug))
  .filter((c) => c !== undefined);

const SEHIRLER = [
  ...trSaatSehirleri.map((c) => ({ href: `/dunya-saatleri/${c.tr}`, ad: c.nameTr, ulke: c.countryTr })),
  ...ulkeSaatleri.map((u) => ({ href: `/dunya-saatleri/${u.slug}`, ad: u.ad, ulke: `${u.dilimler.length} saat dilimi` })),
].sort((a, b) => a.ad.localeCompare(b.ad, "tr"));

/** Saat bölümünün kabuğu: kendi üst menüsü, tam ekran başlık alanı, sade içerik ve kendi alt bilgisi. */
export default function SaatKabugu({
  crumbs,
  faqItems,
  hero,
  sahneler,
  children,
}: {
  crumbs: Array<{ href: string; label: string }>;
  faqItems: FaqItem[];
  hero: ReactNode;
  /** Başlık alanının altındaki tam genişlik bantlar. */
  sahneler?: ReactNode;
  children?: ReactNode;
}) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: buildSiteUrl(c.href) })),
  };
  return (
    <div className={`saat-bolum ${saatRakam.variable} ${saatMetin.variable} ${saatGazete.variable} ${saatEski.variable} ${saatFraktur.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />
      <SaatUstMenu sehirler={SEHIRLER} />
      <main>
        {hero}
        {sahneler}
        <div className="saat-icerik">
          <nav className="saat-yol" aria-label="Sayfa yolu">
            {crumbs.map((c, i) => (
              <span key={c.href}>
                {i > 0 && " / "}
                {i < crumbs.length - 1 ? <Link href={c.href}>{c.label}</Link> : c.label}
              </span>
            ))}
          </nav>
          {children}
          <h2 id="faq">Sık sorulan sorular</h2>
          {faqItems.map((item) => (
            <div key={item.question} className="saat-sss">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </main>
      <footer className="saat-alt-bilgi">
        <div className="saat-alt-bilgi-ic">
          <p className="saat-alt-marka">
            BİRİMCEVİRİ <span>SAAT</span>
            <small>dünyanın her köşesi, tek saatte</small>
          </p>
          <div className="saat-alt-sutunlar">
            <nav aria-label="Saat araçları">
              <h2>Araçlar</h2>
              {SAAT_MENUSU.map((m) => (
                <Link key={m.href} href={m.href} prefetch={false}>
                  {m.label}
                </Link>
              ))}
            </nav>
            <nav aria-label="Popüler şehirler">
              <h2>Popüler şehirler</h2>
              {POPULER.map((c) => (
                <Link key={c.tr} href={`/dunya-saatleri/${c.tr}`} prefetch={false}>
                  {c.nameTr}
                </Link>
              ))}
            </nav>
            <nav aria-label="Saat dilimli ülkeler">
              <h2>Ülkelerin saat dilimleri</h2>
              {ulkeSaatleri.map((u) => (
                <Link key={u.slug} href={`/dunya-saatleri/${u.slug}`} prefetch={false}>
                  {u.ad} <small>{u.dilimler.length} dilim</small>
                </Link>
              ))}
            </nav>
            <nav aria-label="Site">
              <h2>Site</h2>
              <Link href="/">birimceviri.app</Link>
              <Link href="/hakkimizda">Hakkımızda</Link>
              <Link href="/iletisim">İletişim</Link>
              <Link href="/gizlilik">Gizlilik</Link>
            </nav>
          </div>
          <p className="saat-alt-bilgi-son">
            {trSaatSehirleri.length} şehir ve {ulkeSaatleri.length} ülkenin saati. Saat dilimi verileri IANA veritabanından; saatler cihazının saatine göre işler.
          </p>
        </div>
      </footer>
    </div>
  );
}
