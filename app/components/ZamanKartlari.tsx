"use client";

// Ana sayfadaki "Zaman" kartları. Her kartın başlığındaki listeden araç seçilir (menüdeki Tarih ve Saat başlığının
// araçları): bugün, geri sayım, gökyüzü, iki tarih arası, yaş, kaçıncı hafta, dünya saati ve zamanlayıcı. Seçim tarayıcıda
// saklanır; her kart ilgili aracın tam sayfasına bağlanır.
// İlk görünüm derleme anına göre sunucuda çizilir; tarayıcıda saat her saniye, tarih ve ay evresi o anki zamana göre güncellenir.
import { useEffect, useState, type ReactNode } from "react";
import Link from "@/app/components/SiteLink";
import { gregorianToHijri, HIJRI_MONTHS_TR } from "../converter/time/calendars";
import { diffDays, diffYmd, isoWeek, parseYmd, ymdKey } from "../converter/time/dateMath";
import { moonState, phaseName, type PhaseName } from "../converter/time/moon";
import { sunTimes } from "../converter/time/solar";
import { worldCities } from "../converter/time/worldCities";

/** Yaklaşan gün: takvimdeki bir günün başlangıcı ve bitişi (ms, Türkiye saatiyle gece yarısı; bayramlarda son günün sonu). */
export type KartYaklasan = { ad: string; kategori: string; katAd: string; bas: number; bit: number; href: string; tatil: boolean; tahmini: boolean };

/** Geri sayım: slug, ad ve sıradaki iki tarihin başlangıcı (ms, Türkiye saatiyle gece yarısı). */
export type KartGeriSayim = { slug: string; ad: string; anlar: number[] };

const EVRE: Record<PhaseName, string> = {
  new: "Yeni ay",
  "waxing-crescent": "Büyüyen hilal",
  first: "İlk dördün",
  "waxing-gibbous": "Büyüyen şişkin ay",
  full: "Dolunay",
  "waning-gibbous": "Küçülen şişkin ay",
  last: "Son dördün",
  "waning-crescent": "Küçülen hilal",
};

type Arac = "bugun" | "geri-sayim" | "gokyuzu" | "iki-tarih" | "yas" | "hafta" | "dunya-saati" | "zamanlayici";

const ARACLAR: Array<{ id: Arac; ad: string }> = [
  { id: "bugun", ad: "Bugün" },
  { id: "geri-sayim", ad: "Geri sayım" },
  { id: "gokyuzu", ad: "Gökyüzü bugün" },
  { id: "iki-tarih", ad: "İki tarih arası gün" },
  { id: "yas", ad: "Yaş hesaplama" },
  { id: "hafta", ad: "Kaçıncı hafta?" },
  { id: "dunya-saati", ad: "Dünya saati" },
  { id: "zamanlayici", ad: "Zamanlayıcı" },
];
const VARSAYILAN: Arac[] = ["bugun", "geri-sayim", "gokyuzu"];
const SAKLAMA = "zamanKartlari.v1";
const SAKLAMA_GERI_SAYIM = "zamanKarti.geriSayim";
const TR = "Europe/Istanbul";
const ISTANBUL = { lat: 41.01, lon: 28.98 };

const trGun = (ms: number) => {
  const t = new Date(ms + 3 * 3600000);
  return { year: t.getUTCFullYear(), month: t.getUTCMonth() + 1, day: t.getUTCDate() };
};
const saat = (d: Date, saniye = false) =>
  new Intl.DateTimeFormat("tr-TR", { hour: "2-digit", minute: "2-digit", ...(saniye ? { second: "2-digit" } : {}), timeZone: TR }).format(d);

/** İlk çizim sunucudaki derleme anıyla yapılır (sunucu ve tarayıcı aynı HTML'i üretir), sonra tarayıcının saatine geçilir. */
function useSimdi(baslangic: number) {
  const [simdi, setSimdi] = useState(baslangic);
  useEffect(() => {
    setSimdi(Date.now()); // eslint-disable-line react-hooks/set-state-in-effect
    const id = setInterval(() => setSimdi(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return simdi;
}

/** Ayın aydınlık kısmı: k aydınlanma oranı (0–1), büyüyorsa sağ taraf aydınlıktır. */
function AyCizimi({ k, buyuyor }: { k: number; buyuyor: boolean }) {
  const r = 26;
  const rx = Math.abs(1 - 2 * k) * r;
  const d = buyuyor
    ? `M30 4 A${r} ${r} 0 0 1 30 56 A${rx} ${r} 0 0 ${k > 0.5 ? 1 : 0} 30 4`
    : `M30 4 A${r} ${r} 0 0 0 30 56 A${rx} ${r} 0 0 ${k > 0.5 ? 0 : 1} 30 4`;
  return (
    <svg viewBox="0 0 60 60" width="56" height="56" aria-hidden="true">
      <circle cx="30" cy="30" r={r} fill="#24324a" />
      <path d={d} fill="#f4ecc8" />
    </svg>
  );
}


const TARIH = (ms: number) => new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", weekday: "long", timeZone: TR }).format(ms);
const sayi = (x: number) => x.toLocaleString("tr-TR");

/** Tarih kutusu: ilk değer derleme günü, tarayıcıda bir kez bugüne çekilir (kullanıcı değiştirmediyse). */
function useTarih(olusturma: number, kaydir: (bugun: string) => string = (b) => b) {
  const [deger, setDeger] = useState(() => kaydir(ymdKey(trGun(olusturma))));
  useEffect(() => {
    setDeger(kaydir(ymdKey(trGun(Date.now()))));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return [deger, setDeger] as const;
}

function TarihAlani({ etiket, deger, degis }: { etiket: string; deger: string; degis: (v: string) => void }) {
  return (
    <label className="hizli-alan">
      <span>{etiket}</span>
      <input type="date" value={deger} onChange={(e) => degis(e.target.value)} />
    </label>
  );
}

function Alt({ not, children }: { not?: ReactNode; children: ReactNode }) {
  return (
    <p className="hizli-alt">
      {not ? <span suppressHydrationWarning>{not}</span> : null}
      {children}
    </p>
  );
}

function Bugun({ simdi }: { simdi: number }) {
  const g = trGun(simdi);
  const h = gregorianToHijri(g);
  return (
    <>
      <div className="hizli-sonuc zaman-saat" aria-live="off">
        <strong suppressHydrationWarning>{saat(new Date(simdi), true)}</strong>
      </div>
      <dl className="zaman-liste">
        <div>
          <dt>Tarih</dt>
          <dd suppressHydrationWarning>{TARIH(simdi)}</dd>
        </div>
        <div>
          <dt>Hicri</dt>
          <dd suppressHydrationWarning>
            {h.day} {HIJRI_MONTHS_TR[h.month - 1]} {h.year}
          </dd>
        </div>
        <div>
          <dt>Hafta</dt>
          <dd suppressHydrationWarning>{isoWeek(g).week}. hafta</dd>
        </div>
      </dl>
      <Alt not="Türkiye saati">
        <Link href="/takvim">Türkiye takvimi</Link>
      </Alt>
    </>
  );
}

function GeriSayim({ simdi, liste }: { simdi: number; liste: KartGeriSayim[] }) {
  const siradaki = (g: KartGeriSayim) => g.anlar.find((a) => a + 86400000 > simdi) ?? g.anlar[g.anlar.length - 1];
  const enYakin = [...liste].sort((a, b) => siradaki(a) - siradaki(b))[0].slug;
  const [secili, setSecili] = useState(enYakin);

  useEffect(() => {
    try {
      const kayit = localStorage.getItem(SAKLAMA_GERI_SAYIM);
      if (kayit && liste.some((g) => g.slug === kayit)) setSecili(kayit); // eslint-disable-line react-hooks/set-state-in-effect
    } catch {
      /* depolama kapalı */
    }
  }, [liste]);

  const g = liste.find((x) => x.slug === secili) ?? liste[0];
  const hedef = siradaki(g);
  const kalan = Math.max(0, hedef - simdi);
  const gun = Math.floor(kalan / 86400000);
  const sa = Math.floor((kalan % 86400000) / 3600000);
  const dk = Math.floor((kalan % 3600000) / 60000);
  const sn = Math.floor((kalan % 60000) / 1000);

  return (
    <>
      <label className="hizli-alan">
        <span>Gün</span>
        <select
          value={g.slug}
          onChange={(e) => {
            setSecili(e.target.value);
            try {
              localStorage.setItem(SAKLAMA_GERI_SAYIM, e.target.value);
            } catch {
              /* depolama kapalı */
            }
          }}
        >
          {liste.map((x) => (
            <option key={x.slug} value={x.slug}>
              {x.ad}
            </option>
          ))}
        </select>
      </label>
      <div className="zaman-sayac" suppressHydrationWarning>
        {kalan === 0 ? (
          <strong>Bugün!</strong>
        ) : (
          [
            [gun, "gün"],
            [sa, "saat"],
            [dk, "dakika"],
            [sn, "saniye"],
          ].map(([v, ad]) => (
            <span key={ad}>
              <strong suppressHydrationWarning>{v}</strong>
              <small>{ad}</small>
            </span>
          ))
        )}
      </div>
      <p className="zaman-not" suppressHydrationWarning>
        {TARIH(hedef)}
      </p>
      <Alt>
        <Link href={`/geri-sayim/${g.slug}`}>{g.ad} sayfası</Link>
        <Link href="/geri-sayim">Tüm geri sayımlar</Link>
      </Alt>
    </>
  );
}

function Gokyuzu({ simdi }: { simdi: number }) {
  const ay = moonState(new Date(simdi));
  const g = trGun(simdi);
  const gunes = sunTimes(g.year, g.month, g.day, ISTANBUL.lat, ISTANBUL.lon);
  return (
    <>
      <div className="zaman-ay">
        <AyCizimi k={ay.illumination} buyuyor={ay.waxing} />
        <div>
          <strong suppressHydrationWarning>{EVRE[phaseName(ay.age)]}</strong>
          <span suppressHydrationWarning>%{Math.round(ay.illumination * 100)} aydınlık</span>
        </div>
      </div>
      {gunes.kind === "normal" ? (
        <dl className="zaman-liste">
          <div>
            <dt>İstanbul gün doğumu</dt>
            <dd suppressHydrationWarning>{saat(gunes.sunrise)}</dd>
          </div>
          <div>
            <dt>Gün batımı</dt>
            <dd suppressHydrationWarning>{saat(gunes.sunset)}</dd>
          </div>
        </dl>
      ) : null}
      <Alt>
        <Link href="/gunes-dogusu-ve-batisi">Güneş saatleri</Link>
        <Link href="/ay-evreleri">Ay evreleri</Link>
      </Alt>
    </>
  );
}

function IkiTarih({ olusturma }: { olusturma: number }) {
  const [bas, setBas] = useTarih(olusturma);
  const [bit, setBit] = useTarih(olusturma, (b) => `${b.slice(0, 4)}-12-31`);
  const a = parseYmd(bas);
  const b = parseYmd(bit);
  const fark = a && b ? diffDays(a, b) : null;
  const ayrinti = a && b ? diffYmd(a, b) : null;
  return (
    <>
      <div className="hizli-ikili">
        <TarihAlani etiket="Başlangıç" deger={bas} degis={setBas} />
        <TarihAlani etiket="Bitiş" deger={bit} degis={setBit} />
      </div>
      <div className="hizli-sonuc" aria-live="polite">
        <strong suppressHydrationWarning>{fark === null ? "—" : `${sayi(Math.abs(fark))} gün`}</strong>
      </div>
      <p className="zaman-not" suppressHydrationWarning>
        {ayrinti ? `${ayrinti.years} yıl ${ayrinti.months} ay ${ayrinti.days} gün · ${sayi(Math.floor(Math.abs(fark!) / 7))} hafta ${Math.abs(fark!) % 7} gün` : "Geçerli iki tarih girin."}
      </p>
      <Alt not="Bitiş günü sayılmaz">
        <Link href="/iki-tarih-arasi-gun-hesaplama">İki tarih arası gün</Link>
      </Alt>
    </>
  );
}

function Yas({ olusturma }: { olusturma: number }) {
  const [dogum, setDogum] = useState("1990-01-01");
  const [bugunKey] = useTarih(olusturma);
  const d = parseYmd(dogum);
  const bugun = parseYmd(bugunKey)!;
  const gecerli = d !== null && diffDays(d, bugun) >= 0;
  const yas = gecerli ? diffYmd(d!, bugun) : null;
  let sonraki: number | null = null;
  if (gecerli) {
    const buYil = { year: bugun.year, month: d!.month, day: d!.month === 2 && d!.day === 29 ? 28 : d!.day };
    const fark = diffDays(bugun, buYil);
    sonraki = fark >= 0 ? fark : diffDays(bugun, { ...buYil, year: bugun.year + 1 });
  }
  return (
    <>
      <TarihAlani etiket="Doğum tarihi" deger={dogum} degis={setDogum} />
      <div className="hizli-sonuc" aria-live="polite">
        <strong suppressHydrationWarning>{yas ? `${yas.years} yaş` : "—"}</strong>
      </div>
      <p className="zaman-not" suppressHydrationWarning>
        {yas
          ? `${yas.years} yıl ${yas.months} ay ${yas.days} gün · toplam ${sayi(diffDays(d!, bugun))} gün. ${sonraki === 0 ? "Doğum gününüz kutlu olsun!" : `Doğum gününüze ${sonraki} gün var.`}`
          : "Bugünden önceki bir tarih girin."}
      </p>
      <Alt>
        <Link href="/yas-hesaplama">Yaş hesaplama</Link>
        <Link href="/dogdugum-gun-hangi-gun">Doğduğum gün</Link>
      </Alt>
    </>
  );
}

function Hafta({ olusturma }: { olusturma: number }) {
  const [tarih, setTarih] = useTarih(olusturma);
  const t = parseYmd(tarih);
  const h = t ? isoWeek(t) : null;
  return (
    <>
      <TarihAlani etiket="Tarih" deger={tarih} degis={setTarih} />
      <div className="hizli-sonuc" aria-live="polite">
        <strong suppressHydrationWarning>{h ? `${h.week}. hafta` : "—"}</strong>
      </div>
      <p className="zaman-not" suppressHydrationWarning>
        {h ? `${h.year} yılının ${h.week}. haftası. Hafta pazartesi başlar (ISO 8601).` : "Geçerli bir tarih girin."}
      </p>
      <Alt>
        <Link href="/kacinci-hafta">Kaçıncı hafta</Link>
      </Alt>
    </>
  );
}

/** Saat diliminin UTC farkı (dakika), ör. Europe/Istanbul → 180. */
function utcFarki(ms: number, timeZone: string) {
  const p = new Intl.DateTimeFormat("en-US", { timeZone, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" }).formatToParts(ms);
  const v = (t: string) => Number(p.find((x) => x.type === t)!.value);
  return Math.round((Date.UTC(v("year"), v("month") - 1, v("day"), v("hour"), v("minute")) - Math.floor(ms / 60000) * 60000) / 60000);
}

const SEHIRLER = worldCities.filter((c) => c.region !== "turkey").sort((a, b) => a.nameTr.localeCompare(b.nameTr, "tr"));

function DunyaSaati({ simdi }: { simdi: number }) {
  const [sehir, setSehir] = useState("londra");
  const c = SEHIRLER.find((x) => x.tr === sehir) ?? SEHIRLER[0];
  const fark = (utcFarki(simdi, c.timeZone) - utcFarki(simdi, TR)) / 60;
  const gun = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", weekday: "long", timeZone: c.timeZone }).format(simdi);
  return (
    <>
      <label className="hizli-alan">
        <span>Şehir</span>
        <select value={c.tr} onChange={(e) => setSehir(e.target.value)}>
          {SEHIRLER.map((x) => (
            <option key={x.tr} value={x.tr}>
              {x.nameTr} ({x.countryTr})
            </option>
          ))}
        </select>
      </label>
      <div className="hizli-sonuc zaman-saat" aria-live="off">
        <strong suppressHydrationWarning>
          {new Intl.DateTimeFormat("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: c.timeZone }).format(simdi)}
        </strong>
      </div>
      <p className="zaman-not" suppressHydrationWarning>
        {gun} · {fark === 0 ? "Türkiye ile aynı saat" : `Türkiye'den ${sayi(Math.abs(fark))} saat ${fark > 0 ? "ileri" : "geri"}`}
      </p>
      <Alt>
        <Link href={`/dunya-saatleri/${c.tr}`}>{c.nameTr} saati</Link>
        <Link href="/dunya-saatleri">Dünya saatleri</Link>
      </Alt>
    </>
  );
}

function Zamanlayici() {
  const [dk, setDk] = useState("5");
  const [sn, setSn] = useState("0");
  const [bitis, setBitis] = useState<number | null>(null);
  const [kalan, setKalan] = useState<number | null>(null);
  const [simdi, setSimdi] = useState(0);

  useEffect(() => {
    if (bitis === null) return;
    const id = setInterval(() => setSimdi(Date.now()), 250);
    return () => clearInterval(id);
  }, [bitis]);

  const toplam = (Math.max(0, Math.trunc(Number(dk.replace(",", ".")) || 0)) * 60 + Math.max(0, Math.trunc(Number(sn.replace(",", ".")) || 0))) * 1000;
  const geri = bitis !== null ? Math.max(0, bitis - simdi) : kalan ?? toplam;
  const bitti = bitis !== null && geri === 0;
  const goster = Math.ceil(geri / 1000);
  const metin = `${String(Math.floor(goster / 60)).padStart(2, "0")}:${String(goster % 60).padStart(2, "0")}`;

  return (
    <>
      <div className="hizli-ikili">
        <label className="hizli-alan">
          <span>Dakika</span>
          <input type="text" inputMode="numeric" value={dk} disabled={bitis !== null} onChange={(e) => { setDk(e.target.value); setKalan(null); }} />
        </label>
        <label className="hizli-alan">
          <span>Saniye</span>
          <input type="text" inputMode="numeric" value={sn} disabled={bitis !== null} onChange={(e) => { setSn(e.target.value); setKalan(null); }} />
        </label>
      </div>
      <div className="hizli-sonuc zaman-saat" aria-live="polite">
        <strong>{bitti ? "Süre doldu" : metin}</strong>
      </div>
      <div className="zaman-dugmeler">
        {bitis === null ? (
          <button type="button" disabled={geri === 0} onClick={() => { const t = Date.now(); setSimdi(t); setBitis(t + geri); }}>
            Başlat
          </button>
        ) : (
          <button type="button" disabled={bitti} onClick={() => { setKalan(geri); setBitis(null); }}>
            Duraklat
          </button>
        )}
        <button type="button" onClick={() => { setBitis(null); setKalan(null); }}>
          Sıfırla
        </button>
      </div>
      <Alt>
        <Link href="/zamanlayici">Zamanlayıcı (alarmlı)</Link>
        <Link href="/kronometre">Kronometre</Link>
      </Alt>
    </>
  );
}

const KISA_TARIH = (ms: number) => new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", weekday: "long", timeZone: TR }).format(ms);

/** Zaman kartlarının altındaki şerit: en yakın gün canlı sayaçla, sonraki beş gün kaç gün kaldığıyla. Geçen gün düşer. */
function YaklasanGunler({ simdi, liste }: { simdi: number; liste: KartYaklasan[] }) {
  const gunler = liste.filter((x) => x.bit > simdi).slice(0, 6);
  if (!gunler.length) return null;
  const [ilk, ...sonraki] = gunler;
  const bugunBas = Math.floor((simdi + 3 * 3600000) / 86400000) * 86400000 - 3 * 3600000;
  const kalanGun = (x: KartYaklasan) => Math.round((x.bas - bugunBas) / 86400000);
  const kalan = Math.max(0, ilk.bas - simdi);
  const bugun = simdi >= ilk.bas;
  const not = (x: KartYaklasan) => `${x.katAd}${x.tatil && x.kategori !== "resmi" ? " · tatil" : ""}${x.tahmini ? " · tahmini" : ""}`;

  return (
    <div className="yaklasan" aria-labelledby="yaklasan-baslik">
      <div className="yaklasan-ust">
        <h3 id="yaklasan-baslik">Yaklaşan günler</h3>
        <Link href="/takvim">Türkiye takvimi</Link>
      </div>
      <div className="yaklasan-ic">
        <Link href={ilk.href} className={`yaklasan-ana kat-${ilk.kategori}`}>
          <span className="yaklasan-etiket">{bugun ? "Bugün" : "Sıradaki"} · {not(ilk)}</span>
          <strong className="yaklasan-ad">{ilk.ad}</strong>
          <span className="yaklasan-tarih">{KISA_TARIH(ilk.bas)}</span>
          {bugun ? null : (
            <span className="zaman-sayac yaklasan-sayac" suppressHydrationWarning>
              {[
                [Math.floor(kalan / 86400000), "gün"],
                [Math.floor((kalan % 86400000) / 3600000), "saat"],
                [Math.floor((kalan % 3600000) / 60000), "dakika"],
                [Math.floor((kalan % 60000) / 1000), "saniye"],
              ].map(([v, ad]) => (
                <span key={ad}>
                  <strong suppressHydrationWarning>{v}</strong>
                  <small>{ad}</small>
                </span>
              ))}
            </span>
          )}
        </Link>
        <ol className="yaklasan-liste">
          {sonraki.map((x) => {
            const g = kalanGun(x);
            return (
              <li key={x.ad + x.bas}>
                <Link href={x.href} className={`kat-${x.kategori}`}>
                  <span className="yaklasan-gun" suppressHydrationWarning>
                    {g <= 0 ? "Bugün" : g === 1 ? "Yarın" : <><b>{g}</b> gün</>}
                  </span>
                  <span className="yaklasan-bilgi">
                    <strong>{x.ad}</strong>
                    <small>
                      {KISA_TARIH(x.bas)} · {not(x)}
                    </small>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function Kart({ arac, degis, simdi, olusturma, geriSayimlar }: { arac: Arac; degis: (a: Arac) => void; simdi: number; olusturma: number; geriSayimlar: KartGeriSayim[] }) {
  return (
    <div className="hizli-kart">
      <label className="hizli-kart-baslik hizli-tur">
        <span className="gorunmez">Kart türü</span>
        <select value={arac} onChange={(e) => degis(e.target.value as Arac)}>
          {ARACLAR.map((a) => (
            <option key={a.id} value={a.id}>
              {a.ad}
            </option>
          ))}
        </select>
      </label>
      {arac === "bugun" ? <Bugun simdi={simdi} /> : null}
      {arac === "geri-sayim" ? <GeriSayim simdi={simdi} liste={geriSayimlar} /> : null}
      {arac === "gokyuzu" ? <Gokyuzu simdi={simdi} /> : null}
      {arac === "iki-tarih" ? <IkiTarih olusturma={olusturma} /> : null}
      {arac === "yas" ? <Yas olusturma={olusturma} /> : null}
      {arac === "hafta" ? <Hafta olusturma={olusturma} /> : null}
      {arac === "dunya-saati" ? <DunyaSaati simdi={simdi} /> : null}
      {arac === "zamanlayici" ? <Zamanlayici /> : null}
    </div>
  );
}

export default function ZamanKartlari({ geriSayimlar, yaklasan, olusturma }: { geriSayimlar: KartGeriSayim[]; yaklasan: KartYaklasan[]; olusturma: number }) {
  const simdi = useSimdi(olusturma);
  const [kartlar, setKartlar] = useState<Arac[]>(VARSAYILAN);

  useEffect(() => {
    try {
      const kayit = JSON.parse(localStorage.getItem(SAKLAMA) ?? "null") as Arac[] | null;
      if (Array.isArray(kayit) && kayit.length === 3 && kayit.every((k) => ARACLAR.some((a) => a.id === k))) setKartlar(kayit); // eslint-disable-line react-hooks/set-state-in-effect
    } catch {
      /* depolama kapalıysa varsayılan kartlar kalır */
    }
  }, []);

  const degis = (i: number, a: Arac) =>
    setKartlar((eski) => {
      const yeni = eski.map((x, j) => (j === i ? a : x));
      try {
        localStorage.setItem(SAKLAMA, JSON.stringify(yeni));
      } catch {
        /* depolama kapalı */
      }
      return yeni;
    });

  return (
    <section className="hizli-cevirme" aria-labelledby="zaman-kartlari-baslik">
      <div className="hizli-cevirme-ust">
        <h2 id="zaman-kartlari-baslik">Zaman</h2>
        <p>Kartın başlığından aracı seçin: Türkiye saati, geri sayım, ay ve güneş, iki tarih arası, yaş, hafta, dünya saati ve zamanlayıcı.</p>
      </div>
      <div className="hizli-kartlar">
        {kartlar.map((a, i) => (
          <Kart key={i} arac={a} degis={(yeni) => degis(i, yeni)} simdi={simdi} olusturma={olusturma} geriSayimlar={geriSayimlar} />
        ))}
      </div>
      <YaklasanGunler simdi={simdi} liste={yaklasan} />
    </section>
  );
}
