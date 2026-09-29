"use client";

import { useEffect, useState } from "react";
import type { YMD } from "../converter/time/calendars";
import {
  formatYmd,
  formatYmdParts,
  parseYmd,
  ymdKey,
} from "../converter/time/dateMath";
import {
  izinDonus,
  izinHakki,
  izinUcreti,
} from "../converter/turkishYillikIzin";

const bugunTr = (): YMD => {
  const d = new Date(Date.now() + 3 * 3600000);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
  };
};
const tl = (n: number) =>
  `${n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL`;
const kisa = (d: YMD) =>
  formatYmdParts(d, "tr", { day: "numeric", month: "long", weekday: "short" });
const sayi = (n: number) => String(n).replace(".", ",");

function tutar(raw: string) {
  let s = raw.replace(/[\sTL₺]/gi, "");
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
  const n = Number(s);
  return Number.isFinite(n) ? n : Number.NaN;
}

type Sekme = "hak" | "donus" | "ucret";

export default function YillikIzinHesaplama() {
  const [sekme, setSekme] = useState<Sekme>("hak");
  const [bugun, setBugun] = useState<YMD | null>(null);
  const [giris, setGiris] = useState("");
  const [dogum, setDogum] = useState("");
  const [yerAlti, setYerAlti] = useState(false);
  const [baslangic, setBaslangic] = useState("");
  const [gun, setGun] = useState(14);
  const [cumartesi, setCumartesi] = useState(true);
  const [brut, setBrut] = useState("50.000");
  const [kalanIzin, setKalanIzin] = useState(14);

  useEffect(() => {
    const b = bugunTr();
    setBugun(b); // eslint-disable-line react-hooks/set-state-in-effect
    setGiris(ymdKey({ year: b.year - 3, month: b.month, day: 1 }));
    setBaslangic(ymdKey(b));
  }, []);

  const girisD = parseYmd(giris);
  const dogumD = dogum ? parseYmd(dogum) : null;
  const hak =
    bugun && girisD && ymdKey(girisD) <= ymdKey(bugun)
      ? izinHakki(girisD, bugun, dogumD, yerAlti)
      : null;
  const basD = parseYmd(baslangic);
  const donus = basD && gun > 0 ? izinDonus(basD, gun, cumartesi) : null;
  const brutN = tutar(brut);

  return (
    <div className="date-calc">
      <div className="date-converter-modes is-light" role="tablist">
        {(
          [
            ["hak", "Kaç gün iznim var?"],
            ["donus", "İzin dönüş tarihi"],
            ["ucret", "Kullanılmayan izin ücreti"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={sekme === id}
            className={sekme === id ? "is-active" : undefined}
            onClick={() => setSekme(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {sekme === "hak" ? (
        <>
          <div className="date-calc-input">
            <div className="date-calc-fields">
              <label className="date-calc-field">
                <span>İşe giriş tarihi</span>
                <input
                  type="date"
                  value={giris}
                  onChange={(e) => setGiris(e.target.value)}
                />
              </label>
              <label className="date-calc-field">
                <span>Doğum tarihi (isteğe bağlı)</span>
                <input
                  type="date"
                  value={dogum}
                  onChange={(e) => setDogum(e.target.value)}
                />
                <small>18 yaş altı ve 50 yaş üstü en az 20 gün</small>
              </label>
            </div>
            <div className="date-calc-checks">
              <label>
                <input
                  type="checkbox"
                  checked={yerAlti}
                  onChange={(e) => setYerAlti(e.target.checked)}
                />{" "}
                Yer altı işinde çalışıyorum (+4 gün)
              </label>
            </div>
          </div>
          {hak ? (
            <div className="date-calc-results">
              <div className="date-calc-stat is-main">
                <span>Yıllık izin hakkın</span>
                <strong>
                  {hak.gun ? `${hak.gun} iş günü` : "Henüz hak kazanmadın"}
                </strong>
                <em>
                  {hak.gun
                    ? `${hak.kidem} yıllık kıdem · bu hak ${formatYmd(hak.sonHakEdis!, "tr", false)} tarihinde doğdu`
                    : `İlk yıllık izin hakkın ${formatYmd(hak.sonraki, "tr", false)} tarihinde doğacak (${hak.sonrakiKalan} gün sonra): ${hak.sonrakiGun} gün`}
                </em>
              </div>
              {hak.gun ? (
                <div className="date-calc-stat">
                  <span>Sonraki hak ediş</span>
                  <strong>{hak.sonrakiGun} gün</strong>
                  <em>
                    {formatYmd(hak.sonraki, "tr", false)} ({hak.sonrakiKalan}{" "}
                    gün sonra)
                  </em>
                </div>
              ) : null}
              <div className="date-calc-stat">
                <span>Bugüne kadar hak edilen</span>
                <strong>{hak.toplam} gün</strong>
                <em>kullandığın günler düşülmeden toplam</em>
              </div>
              {hak.kademe && ymdKey(hak.kademe.tarih) !== ymdKey(hak.sonraki) ? (
                <div className="date-calc-stat">
                  <span>Sonraki kademe</span>
                  <strong>{hak.kademe.gun} gün</strong>
                  <em>{formatYmd(hak.kademe.tarih, "tr", false)} itibarıyla</em>
                </div>
              ) : null}
            </div>
          ) : (
            <p className="date-calc-note">
              Bugünden önceki bir işe giriş tarihi girin.
            </p>
          )}
        </>
      ) : null}

      {sekme === "donus" ? (
        <>
          <div className="date-calc-input">
            <div className="date-calc-fields">
              <label className="date-calc-field">
                <span>İzin başlangıcı</span>
                <input
                  type="date"
                  value={baslangic}
                  onChange={(e) => setBaslangic(e.target.value)}
                />
              </label>
              <label className="date-calc-field">
                <span>İzin günü</span>
                <input
                  type="number"
                  min={0.5}
                  max={60}
                  step={0.5}
                  value={gun}
                  onChange={(e) =>
                    setGun(
                      Math.max(
                        0.5,
                        Math.min(60, Number(e.target.value) || 0.5),
                      ),
                    )
                  }
                />
              </label>
            </div>
            <div className="date-calc-checks">
              <label>
                <input
                  type="checkbox"
                  checked={cumartesi}
                  onChange={(e) => setCumartesi(e.target.checked)}
                />{" "}
                Cumartesi izin gününden sayılsın
              </label>
            </div>
          </div>
          {donus ? (
            <>
              <div className="date-calc-results">
                <div className="date-calc-stat is-main">
                  <span>İşe dönüş</span>
                  <strong>{formatYmd(donus.donus, "tr")}</strong>
                  <em>
                    Son izin günü {kisa(donus.son)} · toplam {donus.takvimGunu}{" "}
                    takvim günü
                  </em>
                </div>
                <div className="date-calc-stat">
                  <span>İzinden sayılmayan</span>
                  <strong>{donus.sayilmayan.length} gün</strong>
                  <em>
                    Pazar{cumartesi ? "" : ", Cumartesi"} ve resmî tatiller
                  </em>
                </div>
              </div>
              {donus.sayilmayan.some((g) => g.tur === "tatil") ||
              donus.yarimlar.length ? (
                <p className="date-calc-note">
                  {donus.sayilmayan
                    .filter((g) => g.tur === "tatil")
                    .map((g) => `${kisa(g.tarih)}: ${g.ad}`)
                    .join(" · ")}
                  {donus.yarimlar.length
                    ? ` · Yarım gün sayılan: ${donus.yarimlar.map((g) => `${kisa(g.tarih)} ${g.ad}`).join(", ")}`
                    : ""}
                </p>
              ) : null}
            </>
          ) : null}
        </>
      ) : null}

      {sekme === "ucret" ? (
        <>
          <div className="date-calc-input">
            <div className="date-calc-fields">
              <label className="date-calc-field">
                <span>Son brüt aylık ücret (TL)</span>
                <input
                  inputMode="decimal"
                  value={brut}
                  onChange={(e) => setBrut(e.target.value)}
                />
              </label>
              <label className="date-calc-field">
                <span>Kullanılmayan izin (gün)</span>
                <input
                  type="number"
                  min={0.5}
                  max={400}
                  step={0.5}
                  value={kalanIzin}
                  onChange={(e) =>
                    setKalanIzin(Math.max(0, Number(e.target.value) || 0))
                  }
                />
              </label>
            </div>
          </div>
          {Number.isFinite(brutN) && brutN > 0 ? (
            <div className="date-calc-results">
              <div className="date-calc-stat is-main">
                <span>Brüt izin ücreti</span>
                <strong>{tl(izinUcreti(brutN, kalanIzin))}</strong>
                <em>
                  günlük brüt {tl(brutN / 30)} × {sayi(kalanIzin)} gün
                </em>
              </div>
            </div>
          ) : (
            <p className="date-calc-note">Lütfen bir tutar girin.</p>
          )}
          <p className="date-calc-note">
            Kullanılmayan izin ücreti iş sözleşmesi sona erdiğinde son brüt
            ücret üzerinden ödenir; SGK primi, gelir vergisi ve damga vergisi
            kesilir. Net tutar için brütten nete maaş hesaplamasını
            kullanabilirsiniz.
          </p>
        </>
      ) : null}
    </div>
  );
}
