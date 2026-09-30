"use client";

import { useState } from "react";
import {
  ibanDogrula,
  tcknDogrula,
  vknDogrula,
} from "../../converter/metin/dogrulama";

type Tur = "tckn" | "vkn" | "iban";

const AYAR: Record<
  Tur,
  { etiket: string; ornek: string; mod: "numeric" | "text" }
> = {
  tckn: { etiket: "TC kimlik numarası (11 hane)", ornek: "", mod: "numeric" },
  vkn: { etiket: "Vergi kimlik numarası (10 hane)", ornek: "", mod: "numeric" },
  iban: {
    etiket: "IBAN (ör. TR33 0006 1005 1978 6457 8413 26)",
    ornek: "TR33 0006 1005 1978 6457 8413 26",
    mod: "text",
  },
};

function dogrula(tur: Tur, s: string) {
  return tur === "tckn"
    ? tcknDogrula(s)
    : tur === "vkn"
      ? vknDogrula(s)
      : ibanDogrula(s);
}

/** TC kimlik no, vergi no ve IBAN kontrol hanesi doğrulayıcı; tek tek veya toplu. */
export default function NumaraDogrula({ tur }: { tur: Tur }) {
  const a = AYAR[tur];
  const [girdi, setGirdi] = useState(a.ornek);
  const [toplu, setToplu] = useState(false);
  const [liste, setListe] = useState("");
  const r = girdi.trim() ? dogrula(tur, girdi) : null;
  const iban = tur === "iban" && r ? ibanDogrula(girdi) : null;
  const satirlar = liste
    .split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean);
  return (
    <div className="date-calc gorsel-arac">
      <div
        className="date-converter-modes is-light"
        role="tablist"
        aria-label="Kip"
      >
        {[false, true].map((t) => (
          <button
            key={String(t)}
            type="button"
            role="tab"
            aria-selected={toplu === t}
            className={toplu === t ? "is-active" : ""}
            onClick={() => setToplu(t)}
          >
            {t ? "Toplu kontrol" : "Tek numara"}
          </button>
        ))}
      </div>
      {!toplu ? (
        <>
          <div className="date-calc-input">
            <label className="date-calc-field">
              <span>{a.etiket}</span>
              <span className="date-calc-field-row">
                <input
                  type="text"
                  inputMode={a.mod}
                  autoComplete="off"
                  spellCheck={false}
                  value={girdi}
                  onChange={(e) => setGirdi(e.target.value)}
                />
              </span>
            </label>
          </div>
          {r ? (
            <div
              className={`dogrula-sonuc ${r.gecerli ? "is-gecerli" : "is-gecersiz"}`}
              aria-live="polite"
            >
              <b>{r.gecerli ? "✅ Geçerli" : "❌ Geçersiz"}</b>
              <span>
                {r.gecerli
                  ? tur === "iban"
                    ? "Kontrol numarası doğru; IBAN'da yazım hatası yok."
                    : "Numara kontrol hanesi kurallarına uygun."
                  : r.neden}
              </span>
              {iban?.bicimli ? (
                <dl className="eyp-bilgi">
                  <div>
                    <dt>Yazım</dt>
                    <dd>{iban.bicimli}</dd>
                  </div>
                  {iban.ulke ? (
                    <div>
                      <dt>Ülke</dt>
                      <dd>{iban.ulke}</dd>
                    </div>
                  ) : null}
                  {iban.bankaKodu ? (
                    <div>
                      <dt>Banka kodu</dt>
                      <dd>{iban.bankaKodu}</dd>
                    </div>
                  ) : null}
                  {iban.hesap ? (
                    <div>
                      <dt>Hesap numarası</dt>
                      <dd>{iban.hesap}</dd>
                    </div>
                  ) : null}
                </dl>
              ) : null}
            </div>
          ) : null}
        </>
      ) : (
        <>
          <div className="date-calc-input">
            <label className="date-calc-field">
              <span>
                Her satıra bir numara yapıştırın (Excel sütunundan
                kopyalayabilirsiniz)
              </span>
              <textarea
                rows={8}
                value={liste}
                spellCheck={false}
                onChange={(e) => setListe(e.target.value)}
              />
            </label>
          </div>
          {satirlar.length ? (
            <>
              <p className="vesikalik-ozet">
                {satirlar.length} numara ·{" "}
                <b>{satirlar.filter((s) => dogrula(tur, s).gecerli).length}</b>{" "}
                geçerli ·{" "}
                <b>{satirlar.filter((s) => !dogrula(tur, s).gecerli).length}</b>{" "}
                geçersiz
              </p>
              <div className="port-tablo">
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Numara</th>
                      <th>Sonuç</th>
                    </tr>
                  </thead>
                  <tbody>
                    {satirlar.slice(0, 2000).map((s, i) => {
                      const x = dogrula(tur, s);
                      return (
                        <tr key={i} className={x.gecerli ? "" : "is-hatali"}>
                          <td>{i + 1}</td>
                          <td>
                            <code>{s}</code>
                          </td>
                          <td>{x.gecerli ? "✅ Geçerli" : `❌ ${x.neden}`}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}
        </>
      )}
      <p className="date-calc-note">
        Yalnızca numaranın yazım kurallarına (kontrol hanesine) uyup uymadığı
        denetlenir;
        {tur === "iban"
          ? " hesabın açık olduğu veya kime ait olduğu sorgulanmaz."
          : " kişinin veya kurumun kayıtlı olup olmadığı sorgulanmaz."}{" "}
        Numaralar tarayıcınızda kontrol edilir, hiçbir yere gönderilmez ve
        kaydedilmez.
      </p>
    </div>
  );
}
