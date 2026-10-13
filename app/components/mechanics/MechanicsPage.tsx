// Statik ve mukavemet sayfaları: kiriş, kesit özellikleri (atalet momenti), Euler burkulma, mil burulması.
// Metinlerdeki sayısal örnekler hesap motorundan üretilir.
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "@/app/components/SiteLink";
import { ENGINEERING_FLOWS } from "../../converter/engineeringFlows";
import type { FaqItem } from "../../converter/faqSchema";
import { E_STEEL, G_STEEL, solveBeam } from "../../converter/mechanics/beam";
import { BUCKLING_K, eulerLoad, requiredSolidDiameter, sectionProps, shaftShearStress, shaftTwist, torqueFromPower } from "../../converter/mechanics/section";
import { formatTr } from "../../converter/metal/metalWeight";
import { STEEL_SECTIONS } from "../../converter/metal/steelSections";
import { buildSiteUrl } from "../../siteConfig";
import EngineeringNextSteps from "../engineering/EngineeringNextSteps";
import DataTable from "../metal/DataTable";
import TimeToolPage from "../time/TimeToolPage";
import MechanicsTool, { type MechanicsKind } from "./MechanicsTools";

export const MECHANICS_PATHS: Record<MechanicsKind, string> = {
  beam: "/kiris-hesaplama",
  section: "/atalet-momenti-hesaplama",
  buckling: "/burkulma-hesaplama",
  shaft: "/mil-burulma-hesaplama",
};

const f = formatTr;
type Section = { id: string; title: string; body: ReactNode };
type Content = { metaTitle: string; description: string; h1: string; intro: string; sections: Section[]; faq: FaqItem[]; sources: string };

const LIMITS: Section = {
  id: "sinirlar",
  title: "Varsayımlar ve sınırlar",
  body: (
    <p>
      Hesaplar doğrusal elastik malzeme, küçük şekil değiştirme ve prizmatik (boyunca aynı kesitli) eleman varsayar. Kayma şekil değiştirmesi, yanal burulmalı burkulma, yerel burkulma, bağlantı esnekliği ve
      gerilme yığılmaları hesaba katılmaz. Sonuçlar ön boyutlandırma, ödev ve kontrol içindir; taşıyıcı sistem kararları ilgili standarda (ör. TS EN 1993) göre yetkili mühendisin hesabıyla verilmelidir.
    </p>
  ),
};

/* ---------------- Kiriş ---------------- */

function beamContent(): Content {
  const ipe = STEEL_SECTIONS.IPE.find((s) => s.size === 200)!;
  const L = 5;
  const P = 10_000;
  const EI = E_STEEL * ipe.Iy * 1e-8;
  const r = solveBeam({ support: "simple", L, EI, loads: [{ kind: "point", P, a: L / 2 }] });
  const sigma = Math.abs(r.maxMoment) / (ipe.Wely * 1e-6) / 1e6;
  const cant = solveBeam({ support: "cantilever", L, EI, loads: [{ kind: "point", P, a: L }] });
  const fixed = solveBeam({ support: "fixed", L, EI, loads: [{ kind: "point", P, a: L / 2 }] });
  return {
    metaTitle: "Kiriş Hesabı: Sehim, Moment ve Gerilme",
    description: `Basit mesnetli, konsol ve ankastre kirişte sehim, en büyük moment, mesnet tepkileri ve eğilme gerilmesi. IPE, HEA, HEB profil seçin, tekil ve yayılı yük girin; diyagramları görün.`,
    h1: "Kiriş Hesabı: Sehim, Moment ve Gerilme",
    intro:
      "Mesnet tipini seçin, kesiti çelik profil tablosundan ya da ölçüyle tanımlayın, tekil ve yayılı yükleri girin. En büyük sehimi, momenti, eğilme gerilmesini ve mesnet tepkilerini moment ve sehim diyagramlarıyla birlikte görün.",
    sections: [
      {
        id: "formuller",
        title: "Kiriş sehim ve moment formülleri",
        body: (
          <>
            <p>Araç aşağıdaki tablo formüllerini kullanır ve birden fazla yükü süperpozisyonla toplar. P tekil yük, w metre başına yayılı yük, L açıklık, E elastisite modülü, I atalet momentidir.</p>
            <DataTable
              caption="Tek açıklıklı kirişlerde en büyük moment ve sehim"
              head={["Durum", "En büyük moment", "En büyük sehim", "Tepkiler"]}
              rows={[
                ["Basit mesnet, ortada P", "PL/4", "PL³ / 48EI", "P/2 ve P/2"],
                ["Basit mesnet, yayılı w", "wL²/8", "5wL⁴ / 384EI", "wL/2 ve wL/2"],
                ["Konsol, uçta P", "PL (ankastrede)", "PL³ / 3EI (uçta)", "P"],
                ["Konsol, yayılı w", "wL²/2 (ankastrede)", "wL⁴ / 8EI (uçta)", "wL"],
                ["İki ucu ankastre, ortada P", "PL/8", "PL³ / 192EI", "P/2 ve P/2"],
                ["İki ucu ankastre, yayılı w", "wL²/12 (uçlarda)", "wL⁴ / 384EI", "wL/2 ve wL/2"],
              ]}
            />
          </>
        ),
      },
      {
        id: "ornek",
        title: "Örnek: IPE 200 kirişin sehimi",
        body: (
          <>
            <p>
              5 m açıklıklı, basit mesnetli bir IPE 200 kirişin ortasına 10 kN yük gelsin (öz ağırlık ihmal). IPE 200&apos;ün güçlü eksen atalet momenti {f(ipe.Iy, 0)} cm⁴, yapı çeliğinin elastisite modülü 210 GPa&apos;dır.
            </p>
            <ul>
              <li>
                En büyük moment: PL/4 = 10 × 5 / 4 = <strong>{f(Math.abs(r.maxMoment) / 1000, 2)} kN·m</strong>
              </li>
              <li>
                En büyük sehim: PL³ / 48EI = <strong>{f(Math.abs(r.maxDeflection) * 1000, 2)} mm</strong>, yani L/{f(L / Math.abs(r.maxDeflection), 0)}
              </li>
              <li>
                Eğilme gerilmesi: M / Wel = {f(Math.abs(r.maxMoment) / 1000, 2)} kN·m / {f(ipe.Wely, 1)} cm³ = <strong>{f(sigma, 1)} MPa</strong>
              </li>
            </ul>
            <p>
              Aynı kiriş ve yük için mesnet tipi sonucu büyük ölçüde değiştirir: konsol olarak uçta {f(Math.abs(cant.maxDeflection) * 1000, 1)} mm, iki ucu ankastre olarak {f(Math.abs(fixed.maxDeflection) * 1000, 2)} mm
              sehim yapar. Ankastre mesnet sehimi basit mesnetin dörtte birine indirir.
            </p>
          </>
        ),
      },
      {
        id: "sehim-siniri",
        title: "Sehim sınırı (L/300) ne demek?",
        body: (
          <p>
            Sehim çoğunlukla açıklığın bir kesri olarak sınırlandırılır: L/300, 6 m&apos;lik bir kirişte 20 mm demektir. Kullanılacak oranı yapının türü, kaplama ve kullanım koşulları belirler; değeri ilgili standart
            ve proje şartnamesinden alın. Araçtaki L/300 yalnızca başlangıç değeridir, kutuya kendi oranınızı yazabilirsiniz.
          </p>
        ),
      },
      {
        id: "eksen",
        title: "Güçlü eksen, zayıf eksen ve öz ağırlık",
        body: (
          <p>
            I profil gövdesi düşey dururken yükü güçlü ekseninde (y) taşır. Profil yatırılırsa zayıf eksen (z) çalışır ve sehim katlanarak artar: IPE 200&apos;de Iy/Iz oranı {f(ipe.Iy / ipe.Iz, 1)}&apos;dir. Öz ağırlık
            kutusu işaretliyken profilin metre ağırlığı ({f(ipe.G, 1)} kg/m gibi) yayılı yüke eklenir; uzun açıklıklarda bu katkı küçümsenemez.
          </p>
        ),
      },
      LIMITS,
    ],
    faq: [
      { question: "Kiriş sehimi nasıl hesaplanır?", answer: "Basit mesnetli kirişte ortadaki tekil yük için δ = PL³ / (48EI), yayılı yük için δ = 5wL⁴ / (384EI). Araç mesnet tipine göre doğru formülü seçer ve yükleri toplar." },
      { question: "IPE 200 kaç metre açıklık geçer?", answer: `Bu, yüke ve sehim sınırına bağlıdır. Örneğin 5 m açıklıkta ortaya gelen 10 kN yük IPE 200'de yaklaşık ${f(Math.abs(r.maxDeflection) * 1000, 1)} mm sehim yapar. Kendi yükünüzle araçta deneyin; kesin seçim statik hesapla yapılır.` },
      { question: "Ankastre kiriş ile basit mesnetli kiriş farkı nedir?", answer: "Ankastre uçlar dönmeyi engeller; ortadaki tekil yükte sehim basit mesnetin dörtte birine, en büyük moment yarısına iner. Buna karşılık mesnetlerde moment oluşur ve bağlantı bunu taşıyacak şekilde yapılmalıdır." },
    ],
    sources: "Formüller: Gere & Goodno, Mechanics of Materials, kiriş sehim tabloları. Elastisite modülü: TS EN 1993-1-1 (E = 210 GPa), TS EN 1999-1-1 (alüminyum, 70 GPa). Profil değerleri: ArcelorMittal profil kataloğu (EN 10365). Hesap motoru her durum için denge, sınır koşulları ve EI·v'' = −M bağıntısıyla testte doğrulanır.",
  };
}

/* ---------------- Kesit / atalet momenti ---------------- */

function sectionContent(): Content {
  const a = sectionProps({ kind: "rectangle", b: 50, h: 100 });
  const b = sectionProps({ kind: "rectangle", b: 100, h: 50 });
  const ipe = STEEL_SECTIONS.IPE.find((s) => s.size === 300)!;
  const approx = sectionProps({ kind: "i", b: ipe.b, h: ipe.h, tw: ipe.tw, tf: ipe.tf });
  return {
    metaTitle: "Atalet Momenti Hesaplama ve Kesit Özellikleri",
    description: "Dikdörtgen, daire, boru, kutu ve I kesitin atalet momenti, kesit modülü, atalet yarıçapı ve alanını hesaplayın; IPE, HEA, HEB gibi hazır profillerin değerlerini görün.",
    h1: "Atalet Momenti Hesaplama",
    intro:
      "Kesit şeklini seçip ölçüleri girin ya da çelik profil tablosundan bir profil seçin. Her iki eksen için atalet momentini, kesit modülünü, atalet yarıçapını, alanı ve çelik metre ağırlığını görün.",
    sections: [
      {
        id: "formuller",
        title: "Atalet momenti formülleri",
        body: (
          <DataTable
            caption="Temel kesitlerde atalet momenti (I) ve kesit modülü (W)"
            head={["Kesit", "I (güçlü eksen)", "W", "Not"]}
            rows={[
              ["Dikdörtgen b × h", "b·h³ / 12", "b·h² / 6", "h yükleme yönündeki kenar"],
              ["Dolu daire d", "π·d⁴ / 64", "π·d³ / 32", "J = π·d⁴ / 32"],
              ["Boru D, iç çap d", "π·(D⁴ − d⁴) / 64", "I / (D/2)", "J = 2I"],
              ["Kutu B × H × t", "(B·H³ − bi·hi³) / 12", "I / (H/2)", "bi = B − 2t, hi = H − 2t"],
              ["I kesit", "(b·h³ − (b − tw)·hw³) / 12", "I / (h/2)", "hw = h − 2tf"],
            ]}
          />
        ),
      },
      {
        id: "yukseklik",
        title: "Yükseklik neden bu kadar önemli?",
        body: (
          <p>
            Atalet momenti yüksekliğin küpüyle artar. 50 × 100 mm bir dikdörtgen dik dururken Iy = {f(a.Iy / 1e4, 1)} cm⁴, yatırıldığında {f(b.Iy / 1e4, 1)} cm⁴&apos;tür; aynı malzeme {f(a.Iy / b.Iy, 0)} kat daha rijittir.
            I profillerin malzemeyi başlıklarda, tarafsız eksenden uzakta toplamasının nedeni budur.
          </p>
        ),
      },
      {
        id: "kavramlar",
        title: "Kesit modülü ve atalet yarıçapı",
        body: (
          <ul>
            <li>
              <strong>Kesit modülü W = I / y:</strong> eğilme gerilmesi σ = M / W ile bulunur. Aynı momentte W büyüdükçe gerilme azalır.
            </li>
            <li>
              <strong>Atalet yarıçapı i = √(I / A):</strong> burkulmada narinliği (λ = L / i) belirler. Basınç çubuklarında küçük olan i esas alınır.
            </li>
            <li>
              <strong>Paralel eksen (Steiner) teoremi:</strong> ağırlık merkezinden d kadar uzaktaki eksene göre I = Ic + A·d². Bileşik kesitler parçaların bu şekilde toplanmasıyla hesaplanır.
            </li>
          </ul>
        ),
      },
      {
        id: "katalog",
        title: "Hazır profillerde neden katalog değeri kullanılır?",
        body: (
          <p>
            Haddelenmiş profillerde gövde ile başlık arasında yuvarlak köşe dolguları vardır. Bu dolgular formüldeki keskin köşeli I kesite girmez: IPE 300 için köşesiz formül {f(approx.Iy / 1e4, 0)} cm⁴ verir, katalog değeri{" "}
            {f(ipe.Iy, 0)} cm⁴&apos;tür (fark %{f((ipe.Iy / (approx.Iy / 1e4) - 1) * 100, 1)}). Araçta &quot;Çelik profil&quot; seçildiğinde katalog değerleri kullanılır; tüm değerler için{" "}
            <Link href="/celik-profil-tablolari">çelik profil tablolarına</Link> bakabilirsiniz.
          </p>
        ),
      },
    ],
    faq: [
      { question: "Dikdörtgen kesitin atalet momenti nasıl hesaplanır?", answer: "I = b·h³ / 12. b genişlik, h yükleme yönündeki yüksekliktir. 50 × 100 mm kesit dik dururken 416,7 cm⁴ eder." },
      { question: "Atalet momenti birimi nedir?", answer: "Uzunluğun dördüncü kuvvetidir: mm⁴, cm⁴ veya m⁴. 1 cm⁴ = 10.000 mm⁴. Kesit modülü ise mm³ veya cm³ ile verilir." },
      { question: "Borunun atalet momenti nedir?", answer: "I = π·(D⁴ − d⁴) / 64. Dairesel kesitlerde burulma için kullanılan polar atalet momenti J = 2I'dır." },
    ],
    sources: "Formüller: Gere & Goodno, Mechanics of Materials, kesit özellikleri eki. Profil değerleri: ArcelorMittal profil kataloğu (EN 10365). Hesaplar testte bilinen değerlerle ve boru için ince cidar yaklaşımıyla karşılaştırılır.",
  };
}

/* ---------------- Burkulma ---------------- */

function bucklingContent(): Content {
  const hea = STEEL_SECTIONS.HEA.find((s) => s.size === 200)!;
  const L = 4;
  const Pcr = eulerLoad(E_STEEL, hea.Iz * 1e-8, L, 1);
  const iz = Math.sqrt(hea.Iz / hea.A) * 10;
  const lambda = (L * 1000) / iz;
  const ipe = STEEL_SECTIONS.IPE.find((s) => Math.abs(s.G - hea.G) < 1.5)!;
  const PcrIpe = eulerLoad(E_STEEL, ipe.Iz * 1e-8, L, 1);
  return {
    metaTitle: "Burkulma Hesabı: Euler Kritik Yükü ve Narinlik",
    description: "Euler burkulma yükü, burkulma boyu, narinlik ve kritik gerilme hesabı. Uç koşulunu seçin, IPE, HEA, HEB profil ya da boru, kutu kesit girin; S235 ve S355 için bağıl narinliği görün.",
    h1: "Burkulma Hesabı (Euler)",
    intro:
      "Basınç çubuğunun kesitini, boyunu ve uç koşulunu girin. Euler kritik yükünü, burkulma boyunu, narinliği ve kritik gerilmeyi görün. Hesap kesitin zayıf ekseni için yapılır.",
    sections: [
      {
        id: "formul",
        title: "Euler burkulma formülü",
        body: (
          <>
            <p>
              İdeal, tam doğru ve eksenel yüklü bir çubuk Pcr = π²·E·I / (K·L)² yükünde burkulur. I zayıf eksen atalet momenti, L çubuk boyu, K ise uç koşuluna bağlı burkulma boyu katsayısıdır.
            </p>
            <DataTable
              caption="Uç koşuluna göre teorik burkulma boyu katsayısı"
              head={["Uç koşulu", "K", "Burkulma boyu"]}
              rows={[
                ["İki ucu mafsallı", f(BUCKLING_K["pinned-pinned"], 1), "L"],
                ["Bir ucu ankastre, diğeri serbest", f(BUCKLING_K["fixed-free"], 1), "2L"],
                ["Bir ucu ankastre, diğeri mafsallı", f(BUCKLING_K["fixed-pinned"], 1), "0,7L"],
                ["İki ucu ankastre", f(BUCKLING_K["fixed-fixed"], 1), "0,5L"],
              ]}
            />
          </>
        ),
      },
      {
        id: "ornek",
        title: "Örnek: 4 m HEA 200 kolon",
        body: (
          <p>
            İki ucu mafsallı 4 m&apos;lik bir HEA 200 kolonun zayıf eksen atalet momenti {f(hea.Iz, 0)} cm⁴, atalet yarıçapı {f(iz / 10, 2)} cm&apos;dir. Euler yükü Pcr = π² × 210 GPa × {f(hea.Iz, 0)} cm⁴ / (4 m)² ={" "}
            <strong>{f(Pcr / 1000, 0)} kN</strong>, narinlik λ = 4000 / {f(iz, 1)} = <strong>{f(lambda, 1)}</strong>. Hemen hemen aynı ağırlıktaki {`IPE ${ipe.size}`} ({f(ipe.G, 1)} kg/m) ise zayıf ekseni çok daha
            küçük olduğu için yalnızca {f(PcrIpe / 1000, 0)} kN&apos;da burkulur. Kolonlarda geniş başlıklı HE profillerin tercih edilmesinin nedeni budur.
          </p>
        ),
      },
      {
        id: "narinlik",
        title: "Narinlik ve bağıl narinlik",
        body: (
          <p>
            Narinlik λ = K·L / i, çubuğun boyunun kesitine göre ne kadar &quot;ince&quot; olduğunu gösterir. TS EN 1993-1-1&apos;de kullanılan bağıl narinlik λ̄ = λ / λ1 ile bulunur; λ1 = π·√(E / fy) çeliğin akma
            dayanımına bağlıdır. λ̄ küçükken akma, büyükken burkulma belirleyicidir. Araç S235 ve S355 için λ̄ değerini bilgi olarak gösterir.
          </p>
        ),
      },
      {
        id: "gercek",
        title: "Euler yükü taşıma kapasitesi değildir",
        body: (
          <p>
            Gerçek kolonlarda başlangıç eğriliği, yük dış merkezliği ve artık gerilmeler vardır; kapasite Euler yükünün altında kalır ve kısa kolonlarda akma önce gelir. Standartlar bu etkileri burkulma eğrileriyle
            (azaltma katsayısı χ) hesaba katar. Bu araç bir tasarım kontrolü yapmaz; elemanın burkulmaya ne kadar yatkın olduğunu karşılaştırmak için kullanın.
          </p>
        ),
      },
      LIMITS,
    ],
    faq: [
      { question: "Euler burkulma yükü nasıl hesaplanır?", answer: "Pcr = π²·E·I / (K·L)². İki ucu mafsallı çubukta K = 1, bir ucu ankastre diğeri serbest çubukta K = 2'dir." },
      { question: "Burkulmada hangi atalet momenti kullanılır?", answer: "Uç koşulları her iki eksende aynıysa küçük olan atalet momenti, yani zayıf eksen kullanılır. Çubuk o yöne doğru burkulur." },
      { question: "Narinlik nedir?", answer: "λ = K·L / i. i atalet yarıçapıdır (i = √(I/A)). Narinlik arttıkça burkulma yükü narinliğin karesiyle azalır." },
    ],
    sources: "Formül: Euler burkulma bağıntısı (Gere & Goodno, Mechanics of Materials). Bağıl narinlik tanımı: TS EN 1993-1-1 §6.3.1.3. Elastisite modülü: TS EN 1993-1-1 (210 GPa). Profil değerleri: ArcelorMittal profil kataloğu (EN 10365).",
  };
}

/* ---------------- Mil ---------------- */

function shaftContent(): Content {
  const T = torqueFromPower(7500, 1450);
  const tau = shaftShearStress(T, 0.03) / 1e6;
  const dReq = requiredSolidDiameter(T, 40e6) * 1000;
  // Aynı alanlı dolu ve boru mil karşılaştırması
  const Do = 0.04;
  const di = 0.03;
  const dSolid = Math.sqrt(Do * Do - di * di);
  const tauTube = shaftShearStress(100, Do, di);
  const tauSolid = shaftShearStress(100, dSolid);
  const twist = (shaftTwist(T, 1, G_STEEL, 0.03) * 180) / Math.PI;
  return {
    metaTitle: "Mil Burulma Hesabı ve Mil Çapı Hesaplama",
    description: `Motor gücü ve devirden tork, dolu ve boru milde kayma gerilmesi, burulma açısı ve gereken mil çapı. 7,5 kW 1450 dev/dk motor ≈ ${f(T, 1)} N·m.`,
    h1: "Mil Burulma Hesabı",
    intro:
      "Gücü ve devri ya da doğrudan torku girin; mil çapına göre en büyük kayma gerilmesini, burulma açısını ve izin verilen gerilmeye göre gereken dolu mil çapını hesaplayın.",
    sections: [
      {
        id: "tork",
        title: "Güç ve devirden tork",
        body: (
          <p>
            Tork, gücün açısal hıza bölünmesiyle bulunur: T = P / ω, ω = 2π·n / 60. Kilovat ve dev/dk ile pratik biçimi <strong>T (N·m) = 9549 × P (kW) / n (dev/dk)</strong>&apos;dir. Örneğin 7,5 kW, 1450 dev/dk bir
            motor milinde T = {f(T, 1)} N·m tork oluşur.
          </p>
        ),
      },
      {
        id: "gerilme",
        title: "Kayma gerilmesi ve burulma açısı",
        body: (
          <>
            <p>
              Dairesel milde en büyük kayma gerilmesi dış yüzeydedir: τ = T·r / J. Dolu milde J = π·d⁴ / 32 olduğundan τ = 16T / (π·d³). Burulma açısı θ = T·L / (G·J); çelik için G = 81 GPa alınır.
            </p>
            <p>
              Örnek: {f(T, 1)} N·m tork 30 mm dolu milde τ = <strong>{f(tau, 1)} MPa</strong> gerilme ve metre başına {f(twist, 2)}° burulma oluşturur. İzin verilen gerilme 40 MPa seçilirse gereken çap{" "}
              {f(dReq, 1)} mm çıkar.
            </p>
          </>
        ),
      },
      {
        id: "boru-mil",
        title: "Boru mil neden daha verimli?",
        body: (
          <p>
            Burulmada malzemenin dışta olanı daha çok iş görür. Dış çapı 40 mm, iç çapı 30 mm bir boru mil ile aynı kesit alanına (aynı ağırlığa) sahip {f(dSolid * 1000, 1)} mm dolu mili karşılaştırın: aynı tork
            altında boru milin gerilmesi dolu milinkinin yalnızca %{f((tauTube / tauSolid) * 100, 0)}&apos;i kadardır.
          </p>
        ),
      },
      {
        id: "sinirlar",
        title: "Varsayımlar ve sınırlar",
        body: (
          <p>
            Hesap saf burulma altındaki prizmatik dairesel mil içindir. Kama yuvası ve kademelerdeki gerilme yığılması, eğilme ile birleşik zorlanma, yorulma ve kritik devir hesaba katılmaz. Gerçek mil tasarımında
            izin verilen gerilme bu etkileri kapsayacak güvenlik katsayısıyla seçilir; makine elemanları kaynaklarından ve üretici verilerinden yararlanın.
          </p>
        ),
      },
    ],
    faq: [
      { question: "Motor gücünden tork nasıl hesaplanır?", answer: "T (N·m) = 9549 × P (kW) / n (dev/dk). Örneğin 7,5 kW ve 1450 dev/dk için yaklaşık 49,4 N·m." },
      { question: "Mil çapı nasıl hesaplanır?", answer: "Dolu milde d = (16T / (π·τ))^(1/3). τ izin verilen kayma gerilmesidir; araç bunu girdiğiniz değere göre hesaplar." },
      { question: "Burulma açısı formülü nedir?", answer: "θ = T·L / (G·J). G kayma modülü (çelik için 81 GPa), J polar atalet momentidir." },
    ],
    sources: "Formüller: Gere & Goodno, Mechanics of Materials, burulma bölümü. Kayma modülü: TS EN 1993-1-1 (G = 81 GPa). Hesaplar testte bilinen bağıntılarla (τ = 16T/πd³, θ = TL/GJ) doğrulanır.",
  };
}

const CONTENT: Record<MechanicsKind, () => Content> = { beam: beamContent, section: sectionContent, buckling: bucklingContent, shaft: shaftContent };

export function mechanicsMetadata(kind: MechanicsKind): Metadata {
  const c = CONTENT[kind]();
  const path = MECHANICS_PATHS[kind];
  return {
    title: c.metaTitle,
    description: c.description,
    alternates: { canonical: path },
    openGraph: { title: c.metaTitle, description: c.description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
  };
}

export default function MechanicsPage({ kind }: { kind: MechanicsKind }) {
  const c = CONTENT[kind]();
  const path = MECHANICS_PATHS[kind];
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
      tool={<MechanicsTool kind={kind} />}
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
