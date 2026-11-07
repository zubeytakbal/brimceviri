// Su, doymuş buhar, kaynama noktası ve hava özellikleri sayfaları.
// Tüm sayılar app/converter/thermal/fluidTables.ts'den (CoolProp, NIST ile karşılaştırılmış) gelir.
import type { ReactNode } from "react";
import { formatTr } from "../../converter/metal/metalWeight";
import { boilingPointC, interpolateSat, isaPressureKpa } from "../../converter/thermal/fluidProps";
import { SAT_STEAM_P } from "../../converter/thermal/fluidTables";
import { turkishProvinceElevations } from "../../converter/turkishProvinceElevations";
import { trLocative } from "../../converter/turkishSuffix";
import DataTable from "../metal/DataTable";
import { BoilingPointTool } from "../thermal/FluidTools";
import ToolArticlePage, { toolArticleMetadata, type ToolArticle } from "./ToolArticlePage";

export type FluidKind = "boiling";

export const FLUID_PATHS: Record<FluidKind, string> = {
  boiling: "/suyun-kaynama-noktasi-hesaplama",
};

const f = formatTr;
const ATM_KPA = 101.325;
const boil = (h: number) => boilingPointC(isaPressureKpa(h))!;
const satP = (bar: number) => interpolateSat(SAT_STEAM_P, "p", bar)!;

/* ---------------- Su ---------------- */

/* ---------------- Doymuş buhar ---------------- */

/* ---------------- Kaynama noktası ---------------- */

function boilingArticle(): ToolArticle {
  const sea = boilingPointC(ATM_KPA)!;
  const alts = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 5000, 6000, 8849];
  const provinces = [...turkishProvinceElevations].sort((a, b) => b.elevationM - a.elevationM);
  const top = provinces[0];
  const low = provinces[provinces.length - 1];
  const ankara = provinces.find((p) => p.id === "ankara");
  const gauges = [0.3, 0.5, 0.7, 1.0];
  return {
    path: FLUID_PATHS.boiling,
    metaTitle: "Suyun Kaynama Noktası: Rakım ve Basınç",
    description: `Rakıma ya da hava basıncına göre suyun kaynama noktası ve 81 ilin tablosu. Deniz seviyesinde ${f(sea, 1)} °C, 2000 m'de ${f(boil(2000), 1)} °C, Everest'te ${f(boil(8849), 1)} °C.`,
    h1: "Suyun Kaynama Noktası Hesaplama",
    intro:
      "Basınç standart atmosfer modelinden, kaynama sıcaklığı IAPWS-95 buhar tablosundan hesaplanır. Aşağıda 81 ilin değerleri de var.",
    sections: [
      {
        id: "neden",
        title: "Su yükseklerde neden daha düşük sıcaklıkta kaynar?",
        body: (
          <>
            <p>
              Su, buhar basıncı çevredeki hava basıncına eşit olduğunda kaynar. Yükseldikçe hava basıncı azalır, bu yüzden su daha düşük sıcaklıkta kaynar. Deniz seviyesinde (1013,25 hPa) kaynama noktası{" "}
              <strong>{f(sea, 2)} °C</strong>'dir; 100 °C değeri eski tanımdan kalan yuvarlak bir sayıdır.
            </p>
            <p>
              Hesap iki adımdır. Önce rakımdan basınç bulunur: p = 101,325 × (1 − 2,25577·10⁻⁵ × h)^5,25588 kPa (ICAO standart atmosferi). Sonra bu basınçtaki doyma sıcaklığı buhar tablosundan okunur. Kabaca her 300 m
              yükselişte kaynama noktası 1 °C düşer. Hava durumuna bağlı ±20 hPa'lık basınç değişimi kaynama noktasını yaklaşık ±{f((boilingPointC(ATM_KPA + 2)! - boilingPointC(ATM_KPA - 2)!) / 2, 2)} °C oynatır.
            </p>
          </>
        ),
      },
      {
        id: "rakim-tablosu",
        title: "Rakıma göre kaynama noktası tablosu",
        body: (
          <DataTable
            caption="Standart atmosferde basınç ve suyun kaynama noktası"
            head={["Rakım (m)", "Basınç (hPa)", "Kaynama noktası (°C)"]}
            rows={alts.map((h) => [h === 8849 ? "8.849 (Everest)" : f(h, 0), f(isaPressureKpa(h) * 10, 0), f(boil(h), 1, 1)])}
          />
        ),
      },
      {
        id: "iller",
        title: "81 ilde suyun kaynama noktası",
        body: (
          <>
            <p>
              İl merkezlerinin rakımına göre hesaplanmıştır. En yüksek il merkezi {trLocative(top.nameTr)} ({f(top.elevationM, 0)} m) su {f(boil(top.elevationM), 1)} °C'de, en alçak {trLocative(low.nameTr)} {f(boil(low.elevationM), 2)} °C'de
              kaynar{ankara ? `; Ankara'da (${f(ankara.elevationM, 0)} m) bu değer ${f(boil(ankara.elevationM), 1)} °C'dir` : ""}. İl adına tıklayarak rakım ve basınç ayrıntılarını görebilirsiniz; tüm liste{" "}
              il rakımları sayfasında.
            </p>
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <caption>İl merkezlerinde hava basıncı ve suyun kaynama noktası (standart atmosfer)</caption>
                <thead>
                  <tr>
                    <th scope="col">İl</th>
                    <th scope="col">Rakım (m)</th>
                    <th scope="col">Basınç (hPa)</th>
                    <th scope="col">Kaynama noktası (°C)</th>
                  </tr>
                </thead>
                <tbody>
                  {provinces.map((p) => (
                    <tr key={p.id}>
                      <th scope="row">
                        {p.nameTr}
                      </th>
                      <td>{f(p.elevationM, 0)}</td>
                      <td>{f(isaPressureKpa(p.elevationM) * 10, 0)}</td>
                      <td>{f(boil(p.elevationM), 1, 1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ),
      },
      {
        id: "dudukulu",
        title: "Düdüklü tencerede su kaç derecede kaynar?",
        body: (
          <>
            <p>
              Düdüklü tencere içerideki basıncı atmosferin üstüne çıkararak kaynama noktasını yükseltir. Tencerenin çalışma basıncı genellikle kapağında ya da kullanım kılavuzunda gösterge basıncı olarak yazar. Deniz
              seviyesinde bu basınçlardaki kaynama sıcaklıkları:
            </p>
            <DataTable
              caption="Deniz seviyesinde gösterge basıncına göre kaynama noktası"
              head={["Gösterge basıncı (bar)", "Mutlak basınç (bar)", "Kaynama noktası (°C)"]}
              rows={gauges.map((g) => [f(g, 1), f(g + ATM_KPA / 100, 2), f(satP(g + ATM_KPA / 100).t, 1, 1)])}
            />
            <p>
              Yüksek rakımda dış basınç düştüğü için aynı gösterge basıncı daha düşük mutlak basınca karşılık gelir; 2000 m'de 1 bar gösterge basıncında su yaklaşık {f(satP(1 + isaPressureKpa(2000) / 100).t, 1)} °C'de kaynar.
            </p>
          </>
        ),
      },
    ],
    faq: [
      { question: "Su deniz seviyesinde tam 100 °C'de mi kaynar?", answer: `Bugünkü sıcaklık ölçeğiyle 1 atm'de ${f(sea, 2)} °C'de kaynar. Fark ölçeğin 1990'da yeniden tanımlanmasından gelir; günlük kullanımda 100 °C denir.` },
      { question: "Erzurum'da su kaç derecede kaynar?", answer: `Erzurum il merkezi ${f(turkishProvinceElevations.find((p) => p.id === "erzurum")!.elevationM, 0)} m rakımdadır; standart atmosferde su yaklaşık ${f(boil(turkishProvinceElevations.find((p) => p.id === "erzurum")!.elevationM), 1)} °C'de kaynar.` },
      { question: "Everest'in zirvesinde su kaç derecede kaynar?", answer: `Standart atmosfere göre 8849 m'de basınç yaklaşık ${f(isaPressureKpa(8849) * 10, 0)} hPa, kaynama noktası ${f(boil(8849), 1)} °C'dir. Gerçek basınç mevsime göre biraz farklıdır; diğer zirveler için dünyanın en yüksek dağları sayfasına bakın.` },
      { question: "Barometredeki basıncı nasıl kullanırım?", answer: "Araçta \"Hava basıncından\" sekmesini seçip istasyon basıncını (deniz seviyesine indirgenmemiş değeri) hPa olarak girin. Hava durumu raporlarındaki deniz seviyesi basıncı bu iş için uygun değildir." },
    ],
    sources:
      "Basınç ICAO standart atmosferi formülüyle, kaynama sıcaklığı CoolProp 8'in IAPWS-95 formülasyonundan 0,5 kPa aralıklı tablo ile hesaplanır. Buhar tablosu NIST Chemistry WebBook ile karşılaştırılmıştır (en büyük fark %0,13). İl rakımları sitenin il rakımları verisinden alınır.",
  };
}

/* ---------------- Hava ---------------- */

const ARTICLES: Record<FluidKind, () => ToolArticle> = { boiling: boilingArticle };
const TOOLS: Record<FluidKind, () => ReactNode> = {
  boiling: () => <BoilingPointTool />,
};

export const fluidMetadata = (kind: FluidKind) => toolArticleMetadata(ARTICLES[kind]());

export default function FluidPage({ kind }: { kind: FluidKind }) {
  return <ToolArticlePage article={ARTICLES[kind]()} tool={TOOLS[kind]()} />;
}
