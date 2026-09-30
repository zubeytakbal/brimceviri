"use client";

import { useEffect, useRef, useState } from "react";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import DosyaBirak from "../gorsel/DosyaBirak";
import { indir } from "../gorsel/tuval";
import type { ArsivDosya } from "./arsiv7z";

const KABUL =
  ".rar,.7z,.zip,.tar,.gz,.tgz,.bz2,.xz,.iso,.cab,.arj,.lzh,.z,.001";

/** RAR, 7Z, TAR.GZ ve diğer arşivleri açar; dosyaları tek tek veya ZIP olarak indirir. */
export default function ArsivAc({
  zipOdakli = false,
}: {
  zipOdakli?: boolean;
}) {
  const [dosya, setDosya] = useState<File | null>(null);
  const [liste, setListe] = useState<ArsivDosya[]>([]);
  const [sifre, setSifre] = useState("");
  const [sifreSor, setSifreSor] = useState(false);
  const [durum, setDurum] = useState("");
  const [hata, setHata] = useState("");
  const urller = useRef<string[]>([]);

  useEffect(
    () => () => {
      for (const u of urller.current) URL.revokeObjectURL(u);
    },
    [],
  );

  const ac = async (f: File, s = "") => {
    setHata("");
    setListe([]);
    setDurum("Arşiv açılıyor…");
    try {
      const { arsivAc, SifreGerekli } = await import("./arsiv7z");
      try {
        setListe(
          await arsivAc(new Uint8Array(await f.arrayBuffer()), f.name, s),
        );
        setSifreSor(false);
      } catch (e) {
        if (e instanceof SifreGerekli) {
          setSifreSor(true);
          if (s) setHata("Şifre yanlış.");
        } else throw e;
      }
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Arşiv açılamadı.");
    } finally {
      setDurum("");
    }
  };

  const tekIndir = (d: ArsivDosya) => {
    const u = URL.createObjectURL(new Blob([d.veri as BlobPart]));
    urller.current.push(u);
    indir(u, d.yol.split("/").pop()!);
  };

  const zipIndir = async () => {
    setDurum("ZIP hazırlanıyor…");
    const { zipSikistir } = await import("../../converter/gorsel/zip");
    const z = await zipSikistir(
      liste.map((d) => ({ ad: d.yol, veri: d.veri, tarih: d.tarih })),
    );
    const u = URL.createObjectURL(
      new Blob([z as BlobPart], { type: "application/zip" }),
    );
    urller.current.push(u);
    indir(u, `${dosya?.name.replace(/\.(tar\.)?[^.]+$/i, "") ?? "arsiv"}.zip`);
    setDurum("");
  };

  const toplam = liste.reduce((t, d) => t + d.veri.length, 0);

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        tur="belge"
        accept={KABUL}
        coklu={false}
        max={1}
        baslik={
          dosya ? "Başka bir arşiv seçin" : "RAR, 7Z, TAR veya GZ dosyası seçin"
        }
        onSec={(d) => {
          setDosya(d[0]);
          setSifre("");
          void ac(d[0]);
        }}
      />
      {sifreSor && dosya ? (
        <div className="date-calc-input">
          <label className="date-calc-field">
            <span>🔒 Bu arşiv şifreli. Şifreyi girin:</span>
            <span className="date-calc-field-row">
              <input
                type="password"
                value={sifre}
                autoComplete="off"
                onChange={(e) => setSifre(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && sifre) void ac(dosya, sifre);
                }}
              />
              <button
                type="button"
                className="video-an"
                disabled={!sifre}
                onClick={() => void ac(dosya, sifre)}
              >
                Aç
              </button>
            </span>
          </label>
        </div>
      ) : null}
      {durum ? <p className="gorsel-durum">{durum}</p> : null}
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      {liste.length && dosya ? (
        <>
          <p className="vesikalik-ozet">
            <b>{dosya.name}</b> · {liste.length} dosya · açılmış hâli{" "}
            {boyutMetni(toplam)}
          </p>
          {zipOdakli ? null : (
            <ul className="zip-liste">
              {liste.map((d) => (
                <li key={d.yol}>
                  <span title={d.yol}>{d.yol}</span>
                  <span>{boyutMetni(d.veri.length)}</span>
                  <button
                    type="button"
                    onClick={() => tekIndir(d)}
                    aria-label={`${d.yol} indir`}
                  >
                    ⬇
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="gorsel-alt">
            <span>
              {zipOdakli
                ? "Arşiv ZIP'e çevrilmeye hazır."
                : "Tüm dosyaları tek seferde almak için:"}
            </span>
            <button
              type="button"
              className="time-tool-button"
              disabled={!!durum}
              onClick={() => void zipIndir()}
            >
              ZIP olarak indir
            </button>
          </div>
          {zipOdakli ? (
            <ul className="zip-liste">
              {liste.map((d) => (
                <li key={d.yol}>
                  <span title={d.yol}>{d.yol}</span>
                  <span>{boyutMetni(d.veri.length)}</span>
                  <button
                    type="button"
                    onClick={() => tekIndir(d)}
                    aria-label={`${d.yol} indir`}
                  >
                    ⬇
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </>
      ) : null}
      <p className="date-calc-note">
        Arşiv tarayıcınızda açılır, hiçbir sunucuya yüklenmez. Açıcı (7-Zip,
        yaklaşık 1,7 MB) ilk kullanımda bir kez indirilir. RAR, 7Z, ZIP, TAR,
        GZ, BZ2, XZ, ISO ve CAB desteklenir; şifreli arşivler şifreyle açılır.
      </p>
    </div>
  );
}
