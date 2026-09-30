"use client";

import { useEffect, useRef, useState } from "react";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import {
  dalgaOzeti,
  kes,
  mp3Boyut,
  sureMetni,
} from "../../converter/ses/sesIslem";
import DosyaBirak from "../gorsel/DosyaBirak";
import { indir } from "../gorsel/tuval";
import { sesAdi, sesCoz, sesKodla, type Ses, type SesBicim } from "./sesMotoru";

const DILIM = 600;
const GECIS = [0, 0.5, 1, 2, 3];

/** Ses veya videodan bir bölümü keser; isteğe bağlı yumuşak giriş/çıkış ile MP3/WAV verir. */
export default function SesKesme() {
  const [dosya, setDosya] = useState<File | null>(null);
  const [ses, setSes] = useState<Ses | null>(null);
  const [dalga, setDalga] = useState<number[]>([]);
  const [bas, setBas] = useState(0);
  const [son, setSon] = useState(0);
  const [giris, setGiris] = useState(0);
  const [cikis, setCikis] = useState(0);
  const [bicim, setBicim] = useState<SesBicim>("mp3");
  const [calan, setCalan] = useState<number | null>(null);
  const [durum, setDurum] = useState("");
  const [hata, setHata] = useState("");
  const [sonuc, setSonuc] = useState<{
    url: string;
    boyut: number;
    ad: string;
  } | null>(null);
  const tuval = useRef<HTMLCanvasElement>(null);
  const alan = useRef<HTMLDivElement>(null);
  const surukle = useRef<"bas" | "son" | null>(null);
  const oynatici = useRef<{
    ctx: AudioContext;
    kaynak: AudioBufferSourceNode;
    t0: number;
  } | null>(null);
  const kare = useRef(0);
  const url = useRef<string | null>(null);

  const durdur = () => {
    cancelAnimationFrame(kare.current);
    const o = oynatici.current;
    if (o) {
      o.kaynak.onended = null;
      try {
        o.kaynak.stop();
      } catch {
        /* zaten durdu */
      }
      void o.ctx.close();
    }
    oynatici.current = null;
    setCalan(null);
  };

  useEffect(
    () => () => {
      durdur();
      if (url.current) URL.revokeObjectURL(url.current);
    },
    [],
  );

  const sonucTemizle = () => {
    if (url.current) URL.revokeObjectURL(url.current);
    url.current = null;
    setSonuc(null);
  };

  const ac = async (d: File[]) => {
    durdur();
    sonucTemizle();
    setHata("");
    setDurum("Ses çözülüyor…");
    try {
      const s = await sesCoz(d[0]);
      setSes(s);
      setDosya(d[0]);
      setDalga(dalgaOzeti(s.kanallar, DILIM));
      setBas(0);
      setSon(s.sure);
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Dosya açılamadı.");
    } finally {
      setDurum("");
    }
  };

  // Dalga formu ve seçim
  useEffect(() => {
    const c = tuval.current;
    if (!c || !ses || !dalga.length) return;
    const w = (c.width = c.clientWidth * devicePixelRatio);
    const h = (c.height = c.clientHeight * devicePixelRatio);
    const x = c.getContext("2d")!;
    x.clearRect(0, 0, w, h);
    const b0 = (bas / ses.sure) * w;
    const b1 = (son / ses.sure) * w;
    const cubuk = w / dalga.length;
    dalga.forEach((v, i) => {
      const px = i * cubuk;
      const yuk = Math.max(1, v * h * 0.92);
      x.fillStyle = px >= b0 && px <= b1 ? "#1f7a8c" : "#c5d2da";
      x.fillRect(px, (h - yuk) / 2, Math.max(1, cubuk - 0.5), yuk);
    });
    if (calan !== null) {
      x.fillStyle = "#e5322d";
      x.fillRect((calan / ses.sure) * w - 1, 0, 2 * devicePixelRatio, h);
    }
  }, [ses, dalga, bas, son, calan]);

  const oynat = () => {
    if (!ses) return;
    durdur();
    const ctx = new AudioContext();
    const b = ctx.createBuffer(
      ses.kanallar.length,
      ses.kanallar[0].length,
      ses.ornekHizi,
    );
    ses.kanallar.forEach((k, i) =>
      b.copyToChannel(k as Float32Array<ArrayBuffer>, i),
    );
    const kaynak = ctx.createBufferSource();
    kaynak.buffer = b;
    kaynak.connect(ctx.destination);
    kaynak.onended = durdur;
    kaynak.start(0, bas, Math.max(0.05, son - bas));
    oynatici.current = { ctx, kaynak, t0: ctx.currentTime };
    const adim = () => {
      const o = oynatici.current;
      if (!o) return;
      setCalan(bas + (o.ctx.currentTime - o.t0));
      kare.current = requestAnimationFrame(adim);
    };
    adim();
  };

  const konum = (clientX: number) => {
    const r = alan.current!.getBoundingClientRect();
    return (
      Math.max(0, Math.min(1, (clientX - r.left) / r.width)) * (ses?.sure ?? 0)
    );
  };

  const ayarla = (b: number, s: number) => {
    sonucTemizle();
    const sure = ses?.sure ?? 0;
    if (b !== bas) setBas(Math.max(0, Math.min(b, son - 0.1)));
    if (s !== son) setSon(Math.min(sure, Math.max(s, bas + 0.1)));
  };

  const kesVeIndir = async () => {
    if (!ses || !dosya) return;
    durdur();
    setHata("");
    setDurum("Kesiliyor…");
    try {
      const parca = kes(ses.kanallar, ses.ornekHizi, bas, son, giris, cikis);
      const blob = await sesKodla(parca, ses.ornekHizi, bicim, 192, (x) =>
        setDurum(`Kodlanıyor… %${Math.round(x * 100)}`),
      );
      sonucTemizle();
      url.current = URL.createObjectURL(blob);
      const ad = sesAdi(dosya.name.replace(/\.[^.]+$/, "") + "-kesit.x", bicim);
      setSonuc({ url: url.current, boyut: blob.size, ad });
      indir(url.current, ad);
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Kesilemedi.");
    } finally {
      setDurum("");
    }
  };

  const secimSure = son - bas;

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        tur="ses"
        coklu={false}
        max={1}
        baslik={
          dosya ? "Başka bir dosya seçin" : "MP3, ses veya video dosyası seçin"
        }
        onSec={(d) => void ac(d)}
      />
      {durum && !ses ? <p className="gorsel-durum">{durum}</p> : null}
      {ses && dosya ? (
        <>
          <p className="vesikalik-ozet">
            <b>{dosya.name}</b> · {sureMetni(ses.sure)} ·{" "}
            {boyutMetni(dosya.size)}
          </p>
          <div
            className="ses-dalga"
            ref={alan}
            onPointerDown={(e) => {
              const t = konum(e.clientX);
              surukle.current =
                Math.abs(t - bas) <= Math.abs(t - son) ? "bas" : "son";
              e.currentTarget.setPointerCapture(e.pointerId);
              if (surukle.current === "bas") ayarla(t, son);
              else ayarla(bas, t);
            }}
            onPointerMove={(e) => {
              if (!surukle.current) return;
              const t = konum(e.clientX);
              if (surukle.current === "bas") ayarla(t, son);
              else ayarla(bas, t);
            }}
            onPointerUp={() => {
              surukle.current = null;
            }}
          >
            <canvas ref={tuval} aria-hidden="true" />
            <span
              className="ses-tutamac"
              style={{ left: `${(bas / ses.sure) * 100}%` }}
              role="slider"
              aria-label="Başlangıç"
              aria-valuemin={0}
              aria-valuemax={Math.round(ses.sure * 10) / 10}
              aria-valuenow={Math.round(bas * 10) / 10}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") ayarla(bas - 0.1, son);
                if (e.key === "ArrowRight") ayarla(bas + 0.1, son);
              }}
            />
            <span
              className="ses-tutamac is-son"
              style={{ left: `${(son / ses.sure) * 100}%` }}
              role="slider"
              aria-label="Bitiş"
              aria-valuemin={0}
              aria-valuemax={Math.round(ses.sure * 10) / 10}
              aria-valuenow={Math.round(son * 10) / 10}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") ayarla(bas, son - 0.1);
                if (e.key === "ArrowRight") ayarla(bas, son + 0.1);
              }}
            />
          </div>
          <div className="ses-kontrol">
            <button
              type="button"
              className="time-tool-button is-secondary"
              onClick={() => (calan === null ? oynat() : durdur())}
            >
              {calan === null ? "▶ Seçimi dinle" : "■ Durdur"}
            </button>
            <span>
              Seçim: <b>{sureMetni(bas)}</b> – <b>{sureMetni(son)}</b> (
              {sureMetni(secimSure)})
            </span>
            <button
              type="button"
              className="time-tool-button is-secondary"
              onClick={() => ayarla(bas, bas + 30)}
            >
              Zil sesi (30 sn)
            </button>
          </div>
          <div className="date-calc-input">
            <div className="date-calc-fields">
              <label className="date-calc-field">
                <span>Başlangıç (sn)</span>
                <span className="date-calc-field-row">
                  <input
                    type="number"
                    min={0}
                    step={0.1}
                    value={Math.round(bas * 10) / 10}
                    onChange={(e) => ayarla(Number(e.target.value), son)}
                  />
                </span>
              </label>
              <label className="date-calc-field">
                <span>Bitiş (sn)</span>
                <span className="date-calc-field-row">
                  <input
                    type="number"
                    min={0}
                    step={0.1}
                    value={Math.round(son * 10) / 10}
                    onChange={(e) => ayarla(bas, Number(e.target.value))}
                  />
                </span>
              </label>
              <label className="date-calc-field">
                <span>Yumuşak giriş</span>
                <span className="date-calc-field-row">
                  <select
                    value={giris}
                    onChange={(e) => setGiris(Number(e.target.value))}
                  >
                    {GECIS.map((g) => (
                      <option key={g} value={g}>
                        {g ? `${String(g).replace(".", ",")} sn` : "Yok"}
                      </option>
                    ))}
                  </select>
                </span>
              </label>
              <label className="date-calc-field">
                <span>Yumuşak çıkış</span>
                <span className="date-calc-field-row">
                  <select
                    value={cikis}
                    onChange={(e) => setCikis(Number(e.target.value))}
                  >
                    {GECIS.map((g) => (
                      <option key={g} value={g}>
                        {g ? `${String(g).replace(".", ",")} sn` : "Yok"}
                      </option>
                    ))}
                  </select>
                </span>
              </label>
              <label className="date-calc-field">
                <span>Biçim</span>
                <span className="date-calc-field-row">
                  <select
                    value={bicim}
                    onChange={(e) => setBicim(e.target.value as SesBicim)}
                  >
                    <option value="mp3">MP3 (192 kbps)</option>
                    <option value="wav">WAV (kayıpsız)</option>
                  </select>
                </span>
              </label>
            </div>
          </div>
          <div className="gorsel-alt">
            <span>
              {durum ||
                (bicim === "mp3"
                  ? `Tahmini boyut ≈ ${boyutMetni(mp3Boyut(secimSure, 192))}`
                  : "")}
            </span>
            <button
              type="button"
              className="time-tool-button"
              disabled={!!durum}
              onClick={() => void kesVeIndir()}
            >
              Kes ve indir
            </button>
            {sonuc ? (
              <a
                className="time-tool-button is-secondary"
                href={sonuc.url}
                download={sonuc.ad}
              >
                Tekrar indir ({boyutMetni(sonuc.boyut)})
              </a>
            ) : null}
          </div>
          {sonuc ? (
            <audio className="ses-onizleme" controls src={sonuc.url} />
          ) : null}
        </>
      ) : null}
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      <p className="date-calc-note">
        Dosya tarayıcınızda kesilir, hiçbir sunucuya yüklenmez. Videolardan da
        yalnızca ses kısmı kesilip alınır.
      </p>
    </div>
  );
}
