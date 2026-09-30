"use client";

import { useCallback, useEffect, useState } from "react";
import {
  entropi,
  gucEtiketi,
  kirmaSuresi,
  sifreUret,
  type Kume,
  type SifreAyar,
} from "../../converter/metin/sifre";

const KUME_AD: Record<Kume, string> = {
  buyuk: "Büyük harf (A–Z)",
  kucuk: "Küçük harf (a–z)",
  rakam: "Rakam (0–9)",
  sembol: "Sembol (!@#$…)",
};

/** Web Crypto ile güçlü, rastgele şifre üretir. */
export default function SifreOlustur() {
  const [ayar, setAyar] = useState<SifreAyar>({
    uzunluk: 16,
    kumeler: ["buyuk", "kucuk", "rakam", "sembol"],
    benzerleriCikar: false,
  });
  const [adet, setAdet] = useState(5);
  const [sifreler, setSifreler] = useState<string[]>([]);
  const [kopyalanan, setKopyalanan] = useState<number | null>(null);
  const [goster, setGoster] = useState(true);

  const uret = useCallback(() => {
    try {
      setSifreler(Array.from({ length: adet }, () => sifreUret(ayar)));
    } catch {
      setSifreler([]);
    }
  }, [ayar, adet]);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- ayar değişince yeni şifre üretilir
  useEffect(uret, [uret]);

  const kopyala = async (s: string, i: number) => {
    try {
      await navigator.clipboard.writeText(s);
      setKopyalanan(i);
      setTimeout(() => setKopyalanan((x) => (x === i ? null : x)), 1500);
    } catch {
      /* pano erişimi yok */
    }
  };

  const bit = ayar.kumeler.length ? entropi(ayar) : 0;
  const guc = gucEtiketi(bit);

  return (
    <div className="date-calc gorsel-arac">
      <div className="date-calc-input">
        <label className="date-calc-field">
          <span>Uzunluk: {ayar.uzunluk} karakter</span>
          <span className="date-calc-field-row">
            <input
              type="range"
              min={4}
              max={64}
              value={ayar.uzunluk}
              onChange={(e) =>
                setAyar((a) => ({ ...a, uzunluk: Number(e.target.value) }))
              }
              aria-label="Şifre uzunluğu"
            />
          </span>
        </label>
        <div className="sifre-kumeler">
          {(Object.keys(KUME_AD) as Kume[]).map((k) => (
            <label key={k} className="date-calc-check">
              <input
                type="checkbox"
                checked={ayar.kumeler.includes(k)}
                onChange={(e) =>
                  setAyar((a) => ({
                    ...a,
                    kumeler: e.target.checked
                      ? [...a.kumeler, k]
                      : a.kumeler.filter((x) => x !== k),
                  }))
                }
              />{" "}
              {KUME_AD[k]}
            </label>
          ))}
          <label className="date-calc-check">
            <input
              type="checkbox"
              checked={ayar.benzerleriCikar}
              onChange={(e) =>
                setAyar((a) => ({ ...a, benzerleriCikar: e.target.checked }))
              }
            />{" "}
            Karışan karakterleri çıkar (I, l, 1, O, 0…)
          </label>
        </div>
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Kaç şifre?</span>
            <span className="date-calc-field-row">
              <select
                value={adet}
                onChange={(e) => setAdet(Number(e.target.value))}
              >
                {[1, 5, 10, 20].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </span>
          </label>
        </div>
      </div>

      {ayar.kumeler.length ? (
        <>
          <div className={`sifre-guc is-${guc.duzey}`}>
            <span className="sifre-cubuk" aria-hidden="true">
              <i style={{ width: `${Math.min(100, (bit / 100) * 100)}%` }} />
            </span>
            <span>
              <b>{guc.ad}</b> · {Math.round(bit)} bit · tahmini kırma süresi:{" "}
              {kirmaSuresi(bit)}
            </span>
          </div>
          <ul className="sifre-liste">
            {sifreler.map((s, i) => (
              <li key={`${s}-${i}`}>
                <code>{goster ? s : "•".repeat(s.length)}</code>
                <button type="button" onClick={() => void kopyala(s, i)}>
                  {kopyalanan === i ? "Kopyalandı ✓" : "Kopyala"}
                </button>
              </li>
            ))}
          </ul>
          <div className="gorsel-alt">
            <label className="date-calc-check">
              <input
                type="checkbox"
                checked={goster}
                onChange={(e) => setGoster(e.target.checked)}
              />{" "}
              Şifreleri göster
            </label>
            <button type="button" className="time-tool-button" onClick={uret}>
              ↻ Yeniden üret
            </button>
          </div>
        </>
      ) : (
        <p className="gorsel-hata">En az bir karakter türü seçin.</p>
      )}
      <p className="date-calc-note">
        Şifreler tarayıcınızın şifreleme amaçlı rastgele sayı üreteciyle (Web
        Crypto) cihazınızda oluşturulur; hiçbir yere gönderilmez ve kaydedilmez.
        Her hesap için farklı şifre kullanın ve bir şifre yöneticisinde
        saklayın.
      </p>
    </div>
  );
}
