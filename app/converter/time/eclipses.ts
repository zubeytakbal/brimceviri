// Ay ve Gunes tutulmalari, 2026-2035. astronomy-engine 2.1.19 (Don Cross, MIT) ile
// uretildi; tarihler NASA/eclipsewise listeleriyle, 2 Agustos 2027 icin Turkiye ortulme
// oranlari yayimlanmis hesaplarla (Istanbul ~%59, Izmir >%70) karsilastirildi.
// Ay tutulmasi: turkey = Ankara'dan tutulma zirvesinde Ay ufkun ustunde mi ("full"),
// tutulma sirasinda bir sure ufkun ustunde mi ("partly"), hic mi ("none").
// Gunes tutulmasi: obscuration = Gunes diskinin ortulen yuzdesi (0 = gorunmez).

export type LunarEclipse = { peak: string; kind: "penumbral" | "partial" | "total"; totalMinutes: number; partialMinutes: number; turkey: "full" | "partly" | "none" };
export type SolarEclipse = { peak: string; kind: "partial" | "annular" | "total" | "hybrid"; obscuration: { istanbul: number; ankara: number; izmir: number; van: number }; ankaraPeak?: string };

export const LUNAR_ECLIPSES: LunarEclipse[] = [
  { peak: "2026-03-03T11:33Z", kind: "total", totalMinutes: 59, partialMinutes: 208, turkey: "none" },
  { peak: "2026-08-28T04:12Z", kind: "partial", totalMinutes: 0, partialMinutes: 199, turkey: "partly" },
  { peak: "2027-02-20T23:12Z", kind: "penumbral", totalMinutes: 0, partialMinutes: 0, turkey: "full" },
  { peak: "2027-07-18T16:02Z", kind: "penumbral", totalMinutes: 0, partialMinutes: 0, turkey: "none" },
  { peak: "2027-08-17T07:13Z", kind: "penumbral", totalMinutes: 0, partialMinutes: 0, turkey: "none" },
  { peak: "2028-01-12T04:13Z", kind: "partial", totalMinutes: 0, partialMinutes: 58, turkey: "full" },
  { peak: "2028-07-06T18:19Z", kind: "partial", totalMinutes: 0, partialMinutes: 143, turkey: "full" },
  { peak: "2028-12-31T16:51Z", kind: "total", totalMinutes: 72, partialMinutes: 209, turkey: "full" },
  { peak: "2029-06-26T03:22Z", kind: "total", totalMinutes: 103, partialMinutes: 220, turkey: "partly" },
  { peak: "2029-12-20T22:41Z", kind: "total", totalMinutes: 55, partialMinutes: 214, turkey: "full" },
  { peak: "2030-06-15T18:33Z", kind: "partial", totalMinutes: 0, partialMinutes: 145, turkey: "full" },
  { peak: "2030-12-09T22:27Z", kind: "penumbral", totalMinutes: 0, partialMinutes: 0, turkey: "full" },
  { peak: "2031-05-07T03:50Z", kind: "penumbral", totalMinutes: 0, partialMinutes: 0, turkey: "partly" },
  { peak: "2031-06-05T11:44Z", kind: "penumbral", totalMinutes: 0, partialMinutes: 0, turkey: "none" },
  { peak: "2031-10-30T07:45Z", kind: "penumbral", totalMinutes: 0, partialMinutes: 0, turkey: "none" },
  { peak: "2032-04-25T15:13Z", kind: "total", totalMinutes: 67, partialMinutes: 212, turkey: "partly" },
  { peak: "2032-10-18T19:02Z", kind: "total", totalMinutes: 48, partialMinutes: 197, turkey: "full" },
  { peak: "2033-04-14T19:12Z", kind: "total", totalMinutes: 51, partialMinutes: 216, turkey: "full" },
  { peak: "2033-10-08T10:55Z", kind: "total", totalMinutes: 80, partialMinutes: 203, turkey: "none" },
  { peak: "2034-04-03T19:05Z", kind: "penumbral", totalMinutes: 0, partialMinutes: 0, turkey: "full" },
  { peak: "2034-09-28T02:46Z", kind: "partial", totalMinutes: 0, partialMinutes: 31, turkey: "full" },
  { peak: "2035-02-22T09:04Z", kind: "penumbral", totalMinutes: 0, partialMinutes: 0, turkey: "none" },
  { peak: "2035-08-19T01:10Z", kind: "partial", totalMinutes: 0, partialMinutes: 78, turkey: "full" },
];

export const SOLAR_ECLIPSES: SolarEclipse[] = [
  { peak: "2026-02-17T12:11Z", kind: "annular", obscuration: { istanbul: 0, ankara: 0, izmir: 0, van: 0 } },
  { peak: "2026-08-12T17:45Z", kind: "total", obscuration: { istanbul: 0, ankara: 0, izmir: 0, van: 0 } },
  { peak: "2027-02-06T15:59Z", kind: "annular", obscuration: { istanbul: 0, ankara: 0, izmir: 0, van: 0 } },
  { peak: "2027-08-02T10:06Z", kind: "total", obscuration: { istanbul: 59, ankara: 57, izmir: 71, van: 43 }, ankaraPeak: "2027-08-02T09:46Z" },
  { peak: "2028-01-26T15:07Z", kind: "annular", obscuration: { istanbul: 0, ankara: 0, izmir: 0, van: 0 } },
  { peak: "2028-07-22T02:55Z", kind: "total", obscuration: { istanbul: 0, ankara: 0, izmir: 0, van: 0 } },
  { peak: "2029-01-14T17:12Z", kind: "partial", obscuration: { istanbul: 0, ankara: 0, izmir: 0, van: 0 } },
  { peak: "2029-06-12T04:04Z", kind: "partial", obscuration: { istanbul: 0, ankara: 0, izmir: 0, van: 0 } },
  { peak: "2029-07-11T15:36Z", kind: "partial", obscuration: { istanbul: 0, ankara: 0, izmir: 0, van: 0 } },
  { peak: "2029-12-05T15:02Z", kind: "partial", obscuration: { istanbul: 0, ankara: 0, izmir: 0, van: 0 } },
  { peak: "2030-06-01T06:27Z", kind: "annular", obscuration: { istanbul: 88, ankara: 85, izmir: 88, van: 70 }, ankaraPeak: "2030-06-01T05:03Z" },
  { peak: "2030-11-25T06:50Z", kind: "total", obscuration: { istanbul: 0, ankara: 0, izmir: 0, van: 0 } },
  { peak: "2031-05-21T07:14Z", kind: "annular", obscuration: { istanbul: 0, ankara: 0, izmir: 0, van: 0 } },
  { peak: "2031-11-14T21:06Z", kind: "total", obscuration: { istanbul: 0, ankara: 0, izmir: 0, van: 0 } },
  { peak: "2032-05-09T13:25Z", kind: "annular", obscuration: { istanbul: 0, ankara: 0, izmir: 0, van: 0 } },
  { peak: "2032-11-03T05:32Z", kind: "partial", obscuration: { istanbul: 0, ankara: 0, izmir: 0, van: 0 } },
  { peak: "2033-03-30T18:01Z", kind: "total", obscuration: { istanbul: 0, ankara: 0, izmir: 0, van: 0 } },
  { peak: "2033-09-23T13:53Z", kind: "partial", obscuration: { istanbul: 0, ankara: 0, izmir: 0, van: 0 } },
  { peak: "2034-03-20T10:17Z", kind: "total", obscuration: { istanbul: 36, ankara: 44, izmir: 41, van: 61 }, ankaraPeak: "2034-03-20T11:03Z" },
  { peak: "2034-09-12T16:18Z", kind: "annular", obscuration: { istanbul: 0, ankara: 0, izmir: 0, van: 0 } },
  { peak: "2035-03-09T23:04Z", kind: "annular", obscuration: { istanbul: 0, ankara: 0, izmir: 0, van: 0 } },
  { peak: "2035-09-02T01:55Z", kind: "total", obscuration: { istanbul: 0, ankara: 0, izmir: 0, van: 0 } },
];

// Turkiye'den gorulen Gunes tutulmalarinda 81 il merkezine gore en dusuk / en yuksek
// ortulme ve halkali evrenin il merkezinde gorulecegi iller (ayni kaynakla hesaplandi).
// 2030 icin ilce kontrolu: Foca, Dikili, Soma ve Akhisar da halkali yol icinde.
export const TURKEY_SOLAR_DETAILS: Record<string, { min: [string, number]; max: [string, number]; annular?: string[]; annularDistricts?: string[]; annularWindow?: string }> = {
  "2027-08-02": { min: ["Ardahan", 37], max: ["Muğla", 74] },
  "2030-06-01": {
    min: ["Hakkari", 67],
    max: ["Balıkesir", 88],
    annular: ["Balıkesir", "Bartın", "Bursa", "Çanakkale", "Düzce", "Edirne", "İstanbul", "Kırklareli", "Kocaeli", "Sakarya", "Tekirdağ", "Yalova", "Zonguldak"],
    annularDistricts: ["Foça", "Dikili", "Soma", "Akhisar"],
    annularWindow: "08:00-08:07",
  },
  "2034-03-20": { min: ["Edirne", 31], max: ["Hakkari", 65] },
};
