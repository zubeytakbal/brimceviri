import type { Metadata } from "next";
import Link from "next/link";
import CategoryUnitConverter from "../../components/CategoryUnitConverter";
import StaticPageLayout from "../../components/StaticPageLayout";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/tarixiy-olchov-birliklari";

export const metadata: Metadata = {
  title: "Tarixiy O'lchov Birliklari: Buxoro, Xiva va Qo'qon O'lchovlari",
  description:
    "Buxoro, Xiva va Qo'qon xonliklari davridan qolgan o'lchov birliklarini (gaz, chaqirim, tosh, farsah, qadam, miskal, pud, qadoq, dirham, botmon) metr va grammga bepul aylantiring.",
  alternates: {
    canonical: pagePath,
    ...buildFullLanguageAlternates(pagePath),
  },
  openGraph: {
    title: "Tarixiy O'lchov Birliklari: Buxoro, Xiva va Qo'qon O'lchovlari",
    description:
      "Buxoro, Xiva va Qo'qon xonliklari davridan qolgan o'lchov birliklarini metr va grammga bepul aylantiring; tarixini va manbalarini o'rganing.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

const historicalLengthUnitOptions = [
  { value: "m", label: "Metr (m)", symbol: "m" },
  { value: "gaz", label: "Gaz", symbol: "gaz" },
  { value: "chaqirim", label: "Chaqirim", symbol: "chaqirim" },
  { value: "tosh", label: "Tosh", symbol: "tosh" },
  { value: "farsah", label: "Farsah", symbol: "farsah" },
  { value: "qadam", label: "Qadam", symbol: "qadam" },
];

const historicalMassUnitOptions = [
  { value: "g", label: "Gramm (g)", symbol: "g" },
  { value: "miskal-uz", label: "Miskal", symbol: "miskal" },
  { value: "pud", label: "Pud", symbol: "pud" },
  { value: "qadoq", label: "Qadoq", symbol: "qadoq" },
  { value: "dirhem-uz", label: "Dirham", symbol: "dirham" },
  { value: "batman-uz", label: "Botmon", symbol: "botmon" },
];

const centralAsianLengthUnits = [
  {
    href: "/uz/birliklar/gaz",
    name: "Gaz",
    value: "≈ 0,71 m (standart qiymat)",
    note: "Buxoroda 16-17-asrlarda ≈0,787 m, 19-asrda ≈1,067 m; Xiva/Xorazmda ≈0,305 m ham qo'llanilgan.",
  },
  {
    href: "/uz/birliklar/chaqirim",
    name: "Chaqirim",
    value: "≈ 1 km (zamonaviy qiymat)",
    note: "1894-yildagi rus islohotidan oldin ≈0,9 km, keyin ≈1,06-1,08 km bo'lgan; rus \"verst\"iga mos.",
  },
  {
    href: "/uz/birliklar/tosh",
    name: "Tosh",
    value: "≈ 6-9,6 km (aniq emas)",
    note: "Forscha \"farsah\"ning turkiycha muqobili; 6-8 chaqirim yoki 9000-12000 qadamga teng.",
  },
  {
    href: "/uz/birliklar/farsah",
    name: "Farsah",
    value: "≈ 6 km (eng ko'p qo'llanilgan qiymat)",
    note: "Asli forscha, lekin Buxoro va Xiva rasmiy hujjatlarida ham qo'llanilgan uzoq masofa birligi.",
  },
  {
    href: "/uz/birliklar/qadam",
    name: "Qadam",
    value: "≈ 63-71 sm (standartlashtirilmagan)",
    note: "Kundalik va yer o'lchovlarida taxminiy masofa uchun ishlatilgan xalq birligi.",
  },
];

const centralAsianMassUnits = [
  {
    href: "/uz/birliklar/miskal",
    name: "Miskal",
    value: "≈ 4,25 g",
    note: "Oltin, kumush va qimmatbaho narsalarni tortishda ishlatilgan.",
  },
  {
    href: "/uz/birliklar/pud",
    name: "Pud",
    value: "= 16,3804815 kg",
    note: "Rus o'lchov tizimidan, 1894-yildan Turkistonda rasmiy massa birligi.",
  },
  {
    href: "/uz/birliklar/qadoq",
    name: "Qadoq",
    value: "= 409,5 g",
    note: "Rus funtining Turkistondagi mahalliy nomi.",
  },
  {
    href: "/uz/birliklar/dirham",
    name: "Dirham",
    value: "= 7/10 miskal ≈ 3,2 g",
    note: "Buxoro xonligining shariat asosidagi savdo-huquqiy amaliyotida ishlatilgan.",
  },
  {
    href: "/uz/birliklar/botmon",
    name: "Botmon",
    value: "≈ 131 kg (Buxoro/Samarqand, 19-asr)",
    note: "Hududga qarab 1 dan 172 kg gacha keskin farq qilgan — yagona standarti bo'lmagan.",
  },
];

function UnitList({
  units,
}: {
  units: Array<{
    href: string;
    name: string;
    value: string;
    note: string;
  }>;
}) {
  return (
    <ul className="calculator-example-list">
      {units.map((unit) => (
        <li key={unit.href}>
          <article>
            <h3>
              <Link href={unit.href}>{unit.name}</Link>
            </h3>
            <p>
              <strong>{unit.value}</strong> — {unit.note}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default function UzbekTarixiyOlchovBirliklariPage() {
  return (
    <StaticPageLayout
      locale="uz"
      breadcrumbAriaLabel="Sahifa yo'li"
      breadcrumbs={[
        { href: "/uz", label: "Bosh sahifa" },
        { label: "Tarixiy O'lchov Birliklari" },
      ]}
      title="Tarixiy O'lchov Birliklari"
      description="Buxoro, Xiva va Qo'qon xonliklari davridan qolgan o'lchov birliklarini zamonaviy metr va gramm karshiliklari bilan birga o'rganing, ular orasida bepul aylantiring."
      sections={[
        {
          heading: "Buxoro, Xiva va Qo'qondan zamonaviy tizimgacha",
          content: (
            <>
              <p>
                Bugun O&apos;zbekistonda ishlatiladigan o&apos;lchovlar bitta
                manbadan kelmaydi — Buxoro va Xiva xonliklarining gazi va
                miskalidan, forscha kelib chiqishli farsah va dirhamidan,
                rus mustamlakachilik davrida kirib kelgan pud va
                chaqirimdan, 1920-30-yillarda sovet hukumati tomonidan
                joriy etilgan metrik tizimgacha uzluksiz tarixiy davomiylik
                mavjud.
              </p>
              <p>
                Bu sahifa turli davrlardan qolgan bu o&apos;lchov
                birliklarini bir joyga to&apos;playdi. Har bir birlikning
                zamonaviy SI ekvivalenti, qisqacha tarixi va tegishli
                aylantirish vositalarini quyidagi bo&apos;limlardan
                topishingiz mumkin.
              </p>
            </>
          ),
        },
        {
          heading: "Tarixiy Uzunlik Birligi Aylantirgichi",
          content: (
            <>
              <p>
                Gaz, chaqirim, tosh, farsah va qadam o&apos;rtasida,
                zamonaviy metr ekvivalenti bilan birga darhol aylantiring.
                (Metr/kilometr kabi barcha zamonaviy uzunlik birliklari
                uchun{" "}
                <Link href="/uz/turkumlar/uzunlik">
                  uzunlik aylantirishlari sahifasidan
                </Link>{" "}
                foydalanishingiz mumkin.)
              </p>
              <CategoryUnitConverter
                category="uzunluk"
                locale="uz"
                unitOptions={historicalLengthUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "Tarixiy Massa Birligi Aylantirgichi",
          content: (
            <>
              <p>
                Miskal, pud, qadoq, dirham va botmon o&apos;rtasida,
                zamonaviy gramm ekvivalenti bilan birga darhol aylantiring.
                (Kilogramm/tonna kabi barcha zamonaviy massa birliklari
                uchun{" "}
                <Link href="/uz/turkumlar/massa">
                  massa aylantirishlari sahifasidan
                </Link>{" "}
                foydalanishingiz mumkin.)
              </p>
              <CategoryUnitConverter
                category="kutle"
                locale="uz"
                unitOptions={historicalMassUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "O'rta Osiyo Uzunlik Birliklari",
          content: (
            <>
              <p>
                Buxoro, Xiva va Qo&apos;qon xonliklari davrida savdo,
                sayohat va yer o&apos;lchovida gaz, chaqirim, tosh, farsah
                va qadam kabi birliklar keng qo&apos;llanilgan. Ularning
                aniq qiymati hudud va davrga qarab sezilarli farq qilgan.
              </p>
              <UnitList units={centralAsianLengthUnits} />
            </>
          ),
        },
        {
          heading: "O'rta Osiyo Massa Birliklari",
          content: (
            <>
              <p>
                Oltin-kumush tortishda miskal, savdoda pud va qadoq,
                shariat asosidagi hisob-kitoblarda dirham, qishloq
                xo&apos;jaligi mahsulotlarini o&apos;lchashda esa botmon
                ishlatilgan.
              </p>
              <UnitList units={centralAsianMassUnits} />
            </>
          ),
        },
        {
          heading: "Bu birliklar nega hali ham qidiriladi?",
          content: (
            <p>
              Bu o&apos;lchovlar endi rasmiy qo&apos;llanilmasa-da, tarix
              va arxeologiya tadqiqotlarida, eski hujjatlarning
              tushunilishida, maktab topshiriqlarida va umumiy madaniyatga
              qiziquvchilar orasida hali ham qidirilishda davom
              etmoqda. Bu sahifadagi vositalar bu qiymatlarni zamonaviy
              birliklarga tezda aylantirishga yordam beradi.
            </p>
          ),
        },
        {
          heading: "Tegishli turkumlar",
          content: (
            <ul className="related-conversion-list">
              <li>
                <Link href="/uz/turkumlar/uzunlik">
                  Barcha uzunlik birliklari
                </Link>
              </li>
              <li>
                <Link href="/uz/turkumlar/massa">
                  Barcha massa birliklari
                </Link>
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
