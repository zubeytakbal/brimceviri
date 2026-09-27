import Link from "@/app/components/SiteLink";

// Uzun rehber sayfalari icin "Icindekiler" kutusu: basliklara capa linkleri.
export default function TableOfContents({
  title = "İçindekiler",
  items,
}: {
  title?: string;
  items: Array<{ id: string; label: string }>;
}) {
  return (
    <nav className="page-toc" aria-label={title}>
      <details open>
        <summary>{title}</summary>
        <ol>
          {items.map((item) => (
            <li key={item.id}>
              <Link href={`#${item.id}`} prefetch={false}>
                {item.label}
              </Link>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
