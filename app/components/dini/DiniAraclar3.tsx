"use client";

import { useEffect, useRef, useState } from "react";
import {
  bosKazaSayac,
  hafizlikGunlukSayfa,
  hafizlikPlani,
  hayizDegerlendir,
  KAZA_KALEMLERI,
  kazaIlerleme,
  kazaSayacOku,
  MUSHAF_SAYFA,
  TEMIZLIK_MIN_GUN,
  type KazaKalemi,
  type KazaSayac,
} from "../../converter/diniHesaplar";
import { ESMAUL_HUSNA } from "../../converter/esmaulHusna";
import { addDaysYmd, parseYmd } from "../../converter/time/dateMath";
import { Field, fmt, Modes, sayi, sayi0 } from "./DiniAraclar2";

function bugunIso() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

const tarihYazi = (iso: string, gun: number) => {
  const d = parseYmd(iso);
  if (!d) return null;
  const s = addDaysYmd(d, gun);
  return `${String(s.day).padStart(2, "0")}.${String(s.month).padStart(2, "0")}.${s.year}`;
};

function oku<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function yaz(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Gizli sekme ya da kapalı depolama: sayaç yalnızca bu oturumda kalır.
  }
}

/* ---------------- Hafızlık ---------------- */

export function HafizlikHesaplama() {
  const [mod, setMod] = useState<"hiz" | "hedef">("hiz");
  const [sayfa, setSayfa] = useState("1");
  const [hafta, setHafta] = useState("6");
  const [ezber, setEzber] = useState("0");
  const [ay, setAy] = useState("12");
  const [bas, setBas] = useState("");
  useEffect(() => {
    const frame = requestAnimationFrame(() => setBas((v) => v || bugunIso()));
    return () => cancelAnimationFrame(frame);
  }, []);

  const hedefGun = Math.round(sayi(ay) * 30.44);
  const gerekli = mod === "hedef" ? hafizlikGunlukSayfa(hedefGun, sayi(hafta), sayi0(ezber)) : Number.NaN;
  const plan = mod === "hiz" ? hafizlikPlani(sayi(sayfa), sayi(hafta), sayi0(ezber)) : null;
  const bitis = plan && bas ? tarihYazi(bas, plan.takvimGunu - 1) : null;

  return (
    <div className="date-calc">
      <Modes
        label="Hesaplama yöntemi"
        value={mod}
        onChange={setMod}
        options={[
          ["hiz", "Günde kaç sayfa ezberleyeceğim?"],
          ["hedef", "Kaç ayda bitirmek istiyorum?"],
        ]}
      />
      <div className="date-calc-input">
        {mod === "hiz" ? (
          <div className="date-calc-chips" aria-label="Günlük sayfa seç">
            {["0,5", "1", "2", "3", "5", "10"].map((s) => (
              <button key={s} type="button" onClick={() => setSayfa(s)}>
                günde {s} sayfa
              </button>
            ))}
          </div>
        ) : null}
        <div className="date-calc-fields is-amounts">
          {mod === "hiz" ? (
            <Field label="Günde ezber" suffix="sayfa" value={sayfa} onChange={setSayfa} />
          ) : (
            <Field label="Hedef süre" suffix="ay" value={ay} onChange={setAy} />
          )}
          <Field label="Haftada kaç gün ezber" suffix="1–7" value={hafta} onChange={setHafta} />
          <Field label="Ezberlenmiş sayfa" value={ezber} onChange={setEzber} />
          {mod === "hiz" ? <Field label="Başlangıç tarihi" type="date" value={bas} onChange={setBas} /> : null}
        </div>
      </div>

      {mod === "hiz" ? (
        plan ? (
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>Hafızlık süresi</span>
              <strong>yaklaşık {fmt(plan.ay, 1)} ay</strong>
              <em>
                {fmt(plan.takvimGunu)} takvim günü · {fmt(plan.hafta, 1)} hafta
              </em>
            </div>
            <div className="date-calc-stat">
              <span>Ezber günü</span>
              <strong>{fmt(plan.ezberGunu)} gün</strong>
              <em>{fmt(plan.kalanSayfa)} sayfa kaldı</em>
            </div>
            {bitis ? (
              <div className="date-calc-stat">
                <span>Tahmini bitiş</span>
                <strong>{bitis}</strong>
                <em>tekrar ve ara vermeler hariç</em>
              </div>
            ) : null}
          </div>
        ) : (
          <p className="date-calc-note">Günde 0,25 ile 40 sayfa arası, haftada 1–7 gün girin; ezberlenen sayfa {MUSHAF_SAYFA}'ten az olmalı.</p>
        )
      ) : Number.isFinite(gerekli) && gerekli > 0 ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Günde ezberlenmesi gereken</span>
            <strong>{fmt(gerekli, 2)} sayfa</strong>
            <em>
              yaklaşık {fmt(gerekli * 15)} satır ({fmt(sayi(ay), 1)} ayda, haftada {fmt(sayi(hafta))} gün)
            </em>
          </div>
        </div>
      ) : (
        <p className="date-calc-note">Hedef süreyi ay olarak ve haftada 1–7 gün ezber yapacağınızı girin.</p>
      )}
    </div>
  );
}

/* ---------------- Kaza takip çizelgesi ---------------- */

const KAZA_ANAHTAR = "birimceviri-kaza-takip-v1";
type KazaKayit = { borc: KazaSayac; kilinan: KazaSayac };

export function KazaTakip() {
  const [borc, setBorc] = useState<KazaSayac>(bosKazaSayac);
  const [kilinan, setKilinan] = useState<KazaSayac>(bosKazaSayac);
  const [yuklendi, setYuklendi] = useState(false);
  const [gun, setGun] = useState("");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const kayit = oku<Partial<KazaKayit>>(KAZA_ANAHTAR);
      if (kayit) {
        setBorc(kazaSayacOku(kayit.borc));
        setKilinan(kazaSayacOku(kayit.kilinan));
      }
      setYuklendi(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (yuklendi) yaz(KAZA_ANAHTAR, { borc, kilinan });
  }, [borc, kilinan, yuklendi]);

  const degistir = (id: KazaKalemi, fark: number) =>
    setKilinan((k) => ({ ...k, [id]: Math.max(0, Math.min(borc[id], k[id] + fark)) }));
  const borcYaz = (id: KazaKalemi, raw: string) => {
    const n = sayi0(raw);
    setBorc((b) => ({ ...b, [id]: Number.isFinite(n) && n > 0 ? Math.min(Math.floor(n), 10_000_000) : 0 }));
  };
  const gundenDoldur = () => {
    const n = Math.floor(sayi(gun));
    if (!(n > 0)) return;
    setBorc((b) => ({ ...b, sabah: n, ogle: n, ikindi: n, aksam: n, yatsi: n, vitir: n }));
  };
  const birGun = () =>
    setKilinan((k) => {
      const yeni = { ...k };
      for (const kalem of KAZA_KALEMLERI) if (kalem.id !== "oruc") yeni[kalem.id] = Math.min(borc[kalem.id], k[kalem.id] + 1);
      return yeni;
    });
  const sifirla = () => {
    if (window.confirm("Tüm kaza borcu ve kılınan sayıları silinsin mi?")) {
      setBorc(bosKazaSayac());
      setKilinan(bosKazaSayac());
    }
  };

  const ilerleme = kazaIlerleme(borc, kilinan);

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <strong className="date-calc-input-title">Borcu gün sayısından doldur (her vakitten bir tane)</strong>
        <div className="date-calc-fields">
          <Field label="Kaza edilen gün" value={gun} onChange={setGun} />
          <button type="button" className="kaza-takip-btn is-wide" onClick={gundenDoldur}>
            Borca yaz
          </button>
        </div>
      </div>

      <div className="kaza-takip-liste">
        {KAZA_KALEMLERI.map((k) => {
          const kalan = borc[k.id] - Math.min(kilinan[k.id], borc[k.id]);
          return (
            <div key={k.id} className="kaza-takip-satir">
              <strong>{k.ad}</strong>
              <label>
                <span>Borç</span>
                <input inputMode="numeric" value={borc[k.id] ? String(borc[k.id]) : ""} placeholder="0" onChange={(e) => borcYaz(k.id, e.target.value)} />
              </label>
              <span className="kaza-takip-kalan">
                {fmt(Math.min(kilinan[k.id], borc[k.id]))} {k.id === "oruc" ? "tutuldu" : "kılındı"} · <b>{fmt(kalan)} kaldı</b>
              </span>
              <span className="kaza-takip-butonlar">
                <button type="button" className="kaza-takip-btn" onClick={() => degistir(k.id, -1)} aria-label={`${k.ad}: bir eksilt`} disabled={!kilinan[k.id]}>
                  −1
                </button>
                <button type="button" className="kaza-takip-btn is-main" onClick={() => degistir(k.id, 1)} aria-label={`${k.ad}: bir tane ${k.id === "oruc" ? "tuttum" : "kıldım"}`} disabled={kalan <= 0}>
                  +1
                </button>
              </span>
            </div>
          );
        })}
      </div>

      <div className="date-calc-results">
        <div className="date-calc-stat is-main">
          <span>Kalan kaza namazı</span>
          <strong>{fmt(ilerleme.kalanNamaz)} vakit</strong>
          <em>
            {fmt(ilerleme.kalanRekat)} rekât · %{fmt(ilerleme.yuzde, 1)} tamamlandı
          </em>
        </div>
        <div className="date-calc-stat">
          <span>Kılınan</span>
          <strong>
            {fmt(ilerleme.kilinanNamaz)} / {fmt(ilerleme.borcNamaz)}
          </strong>
          <div className="kaza-takip-cubuk" aria-hidden="true">
            <i style={{ width: `${Math.min(100, ilerleme.yuzde)}%` }} />
          </div>
        </div>
      </div>
      <div className="kaza-takip-alt">
        <button type="button" className="kaza-takip-btn is-main" onClick={birGun} disabled={ilerleme.kalanNamaz <= 0}>
          Bir günlük kaza kıldım (her vakitten +1)
        </button>
        <button type="button" className="kaza-takip-btn" onClick={sifirla}>
          Sıfırla
        </button>
      </div>
      <p className="date-calc-note">Kayıtlar yalnızca bu cihazdaki tarayıcıda saklanır; hesap açmanız gerekmez, hiçbir veri sunucuya gönderilmez.</p>
    </div>
  );
}

/* ---------------- Hayız ve nifas ---------------- */

const saatYazi = (saat: number) => {
  const g = Math.floor(saat / 24);
  const s = Math.round(saat - g * 24);
  return s ? `${g} gün ${s} saat` : `${g} gün`;
};
const anYazi = (ms: number) =>
  new Date(ms).toLocaleString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

export function HayizHesaplama() {
  const [tur, setTur] = useState<"hayiz" | "nifas">("hayiz");
  const [bas, setBas] = useState("2026-10-01T08:00");
  const [bit, setBit] = useState("2026-10-08T20:00");
  const [adet, setAdet] = useState("");
  const [temizlik, setTemizlik] = useState("");

  const basMs = new Date(bas).getTime();
  const bitMs = new Date(bit).getTime();
  const saat = (bitMs - basMs) / 3_600_000;
  const adetN = adet.trim() === "" ? null : sayi(adet);
  const temizlikN = tur === "hayiz" && temizlik.trim() !== "" ? sayi(temizlik) : null;
  const r = Number.isFinite(saat) ? hayizDegerlendir({ tur, saat, adetGun: adetN, oncekiTemizlikGun: temizlikN }) : null;
  const ad = tur === "nifas" ? "Nifas" : "Hayız";

  return (
    <div className="date-calc">
      <Modes
        label="Kanama türü"
        value={tur}
        onChange={setTur}
        options={[
          ["hayiz", "Hayız (âdet)"],
          ["nifas", "Nifas (lohusalık)"],
        ]}
      />
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>{tur === "nifas" ? "Doğum / kanamanın başladığı an" : "Kanamanın başladığı an"}</span>
            <input type="datetime-local" value={bas} onChange={(e) => setBas(e.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>Kanamanın kesildiği an</span>
            <input type="datetime-local" value={bit} onChange={(e) => setBit(e.target.value)} />
          </label>
        </div>
        <div className="date-calc-fields">
          <Field label={tur === "nifas" ? "Önceki lohusalık süresi (varsa)" : "Alışılmış âdet süresi (varsa)"} suffix="gün" value={adet} onChange={setAdet} />
          {tur === "hayiz" ? <Field label="Önceki kanamadan sonraki temizlik (biliniyorsa)" suffix="gün" value={temizlik} onChange={setTemizlik} /> : null}
        </div>
      </div>

      {r ? (
        r.durum === "temizlik-kisa" ? (
          <p className="date-calc-note">
            Önceki kanamadan sonra {TEMIZLIK_MIN_GUN} günden az temizlik geçmiş. Hanefî mezhebinde bu durumda hangi günlerin hayız sayılacağı önceki âdete göre
            ayrıca değerlendirilir; bu araç hüküm vermez. Diyanet'in 190 numaralı Alo Fetva hattına ya da müftülüğe danışın.
          </p>
        ) : (
          <div className="date-calc-results">
            <div className={`date-calc-stat is-main${r.durum === "istihaze" ? " sefer-degil" : ""}`}>
              <span>Sonuç</span>
              <strong>
                {r.durum === "istihaze" ? "İstihaze (özür kanı)" : r.durum === "karisik" ? `${ad} + istihaze` : ad}
              </strong>
              <em>toplam kanama {saatYazi(saat)}</em>
            </div>
            {r.hayizSaat > 0 ? (
              <div className="date-calc-stat">
                <span>{ad} süresi</span>
                <strong>{saatYazi(r.hayizSaat)}</strong>
                <em>
                  {anYazi(basMs)} – {anYazi(basMs + r.hayizSaat * 3_600_000)}
                  {r.esas === "adet" ? " (âdet süresi esas alındı)" : r.esas === "azami" ? ` (en çok ${tur === "nifas" ? 40 : 10} gün)` : ""}
                </em>
              </div>
            ) : null}
            {r.istihazeSaat > 0 ? (
              <div className="date-calc-stat">
                <span>İstihaze sayılan</span>
                <strong>{saatYazi(r.istihazeSaat)}</strong>
                <em>bu sürede namaz kılınır, oruç tutulur</em>
              </div>
            ) : null}
            {r.hayizSaat > 0 ? (
              <div className="date-calc-stat">
                <span>Gusül zamanı</span>
                <strong>{anYazi(basMs + r.hayizSaat * 3_600_000)}</strong>
                <em>{tur === "hayiz" ? `sonraki hayız en erken ${anYazi(basMs + (r.hayizSaat + TEMIZLIK_MIN_GUN * 24) * 3_600_000)}` : "bu andan sonra namaz kılınır"}</em>
              </div>
            ) : null}
          </div>
        )
      ) : (
        <p className="date-calc-note">
          Kesilme anı başlangıçtan sonra olmalı. Âdet süresi hayızda 3–10, nifasta en çok 40 gün yazılabilir; bilmiyorsanız boş bırakın.
        </p>
      )}
    </div>
  );
}

/* ---------------- Zikirmatik ---------------- */

const ZIKIRLER = ["Sübhânallah", "Elhamdülillâh", "Allâhu Ekber", "Lâ ilâhe illallâh", "Estağfirullâh", "Salavât-ı şerîfe", "Serbest zikir"];
const ZIKIR_ANAHTAR = "birimceviri-zikirmatik-v1";
type ZikirKayit = { sayi: number; hedef: number; zikir: string; toplam: number };

export function Zikirmatik() {
  const [sayac, setSayac] = useState(0);
  const [toplam, setToplam] = useState(0);
  const [hedef, setHedef] = useState(33);
  const [zikir, setZikir] = useState(ZIKIRLER[0]);
  const [yuklendi, setYuklendi] = useState(false);
  const [titresim, setTitresim] = useState(true);
  const butonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const k = oku<Partial<ZikirKayit>>(ZIKIR_ANAHTAR);
      if (k) {
        if (typeof k.sayi === "number" && k.sayi >= 0) setSayac(Math.floor(k.sayi));
        if (typeof k.toplam === "number" && k.toplam >= 0) setToplam(Math.floor(k.toplam));
        if (typeof k.hedef === "number" && k.hedef >= 0) setHedef(Math.floor(k.hedef));
        if (typeof k.zikir === "string" && ZIKIRLER.includes(k.zikir)) setZikir(k.zikir);
      }
      setYuklendi(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (yuklendi) yaz(ZIKIR_ANAHTAR, { sayi: sayac, hedef, zikir, toplam });
  }, [sayac, hedef, zikir, toplam, yuklendi]);

  const say = () => {
    const yeni = sayac + 1;
    setSayac(yeni);
    setToplam((t) => t + 1);
    if (titresim && typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(hedef > 0 && yeni % hedef === 0 ? [80, 60, 160] : 15);
    }
  };
  const tur = hedef > 0 ? Math.floor(sayac / hedef) : 0;
  const turIci = hedef > 0 ? sayac % hedef : sayac;

  return (
    <div className="date-calc zikir">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Zikir</span>
            <select value={zikir} onChange={(e) => setZikir(e.target.value)}>
              {ZIKIRLER.map((z) => (
                <option key={z}>{z}</option>
              ))}
            </select>
          </label>
          <label className="date-calc-field">
            <span>Hedef</span>
            <select value={String(hedef)} onChange={(e) => setHedef(Number(e.target.value))}>
              {[33, 99, 100, 500, 1000, 0].map((h) => (
                <option key={h} value={h}>
                  {h ? `${h} kez` : "Hedefsiz"}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="date-calc-check">
          <input type="checkbox" checked={titresim} onChange={(e) => setTitresim(e.target.checked)} />
          Titreşim (hedefe ulaşınca uzun titrer)
        </label>
      </div>

      <button ref={butonRef} type="button" className="zikir-buton" onClick={say} aria-label={`${zikir}: say`}>
        <span className="zikir-ad">{zikir}</span>
        <strong aria-live="polite">{hedef ? turIci : sayac}</strong>
        <span className="zikir-hedef">{hedef ? `/ ${hedef} · ${tur} tur tamamlandı` : "hedefsiz"}</span>
      </button>

      <div className="kaza-takip-alt">
        <button type="button" className="kaza-takip-btn" onClick={() => setSayac((s) => Math.max(0, s - 1))} disabled={!sayac}>
          Geri al (−1)
        </button>
        <button
          type="button"
          className="kaza-takip-btn"
          onClick={() => {
            setSayac(0);
            butonRef.current?.focus();
          }}
        >
          Sayacı sıfırla
        </button>
        <span className="kaza-takip-kalan">
          Sayaç {fmt(sayac)} · tüm zamanlar {fmt(toplam)}
        </span>
      </div>
      <p className="date-calc-note">Sayaç bu cihazda saklanır; sayfayı kapatıp açtığınızda kaldığınız yerden devam eder.</p>
    </div>
  );
}

/* ---------------- Esmâ-i Hüsnâ arama ---------------- */

const sade = (s: string) =>
  s
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’-]/g, "")
    .replace(/ı/g, "i");

export function EsmaListesi() {
  const [q, setQ] = useState("");
  const aranan = sade(q.trim());
  const liste = aranan ? ESMAUL_HUSNA.filter((e) => sade(`${e.ad} ${e.anlam}`).includes(aranan) || String(e.no) === aranan) : ESMAUL_HUSNA;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <label className="date-calc-field sure-arama">
          <span>İsim, anlam ya da sıra numarası ara</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="örn. Rahmân, bağışlayan, 15" />
        </label>
      </div>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">İsim</th>
              <th scope="col">Anlamı</th>
            </tr>
          </thead>
          <tbody>
            {liste.map((e) => (
              <tr key={e.no} id={`esma-${e.no}`}>
                <td>{e.no}</td>
                <td>
                  <strong>{e.ad}</strong>
                </td>
                <td>{e.anlam}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {liste.length === 0 ? <p className="date-calc-note">Eşleşen isim bulunamadı.</p> : null}
    </div>
  );
}
