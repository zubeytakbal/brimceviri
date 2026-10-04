import Link from "@/app/components/SiteLink";
import { buildFaqSchema } from "../../converter/faqSchema";
import type { ScienceHub } from "../../converter/scienceHubs";
import { buildSiteUrl } from "../../siteConfig";
import TableOfContents from "../TableOfContents";

function jsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

// Bilim hesaplayicilari alt hub'lari (kimya, matematik, fizik, geometri, biyoloji) icin ortak sayfa.
export default function ScienceHubPage({ hub }: { hub: ScienceHub }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Bilim Hesaplayıcıları", item: buildSiteUrl("/bilim-hesaplayicilari") },
      { "@type": "ListItem", position: 3, name: hub.name, item: buildSiteUrl(hub.path) },
    ],
  };
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: hub.title,
    itemListElement: hub.groups
      .flatMap((g) => g.tools)
      .map((tool, index) => ({ "@type": "ListItem", position: index + 1, name: tool.title, url: buildSiteUrl(tool.href) })),
  };
  const toolCount = hub.groups.reduce((sum, g) => sum + g.tools.length, 0);

  return (
    <main className="all-conversions-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(itemList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(buildFaqSchema(hub.faq)) }} />
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari">Bilim Hesaplayıcıları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{hub.name}</span>
        </nav>

        <header className="all-conversions-header">
          <h1>{hub.title}</h1>
          <p>{hub.intro}</p>
        </header>

        {hub.groups.map((group) => (
          <section className="science-hub-group" key={group.title}>
            <h2>
              {group.title} <small>({group.tools.length})</small>
            </h2>
            <ul className="science-hub-tools">
              {group.tools.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} prefetch={false}>
                    <strong>{tool.title}</strong>
                    <span>{tool.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {hub.related.length > 0 && (
          <nav className="time-tool-related" aria-label="İlginizi çekebilir">
            <h2>İlginizi çekebilir</h2>
            <ul>
              {hub.related.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} prefetch={false}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <TableOfContents
          title="İçindekiler"
          items={[...hub.sections.map((s) => ({ id: s.id, label: s.title })), { id: "faq", label: "Sık sorulan sorular" }]}
        />

        <section className="category-article-content">
          {hub.sections.map((section) => (
            <div key={section.id}>
              <h2 id={section.id}>{section.title}</h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          ))}
          <h2 id="faq">Sık Sorulan Sorular</h2>
          {hub.faq.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}
          <p>
            <small>
              Bu sayfada {toolCount} araç ve referans bağlantısı var. Diğer alanlar için{" "}
              <Link href="/bilim-hesaplayicilari">tüm bilim hesaplayıcılarına</Link> göz atın.
            </small>
          </p>
        </section>
      </div>
    </main>
  );
}
