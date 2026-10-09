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

// YouTube's recommended SDR upload bitrates in Mbps (standard / high frame rate); 4K uses the midpoint of 35-45 and 53-68.
const YOUTUBE_BITRATES: Array<[string, number, number]> = [
  ["360p", 1, 1.5],
  ["480p", 2.5, 4],
  ["720p", 5, 7.5],
  ["1080p", 8, 12],
  ["1440p", 16, 24],
  ["2160p (4K)", 40, 60],
];
const mbPerMinute = (mbps: number) => (mbps * 60) / 8;
const uz = (v: number, d = 1) => v.toLocaleString("uz-UZ", { maximumFractionDigits: d });

const WEDDING_SECONDS = 2 * 60 * 60;
const AUDIO_MBPS = 0.192;
const WEDDING_FULL_MB = ((8 + AUDIO_MBPS) * WEDDING_SECONDS) / 8;
const FAT32_LIMIT_MB = (2 ** 32 - 1) / 1_000_000;
const WEDDING_TARGET_MB = 4000;
const WEDDING_TOTAL_MBPS = (WEDDING_TARGET_MB * 8) / WEDDING_SECONDS;
const MOBILE_MB = (5 * 3600) / 8;

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
          <h2>Bir daqiqa videoga necha MB: o&apos;lchamlar bo&apos;yicha jadval</h2>
          <p>
            {`Quyidagi bit tezliklari YouTube video yuklash uchun tavsiya etadigan SDR qiymatlari (4K uchun tavsiya etilgan 35–45 Mbps oralig'ining o'rtasi olingan). Hajm faqat video oqimi uchun; audio oqimi va MP4 yoki MKV konteyneri bunga yana bir necha foiz qo'shadi.`}
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>O&apos;lcham</th>
                  <th>24–30 kadr/s</th>
                  <th>1 daqiqa</th>
                  <th>1 soat</th>
                  <th>48–60 kadr/s</th>
                  <th>1 daqiqa</th>
                </tr>
              </thead>
              <tbody>
                {YOUTUBE_BITRATES.map(([label, standard, high]) => (
                  <tr key={label}>
                    <td>{label}</td>
                    <td>{uz(standard)} Mbps</td>
                    <td>{uz(mbPerMinute(standard))} MB</td>
                    <td>{uz((mbPerMinute(standard) * 60) / 1000)} GB</td>
                    <td>{uz(high)} Mbps</td>
                    <td>{uz(mbPerMinute(high))} MB</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Misol: ikki soatlik to&apos;y videosini fleshkaga yozish</h2>
          <p>
            {`To'y videosi 2 soat (${uz(WEDDING_SECONDS, 0)} soniya), 1080p da 8 Mbps video va 192 kbps audio bilan kodlangan. Hajm (8 + 0,192) × ${uz(WEDDING_SECONDS, 0)} ÷ 8 = ${uz(WEDDING_FULL_MB, 0)} MB, ya'ni taxminan ${uz(WEDDING_FULL_MB / 1000)} GB. 16 GB lik fleshkaga bemalol sig'adi, lekin fleshka FAT32 tizimida formatlangan bo'lsa, bitta fayl ${uz(FAT32_LIMIT_MB, 0)} MB dan (4 GiB) katta bo'la olmaydi va yozish xato bilan to'xtaydi.`}
          </p>
          <p>
            {`Bitta faylni ${uz(WEDDING_TARGET_MB, 0)} MB ga sig'dirish uchun umumiy bit tezligi ${uz(WEDDING_TARGET_MB, 0)} × 8 ÷ ${uz(WEDDING_SECONDS, 0)} = ${uz(WEDDING_TOTAL_MBPS, 2)} Mbps bo'lishi kerak. Audio uchun 0,192 Mbps ayirilsa, videoga ${uz(WEDDING_TOTAL_MBPS - AUDIO_MBPS, 2)} Mbps qoladi. Bu 1080p uchun kam, 720p uchun tavsiya etilgan 5 Mbps dan ham biroz past. Shuning uchun sifatni pasaytirgandan ko'ra fleshkani exFAT tizimida formatlash yoki videoni ikki qismga bo'lish yaxshiroq yechim.`}
          </p>

          <h2>Mobil internet sarfini baholash</h2>
          <p>
            {`Xuddi shu formula internet paketidan qancha trafik ketishini ham ko'rsatadi. 5 Mbps oqimdagi bir soatlik video 5 × 3 600 ÷ 8 = ${uz(MOBILE_MB, 0)} MB, ya'ni qariyb ${uz(MOBILE_MB / 1000, 2)} GB trafik sarflaydi. Video platformalar tomosha paytida ko'pincha yuklash tavsiyasidan pastroq bit tezligini ishlatadi va internet tezligiga qarab sifatni o'zi o'zgartiradi, shuning uchun bu natijani yuqori chegara deb qabul qiling. Ilovada sifatni 480p ga tushirsangiz, jadvalga ko'ra soatiga taxminan ${uz((mbPerMinute(2.5) * 60) / 1000, 2)} GB ketadi.`}
          </p>

          <h2>Nima uchun 8 ga bo&apos;linadi va ko&apos;p uchraydigan xatolar</h2>
          <p>
            {`Bit tezligi soniyasiga bitlar soni (Mbps — megabit/soniya), fayl hajmi esa baytlarda o'lchanadi. 1 bayt = 8 bit, shuning uchun megabitlar yig'indisini 8 ga bo'lsangiz, megabayt chiqadi. Internet tezligi ham Mbps da berilgani uchun 100 Mbps ulanish soniyasiga ko'pi bilan 12,5 MB yuklab oladi.`}
          </p>
          <ul>
            <li>{`Mb va MB ni adashtirish: kichik b — bit, katta B — bayt, oradagi farq 8 baravar.`}</li>
            <li>{`O'zgaruvchan bit tezligini (VBR) doimiy deb hisoblash: harakatli sahnalarda bit tezligi oshadi, shuning uchun maqsadli hajm uchun o'rtacha bit tezligini sozlang.`}</li>
            <li>{`Audioni unutish: stereo AAC odatda 128–320 kbps; uzun videoda u yuzlab megabayt qo'shadi.`}</li>
            <li>{`Davomiylikni daqiqada kiritish: hisoblagich soniyani so'raydi, 10 daqiqa = 600 soniya.`}</li>
            <li>{`MB va MiB farqi: operatsion tizim ba'zan 1 MB = 1 048 576 bayt (MiB) deb ko'rsatadi, shuning uchun fayl hisoblangandan taxminan 5 foiz kichikroq ko'rinadi.`}</li>
          </ul>

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
