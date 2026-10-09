import Link from "@/app/components/SiteLink";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";

export type DirectoryGuideItem = { href: string; label: string; text: string };

export type DirectoryGuideSection = {
  heading: string;
  paragraphs: string[];
  items?: DirectoryGuideItem[];
};

export type DirectoryGuideContent = {
  sections: DirectoryGuideSection[];
  faqHeading: string;
  faq: FaqItem[];
};

export default function DirectoryGuide({ guide }: { guide: DirectoryGuideContent }) {
  return (
    <div className="category-article-content">
      {guide.sections.map((section) => (
        <section className="conversion-section" key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.items && (
            <ul>
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link className="text-link" href={item.href}>
                    {item.label}
                  </Link>
                  : {item.text}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <section className="conversion-section">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(guide.faq)).replace(/</g, "\\u003c") }}
        />
        <h2>{guide.faqHeading}</h2>
        <div className="faq-list">
          {guide.faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
