// Metal ağırlık sayfaları: inşaat demiri, sac, boru ve kutu profil.
// Metinlerdeki bütün sayısal örnekler formülden üretilir.
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { pipeNominalSizeTable } from "../../converter/pipeNominalSize";
import {
  boxAreaRoundedMm2,
  boxAreaSharpMm2,
  boxOuterCornerRadius,
  circleAreaMm2,
  formatTr,
  isValidBox,
  isValidPipe,
  kgPerMeter,
  metalById,
  pipeKgPerMeter,
  pipeWaterKgPerMeter,
  plateKgPerM2,
  plateMassKg,
  REBAR_BAR_LENGTH_M,
  REBAR_DIAMETERS_MM,
  rebarKgPerMeter,
  rebarKgPerMeterRuleOfThumb,
  rebarMetersForMass,
  STEEL_DENSITY,
} from "../../converter/metal/metalWeight";
import { buildSiteUrl } from "../../siteConfig";
import TimeToolPage from "../time/TimeToolPage";
import { ENGINEERING_FLOWS } from "../../converter/engineeringFlows";
import EngineeringNextSteps from "../engineering/EngineeringNextSteps";
import DataTable from "./DataTable";
import MetalWeightTool, { type MetalWeightKind } from "./MetalWeightTool";

export const METAL_WEIGHT_PATHS: Record<MetalWeightKind, string> = {
  rebar: "/demir-agirlik-hesaplama",
  plate: "/sac-agirlik-hesaplama",
  pipe: "/boru-agirlik-hesaplama",
  box: "/kutu-profil-agirlik-hesaplama",
};

const LINK_LABELS: Record<MetalWeightKind, string> = {
  rebar: "İnşaat Demiri Ağırlık Hesaplama",
  plate: "Sac Ağırlık Hesaplama",
  pipe: "Boru Ağırlık Hesaplama",
  box: "Kutu Profil Ağırlık Hesaplama",
};

const f = formatTr;
const steel = STEEL_DENSITY;
const stainless = metalById("stainless-steel").density;
const aluminum = metalById("aluminum").density;

type Section = { id: string; title: string; body: ReactNode };

type PageContent = {
  metaTitle: string;
  description: string;
  h1: string;
  intro: string;
  sections: Section[];
  faq: FaqItem[];
  extraRelated: Array<{ href: string; label: string }>;
};

/* ---------------- Tablolar ---------------- */

function RebarTable() {
  return (
    <DataTable
      caption="İnşaat demiri teorik ağırlık tablosu (çelik yoğunluğu 7850 kg/m³)"
      head={["Çap", "Kesit alanı (mm²)", "Ağırlık (kg/m)", `${REBAR_BAR_LENGTH_M} m boy (kg)`, "1 ton (m)", `1 ton (${REBAR_BAR_LENGTH_M} m boy)`]}
      rows={REBAR_DIAMETERS_MM.map((d) => {
        const perM = rebarKgPerMeter(d);
        const m = rebarMetersForMass(d, 1000);
        return [`Ø${d}`, f(circleAreaMm2(d), 1), f(perM, 3), f(perM * REBAR_BAR_LENGTH_M, 2), f(m, 0), f(m / REBAR_BAR_LENGTH_M, 1)];
      })}
    />
  );
}

const PLATE_THICKNESSES = [0.5, 0.8, 1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 15, 20];
const PLATE_SIZES: Array<[number, number]> = [
  [1000, 2000],
  [1250, 2500],
  [1500, 3000],
];

function PlateTables() {
  return (
    <>
      <DataTable
        caption="Sac metrekare ağırlığı (kg/m²)"
        head={["Kalınlık", "Çelik", "Paslanmaz", "Alüminyum"]}
        rows={PLATE_THICKNESSES.map((t) => [`${f(t, 1)} mm`, f(plateKgPerM2(t, steel), 2), f(plateKgPerM2(t, stainless), 2), f(plateKgPerM2(t, aluminum), 2)])}
      />
      <DataTable
        caption="Çelik levha ağırlığı ölçüye göre (kg/adet)"
        head={["Kalınlık", ...PLATE_SIZES.map(([w, l]) => `${f(w, 0)} × ${f(l, 0)} mm`)]}
        rows={PLATE_THICKNESSES.map((t) => [`${f(t, 1)} mm`, ...PLATE_SIZES.map(([w, l]) => f(plateMassKg(l, w, t), 1))])}
      />
    </>
  );
}

const PIPE_WALLS = [2, 2.6, 3.2, 4, 5, 6.3];
const PIPE_DNS = [15, 20, 25, 32, 40, 50, 65, 80, 100, 125, 150, 200, 250, 300];

function PipeTable() {
  const rows = pipeNominalSizeTable
    .filter((r) => PIPE_DNS.includes(r.dn))
    .map((r) => [
      `DN${r.dn} (${r.nps})`,
      f(r.outerDiameterMm, 1),
      ...PIPE_WALLS.map((t) => (isValidPipe(r.outerDiameterMm, t) && t <= r.outerDiameterMm / 6 ? f(pipeKgPerMeter(r.outerDiameterMm, t), 2) : "–")),
    ]);
  return (
    <DataTable
      caption="Çelik boru metre ağırlığı (kg/m), et kalınlığına göre"
      head={["Nominal çap", "Dış çap (mm)", ...PIPE_WALLS.map((t) => `${f(t, 1)} mm`)]}
      rows={rows}
    />
  );
}

const BOX_SIZES: Array<[number, number]> = [
  [20, 20],
  [25, 25],
  [30, 30],
  [40, 40],
  [50, 50],
  [60, 60],
  [80, 80],
  [100, 100],
  [40, 20],
  [50, 30],
  [60, 40],
  [80, 40],
  [100, 50],
  [120, 60],
];
const BOX_WALLS = [1.5, 2, 3, 4, 5];

function BoxTable() {
  return (
    <DataTable
      caption="Çelik kutu profil metre ağırlığı (kg/m), yuvarlak köşe hesabı"
      head={["Profil (mm)", ...BOX_WALLS.map((t) => `${f(t, 1)} mm`)]}
      rows={BOX_SIZES.map(([h, b]) => [
        `${h} × ${b}`,
        ...BOX_WALLS.map((t) => (isValidBox(h, b, t) && t <= Math.min(h, b) / 6 ? f(kgPerMeter(boxAreaRoundedMm2(h, b, t)), 2) : "–")),
      ])}
    />
  );
}

/* ---------------- İçerik ---------------- */

function rebarContent(): PageContent {
  const a12 = circleAreaMm2(12);
  const kg12 = rebarKgPerMeter(12);
  const kg10 = rebarKgPerMeter(10);
  const kg8 = rebarKgPerMeter(8);
  const m8 = rebarMetersForMass(8, 1000);
  const m12 = rebarMetersForMass(12, 1000);
  const m16 = rebarMetersForMass(16, 1000);
  const m20 = rebarMetersForMass(20, 1000);
  return {
    metaTitle: "Demir Ağırlık Hesaplama ve Tablosu (kg/m)",
    description: `İnşaat demirinin çap, boy ve adetten kaç kg geldiğini hesaplayın; 1 ton demir kaç metre ve kaç boy, metraj listesi ve Ø6–Ø40 ağırlık tablosu. Ø12 = ${f(kg12, 3)} kg/m.`,
    h1: "İnşaat Demiri Ağırlık Hesaplama",
    intro:
      "Demir çapını, bir parçanın boyunu ve adedini girin; toplam ağırlığı kg ve ton olarak görün. Elinizdeki tonajın kaç metre ve kaç boy ettiğini bulabilir, projedeki pozları metraj listesinde çap çap toplayabilirsiniz.",
    sections: [
      {
        id: "tablo",
        title: "İnşaat demiri ağırlık tablosu",
        body: (
          <>
            <p>
              Tablodaki değerler nominal çapa göre hesaplanmış teorik ağırlıklardır. Araç tablodaki çaplarla sınırlı değildir; hesap her çap için aynı formülle yapılır.
            </p>
            <RebarTable />
          </>
        ),
      },
      {
        id: "formul",
        title: "Demir ağırlığı nasıl hesaplanır?",
        body: (
          <>
            <p>
              Bir metre demirin ağırlığı, kesit alanı ile çeliğin yoğunluğunun çarpımıdır. Kesit alanı daire formülüyle bulunur: A = π/4 × d². Çeliğin yoğunluğu {f(steel, 0)} kg/m³ alınır. Çap milimetre girildiğinde
              sonuç şu sade biçime iner: <strong>kg/m = 0,006165 × d²</strong>.
            </p>
            <p>
              Örnek, Ø12: kesit alanı π/4 × 12² = {f(a12, 1)} mm². Bu değer {f(a12, 1)} × 10⁻⁶ m² × {f(steel, 0)} kg/m³ = <strong>{f(kg12, 3)} kg/m</strong> eder. {REBAR_BAR_LENGTH_M} metrelik bir boy
              Ø12 demir {f(kg12 * REBAR_BAR_LENGTH_M, 2)} kg, 10 boy {f(kg12 * REBAR_BAR_LENGTH_M * 10, 1)} kg gelir.
            </p>
          </>
        ),
      },
      {
        id: "d2-162",
        title: "Şantiyedeki d²/162 formülü ne kadar doğru?",
        body: (
          <p>
            Sahada sık kullanılan kısa yol, çapın karesini 162&apos;ye bölmektir. Ø12 için 144 / 162 = {f(rebarKgPerMeterRuleOfThumb(12), 3)} kg/m çıkar; tam formül {f(kg12, 3)} kg/m verir. Fark binde
            bir civarındadır, yani elde hızlı bir kontrol için yeterlidir. Sipariş ve hakediş gibi tonajın büyüdüğü hesaplarda bu araçtaki tam formülü kullanmak daha tutarlıdır.
          </p>
        ),
      },
      {
        id: "1-ton",
        title: "1 ton demir kaç metre, kaç boy?",
        body: (
          <>
            <p>
              Demir tonla satılır ama projede metreyle kullanılır. Tonajdan metreye geçmek için 1000 kg&apos;ı metre ağırlığına bölersiniz. İnce çaplarda aynı tonaj çok daha uzun bir boya karşılık gelir:
            </p>
            <ul>
              <li>
                1 ton Ø8 ≈ {f(m8, 0)} m, yani yaklaşık {f(m8 / REBAR_BAR_LENGTH_M, 0)} boy
              </li>
              <li>
                1 ton Ø12 ≈ {f(m12, 0)} m, yaklaşık {f(m12 / REBAR_BAR_LENGTH_M, 0)} boy
              </li>
              <li>
                1 ton Ø16 ≈ {f(m16, 0)} m, yaklaşık {f(m16 / REBAR_BAR_LENGTH_M, 0)} boy
              </li>
              <li>
                1 ton Ø20 ≈ {f(m20, 0)} m, yaklaşık {f(m20 / REBAR_BAR_LENGTH_M, 0)} boy
              </li>
            </ul>
            <p>Araçtaki &quot;Tonajdan metre&quot; sekmesi aynı hesabı istediğiniz çap ve tonaj için yapar.</p>
          </>
        ),
      },
      {
        id: "metraj",
        title: "Donatı metrajı yaparken nelere dikkat edilir?",
        body: (
          <>
            <p>
              Metraj listesine her pozun <strong>kesim boyunu</strong> girin. Kesim boyu, statik projedeki donatı açılımında kancalar, bükümler ve bindirmeler dahil verilen boydur. Yalnızca düz
              kiriş ya da döşeme ölçüsünü yazmak demiri eksik hesaplatır.
            </p>
            <p>
              Bindirme boyu, kanca boyları ve fire oranı projeye, çapa ve beton sınıfına bağlıdır. Bu değerleri projeden ya da şantiye şefinden alın; bu araç girilen boyları toplar, bindirme boyu hesaplamaz.
            </p>
          </>
        ),
      },
      {
        id: "teorik-gercek",
        title: "Teorik ağırlık ile kantar ağırlığı neden farklı çıkar?",
        body: (
          <p>
            Nervürlü demirde nominal çap, aynı kesit alanına sahip düz yuvarlak çubuğun çapıdır; nervürler ağırlığa bu yolla dahil edilir ve tablodaki değer nervürlü ve düz demir için aynıdır. Üretimde kütle için standartta izin verilen
            küçük bir sapma vardır ve kantarda okunan ağırlık bu sapma kadar tablodan ayrılabilir. Türkiye&apos;de betonarme demiri TS 708 standardına göre üretilir; kesin tolerans için üreticinin ürün belgesine bakın.
          </p>
        ),
      },
    ],
    faq: [
      { question: "Ø12 demirin metresi kaç kg?", answer: `Ø12 inşaat demirinin teorik ağırlığı ${f(kg12, 3)} kg/m'dir. ${REBAR_BAR_LENGTH_M} metrelik bir boy ${f(kg12 * REBAR_BAR_LENGTH_M, 2)} kg gelir.` },
      { question: "12 metre Ø10 demir kaç kilo?", answer: `Ø10 demir ${f(kg10, 3)} kg/m'dir; 12 metrelik bir boy ${f(kg10 * 12, 2)} kg eder.` },
      { question: "1 ton Ø8 demir kaç boy eder?", answer: `Ø8 demir ${f(kg8, 3)} kg/m olduğundan 1 ton yaklaşık ${f(m8, 0)} metre, yani ${REBAR_BAR_LENGTH_M} metrelik ${f(m8 / REBAR_BAR_LENGTH_M, 0)} boy eder.` },
      { question: "Demir ağırlığı formülü nedir?", answer: "kg/m = π/4 × d² × 7850 / 1.000.000 (d mm). Sadeleştirilmiş hali kg/m = 0,006165 × d²; pratik yaklaşım d² / 162'dir." },
      { question: "Nervürlü ve düz demirin ağırlığı farklı mı?", answer: "Teorik ağırlık nominal çaptan hesaplandığı için tabloda ikisi aynıdır. Gerçek ağırlık üretim toleransı kadar farklılık gösterebilir." },
    ],
    extraRelated: [
      { href: "/beton-hesaplama", label: "Beton Hesaplama" },
      { href: "/hesaplayicilar#ev-ve-yapi", label: "Ev, İnşaat ve Bahçe" },
    ],
  };
}

function plateContent(): PageContent {
  const kg2 = plateKgPerM2(2);
  const sheet = plateMassKg(2000, 1000, 2);
  const alu = plateKgPerM2(1, aluminum);
  return {
    metaTitle: "Sac Ağırlık Hesaplama ve kg/m² Tablosu",
    description: `Sac ve levha ağırlığını ölçü, kalınlık ve malzemeye göre hesaplayın. 1 mm çelik sac ${f(plateKgPerM2(1), 2)} kg/m²; 1000×2000×2 mm levha ${f(sheet, 1)} kg. Kalınlığa göre kg/m² tablosu.`,
    h1: "Sac Ağırlık Hesaplama",
    intro:
      "Levhanın uzunluğunu, genişliğini ve kalınlığını milimetre olarak girin, malzemeyi seçin; tek levhanın ve toplam siparişin ağırlığını görün. Altta çelik, paslanmaz ve alüminyum için kalınlığa göre kg/m² tablosu var.",
    sections: [
      {
        id: "tablo",
        title: "Sac ağırlık tabloları",
        body: (
          <>
            <p>İlk tablo bir metrekarenin ağırlığını, ikincisi piyasada sık görülen levha ebatlarında tek bir çelik levhanın ağırlığını verir.</p>
            <PlateTables />
          </>
        ),
      },
      {
        id: "formul",
        title: "Sac ağırlığı formülü",
        body: (
          <>
            <p>
              Ağırlık = uzunluk × genişlik × kalınlık × yoğunluk. Ölçüler milimetre olduğunda hacmi metreküpe çevirmek için 10⁹&apos;a bölmek gerekir; birim karışıklığı en sık yapılan hatadır.
            </p>
            <p>
              Örnek: 1000 × 2000 × 2 mm çelik levhanın hacmi 0,004 m³&apos;tür. 0,004 × {f(steel, 0)} = <strong>{f(sheet, 1)} kg</strong>.
            </p>
          </>
        ),
      },
      {
        id: "kisa-yol",
        title: "Akılda tutulacak kısa yol: 1 mm = 7,85 kg/m²",
        body: (
          <p>
            Çelik sacın her milimetre kalınlığı bir metrekarede {f(plateKgPerM2(1), 2)} kg eder. 2 mm sac {f(kg2, 1)} kg/m², 5 mm sac {f(plateKgPerM2(5), 2)} kg/m² olur. Alüminyumda aynı katsayı{" "}
            {f(alu, 1)} kg/m², paslanmazda {f(plateKgPerM2(1, stainless), 1)} kg/m²&apos;dir. Metrekare ağırlığını levhanın alanıyla çarparak elde hızlı hesap yapabilirsiniz.
          </p>
        ),
      },
      {
        id: "galvaniz",
        title: "Galvaniz ve desenli sacda ağırlık",
        body: (
          <>
            <p>
              Galvaniz sacın üzerindeki çinko kaplama ağırlığa eklenir. Kaplama sınıfındaki sayı, örneğin Z275, iki yüzdeki toplam çinko miktarını g/m² cinsinden gösterir. Z275 kaplama bir metrekareye 0,275 kg
              ekler; ince saclarda bu oran fark edilir hale gelir.
            </p>
            <p>
              Baklava (gözyaşı) desenli saclarda desen kabartmaları ek malzeme taşır, bu yüzden düz sac formülü ağırlığı olduğundan az gösterir. Desenli sac için üreticinin verdiği birim ağırlığı kullanın.
            </p>
          </>
        ),
      },
      {
        id: "malzeme",
        title: "Malzeme seçimi sonucu nasıl değiştirir?",
        body: (
          <p>
            Aynı ölçüdeki levhanın ağırlığı yoğunlukla doğru orantılıdır. Alüminyum ({f(aluminum, 0)} kg/m³) çeliğin yaklaşık üçte biri kadar gelir; bakır ({f(metalById("copper").density, 0)} kg/m³) ise
            çelikten yaklaşık %{f((metalById("copper").density / steel - 1) * 100, 0)} ağırdır. Paslanmaz çelik kaliteleri arasında yoğunluk biraz değişir; araç genel değer olarak {f(stainless, 0)} kg/m³ kullanır.
          </p>
        ),
      },
    ],
    faq: [
      { question: "2 mm sacın metrekaresi kaç kg?", answer: `2 mm çelik sac ${f(kg2, 1)} kg/m², 2 mm alüminyum sac ${f(plateKgPerM2(2, aluminum), 1)} kg/m² gelir.` },
      { question: "100x200 2 mm sac kaç kilo?", answer: `1000 × 2000 × 2 mm çelik levha ${f(sheet, 1)} kg'dır.` },
      { question: "1 mm alüminyum sacın metrekaresi kaç kg?", answer: `Alüminyumun yoğunluğu ${f(aluminum, 0)} kg/m³ olduğundan 1 mm alüminyum sac ${f(alu, 1)} kg/m² gelir.` },
      { question: "Sac ağırlığı nasıl hesaplanır?", answer: "Uzunluk (mm) × genişlik (mm) × kalınlık (mm) × yoğunluk (kg/m³) / 1.000.000.000. Çelik için kısa yol: kalınlık (mm) × 7,85 = kg/m²." },
    ],
    extraRelated: [
      { href: "/hesaplayicilar#teknik", label: "Teknik ve Mühendislik" },
      { href: "/malzeme-ozellikleri", label: "Malzeme Özellikleri" },
    ],
  };
}

function pipeContent(): PageContent {
  const D = 60.3;
  const t = 3.2;
  const kg = pipeKgPerMeter(D, t);
  const water = pipeWaterKgPerMeter(D, t);
  const thin = pipeKgPerMeter(114.3, 3.2);
  const thick = pipeKgPerMeter(114.3, 6.3);
  return {
    metaTitle: "Boru Ağırlık Hesaplama ve kg/m Tablosu",
    description: `Boru ağırlığını dış çap ve et kalınlığından hesaplayın; DN seçin, malzemeyi değiştirin, su dolu ağırlığı görün. DN50 (60,3 × 3,2 mm) çelik boru ${f(kg, 2)} kg/m.`,
    h1: "Boru Ağırlık Hesaplama",
    intro:
      "Nominal çapı (DN) seçin ya da dış çapı elle girin, et kalınlığını ve boyu yazın; borunun metre ağırlığını ve toplam ağırlığını görün. Tesisat askı hesabı için borunun su dolu ağırlığı da gösterilir.",
    sections: [
      {
        id: "tablo",
        title: "Çelik boru ağırlık tablosu",
        body: (
          <>
            <p>
              Dış çaplar EN ISO 6708 nominal çaplarına karşılık gelen DIN/EN değerleridir. Et kalınlığı sütunları karşılaştırma içindir; her çap her kalınlıkta üretilmez, kesin seri için üreticinin
              kataloğuna bakın. Çapa göre çok kalın ya da çok ince kalan hücreler boş bırakıldı.
            </p>
            <PipeTable />
          </>
        ),
      },
      {
        id: "formul",
        title: "Boru ağırlığı formülü",
        body: (
          <>
            <p>
              Borunun kesiti bir halkadır: A = π × (D − t) × t. Burada D dış çap, t et kalınlığıdır. Aynı sonucu π/4 × (D² − d²) formülü de verir; d iç çaptır. Kesit alanı yoğunlukla çarpılınca metre
              ağırlığı çıkar.
            </p>
            <p>
              Örnek, DN50 çelik boru (60,3 × 3,2 mm): A = π × (60,3 − 3,2) × 3,2 = {f(pipeAreaText(D, t), 1)} mm². {f(pipeAreaText(D, t), 1)} × 10⁻⁶ × {f(steel, 0)} = <strong>{f(kg, 3)} kg/m</strong>. 6 metrelik
              bir boy {f(kg * 6, 2)} kg gelir.
            </p>
          </>
        ),
      },
      {
        id: "dn",
        title: "DN, dış çap değildir",
        body: (
          <p>
            DN50 bir isimdir; borunun dış çapı 50 mm değil 60,3 mm&apos;dir. Hesaba DN değerini yazmak ağırlığı ciddi biçimde düşük gösterir. Bu yüzden araç DN seçildiğinde gerçek dış çapı otomatik doldurur.
            Dış çaplar ve inç karşılıkları için <Link href="/boru-capi-donusum-hesaplama">Boru Çapı Dönüşümü</Link> sayfasına bakabilirsiniz.
          </p>
        ),
      },
      {
        id: "et-kalinligi",
        title: "Ağırlık et kalınlığına çok duyarlıdır",
        body: (
          <p>
            Aynı dış çapta et kalınlığı arttıkça ağırlık neredeyse doğru orantılı artar. DN100 (114,3 mm) boru 3,2 mm et kalınlığında {f(thin, 2)} kg/m iken 6,3 mm et kalınlığında {f(thick, 2)} kg/m gelir;
            kalınlık yaklaşık iki katına çıkınca ağırlık da yaklaşık iki katına çıkar. Fiyat teklifleri kilogram üzerinden verildiğinde et kalınlığını doğru seçmek bu yüzden önemlidir.
          </p>
        ),
      },
      {
        id: "su-dolu",
        title: "Su dolu boru ağırlığı",
        body: (
          <p>
            Tesisatta askı ve konsol seçerken borunun içindeki akışkan da taşınır. Su dolu ağırlık, boru ağırlığına iç kesit alanı × 1000 kg/m³ eklenerek bulunur. DN50 (60,3 × 3,2 mm) boruda suyun ağırlığı{" "}
            {f(water, 2)} kg/m, su dolu toplam {f(kg + water, 2)} kg/m&apos;dir. Askı aralığı ve taşıma kapasitesi ilgili tesisat standardına ve üretici verisine göre belirlenmelidir.
          </p>
        ),
      },
    ],
    faq: [
      { question: "DN50 boru 1 metre kaç kg?", answer: `DN50 çelik borunun dış çapı 60,3 mm'dir. 3,2 mm et kalınlığında ağırlığı ${f(kg, 2)} kg/m'dir.` },
      { question: "Boru ağırlığı nasıl hesaplanır?", answer: "kg/m = π × (D − t) × t × yoğunluk / 1.000.000. D dış çap ve t et kalınlığı mm cinsindendir; çelik için yoğunluk 7850 kg/m³." },
      { question: "Paslanmaz boru çelik borudan ağır mı?", answer: `Aynı ölçüde paslanmaz boru, yoğunluğu ${f(stainless, 0)} kg/m³ alındığında karbon çeliğinden yaklaşık %${f((stainless / steel - 1) * 100, 1)} ağırdır.` },
      { question: "Su dolu boru ağırlığı nasıl bulunur?", answer: "Boru metre ağırlığına, iç çapın oluşturduğu dairenin alanı × 1000 kg/m³ eklenir. Araç bunu otomatik gösterir." },
    ],
    extraRelated: [
      { href: "/boru-capi-donusum-hesaplama", label: "Boru Çapı Dönüşümü (DN-NPS)" },
      { href: "/boru-capi-hesaplama", label: "Boru Çapı, Debi ve Akış Hızı" },
      { href: "/hesaplayicilar#teknik", label: "Teknik ve Mühendislik" },
    ],
  };
}

function pipeAreaText(D: number, t: number) {
  return Math.PI * (D - t) * t;
}

function boxContent(): PageContent {
  const sharp = kgPerMeter(boxAreaSharpMm2(40, 40, 3));
  const rounded = kgPerMeter(boxAreaRoundedMm2(40, 40, 3));
  const big = kgPerMeter(boxAreaRoundedMm2(100, 50, 3));
  return {
    metaTitle: "Kutu Profil Ağırlık Hesaplama ve Tablosu",
    description: `Kare ve dikdörtgen kutu profil ağırlığını ölçü ve et kalınlığından hesaplayın; köşe yarıçapının etkisini görün. 40×40×3 profil ≈ ${f(rounded, 2)} kg/m.`,
    h1: "Kutu Profil Ağırlık Hesaplama",
    intro:
      "Profilin yüksekliğini, genişliğini ve et kalınlığını girin; metre ağırlığını ve toplam ağırlığı görün. Araç hem köşeleri yuvarlatılmış gerçek profile yakın değeri hem de keskin köşe varsayımının verdiği üst sınırı gösterir.",
    sections: [
      {
        id: "tablo",
        title: "Kutu profil ağırlık tablosu",
        body: (
          <>
            <p>
              Değerler yuvarlak köşe hesabıyla bulunmuştur. Ölçüler karşılaştırma için seçilmiş yaygın boyutlardır; her ölçü her et kalınlığında üretilmez. Kenara göre çok kalın kalan hücreler boş bırakıldı.
            </p>
            <BoxTable />
          </>
        ),
      },
      {
        id: "neden-farkli",
        title: "Neden üretici tabloları birbirini tutmuyor?",
        body: (
          <>
            <p>
              Aynı 40 × 40 × 3 mm profil için bir üreticinin tablosunda 3,46 kg/m, başka birinde 3,33 kg/m yazdığını görebilirsiniz. İkisi de hatalı değildir; fark köşelerden gelir. Kutu profil
              sactan bükülerek yapılır ve köşeleri yuvarlaktır. Köşeleri keskin kabul eden hesap, köşelerde gerçekte olmayan malzemeyi de sayar.
            </p>
            <p>
              Bu ölçü için keskin köşe hesabı <strong>{f(sharp, 3)} kg/m</strong>, yuvarlak köşe hesabı <strong>{f(rounded, 3)} kg/m</strong> verir. 3,46 kg/m keskin köşe hesabına, 3,33 kg/m yuvarlak köşe
              hesabına yakındır. Fark yaklaşık %{f((sharp / rounded - 1) * 100, 1)}&apos;dir; ince profillerde küçük, kalın et kalınlıklı küçük profillerde daha büyüktür.
            </p>
          </>
        ),
      },
      {
        id: "formul",
        title: "Kutu profil ağırlığı formülü",
        body: (
          <>
            <p>
              Keskin köşe varsayımıyla kesit alanı dış dikdörtgenden iç dikdörtgenin çıkarılmasıyla bulunur: A = H × B − (H − 2t) × (B − 2t). Yuvarlak köşede her köşeden (4 − π)/4 × (R² − r²) kadar alan
              eksilir; R dış, r = R − t iç köşe yarıçapıdır. Dört köşe için toplam düşüş (4 − π) × (R² − r²) olur.
            </p>
            <p>
              Örnek, 100 × 50 × 3 mm: R = {f(boxOuterCornerRadius(3), 0)} mm alındığında metre ağırlığı <strong>{f(big, 3)} kg/m</strong> çıkar. 6 metrelik boy {f(big * 6, 2)} kg gelir.
            </p>
          </>
        ),
      },
      {
        id: "kose-yaricapi",
        title: "Köşe yarıçapı hangi değerle alındı?",
        body: (
          <p>
            Soğuk şekillendirilmiş kaynaklı yapı profillerini tanımlayan EN 10219-2, dış köşe yarıçapı için aralık verir: et kalınlığı 6 mm&apos;ye kadar 1,6t–2,4t, 6–10 mm arası 2,0t–3,0t, 10 mm üstü
            2,4t–3,6t. Araç bu aralıkların ortasını kullanır (2t, 2,5t ve 3t). Gerçek profilin köşesi aralığın içinde herhangi bir yerde olabileceğinden sonuç birkaç binde bir oynayabilir; kesin değer için
            üreticinin kesit tablosuna bakın.
          </p>
        ),
      },
    ],
    faq: [
      { question: "40x40x3 kutu profil 1 metre kaç kg?", answer: `Yuvarlak köşe hesabıyla yaklaşık ${f(rounded, 2)} kg/m, keskin köşe hesabıyla ${f(sharp, 2)} kg/m. Üretici tablolarında bu iki değer arasında rakamlar görülür.` },
      { question: "Kutu profil ağırlığı nasıl hesaplanır?", answer: "Kesit alanı (mm²) × 7850 / 1.000.000 = kg/m. Keskin köşede alan H × B − (H − 2t)(B − 2t); yuvarlak köşede buna köşe düzeltmesi uygulanır." },
      { question: "Kare ve dikdörtgen profil aynı formülle mi hesaplanır?", answer: "Evet. Kare profilde yükseklik ve genişlik eşit girilir; formül aynıdır." },
      { question: "Alüminyum kutu profil ağırlığı nasıl bulunur?", answer: `Malzemeyi alüminyum seçin. Alüminyumun yoğunluğu ${f(aluminum, 0)} kg/m³ olduğundan aynı ölçüdeki profil çeliğin yaklaşık %${f((aluminum / steel) * 100, 0)}'i kadar gelir.` },
    ],
    extraRelated: [
      { href: "/celik-profil-tablolari", label: "Çelik Profil Tabloları (IPE, HEA, HEB)" },
      { href: "/hesaplayicilar#teknik", label: "Teknik ve Mühendislik" },
      { href: "/malzeme-agirligi-hesaplama", label: "Malzeme Ağırlığı" },
    ],
  };
}

const CONTENT: Record<MetalWeightKind, () => PageContent> = {
  rebar: rebarContent,
  plate: plateContent,
  pipe: pipeContent,
  box: boxContent,
};

export function metalWeightMetadata(kind: MetalWeightKind): Metadata {
  const c = CONTENT[kind]();
  const path = METAL_WEIGHT_PATHS[kind];
  return {
    title: c.metaTitle,
    description: c.description,
    alternates: { canonical: path },
    openGraph: { title: c.metaTitle, description: c.description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
  };
}

const SOURCES: Record<MetalWeightKind, string> = {
  rebar:
    "Hesap: nominal kesit alanı × 7850 kg/m³. Tablo değerleri Ø8–Ø32 için yayımlanmış inşaat demiri ağırlık tablolarıyla karşılaştırıldı ve üç ondalık basamakta aynı çıktı. Standart: TS 708 (betonarme donatı çeliği).",
  plate: "Hesap: hacim × yoğunluk. Yoğunluklar sitenin malzeme tablosundan alınır (çelik 7850, paslanmaz 8000, alüminyum 2700 kg/m³). Galvaniz kaplama gösterimi: EN 10346.",
  pipe: "Hesap: π × (D − t) × t × yoğunluk. DN – dış çap eşleşmesi: EN ISO 6708 ve DIN/EN boru ölçüleri (sitenin boru çapı tablosu). Su yoğunluğu 1000 kg/m³ alınmıştır.",
  box: "Hesap: kesit alanı × yoğunluk; köşe yarıçapı aralıkları EN 10219-2. 40 × 40 × 3 mm karşılaştırması: Öztürk Boru (3,46 kg/m) ve Yakup Yılmaz Boru (3,33 kg/m) birim ağırlık tabloları.",
};

export default function MetalWeightPage({ kind }: { kind: MetalWeightKind }) {
  const c = CONTENT[kind]();
  const path = METAL_WEIGHT_PATHS[kind];
  const siblings = (Object.keys(METAL_WEIGHT_PATHS) as MetalWeightKind[]).filter((k) => k !== kind).map((k) => ({ href: METAL_WEIGHT_PATHS[k], label: LINK_LABELS[k] }));

  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/muhendislik-hesaplayicilari", label: "Mühendislik Hesaplayıcıları" },
        { href: path, label: c.h1 },
      ]}
      crumbLabel="Sayfa yolu"
      title={c.h1}
      intro={c.intro}
      tool={<MetalWeightTool kind={kind} />}
      related={{ title: "İlgili hesaplamalar", links: [...siblings, ...c.extraRelated] }}
      tocTitle="Bu sayfada"
      tocItems={[...c.sections.map((s) => ({ id: s.id, label: s.title })), { id: "kaynaklar", label: "Kaynaklar" }, { id: "faq", label: "Sık sorulan sorular" }]}
      faqTitle="Sık sorulan sorular"
      faqItems={c.faq}
    >
      {c.sections.map((s) => (
        <section key={s.id}>
          <h2 id={s.id}>{s.title}</h2>
          {s.body}
        </section>
      ))}
      <EngineeringNextSteps links={ENGINEERING_FLOWS[path] ?? []} />
      <h2 id="kaynaklar">Kaynaklar ve hesap yöntemi</h2>
      <p>{SOURCES[kind]}</p>
      <p>Sonuçlar teorik ağırlıktır; sipariş, nakliye ve statik hesap gibi kararlarda üreticinin ürün belgesini esas alın.</p>
    </TimeToolPage>
  );
}
