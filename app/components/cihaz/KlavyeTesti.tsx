"use client";

import { useEffect, useRef, useState } from "react";
import { KLAVYE, TUM_KODLAR, YON, type Tus } from "./klavyeDuzen";

type Kayit = { key: string; code: string; zaman: number };

/** Klavye testi: basılan tuşlar görsel klavyede yanar, denenen tuşlar işaretli kalır. */
export default function KlavyeTesti() {
  const [basili, setBasili] = useState<Set<string>>(new Set());
  const [denenen, setDenenen] = useState<Set<string>>(new Set());
  const [gecmis, setGecmis] = useState<Kayit[]>([]);
  const [takili, setTakili] = useState<string[]>([]);
  const basZaman = useRef(new Map<string, number>());

  useEffect(() => {
    const asagi = (e: KeyboardEvent) => {
      // sayfanın kaymasını ve tarayıcı kısayollarını engelle (F5, Ctrl+R hariç)
      if (
        !(
          e.key === "F5" ||
          ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "r")
        )
      )
        e.preventDefault();
      const k = e.code || e.key;
      if (!basZaman.current.has(k)) basZaman.current.set(k, performance.now());
      setBasili((s) => new Set(s).add(k));
      setDenenen((s) => new Set(s).add(k));
      if (!e.repeat)
        setGecmis((g) =>
          [
            {
              key: e.key === " " ? "Boşluk" : e.key,
              code: e.code,
              zaman: Date.now(),
            },
            ...g,
          ].slice(0, 12),
        );
    };
    const yukari = (e: KeyboardEvent) => {
      e.preventDefault();
      const k = e.code || e.key;
      basZaman.current.delete(k);
      setBasili((s) => {
        const n = new Set(s);
        n.delete(k);
        return n;
      });
    };
    const bosalt = () => {
      basZaman.current.clear();
      setBasili(new Set());
    };
    const denetle = setInterval(() => {
      const simdi = performance.now();
      setTakili(
        [...basZaman.current]
          .filter(([, t]) => simdi - t > 4000)
          .map(([k]) => k),
      );
    }, 1000);
    window.addEventListener("keydown", asagi);
    window.addEventListener("keyup", yukari);
    window.addEventListener("blur", bosalt);
    return () => {
      clearInterval(denetle);
      window.removeEventListener("keydown", asagi);
      window.removeEventListener("keyup", yukari);
      window.removeEventListener("blur", bosalt);
    };
  }, []);

  const tus = (t: Tus, i: number) =>
    t.kod ? (
      <span
        key={t.kod}
        className={`tus${basili.has(t.kod) ? " is-basili" : denenen.has(t.kod) ? " is-denendi" : ""}`}
        style={{ flexGrow: t.gen ?? 1 }}
      >
        {t.yazi}
      </span>
    ) : (
      <span key={`bos${i}`} className="tus is-bos" />
    );

  const toplam = TUM_KODLAR.size;
  const denenenSayi = [...denenen].filter((k) => TUM_KODLAR.has(k)).length;

  return (
    <div className="date-calc gorsel-arac">
      <p className="vesikalik-ozet">
        Klavyede tuşlara basın · <b>{denenenSayi}</b> / {toplam} tuş denendi
        {takili.length ? ` · ⚠️ basılı kalan tuş: ${takili.join(", ")}` : ""}
      </p>
      <div className="klavye" aria-hidden="true">
        <div className="klavye-ana">
          {KLAVYE.map((s, i) => (
            <div key={i} className={`klavye-satir${i === 0 ? " is-f" : ""}`}>
              {s.map(tus)}
            </div>
          ))}
        </div>
        <div className="klavye-yon">
          {YON.map((s, i) => (
            <div key={i} className="klavye-satir">
              {s.map(tus)}
            </div>
          ))}
        </div>
      </div>
      <div className="gorsel-alt belge-dugmeler">
        <button
          type="button"
          className="time-tool-button is-secondary"
          onClick={() => {
            setDenenen(new Set());
            setGecmis([]);
          }}
        >
          Sıfırla
        </button>
      </div>
      {gecmis.length ? (
        <div className="port-tablo">
          <table>
            <thead>
              <tr>
                <th>Tuş</th>
                <th>Kod (event.code)</th>
              </tr>
            </thead>
            <tbody>
              {gecmis.map((g) => (
                <tr key={g.zaman + g.code}>
                  <td>
                    <b>{g.key}</b>
                  </td>
                  <td>
                    <code>{g.code || "—"}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      <p className="date-calc-note">
        Yeşil: şu an basılı · gri: denendi ve çalışıyor. Fn tuşu ve bazı medya
        tuşları tarayıcıya iletilmediği için görünmez. Windows tuşu ve Alt+Tab
        gibi sistem kısayolları işletim sistemi tarafından yakalanabilir.
      </p>
    </div>
  );
}
