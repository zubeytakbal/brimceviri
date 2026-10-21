import type { ReactNode } from "react";
import Link from "@/app/components/SiteLink";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";
import { yolLevha, yolMetin } from "./yolFontlari";
import "./yol.css";

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * "Yol atlası" sayfalarının içerik alanı. Sitenin üst menüsü ve alt bilgisi aynen kalır; yalnızca ortadaki alan
 * asfalt zeminli başlık, levha ve atlas düzenindeki bölümlerle çizilir. Sayfa yolu ve SSS işaretlemesi korunur.
 */
export default function YolSayfasi({
  crumbs,
  baslik,
  levha,
  faqItems,
  children,
}: {
  crumbs: Array<{ href: string; label: string }>;
  baslik: string;
  /** Başlığın altındaki levha (cevap). */
  levha: ReactNode;
  faqItems: FaqItem[];
  children: ReactNode;
}) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: buildSiteUrl(c.href) })),
  };
  return (
    <main className={`yol-sayfa ${yolLevha.variable} ${yolMetin.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />
      <section className="yol-ust">
        <div className="yol-ic">
          <nav className="yol-yolu" aria-label="Sayfa yolu">
            {crumbs.map((c, i) => (
              <span key={c.href}>
                {i > 0 && " › "}
                {i < crumbs.length - 1 ? <Link href={c.href}>{c.label}</Link> : c.label}
              </span>
            ))}
          </nav>
          <h1 className="yol-baslik">{baslik}</h1>
          {levha}
        </div>
      </section>
      <div className="yol-ic yol-govde">
        {children}
        <section className="yol-bolum" id="faq">
          <h2 className="yol-bolum-baslik">Sık sorulan sorular</h2>
          <div className="yol-sss">
            {faqItems.map((item) => (
              <div key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
