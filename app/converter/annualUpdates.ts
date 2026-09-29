// Her yil degisen resmi degerlere dayanan araclar. Gece calisan kaynak kontrolu
// (api/cron/kaynak-kontrol) remindFrom tarihinden itibaren her arac icin yilda bir
// kez GitHub issue acar; sayfalar validYear gectikten sonra ziyaretciye uyari gosterir.

export type AnnualUpdate = {
  id: string;
  label: string;
  pageHref: string;
  /** Degerlerin gecerli oldugu yil */
  validYear: number;
  /** Hatirlatma baslangici (AA-GG) validYear icinde; resmi yeni degerler genelde Kasim'da yayimlanir */
  remindFrom: string;
  checklist: string[];
};

export const annualUpdates: AnnualUpdate[] = [
  {
    id: "tr-kidem",
    label: "Kıdem ve ihbar tazminatı (Türkiye)",
    pageHref: "/kidem-tazminati-hesaplama",
    validYear: 2026,
    remindFrom: "12-20",
    checklist: [
      "Add the January kıdem tazminatı tavanı for next year (ÇSGB / Mali ve Sosyal Haklar Genelgesi) to KIDEM_TAVANLARI in app/converter/turkishTazminat.ts",
      "Add next year's ücret gelir vergisi tarifesi to GELIR_VERGISI_TARIFESI (GVK md. 103, Resmî Gazete in late December)",
      "Update the title/description year on the page, then set validYear here",
    ],
  },
  {
    id: "tr-kidem-temmuz",
    label: "Kıdem tazminatı tavanı Temmuz (Türkiye)",
    pageHref: "/kidem-tazminati-hesaplama",
    validYear: 2027,
    remindFrom: "07-02",
    checklist: ["Add the July kıdem tazminatı tavanı (announced in early July) to KIDEM_TAVANLARI, then move validYear to the next year"],
  },
  {
    id: "de-grunderwerbsteuer",
    label: "Grunderwerbsteuer-Rechner (Germany)",
    pageHref: "/de/grunderwerbsteuer-rechner",
    validYear: 2026,
    remindFrom: "11-15",
    checklist: [
      "Check each state's Grunderwerbsteuer rate for next year (state budget laws) and update GRUNDERWERBSTEUER and GREST_STAND in app/converter/germanKaufnebenkosten.ts",
      "Update the 'last changes' sentence and FAQ on the page, then set validYear here",
    ],
  },
  {
    id: "de-arbeitszeit",
    label: "Arbeitszeitrechner (Germany)",
    pageHref: "/de/arbeitszeitrechner",
    validYear: 2026,
    remindFrom: "11-15",
    checklist: [
      "Check whether the Arbeitszeitgesetz reform (weekly instead of daily maximum working time, planned from 1 January 2027) has passed",
      "If so, update REGELN and the notes in app/converter/germanArbeitszeit.ts and the rules table/FAQ on the page",
      "Set validYear here",
    ],
  },
  {
    id: "de-brueckentage",
    label: "Brückentage pages (Germany)",
    pageHref: "/de/brueckentage",
    validYear: 2027,
    remindFrom: "06-01",
    checklist: [
      "Add the next year to BRUECKENTAGE_JAHRE and PLANER_JAHRE in app/i18n/germanBrueckentage.ts (Germans search 'Brückentage <year>' from late summer)",
      "Extend GERMAN_HOLIDAY_YEARS if needed and check for new or one-off holidays in app/converter/time/germanHolidays.ts",
      "Add the new year page to the sitemap check, then set validYear here",
    ],
  },
  {
    id: "de-brutto-netto",
    label: "Brutto-Netto-Rechner (Germany)",
    pageHref: "/de/brutto-netto-rechner",
    validYear: 2026,
    remindFrom: "11-15",
    checklist: [
      "Update the lohnsteuerrechner package once it supports the new year (official BMF Programmablaufplan) and set BN_JAHR in app/converter/germanBruttoNetto.ts",
      "Beitragsbemessungsgrenzen KV/PV and RV/AV (Sozialversicherungsrechengrößen-Verordnung)",
      "Average Zusatzbeitrag (GKV, announced by the BMG in autumn)",
      "Pflegeversicherung rate, childless surcharge and child reductions",
      "Minijob limit (follows the Mindestlohn) and upper limit of the Übergangsbereich",
      "Update the example tables and FAQ figures on the page, then set validYear here",
    ],
  },
  {
    id: "de-pendlerpauschale",
    label: "Pendlerpauschale-Rechner (Germany)",
    pageHref: "/de/pendlerpauschale-rechner",
    validYear: 2026,
    remindFrom: "11-15",
    checklist: [
      "Check the Entfernungspauschale per km and the Homeoffice-Pauschale for the next year (app/converter/germanWork.ts)",
      "Set validYear here",
    ],
  },
];

export function isOutdated(
  update: Pick<AnnualUpdate, "validYear">,
  now = new Date(),
) {
  return now.getUTCFullYear() > update.validYear;
}

export function isReminderDue(update: AnnualUpdate, now = new Date()) {
  const due = new Date(`${update.validYear}-${update.remindFrom}T00:00:00Z`);
  return now.getTime() >= due.getTime();
}

export function findAnnualUpdate(id: string) {
  return annualUpdates.find((u) => u.id === id)!;
}
