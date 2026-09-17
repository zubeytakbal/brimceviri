import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import {
  uzLicenseClasses,
  type UzLicenseClassId,
} from "../../../converter/licenseClassFinderUz";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function findClassBySlug(slug: string) {
  const id = slug.toUpperCase() as UzLicenseClassId;
  return uzLicenseClasses[id];
}

export function generateStaticParams() {
  return Object.keys(uzLicenseClasses).map((id) => ({ slug: id.toLowerCase() }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const licenseClass = findClassBySlug(slug);

  if (!licenseClass) {
    return { title: "Guvohnoma toifasi topilmadi", robots: { index: false, follow: false } };
  }

  const title = `${licenseClass.label} Toifasi Guvohnoma Qaysi Transport Vositalarini Haydaydi?`;
  const description = `${licenseClass.label} toifasi haydovchilik guvohnomasi: ${licenseClass.description} Eng kichik yosh ${licenseClass.minAge}, amal qilish muddati ${licenseClass.validityYears} yil.`;

  return {
    title,
    description,
    alternates: { canonical: `/uz/haydovchilik-toifasi-topish/${slug}` },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/uz/haydovchilik-toifasi-topish/${slug}`),
      siteName: "BirimCeviri.app",
      locale: "uz_UZ",
      type: "article",
    },
  };
}

export default async function UzbekLicenseClassDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const licenseClass = findClassBySlug(slug);

  if (!licenseClass) {
    notFound();
  }

  const pageUrl = buildSiteUrl(`/uz/haydovchilik-toifasi-topish/${slug}`);

  const faqItems: FaqItem[] = [
    {
      question: `${licenseClass.label} toifasi guvohnoma qaysi transport vositalarini haydaydi?`,
      answer: licenseClass.description,
    },
    {
      question: `${licenseClass.label} toifasi guvohnoma olish uchun eng kichik yosh nechada?`,
      answer: `${licenseClass.label} toifasi haydovchilik guvohnomasi uchun eng kichik yosh ${licenseClass.minAge}, amal qilish muddati ${licenseClass.validityYears} yil.`,
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Qaysi Haydovchilik Guvohnomasi Toifasi Kerak?", item: buildSiteUrl("/uz/haydovchilik-toifasi-topish") },
      { "@type": "ListItem", position: 3, name: `${licenseClass.label} Toifasi`, item: pageUrl },
    ],
  };

  const otherClasses = Object.values(uzLicenseClasses).filter(
    (item) => item.id !== licenseClass.id,
  );

  return (
    <main className="all-conversions-page" lang="uz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/uz/haydovchilik-toifasi-topish">Qaysi Haydovchilik Guvohnomasi Toifasi Kerak?</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{licenseClass.label} Toifasi</span>
        </nav>

        <header className="all-conversions-header">
          <p className="unit-symbol">{licenseClass.label}</p>
          <h1>{licenseClass.label} Toifasi Guvohnoma Qaysi Transport Vositalarini Haydaydi?</h1>
          <p>{licenseClass.description}</p>
        </header>

        <section className="category-article-content">
          <h2>{licenseClass.label} Toifasi Asosiy Ma&apos;lumotlari</h2>
          <dl className="unit-facts">
            <div>
              <dt>Qamrovi</dt>
              <dd>{licenseClass.description}</dd>
            </div>
            <div>
              <dt>Namunaviy Transport Vositalari</dt>
              <dd>{licenseClass.exampleVehicles}</dd>
            </div>
            <div>
              <dt>Eng Kichik Yosh</dt>
              <dd>{licenseClass.minAge}</dd>
            </div>
            <div>
              <dt>Amal Qilish Muddati</dt>
              <dd>{licenseClass.validityYears} yil</dd>
            </div>
          </dl>

          <h2>Tez-tez So&apos;raladigan Savollar</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Boshqa Guvohnoma Toifalari</h2>
          <ul className="related-conversion-list">
            {otherClasses.map((item) => (
              <li key={item.id}>
                <Link href={`/uz/haydovchilik-toifasi-topish/${item.id.toLowerCase()}`}>
                  {item.label} Toifasi
                </Link>{" "}
                — {item.description}
              </li>
            ))}
          </ul>

          <h2>Tegishli vositalar</h2>
          <p>
            O&apos;z transport vositangiz qaysi toifaga muhtoj
            ekanligini hisoblash uchun{" "}
            <Link href="/uz/haydovchilik-toifasi-topish">
              Qaysi Haydovchilik Guvohnomasi Toifasi Kerak?
            </Link>{" "}
            hisoblagichiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Bu ma&apos;lumotlar gov.uz rasmiy &quot;Haydovchilik
            guvohnomasi toifalari&quot; sahifasiga hamda bir nechta
            mustaqil manbadan (osonprava.uz, kun.uz,
            wikiprocedure.com) o&apos;zaro tekshirilgan
            ma&apos;lumotlarga asoslangan.{" "}
            <em>(So&apos;nggi tekshiruv: sentyabr 2026)</em>
          </p>
        </section>
      </div>
    </main>
  );
}
