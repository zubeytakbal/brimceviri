import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import PaintCalculator from "../../components/PaintCalculator";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import {
  DOOR_AREA_M2,
  WINDOW_AREA_M2,
  calculatePaintNeeds,
  type PaintCanSuggestion,
} from "../../converter/paintCalculator";
import { buildSiteUrl } from "../../siteConfig";

const FT_M = 0.3048;
const SQFT_PER_M2 = 1 / (FT_M * FT_M);
const f = (n: number, d = 2) => n.toLocaleString("bn-BD", { maximumFractionDigits: d });
const cans = (list: PaintCanSuggestion[]) => list.map((c) => `${f(c.count, 0)} × ${f(c.size, 1)} লিটার`).join(" + ");

function roomInFeet(lengthFt: number, widthFt: number, doors: number, windows: number, includeCeiling: boolean) {
  return calculatePaintNeeds({
    length: lengthFt * FT_M,
    width: widthFt * FT_M,
    height: 10 * FT_M,
    doorCount: doors,
    windowCount: windows,
    coats: 2,
    coverage: 10,
    includeCeiling,
  })!;
}

const example = roomInFeet(12, 10, 1, 2, false);
const exampleWithCeiling = roomInFeet(12, 10, 1, 2, true);
const ROOMS_FT: Array<[string, number, number]> = [
  ["ছোট শোবার ঘর", 10, 10],
  ["শোবার ঘর", 12, 10],
  ["মাস্টার বেডরুম", 12, 12],
  ["ড্রয়িং রুম", 14, 12],
  ["বড় ড্রয়িং-ডাইনিং", 16, 14],
];
const SQFT_PER_LITRE = [80, 100, 120, 140];

const faqItems: FaqItem[] = [
  {
    question: "এই টুলটি কী হিসাব করে?",
    answer:
      "ক্যালকুলেটর দেয়ালের ক্ষেত্রফল থেকে দরজা ও জানালার ক্ষেত্রফল বাদ দেয়, তারপর ফলাফলকে আপনার প্রয়োগ করা কোটের সংখ্যা দিয়ে গুণ করে।",
  },
  {
    question: "এটি কখন কাজে লাগে?",
    answer:
      "রং কেনার আগে, এই পাতা দ্রুত পরিমাণ অনুমান করতে সাহায্য করে, যাতে আপনি কম বা বেশি রং কিনে না ফেলেন।",
  },
];

export const metadata: Metadata = {
  title: "রং ক্যালকুলেটর — প্রয়োজনীয় রংয়ের পরিমাণ হিসাব করুন",
  description:
    "রুমের মাপ, দরজা-জানালার সংখ্যা ও কোটের সংখ্যা থেকে কত লিটার রং প্রয়োজন তা তাৎক্ষণিক হিসাব করুন।",
  alternates: {
    canonical: "/bn/paint-calculator",
    languages: {
      tr: "/boya-hesaplama",
      en: "/en/paint-calculator",
      bn: "/bn/paint-calculator",
      "x-default": "/boya-hesaplama",
    },
  },
  openGraph: {
    title: "রং ক্যালকুলেটর",
    description: "রুমের মাপ থেকে প্রয়োজনীয় রংয়ের পরিমাণ হিসাব করুন।",
    url: buildSiteUrl("/bn/paint-calculator"),
    siteName: "BirimCeviri.app",
    locale: "bn_BD",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function BengaliPaintCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "হোম", item: buildSiteUrl("/bn") },
      { "@type": "ListItem", position: 2, name: "রং ক্যালকুলেটর", item: buildSiteUrl("/bn/paint-calculator") },
    ],
  };

  return (
    <main className="all-conversions-page" lang="bn">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="ব্রেডক্রাম্ব">
          <Link href="/bn">হোম</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>রং ক্যালকুলেটর</span>
        </nav>

        <header className="all-conversions-header">
          <h1>রং ক্যালকুলেটর</h1>
          <p>
            রুমের দৈর্ঘ্য, প্রস্থ ও উচ্চতা লিখুন — রং করার ক্ষেত্রফল ও
            আনুমানিক প্রয়োজনীয় লিটার রং তাৎক্ষণিক দেখুন।
          </p>
        </header>

        <PaintCalculator locale="bn" />

        <section className="category-article-content">
          <h2>হিসাবের নিয়ম ও ধরে নেওয়া মান</h2>
          <p>
            চার দেয়ালের মোট ক্ষেত্রফল = ২ × (দৈর্ঘ্য + প্রস্থ) × উচ্চতা। এখান থেকে প্রতিটি দরজার জন্য {f(DOOR_AREA_M2, 1)} মি² এবং
            প্রতিটি জানালার জন্য {f(WINDOW_AREA_M2, 1)} মি² বাদ যায়। ছাদ যুক্ত করলে দৈর্ঘ্য × প্রস্থ যোগ হয়। নিট ক্ষেত্রফলকে কোটের
            সংখ্যা দিয়ে গুণ করে রঙের আবরণ ক্ষমতা (এক লিটারে কত বর্গমিটার এক কোট হয়) দিয়ে ভাগ করলে প্রয়োজনীয় লিটার পাওয়া যায়।
            আবরণ ক্ষমতার ঘরে আগে থেকে ১০ মি²/লিটার দেওয়া আছে; আপনার রঙের কৌটায় লেখা মান দিয়ে বদলে নিন।
          </p>
          <p>
            ক্যালকুলেটর মিটারে কাজ করে, কিন্তু বাংলাদেশে ঘরের মাপ সাধারণত ফুটে বলা হয়। ফুটকে ০.৩০৪৮ দিয়ে গুণ করলে মিটার হয়: ১২
            ফুট = ৩.৬৫৭৬ মিটার, ১০ ফুট = ৩.০৪৮ মিটার। দরজা বা জানালা অনেক বড় হলে (যেমন পুরো দেয়াল জুড়ে গ্রিলের বারান্দা দরজা)
            সেটির মাপ আলাদা করে হিসাব করে দেয়ালের ক্ষেত্রফল থেকে বাদ দেওয়া ভালো।
          </p>

          <h2>উদাহরণ: ১২ × ১০ ফুটের ঘর, ১০ ফুট উঁচু</h2>
          <p>
            একটি দরজা ও দুটি জানালা, দুই কোট রং। মিটারে দেয়ালের মোট ক্ষেত্রফল ২ × (৩.৬৫৭৬ + ৩.০৪৮) × ৩.০৪৮ ={" "}
            {f(example.grossWallArea)} মি²। দরজা-জানালা বাদ ({f(example.openingsArea, 1)} মি²) দিলে নিট {f(example.netWallArea)} মি²।
            দুই কোটে {f(example.totalPaintedArea)} মি², আর ১০ মি²/লিটার হারে লাগবে <strong>{f(example.litersNeeded)} লিটার</strong>;
            প্রস্তাবিত কেনা: {cans(example.suggestedCans)}।
          </p>
          <p>
            ছাদও রং করলে ১২ × ১০ = ১২০ বর্গফুট, অর্থাৎ {f(exampleWithCeiling.ceilingArea)} মি² যোগ হয়। তখন মোট{" "}
            {f(exampleWithCeiling.litersNeeded)} লিটার, কেনার প্রস্তাব {cans(exampleWithCeiling.suggestedCans)}।
          </p>

          <h2>ঘরের মাপ অনুযায়ী আনুমানিক রং</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>১০ ফুট উচ্চতা, ১টি দরজা ও ১টি জানালা, দুই কোট, ১০ মি²/লিটার</caption>
              <thead>
                <tr>
                  <th scope="col">ঘর</th>
                  <th scope="col">মাপ (ফুট)</th>
                  <th scope="col">নিট দেয়াল</th>
                  <th scope="col">শুধু দেয়াল</th>
                  <th scope="col">দেয়াল ও ছাদ</th>
                </tr>
              </thead>
              <tbody>
                {ROOMS_FT.map(([name, l, w]) => {
                  const walls = roomInFeet(l, w, 1, 1, false);
                  const all = roomInFeet(l, w, 1, 1, true);
                  return (
                    <tr key={name}>
                      <td>{name}</td>
                      <td>
                        {f(l, 0)} × {f(w, 0)}
                      </td>
                      <td>{f(walls.netWallArea, 1)} মি²</td>
                      <td>{f(walls.litersNeeded, 1)} লিটার</td>
                      <td>{f(all.litersNeeded, 1)} লিটার</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <h2>কৌটায় বর্গফুট লেখা থাকলে</h2>
          <p>
            অনেক রঙের কৌটা বা ক্যাটালগে আবরণ ক্ষমতা বর্গফুট প্রতি লিটারে দেওয়া থাকে। ১ মি² = {f(SQFT_PER_M2)} বর্গফুট, তাই বর্গফুটের
            মানকে {f(SQFT_PER_M2)} দিয়ে ভাগ করে ক্যালকুলেটরে লিখুন:
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th scope="col">কৌটায় লেখা (বর্গফুট/লিটার)</th>
                  <th scope="col">ক্যালকুলেটরে লিখুন (মি²/লিটার)</th>
                </tr>
              </thead>
              <tbody>
                {SQFT_PER_LITRE.map((s) => (
                  <tr key={s}>
                    <td>{f(s, 0)}</td>
                    <td>{f(s / SQFT_PER_M2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>যে কারণে বাস্তবে বেশি রং লাগে</h2>
          <ul>
            <li>
              <strong>নতুন প্লাস্টার:</strong> নতুন বা খসখসে দেয়াল প্রথম কোটে বেশি রং শুষে নেয়। এজন্য সাধারণত আগে প্রাইমার বা
              সিলার দেওয়া হয়, যার পরিমাণ এই হিসাবে ধরা নেই।
            </li>
            <li>
              <strong>গাঢ় থেকে হালকা রঙে:</strong> পুরনো গাঢ় রঙের ওপর হালকা রং করলে দুই কোটে ঢাকা না-ও পড়তে পারে; তৃতীয় কোটের
              হিসাবে ক্যালকুলেটরের ফলাফল দেড় গুণ ধরুন।
            </li>
            <li>
              <strong>কোট গুণ করতে ভুলে যাওয়া:</strong> কৌটার আবরণ ক্ষমতা এক কোটের হিসাব। দুই কোট করলে ক্ষেত্রফল দ্বিগুণ হবে, এটি
              সবচেয়ে সাধারণ ভুল।
            </li>
            <li>
              <strong>পরে মেলানো কঠিন:</strong> একই শেডের রং ভিন্ন ব্যাচে সামান্য আলাদা দেখাতে পারে। তাই হিসাবের চেয়ে কিছুটা বেশি
              একবারেই কেনা নিরাপদ, আর বাড়তি রং পরে মেরামতের কাজে লাগে।
            </li>
          </ul>

          <h2>সাধারণ জিজ্ঞাসা</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>অন্যান্য ভাষা</h2>
          <Link className="text-link" href="/boya-hesaplama" hrefLang="tr">
            তুর্কি সংস্করণ খুলুন
          </Link>
        </section>
      </div>
    </main>
  );
}
