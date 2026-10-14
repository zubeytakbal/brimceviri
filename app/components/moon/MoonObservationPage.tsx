import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { turkeyProvinces } from "../../converter/geo/turkeyProvinces";
import { buildSiteUrl } from "../../siteConfig";
import TimeToolPage from "../time/TimeToolPage";
import MoonIcon from "./MoonIcon";
import MoonObservationChart, { type ChartCity } from "./MoonObservationChart";

// 30 günlük ay gözlem çizelgesi (okul ödevi). Çizelge tarayıcıda hesaplanır; sayfa metni tarihten bağımsızdır.

export const OBSERVATION_PATH = "/ay-gozlem-cizelgesi";

const SYNODIC = 29.530589;
const tr1 = (v: number) => v.toLocaleString("tr-TR", { maximumFractionDigits: 1 });
/** Ay her gün Güneş'e göre 360/29,53 ≈ 12,2° doğuya kayar; bu da doğuşu ortalama ≈ 50 dakika geciktirir. */
const DAILY_SHIFT_DEG = 360 / SYNODIC;
const DAILY_DELAY_MIN = Math.round(1440 / (SYNODIC - 1));

const title = "Ay Gözlem Çizelgesi: 30 Günlük Ay Evreleri";
const description =
  "Seçtiğiniz günden başlayan 30 günlük ay gözlem çizelgesi: her akşam 21:00'de ayın şekli, evre adı, aydınlanma yüzdesi (ör. %63) ve 81 ilde ayın yönü. Boş çizelge ve yazdırma.";

export function observationMetadata(): Metadata {
  return {
    title,
    description,
    alternates: { canonical: OBSERVATION_PATH },
    openGraph: { title, description, url: buildSiteUrl(OBSERVATION_PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
  };
}

const cities: ChartCity[] = [...turkeyProvinces]
  .sort((a, b) => a.name.localeCompare(b.name, "tr"))
  .map((p) => ({ id: p.id, name: p.name, lat: p.lat, lon: p.lon }));

// Çizim rehberi: kuzey yarımkürede (Türkiye) akşam gözleminde aydınlık tarafın yönü.
const DRAWING: Array<{ fraction: number; name: string; draw: string }> = [
  { fraction: 0.12, name: "Büyüyen hilal", draw: "Sağ kenarda ince bir yay, kapanan parantez \")\" gibi." },
  { fraction: 0.25, name: "İlk dördün", draw: "Dairenin sağ yarısını boyayın; aradaki çizgi düzdür." },
  { fraction: 0.38, name: "Büyüyen şişkin ay", draw: "Sağ yarı ve sol yarının bir kısmı aydınlık; sınır çizgisi sola doğru şişkindir." },
  { fraction: 0.5, name: "Dolunay", draw: "Dairenin tamamı aydınlık." },
  { fraction: 0.62, name: "Küçülen şişkin ay", draw: "Sağ kenardan kararmaya başlar; sol taraf aydınlık kalır." },
  { fraction: 0.75, name: "Son dördün", draw: "Dairenin sol yarısını boyayın." },
  { fraction: 0.88, name: "Küçülen hilal", draw: "Sol kenarda ince bir yay, C harfi gibi. Akşam görülmez, sabaha karşı doğu ufkunda aranır." },
];

const faqItems: FaqItem[] = [
  {
    question: "Ay gözlem çizelgesi nasıl doldurulur?",
    answer:
      "Her gün aynı saatte ve aynı yerden aya bakın, gördüğünüz şekli o günün dairesine çizin: aydınlık kısmı boş bırakıp karanlık kısmı karalayabilir ya da tersini yapabilirsiniz. Tarih, saat ve ayın hangi yönde olduğunu (doğu, güney, batı) not edin. Bulutlu günlerde \"bulutlu\" yazıp geçin.",
  },
  {
    question: "Bulutlu olduğu ya da unuttuğum günler ne olacak?",
    answer:
      "Kaçırdığınız günün ay şeklini yukarıdaki çizelgede görebilirsiniz; başlangıç gününü seçtiğinizde 30 günün hepsi hesaplanır. Öğretmeniniz kendi gözleminizi istiyorsa bu günleri \"bulutlu, çizelgeden bakıldı\" diye işaretlemek en dürüstüdür.",
  },
  {
    question: "Ay neden bazı akşamlar hiç görünmüyor?",
    answer: `Ay her gün ortalama ${DAILY_DELAY_MIN} dakika geç doğar. Dolunaydan birkaç gün sonra Ay akşam 21:00'de henüz doğmamış olur; son dördünde gece yarısı civarı, küçülen hilalde sabaha karşı doğar. Yeni ay günlerinde Güneş'le birlikte doğup battığı için hiç görülmez; yeni aydan sonraki ilk birkaç akşam da ince hilal Güneş'ten kısa süre sonra batar ve 21:00'de çoktan batmış olur. Çizelgede bu günler \"ufkun altında\" diye gösterilir.`,
  },
  {
    question: "30 günde ay kaç kez dolunay olur?",
    answer: `Bir ay döngüsü ortalama ${tr1(SYNODIC)} gündür. 30 günlük bir gözlemde genellikle bir dolunay ve bir yeni ay görülür; başlangıç dolunaya çok yakınsa aynı çizelgeye iki dolunay da girebilir.`,
  },
  {
    question: "Gözleme hangi evrede başlamak en iyisi?",
    answer:
      "Yeni aydan bir iki gün sonra başlamak en kolayıdır: ilk akşamlar gün batımından sonra batıda ince bir hilal görülür, ay her akşam büyüyerek dolunaya ulaşır. Böylece akşam saatlerinde ayın en çok görüldüğü yarım döngüyü kesintisiz takip edersiniz.",
  },
];

export default function MoonObservationPage() {
  const now = new Date();
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/ay-evreleri", label: "Ay Evreleri" },
        { href: OBSERVATION_PATH, label: "Ay Gözlem Çizelgesi" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Ay Gözlem Çizelgesi (30 Günlük)"
      intro="Gözleme başladığınız günü seçin: 30 günün her biri için akşam ayın nasıl göründüğü, evre adı, aydınlanma yüzdesi ve ilinizde ayın gökyüzünde nerede olduğu hesaplanır. Ödev için boş çizelgeyi yazdırıp kendiniz de çizebilirsiniz."
      tool={<MoonObservationChart cities={cities} defaultCity="istanbul" initialNow={now.getTime()} />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/ay-evreleri", label: "Ay Evreleri (bugün, dün)" },
          { href: "/gunes-dogusu-ve-batisi", label: "Güneş Doğuşu ve Batışı" },
          { href: "/gokcisimleri-ozellikleri", label: "Gezegenler ve Uydular" },
          { href: "/en-uzun-gun-ve-en-kisa-gun", label: "En Uzun ve En Kısa Gün" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "nasil", label: "Ay gözlemi nasıl yapılır?" },
        { id: "cizim", label: "Ay evreleri nasıl çizilir?" },
        { id: "neden", label: "Ay neden her akşam farklı?" },
        { id: "sonuc", label: "Gözlemden ne öğrenilir?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="nasil">Ay gözlemi nasıl yapılır?</h2>
      <ol>
        <li>
          <strong>Saati sabitleyin.</strong> Her gün aynı saatte bakın; 20:00 ya da 21:00 çoğu okul ödevi için uygundur. Saati değiştirirseniz
          ayın yeri karşılaştırılamaz.
        </li>
        <li>
          <strong>Yeri sabitleyin.</strong> Hep aynı pencereden ya da balkondan bakın ve bir ağaç, bina ya da direği işaret olarak seçin.
          Ayın bu işarete göre her akşam doğuya kaydığını göreceksiniz.
        </li>
        <li>
          <strong>Yönü yazın.</strong> Çizelgedeki yön ve derece (ör. &quot;güneydoğu, 25°&quot;) ayın ufuktan ne kadar yüksekte olduğunu
          gösterir. Kolunuzu uzatıp yumruğunuzu ufka koyduğunuzda bir yumruk yaklaşık 10° eder.
        </li>
        <li>
          <strong>Şekli çizin, tarih ve saati not edin.</strong> Göremediğiniz günleri boş bırakmayın; &quot;bulutlu&quot; ya da &quot;ay doğmamıştı&quot;
          yazın. Bu da bir gözlem sonucudur.
        </li>
      </ol>
      <p>
        Gözlem saatinde ay ufkun altındaysa çizelge ayın o akşam kaçta battığını ya da gece kaçta doğacağını da verir. Daha ayrıntılı doğuş ve batış saatleri ile bugünün ve
        dünün ay görünümü için <Link href="/ay-evreleri">ay evreleri</Link> sayfasına bakabilirsiniz.
      </p>

      <h2 id="cizim">Ay evreleri nasıl çizilir?</h2>
      <p>
        Türkiye kuzey yarımkürededir; buradan bakınca ay <strong>sağ taraftan aydınlanmaya başlar</strong> ve yine sağ taraftan kararır. Çizerken
        aşağıdaki şekilleri örnek alabilirsiniz. Yeni ay görünmediği için çizelgede tamamen karanlık bir daire olarak gösterilir.
      </p>
      <ul className="moon-draw-list">
        {DRAWING.map((d) => (
          <li key={d.name}>
            <MoonIcon fraction={d.fraction} size={40} />
            <span>
              <strong>{d.name}:</strong> {d.draw}
            </span>
          </li>
        ))}
      </ul>

      <h2 id="neden">Ay neden her akşam farklı yerde ve farklı şekilde?</h2>
      <p>
        Ay, Dünya&apos;nın etrafında dönerken her gün Güneş&apos;e göre yaklaşık {tr1(DAILY_SHIFT_DEG)}° doğuya kayar. Bu yüzden aynı saatte
        baktığınızda bir önceki akşama göre doğuda, yani solda (güneye bakarken) bulunur ve her gün ortalama {DAILY_DELAY_MIN} dakika geç
        doğar. Güneş&apos;le arasındaki açı büyüdükçe Dünya&apos;dan gördüğümüz aydınlık kısım artar; açı 180° olduğunda dolunay, 0° olduğunda yeni
        ay olur.
      </p>
      <p>
        Bu kayma, akşam gözleminin neden yarım döngüde kesildiğini de açıklar: dolunaydan sonra ay her akşam biraz daha geç doğar ve birkaç
        gün içinde 21:00&apos;de artık ufkun altında kalır. Çizelgedeki &quot;ufkun altında&quot; satırları tam olarak bu günlerdir.
      </p>

      <h2 id="sonuc">Gözlemden ne öğrenilir?</h2>
      <p>
        30 günlük bir çizelge tamamlandığında şu sorular kendi verinizle cevaplanabilir: İki dolunay arası kaç gün sürdü? (Ortalama{" "}
        {tr1(SYNODIC)} gün.) Yeni aydan dolunaya kaç gün geçti? (Ortalama {tr1(SYNODIC / 2)} gün.) Ay hangi akşamlarda batıda, hangilerinde
        güneyde ya da doğudaydı? Hilal hangi tarafı aydınlıkken büyüyordu? Cevapları çizelgedeki hesaplanmış değerlerle karşılaştırmak,
        gözlemin ne kadar doğru yapıldığını gösterir.
      </p>
      <p>
        Evre anları Jean Meeus&apos;un algoritmalarıyla dakika düzeyinde, ayın gökyüzündeki konumu ise birkaç dakikalık doğrulukla hesaplanır.
        Yükseklikler düz bir ufuk içindir; dağlar ya da binalar alçaktaki ayı gizleyebilir.
      </p>
    </TimeToolPage>
  );
}
