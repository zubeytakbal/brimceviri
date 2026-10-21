import type { ReactNode } from "react";
import Link from "@/app/components/SiteLink";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";
import SaatAltBilgi from "./SaatAltBilgi";
import { SAAT_ARAMA } from "./saatListeleri";
import { saatEski, saatFraktur, saatGazete, saatMetin, saatRakam } from "./saatFontlari";
import SaatUstMenu from "./SaatUstMenu";

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

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
      <SaatUstMenu ogeler={SAAT_ARAMA} />
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
      <SaatAltBilgi />
    </div>
  );
}
