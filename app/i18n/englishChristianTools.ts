// English Christian calculators: calculator menu, site search and related links.

export const englishChristianTools = [
  {
    id: "tithe-calculator",
    href: "/en/tithe-calculator",
    title: "Tithe Calculator",
    description: "Ten percent (or any percentage) of your pay per paycheck, month and year, on gross and on net income.",
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
