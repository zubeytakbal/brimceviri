import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NordicTimerPresetPage, { nordicTimerPresetMetadata } from "../../../components/time/NordicTimerPresetPage";
import { findNordicTimerSeconds, NORDIC_TIMER_SECONDS, nordicTimerSlug } from "../../../i18n/nordicTimerPresets";

export const dynamicParams = false;

type PageProps = { params: Promise<{ tid: string }> };

export function generateStaticParams() {
  return NORDIC_TIMER_SECONDS.map((s) => ({ tid: nordicTimerSlug("sv", s) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const seconds = findNordicTimerSeconds("sv", (await params).tid);
  return seconds ? nordicTimerPresetMetadata("sv", seconds) : {};
}

export default async function Route({ params }: PageProps) {
  const seconds = findNordicTimerSeconds("sv", (await params).tid);
  if (!seconds) notFound();
  return <NordicTimerPresetPage locale="sv" seconds={seconds} />;
}
