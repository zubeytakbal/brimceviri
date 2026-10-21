import type { Metadata } from "next";
import { appManifestPath, findInstallableApp } from "../../converter/time/installableApps";
import { notFound } from "next/navigation";
import TimerPresetPage, { timerPresetTitle } from "../../components/time/TimerPresetPage";
import { geriGelenSureler, timerPresetPath, trLik } from "../../i18n/timerPresets";
import { buildSiteUrl } from "../../siteConfig";

export const dynamicParams = false;

// Yalnızca birleştirmeden sonra da aranan süreler (diğerleri /zamanlayici?s= adresine yönlenir).
export function generateStaticParams() {
  return geriGelenSureler().map((preset) => ({ sure: preset.tr }));
}

export async function generateMetadata({ params }: { params: Promise<{ sure: string }> }): Promise<Metadata> {
  const sure = (await params).sure;
  const preset = geriGelenSureler().find((p) => p.tr === sure);
  if (!preset) return {};
  const path = timerPresetPath(preset, "tr");
  const title = `${timerPresetTitle(preset, "tr")}: Sesli Geri Sayım`;
  const description =
    `${trLik(preset)} geri sayım hazır: başlat'a bas, süre bitince sesli uyarı al. Bitiş saati, kendi müziğin, tam ekran ve +1 dakika.`;
  return {
    title,
    description,
    manifest: appManifestPath("zamanlayici"),
    appleWebApp: { capable: true, title: findInstallableApp("zamanlayici")!.shortName },
    alternates: { canonical: path },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
  };
}

export default async function TimerPresetRoute({ params }: { params: Promise<{ sure: string }> }) {
  const sure = (await params).sure;
  const preset = geriGelenSureler().find((p) => p.tr === sure);
  if (!preset) notFound();
  return <TimerPresetPage preset={preset} lang="tr" />;
}
