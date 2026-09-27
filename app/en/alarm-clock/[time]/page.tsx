import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/app/components/SiteLink";
import AlarmClock from "../../../components/time/AlarmClock";
import TimeToolPage from "../../../components/time/TimeToolPage";
import { timeRelated } from "../../../components/time/timeRelatedLinks";
import type { FaqItem } from "../../../converter/faqSchema";
import { alarmPresetAlternates, alarmPresetSlug, alarmPresetTimes, formatEnglishTime } from "../../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../../siteConfig";

export const dynamicParams = false;

export function generateStaticParams() {
  return alarmPresetTimes.map((time) => ({ time: alarmPresetSlug.en(time) }));
}

function findTime(slug: string) {
  return alarmPresetTimes.find((time) => alarmPresetSlug.en(time) === slug) ?? null;
}

function addMinutes(time: string, delta: number) {
  const [h, m] = time.split(":").map(Number);
  const total = (((h * 60 + m + delta) % 1440) + 1440) % 1440;
  return formatEnglishTime(`${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`);
}

export async function generateMetadata({ params }: { params: Promise<{ time: string }> }): Promise<Metadata> {
  const time = findTime((await params).time);
  if (!time) return {};
  const label = formatEnglishTime(time);
  const path = `/en/alarm-clock/${alarmPresetSlug.en(time)}`;
  const title = `Set Alarm for ${label}: One-Click Alarm Clock`;
  const description = `An alarm for ${label} is ready: set it in one click, pick a sound, snooze. Plus the best bedtimes for waking up at ${label}.`;
  return {
    title,
    description,
    alternates: { canonical: path, ...alarmPresetAlternates(time) },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
  };
}

export default async function EnglishAlarmPresetPage({ params }: { params: Promise<{ time: string }> }) {
  const time = findTime((await params).time);
  if (!time) notFound();
  const label = formatEnglishTime(time);
  const path = `/en/alarm-clock/${alarmPresetSlug.en(time)}`;
  const bedTimes = [6, 5, 4].map((cycles) => ({ cycles, bed: addMinutes(time, -15 - cycles * 90) }));

  const faqItems: FaqItem[] = [
    {
      question: `What time should I go to bed to wake up at ${label}?`,
      answer: `Using 90-minute sleep cycles plus 15 minutes to fall asleep: ${bedTimes[0].bed} for 6 cycles, ${bedTimes[1].bed} for 5 cycles, ${bedTimes[2].bed} for 4 cycles.`,
    },
    {
      question: `Will the ${label} alarm ring if the tab is closed?`,
      answer: "No, it rings while the tab is open. You can leave it in the background and use \"Keep screen awake\" to stop the device from sleeping.",
    },
    {
      question: "Can I change the alarm time?",
      answer: `Yes. ${label} is only the preset; use the hour and minute pickers to choose any time.`,
    },
  ];

  return (
    <TimeToolPage
      crumbs={[
        { href: "/en", label: "Home" },
        { href: "/en/alarm-clock", label: "Alarm Clock" },
        { href: path, label: `${label} Alarm` },
      ]}
      crumbLabel="Breadcrumb"
      title={`Set Alarm for ${label}`}
      intro={`The alarm is preset to ${label}. Press "Add alarm", and change the sound or label if you like. Below you'll find the best bedtimes for waking up refreshed at ${label}.`}
      tool={<AlarmClock locale="en" initialTime={time} />}
      related={{ title: "Other alarm times", links: timeRelated.en.alarms.filter((link) => link.href !== path) }}
      tocTitle="Contents"
      tocItems={[
        { id: "bedtime", label: `Bedtime for a ${label} wake-up` },
        { id: "faq", label: "FAQ" },
      ]}
      faqTitle="Frequently Asked Questions"
      faqItems={faqItems}
    >
      <h2 id="bedtime">What time to go to bed to wake up at {label}</h2>
      <p>Based on 90-minute sleep cycles, including 15 minutes to fall asleep:</p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Cycles</th>
              <th>Sleep</th>
              <th>Bedtime</th>
            </tr>
          </thead>
          <tbody>
            {bedTimes.map(({ cycles, bed }) => (
              <tr key={cycles}>
                <td>{cycles} cycles</td>
                <td>{cycles * 1.5} hours</td>
                <td>
                  <strong>{bed}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        For any other time, use the <Link href="/en/sleep-calculator">sleep calculator</Link>.
      </p>
    </TimeToolPage>
  );
}
