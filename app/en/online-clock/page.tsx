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
  "A live clock with 34 themes: pendulum, cuckoo, tower and ship clocks, pocket watch, skeleton and moon phase watches, flip, nixie. Ticking and chimes.";

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
    question: "Why don't the sounds start by themselves?",
    answer:
      "Browsers don't allow sound without your permission. Press \"Ticking\" or \"Hourly chime\" to start the sounds, and \"Hear the chime\" to hear the hourly chime right away.",
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
      intro="The current time, to the second. Pick one of 34 themes, from a pendulum wall clock to a cuckoo clock, pocket watch or dive watch. Turn on the ticking and hourly chime if you like, and go full screen in one click."
      tool={<LiveClock locale="en" />}
      related={{ title: "More time tools", links: timeRelated.en.tools.filter((t) => t.href !== "/en/online-clock") }}
      tocTitle="Contents"
      tocItems={[
        { id: "themes", label: "Clock themes" },
        { id: "sounds", label: "Ticking sounds and hourly chimes" },
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
        <li>
          <strong>Vintage clocks:</strong> a Pendulum wall clock whose pendulum counts the seconds, a Cuckoo clock whose bird pops out
          on the hour, a Pocket watch with Breguet hands, a Twin-bell alarm clock and glowing Nixie tubes.
        </li>
        <li>
          <strong>Wristwatches:</strong> a Dive watch with rotating bezel, a Chronograph with tachymeter, a gold Dress watch, a Pilot
          watch with 24-hour ring, a Retro digital LCD and a Smartwatch with day-progress rings.
        </li>
      </ul>

      <h2 id="sounds">Ticking sounds and hourly chimes</h2>
      <p>
        Every clock has its own sound, generated live in your browser. The pendulum clock beats once a second with a deep wooden
        tock and plays the Westminster chime on the hour, then strikes the hour. The cuckoo calls once per hour and the twin-bell
        clock rings. The pocket watch ticks 5 times a second and mechanical wristwatches 8 times — and their second hands step
        exactly like the real movements. Quartz hands jump once a second.
      </p>

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
