"use client";

import { useEffect, useRef, useState } from "react";
import { qrCoz } from "../../converter/metin/qrIcerik";
import DosyaBirak from "../gorsel/DosyaBirak";
import { bitmapAc } from "../gorsel/tuval";

type Dedektor = {
  detect: (k: CanvasImageSource) => Promise<Array<{ rawValue: string }>>;
};

/** Tuvaldeki QR kodu okur: önce tarayıcının yerleşik okuyucusu, yoksa jsQR. */
async function tuvaldenOku(c: HTMLCanvasElement): Promise<string | null> {
  const BD = (
    globalThis as unknown as { BarcodeDetector?: new (o: object) => Dedektor }
  ).BarcodeDetector;
  if (BD) {
    try {
      const r = await new BD({ formats: ["qr_code"] }).detect(c);
      if (r[0]?.rawValue) return r[0].rawValue;
    } catch {
      /* jsQR ile devam */
    }
  }
  const jsQR = (await import("jsqr")).default;
  const x = c.getContext("2d", { willReadFrequently: true })!;
  const d = x.getImageData(0, 0, c.width, c.height);
  return (
    jsQR(d.data, d.width, d.height, { inversionAttempts: "attemptBoth" })
      ?.data ?? null
  );
}

/** Görselden, panodan veya kameradan QR kod okur. */
export default function QrOku() {
  const [sonuc, setSonuc] = useState<string | null>(null);
  const [durum, setDurum] = useState("");
  const [hata, setHata] = useState("");
  const [kamera, setKamera] = useState(false);
  const [kopyalandi, setKopyalandi] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const akis = useRef<MediaStream | null>(null);
  const dongu = useRef(0);

  const kameraKapat = () => {
    cancelAnimationFrame(dongu.current);
    akis.current?.getTracks().forEach((t) => t.stop());
    akis.current = null;
    setKamera(false);
  };

  useEffect(() => kameraKapat, []);

  const gorseldenOku = async (b: Blob) => {
    setHata("");
    setSonuc(null);
    setDurum("Okunuyor…");
    try {
      const bm = await bitmapAc(b);
      const k = Math.min(1, 1600 / Math.max(bm.width, bm.height));
      const c = document.createElement("canvas");
      c.width = Math.round(bm.width * k);
      c.height = Math.round(bm.height * k);
      const x = c.getContext("2d", { willReadFrequently: true })!;
      x.fillStyle = "#ffffff";
      x.fillRect(0, 0, c.width, c.height);
      x.drawImage(bm, 0, 0, c.width, c.height);
      bm.close();
      const r = await tuvaldenOku(c);
      if (r === null)
        setHata(
          "Görselde QR kod bulunamadı. QR'ın net, düz ve tamamen görünür olduğu bir görsel deneyin.",
        );
      else setSonuc(r);
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Görsel açılamadı.");
    } finally {
      setDurum("");
    }
  };

  // Ctrl+V ile ekran görüntüsü
  useEffect(() => {
    const yapistir = (e: ClipboardEvent) => {
      const f = [...(e.clipboardData?.files ?? [])].find((x) =>
        x.type.startsWith("image/"),
      );
      if (!f) return;
      e.preventDefault();
      void gorseldenOku(f);
    };
    window.addEventListener("paste", yapistir);
    return () => window.removeEventListener("paste", yapistir);
  });

  const kameraAc = async () => {
    setHata("");
    setSonuc(null);
    try {
      akis.current = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      setKamera(true);
      const v = video.current!;
      v.srcObject = akis.current;
      await v.play();
      const c = document.createElement("canvas");
      let son = 0;
      const tara = async (t: number) => {
        if (!akis.current) return;
        if (t - son > 250 && v.videoWidth) {
          son = t;
          const k = Math.min(1, 800 / Math.max(v.videoWidth, v.videoHeight));
          c.width = Math.round(v.videoWidth * k);
          c.height = Math.round(v.videoHeight * k);
          c.getContext("2d", { willReadFrequently: true })!.drawImage(
            v,
            0,
            0,
            c.width,
            c.height,
          );
          const r = await tuvaldenOku(c);
          if (r !== null) {
            setSonuc(r);
            kameraKapat();
            navigator.vibrate?.(80);
            return;
          }
        }
        dongu.current = requestAnimationFrame((z) => void tara(z));
      };
      dongu.current = requestAnimationFrame((z) => void tara(z));
    } catch {
      kameraKapat();
      setHata(
        "Kameraya erişilemedi. Tarayıcıya kamera izni verin ya da QR'ın fotoğrafını çekip görsel olarak yükleyin.",
      );
    }
  };

  const cozum = sonuc !== null ? qrCoz(sonuc) : null;
  const baglanti = sonuc && /^https?:\/\//i.test(sonuc) ? sonuc : null;

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        coklu={false}
        max={1}
        baslik="QR kod içeren görseli seçin"
        onSec={(d) => void gorseldenOku(d[0])}
      />
      <p className="vesikalik-ozet">
        Ekran görüntüsünü <kbd>Ctrl</kbd> + <kbd>V</kbd> ile yapıştırabilir ya
        da kamerayla okutabilirsiniz.
      </p>
      <div className="gorsel-alt qr-kamera-dugme">
        <span />
        {kamera ? (
          <button
            type="button"
            className="time-tool-button is-secondary"
            onClick={kameraKapat}
          >
            Kamerayı kapat
          </button>
        ) : (
          <button
            type="button"
            className="time-tool-button"
            onClick={() => void kameraAc()}
          >
            📷 Kamerayla okut
          </button>
        )}
      </div>
      <div className={`qr-kamera${kamera ? " is-acik" : ""}`}>
        <video ref={video} playsInline muted />
        <span className="qr-cerceve" aria-hidden="true" />
      </div>
      {durum ? <p className="gorsel-durum">{durum}</p> : null}
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      {cozum && sonuc !== null ? (
        <div className="qr-sonuc">
          <b>{cozum.tur}</b>
          {cozum.alanlar.length ? (
            <dl>
              {cozum.alanlar.map(([k, d]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{d}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          <textarea
            className="ocr-metin"
            readOnly
            rows={3}
            value={sonuc}
            aria-label="QR içeriği"
          />
          <div className="qr-dugmeler">
            <button
              type="button"
              className="time-tool-button"
              onClick={() =>
                void navigator.clipboard.writeText(sonuc).then(() => {
                  setKopyalandi(true);
                  setTimeout(() => setKopyalandi(false), 1500);
                })
              }
            >
              {kopyalandi ? "Kopyalandı ✓" : "Kopyala"}
            </button>
            {baglanti ? (
              <a
                className="time-tool-button is-secondary"
                href={baglanti}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Bağlantıyı aç ↗
              </a>
            ) : null}
          </div>
          {baglanti ? (
            <p className="video-uyari">
              Açmadan önce adresi kontrol edin:{" "}
              <b>{new URL(baglanti).hostname}</b>. Tanımadığınız QR kodlar sahte
              ödeme ve giriş sayfalarına yönlendirebilir.
            </p>
          ) : null}
        </div>
      ) : null}
      <p className="date-calc-note">
        QR kod tarayıcınızda okunur; görsel ve kamera görüntüsü hiçbir sunucuya
        gönderilmez.
      </p>
    </div>
  );
}
