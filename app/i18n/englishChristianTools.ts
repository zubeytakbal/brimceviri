// English Christian tools: /en/christian-tools hub, calculator menu and site search.
// Fixed rules only (Easter computus, Lent counting, KJV book data).

export const CHRISTIAN_TOOLS_PATH = "/en/christian-tools";
export const BIBLE_BOOKS_PATH = "/en/bible-books";

export const englishChristianTools = [
  {
    id: "easter-date-calculator",
    href: "/en/easter-date-calculator",
    title: "Easter Date Calculator",
    description: "Western and Orthodox Easter for any year, with Ash Wednesday, Good Friday, Ascension and Pentecost.",
  },
  {
    id: "lent-calculator",
    href: "/en/lent-calculator",
    title: "Lent Calculator",
    description: "Which day of Lent is it? The 40 days without Sundays, days left until Easter, and Orthodox Great Lent.",
  },
  {
    id: "bible-books",
    href: BIBLE_BOOKS_PATH,
    title: "Books of the Bible",
    description: "All 66 books: chapters, verses and reading time for each book, Old and New Testament totals.",
  },
] as const;

export function christianRelated(exclude: string) {
  return englishChristianTools.filter((tool) => tool.href !== exclude).map(({ href, title }) => ({ href, label: title }));
}
