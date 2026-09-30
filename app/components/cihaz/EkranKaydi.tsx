"use client";

import Link from "@/app/components/SiteLink";
import { useEffect, useRef, useState } from "react";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import { indir } from "../gorsel/tuval";

const TURLER = [
  "video/mp4;codecs=avc1,mp4a.40.2",
  "video/mp4",
  "video/webm;codecs=vp9,opus",
  "video/webm;codecs=vp8,opus",
  "video/webm",
];

const DESTEK_YOK =
  "Tarayıcınız ekran kaydını desteklemiyor. Bu özellik bilgisayarda Chrome, Edge, Firefox ve Safari'de çalışır; telefonlarda tarayıcıdan ekran kaydı yapılamaz, telefonun kendi ekran kaydı özelliğini kullanın.";

const sure = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

/** Tarayıcıdan ekran kaydı: ekran/pencere/sekme, sistem sesi ve mikrofon. */
export default function EkranKaydi() {
  const [mikrofon, setMikrofon] = useState(false);
  const [kayit, setKayit] = useState(false);
  const [gecen, setGecen] = useState(0);
  const [sonuc, setSonuc] = useState<{
    url: string;
    boyut: number;
    uzanti: string;
  } | null>(null);
  const [hata, setHata] = useState("");
  const kaydedici = useRef<MediaRecorder | null>(null);
  const akislar = useRef<MediaStream[]>([]);

  useEffect(() => {
    return () =>
      akislar.current.forEach((s) => s.getTracks().forEach((t) => t.stop()));
  }, []);

  useEffect(() => {
    if (!kayit) return;
    const z = setInterval(() => setGecen((g) => g + 1), 1000);
    return () => clearInterval(z);
  }, [kayit]);

  const bitir = () => {
    if (kaydedici.current?.state === "recording") kaydedici.current.stop();
  };

  const basla = async () => {
    setHata("");
    if (
      !navigator.mediaDevices?.getDisplayMedia ||
      typeof MediaRecorder === "undefined"
    ) {
      setHata(DESTEK_YOK);
      return;
    }
    try {
      const ekran = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 30 },
        audio: true,
      });
      const izler: MediaStreamTrack[] = [...ekran.getVideoTracks()];
      akislar.current = [ekran];
      let ses: MediaStreamTrack | undefined;
      const sesler: MediaStream[] = [];
      if (ekran.getAudioTracks().length)
        sesler.push(new MediaStream(ekran.getAudioTracks()));
      if (mikrofon) {
        const m = await navigator.mediaDevices.getUserMedia({ audio: true });
        akislar.current.push(m);
        sesler.push(m);
      }
      if (sesler.length === 1) ses = sesler[0].getAudioTracks()[0];
      else if (sesler.length > 1) {
        const ctx = new AudioContext();
        const hedef = ctx.createMediaStreamDestination();
        sesler.forEach((s) => ctx.createMediaStreamSource(s).connect(hedef));
        ses = hedef.stream.getAudioTracks()[0];
      }
      if (ses) izler.push(ses);
      const tur = TURLER.find((t) => MediaRecorder.isTypeSupported(t)) ?? "";
      const r = new MediaRecorder(
        new MediaStream(izler),
        tur ? { mimeType: tur, videoBitsPerSecond: 4_000_000 } : undefined,
      );
      const parca: Blob[] = [];
      r.ondataavailable = (e) => e.data.size && parca.push(e.data);
      r.onstop = () => {
        akislar.current.forEach((s) => s.getTracks().forEach((t) => t.stop()));
        const b = new Blob(parca, { type: r.mimeType });
        if (sonuc) URL.revokeObjectURL(sonuc.url);
        setSonuc({
          url: URL.createObjectURL(b),
          boyut: b.size,
          uzanti: r.mimeType.includes("mp4") ? "mp4" : "webm",
        });
        setKayit(false);
      };
      // kullanıcı tarayıcının "Paylaşımı durdur" düğmesine basarsa
      ekran.getVideoTracks()[0].addEventListener("ended", bitir);
      kaydedici.current = r;
      r.start(1000);
      setGecen(0);
      setSonuc(null);
      setKayit(true);
    } catch (e) {
      if (e instanceof DOMException && e.name === "NotAllowedError")
        setHata("Ekran paylaşımı iptal edildi veya izin verilmedi.");
      else setHata("Kayıt başlatılamadı.");
    }
  };

  return (
    <div className="date-calc gorsel-arac">
      {!kayit ? (
        <div className="cihaz-basla">
          <label className="date-calc-check">
            <input
              type="checkbox"
              checked={mikrofon}
              onChange={(e) => setMikrofon(e.target.checked)}
            />{" "}
            Mikrofonu da kaydet (anlatım için)
          </label>
          <button
            type="button"
            className="time-tool-button"
            onClick={() => void basla()}
          >
            🔴 Kaydı başlat
          </button>
          <p className="date-calc-note">
            Açılan pencerede ekranı, bir pencereyi veya sekmeyi seçin.
            Sistem/sekme sesini kaydetmek için &quot;Sesi de paylaş&quot;
            kutusunu işaretleyin.
          </p>
        </div>
      ) : (
        <div className="kayit-durum">
          <span className="kayit-nokta" /> Kaydediliyor <b>{sure(gecen)}</b>
          <button type="button" className="time-tool-button" onClick={bitir}>
            ⏹ Kaydı bitir
          </button>
        </div>
      )}
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      {sonuc ? (
        <>
          <video className="cihaz-video" src={sonuc.url} controls playsInline />
          <div className="gorsel-alt belge-dugmeler">
            <button
              type="button"
              className="time-tool-button"
              onClick={() => indir(sonuc.url, `ekran-kaydi.${sonuc.uzanti}`)}
            >
              İndir ({sonuc.uzanti.toUpperCase()}, {boyutMetni(sonuc.boyut)})
            </button>
          </div>
          {sonuc.uzanti === "webm" ? (
            <p className="date-calc-note">
              Kayıt WebM biçiminde; Chrome, Firefox ve VLC&apos;de açılır. MP4
              gerekiyorsa <Link href="/video-sikistirma">Video Sıkıştırma</Link>{" "}
              aracıyla MP4&apos;e çevirebilirsiniz.
            </p>
          ) : null}
        </>
      ) : null}
      <p className="date-calc-note">
        Kayıt bilgisayarınızda oluşturulur; hiçbir sunucuya yüklenmez. Süre
        sınırı yoktur, yalnızca bilgisayarınızın belleğiyle sınırlıdır.
      </p>
    </div>
  );
}
