"use client";

import { useEffect, useState } from "react";
import {
  cezaPuani,
  dotOku,
  erkenOdeme,
  gecikmeAy,
  lastikYasDurumu,
  MUAYENE,
  muayeneTakvimi,
  PUAN_SINIRI,
  PUAN_YAPTIRIM,
  type MuayeneTuru,
  type TebligTuru,
} from "../converter/aracHesaplari";
import { ondalik } from "../converter/sayiOku";
import type { YMD } from "../converter/time/calendars";
import { diffDays, parseYmd, weekdayOf } from "../converter/time/dateMath";
import { Modes } from "./dini/DiniAraclar2";

const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const GUNLER = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
const tarih = (d: YMD) => `${d.day} ${AYLAR[d.month - 1]} ${d.year} ${GUNLER[weekdayOf(d)]}`;
const kisa = (d: YMD) => `${d.day} ${AYLAR[d.month - 1]} ${d.year}`;
const tl = (x: number) => `${x.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL`;
const iso = (d: YMD) => `${d.year}-${String(d.month).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;

function bugunIso() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

/** Sabit tarihle ön işlenir; tarayıcıda (kullanıcı değiştirmediyse) bugüne geçer. */
function useBugun(initial: string) {
  const [value, setValue] = useState(initial);
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!touched) setValue(bugunIso());
    });
    return () => cancelAnimationFrame(frame);
  }, [touched]);
  const set = (v: string) => {
    setTouched(true);
    setValue(v);
  };
  return [value, set] as const;
}

const kalanMetin = (n: number) => (n > 0 ? `${n} gün kaldı` : n === 0 ? "son gün bugün" : `${-n} gün önce geçti`);

/* ---------------- Trafik cezası erken ödeme ---------------- */

export function ErkenOdemeHesaplama({ initialDate }: { initialDate: string }) {
  const [bugunRaw] = useBugun(initialDate);
  const [tebligRaw, setTeblig] = useBugun(initialDate);
  const [tutar, setTutar] = useState("2.000");
  const [tur, setTur] = useState<TebligTuru>("elden");
  const t = parseYmd(tebligRaw);
  const bugun = parseYmd(bugunRaw);
  const r = t ? erkenOdeme(ondalik(tutar), t, tur, bugun ?? undefined) : null;

  return (
    <div className="date-calc">
      <Modes
        label="Tebliğ şekli"
        value={tur}
        onChange={setTur}
        options={[
          ["elden", "Elden (polis yazdı)"],
          ["posta", "Posta / PTT"],
          ["etebligat", "e-Tebligat / e-Devlet"],
        ]}
      />
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Ceza tutarı (TL)</span>
            <input inputMode="decimal" value={tutar} onChange={(e) => setTutar(e.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>{tur === "elden" ? "Tutanağın imzalandığı gün" : tur === "posta" ? "Tebligatı teslim aldığınız gün" : "e-Tebligatın kutunuza düştüğü gün"}</span>
            <input type="date" value={tebligRaw} onChange={(e) => setTeblig(e.target.value)} />
          </label>
        </div>
      </div>
      {r ? (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>İndirimli ödeyeceğiniz</span>
              <strong>{tl(r.indirimli)}</strong>
              <em>%25 indirim: {tl(r.indirim)} cebinizde kalır</em>
            </div>
            <div className="date-calc-stat">
              <span>İndirimin son günü</span>
              <strong>{tarih(r.sonGun)}</strong>
              <em>{r.kalan === null ? "" : kalanMetin(r.kalan)}</em>
            </div>
            <div className="date-calc-stat">
              <span>Tebliğ sayılan gün</span>
              <strong>{kisa(r.teblig)}</strong>
              <em>{tur === "etebligat" ? "kutuya düştüğü günden 5 gün sonra" : "süre bu günden başlar"}</em>
            </div>
          </div>
          {r.kalan !== null && r.kalan < 0 ? (
            <p className="date-calc-note">
              İndirim süresi geçti: ceza tam tutarıyla ({tl(ondalik(tutar))}) ödenir. Ödenmeyen cezaya vergi dairesince her ay gecikme zammı eklenir; güncel tutarı e-Devlet&apos;ten
              görün.
            </p>
          ) : (
            <p className="date-calc-note">Son günü beklemeyin: banka ve e-Devlet ödemesinin sisteme geçmesi bir gün sürebilir.</p>
          )}
        </>
      ) : (
        <p className="date-calc-note">Ceza tutarını ve tebliğ tarihini girin.</p>
      )}
    </div>
  );
}

/* ---------------- Ceza puanı ---------------- */

type Satir = { id: number; tarih: string; puan: string };

export function CezaPuaniHesaplama({ initialDate }: { initialDate: string }) {
  const [bugunRaw] = useBugun(initialDate);
  const [satirlar, setSatirlar] = useState<Satir[]>([
    { id: 1, tarih: "2026-02-14", puan: "20" },
    { id: 2, tarih: "2026-06-03", puan: "10" },
  ]);
  const bugun = parseYmd(bugunRaw);
  const ihlaller = satirlar.flatMap((s) => {
    const t = parseYmd(s.tarih);
    const p = ondalik(s.puan);
    return t && p > 0 ? [{ tarih: t, puan: p }] : [];
  });
  const r = bugun ? cezaPuani(ihlaller, bugun) : null;
  const guncelle = (id: number, alan: "tarih" | "puan", v: string) => setSatirlar((xs) => xs.map((x) => (x.id === id ? { ...x, [alan]: v } : x)));
  const ekle = () => setSatirlar((xs) => [...xs, { id: Math.max(0, ...xs.map((x) => x.id)) + 1, tarih: bugunRaw, puan: "10" }]);
  const sil = (id: number) => setSatirlar((xs) => xs.filter((x) => x.id !== id));

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <p className="date-calc-input-title">İhlalleriniz (puanı tutanaktan ya da e-Devlet&apos;ten yazın)</p>
        {satirlar.map((s, i) => (
          <div className="date-calc-fields" key={s.id}>
            <label className="date-calc-field">
              <span>{i + 1}. ihlal tarihi</span>
              <input type="date" value={s.tarih} onChange={(e) => guncelle(s.id, "tarih", e.target.value)} />
            </label>
            <label className="date-calc-field">
              <span>Ceza puanı</span>
              <select value={s.puan} onChange={(e) => guncelle(s.id, "puan", e.target.value)}>
                {["5", "10", "15", "20", "25", "30"].map((p) => (
                  <option key={p} value={p}>
                    {p} puan
                  </option>
                ))}
              </select>
            </label>
            <button type="button" className="kaza-takip-btn is-wide" onClick={() => sil(s.id)} aria-label={`${i + 1}. ihlali sil`}>
              Sil
            </button>
          </div>
        ))}
        <div className="date-calc-chips">
          <button type="button" onClick={ekle}>
            + İhlal ekle
          </button>
        </div>
      </div>
      {r && bugun ? (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>Bugün geçerli ceza puanınız</span>
              <strong>
                {r.toplam} / {PUAN_SINIRI}
              </strong>
              <em>{r.toplam >= PUAN_SINIRI ? "sınır doldu: ehliyete el konulur" : `${r.kalan} puan daha alırsanız ehliyete el konulur`}</em>
            </div>
            <div className="date-calc-stat">
              <span>İlk puan düşüşü</span>
              <strong>{r.ilkSilinme ? kisa(r.ilkSilinme) : "Geçerli puan yok"}</strong>
              <em>{r.ilkSilinme ? `${diffDays(bugun, r.ilkSilinme)} gün sonra` : "1 yıldan eski puanlar silinmiş"}</em>
            </div>
            <div className="date-calc-stat">
              <span>Son 1 yılda 100 puan</span>
              <strong>{r.doldu ? `${kisa(r.doldu)} doldu` : "Dolmadı"}</strong>
              <em>{r.doldu ? `ilk kez ise belge ${PUAN_YAPTIRIM[0].sure} alınır` : "her ihlal tarihine göre kontrol edildi"}</em>
            </div>
          </div>
          {r.liste.length ? (
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th scope="col">İhlal tarihi</th>
                    <th scope="col">Puan</th>
                    <th scope="col">Silineceği gün</th>
                    <th scope="col">Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {r.liste.map((x, i) => (
                    <tr key={i}>
                      <th scope="row">{kisa(x.tarih)}</th>
                      <td>{x.puan}</td>
                      <td>{kisa(x.silinme)}</td>
                      <td>{diffDays(x.tarih, bugun) < 0 ? "ileri tarih" : x.aktif ? `${diffDays(bugun, x.silinme)} gün kaldı` : "silindi"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </>
      ) : null}
      <p className="date-calc-note">Kesin puanınızı e-Devlet&apos;teki &quot;Sürücü Belgesi Ceza Puanı Sorgulama&quot; ekranı gösterir; bu araç silinme tarihlerini planlamanız içindir.</p>
    </div>
  );
}

/* ---------------- Muayene ---------------- */

export function MuayeneTarihiHesaplama({ initialDate }: { initialDate: string }) {
  const [bugunRaw] = useBugun(initialDate);
  const [tur, setTur] = useState<MuayeneTuru>("hususi");
  const [durum, setDurum] = useState<"sifir" | "muayeneli">("sifir");
  const [tescil, setTescil] = useState("2024-03-15");
  const [son, setSon] = useState("2025-05-20");
  const bugun = parseYmd(bugunRaw);
  const tescilY = parseYmd(tescil);
  const sonY = durum === "muayeneli" ? parseYmd(son) : null;
  const m = MUAYENE[tur];
  const liste = tescilY && (durum === "sifir" || sonY) ? muayeneTakvimi(tur, tescilY, sonY, 5) : null;
  const ilk = liste?.[0];
  const gecikme = ilk && bugun ? gecikmeAy(ilk, bugun) : 0;

  return (
    <div className="date-calc">
      <Modes
        label="Araç türü"
        value={tur}
        onChange={setTur}
        options={[
          ["hususi", "Hususi otomobil"],
          ["motosiklet", "Motosiklet"],
          ["ticari", "Ticari araç"],
        ]}
      />
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Daha önce muayene oldu mu?</span>
            <select value={durum} onChange={(e) => setDurum(e.target.value as "sifir" | "muayeneli")}>
              <option value="sifir">Hayır, sıfır araç (ilk muayene)</option>
              <option value="muayeneli">Evet, son muayene tarihini gireceğim</option>
            </select>
          </label>
          {durum === "sifir" ? (
            <label className="date-calc-field">
              <span>Ruhsattaki ilk tescil tarihi</span>
              <input type="date" value={tescil} onChange={(e) => setTescil(e.target.value)} />
            </label>
          ) : (
            <label className="date-calc-field">
              <span>Son muayeneden geçtiği gün</span>
              <input type="date" value={son} onChange={(e) => setSon(e.target.value)} />
            </label>
          )}
        </div>
        <p className="date-calc-note">
          {m.ad}: ilk muayene {m.ilk} yaşında, sonra {m.periyot === 1 ? "her yıl" : `${m.periyot} yılda bir`}.
        </p>
      </div>
      {liste && ilk && bugun ? (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>{durum === "sifir" ? "İlk muayene son günü" : "Sonraki muayene son günü"}</span>
              <strong>{tarih(ilk)}</strong>
              <em>{gecikme ? `süre geçti: ${gecikme} ay gecikme` : kalanMetin(diffDays(bugun, ilk))}</em>
            </div>
            <div className="date-calc-stat">
              <span>Periyot</span>
              <strong>{m.periyot === 1 ? "Her yıl" : `${m.periyot} yılda bir`}</strong>
              <em>ilk muayene aracın {m.ilk}. yaşında</em>
            </div>
          </div>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <caption>Sonraki muayeneler (her muayeneyi son günde yaptırırsanız)</caption>
              <thead>
                <tr>
                  <th scope="col">Muayene</th>
                  <th scope="col">Son gün</th>
                  <th scope="col">Araç yaşı</th>
                </tr>
              </thead>
              <tbody>
                {liste.map((x, i) => (
                  <tr key={iso(x)}>
                    <th scope="row">{i + 1}.</th>
                    <td>{tarih(x)}</td>
                    <td>{tescilY && durum === "sifir" ? `${x.year - tescilY.year} yaş` : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {gecikme ? (
            <p className="date-calc-note">
              Muayenesiz araçla trafiğe çıkmak para cezasıdır ve trafikten men edilebilir. Gecikme bedeli her ay ÜFE ile güncellendiğinden tutarı randevu alırken TÜVTÜRK gösterir.
            </p>
          ) : null}
        </>
      ) : (
        <p className="date-calc-note">Tarihi girin.</p>
      )}
      <p className="date-calc-note">Kesin tarih ruhsatınızdaki &quot;muayene geçerlilik tarihi&quot;dir; e-Devlet ve TÜVTÜRK&apos;te plaka ile de sorgulanabilir.</p>
    </div>
  );
}

/* ---------------- Lastik DOT ---------------- */

export function DotKoduOkuma({ initialDate }: { initialDate: string }) {
  const [bugunRaw] = useBugun(initialDate);
  const [kod, setKod] = useState("2523");
  const bugun = parseYmd(bugunRaw);
  const r = bugun ? dotOku(kod, bugun) : null;

  let sonuc: React.ReactNode = null;
  if (r?.durum === "tamam") {
    const yd = lastikYasDurumu(r.yasYil);
    sonuc = (
      <>
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Üretim tarihi</span>
            <strong>
              {r.yil} yılının {r.hafta}. haftası
            </strong>
            <em>
              {kisa(r.baslangic)} – {kisa(r.bitis)} arası
            </em>
          </div>
          <div className="date-calc-stat">
            <span>Lastiğin yaşı</span>
            <strong>{[r.yas.years ? `${r.yas.years} yıl` : "", `${r.yas.months} ay`].filter(Boolean).join(" ")}</strong>
            <em>{yd.metin}</em>
          </div>
        </div>
      </>
    );
  } else if (r?.durum === "eski") {
    sonuc = (
      <p className="date-calc-note">
        3 haneli kod 2000 öncesi üretimdir ({r.hafta}. hafta, 199{r.yilHanesi} ya da 198{r.yilHanesi}). Lastik en az 25 yaşında: kullanmayın, yedekte de olsa değiştirin.
      </p>
    );
  } else if (r?.durum === "gecersiz") {
    sonuc = <p className="date-calc-note">{r.neden}</p>;
  }

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>DOT kodunun son 4 hanesi (ya da tüm kod)</span>
            <input inputMode="numeric" value={kod} onChange={(e) => setKod(e.target.value)} placeholder="2523" />
          </label>
        </div>
        <div className="date-calc-chips" aria-label="Örnek kodlar">
          {["0619", "2521", "4724"].map((k) => (
            <button key={k} type="button" onClick={() => setKod(k)}>
              {k}
            </button>
          ))}
        </div>
      </div>
      {sonuc}
    </div>
  );
}
