import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/app/components/SiteLink";
import CountdownTimer from "../../../components/time/CountdownTimer";
import TimeToolPage from "../../../components/time/TimeToolPage";
import { timeRelated } from "../../../components/time/timeRelatedLinks";
import type { FaqItem } from "../../../converter/faqSchema";
import { parseTimerPresetSlug, timerPresetAlternates, timerPresetMinutes, timerPresetSlug } from "../../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../../siteConfig";

export const dynamicParams = false;

export function generateStaticParams() {
  return timerPresetMinutes.map((minutes) => ({ duration: timerPresetSlug.en(minutes) }));
}

const presetLinks = Object.fromEntries(
  timerPresetMinutes.map((minutes) => [minutes, `/en/timer/${timerPresetSlug.en(minutes)}`]),
);

const usesByMinutes: Record<number, string[]> = {
  1: ["A quick stretch or plank", "A one-minute speech drill", "Half of a proper tooth-brushing"],
  2: ["Brushing your teeth (recommended time)", "Instant noodles", "A short breathing exercise"],
  3: ["Soft-boiled egg", "Steeping a tea bag", "A lightning talk"],
  5: ["A Pomodoro short break", "A quick warm-up", "Green tea"],
  10: ["Hard-boiled eggs", "A short meditation", "A quick tidy-up"],
  15: ["A power nap", "A quiz section", "Reading break"],
  20: ["A short nap", "Roasted vegetables", "A reading session"],
  25: ["A Pomodoro work block", "Baking cupcakes", "Deep-focus work"],
  30: ["A study session", "A brisk walk", "A long Pomodoro break"],
  45: ["A class period", "A workout", "Roast chicken pieces"],
  60: ["An exam", "A long work block", "Slow-cooked dishes"],
};

export async function generateMetadata({ params }: { params: Promise<{ duration: string }> }): Promise<Metadata> {
  const minutes = parseTimerPresetSlug((await params).duration);
  if (!minutes) return {};
  const path = `/en/timer/${timerPresetSlug.en(minutes)}`;
  const title = `${minutes} Minute Timer: Countdown With Alarm`;
  const description = `A ${minutes}-minute countdown ready to go: press start and hear an alarm when it ends. Pause, add a minute or go full screen.`;
  return {
    title,
    description,
    alternates: { canonical: path, ...timerPresetAlternates(minutes) },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
  };
}

export default async function EnglishTimerPresetPage({ params }: { params: Promise<{ duration: string }> }) {
  const minutes = parseTimerPresetSlug((await params).duration);
  if (!minutes) notFound();
  const path = `/en/timer/${timerPresetSlug.en(minutes)}`;
  const seconds = minutes * 60;
  const unit = minutes === 1 ? "minute" : "minutes";

  const faqItems: FaqItem[] = [
    {
      question: `How many seconds are in ${minutes} ${unit}?`,
      answer: `${minutes} ${unit} = ${seconds.toLocaleString("en-US")} seconds = ${(minutes / 60).toLocaleString("en-US", { maximumFractionDigits: 3 })} hours.`,
    },
    {
      question: `Does the ${minutes} minute timer run in the background?`,
      answer: "Yes. It follows the real clock, so it ends on time even if you switch tabs. Just keep the tab open.",
    },
    {
      question: "Can I change the time?",
      answer: `Yes. ${minutes} ${unit} is only the starting value; pick another preset or enter your own time.`,
    },
  ];

  return (
    <TimeToolPage
      crumbs={[
        { href: "/en", label: "Home" },
        { href: "/en/timer", label: "Timer" },
        { href: path, label: `${minutes} Minute Timer` },
      ]}
      crumbLabel="Breadcrumb"
      title={`${minutes} Minute Timer`}
      intro={`A ${minutes}-minute (${seconds.toLocaleString("en-US")} seconds) countdown is ready. Press "Start"; an alarm sounds when time is up.`}
      tool={<CountdownTimer locale="en" initialSeconds={seconds} presetLinks={presetLinks} />}
      related={{ title: "Other timers", links: timeRelated.en.timers.filter((link) => link.href !== path) }}
      tocTitle="Contents"
      tocItems={[
        { id: "uses", label: `What can you do in ${minutes} ${unit}?` },
        { id: "faq", label: "FAQ" },
      ]}
      faqTitle="Frequently Asked Questions"
      faqItems={faqItems}
    >
      <h2 id="uses">
        What can you do in {minutes} {unit}?
      </h2>
      <ul>
        {(usesByMinutes[minutes] ?? []).map((use) => (
          <li key={use}>{use}</li>
        ))}
      </ul>
      <p>
        {minutes} {unit} = {seconds.toLocaleString("en-US")} seconds. For any other length, use the main{" "}
        <Link href="/en/timer">online timer</Link>.
      </p>
    </TimeToolPage>
  );
}
