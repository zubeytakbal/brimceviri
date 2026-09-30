"use client";
/* eslint-disable @typescript-eslint/no-explicit-any -- CDN'den yüklenen modüller */

import { useEffect, useRef, useState } from "react";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import { sureMetni } from "../../converter/ses/sesIslem";
import DosyaBirak from "../gorsel/DosyaBirak";
import { indir } from "../gorsel/tuval";
import {
  hedefKodek,
  mbYukle,
  videoAdi,
  videoBilgi,
  type VideoBilgi,
} from "./videoMotoru";

/** GIF kodlayıcı gifenc (MIT, ~9 KB); yalnızca gerektiğinde CDN'den yüklenir. */
const GIFENC = "https://cdn.jsdelivr.net/npm/gifenc@1.0.3/dist/gifenc.esm.js";
const MAX_SURE = 20;

type Mod = "video-gif" | "gif-video";

/** Video → GIF ve GIF → MP4 dönüştürme. */
export default function VideoGif({ mod }: { mod: Mod }) {
  const [dosya, setDosya] = useState<File | null>(null);
  const [bilgi, setBilgi] = useState<VideoBilgi | null>(null);
  const [kaynakUrl, setKaynakUrl] = useState("");
  const [bas, setBas] = useState(0);
  const [sure, setSure] = useState(5);
  const [fps, setFps] = useState(10);
  const [genislik, setGenislik] = useState(480);
  const [tekrar, setTekrar] = useState(1);
  const [ilerleme, setIlerleme] = useState<string | null>(null);
  const [hata, setHata] = useState("");
  const [sonuc, setSonuc] = useState<{
    url: string;
    boyut: number;
    ad: string;
  } | null>(null);
  const oynatici = useRef<HTMLVideoElement>(null);
  const urller = useRef<string[]>([]);

  useEffect(
    () => () => {
      for (const u of urller.current) URL.revokeObjectURL(u);
    },
    [],
  );

  const url = (b: Blob) => {
    const u = URL.createObjectURL(b);
    urller.current.push(u);
    return u;
  };

  const ac = async (d: File[]) => {
    setHata("");
    setSonuc(null);
    try {
      if (mod === "video-gif") {
        const b = await videoBilgi(d[0]);
        setBilgi(b);
        setSure(Math.min(5, Math.floor(b.sure * 10) / 10));
        setGenislik(Math.min(480, b.genislik));
      }
      setDosya(d[0]);
      setKaynakUrl(url(d[0]));
      setBas(0);
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Dosya açılamadı.");
    }
  };

  const videodanGif = async () => {
    if (!dosya || !bilgi) return;
    const M = await mbYukle();
    let G: any;
    try {
      G = await import(
        /* webpackIgnore: true */ /* turbopackIgnore: true */ GIFENC
      );
    } catch {
      throw new Error(
        "GIF kodlayıcı yüklenemedi. İnternet bağlantınızı kontrol edin.",
      );
    }
    const input = new M.Input({
      source: new M.BlobSource(dosya),
      formats: M.ALL_FORMATS,
    });
    const iz = await input.getPrimaryVideoTrack();
    if (!(await iz.canDecode()))
      throw new Error("Bu videonun kodeki tarayıcınızda çözülemiyor.");
    const w = Math.round(genislik / 2) * 2;
    const h = Math.max(
      2,
      Math.round((w * bilgi.yukseklik) / bilgi.genislik / 2) * 2,
    );
    const sink = new M.CanvasSink(iz, { width: w, height: h, fit: "fill" });
    const gif = G.GIFEncoder();
    const adim = 1 / fps;
    const bitis = Math.min(bilgi.sure, bas + sure);
    let sonraki = bas;
    let kare = 0;
    const toplam = Math.ceil((bitis - bas) * fps);
    const tuval = document.createElement("canvas");
    tuval.width = w;
    tuval.height = h;
    const x = tuval.getContext("2d", { willReadFrequently: true })!;
    for await (const c of sink.canvases(bas, bitis)) {
      if (c.timestamp + c.duration < sonraki) continue;
      x.drawImage(c.canvas, 0, 0);
      const veri = x.getImageData(0, 0, w, h).data;
      const palet = G.quantize(veri, 256, { format: "rgb565" });
      const dizin = G.applyPalette(veri, palet, "rgb565");
      gif.writeFrame(dizin, w, h, {
        palette: palet,
        delay: Math.round(1000 / fps),
        repeat: 0,
      });
      kare++;
      sonraki += adim;
      setIlerleme(`Kare ${kare}/${toplam}`);
      if (kare >= toplam) break;
    }
    gif.finish();
    return new Blob([gif.bytes()], { type: "image/gif" });
  };

  const giftenVideo = async () => {
    if (!dosya) return;
    const ID = (globalThis as any).ImageDecoder;
    if (!ID)
      throw new Error(
        "Tarayıcınız GIF karelerini okuyamıyor (ImageDecoder). Chrome, Edge veya Firefox'un güncel sürümünü kullanın.",
      );
    const M = await mbYukle();
    const kodek = await hedefKodek();
    const dec = new ID({ data: await dosya.arrayBuffer(), type: "image/gif" });
    await dec.tracks.ready;
    const adet: number = dec.tracks.selectedTrack.frameCount;
    const ilk = (await dec.decode({ frameIndex: 0 })).image;
    const w = Math.round(ilk.displayWidth / 2) * 2 || 2;
    const h = Math.round(ilk.displayHeight / 2) * 2 || 2;
    ilk.close();
    const tuval = document.createElement("canvas");
    tuval.width = w;
    tuval.height = h;
    const x = tuval.getContext("2d")!;
    const output = new M.Output({
      format: new M.Mp4OutputFormat({ fastStart: "in-memory" }),
      target: new M.BufferTarget(),
    });
    const kaynak = new M.CanvasSource(tuval, {
      codec: kodek,
      bitrate: Math.max(500_000, w * h * 30 * 0.08),
    });
    output.addVideoTrack(kaynak);
    await output.start();
    let t = 0;
    for (let tur = 0; tur < tekrar; tur++)
      for (let i = 0; i < adet; i++) {
        const k = (await dec.decode({ frameIndex: i })).image;
        const sureSn = Math.max(0.02, (k.duration ?? 100_000) / 1e6);
        x.fillStyle = "#ffffff";
        x.fillRect(0, 0, w, h);
        x.drawImage(k, 0, 0, w, h);
        k.close();
        await kaynak.add(t, sureSn);
        t += sureSn;
        setIlerleme(`Kare ${tur * adet + i + 1}/${adet * tekrar}`);
      }
    dec.close();
    await output.finalize();
    return new Blob([output.target.buffer], { type: "video/mp4" });
  };

  const calistir = async () => {
    setHata("");
    setSonuc(null);
    setIlerleme("Hazırlanıyor…");
    try {
      const b = mod === "video-gif" ? await videodanGif() : await giftenVideo();
      if (!b || !dosya) return;
      const ad =
        mod === "video-gif"
          ? `${dosya.name.replace(/\.[^.]+$/, "")}.gif`
          : videoAdi(dosya.name, "");
      const u = url(b);
      setSonuc({ url: u, boyut: b.size, ad });
      indir(u, ad);
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Dönüştürülemedi.");
    } finally {
      setIlerleme(null);
    }
  };

  const tahmini =
    mod === "video-gif" && bilgi
      ? ((genislik * (genislik * bilgi.yukseklik)) / bilgi.genislik) *
        0.35 *
        fps *
        sure
      : 0;

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        tur={mod === "video-gif" ? "video" : "gorsel"}
        accept={mod === "gif-video" ? ".gif,image/gif" : undefined}
        coklu={false}
        max={1}
        baslik={
          dosya
            ? `Başka bir ${mod === "video-gif" ? "video" : "GIF"} seçin`
            : mod === "video-gif"
              ? "Video seçin (MP4, MOV, WebM)"
              : "GIF dosyası seçin"
        }
        onSec={(d) => void ac(d)}
      />
      {dosya ? (
        <>
          <div className="video-onizleme">
            {mod === "video-gif" ? (
              <video
                ref={oynatici}
                src={kaynakUrl}
                controls
                playsInline
                preload="metadata"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- yerel önizleme
              <img src={kaynakUrl} alt="GIF önizlemesi" />
            )}
          </div>
          <div className="date-calc-input">
            {mod === "video-gif" && bilgi ? (
              <div className="date-calc-fields">
                <label className="date-calc-field">
                  <span>Başlangıç (sn)</span>
                  <span className="date-calc-field-row">
                    <input
                      type="number"
                      min={0}
                      step={0.1}
                      value={bas}
                      onChange={(e) =>
                        setBas(
                          Math.max(
                            0,
                            Math.min(Number(e.target.value), bilgi.sure - 0.1),
                          ),
                        )
                      }
                    />
                    <button
                      type="button"
                      className="video-an"
                      onClick={() =>
                        setBas(
                          Math.round(
                            (oynatici.current?.currentTime ?? 0) * 10,
                          ) / 10,
                        )
                      }
                    >
                      Şu an
                    </button>
                  </span>
                </label>
                <label className="date-calc-field">
                  <span>Süre (sn, en fazla {MAX_SURE})</span>
                  <span className="date-calc-field-row">
                    <input
                      type="number"
                      min={0.5}
                      max={MAX_SURE}
                      step={0.5}
                      value={sure}
                      onChange={(e) =>
                        setSure(
                          Math.max(
                            0.5,
                            Math.min(MAX_SURE, Number(e.target.value)),
                          ),
                        )
                      }
                    />
                  </span>
                </label>
                <label className="date-calc-field">
                  <span>Kare hızı</span>
                  <span className="date-calc-field-row">
                    <select
                      value={fps}
                      onChange={(e) => setFps(Number(e.target.value))}
                    >
                      {[5, 8, 10, 12, 15, 20].map((f) => (
                        <option key={f} value={f}>
                          {f} fps
                        </option>
                      ))}
                    </select>
                  </span>
                </label>
                <label className="date-calc-field">
                  <span>Genişlik</span>
                  <span className="date-calc-field-row">
                    <select
                      value={genislik}
                      onChange={(e) => setGenislik(Number(e.target.value))}
                    >
                      {[240, 320, 480, 640, 800]
                        .filter((g) => g <= bilgi.genislik)
                        .concat(bilgi.genislik < 240 ? [bilgi.genislik] : [])
                        .map((g) => (
                          <option key={g} value={g}>
                            {g} px
                          </option>
                        ))}
                    </select>
                  </span>
                </label>
              </div>
            ) : (
              <label className="date-calc-field">
                <span>Tekrar sayısı (MP4 kendiliğinden döngüye girmez)</span>
                <span className="date-calc-field-row">
                  <select
                    value={tekrar}
                    onChange={(e) => setTekrar(Number(e.target.value))}
                  >
                    {[1, 2, 3, 5, 10].map((t) => (
                      <option key={t} value={t}>
                        {t === 1 ? "1 kez" : `${t} kez`}
                      </option>
                    ))}
                  </select>
                </span>
              </label>
            )}
          </div>
          <div className="gorsel-alt">
            <span>
              {ilerleme ??
                (tahmini
                  ? `Tahmini GIF boyutu ≈ ${boyutMetni(tahmini)} (${sureMetni(bas)} – ${sureMetni(Math.min(bilgi!.sure, bas + sure))})`
                  : "")}
            </span>
            <button
              type="button"
              className="time-tool-button"
              disabled={ilerleme !== null}
              onClick={() => void calistir()}
            >
              {mod === "video-gif" ? "GIF oluştur" : "MP4'e çevir"}
            </button>
          </div>
          {sonuc ? (
            <div className="video-sonuc">
              {mod === "video-gif" ? (
                // eslint-disable-next-line @next/next/no-img-element -- yerel önizleme
                <img src={sonuc.url} alt="Oluşturulan GIF" />
              ) : (
                <video
                  src={sonuc.url}
                  controls
                  playsInline
                  loop
                  autoPlay
                  muted
                />
              )}
              <div>
                <p>
                  <b>{sonuc.ad}</b>
                  <br />
                  {boyutMetni(dosya.size)} → <b>{boyutMetni(sonuc.boyut)}</b>
                </p>
                <a
                  className="time-tool-button"
                  href={sonuc.url}
                  download={sonuc.ad}
                >
                  Tekrar indir
                </a>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      <p className="date-calc-note">
        {mod === "video-gif"
          ? "Video tarayıcınızda karelere ayrılıp GIF'e kodlanır; hiçbir sunucuya yüklenmez. GIF en fazla 256 renk saklar; kısa ve küçük tutmak dosyayı çok küçültür."
          : "GIF tarayıcınızda MP4'e kodlanır; hiçbir sunucuya yüklenmez. MP4 aynı animasyonu genellikle GIF'in onda biri boyutunda saklar."}
      </p>
    </div>
  );
}
