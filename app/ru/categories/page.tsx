import type { Metadata } from "next";
import Link from "next/link";
import { russianConversionPages } from "../../converter/localizedRussianConversionPages";

export const metadata: Metadata = {
  title: "Категории конвертера единиц",
  description: "Длина, масса, объём и температура: доступные конвертеры с формулами и таблицами.",
  alternates: { canonical: "/ru/categories" },
};

export default function RussianCategoriesPage() {
  const categories = [...new Set(russianConversionPages.map((page) => page.categoryName))];
  return (
    <main className="all-conversions-page" lang="ru">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Навигационная цепочка"><Link href="/ru">Главная</Link><span aria-hidden="true">›</span><span>Категории</span></nav>
        <header className="all-conversions-header"><h1>Категории конвертера</h1><p>Выберите нужную пару единиц измерения.</p></header>
        {categories.map((category) => (
          <section className="category-article-content" key={category}>
            <h2>{category}</h2>
            <ul>{russianConversionPages.filter((page) => page.categoryName === category).map((page) => (
              <li key={page.slug}><Link href={`/ru/${page.slug}`}>{page.fromName} → {page.toName}</Link></li>
            ))}</ul>
          </section>
        ))}
      </div>
    </main>
  );
}
