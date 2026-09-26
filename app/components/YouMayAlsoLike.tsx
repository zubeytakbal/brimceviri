import Link from "@/app/components/SiteLink";
import type { RelatedPageCard } from "../i18n/englishRelatedPages";
import { DecorativeIcon } from "./siteIcons";

// Sayfa sonundaki "ilginizi cekebilir" bolumu; ana sayfadaki arac kartlariyla ayni tasarim.
export default function YouMayAlsoLike({ title, cards }: { title: string; cards: RelatedPageCard[] }) {
  if (cards.length === 0) return null;
  return (
    <section className="conversion-section you-may-also-like" aria-labelledby="you-may-also-like-title">
      <h2 id="you-may-also-like-title">{title}</h2>
      <div className="directory-tool-grid">
        {cards.map((card) => (
          <article className="directory-home-card directory-tool-card" key={card.href}>
            <Link className="directory-card-stretch" href={card.href} aria-label={card.title} />
            <div className="directory-card-body directory-card-body-icon">
              <span className="home-category-icon-box" aria-hidden="true">
                <DecorativeIcon name={card.icon} size={36} className="home-category-icon-svg" />
              </span>
              <h3 className="home-category-title">{card.title}</h3>
              <p className="directory-card-description">{card.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
