import Link from "next/link";
import CategoryUnitConverter from "../../components/CategoryUnitConverter";
import StaticPageLayout from "../../components/StaticPageLayout";
import { buildSiteUrl } from "../../siteConfig";

export const metadata = {
  title: "ঐতিহাসিক পরিমাপ একক",
  description:
    "বাইজেন্টাইন, উসমানীয় ও পুরনো তুর্কি পরিমাপ একক অন্বেষণ করুন এবং সংক্ষিপ্ত ব্যাখ্যাসহ মিটার ও গ্রামে রূপান্তর করুন।",
  alternates: {
    canonical: "/bn/historical-units",
    languages: {
      tr: "/tarihi-olcu-birimleri",
      en: "/en/historical-units",
      de: "/de/historische-masseinheiten",
      bn: "/bn/historical-units",
      "x-default": "/tarihi-olcu-birimleri",
    },
  },
  openGraph: {
    title: "ঐতিহাসিক পরিমাপ একক",
    description: "বাইজেন্টাইন, উসমানীয় ও পুরনো তুর্কি পরিমাপ একক অন্বেষণ করুন।",
    url: buildSiteUrl("/bn/historical-units"),
    siteName: "BirimCeviri.app",
    locale: "bn_BD",
    type: "website",
  },
};

const historicalLengthUnitOptions = [
  { value: "m", label: "মিটার (m)", symbol: "m" },
  { value: "arşın", label: "আরশিন", symbol: "arşın" },
  { value: "endaze", label: "এনদাজে", symbol: "endaze" },
  { value: "pus", label: "বাইজেন্টাইন ফুট (Pous)", symbol: "pus" },
  { value: "orgyia", label: "বাইজেন্টাইন হাত-প্রসার (Orgyia)", symbol: "orgyia" },
  { value: "çığ", label: "চিগ (Çığ)", symbol: "çığ" },
];

const historicalMassUnitOptions = [
  { value: "g", label: "গ্রাম (g)", symbol: "g" },
  { value: "okka", label: "উসমানীয় ওক্কা (Okka)", symbol: "okka" },
  { value: "dirhem", label: "দিরহাম", symbol: "dirhem" },
  { value: "litra", label: "বাইজেন্টাইন লিত্রা (Litra)", symbol: "litra" },
  { value: "ounkia", label: "বাইজেন্টাইন ওউনকিয়া (Ounkia)", symbol: "ounkia" },
];

const byzantineUnits = [
  {
    href: "/birimler/bizans-ayagi",
    name: "বাইজেন্টাইন ফুট (pous)",
    value: "≈ ০.৩১৪৮ মি",
    note: "প্রাচীন গ্রিক ফুট এককের সম্প্রসারণ, ১৪৫৩ সাল পর্যন্ত ব্যবহৃত হয়েছে।",
  },
  {
    href: "/birimler/bizans-kulaci",
    name: "বাইজেন্টাইন হাত-প্রসার (orgyia)",
    value: "= ৬ pous ≈ ১.৮৮৮৮ মি",
    note: "দুই বাহু সম্পূর্ণ প্রসারিত করলে আঙুলের প্রান্ত থেকে প্রান্তের দূরত্ব বোঝায়।",
  },
  {
    href: "/birimler/bizans-litrasi",
    name: "বাইজেন্টাইন লিত্রা (litra)",
    value: "≈ ৩২৪ গ্রাম",
    note: "বাইজেন্টাইন ঐতিহ্যের মূল ভরের একক, রোমান লিব্রা দ্বারা প্রভাবিত।",
  },
  {
    href: "/birimler/bizans-onsu",
    name: "বাইজেন্টাইন ওউনকিয়া (ounkia)",
    value: "= ১/১২ litra ≈ ২৭ গ্রাম",
    note: "ব্রিটিশ ও মার্কিন পদ্ধতির আধুনিক আউন্স থেকে ভিন্ন।",
  },
];

const ottomanUnits = [
  {
    href: "/birimler/arsin",
    name: "আরশিন",
    value: "≈ ০.৬৮ মি",
    note: "একাধিক ব্যবহার ছিল; সবচেয়ে পরিচিত বাজার আরশিন, নির্মাণ আরশিন আরও বড় দৈর্ঘ্যে ব্যবহৃত হতো।",
  },
  {
    href: "/birimler/endaze",
    name: "এনদাজে",
    value: "= ০.৬৫ মি",
    note: "বিশেষত কাপড় ও বস্ত্র পরিমাপ এবং সংশ্লিষ্ট বাণিজ্যে ব্যবহৃত হতো।",
  },
  {
    href: "/birimler/okka",
    name: "উসমানীয় ওক্কা (Okka)",
    value: "= ৪০০ dirhem ≈ ১২৮২.৯৪৫ গ্রাম",
    note: "ঐতিহ্যবাহী উসমানীয় বাজারের সবচেয়ে পরিচিত ওজনের এককগুলোর একটি।",
  },
  {
    href: "/birimler/dirhem",
    name: "দিরহাম",
    value: "= ১/৪০০ okka ≈ ৩.২০৭ গ্রাম",
    note: "মূল্যবান ধাতু, মসলা ও কিছু প্রসাধনীর মতো ছোট পরিমাণে ব্যবহৃত হতো।",
  },
];

const oldTurkicUnits = [
  {
    href: "/birimler/cig",
    name: "চিগ (Çığ)",
    value: "≈ ০.৩৩৩ মি",
    note: "একটি পুরনো তুর্কি দৈর্ঘ্যের একক, প্রাচীন ভাষাগত ও ঐতিহাসিক উৎসে পাওয়া যায়।",
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
              <strong>{unit.value}</strong> {" - "} {unit.note}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default function BengaliHistoricalUnitsPage() {
  return (
    <StaticPageLayout
      locale="bn"
      breadcrumbAriaLabel="ব্রেডক্রাম্ব"
      breadcrumbs={[
        { href: "/bn", label: "হোম" },
        { label: "ঐতিহাসিক পরিমাপ একক" },
      ]}
      title="ঐতিহাসিক পরিমাপ একক"
      description="বাইজেন্টাইন, উসমানীয় ও পুরনো তুর্কি পরিমাপ একক আধুনিক মিটার ও গ্রামের সমতুল্য মানসহ অন্বেষণ করুন, এবং দুটি ব্যবহারিক রূপান্তরকারী দিয়ে সরাসরি রূপান্তর করুন।"
      alternateLink={{
        href: "/tarihi-olcu-birimleri",
        hrefLang: "tr",
        label: "Türkçe versiyonu aç",
      }}
      sections={[
        {
          heading: "সংক্ষিপ্ত ঐতিহাসিক পটভূমি",
          content: (
            <>
              <p>
                আনাতোলিয়া ও এই অঞ্চলে পরিমাপের ইতিহাস আধুনিক মেট্রিক
                পদ্ধতি দিয়ে শুরু হয়নি; বরং বাইজেন্টাইন ও উসমানীয়
                ব্যবস্থা, তারপর আরও পুরনো তুর্কি পরিমাপের একাধিক স্তর
                পেরিয়ে এসেছে।
              </p>
              <p>
                তাই আরশিন, ওক্কা ও দিরহামের মতো নাম আজও পুরনো নথিতে,
                এবং কিছু ঐতিহাসিক বই ও গবেষণায় দেখা যায়।
              </p>
            </>
          ),
        },
        {
          heading: "ঐতিহাসিক দৈর্ঘ্য একক রূপান্তরকারী",
          content: (
            <>
              <p>
                আরশিন, এনদাজে, বাইজেন্টাইন ফুট, বাইজেন্টাইন হাত-প্রসার
                ও চিগের মধ্যে সরাসরি রূপান্তর করুন, সাথে আধুনিক
                মিটারের সমতুল্য মান দেখুন। সব আধুনিক দৈর্ঘ্যের একক
                দেখতে{" "}
                <Link href="/bn/categories/doirghyo">সম্পূর্ণ দৈর্ঘ্য লাইব্রেরি</Link>
                {" "}খুলুন।
              </p>
              <CategoryUnitConverter
                category="uzunluk"
                locale="bn"
                unitOptions={historicalLengthUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "ঐতিহাসিক ভর একক রূপান্তরকারী",
          content: (
            <>
              <p>
                উসমানীয় ওক্কা, দিরহাম, বাইজেন্টাইন লিত্রা ও বাইজেন্টাইন
                ওউনকিয়ার মধ্যে রূপান্তর করুন, আধুনিক গ্রামকে রেফারেন্স
                হিসেবে ব্যবহার করে। কিলোগ্রাম ও টনের মতো আধুনিক এককের
                জন্য{" "}
                <Link href="/bn/categories/bhor">সম্পূর্ণ ভর লাইব্রেরি</Link>
                {" "}খুলতে পারেন।
              </p>
              <CategoryUnitConverter
                category="kutle"
                locale="bn"
                unitOptions={historicalMassUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "বাইজেন্টাইন যুগের একক",
          content: (
            <>
              <p>
                বাইজেন্টিয়াম গ্রিক ও রোমান পরিমাপের ঐতিহ্যের অনেকটাই
                উত্তরাধিকার সূত্রে পেয়েছিল এবং বাণিজ্য ও নির্মাণে
                শতাব্দীর পর শতাব্দী ধরে টিকে থাকা ব্যবহারিক দৈর্ঘ্য ও
                ভরের একক তৈরি করেছিল।
              </p>
              <UnitList units={byzantineUnits} />
            </>
          ),
        },
        {
          heading: "উসমানীয় যুগের একক",
          content: (
            <>
              <p>
                উসমানীয় রাষ্ট্র বিংশ শতাব্দীতে সম্পূর্ণভাবে মেট্রিক
                পদ্ধতিতে রূপান্তরিত হওয়ার আগে আরশিন, এনদাজে, ওক্কা ও
                দিরহামের মতো একক বাজার, নির্মাণ ও দৈনন্দিন জীবনে
                ব্যবহার করত।
              </p>
              <UnitList units={ottomanUnits} />
            </>
          ),
        },
        {
          heading: "আরও পুরনো তুর্কি একক",
          content: (
            <>
              <p>
                কিছু পুরনো একক ভাষাগত ও ঐতিহাসিক উৎসের মাধ্যমে পরিচিত
                রয়ে গেছে, এবং পুরনো লেখা বোঝা ও আধুনিক পরিমাপের সাথে
                সম্পর্কিত করার জন্য গুরুত্বপূর্ণ।
              </p>
              <UnitList units={oldTurkicUnits} />
            </>
          ),
        },
        {
          heading: "এই একক আজও কেন গুরুত্বপূর্ণ?",
          content: (
            <>
              <p>
                ওয়াকফ নথি, পুরনো রেকর্ড, ঐতিহাসিক গবেষণা ও অনুবাদের
                কাজে এই নামগুলো আজও দেখা যায়, তাই এগুলোকে মিটার বা
                গ্রামে রূপান্তর করা দ্রুত বুঝতে সাহায্য করে।
              </p>
              <p>
                শিক্ষার্থী, কনটেন্ট নির্মাতা এবং যে কেউ ঐতিহাসিক
                সংখ্যাগুলো স্পষ্ট আধুনিক মানদণ্ডে পড়তে চান, তাদের
                জন্যও এই পৃষ্ঠা কাজে লাগবে।
              </p>
            </>
          ),
        },
        {
          heading: "সম্পর্কিত টুলস",
          content: (
            <ul className="related-conversion-list">
              <li>
                <Link href="/bn/kitchen-measurement-converter">রান্নাঘর পরিমাপ রূপান্তরকারী</Link>
              </li>
              <li>
                <Link href="/bn/recipe-converter">রেসিপি রূপান্তরকারী</Link>
              </li>
              <li>
                <Link href="/bn/shoe-size-converter">জুতার মাপ রূপান্তরকারী</Link>
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
