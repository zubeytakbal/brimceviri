import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import LiveClock from "../../components/time/LiveClock";
import TimeToolPage from "../../components/time/TimeToolPage";
import { timeRelated } from "../../components/time/timeRelatedLinks";
import type { FaqItem } from "../../converter/faqSchema";
import { timeToolAlternates } from "../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../siteConfig";

const title = "Online Clock: What Time Is It? Full Screen";
const description =
  "A live clock to the second: 13 themes (analog, station, flip, neon, LED, binary…), 12/24-hour, date and a one-click full screen desk clock.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/en/online-clock", ...timeToolAlternates("clock") },
  openGraph: { title, description, url: buildSiteUrl("/en/online-clock"), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "How accurate is this clock?",
    answer:
      "It shows your device's system time. Computers and phones sync their clocks over the internet automatically, so they are usually accurate to well under a second. If yours is off, turn on \"set time automatically\" in your device settings.",
  },
  {
    question: "How do I make the clock full screen?",
    answer: "Press the ⛶ icon in the top-right corner or the \"Full screen\" button. Press Esc or ✕ to exit. On phones, \"Keep screen awake\" stops the screen from dimming.",
  },
  {
    question: "Is my theme saved?",
    answer: "Yes. Your theme, 12/24-hour, seconds and date settings are stored in this browser, so the clock opens the same way next time.",
  },
  {
    question: "How do I read the binary clock?",
    answer:
      "Each column is one digit of the time. From bottom to top the dots are worth 1, 2, 4 and 8; add up the lit dots to get the digit. For example, 4 and 1 lit means 5. The digits are also printed under each column.",
  },
];

export default function EnglishOnlineClockPage() {
  return (
    <TimeToolPage
      crumbs={[{ href: "/en", label: "Home" }, { href: "/en/online-clock", label: "Online Clock" }]}
      crumbLabel="Breadcrumb"
      title="Online Clock"
      intro="The current time, to the second. Pick one of 13 themes, choose 12/24-hour and the date, and turn it into a full screen desk clock in one click."
      tool={<LiveClock locale="en" />}
      related={{ title: "More time tools", links: timeRelated.en.tools.filter((t) => t.href !== "/en/online-clock") }}
      tocTitle="Contents"
      tocItems={[
        { id: "themes", label: "Clock themes" },
        { id: "desk-clock", label: "Use it as a desk clock or display" },
        { id: "time-zones", label: "Time zones" },
        { id: "faq", label: "FAQ" },
      ]}
      faqTitle="Frequently Asked Questions"
      faqItems={faqItems}
    >
      <h2 id="themes">Clock themes</h2>
      <ul>
        <li>
          <strong>Analog:</strong> Classic (smooth sweeping second hand), Station (bold bars and a red lollipop second hand), Roman
          numerals, Gold, and Night for dark rooms.
        </li>
        <li>
          <strong>Digital:</strong> Digital, Minimal, Sunset, Flip with folding cards, glowing Neon, red LED, green Terminal and a
          Binary clock.
        </li>
      </ul>

      <h2 id="desk-clock">Use it as a desk clock or display</h2>
      <p>
        In full screen the clock fills the display, making a stylish desk clock for a second monitor, TV or tablet. Digital and LED
        read well from across a classroom, exam hall or live stream; Night is easy on the eyes at your bedside.
      </p>

      <h2 id="time-zones">Time zones</h2>
      <p>
        The clock follows your browser&apos;s time zone, shown under the clock, and adjusts automatically for daylight saving time
        where it applies. To wake up at a set time use the <Link href="/en/alarm-clock">alarm clock</Link>; to count down, use the{" "}
        <Link href="/en/timer">timer</Link>.
      </p>
    </TimeToolPage>
  );
}
