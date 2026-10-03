import type { Metadata } from "next";
import { DotKoduOkuma } from "../components/AracSahibiAraclari";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { aracRelated } from "../i18n/aracAraclari";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/lastik-dot-kodu-okuma";
const title = "Lastik Üretim Tarihi Okuma (DOT Kodu): Lastiğim Kaç Yaşında?";
const description =
  "Lastiğin yanağındaki DOT kodunun son 4 hanesini yazın: hangi yılın hangi haftasında üretildi, kaç yaşında, değiştirmeli misiniz? 2523 gibi kodların anlamı.";

export const metadata: Metadata = {
  title: seoTitle(title, "Lastik DOT Kodu Okuma"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Lastik üretim tarihi nerede yazar?",
    answer:
      "Lastiğin yanağında \"DOT\" ile başlayan kodun sonunda, genellikle oval bir çerçeve içindeki 4 haneli sayıdır. Kod lastiğin yalnızca bir yüzünde olabilir; göremiyorsanız aracın alt tarafına bakan yüze bakın.",
  },
  {
    question: "DOT kodu nasıl okunur?",
    answer: "İlk iki hane yılın kaçıncı haftası, son iki hane yıldır. 2523, 2023'ün 25. haftası (19–25 Haziran 2023); 0619, 2019'un 6. haftasıdır.",
  },
  {
    question: "Lastik kaç yılda değiştirilmeli?",
    answer:
      "Diş derinliği yeterli olsa bile kauçuk zamanla sertleşir ve çatlar. Çoğu üretici 5 yaşından sonra her yıl kontrol, 6 yaşından sonra değişim önerir; 10 yaşını geçen lastik, yedek dahil, kullanılmamalıdır.",
  },
  {
    question: "Sıfır lastik alırken üretim tarihi kaç olmalı?",
    answer: "Uygun koşullarda depolanan lastik 2 yaşına kadar yeni kabul edilir. Daha eski tarihli lastik satılıyorsa indirim isteyebilir ya da yenisini talep edebilirsiniz.",
  },
  {
    question: "Lastik diş derinliği en az kaç mm olmalı?",
    answer: "Yaz lastiğinde yasal alt sınır 1,6 mm'dir; güvenli fren için 3 mm'ye inince değiştirmek önerilir. Kış lastiğinde 4 mm'nin altına inen lastik kış koşullarında yeterli tutuş sağlamaz.",
  },
  {
    question: "3 haneli DOT kodu ne demek?",
    answer: "2000 yılından önce üretilen lastiklerde tarih 3 hanedir: ilk iki hane hafta, son hane yılın son rakamı. Böyle bir lastik en az 25 yaşındadır ve kullanılmamalıdır.",
  },
];

export default function DotPage() {
  const now = new Date();
  const initialDate = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-${String(now.getUTCDate()).padStart(2, "0")}`;
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/otomotiv-araclari", label: "Otomotiv Araçları" },
        { href: path, label: "Lastik DOT Kodu Okuma" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Lastik Üretim Tarihi (DOT Kodu) Okuma"
      intro="Lastiğin yanağındaki DOT kodunun son 4 hanesini yazın; lastiğin hangi hafta üretildiğini, kaç yaşında olduğunu ve değiştirmeniz gerekip gerekmediğini görün."
      tool={<DotKoduOkuma initialDate={initialDate} />}
      related={{ title: "Diğer araç sahibi araçları", links: aracRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "okuma", label: "DOT kodu nasıl okunur?" },
        { id: "omur", label: "Lastik yaşına göre ne yapmalı?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="okuma">DOT kodu nasıl okunur?</h2>
      <p>
        Örnek kod: <strong>DOT EX 2B 1234 2523</strong>. Baştaki harf ve rakamlar fabrikayı, ebadı ve üretici kodunu gösterir. Tarih yalnızca son dört hanededir:{" "}
        <strong>25</strong> haftayı, <strong>23</strong> yılı belirtir. Yani bu lastik 2023&apos;ün 25. haftasında, 19–25 Haziran arasında üretilmiştir.
      </p>
      <h2 id="omur">Lastik yaşına göre ne yapmalı?</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Yaş</th>
              <th scope="col">Öneri</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">0–2 yıl</th>
              <td>Yeni sayılır; sıfır alırken kabul edilebilir.</td>
            </tr>
            <tr>
              <th scope="row">2–5 yıl</th>
              <td>Normal ömür; diş derinliğine ve yanak çatlaklarına bakın.</td>
            </tr>
            <tr>
              <th scope="row">5–6 yıl</th>
              <td>Yılda en az bir kez ustaya kontrol ettirin.</td>
            </tr>
            <tr>
              <th scope="row">6–10 yıl</th>
              <td>Diş derin olsa bile değişim önerilir.</td>
            </tr>
            <tr>
              <th scope="row">10 yıl ve üzeri</th>
              <td>Yedek lastik dahil mutlaka değiştirin.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </TimeToolPage>
  );
}
