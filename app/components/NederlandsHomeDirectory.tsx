import Link from "next/link";
import { nederlandsCategoryPages } from "../converter/localizedNederlandsCategoryPages";
import { nederlandsConversionPages } from "../converter/localizedNederlandsConversionPages";
import { nederlandsUnitPages } from "../converter/localizedNederlandsUnitPages";

const tools = [
  { href: "/nl/schoenmaten-omrekenen", title: "Schoenmaat omrekenen", description: "Vergelijk EU-, US- en UK-schoenmaten." },
  { href: "/nl/keukenmaten-omrekenen", title: "Keukenmaten omrekenen", description: "Reken kopjes, lepels en grammen om per ingrediënt." },
  { href: "/nl/recepten-omrekenen", title: "Recept omrekenen", description: "Pas hoeveelheden in een recept aan." },
  { href: "/nl/historische-eenheden", title: "Historische eenheden", description: "Ontdek en reken historische lengtes en gewichten om." },
];

export default function NederlandsHomeDirectory() {
  const popularConversions = nederlandsConversionPages.slice(0, 6);
  const popularUnits = nederlandsUnitPages.slice(0, 6);

  return (
    <main className="directory-home" lang="nl">
      <section className="directory-hero">
        <div className="directory-shell">
          <div className="directory-hero-copy">
            <p className="directory-eyebrow">Eenheden omrekenen in het Nederlands</p>
            <h1>Vind snel de juiste omrekening</h1>
            <p className="directory-lead">Reken lengte, massa, temperatuur, druk en meer om met heldere eenhedengidsen.</p>
          </div>
        </div>
      </section>

      <div className="directory-shell directory-content">
        <section className="directory-section">
          <header className="directory-section-header"><div><h2>Eenheidscategorieën</h2><p>Kies een categorie om alle eenheden en omrekeningen te bekijken.</p></div></header>
          <div className="directory-home-category-grid">
            {nederlandsCategoryPages.map((category) => (
              <article className="directory-home-card" key={category.slug}>
                <Link className="directory-card-stretch" href={`/nl/categorieen/${category.slug}`} aria-label={category.title} />
                <div className="directory-card-body"><h3 className="home-category-title">{category.title}</h3><p>{category.description}</p></div>
              </article>
            ))}
          </div>
          <p className="directory-section-footer"><Link className="directory-section-link" href="/nl/categorieen">Alle categorieën bekijken</Link></p>
        </section>

        <section className="directory-section">
          <header className="directory-section-header"><div><h2>Handige hulpmiddelen</h2><p>Praktische omrekenaars voor alledaags gebruik.</p></div></header>
          <ul className="directory-popular-list">{tools.map((tool) => <li key={tool.href}><Link href={tool.href}><span className="directory-conversion-title">{tool.title}</span><small>{tool.description}</small></Link></li>)}</ul>
        </section>

        <section className="directory-section">
          <header className="directory-section-header"><div><h2>Populaire omrekeningen</h2></div></header>
          <ul className="directory-popular-list">{popularConversions.map((page) => <li key={page.slug}><Link href={`/nl/${page.slug}`}><span className="directory-conversion-title">{page.fromName} → {page.toName}</span><small>{page.categoryName}</small></Link></li>)}</ul>
        </section>

        <section className="directory-section">
          <header className="directory-section-header"><div><h2>Eenhedengidsen</h2></div></header>
          <ul className="directory-popular-list">{popularUnits.map((unit) => <li key={unit.slug}><Link href={`/nl/eenheidsgidsen/${unit.slug}`}><span className="directory-conversion-title">{unit.name}</span><small>{unit.categoryName}</small></Link></li>)}</ul>
        </section>
      </div>
    </main>
  );
}
