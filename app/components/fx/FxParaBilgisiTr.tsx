import { crossRate, formatRate } from "../../converter/fx/fxMath";
import type { FxPairPageData } from "../../converter/fx/fxPageData";
import { fxCurrenciesTr, type FxPairTr } from "../../converter/fx/fxPairsTr";

// Para biriminin kendisine ait kalıcı bilgiler: alt birim, merkez bankası ve kur rejimi.
// Sabit kurlu paralarda bağlılık güncel veriden de gösterilir.
type ParaBilgisi = { altBirim: string; merkezBankasi: string; rejim: string; sabitDolar?: number };

const PARA_BILGISI: Record<string, ParaBilgisi> = {
  USD: { altBirim: "1 dolar = 100 sent", merkezBankasi: "ABD Merkez Bankası (Federal Reserve, Fed)", rejim: "Serbest dalgalı kur; dünyanın başlıca rezerv parasıdır." },
  EUR: { altBirim: "1 euro = 100 sent", merkezBankasi: "Avrupa Merkez Bankası (ECB)", rejim: "Serbest dalgalı kur; Euro Bölgesi ülkelerinin ortak parasıdır." },
  GBP: { altBirim: "1 sterlin = 100 peni (pence)", merkezBankasi: "İngiltere Merkez Bankası (Bank of England)", rejim: "Serbest dalgalı kur." },
  CHF: { altBirim: "1 frank = 100 rappen (santim)", merkezBankasi: "İsviçre Ulusal Bankası (SNB)", rejim: "Serbest dalgalı kur; merkez bankası gerektiğinde piyasaya müdahale eder." },
  SAR: { altBirim: "1 riyal = 100 halale", merkezBankasi: "Suudi Arabistan Merkez Bankası (SAMA)", rejim: "1986'dan beri ABD dolarına sabit: 1 dolar = 3,75 riyal.", sabitDolar: 3.75 },
  AED: { altBirim: "1 dirhem = 100 fils", merkezBankasi: "BAE Merkez Bankası", rejim: "ABD dolarına sabit: 1 dolar = 3,6725 dirhem.", sabitDolar: 3.6725 },
  RUB: { altBirim: "1 ruble = 100 kopek", merkezBankasi: "Rusya Merkez Bankası", rejim: "Kasım 2014'ten beri serbest dalgalı kur." },
  AZN: { altBirim: "1 manat = 100 kepik", merkezBankasi: "Azerbaycan Merkez Bankası", rejim: "Yönetilen kur; 2015'teki iki devalüasyondan sonra 2017'den beri dolara karşı 1,70 manat civarında tutulur." },
  KWD: { altBirim: "1 dinar = 1.000 fils", merkezBankasi: "Kuveyt Merkez Bankası", rejim: "2007'den beri bileşimi açıklanmayan bir para sepetine bağlı; birim değeri en yüksek para birimlerindendir." },
  JPY: { altBirim: "Günlük kullanımda alt birim yoktur (sen artık kullanılmaz)", merkezBankasi: "Japonya Merkez Bankası (BoJ)", rejim: "Serbest dalgalı kur." },
  CNY: { altBirim: "1 yuan = 10 jiao = 100 fen", merkezBankasi: "Çin Halk Bankası (PBoC)", rejim: "Yönetilen kur; merkez bankasının her gün açıkladığı orta kurun ±%2 bandında işlem görür." },
  CAD: { altBirim: "1 Kanada doları = 100 sent", merkezBankasi: "Kanada Merkez Bankası (Bank of Canada)", rejim: "Serbest dalgalı kur." },
  AUD: { altBirim: "1 Avustralya doları = 100 sent", merkezBankasi: "Avustralya Merkez Bankası (RBA)", rejim: "Serbest dalgalı kur." },
  GEL: { altBirim: "1 lari = 100 tetri", merkezBankasi: "Gürcistan Ulusal Bankası", rejim: "Dalgalı kur." },
};

export default function FxParaBilgisiTr({ pair, data }: { pair: FxPairTr; data: FxPairPageData | null }) {
  const kodlar = [pair.from, pair.to].filter((code) => PARA_BILGISI[code]);
  if (!kodlar.length) return null;
  return (
    <section className="conversion-section">
      <h2>{kodlar.map((code) => fxCurrenciesTr[code].long).join(" ve ")} hakkında</h2>
      {kodlar.map((code) => {
        const para = fxCurrenciesTr[code];
        const bilgi = PARA_BILGISI[code];
        const dolar = data && code !== "USD" ? crossRate(data.latest.rates, "USD", code) : null;
        return (
          <div key={code}>
            {kodlar.length > 1 ? <h3>{para.long}</h3> : null}
            <div className="conversion-table-wrap">
              <table className="conversion-table">
                <tbody>
                  <tr>
                    <th scope="row">Kod ve simge</th>
                    <td>
                      {para.code} · {para.symbol}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Kullanıldığı yer</th>
                    <td>{para.country}</td>
                  </tr>
                  <tr>
                    <th scope="row">Alt birim</th>
                    <td>{bilgi.altBirim}</td>
                  </tr>
                  <tr>
                    <th scope="row">Merkez bankası</th>
                    <td>{bilgi.merkezBankasi}</td>
                  </tr>
                  <tr>
                    <th scope="row">Kur rejimi</th>
                    <td>{bilgi.rejim}</td>
                  </tr>
                  {dolar ? (
                    <tr>
                      <th scope="row">Güncel dolar karşılığı</th>
                      <td>
                        1 dolar = {formatRate(dolar, "tr-TR")} {para.lower}
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
            {bilgi.sabitDolar && dolar ? (
              <p>
                {para.long} dolara sabit olduğu için {para.lower} ile TL arasındaki kur, neredeyse tamamen dolar/TL kurunun hareketini izler:
                güncel veride 1 dolar {formatRate(dolar, "tr-TR")} {para.lower} ediyor (sabit oran {formatRate(bilgi.sabitDolar, "tr-TR")}).
              </p>
            ) : null}
          </div>
        );
      })}
    </section>
  );
}
