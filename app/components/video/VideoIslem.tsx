"use client";

import { useEffect, useRef, useState } from "react";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import { sureMetni } from "../../converter/ses/sesIslem";
import {
  ciftYukseklik,
  hedefBitHizi,
  hedefUlasilabilir,
  kaliteBitHizi,
  onerilenGenislik,
} from "../../converter/video/videoHesap";
import DosyaBirak from "../gorsel/DosyaBirak";
import { indir } from "../gorsel/tuval";
import {
  KODEK_AD,
  videoAdi,
  videoBilgi,
  videoIsle,
  type VideoAyar,
  type VideoBilgi,
} from "./videoMotoru";

export type VideoMod = "sikistir" | "mp4" | "kes" | "dondur" | "sessiz";

const HEDEFLER = [
  { mb: 8, ad: "8 MB" },
  { mb: 10, ad: "10 MB (Discord)" },
  { mb: 16, ad: "16 MB" },
  { mb: 25, ad: "25 MB (e-posta)" },
  { mb: 50, ad: "50 MB" },
];
const COZUNURLUKLER = [0, 1080, 720, 480, 360];
const SES_BPS = 128_000;

const EK: Record<VideoMod, string> = {
  sikistir: "-kucuk",
  mp4: "",
  kes: "-kesit",
  dondur: "-dondurulmus",
  sessiz: "-sessiz",
};
const DUGME: Record<VideoMod, string> = {
  sikistir: "Videoyu sıkıştır",
  mp4: "MP4'e çevir",
  kes: "Kes ve indir",
  dondur: "Döndür ve indir",
  sessiz: "Sesi kaldır",
};

/** Tek video üzerinde sıkıştırma, MP4'e çevirme, kesme, döndürme veya sesi kaldırma. */
export default function VideoIslem({ mod }: { mod: VideoMod }) {
  const [dosya, setDosya] = useState<File | null>(null);
  const [bilgi, setBilgi] = useState<VideoBilgi | null>(null);
  const [kaynakUrl, setKaynakUrl] = useState("");
  const [yontem, setYontem] = useState<"hedef" | "kalite">("hedef");
  const [hedefMb, setHedefMb] = useState(25);
  const [duzey, setDuzey] = useState<"yuksek" | "orta" | "dusuk">("orta");
  const [cozunurluk, setCozunurluk] = useState(720);
  const [h264, setH264] = useState(false);
  const [bas, setBas] = useState(0);
  const [son, setSon] = useState(0);
  const [hassas, setHassas] = useState(false);
  const [aci, setAci] = useState<0 | 90 | 180 | 270>(90);
  const [aynala, setAynala] = useState(false);
  const [isle, setIsle] = useState(false);
  const [ilerleme, setIlerleme] = useState<number | null>(null);
  const [hata, setHata] = useState("");
  const [sonuc, setSonuc] = useState<{
    url: string;
    boyut: number;
    ad: string;
    kodek: string | null;
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
    setBilgi(null);
    setIlerleme(null);
    try {
      const b = await videoBilgi(d[0]);
      setDosya(d[0]);
      setBilgi(b);
      setKaynakUrl(url(d[0]));
      setBas(0);
      setSon(Math.round(b.sure * 10) / 10);
      setH264(b.kodek === "hevc");
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Video açılamadı.");
    }
  };

  const kisaKenarGenislik = (b: VideoBilgi, p: number) => {
    if (!p || Math.min(b.genislik, b.yukseklik) <= p) return undefined;
    const k = p / Math.min(b.genislik, b.yukseklik);
    return Math.round((b.genislik * k) / 2) * 2;
  };

  const ayarHesapla = (b: VideoBilgi): VideoAyar => {
    if (mod === "sikistir") {
      if (yontem === "hedef") {
        const bps = hedefBitHizi(hedefMb, b.sure, SES_BPS);
        const w = onerilenGenislik(bps, b.genislik);
        return {
          bitHizi: bps,
          genislik: w < b.genislik ? w : undefined,
          yenidenKodla: true,
          sesBitHizi: SES_BPS,
        };
      }
      const w = kisaKenarGenislik(b, cozunurluk) ?? b.genislik;
      const h = ciftYukseklik(w, b.genislik, b.yukseklik);
      return {
        bitHizi: kaliteBitHizi(w, h, duzey),
        genislik: w < b.genislik ? w : undefined,
        yenidenKodla: true,
      };
    }
    if (mod === "mp4") return { yenidenKodla: h264 };
    if (mod === "kes") return { kirp: { bas, son }, hassasKesim: hassas };
    if (mod === "dondur") return { dondur: aci, aynala, goruntuyeIsle: isle };
    return { sesiSil: true };
  };

  const calistir = async () => {
    if (!dosya || !bilgi) return;
    setHata("");
    setSonuc(null);
    setIlerleme(0);
    try {
      const r = await videoIsle(dosya, ayarHesapla(bilgi), setIlerleme);
      setSonuc({
        url: url(r.blob),
        boyut: r.blob.size,
        ad: videoAdi(dosya.name, EK[mod]),
        kodek: r.kodek,
      });
      indir(
        urller.current[urller.current.length - 1],
        videoAdi(dosya.name, EK[mod]),
      );
    } catch (e) {
      setHata(e instanceof Error ? e.message : "İşlem başarısız.");
    } finally {
      setIlerleme(null);
    }
  };

  const hedefUyari =
    bilgi && mod === "sikistir" && yontem === "hedef"
      ? !hedefUlasilabilir(hedefMb, bilgi.sure, SES_BPS)
        ? `Bu video ${hedefMb} MB'a sığmayacak kadar uzun; en düşük kalitede sıkıştırılır. Videoyu kesip kısaltmayı deneyin.`
        : dosya && dosya.size <= hedefMb * 1_000_000
          ? "Video zaten bu boyuttan küçük."
          : ""
      : "";

  const onizlemeDonme =
    mod === "dondur"
      ? `rotate(${aci}deg)${aynala ? " scaleX(-1)" : ""}${aci % 180 ? " scale(0.56)" : ""}`
      : undefined;

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        tur="video"
        coklu={false}
        max={1}
        baslik={
          dosya ? "Başka bir video seçin" : "Video seçin (MP4, MOV, WebM, MKV)"
        }
        onSec={(d) => void ac(d)}
      />
      {bilgi && dosya ? (
        <>
          <p className="vesikalik-ozet">
            <b>{dosya.name}</b> · {sureMetni(bilgi.sure, false)} ·{" "}
            {bilgi.genislik}×{bilgi.yukseklik} ·{" "}
            {KODEK_AD[bilgi.kodek ?? ""] ?? bilgi.kodek ?? "?"}
            {bilgi.sesKodek
              ? ` + ${KODEK_AD[bilgi.sesKodek] ?? bilgi.sesKodek}`
              : " · sessiz"}{" "}
            · {boyutMetni(dosya.size)}
          </p>
          <div className="video-onizleme">
            <video
              ref={oynatici}
              src={kaynakUrl}
              controls
              playsInline
              preload="metadata"
              style={onizlemeDonme ? { transform: onizlemeDonme } : undefined}
            />
          </div>

          <div className="date-calc-input">
            {mod === "sikistir" ? (
              <>
                <div
                  className="date-converter-modes"
                  role="tablist"
                  aria-label="Yöntem"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={yontem === "hedef"}
                    className={yontem === "hedef" ? "is-active" : undefined}
                    onClick={() => setYontem("hedef")}
                  >
                    Hedef boyut
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={yontem === "kalite"}
                    className={yontem === "kalite" ? "is-active" : undefined}
                    onClick={() => setYontem("kalite")}
                  >
                    Kalite ve çözünürlük
                  </button>
                </div>
                {yontem === "hedef" ? (
                  <div className="date-calc-fields">
                    <div className="date-calc-field">
                      <span>Hedef dosya boyutu</span>
                      <div
                        className="gorsel-hedefler"
                        role="radiogroup"
                        aria-label="Hedef boyut"
                      >
                        {HEDEFLER.map((h) => (
                          <button
                            key={h.mb}
                            type="button"
                            role="radio"
                            aria-checked={hedefMb === h.mb}
                            className={
                              hedefMb === h.mb ? "is-active" : undefined
                            }
                            onClick={() => setHedefMb(h.mb)}
                          >
                            {h.ad}
                          </button>
                        ))}
                      </div>
                    </div>
                    <label className="date-calc-field">
                      <span>veya MB yazın</span>
                      <span className="date-calc-field-row">
                        <input
                          type="number"
                          min={1}
                          max={4000}
                          value={hedefMb}
                          onChange={(e) =>
                            setHedefMb(Math.max(1, Number(e.target.value) || 1))
                          }
                        />
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className="date-calc-fields">
                    <label className="date-calc-field">
                      <span>Kalite</span>
                      <span className="date-calc-field-row">
                        <select
                          value={duzey}
                          onChange={(e) =>
                            setDuzey(e.target.value as typeof duzey)
                          }
                        >
                          <option value="yuksek">Yüksek</option>
                          <option value="orta">Orta (önerilen)</option>
                          <option value="dusuk">Düşük (en küçük)</option>
                        </select>
                      </span>
                    </label>
                    <label className="date-calc-field">
                      <span>Çözünürlük</span>
                      <span className="date-calc-field-row">
                        <select
                          value={cozunurluk}
                          onChange={(e) =>
                            setCozunurluk(Number(e.target.value))
                          }
                        >
                          {COZUNURLUKLER.map((c) => (
                            <option key={c} value={c}>
                              {c ? `${c}p` : "Orijinal"}
                            </option>
                          ))}
                        </select>
                      </span>
                    </label>
                  </div>
                )}
                {hedefUyari ? (
                  <p className="video-uyari">{hedefUyari}</p>
                ) : null}
              </>
            ) : null}

            {mod === "mp4" ? (
              <label className="date-calc-check">
                <input
                  type="checkbox"
                  checked={h264}
                  onChange={(e) => setH264(e.target.checked)}
                />{" "}
                H.264&apos;e çevir (her cihazda açılır; yeniden kodlandığı için
                daha uzun sürer)
                {bilgi.kodek === "hevc"
                  ? " — bu video HEVC, işaretli kalması önerilir"
                  : ""}
              </label>
            ) : null}

            {mod === "kes" ? (
              <>
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
                              Math.min(Number(e.target.value), son - 0.1),
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
                    <span>Bitiş (sn)</span>
                    <span className="date-calc-field-row">
                      <input
                        type="number"
                        min={0}
                        step={0.1}
                        value={son}
                        onChange={(e) =>
                          setSon(
                            Math.min(
                              bilgi.sure,
                              Math.max(Number(e.target.value), bas + 0.1),
                            ),
                          )
                        }
                      />
                      <button
                        type="button"
                        className="video-an"
                        onClick={() =>
                          setSon(
                            Math.round(
                              (oynatici.current?.currentTime ?? bilgi.sure) *
                                10,
                            ) / 10,
                          )
                        }
                      >
                        Şu an
                      </button>
                    </span>
                  </label>
                </div>
                <p className="video-bilgi">
                  Seçilen bölüm: {sureMetni(bas)} – {sureMetni(son)} (
                  {sureMetni(Math.max(0, son - bas))})
                </p>
                <label className="date-calc-check">
                  <input
                    type="checkbox"
                    checked={hassas}
                    onChange={(e) => setHassas(e.target.checked)}
                  />{" "}
                  Kare hassasiyetinde kes (yeniden kodlar, daha yavaş)
                </label>
              </>
            ) : null}

            {mod === "dondur" ? (
              <>
                <div
                  className="gorsel-hedefler"
                  role="radiogroup"
                  aria-label="Döndürme"
                >
                  {(
                    [
                      [90, "↻ 90° sağa"],
                      [270, "↺ 90° sola"],
                      [180, "180°"],
                      [0, "Döndürme yok"],
                    ] as const
                  ).map(([a, ad]) => (
                    <button
                      key={a}
                      type="button"
                      role="radio"
                      aria-checked={aci === a}
                      className={aci === a ? "is-active" : undefined}
                      onClick={() => setAci(a)}
                    >
                      {ad}
                    </button>
                  ))}
                </div>
                <label className="date-calc-check">
                  <input
                    type="checkbox"
                    checked={aynala}
                    onChange={(e) => setAynala(e.target.checked)}
                  />{" "}
                  Yatay aynala (ön kamera görüntüsünü düzeltir)
                </label>
                <label className="date-calc-check">
                  <input
                    type="checkbox"
                    checked={isle}
                    onChange={(e) => setIsle(e.target.checked)}
                  />{" "}
                  Görüntüye kalıcı işle (döndürme bilgisini yok sayan programlar
                  için; yeniden kodlar)
                </label>
              </>
            ) : null}
          </div>

          <div className="gorsel-alt">
            <span>
              {ilerleme !== null
                ? `İşleniyor… %${Math.round(ilerleme * 100)}`
                : ""}
            </span>
            <button
              type="button"
              className="time-tool-button"
              disabled={
                ilerleme !== null || (mod === "dondur" && !aci && !aynala)
              }
              onClick={() => void calistir()}
            >
              {DUGME[mod]}
            </button>
          </div>
          {ilerleme !== null ? (
            <progress className="video-ilerleme" max={1} value={ilerleme} />
          ) : null}
          {sonuc ? (
            <div className="video-sonuc">
              <video src={sonuc.url} controls playsInline preload="metadata" />
              <div>
                <p>
                  <b>{sonuc.ad}</b>
                  <br />
                  {boyutMetni(dosya.size)} → <b>{boyutMetni(sonuc.boyut)}</b>
                  {sonuc.boyut < dosya.size
                    ? ` (−%${Math.round((1 - sonuc.boyut / dosya.size) * 100)})`
                    : ""}
                  {sonuc.kodek
                    ? ` · ${KODEK_AD[sonuc.kodek] ?? sonuc.kodek}`
                    : ""}
                </p>
                <a
                  className="time-tool-button"
                  href={sonuc.url}
                  download={sonuc.ad}
                >
                  Tekrar indir
                </a>
                {sonuc.kodek === "vp9" ? (
                  <p className="video-uyari">
                    Tarayıcınız H.264 kodlamayı desteklemediği için VP9
                    kullanıldı; iPhone ve bazı TV&apos;lerde açılmayabilir.
                    Chrome, Edge veya Safari ile tekrar deneyin.
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}
        </>
      ) : null}
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      <p className="date-calc-note">
        Video tarayıcınızda işlenir, hiçbir sunucuya yüklenmez. Video motoru
        (Mediabunny, yaklaşık 200 KB) ilk kullanımda bir kez indirilir;
        kodlamayı tarayıcınızın kendi donanım kodlayıcısı yapar.
      </p>
    </div>
  );
}
