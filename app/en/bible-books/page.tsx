import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { BibleBookFinder } from "../../components/christian/ChristianTools";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { BIBLE_BOOKS, BIBLE_TOTALS, findBibleBook, formatMinutes, READING_WPM, testamentTotals } from "../../converter/christian/christianCalc";
import { BIBLE_BOOKS_PATH, CHRISTIAN_TOOLS_PATH, christianRelated } from "../../i18n/englishChristianTools";
import { buildSiteUrl } from "../../siteConfig";

const path = BIBLE_BOOKS_PATH;
const title = "Books of the Bible: Chapters, Verses & Reading Time";
const description = "All 66 books of the Bible with the number of chapters and verses in each, reading time per book, and Old and New Testament totals (KJV).";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

const fmt = (n: number) => n.toLocaleString("en-US");
const ot = testamentTotals("Old");
const nt = testamentTotals("New");
const byChapters = [...BIBLE_BOOKS].sort((a, b) => b.chapters - a.chapters);
const byVerses = [...BIBLE_BOOKS].sort((a, b) => a.verses - b.verses);
const psalms = findBibleBook("psalms")!;
const totalHours = BIBLE_TOTALS.words / READING_WPM / 60;

const faqItems: FaqItem[] = [
  {
    question: "How many books, chapters and verses are in the Bible?",
    answer: `The Protestant Bible has ${BIBLE_TOTALS.books} books, ${fmt(BIBLE_TOTALS.chapters)} chapters and ${fmt(BIBLE_TOTALS.verses)} verses in the King James Version: ${ot.books} books in the Old Testament and ${nt.books} in the New Testament.`,
  },
  {
    question: "Which book of the Bible has the most chapters?",
    answer: `${byChapters[0].name}, with ${byChapters[0].chapters} chapters. Psalm ${psalms.versesPerChapter.indexOf(Math.max(...psalms.versesPerChapter)) + 1} is the longest chapter (${Math.max(...psalms.versesPerChapter)} verses) and Psalm ${psalms.versesPerChapter.indexOf(Math.min(...psalms.versesPerChapter)) + 1} the shortest (${Math.min(...psalms.versesPerChapter)} verses).`,
  },
  {
    question: "What is the shortest book of the Bible?",
    answer: `By verses, ${byVerses[0].name} (${byVerses[0].verses} verses in the KJV), followed by ${byVerses[1].name} (${byVerses[1].verses}).`,
  },
  {
    question: "How long does it take to read the whole Bible?",
    answer: `About ${Math.round(totalHours)} hours at ${READING_WPM} words per minute: roughly ${Math.round(ot.words / READING_WPM / 60)} hours for the Old Testament and ${Math.round(nt.words / READING_WPM / 60)} hours for the New Testament.`,
  },
  {
    question: "Why does the Catholic Bible have more books?",
    answer:
      "Catholic Bibles include seven deuterocanonical books (Tobit, Judith, 1 and 2 Maccabees, Wisdom, Sirach and Baruch) and additions to Esther and Daniel, for 73 books. This page covers the 66 books of the Protestant canon.",
  },
];

export default function BibleBooksPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/en", label: "Home" },
        { href: CHRISTIAN_TOOLS_PATH, label: "Christian Tools" },
        { href: path, label: "Books of the Bible" },
      ]}
      crumbLabel="Breadcrumb"
      title="Books of the Bible"
      intro={`All ${BIBLE_TOTALS.books} books in order, with chapters, verses and reading time. Search by name or section, or open a book for its chapter-by-chapter verse counts.`}
      tool={<BibleBookFinder />}
      related={{ title: "More Christian tools", links: christianRelated(path) }}
      tocTitle="Contents"
      tocItems={[
        { id: "totals", label: "Bible totals" },
        { id: "sections", label: "Sections of the Bible" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqTitle="Frequently asked questions"
      faqItems={faqItems}
    >
      <h2 id="totals">Bible totals</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Books</th>
              <th scope="col">Chapters</th>
              <th scope="col">Verses</th>
              <th scope="col">Reading time</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Old Testament", ot],
              ["New Testament", nt],
              ["Whole Bible", BIBLE_TOTALS],
            ].map(([label, t]) => {
              const x = t as typeof ot;
              return (
                <tr key={label as string}>
                  <td>{label as string}</td>
                  <td>{x.books}</td>
                  <td>{fmt(x.chapters)}</td>
                  <td>{fmt(x.verses)}</td>
                  <td>{formatMinutes(x.words / READING_WPM)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <h2 id="sections">Sections of the Bible</h2>
      <ul>
        {[...new Set(BIBLE_BOOKS.map((b) => `${b.testament}|${b.section}`))].map((key) => {
          const [testament, section] = key.split("|");
          const books = BIBLE_BOOKS.filter((b) => b.testament === testament && b.section === section);
          return (
            <li key={key}>
              <strong>
                {section} ({testament} Testament):
              </strong>{" "}
              {books.map((b, i) => (
                <span key={b.slug}>
                  {i > 0 ? ", " : ""}
                  <Link href={`${BIBLE_BOOKS_PATH}/${b.slug}`}>{b.name}</Link>
                </span>
              ))}
            </li>
          );
        })}
      </ul>
      <p>
        Counts follow the King James Version. Modern translations sometimes number verses differently (3 John has 15 verses in some editions),
        and reading times assume {READING_WPM} words per minute; reading aloud is slower.
      </p>
    </TimeToolPage>
  );
}
