"use client";

import { useEffect, useRef, useState } from "react";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import { monoYap, sureMetni } from "../../converter/ses/sesIslem";
import DosyaBirak from "../gorsel/DosyaBirak";
import { indir, zipUrlOlustur } from "../gorsel/tuval";
import { sesAdi, sesCoz, sesKodla, type SesBicim } from "./sesMotoru";

const MAX_DOSYA = 20;
const KALITELER = [
  { kbps: 96, ad: "96 kbps (konuşma, küçük dosya)" },
  { kbps: 128, ad: "128 kbps (standart)" },
  { kbps: 192, ad: "192 kbps (yüksek, önerilen)" },
  { kbps: 320, ad: "320 kbps (en yüksek)" },
];

type Oge = {
  id: number;
  dosya: File;
  durum: "sirada" | "calisiyor" | "hazir" | "hata";
  ilerleme?: number;
  sure?: number;
  cikti?: { blob: Blob; url: string; ad: string };
  hata?: string;
};

/**
 * Ses/video dosyalarından MP3 veya WAV üretir (Web Audio + LAME). Dosyalar tarayıcıda işlenir.
 * `hedef` verilirse çıktı biçimi sabittir.
 */
export default function SesDonusturucu({
  hedef,
  kaynakAd,
  kabul,
  varsayilanKbps = 192,
}: {
  hedef?: SesBicim;
  kaynakAd?: string;
  kabul?: string;
  varsayilanKbps?: number;
}) {
  const [bicim, setBicim] = useState<SesBicim>(hedef ?? "mp3");
  const [kbps, setKbps] = useState(varsayilanKbps);
  const [mono, setMono] = useState(false);
  const [ogeler, setOgeler] = useState<Oge[]>([]);
  const [calisiyor, setCalisiyor] = useState(false);
  const sayac = useRef(0);
  const kuyruk = useRef<Oge[]>([]);
  const calisiyorRef = useRef(false);
  const ayar = useRef({ bicim, kbps, mono });
  const urller = useRef<string[]>([]);

  useEffect(() => {
    ayar.current = { bicim, kbps, mono };
  }, [bicim, kbps, mono]);

  useEffect(
    () => () => {
      for (const u of urller.current) URL.revokeObjectURL(u);
    },
    [],
  );

  const guncelle = (id: number, p: Partial<Oge>) =>
    setOgeler((l) => l.map((o) => (o.id === id ? { ...o, ...p } : o)));

  const calistir = async () => {
    if (calisiyorRef.current) return;
    calisiyorRef.current = true;
    setCalisiyor(true);
    while (kuyruk.current.length) {
      const o = kuyruk.current.shift()!;
      guncelle(o.id, { durum: "calisiyor", ilerleme: 0, hata: undefined });
      try {
        const a = ayar.current;
        const s = await sesCoz(o.dosya);
        guncelle(o.id, { sure: s.sure });
        const kanallar = a.mono ? monoYap(s.kanallar) : s.kanallar;
        const blob = await sesKodla(
          kanallar,
          s.ornekHizi,
          a.bicim,
          a.kbps,
          (x) => guncelle(o.id, { ilerleme: x }),
        );
        const url = URL.createObjectURL(blob);
        urller.current.push(url);
        guncelle(o.id, {
          durum: "hazir",
          cikti: { blob, url, ad: sesAdi(o.dosya.name, a.bicim) },
        });
      } catch (e) {
        guncelle(o.id, {
          durum: "hata",
          hata: e instanceof Error ? e.message : "Dönüştürülemedi.",
        });
      }
    }
    calisiyorRef.current = false;
    setCalisiyor(false);
  };

  const ekle = (dosyalar: File[]) => {
    const yeni = dosyalar
      .slice(0, MAX_DOSYA)
      .map((dosya): Oge => ({ id: ++sayac.current, dosya, durum: "sirada" }));
    setOgeler((l) => [...l, ...yeni]);
    kuyruk.current.push(...yeni);
    void calistir();
  };

  const yeniden = () => {
    const l = ogeler.map(
      (o): Oge => ({ id: o.id, dosya: o.dosya, durum: "sirada" }),
    );
    setOgeler(l);
    kuyruk.current = [...l];
    void calistir();
  };

  const hazirlar = ogeler.filter((o) => o.cikti);

  const zip = async () => {
    const u = await zipUrlOlustur(
      hazirlar.map((o) => ({ ad: o.cikti!.ad, blob: o.cikti!.blob })),
    );
    urller.current.push(u);
    indir(u, `sesler-${bicim}.zip`);
  };

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        tur="ses"
        accept={kabul}
        baslik={
          ogeler.length
            ? "Başka dosya ekleyin"
            : `${kaynakAd ?? "Ses veya video"} dosyalarını seçin`
        }
        max={MAX_DOSYA}
        onSec={ekle}
      />
      <div className="date-calc-input">
        <div className="date-calc-fields">
          {!hedef ? (
            <label className="date-calc-field">
              <span>Çıktı biçimi</span>
              <span className="date-calc-field-row">
                <select
                  value={bicim}
                  onChange={(e) => setBicim(e.target.value as SesBicim)}
                >
                  <option value="mp3">MP3</option>
                  <option value="wav">WAV (kayıpsız)</option>
                </select>
              </span>
            </label>
          ) : null}
          {bicim === "mp3" ? (
            <label className="date-calc-field">
              <span>Ses kalitesi</span>
              <span className="date-calc-field-row">
                <select
                  value={kbps}
                  onChange={(e) => setKbps(Number(e.target.value))}
                >
                  {KALITELER.map((k) => (
                    <option key={k.kbps} value={k.kbps}>
                      {k.ad}
                    </option>
                  ))}
                </select>
              </span>
            </label>
          ) : null}
        </div>
        <label className="date-calc-check">
          <input
            type="checkbox"
            checked={mono}
            onChange={(e) => setMono(e.target.checked)}
          />{" "}
          Tek kanal (mono) — konuşma kayıtlarında dosyayı yarıya indirir
        </label>
        {ogeler.length && !calisiyor ? (
          <button
            type="button"
            className="time-tool-button is-secondary ocr-yeniden"
            onClick={yeniden}
          >
            Bu ayarlarla yeniden dönüştür
          </button>
        ) : null}
      </div>

      {ogeler.length ? (
        <ul className="ses-liste">
          {ogeler.map((o) => (
            <li key={o.id}>
              <div className="exif-bas">
                <strong title={o.dosya.name}>{o.dosya.name}</strong>
                <span className="gorsel-boyut">
                  {boyutMetni(o.dosya.size)}
                  {o.sure ? ` · ${sureMetni(o.sure, false)}` : ""}
                  {o.cikti ? ` → ${boyutMetni(o.cikti.blob.size)}` : ""}
                </span>
              </div>
              {o.durum === "sirada" ? (
                <span className="gorsel-durum">Sırada</span>
              ) : o.durum === "calisiyor" ? (
                <>
                  <span className="gorsel-durum">
                    {o.sure
                      ? `Dönüştürülüyor… %${Math.round((o.ilerleme ?? 0) * 100)}`
                      : "Ses çözülüyor…"}
                  </span>
                  <progress max={1} value={o.ilerleme ?? 0} />
                </>
              ) : null}
              {o.hata ? <span className="gorsel-hata">{o.hata}</span> : null}
              {o.cikti ? (
                <div className="ses-cikti">
                  <audio controls preload="none" src={o.cikti.url} />
                  <a
                    className="time-tool-button"
                    href={o.cikti.url}
                    download={o.cikti.ad}
                  >
                    {o.cikti.ad.split(".").pop()!.toUpperCase()} indir
                  </a>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}

      {hazirlar.length > 1 && !calisiyor ? (
        <div className="gorsel-alt">
          <span>{hazirlar.length} dosya hazır</span>
          <button
            type="button"
            className="time-tool-button"
            onClick={() => void zip()}
          >
            Tümünü ZIP olarak indir
          </button>
        </div>
      ) : null}

      <p className="date-calc-note">
        Dosyalar tarayıcınızda dönüştürülür, hiçbir sunucuya yüklenmez. MP3
        kodlayıcı (LAME, yaklaşık 140 KB) ilk kullanımda bir kez indirilir. Çok
        uzun kayıtlarda (1 saatin üstü) tarayıcı belleği yetmeyebilir.
      </p>
    </div>
  );
}
