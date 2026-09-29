import Link from "@/app/components/SiteLink";
import {
  FIRTINALAR,
  siradakiFirtinalar,
} from "../../converter/calendar/firtinaTakvimi";
import {
  AY_ADLARI,
  findEtkinlik,
  halkDonemi,
  ozelGunPath,
  takvimAyPath,
} from "../../converter/calendar/trTakvim";
import type { FaqItem } from "../../converter/faqSchema";
import TimeToolPage from "../time/TimeToolPage";
import TakvimGorsel from "./TakvimGorsel";
import { halkMetni, TAKVIM_ARACLARI, trBugun } from "./TakvimSayfalari";

const HALK_GUNLERI = [
  "cemre",
  "hidirellez",
  "kasim-gunleri",
  "erbain",
  "hamsin",
  "kocakari-soguklari",
];

export default function FirtinaTakvimiSayfasi() {
  const bugun = trBugun();
  const h = halkDonemi(bugun);
  const sira = siradakiFirtinalar(bugun, 4);
  const ilk = sira[0];
  const faq: FaqItem[] = [
    {
      question: "Fırtına takvimi nedir?",
      answer:
        "Fırtına takvimi (halk arasında Kocakarı takvimi), Türkiye kıyılarında balıkçıların, kaptanların ve Deniz Kuvvetleri seyir subaylarının uzun yıllar yaptığı gözlemlerle oluşmuş, belirli tarihlerde görülen mevsimsel fırtınaların listesidir.",
    },
    {
      question: "Fırtına takvimi ne kadar doğru?",
      answer:
        "Adı olan fırtınaların çoğu 1-3 gün sapmayla gerçekleşir; ancak bu bir hava tahmini değildir. Denize çıkmadan önce mutlaka Meteoroloji Genel Müdürlüğü'nün güncel tahminlerine ve deniz uyarılarına bakılmalıdır.",
    },
    {
      question: "Bugün halk takvimine göre hangi gün?",
      answer: `Bugün halk takvimine göre ${halkMetni(h)}. Halk takviminde yıl, 6 Mayıs'ta başlayan Hızır günleri ve 8 Kasım'da başlayan Kasım günleri olarak ikiye ayrılır.`,
    },
    {
      question: "Erbain ve Hamsin nedir?",
      answer:
        "Erbain, 22 Aralık'tan 30 Ocak'a kadar süren ve kışın en sert geçen 40 günüdür. Hamsin, ardından 31 Ocak'tan 21 Mart'a kadar süren 50 günlük dönemdir.",
    },
  ];
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/takvim", label: "Takvim" },
        { label: "Fırtına Takvimi" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Fırtına Takvimi ve Halk Takvimi"
      intro="Denizcilerin kullandığı fırtına takvimine göre sıradaki fırtına, halk takviminde bugünün yeri (Kasım ve Hızır günleri, Erbain, Hamsin) ve yıl boyu tüm fırtınalar."
      tool={
        <div className="date-calc">
          <div className="takvim-kart">
            <TakvimGorsel gorsel="firtina" size={112} title="Fırtına" />
            <div>
              <span className="takvim-kat kat-halk">Sıradaki fırtına</span>
              {ilk ? (
                <>
                  <h2>{ilk.f.ad}</h2>
                  <p>
                    {ilk.tarih.day} {AY_ADLARI[ilk.tarih.month - 1]}
                    {ilk.f.sure ? ` (${ilk.f.sure} gün)` : ""} ·{" "}
                    {ilk.kalan > 0
                      ? `${ilk.kalan} gün sonra`
                      : ilk.kalan === 0
                        ? "bugün"
                        : "sürüyor"}
                  </p>
                </>
              ) : null}
              <p className="takvim-kart-alt">
                {sira.slice(1).map((x) => (
                  <span key={x.f.ad + x.tarih.month} className="takvim-etiket">
                    {x.tarih.day} {AY_ADLARI[x.tarih.month - 1]}: {x.f.ad}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className="date-calc-results">
            <div className="date-calc-stat">
              <span>Halk takvimi</span>
              <strong>
                {h.buyuk.ad}: {h.buyuk.gun}. gün
              </strong>
              <em>
                {h.buyuk.ad === "Kasım günleri"
                  ? "Hıdırellez'de (6 Mayıs) Hızır günleri başlar"
                  : "8 Kasım'da Kasım günleri başlar"}
              </em>
            </div>
            {h.kucuk ? (
              <div className="date-calc-stat">
                <span>{h.kucuk.ad}</span>
                <strong>
                  {h.kucuk.gun}. gün / {h.kucuk.toplam}
                </strong>
                <em>
                  {h.kucuk.ad === "Erbain"
                    ? "kışın en sert 40 günü"
                    : "Erbain'den sonraki 50 gün"}
                </em>
              </div>
            ) : null}
          </div>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">Tarih</th>
                  <th scope="col">Fırtına</th>
                  <th scope="col">Süre</th>
                </tr>
              </thead>
              <tbody>
                {FIRTINALAR.map((f) => (
                  <tr
                    key={f.ad + f.ay + f.gun}
                    className={f.ay === bugun.month ? "is-half" : undefined}
                  >
                    <td>
                      <Link
                        href={takvimAyPath(bugun.year, f.ay)}
                        prefetch={false}
                      >
                        {f.gun} {AY_ADLARI[f.ay - 1]}
                      </Link>
                    </td>
                    <td>{f.ad}</td>
                    <td>{f.sure ? `${f.sure} gün` : "1 gün"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
      related={{
        title: "İlginizi çekebilir",
        links: [
          ...HALK_GUNLERI.map((id) => findEtkinlik(id)!).map((e) => ({
            href: ozelGunPath(e.id),
            label: e.ad,
          })),
          { href: "/ozel-gunler", label: "Özel Günler" },
          ...TAKVIM_ARACLARI,
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "halk-takvimi", label: "Halk takvimi nasıl işler?" },
        { id: "faq", label: "Sık Sorulan Sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faq}
    >
      <h2 id="halk-takvimi">Halk takvimi nasıl işler?</h2>
      <p>
        Anadolu&apos;da çiftçiler, çobanlar ve denizciler yüzyıllarca eski Rumi
        takvime dayanan bir halk takvimi kullandı. Yıl iki mevsime ayrılır:{" "}
        <Link href={ozelGunPath("hidirellez")}>Hıdırellez</Link> ile 6
        Mayıs&apos;ta başlayan Hızır günleri (yaz yarısı) ve 8 Kasım&apos;da
        başlayan <Link href={ozelGunPath("kasim-gunleri")}>Kasım günleri</Link>{" "}
        (kış yarısı). Günler bu başlangıçlardan sayılır: &quot;Kasım&apos;ın
        50&apos;si&quot; gibi.
      </p>
      <p>
        Kış kendi içinde ikiye ayrılır: 22 Aralık&apos;ta başlayan 40 günlük{" "}
        <Link href={ozelGunPath("erbain")}>Erbain</Link> ve 31 Ocak&apos;ta
        başlayan 50 günlük <Link href={ozelGunPath("hamsin")}>Hamsin</Link>.
        Hamsin içinde <Link href={ozelGunPath("cemre")}>cemreler</Link> havaya,
        suya ve toprağa düşer; Mart&apos;ın ortasında da{" "}
        <Link href={ozelGunPath("kocakari-soguklari")}>Kocakarı soğukları</Link>{" "}
        yaşanır.
      </p>
      <p>
        Fırtına takvimi ise denizcilerin gözlemlerine dayanır ve Deniz
        Kuvvetleri&apos;nin seyir ajandasında da yer alır. Kaynaklar arasında
        1-3 günlük farklar vardır; tabloda yalnızca adı kaynaklarda tutarlı olan
        fırtınalar yer alır. Deniz ve hava planlaması için güncel meteoroloji
        tahminlerini esas alın.
      </p>
    </TimeToolPage>
  );
}
