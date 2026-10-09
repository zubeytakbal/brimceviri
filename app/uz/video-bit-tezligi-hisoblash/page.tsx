import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import VideoBitrateCalculatorUz from "../../components/calculators/VideoBitrateCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/video-bit-tezligi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Video fayl hajmi bit tezligidan qanday hisoblanadi?",
    answer:
      "Fayl Hajmi (MB) = Bit Tezligi (Mbps) × Davomiylik (soniya) / 8. Masalan 8 Mbps bit tezligi bilan kodlangan 10 daqiqalik (600 soniya) video: 8 × 600 / 8 = 600 MB.",
  },
  {
    question: "Maqsadli fayl hajmi uchun qaysi bit tezligini tanlashim kerak?",
    answer:
      "Bit Tezligi (Mbps) = Fayl Hajmi (MB) × 8 / Davomiylik (soniya) formulasi bilan, ma'lum bir fayl hajmiga sig'ish uchun kerakli bit tezligini hisoblashingiz mumkin.",
  },
];

// YouTube yuklash uchun tavsiya qilgan SDR bit tezliklari (Mbit/s; oddiy / yuqori kadr chastotasi).
const YOUTUBE_TAVSIYA: Array<[string, number, number]> = [
  ["720p", 5, 7.5],
  ["1080p", 8, 12],
  ["1440p", 16, 24],
  ["2160p (4K)", 40, 60],
];
const daqiqaMb = (mbps: number) => (mbps * 60) / 8;
const uz = (n: number) => n.toLocaleString("uz-UZ", { maximumFractionDigits: 1 });

export const metadata: Metadata = {
  title: "Video Bit Tezligi va Fayl Hajmi Hisoblash",
  description:
    "Bit tezligi (Mbps) va davomiylikdan video fayl hajmini (MB), yoki maqsadli fayl hajmidan kerakli bit tezligini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/video-bit-hizi-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/video-bit-hizi-hesaplama",
    },
  },
  openGraph: {
    title: "Video Bit Tezligi va Fayl Hajmi Hisoblash",
    description: "Bit tezligi va fayl hajmi orasida hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekVideoBitrateCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Video Bit Tezligi va Fayl Hajmi Hisoblash", item: buildSiteUrl(pagePath) },
    ],
  };

  return (
    <main className="all-conversions-page" lang="uz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Video Bit Tezligi va Fayl Hajmi Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Video Bit Tezligi va Fayl Hajmi Hisoblash</h1>
          <p>
            Bit tezligidan (Mbps) fayl hajmini (MB), yoki maqsadli
            fayl hajmidan kerakli bit tezligini hisoblang.
          </p>
        </header>

        <VideoBitrateCalculatorUz />

        <section className="category-article-content">
          <h2>Daqiqasiga necha MB? Ruxsatga qarab jadval</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Ruxsat</th>
                  <th>24–30 kadr/s</th>
                  <th>1 daqiqa</th>
                  <th>48–60 kadr/s</th>
                  <th>1 daqiqa</th>
                </tr>
              </thead>
              <tbody>
                {YOUTUBE_TAVSIYA.map(([nom, oddiy, yuqori]) => (
                  <tr key={nom}>
                    <td>{nom}</td>
                    <td>{uz(oddiy)} Mbit/s</td>
                    <td>{uz(daqiqaMb(oddiy))} MB</td>
                    <td>{uz(yuqori)} Mbit/s</td>
                    <td>{uz(daqiqaMb(yuqori))} MB</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Bit tezliklari YouTube yuklash uchun tavsiya qilgan qiymatlardir (4K uchun 35–45 Mbit/s oralig&apos;ining o&apos;rtasi olingan). Fayl
            hajmi faqat video oqimi uchun; audio va konteyner (MP4, MKV) bir necha foiz qo&apos;shadi.
          </p>
          <h2>Misol: 2 GB chegaraga sig&apos;dirish</h2>
          <p>
            45 daqiqalik dars yozuvini 2 GB (2 000 MB) chegarali platformaga yuklash kerak. Davomiyligi 2 700 soniya. Kerakli umumiy bit
            tezligi 2 000 × 8 ÷ 2 700 ≈ 5,9 Mbit/s. Audio uchun 0,19 Mbit/s ajratilsa, videoga taxminan 5,7 Mbit/s qoladi: bu 1080p uchun
            tavsiya qilingan 8 Mbit/s dan past, 720p uchun esa yetarli.
          </p>
          <h2>Nega 8 ga bo&apos;linadi?</h2>
          <p>
            Bit tezligi soniyadagi <em>bitlar</em> soni, fayl hajmi esa <em>baytlarda</em> o&apos;lchanadi. 1 bayt = 8 bit, shuning uchun megabitlar
            yig&apos;indisini 8 ga bo&apos;lish megabaytni beradi. Internet tezligi ham Mbit/s da berilgani uchun 100 Mbit/s ulanish soniyasiga ko&apos;pi
            bilan 12,5 MB yuklaydi.
          </p>

          <h2>Tez-tez So&apos;raladigan Savollar</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}
        </section>
      </div>
    </main>
  );
}
