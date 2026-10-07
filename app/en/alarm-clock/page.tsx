import type { Metadata } from "next";
import { appManifestPath, findInstallableApp } from "../../converter/time/installableApps";
import Link from "@/app/components/SiteLink";
import AlarmPresetTable from "../../components/time/AlarmPresetTable";
import { formatEnglishTime } from "../../i18n/timeToolPaths";
import AlarmClock from "../../components/time/AlarmClock";
import TimeToolPage from "../../components/time/TimeToolPage";
import { timeRelated } from "../../components/time/timeRelatedLinks";
import type { FaqItem } from "../../converter/faqSchema";
import { timeToolAlternates } from "../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../siteConfig";

const title = "Online Alarm Clock: Set an Alarm Free";
const description =
  "Set an alarm in your browser in seconds: pick a time, sound and label, add as many alarms as you need. Snooze, keep-screen-awake and no app to install.";

export const metadata: Metadata = {
  title,
  description,
  manifest: appManifestPath("alarm-clock"),
  appleWebApp: { capable: true, title: findInstallableApp("alarm-clock")!.shortName },
  alternates: { canonical: "/en/alarm-clock", ...timeToolAlternates("alarm") },
  openGraph: { title, description, url: buildSiteUrl("/en/alarm-clock"), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Will the alarm ring if I close the tab?",
    answer:
      "No. An online alarm clock runs while its tab is open. You can switch to other tabs, but don't close this one, and make sure the computer doesn't go to sleep.",
  },
  {
    question: "Does it work on my phone?",
    answer:
      "Yes, but phones may pause web pages when the screen locks. Tap \"Keep screen awake\" and leave the phone on charge. For a critical wake-up, set your phone's built-in alarm as a backup.",
  },
  {
    question: "Are my alarms saved?",
    answer: "Alarms are stored only in this browser (localStorage) and never sent to a server. They are still there when you come back.",
  },
  {
    question: "Why didn't I hear the sound?",
    answer:
      "Browsers block audio until you interact with the page. Pressing any button while setting the alarm is enough. Use \"Test sound\" and check that your device volume is up.",
  },
  {
    question: "How many alarms can I set?",
    answer: "There is no limit. Each alarm has its own label, sound and volume, and can be switched on or off individually.",
  },
];

export default function EnglishAlarmClockPage() {
  const related = timeRelated.en;
  return (
    <TimeToolPage
      crumbs={[{ href: "/en", label: "Home" }, { href: "/en/alarm-clock", label: "Alarm Clock" }]}
      crumbLabel="Breadcrumb"
      install={{ name: "Alarm Clock", lang: "en" }}
      title="Online Alarm Clock"
      intro="Pick a time, choose a sound and add the alarm. A free alarm clock that runs in your browser: multiple alarms, 5-minute snooze and keep-screen-awake support."
      tool={<AlarmClock locale="en" />}
      related={{ title: "More time tools", links: related.tools.filter((t) => t.href !== "/en/alarm-clock") }}
      tocTitle="Contents"
      tocItems={[
        { id: "how", label: "How to set an online alarm" },
        { id: "reliable", label: "Making sure the alarm rings" },
        { id: "sounds", label: "Alarm sounds" },
        { id: "sleep", label: "What time should I set my alarm for?" },
        { id: "bedtimes", label: "Bedtime for each wake-up time" },
        { id: "faq", label: "FAQ" },
      ]}
      faqTitle="Frequently Asked Questions"
      faqItems={faqItems}
    >
      <h2 id="how">How to set an online alarm</h2>
      <ol>
        <li>Choose the hour and minute, or tap a quick button such as &quot;+10 min&quot; or &quot;+30 min&quot;.</li>
        <li>Optionally give the alarm a label (e.g. &quot;Medicine&quot;, &quot;Meeting&quot;).</li>
        <li>Pick a sound and volume, then check it with &quot;Test sound&quot;.</li>
        <li>Press &quot;Add alarm&quot;. The time left shows in the list and in the tab title.</li>
      </ol>
      <p>When the alarm rings, press &quot;Snooze 5 min&quot; or &quot;Stop&quot;.</p>

      <h2 id="reliable">Making sure the alarm rings</h2>
      <ul>
        <li>Keep the tab open; switching to another tab is fine.</li>
        <li>Stop the computer from sleeping, or use &quot;Keep screen awake&quot;.</li>
        <li>Check the volume and speakers; with headphones plugged in, sound plays there.</li>
        <li>For important wake-ups, set your phone&apos;s built-in alarm as a backup.</li>
      </ul>

      <h2 id="sounds">Alarm sounds</h2>
      <p>
        Four sounds are available: classic bell, soft chime, digital beep and a calm tone. They are generated live in the browser
        without downloading files, so they play instantly even on a slow connection.
      </p>

      <h2 id="sleep">What time should I set my alarm for?</h2>
      <p>
        Sleep runs in cycles of about 90 minutes, and waking at the end of a cycle feels easier. Find your best wake-up time with the{" "}
        <Link href="/en/sleep-calculator">sleep calculator</Link>, then set the alarm here.
      </p>

      <AlarmPresetTable
        id="bedtimes"
        heading="Bedtime for each wake-up time"
        intro="Based on 90-minute sleep cycles plus 15 minutes to fall asleep. Tap a wake-up time to set the alarm to it."
        wakeLabel="Wake up at"
        cycleLabel={(c, h) => `${c} cycles (${h} h)`}
        format={formatEnglishTime}
      />
    </TimeToolPage>
  );
}
