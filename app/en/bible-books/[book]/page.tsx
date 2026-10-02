import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/app/components/SiteLink";
import TimeToolPage from "../../../components/time/TimeToolPage";
import type { FaqItem } from "../../../converter/faqSchema";
import { BIBLE_BOOKS, findBibleBook, formatMinutes, READING_WPM } from "../../../converter/christian/christianCalc";
import { BIBLE_BOOKS_PATH, CHRISTIAN_TOOLS_PATH } from "../../../i18n/englishChristianTools";
import { buildSiteUrl } from "../../../siteConfig";

export const dynamicParams = false;

export function generateStaticParams() {
  return BIBLE_BOOKS.map((b) => ({ book: b.slug }));
}

type Props = { params: Promise<{ book: string }> };

const fmt = (n: number) => n.toLocaleString("en-US");
const ordinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = findBibleBook((await params).book);
  if (!book) return {};
  const path = `${BIBLE_BOOKS_PATH}/${book.slug}`;
  const title = `How Many Chapters in ${book.name}? Verses & Reading Time`;
  const description = `${book.name} has ${book.chapters} chapter${book.chapters === 1 ? "" : "s"} and ${fmt(book.verses)} verses (KJV) and takes about ${formatMinutes(book.readingMinutes)} to read. Verses in every chapter.`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "article" },
  };
}

export default async function BibleBookPage({ params }: Props) {
  const book = findBibleBook((await params).book);
  if (!book) notFound();
  const path = `${BIBLE_BOOKS_PATH}/${book.slug}`;
  const prev = BIBLE_BOOKS[book.order - 2];
  const next = BIBLE_BOOKS[book.order];
  const longest = Math.max(...book.versesPerChapter);
  const shortest = Math.min(...book.versesPerChapter);
  const perChapter = book.readingMinutes / book.chapters;
  const sameSection = BIBLE_BOOKS.filter((b) => b.section === book.section && b.testament === book.testament && b.slug !== book.slug);
  const plural = book.chapters === 1 ? "chapter" : "chapters";
  // "Psalm 23", not "Psalms 23".
  const ref = (n: number) => `${book.slug === "psalms" ? "Psalm" : book.name} ${n}`;

  const faqItems: FaqItem[] = [
    {
      question: `How many chapters are in ${book.name}?`,
      answer: `${book.name} has ${book.chapters} ${plural} and ${fmt(book.verses)} verses in the King James Version.`,
    },
    {
      question: `How long does it take to read ${book.name}?`,
      answer: `About ${formatMinutes(book.readingMinutes)} at ${READING_WPM} words per minute (${fmt(book.words)} words)${book.chapters > 1 ? `, or about ${formatMinutes(perChapter)} per chapter. Reading one chapter a day, you finish it in ${book.chapters} days` : ""}.`,
    },
    ...(book.chapters > 1
      ? [
          {
            question: `What is the longest chapter in ${book.name}?`,
            answer: `${ref(book.versesPerChapter.indexOf(longest) + 1)} has the most verses (${longest}); the shortest is ${ref(book.versesPerChapter.indexOf(shortest) + 1)} with ${shortest} verses.`,
          },
        ]
      : []),
    {
      question: `Where is ${book.name} in the Bible?`,
      answer: `${book.name} is the ${ordinal(book.order)} book of the Bible and belongs to the ${book.section} of the ${book.testament} Testament.`,
    },
  ];

  return (
    <TimeToolPage
      crumbs={[
        { href: "/en", label: "Home" },
        { href: CHRISTIAN_TOOLS_PATH, label: "Christian Tools" },
        { href: BIBLE_BOOKS_PATH, label: "Books of the Bible" },
        { href: path, label: book.name },
      ]}
      crumbLabel="Breadcrumb"
      title={`${book.name}: Chapters, Verses and Reading Time`}
      intro={`${book.name} is the ${ordinal(book.order)} book of the Bible (${book.section}, ${book.testament} Testament).`}
      tool={
        <div className="date-calc">
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>Chapters</span>
              <strong>{book.chapters}</strong>
              <em>{fmt(book.verses)} verses (KJV)</em>
            </div>
            <div className="date-calc-stat">
              <span>Reading time</span>
              <strong>{formatMinutes(book.readingMinutes)}</strong>
              <em>
                {fmt(book.words)} words at {READING_WPM} wpm
              </em>
            </div>
            {book.chapters > 1 ? (
              <div className="date-calc-stat">
                <span>Average chapter</span>
                <strong>{Math.round(book.verses / book.chapters)} verses</strong>
                <em>about {formatMinutes(perChapter)} to read</em>
              </div>
            ) : null}
          </div>
        </div>
      }
      related={{
        title: `More from the ${book.section}`,
        links: [
          ...sameSection.map((b) => ({ href: `${BIBLE_BOOKS_PATH}/${b.slug}`, label: b.name })),
          { href: BIBLE_BOOKS_PATH, label: "All books of the Bible" },
        ],
      }}
      tocTitle="Contents"
      tocItems={[
        { id: "chapters", label: `Verses in each chapter of ${book.name}` },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqTitle="Frequently asked questions"
      faqItems={faqItems}
    >
      <h2 id="chapters">Verses in each chapter of {book.name}</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Chapter</th>
              <th scope="col">Verses</th>
            </tr>
          </thead>
          <tbody>
            {book.versesPerChapter.map((v, i) => (
              <tr key={i}>
                <td>{ref(i + 1)}</td>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        {prev ? (
          <>
            Previous book: <Link href={`${BIBLE_BOOKS_PATH}/${prev.slug}`}>{prev.name}</Link>.{" "}
          </>
        ) : null}
        {next ? (
          <>
            Next book: <Link href={`${BIBLE_BOOKS_PATH}/${next.slug}`}>{next.name}</Link>.{" "}
          </>
        ) : null}
        Verse numbers follow the King James Version; some modern translations divide a few verses differently.
      </p>
    </TimeToolPage>
  );
}
