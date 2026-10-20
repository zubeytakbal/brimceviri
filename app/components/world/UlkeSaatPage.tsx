import Link from "@/app/components/SiteLink";
import { describeDifference, hourMapping } from "../../converter/time/cityFacts";
import type { FaqItem } from "../../converter/faqSchema";
import { differenceMinutes, formatUtcOffset, nextTransition, observesDst, offsetMinutes } from "../../converter/time/timezones";
import type { UlkeSaatleri } from "../../converter/time/ulkeSaatDilimleri";
import { trSaatSehirleri } from "../../converter/time/worldCities";
import { trLocative } from "../../converter/turkishSuffix";
import GazeteBaslik from "../saat/GazeteBaslik";
import SehirBulutu from "../saat/SehirBulutu";
import SaatKabugu from "../saat/SaatKabugu";
import { sehirGorseli } from "../saat/sehirGorselleri";
import UlkeSaatiHero from "../saat/UlkeSaatiHero";

// Birden çok saat dilimli ülkenin Türkçe saat sayfası: her dilimin canlı saati (kahraman alanı) ve
// altında gazete düzeninde dilim tablosu, saat değişikliği, aranacak saatler, bölgeler ve notlar.

const ISTANBUL = "Europe/Istanbul";

/** "7 ile 13 saat geride", "aynı saat ile 9 saat ileride" gibi İstanbul'a göre fark aralığı. */
function farkAraligi(dakikalar: number[]) {
  const enAz = Math.min(...dakikalar);
  const enCok = Math.max(...dakikalar);
  const miktar = (d: number) => describeDifference(d, "tr").replace(/ (ileride|geride)$/, "");
  if (enAz === enCok) return describeDifference(enAz, "tr");
  // İki uç da tam saatse "7 ile 13 saat" diye kısaltılır.
  const ikili = (a: number, b: number) => (a % 60 === 0 && b % 60 === 0 ? `${Math.abs(a) / 60} ile ${miktar(b)}` : `${miktar(a)} ile ${miktar(b)}`);
  if (enCok <= 0) return `${ikili(enCok, enAz)} geride`;
  if (enAz >= 0) return enAz === 0 ? `aynı saat ile ${miktar(enCok)} ileride` : `${ikili(enAz, enCok)} ileride`;
  return `${miktar(enAz)} geride ile ${miktar(enCok)} ileride arasında`;
}

function dilimBilgileri(ulke: UlkeSaatleri, now: Date) {
  const yil = Number(new Intl.DateTimeFormat("en", { timeZone: ISTANBUL, year: "numeric" }).format(now));
  return ulke.dilimler.map((d) => ({
    ...d,
    utc: formatUtcOffset(offsetMinutes(d.timeZone, now)),
    fark: differenceMinutes(ISTANBUL, d.timeZone, now),
    yazSaati: observesDst(d.timeZone, yil),
  }));
}

export function ulkePageTitles(ulke: UlkeSaatleri) {
  const yer = trLocative(ulke.ad);
  return [`${yer} Saat Kaç? ${ulke.ad} Saat Dilimleri ve ${ulke.bolgeEtiketi}`, `${yer} Saat Kaç? ${ulke.ad} Saat Dilimleri`, `${yer} Saat Kaç?`];
}

export function ulkePageDescription(ulke: UlkeSaatleri, now: Date) {
  const bilgi = dilimBilgileri(ulke, now);
  return `${ulke.tamAd} ${bilgi.length} saat dilimi kullanır; Türkiye'den ${farkAraligi(bilgi.map((d) => d.fark))}. Her dilimin canlı saati, ${ulke.bolgeEtiketi.toLocaleLowerCase("tr")}, ${bilgi.some((d) => d.yazSaati) ? "yaz saati tarihleri" : "yaz saati olmadığı"} ve Türkiye'den aramak için uygun saatler.`;
}

function ortakMesai(timeZone: string, now: Date) {
  const esleme = hourMapping(ISTANBUL, timeZone, now, "tr");
  const ortak = esleme.map((r, i) => (r.overlap ? i : -1)).filter((i) => i >= 0);
  return ortak.length ? `${String(ortak[0]).padStart(2, "0")}:00–${String(ortak[ortak.length - 1] + 1).padStart(2, "0")}:00` : null;
}

/** Orada mesai başlarken (09:00) İstanbul'da saat kaç. */
function mesaiBaslangici(timeZone: string, now: Date) {
  const satir = hourMapping(ISTANBUL, timeZone, now, "tr").find((r) => r.to.startsWith("09"));
  return satir ? satir.from : null;
}

export default function UlkeSaatPage({ ulke }: { ulke: UlkeSaatleri }) {
  const now = new Date();
  const bilgi = dilimBilgileri(ulke, now);
  const yer = trLocative(ulke.ad);
  const aralik = farkAraligi(bilgi.map((d) => d.fark));
  const gorsel = sehirGorseli(ulke.gorselSehir);
  const yazSaatli = bilgi.filter((d) => d.yazSaati);
  const yazSaatsiz = bilgi.filter((d) => !d.yazSaati);
  const gecis = yazSaatli.length ? nextTransition(yazSaatli[0].timeZone, now) : null;
  const kalanGun = gecis ? Math.max(0, Math.ceil((gecis.at.getTime() - now.getTime()) / 86400000)) : null;
  const ilkTz = yazSaatli[0]?.timeZone ?? bilgi[0].timeZone;
  const sehirSayfalari = trSaatSehirleri.filter((c) => ulke.ulkeAdlari.includes(c.countryTr));
  const sayfasi = (ad: string) => sehirSayfalari.find((c) => c.nameTr === ad);
  const path = `/dunya-saatleri/${ulke.slug}`;

  const faqItems: FaqItem[] = [
    {
      question: `${yer} kaç saat dilimi var?`,
      answer: `${ulke.tamAd} ${bilgi.length} saat dilimi kullanır: ${bilgi.map((d) => `${d.ad} (${d.utc})`).join(", ")}.`,
    },
    {
      question: `${ulke.ad} ile Türkiye arasında kaç saat fark var?`,
      answer: `Şu an ${ulke.ad}, Türkiye'den ${aralik}. ${bilgi.map((d) => `${d.ad}: ${d.fark === 0 ? "aynı saat" : describeDifference(d.fark, "tr")}`).join("; ")}.`,
    },
    {
      question: `${yer} yaz saati uygulanıyor mu?`,
      answer: yazSaatli.length
        ? `${yazSaatli.length === bilgi.length ? "Tüm saat dilimlerinde" : `${yazSaatli.map((d) => d.ad).join(", ")} dilimlerinde`} yaz saati uygulanır${yazSaatsiz.length ? `; ${yazSaatsiz.map((d) => d.ad).join(", ")} saat değiştirmez` : ""}.${gecis ? ` Bir sonraki değişiklik ${new Intl.DateTimeFormat("tr-TR", { timeZone: ilkTz, day: "numeric", month: "long", year: "numeric" }).format(gecis.at)} tarihinde.` : ""}`
        : `Hayır. ${ulke.tamAd} yaz saati uygulamaz; saat dilimleri yıl boyu sabittir.`,
    },
    {
      question: `Türkiye'den ${ulke.ad} ne zaman aranır?`,
      answer: bilgi
        .map((d) => {
          const o = ortakMesai(d.timeZone, now);
          const b = mesaiBaslangici(d.timeZone, now);
          return `${d.ad}: ${o ? `İstanbul saatiyle ${o} arası iki tarafta da mesai saati` : `ortak mesai saati yok, orada mesai başlarken İstanbul'da saat ${b}`}`;
        })
        .join("; ")
        .concat("."),
    },
  ];

  return (
    <SaatKabugu
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dunya-saatleri", label: "Dünya Saatleri" },
        { href: path, label: `${ulke.ad} saat dilimleri` },
      ]}
      faqItems={faqItems}
      hero={
        <UlkeSaatiHero
          baslik={`${yer} saat kaç?`}
          alt={`${ulke.tamAd} · ${bilgi.length} saat dilimi · Türkiye'den ${aralik}`}
          dilimler={bilgi.map((d) => ({ ad: d.ad, timeZone: d.timeZone, sehirler: d.sehirler }))}
          gorsel={gorsel}
        />
      }
      sahneler={
        <div className="sahneler">
          <GazeteBaslik an={now} timeZone={ilkTz} baski={ulke.ad} />
          <div className={`gazete-on${gorsel ? "" : " is-fotosuz"}`}>
            <div className="gazete-manset-kutu">
              <p className="gazete-manset">
                {ulke.ad}, {bilgi.length} ayrı saatte
              </p>
              <p className="gazete-spot">
                Türkiye&apos;den {aralik}
                {gecis && kalanGun !== null && <> · Saat değişikliğine {kalanGun} gün</>}
                {!yazSaatli.length && <> · Yaz saati yok</>}
              </p>
            </div>
            {gorsel && (
              <figure className="gazete-foto">
                <span className="gazete-foto-cerceve">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/saat/${gorsel.dosya}-960.webp`} alt={gorsel.yer} loading="lazy" decoding="async" width={960} height={540} />
                </span>
                <figcaption>
                  {gorsel.yer}. Fotoğraf: {gorsel.yazar}, {gorsel.lisans}
                </figcaption>
              </figure>
            )}
          </div>

          {/* 1. Saat dilimleri */}
          <section className="sahne" id="dilimler">
            <p className="sahne-etiket">01 · Saat dilimleri</p>
            <h2 className="sahne-dev">{bilgi.length} saat dilimi</h2>
            <p className="sahne-buyuk">
              <b>{formatUtcOffset(Math.min(...bilgi.map((d) => offsetMinutes(d.timeZone, now))))}</b> ile{" "}
              <b>{formatUtcOffset(Math.max(...bilgi.map((d) => offsetMinutes(d.timeZone, now))))}</b> arası
            </p>
            <table className="sahne-tablo ulke-tablo">
              <thead>
                <tr>
                  <th>Saat dilimi</th>
                  <th>UTC</th>
                  <th>Türkiye&apos;ye göre</th>
                  <th>Yaz saati</th>
                  <th>Büyük şehirler</th>
                </tr>
              </thead>
              <tbody>
                {bilgi.map((d) => (
                  <tr key={d.timeZone}>
                    <td>
                      <b>{d.ad}</b>
                    </td>
                    <td>{d.utc}</td>
                    <td>{d.fark === 0 ? "aynı saat" : describeDifference(d.fark, "tr")}</td>
                    <td>{d.yazSaati ? "var" : "yok"}</td>
                    <td>
                      {d.sehirler.map((s, i) => {
                        const c = sayfasi(s);
                        return (
                          <span key={s}>
                            {i > 0 && ", "}
                            {c ? (
                              <Link href={`/dunya-saatleri/${c.tr}`} prefetch={false}>
                                {s}
                              </Link>
                            ) : (
                              s
                            )}
                          </span>
                        );
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* 2. Saat değişikliği */}
          <section className="sahne" id="yaz-saati">
            <p className="sahne-etiket">02 · Saat değişikliği</p>
            {gecis && kalanGun !== null ? (
              <div className="sahne-takvim-satir">
                <div className="sahne-takvim" aria-hidden="true">
                  <span>{new Intl.DateTimeFormat("tr-TR", { timeZone: ilkTz, month: "long" }).format(gecis.at)}</span>
                  <b>{new Intl.DateTimeFormat("tr-TR", { timeZone: ilkTz, day: "numeric" }).format(gecis.at)}</b>
                  <span>{new Intl.DateTimeFormat("tr-TR", { timeZone: ilkTz, weekday: "long" }).format(gecis.at)}</span>
                </div>
                <div>
                  <h2 className="sahne-dev">{kalanGun === 0 ? "Bugün" : `${kalanGun} gün sonra`}</h2>
                  <p className="sahne-buyuk">
                    saatler <b>1 saat {gecis.toMinutes > gecis.fromMinutes ? "ileri" : "geri"}</b> alınıyor
                  </p>
                  <ul className="sahne-kucuk">
                    {yazSaatli.map((d) => {
                      const yeni = differenceMinutes(ISTANBUL, d.timeZone, new Date(gecis.at.getTime() + 86400000 * 2));
                      return (
                        <li key={d.timeZone}>
                          {d.ad}: Türkiye ile fark {yeni === 0 ? "kalmayacak" : `${describeDifference(yeni, "tr").replace(/ (ileride|geride)$/, "")} olacak`}
                        </li>
                      );
                    })}
                    {yazSaatsiz.length > 0 && <li>Saat değiştirmeyenler: {yazSaatsiz.map((d) => d.ad).join(", ")}</li>}
                  </ul>
                </div>
              </div>
            ) : (
              <>
                <h2 className="sahne-dev">Yaz saati yok</h2>
                <p className="sahne-buyuk">
                  {yer} saatler <b>yıl boyu sabit</b>; Türkiye ile farklar değişmez
                </p>
              </>
            )}
          </section>

          {/* 3. Ne zaman aramalı */}
          <section className="sahne" id="saat-farki">
            <p className="sahne-etiket">03 · Ne zaman aramalı?</p>
            <h2 className="sahne-dev">İstanbul saatiyle</h2>
            <p className="sahne-buyuk">iki tarafın da mesaide olduğu saatler (09–18)</p>
            <div className="sahne-kartlar ulke-kartlar">
              {bilgi.map((d) => (
                <div key={d.timeZone} className="sahne-kart">
                  <small>{d.ad}</small>
                  {ortakMesai(d.timeZone, now) ? (
                    <b>{ortakMesai(d.timeZone, now)}</b>
                  ) : (
                    <>
                      <b>{mesaiBaslangici(d.timeZone, now) ?? "—"}</b>
                      <small>ortak mesai yok; orada mesai 09:00&apos;da başlarken İstanbul&apos;daki saat</small>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 4. Bölgeler */}
          <section className="sahne" id="bolgeler">
            <p className="sahne-etiket">04 · {ulke.bolgeEtiketi}</p>
            <h2 className="sahne-dev">Hangi bölge hangi saatte?</h2>
            <div className="ulke-bolgeler">
              {bilgi.map((d) => (
                <div key={d.timeZone}>
                  <h3>
                    {d.ad} <small>{d.utc}</small>
                  </h3>
                  <p>{d.bolgeler.join(" · ")}</p>
                  {d.not && <p className="ulke-not">{d.not}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* 5. Notlar */}
          <section className="sahne" id="notlar">
            <p className="sahne-etiket">05 · Bilmeniz gerekenler</p>
            <div className="ulke-notlar">
              {ulke.notlar.map((n) => (
                <p key={n}>{n}</p>
              ))}
            </div>
          </section>

          {/* 6. Şehir sayfaları */}
          {sehirSayfalari.length > 0 && (
            <section className="sahne">
              <p className="sahne-etiket">06 · {ulke.ad} şehirleri</p>
              <SehirBulutu sehirler={sehirSayfalari} />
            </section>
          )}
        </div>
      }
    />
  );
}
