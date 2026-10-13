// Hidrolik/pnömatik silindir ve elektrik (kVA, kompanzasyon, motor devri, renk kodu) sayfaları.
// Tablolar ve örnekler formüllerden üretilir.
import type { ReactNode } from "react";
import Link from "@/app/components/SiteLink";
import { COLORS, compensationVar, currentFromApparent, synchronousSpeed } from "../../converter/electrical/power";
import { annulusArea, cylinderForce, freeAirVolume, HYDRAULIC_BORES, pistonArea, PNEUMATIC_BORES, pistonSpeed, strokeVolume } from "../../converter/fluidpower/cylinder";
import { formatTr } from "../../converter/metal/metalWeight";
import { CompensationTool, ColorCodeTool, KvaTool, MotorSpeedTool } from "../electrical/ElectricalTools";
import { HydraulicTool, PneumaticTool } from "../fluidpower/FluidPowerTools";
import DataTable from "../metal/DataTable";
import ToolArticlePage, { toolArticleMetadata, type ToolArticle } from "./ToolArticlePage";

export type EfKind = "hydraulic" | "pneumatic" | "kva" | "compensation" | "motorspeed" | "colorcode";

export const EF_PATHS: Record<EfKind, string> = {
  hydraulic: "/hidrolik-silindir-hesaplama",
  pneumatic: "/pnomatik-silindir-hesaplama",
  kva: "/kva-kw-hesaplama",
  compensation: "/kompanzasyon-hesaplama",
  motorspeed: "/motor-devir-hesaplama",
  colorcode: "/direnc-renk-kodu",
};

const f = formatTr;

function hydraulic(): ToolArticle {
  const Ap = pistonArea(100);
  const Aa = annulusArea(100, 56);
  const pressures = [100, 160, 250];
  return {
    path: EF_PATHS.hydraulic,
    metaTitle: "Hidrolik Silindir Hesaplama: Kuvvet ve Hız",
    description: `Hidrolik silindirin itme ve çekme kuvveti, gereken basınç, piston hızı, strok süresi ve yağ hacmi. Ø100 piston 160 bar'da ${f(cylinderForce(160, Ap) / 1000, 1)} kN iter.`,
    h1: "Hidrolik Silindir Hesaplama",
    intro: "Piston ve rot çapını, basıncı ve pompa debisini girin. İtme ve çekme kuvvetini, istenen kuvvet için gereken basıncı, çıkış ve dönüş hızlarını, strok süresini ve strok başına yağ hacmini görün.",
    sections: [
      {
        id: "formul",
        title: "Silindir kuvveti nasıl hesaplanır?",
        body: (
          <>
            <p>
              Kuvvet basınç × alandır: F = p · A. İtmede tüm piston alanı (A = π·D²/4), çekmede rotun kapladığı alan çıkarılmış halka alanı (A = π·(D² − d²)/4) çalışır. Pratik birimlerle 1 bar basınç 1 mm²
              alana 0,1 N kuvvet uygular.
            </p>
            <p>
              Örnek: Ø100 piston, Ø56 rot, 160 bar. Piston alanı {f(Ap / 100, 1)} cm², itme kuvveti <strong>{f(cylinderForce(160, Ap) / 1000, 1)} kN</strong>; halka alanı {f(Aa / 100, 1)} cm², çekme kuvveti{" "}
              <strong>{f(cylinderForce(160, Aa) / 1000, 1)} kN</strong>. 40 L/dk debide çıkış hızı {f(pistonSpeed(40, Ap) * 1000, 0)} mm/s, dönüş hızı {f(pistonSpeed(40, Aa) * 1000, 0)} mm/s olur; dönüş daha
              hızlıdır çünkü aynı debi daha küçük alanı doldurur.
            </p>
          </>
        ),
      },
      {
        id: "kuvvet-tablosu",
        title: "Piston çapına göre itme kuvveti",
        body: (
          <DataTable
            caption="Teorik itme kuvveti (kN); piston çapları ISO 3320 serisinden"
            head={["Piston çapı", "Alan (cm²)", ...pressures.map((p) => `${p} bar`)]}
            rows={HYDRAULIC_BORES.map((D) => [`Ø${D}`, f(pistonArea(D) / 100, 1), ...pressures.map((p) => f(cylinderForce(p, pistonArea(D)) / 1000, 1))])}
          />
        ),
      },
      {
        id: "hiz",
        title: "Hız, debi ve strok süresi",
        body: (
          <p>
            Piston hızı v = Q / A&apos;dır. Debi sabitken büyük çaplı silindir daha yavaş hareket eder. Bir strokta silindire giren yağ hacmi alan × stroktur: Ø100 piston 500 mm strokta {f(strokeVolume(Ap, 500), 2)} litre
            yağ ister. Pompa debisi bu hacmi istenen sürede dolduracak kadar seçilir.
          </p>
        ),
      },
      {
        id: "dikkat",
        title: "Teorik kuvvet ile gerçek kuvvet",
        body: (
          <p>
            Hesaplanan değer teorik kuvvettir; conta sürtünmesi ve hat kayıpları gerçek kuvveti biraz azaltır. Silindirin ve hortumların izin verilen çalışma basıncı üretici belgesinden kontrol edilmelidir. Uzun
            stroklu ve basma yönünde yüklenen silindirlerde rotun burkulması ayrıca hesaplanır; bunun için <Link href="/burkulma-hesaplama">burkulma hesabını</Link> kullanabilirsiniz.
          </p>
        ),
      },
    ],
    faq: [
      { question: "Hidrolik silindir kuvveti nasıl hesaplanır?", answer: "F (N) = p (bar) × A (mm²) × 0,1. İtmede A = π·D²/4, çekmede A = π·(D² − d²)/4." },
      { question: "100 bar'da Ø63 silindir kaç ton iter?", answer: `Ø63 piston alanı ${f(pistonArea(63) / 100, 2)} cm²; 100 bar'da ${f(cylinderForce(100, pistonArea(63)) / 1000, 1)} kN, yani yaklaşık ${f(cylinderForce(100, pistonArea(63)) / 9806.65, 2)} tonluk kuvvet.` },
      { question: "Silindir hızı nasıl hesaplanır?", answer: "v (m/s) = Q (L/dk) / (A (mm²) × 0,06). Örneğin Ø50 pistona 10 L/dk debi yaklaşık 85 mm/s hız verir." },
    ],
    sources: "Bağıntılar: F = p·A, v = Q/A. Piston çapı serisi: ISO 3320. Hesaplar testte bilinen değerlerle (Ø100, 100 bar → 78,5 kN) ve ters dönüşümlerle doğrulanır.",
  };
}

function pneumatic(): ToolArticle {
  const pressures = [4, 6, 8];
  const V = strokeVolume(pistonArea(50), 100) + strokeVolume(annulusArea(50, 20), 100);
  return {
    path: EF_PATHS.pneumatic,
    metaTitle: "Pnömatik Silindir Kuvveti ve Hava Tüketimi",
    description: `Pnömatik silindirin itme ve çekme kuvveti, çevrim başına serbest hava ve kompresörden çekilen NL/dk tüketimi. Ø50 silindir 6 bar'da teorik ${f(cylinderForce(6, pistonArea(50)), 0)} N iter.`,
    h1: "Pnömatik Silindir Hesaplama",
    intro: "Piston ve rot çapını, çalışma basıncını, verimi, stroku ve dakikadaki çevrim sayısını girin. Silindir kuvvetini ve kompresör seçiminde gereken hava tüketimini (NL/dk) görün.",
    sections: [
      {
        id: "kuvvet",
        title: "Pnömatik silindir kuvveti",
        body: (
          <>
            <p>
              Kuvvet hidrolikteki gibi F = p · A ile bulunur, ancak havada sürtünmenin payı daha büyüktür; pratikte teorik kuvvet bir verimle çarpılır. Araçta verim kutusuna üreticinin önerdiği değeri girin.
            </p>
            <DataTable
              caption="Teorik itme kuvveti (N); piston çapları ISO 15552 / ISO 6432 serisinden"
              head={["Piston çapı", ...pressures.map((p) => `${p} bar`)]}
              rows={PNEUMATIC_BORES.map((D) => [`Ø${D}`, ...pressures.map((p) => f(cylinderForce(p, pistonArea(D)), 0))])}
            />
          </>
        ),
      },
      {
        id: "hava",
        title: "Hava tüketimi nasıl hesaplanır?",
        body: (
          <p>
            Silindirin her strokta doldurduğu hacim, çalışma basıncında sıkıştırılmış havadır. Kompresörün sağlaması gereken serbest hava miktarı bu hacmin mutlak basınç oranıyla çarpılmasıyla bulunur: V<sub>serbest</sub> =
            V · (p + 1,013) / 1,013. Ø50/Ø20, 100 mm stroklu çift etkili bir silindir bir gidiş-dönüşte {f(V, 3)} L hacim doldurur; 6 bar&apos;da bu {f(freeAirVolume(V, 6), 2)} normal litre serbest havaya karşılık
            gelir. Dakikada 10 çevrimde tüketim {f(freeAirVolume(V, 6) * 10, 1)} NL/dk olur. Hortum ve valf ölü hacimleri bu değere eklenir.
          </p>
        ),
      },
      {
        id: "kompresor",
        title: "Kompresör seçimi için toplam tüketim",
        body: (
          <p>
            Tesisteki bütün silindirlerin NL/dk tüketimleri toplanır, eş zamanlı çalışma oranı ve kaçaklar için pay eklenir. Kompresörün katalogda verdiği hava debisi, aynı ölçüm koşullarında (serbest hava) bu
            toplamı karşılamalıdır.
          </p>
        ),
      },
    ],
    faq: [
      { question: "6 bar'da Ø32 silindir kaç N iter?", answer: `Teorik olarak ${f(cylinderForce(6, pistonArea(32)), 0)} N; %85 verimle yaklaşık ${f(cylinderForce(6, pistonArea(32), 0.85), 0)} N.` },
      { question: "NL/dk ne demek?", answer: "Normal litre/dakika: tüketimin atmosfer basıncına (serbest havaya) indirgenmiş değeridir; kompresör debileri bu birimle karşılaştırılır." },
      { question: "Hava tüketimi formülü nedir?", answer: "Strok hacmi × (çalışma basıncı + 1,013) / 1,013 × çevrim sayısı. Çift etkili silindirde itme ve dönüş hacimleri toplanır." },
    ],
    sources: "Bağıntılar: F = p·A; serbest hava V·(p + p_atm)/p_atm, p_atm = 1,01325 bar. Piston çapı serileri: ISO 15552 ve ISO 6432. Hesaplar testte doğrulanır.",
  };
}

function kva(): ToolArticle {
  const sizes = [5, 10, 15, 20, 30, 50, 75, 100, 160, 250, 400, 630, 1000];
  return {
    path: EF_PATHS.kva,
    metaTitle: "kVA kW Hesaplama ve Dönüşüm",
    description: "kVA'yı kW'a, kW'ı kVA'ya ve akıma çevirin; güç faktörüyle aktif, reaktif ve görünür gücü hesaplayın. Jeneratör ve trafo gücüne göre tek ve üç fazlı akım tablosu.",
    h1: "kVA kW Hesaplama",
    intro: "Aktif güç (kW), görünür güç (kVA) ya da akımdan birini, güç faktörünü ve gerilimi girin. Güç üçgeninin üç kenarını ve hat akımını görün.",
    sections: [
      {
        id: "fark",
        title: "kVA ile kW arasındaki fark",
        body: (
          <p>
            kW, işe dönüşen aktif güçtür. kVA ise kablonun ve kaynağın taşıması gereken görünür güçtür. İkisi arasındaki oran güç faktörüdür: P (kW) = S (kVA) × cos φ. Jeneratör ve trafolar kVA ile anılır, çünkü
            ısınmalarını belirleyen akımdır, yükün güç faktörü değil. 100 kVA&apos;lık bir jeneratör cos φ = 0,8 olan bir yüke 80 kW verir.
          </p>
        ),
      },
      {
        id: "tablo",
        title: "kVA'ya göre akım tablosu",
        body: (
          <DataTable
            caption="Görünür güce göre hat akımı (A)"
            head={["Güç", "Üç faz 400 V", "Tek faz 230 V", "cos φ 0,8'de kW"]}
            rows={sizes.map((s) => [`${s} kVA`, f(currentFromApparent(s * 1000, 400, "three"), 1), f(currentFromApparent(s * 1000, 230, "single"), 1), f(s * 0.8, 1)])}
          />
        ),
      },
      {
        id: "formuller",
        title: "Formüller",
        body: (
          <ul>
            <li>S = P / cos φ, Q = √(S² − P²)</li>
            <li>Üç faz: I = S / (√3 · U), U fazlar arası gerilim</li>
            <li>Tek faz: I = S / U</li>
          </ul>
        ),
      },
    ],
    faq: [
      { question: "1 kVA kaç kW?", answer: "Güç faktörüne bağlıdır: kW = kVA × cos φ. cos φ 0,8 ise 1 kVA = 0,8 kW; dirençli yükte (cos φ = 1) 1 kVA = 1 kW." },
      { question: "100 kVA kaç amper çeker?", answer: `400 V üç fazda yaklaşık ${f(currentFromApparent(100e3, 400, "three"), 0)} A, 230 V tek fazda ${f(currentFromApparent(100e3, 230, "single"), 0)} A.` },
      { question: "Jeneratör neden kVA ile satılır?", answer: "Jeneratörün ısınmasını ve sınırını akım belirler; akım görünür güçle (kVA) orantılıdır. Verilebilecek kW, yükün güç faktörüne göre değişir." },
    ],
    sources: "Bağıntılar: AC güç üçgeni (S² = P² + Q²) ve üç fazlı güç P = √3·U·I·cos φ. Hesaplar testte doğrulanır (100 kVA, 400 V → 144,3 A).",
  };
}

function compensation(): ToolArticle {
  const c1s = [0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9];
  const c2s = [0.9, 0.95, 0.98, 1];
  return {
    path: EF_PATHS.compensation,
    metaTitle: "Kompanzasyon Hesabı: kVAr ve Kondansatör",
    description: `Güç faktörünü düzeltmek için gereken kondansatör gücü (kVAr) ve faz başına µF değeri. 100 kW yükte cos φ 0,8'den 0,95'e çıkmak için ${f(compensationVar(100e3, 0.8, 0.95) / 1000, 1)} kVAr gerekir.`,
    h1: "Kompanzasyon Hesabı",
    intro: "Yükün aktif gücünü, mevcut ve hedef güç faktörünü, gerilimi ve frekansı girin. Gereken kondansatör gücünü (kVAr), bağlantı tipine göre faz başına kapasiteyi ve görünür güçteki azalmayı görün.",
    sections: [
      {
        id: "formul",
        title: "Kompanzasyon formülü",
        body: (
          <p>
            Endüktif yükler (motor, balast, trafo) şebekeden reaktif güç çeker. Bunu yerinde karşılayan kondansatörün gücü Qc = P · (tan φ1 − tan φ2) ile bulunur. Kapasite Qc = 2π·f·C·U² bağıntısından
            hesaplanır; üçgen bağlı bankta her kondansatör fazlar arası gerilimi gördüğü için yıldız bağlantıya göre üç kat küçük kapasite yeter.
          </p>
        ),
      },
      {
        id: "katsayi",
        title: "Kompanzasyon katsayı tablosu",
        body: (
          <>
            <p>Aktif gücü (kW) tablodaki katsayıyla çarpınca gereken kVAr bulunur.</p>
            <DataTable
              caption="tan φ1 − tan φ2 katsayıları"
              head={["Mevcut cos φ1", ...c2s.map((c) => `Hedef ${f(c, 2)}`)]}
              rows={c1s.map((c1) => [f(c1, 2), ...c2s.map((c2) => f(compensationVar(1, c1, c2), 3))])}
            />
          </>
        ),
      },
      {
        id: "dikkat",
        title: "Uygulamada dikkat edilecekler",
        body: (
          <p>
            Türkiye&apos;de tüketicinin çekebileceği reaktif enerji oranları EPDK düzenlemeleriyle belirlenir ve aşıldığında ayrıca bedel ödenir; güncel sınırları dağıtım şirketinizden öğrenin. Harmonikli yüklerin
            (sürücüler, UPS, LED sürücüler) bulunduğu tesislerde kondansatörler rezonansa girebilir; bu durumda harmonik filtreli (reaktörlü) kompanzasyon gerekir. Kompanzasyon panosu yetkili elektrik mühendisi
            tarafından projelendirilmelidir.
          </p>
        ),
      },
    ],
    faq: [
      { question: "Kompanzasyon kVAr nasıl hesaplanır?", answer: "Qc (kVAr) = P (kW) × (tan φ1 − tan φ2). Örneğin 100 kW yükü 0,8'den 0,95'e çıkarmak için yaklaşık 42,1 kVAr." },
      { question: "1 kVAr kaç µF?", answer: "Gerilime bağlıdır: 230 V, 50 Hz'de yaklaşık 60,2 µF; 400 V'ta yaklaşık 19,9 µF." },
      { question: "Güç faktörü 1 yapılmalı mı?", answer: "Genellikle hayır. 1'e çok yakın hedefler aşırı kompanzasyon (kapasitif yük) riskini artırır; hedef değer düzenlemeye ve tesis yapısına göre seçilir." },
    ],
    sources: "Bağıntılar: Qc = P(tan φ1 − tan φ2), Q = 2π·f·C·U². Hesaplar testte doğrulanır (100 kW, 0,8 → 0,95: 42,13 kVAr; 1 kVAr, 230 V, 50 Hz: 60,2 µF).",
  };
}

function motorSpeed(): ToolArticle {
  return {
    path: EF_PATHS.motorspeed,
    metaTitle: "Motor Devri Hesaplama (Kutup Sayısı)",
    description: "Asenkron motorun senkron devrini kutup sayısı ve frekanstan, kaymayı etiket devrinden hesaplayın. 50 ve 60 Hz için kutup sayısına göre devir tablosu.",
    h1: "Motor Devri Hesaplama",
    intro: "Şebeke frekansını ve motorun kutup sayısını seçin; senkron devri görün. Motor etiketindeki devri girerseniz kaymayı ve rotor frekansını da hesaplar.",
    sections: [
      {
        id: "formul",
        title: "Senkron devir formülü",
        body: (
          <p>
            Döner manyetik alanın hızı ns = 120 · f / p&apos;dir (f frekans, p kutup sayısı). Asenkron motorun rotoru bu hızın biraz altında döner; aradaki fark kaymadır. Etikette 1450 dev/dk yazan 4 kutuplu bir
            motorun senkron devri 1500 dev/dk, kayması yaklaşık %3,3&apos;tür.
          </p>
        ),
      },
      {
        id: "tablo",
        title: "Kutup sayısına göre devir tablosu",
        body: (
          <DataTable
            caption="Senkron devir (dev/dk)"
            head={["Kutup sayısı", "50 Hz", "60 Hz"]}
            rows={[2, 4, 6, 8, 10, 12].map((p) => [`${p} kutup`, f(synchronousSpeed(50, p), 0), f(synchronousSpeed(60, p), 0)])}
          />
        ),
      },
      {
        id: "surucu",
        title: "Frekans sürücüsü ile devir",
        body: (
          <p>
            Devir frekansla doğru orantılıdır; frekans sürücüsü (inverter) frekansı değiştirerek motoru farklı devirlerde çalıştırır. 4 kutuplu bir motor 25 Hz&apos;de yaklaşık {f(synchronousSpeed(25, 4), 0)} dev/dk senkron
            devre iner. Motorun tork ve güç sınırları düşük ve yüksek frekansta değişir; üretici verisine bakın. Mil torkunu bulmak için{" "}
            <Link href="/mil-burulma-hesaplama">mil burulma hesabını</Link> kullanabilirsiniz.
          </p>
        ),
      },
    ],
    faq: [
      { question: "4 kutuplu motor kaç devir?", answer: "50 Hz'de senkron devir 1500 dev/dk; yük altında etiket devri genellikle bunun biraz altındadır (ör. 1450 dev/dk)." },
      { question: "Kayma nasıl hesaplanır?", answer: "Kayma (%) = (ns − n) / ns × 100. ns senkron devir, n gerçek devirdir." },
      { question: "2 kutuplu motor neden 3000 değil 2900 civarı döner?", answer: "Asenkron motorda rotorun tork üretebilmesi için alanın gerisinde kalması gerekir; bu fark kaymadır ve yükle artar." },
    ],
    sources: "Bağıntı: ns = 120·f/p, kayma s = (ns − n)/ns. Hesaplar testte doğrulanır (50 Hz, 4 kutup → 1500 dev/dk).",
  };
}

function colorCode(): ToolArticle {
  const x = (n: number | null) => (n === null ? "–" : String(n));
  return {
    path: EF_PATHS.colorcode,
    metaTitle: "Direnç Renk Kodu Hesaplama (4, 5, 6 Bant)",
    description: "Direnç renk bantlarından değeri, toleransı ve sıcaklık katsayısını bulun ya da değerden renkleri hesaplayın. 4, 5 ve 6 bantlı dirençler için IEC 60062 renk tablosu.",
    h1: "Direnç Renk Kodu Hesaplama",
    intro: "Bant sayısını seçin ve renkleri girin; direnç değerini, tolerans aralığını ve sıcaklık katsayısını görün. Ya da değeri yazın, hangi renklerle kodlandığını bulun.",
    sections: [
      {
        id: "tablo",
        title: "Renk kodu tablosu",
        body: (
          <DataTable
            caption="IEC 60062 direnç renk kodu"
            head={["Renk", "Hane", "Çarpan", "Tolerans (%)", "Sıcaklık katsayısı (ppm/K)"]}
            rows={COLORS.map((c) => [c.tr, x(c.digit), c.multiplier >= 1 ? `×${c.multiplier.toLocaleString("tr-TR")}` : `×${String(c.multiplier).replace(".", ",")}`, c.tolerance === null ? "–" : `±${String(c.tolerance).replace(".", ",")}`, x(c.tempco)])}
          />
        ),
      },
      {
        id: "okuma",
        title: "Renk kodu nasıl okunur?",
        body: (
          <>
            <p>
              4 bantlı dirençte ilk iki bant hane, üçüncüsü çarpan, dördüncüsü toleranstır. 5 bantlıda ilk üç bant hanedir. 6 bantlıda sona sıcaklık katsayısı eklenir. Tolerans bandı genellikle diğerlerinden biraz
              uzakta durur; okumaya karşı uçtan başlayın.
            </p>
            <ul>
              <li>Sarı – mor – kırmızı – altın: 47 × 100 = 4,7 kΩ ±%5</li>
              <li>Kahverengi – siyah – siyah – kahverengi – kahverengi: 100 × 10 = 1 kΩ ±%1</li>
              <li>Kırmızı – kırmızı – altın – altın: 22 × 0,1 = 2,2 Ω ±%5</li>
            </ul>
          </>
        ),
      },
    ],
    faq: [
      { question: "Kahverengi siyah kırmızı altın kaç ohm?", answer: "10 × 100 = 1000 Ω, yani 1 kΩ, toleransı ±%5." },
      { question: "4,7k direncin renkleri nedir?", answer: "4 bantta sarı – mor – kırmızı, ardından tolerans bandı (ör. altın ±%5)." },
      { question: "Altın ve gümüş bant ne anlama gelir?", answer: "Tolerans bandında altın ±%5, gümüş ±%10'dur. Çarpan bandında altın ×0,1, gümüş ×0,01'dir." },
    ],
    sources: "Renk kodu: IEC 60062 (dirençler ve kondansatörler için işaretleme kodları). Kod çözme ve kodlama testte bilinen örneklerle doğrulanır.",
  };
}

const ARTICLES: Record<EfKind, () => ToolArticle> = { hydraulic, pneumatic, kva, compensation, motorspeed: motorSpeed, colorcode: colorCode };
const TOOLS: Record<EfKind, () => ReactNode> = {
  hydraulic: () => <HydraulicTool />,
  pneumatic: () => <PneumaticTool />,
  kva: () => <KvaTool />,
  compensation: () => <CompensationTool />,
  motorspeed: () => <MotorSpeedTool />,
  colorcode: () => <ColorCodeTool />,
};

export const efMetadata = (kind: EfKind) => toolArticleMetadata(ARTICLES[kind]());

export default function ElectricalFluidPage({ kind }: { kind: EfKind }) {
  return <ToolArticlePage article={ARTICLES[kind]()} tool={TOOLS[kind]()} />;
}
