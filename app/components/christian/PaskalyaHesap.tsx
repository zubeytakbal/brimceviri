"use client";

// /paskalya-ne-zaman sayfasının yıl seçicisi: seçilen yılın Batı ve Ortodoks Paskalyası ile bağlı günleri.
import { useState } from "react";
import { paskalyaGunleri, trTarih } from "../../converter/christian/paskalya";
import { diffDays } from "../../converter/time/dateMath";

const ILK = 1583;
const SON = 4099;

export default function PaskalyaHesap({ ilkYil }: { ilkYil: number }) {
  const [yilMetni, setYilMetni] = useState(String(ilkYil));
  const yil = Number(yilMetni);
  const gecerli = Number.isInteger(yil) && yil >= ILK && yil <= SON;
  const bati = gecerli ? paskalyaGunleri(yil, false) : [];
  const ortodoks = gecerli ? paskalyaGunleri(yil, true) : [];
  const fark = gecerli ? diffDays(bati.find((g) => g.id === "paskalya")!.tarih, ortodoks.find((g) => g.id === "paskalya")!.tarih) : 0;
  return (
    <div className="paskalya-hesap">
      <label className="hizli-alan paskalya-yil">
        <span>Yıl</span>
        <input type="number" inputMode="numeric" min={ILK} max={SON} value={yilMetni} onChange={(e) => setYilMetni(e.target.value)} />
      </label>
      {gecerli ? (
        <>
          <p className="paskalya-ozet" aria-live="polite">
            {fark === 0
              ? `${yil} yılında Batı ve Ortodoks Paskalyası aynı gün: ${trTarih(bati[4].tarih)}.`
              : `${yil} yılında Ortodoks Paskalyası, Batı Paskalyası'ndan ${fark / 7} hafta sonra.`}
          </p>
          <div className="paskalya-ikili">
            {[
              { baslik: "Batı: Katolik, Protestan, Ermeni", gunler: bati },
              { baslik: "Ortodoks: Rum Ortodoks, Süryani", gunler: ortodoks },
            ].map((k) => (
              <section key={k.baslik} className="hizli-kart">
                <h3>{k.baslik}</h3>
                <dl className="zaman-liste">
                  {k.gunler.map((g) => (
                    <div key={g.id} className={g.id === "paskalya" ? "is-paskalya" : undefined}>
                      <dt>{g.ad}</dt>
                      <dd>{trTarih(g.tarih)}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        </>
      ) : (
        <p className="paskalya-ozet">{ILK} ile {SON} arasında bir yıl girin.</p>
      )}
    </div>
  );
}
