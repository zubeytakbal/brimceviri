"use client";

import type { FiligranAyar, Konum } from "./filigranCiz";

const KONUMLAR: Array<{ id: Konum; ad: string }> = [
  { id: "sol-ust", ad: "↖" },
  { id: "ust", ad: "↑" },
  { id: "sag-ust", ad: "↗" },
  { id: "sol", ad: "←" },
  { id: "orta", ad: "•" },
  { id: "sag", ad: "→" },
  { id: "sol-alt", ad: "↙" },
  { id: "alt", ad: "↓" },
  { id: "sag-alt", ad: "↘" },
];

/** Filigran ayarları (yazı/logo, boyut, opaklık, açı, konum). Görsel ve PDF filigranında ortak. */
export default function FiligranPaneli({
  ayar,
  ayarla,
  logoSec,
  kimlikHazir,
  kapsam = "gorsel",
}: {
  ayar: FiligranAyar;
  ayarla: (p: Partial<FiligranAyar>) => void;
  logoSec: (f?: File) => void;
  kimlikHazir?: () => void;
  kapsam?: "gorsel" | "sayfa";
}) {
  return (
    <div className="date-calc-input">
      <div
        className="date-converter-modes"
        role="tablist"
        aria-label="Filigran türü"
      >
        <button
          type="button"
          role="tab"
          aria-selected={ayar.tur === "yazi"}
          className={ayar.tur === "yazi" ? "is-active" : undefined}
          onClick={() =>
            ayarla({
              tur: "yazi",
              boyut: ayar.tur === "logo" ? 6 : ayar.boyut,
            })
          }
        >
          Yazı
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={ayar.tur === "logo"}
          className={ayar.tur === "logo" ? "is-active" : undefined}
          onClick={() =>
            ayarla({
              tur: "logo",
              boyut: ayar.tur === "yazi" ? 20 : ayar.boyut,
            })
          }
        >
          Logo
        </button>
        {kimlikHazir ? (
          <button
            type="button"
            className="filigran-hazir"
            onClick={kimlikHazir}
          >
            🪪 Kimlik fotokopisi
          </button>
        ) : null}
      </div>

      <div className="date-calc-fields">
        {ayar.tur === "yazi" ? (
          <label className="date-calc-field filigran-yazi">
            <span>Filigran yazısı (yeni satır için Enter)</span>
            <span className="date-calc-field-row">
              <textarea
                rows={2}
                value={ayar.yazi}
                onChange={(e) => ayarla({ yazi: e.target.value })}
              />
            </span>
          </label>
        ) : (
          <label className="date-calc-field">
            <span>Logo (saydam PNG önerilir)</span>
            <span className="date-calc-field-row">
              <input
                type="file"
                accept="image/png,image/*"
                onChange={(e) => void logoSec(e.target.files?.[0])}
              />
            </span>
          </label>
        )}
        {ayar.tur === "yazi" ? (
          <label className="date-calc-field">
            <span>Renk</span>
            <span className="date-calc-field-row">
              <input
                type="color"
                value={ayar.renk}
                onChange={(e) => ayarla({ renk: e.target.value })}
                aria-label="Yazı rengi"
              />
            </span>
          </label>
        ) : null}
      </div>

      <div className="date-calc-fields">
        <label className="date-calc-field">
          <span>Boyut: %{ayar.boyut}</span>
          <span className="date-calc-field-row">
            <input
              type="range"
              min={1}
              max={ayar.tur === "logo" ? 60 : 25}
              step={0.5}
              value={ayar.boyut}
              onChange={(e) => ayarla({ boyut: Number(e.target.value) })}
              aria-label="Boyut"
            />
          </span>
        </label>
        <label className="date-calc-field">
          <span>Opaklık: %{Math.round(ayar.saydamlik * 100)}</span>
          <span className="date-calc-field-row">
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={ayar.saydamlik}
              onChange={(e) => ayarla({ saydamlik: Number(e.target.value) })}
              aria-label="Opaklık"
            />
          </span>
        </label>
        <label className="date-calc-field">
          <span>Açı: {ayar.aci}°</span>
          <span className="date-calc-field-row">
            <input
              type="range"
              min={-60}
              max={60}
              step={5}
              value={ayar.aci}
              onChange={(e) => ayarla({ aci: Number(e.target.value) })}
              aria-label="Açı"
            />
          </span>
        </label>
      </div>

      <div className="filigran-konum">
        <span>Konum</span>
        <div
          className="filigran-izgara"
          role="group"
          aria-label="Filigran konumu"
        >
          {KONUMLAR.map((k) => (
            <button
              key={k.id}
              type="button"
              aria-pressed={ayar.konum === k.id}
              aria-label={k.id}
              className={ayar.konum === k.id ? "is-active" : undefined}
              onClick={() => ayarla({ konum: k.id })}
            >
              {k.ad}
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-pressed={ayar.konum === "dose"}
          className={`filigran-dose${ayar.konum === "dose" ? " is-active" : ""}`}
          onClick={() => ayarla({ konum: "dose" })}
        >
          ▦ {kapsam === "sayfa" ? "Tüm sayfaya döşe" : "Tüm görsele döşe"}
        </button>
        {ayar.tur === "yazi" ? (
          <>
            <label className="date-calc-check">
              <input
                type="checkbox"
                checked={ayar.kalin}
                onChange={(e) => ayarla({ kalin: e.target.checked })}
              />{" "}
              Kalın
            </label>
            <label className="date-calc-check">
              <input
                type="checkbox"
                checked={ayar.golge}
                onChange={(e) => ayarla({ golge: e.target.checked })}
              />{" "}
              Gölge
            </label>
          </>
        ) : null}
      </div>
    </div>
  );
}
