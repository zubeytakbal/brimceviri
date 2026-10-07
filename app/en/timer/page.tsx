import type { Metadata } from "next";
import { appManifestPath, findInstallableApp } from "../../converter/time/installableApps";
import CountdownTimer from "../../components/time/CountdownTimer";
import TimeToolPage from "../../components/time/TimeToolPage";
import { timeRelated } from "../../components/time/timeRelatedLinks";
import type { FaqItem } from "../../converter/faqSchema";
import { timeToolAlternates } from "../../i18n/timeToolPaths";
import TimerPresetTable from "../../components/time/TimerPresetTable";
import { timerPresets } from "../../i18n/timerPresets";
import { buildSiteUrl } from "../../siteConfig";

const title = "Online Timer: Countdown With Alarm";
const description =
  "Free online countdown timer: pick a time, press start and hear an alarm when it ends. 1-60 minute presets, full screen, pause and +1 minute.";

export const metadata: Metadata = {
  title,
  description,
  manifest: appManifestPath("timer"),
  appleWebApp: { capable: true, title: findInstallableApp("timer")!.shortName },
  alternates: { canonical: "/en/timer", ...timeToolAlternates("timer") },
  openGraph: { title, description, url: buildSiteUrl("/en/timer"), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};


const faqItems: FaqItem[] = [
  {
    question: "Does the timer keep running in the background?",
    answer:
      "Yes. Time is measured against the real clock, so it ends on time even if you switch tabs. Just don't close the tab; on phones, tap \"Keep screen awake\".",
  },
  {
    question: "What happens when time is up?",
    answer: "Your chosen sound plays, the ring completes and the tab title flashes. Press \"Stop\" to silence it or start the same time again.",
  },
  {
    question: "How do I go full screen?",
    answer: "Press \"Full screen\" under the timer. Great for classrooms, presentations and exams where the timer must be read from a distance.",
  },
  {
    question: "Can I set a timer for several hours?",
    answer: "Yes. Enter any duration up to 99 hours in the hours, minutes and seconds fields.",
  },
];

export default function EnglishTimerPage() {
  const related = timeRelated.en;
  return (
    <TimeToolPage
      crumbs={[{ href: "/en", label: "Home" }, { href: "/en/timer", label: "Timer" }]}
      crumbLabel="Breadcrumb"
      install={{ name: "Timer", lang: "en" }}
      title="Online Timer"
      intro="Tap a preset or enter your own time and press start. An alarm sounds when time is up. Pause, add a minute or go full screen."
      tool={<CountdownTimer locale="en" />}
      related={{ title: "More time tools", links: related.tools.filter((t) => t.href !== "/en/timer") }}
      tocTitle="Contents"
      tocItems={[
        { id: "how", label: "How to use the timer" },
        { id: "presets", label: "Preset times and what they are for" },
        { id: "uses", label: "Popular uses" },
        { id: "accuracy", label: "How accurate is it?" },
        { id: "faq", label: "FAQ" },
      ]}
      faqTitle="Frequently Asked Questions"
      faqItems={faqItems}
    >
      <h2 id="how">How to use the timer</h2>
      <ol>
        <li>Tap a preset (1, 5, 10, 30 minutes…) or type hours, minutes and seconds.</li>
        <li>Press &quot;Start&quot;. The ring and the tab title show the time left.</li>
        <li>Use &quot;Pause&quot;, &quot;+1 min&quot; or &quot;Reset&quot; whenever you need.</li>
        <li>When time is up, your chosen sound plays.</li>
      </ol>

      <TimerPresetTable
        id="presets"
        heading="Preset times and what they are for"
        intro="Tap a time to set the timer to it; the address updates so you can bookmark or share that countdown."
        durationLabel="Time"
        usesLabel="Good for"
        rows={timerPresets.map((p) => ({ seconds: p.seconds, label: p.labelEn.startsWith("1 ") ? p.labelEn : `${p.labelEn}s`, uses: p.usesEn }))}
      />

      <h2 id="uses">Popular uses</h2>
      <ul>
        <li>Kitchen: boiled eggs (7-10 minutes), pasta (8-12 minutes), steeping tea (3-5 minutes).</li>
        <li>Study and focus: 25 minutes of work, 5 minutes of rest.</li>
        <li>Workouts: planks, stretching and rest intervals.</li>
        <li>Classrooms, presentations and meetings.</li>
      </ul>

      <h2 id="accuracy">How accurate is it?</h2>
      <p>
        The timer reads the real clock on every frame, so even if the browser slows down background tabs, the remaining time never
        drifts and the alarm fires at the right moment. Sound depends on your device volume; check it first with &quot;Test
        sound&quot;.
      </p>
    </TimeToolPage>
  );
}
