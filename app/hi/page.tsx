import type { Metadata } from "next";
import Link from "next/link";
import { hindiConversionPages } from "../converter/localizedHindiConversionPages";
import { buildFullLanguageAlternates } from "../i18n/routing";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "इकाई परिवर्तन कैलकुलेटर",
  description: "लंबाई, द्रव्यमान, आयतन और तापमान की इकाइयाँ बदलें। सूत्र और रूपांतरण तालिका के साथ मुफ़्त कैलकुलेटर।",
  alternates: { canonical: "/hi", ...buildFullLanguageAlternates("/hi") },
  openGraph: { title: "इकाई परिवर्तन कैलकुलेटर", url: buildSiteUrl("/hi"), locale: "hi_IN" },
};

export default function HindiHomePage() {
  return (
    <main className="all-conversions-page" lang="hi">
      <div className="all-conversions-shell">
        <header className="all-conversions-header"><h1>इकाई परिवर्तन कैलकुलेटर</h1><p>इकाइयों की जोड़ी चुनें और तुरंत परिणाम पाने के लिए मान लिखें।</p></header>
        <section className="category-article-content">
          <h2>लोकप्रिय रूपांतरण</h2>
          <ul>{hindiConversionPages.map((page) => <li key={page.slug}><Link href={`/hi/${page.slug}`}>{page.fromName} से {page.toName}</Link></li>)}</ul>
          <p><Link href="/hi/categories">सभी उपलब्ध श्रेणियाँ</Link></p>
        </section>
      </div>
    </main>
  );
}
