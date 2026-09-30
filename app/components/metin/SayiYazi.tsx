"use client";

import { useState } from "react";
import { sayiYaziya, type YaziAyar } from "../../converter/metin/turkce";
import CopyResultButton from "../CopyResultButton";

const ORNEKLER = ["1.250,50", "15.000", "1.000.000", "999,99", "2026"];

/** Sayıyı ve para tutarını Türkçe yazıya çevirir (çek, senet, fatura). */
export default function SayiYazi() {
  const [girdi, setGirdi] = useState("1.250,50");
  const [ayar, setAyar] = useState<YaziAyar>({
    para: "turkLirasi",
    bitisik: false,
    buyukHarf: false,
  });
  const sonuc = sayiYaziya(girdi, ayar);
  const cek = sayiYaziya(girdi, {
    para: "tl",
    bitisik: true,
    buyukHarf: false,
  });
  return (
    <div className="date-calc gorsel-arac">
      <div className="date-calc-input">
        <label className="date-calc-field">
          <span>Sayı veya tutar (ör. 1.250,50)</span>
          <span className="date-calc-field-row">
            <input
              type="text"
              inputMode="decimal"
              value={girdi}
              onChange={(e) => setGirdi(e.target.value)}
              aria-invalid={!sonuc}
            />
          </span>
        </label>
        <div className="ag-ornekler">
          {ORNEKLER.map((o) => (
            <button key={o} type="button" onClick={() => setGirdi(o)}>
              {o}
            </button>
          ))}
        </div>
      </div>
      <div className="ag-secimler">
        <label className="date-calc-field">
          <span>Para birimi</span>
          <span className="date-calc-field-row">
            <select
              value={ayar.para}
              onChange={(e) =>
                setAyar({ ...ayar, para: e.target.value as YaziAyar["para"] })
              }
            >
              <option value="turkLirasi">Türk lirası / kuruş</option>
              <option value="tl">TL / Kr</option>
              <option value="yok">Yok (yalnızca sayı)</option>
            </select>
          </span>
        </label>
        <label className="date-calc-check">
          <input
            type="checkbox"
            checked={ayar.bitisik}
            onChange={(e) => setAyar({ ...ayar, bitisik: e.target.checked })}
          />{" "}
          Bitişik yaz (BinİkiYüz…)
        </label>
        <label className="date-calc-check">
          <input
            type="checkbox"
            checked={ayar.buyukHarf}
            onChange={(e) => setAyar({ ...ayar, buyukHarf: e.target.checked })}
          />{" "}
          BÜYÜK HARF
        </label>
      </div>
      {sonuc ? (
        <>
          <div className="metin-sonuc">
            <div className="metin-sonuc-ust">
              <b>Yazıyla</b>
              <CopyResultButton text={sonuc} locale="tr" />
            </div>
            <div className="metin-sonuc-govde metin-buyuk">{sonuc}</div>
          </div>
          {cek && !ayar.bitisik ? (
            <p className="date-calc-note">
              Çek ve senet için bitişik yazım: <b>#{cek}#</b>. Başa ve sona #
              işareti koymak sonradan ekleme yapılmasını önler.
            </p>
          ) : null}
        </>
      ) : (
        <p className="gorsel-hata">
          Geçerli bir sayı yazın (ör. 1.250,50 veya 1250.50).
        </p>
      )}
    </div>
  );
}
