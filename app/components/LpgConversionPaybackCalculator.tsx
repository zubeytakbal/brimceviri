"use client";

import { useState } from "react";
import {
  calculateLpgConversionPayback,
  lpgConversionDefaults,
} from "../converter/lpgConversionPayback";
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

type LpgConversionPaybackCalculatorProps = {
  liveGasolinePrice?: LiveFuelPrice | null;
  liveLpgPrice?: LiveFuelPrice | null;
};

export default function LpgConversionPaybackCalculator({
  liveGasolinePrice = null,
  liveLpgPrice = null,
}: LpgConversionPaybackCalculatorProps) {
  const [annualKm, setAnnualKm] = useState("15000");
  const [gasolineConsumption, setGasolineConsumption] = useState("7.5");
  const [consumptionIncrease, setConsumptionIncrease] = useState(
    String(lpgConversionDefaults.lpgConsumptionIncreasePercent),
  );
  const [gasolinePrice, setGasolinePrice] = useState(
    liveGasolinePrice ? String(liveGasolinePrice.priceTl) : "",
  );
  const [lpgPrice, setLpgPrice] = useState(
    liveLpgPrice ? String(liveLpgPrice.priceTl) : "",
  );
  const [conversionCost, setConversionCost] = useState(
    String(lpgConversionDefaults.conversionCostTl),
  );
  const [maintenanceCost, setMaintenanceCost] = useState(
    String(lpgConversionDefaults.annualMaintenanceCostTl),
  );

  const result = calculateLpgConversionPayback({
    annualKm: parseNumericValue(annualKm),
    gasolineConsumptionPer100Km: parseNumericValue(gasolineConsumption),
    lpgConsumptionIncreasePercent: parseNumericValue(consumptionIncrease),
    gasolinePriceTl: parseNumericValue(gasolinePrice),
    lpgPriceTl: parseNumericValue(lpgPrice),
    conversionCostTl: parseNumericValue(conversionCost),
    annualMaintenanceCostTl: parseNumericValue(maintenanceCost),
  });

  return (
    <div className="category-general-converter">
      <form
        className="paint-calculator-grid"
        toolname="lpg-conversion-payback"
        tooldescription="Kullanıcının yıllık kilometresi, aracının tüketimi, LPG/benzin fiyatları ve dönüşüm maliyetinden, LPG dönüşümünün kaç yılda (ve kaç km'de) kendini amorti ettiğini hesaplar."
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
          <span>Benzin Tüketimi (lt/100km)</span>
          <input
            type="text"
            inputMode="decimal"
            name="gasolineConsumptionPer100Km"
            tool-param-description="Aracın benzinle 100 km'de tükettiği litre yakıt"
            value={gasolineConsumption}
            onChange={(event) => setGasolineConsumption(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>LPG&apos;de Tüketim Artışı (%)</span>
          <input
            type="text"
            inputMode="decimal"
            name="lpgConsumptionIncreasePercent"
            tool-param-description="LPG dönüşümü sonrası litre bazında tüketimin benzine göre yüzde kaç arttığı"
            value={consumptionIncrease}
            onChange={(event) => setConsumptionIncrease(event.target.value)}
          />
          <small className="calculator-field-note">
            Piyasa genelinde %20-25 aralığı görülüyor, varsayılan %22 —
            kendi aracının değerini biliyorsan güncelle.
          </small>
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
          <span>Güncel LPG Fiyatı (₺/lt)</span>
          <input
            type="text"
            inputMode="decimal"
            name="lpgPriceTl"
            tool-param-description="Litre başına güncel LPG (otogaz) fiyatı, TL"
            placeholder="Bugünkü fiyatı gir"
            value={lpgPrice}
            onChange={(event) => setLpgPrice(event.target.value)}
          />
          {liveLpgPrice && (
            <small className="calculator-field-note">
              Kaynak: {liveLpgPrice.source}, {formatTrDateShort(liveLpgPrice.dateIso)}{" "}
              — dilersen güncelleyebilirsin.
            </small>
          )}
        </label>
        <label className="category-general-converter-field">
          <span>Dönüşüm Sistemi Maliyeti (₺)</span>
          <input
            type="text"
            inputMode="decimal"
            name="conversionCostTl"
            tool-param-description="LPG dönüşüm sisteminin montaj dahil toplam maliyeti, TL"
            value={conversionCost}
            onChange={(event) => setConversionCost(event.target.value)}
          />
          <small className="calculator-field-note">
            2026 piyasasında sıralı 4 silindir sistemler için 17.500-23.500
            ₺ bandı yaygın; DI/turbo motorlarda daha yüksek olabilir.
          </small>
        </label>
        <label className="category-general-converter-field">
          <span>Yıllık Ek Bakım Maliyeti (₺)</span>
          <input
            type="text"
            inputMode="decimal"
            name="annualMaintenanceCostTl"
            tool-param-description="LPG sisteminin yıllık periyodik bakım/ayar gideri, TL"
            value={maintenanceCost}
            onChange={(event) => setMaintenanceCost(event.target.value)}
          />
        </label>
      </form>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>Geçerli değerler girerek hesaplamayı gör.</strong>
        ) : (
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr>
                  <td>LPG Tüketimi (tahmini)</td>
                  <td>
                    {result.lpgConsumptionPer100Km.toLocaleString("tr-TR", {
                      maximumFractionDigits: 1,
                    })}{" "}
                    lt/100km
                  </td>
                </tr>
                <tr>
                  <td>Yıllık Benzin Maliyeti</td>
                  <td>{formatTl(result.annualGasolineCostTl)} ₺</td>
                </tr>
                <tr>
                  <td>Yıllık LPG Maliyeti (bakım dahil)</td>
                  <td>{formatTl(result.annualLpgTotalCostTl)} ₺</td>
                </tr>
                <tr className="is-active">
                  <td>
                    <strong>Yıllık Tasarruf</strong>
                  </td>
                  <td>
                    <strong>{formatTl(result.annualNetSavingsTl)} ₺</strong>
                  </td>
                </tr>
                <tr>
                  <td>Dönüşüm Maliyetinin Amortismanı</td>
                  <td>
                    {result.breakEvenYears === null
                      ? "Bu tüketim/fiyatlarla LPG daha pahalıya geliyor"
                      : `${result.breakEvenYears.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} yıl (~${formatTl(result.breakEvenKm ?? 0)} km)`}
                  </td>
                </tr>
              </tbody>
            </table>
            <ShareResultButton
              shareText={
                result.breakEvenYears === null
                  ? `LPG dönüşümünü hesapladım, bu rakamlarla avantajlı çıkmıyor. Sen de kendi rakamlarınla hesapla:`
                  : `LPG dönüşümü yılda ${formatTl(result.annualNetSavingsTl)} ₺ tasarruf ettiriyor, ${result.breakEvenYears.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} yılda kendini çıkarıyor! Sen de kendi rakamlarınla hesapla:`
              }
              shareUrl={buildSiteUrl("/lpg-donusum-amortisman-hesaplama")}
            />
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> LPG tüketim artışı, dönüşüm maliyeti ve
        yıllık bakım gideri araca ve monte eden servise göre değişir —
        yukarıdaki değerler 2026 piyasa ortalamalarıdır, kendi
        aracın/servisin verdiği rakamları kullanman daha doğru sonuç
        verir. Benzin ve LPG fiyatları mümkün olduğunda güncel ulusal
        referans fiyatıyla otomatik doluyor.
      </p>
    </div>
  );
}
