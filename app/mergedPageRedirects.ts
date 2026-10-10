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
  // Özbekçe sayı sayfaları da tek hesaplayıcıda: tek kalıp kural (?n= seçimi korur).
  return [r(`${base}/:n`, `${base}?n=:n`), r("/uz/sonlar/:son", "/uz/sonlar?n=:son")];
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
/** Almanca ve Özbekçe malzeme/karşılaştırma ile Almanca bileşik sayfaları tek seçicili sayfada (?m= malzeme, ?v= karşılaştırma). */
function materialRedirects(): MergedRedirect[] {
  return [
    r("/de/werkstoffeigenschaften/:slug", "/de/werkstoffeigenschaften?m=:slug"),
    r("/de/werkstoffvergleich", "/de/werkstoffeigenschaften"),
    r("/de/werkstoffvergleich/:slug", "/de/werkstoffeigenschaften?v=:slug"),
    r("/uz/material-xossalari/:slug", "/uz/material-xossalari?m=:slug"),
    r("/uz/material-solishtirish", "/uz/material-xossalari"),
    r("/uz/material-solishtirish/:slug", "/uz/material-xossalari?v=:slug"),
    r("/malzeme-karsilastirma", "/malzeme-ozellikleri"),
    r("/malzeme-karsilastirma/:slug", "/malzeme-ozellikleri?v=:slug"),
    r("/gokcisimleri-karsilastirma", "/gokcisimleri-ozellikleri"),
    r("/gokcisimleri-karsilastirma/:slug", "/gokcisimleri-ozellikleri?v=:slug"),
    r("/bn/traditional-weight/:slug", "/bn/traditional-weight?pair=:slug"),
    r("/en/science-calculators/physics", "/en/physics-calculators"),
    r("/en/science-calculators/mathematics", "/en/mathematics-calculators"),
    r("/en/science-calculators/biology", "/en/biology-calculators/dna-sequence-helper"),
    r("/en/biology-calculators", "/en/biology-calculators/dna-sequence-helper"),
    r("/de/chemische-verbindungen/:slug", "/de/chemische-verbindungen?v=:slug"),
    r("/de/entfernung/:stadt/:ziel", "/de/entfernung/:stadt?nach=:ziel"),
    r("/en/bible-books/:book", "/en/bible-books?book=:book"),
    r("/ozel-gunler/:id", "/ozel-gunler?gun=:id"),
    r("/de/besondere-tage/:id", "/de/besondere-tage?tag=:id"),
    r("/ar/occasions/:id", "/ar/occasions?id=:id"),
    r("/geri-sayim/:etkinlik", "/geri-sayim?etkinlik=:etkinlik"),
    r("/en/countdown/:event", "/en/countdown?event=:event"),
    r("/de/countdown/:anlass", "/de/countdown?anlass=:anlass"),
  ];
}

function takvimGunRedirects(): MergedRedirect[] {
  return [r("/takvim/:yil/:ay/:gun", "/takvim/:yil/:ay"), r("/de/kalender/:jahr/:monat/:tag", "/de/kalender/:jahr/:monat")];
}


/** Search Console 404 listesinden: eski sürümlerde kalan, artık hiçbir sayfanın bağlamadığı adresler. */
function legacyRedirects(): MergedRedirect[] {
  return [
    r("/uz/atmosfera-bar", "/uz/turkumlar/bosim"),
    r("/uz/bar-atmosfera", "/uz/turkumlar/bosim"),
    r("/uz/psi-bar", "/uz/turkumlar/bosim"),
    r("/uz/chig-metr", "/uz/turkumlar/uzunlik"),
    r("/uz/chig-santimetr", "/uz/turkumlar/uzunlik"),
    r("/uz/metr-santimetr", "/uz/turkumlar/uzunlik"),
    r("/uz/metr-yard", "/uz/turkumlar/uzunlik"),
    r("/uz/santimetr-chig", "/uz/turkumlar/uzunlik"),
    r("/uz/santimetr-metr", "/uz/turkumlar/uzunlik"),
    r("/uz/mikrometr-millimetr", "/uz/turkumlar/uzunlik"),
    r("/uz/fut-metr", "/uz/turkumlar/uzunlik"),
    r("/uz/dengiz-milyasi-kilometr", "/uz/turkumlar/uzunlik"),
    r("/uz/daraja-radian", "/uz/turkumlar/burchak"),
    r("/uz/radian-daraja", "/uz/turkumlar/burchak"),
    r("/uz/dekar-donum", "/uz/turkumlar/yuza"),
    r("/uz/donum-kvadrat-metr", "/uz/turkumlar/yuza"),
    r("/uz/kvadrat-santimetr-kvadrat-millimetr", "/uz/turkumlar/yuza"),
    r("/uz/funt-kilogramm", "/uz/turkumlar/massa"),
    r("/uz/kilogramm-funt", "/uz/turkumlar/massa"),
    r("/uz/kilogramm-tonna", "/uz/turkumlar/massa"),
    r("/uz/tonna-kilogramm", "/uz/turkumlar/massa"),
    r("/uz/genri-milligenri", "/uz/turkumlar/induktivlik"),
    r("/uz/milligenri-genri", "/uz/turkumlar/induktivlik"),
    r("/uz/gerts-gigagerts", "/uz/turkumlar/chastota"),
    r("/uz/gerts-kilogerts", "/uz/turkumlar/chastota"),
    r("/uz/gigagerts-megagerts", "/uz/turkumlar/chastota"),
    r("/uz/kilogerts-gerts", "/uz/turkumlar/chastota"),
    r("/uz/kilobayt-bayt", "/uz/turkumlar/malumot-hajmi"),
    r("/uz/kilogram-kuch-metr-nyuton-metr", "/uz/turkumlar/tork"),
    r("/uz/kilovatt-soat-joul", "/uz/turkumlar/energiya"),
    r("/uz/km-soat-uzel", "/uz/turkumlar/tezlik"),
    r("/uz/yorugliktezligi-metr-soniyaga", "/uz/turkumlar/tezlik"),
    r("/uz/kun-soat", "/uz/turkumlar/vaqt"),
    r("/uz/litr-kub-metr", "/uz/turkumlar/hajm"),
    r("/uz/megavatt-kilovatt", "/uz/turkumlar/quvvat"),
    r("/uz/mikrofarad-pikofarad", "/uz/turkumlar/sigim"),
    r("/uz/nanofarad-mikrofarad", "/uz/turkumlar/sigim"),
    r("/uz/pikofarad-mikrofarad", "/uz/turkumlar/sigim"),
    r("/uz/santistoks-kvadrat-metr-soniyaga", "/uz/turkumlar/kinematik-qovushqoqlik"),
    r("/de/kategorien/aci", "/de/kategorien/winkel"),
    r("/de/kategorien/acisal_hiz", "/de/kategorien/winkelgeschwindigkeit"),
    r("/de/kategorien/elektrik", "/de/kategorien/elektrizitaet"),
    r("/de/kategorien/frekans", "/de/kategorien/frequenz"),
    r("/de/kategorien/guc", "/de/kategorien/leistung"),
    r("/de/kategorien/hiz", "/de/kategorien/geschwindigkeit"),
    r("/de/kategorien/isi_akisi", "/de/kategorien/waermestromdichte"),
    r("/de/kategorien/isil_iletkenlik", "/de/kategorien/waermeleitfaehigkeit"),
    r("/de/kategorien/ivme", "/de/kategorien/beschleunigung"),
    r("/de/kategorien/manyetik_aki", "/de/kategorien/magnetischer-fluss"),
    r("/de/kategorien/ozgul_isi", "/de/kategorien/spezifische-waermekapazitaet"),
    r("/de/kategorien/sicaklik", "/de/kategorien/temperatur"),
    r("/de/kategorien/zaman", "/de/kategorien/zeit"),
    r("/de/kategorien/undefined", "/de/alle-umrechnungen"),
    r("/en/categories/kuvvet", "/en/categories/force"),
    r("/en/categories/viskozite_dinamik", "/en/categories/viscosity"),
    r("/en/categories/yogunluk", "/en/categories/density"),
    r("/kategoriler/altin_ayar", "/kategoriler/altin-ayar"),
    r("/kategoriler/elektrik_direnc", "/kategoriler/direnc"),
    r("/kategoriler/elektrik_yuk", "/kategoriler/elektrik-yuku"),
    r("/kategoriler/gumus_ayar", "/kategoriler/gumus-ayar"),
    r("/kategoriler/viskozite_dinamik", "/kategoriler/viskozite"),
    r("/kategoriler/vitamin_d", "/kategoriler/vitamin-d"),
    r("/birimler/desilitre", "/kategoriler/hacim"),
    r("/birimler/santilitre", "/kategoriler/hacim"),
    r("/birimler/mmh2o", "/kategoriler/basinc"),
    r("/en/kiloohms-to-ohms", "/en/categories/resistance"),
    r("/en/ohms-to-kiloohms", "/en/categories/resistance"),
    r("/ru/categories", "/en/all-conversions"),
  ];
}

export function mergedPageRedirects(): MergedRedirect[] {
  return [...timerRedirects(), ...alarmRedirects(), ...fxRedirects(), ...uzLicenseRedirects(), ...es419Redirects(), ...numberRedirects(), ...aminoAcidRedirects(), ...sureCuzRedirects(), ...unitGuideRedirects().map((x) => r(x.source, x.destination)), ...altinRedirects(), ...cgpaRedirects(), ...uzRegionRedirects(), ...feiertageRedirects(), ...federalHolidayRedirects(), ...takvimGunRedirects(), ...materialRedirects(), r("/ulkeler/s-o-tome-ve-principe", "/ulkeler/sao-tome-ve-principe"), ...legacyRedirects()];
}
