// Isı ve akışkan sayfaları: U değeri, pompa gücü, LMTD, debiden ısı yükü.
// Metinlerdeki sayısal örnekler ve tablolar formüllerden üretilir.
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ENGINEERING_FLOWS } from "../../converter/engineeringFlows";
import type { FaqItem } from "../../converter/faqSchema";
import { formatTr } from "../../converter/metal/metalWeight";
import { LAYER_PRESETS } from "../../converter/thermal/layerPresets";
import { AIR, exchangerArea, headFromPressure, hydraulicPower, lmtd, sensibleHeat, terminalDifferences, uValue, WATER } from "../../converter/thermal/thermal";
import { buildSiteUrl } from "../../siteConfig";
import EngineeringNextSteps from "../engineering/EngineeringNextSteps";
import DataTable from "../metal/DataTable";
import TimeToolPage from "../time/TimeToolPage";
import ThermalTool, { type ThermalKind } from "./ThermalTools";

export const THERMAL_PATHS: Record<ThermalKind, string> = {
  uvalue: "/u-degeri-hesaplama",
  pump: "/pompa-gucu-hesaplama",
  lmtd: "/lmtd-hesaplama",
  flowheat: "/debi-isi-yuku-hesaplama",
};

const f = formatTr;
type Section = { id: string; title: string; body: ReactNode };
type Content = { metaTitle: string; description: string; h1: string; intro: string; sections: Section[]; faq: FaqItem[]; sources: string };
const lam = (id: string) => LAYER_PRESETS.find((p) => p.id === id)!.lambda!;

function uContent(): Content {
  const concrete = lam("concrete");
  const eps = lam("eps");
  const wall = (cm: number) => uValue([{ thicknessM: 0.2, lambda: concrete }, ...(cm > 0 ? [{ thicknessM: cm / 100, lambda: eps }] : [])]);
  const bare = wall(0);
  const five = wall(5);
  return {
    metaTitle: "U Değeri Hesaplama ve Isı Kaybı",
    description: `Duvar, çatı ve döşemenin U değerini (ısı geçirgenlik katsayısı) katman katman hesaplayın; yalıtım kalınlığının etkisini ve m² başına ısı kaybını görün. EN ISO 6946 yüzey dirençleriyle.`,
    h1: "U Değeri Hesaplama",
    intro:
      "Yapı elemanının katmanlarını içten dışa doğru kalınlık ve ısıl iletkenlik (λ) değerleriyle girin. U değerini, toplam ısıl direnci, her katmanın payını ve verdiğiniz alan ile sıcaklık farkında ısı kaybını görün.",
    sections: [
      {
        id: "formul",
        title: "U değeri nasıl hesaplanır?",
        body: (
          <>
            <p>
              Her katmanın ısıl direnci R = d / λ&apos;dır (d metre, λ W/mK). Katman dirençleri, iç ve dış yüzey dirençleri (Rsi, Rse) ile toplanır ve U = 1 / R<sub>toplam</sub> bulunur. Yüzey dirençleri ısı akış
              yönüne bağlıdır: duvarda Rsi = 0,13, çatıda 0,10, döşemede 0,17; dış yüzeyde Rse = 0,04 m²K/W (EN ISO 6946).
            </p>
            <p>
              Örnek: 20 cm beton (λ = {f(concrete, 2)}) duvarda R = 0,13 + 0,20/{f(concrete, 2)} + 0,04 = {f(bare.R, 3)} m²K/W ve U = <strong>{f(bare.U, 2)} W/m²K</strong>. Dışına 5 cm EPS (λ = {f(eps, 3)}) eklenince
              R {f(five.R, 3)} m²K/W&apos;a çıkar ve U <strong>{f(five.U, 2)} W/m²K</strong>&apos;ye iner.
            </p>
          </>
        ),
      },
      {
        id: "yalitim-tablosu",
        title: "Yalıtım kalınlığına göre U değeri",
        body: (
          <>
            <p>20 cm beton duvar dışına EPS eklendiğinde U değeri ve 1 m² duvardan 20 K sıcaklık farkında kaybedilen ısı:</p>
            <DataTable
              caption="20 cm beton + EPS (λ tipik değer)"
              head={["EPS kalınlığı", "U (W/m²K)", "Isı kaybı (W/m², ΔT = 20 K)", "Yalıtımsız duvara göre azalma"]}
              rows={[0, 2, 3, 4, 5, 6, 8, 10, 12, 15].map((cm) => {
                const w = wall(cm);
                return [cm === 0 ? "Yalıtımsız" : `${cm} cm`, f(w.U, 3), f(w.U * 20, 1), cm === 0 ? "–" : `%${f((1 - w.U / bare.U) * 100, 0)}`];
              })}
            />
            <p>
              İlk santimetreler U değerini hızla düşürür, sonrakilerin etkisi giderek azalır. Bu yüzden yalıtım kalınlığı seçimi yalnız U değeriyle değil maliyet ve amortismanla birlikte değerlendirilir.
            </p>
          </>
        ),
      },
      {
        id: "lambda",
        title: "λ değerini nereden almalı?",
        body: (
          <p>
            Isıl iletkenlik ürün türüne, yoğunluğa ve neme göre değişir. Yalıtım levhalarında ürünün etiketinde ve CE belgesinde yazan beyan değerini (λD) kullanın. Tuğla, gazbeton ve bims gibi duvar
            malzemelerinde değerler ürüne göre çok farklı olduğundan araçta hazır seçenek verilmez; üreticinin belgesindeki λ değerini girin.
          </p>
        ),
      },
      {
        id: "ts825",
        title: "U değeri ve TS 825",
        body: (
          <p>
            Türkiye&apos;de binaların ısı yalıtımı TS 825 standardıyla düzenlenir; standart, iklim bölgesine göre duvar, çatı, döşeme ve pencere için izin verilen en büyük U değerlerini verir. Bu araç bir
            uygunluk kontrolü yapmaz; ısı yalıtım projesi yetkili kişilerce TS 825&apos;in güncel sürümüne göre hazırlanır. Isı köprüleri (kolon, kiriş, döşeme alınları) ayrıca değerlendirilir.
          </p>
        ),
      },
    ],
    faq: [
      { question: "U değeri ne demek?", answer: "Bir yapı elemanının 1 m²'sinden, iki yüzü arasında 1 K sıcaklık farkı varken geçen ısı miktarıdır (W/m²K). Ne kadar küçükse eleman o kadar iyi yalıtılmıştır." },
      { question: "U değeri formülü nedir?", answer: "U = 1 / (Rsi + Σ d/λ + Rse). d katman kalınlığı (m), λ ısıl iletkenlik (W/mK), Rsi ve Rse iç ve dış yüzey dirençleridir." },
      { question: "5 cm EPS U değerini ne kadar düşürür?", answer: `20 cm beton duvarda U değeri ${f(bare.U, 2)}'den ${f(five.U, 2)} W/m²K'ye, yani yaklaşık %${f((1 - five.U / bare.U) * 100, 0)} düşer (EPS λ = ${f(eps, 3)}).` },
    ],
    sources: "Yüzey ısıl dirençleri: EN ISO 6946 (Tablo 7). Hazır λ seçenekleri sitenin ısıl iletkenlik tablosundaki tipik değerlerdir; hesap için ürün belgesindeki beyan değeri esas alınmalıdır. Isı yalıtım kuralları: TS 825.",
  };
}

function pumpContent(): Content {
  const Ph = hydraulicPower(1000, 10 / 3600, 30);
  const eta = 0.65;
  const flows = [2, 5, 10, 20, 50, 100];
  const heads = [10, 20, 30, 50];
  return {
    metaTitle: "Pompa Gücü Hesaplama (kW)",
    description: `Debi ve basma yüksekliğinden pompa hidrolik gücü, mil gücü ve motorun çektiği güç. m³/h veya L/s, metre veya bar girin. 10 m³/h ve 30 m için hidrolik güç ${f(Ph / 1000, 2)} kW.`,
    h1: "Pompa Gücü Hesaplama",
    intro: "Debiyi, basma yüksekliğini (ya da basınç farkını), akışkan yoğunluğunu ve verimleri girin. Hidrolik gücü, pompanın mil gücünü ve motorun şebekeden çektiği gücü görün.",
    sections: [
      {
        id: "formul",
        title: "Pompa gücü formülü",
        body: (
          <>
            <p>
              Pompanın akışkana verdiği hidrolik güç P<sub>h</sub> = ρ · g · Q · H&apos;dir. ρ yoğunluk (su için yaklaşık 1000 kg/m³), g = 9,81 m/s², Q debi (m³/s), H basma yüksekliğidir (m). Pompa milinin
              ihtiyaç duyduğu güç, hidrolik gücün pompa verimine bölünmesiyle; motorun şebekeden çektiği güç ise bunun motor verimine bölünmesiyle bulunur.
            </p>
            <p>
              Örnek: 10 m³/h su, 30 m basma yüksekliği. Q = 10/3600 = 0,00278 m³/s, P<sub>h</sub> = 1000 × 9,81 × 0,00278 × 30 = <strong>{f(Ph / 1000, 2)} kW</strong>. Pompa verimi %65 ise mil gücü{" "}
              {f(Ph / eta / 1000, 2)} kW olur.
            </p>
          </>
        ),
      },
      {
        id: "tablo",
        title: "Debi ve basma yüksekliğine göre mil gücü",
        body: (
          <DataTable
            caption="Su için pompa mil gücü (kW), pompa verimi %65"
            head={["Debi", ...heads.map((h) => `H = ${h} m`)]}
            rows={flows.map((q) => [`${q} m³/h`, ...heads.map((h) => f(hydraulicPower(1000, q / 3600, h) / eta / 1000, 2))])}
          />
        ),
      },
      {
        id: "bar-metre",
        title: "Bar ile metre su sütunu arasındaki ilişki",
        body: (
          <p>
            Pompa eğrileri basma yüksekliğini metre (mSS) ile verir. Su için 1 bar ≈ {f(headFromPressure(1e5, 1000), 2)} m su sütunudur. Yoğunluğu farklı akışkanlarda aynı basınç farkı farklı yüksekliğe karşılık
            gelir: yoğunluğu 850 kg/m³ olan bir yağda 1 bar ≈ {f(headFromPressure(1e5, 850), 2)} m&apos;dir. Araç yoğunluğu girdiğinizde bu dönüşümü kendisi yapar.
          </p>
        ),
      },
      {
        id: "secim",
        title: "Hesaplanan güç ile motor seçimi",
        body: (
          <p>
            Hesaplanan mil gücü, pompanın çalışma noktasındaki ihtiyacıdır. Motor, üretici pompa eğrisindeki en kötü çalışma noktasını karşılayacak şekilde bir üst standart motor gücünden seçilir. Pompa verimi
            debiye göre değişir; en doğru değer pompa eğrisindeki verim çizgisinden okunur. Emme tarafında kavitasyon kontrolü (NPSH) ayrıca yapılmalıdır.
          </p>
        ),
      },
    ],
    faq: [
      { question: "Pompa gücü nasıl hesaplanır?", answer: "P (kW) = ρ · g · Q · H / (1000 · η). Su için pratik biçim: P (kW) ≈ Q (m³/h) · H (m) / (367 · η)." },
      { question: "1 bar kaç metre su eder?", answer: `Su için 1 bar yaklaşık ${f(headFromPressure(1e5, 1000), 1)} m su sütunudur.` },
      { question: "Hidrolik güç ile mil gücü arasındaki fark nedir?", answer: "Hidrolik güç akışkana aktarılan güçtür. Mil gücü bunu pompa verimine böler; kayıplar nedeniyle her zaman daha büyüktür." },
    ],
    sources: "Bağıntılar: P = ρ g Q H (akışkanlar mekaniği temel denklemi), g = 9,80665 m/s² (standart yerçekimi ivmesi). Hesap testte bilinen değerlerle (10 m³/h, 30 m → 0,817 kW; 1 bar ≈ 10,2 m su) doğrulanır.",
  };
}

function lmtdContent(): Content {
  const [c1, c2] = terminalDifferences(90, 70, 10, 50, "counter");
  const [p1, p2] = terminalDifferences(90, 70, 10, 50, "parallel");
  const Lc = lmtd(c1, c2)!;
  const Lp = lmtd(p1, p2)!;
  const A = exchangerArea(50_000, 1500, Lc);
  return {
    metaTitle: "LMTD Hesaplama ve Isı Eşanjörü Alanı",
    description: `Isı eşanjöründe logaritmik ortalama sıcaklık farkı (LMTD) ve gereken ısı transfer alanı. Karşı akış ve paralel akış; giriş-çıkış sıcaklıklarından adım adım hesap.`,
    h1: "LMTD Hesaplama (Isı Eşanjörü)",
    intro: "Sıcak ve soğuk akışkanın giriş ve çıkış sıcaklıklarını girin, akış düzenini seçin. LMTD'yi ve ısı yükü ile toplam ısı transfer katsayısından gereken eşanjör alanını görün.",
    sections: [
      {
        id: "formul",
        title: "LMTD formülü",
        body: (
          <p>
            LMTD = (ΔT1 − ΔT2) / ln(ΔT1 / ΔT2). Karşı akışta ΔT1 = sıcak giriş − soğuk çıkış, ΔT2 = sıcak çıkış − soğuk giriştir; paralel akışta ΔT1 = sıcak giriş − soğuk giriş, ΔT2 = sıcak çıkış − soğuk
            çıkıştır. Gereken alan Q = U · A · LMTD bağıntısından A = Q / (U · LMTD) olarak bulunur.
          </p>
        ),
      },
      {
        id: "ornek",
        title: "Örnek: karşı akış ve paralel akış",
        body: (
          <>
            <p>Sıcak su 90 °C&apos;den 70 °C&apos;ye soğurken soğuk su 10 °C&apos;den 50 °C&apos;ye ısınsın.</p>
            <ul>
              <li>
                Karşı akış: ΔT1 = {f(c1, 0)} K, ΔT2 = {f(c2, 0)} K, LMTD = <strong>{f(Lc, 2)} K</strong>
              </li>
              <li>
                Paralel akış: ΔT1 = {f(p1, 0)} K, ΔT2 = {f(p2, 0)} K, LMTD = <strong>{f(Lp, 2)} K</strong>
              </li>
            </ul>
            <p>
              Karşı akış aynı sıcaklıklarda daha büyük LMTD verir; bu yüzden aynı ısıyı daha küçük alanla aktarır. 50 kW yük ve U = 1500 W/m²K için karşı akışta gereken alan {f(A, 2)} m², paralel akışta{" "}
              {f(exchangerArea(50_000, 1500, Lp), 2)} m²&apos;dir.
            </p>
          </>
        ),
      },
      {
        id: "sinirlar",
        title: "Dikkat edilecek noktalar",
        body: (
          <p>
            Paralel akışta soğuk akışkanın çıkışı sıcak akışkanın çıkışını geçemez; geçen sıcaklıklar girildiğinde araç uyarı verir. Çok geçişli ve çapraz akışlı eşanjörlerde LMTD bir düzeltme katsayısı (F) ile
            çarpılır; bu araç saf karşı ve paralel akışı hesaplar. U değeri eşanjör tipine, akışkanlara ve kirlenmeye bağlıdır; üretici verisini kullanın.
          </p>
        ),
      },
    ],
    faq: [
      { question: "LMTD nedir?", answer: "Isı eşanjöründe iki akışkan arasındaki sıcaklık farkının logaritmik ortalamasıdır. Eşanjör boyunca değişen sıcaklık farkını tek bir etkin değerle temsil eder." },
      { question: "Neden aritmetik ortalama kullanılmaz?", answer: "Sıcaklık farkı eşanjör boyunca doğrusal değil üstel değişir. Uç farkları birbirine yakınsa iki ortalama yakın çıkar, uzaklaştıkça aritmetik ortalama ısı transferini olduğundan büyük gösterir." },
      { question: "Karşı akış neden daha verimli?", answer: `Aynı giriş-çıkış sıcaklıklarında karşı akış daha büyük LMTD sağlar (örnekte ${f(Lc, 1)} K'ye karşı ${f(Lp, 1)} K), bu da daha küçük ısı transfer alanı demektir.` },
    ],
    sources: "Bağıntılar: Incropera ve DeWitt, Fundamentals of Heat and Mass Transfer, ısı eşanjörleri bölümü (LMTD yöntemi). Hesap testte bilinen değerlerle doğrulanır (ΔT1 = 60, ΔT2 = 20 → 36,41 K).",
  };
}

function flowContent(): Content {
  const airQ = sensibleHeat((1000 / 3600) * AIR.rho, AIR.cp, 10) / 1000;
  const waterFlow = (kw: number, dT: number) => ((kw * 1000) / (WATER.cp * dT) / WATER.rho) * 3600 * 1000;
  return {
    metaTitle: "Debiden Isı Yükü Hesaplama (Hava ve Su)",
    description: `Hava ve su debisinden ısıtma-soğutma gücünü ya da istenen güç için gereken debiyi hesaplayın. 1000 m³/h hava ve 10 K fark ≈ ${f(airQ, 2)} kW; 24 kW kombi için 20 K farkta su debisi.`,
    h1: "Debiden Isı Yükü Hesaplama",
    intro: "Hava (havalandırma, klima) ya da su (kalorifer, kombi, soğutma devresi) için debi ve sıcaklık farkından ısı yükünü, ya da istenen ısı yükü için gereken debiyi hesaplayın.",
    sections: [
      {
        id: "formul",
        title: "Formül: Q = ṁ · cp · ΔT",
        body: (
          <p>
            Bir akışkanın taşıdığı ısı, kütlesel debi × özgül ısı × sıcaklık farkıdır. Hava için ρ ≈ 1,2 kg/m³ ve cp ≈ 1005 J/kgK alındığında pratik biçim Q (kW) ≈ V̇ (m³/h) × ΔT / 2985 olur. Su için cp ≈
            4180 J/kgK ile Q (kW) ≈ V̇ (L/h) × ΔT / 861; tersten V̇ (L/h) ≈ 861 × Q (kW) / ΔT.
          </p>
        ),
      },
      {
        id: "su-tablosu",
        title: "Kombi ve kalorifer için su debisi",
        body: (
          <>
            <DataTable
              caption="Isı gücüne ve gidiş-dönüş farkına göre su debisi (L/h)"
              head={["Isı gücü", "ΔT = 10 K", "ΔT = 15 K", "ΔT = 20 K"]}
              rows={[10, 15, 20, 24, 28, 35, 50].map((kw) => [`${kw} kW`, f(waterFlow(kw, 10), 0), f(waterFlow(kw, 15), 0), f(waterFlow(kw, 20), 0)])}
            />
            <p>
              Örneğin 24 kW&apos;lık bir kombi 20 K gidiş-dönüş farkıyla çalışırken devreden saatte yaklaşık {f(waterFlow(24, 20), 0)} litre su dolaştırmalıdır. Fark 10 K&apos;e düşerse gereken debi iki katına çıkar;
              boru çapı ve pompa seçimi bu debiye göre yapılır.
            </p>
          </>
        ),
      },
      {
        id: "hava",
        title: "Havalandırma ve klima için hava debisi",
        body: (
          <p>
            1000 m³/h dış havayı 10 K ısıtmak yaklaşık {f(airQ, 2)} kW ister. Bu hesap yalnız duyulur ısıyı kapsar; nem alma ve nemlendirmede gizli ısı da eklenir. Hava yoğunluğu sıcaklık ve rakımla değişir;
            yüksek rakımlı yerlerde aynı hacimsel debi daha az ısı taşır.
          </p>
        ),
      },
    ],
    faq: [
      { question: "Su debisinden ısı gücü nasıl hesaplanır?", answer: "Q (kW) ≈ debi (L/h) × ΔT / 861. Örneğin 1000 L/h debi ve 20 K farkta yaklaşık 23,2 kW." },
      { question: "24 kW kombi için su debisi ne olmalı?", answer: `20 K gidiş-dönüş farkında yaklaşık ${f(waterFlow(24, 20), 0)} L/h, 15 K farkta ${f(waterFlow(24, 15), 0)} L/h.` },
      { question: "Hava debisinden ısı yükü nasıl bulunur?", answer: "Q (kW) ≈ hava debisi (m³/h) × ΔT / 2985. 1000 m³/h ve 10 K için yaklaşık 3,35 kW." },
    ],
    sources: "Bağıntı: Q = ṁ·cp·ΔT. Hava için ρ = 1,2 kg/m³, cp = 1005 J/kgK; su için ρ ≈ 1000 kg/m³, cp ≈ 4180 J/kgK (ılık su için yaklaşık değerler). Hesap testte bilinen değerlerle doğrulanır.",
  };
}

const CONTENT: Record<ThermalKind, () => Content> = { uvalue: uContent, pump: pumpContent, lmtd: lmtdContent, flowheat: flowContent };

export function thermalMetadata(kind: ThermalKind): Metadata {
  const c = CONTENT[kind]();
  const path = THERMAL_PATHS[kind];
  return {
    title: c.metaTitle,
    description: c.description,
    alternates: { canonical: path },
    openGraph: { title: c.metaTitle, description: c.description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
  };
}

export default function ThermalPage({ kind }: { kind: ThermalKind }) {
  const c = CONTENT[kind]();
  const path = THERMAL_PATHS[kind];
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
      tool={<ThermalTool kind={kind} />}
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
      <h2 id="kaynaklar">Kaynaklar ve doğrulama</h2>
      <p>{c.sources}</p>
    </TimeToolPage>
  );
}
