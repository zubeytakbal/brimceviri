import type { Metadata } from "next";
import Link from "next/link";
import { DecorativeIcon } from "../../components/siteIcons";
import {
  disasterCategoryLabelsUz,
  getUzDisasterStories,
} from "../../converter/unitDisastersUz";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/birlik-aylantirish-fojialari";

export const metadata: Metadata = {
  title: "Birlik Aylantirishdagi Xatolar: Noto'g'ri Birlik Tufayli Yuz Bergan Haqiqiy Voqealar",
  description:
    "Bitta birlik aylantirish xatosi tufayli millionlab dollarlik sun'iy yo'ldoshlarning yo'qolgani, samolyotlarning havoda yoqilg'isiz qolgani haqiqiy voqealar — tasdiqlangan manbalar bilan.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/birim-cevirme-felaketleri",
      "uz-UZ": pagePath,
      "x-default": "/birim-cevirme-felaketleri",
    },
  },
  openGraph: {
    title: "Birlik Aylantirishdagi Xatolar",
    description: "Bir muhandislik guruhi metrik, ikkinchisi imperial ishlatganda nima bo'ladi? Haqiqiy, tasdiqlangan voqealar.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekUnitDisastersHubPage() {
  const stories = getUzDisasterStories();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Birlik Aylantirishdagi Xatolar", item: buildSiteUrl(pagePath) },
    ],
  };

  return (
    <main className="all-conversions-page" lang="uz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Birlik Aylantirishdagi Xatolar</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Birlik Aylantirishdagi Xatolar</h1>
          <p>
            Bir muhandislik guruhi metrik tizimni ishlatganda,
            ikkinchisi imperial tizimni ishlatsa nima bo&apos;ladi?
            Tarix davomida bunga javob millionlab dollarlik sun&apos;iy
            yo&apos;ldoshlarning yo&apos;qolishi, samolyotlarning havoda
            yoqilg&apos;isiz qolishi kabi haqiqiy voqealar bo&apos;ldi.
            Quyida tasdiqlangan manbalarga asoslangan bu voqealarni
            birma-bir hikoya qilamiz.
          </p>
        </header>

        <section className="category-article-content" style={{ maxWidth: "none" }}>
          <div className="disaster-story-grid">
            {stories.map((story) => (
              <Link
                key={story.slug}
                href={`/uz/birlik-aylantirish-fojialari/${story.slug}`}
                className="disaster-story-card"
              >
                <div className="disaster-story-card-meta">
                  <DecorativeIcon
                    name={
                      story.category === "uzay" ? "spaceDisaster" : "unitDisaster"
                    }
                    size={28}
                  />
                  <span className="disaster-category-badge">
                    {disasterCategoryLabelsUz[story.category]}
                  </span>
                  <span className="disaster-year-badge">{story.year}</span>
                </div>
                <h3>{story.shortTitle}</h3>
                <p>{story.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
