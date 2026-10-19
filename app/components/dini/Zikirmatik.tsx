"use client";

// Zikirmatik: tek zikir (33, 99, 100, özel ya da sınırsız hedef), namaz sonrası tesbihat akışı (33+33+33+1) ve
// kişisel zikir listeleri (biri bitince sıradakine geçer). Ses (tarayıcıda üretilir), titreşim, tam ekran odak modu
// (ekran kapanmaz), günlük istatistik ve dosyaya yedekleme. Her şey bu cihazda saklanır; sunucuya veri gitmez.
import { useEffect, useRef, useState } from "react";
import { gunlukEkle, istatistik, SERBEST, siraKonumu, sonGunler, TESBIHAT, TESBIHAT_KAYNAK, ZIKIRLER, zikirBul, type GunlukSayim, type Zikir } from "../../converter/dini/zikirler";

type Mod = "tek" | "tesbihat" | "liste";
type ListeAdim = { ad: string; adet: number };
type Liste = { id: string; ad: string; adimlar: ListeAdim[] };
type Kayit = {
  mod: Mod;
  zikirId: string;
  serbestAd: string;
  hedef: number; // 0: sınırsız
  sayi: number;
  tesbihatSayi: number;
  listeler: Liste[];
  aktifListe: string;
  listeSayi: number;
  ses: boolean;
  titresim: boolean;
  gunluk: GunlukSayim;
  toplam: number;
};

const ANAHTAR = "birimceviri-zikirmatik-v2";
const ESKI_ANAHTAR = "birimceviri-zikirmatik-v1";
const HEDEFLER = [33, 99, 100];
const ORNEK_LISTE: Liste = {
  id: "gunluk",
  ad: "Günlük zikirlerim",
  adimlar: [
    { ad: "Estağfirullâh", adet: 100 },
    { ad: "Sübhânallâhi ve bihamdihî", adet: 100 },
    { ad: "Allâhümme salli alâ Muhammed", adet: 100 },
  ],
};
const BOS: Kayit = {
  mod: "tek",
  zikirId: ZIKIRLER[0].id,
  serbestAd: "",
  hedef: 33,
  sayi: 0,
  tesbihatSayi: 0,
  listeler: [ORNEK_LISTE],
  aktifListe: ORNEK_LISTE.id,
  listeSayi: 0,
  ses: true,
  titresim: true,
  gunluk: {},
  toplam: 0,
};

const fmt = (n: number) => n.toLocaleString("tr-TR");
const bugunKey = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
const GUN_KISA = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

function oku(): Kayit {
  try {
    const raw = window.localStorage.getItem(ANAHTAR);
    if (raw) {
      const k = JSON.parse(raw) as Partial<Kayit>;
      return { ...BOS, ...k, listeler: Array.isArray(k.listeler) && k.listeler.length ? k.listeler : BOS.listeler, gunluk: k.gunluk ?? {} };
    }
    // Eski sürümden (v1) sayı ve toplam taşınır.
    const eski = JSON.parse(window.localStorage.getItem(ESKI_ANAHTAR) ?? "null") as { sayi?: number; toplam?: number; hedef?: number } | null;
    if (eski) return { ...BOS, sayi: Math.max(0, Math.floor(eski.sayi ?? 0)), toplam: Math.max(0, Math.floor(eski.toplam ?? 0)), hedef: eski.hedef ?? 33 };
  } catch {
    /* depolama kapalı */
  }
  return BOS;
}

/** Tesbih tıkı: tarayıcıda üretilen kısa ses (ses dosyası yok). Hedefe ulaşınca daha uzun ve tok bir ses. */
function useSes() {
  const ctx = useRef<AudioContext | null>(null);
  return (hedefte: boolean) => {
    try {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      ctx.current ??= new AC();
      const c = ctx.current;
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = "sine";
      o.frequency.value = hedefte ? 660 : 1500;
      const t = c.currentTime;
      const sure = hedefte ? 0.45 : 0.05;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(hedefte ? 0.35 : 0.25, t + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, t + sure);
      o.connect(g).connect(c.destination);
      o.start(t);
      o.stop(t + sure + 0.02);
    } catch {
      /* ses desteklenmiyor */
    }
  };
}

function Halka({ oran }: { oran: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <svg className="zk-halka" viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r={r} className="zk-halka-iz" />
      <circle cx="50" cy="50" r={r} className="zk-halka-dolu" strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(1, oran))} />
    </svg>
  );
}

export default function Zikirmatik() {
  const [k, setK] = useState<Kayit>(BOS);
  const [yuklendi, setYuklendi] = useState(false);
  const [odak, setOdak] = useState(false);
  const [ozelMetin, setOzelMetin] = useState("");
  const [duzenle, setDuzenle] = useState(false);
  const [mesaj, setMesaj] = useState("");
  const [bugun, setBugun] = useState("2026-01-01");
  const ses = useSes();
  const dosyaRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setK(oku());
    setBugun(bugunKey());
    setYuklendi(true);
  }, []);
  useEffect(() => {
    if (!yuklendi) return;
    try {
      window.localStorage.setItem(ANAHTAR, JSON.stringify(k));
    } catch {
      /* depolama kapalı: sayaç bu oturumda kalır */
    }
  }, [k, yuklendi]);

  // Odak modunda ekran kapanmasın (destekleyen tarayıcılarda).
  useEffect(() => {
    if (!odak) return;
    let kilit: { release: () => Promise<void> } | null = null;
    const nav = navigator as Navigator & { wakeLock?: { request: (t: "screen") => Promise<{ release: () => Promise<void> }> } };
    nav.wakeLock?.request("screen").then((l) => (kilit = l)).catch(() => {});
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOdak(false);
    window.addEventListener("keydown", esc);
    return () => {
      kilit?.release().catch(() => {});
      window.removeEventListener("keydown", esc);
    };
  }, [odak]);

  const liste = k.listeler.find((l) => l.id === k.aktifListe) ?? k.listeler[0];

  // Ekrandaki zikir, hedef ve bu adımdaki sayı (moda göre).
  let zikir: Zikir;
  let hedef: number;
  let sayi: number;
  let adimMetni = "";
  let bitti = false;
  if (k.mod === "tesbihat") {
    const p = siraKonumu(TESBIHAT, k.tesbihatSayi);
    zikir = TESBIHAT[p.adim].zikir;
    hedef = TESBIHAT[p.adim].adet;
    sayi = p.adimIci;
    bitti = p.bitti;
    adimMetni = `${p.adim + 1}/${TESBIHAT.length}. adım`;
  } else if (k.mod === "liste" && liste?.adimlar.length) {
    const p = siraKonumu(liste.adimlar, k.listeSayi);
    const a = liste.adimlar[p.adim];
    zikir = { ...(ZIKIRLER.find((z) => z.ad === a.ad) ?? { id: "liste", arapca: "", anlam: "" }), ad: a.ad } as Zikir;
    hedef = a.adet;
    sayi = p.adimIci;
    bitti = p.bitti;
    adimMetni = `${liste.ad} · ${p.adim + 1}/${liste.adimlar.length}. adım`;
  } else {
    zikir = k.zikirId === "serbest" ? { ...SERBEST, ad: k.serbestAd.trim() || SERBEST.ad } : zikirBul(k.zikirId);
    hedef = k.hedef;
    sayi = hedef > 0 ? k.sayi % hedef : k.sayi;
  }
  const tur = k.mod === "tek" && hedef > 0 ? Math.floor(k.sayi / hedef) : 0;

  const say = () => {
    if (bitti) return;
    const hedefte = hedef > 0 && sayi + 1 === hedef;
    if (k.ses) ses(hedefte);
    if (k.titresim && "vibrate" in navigator) navigator.vibrate(hedefte ? [80, 60, 180] : 12);
    const gun = bugunKey();
    setBugun(gun);
    setK((o) => ({
      ...o,
      sayi: o.mod === "tek" ? o.sayi + 1 : o.sayi,
      tesbihatSayi: o.mod === "tesbihat" ? o.tesbihatSayi + 1 : o.tesbihatSayi,
      listeSayi: o.mod === "liste" ? o.listeSayi + 1 : o.listeSayi,
      gunluk: gunlukEkle(o.gunluk, gun, 1),
      toplam: o.toplam + 1,
    }));
  };
  const geriAl = () =>
    setK((o) => {
      const alan = o.mod === "tek" ? "sayi" : o.mod === "tesbihat" ? "tesbihatSayi" : "listeSayi";
      if (!o[alan]) return o;
      return { ...o, [alan]: o[alan] - 1, gunluk: gunlukEkle(o.gunluk, bugunKey(), -1), toplam: Math.max(0, o.toplam - 1) };
    });
  const sifirla = () => setK((o) => ({ ...o, ...(o.mod === "tek" ? { sayi: 0 } : o.mod === "tesbihat" ? { tesbihatSayi: 0 } : { listeSayi: 0 }) }));
  const guncelle = (p: Partial<Kayit>) => setK((o) => ({ ...o, ...p }));

  const ist = istatistik(k.gunluk, bugun);
  const son14 = sonGunler(k.gunluk, bugun, 14);
  const enCok = Math.max(1, ...son14.map((g) => g.sayi));

  const sayac = (
    <button type="button" className={`zk-sayac${bitti ? " is-bitti" : ""}`} onClick={say} aria-label={`${zikir.ad}: say`}>
      <Halka oran={hedef > 0 ? sayi / hedef : 0} />
      <span className="zk-sayac-ic">
        <strong aria-live="polite">{bitti ? "✓" : fmt(sayi)}</strong>
        <span>{bitti ? "Tamamlandı" : hedef > 0 ? `/ ${fmt(hedef)}` : "sınırsız"}</span>
      </span>
    </button>
  );
  const baslik = (
    <div className="zk-baslik">
      {zikir.arapca ? (
        <p className="zk-arapca" lang="ar" dir="rtl">
          {zikir.arapca}
        </p>
      ) : null}
      <h3>{zikir.ad}</h3>
      {zikir.anlam ? <p className="zk-anlam">{zikir.anlam}</p> : null}
      {zikir.kaynak ? <p className="zk-kaynak">Kaynak: {zikir.kaynak}</p> : null}
    </div>
  );
  const kalanMetni = bitti
    ? k.mod === "tesbihat"
      ? "Tesbihat tamamlandı. Allah kabul etsin."
      : "Liste tamamlandı."
    : hedef > 0
      ? `${fmt(hedef - sayi)} zikir kaldı${adimMetni ? ` · ${adimMetni}` : ""}${tur ? ` · ${fmt(tur)} tur` : ""}`
      : `Toplam ${fmt(k.sayi)}`;

  return (
    <div className="zk">
      <div className="zk-modlar" role="tablist" aria-label="Zikir türü">
        {(
          [
            ["tek", "Zikir"],
            ["tesbihat", "Namaz tesbihatı"],
            ["liste", "Zikir listem"],
          ] as const
        ).map(([m, ad]) => (
          <button key={m} type="button" role="tab" aria-selected={k.mod === m} className={k.mod === m ? "is-aktif" : undefined} onClick={() => guncelle({ mod: m })}>
            {ad}
          </button>
        ))}
      </div>

      <div className="zk-kart">
        {k.mod === "tek" ? (
          <div className="zk-secim">
            <select aria-label="Zikir" value={k.zikirId} onChange={(e) => guncelle({ zikirId: e.target.value, sayi: 0 })}>
              {ZIKIRLER.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.ad}
                </option>
              ))}
              <option value="serbest">Kendi zikrim…</option>
            </select>
            {k.zikirId === "serbest" ? (
              <input aria-label="Zikrin adı" placeholder="Zikrin adı (ör. Yâ Latîf)" value={k.serbestAd} onChange={(e) => guncelle({ serbestAd: e.target.value })} />
            ) : null}
          </div>
        ) : null}
        {k.mod === "liste" ? (
          <div className="zk-secim">
            <select aria-label="Liste" value={liste?.id} onChange={(e) => guncelle({ aktifListe: e.target.value, listeSayi: 0 })}>
              {k.listeler.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.ad}
                </option>
              ))}
            </select>
            <button type="button" className="zk-kucuk" onClick={() => setDuzenle((d) => !d)}>
              {duzenle ? "Bitti" : "Listeyi düzenle"}
            </button>
          </div>
        ) : null}

        {k.mod === "liste" && duzenle && liste ? (
          <div className="zk-liste-duzen">
            <input aria-label="Liste adı" value={liste.ad} onChange={(e) => guncelle({ listeler: k.listeler.map((l) => (l.id === liste.id ? { ...l, ad: e.target.value } : l)) })} />
            {liste.adimlar.map((a, i) => (
              <div key={i} className="zk-liste-satir">
                <input aria-label={`${i + 1}. zikir`} value={a.ad} list="zk-zikir-adlari" onChange={(e) => guncelle({ listeler: k.listeler.map((l) => (l.id === liste.id ? { ...l, adimlar: l.adimlar.map((x, j) => (j === i ? { ...x, ad: e.target.value } : x)) } : l)) })} />
                <input
                  aria-label={`${i + 1}. zikrin adedi`}
                  inputMode="numeric"
                  value={a.adet}
                  onChange={(e) => {
                    const n = Math.max(1, Math.min(100000, Math.floor(Number(e.target.value) || 1)));
                    guncelle({ listeler: k.listeler.map((l) => (l.id === liste.id ? { ...l, adimlar: l.adimlar.map((x, j) => (j === i ? { ...x, adet: n } : x)) } : l)), listeSayi: 0 });
                  }}
                />
                <button type="button" className="zk-kucuk" aria-label="Sil" onClick={() => guncelle({ listeler: k.listeler.map((l) => (l.id === liste.id ? { ...l, adimlar: l.adimlar.filter((_, j) => j !== i) } : l)), listeSayi: 0 })}>
                  ✕
                </button>
              </div>
            ))}
            <datalist id="zk-zikir-adlari">
              {ZIKIRLER.map((z) => (
                <option key={z.id} value={z.ad} />
              ))}
            </datalist>
            <div className="zk-dugmeler">
              <button type="button" className="zk-kucuk" onClick={() => guncelle({ listeler: k.listeler.map((l) => (l.id === liste.id ? { ...l, adimlar: [...l.adimlar, { ad: "Sübhânallah", adet: 33 }] } : l)) })}>
                + Zikir ekle
              </button>
              <button
                type="button"
                className="zk-kucuk"
                onClick={() => {
                  const id = `l${Date.now()}`;
                  guncelle({ listeler: [...k.listeler, { id, ad: "Yeni liste", adimlar: [{ ad: "Sübhânallah", adet: 33 }] }], aktifListe: id, listeSayi: 0 });
                }}
              >
                + Yeni liste
              </button>
              {k.listeler.length > 1 ? (
                <button type="button" className="zk-kucuk" onClick={() => guncelle({ listeler: k.listeler.filter((l) => l.id !== liste.id), aktifListe: k.listeler.find((l) => l.id !== liste.id)!.id, listeSayi: 0 })}>
                  Bu listeyi sil
                </button>
              ) : null}
            </div>
          </div>
        ) : null}

        {baslik}

        {k.mod === "tek" ? (
          <div className="zk-hedefler" role="group" aria-label="Hedef">
            {HEDEFLER.map((h) => (
              <button key={h} type="button" className={k.hedef === h ? "is-aktif" : undefined} onClick={() => guncelle({ hedef: h, sayi: 0 })}>
                {h}
              </button>
            ))}
            <label className={!HEDEFLER.includes(k.hedef) && k.hedef > 0 ? "zk-ozel is-aktif" : "zk-ozel"}>
              <span className="gorunmez">Özel hedef</span>
              <input
                inputMode="numeric"
                placeholder="Özel"
                value={ozelMetin || (!HEDEFLER.includes(k.hedef) && k.hedef > 0 ? String(k.hedef) : "")}
                onChange={(e) => {
                  setOzelMetin(e.target.value);
                  const n = Math.floor(Number(e.target.value));
                  if (n >= 1 && n <= 100000) guncelle({ hedef: n, sayi: 0 });
                }}
                onBlur={() => setOzelMetin("")}
              />
            </label>
            <button type="button" className={k.hedef === 0 ? "is-aktif" : undefined} onClick={() => guncelle({ hedef: 0, sayi: 0 })} aria-label="Sınırsız">
              ∞
            </button>
          </div>
        ) : null}

        {sayac}
        <p className="zk-kalan" aria-live="polite">
          {kalanMetni}
        </p>

        <div className="zk-dugmeler">
          <button type="button" onClick={geriAl}>
            Geri al
          </button>
          <button type="button" onClick={sifirla}>
            Sıfırla
          </button>
          <button type="button" className="is-ana" onClick={() => setOdak(true)}>
            Tam ekran
          </button>
        </div>
        <div className="zk-ayarlar">
          <label>
            <input type="checkbox" checked={k.ses} onChange={(e) => guncelle({ ses: e.target.checked })} /> Ses
          </label>
          <label>
            <input type="checkbox" checked={k.titresim} onChange={(e) => guncelle({ titresim: e.target.checked })} /> Titreşim
          </label>
        </div>
        {k.mod === "tesbihat" ? <p className="zk-kaynak">Sıra ve sayılar: {TESBIHAT_KAYNAK}. Her adım bitince sıradakine kendiliğinden geçer.</p> : null}
      </div>

      <section className="zk-istatistik" aria-label="İstatistik">
        <h3>İstatistiğim</h3>
        <dl>
          <div>
            <dt>Bugün</dt>
            <dd>{fmt(ist.bugun)}</dd>
          </div>
          <div>
            <dt>Son 7 gün</dt>
            <dd>{fmt(ist.hafta)}</dd>
          </div>
          <div>
            <dt>Son 30 gün</dt>
            <dd>{fmt(ist.ay)}</dd>
          </div>
          <div>
            <dt>Üst üste</dt>
            <dd>{ist.seri} gün</dd>
          </div>
        </dl>
        <div className="zk-grafik" role="img" aria-label="Son 14 günün zikir sayıları">
          {son14.map((g) => {
            const d = new Date(`${g.gun}T12:00:00Z`);
            return (
              <span key={g.gun} title={`${g.gun}: ${fmt(g.sayi)}`}>
                <i style={{ height: `${Math.round((g.sayi / enCok) * 100)}%` }} />
                <small>{GUN_KISA[d.getUTCDay()]}</small>
              </span>
            );
          })}
        </div>
        <p className="zk-not">
          Tüm zamanlar: {fmt(Math.max(k.toplam, ist.tumu))} zikir. Kayıtlar yalnızca bu cihazda tutulur.{" "}
          <button
            type="button"
            className="zk-link"
            onClick={() => {
              const blob = new Blob([JSON.stringify(k, null, 1)], { type: "application/json" });
              const a = document.createElement("a");
              a.href = URL.createObjectURL(blob);
              a.download = `zikirmatik-yedek-${bugunKey()}.json`;
              a.click();
              URL.revokeObjectURL(a.href);
            }}
          >
            Yedekle
          </button>{" "}
          ·{" "}
          <button type="button" className="zk-link" onClick={() => dosyaRef.current?.click()}>
            Yedekten geri yükle
          </button>
          <input
            ref={dosyaRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              try {
                const v = JSON.parse(await f.text()) as Partial<Kayit>;
                if (typeof v !== "object" || !v || typeof v.gunluk !== "object") throw new Error();
                setK({ ...BOS, ...v, listeler: Array.isArray(v.listeler) && v.listeler.length ? v.listeler : BOS.listeler });
                setMesaj("Yedek geri yüklendi.");
              } catch {
                setMesaj("Bu dosya bir zikirmatik yedeği değil.");
              }
              e.target.value = "";
            }}
          />
          {mesaj ? <span className="zk-mesaj"> {mesaj}</span> : null}
        </p>
      </section>

      {odak ? (
        <div className="zk-odak" role="dialog" aria-modal="true" aria-label="Tam ekran zikirmatik" onClick={say}>
          <button
            type="button"
            className="zk-odak-cik"
            onClick={(e) => {
              e.stopPropagation();
              setOdak(false);
            }}
          >
            Kapat
          </button>
          {baslik}
          <div className="zk-odak-sayi">
            <strong>{bitti ? "✓" : fmt(sayi)}</strong>
            <span>{kalanMetni}</span>
          </div>
          <p className="zk-odak-ipucu">Ekranın herhangi bir yerine dokunun. Ekran açık kalır.</p>
        </div>
      ) : null}
    </div>
  );
}
