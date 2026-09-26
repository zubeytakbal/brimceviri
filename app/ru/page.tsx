import type { Metadata } from "next";
import Link from "next/link";
import { russianConversionPages } from "../converter/localizedRussianConversionPages";
import { buildFullLanguageAlternates } from "../i18n/routing";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Конвертер единиц измерения онлайн",
  description: "Переводите длину, массу, объём и температуру. Формулы, таблицы и бесплатный калькулятор для популярных единиц.",
  alternates: { canonical: "/ru", ...buildFullLanguageAlternates("/ru") },
  openGraph: { title: "Конвертер единиц измерения онлайн", url: buildSiteUrl("/ru"), locale: "ru_RU" },
};

export default function RussianHomePage() {
  return (
    <main className="all-conversions-page" lang="ru">
      <div className="all-conversions-shell">
        <header className="all-conversions-header">
          <h1>Конвертер единиц измерения</h1>
          <p>Выберите перевод величин или введите значение на странице конвертера. Результат рассчитывается сразу.</p>
        </header>
        <section className="category-article-content">
          <h2>Популярные переводы</h2>
          <ul>
            {russianConversionPages.map((page) => (
              <li key={page.slug}>
                <Link href={`/ru/${page.slug}`}>{page.fromName} → {page.toName}</Link>
              </li>
            ))}
          </ul>
          <p><Link href="/ru/categories">Все доступные категории</Link></p>
        </section>
      </div>
    </main>
  );
}
