"use client";

import { useEffect, useRef, useState } from "react";
import { indir } from "../gorsel/tuval";
import { cihazlar, medyaHatasi } from "./izin";

/** Web kamerası testi: canlı görüntü, çözünürlük, kare hızı ve fotoğraf çekme. */
export default function KameraTesti() {
  const video = useRef<HTMLVideoElement>(null);
  const [akis, setAkis] = useState<MediaStream | null>(null);
  const [liste, setListe] = useState<MediaDeviceInfo[]>([]);
  const [secili, setSecili] = useState("");
  const [ayna, setAyna] = useState(true);
  const [ozellik, setOzellik] = useState<Array<[string, string]>>([]);
  const [olculenFps, setOlculenFps] = useState(0);
  const [hata, setHata] = useState("");

  const akisRef = useRef<MediaStream | null>(null);
  const durdur = () => akisRef.current?.getTracks().forEach((t) => t.stop());
  useEffect(() => () => durdur(), []);

  const baslat = async (id = secili) => {
    setHata("");
    durdur();
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: {
          ...(id ? { deviceId: { exact: id } } : {}),
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });
      akisRef.current = s;
      setAkis(s);
      if (video.current) video.current.srcObject = s;
      setListe(await cihazlar("videoinput"));
      const t = s.getVideoTracks()[0];
      const a = t.getSettings();
      setSecili(a.deviceId ?? "");
      const yetenek = (t.getCapabilities?.() ?? {}) as MediaTrackCapabilities;
      setOzellik([
        ["Kamera", t.label || "—"],
        ["Çözünürlük", `${a.width} × ${a.height}`],
        [
          "Kare hızı (ayarlı)",
          a.frameRate ? `${Math.round(a.frameRate)} fps` : "—",
        ],
        ...(yetenek.width?.max && yetenek.height?.max
          ? ([
              [
                "En yüksek çözünürlük",
                `${yetenek.width.max} × ${yetenek.height.max}`,
              ],
            ] as Array<[string, string]>)
          : []),
      ]);
      // gerçek kare hızını ölç
      const v = video.current;
      if (v && "requestVideoFrameCallback" in v) {
        let n = 0;
        const bas = performance.now();
        const say = () => {
          n++;
          if (performance.now() - bas < 2000) v.requestVideoFrameCallback(say);
          else
            setOlculenFps(Math.round((n * 1000) / (performance.now() - bas)));
        };
        v.requestVideoFrameCallback(say);
      }
    } catch (e) {
      setHata(medyaHatasi(e, "kamera"));
    }
  };

  const fotograf = () => {
    const v = video.current;
    if (!v) return;
    const c = document.createElement("canvas");
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    const g = c.getContext("2d")!;
    if (ayna) {
      g.translate(c.width, 0);
      g.scale(-1, 1);
    }
    g.drawImage(v, 0, 0);
    c.toBlob(
      (b) => b && indir(URL.createObjectURL(b), "kamera-testi.jpg"),
      "image/jpeg",
      0.92,
    );
  };

  return (
    <div className="date-calc gorsel-arac">
      <video
        ref={video}
        className={`cihaz-video${ayna ? " is-ayna" : ""}`}
        autoPlay
        playsInline
        muted
        hidden={!akis}
      />
      {!akis ? (
        <div className="cihaz-basla">
          <button
            type="button"
            className="time-tool-button"
            onClick={() => void baslat()}
          >
            📷 Kamerayı test et
          </button>
          <p className="date-calc-note">
            Tarayıcı kamera izni isteyecek; &quot;İzin ver&quot;i seçin.
          </p>
        </div>
      ) : (
        <>
          <p className="cihaz-durum is-tamam">✅ Kamera çalışıyor.</p>
          <div className="gorsel-alt belge-dugmeler">
            <button
              type="button"
              className="time-tool-button"
              onClick={fotograf}
            >
              📸 Fotoğraf çek
            </button>
            <label className="date-calc-check">
              <input
                type="checkbox"
                checked={ayna}
                onChange={(e) => setAyna(e.target.checked)}
              />{" "}
              Ayna görüntüsü
            </label>
            {liste.length > 1 ? (
              <select
                value={secili}
                onChange={(e) => {
                  setSecili(e.target.value);
                  void baslat(e.target.value);
                }}
              >
                {liste.map((d, i) => (
                  <option key={d.deviceId} value={d.deviceId}>
                    {d.label || `Kamera ${i + 1}`}
                  </option>
                ))}
              </select>
            ) : null}
          </div>
          <table className="ag-sonuc">
            <tbody>
              {[
                ...ozellik,
                ...(olculenFps
                  ? ([["Kare hızı (ölçülen)", `${olculenFps} fps`]] as Array<
                      [string, string]
                    >)
                  : []),
              ].map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      <p className="date-calc-note">
        Görüntü yalnızca ekranınızda gösterilir; hiçbir yere gönderilmez veya
        kaydedilmez.
      </p>
    </div>
  );
}
