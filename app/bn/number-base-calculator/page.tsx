import type { Metadata } from "next";
import Link from "next/link";
import NumberBaseCalculator from "../../components/NumberBaseCalculator";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "সংখ্যা পদ্ধতি রূপান্তরকারী — বাইনারি, অক্টাল, ডেসিমেল, হেক্সাডেসিমেল",
  description:
    "বাইনারি (দ্বিমিক), অক্টাল (অষ্টমিক), ডেসিমেল (দশমিক) ও হেক্সাডেসিমেল (ষোড়শমিক) সংখ্যা পদ্ধতির মধ্যে তাৎক্ষণিক রূপান্তর করুন; বাইনারি সংখ্যা যোগ, বিয়োগ ও গুণ করুন।",
  alternates: {
    canonical: "/bn/number-base-calculator",
    languages: {
      tr: "/sayi-tabani-cevirici",
      bn: "/bn/number-base-calculator",
      "x-default": "/sayi-tabani-cevirici",
    },
  },
  openGraph: {
    title: "সংখ্যা পদ্ধতি রূপান্তরকারী",
    description:
      "বাইনারি, অক্টাল, ডেসিমেল ও হেক্সাডেসিমেল সংখ্যা পদ্ধতির মধ্যে তাৎক্ষণিক রূপান্তর করুন।",
    url: buildSiteUrl("/bn/number-base-calculator"),
    siteName: "BirimCeviri.app",
    locale: "bn_BD",
    type: "website",
  },
};

export default function BengaliNumberBaseCalculatorPage() {
  return (
    <main className="all-conversions-page" lang="bn">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="ব্রেডক্রাম্ব">
          <Link href="/bn">হোম</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>সংখ্যা পদ্ধতি রূপান্তরকারী</span>
        </nav>

        <header className="all-conversions-header">
          <h1>সংখ্যা পদ্ধতি রূপান্তরকারী</h1>
          <p>
            বাইনারি, অক্টাল, ডেসিমেল ও হেক্সাডেসিমেল সংখ্যা পদ্ধতির মধ্যে
            তাৎক্ষণিক রূপান্তর করুন; নিচের দ্বিতীয় টুল দিয়ে দুটি বাইনারি
            সংখ্যা যোগ, বিয়োগ বা গুণ করুন।
          </p>
        </header>

        <NumberBaseCalculator locale="bn" />

        <section className="category-article-content">
          <h2>সংখ্যা পদ্ধতি কী এবং কীভাবে কাজ করে?</h2>
          <p>
            আমরা দৈনন্দিন জীবনে যে <strong>ডেসিমেল (দশমিক)</strong> পদ্ধতি
            ব্যবহার করি তাতে ১০টি অঙ্ক (০-৯) থাকে। কম্পিউটার তথ্য সংরক্ষণ
            করে <strong>বাইনারি (দ্বিমিক)</strong> পদ্ধতিতে, শুধু ০ ও ১
            অঙ্ক দিয়ে। <strong>অক্টাল (অষ্টমিক)</strong> ও{" "}
            <strong>হেক্সাডেসিমেল (ষোড়শমিক)</strong> পদ্ধতি দীর্ঘ বাইনারি
            সংখ্যাকে সংক্ষিপ্ত ও সহজে পড়ার যোগ্য করে তোলে — বিশেষত
            প্রোগ্রামিং, নেটওয়ার্ক ঠিকানা ও রঙের কোডে এগুলো ব্যাপকভাবে
            ব্যবহৃত হয়।
          </p>
          <p>
            একটি সংখ্যার পদ্ধতি পরিবর্তন করলে তার মান নয়, শুধু উপস্থাপনের
            রূপ পরিবর্তিত হয়। যেমন ডেসিমেলে ১০ সংখ্যাটি বাইনারিতে ১০১০ এবং
            হেক্সাডেসিমেলে A হিসেবে লেখা হয় — সবগুলোই একই পরিমাণ বোঝায়।
          </p>

          <h2>বাইনারি সংখ্যা যোগ, বিয়োগ ও গুণ কীভাবে করবেন?</h2>
          <p>
            বাইনারি গাণিতিক প্রক্রিয়া ডেসিমেল পদ্ধতির মতোই কাজ করে; শুধু
            পার্থক্য হলো প্রতিটি অঙ্ক শুধু ০ অথবা ১ হতে পারে। এই টুলটি
            আপনার দেওয়া দুটি বাইনারি সংখ্যাকে পেছনে ডেসিমেলে রূপান্তর করে
            হিসাব করে এবং ফলাফল আবার বাইনারিতে দেখায়।
          </p>

          <h2>অন্যান্য ভাষা</h2>
          <Link className="text-link" href="/sayi-tabani-cevirici" hrefLang="tr">
            Türkçe versiyonu aç
          </Link>
        </section>
      </div>
    </main>
  );
}
