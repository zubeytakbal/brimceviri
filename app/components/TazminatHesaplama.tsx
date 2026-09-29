"use client";

import { useEffect, useState } from "react";
import { parseYmd } from "../converter/time/dateMath";
import {
  AYRILIS_NEDENLERI,
  tazminat,
  type AyrilisNedeni,
} from "../converter/turkishTazminat";

const tl = (n: number) =>
  `${n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\u00A0TL`;
const tarih = (d: { year: number; month: number; day: number }) =>
  new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(d.year, d.month - 1, d.day)));
const pad = (n: number) => String(n).padStart(2, "0");

/** "50.000", "50.000,50", "50000.5" → sayı */
function parseTl(raw: string) {
  let s = raw.replace(/[\sTL₺]/gi, "");
  if (!s) return Number.NaN;
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
  const n = Number(s);
  return Number.isFinite(n) ? n : Number.NaN;
}

export default function TazminatHesaplama() {
  const [giris, setGiris] = useState("2020-03-01");
  const [cikis, setCikis] = useState("");
  const [brut, setBrut] = useState("50.000");
  const [ek, setEk] = useState("0");
  const [neden, setNeden] = useState<AyrilisNedeni>("isveren-fesih");
  const [matrah, setMatrah] = useState("");

  // Bugünün tarihi tarayıcıda atanır (sayfa statik üretiliyor).
  useEffect(() => {
    const n = new Date();
    setCikis(`${n.getFullYear()}-${pad(n.getMonth() + 1)}-${pad(n.getDate())}`); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  const g = parseYmd(giris);
  const c = parseYmd(cikis);
  const b = parseTl(brut);
  const e = parseTl(ek) || 0;
  const m = matrah.trim() ? parseTl(matrah) : null;
  const gecerli = g && c && Number.isFinite(b) && b > 0 && cikis >= giris;
  const r = gecerli
    ? tazminat({
        giris: g!,
        cikis: c!,
        brutMaas: b,
        ekOdemeler: e,
        neden,
        kumulatifMatrah: m !== null && Number.isFinite(m) ? m : null,
      })
    : null;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>İşe giriş tarihi</span>
            <input
              type="date"
              value={giris}
              onChange={(event) => setGiris(event.target.value)}
            />
          </label>
          <label className="date-calc-field">
            <span>İşten çıkış tarihi</span>
            <input
              type="date"
              value={cikis}
              onChange={(event) => setCikis(event.target.value)}
            />
          </label>
          <label className="date-calc-field">
            <span>Son brüt maaş (TL)</span>
            <input
              inputMode="decimal"
              value={brut}
              onChange={(event) => setBrut(event.target.value)}
            />
          </label>
          <label className="date-calc-field">
            <span>Düzenli ek ödemeler (aylık, TL)</span>
            <input
              inputMode="decimal"
              value={ek}
              onChange={(event) => setEk(event.target.value)}
            />
            <small>yemek, yol, ikramiyenin aylık payı, düzenli prim</small>
          </label>
          <label className="date-calc-field">
            <span>Ayrılış nedeni</span>
            <select
              value={neden}
              onChange={(event) =>
                setNeden(event.target.value as AyrilisNedeni)
              }
            >
              {AYRILIS_NEDENLERI.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.label}
                </option>
              ))}
            </select>
          </label>
          <label className="date-calc-field">
            <span>Yıl içi kümülatif vergi matrahı (isteğe bağlı)</span>
            <input
              inputMode="decimal"
              value={matrah}
              placeholder="bordrodan"
              onChange={(event) => setMatrah(event.target.value)}
            />
            <small>
              boş bırakılırsa tahmin edilir; ihbar vergisini etkiler
            </small>
          </label>
        </div>
      </div>

      {r ? (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>Toplam net tazminat</span>
              <strong>{tl(r.toplamNet)}</strong>
              <em>
                Çalışma süresi {r.sure.yil} yıl {r.sure.ay} ay {r.sure.gun} gün
              </em>
            </div>
            <div className="date-calc-stat">
              <span>Kıdem tazminatı (net)</span>
              <strong>{r.kidemHakki ? tl(r.kidemNet) : "Hak yok"}</strong>
              <em>
                {!r.neden.kidem
                  ? "bu ayrılış nedeninde kıdem tazminatı ödenmez"
                  : !r.kidemHakki
                    ? "en az 1 yıl çalışma gerekir"
                    : `brüt ${tl(r.kidemBrut)}, yalnız damga vergisi kesilir`}
              </em>
            </div>
            <div className="date-calc-stat">
              <span>İhbar tazminatı (net)</span>
              <strong>{r.ihbarHafta ? tl(r.ihbarNet) : "Hak yok"}</strong>
              <em>
                {r.ihbarHafta
                  ? `${r.ihbarHafta} hafta, brüt ${tl(r.ihbarBrut)}`
                  : "işveren önelsiz çıkarmadıysa ödenmez"}
              </em>
            </div>
          </div>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <tbody>
                <tr>
                  <th scope="row">Giydirilmiş brüt ücret</th>
                  <td>{tl(r.giydirilmis)}</td>
                </tr>
                {r.tavan && (
                  <tr>
                    <th scope="row">Kıdem tavanı ({tarih(c!)} itibarıyla)</th>
                    <td>
                      {tl(r.tavan.tutar)}
                      {r.tavanaTakildi
                        ? " – ücretiniz tavanı aşıyor, tavan esas alındı"
                        : ""}
                    </td>
                  </tr>
                )}
                {r.kidemHakki && (
                  <>
                    <tr>
                      <th scope="row">Kıdem tazminatı brüt</th>
                      <td>{tl(r.kidemBrut)}</td>
                    </tr>
                    <tr>
                      <th scope="row">Damga vergisi (binde 7,59)</th>
                      <td>− {tl(r.kidemDamga)}</td>
                    </tr>
                  </>
                )}
                {r.ihbarHafta > 0 && (
                  <>
                    <tr>
                      <th scope="row">
                        İhbar tazminatı brüt ({r.ihbarHafta * 7} gün)
                      </th>
                      <td>{tl(r.ihbarBrut)}</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        Gelir vergisi{r.kumulatifTahmin ? " (tahmini)" : ""}
                      </th>
                      <td>− {tl(r.ihbarGelirVergisi)}</td>
                    </tr>
                    <tr>
                      <th scope="row">Damga vergisi</th>
                      <td>− {tl(r.ihbarDamga)}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          {!r.tavan && (
            <p className="date-calc-note">
              Bu çıkış tarihi için kayıtlı bir kıdem tavanı yok; tavan
              uygulanmadan hesaplandı.
            </p>
          )}
        </>
      ) : (
        <p className="date-calc-note">
          Lütfen tarihleri ve brüt maaşı girin. Çıkış tarihi girişten sonra
          olmalı.
        </p>
      )}
    </div>
  );
}
