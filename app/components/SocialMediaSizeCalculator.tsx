"use client";

import { useState } from "react";
import {
  calculateCropToFit,
  getAspectRatioLabel,
  socialMediaSizes,
} from "../converter/socialMediaImageSizes";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

export default function SocialMediaSizeCalculator() {
  const [selectedId, setSelectedId] = useState(socialMediaSizes[0].id);
  const [ownWidth, setOwnWidth] = useState("");
  const [ownHeight, setOwnHeight] = useState("");

  const selected =
    socialMediaSizes.find((item) => item.id === selectedId) ?? socialMediaSizes[0];

  const cropSuggestion = calculateCropToFit(
    parseNumericValue(ownWidth),
    parseNumericValue(ownHeight),
    selected.widthPx,
    selected.heightPx
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Platform ve İçerik Türü</span>
          <select value={selectedId} onChange={(event) => setSelectedId(event.target.value)}>
            {socialMediaSizes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.platform} — {item.contentType}
              </option>
            ))}
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>Kendi Görselinin Genişliği (px, opsiyonel)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Örn. 1920"
            value={ownWidth}
            onChange={(event) => setOwnWidth(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Kendi Görselinin Yüksekliği (px, opsiyonel)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Örn. 1080"
            value={ownHeight}
            onChange={(event) => setOwnHeight(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <tbody>
              <tr className="is-active">
                <td>
                  <strong>{selected.platform} — {selected.contentType}</strong>
                </td>
                <td>
                  <strong>
                    {selected.widthPx} × {selected.heightPx} px
                  </strong>
                </td>
              </tr>
              <tr>
                <td>En-Boy Oranı</td>
                <td>{getAspectRatioLabel(selected.widthPx, selected.heightPx)}</td>
              </tr>
              {cropSuggestion && (
                <tr>
                  <td>Görselin Uyumu</td>
                  <td>
                    {cropSuggestion.matchesExactly
                      ? "Oran tam uyuyor, kırpma gerekmez"
                      : cropSuggestion.cropDirection === "width"
                        ? `Yanlardan toplam ~${Math.round(cropSuggestion.croppedFromPx)} px kırpılması gerekir`
                        : `Üst/alttan toplam ~${Math.round(cropSuggestion.croppedFromPx)} px kırpılması gerekir`}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Sosyal Medya Görsel Boyutları Tablosu (px)</caption>
          <thead>
            <tr>
              <th scope="col">Platform</th>
              <th scope="col">İçerik Türü</th>
              <th scope="col">Boyut (px)</th>
              <th scope="col">Oran</th>
            </tr>
          </thead>
          <tbody>
            {socialMediaSizes.map((item) => (
              <tr key={item.id} className={item.id === selectedId ? "is-active" : undefined}>
                <td>{item.platform}</td>
                <td>{item.contentType}</td>
                <td>{item.widthPx} × {item.heightPx}</td>
                <td>{getAspectRatioLabel(item.widthPx, item.heightPx)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Bu boyutlar platformların yaygın kabul
        gören güncel standartlarıdır; platformlar bu değerleri zaman
        zaman değiştirebilir. Kritik bir tasarım için platformun kendi
        güncel yardım sayfasını da kontrol et.
      </p>
    </div>
  );
}
