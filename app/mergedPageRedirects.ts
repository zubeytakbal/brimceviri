// Şablon sayfaların ana araç sayfalarına birleştirilmesiyle kaldırılan adresler (301).
// Hazır süre ve saat sayfaları, değer korunarak ana araca yönlenir (?s= saniye, ?t= saat).
import { alarmPresetSlug, alarmPresetTimes, alarmSlugDe } from "./i18n/timeToolPaths";
import { NORDIC_TIMER_SECONDS, nordicTimerPath } from "./i18n/nordicTimerPresets";
import { timerPresetPath, timerPresets } from "./i18n/timerPresets";
import { fxContentBn, fxPairsBn } from "./converter/fx/fxContentBn";
import { fxContentDe, fxPairsDe } from "./converter/fx/fxContentDe";
import { fxContentUz, fxPairsUz } from "./converter/fx/fxContentUz";
import { fxPairsTr } from "./converter/fx/fxPairsTr";
import { uzLicenseClasses } from "./converter/licenseClassFinderUz";

export type MergedRedirect = { source: string; destination: string; permanent: true };

const r = (source: string, destination: string): MergedRedirect => ({ source, destination, permanent: true });

function timerRedirects(): MergedRedirect[] {
  return [
    ...timerPresets.flatMap((p) => [
      r(timerPresetPath(p, "tr"), `/zamanlayici?s=${p.seconds}`),
      r(timerPresetPath(p, "en"), `/en/timer?s=${p.seconds}`),
      r(timerPresetPath(p, "de"), `/de/timer?s=${p.seconds}`),
    ]),
    ...NORDIC_TIMER_SECONDS.flatMap((s) => (["sv", "no", "da"] as const).map((l) => r(nordicTimerPath(l, s), `/${l}/timer?s=${s}`))),
  ];
}

function alarmRedirects(): MergedRedirect[] {
  return alarmPresetTimes.flatMap((t) => [
    r(`/online-alarm-kur/${alarmPresetSlug.tr(t)}`, `/online-alarm-kur?t=${t}`),
    r(`/en/alarm-clock/${alarmPresetSlug.en(t)}`, `/en/alarm-clock?t=${t}`),
    r(`/de/wecker/${alarmSlugDe(t)}`, `/de/wecker?t=${t}`),
  ]);
}

/** Kur çifti sayfaları aynı tablonun kopyasıydı; her dilde döviz çeviricisine yönlenir. */
function fxRedirects(): MergedRedirect[] {
  return [
    ...fxPairsTr.map((p) => r(`/doviz-cevirici/${p.slug}`, "/doviz-cevirici")),
    ...fxPairsDe.map((p) => r(`${fxContentDe.basePath}/${p.slug}`, fxContentDe.basePath)),
    ...fxPairsBn.map((p) => r(`${fxContentBn.basePath}/${p.slug}`, fxContentBn.basePath)),
    ...fxPairsUz.map((p) => r(`${fxContentUz.basePath}/${p.slug}`, fxContentUz.basePath)),
  ];
}

/** Özbekçe ehliyet toifası sayfaları; bilgiler hesaplayıcının tablosunda. */
function uzLicenseRedirects(): MergedRedirect[] {
  return Object.keys(uzLicenseClasses).map((id) => r(`/uz/haydovchilik-toifasi-topish/${id.toLowerCase()}`, "/uz/haydovchilik-toifasi-topish"));
}

export function mergedPageRedirects(): MergedRedirect[] {
  return [...timerRedirects(), ...alarmRedirects(), ...fxRedirects(), ...uzLicenseRedirects()];
}
