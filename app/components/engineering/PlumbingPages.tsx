// Tesisat sayfaları. Sayılar app/converter/plumbing/* modüllerinden derleme anında hesaplanır.
import type { ReactNode } from "react";
import Link from "@/app/components/SiteLink";
import { formatTr } from "../../converter/metal/metalWeight";
import { DRAIN_PIPES, drainCapacity } from "../../converter/plumbing/drainage";
import { dhwFlowLpm, dhwPowerKw, radiatorFactor, roomHeatLoss, sectionsNeeded } from "../../converter/plumbing/heating";
import { dipChart, filledVolume, LIQUIDS, tankVolume, type TankShape } from "../../converter/plumbing/tank";
import DataTable from "../metal/DataTable";
import { BoilerTool, DrainTool, RadiatorTool, TankTool } from "../plumbing/PlumbingTools";
import ToolArticlePage, { toolArticleMetadata, type ToolArticle } from "./ToolArticlePage";

export type PlumbingKind = "tank" | "radiator" | "boiler" | "drain";

export const PLUMBING_PATHS: Record<PlumbingKind, string> = {
  tank: "/tank-hacmi-hesaplama",
  radiator: "/petek-dilim-hesaplama",
  boiler: "/kombi-kac-kw-hesaplama",
  drain: "/pis-su-borusu-egimi-hesaplama",
};

const f = formatTr;

function tankArticle(): ToolArticle {
  const ex: TankShape = { kind: "horizontal", D: 1, L: 2, heads: "flat" };
  const total = tankVolume(ex) * 1000;
  const quarter = filledVolume(ex, 0.25) * 1000;
  const chart = dipChart(ex, 0.1);
  const diesel = LIQUIDS.find((x) => x.id === "motorin")!.rho;
  const gasoline = LIQUIDS.find((x) => x.id === "benzin")!.rho;
  // 1000 litrelik yatay tankın boyu, 100 cm çapta
  const len1000 = 1 / (Math.PI * 0.25);
  return {
    path: PLUMBING_PATHS.tank,
    metaTitle: "Tank Hacmi Hesaplama: Litre ve Doluluk",
    description: `Yatay ve dikey silindir, yuvarlak başlı ve dikdörtgen tankın litre hacmi, seviyeye göre doluluk ve ölçü çubuğu tablosu. Ø100 × 200 cm yatay tank ${f(total, 0)} L; 25 cm seviyede ${f(quarter, 0)} L.`,
    h1: "Tank Hacmi ve Doluluk Hesaplama",
    intro:
      "Tankın şeklini ve iç ölçülerini girin; toplam hacmi, ölçtüğünüz sıvı seviyesine göre içindeki litreyi ve ağırlığı görün. Litreden seviyeye ters hesap yapabilir, ölçü çubuğu (tank cetveli) tablosu çıkarabilirsiniz.",
    sections: [
      {
        id: "yatay",
        title: "Yatay tankta seviye ile litre neden orantılı değil?",
        body: (
          <>
            <p>
              Dikey silindir ve dikdörtgen depolarda her santimetre seviye aynı hacme karşılık gelir. Yatay silindir tankta ise tabana ve tepeye yakın kısımlar dar, orta kısım geniştir. Bu yüzden çeyrek seviyedeki
              sıvı tankın dörtte biri değildir: Ø100 × 200 cm bir yatay tank {f(total, 0)} litredir ve 25 cm seviyede içinde {f(quarter, 0)} litre, yani toplamın yalnızca %{f((quarter / total) * 100, 1)}&apos;i
              bulunur. Yarı seviyede tam yarısı ({f(total / 2, 0)} L) olur.
            </p>
            <p>
              Hesapta tankın kesiti bir daire kesimi olarak alınır: dolu alan = r²·arccos((r − h)/r) − (r − h)·√(2rh − h²), hacim = alan × boy. Başları yuvarlak (yarım küre) tanklarda iki başın hacmi bir
              küre kapağı olarak eklenir. Bombeli ya da torisferik başlı tanklarda üreticinin tablosu daha doğrudur.
            </p>
            <DataTable
              caption="Ø100 × 200 cm düz başlı yatay tankın ölçü çubuğu tablosu"
              head={["Seviye (cm)", "Litre", "Doluluk"]}
              rows={chart.map((r) => [f(r.h * 100, 0), f(r.liters, 0), `%${f((r.liters / total) * 100, 1)}`])}
            />
          </>
        ),
      },
      {
        id: "olcme",
        title: "Tank ölçüsü nasıl alınır?",
        body: (
          <p>
            Hesaba iç ölçüler girilmelidir. Saç tanklarda dış çaptan iki et kalınlığını çıkarın; plastik tanklarda et kalınlığı daha fazla olduğu için fark büyüktür. Sıvı seviyesini dolum ağzından dik bir çubukla,
            tankın en alt noktasına değdirerek ölçün. Tank eğimliyse ölçümü ortadan alın. Örneğin 100 cm iç çaplı yatay bir tankın 1000 litre olması için boyu {f(len1000 * 100, 1)} cm olmalıdır.
          </p>
        ),
      },
      {
        id: "agirlik",
        title: "Litre, kilogram ve ton",
        body: (
          <p>
            Sıvının ağırlığı hacim × yoğunluktur. Motorinin yoğunluğu 15 °C&apos;de 820–845 kg/m³ aralığındadır (EN 590); hesapta ortalama {f(diesel, 1)} kg/m³ alınır, buna göre 1 ton motorin yaklaşık{" "}
            {f(1e6 / diesel, 0)} litredir. Benzin 720–775 kg/m³ (EN 228) aralığındadır, 1 ton benzin yaklaşık {f(1e6 / gasoline, 0)} litre eder. Sıvıların yoğunluğu sıcaklıkla değiştiği için yazın aynı
            kütle biraz daha fazla hacim kaplar. Su için sıcaklığa göre yoğunluğu <Link href="/su-ozellikleri-tablosu">su özellikleri tablosunda</Link> bulabilirsiniz.
          </p>
        ),
      },
    ],
    faq: [
      { question: "Yatay tank litre nasıl hesaplanır?", answer: `Tam hacim π × r² × boydur. Kısmi dolulukta seviyeye karşılık gelen daire kesimi alanı boy ile çarpılır. Ø100 × 200 cm tank ${f(total, 0)} litredir.` },
      { question: "1000 litrelik tankın ölçüleri ne olur?", answer: `Dikey silindirde 100 cm çap için 127,3 cm yükseklik; yatay silindirde 100 cm çap için ${f(len1000 * 100, 1)} cm boy; dikdörtgen depoda 100 × 100 × 100 cm.` },
      { question: "1 ton mazot kaç litre?", answer: `Motorinin yoğunluğu 820–845 kg/m³ olduğu için 1 ton yaklaşık 1183–1220 litredir; ortalama yoğunlukla ${f(1e6 / diesel, 0)} litre.` },
      { question: "Tank cetveli nedir?", answer: "Ölçü çubuğuyla okunan seviyenin kaç litreye karşılık geldiğini gösteren tablodur. Araçtaki 'Ölçü çubuğu tablosu' bölümünde istediğiniz aralıkla çıkarabilirsiniz." },
    ],
    sources:
      "Hacimler geometrik formüllerle (daire kesimi ve küre kapağı) hesaplanır. Yoğunluklar: su IAPWS-95 (20 °C), motorin EN 590 ve benzin EN 228 standartlarının 15 °C yoğunluk aralığı.",
  };
}


/* ---------------- Petek (radyatör) ---------------- */

const REGIMES: Array<[number, number, string]> = [
  [90, 70, "Eski tip kazan"],
  [80, 60, "Klasik kombi"],
  [75, 65, "EN 442 anma koşulu"],
  [70, 55, "Kombi, orta ayar"],
  [60, 50, "Yoğuşmalı kombi"],
  [55, 45, "Yoğuşmalı kombi, düşük ayar"],
  [50, 40, "Düşük sıcaklık"],
  [45, 35, "Isı pompası"],
];

function radiatorArticle(): ToolArticle {
  const ex = roomHeatLoss({ wallArea: 4 * 2.7, wallU: 0.6, windowArea: 2, windowU: 2.8, volume: 16 * 2.7, airChange: 0.5, tIn: 20, tOut: -5 });
  const f7055 = radiatorFactor(70, 55, 20)!.factor;
  const f5545 = radiatorFactor(55, 45, 20)!.factor;
  const n7055 = sectionsNeeded(ex.total, 150, f7055);
  const n5545 = sectionsNeeded(ex.total, 150, f5545);
  return {
    path: PLUMBING_PATHS.radiator,
    metaTitle: "Petek Dilim Hesabı: Radyatör Kaç Watt?",
    description: `Odanın ısı kaybından gereken petek dilimi ve panel radyatör boyu; su sıcaklığına göre EN 442 düzeltmesi. 55/45 °C'de petek katalog gücünün yalnızca %${f(f5545 * 100, 0)}'ini verir.`,
    h1: "Petek (Radyatör) Dilim ve Boy Hesabı",
    intro:
      "Odanın ölçülerini, duvar ve pencere U değerlerini girin; ısı kaybını ve bunu karşılayacak dilim sayısını ya da panel radyatör boyunu bulun. Kombinin gidiş-dönüş suyu sıcaklığına göre peteğin gerçek gücü EN 442 yöntemiyle düzeltilir.",
    sections: [
      {
        id: "kayip",
        title: "Odanın ısı kaybı nasıl hesaplanır?",
        body: (
          <>
            <p>
              Bir odanın ısı ihtiyacı, en soğuk günde dışarı kaybettiği ısıdır. İki kısımdan oluşur: duvar, pencere ve tavan gibi yüzeylerden iletimle kayıp (U × alan × iç-dış sıcaklık farkı) ve içeri giren
              soğuk havanın ısıtılması (0,34 × saatlik hava değişimi × oda hacmi × sıcaklık farkı). 0,34 Wh/(m³·K) havanın hacimsel ısı kapasitesidir.
            </p>
            <p>
              Örnek: 16 m², 2,7 m tavanlı, 4 m dış duvarlı ve 2 m² pencereli bir oda; duvar U = 0,6, pencere U = 2,8 W/m²K, saatte 0,5 hava değişimi, içeride 20 °C, dışarıda −5 °C. Duvar kaybı {f(ex.wall, 0)} W,
              pencere {f(ex.window, 0)} W, havalandırma {f(ex.ventilation, 0)} W; toplam <strong>{f(ex.total, 0)} W</strong>. Duvarınızın U değerini katmanlarına göre{" "}
              <Link href="/u-degeri-hesaplama">U değeri hesaplama</Link> aracıyla bulabilirsiniz.
            </p>
          </>
        ),
      },
      {
        id: "sicaklik",
        title: "Su sıcaklığı peteğin gücünü nasıl değiştirir?",
        body: (
          <>
            <p>
              Radyatör kataloglarındaki watt değeri TS EN 442&apos;ye göre 75 °C gidiş, 65 °C dönüş ve 20 °C oda sıcaklığında ölçülür (&quot;ΔT50&quot;). Su daha soğuk dolaşınca petek daha az ısı verir. Gerçek güç
              katalog gücü × (ΔT / 49,83)^n ile bulunur; ΔT radyatör ile oda arasındaki logaritmik ortalama sıcaklık farkı, n radyatör üssüdür (katalogda yoksa 1,3 alınır).
            </p>
            <DataTable
              caption="20 °C odada katalog gücünün gerçekleşen oranı (n = 1,3)"
              head={["Gidiş / dönüş (°C)", "ΔT (K)", "Çarpan", "1000 W'lık petek verir", "Kullanım"]}
              rows={REGIMES.map(([a, b, use]) => {
                const r = radiatorFactor(a, b, 20)!;
                return [`${a} / ${b}`, f(r.dT, 1), f(r.factor, 3), `${f(1000 * r.factor, 0)} W`, use];
              })}
            />
            <p>
              Bu yüzden yoğuşmalı kombiye geçildiğinde ya da kombi düşük sıcaklığa ayarlandığında eski petekler yetersiz kalabilir. Yukarıdaki örnek oda için dilimi 150 W (ΔT50) olan peteklerden 70/55 °C&apos;de{" "}
              {n7055}, 55/45 °C&apos;de {n5545} dilim gerekir. EN 442 yönteminin gerçek ölçümlerden %10 civarında sapabildiği bilinir; sınırda kalan hesaplarda bir dilim fazla seçmek yaygındır.
            </p>
          </>
        ),
      },
      {
        id: "dilim-panel",
        title: "Dilimli petek mi, panel radyatör mü?",
        body: (
          <p>
            Dilimli (alüminyum ya da döküm) peteklerde güç dilim başına, panel radyatörlerde metre başına verilir. Panel radyatörler tip koduyla anılır: PKKP gibi kodlarda P panel, K konvektör kanadıdır; kanat ve
            panel sayısı arttıkça aynı boyda güç artar. Her iki türde de doğru değer, aldığınız modelin EN 442 kataloğundaki ΔT50 gücüdür; araçta bu değeri girin.
          </p>
        ),
      },
    ],
    faq: [
      { question: "Bir odaya kaç dilim petek gerekir?", answer: `Odanın ısı kaybı, dilimin katalog gücü ve su sıcaklığına bağlıdır. Sayfadaki örnek odada (${f(ex.total, 0)} W) dilimi 150 W olan petekten 70/55 °C'de ${n7055} dilim gerekir.` },
      { question: "Petek kaç watt?", answer: "Petek gücü modele göre değişir ve katalogda EN 442 koşulunda (75/65/20 °C, ΔT50) verilir. Kombi daha düşük sıcaklıkta çalışıyorsa gerçek güç bu değerin altında kalır." },
      { question: "Yoğuşmalı kombide petekler yeter mi?", answer: `55/45 °C'de petekler katalog gücünün yaklaşık %${f(f5545 * 100, 0)}'ini verir. Eski hesapla seçilmiş petekler soğuk günlerde yetersiz kalabilir; o günlerde gidiş sıcaklığını yükseltmek gerekir.` },
      { question: "Dış tasarım sıcaklığı ne alınmalı?", answer: "İlinizin kışın en soğuk dönemine göre seçilen sıcaklıktır; tesisat projelerinde TS 825 ve TS 2164'teki il değerleri kullanılır." },
    ],
    sources: "Isı kaybı EN 12831'in basitleştirilmiş yöntemiyle (iletim ve havalandırma), radyatör gücünün sıcaklık düzeltmesi TS EN 442-2 yöntemiyle (logaritmik sıcaklık farkı, anma 49,83 K) hesaplanır.",
  };
}

/* ---------------- Kombi ---------------- */

function boilerArticle(): ToolArticle {
  const powers = [18, 20, 24, 28, 30, 35];
  const flows = [6, 8, 10, 12, 14];
  return {
    path: PLUMBING_PATHS.boiler,
    metaTitle: "Kombi Kaç kW Olmalı? Sıcak Su ve Isıtma",
    description: `Evin ısı kaybı ve istenen sıcak su debisinden kombi gücü; kombinin dakikada kaç litre sıcak su verdiği. 24 kW kombi 25 °C artışla ${f(dhwFlowLpm(24, 25), 1)} L/dk sıcak su verir.`,
    h1: "Kombi Kaç kW Olmalı?",
    intro:
      "Evinizin ısı kaybını ve aynı anda istediğiniz sıcak su miktarını girin; kombinin ısıtma ve sıcak su için ne kadar güç gerektirdiğini görün. Elinizdeki kombinin dakikada kaç litre sıcak su verebileceğini de hesaplayabilirsiniz.",
    sections: [
      {
        id: "iki-ihtiyac",
        title: "Kombi gücünü ne belirler?",
        body: (
          <>
            <p>
              Kombi iki iş yapar: kaloriferi ısıtır ve musluktan anlık sıcak su verir. Isıtma için gereken güç, evin en soğuk günde kaybettiği ısıdır. Sıcak su için gereken güç ise akan suyu anında ısıtmaya
              yetmelidir: güç (kW) = debi (L/dk) ÷ 60 × 4,186 × sıcaklık artışı. Dakikada 10 litre suyu 10 °C&apos;den 40 °C&apos;ye çıkarmak için {f(dhwPowerKw(10, 30), 1)} kW gerekir.
            </p>
            <p>
              Kombi her iki ihtiyacın büyüğüne göre seçilir. Isı kaybı hesabınız sıcak su gücünün altında kalıyorsa kombi gücünü sıcak su belirler. Evin ısı kaybını oda oda{" "}
              <Link href={PLUMBING_PATHS.radiator}>petek hesabı</Link> sayfasında ya da duvarlar için <Link href="/u-degeri-hesaplama">U değeri</Link> aracında bulabilirsiniz.
            </p>
          </>
        ),
      },
      {
        id: "debi",
        title: "Kombi dakikada kaç litre sıcak su verir?",
        body: (
          <>
            <p>
              Kombi kataloglarında sıcak su kapasitesi genellikle 25 °C ya da 30 °C sıcaklık artışı için verilir. Kışın şebeke suyu soğuk olduğundan aynı kombi daha az sıcak su verir. Tablo, kombinin nominal
              gücünün tamamen suya aktarıldığı varsayımıyla hesaplanmıştır.
            </p>
            <DataTable
              caption="Kombi gücüne göre sıcak su debisi (L/dk)"
              head={["Kombi gücü", "ΔT 25 K", "ΔT 30 K", "ΔT 35 K"]}
              rows={powers.map((p) => [`${p} kW`, f(dhwFlowLpm(p, 25), 1), f(dhwFlowLpm(p, 30), 1), f(dhwFlowLpm(p, 35), 1)])}
            />
            <DataTable
              caption="İstenen sıcak su debisi için gereken güç (kW)"
              head={["Debi", "ΔT 25 K", "ΔT 30 K", "ΔT 35 K"]}
              rows={flows.map((q) => [`${q} L/dk`, f(dhwPowerKw(q, 25), 1), f(dhwPowerKw(q, 30), 1), f(dhwPowerKw(q, 35), 1)])}
            />
          </>
        ),
      },
    ],
    faq: [
      { question: "24 kW kombi dakikada kaç litre sıcak su verir?", answer: `Suyu 25 °C ısıtırken yaklaşık ${f(dhwFlowLpm(24, 25), 1)} L/dk, 30 °C ısıtırken ${f(dhwFlowLpm(24, 30), 1)} L/dk.` },
      { question: "Kombi kaç kW olmalı?", answer: "Evin en soğuk gündeki ısı kaybı ile aynı anda istenen sıcak su gücünün büyüğü kadar. Sıcak su gücü, debi (L/dk) ÷ 60 × 4,186 × sıcaklık artışı formülüyle bulunur." },
      { question: "Kışın neden duş suyu daha az sıcak gelir?", answer: "Şebeke suyu kışın daha soğuktur; kombi aynı güçle suyu daha fazla ısıtmak zorunda kaldığı için aynı sıcaklıkta daha az su verebilir." },
      { question: "Büyük kombi almak zarar mı?", answer: "İhtiyacın çok üstündeki kombi ısıtmada sık açılıp kapanabilir. Modern kombiler gücünü belli bir aralıkta ayarlar; alt sınırının evin ihtiyacına uygun olup olmadığına bakmak gerekir." },
    ],
    sources: "Sıcak su gücü suyun özgül ısısı (4,186 kJ/(kg·K)) ve 1 L ≈ 1 kg varsayımıyla hesaplanır. Isıtma ihtiyacı EN 12831'in basitleştirilmiş yöntemiyle bulunur.",
  };
}

/* ---------------- Pis su borusu ---------------- */

function drainArticle(): ToolArticle {
  const slopes = [0.5, 1, 1.5, 2, 3, 5];
  const di = (p: (typeof DRAIN_PIPES)[number]) => (p.od - 2 * p.wall) / 1000;
  const p110 = DRAIN_PIPES.find((p) => p.id === "110")!;
  const c1 = drainCapacity(di(p110), 0.01)!;
  const c2 = drainCapacity(di(p110), 0.02)!;
  return {
    path: PLUMBING_PATHS.drain,
    metaTitle: "Pis Su Borusu Eğimi ve Kapasitesi",
    description: `Atık su borusunun eğime göre taşıma kapasitesi ve akış hızı; istenen debi için gereken eğim. Ø110 PVC boru yarı doluyken %1 eğimde ${f(c1.Q * 1000, 1)} L/s, %2 eğimde ${f(c2.Q * 1000, 1)} L/s taşır.`,
    h1: "Pis Su Borusu Eğimi ve Kapasitesi",
    intro:
      "Boru çapını, et kalınlığını ve eğimi girin; yerçekimiyle akan atık su borusunun yarı ya da %70 doluyken taşıyabileceği debiyi ve akış hızını görün. Belirli bir debi için gereken en az eğimi de hesaplayabilirsiniz.",
    sections: [
      {
        id: "egim",
        title: "Eğim ne demek, nasıl ölçülür?",
        body: (
          <p>
            Eğim, borunun her metrede ne kadar alçaldığıdır: %1 eğim metrede 1 cm, %2 eğim metrede 2 cm kot farkı demektir. 5 metrelik bir hatta %2 eğim için başla son arasında 10 cm fark olmalıdır. Eğimi su
            terazisinin altına bilinen kalınlıkta bir takoz koyarak ya da lazer nivoyla kontrol edebilirsiniz. Bina içi atık su tesisatı TS EN 12056-2 ile tasarlanır; boru üreticilerinin bu standarda
            dayanan teknik dokümanlarında havalandırmasız bağlantı boruları için en az %1, havalandırmalı bağlantı boruları için en az %0,5 eğim verilir. Projeniz ya da yerel yönetmelik daha büyük eğim
            istiyorsa ona uyun.
          </p>
        ),
      },
      {
        id: "kapasite",
        title: "Eğime göre boru kapasitesi",
        body: (
          <>
            <p>
              Atık su boruları dolu akmaz; havanın geçebilmesi için genellikle yarı (h/d = 0,5) ya da en çok %70 dolu çalışacak şekilde boyutlandırılır. Kapasite Prandtl-Colebrook formülüyle, pürüzlülük kb = 1
              mm alınarak hesaplanır. Tablo yarı dolu PVC borular içindir; et kalınlığı örnektir.
            </p>
            <DataTable
              caption="Yarı dolu (h/d = 0,5) PVC atık su borusunun kapasitesi (L/s)"
              head={["Boru", "İç çap (mm)", ...slopes.map((s) => `%${f(s, 1)}`)]}
              rows={DRAIN_PIPES.map((p) => [p.label, f(di(p) * 1000, 1), ...slopes.map((s) => f(drainCapacity(di(p), s / 100)!.Q * 1000, 2))])}
            />
            <p>
              Yöntem, EN 12056&apos;ya dayanan üretici tablolarıyla karşılaştırıldı: 98 mm iç çaplı boru, %1 eğim ve %70 dolulukta tablo yaklaşık 4,2 L/s ve 0,8 m/s verirken bu hesap{" "}
              {f(drainCapacity(0.098, 0.01, 0.7)!.Q * 1000, 1)} L/s ve {f(drainCapacity(0.098, 0.01, 0.7)!.v, 2)} m/s bulur.
            </p>
          </>
        ),
      },
      {
        id: "debi",
        title: "Bir evden ne kadar atık su gelir?",
        body: (
          <p>
            Atık su debisi aynı anda kullanılan armatürlere bağlıdır ve TS EN 12056-2&apos;de armatür birimleri (DU) ile hesaplanır; her armatürün bir debi değeri vardır ve aynı anda kullanım olasılığı bir katsayıyla
            hesaba katılır. Türkiye&apos;de klozetin bağlandığı hatlarda uygulamada 100&apos;lük (Ø110) boru kullanılır. Hesap sonucunda bulduğunuz debiyi araca girerek gereken eğimi kontrol edebilirsiniz.
          </p>
        ),
      },
    ],
    faq: [
      { question: "Pis su borusu eğimi kaç olmalı?", answer: "Bina içi atık su tesisatı TS EN 12056-2'ye göre tasarlanır. Üretici teknik dokümanları havalandırmasız bağlantı boruları için en az %1, havalandırmalı bağlantı boruları için en az %0,5 eğim verir; projeniz daha fazlasını isteyebilir." },
      { question: "%2 eğim ne demek?", answer: "Borunun her metrede 2 cm alçalması demektir; 5 metrelik hatta toplam 10 cm kot farkı." },
      { question: "100'lük pis su borusu kaç litre taşır?", answer: `Ø110 PVC boru yarı doluyken %1 eğimde yaklaşık ${f(c1.Q * 1000, 1)} L/s, %2 eğimde ${f(c2.Q * 1000, 1)} L/s taşır.` },
      { question: "Eğim artınca boru daha çok taşır mı?", answer: "Evet; hız ve kapasite eğimin yaklaşık kareköküyle artar. Eğimi iki katına çıkarmak kapasiteyi yaklaşık %40 artırır." },
    ],
    sources:
      "Kapasiteler Prandtl-Colebrook formülüyle (kb = 1 mm, 10 °C su) kısmi dolu dairesel kesit için hesaplanır. En az eğim değerleri TS EN 12056-2'ye dayanan boru üreticisi dokümanlarından alınmıştır.",
  };
}

const ARTICLES: Record<PlumbingKind, () => ToolArticle> = { tank: tankArticle, radiator: radiatorArticle, boiler: boilerArticle, drain: drainArticle };
const TOOLS: Record<PlumbingKind, () => ReactNode> = { tank: () => <TankTool />, radiator: () => <RadiatorTool />, boiler: () => <BoilerTool />, drain: () => <DrainTool /> };

export const plumbingMetadata = (kind: PlumbingKind) => toolArticleMetadata(ARTICLES[kind]());

export default function PlumbingPage({ kind }: { kind: PlumbingKind }) {
  return <ToolArticlePage article={ARTICLES[kind]()} tool={TOOLS[kind]()} />;
}
