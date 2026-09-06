"use client";

import { useState } from "react";
import { calculateEvVsIceComparison, manualElectricityPriceDefault } from "../converter/evVsIceComparison";
import type { LiveFuelPrice } from "../converter/liveFuelPrice";
import { buildSiteUrl } from "../siteConfig";
import ShareResultButton from "./ShareResultButton";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatTl(value: number): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 0 });
}

function formatTrDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type EvVsIceComparisonCalculatorProps = {
  liveGasolinePrice?: LiveFuelPrice | null;
};

export default function EvVsIceComparisonCalculator({
  liveGasolinePrice = null,
}: EvVsIceComparisonCalculatorProps) {
  const [annualKm, setAnnualKm] = useState("15000");
  const [iceConsumption, setIceConsumption] = useState("7.5");
  const [gasolinePrice, setGasolinePrice] = useState(
    liveGasolinePrice ? String(liveGasolinePrice.priceTl) : ""
  );
  const [evConsumption, setEvConsumption] = useState("18");
  const [electricityPrice, setElectricityPrice] = useState(
    String(manualElectricityPriceDefault.priceTl)
  );
  const [priceDifference, setPriceDifference] = useState("");

  const result = calculateEvVsIceComparison({
    annualKm: parseNumericValue(annualKm),
    iceConsumptionPer100Km: parseNumericValue(iceConsumption),
    gasolinePriceTl: parseNumericValue(gasolinePrice),
    evConsumptionPer100Km: parseNumericValue(evConsumption),
    electricityPriceTl: parseNumericValue(electricityPrice),
    priceDifferenceTl: priceDifference.trim() ? parseNumericValue(priceDifference) : 0,
  });

  return (
    <div className="category-general-converter">
      {/*
        WebMCP (deneysel W3C taslagi, 2026) ozniteligi: toolname/tooldescription
        ve tool-param-description, tarayicinin/yapay zeka ajanlarinin bu formu
        "elektrikli araç vs benzinli araç maliyet karsilastirma" araci olarak
        tanimasini saglar. Su an sadece Chrome origin trial'inda destekleniyor;
        desteklemeyen taraycilarda bu oznitelikler yoksayilir, hicbir davranis
        degismez -- ilerleyici bir eklenti, bagimlilik degil.
      */}
      <form
        className="paint-calculator-grid"
        toolname="ev-vs-ice-cost-comparison"
        tooldescription="Kullanıcının yıllık kilometresi, araç tüketimleri, yakıt/elektrik fiyatları ve iki araç arasındaki fiyat farkından, elektrikli aracın benzinliye göre kaç yılda (ve kaç km'de) kendini amorti ettiğini hesaplar."
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="category-general-converter-field">
          <span>Yıllık Kilometre (km)</span>
          <input
            type="text"
            inputMode="decimal"
            name="annualKm"
            tool-param-description="Yıllık kaç kilometre yol yapıldığı"
            value={annualKm}
            onChange={(event) => setAnnualKm(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Benzinli Araç Tüketimi (lt/100km)</span>
          <input
            type="text"
            inputMode="decimal"
            name="iceConsumptionPer100Km"
            tool-param-description="Benzinli aracın 100 km'de tükettiği litre yakıt"
            value={iceConsumption}
            onChange={(event) => setIceConsumption(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Güncel Benzin Fiyatı (₺/lt)</span>
          <input
            type="text"
            inputMode="decimal"
            name="gasolinePriceTl"
            tool-param-description="Litre başına güncel benzin fiyatı, TL"
            placeholder="Bugünkü fiyatı gir"
            value={gasolinePrice}
            onChange={(event) => setGasolinePrice(event.target.value)}
          />
          {liveGasolinePrice && (
            <small className="calculator-field-note">
              Kaynak: {liveGasolinePrice.source}, {formatTrDateShort(liveGasolinePrice.dateIso)}{" "}
              — dilersen güncelleyebilirsin.
            </small>
          )}
        </label>
        <label className="category-general-converter-field">
          <span>Elektrikli Araç Tüketimi (kWh/100km)</span>
          <input
            type="text"
            inputMode="decimal"
            name="evConsumptionPer100Km"
            tool-param-description="Elektrikli aracın 100 km'de tükettiği kWh"
            value={evConsumption}
            onChange={(event) => setEvConsumption(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Güncel Elektrik Fiyatı (₺/kWh)</span>
          <input
            type="text"
            inputMode="decimal"
            name="electricityPriceTl"
            tool-param-description="kWh başına güncel elektrik fiyatı, TL"
            placeholder="Faturandaki birim fiyatı gir"
            value={electricityPrice}
            onChange={(event) => setElectricityPrice(event.target.value)}
          />
          <small className="calculator-field-note">
            Son güncelleme: {manualElectricityPriceDefault.lastUpdatedLabel} (240
            kWh/ay üstü mesken dilimi, KDV dahil) — faturandan bakıp
            güncelleyebilirsin.
          </small>
        </label>
        <label className="category-general-converter-field">
          <span>Araçlar Arası Fiyat Farkı (₺)</span>
          <input
            type="text"
            inputMode="decimal"
            name="priceDifferenceTl"
            tool-param-description="İki araç arasındaki satın alma fiyat farkı, TL"
            placeholder="Örn. 600000"
            value={priceDifference}
            onChange={(event) => setPriceDifference(event.target.value)}
          />
        </label>
      </form>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>Geçerli değerler girerek karşılaştırmayı gör.</strong>
        ) : (
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr>
                  <td>Yıllık Benzin Maliyeti</td>
                  <td>{formatTl(result.annualGasolineCostTl)} ₺</td>
                </tr>
                <tr>
                  <td>Yıllık Elektrik Maliyeti</td>
                  <td>{formatTl(result.annualElectricityCostTl)} ₺</td>
                </tr>
                <tr className="is-active">
                  <td>
                    <strong>Yıllık Tasarruf</strong>
                  </td>
                  <td>
                    <strong>{formatTl(result.annualSavingsTl)} ₺</strong>
                  </td>
                </tr>
                <tr>
                  <td>Fiyat Farkının Kapanma Süresi</td>
                  <td>
                    {result.breakEvenYears === null
                      ? "Fiyat farkı girilmedi"
                      : `${result.breakEvenYears.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} yıl (~${formatTl(result.breakEvenKm ?? 0)} km)`}
                  </td>
                </tr>
              </tbody>
            </table>
            <ShareResultButton
              shareText={
                result.breakEvenYears === null
                  ? `Elektrikli araçla yılda ${formatTl(result.annualSavingsTl)} ₺ tasarruf ediyormuşum! Sen de kendi rakamlarınla hesapla:`
                  : `Elektrikli araç fiyat farkını ${result.breakEvenYears.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} yılda kapatıyor, yılda ${formatTl(result.annualSavingsTl)} ₺ tasarruf! Sen de kendi rakamlarınla hesapla:`
              }
              shareUrl={buildSiteUrl("/elektrikli-arac-maliyet-karsilastirma")}
            />
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Tüketim varsayılanları (7,5 lt/100km
        benzinli, 18 kWh/100km elektrikli) Türkiye ortalamasına dayanan
        genel referanstır — kendi aracının tüketimini biliyorsan onu
        gir. Benzin fiyatı mümkün olduğunda güncel ulusal referans
        fiyatıyla otomatik doluyor; elektrik fiyatı ise EPDK&apos;nın
        sabit bir takvimi olmadığı için (son güncelleme tarihi
        yukarıda belirtilmiştir) manuel bir varsayılanla geliyor —
        ikisi de dilersen değiştirilebilir. Araçlar arası fiyat farkı
        tamamen kişisel bir değer, mutlaka kendin gir.
      </p>
    </div>
  );
}
