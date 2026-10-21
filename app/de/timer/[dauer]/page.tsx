import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GermanTimerPresetPage from "../../../components/time/GermanTimerPresetPage";
import { findTimerPresetDe, timerLabelDe, timerPathDe, timerSlugDe } from "../../../i18n/germanTimeTools";
import { timerPresetAlternates, timerPresets } from "../../../i18n/timerPresets";
import { seoTitle } from "../../../seoTitle";
import { buildSiteUrl } from "../../../siteConfig";

export const dynamicParams = false;

type PageProps = { params: Promise<{ dauer: string }> };

export function generateStaticParams() {
  return timerPresets.map((p) => ({ dauer: timerSlugDe(p) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const preset = findTimerPresetDe((await params).dauer);
  if (!preset) return {};
  const label = timerLabelDe(preset);
  const path = timerPathDe(preset);
  const title = `Timer ${label}: Countdown mit Alarm`;
  const description = `Timer auf ${label} ist eingestellt: Start drücken, am Ende ertönt ein Signal. Mit Endzeit, eigenem Ton, Vollbild und +1 Minute – kostenlos im Browser.`;
  return {
    title: seoTitle(title, `Timer ${label}`),
    description,
    alternates: { canonical: path, ...timerPresetAlternates(preset) },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
  };
}

export default async function GermanTimerPresetRoute({ params }: PageProps) {
  const preset = findTimerPresetDe((await params).dauer);
  if (!preset) notFound();
  return <GermanTimerPresetPage preset={preset} />;
}
