"use client";

import { useEffect, useState } from "react";
import {
  civcivIsisi,
  dekaraBitki,
  dogumTakvimi,
  ilaclama,
  toplamBitki,
  type DikimDuzeni,
  type DozBirimi,
  gebelikDurumu,
  HAYVANLAR,
  KANATLILAR,
  KILIT_GUN,
  kuluckaGunu,
  kuluckaRandimani,
  kuluckaTakvimi,
  tohumlamaZamani,
  type HayvanTuru,
  type KanatliTuru,
} from "../converter/hayvancilik";
import { hasat, URUNLER } from "../converter/ekimNormu";
import { ondalik } from "../converter/sayiOku";
import type { YMD } from "../converter/time/calendars";
import { addDaysYmd, diffDays, parseYmd, weekdayOf } from "../converter/time/dateMath";

const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const GUNLER = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
const tarih = (d: YMD) => `${d.day} ${AYLAR[d.month - 1]} ${d.year} ${GUNLER[weekdayOf(d)]}`;
const kisa = (d: YMD) => `${d.day} ${AYLAR[d.month - 1]}`;
const yuzde = (x: number) => `%${(x * 100).toLocaleString("tr-TR", { maximumFractionDigits: 1 })}`;

function bugunIso() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

/** Sabit tarihle ön işlenir; tarayıcıda (kullanıcı değiştirmediyse) bugüne göre ayarlanır. */
function useTarih(initial: string, kaydir = 0) {
  const [value, setValue] = useState(initial);
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!touched) {
        const b = parseYmd(bugunIso())!;
        const s = addDaysYmd(b, kaydir);
        setValue(`${s.year}-${String(s.month).padStart(2, "0")}-${String(s.day).padStart(2, "0")}`);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [touched, kaydir]);
  const set = (v: string) => {
    setTouched(true);
    setValue(v);
  };
  return [value, set] as const;
}

const kalanYazi = (hedef: YMD, bugun: YMD | null) => {
  if (!bugun) return "";
  const n = diffDays(bugun, hedef);
  if (n > 0) return `${n} gün kaldı`;
  if (n === 0) return "bugün";
  return `${-n} gün önceydi`;
};

/* ---------------- Doğum hesaplama ---------------- */

export function DogumHesaplama({ initialDate }: { initialDate: string }) {
  const [tur, setTur] = useState<HayvanTuru>("inek");
  const [tohumlama, setTohumlama] = useTarih(initialDate, -60);
  const [bugunRaw] = useTarih(initialDate);
  const t = parseYmd(tohumlama);
  const bugun = parseYmd(bugunRaw);
  const h = HAYVANLAR[tur];
  const r = t ? dogumTakvimi(tur, t) : null;
  const durum = t && bugun ? gebelikDurumu(tur, t, bugun) : null;
  const buyukbas = tur === "inek" || tur === "duve" || tur === "manda";

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Hayvan</span>
            <select value={tur} onChange={(e) => setTur(e.target.value as HayvanTuru)}>
              {(Object.keys(HAYVANLAR) as HayvanTuru[]).map((k) => (
                <option key={k} value={k}>
                  {HAYVANLAR[k].ad} ({HAYVANLAR[k].gebelik} gün)
                </option>
              ))}
            </select>
          </label>
          <label className="date-calc-field">
            <span>{tur === "koyun" || tur === "keci" ? "Koç/teke katımı veya tohumlama tarihi" : "Tohumlama (aşım) tarihi"}</span>
            <input type="date" value={tohumlama} onChange={(e) => setTohumlama(e.target.value)} />
          </label>
        </div>
      </div>

      {r && t ? (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>Tahmini doğum tarihi</span>
              <strong>{tarih(r.dogum)}</strong>
              <em>
                Normal aralık: {kisa(r.erken)} – {kisa(r.gec)} · {kalanYazi(r.dogum, bugun)}
              </em>
            </div>
            {durum && durum.gun >= 0 && durum.kalan >= 0 ? (
              <div className="date-calc-stat">
                <span>Bugün</span>
                <strong>
                  {durum.gun}. gün ({durum.ay} aylık gebe)
                </strong>
                <em>doğuma {durum.kalan} gün</em>
              </div>
            ) : null}
            <div className="date-calc-stat">
              <span>Tutmadıysa kızgınlık</span>
              <strong>
                {kisa(r.kizginlik[0])} ve {kisa(r.kizginlik[1])}
              </strong>
              <em>{h.kizginlik} günlük döngü; bu günlerde kızgınlık görülmezse gebelik ihtimali yüksek</em>
            </div>
            <div className="date-calc-stat">
              <span>Gebelik kontrolü (ultrason)</span>
              <strong>{tarih(r.kontrol)}</strong>
              <em>{h.kontrol}. günden itibaren veteriner kontrolü</em>
            </div>
            {r.kuru ? (
              <div className="date-calc-stat">
                <span>Kuruya ayırma</span>
                <strong>{tarih(r.kuru)}</strong>
                <em>sağılıyorsa doğumdan {h.kuru} gün önce sağımı kesin</em>
              </div>
            ) : null}
            <div className="date-calc-stat">
              <span>Doğum bölmesine alma</span>
              <strong>{tarih(r.bolme)}</strong>
              <em>
                doğumdan {h.bolme} gün önce; {h.yavru} için hazırlık
              </em>
            </div>
          </div>
          {buyukbas ? (
            <p className="date-calc-note">
              Tohumlama zamanı (sabah-akşam kuralı): kızgınlık sabah görülürse {tohumlamaZamani("sabah")}, akşam görülürse {tohumlamaZamani("aksam")}{" "}
              tohumlatın.
            </p>
          ) : null}
        </>
      ) : (
        <p className="date-calc-note">Tohumlama tarihini girin.</p>
      )}
      <p className="date-calc-note">Süreler ortalamadır; ırk, yaş ve yavru sayısına göre birkaç gün değişebilir. Kesin gebelik tespiti için veteriner hekime başvurun.</p>
    </div>
  );
}

/* ---------------- Kuluçka ---------------- */

export function KuluckaHesaplama({ initialDate }: { initialDate: string }) {
  const [tur, setTur] = useState<KanatliTuru>("tavuk");
  const [baslangic, setBaslangic] = useTarih(initialDate);
  const [bugunRaw] = useTarih(initialDate);
  const [konulan, setKonulan] = useState("");
  const [dollu, setDollu] = useState("");
  const [cikan, setCikan] = useState("");
  const b = parseYmd(baslangic);
  const bugun = parseYmd(bugunRaw);
  const k = KANATLILAR[tur];
  const r = b ? kuluckaTakvimi(tur, b) : null;
  const g = b && bugun ? kuluckaGunu(tur, b, bugun) : null;
  const sayi = (s: string) => (/^\d+$/.test(s.trim()) ? Number(s) : Number.NaN);
  const rand = kuluckaRandimani(sayi(konulan), sayi(dollu), sayi(cikan));

  const asamaYazi =
    g?.asama === "gelisim"
      ? `${g.gun}. gün: gelişim dönemi, yumurtaları günde en az 3 kez çevirin`
      : g?.asama === "kilit"
        ? `${g.gun}. gün: son ${KILIT_GUN} gün, çevirmeyi bırakın, nemi artırın, makineyi açmayın`
        : g?.asama === "sonra"
          ? "Çıkım günü geçti"
          : "Kuluçka henüz başlamadı";

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Kanatlı</span>
            <select value={tur} onChange={(e) => setTur(e.target.value as KanatliTuru)}>
              {(Object.keys(KANATLILAR) as KanatliTuru[]).map((x) => (
                <option key={x} value={x}>
                  {KANATLILAR[x].ad} ({KANATLILAR[x].gun} gün)
                </option>
              ))}
            </select>
          </label>
          <label className="date-calc-field">
            <span>Yumurtaların kuluçkaya konduğu gün</span>
            <input type="date" value={baslangic} onChange={(e) => setBaslangic(e.target.value)} />
          </label>
        </div>
      </div>

      {r ? (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>Tahmini çıkım günü</span>
              <strong>{tarih(r.cikim)}</strong>
              <em>
                {k.gun}. gün · {kalanYazi(r.cikim, bugun)}
              </em>
            </div>
            <div className="date-calc-stat">
              <span>Bugün</span>
              <strong>{g && g.gun >= 1 && g.gun <= k.gun ? `${g.gun}. gün` : "—"}</strong>
              <em>{asamaYazi}</em>
            </div>
          </div>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">Gün</th>
                  <th scope="col">Tarih</th>
                  <th scope="col">Yapılacak</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>{kisa(b!)}</td>
                  <td>Yumurtalar makineye; 37,5–37,8 °C, nem %50–55, günde 3–5 kez çevirme</td>
                </tr>
                <tr>
                  <th scope="row">{k.kontrol[0]}</th>
                  <td>{kisa(r.kontrol1)}</td>
                  <td>1. ışık kontrolü: damarlanma olmayan (döllü olmayan) yumurtaları çıkarın</td>
                </tr>
                <tr>
                  <th scope="row">{k.kontrol[1]}</th>
                  <td>{kisa(r.kontrol2)}</td>
                  <td>2. ışık kontrolü: gelişimi duran (ölü embriyolu) yumurtaları ayırın</td>
                </tr>
                <tr>
                  <th scope="row">{k.gun - KILIT_GUN}</th>
                  <td>{kisa(r.kilit)}</td>
                  <td>Çevirmeyi bırakın, nemi %65–70&apos;e çıkarın, makineyi mümkün olduğunca açmayın</td>
                </tr>
                <tr>
                  <th scope="row">{k.gun}</th>
                  <td>{kisa(r.cikim)}</td>
                  <td>Çıkım; civcivler kuruyup kabarana kadar makinede bekletin</td>
                </tr>
                <tr>
                  <th scope="row">{k.gun + 2}</th>
                  <td>{kisa(r.sonBekleme)}</td>
                  <td>Geç çıkanlar için son bekleme; çıkmayan yumurtaları alın</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="date-calc-note">Kuluçkaya koyma tarihini girin.</p>
      )}

      <h3>Civciv ana makinesi (ısıtıcı) sıcaklığı</h3>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Hafta</th>
              <th scope="col">Sıcaklık</th>
              {r ? <th scope="col">Tarih</th> : null}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6].map((w) => {
              const s = civcivIsisi(w);
              return (
                <tr key={w}>
                  <th scope="row">{w}. hafta</th>
                  <td>{w === 6 ? "Isıtıcı kaldırılabilir (oda sıcaklığı)" : `${s.alt}–${s.ust} °C`}</td>
                  {r ? (
                    <td>
                      {kisa(addDaysYmd(r.cikim, (w - 1) * 7))} – {kisa(addDaysYmd(r.cikim, w * 7 - 1))}
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h3>Kuluçka randımanı</h3>
      <div className="date-calc-input">
        <div className="date-calc-fields is-amounts">
          <label className="date-calc-field">
            <span>Konulan yumurta</span>
            <input inputMode="numeric" value={konulan} onChange={(e) => setKonulan(e.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>Döllü çıkan (ışık kontrolü)</span>
            <input inputMode="numeric" value={dollu} onChange={(e) => setDollu(e.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>Çıkan civciv</span>
            <input inputMode="numeric" value={cikan} onChange={(e) => setCikan(e.target.value)} />
          </label>
        </div>
      </div>
      {rand ? (
        <div className="date-calc-results">
          <div className="date-calc-stat">
            <span>Döllülük</span>
            <strong>{yuzde(rand.dolluluk)}</strong>
          </div>
          <div className="date-calc-stat">
            <span>Konulandan çıkış</span>
            <strong>{yuzde(rand.cikis)}</strong>
          </div>
          <div className="date-calc-stat">
            <span>Döllüden çıkış</span>
            <strong>{yuzde(rand.dolluCikis)}</strong>
            <em>%85 ve üzeri iyi kabul edilir</em>
          </div>
        </div>
      ) : (
        <p className="date-calc-note">Sayıları girin: döllü sayısı konulandan, çıkan sayısı döllüden büyük olamaz.</p>
      )}
    </div>
  );
}

/* ---------------- Dekara fidan / fide sayısı ---------------- */

export { ondalik };
const sayiYaz = (n: number, d = 0) => n.toLocaleString("tr-TR", { maximumFractionDigits: d });

function Alan({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="date-calc-field">
      <span>{label}</span>
      <input inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

export function FidanSayisiHesaplama() {
  const [duzen, setDuzen] = useState<DikimDuzeni>("dikdortgen");
  const [birim, setBirim] = useState<"m" | "cm">("m");
  const [a, setA] = useState("4");
  const [b, setB] = useState("1,5");
  const [alan, setAlan] = useState("1");
  const [yedek, setYedek] = useState("5");
  const k = birim === "cm" ? 0.01 : 1;
  const dekara = dekaraBitki(duzen, ondalik(a) * k, ondalik(b) * k);
  const toplam = dekara ? toplamBitki(dekara, ondalik(alan), alan.trim() && yedek.trim() ? ondalik(yedek) : 0) : null;

  return (
    <div className="date-calc">
      <div className="date-converter-modes is-light" role="tablist" aria-label="Dikim düzeni">
        {(
          [
            ["dikdortgen", "Kare / dikdörtgen (sıra sıra)"],
            ["ucgen", "Üçgen (şeşbeş)"],
          ] as const
        ).map(([v, t]) => (
          <button key={v} type="button" role="tab" aria-selected={duzen === v} className={duzen === v ? "is-active" : undefined} onClick={() => setDuzen(v)}>
            {t}
          </button>
        ))}
      </div>
      <div className="date-calc-input">
        <div className="date-calc-fields is-amounts">
          <label className="date-calc-field">
            <span>Mesafe birimi</span>
            <select value={birim} onChange={(e) => setBirim(e.target.value as "m" | "cm")}>
              <option value="m">metre (ağaç, fidan)</option>
              <option value="cm">santimetre (fide, sebze)</option>
            </select>
          </label>
          <Alan label={duzen === "ucgen" ? `Bitkiler arası mesafe (${birim})` : `Sıra arası (${birim})`} value={a} onChange={setA} />
          {duzen === "dikdortgen" ? <Alan label={`Sıra üzeri (${birim})`} value={b} onChange={setB} /> : null}
          <Alan label="Alan (dekar / dönüm)" value={alan} onChange={setAlan} />
          <Alan label="Yedek (%)" value={yedek} onChange={setYedek} />
        </div>
      </div>
      {dekara ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Dekara (dönüme) düşen</span>
            <strong>{sayiYaz(Math.floor(dekara))} adet</strong>
            <em>
              {duzen === "ucgen" ? "eşkenar üçgen dikim: kare dikime göre yaklaşık %15 daha fazla bitki" : `bitki başına ${sayiYaz((ondalik(a) * k) * (ondalik(b) * k), 2)} m²`}
            </em>
          </div>
          {toplam ? (
            <div className="date-calc-stat">
              <span>{sayiYaz(ondalik(alan), 2)} dekar için</span>
              <strong>{sayiYaz(toplam.yedekli)} adet</strong>
              <em>
                {sayiYaz(toplam.net)} adet + yedek
              </em>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="date-calc-note">Mesafeleri girin.</p>
      )}
    </div>
  );
}

/* ---------------- İlaçlama karışımı ---------------- */

export function IlaclamaHesaplama() {
  const [birim, setBirim] = useState<DozBirimi>("dekar");
  const [doz, setDoz] = useState("50");
  const [su, setSu] = useState("20");
  const [depo, setDepo] = useState("200");
  const [alan, setAlan] = useState("10");
  const r = ilaclama({ doz: ondalik(doz), birim, dekaraSu: ondalik(su), depo: ondalik(depo), alan: ondalik(alan) });

  return (
    <div className="date-calc">
      <div className="date-converter-modes is-light" role="tablist" aria-label="Etiketteki doz">
        {(
          [
            ["dekar", "Etikette: dekara doz"],
            ["yuzLitre", "Etikette: 100 litre suya doz"],
          ] as const
        ).map(([v, t]) => (
          <button key={v} type="button" role="tab" aria-selected={birim === v} className={birim === v ? "is-active" : undefined} onClick={() => setBirim(v)}>
            {t}
          </button>
        ))}
      </div>
      <div className="date-calc-input">
        <div className="date-calc-fields is-amounts">
          <Alan label={birim === "dekar" ? "Doz (ml veya g / dekar)" : "Doz (ml veya g / 100 L su)"} value={doz} onChange={setDoz} />
          <Alan label="Dekara su (litre)" value={su} onChange={setSu} />
          <Alan label="Depo hacmi (litre)" value={depo} onChange={setDepo} />
          <Alan label="İlaçlanacak alan (dekar)" value={alan} onChange={setAlan} />
        </div>
      </div>
      {r ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Depo başına ilaç</span>
            <strong>{sayiYaz(r.depoBasinaIlac, 1)} ml (g)</strong>
            <em>
              {sayiYaz(ondalik(depo))} litrelik bir depo {sayiYaz(r.depoBasinaAlan, 2)} dekar ilaçlar
            </em>
          </div>
          <div className="date-calc-stat">
            <span>Kaç depo?</span>
            <strong>{sayiYaz(r.depoSayisi, 2)} depo</strong>
            <em>
              {r.tamDepo === 0
                ? `tek depo yeter: ${sayiYaz(r.sonDepoSu, 1)} L su ve ${sayiYaz(r.sonDepoIlac, 1)} ml (g) ilaç koyun`
                : r.sonDepoSu > 0
                  ? `${r.tamDepo} tam depo + son depoya ${sayiYaz(r.sonDepoSu, 1)} L su ve ${sayiYaz(r.sonDepoIlac, 1)} ml (g) ilaç`
                  : `${r.tamDepo} tam depo`}
            </em>
          </div>
          <div className="date-calc-stat">
            <span>Toplam</span>
            <strong>{sayiYaz(r.toplamIlac, 1)} ml (g) ilaç</strong>
            <em>{sayiYaz(r.toplamSu)} litre su ile</em>
          </div>
        </div>
      ) : (
        <p className="date-calc-note">Doz, su miktarı, depo hacmi ve alanı girin.</p>
      )}
      <p className="date-calc-note">
        Dozu her zaman ilacın etiketinden alın; etiket dozunu aşmayın. Dekara su miktarı makineye ve meme tipine göre değişir: kalibrasyon için 1 dekarı temiz suyla
        ilaçlayıp harcanan suyu ölçün.
      </p>
    </div>
  );
}

/* ---------------- Hasat (verim) ---------------- */

export function HasatHesaplama() {
  const [urun, setUrun] = useState("bugday");
  const [verim, setVerim] = useState("400");
  const [alan, setAlan] = useState("10");
  const [cuval, setCuval] = useState("50");
  const r = hasat(ondalik(verim), ondalik(alan), ondalik(cuval));
  const u = URUNLER.find((x) => x.id === urun);

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields is-amounts">
          <label className="date-calc-field">
            <span>Ürün</span>
            <select
              value={urun}
              onChange={(e) => {
                setUrun(e.target.value);
                const x = URUNLER.find((y) => y.id === e.target.value);
                if (x) setVerim(String(Math.round((x.verim[0] + x.verim[1]) / 2)));
              }}
            >
              {URUNLER.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.ad}
                </option>
              ))}
            </select>
          </label>
          <Alan label="Dekara verim (kg)" value={verim} onChange={setVerim} />
          <Alan label="Alan (dekar)" value={alan} onChange={setAlan} />
          <Alan label="Çuval (kg)" value={cuval} onChange={setCuval} />
        </div>
      </div>
      {r ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Toplam ürün</span>
            <strong>{sayiYaz(r.toplam)} kg</strong>
            <em>{sayiYaz(r.ton, 2)} ton</em>
          </div>
          <div className="date-calc-stat">
            <span>Çuval</span>
            <strong>{sayiYaz(r.cuval)} adet</strong>
            <em>{sayiYaz(ondalik(cuval))} kg&apos;lık</em>
          </div>
          {u ? (
            <div className="date-calc-stat">
              <span>{u.ad} için tipik verim</span>
              <strong>
                {sayiYaz(u.verim[0])}–{sayiYaz(u.verim[1])} kg/da
              </strong>
              {u.verimNot ? <em>{u.verimNot}</em> : null}
            </div>
          ) : null}
        </div>
      ) : (
        <p className="date-calc-note">Verim, alan ve çuval ağırlığını girin.</p>
      )}
    </div>
  );
}
