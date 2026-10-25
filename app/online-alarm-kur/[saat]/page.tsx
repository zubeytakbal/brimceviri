import type { Metadata } from "next";
import { saatSayfasiKalkti } from "../../components/saat/kaldirilanSaatSayfalari";
import { appManifestPath, findInstallableApp } from "../../converter/time/installableApps";
import Link from "@/app/components/SiteLink";
import { notFound } from "next/navigation";
import AlarmClock from "../../components/time/AlarmClock";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { alarmPresetAlternates, alarmPresetSlug, alarmPresetTimes, trTimeLocative } from "../../i18n/timeToolPaths";
import { sunTimes } from "../../converter/time/solar";
import { buildSiteUrl } from "../../siteConfig";

export const dynamicParams = false;

export function generateStaticParams() {
  return alarmPresetTimes
    .map((time) => ({ saat: alarmPresetSlug.tr(time) }))
    .filter((p) => !saatSayfasiKalkti(`/online-alarm-kur/${p.saat}`));
}

function findTime(slug: string) {
  return alarmPresetTimes.find((time) => alarmPresetSlug.tr(time) === slug) ?? null;
}

function addMinutes(time: string, delta: number) {
  const [h, m] = time.split(":").map(Number);
  const total = (((h * 60 + m + delta) % 1440) + 1440) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const saatFmt = new Intl.DateTimeFormat("tr-TR", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: "Europe/Istanbul" });
const dakika = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

/** Her ayın 15'inde il merkezinde gün doğumu (Türkiye saati, UTC+3). */
function gunDogumlari(lat: number, lon: number) {
  return AYLAR.map((_, i) => {
    const g = sunTimes(2026, i + 1, 15, lat, lon);
    return g.kind === "normal" ? saatFmt.format(g.sunrise) : "";
  });
}
const ISTANBUL = gunDogumlari(41.01, 28.98);
const ANKARA = gunDogumlari(39.93, 32.86);
const EDIRNE = gunDogumlari(41.68, 26.56);

/** Yaş gruplarına göre önerilen uyku süresi (ABD Ulusal Uyku Vakfı, 2015). */
const UYKU_ONERILERI = [
  { grup: "Okul çağı (6–13 yaş)", min: 9, max: 11 },
  { grup: "Ergen (14–17 yaş)", min: 8, max: 10 },
  { grup: "Yetişkin (18–64 yaş)", min: 7, max: 9 },
  { grup: "65 yaş ve üstü", min: 7, max: 8 },
];

/** Ardışık ay adlarından "Nisan–Eylül" gibi aralık metni (yıl sonunu sararak). */
function ayAraligi(aylar: boolean[]) {
  if (aylar.every(Boolean)) return "yıl boyunca";
  const bas = aylar.findIndex((v, i) => v && !aylar[(i + 11) % 12]);
  let son = bas;
  while (aylar[(son + 1) % 12]) son = (son + 1) % 12;
  return bas === son ? AYLAR[bas] : `${AYLAR[bas]}–${AYLAR[son]}`;
}

export async function generateMetadata({ params }: { params: Promise<{ saat: string }> }): Promise<Metadata> {
  const time = findTime((await params).saat);
  if (!time) return {};
  const path = `/online-alarm-kur/${alarmPresetSlug.tr(time)}`;
  const title = `Saat ${time} Alarm Kur: Tek Tıkla Çalar Saat`;
  const description = `Saat ${time} için alarm hazır: tek tıkla kur, sesi seç, ertele. Saat ${trTimeLocative(time)} kalkmak için ideal yatış saatleri de bu sayfada.`;
  return {
    title,
    description,
    manifest: appManifestPath("alarm"),
    appleWebApp: { capable: true, title: findInstallableApp("alarm")!.shortName },
    alternates: { canonical: path, ...alarmPresetAlternates(time) },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
  };
}

export default async function AlarmPresetPage({ params }: { params: Promise<{ saat: string }> }) {
  const time = findTime((await params).saat);
  if (!time) notFound();
  const path = `/online-alarm-kur/${alarmPresetSlug.tr(time)}`;
  const bedTimes = [6, 5, 4].map((cycles) => ({ cycles, bed: addMinutes(time, -15 - cycles * 90) }));
  const alarmDk = dakika(time);
  const istAydinlik = ISTANBUL.map((s) => dakika(s) <= alarmDk);
  const ankAydinlik = ANKARA.map((s) => dakika(s) <= alarmDk);
  const herYerAydinlik = EDIRNE.every((s) => dakika(s) <= alarmDk);
  const enGecAy = EDIRNE.indexOf([...EDIRNE].sort().at(-1)!);
  const isikMetni = herYerAydinlik
    ? `Saat ${trTimeLocative(time)} Türkiye'nin her yerinde yıl boyunca güneş doğmuş olur; güneşin en geç doğduğu illerden Edirne'de bile ${AYLAR[enGecAy]} ortasında gün doğumu saat ${EDIRNE[enGecAy]} civarındadır.`
    : istAydinlik.some(Boolean)
      ? `Saat ${trTimeLocative(time)} İstanbul'da güneş ${ayAraligi(istAydinlik)} arasında doğmuş olur; diğer aylarda alarm çaldığında hava henüz karanlıktır.${
          ankAydinlik.some(Boolean) ? ` Ankara'da bu dönem ${ayAraligi(ankAydinlik)} arasıdır.` : ""
        }`
      : `Saat ${trTimeLocative(time)} İstanbul ve Ankara'da yılın her ayında güneş henüz doğmamıştır; alarm karanlıkta çalar.`;

  const faqItems: FaqItem[] = [
    {
      question: `Saat ${trTimeLocative(time)} kalkmak için kaçta yatmalıyım?`,
      answer: `90 dakikalık uyku döngüleri ve 15 dakikalık uykuya dalma süresiyle: 6 döngü için ${bedTimes[0].bed}, 5 döngü için ${bedTimes[1].bed}, 4 döngü için ${bedTimes[2].bed}.`,
    },
    { question: `Saat ${trTimeLocative(time)} hava aydınlık mı?`, answer: isikMetni },
    {
      question: `Saat ${time} alarmı sekme kapalıyken çalar mı?`,
      answer: "Hayır, alarm sekme açıkken çalışır. Sekmeyi arka planda bırakabilir, \"Ekranı açık tut\" ile cihazın uykuya geçmesini önleyebilirsiniz.",
    },
    {
      question: "Alarm saatini değiştirebilir miyim?",
      answer: `Evet. Saat ${time} yalnızca hazır değerdir; saat ve dakika seçicilerinden istediğiniz saati ayarlayabilirsiniz.`,
    },
  ];

  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/online-alarm-kur", label: "Online Alarm" },
        { href: path, label: `${time} Alarm` },
      ]}
      crumbLabel="Sayfa yolu"
      install={{ name: "Online Alarm", lang: "tr" }}
      title={`Saat ${time} Alarm Kur`}
      intro={`Alarm saati ${time} olarak hazırlandı. "Alarmı ekle"ye bas, gerekirse sesi ve etiketi değiştir. Aşağıda ${trTimeLocative(time)} dinç kalkmak için önerilen yatış saatlerini de bulabilirsin.`}
      tool={<AlarmClock locale="tr" initialTime={time} />}
      related={{ title: "Diğer alarm saatleri", links: alarmPresetTimes.filter((t) => t !== time).map((t) => ({ href: `/online-alarm-kur/${alarmPresetSlug.tr(t)}`, label: `Saat ${t} alarm` })) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "yatis", label: `${trTimeLocative(time)} kalkmak için yatış saati` },
        { id: "yas", label: "Yaşa göre uyku süresi" },
        { id: "isik", label: `Saat ${trTimeLocative(time)} gün ışığı` },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="yatis">Saat {trTimeLocative(time)} kalkmak için kaçta yatmalı?</h2>
      <p>15 dakikalık uykuya dalma süresi dahil, 90 dakikalık döngülere göre:</p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Döngü</th>
              <th>Uyku süresi</th>
              <th>Yatış saati</th>
            </tr>
          </thead>
          <tbody>
            {bedTimes.map(({ cycles, bed }) => (
              <tr key={cycles}>
                <td>{cycles} döngü</td>
                <td>{(cycles * 1.5).toLocaleString("tr-TR")} saat</td>
                <td>
                  <strong>{bed}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Farklı bir saat için <Link href="/uyku-hesaplama">uyku hesaplama</Link> aracını kullanabilirsiniz.
      </p>

      <h2 id="yas">Yaşa göre uyku süresi ve yatış saati</h2>
      <p>ABD Ulusal Uyku Vakfı'nın (2015) önerdiği uyku sürelerine göre saat {trTimeLocative(time)} kalkmak için yatış saatleri:</p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Yaş grubu</th>
              <th>Önerilen uyku</th>
              <th>Yatış saati</th>
            </tr>
          </thead>
          <tbody>
            {UYKU_ONERILERI.map((u) => (
              <tr key={u.grup}>
                <td>{u.grup}</td>
                <td>
                  {u.min}–{u.max} saat
                </td>
                <td>
                  <strong>
                    {addMinutes(time, -u.max * 60)}–{addMinutes(time, -u.min * 60)}
                  </strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="isik">Saat {trTimeLocative(time)} hava aydınlık mı?</h2>
      <p>{isikMetni}</p>
      {herYerAydinlik ? null : (
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <thead>
              <tr>
                <th>Ay (15'i)</th>
                <th>İstanbul gün doğumu</th>
                <th>Ankara gün doğumu</th>
                <th>Saat {time}</th>
              </tr>
            </thead>
            <tbody>
              {AYLAR.map((ay, i) => (
                <tr key={ay}>
                  <td>{ay}</td>
                  <td>{ISTANBUL[i]}</td>
                  <td>{ANKARA[i]}</td>
                  <td>{istAydinlik[i] ? "Aydınlık" : "Karanlık"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p>
        Gün doğumu saatleri her ayın 15'i için Türkiye saatiyle (UTC+3) hesaplanmıştır. Diğer iller için{" "}
        <Link href="/gunes-dogusu-ve-batisi">güneşin doğuşu ve batışı</Link> sayfasına bakabilirsiniz.
      </p>
    </TimeToolPage>
  );
}
