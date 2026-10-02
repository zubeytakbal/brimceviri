import type { ReactNode } from "react";
import Link from "@/app/components/SiteLink";
import type { ToolGroup } from "../i18n/turkishToolDirectory";

// "Tüm hesaplamalar" hub sayfası (/hesaplayicilar, /de/rechner): araçları
// konu gruplarına ayırıp listeler; üstte gruplara atlama düğmeleri.
export default function ToolHubPage({
  homeHref,
  homeLabel,
  breadcrumbLabel,
  breadcrumbAriaLabel,
  jumpAriaLabel,
  title,
  intro,
  groups,
}: {
  homeHref: string;
  homeLabel: string;
  breadcrumbLabel: string;
  breadcrumbAriaLabel: string;
  jumpAriaLabel: string;
  title: string;
  intro: ReactNode;
  groups: ToolGroup[];
}) {
  return (
    <main className="other-categories-page">
      <div className="directory-shell">
        <nav className="breadcrumbs" aria-label={breadcrumbAriaLabel}>
          <Link href={homeHref}>{homeLabel}</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{breadcrumbLabel}</span>
        </nav>

        <header className="other-categories-header">
          <h1>{title}</h1>
          <p>{intro}</p>
        </header>

        <nav className="tool-hub-jump" aria-label={jumpAriaLabel}>
          {groups.map((group) => (
            <a href={`#${group.id}`} key={group.id}>
              {group.title}
            </a>
          ))}
        </nav>

        {groups.map((group) => (
          <section className="tool-hub-group" id={group.id} key={group.id}>
            <h2>{group.title}</h2>
            <p>{group.description}</p>
            <ul className="tool-hub-list">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}

export function countTools(groups: ToolGroup[]) {
  return groups.reduce((sum, group) => sum + group.links.length, 0);
}
