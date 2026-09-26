import { ArrowRight } from "@phosphor-icons/react";
import Link from "@/app/components/SiteLink";
import { DecorativeIcon, type SiteIconName } from "../siteIcons";

// Ana sayfalardaki "doviz" bolumu: diger ana sayfa bolumleriyle (bilim
// hesaplayicilari vb.) ayni kart tasarimi. 3 kart + "tumu" karti tek satira sigar.
type Props = {
  id: string;
  title: string;
  description: string;
  hubHref: string;
  allLabel: string;
  cards: Array<{ href: string; label: string; icon: SiteIconName }>;
};

export default function FxHomeSection({ id, title, description, hubHref, allLabel, cards }: Props) {
  return (
    <section className="directory-section" id={id}>
      <header className="directory-section-header">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <Link className="directory-section-link" href={hubHref}>
          <DecorativeIcon className="directory-link-icon" name="currencyConverterCalculator" size={18} />
          {allLabel}
        </Link>
      </header>

      <div className="directory-tool-grid">
        {cards.map((card) => (
          <article className="directory-home-card directory-tool-card" key={card.href}>
            <Link className="directory-card-stretch" href={card.href} aria-label={card.label} />
            <div className="directory-card-body directory-card-body-icon">
              <span className="home-category-icon-box" aria-hidden="true">
                <DecorativeIcon name={card.icon} size={42} className="home-category-icon-svg" />
              </span>
              <h3 className="home-category-title">{card.label}</h3>
            </div>
          </article>
        ))}

        <article className="directory-home-card directory-tool-card directory-home-card-more">
          <Link className="directory-card-stretch" href={hubHref} aria-label={allLabel} />
          <div className="directory-card-body directory-more-card-body">
            <ArrowRight className="directory-more-arrow" size={56} weight="regular" aria-hidden="true" />
            <span className="directory-more-label">{allLabel}</span>
          </div>
        </article>
      </div>
    </section>
  );
}
