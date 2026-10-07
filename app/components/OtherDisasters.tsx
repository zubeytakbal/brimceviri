import Link from "@/app/components/SiteLink";
import { getPublishedDisasterStories } from "../converter/unitDisasters";

/** Felaket sayfalarinin altinda diger olaylara baglanti. */
export default function OtherDisasters({ current }: { current: string }) {
  const others = getPublishedDisasterStories().filter((s) => s.slug !== current);
  return (
    <>
      <h2>Diğer birim hataları</h2>
      <ul>
        {others.map((s) => (
          <li key={s.slug}>
            <Link href={`/birim-cevirme-felaketleri/${s.slug}`}>{s.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
