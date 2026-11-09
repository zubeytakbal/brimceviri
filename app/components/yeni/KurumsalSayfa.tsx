// Hakkimizda, iletisim, gizlilik gibi kurumsal sayfalarin ortak duzeni: tek okuma sutunu, arac sayfalariyla ayni gorunum.
import type { ReactNode } from "react";
import "./yeni.css";
import Link from "@/app/components/SiteLink";

type Props = {
  title: string;
  description?: ReactNode;
  breadcrumbs: { href?: string; label: string }[];
  sections: { heading: string; content: ReactNode }[];
  /** Sayfaya ozel yapisal veri (JSON-LD) */
  schema?: object;
  // StaticPageLayout ile ayni cagri bicimi; bu duzende kullanilmaz.
  locale?: string;
  breadcrumbAriaLabel?: string;
  alternateLink?: unknown;
};

export default function KurumsalSayfa({ title, description, breadcrumbs, sections, schema }: Props) {
  return (
    <div className="yy yy-sayfa">
      <main className="yy-kurumsal">
        {schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
          />
        )}
        <header>
          <ol className="yy-yol" aria-label="Sayfa yolu">
            {breadcrumbs.map((b) => (
              <li key={b.label} aria-current={b.href ? undefined : "page"}>
                {b.href ? <Link href={b.href}>{b.label}</Link> : b.label}
              </li>
            ))}
          </ol>
          <h1>{title}</h1>
          {description && <p className="yy-kurumsal-ozet">{description}</p>}
        </header>
        <article className="yy-yazi">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.content}
            </section>
          ))}
        </article>
      </main>
    </div>
  );
}
