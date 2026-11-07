// Güneş doğuşu/batışı ve gündönümü sayfaları. Bütün sayılar derleme anında solar.ts ile hesaplanır;
// sayfa metni tarihten bağımsızdır (gündönümü, ekinoks ve yıllık uç değerler), günlük saatler araçtadır.
import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { turkeyProvinces } from "../../converter/geo/turkeyProvinces";
import { durationLabel } from "../../converter/time/sunYear";
import { trLocative } from "../../converter/turkishSuffix";
import { buildSiteUrl } from "../../siteConfig";
import TimeToolPage from "../time/TimeToolPage";
import { directSunMinutes, noonElevation, perpendicularTilt, shadowLength } from "../../converter/time/sunGeometry";
import { formatTr } from "../../converter/metal/metalWeight";
import { ShadowTool } from "./ShadowTools";
import { type SunCity } from "./SunTools";

export const SUN_PATHS = { shadow: "/gunes-acisi-ve-golge-boyu-hesaplama" } as const;

/** Sayfadaki sabit tablolar derleme yılı için hesaplanır. */
const YEAR = new Date().getFullYear();
const collator = new Intl.Collator("tr");
const provinces = [...turkeyProvinces].sort((a, b) => collator.compare(a.name, b.name));
const cities: SunCity[] = provinces.map((p) => ({ id: p.id, name: p.name, lat: p.lat, lon: p.lon }));
const byId = (id: string) => turkeyProvinces.find((p) => p.id === id)!;

const meta = (path: string, title: string, description: string): Metadata => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
});

function Table({ caption, head, rows }: { caption: string; head: string[]; rows: Array<Array<React.ReactNode>> }) {
  return (
    <div className="holiday-table-wrap">
      <table className="holiday-table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            {head.map((h) => (
              <th scope="col" key={h}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (j === 0 ? <th scope="row" key={j}>{cell}</th> : <td key={j}>{cell}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ilLink = (p: { id: string; name: string }) => p.name;

/* ---------------- Güneş açısı ve gölge boyu ---------------- */

const fx = formatTr;
const dg = (v: number) => `${fx(v, 1)}°`;

function shadowData() {
  const rows = provinces.map((p) => {
    const jun = noonElevation(YEAR, 6, 21, p.lat, p.lon);
    const dec = noonElevation(YEAR, 12, 21, p.lat, p.lon);
    return { p, jun, dec, decShadow: shadowLength(1, dec)!, junShadow: shadowLength(1, jun)! };
  });
  const ank = byId("ankara");
  const ankDec = noonElevation(YEAR, 12, 21, ank.lat, ank.lon);
  const ankJun = noonElevation(YEAR, 6, 21, ank.lat, ank.lon);
  // Örnek: güneye bakan pencere, karşıda 15 m bina, pencere 3 m yükseklikte, 20 m mesafe.
  const above = 15 - 3;
  const need = (Math.atan(above / 20) * 180) / Math.PI;
  const months = Array.from({ length: 12 }, (_, i) => ({ m: i + 1, ...directSunMinutes(YEAR, i + 1, 21, ank.lat, ank.lon, 180, above, 20) }));
  const dark = months.filter((r) => r.minutes === 0).map((r) => r.m);
  const decSun = months[11];
  const tilts = Array.from({ length: 12 }, (_, i) => perpendicularTilt(noonElevation(YEAR, i + 1, 15, ank.lat, ank.lon)));
  const avgTilt = tilts.reduce((a, b) => a + b, 0) / 12;
  const south = rows.reduce((a, b) => (b.dec > a.dec ? b : a));
  const north = rows.reduce((a, b) => (b.dec < a.dec ? b : a));
  return { rows, ankDec, ankJun, need, months, dark, decSun, avgTilt, south, north };
}

export function shadowMetadata(): Metadata {
  const d = shadowData();
  return meta(
    SUN_PATHS.shadow,
    "Güneş Açısı ve Gölge Boyu Hesaplama",
    `Güneşin yüksekliği ve yönü, gölge boyu, gölgeden yükseklik ve evin kışın güneş alıp almadığı. Ankara'da 21 Aralık öğle güneşi ${dg(d.ankDec)}, 1 m çubuğun gölgesi ${fx(shadowLength(1, d.ankDec)!, 2)} m.`,
  );
}

export function ShadowPage() {
  const d = shadowData();
  const ex10 = shadowLength(10, d.ankDec)!;
  const darkNames = d.dark.map((m) => ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"][m - 1]);
  const faq: FaqItem[] = [
    {
      question: "Gölge boyu nasıl hesaplanır?",
      answer: `Gölge boyu = cismin boyu ÷ tan(güneş yüksekliği). Ankara'da 21 Aralık öğlesinde güneş ${dg(d.ankDec)} yükseklikte olduğu için 10 m'lik bir ağacın gölgesi yaklaşık ${fx(ex10, 1)} m olur.`,
    },
    {
      question: "Gölgesini ölçerek bir binanın yüksekliğini bulabilir miyim?",
      answer: "Evet. Boyu bilinen bir çubuğu dik tutun, çubuğun ve binanın gölgesini aynı anda ölçün: bina yüksekliği = bina gölgesi × çubuk boyu ÷ çubuk gölgesi. Saat ya da konum bilmeniz gerekmez.",
    },
    {
      question: "Kışın güneş evime girer mi?",
      answer: `Karşı binanın pencerenizden ne kadar yüksek olduğuna ve aradaki mesafeye bağlıdır. Ankara'da güneye bakan bir pencerenin önünde 20 m ötede, pencereden 12 m yüksek bir bina varsa güneşin binayı aşması için ${dg(d.need)} yükseklikte olması gerekir; 21 Aralık öğlesinde güneş ${dg(d.ankDec)} yüksekliktedir.`,
    },
    {
      question: "Güneş paneli kaç derece eğimle konmalı?",
      answer: `Panelin öğle güneşine dik bakması için eğim 90° eksi öğle güneş yüksekliğidir; Ankara'da bu açı yıl boyunca ortalama ${dg(d.avgTilt)} olur. Yıllık üretimi en yüksek yapan sabit açı bulutluluğa da bağlı olduğu için kurulumdan önce bir üretim hesaplayıcısına bakın.`,
    },
  ];
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: SUN_PATHS.shadow, label: "Güneş Açısı ve Gölge Boyu" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Güneş Açısı ve Gölge Boyu Hesaplama"
      intro=""
      tool={<ShadowTool cities={cities} />}
      related={{
        title: "İlgili araçlar",
        links: [
          { href: "/gunes-paneli-amortisman-hesaplama", label: "Güneş Paneli Amortismanı" },
          { href: "/kible-yonu-hesaplama", label: "Kıble Yönü" },
        ],
      }}
      tocTitle="Bu sayfada"
      tocItems={[
        { id: "formul", label: "Gölge boyu nasıl hesaplanır?" },
        { id: "iller", label: "81 ilde öğle güneşi ve gölge" },
        { id: "kis", label: "Evim kışın güneş alır mı?" },
        { id: "yukseklik", label: "Gölgeyle yükseklik ölçme" },
        { id: "panel", label: "Güneş paneli eğimi" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faq}
    >
      <h2 id="formul">Gölge boyu nasıl hesaplanır?</h2>
      <p>
        Güneş ışınları paralel geldiği için cisim, gölgesi ve ışın bir dik üçgen oluşturur. Güneşin ufuktan yüksekliği α ise gölge boyu = boy ÷ tan α olur. Güneş 45°&apos;deyken gölge boya eşittir; 30°&apos;de boyun
        yaklaşık 1,73 katı, 15°&apos;de 3,7 katıdır. Ankara&apos;da 21 Aralık öğlesinde güneş {dg(d.ankDec)} yüksekliktedir ve 10 m&apos;lik bir ağacın gölgesi {fx(ex10, 1)} m uzar; 21 Haziran öğlesinde güneş{" "}
        {dg(d.ankJun)}&apos;e çıkar ve aynı ağacın gölgesi {fx(shadowLength(10, d.ankJun)!, 1)} m&apos;ye kısalır.
      </p>
      <p>
        Gölge, güneşin tam ters yönüne düşer. Türkiye kuzey yarımkürede ve Yengeç dönencesinin kuzeyinde olduğu için öğle güneşi her zaman güneydedir; öğle gölgesi de her zaman kuzeyi gösterir. Bu yüzden öğle
        gölgesiyle kuzey yönü bulunabilir.
      </p>

      <h2 id="iller">81 ilde öğle güneşi ve gölge ({YEAR})</h2>
      <p>
        Güneye gidildikçe öğle güneşi yükselir: 21 Aralık&apos;ta öğle güneşi en yüksek {trLocative(d.south.p.name)} ({dg(d.south.dec)}), en alçak {trLocative(d.north.p.name)} ({dg(d.north.dec)}) olur. Tablodaki
        gölge boyları 1 m&apos;lik dik bir çubuk içindir; başka bir boy için çarpın.
      </p>
      <Table
        caption={`İl merkezlerinde öğle güneşinin yüksekliği ve 1 m çubuğun öğle gölgesi, ${YEAR}`}
        head={["İl", "21 Haziran öğle güneşi", "1 m gölge (Haziran)", "21 Aralık öğle güneşi", "1 m gölge (Aralık)"]}
        rows={d.rows.map((r) => [ilLink(r.p), dg(r.jun), `${fx(r.junShadow, 2)} m`, dg(r.dec), `${fx(r.decShadow, 2)} m`])}
      />

      <h2 id="kis">Evim kışın güneş alır mı?</h2>
      <p>
        Pencerenin güneş alması için güneşin karşıdaki binanın üst kenarını aşması gerekir. Karşı bina pencerenizden h metre yüksek ve d metre uzaktaysa gereken güneş yüksekliği atan(h ÷ d) olur. Güneş cepheye
        yandan geldiğinde ışın binaya daha uzun yoldan ulaştığı için bu açı küçülür; araç bunu da hesaba katar.
      </p>
      <p>
        Örnek: Ankara&apos;da güneye bakan bir pencere 3 m yükseklikte, karşısındaki 15 m&apos;lik bina 20 m uzakta olsun. Güneşin binayı aşması için {dg(d.need)} yükseklikte olması gerekir.{" "}
        {d.dark.length
          ? `Bu durumda pencere ${darkNames.join(", ")} aylarının 21'inde hiç doğrudan güneş almaz.`
          : `Bu durumda pencere 21 Aralık'ta günde ${durationLabel(d.decSun.minutes)} doğrudan güneş alır.`}{" "}
        Ev bakarken karşı binanın yüksekliğini ve mesafesini araçtaki &quot;Evim güneş alır mı?&quot; sekmesine girerek her ay için güneş alma süresini görebilirsiniz.
      </p>

      <h2 id="yukseklik">Gölgeyle yükseklik ölçme</h2>
      <p>
        Bir binanın ya da ağacın boyunu ölçmek için iki yol vardır. Birincisi güneş açısını kullanmaktır: gölgeyi ölçtüğünüz tarih ve saati araca girin, yükseklik = gölge × tan α hesaplanır. İkincisi tarih ve saat
        gerektirmez: boyu bilinen bir çubuğu dik tutup çubuğun ve cismin gölgesini aynı anda ölçersiniz. Benzer üçgenlerden yükseklik = cismin gölgesi × çubuk boyu ÷ çubuk gölgesi bulunur. Antik çağda Thales&apos;in
        piramidin yüksekliğini bu yolla ölçtüğü anlatılır.
      </p>

      <h2 id="panel">Güneş paneli eğimi</h2>
      <p>
        Güneye bakan bir panel, eğimi 90° eksi öğle güneş yüksekliği olduğunda öğle güneşine tam dik bakar. Ankara&apos;da bu açı haziranda {dg(perpendicularTilt(d.ankJun))}, aralıkta{" "}
        {dg(perpendicularTilt(d.ankDec))}, yıl ortalamasında {dg(d.avgTilt)} olur. Sabit panellerde yıllık üretimi en yükselten açı bulutluluk ve dağınık ışık nedeniyle bu geometrik değerden birkaç derece farklı
        olabilir. Yatırımın geri dönüşü için <Link href="/gunes-paneli-amortisman-hesaplama">güneş paneli amortisman hesaplama</Link> aracını kullanın.
      </p>
    </TimeToolPage>
  );
}
