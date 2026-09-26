import type { Metadata } from "next";
import Link from "next/link";
import { hindiConversionPages } from "../../converter/localizedHindiConversionPages";
import { hindiCategoryPages } from "../../converter/localizedHindiReferencePages";

export const metadata: Metadata = {
  title: "इकाई परिवर्तन की श्रेणियाँ",
  description: "लंबाई, द्रव्यमान, आयतन और तापमान के लिए उपलब्ध इकाई परिवर्तक देखें।",
  alternates: { canonical: "/hi/categories" },
};

export default function HindiCategoriesPage() {
  const categories = hindiCategoryPages;
  return (
    <main className="all-conversions-page" lang="hi">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="पृष्ठ क्रम"><Link href="/hi">मुख्य पृष्ठ</Link><span aria-hidden="true">›</span><span>श्रेणियाँ</span></nav>
        <header className="all-conversions-header"><h1>इकाई परिवर्तन की श्रेणियाँ</h1><p>अपनी ज़रूरत की इकाइयाँ चुनें।</p></header>
        {categories.map((category) => <section className="category-article-content" key={category.slug}>
          <h2><Link href={`/hi/categories/${category.slug}`}>{category.title}</Link></h2>
          <ul>{hindiConversionPages.filter((page) => page.source.category === category.category).map((page) => <li key={page.slug}><Link href={`/hi/${page.slug}`}>{page.fromName} से {page.toName}</Link></li>)}</ul>
        </section>)}
      </div>
    </main>
  );
}
