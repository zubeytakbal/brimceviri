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
import { getAllNumberFactsRange } from "./converter/numberFacts";
import { aminoAcidsDatabase } from "./converter/aminoAcidsDatabase";
import { SURELER } from "./converter/sureler";
import { unitGuideRedirects } from "./converter/unitGlossary";
import { ALTIN_SAYFALARI } from "./converter/turkishAltinPages";
import { cgpaUniversities } from "./converter/india/cgpaUniversities";
import { getAllRegions } from "./converter/regionElevationHubUz";
import { GERMAN_STATES } from "./converter/time/germanHolidays";
import { HOLIDAY_YEARS } from "./converter/time/holidays";

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

/** Latin Amerika İspanyolcası sayfaları es sayfalarının ondalık ayırıcı dışında aynısıydı. */
function es419Redirects(): MergedRedirect[] {
  return [r("/es-419/:path*", "/es/:path*")];
}

/** Sayı sayfaları yalnızca hesaplanan değerlerdi; sayı aracı aynı sayıyla açılır. */
function numberRedirects(): MergedRedirect[] {
  const base = "/bilim-hesaplayicilari/matematik/sayilar";
  return getAllNumberFactsRange().map((n) => r(`${base}/${n}`, `${base}?n=${n}`));
}

/** Amino asit sayfaları formül ve kütleden ibaretti; hepsi tek tabloda. */
function aminoAcidRedirects(): MergedRedirect[] {
  const base = "/bilim-hesaplayicilari/biyoloji/amino-asitler";
  return aminoAcidsDatabase.map((a) => r(`${base}/${a.id}`, base));
}

/** Sure ve cüz sayfaları sayılardan ibaretti; bilgiler Sure Bulucu ve Cüzler tablolarında. */
function sureCuzRedirects(): MergedRedirect[] {
  return [
    ...SURELER.map((s) => r(`/sureler/${s.slug}-suresi`, `/sure-bulucu?sure=${s.slug}`)),
    ...Array.from({ length: 30 }, (_, i) => r(`/cuzler/${i + 1}-cuz`, `/cuzler?cuz=${i + 1}`)),
  ];
}

/** Altın türü sayfaları ("çeyrek altın kaç gram") altın hesaplama tablosunda. */
function altinRedirects(): MergedRedirect[] {
  return ALTIN_SAYFALARI.map((id) => r(`/altin-hesaplama/${id}`, `/altin-hesaplama?tur=${id}`));
}

/** Üniversite başına CGPA sayfaları; formül, kaynak ve kapsam ana sayfada. */
function cgpaRedirects(): MergedRedirect[] {
  return cgpaUniversities.map((u) => r(`/en/cgpa-to-percentage/${u.slug}`, `/en/cgpa-to-percentage?university=${u.slug}`));
}

/** Özbekistan vilayet rakım sayfaları tek tabloda. */
function uzRegionRedirects(): MergedRedirect[] {
  return getAllRegions().map((x) => r(`/uz/viloyatlar-balandligi/${x.id}`, "/uz/viloyatlar-balandligi"));
}

/** Eyalet tatili sayfaları; eyalet seçici ana Feiertage sayfasında. */
function feiertageRedirects(): MergedRedirect[] {
  return GERMAN_STATES.map((s) => r(`/de/feiertage/${s.slug}`, `/de/feiertage?land=${s.slug}`));
}

/** ABD federal tatil yılları ana sayfadaki tarih tablosunda. */
function federalHolidayRedirects(): MergedRedirect[] {
  return HOLIDAY_YEARS.map((y) => r(`/en/federal-holidays/${y}`, "/en/federal-holidays"));
}

/** Takvim gün sayfaları ay sayfasındaki listede; dil başına tek kalıp kural. */
function takvimGunRedirects(): MergedRedirect[] {
  return [r("/takvim/:yil/:ay/:gun", "/takvim/:yil/:ay"), r("/de/kalender/:jahr/:monat/:tag", "/de/kalender/:jahr/:monat")];
}

export function mergedPageRedirects(): MergedRedirect[] {
  return [...timerRedirects(), ...alarmRedirects(), ...fxRedirects(), ...uzLicenseRedirects(), ...es419Redirects(), ...numberRedirects(), ...aminoAcidRedirects(), ...sureCuzRedirects(), ...unitGuideRedirects().map((x) => r(x.source, x.destination)), ...altinRedirects(), ...cgpaRedirects(), ...uzRegionRedirects(), ...feiertageRedirects(), ...federalHolidayRedirects(), ...takvimGunRedirects(), r("/ulkeler/s-o-tome-ve-principe", "/ulkeler/sao-tome-ve-principe")];
}
