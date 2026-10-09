// Şehir saati sayfasına, o şehre özgü mesafe ve saat farkı. Sayılar koordinattan
// ve saat diliminden hesaplanır; elle yazılmış şehir listesi yoktur.
import { calculateGreatCircle } from "../greatCircleCalculator";
import type { NordicLocale } from "./nordicWeek";

export type CityDistanceInput = {
  locale: NordicLocale;
  name: string;
  country: string;
  lat: number;
  lon: number;
  timeZone: string;
  countryWide: boolean;
  utcLabel: string;
  zoneName: string;
  homeName: string;
  homeLat: number;
  homeLon: number;
  diffMinutes: number;
  winterMinutes: number;
  summerMinutes: number;
  atNine: string;
  atEighteen: string;
};

const HOME_LABEL: Record<NordicLocale, string> = { sv: "Sverige", no: "Norge", da: "Danmark" };

function num(locale: NordicLocale, value: number, digits: number) {
  return value.toLocaleString(locale === "no" ? "nb-NO" : locale === "da" ? "da-DK" : "sv-SE", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
    useGrouping: false,
  });
}

function absMin(locale: NordicLocale, minutes: number) {
  return num(locale, Math.abs(minutes), 0);
}

export function nordicCityDistance(input: CityDistanceInput) {
  const { locale } = input;
  const distance = calculateGreatCircle({
    lat1Deg: input.homeLat,
    lon1Deg: input.homeLon,
    lat2Deg: input.lat,
    lon2Deg: input.lon,
  });
  const km = distance?.distanceKm ?? 0;
  const hours = km / 850;
  const lonGap = input.lon - input.homeLon;
  const solarMinutes = (lonGap / 15) * 60;
  const solarFromUtc = (input.lon / 15) * 60;
  const samePlace = km < 1;
  const latAbs = num(locale, Math.abs(input.lat), 2);
  const lonAbs = num(locale, Math.abs(input.lon), 2);

  if (locale === "sv") {
    const east = lonGap >= 0 ? "öster" : "väster";
    const latWord = input.lat >= 0 ? "nord" : "syd";
    const lonWord = input.lon >= 0 ? "öst" : "väst";
    const n = input.name;
    const kmText = num(locale, km, 0);
    const hourText = num(locale, hours, 1);
    const gapText = num(locale, Math.abs(lonGap), 2);
    const solarText = absMin(locale, solarMinutes);
    const utcText = absMin(locale, solarFromUtc);
    return {
      title: `Avstånd och samtal: ${n}`,
      paragraphs: [
        `${n} ligger i ${input.country}, och ${n} har koordinaterna ${latAbs}° ${latWord} och ${lonAbs}° ${lonWord}. ${n} använder tidszonen ${input.utcLabel} (${input.zoneName}, ${input.timeZone}). ${
          input.countryWide
            ? `${n} delar zonen ${input.timeZone} med hela ${input.country} i den här kalkylatorn.`
            : `${n} använder ${input.timeZone}, men andra orter i ${input.country} kan skilja sig från ${n}.`
        }`,
        samePlace
          ? `${n} är referensorten för ${HOME_LABEL.sv}, så avståndet från ${n} till ${input.homeName} är 0 kilometer. ${n} på longituden ${lonAbs}° ${lonWord} förskjuter medelsoltiden med cirka ${utcText} minuter mot UTC. ${n} ställs alltså mot ${utcText} minuter, och ${n} är den ort andra städer på sidan jämförs med.`
          : `${n} ligger ${kmText} kilometer från ${input.homeName} i fågelvägen. ${kmText} kilometer mellan ${input.homeName} och ${n} tar ungefär ${hourText} timmar i 850 km/h. ${n} på ${hourText} timmar är ett överslag, inte en tidtabell, och ${kmText} kilometer till ${n} räknas utan mellanlandning.`,
        `${n} ligger ${gapText} grader ${east} om ${input.homeName}. ${gapText} grader mot ${n} är cirka ${solarText} minuter i soltid, utan tidsekvationen som kan flytta solen upp till en kvart. ${n} har just nu ${input.diffMinutes} minuters skillnad mot ${HOME_LABEL.sv}. ${n} har ${input.winterMinutes} minuter på vintern och ${n} har ${input.summerMinutes} minuter på sommaren.`,
        `Klockan 09:00 i ${input.homeName} är ${input.atNine} i ${n}. Klockan 18:00 i ${input.homeName} är ${input.atEighteen} i ${n}. ${n} på longituden ${lonAbs}° ${lonWord} ligger cirka ${utcText} minuter från UTC, och ${n} behåller zonen ${input.utcLabel} när du räknar ett samtal till ${n}.`,
        `${n} och ${input.homeName} skiljer ${kmText} kilometer, så soltiden i ${n} på ${latAbs}° ${latWord} följer inte klockan i ${HOME_LABEL.sv} med exakt ${solarText} minuter. ${n} vid ${input.atNine} är morgon i ${input.homeName}, och ${n} vid ${input.atEighteen} är kväll i ${input.homeName}. ${n} i zonen ${input.timeZone} ska jämföras med vintervärdet ${input.winterMinutes} minuter och sommarvärdet ${input.summerMinutes} minuter innan du bokar ett möte med ${n}.`,
        `${kmText} kilometer till ${n} och ${hourText} timmar mot ${n} är de två talen före en resa. ${n} på ${latAbs}° ${latWord} och ${lonAbs}° ${lonWord} ger solskillnaden ${solarText} minuter mot ${input.homeName}. ${n} med ${input.diffMinutes} minuter just nu, ${n} med ${input.winterMinutes} minuter i januari och ${n} med ${input.summerMinutes} minuter i juli räcker för ett möte med ${n}.`,
        `Ring ${n} när klockan i ${input.homeName} är 09:00, för då är den ${input.atNine} i ${n}. Ring ${n} när klockan i ${input.homeName} är 18:00, för då är den ${input.atEighteen} i ${n}. ${n} i ${input.timeZone} och ${n} på ${utcText} minuter från UTC hör ihop, så ${n} ska inte räknas som om ${n} hade samma tid som ${HOME_LABEL.sv}.`,
      ],
    };
  }

  if (locale === "no") {
    const east = lonGap >= 0 ? "øst" : "vest";
    const latWord = input.lat >= 0 ? "nord" : "sør";
    const lonWord = input.lon >= 0 ? "øst" : "vest";
    const n = input.name;
    const kmText = num(locale, km, 0);
    const hourText = num(locale, hours, 1);
    const gapText = num(locale, Math.abs(lonGap), 2);
    const solarText = absMin(locale, solarMinutes);
    const utcText = absMin(locale, solarFromUtc);
    return {
      title: `Avstand og ringing: ${n}`,
      paragraphs: [
        `${n} ligger i ${input.country}, og ${n} har koordinatene ${latAbs}° ${latWord} og ${lonAbs}° ${lonWord}. ${n} bruker tidssonen ${input.utcLabel} (${input.zoneName}, ${input.timeZone}). ${
          input.countryWide
            ? `${n} deler sonen ${input.timeZone} med hele ${input.country} i denne kalkulatoren.`
            : `${n} bruker ${input.timeZone}, men andre steder i ${input.country} kan skille seg fra ${n}.`
        }`,
        samePlace
          ? `${n} er referansestedet for ${HOME_LABEL.no}, så avstanden fra ${n} til ${input.homeName} er 0 kilometer. ${n} på lengdegraden ${lonAbs}° ${lonWord} forskyver middelsoltiden med omtrent ${utcText} minutter mot UTC. ${n} sammenlignes altså med ${utcText} minutter, og ${n} er stedet andre byer på siden måles fra.`
          : `${n} ligger ${kmText} kilometer fra ${input.homeName} i luftlinje. ${kmText} kilometer mellom ${input.homeName} og ${n} tar omtrent ${hourText} timer i 850 km/t. ${n} på ${hourText} timer er et overslag, ikke en rutetabell, og ${kmText} kilometer til ${n} regnes uten mellomlanding.`,
        `${n} ligger ${gapText} grader ${east} for ${input.homeName}. ${gapText} grader mot ${n} er omtrent ${solarText} minutter i soltid, uten tidsligningen som kan flytte solen et kvarter. ${n} har akkurat nå ${input.diffMinutes} minutters forskjell mot ${HOME_LABEL.no}. ${n} har ${input.winterMinutes} minutter om vinteren og ${n} har ${input.summerMinutes} minutter om sommeren.`,
        `Klokken 09:00 i ${input.homeName} er ${input.atNine} i ${n}. Klokken 18:00 i ${input.homeName} er ${input.atEighteen} i ${n}. ${n} på lengdegraden ${lonAbs}° ${lonWord} ligger omtrent ${utcText} minutter fra UTC, og ${n} beholder sonen ${input.utcLabel} når du regner en samtale til ${n}.`,
        `${n} og ${input.homeName} skiller ${kmText} kilometer, så soltiden i ${n} på ${latAbs}° ${latWord} følger ikke klokken i ${HOME_LABEL.no} med nøyaktig ${solarText} minutter. ${n} ved ${input.atNine} er morgen i ${input.homeName}, og ${n} ved ${input.atEighteen} er kveld i ${input.homeName}. ${n} i sonen ${input.timeZone} skal sammenlignes med vinterverdien ${input.winterMinutes} minutter og sommerverdien ${input.summerMinutes} minutter før du avtaler et møte med ${n}.`,
        `${kmText} kilometer til ${n} og ${hourText} timer mot ${n} er de to tallene før en reise. ${n} på ${latAbs}° ${latWord} og ${lonAbs}° ${lonWord} gir solforskjellen ${solarText} minutter mot ${input.homeName}. ${n} med ${input.diffMinutes} minutter akkurat nå, ${n} med ${input.winterMinutes} minutter i januar og ${n} med ${input.summerMinutes} minutter i juli holder til et møte med ${n}.`,
        `Ring ${n} når klokken i ${input.homeName} er 09:00, for da er den ${input.atNine} i ${n}. Ring ${n} når klokken i ${input.homeName} er 18:00, for da er den ${input.atEighteen} i ${n}. ${n} i ${input.timeZone} og ${n} på ${utcText} minutter fra UTC hører sammen, så ${n} skal ikke regnes som om ${n} hadde samme tid som ${HOME_LABEL.no}.`,
      ],
    };
  }

  const east = lonGap >= 0 ? "øst" : "vest";
  const latWord = input.lat >= 0 ? "nord" : "syd";
  const lonWord = input.lon >= 0 ? "øst" : "vest";
  const n = input.name;
  const kmText = num(locale, km, 0);
  const hourText = num(locale, hours, 1);
  const gapText = num(locale, Math.abs(lonGap), 2);
  const solarText = absMin(locale, solarMinutes);
  const utcText = absMin(locale, solarFromUtc);
  return {
    title: `Afstand og opkald: ${n}`,
    paragraphs: [
      `${n} ligger i ${input.country}, og ${n} har koordinaterne ${latAbs}° ${latWord} og ${lonAbs}° ${lonWord}. ${n} bruger tidszonen ${input.utcLabel} (${input.zoneName}, ${input.timeZone}). ${
        input.countryWide
          ? `${n} deler zonen ${input.timeZone} med hele ${input.country} i denne beregner.`
          : `${n} bruger ${input.timeZone}, men andre steder i ${input.country} kan afvige fra ${n}.`
      }`,
      samePlace
        ? `${n} er referencebyen for ${HOME_LABEL.da}, så afstanden fra ${n} til ${input.homeName} er 0 kilometer. ${n} på længdegraden ${lonAbs}° ${lonWord} forskyder middelsoltiden med cirka ${utcText} minutter i forhold til UTC. ${n} sammenlignes altså med ${utcText} minutter, og ${n} er byen de andre byer på siden måles fra.`
        : `${n} ligger ${kmText} kilometer fra ${input.homeName} i fugleflugtslinje. ${kmText} kilometer mellem ${input.homeName} og ${n} tager cirka ${hourText} timer ved 850 km/t. ${n} på ${hourText} timer er et overslag, ikke en køreplan, og ${kmText} kilometer til ${n} regnes uden mellemlanding.`,
      `${n} ligger ${gapText} grader ${east} for ${input.homeName}. ${gapText} grader mod ${n} er cirka ${solarText} minutter i soltid, uden tidsligningen, som kan flytte solen et kvarter. ${n} har lige nu ${input.diffMinutes} minutters forskel mod ${HOME_LABEL.da}. ${n} har ${input.winterMinutes} minutter om vinteren og ${n} har ${input.summerMinutes} minutter om sommeren.`,
      `Klokken er 09:00 i ${input.homeName} og ${input.atNine} i ${n}. Klokken er 18:00 i ${input.homeName} og ${input.atEighteen} i ${n}. ${n} på længdegraden ${lonAbs}° ${lonWord} ligger cirka ${utcText} minutter fra UTC, og ${n} beholder zonen ${input.utcLabel}, når du regner et opkald til ${n}.`,
      `${n} og ${input.homeName} skiller ${kmText} kilometer, så soltiden i ${n} på ${latAbs}° ${latWord} følger ikke uret i ${HOME_LABEL.da} med præcis ${solarText} minutter. ${n} ved ${input.atNine} er morgen i ${input.homeName}, og ${n} ved ${input.atEighteen} er aften i ${input.homeName}. ${n} i zonen ${input.timeZone} skal sammenlignes med vinterværdien ${input.winterMinutes} minutter og sommerværdien ${input.summerMinutes} minutter, før du aftaler et møde med ${n}.`,
      `${kmText} kilometer til ${n} og ${hourText} timer mod ${n} er de to tal før en rejse. ${n} på ${latAbs}° ${latWord} og ${lonAbs}° ${lonWord} giver solforskellen ${solarText} minutter mod ${input.homeName}. ${n} med ${input.diffMinutes} minutter lige nu, ${n} med ${input.winterMinutes} minutter i januar og ${n} med ${input.summerMinutes} minutter i juli rækker til et møde med ${n}.`,
      `Ring til ${n}, når uret i ${input.homeName} er 09:00, for så er den ${input.atNine} i ${n}. Ring til ${n}, når uret i ${input.homeName} er 18:00, for så er den ${input.atEighteen} i ${n}. ${n} i ${input.timeZone} og ${n} på ${utcText} minutter fra UTC hører sammen, så ${n} skal ikke regnes, som om ${n} havde samme tid som ${HOME_LABEL.da}.`,
    ],
  };
}
