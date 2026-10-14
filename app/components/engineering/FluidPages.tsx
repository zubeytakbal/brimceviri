// Su, doymuş buhar, kaynama noktası ve hava özellikleri sayfaları.
// Tüm sayılar app/converter/thermal/fluidTables.ts'den (CoolProp, NIST ile karşılaştırılmış) gelir.
import type { ReactNode } from "react";
import Link from "@/app/components/SiteLink";
import { formatTr } from "../../converter/metal/metalWeight";
import { boilingPointC, interpolate, interpolateSat, isaPressureKpa } from "../../converter/thermal/fluidProps";
import { AIR_1ATM, SAT_STEAM_P, SAT_STEAM_T, WATER_1ATM } from "../../converter/thermal/fluidTables";
import { turkishProvinceElevations } from "../../converter/turkishProvinceElevations";
import DataTable from "../metal/DataTable";
import { AirPropsTool, BoilingPointTool, SteamTableTool, WaterPropsTool } from "../thermal/FluidTools";
import ToolArticlePage, { toolArticleMetadata, type ToolArticle } from "./ToolArticlePage";

export type FluidKind = "water" | "steam" | "boiling" | "air";

export const FLUID_PATHS: Record<FluidKind, string> = {
  water: "/su-ozellikleri-tablosu",
  steam: "/doymus-buhar-tablosu",
  boiling: "/suyun-kaynama-noktasi-hesaplama",
  air: "/hava-ozellikleri-tablosu",
};

const f = formatTr;
const sig = (v: number, digits = 4) => (v === 0 ? "0" : f(v, Math.max(0, digits - 1 - Math.floor(Math.log10(Math.abs(v))))));
const ATM_KPA = 101.325;
const water = (t: number) => WATER_1ATM.find((r) => r.t === t)!;
const air = (t: number) => AIR_1ATM.find((r) => r.t === t)!;
const boil = (h: number) => boilingPointC(isaPressureKpa(h))!;
const satP = (bar: number) => interpolateSat(SAT_STEAM_P, "p", bar)!;

/* ---------------- Su ---------------- */

function waterArticle(): ToolArticle {
  const w4 = water(4);
  const w20 = water(20);
  const w60 = water(60);
  const w80 = water(80);
  const w10 = water(10);
  const expansion = (w20.rho / w80.rho - 1) * 100;
  // 1 m/s, 25 mm iç çaplı boruda Reynolds sayısı: Re = v·D/ν (ν mm²/s → m²/s)
  const re = (nu: number) => (1 * 0.025) / (nu * 1e-6);
  const rows = WATER_1ATM.filter((r) => r.t === 0.01 || r.t % 5 === 0);
  return {
    path: FLUID_PATHS.water,
    metaTitle: "Su Özellikleri Tablosu: Yoğunluk ve Viskozite",
    description: `0–100 °C suyun yoğunluğu, viskozitesi, özgül ısısı, ısıl iletkenliği ve buhar basıncı. 20 °C'de ρ = ${f(w20.rho, 1)} kg/m³, μ = ${sig(w20.mu / 1000)} mPa·s.`,
    h1: "Su Özellikleri Tablosu (0–100 °C)",
    intro:
      "Sıcaklığı girin; suyun yoğunluğunu, dinamik ve kinematik viskozitesini, özgül ısısını, ısıl iletkenliğini, Prandtl sayısını ve buhar basıncını 1 atm için görün. Değerler IAPWS formülasyonlarından üretildi ve NIST verisiyle karşılaştırıldı.",
    sections: [
      {
        id: "tablo",
        title: "Sıcaklığa göre su özellikleri tablosu",
        body: (
          <>
            <p>Tablo 5 °C aralıklarla verilmiştir; araç aradaki sıcaklıklar için 1 °C aralıklı tablodan doğrusal ara değer bulur. Basınç 1 atm (101,325 kPa); 0 °C satırı yerine üçlü nokta (0,01 °C) kullanılır.</p>
            <DataTable
              caption="Sıvı suyun özellikleri, 1 atm"
              head={["Sıcaklık (°C)", "ρ (kg/m³)", "μ (mPa·s)", "ν (mm²/s)", "cp (kJ/kg·K)", "k (W/m·K)", "Pr", "Buhar basıncı (kPa)"]}
              rows={rows.map((r) => [f(r.t, 2), f(r.rho, 2), sig(r.mu / 1000), sig(r.nu), f(r.cp, 4), f(r.k, 4), sig(r.pr, 3), sig(r.psat)])}
            />
          </>
        ),
      },
      {
        id: "yogunluk",
        title: "Suyun yoğunluğu sıcaklıkla nasıl değişir?",
        body: (
          <>
            <p>
              Su en yoğun haline yaklaşık 4 °C'de ulaşır ({f(w4.rho, 2)} kg/m³). Bu noktanın altında da üstünde de genleşir. 20 °C'de {f(w20.rho, 2)} kg/m³ olan yoğunluk 80 °C'de {f(w80.rho, 2)} kg/m³'e düşer; yani
              20 °C'de doldurulan bir kalorifer tesisatındaki su 80 °C'ye ısındığında hacmi yaklaşık <strong>%{f(expansion, 2)}</strong> artar. Genleşme deposu bu ek hacmi karşılamak için konur.
            </p>
            <p>
              Mühendislik hesaplarında suyun yoğunluğu çoğu zaman 1000 kg/m³ alınır. Bu, 60 °C'de bile yalnızca %{f((1000 / w60.rho - 1) * 100, 1)} hata verir. Sıcak su debisinden kütle debisi hesaplarken (örneğin{" "}
              <Link href="/debi-isi-yuku-hesaplama">debiden ısı yükü</Link> hesabında) gerçek yoğunluğu kullanmak sonucu birkaç binde bir düzeltir. Katıların boy uzaması için <Link href="/isil-genlesme-hesaplama">ısıl genleşme hesaplama</Link> aracına bakın.
            </p>
          </>
        ),
      },
      {
        id: "viskozite",
        title: "Viskozite ve boru akışı",
        body: (
          <>
            <p>
              Viskozite sıcaklıkla hızla düşer: 10 °C'de {sig(w10.mu / 1000)} mPa·s olan dinamik viskozite 60 °C'de {sig(w60.mu / 1000)} mPa·s'ye iner, yani yaklaşık {f(w10.mu / w60.mu, 1)} kat azalır. Boru hesaplarında
              kullanılan Reynolds sayısı Re = v·D/ν ile bulunur. 25 mm iç çaplı boruda 1 m/s hızla akan suda Re, 10 °C'de {f(re(w10.nu), 0)}, 60 °C'de {f(re(w60.nu), 0)} olur; ikisi de 4000'in üstünde olduğu için akış
              türbülanslıdır.
            </p>
            <p>
              Sürtünme kaybı Reynolds sayısına bağlı olduğundan sıcak su devrelerinde basınç kaybı aynı debideki soğuk sudan biraz düşüktür. Kayıp hesabı için <Link href="/basinc-kaybi-hesaplama">basınç kaybı</Link>, çap seçimi
              için <Link href="/boru-capi-hesaplama">boru çapı ve akış hızı</Link> araçlarını kullanın.
            </p>
          </>
        ),
      },
      {
        id: "ozgul-isi",
        title: "Özgül ısı ve ısıtma hesapları",
        body: (
          <p>
            Suyun özgül ısısı 0–100 °C aralığında {f(Math.min(...WATER_1ATM.map((r) => r.cp)), 3)} ile {f(Math.max(...WATER_1ATM.map((r) => r.cp)), 3)} kJ/(kg·K) arasında kalır; bu yüzden ısıtma hesaplarında 4,18 kJ/(kg·K) almak
            yeterlidir. Örneğin saatte 1000 litre suyu 20 °C ısıtmak için Q = ṁ·cp·ΔT = (1000 × {f(w20.rho / 1000, 3)} / 3600) × {f(w20.cp, 3)} × 20 ≈ <strong>{f(((1000 * w20.rho) / 1000 / 3600) * w20.cp * 20, 1)} kW</strong> gerekir.
            Buhar basıncı sütunu, suyun o sıcaklıkta kaynadığı basıncı gösterir; pompa emişinde kavitasyon kontrolünde bu değer kullanılır.
          </p>
        ),
      },
    ],
    faq: [
      { question: "Su kaç derecede en yoğundur?", answer: `Yaklaşık 4 °C'de. Bu sıcaklıkta yoğunluk ${f(w4.rho, 2)} kg/m³'tür; daha soğuk ya da daha sıcak su daha hafiftir.` },
      { question: "1 litre su kaç kg gelir?", answer: `20 °C'de ${f(w20.rho / 1000, 4)} kg, 80 °C'de ${f(w80.rho / 1000, 4)} kg. Günlük hesaplarda 1 kg alınır.` },
      { question: "20 °C suyun viskozitesi nedir?", answer: `Dinamik viskozite ${sig(w20.mu / 1000)} mPa·s (yaklaşık 1 cP), kinematik viskozite ${sig(w20.nu)} mm²/s'dir.` },
      { question: "Tablo hangi basınç için geçerli?", answer: "1 atm (101,325 kPa). Sıvı su neredeyse sıkıştırılamaz olduğundan birkaç bar basınçta yoğunluk ve viskozite pratikte aynıdır. 100 °C üstündeki sıvı için doymuş buhar tablosundaki vf değerini kullanın." },
    ],
    sources:
      "Değerler CoolProp 8 ile IAPWS-95 (termodinamik), IAPWS 2008 (viskozite) ve IAPWS 2011 (ısıl iletkenlik) formülasyonlarından üretildi. Betik, sonuçları NIST Chemistry WebBook ile 5–95 °C arasında karşılaştırır; en büyük fark %0,13'tür.",
  };
}

/* ---------------- Doymuş buhar ---------------- */

function steamArticle(): ToolArticle {
  const s10 = SAT_STEAM_P.find((r) => r.p === 10)!;
  const g6 = satP(6 + ATM_KPA / 100);
  const atm = SAT_STEAM_P.find((r) => r.p === 1.01325)!;
  const head = ["vf (m³/kg)", "vg (m³/kg)", "hf (kJ/kg)", "hfg (kJ/kg)", "hg (kJ/kg)", "sf (kJ/kg·K)", "sg (kJ/kg·K)"];
  const cells = (r: (typeof SAT_STEAM_P)[number]) => [sig(r.vf), sig(r.vg), f(r.hf, 1), f(r.hfg, 1), f(r.hg, 1), f(r.sf, 4), f(r.sg, 4)];
  return {
    path: FLUID_PATHS.steam,
    metaTitle: "Doymuş Buhar Tablosu: Basınç ve Sıcaklık",
    description: `Basınca ve sıcaklığa göre doymuş su buharı tablosu: doyma sıcaklığı, özgül hacim, entalpi, entropi. 10 bar'da Tsat = ${f(s10.t, 2)} °C, hfg = ${f(s10.hfg, 1)} kJ/kg.`,
    h1: "Doymuş Buhar Tablosu",
    intro:
      "Basıncı (manometre ya da mutlak) veya sıcaklığı girin; doyma sıcaklığını ya da basıncını, buharlaşma ısısını, entalpiyi, özgül hacmi ve entropiyi görün. Buhar debisi girerseniz yoğuşmada açığa çıkan ısıyı da hesaplar.",
    sections: [
      {
        id: "basinca-gore",
        title: "Basınca göre doymuş buhar tablosu",
        body: (
          <>
            <p>Basınçlar mutlaktır (bar a). Manometrede okunan değere yaklaşık 1,013 bar ekleyin.</p>
            <DataTable caption="Doymuş su ve buhar, basınca göre (IAPWS-95)" head={["Basınç (bar a)", "Tsat (°C)", ...head]} rows={SAT_STEAM_P.map((r) => [sig(r.p), f(r.t, 2), ...cells(r)])} />
          </>
        ),
      },
      {
        id: "sicakliga-gore",
        title: "Sıcaklığa göre doymuş buhar tablosu",
        body: <DataTable caption="Doymuş su ve buhar, sıcaklığa göre (IAPWS-95)" head={["Sıcaklık (°C)", "Basınç (bar a)", ...head]} rows={SAT_STEAM_T.map((r) => [f(r.t, 2), sig(r.p), ...cells(r)])} />,
      },
      {
        id: "okuma",
        title: "Buhar tablosu nasıl okunur?",
        body: (
          <>
            <p>
              <strong>hf</strong> doyma sıcaklığındaki sıvı suyun, <strong>hg</strong> doymuş buharın entalpisidir; aradaki fark <strong>hfg</strong> buharlaşma (ya da yoğuşma) ısısıdır. Isıtıcıya giren buharın verdiği
              yararlı ısı, buhar yoğuşup kondens olarak çıkarken açığa çıkan hfg'dir. <strong>vg</strong> buharın özgül hacmidir ve boru çapı seçiminde kullanılır.
            </p>
            <p>
              Örnek: 10 bar mutlak basınçta buhar {f(s10.t, 1)} °C'de doyar ve kilogram başına {f(s10.hfg, 1)} kJ yoğuşma ısısı verir. Saatte 1000 kg buhar yoğuştuğunda açığa çıkan güç 1000 × {f(s10.hfg, 1)} / 3600 ≈{" "}
              <strong>{f((1000 * s10.hfg) / 3600, 0)} kW</strong> olur. Aynı buharın hacmi {f(1000 * s10.vg, 0)} m³/h'tir; bu debiyi taşıyacak hattın çapını <Link href="/boru-capi-hesaplama">boru çapı</Link> aracıyla seçebilirsiniz.
            </p>
          </>
        ),
      },
      {
        id: "manometre",
        title: "Manometre basıncı ile mutlak basınç",
        body: (
          <p>
            Kazan ve buhar hatlarındaki manometreler atmosfere göre (gösterge) basınç okur. Tablolar mutlak basınçla verildiği için okunan değere atmosfer basıncı eklenir. Örneğin manometrede 6 bar okunan bir buhar hattında
            mutlak basınç {f(6 + ATM_KPA / 100, 2)} bar, doyma sıcaklığı <strong>{f(g6.t, 1)} °C</strong> ve buharlaşma ısısı {f(g6.hfg, 1)} kJ/kg'dır. Atmosfer basıncında (1,01325 bar) su {f(atm.t, 2)} °C'de kaynar;
            yükseklerde bu değerin nasıl düştüğünü <Link href={FLUID_PATHS.boiling}>suyun kaynama noktası</Link> sayfasında görebilirsiniz.
          </p>
        ),
      },
      {
        id: "kritik-nokta",
        title: "Kritik nokta ve tablonun sınırları",
        body: (
          <p>
            Basınç arttıkça hfg küçülür ve suyun kritik noktasında (373,946 °C, 220,64 bar) sıfır olur; bu noktanın üstünde sıvı ile buhar ayrılmaz. Araç, tablodaki satırlar arasında basınç ve özgül hacim için
            logaritmik, diğer özellikler için doğrusal ara değer kullanır. CoolProp ile yapılan kontrollerde ara değer hatası doyma basıncında %0,3'ün, 350 °C üstündeki hfg'de %2'nin altında kaldı. Kızgın buhar (doyma
            sıcaklığının üstüne ısıtılmış buhar) bu tabloda yer almaz.
          </p>
        ),
      },
    ],
    faq: [
      { question: "10 bar buhar kaç derecedir?", answer: `10 bar mutlak basınçta doymuş buhar ${f(s10.t, 2)} °C'dir. Manometrede 10 bar okunuyorsa mutlak basınç yaklaşık 11 bar ve sıcaklık ${f(satP(10 + ATM_KPA / 100).t, 1)} °C olur.` },
      { question: "Buharlaşma ısısı (hfg) nedir?", answer: `1 kg doymuş suyu aynı sıcaklıkta tamamen buhara çevirmek için gereken ısıdır. 100 °C'de ${f(SAT_STEAM_T.find((r) => r.t === 100)!.hfg, 1)} kJ/kg'dır ve basınç arttıkça azalır.` },
      { question: "Tablodaki basınç mutlak mı?", answer: "Evet, bar a (mutlak). Araçta basınç türünü manometre seçerseniz atmosfer basıncı (1,01325 bar) otomatik eklenir." },
      { question: "Kızgın buhar değerleri var mı?", answer: "Hayır. Bu sayfa doyma eğrisini (sıvı ve buharın birlikte bulunduğu durumu) kapsar. Kızgın buharın entalpisi aynı basınçtaki hg'den yüksektir." },
    ],
    sources:
      "Değerler CoolProp 8 ile IAPWS-95 formülasyonundan üretildi. Üretim betiği 20–340 °C arasında doyma basıncı, hf, hg ve vg değerlerini NIST Chemistry WebBook ile karşılaştırır; en büyük fark %0,13'tür. Kritik nokta değerleri IAPWS'nin yayımladığı değerlerdir.",
  };
}

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
      "Rakımı ya da barometrede okunan hava basıncını girin; suyun o yerde kaç derecede kaynadığını görün. Basınç standart atmosfer modelinden, kaynama sıcaklığı IAPWS-95 buhar tablosundan hesaplanır. Aşağıda 81 ilin değerleri de var.",
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
            rows={alts.map((h) => [h === 8849 ? "8.849 (Everest)" : f(h, 0), f(isaPressureKpa(h) * 10, 0), f(boil(h), 1)])}
          />
        ),
      },
      {
        id: "iller",
        title: "81 ilde suyun kaynama noktası",
        body: (
          <>
            <p>
              İl merkezlerinin rakımına göre hesaplanmıştır. En yüksek il merkezi {top.nameTr}'da ({f(top.elevationM, 0)} m) su {f(boil(top.elevationM), 1)} °C'de, en alçak {low.nameTr}'da {f(boil(low.elevationM), 1)} °C'de
              kaynar{ankara ? `; Ankara'da (${f(ankara.elevationM, 0)} m) bu değer ${f(boil(ankara.elevationM), 1)} °C'dir` : ""}. İl adına tıklayarak rakım ve basınç ayrıntılarını görebilirsiniz; tüm liste{" "}
              <Link href="/il-rakimlari">il rakımları</Link> sayfasında.
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
                        <Link href={`/il-rakimlari/${p.id}`}>{p.nameTr}</Link>
                      </th>
                      <td>{f(p.elevationM, 0)}</td>
                      <td>{f(isaPressureKpa(p.elevationM) * 10, 0)}</td>
                      <td>{f(boil(p.elevationM), 1)}</td>
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
              rows={gauges.map((g) => [f(g, 1), f(g + ATM_KPA / 100, 2), f(satP(g + ATM_KPA / 100).t, 1)])}
            />
            <p>
              Yüksek rakımda dış basınç düştüğü için aynı gösterge basıncı daha düşük mutlak basınca karşılık gelir; 2000 m'de 1 bar gösterge basıncında su yaklaşık {f(satP(1 + isaPressureKpa(2000) / 100).t, 1)} °C'de kaynar. Daha
              yüksek basınçlar için <Link href={FLUID_PATHS.steam}>doymuş buhar tablosuna</Link> bakın.
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

function airArticle(): ToolArticle {
  const a20 = air(20);
  const a0 = air(0);
  const a30 = air(30);
  const rows = AIR_1ATM.filter((r) => r.t % 10 === 0);
  const isaAlts = [0, 500, 1000, 1500, 2000, 3000, 4000, 5000];
  const isaRho = (h: number) => {
    const t = 15 - 0.0065 * h;
    return interpolate(AIR_1ATM, "t", t, "rho")! * (isaPressureKpa(h) / ATM_KPA);
  };
  const rho1000 = a20.rho * (isaPressureKpa(1000) / ATM_KPA);
  return {
    path: FLUID_PATHS.air,
    metaTitle: "Hava Özellikleri Tablosu: Yoğunluk, Viskozite",
    description: `−50 ile 200 °C arasında kuru havanın yoğunluğu, viskozitesi, özgül ısısı ve ısıl iletkenliği; rakıma göre yoğunluk. 20 °C'de ρ = ${f(a20.rho, 3)} kg/m³.`,
    h1: "Hava Özellikleri Tablosu",
    intro:
      "Hava sıcaklığını ve rakımı girin; kuru havanın yoğunluğunu, dinamik ve kinematik viskozitesini, özgül ısısını, ısıl iletkenliğini ve Prandtl sayısını görün. Fan, kanal ve ısı transferi hesaplarında kullanılan değerlerdir.",
    sections: [
      {
        id: "tablo",
        title: "Sıcaklığa göre hava özellikleri (1 atm)",
        body: (
          <>
            <p>Tablo 10 °C aralıklarla verilmiştir; araç 5 °C aralıklı tablodan ara değer bulur.</p>
            <DataTable
              caption="Kuru havanın özellikleri, 1 atm"
              head={["Sıcaklık (°C)", "ρ (kg/m³)", "μ (µPa·s)", "ν (mm²/s)", "cp (kJ/kg·K)", "k (W/m·K)", "Pr"]}
              rows={rows.map((r) => [f(r.t, 0), f(r.rho, 4), sig(r.mu), sig(r.nu), f(r.cp, 4), sig(r.k), sig(r.pr, 3)])}
            />
          </>
        ),
      },
      {
        id: "yogunluk",
        title: "Hava yoğunluğu nasıl hesaplanır?",
        body: (
          <>
            <p>
              Hava ideal gaza çok yakın davranır: ρ = p / (R·T), kuru hava için R = 287,05 J/(kg·K). Yoğunluk basınçla doğru, mutlak sıcaklıkla ters orantılıdır. 1 atm'de 0 °C'de {f(a0.rho, 3)} kg/m³ olan yoğunluk 30 °C'de{" "}
              {f(a30.rho, 3)} kg/m³'e düşer (yaklaşık %{f((1 - a30.rho / a0.rho) * 100, 0)}). Araç tablodaki 1 atm değerini rakımdan bulunan basınçla oranlar; viskozite ve ısıl iletkenlik basınçtan pratikte etkilenmez,
              kinematik viskozite ise yoğunlukla ters orantılı olarak artar.
            </p>
            <p>
              Fan ve klima hesaplarında hacimsel debi kütle debisine ρ ile çevrilir. 20 °C'de 1000 m³/h hava deniz seviyesinde {f(a20.rho * 1000, 0)} kg/h iken 1000 m rakımda {f(rho1000 * 1000, 0)} kg/h'tir; aynı fan daha az
              kütle taşır, dolayısıyla daha az ısı taşır. Hava debisinden ısı yükü için <Link href="/debi-isi-yuku-hesaplama">debiden ısı yükü</Link> aracını kullanın.
            </p>
          </>
        ),
      },
      {
        id: "rakim",
        title: "Rakıma göre hava yoğunluğu",
        body: (
          <>
            <DataTable
              caption="ICAO standart atmosferinde basınç, sıcaklık ve yoğunluk"
              head={["Rakım (m)", "Basınç (hPa)", "Sıcaklık (°C)", "Yoğunluk (kg/m³)", "Deniz seviyesine oran"]}
              rows={isaAlts.map((h) => [f(h, 0), f(isaPressureKpa(h) * 10, 0), f(15 - 0.0065 * h, 1), f(isaRho(h), 3), `%${f((isaRho(h) / isaRho(0)) * 100, 0)}`])}
            />
            <p>
              Standart atmosferde sıcaklık her 1000 m'de 6,5 °C düşer. Gerçek hava sıcaklığının standarttan farkı uçuş performansını etkiler; bunun için <Link href="/yogunluk-irtifasi-hesaplama">yoğunluk irtifası</Link>{" "}
              hesaplayıcısına, il merkezlerinin rakımı için <Link href="/il-rakimlari">il rakımları</Link> sayfasına bakın.
            </p>
          </>
        ),
      },
      {
        id: "nem",
        title: "Nemli hava ve sınırlar",
        body: (
          <p>
            Tablo kuru hava içindir. Su buharının molar kütlesi (18 g/mol) havanınkinden (29 g/mol) küçük olduğu için nemli hava aynı sıcaklık ve basınçta kuru havadan biraz hafiftir; 20 °C ve %50 bağıl nemde fark %1'in
            altındadır. Değerler ısıl iletkenlik ve viskozite dahil Lemmon ve arkadaşlarının hava denklem setinden gelir.
          </p>
        ),
      },
    ],
    faq: [
      { question: "Havanın yoğunluğu kaç kg/m³?", answer: `Deniz seviyesinde 1 atm basınçta 20 °C'de ${f(a20.rho, 3)} kg/m³, 15 °C'de ${f(air(15).rho, 3)} kg/m³'tür. Standart atmosfer yoğunluğu 1,225 kg/m³ (15 °C) olarak bilinir.` },
      { question: "Havanın özgül ısısı nedir?", answer: `Sabit basınçta 20 °C'de ${f(a20.cp, 4)} kJ/(kg·K). HVAC hesaplarında 1,005 kJ/(kg·K) alınır.` },
      { question: "Rakım hava yoğunluğunu ne kadar etkiler?", answer: `Aynı sıcaklıkta 1000 m'de yoğunluk deniz seviyesinin yaklaşık %${f((isaPressureKpa(1000) / ATM_KPA) * 100, 0)}'i, 2000 m'de %${f((isaPressureKpa(2000) / ATM_KPA) * 100, 0)}'idir.` },
      { question: "20 °C havanın kinematik viskozitesi nedir?", answer: `1 atm'de ${sig(a20.nu)} mm²/s (${sig(a20.nu)}·10⁻⁶ m²/s). Dinamik viskozite ${sig(a20.mu)} µPa·s'dir.` },
    ],
    sources:
      "Değerler CoolProp 8 ile Lemmon ve diğ. (2000) hava denklem seti ve Lemmon & Jacobsen (2004) taşınım özelliklerinden üretildi. Üretim betiği yoğunluğu ideal gaz yasasıyla karşılaştırır (fark %0,3'ten küçük). Standart atmosfer: ICAO Doc 7488.",
  };
}

const ARTICLES: Record<FluidKind, () => ToolArticle> = { water: waterArticle, steam: steamArticle, boiling: boilingArticle, air: airArticle };
const TOOLS: Record<FluidKind, () => ReactNode> = {
  water: () => <WaterPropsTool />,
  steam: () => <SteamTableTool />,
  boiling: () => <BoilingPointTool />,
  air: () => <AirPropsTool />,
};

export const fluidMetadata = (kind: FluidKind) => toolArticleMetadata(ARTICLES[kind]());

export default function FluidPage({ kind }: { kind: FluidKind }) {
  return <ToolArticlePage article={ARTICLES[kind]()} tool={TOOLS[kind]()} />;
}
