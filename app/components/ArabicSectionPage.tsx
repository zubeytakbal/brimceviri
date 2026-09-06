"use client";

import Link from "next/link";
import {
  arabicStandaloneTools,
  type ArabicStandaloneTool,
} from "../i18n/arabicStandaloneTools";
import { DecorativeIcon, type SiteIconName } from "./siteIcons";

type ActionLink = {
  href: string;
  label: string;
  hrefLang?: string;
};

function CardIcon({ name }: { name: SiteIconName }) {
  return (
    <span className="home-category-icon-box" aria-hidden="true">
      <DecorativeIcon
        className="home-category-icon-svg"
        name={name}
        size={44}
      />
    </span>
  );
}

function getTools(toolSlugs?: string[]) {
  if (!toolSlugs || toolSlugs.length === 0) {
    return [];
  }

  return toolSlugs.flatMap((slug) => {
    const tool = arabicStandaloneTools.find((item) => item.slug === slug);
    return tool ? [tool] : [];
  });
}

function ToolCard({ tool }: { tool: ArabicStandaloneTool }) {
  return (
    <Link
      className="directory-home-card"
      href={tool.arabicPath}
      aria-label={`${tool.title} - ${tool.cardDescription}`}
    >
      <div className="directory-card-body directory-card-body-icon">
        <CardIcon name={tool.iconName} />
        <h3 className="home-category-title">{tool.title}</h3>
        <p className="directory-card-description">{tool.cardDescription}</p>
      </div>
    </Link>
  );
}

export default function ArabicSectionPage({
  title,
  description,
  note,
  primaryLink,
  secondaryLink,
  toolSlugs,
}: {
  title: string;
  description: string;
  note?: string;
  primaryLink: ActionLink;
  secondaryLink?: ActionLink;
  toolSlugs?: string[];
}) {
  const tools = getTools(toolSlugs);

  return (
    <main className="directory-home" lang="ar" dir="rtl">
      <div className="directory-shell directory-content">
        <nav className="breadcrumbs" aria-label="مسار الصفحة">
          <Link href="/ar">الرئيسية</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{title}</span>
        </nav>

        <header className="other-categories-header">
          <h1>{title}</h1>
          <p>{description}</p>
        </header>

        <div className="arabic-link-row">
          <Link
            className="directory-section-link"
            href={primaryLink.href}
            hrefLang={primaryLink.hrefLang}
          >
            <DecorativeIcon
              className="directory-link-icon"
              name="allConversions"
              size={18}
            />
            {primaryLink.label}
          </Link>

          {secondaryLink ? (
            <Link
              className="directory-section-link"
              href={secondaryLink.href}
              hrefLang={secondaryLink.hrefLang}
            >
              <DecorativeIcon
                className="directory-link-icon"
                name="unitGuide"
                size={18}
              />
              {secondaryLink.label}
            </Link>
          ) : null}
        </div>

        {note ? (
          <section className="engineering-note-box arabic-launch-note">
            <p>{note}</p>
          </section>
        ) : null}

        {tools.length > 0 ? (
          <section className="directory-section">
            <header className="directory-section-header">
              <div>
                <h2>أدوات متاحة الآن</h2>
                <p>
                  هذه الصفحات جاهزة بالعربية الآن ويمكن استخدامها مباشرة دون
                  انتظار بقية الأقسام.
                </p>
              </div>
            </header>

            <div className="directory-home-category-grid">
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
