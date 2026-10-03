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
  {
    id: "bible-reading-plan",
    href: "/en/bible-reading-plan",
    title: "Bible Reading Plan Calculator",
    description: "Chapters per day for any plan length, a day-by-day schedule, and a catch-up calculator if you fell behind.",
  },
  {
    id: "novena-calculator",
    href: "/en/novena-calculator",
    title: "Novena Start Date Calculator",
    description: "When to start a novena so it ends on the eve of the feast: St. Jude, St. Michael, Divine Mercy, Christmas and more.",
  },
  {
    id: "rosary",
    href: "/en/rosary",
    title: "Rosary Mysteries of the Day",
    description: "Which mysteries to pray today, and a tap-through guide that keeps count of every decade and Hail Mary.",
  },
  {
    id: "tithe-calculator",
    href: "/en/tithe-calculator",
    title: "Tithe Calculator",
    description: "Ten percent (or any percentage) of your pay per paycheck, month and year, on gross and on net income.",
  },
  {
    id: "liturgical-calendar",
    href: "/en/liturgical-calendar",
    title: "Liturgical Calendar",
    description: "Today's liturgical season, color and week, and the lectionary cycle (Year A, B or C).",
  },
  {
    id: "orthodox-fasting-calendar",
    href: "/en/orthodox-fasting-calendar",
    title: "Orthodox Fasting Calendar",
    description: "Is today a fast day? Old and new calendar, Apostles' Fast length, Great Lent, Dormition and Nativity Fasts.",
  },
  {
    id: "julian-calendar-converter",
    href: "/en/julian-calendar-converter",
    title: "Julian Calendar Converter",
    description: "Old style ↔ new style dates, and why Orthodox Christmas falls on January 7.",
  },
] as const;

export function christianRelated(exclude: string) {
  return englishChristianTools.filter((tool) => tool.href !== exclude).map(({ href, title }) => ({ href, label: title }));
}
