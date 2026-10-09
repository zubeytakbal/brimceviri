import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import BmiCalculator from "../../components/BmiCalculator";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { calculateBmi } from "../../converter/bmiCalculator";
import { buildSiteUrl } from "../../siteConfig";

const f = (n: number, d = 1) => n.toLocaleString("bn-BD", { maximumFractionDigits: d });
const kgAt = (bmi: number, cm: number) => bmi * (cm / 100) ** 2;

const example = calculateBmi({ heightCm: 160, weightKg: 65, age: 35, gender: "male", activityLevel: "light" })!;
const feetInchCm = (5 * 12 + 6) * 2.54;
const feetExample = calculateBmi({ heightCm: feetInchCm, weightKg: 70, age: 30, gender: "female", activityLevel: "sedentary" })!;
const HEIGHTS_CM = [150, 155, 160, 165, 170, 175, 180];

const faqItems: FaqItem[] = [
  {
    question: "বিএমআই (BMI) কী?",
    answer:
      "বিএমআই (বডি মাস ইনডেক্স) উচ্চতা ও ওজনের অনুপাত থেকে হিসাব করা একটি সংখ্যা, যা প্রাথমিক ধারণা দিতে সাহায্য করে — তবে এটি বিশেষজ্ঞ স্বাস্থ্য মূল্যায়নের বিকল্প নয়।",
  },
  {
    question: "কার্যকলাপের মাত্রা কেন জিজ্ঞাসা করা হয়?",
    answer:
      "কারণ দৈনিক শক্তি খরচ শুধু ওজন ও উচ্চতার উপর নির্ভর করে না — আপনি কতটা সক্রিয়, তাও এতে প্রভাব ফেলে।",
  },
];

export const metadata: Metadata = {
  title: "বিএমআই ক্যালকুলেটর — বডি মাস ইনডেক্স হিসাব করুন",
  description:
    "উচ্চতা, ওজন, বয়স, লিঙ্গ ও কার্যকলাপের মাত্রা থেকে আপনার বিএমআই, মৌলিক বিপাকীয় হার এবং দৈনিক ক্যালরি চাহিদা হিসাব করুন।",
  alternates: {
    canonical: "/bn/bmi-calculator",
    languages: {
      tr: "/bmi-hesaplama",
      en: "/en/bmi-calculator",
      bn: "/bn/bmi-calculator",
      "x-default": "/bmi-hesaplama",
    },
  },
  openGraph: {
    title: "বিএমআই ক্যালকুলেটর",
    description:
      "উচ্চতা, ওজন, বয়স, লিঙ্গ ও কার্যকলাপের মাত্রা থেকে আপনার বিএমআই হিসাব করুন।",
    url: buildSiteUrl("/bn/bmi-calculator"),
    siteName: "BirimCeviri.app",
    locale: "bn_BD",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function BengaliBmiCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "হোম", item: buildSiteUrl("/bn") },
      { "@type": "ListItem", position: 2, name: "বিএমআই ক্যালকুলেটর", item: buildSiteUrl("/bn/bmi-calculator") },
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
          <span>বিএমআই ক্যালকুলেটর</span>
        </nav>

        <header className="all-conversions-header">
          <h1>বিএমআই ক্যালকুলেটর</h1>
          <p>
            উচ্চতা, ওজন, বয়স, লিঙ্গ ও কার্যকলাপের মাত্রা দিয়ে আপনার
            বিএমআই, মৌলিক বিপাকীয় হার এবং আনুমানিক দৈনিক ক্যালরি
            চাহিদা তাৎক্ষণিক দেখুন।
          </p>
        </header>

        <BmiCalculator locale="bn" />

        <section className="category-article-content">
          <h2>ক্যালকুলেটর কী হিসাব করে</h2>
          <p>
            বিএমআই হলো ওজন (কেজি) ভাগ উচ্চতার (মিটার) বর্গ। ফলাফলের পাশে যে শ্রেণি দেখানো হয়, তা বিশ্ব স্বাস্থ্য সংস্থার (WHO)
            প্রাপ্তবয়স্কদের আন্তর্জাতিক সীমা অনুযায়ী: ১৮.৫-এর নিচে কম ওজন, ১৮.৫ থেকে ২৪.৯ স্বাভাবিক, ২৫ থেকে ২৯.৯ অতিরিক্ত ওজন এবং
            ৩০ বা তার বেশি স্থূলতা। বিএমআই হিসাবে বয়স ও লিঙ্গ লাগে না; এই দুটি ঘর শুধু মৌলিক বিপাকীয় হারের (বিএমআর) জন্য।
          </p>
          <p>
            বিএমআর হিসাব করা হয় মিফলিন-সেন্ট জিয়র সূত্রে: পুরুষের জন্য ১০ × ওজন + ৬.২৫ × উচ্চতা (সেমি) − ৫ × বয়স + ৫, নারীর
            জন্য শেষে +৫ এর বদলে −১৬১। এটি বিশ্রামে শরীর দিনে কত কিলোক্যালরি খরচ করে তার অনুমান। এরপর কার্যকলাপের গুণক (নিষ্ক্রিয়
            ১.২ থেকে অত্যন্ত সক্রিয় ১.৯) দিয়ে গুণ করে মোট দৈনিক ক্যালরি চাহিদা পাওয়া যায়।
          </p>

          <h2>উদাহরণ: ১৬০ সেমি উচ্চতা, ৬৫ কেজি ওজন</h2>
          <p>
            ৩৫ বছর বয়সী একজন পুরুষ, যিনি সপ্তাহে দু-তিন দিন হাঁটেন। উচ্চতা ১.৬০ মিটার, তাই বর্গ ১.৬০ × ১.৬০ = ২.৫৬। বিএমআই = ৬৫ ÷
            ২.৫৬ = <strong>{f(example.bmi)}</strong>, যা আন্তর্জাতিক সীমায় সামান্য অতিরিক্ত ওজনের ঘরে পড়ে। বিএমআর = ৬৫০ + ১০০০ − ১৭৫
            + ৫ = {f(example.basalMetabolicRate, 0)} কিলোক্যালরি; সামান্য সক্রিয় গুণক ১.৩৭৫ দিয়ে দৈনিক চাহিদা প্রায়{" "}
            {f(example.dailyCalorieNeed, 0)} কিলোক্যালরি।
          </p>
          <p>
            উচ্চতা ফুট-ইঞ্চিতে জানা থাকলে আগে সেন্টিমিটারে নিন: ৫ ফুট ৬ ইঞ্চি = ৬৬ ইঞ্চি × ২.৫৪ = {f(feetInchCm, 2)} সেমি। এই উচ্চতায়
            ৭০ কেজি ওজনের বিএমআই {f(feetExample.bmi)}, অর্থাৎ আন্তর্জাতিক সীমায় স্বাভাবিকের একেবারে শেষ প্রান্তে।
          </p>

          <h2>বাংলাদেশের পাঠকের জন্য এশীয় সীমা</h2>
          <p>
            দক্ষিণ ও পূর্ব এশিয়ার মানুষের মধ্যে একই বিএমআইতে শরীরে চর্বির অনুপাত এবং ডায়াবেটিস ও হৃদরোগের ঝুঁকি সাধারণত বেশি দেখা
            যায়। এ কারণে WHO-র একটি বিশেষজ্ঞ পরামর্শসভা (দ্য ল্যানসেট, ২০০৪) এশীয় জনগোষ্ঠীর জন্য অতিরিক্ত পদক্ষেপ-বিন্দু প্রস্তাব
            করে: ২৩ থেকে ঝুঁকি বাড়তে শুরু করে এবং ২৭.৫ থেকে উচ্চ ঝুঁকি। ক্যালকুলেটরের শ্রেণি আন্তর্জাতিক সীমায় দেখানো হলেও উপরের
            উদাহরণের {f(example.bmi)} এশীয় মাপকাঠিতে ২৩ ছাড়িয়ে গেছে, তাই কোমরের মাপ ও রক্তচাপের মতো অন্যান্য সূচকও দেখে নেওয়া
            ভালো।
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>উচ্চতা অনুযায়ী ওজনের সীমা (কেজি)</caption>
              <thead>
                <tr>
                  <th scope="col">উচ্চতা</th>
                  <th scope="col">বিএমআই ১৮.৫</th>
                  <th scope="col">বিএমআই ২৩ (এশীয় ঝুঁকি)</th>
                  <th scope="col">বিএমআই ২৫</th>
                  <th scope="col">বিএমআই ২৭.৫</th>
                  <th scope="col">বিএমআই ৩০</th>
                </tr>
              </thead>
              <tbody>
                {HEIGHTS_CM.map((cm) => (
                  <tr key={cm}>
                    <td>{f(cm, 0)} সেমি</td>
                    <td>{f(kgAt(18.5, cm))}</td>
                    <td>{f(kgAt(23, cm))}</td>
                    <td>{f(kgAt(25, cm))}</td>
                    <td>{f(kgAt(27.5, cm))}</td>
                    <td>{f(kgAt(30, cm))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            টেবিলটি পড়ার নিয়ম: আপনার উচ্চতার সারিতে যে দুটি কলামের মাঝে আপনার ওজন, বিএমআই সেই দুই মানের মাঝখানে। যেমন ১৬৫ সেমি
            উচ্চতায় {f(kgAt(23, 165))} কেজির বেশি ওজন হলে এশীয় মাপকাঠিতে ঝুঁকির ঘরে পড়বেন।
          </p>

          <h2>সীমাবদ্ধতা ও সাধারণ ভুল</h2>
          <ul>
            <li>
              <strong>এটি স্ক্রিনিং, রোগনির্ণয় নয়:</strong> বিএমআই শরীরের চর্বি সরাসরি মাপে না। পেশিবহুল খেলোয়াড়ের বিএমআই বেশি
              আসতে পারে, আবার বয়স্ক মানুষের পেশি কমে গেলে স্বাভাবিক বিএমআইতেও চর্বি বেশি থাকতে পারে।
            </li>
            <li>
              <strong>শিশু, কিশোর ও গর্ভবতী:</strong> ১৮ বছরের কম বয়সীদের জন্য বয়স ও লিঙ্গভিত্তিক বিএমআই চার্ট লাগে, আর
              গর্ভাবস্থায় এই শ্রেণিগুলো প্রযোজ্য নয়।
            </li>
            <li>
              <strong>এককের ভুল:</strong> উচ্চতার ঘরে ৫.৬ লিখলে তা ৫.৬ সেমি ধরা হবে, ৫ ফুট ৬ ইঞ্চি নয়। ওজন পাউন্ডে জানা থাকলে ২.২০৫
              দিয়ে ভাগ করে কেজি করুন।
            </li>
            <li>
              <strong>ক্যালরির সংখ্যা আনুমানিক:</strong> একই বয়স ও ওজনের দুজনের প্রকৃত বিপাক কয়েকশো কিলোক্যালরি পর্যন্ত আলাদা হতে
              পারে। ওজন কমানো বা বাড়ানোর পরিকল্পনা চিকিৎসক বা পুষ্টিবিদের সঙ্গে ঠিক করুন।
            </li>
          </ul>
          <p>
            সূত্র: WHO, প্রাপ্তবয়স্কদের বিএমআই শ্রেণিবিন্যাস; WHO Expert Consultation, &quot;Appropriate body-mass index for Asian
            populations and its implications for policy and intervention strategies&quot;, The Lancet ২০০৪।
          </p>

          <h2>সাধারণ জিজ্ঞাসা</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>অন্যান্য ভাষা</h2>
          <Link className="text-link" href="/bmi-hesaplama" hrefLang="tr">
            তুর্কি সংস্করণ খুলুন
          </Link>
        </section>
      </div>
    </main>
  );
}
