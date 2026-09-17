"use client";

import { useState } from "react";
import {
  calculateCropToFit,
  getAspectRatioLabel,
  socialMediaSizes,
} from "../../converter/socialMediaImageSizes";

const contentTypeLabelsUz: Record<string, string> = {
  "ig-square": "Kvadrat Post",
  "ig-portrait": "Vertikal Post",
  "ig-landscape": "Gorizontal Post",
  "ig-story": "Story / Reels",
  "ig-profile": "Profil Surati",
  "yt-thumbnail": "Video Thumbnail",
  "yt-cover": "Kanal Muqova Surati",
  "yt-profile": "Profil Surati",
  "fb-cover": "Muqova Surati",
  "fb-post-square": "Post (Kvadrat)",
  "fb-post-landscape": "Post (Gorizontal)",
  "fb-profile": "Profil Surati",
  "x-cover": "Muqova Surati (Banner)",
  "x-post": "Post Rasmi",
  "x-profile": "Profil Surati",
  "li-cover": "Muqova Surati",
  "li-post": "Post",
  "li-profile": "Profil Surati",
  "tiktok-video": "Video (Vertikal)",
};

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

export default function SocialMediaSizeCalculatorUz() {
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
          <span>Platforma va Kontent Turi</span>
          <select value={selectedId} onChange={(event) => setSelectedId(event.target.value)}>
            {socialMediaSizes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.platform} — {contentTypeLabelsUz[item.id] ?? item.contentType}
              </option>
            ))}
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>O&apos;z Rasmingizning Kengligi (px, ixtiyoriy)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="masalan 1920"
            value={ownWidth}
            onChange={(event) => setOwnWidth(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>O&apos;z Rasmingizning Balandligi (px, ixtiyoriy)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="masalan 1080"
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
                  <strong>{selected.platform} — {contentTypeLabelsUz[selected.id] ?? selected.contentType}</strong>
                </td>
                <td>
                  <strong>
                    {selected.widthPx} × {selected.heightPx} px
                  </strong>
                </td>
              </tr>
              <tr>
                <td>En-Bo&apos;y Nisbati</td>
                <td>{getAspectRatioLabel(selected.widthPx, selected.heightPx)}</td>
              </tr>
              {cropSuggestion && (
                <tr>
                  <td>Rasmning Mosligi</td>
                  <td>
                    {cropSuggestion.matchesExactly
                      ? "Nisbat aynan mos, kesish shart emas"
                      : cropSuggestion.cropDirection === "width"
                        ? `Yon tomonlardan jami ~${Math.round(cropSuggestion.croppedFromPx)} px kesilishi kerak`
                        : `Yuqori/pastdan jami ~${Math.round(cropSuggestion.croppedFromPx)} px kesilishi kerak`}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Ijtimoiy Media Tasvir O&apos;lchamlari Jadvali (px)</caption>
          <thead>
            <tr>
              <th scope="col">Platforma</th>
              <th scope="col">Kontent Turi</th>
              <th scope="col">O&apos;lcham (px)</th>
              <th scope="col">Nisbat</th>
            </tr>
          </thead>
          <tbody>
            {socialMediaSizes.map((item) => (
              <tr key={item.id} className={item.id === selectedId ? "is-active" : undefined}>
                <td>{item.platform}</td>
                <td>{contentTypeLabelsUz[item.id] ?? item.contentType}</td>
                <td>{item.widthPx} × {item.heightPx}</td>
                <td>{getAspectRatioLabel(item.widthPx, item.heightPx)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> Bu o&apos;lchamlar platformalarning
        keng qabul qilingan joriy standartlaridir; platformalar bu
        qiymatlarni vaqti-vaqti bilan o&apos;zgartirishi mumkin. Muhim
        dizayn uchun platformaning o&apos;z joriy yordam sahifasini
        ham tekshirishingiz tavsiya etiladi.
      </p>
    </div>
  );
}
