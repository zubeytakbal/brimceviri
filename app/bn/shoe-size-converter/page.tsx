import type { Metadata } from "next";
import Link from "next/link";
import ShoeSizeConverter from "../../components/ShoeSizeConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "জুতার মাপ রূপান্তরকারী",
  description:
    "ইউরোপ (EU), যুক্তরাষ্ট্র (US) ও যুক্তরাজ্য (UK) জুতার মাপ রূপান্তর করুন; Nike, Adidas, Puma, New Balance ও Converse এর মাপের তালিকাও দেখুন।",
  alternates: {
    canonical: "/bn/shoe-size-converter",
    languages: {
      tr: "/ayakkabi-numarasi-cevirme",
      en: "/en/shoe-size-converter",
      de: "/de/schuhgroessen-umrechner",
      bn: "/bn/shoe-size-converter",
      "x-default": "/ayakkabi-numarasi-cevirme",
    },
  },
  openGraph: {
    title: "জুতার মাপ রূপান্তরকারী",
    description:
      "ইউরোপ, যুক্তরাষ্ট্র ও যুক্তরাজ্যের জুতার মাপ রূপান্তর করুন।",
    url: buildSiteUrl("/bn/shoe-size-converter"),
    siteName: "BirimCeviri.app",
    locale: "bn_BD",
    type: "website",
  },
};

export default function BengaliShoeSizePage() {
  return (
    <main className="all-conversions-page" lang="bn">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="ব্রেডক্রাম্ব">
          <Link href="/bn">হোম</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>জুতার মাপ রূপান্তরকারী</span>
        </nav>

        <header className="all-conversions-header">
          <h1>জুতার মাপ রূপান্তরকারী</h1>

          <p>
            আপনার পরিচিত মাপ লিখুন এবং সাথে সাথে ইউরোপ (EU), যুক্তরাষ্ট্র
            (US) ও যুক্তরাজ্যের (UK) মিলে যাওয়া মাপ দেখুন। পুরুষ, নারী,
            শিশু ও বড় বাচ্চাদের জন্য আলাদা তালিকা এবং Nike, Adidas, Puma,
            New Balance ও Converse ব্র্যান্ডের তুলনাও পাবেন।
          </p>
        </header>

        <ShoeSizeConverter locale="bn" />

        <section className="category-article-content">
          <h2>ব্র্যান্ডভেদে জুতার মাপ কেন ভিন্ন হয়?</h2>
          <p>
            ইউরোপের মাপ তুলনামূলকভাবে স্থির, কিন্তু US ও UK পদ্ধতি ভিন্ন
            স্কেলের উপর ভিত্তি করে সংখ্যা তৈরি করে। এর উপর, প্রতিটি
            ব্র্যান্ড ভিন্ন উৎপাদন ছাঁচ ও আরামের নকশা ব্যবহার করে, তাই
            একই পায়ের দৈর্ঘ্য বিভিন্ন ব্র্যান্ডে ভিন্ন মাপে বা অর্ধেক
            মাপ বেশি/কম হিসেবে দেখাতে পারে।
          </p>
          <p>
            সবচেয়ে ভালো ফলাফল সাধারণত পায়ের দৈর্ঘ্য সেন্টিমিটারে মেপে
            তারপর টুলে "পায়ের দৈর্ঘ্য" অপশন বেছে নিলে পাওয়া যায়। এভাবে
            বাজারভেদে মাপের নামের পার্থক্য থেকে সৃষ্ট ভুল কমে যায়।
          </p>
          <p>
            শিশুদের মাপে US নম্বরিং ১৩.৫ এর পর নতুন করে শুরু হয়, তাই
            তুলনা স্পষ্ট রাখতে ছোট বাচ্চা ও বড় বাচ্চাদের তালিকা আলাদা
            রাখা হয়েছে।
          </p>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>অন্যান্য ভাষা</h2>
          <Link
            className="text-link"
            href="/ayakkabi-numarasi-cevirme"
            hrefLang="tr"
          >
            Türkçe versiyonu aç
          </Link>
        </section>
      </div>
    </main>
  );
}
