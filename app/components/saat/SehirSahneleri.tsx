import Link from "@/app/components/SiteLink";
import { cityFacts, describeDifference, hourMapping, nearbyCities } from "../../converter/time/cityFacts";
import { differenceMinutes, nextTransition, offsetMinutes } from "../../converter/time/timezones";
import { referenceCitySlugs, trSaatSehirleri, worldCities, type WorldCity } from "../../converter/time/worldCities";
import { trAblative } from "../../converter/turkishSuffix";
import { sehrinUlkeSayfasi } from "../../converter/time/ulkeSaatDilimleri";
import GazeteBaslik from "./GazeteBaslik";
import SehirBulutu from "./SehirBulutu";
import { sehirGorseli } from "./sehirGorselleri";

// Saat bölümünde dev saatin altındaki "sahneler": her biri ekran genişliğinde bir bölüm, büyük
// yazılarla tek bir bilgiyi anlatır; sade düzen, süssüz (.sahne-* CSS).
// Sayfa her gün yeniden derlenir; tarihe bağlı sayılar (kalan gün gibi) derleme gününe göredir.

const ISTANBUL = "Europe/Istanbul";

function saatFarki(dakika: number) {
  if (dakika === 0) return "0";
  const a = Math.abs(dakika);
  const s = Math.floor(a / 60);
  const d = a % 60;
  return `${dakika > 0 ? "+" : "−"}${s}${d ? `:${String(d).padStart(2, "0")}` : ""}`;
}

function saatYaz(an: Date, timeZone: string) {
  return new Intl.DateTimeFormat("tr-TR", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(an);
}

function gunduzMu(an: Date, timeZone: string) {
  const s = Number(new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", hourCycle: "h23" }).format(an));
  return s >= 7 && s < 19;
}

export default function SehirSahneleri({ city }: { city: WorldCity }) {
  const now = new Date();
  const facts = cityFacts(city, now, "tr");
  const ad = city.nameTr;
  const inTurkey = city.region === "turkey";
  const fark = facts.diffFromIstanbul;
  const gecis = facts.observesDst ? nextTransition(city.timeZone, now) : null;
  const kalanGun = gecis ? Math.max(0, Math.ceil((gecis.at.getTime() - now.getTime()) / 86400000)) : null;
  const yeniFark = gecis ? gecis.toMinutes - offsetMinutes(ISTANBUL, gecis.at) : null;
  const sun = facts.sunRows[0];

  // İstanbul'un her saatinde bu şehirde saat kaç; iki şehirde de mesai olan saatler.
  const esleme = inTurkey ? [] : hourMapping(ISTANBUL, city.timeZone, now, "tr");
  const ortak = esleme.map((r, i) => (r.overlap ? i : -1)).filter((i) => i >= 0);
  const ortakMetin = ortak.length
    ? `${String(ortak[0]).padStart(2, "0")}:00–${String(ortak[ortak.length - 1] + 1).padStart(2, "0")}:00`
    : null;
  const tur = (saat: number) => (saat >= 9 && saat < 18 ? "mesai" : saat >= 7 && saat < 23 ? "aksam" : "gece");

  const referanslar = referenceCitySlugs
    .filter((slug) => slug !== city.en)
    .map((slug) => worldCities.find((c) => c.en === slug)!)
    .map((c) => ({ c, dakika: differenceMinutes(city.timeZone, c.timeZone, now) }))
    .sort((a, b) => a.dakika - b.dakika);
  const enUzak = Math.max(60, ...referanslar.map((r) => Math.abs(r.dakika)));
  const yakinlar = nearbyCities(city, 18, trSaatSehirleri);
  const gorsel = sehirGorseli(city.tr);
  const ulkeSayfasi = sehrinUlkeSayfasi(city.countryTr);
  const manset = inTurkey ? `${ad}, Türkiye saatinde` : fark === 0 ? `${ad}, İstanbul ile aynı saatte` : `${ad}, ${trAblative("İstanbul")} ${describeDifference(fark, "tr")}`;

  return (
    <div className="sahneler">
      <GazeteBaslik an={now} timeZone={city.timeZone} baski={ad} />
      {/* Şehrin manşeti: gazete fotoğrafı gibi siyah-beyaz, nokta tramlı şehir fotoğrafı */}
      <div className={`gazete-on${gorsel ? "" : " is-fotosuz"}`}>
        <div className="gazete-manset-kutu">
          <p className="gazete-manset">{manset}</p>
          <p className="gazete-spot">
            {facts.utcLabel} · Gün doğumu {sun.sunrise}, batımı {sun.sunset}
            {gecis && kalanGun !== null && <> · Saat değişikliğine {kalanGun} gün</>}
          </p>
        </div>
        {gorsel && (
          <figure className="gazete-foto">
            <span className="gazete-foto-cerceve">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/saat/${gorsel.dosya}-960.webp`} alt={`${ad}: ${gorsel.yer}`} loading="lazy" decoding="async" width={960} height={540} />
            </span>
            <figcaption>
              {gorsel.yer}, {ad}. Fotoğraf: {gorsel.yazar}, {gorsel.lisans}
            </figcaption>
          </figure>
        )}
      </div>
      {/* 1. Saat dilimi */}
      <section className={`sahne${gecis && facts.transition ? " is-sol" : ""}`} id="ozet">
        <p className="sahne-etiket">01 · Saat dilimi</p>
        <h2 className="sahne-dev">{facts.utcLabel}</h2>
        <p className="sahne-buyuk">{facts.zoneName}</p>
        <p className="sahne-buyuk">
          {inTurkey ? (
            <>Türkiye&apos;nin tamamında aynı saat</>
          ) : (
            <>
              şimdi <b>{fark === 0 ? "İstanbul ile aynı saatte" : `${trAblative("İstanbul")} ${describeDifference(fark, "tr")}`}</b>
            </>
          )}
        </p>
        <ul className="sahne-kucuk">
          <li>IANA kimliği: {city.timeZone}</li>
          <li>
            {facts.observesDst
              ? `Yaz saati uygulanır; şu an ${facts.dstNow ? "yaz saati" : "kış (standart) saati"} geçerli.`
              : `Yaz saati uygulanmaz; saat yıl boyu ${facts.utcLabel}.`}
          </li>
          <li>
            {city.countryWide ? (
              `${city.countryTr} genelinde tek saat dilimi.`
            ) : ulkeSayfasi ? (
              <>
                {ulkeSayfasi.ad} içinde {ulkeSayfasi.dilimler.length} saat dilimi var:{" "}
                <Link href={`/dunya-saatleri/${ulkeSayfasi.slug}`}>{ulkeSayfasi.ad} saat dilimleri →</Link>
              </>
            ) : (
              `${city.countryTr} içinde birden fazla saat dilimi var.`
            )}
          </li>
        </ul>
      </section>

      {/* 2. Saat değişikliği */}
      {gecis && facts.transition && (
        <section className="sahne is-sag" id="yaz-saati">
          <p className="sahne-etiket">02 · Saat değişikliği</p>
          <div className="sahne-takvim-satir">
            <div className="sahne-takvim" aria-hidden="true">
              <span>{new Intl.DateTimeFormat("tr-TR", { timeZone: city.timeZone, month: "long" }).format(gecis.at)}</span>
              <b>{new Intl.DateTimeFormat("tr-TR", { timeZone: city.timeZone, day: "numeric" }).format(gecis.at)}</b>
              <span>{new Intl.DateTimeFormat("tr-TR", { timeZone: city.timeZone, weekday: "long" }).format(gecis.at)}</span>
            </div>
            <div>
              <h2 className="sahne-dev">{kalanGun === 0 ? "Bugün" : `${kalanGun} gün sonra`}</h2>
              <p className="sahne-buyuk">
                saatler <b>1 saat {facts.transition.forward ? "ileri" : "geri"}</b> alınıyor
              </p>
              <ul className="sahne-kucuk">
                <li>
                  {facts.transition.date}, yerel saat {facts.transition.time} → {facts.transition.newTime} ({facts.transition.newOffset})
                </li>
                {!inTurkey && yeniFark !== null && <li>Türkiye ile fark {describeDifference(yeniFark, "tr").replace(/ (ileride|geride)$/, "")} olacak.</li>}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 3. Ne zaman aramalı */}
      {!inTurkey && (
        <section className="sahne" id="saat-farki">
          <p className="sahne-etiket">03 · Ne zaman aramalı?</p>
          <h2 className="sahne-dev">{ortakMetin ?? "Mesai çakışmıyor"}</h2>
          <p className="sahne-buyuk">
            {ortakMetin ? `İstanbul saatiyle; iki şehirde de mesai (${ortak.length} saat)` : `İstanbul ile ${ad} arasında ortak mesai saati yok`}
          </p>
          <div className="sahne-serit" role="table" aria-label={`İstanbul ve ${ad} saatleri`}>
            <div className="sahne-serit-satir" role="row">
              <span className="sahne-serit-ad" role="rowheader">
                İstanbul
              </span>
              {esleme.map((r, i) => (
                <span key={i} role="cell" className={`is-${tur(i)}`}>
                  {i}
                </span>
              ))}
            </div>
            <div className="sahne-serit-satir" role="row">
              <span className="sahne-serit-ad" role="rowheader">
                {ad}
              </span>
              {esleme.map((r) => {
                const s = Number(r.to.slice(0, 2));
                return (
                  <span key={r.from} role="cell" className={`is-${tur(s)}`} title={`İstanbul ${r.from} = ${ad} ${r.to}${r.dayNote ? ` (${r.dayNote})` : ""}`}>
                    {s}
                  </span>
                );
              })}
            </div>
          </div>
          <p className="sahne-lejant">
            <i className="is-mesai" /> Mesai 09–18 <i className="is-aksam" /> Uyanık 07–23 <i className="is-gece" /> Gece
          </p>
        </section>
      )}

      {/* 4. Güneş */}
      <section className="sahne" id="gunes">
        <p className="sahne-etiket">04 · Güneş</p>
        <div className="sahne-gunes-satir">
          <div>
            <small>Doğuş</small>
            <h2 className="sahne-dev">{sun.sunrise}</h2>
          </div>
          <div>
            <small>Batış</small>
            <p className="sahne-dev">{sun.sunset}</p>
          </div>
        </div>
        <p className="sahne-buyuk">
          gün uzunluğu <b>{sun.dayLength}</b>
        </p>
        <div className="sahne-kartlar">
          {[
            ["Sabah mavi saat", facts.light.morningBlue],
            ["Sabah altın saat", facts.light.morningGolden],
            ["Akşam altın saat", facts.light.eveningGolden],
            ["Akşam mavi saat", facts.light.eveningBlue],
          ].map(([ad2, deger]) => (
            <div key={ad2} className="sahne-kart">
              <small>{ad2}</small>
              <b>{deger}</b>
            </div>
          ))}
        </div>
        <table className="sahne-tablo">
          <caption>Önümüzdeki 7 gün (yerel saat)</caption>
          <thead>
            <tr>
              <th>Gün</th>
              <th>Doğuş</th>
              <th>Batış</th>
              <th>Gün</th>
            </tr>
          </thead>
          <tbody>
            {facts.sunRows.map((r) => (
              <tr key={r.date}>
                <td>{r.date}</td>
                <td>{r.sunrise}</td>
                <td>{r.sunset}</td>
                <td>{r.dayLength}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="sahne-kucuk">
          <Link href="/altin-saat">Başka bir tarih için altın saat hesaplayıcı →</Link>
        </p>
      </section>

      {/* 5. Saat farkı */}
      <section className={`sahne${yakinlar.length ? " is-sol" : ""}`} id="dunya">
        <p className="sahne-etiket">05 · Saat farkı</p>
        <h2 className="sahne-dev">{trAblative(ad)}</h2>
        <p className="sahne-buyuk">dünya şehirlerine saat farkı</p>
        <ul className="sahne-cubuklar">
          {referanslar.map(({ c, dakika }) => (
            <li key={c.en}>
              <Link href={`/dunya-saatleri/${c.tr}`} prefetch={false} className="sahne-cubuk-ad">
                {c.nameTr}
              </Link>
              <span className="sahne-cubuk-alan">
                <span
                  className={`sahne-cubuk ${dakika < 0 ? "is-geri" : "is-ileri"}`}
                  style={{ width: `${(Math.abs(dakika) / enUzak) * 50}%` }}
                />
              </span>
              <span className="sahne-cubuk-deger">
                {saatFarki(dakika)} sa
                <small>
                  {saatYaz(now, c.timeZone)} {gunduzMu(now, c.timeZone) ? "☀" : "☾"}
                </small>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 6. Yakındaki şehirler */}
      {yakinlar.length > 0 && (
        <section className="sahne is-sag">
          <p className="sahne-etiket">06 · Yakındaki şehirler</p>
          <SehirBulutu sehirler={yakinlar} bu={city} />
        </section>
      )}
    </div>
  );
}
