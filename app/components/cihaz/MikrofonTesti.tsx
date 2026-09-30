"use client";

import { useEffect, useRef, useState } from "react";
import { cihazlar, medyaHatasi } from "./izin";

const KAYIT_SN = 5;

/** Mikrofon testi: canlı ses seviyesi, dalga biçimi, kısa kayıt ve dinleme. */
export default function MikrofonTesti() {
  const [akis, setAkis] = useState<MediaStream | null>(null);
  const [liste, setListe] = useState<MediaDeviceInfo[]>([]);
  const [secili, setSecili] = useState("");
  const [seviye, setSeviye] = useState(0);
  const [enYuksek, setEnYuksek] = useState(0);
  const [hata, setHata] = useState("");
  const [bilgi, setBilgi] = useState("");
  const [kayit, setKayit] = useState<{ url: string } | null>(null);
  const [kaydediyor, setKaydediyor] = useState(0);
  const tuval = useRef<HTMLCanvasElement>(null);
  const kare = useRef(0);
  const akisRef = useRef<MediaStream | null>(null);
  const sesCtx = useRef<AudioContext | null>(null);

  const durdur = () => {
    cancelAnimationFrame(kare.current);
    akisRef.current?.getTracks().forEach((t) => t.stop());
    void sesCtx.current?.close();
    sesCtx.current = null;
  };

  useEffect(() => () => durdur(), []);

  const baslat = async (id = secili) => {
    setHata("");
    durdur();
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        audio: id ? { deviceId: { exact: id } } : true,
      });
      akisRef.current = s;
      setAkis(s);
      const l = await cihazlar("audioinput");
      setListe(l);
      const t = s.getAudioTracks()[0];
      const ay = t.getSettings();
      setSecili(ay.deviceId ?? "");
      setBilgi(
        [
          t.label,
          ay.sampleRate && `${ay.sampleRate / 1000} kHz`,
          ay.channelCount && `${ay.channelCount} kanal`,
        ]
          .filter(Boolean)
          .join(" · "),
      );
      setEnYuksek(0);
      const ctx = new AudioContext();
      sesCtx.current = ctx;
      await ctx.resume();
      const an = ctx.createAnalyser();
      an.fftSize = 2048;
      ctx.createMediaStreamSource(s).connect(an);
      const veri = new Uint8Array(an.fftSize);
      const ciz = () => {
        an.getByteTimeDomainData(veri);
        let tepe = 0;
        for (const v of veri) tepe = Math.max(tepe, Math.abs(v - 128));
        const y = Math.min(100, Math.round((tepe / 128) * 100));
        setSeviye(y);
        setEnYuksek((e) => Math.max(e, y));
        const c = tuval.current;
        if (c) {
          const g = c.getContext("2d")!;
          g.clearRect(0, 0, c.width, c.height);
          g.strokeStyle = "#1b8a7a";
          g.lineWidth = 2;
          g.beginPath();
          veri.forEach((v, i) => {
            const x = (i / veri.length) * c.width;
            const yy = (v / 255) * c.height;
            if (i) g.lineTo(x, yy);
            else g.moveTo(x, yy);
          });
          g.stroke();
        }
        kare.current = requestAnimationFrame(ciz);
      };
      ciz();
    } catch (e) {
      setHata(medyaHatasi(e, "mikrofon"));
    }
  };

  const kaydet = () => {
    if (!akis) return;
    const r = new MediaRecorder(akis);
    const parca: Blob[] = [];
    r.ondataavailable = (e) => parca.push(e.data);
    r.onstop = () => {
      if (kayit) URL.revokeObjectURL(kayit.url);
      setKayit({
        url: URL.createObjectURL(new Blob(parca, { type: r.mimeType })),
      });
      setKaydediyor(0);
    };
    r.start();
    setKaydediyor(KAYIT_SN);
    let kalan = KAYIT_SN;
    const z = setInterval(() => {
      kalan--;
      setKaydediyor(kalan);
      if (kalan <= 0) {
        clearInterval(z);
        r.stop();
      }
    }, 1000);
  };

  const durum = !akis
    ? null
    : enYuksek < 3
      ? "sessiz"
      : seviye > 3
        ? "ses"
        : "bekle";

  return (
    <div className="date-calc gorsel-arac">
      {!akis ? (
        <div className="cihaz-basla">
          <button
            type="button"
            className="time-tool-button"
            onClick={() => void baslat()}
          >
            🎤 Mikrofonu test et
          </button>
          <p className="date-calc-note">
            Tarayıcı mikrofon izni isteyecek; &quot;İzin ver&quot;i seçin.
          </p>
        </div>
      ) : (
        <>
          {liste.length > 1 ? (
            <label className="date-calc-field">
              <span>Mikrofon</span>
              <span className="date-calc-field-row">
                <select
                  value={secili}
                  onChange={(e) => {
                    setSecili(e.target.value);
                    void baslat(e.target.value);
                  }}
                >
                  {liste.map((d, i) => (
                    <option key={d.deviceId} value={d.deviceId}>
                      {d.label || `Mikrofon ${i + 1}`}
                    </option>
                  ))}
                </select>
              </span>
            </label>
          ) : null}
          <p className="vesikalik-ozet">{bilgi}</p>
          <div
            className="cihaz-seviye"
            aria-label={`Ses seviyesi yüzde ${seviye}`}
          >
            <div style={{ width: `${seviye}%` }} />
          </div>
          <canvas
            ref={tuval}
            className="cihaz-dalga"
            width={800}
            height={120}
          />
          <p
            className={`cihaz-durum ${durum === "sessiz" ? "is-uyari" : "is-tamam"}`}
          >
            {durum === "ses"
              ? "✅ Mikrofon çalışıyor, ses algılanıyor."
              : durum === "bekle"
                ? "✅ Mikrofon çalışıyor. Konuşunca çubuk hareket eder."
                : "Konuşun veya parmağınızla mikrofona hafifçe dokunun…"}
          </p>
          <div className="gorsel-alt belge-dugmeler">
            <button
              type="button"
              className="time-tool-button"
              disabled={!!kaydediyor}
              onClick={kaydet}
            >
              {kaydediyor
                ? `Kaydediliyor… ${kaydediyor}`
                : `🔴 ${KAYIT_SN} saniye kaydet ve dinle`}
            </button>
          </div>
          {kayit ? (
            <audio controls src={kayit.url} className="cihaz-oynatici">
              <track kind="captions" />
            </audio>
          ) : null}
        </>
      )}
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      <p className="date-calc-note">
        Ses yalnızca bu sayfada, cihazınızda işlenir; kayıt hiçbir yere
        gönderilmez ve sayfayı kapatınca silinir.
      </p>
    </div>
  );
}
