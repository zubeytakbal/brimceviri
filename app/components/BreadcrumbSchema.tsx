import { buildSiteUrl } from "../siteConfig";

// Görünür sayfa yolunun Google'a yapısal veri (BreadcrumbList) olarak verilmesi.
// Son öğe bulunulan sayfadır; bağlantısı olmayabilir.
export default function BreadcrumbSchema({ items }: { items: Array<{ name: string; href?: string }> }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.href ? { item: buildSiteUrl(item.href) } : {}),
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
