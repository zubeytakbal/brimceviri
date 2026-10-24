import type { ReactNode } from "react";
import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";

// Türkçe hazır süre sayfalarının süreye özgü içeriği. Her süre bir aileye girer (mutfak, odak, sınav ...);
// aile sayfanın düzenini ve ortak tablosunu belirler, süreye özgü metin ve tablolar burada yazılır.
// İçeriği yazılmamış süreler TimerPresetPage'in genel düzeninde kalır.

export type ZamanlayiciAile = "mutfak" | "odak" | "sinav";

export const AILE_ADI: Record<ZamanlayiciAile, string> = {
  mutfak: "Mutfak",
  odak: "Ders ve odak",
  sinav: "Sınav ve uzun oturum",
};

export type ZamanlayiciIcerik = {
  aile: ZamanlayiciAile;
  /** Başlık altındaki giriş: o süreye özgü bir iki cümle. */
  giris: string;
  bolumler: Array<{ id: string; baslik: string; icerik: ReactNode }>;
  sss: FaqItem[];
};

const yol = (sn: number) => (sn < 60 || sn === 90 ? `/zamanlayici/${sn}-saniye` : sn < 7200 ? `/zamanlayici/${sn / 60}-dakika` : `/zamanlayici/${sn / 3600}-saat`);

const saat = (dk: number) => `${String(Math.floor(dk / 60) % 24).padStart(2, "0")}:${String(dk % 60).padStart(2, "0")}`;

/* ---------------- Mutfak: yumurta haşlama süreleri ---------------- */

// Su kaynadıktan sonra, buzdolabından çıkmış orta boy yumurta için yaygın süreler.
const YUMURTA = [
  { dk: 3, kivam: "Rafadan", aciklama: "Beyazı yeni katılaşmış, sarısı tamamen akışkan." },
  { dk: 6, kivam: "Kayısı kıvamı", aciklama: "Beyazı katı, sarısı ortası yumuşak ve koyu." },
  { dk: 7, kivam: "Orta-katı", aciklama: "Sarısının kenarları katı, ortası hafif nemli." },
  { dk: 9, kivam: "Katı", aciklama: "Sarısı tamamen pişmiş, dağılmadan dilimlenir." },
];

function YumurtaTablosu({ vurgu }: { vurgu: number }) {
  return (
    <div className="conversion-table-wrap">
      <table className="conversion-table zm-tablo">
        <thead>
          <tr>
            <th scope="col">Süre</th>
            <th scope="col">Kıvam</th>
            <th scope="col">Nasıl olur?</th>
          </tr>
        </thead>
        <tbody>
          {YUMURTA.map((y) => (
            <tr key={y.dk} className={y.dk * 60 === vurgu ? "is-vurgu" : undefined}>
              <td>{y.dk * 60 === vurgu ? <strong>{y.dk} dakika</strong> : <Link href={yol(y.dk * 60)}>{y.dk} dakika</Link>}</td>
              <td>{y.kivam}</td>
              <td>{y.aciklama}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- Odak: Pomodoro programı ---------------- */

function PomodoroProgrami({ baslangic = 9 * 60 }: { baslangic?: number }) {
  const satirlar: Array<{ ad: string; bas: number; son: number; mola: boolean }> = [];
  let t = baslangic;
  for (let i = 1; i <= 4; i += 1) {
    satirlar.push({ ad: `${i}. pomodoro`, bas: t, son: t + 25, mola: false });
    t += 25;
    const mola = i === 4 ? 20 : 5;
    satirlar.push({ ad: i === 4 ? "Uzun mola" : "Kısa mola", bas: t, son: t + mola, mola: true });
    t += mola;
  }
  return (
    <div className="conversion-table-wrap">
      <table className="conversion-table zm-tablo">
        <thead>
          <tr>
            <th scope="col">Adım</th>
            <th scope="col">Başlangıç</th>
            <th scope="col">Bitiş</th>
            <th scope="col">Süre</th>
          </tr>
        </thead>
        <tbody>
          {satirlar.map((s) => (
            <tr key={s.ad} className={s.mola ? "is-soluk" : "is-vurgu"}>
              <td>{s.mola ? s.ad : <strong>{s.ad}</strong>}</td>
              <td>{saat(s.bas)}</td>
              <td>{saat(s.son)}</td>
              <td>{s.mola ? <Link href={yol((s.son - s.bas) * 60)}>{s.son - s.bas} dakika</Link> : "25 dakika"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- Sınav: Türkiye'deki merkezî sınav süreleri ---------------- */

// ÖSYM (2026 YKS) ve MEB (LGS, 2019'dan beri) oturum süreleri.
const SINAVLAR = [
  { sinav: "YKS – TYT", soru: 120, dk: 165, kurum: "ÖSYM" },
  { sinav: "YKS – AYT", soru: 160, dk: 180, kurum: "ÖSYM" },
  { sinav: "YKS – YDT", soru: 80, dk: 120, kurum: "ÖSYM" },
  { sinav: "LGS – Sözel bölüm", soru: 50, dk: 75, kurum: "MEB" },
  { sinav: "LGS – Sayısal bölüm", soru: 40, dk: 80, kurum: "MEB" },
];

const sureMetni = (dk: number) => (dk % 60 === 0 ? `${dk / 60} saat` : dk > 60 ? `${Math.floor(dk / 60)} sa ${dk % 60} dk` : `${dk} dk`);

function SinavTablosu({ vurgu }: { vurgu: number }) {
  return (
    <div className="conversion-table-wrap">
      <table className="conversion-table zm-tablo">
        <thead>
          <tr>
            <th scope="col">Sınav</th>
            <th scope="col">Soru</th>
            <th scope="col">Süre</th>
            <th scope="col">Soru başına</th>
          </tr>
        </thead>
        <tbody>
          {SINAVLAR.map((s) => {
            const sn = (s.dk * 60) / s.soru;
            return (
              <tr key={s.sinav} className={s.dk * 60 === vurgu ? "is-vurgu" : undefined}>
                <td>
                  {s.dk * 60 === vurgu ? <strong>{s.sinav}</strong> : s.sinav} <small>({s.kurum})</small>
                </td>
                <td>{s.soru}</td>
                <td>{sureMetni(s.dk)}</td>
                <td>
                  {Math.floor(sn / 60) > 0 ? `${Math.floor(sn / 60)} dk ` : ""}
                  {Math.round(sn % 60)} sn
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- Süreye özgü içerik ---------------- */

const ICERIK: Record<number, ZamanlayiciIcerik> = {
  180: {
    aile: "mutfak",
    giris:
      "3 dakika mutfakta en çok rafadan yumurta ve poşet çay için kurulan süredir. Su kaynadıktan sonra başlatın; süre bitince sesli uyarı çalar.",
    bolumler: [
      {
        id: "yumurta",
        baslik: "3 dakikada rafadan yumurta",
        icerik: (
          <>
            <ol className="zm-adimlar">
              <li>Yumurtaların üzerini 2–3 parmak geçecek kadar suyu kaynatın.</li>
              <li>Yumurtayı kaşıkla yavaşça kaynar suya bırakın ve zamanlayıcıyı başlatın.</li>
              <li>3 dakika dolunca yumurtayı soğuk suya alın; pişme durur, kabuğu kolay soyulur.</li>
            </ol>
            <p>Aynı yöntemle kıvamı süre belirler. Tablodaki diğer sürelerin her birinin kendi zamanlayıcısı vardır:</p>
            <YumurtaTablosu vurgu={180} />
            <p>
              <small>
                Süreler buzdolabından çıkmış orta boy yumurta içindir. Oda sıcaklığındaki ya da küçük yumurtada 30 saniye kadar kısalır, büyük
                yumurtada uzar.
              </small>
            </p>
          </>
        ),
      },
      {
        id: "cay",
        baslik: "Poşet çay ve diğer 3 dakikalık işler",
        icerik: (
          <ul>
            <li>
              <strong>Siyah poşet çay:</strong> paketlerde genellikle 2–3 dakika demleme önerilir; 3 dakikadan sonra acılık artar.
            </li>
            <li>
              <strong>Bitki çayı:</strong> ıhlamur, adaçayı gibi bitkiler daha uzun bekler; 5 dakika için{" "}
              <Link href={yol(300)}>5 dakika zamanlayıcı</Link>.
            </li>
            <li>
              <strong>Kısa konuşma provası:</strong> 3 dakika, okuldaki ya da toplantıdaki kısa sunumların yaygın süre sınırıdır.
            </li>
          </ul>
        ),
      },
    ],
    sss: [
      { question: "Rafadan yumurta kaç dakika haşlanır?", answer: "Su kaynadıktan sonra buzdolabından çıkmış orta boy yumurta yaklaşık 3 dakikada rafadan olur: beyazı katılaşır, sarısı akışkan kalır." },
      { question: "Kayısı kıvamında yumurta için kaç dakika gerekir?", answer: "Aynı yöntemle yaklaşık 6 dakika; tamamen katı yumurta için 9 dakika." },
    ],
  },
  1500: {
    aile: "odak",
    giris:
      "25 dakika, Pomodoro tekniğinin çalışma süresidir: 25 dakika tek bir işe odaklanılır, ardından 5 dakika mola verilir. Dört turdan sonra daha uzun bir mola gelir.",
    bolumler: [
      {
        id: "pomodoro",
        baslik: "Pomodoro tekniği nasıl uygulanır?",
        icerik: (
          <>
            <p>
              Teknik 1980&apos;lerin sonunda Francesco Cirillo tarafından geliştirildi; adını domates biçimli mutfak zamanlayıcısından alır
              (İtalyanca <em>pomodoro</em> = domates).
            </p>
            <ol className="zm-adimlar">
              <li>Yapılacak tek bir işi seçin ve 25 dakikayı başlatın.</li>
              <li>Süre bitene kadar yalnızca o işle uğraşın; aklınıza gelen başka işleri bir kenara not edin.</li>
              <li>
                Süre dolunca <Link href={yol(300)}>5 dakika</Link> mola verin.
              </li>
              <li>Dört pomodorodan sonra 15–30 dakikalık uzun bir mola verin.</li>
            </ol>
          </>
        ),
      },
      {
        id: "program",
        baslik: "Örnek program: 09:00'da başlayan bir tur",
        icerik: (
          <>
            <p>Dört pomodoro ve molalarla bir tam tur 2 saat 0 dakika sürer (uzun mola 20 dakika alındığında):</p>
            <PomodoroProgrami />
            <p>
              25 dakika size kısa geliyorsa birçok kişi 50 dakika çalışma ve 10 dakika mola ile de aynı düzeni kurar;{" "}
              <Link href="/pomodoro">Pomodoro zamanlayıcı</Link> turları ve molaları kendisi sayar.
            </p>
          </>
        ),
      },
    ],
    sss: [
      { question: "Pomodoro tekniğinde mola kaç dakika?", answer: "Her 25 dakikalık çalışmadan sonra 5 dakika kısa mola; dört pomodorodan sonra 15–30 dakika uzun mola verilir." },
      { question: "Dört pomodoro toplam kaç saat sürer?", answer: "4 × 25 dakika çalışma ve 3 × 5 dakika kısa mola 1 saat 55 dakika eder; ardından gelen uzun molayla bir tur yaklaşık 2–2,5 saattir." },
    ],
  },
  10800: {
    aile: "sinav",
    giris:
      "3 saat (180 dakika), YKS'nin AYT oturumunun süresidir. Deneme sınavını gerçek süresiyle çözmek ya da 3 saatlik bir çalışma bloğunu bölmek için kullanılır.",
    bolumler: [
      {
        id: "sinavlar",
        baslik: "Türkiye'deki merkezî sınavların süreleri",
        icerik: (
          <>
            <p>
              AYT&apos;de 160 soru 180 dakikada çözülür; soru başına ortalama 1 dakika 8 saniye düşer. Diğer oturumlarla karşılaştırma:
            </p>
            <SinavTablosu vurgu={10800} />
            <p>
              <small>Süreler 2026 YKS (ÖSYM) ve LGS (MEB) uygulamasına göredir; her yıl sınav kılavuzundan kontrol edin.</small>
            </p>
          </>
        ),
      },
      {
        id: "plan",
        baslik: "3 saatlik deneme sınavını bölmek",
        icerik: (
          <>
            <p>AYT dört testten oluşur (her biri 40 soru). Süreyi eşit bölerseniz her teste 45 dakika düşer:</p>
            <div className="conversion-table-wrap">
              <table className="conversion-table zm-tablo">
                <thead>
                  <tr>
                    <th scope="col">Bölüm</th>
                    <th scope="col">Saat (10:15 başlangıç)</th>
                    <th scope="col">Süre</th>
                  </tr>
                </thead>
                <tbody>
                  {["1. test", "2. test", "3. test", "4. test"].map((ad, i) => (
                    <tr key={ad}>
                      <td>{ad}</td>
                      <td>
                        {saat(10 * 60 + 15 + i * 45)}–{saat(10 * 60 + 15 + (i + 1) * 45)}
                      </td>
                      <td>
                        <Link href={yol(2700)}>45 dakika</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Eşit bölmek bir başlangıç noktasıdır; zorlandığınız teste daha fazla süre bırakmak için ara kontrolleri{" "}
              <Link href={yol(2700)}>45 dakika</Link> ya da <Link href={yol(3600)}>1 saat</Link> zamanlayıcıyla yapabilirsiniz.
            </p>
          </>
        ),
      },
    ],
    sss: [
      { question: "AYT kaç dakika?", answer: "2026 YKS'de AYT oturumu 180 dakika (3 saat), 160 sorudur. TYT 165 dakika, YDT 120 dakikadır." },
      { question: "3 saat kaç dakika?", answer: "3 saat 180 dakika, yani 10.800 saniyedir." },
    ],
  },
};

export function zamanlayiciIcerigi(saniye: number): ZamanlayiciIcerik | null {
  return ICERIK[saniye] ?? null;
}
