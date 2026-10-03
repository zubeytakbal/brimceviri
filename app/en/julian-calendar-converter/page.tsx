import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { JulianDateConverter } from "../../components/christian/OrthodoxFasting";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { formatLongDate } from "../../converter/christian/christianCalc";
import { julianToGregorian } from "../../converter/christian/orthodoxFasting";
import { CHRISTIAN_TOOLS_PATH, christianRelated } from "../../i18n/englishChristianTools";
import { buildSiteUrl } from "../../siteConfig";

const path = "/en/julian-calendar-converter";
const year = new Date().getFullYear();
const title = "Julian Calendar Converter: Old Style ↔ New Style Dates";
const description = "Convert dates between the Julian (old style) and Gregorian (new style) calendars. Why Orthodox Christmas is on January 7 and old-calendar feast dates.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

const g = (m: number, d: number) => formatLongDate(julianToGregorian({ year, month: m, day: d }));
const feasts: Array<[string, number, number]> = [
  ["Christmas (Nativity)", 12, 25],
  ["Theophany (Epiphany)", 1, 6],
  ["Annunciation", 3, 25],
  ["Sts Peter and Paul", 6, 29],
  ["Transfiguration", 8, 6],
  ["Dormition of the Theotokos", 8, 15],
  ["Elevation of the Cross", 9, 14],
  ["Old New Year", 1, 1],
];

const faqItems: FaqItem[] = [
  {
    question: "Why is Orthodox Christmas on January 7?",
    answer:
      "Old-calendar churches celebrate Christmas on December 25 of the Julian calendar. Between 1900 and 2099 the Julian calendar runs 13 days behind the Gregorian one, so December 25 (Julian) is January 7 in the civil calendar.",
  },
  {
    question: "How many days apart are the Julian and Gregorian calendars?",
    answer: "13 days from 1 March 1900 to 28 February 2100. The gap grows by one day in 2100, because 2100 is a leap year only in the Julian calendar.",
  },
  {
    question: "What is the Old New Year?",
    answer: `January 1 on the Julian calendar, which is January 14 in the civil calendar. It is still celebrated in Russia, Serbia and other countries.`,
  },
];

export default function JulianConverterPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/en", label: "Home" },
        { href: CHRISTIAN_TOOLS_PATH, label: "Christian Tools" },
        { href: path, label: "Julian Calendar Converter" },
      ]}
      crumbLabel="Breadcrumb"
      title="Julian Calendar Converter"
      intro="Convert a date between the Julian calendar (old style, used by old-calendar Orthodox churches) and the Gregorian calendar (new style, the civil calendar)."
      tool={<JulianDateConverter initialDate={`${year}-01-01`} />}
      related={{ title: "More Christian tools", links: christianRelated(path) }}
      tocTitle="Contents"
      tocItems={[
        { id: "feasts", label: `Old-calendar feast days in ${year}` },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqTitle="Frequently asked questions"
      faqItems={faqItems}
    >
      <h2 id="feasts">Old-calendar feast days in civil dates</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Feast</th>
              <th scope="col">Church (Julian) date</th>
              <th scope="col">Civil (Gregorian) date</th>
            </tr>
          </thead>
          <tbody>
            {feasts.map(([name, m, d]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][m - 1]} {d}
                </td>
                <td>{g(m, d)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        For the fasts that follow these dates, see the <Link href="/en/orthodox-fasting-calendar">Orthodox fasting calendar</Link>.
      </p>
    </TimeToolPage>
  );
}
