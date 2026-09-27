import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TimerPresetPage, { timerPresetTitle } from "../../../components/time/TimerPresetPage";
import { findTimerPreset, timerPresetAlternates, timerPresetPath, timerPresets } from "../../../i18n/timerPresets";
import { buildSiteUrl } from "../../../siteConfig";

export const dynamicParams = false;

export function generateStaticParams() {
  return timerPresets.map((preset) => ({ duration: preset.en }));
}

export async function generateMetadata({ params }: { params: Promise<{ duration: string }> }): Promise<Metadata> {
  const preset = findTimerPreset("en", (await params).duration);
  if (!preset) return {};
  const path = timerPresetPath(preset, "en");
  const title = `${timerPresetTitle(preset, "en")}: Countdown With Alarm`;
  const description =
    `A ${preset.labelEn} countdown ready to go: press start and hear an alarm when it ends. End time, your own sound, full screen and +1 minute.`;
  return {
    title,
    description,
    alternates: { canonical: path, ...timerPresetAlternates(preset) },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
  };
}

export default async function TimerPresetRoute({ params }: { params: Promise<{ duration: string }> }) {
  const preset = findTimerPreset("en", (await params).duration);
  if (!preset) notFound();
  return <TimerPresetPage preset={preset} lang="en" />;
}
