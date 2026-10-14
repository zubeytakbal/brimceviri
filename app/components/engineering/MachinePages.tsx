// Makine elemanları: metrik vida ve kılavuz matkap, cıvata mukavemet sınıfları, boru dişleri.
// Tüm sayılar app/converter/mechanics/threads.ts'den (ISO formülleri ve standart tabloları) gelir.
import type { ReactNode } from "react";
import Link from "@/app/components/SiteLink";
import { boltLoads, classById, COARSE_THREADS, FINE_THREADS, PIPE_THREADS, PROPERTY_CLASSES, STAINLESS_CLASSES, threadById } from "../../converter/mechanics/threads";
import { formatTr } from "../../converter/metal/metalWeight";
import DataTable from "../metal/DataTable";
import { BoltClassTool, MetricThreadTool, PipeThreadTool } from "../mechanics/ThreadTools";
import ToolArticlePage, { toolArticleMetadata, type ToolArticle } from "./ToolArticlePage";

export type MachineKind = "thread" | "boltclass" | "pipethread";

export const MACHINE_PATHS: Record<MachineKind, string> = {
  thread: "/metrik-vida-tablosu",
  boltclass: "/civata-mukavemet-siniflari",
  pipethread: "/boru-disi-olculeri",
};

const f = formatTr;
const kN = (n: number) => f(n / 1000, 1);

/* ---------------- Metrik vida ---------------- */

function threadArticle(): ToolArticle {
  const m8 = threadById("M8")!;
  const m10 = threadById("M10")!;
  const m12 = threadById("M12")!;
  const withClear = COARSE_THREADS.filter((t) => t.clearance);
  return {
    path: MACHINE_PATHS.thread,
    metaTitle: "Metrik Vida Tablosu ve Kılavuz Matkap Çapı",
    description: `M1–M64 metrik vida adımı, kılavuz matkap çapı, geçiş deliği ve anahtar ağzı tablosu. M8 adımı ${f(m8.P, 2)} mm, kılavuz matkabı ${f(m8.tapDrill, 1)} mm; M10 için ${f(m10.tapDrill, 1)} mm.`,
    h1: "Metrik Vida Tablosu ve Kılavuz Matkap Çapları",
    intro:
      "Vida ölçüsünü seçin; diş adımını, kılavuz matkap çapını, cıvata geçiş deliğini, anahtar ağzını, alyan ölçüsünü ve diş çaplarını görün. Elinizdeki vidanın ölçüsünü bilmiyorsanız kumpasla ölçtüğünüz çapı girerek bulabilirsiniz.",
    sections: [
      {
        id: "kaba-dis",
        title: "Metrik kaba diş tablosu (ISO 261)",
        body: (
          <>
            <p>
              Metrik vidalar M harfi ve anma çapıyla gösterilir: M8, dış çapı 8 mm olan vidadır. Adım yazılmamışsa kaba (normal) diş kastedilir; M8&apos;in adımı {f(m8.P, 2)} mm&apos;dir, yani vida bir tur döndüğünde{" "}
              {f(m8.P, 2)} mm ilerler. Kılavuz matkap çapı, somun dişinin açılacağı deliğin çapıdır ve kabaca anma çapı eksi adım kadardır.
            </p>
            <DataTable
              caption="Metrik kaba diş: adım, kılavuz matkap ve diş çapları (mm)"
              head={["Vida", "Adım", "Kılavuz matkap", "Böğür çapı d2", "Diş dibi d3", "Somun iç çapı D1", "Gerilme alanı (mm²)"]}
              rows={COARSE_THREADS.map((t) => [t.id, f(t.P, 2), f(t.tapDrill, 2), f(t.d2, 3), f(t.d3, 3), f(t.D1, 3), f(t.As, 1)])}
            />
          </>
        ),
      },
      {
        id: "ince-dis",
        title: "Metrik ince diş tablosu",
        body: (
          <>
            <p>
              İnce dişler aynı çapta daha küçük adımla açılır ve M10×1,25 gibi adımla birlikte yazılır. Titreşimde daha zor gevşer, ince cidarlı parçalarda daha çok diş tutar ve ayar vidalarında daha hassas
              ilerleme sağlar. Kılavuz matkabı yine yaklaşık anma çapı eksi adımdır: M10×1 için {f(threadById("M10x1")!.tapDrill, 1)} mm.
            </p>
            <DataTable
              caption="Sık kullanılan metrik ince dişler (mm)"
              head={["Vida", "Adım", "Kılavuz matkap", "Böğür çapı d2", "Diş dibi d3", "Gerilme alanı (mm²)"]}
              rows={FINE_THREADS.map((t) => [t.id.replace("x", " × "), f(t.P, 2), f(t.tapDrill, 2), f(t.d2, 3), f(t.d3, 3), f(t.As, 1)])}
            />
          </>
        ),
      },
      {
        id: "gecis-anahtar",
        title: "Geçiş deliği, anahtar ağzı ve alyan ölçüleri",
        body: (
          <>
            <p>
              Cıvatanın serbestçe geçeceği delik ISO 273&apos;e göre üç sınıftadır: hassas işler için ince, genel imalat için orta, montaj kolaylığı gereken yerler için kaba. M12 için bu çaplar{" "}
              {m12.clearance!.map((v) => f(v, 1)).join(", ")} mm&apos;dir. Anahtar ağzında eski DIN ile yeni ISO standardı dört ölçüde farklıdır: M10 için DIN 17 mm, ISO 16 mm; M12 için DIN 19 mm, ISO 18 mm.
              Elinizdeki cıvatanın hangi standarda göre üretildiğini anahtarı takarak anlayabilirsiniz.
            </p>
            <DataTable
              caption="ISO 273 geçiş delikleri, anahtar ağzı (ISO 4032/4014, DIN) ve alyan (ISO 4762), mm"
              head={["Vida", "Geçiş deliği ince", "Orta", "Kaba", "Anahtar ağzı ISO", "Anahtar ağzı DIN", "Alyan"]}
              rows={withClear.map((t) => [
                t.id,
                f(t.clearance![0], 1),
                f(t.clearance![1], 1),
                f(t.clearance![2], 1),
                t.hex ? f(t.hex[0], 1) : "—",
                t.hex ? f(t.hex[1] ?? t.hex[0], 1) : "—",
                t.socket ? f(t.socket, 1) : "—",
              ])}
            />
          </>
        ),
      },
      {
        id: "olcme",
        title: "Bir vidanın ölçüsü nasıl bulunur?",
        body: (
          <>
            <p>
              Dış dişin tepeden tepeye çapını kumpasla ölçün. Dişler aşındığı ve tolerans payı bırakıldığı için ölçü anma çapından biraz küçük çıkar; M8 bir cıvata genellikle 7,76–7,97 mm ölçülür. Adımı
              bulmak için adım tarağı kullanın ya da 10 diş arasındaki uzunluğu ölçüp 10&apos;a bölün. Çap metrik ölçülere uymuyorsa vida inç (UNC/UNF) ya da boru dişi olabilir; boru dişleri için{" "}
              <Link href={MACHINE_PATHS.pipethread}>boru dişi ölçüleri</Link> sayfasına bakın.
            </p>
            <p>
              Kılavuz çekerken matkap ucunu tablodaki değerden küçük seçmek diş derinliğini artırır ama kılavuzun sıkışma ve kırılma riskini yükseltir. Alüminyum ve dökme demir gibi malzemelerde tablo değeri
              yeterlidir. Cıvatanın sıkma momenti için <Link href="/civata-torku-hesaplama">cıvata torku</Link>, dayanımı için <Link href={MACHINE_PATHS.boltclass}>cıvata mukavemet sınıfları</Link> sayfasını
              kullanın.
            </p>
          </>
        ),
      },
    ],
    faq: [
      { question: "M8 kılavuz kaç matkap?", answer: `M8 kaba diş (adım 1,25 mm) için ${f(m8.tapDrill, 1)} mm matkap kullanılır. İnce diş M8×1 için 7 mm'dir.` },
      { question: "M10 vidanın adımı kaç?", answer: `M10 kaba dişin adımı ${f(m10.P, 2)} mm'dir. İnce diş olarak M10×1,25 ve M10×1 de kullanılır.` },
      { question: "M12 cıvata anahtar ağzı kaç?", answer: "ISO 4014/4032'ye göre 18 mm, eski DIN 931/934'e göre 19 mm'dir. İmbus başlı M12 için 10 mm alyan anahtarı gerekir." },
      { question: "Kılavuz matkap çapı nasıl hesaplanır?", answer: "Pratikte anma çapından adım çıkarılır: M6 için 6 − 1 = 5 mm, M10 için 10 − 1,5 = 8,5 mm. Sonuç standart matkap ölçüsüne yuvarlanır; M8 için 6,75 yerine 6,8 mm kullanılır." },
    ],
    sources:
      "Adımlar ISO 261, diş çapları ISO 724 temel profil formüllerinden (d2 = d − 0,6495·P, d3 = d − 1,2269·P, D1 = d − 1,0825·P), gerilme alanı ISO 898-1 formülünden, kılavuz matkapları DIN 336'dan, geçiş delikleri ISO 273'ten, anahtar ağızları ISO 4032/4014 ve DIN 931/934'ten, alyan ölçüleri ISO 4762'den alınmıştır.",
  };
}

/* ---------------- Cıvata mukavemet sınıfları ---------------- */

function boltClassArticle(): ToolArticle {
  const m12 = threadById("M12")!;
  const c88 = classById("8.8")!;
  const c109 = classById("10.9")!;
  const c129 = classById("12.9")!;
  const sizes = COARSE_THREADS.filter((t) => t.d >= 4 && t.d <= 36 && [4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 27, 30, 33, 36].includes(t.d));
  const m12b = boltLoads(m12, c88);
  return {
    path: MACHINE_PATHS.boltclass,
    metaTitle: "Cıvata Mukavemet Sınıfları: 8.8, 10.9, 12.9",
    description: `8.8, 10.9 ve 12.9 cıvata ne demek, kaç kN'da kopar? ISO 898-1 değerleri ve ölçülere göre yük tablosu. 8.8 M12 cıvatanın en az kopma yükü ${kN(m12b.breaking)} kN.`,
    h1: "Cıvata Mukavemet Sınıfları (8.8, 10.9, 12.9)",
    intro:
      "Cıvata ölçüsünü ve sınıfını seçin; en az kopma, akma ve deneme yükünü görün. Cıvata başındaki 8.8 ya da 10.9 gibi kodu yazarak çekme ve akma dayanımının ne olduğunu da çözebilirsiniz.",
    sections: [
      {
        id: "kod",
        title: "8.8, 10.9 ve 12.9 ne demek?",
        body: (
          <>
            <p>
              Cıvata başındaki iki sayı malzemenin dayanımını verir. İlk sayının 100 katı çekme dayanımıdır (MPa); ikinci sayı akma dayanımının çekme dayanımına oranının 10 katıdır. 8.8 sınıfında çekme dayanımı
              800 MPa, akma dayanımı 800 × 0,8 = 640 MPa&apos;dır. 10.9&apos;da sırasıyla 1000 ve 900 MPa, 12.9&apos;da 1200 ve 1080 MPa olur.
            </p>
            <p>
              Bunlar anma değerleridir; standart, cıvatanın sağlaması gereken en az değerleri ayrıca verir. Örneğin 8.8 sınıfı M16&apos;dan büyük cıvatalarda en az {c88.rmMinLarge} MPa çekme dayanımı ister.
              Somunlar da aynı mantıkla 8, 10, 12 diye sınıflanır; 8.8 cıvatayla en az 8 sınıfı somun kullanılır.
            </p>
          </>
        ),
      },
      {
        id: "siniflar",
        title: "ISO 898-1 mukavemet sınıfları tablosu",
        body: (
          <DataTable
            caption="Karbon ve alaşımlı çelik cıvatalar, en az değerler (MPa)"
            head={["Sınıf", "Çekme dayanımı Rm", "Akma dayanımı Re / Rp0,2", "Deneme gerilmesi Sp", "Not"]}
            rows={PROPERTY_CLASSES.map((c) => [
              c.id,
              c.rmMinLarge ? `${c.rmMin} (> M16: ${c.rmMinLarge})` : String(c.rmMin),
              c.reMinLarge ? `${c.reMin} (> M16: ${c.reMinLarge})` : String(c.reMin),
              c.spLarge ? `${c.sp} (> M16: ${c.spLarge})` : String(c.sp),
              c.note ?? (["10.9", "12.9"].includes(c.id) ? "Su verilmiş ve temperlenmiş" : "—"),
            ])}
          />
        ),
      },
      {
        id: "yukler",
        title: "Ölçülere göre kopma yükü tablosu",
        body: (
          <>
            <p>
              Cıvatanın taşıyabileceği en büyük çekme kuvveti, gerilme kesit alanı ile çekme dayanımının çarpımıdır. M12 8.8 bir cıvatanın gerilme alanı {f(m12.As, 1)} mm² olduğu için en az kopma yükü{" "}
              {f(m12.As, 1)} × 800 ≈ <strong>{kN(m12b.breaking)} kN</strong> (yaklaşık {f(m12b.breaking / 9806.65, 1)} ton-kuvvet) olur.
            </p>
            <DataTable
              caption="En az kopma yükü (kN), ISO 898-1 kaba diş"
              head={["Cıvata", "Gerilme alanı (mm²)", "8.8", "10.9", "12.9"]}
              rows={sizes.map((t) => [t.id, f(t.As, 1), kN(boltLoads(t, c88).breaking), kN(boltLoads(t, c109).breaking), kN(boltLoads(t, c129).breaking)])}
            />
            <p>
              Bu yükler cıvatanın koptuğu sınırdır, güvenle taşıyabileceği yük değildir. Bağlantılarda cıvata akma yükünün altında, genellikle önceden belirlenen bir ön gerilmeyle sıkılır ve dış yük güvenlik
              katsayısıyla sınırlanır. Kaldırma ve askı uygulamalarında mutlaka üreticinin onaylı yük değerlerine uyun. Sıkma momenti için <Link href="/civata-torku-hesaplama">cıvata torku hesaplama</Link>{" "}
              aracını kullanın.
            </p>
          </>
        ),
      },
      {
        id: "paslanmaz",
        title: "Paslanmaz cıvatalar (A2-70, A4-80)",
        body: (
          <>
            <p>
              Paslanmaz cıvatalarda harf ve rakam malzemeyi, tireden sonraki sayı çekme dayanımının onda birini gösterir: A2-70, AISI 304 benzeri (A2) malzemeden 700 MPa dayanımlı cıvatadır. A4, molibdenli (316
              benzeri) olup deniz ve klor ortamına daha dayanıklıdır. A2-70 cıvatanın akma dayanımı 8.8&apos;in altında kalır; aynı yük için daha büyük çap gerekebilir.
            </p>
            <DataTable caption="ISO 3506-1 paslanmaz cıvatalar, en az değerler (MPa)" head={["Sınıf", "Çekme dayanımı", "Akma dayanımı Rp0,2"]} rows={STAINLESS_CLASSES.map((s) => [s.id, String(s.rm), String(s.re)])} />
          </>
        ),
      },
    ],
    faq: [
      { question: "8.8 cıvata ne demek?", answer: "Çekme dayanımı 800 MPa, akma dayanımı bunun %80'i yani 640 MPa olan çelik cıvata demektir. Yapı ve makinede en yaygın sınıftır." },
      { question: "10.9 ile 12.9 cıvata farkı nedir?", answer: "10.9 en az 1040 MPa, 12.9 en az 1220 MPa çekme dayanımındadır. 12.9 daha dayanıklıdır ama daha gevrektir ve hidrojen gevrekliğine daha duyarlıdır; genellikle imbus başlı cıvatalarda kullanılır." },
      { question: "M12 8.8 cıvata kaç kg taşır?", answer: `En az kopma yükü yaklaşık ${kN(m12b.breaking)} kN'dur (≈ ${f(m12b.breaking / 9806.65, 1)} ton-kuvvet). Bu koptuğu yüktür; güvenli çalışma yükü güvenlik katsayısına ve bağlantı tipine bağlı olarak çok daha düşüktür.` },
      { question: "Hangi somun kullanılmalı?", answer: "Cıvata sınıfının ilk sayısına eşit ya da daha yüksek sınıflı somun: 8.8 cıvataya 8, 10.9'a 10, 12.9'a 12 sınıfı somun." },
    ],
    sources:
      "Değerler ISO 898-1:2013 (cıvata), ISO 898-2 (somun) ve ISO 3506-1 (paslanmaz) standartlarındaki en az değerlerdir. Yükler gerilme kesit alanı ile en az gerilmenin çarpımıdır ve ISO 898-1 tablolarıyla %0,5 içinde örtüşür.",
  };
}

/* ---------------- Boru dişleri ---------------- */

function pipeThreadArticle(): ToolArticle {
  const half = PIPE_THREADS.find((p) => p.size === "1/2")!;
  const one = PIPE_THREADS.find((p) => p.size === "1")!;
  return {
    path: MACHINE_PATHS.pipethread,
    metaTitle: "Boru Dişi Ölçüleri: BSP, NPT ve İnç Tablosu",
    description: `1/8″'ten 4″'e BSP (G, R) ve NPT boru dişi dış çapı, diş sayısı ve DN karşılığı. 1/2″ boru dişinin dış çapı ${f(half.bspMajor, 2)} mm, inç başına ${half.bspTpi} diş.`,
    h1: "Boru Dişi Ölçüleri (BSP ve NPT)",
    intro:
      "İnç ölçüsünü seçin; BSP ve NPT dişin dış çapını, inç başına diş sayısını, adımını ve boru anma çapını (DN) görün. Elinizdeki rakor ya da borunun dişini tanımak için kumpasla ölçtüğünüz çapı girin.",
    sections: [
      {
        id: "neden",
        title: "1/2 inç boru dişi neden 21 mm?",
        body: (
          <p>
            Boru dişlerindeki inç ölçüsü dişin çapı değil, borunun eski usul iç çapına dayanan bir anma ölçüsüdür. Bu yüzden 1/2″ diş 12,7 mm değil, {f(half.bspMajor, 2)} mm dış çaplıdır; 1″ diş{" "}
            {f(one.bspMajor, 2)} mm&apos;dir. Tesisatçılar arasında &quot;yarım parmak&quot;, &quot;üç çeyrek&quot; ve &quot;bir parmak&quot; diye anılan ölçüler bunlardır. Boru çaplarının DN ve inç karşılığı
            için <Link href="/boru-capi-donusum-hesaplama">DN-NPS boru çapı dönüşümü</Link> sayfasına bakabilirsiniz.
          </p>
        ),
      },
      {
        id: "bsp",
        title: "BSP (Whitworth) boru dişi tablosu",
        body: (
          <>
            <p>
              Türkiye ve Avrupa&apos;da kullanılan boru dişi, 55° açılı Whitworth profilindeki BSP&apos;dir. Paralel olanı G (ISO 228-1) diye gösterilir ve sızdırmazlık conta ya da O-ring ile sağlanır. Konik olanı R
              (ISO 7-1, eski adı BSPT) diye gösterilir; dişler sıkıldıkça birbirine oturur ve sızdırmazlık teflon bant ya da sıvı contayla tamamlanır.
            </p>
            <DataTable
              caption="BSP boru dişleri, ISO 228-1 / ISO 7-1 (mm)"
              head={["Anma ölçüsü", "DN", "Dış çap", "Diş dibi çapı", "Diş/inç", "Adım"]}
              rows={PIPE_THREADS.map((p) => [`${p.size}″`, String(p.dn), f(p.bspMajor, 3), f(p.bspMinor, 3), String(p.bspTpi), f(25.4 / p.bspTpi, 3)])}
            />
          </>
        ),
      },
      {
        id: "npt",
        title: "NPT (Amerikan) boru dişi tablosu",
        body: (
          <>
            <p>
              NPT, ABD&apos;de kullanılan 60° açılı konik boru dişidir (ASME B1.20.1). Koniklik 1/16&apos;dır ve sızdırmazlık dişlerin birbirine oturmasıyla sağlanır. Amerikan menşeli kompresör, hidrolik ve
              ölçüm cihazlarında karşınıza çıkar.
            </p>
            <DataTable
              caption="NPT boru dişleri, ASME B1.20.1 (mm)"
              head={["Anma ölçüsü", "DN", "Boru dış çapı", "Diş/inç", "Adım"]}
              rows={PIPE_THREADS.map((p) => [`${p.size}″`, String(p.dn), f(p.npOd, 3), f(p.npTpi, 1), f(25.4 / p.npTpi, 3)])}
            />
          </>
        ),
      },
      {
        id: "fark",
        title: "BSP ile NPT birbirine takılır mı?",
        body: (
          <p>
            1/2″ ve 3/4″ ölçülerinde iki diş de inç başına 14 diştir ve çaplar yakındır; bu yüzden BSP bir parça NPT parçaya birkaç tur girebilir. Ancak diş açıları (55° ve 60°) ve profilleri farklı olduğu için
            bağlantı sızdırır ve basınç altında güvenilir değildir. Diğer ölçülerde diş sayıları da farklıdır (1″ BSP 11, NPT 11,5 diş). Karışık sistemlerde uygun adaptör kullanın.
          </p>
        ),
      },
    ],
    faq: [
      { question: "1/2 inç boru dişi kaç mm?", answer: `BSP (G ve R) 1/2″ dişin dış çapı ${f(half.bspMajor, 3)} mm, inç başına ${half.bspTpi} diştir. NPT 1/2″ borunun dış çapı ${f(half.npOd, 3)} mm'dir.` },
      { question: "3/4 boru dişi kaç mm?", answer: `BSP 3/4″ dişin dış çapı ${f(PIPE_THREADS.find((p) => p.size === "3/4")!.bspMajor, 3)} mm ve inç başına 14 diştir; DN20 boruya karşılık gelir.` },
      { question: "G ile R dişi arasındaki fark nedir?", answer: "G paralel (silindirik) diştir ve sızdırmazlık conta ile sağlanır. R koniktir; dişler sıkıldıkça sıkışarak sızdırmazlık sağlar, teflon bant ya da sıvı conta ile desteklenir." },
      { question: "BSP ve NPT aynı mı?", answer: "Hayır. BSP 55°, NPT 60° diş açısına sahiptir ve çoğu ölçüde inç başına diş sayısı farklıdır. Birbirine takılsalar bile sızdırmazlık sağlanmaz." },
    ],
    sources: "BSP ölçüleri ISO 228-1 ve ISO 7-1'den, NPT ölçüleri ASME B1.20.1'den alınmıştır. Diş dibi çapı Whitworth profili formülüyle (D − 1,2807·P) hesaplanmış ve ISO 228-1 değerleriyle karşılaştırılmıştır.",
  };
}

const ARTICLES: Record<MachineKind, () => ToolArticle> = { thread: threadArticle, boltclass: boltClassArticle, pipethread: pipeThreadArticle };
const TOOLS: Record<MachineKind, () => ReactNode> = {
  thread: () => <MetricThreadTool />,
  boltclass: () => <BoltClassTool />,
  pipethread: () => <PipeThreadTool />,
};

export const machineMetadata = (kind: MachineKind) => toolArticleMetadata(ARTICLES[kind]());

export default function MachinePage({ kind }: { kind: MachineKind }) {
  return <ToolArticlePage article={ARTICLES[kind]()} tool={TOOLS[kind]()} />;
}
