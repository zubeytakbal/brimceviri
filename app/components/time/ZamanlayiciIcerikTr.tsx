import type { ReactNode } from "react";
import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";

// Türkçe hazır süre sayfalarının süreye özgü içeriği. Her süre bir aileye girer (mutfak, odak, sınav ...);
// aile sayfanın düzenini ve ortak tablosunu belirler, süreye özgü metin ve tablolar burada yazılır.
// İçeriği yazılmamış süreler TimerPresetPage'in genel düzeninde kalır.

export type ZamanlayiciAile = "mutfak" | "odak" | "sinav" | "spor" | "gunluk" | "uzun";

export const AILE_ADI: Record<ZamanlayiciAile, string> = {
  mutfak: "Mutfak",
  odak: "Ders ve odak",
  sinav: "Sınav ve uzun oturum",
  spor: "Spor ve antrenman",
  gunluk: "Günlük bakım",
  uzun: "İş günü ve gün",
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


/* ---------------- Spor: yaygın aralık (interval) düzenleri ---------------- */

// Çalışma / dinlenme (saniye) ve 8 tur için toplam süre. Tabata (20/10) ve 7 dakika antrenmanı (30/10) kaynağı belli düzenlerdir.
const ARALIKLAR = [
  { calis: 20, dinlen: 10, ad: "Tabata" },
  { calis: 30, dinlen: 10, ad: "7 dakika antrenmanı" },
  { calis: 40, dinlen: 20, ad: "40/20 aralığı" },
  { calis: 45, dinlen: 15, ad: "45/15 aralığı" },
];

const dkSn = (sn: number) => (sn % 60 === 0 ? `${sn / 60} dk` : sn > 60 ? `${Math.floor(sn / 60)} dk ${sn % 60} sn` : `${sn} sn`);

function AralikTablosu({ vurgu }: { vurgu: number }) {
  return (
    <div className="conversion-table-wrap">
      <table className="conversion-table zm-tablo">
        <thead>
          <tr>
            <th scope="col">Düzen</th>
            <th scope="col">Çalışma</th>
            <th scope="col">Dinlenme</th>
            <th scope="col">8 tur</th>
          </tr>
        </thead>
        <tbody>
          {ARALIKLAR.map((a) => {
            const v = a.calis === vurgu || a.dinlen === vurgu;
            return (
              <tr key={a.ad} className={v ? "is-vurgu" : undefined}>
                <td>{v ? <strong>{a.ad}</strong> : a.ad}</td>
                <td>{a.calis === vurgu ? <strong>{a.calis} sn</strong> : <Link href={yol(a.calis)}>{a.calis} sn</Link>}</td>
                <td>{a.dinlen === vurgu ? <strong>{a.dinlen} sn</strong> : <Link href={yol(a.dinlen)}>{a.dinlen} sn</Link>}</td>
                <td>{dkSn(8 * (a.calis + a.dinlen))}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function TabataTurlari() {
  return (
    <div className="conversion-table-wrap">
      <table className="conversion-table zm-tablo">
        <thead>
          <tr>
            <th scope="col">Tur</th>
            <th scope="col">Çalışma (20 sn)</th>
            <th scope="col">Dinlenme (10 sn)</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }, (_, i) => {
            const bas = i * 30;
            const f = (sn: number) => `${Math.floor(sn / 60)}:${String(sn % 60).padStart(2, "0")}`;
            return (
              <tr key={i} className={i % 2 ? undefined : "is-vurgu"}>
                <td>{i + 1}. tur</td>
                <td>
                  {f(bas)}–{f(bas + 20)}
                </td>
                <td>
                  {f(bas + 20)}–{f(bas + 30)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- Ders: MEB ders ve teneffüs süreleri ---------------- */

function DersSureleri({ vurgu }: { vurgu: number }) {
  const satirlar = [
    { ad: "Ders saati (ilkokul, ortaokul, lise)", dk: 40 },
    { ad: "Teneffüs, lise (en az)", dk: 10 },
    { ad: "Teneffüs, tekli eğitim yapan ilkokul/ortaokul (en az)", dk: 15 },
    { ad: "Bir uzun teneffüs, tekli eğitimde (en az)", dk: 20 },
    { ad: "Öğle arası, lise (en az)", dk: 45 },
  ];
  return (
    <div className="conversion-table-wrap">
      <table className="conversion-table zm-tablo">
        <thead>
          <tr>
            <th scope="col">MEB yönetmeliğine göre</th>
            <th scope="col">Süre</th>
          </tr>
        </thead>
        <tbody>
          {satirlar.map((r) => (
            <tr key={r.ad} className={r.dk * 60 === vurgu ? "is-vurgu" : undefined}>
              <td>{r.dk * 60 === vurgu ? <strong>{r.ad}</strong> : r.ad}</td>
              <td>{r.dk * 60 === vurgu ? <strong>{r.dk} dakika</strong> : <Link href={yol(r.dk * 60)}>{r.dk} dakika</Link>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const MEB_NOTU = (
  <p>
    <small>
      Kaynak: MEB Ortaöğretim Kurumları Yönetmeliği ile Okul Öncesi Eğitim ve İlköğretim Kurumları Yönetmeliği (2023 değişikliği). İkili
      eğitim yapan okullarda teneffüsler daha kısa olabilir; 2026-2027 öğretim yılında bazı okullarda ders süresinin 30 dakikaya
      indirilebilmesine izin verildi.
    </small>
  </p>
);

/* ---------------- Futbol: maç akışı ---------------- */

function MacAkisi() {
  const r = [
    { ad: "Başlama düdüğü", dk: 20 * 60 },
    { ad: "İlk yarı biter (uzatmasız)", dk: 20 * 60 + 45 },
    { ad: "İkinci yarı başlar (en geç, uzatmasız)", dk: 20 * 60 + 60 },
    { ad: "Maç biter (uzatmasız)", dk: 20 * 60 + 105 },
  ];
  return (
    <div className="conversion-table-wrap">
      <table className="conversion-table zm-tablo">
        <thead>
          <tr>
            <th scope="col">20:00&apos;de başlayan maç</th>
            <th scope="col">Saat</th>
          </tr>
        </thead>
        <tbody>
          {r.map((x) => (
            <tr key={x.ad}>
              <td>{x.ad}</td>
              <td>{saat(x.dk)}</td>
            </tr>
          ))}
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

  10: {
    aile: "spor",
    giris: "10 saniye, Tabata antrenmanında iki çalışma arasındaki dinlenme süresidir. Kısa aralıklı antrenmanlarda dinlenmeyi tutmak için kullanılır.",
    bolumler: [
      {
        id: "aralik",
        baslik: "10 saniyelik dinlenme hangi düzenlerde var?",
        icerik: (
          <>
            <p>
              Tabata&apos;da 20 saniye çalışmanın ardından 10 saniye dinlenilir; 7 dakika antrenmanında da her 30 saniyelik hareketten sonra
              10 saniye ara verilir. Yaygın düzenler ve 8 turun toplam süresi:
            </p>
            <AralikTablosu vurgu={10} />
            <p>
              Turları tek tek saymak yerine <Link href="/tabata-zamanlayici">Tabata zamanlayıcı</Link> çalışma ve dinlenmeyi kendisi
              değiştirir.
            </p>
          </>
        ),
      },
    ],
    sss: [{ question: "Tabata'da dinlenme kaç saniye?", answer: "Tabata düzeninde her 20 saniyelik çalışmadan sonra 10 saniye dinlenilir; 8 tur toplam 4 dakika sürer." }],
  },
  20: {
    aile: "gunluk",
    giris:
      "20 saniye, ellerin sabunla ovulması için önerilen en kısa süredir (ABD Hastalık Kontrol Merkezleri, CDC). Tabata antrenmanında da her çalışma turu 20 saniyedir.",
    bolumler: [
      {
        id: "el-yikama",
        baslik: "20 saniyede el yıkama",
        icerik: (
          <>
            <ol className="zm-adimlar">
              <li>Ellerinizi temiz akan suyla ıslatın ve sabunlayın.</li>
              <li>
                Zamanlayıcıyı başlatın ve <strong>en az 20 saniye</strong> ovun: avuç içleri, el sırtları, parmak araları ve tırnak altları.
              </li>
              <li>Akan suyla iyice durulayın, temiz bir havlu ya da kâğıt havluyla kurulayın.</li>
            </ol>
            <p>
              20 saniye yalnızca ovma süresidir; ıslatma ve durulamayla işlem daha uzun sürer. CDC, eller gözle görülür şekilde kirliyse
              sabunla 40–60 saniye yıkamayı önerir.
            </p>
          </>
        ),
      },
      {
        id: "tabata",
        baslik: "Tabata'da 20 saniyelik çalışma",
        icerik: (
          <>
            <p>Tabata düzeninde her tur 20 saniye tam güçle çalışma ve 10 saniye dinlenmedir:</p>
            <AralikTablosu vurgu={20} />
          </>
        ),
      },
    ],
    sss: [{ question: "Eller kaç saniye yıkanmalı?", answer: "CDC, ellerin sabunla en az 20 saniye ovulmasını önerir; eller gözle görülür şekilde kirliyse 40–60 saniye." }],
  },
  30: {
    aile: "spor",
    giris:
      "30 saniye, 7 dakika antrenmanında her hareketin süresidir. Plank, duvar oturuşu gibi tutma hareketlerinde de en sık kurulan süredir.",
    bolumler: [
      {
        id: "yedi-dakika",
        baslik: "7 dakika antrenmanında 30 saniye",
        icerik: (
          <>
            <p>
              2013&apos;te ACSM Health &amp; Fitness Journal&apos;da yayımlanan bu antrenmanda (Klika ve Jordan) 12 hareketin her biri 30
              saniye yapılır ve aralarına 10 saniye dinlenme konur. 12 × 30 saniye çalışma ve 11 × 10 saniye dinlenme toplam 7 dakika 50
              saniye eder.
            </p>
            <AralikTablosu vurgu={30} />
          </>
        ),
      },
    ],
    sss: [{ question: "7 dakika antrenmanında her hareket kaç saniye?", answer: "Her hareket 30 saniye yapılır, aralarda 10 saniye dinlenilir; 12 hareket yaklaşık 7–8 dakika sürer." }],
  },
  45: {
    aile: "spor",
    giris: "45 saniye, 45/15 aralık antrenmanının çalışma süresidir: 45 saniye hareket, 15 saniye dinlenme ile her tur tam 1 dakika eder.",
    bolumler: [
      {
        id: "aralik",
        baslik: "45/15 düzeni nasıl kurulur?",
        icerik: (
          <>
            <p>
              Her tur 1 dakika sürdüğü için turları saymak kolaydır: 10 tur 10 dakika, 20 tur 20 dakikadır. Diğer yaygın düzenlerle
              karşılaştırma:
            </p>
            <AralikTablosu vurgu={45} />
          </>
        ),
      },
    ],
    sss: [{ question: "45/15 antrenmanı nedir?", answer: "45 saniye çalışma ve 15 saniye dinlenmeden oluşan, her turu 1 dakika süren aralık antrenmanı düzenidir." }],
  },
  120: {
    aile: "gunluk",
    giris: "2 dakika, diş hekimlerinin önerdiği diş fırçalama süresidir: günde en az iki kez, ikişer dakika. Birinin akşam yatmadan önce olması önerilir.",
    bolumler: [
      {
        id: "dis",
        baslik: "2 dakikayı ağzın dört bölümüne bölmek",
        icerik: (
          <>
            <p>Süreyi eşit bölmek her bölgeye yeterli zaman ayırmanın kolay bir yoludur:</p>
            <div className="conversion-table-wrap">
              <table className="conversion-table zm-tablo">
                <thead>
                  <tr>
                    <th scope="col">Bölge</th>
                    <th scope="col">Zaman</th>
                  </tr>
                </thead>
                <tbody>
                  {["Üst sağ", "Üst sol", "Alt sol", "Alt sağ"].map((b, i) => (
                    <tr key={b}>
                      <td>{b}</td>
                      <td>
                        0:{String(i * 30).padStart(2, "0")}–{i === 3 ? "2:00" : `${Math.floor(((i + 1) * 30) / 60)}:${String(((i + 1) * 30) % 60).padStart(2, "0")}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              <small>Fırçalama tekniği ve süresi için diş hekiminizin önerisini esas alın.</small>
            </p>
          </>
        ),
      },
    ],
    sss: [{ question: "Dişler kaç dakika fırçalanmalı?", answer: "Diş hekimleri günde en az iki kez, ikişer dakika fırçalamayı önerir; birinin akşam yatmadan önce yapılması önerilir." }],
  },
  240: {
    aile: "spor",
    giris: "4 dakika, bir Tabata turunun toplam süresidir: 8 kez 20 saniye tam güçle çalışma ve 10 saniye dinlenme.",
    bolumler: [
      {
        id: "tabata",
        baslik: "Tabata: 4 dakikada 8 tur",
        icerik: (
          <>
            <p>
              Düzen, Izumi Tabata ve ekibinin 1996&apos;da yayımladığı bisiklet ergometresi çalışmasından adını alır. Asıl çalışmada 20 saniyelik
              bölümler çok yüksek yoğunlukta yapılmıştır; günümüzde 20/10 düzenindeki her antrenmana Tabata denir.
            </p>
            <TabataTurlari />
            <p>
              Çalışma ve dinlenmeyi ayrı ayrı sayan <Link href="/tabata-zamanlayici">Tabata zamanlayıcı</Link> ile turları elle takip
              etmeniz gerekmez.
            </p>
          </>
        ),
      },
    ],
    sss: [{ question: "Tabata kaç dakika?", answer: "Bir Tabata turu 8 × (20 saniye çalışma + 10 saniye dinlenme) = 4 dakikadır." }],
  },
  300: {
    aile: "odak",
    giris: "5 dakika, Pomodoro tekniğinde her 25 dakikalık çalışmadan sonra verilen kısa moladır.",
    bolumler: [
      {
        id: "mola",
        baslik: "5 dakikalık mola Pomodoro'da nereye düşer?",
        icerik: (
          <>
            <p>
              Dört <Link href={yol(1500)}>25 dakikalık</Link> çalışmanın arasına üç kez 5 dakika mola girer; dördüncü turdan sonra 15–30 dakikalık
              uzun mola verilir. 09:00&apos;da başlayan bir tur:
            </p>
            <PomodoroProgrami />
            <p>Molada ekrandan uzaklaşmak, su içmek ya da kısa bir yürüyüş yapmak çalışmaya dönmeyi kolaylaştırır.</p>
          </>
        ),
      },
    ],
    sss: [{ question: "Pomodoro'da kısa mola kaç dakika?", answer: "Her 25 dakikalık çalışmadan sonra 5 dakika; dört turdan sonra 15–30 dakika uzun mola verilir." }],
  },
  360: {
    aile: "mutfak",
    giris: "6 dakika, kayısı kıvamında yumurta için kurulan süredir: beyazı katılaşır, sarısının ortası yumuşak ve koyu kalır.",
    bolumler: [
      {
        id: "yumurta",
        baslik: "6 dakikada kayısı kıvamında yumurta",
        icerik: (
          <>
            <ol className="zm-adimlar">
              <li>Suyu kaynatın, yumurtayı kaşıkla yavaşça bırakın ve zamanlayıcıyı başlatın.</li>
              <li>Suyu orta-yüksek ateşte hafif kaynar tutun; fokurdayan su kabuğu çatlatabilir.</li>
              <li>6 dakika dolunca hemen soğuk suya alın; sarısının pişmesi durur.</li>
            </ol>
            <YumurtaTablosu vurgu={360} />
          </>
        ),
      },
    ],
    sss: [{ question: "Kayısı kıvamında yumurta kaç dakika?", answer: "Su kaynadıktan sonra buzdolabından çıkmış orta boy yumurta için yaklaşık 6 dakika." }],
  },
  420: {
    aile: "spor",
    giris: "7 dakika, 2013'te yayımlanan ve 12 hareketten oluşan 7 dakika antrenmanının adıdır. Mutfakta ise orta-katı yumurtanın süresidir.",
    bolumler: [
      {
        id: "antrenman",
        baslik: "7 dakika antrenmanı",
        icerik: (
          <>
            <p>
              ACSM Health &amp; Fitness Journal&apos;daki makalede (Klika ve Jordan, 2013) 12 hareketin her biri 30 saniye yapılır, aralarına 10
              saniye dinlenme konur. Hareketler arasında jumping jack, duvar oturuşu, şınav, mekik, sandalyeye basamak, squat, triceps dips,
              plank, yerinde diz çekme, lunge ve yan plank yer alır.
            </p>
            <AralikTablosu vurgu={30} />
            <p>
              Dinlenmeler dahil 12 hareket 7 dakika 50 saniye sürer; adı yuvarlanmış süreden gelir. Hareket süresi için{" "}
              <Link href={yol(30)}>30 saniye zamanlayıcı</Link>.
            </p>
          </>
        ),
      },
      {
        id: "yumurta",
        baslik: "7 dakikada orta-katı yumurta",
        icerik: <YumurtaTablosu vurgu={420} />,
      },
    ],
    sss: [{ question: "7 dakika antrenmanı kaç hareket?", answer: "12 hareket; her biri 30 saniye, aralarda 10 saniye dinlenme ile yaklaşık 7–8 dakika." }],
  },
  540: {
    aile: "mutfak",
    giris: "9 dakika, tamamen katı haşlanmış yumurta için kurulan süredir: sarısı tamamen pişer ve dilimlenirken dağılmaz.",
    bolumler: [
      {
        id: "yumurta",
        baslik: "9 dakikada katı yumurta",
        icerik: (
          <>
            <ol className="zm-adimlar">
              <li>Yumurtayı kaynar suya bırakıp zamanlayıcıyı başlatın.</li>
              <li>9 dakika dolunca soğuk suya alın ve birkaç dakika bekletin.</li>
              <li>Kabuğu geniş uçtan soymaya başlayın; soğuyan yumurta daha kolay soyulur.</li>
            </ol>
            <YumurtaTablosu vurgu={540} />
            <p>
              <small>Uzun pişirilen yumurtada sarının çevresinde görülen yeşilimsi halka zararsızdır, süreyi kısaltınca azalır.</small>
            </p>
          </>
        ),
      },
    ],
    sss: [{ question: "Katı yumurta kaç dakika haşlanır?", answer: "Su kaynadıktan sonra buzdolabından çıkmış orta boy yumurta için yaklaşık 9 dakika; büyük yumurtada 10 dakika." }],
  },
  600: {
    aile: "odak",
    giris: "10 dakika, lisede iki ders arasındaki teneffüsün en kısa süresidir. 50 dakika çalışıp 10 dakika mola veren çalışma düzeninin de molasıdır.",
    bolumler: [
      {
        id: "teneffus",
        baslik: "Okulda 10 dakikalık teneffüs",
        icerik: (
          <>
            <DersSureleri vurgu={600} />
            {MEB_NOTU}
          </>
        ),
      },
      {
        id: "elli-on",
        baslik: "50 dakika çalışma, 10 dakika mola",
        icerik: (
          <p>
            Pomodoro&apos;nun 25/5 düzeni kısa gelenler süreyi ikiye katlar: <Link href={yol(3000)}>50 dakika</Link> çalışma ve 10 dakika mola.
            Bir saatlik dilimler halinde planlamak kolaylaşır; günde dört dilim dört saatlik odaklı çalışma eder.
          </p>
        ),
      },
    ],
    sss: [{ question: "Teneffüs kaç dakika?", answer: "MEB yönetmeliğine göre lisede en az 10 dakika; tekli eğitim yapan ilkokul ve ortaokullarda en az 15 dakika, bir teneffüs en az 20 dakikadır." }],
  },
  900: {
    aile: "odak",
    giris: "15 dakika, tekli eğitim yapan ilkokul ve ortaokullarda teneffüsün en kısa süresidir. Pomodoro'da da uzun molanın alt sınırıdır.",
    bolumler: [
      {
        id: "teneffus",
        baslik: "İlkokul ve ortaokulda teneffüs",
        icerik: (
          <>
            <p>2023&apos;te değişen yönetmelikle tekli eğitim yapan ilkokul ve ortaokullarda teneffüsler uzadı:</p>
            <DersSureleri vurgu={900} />
            {MEB_NOTU}
          </>
        ),
      },
      {
        id: "pomodoro",
        baslik: "Pomodoro'da uzun mola",
        icerik: (
          <p>
            Dört <Link href={yol(1500)}>25 dakikalık</Link> çalışmadan sonra 15–30 dakika uzun mola verilir. 15 dakika en kısa uzun moladır;
            daha uzun bir ara için <Link href={yol(1200)}>20 dakika</Link> ya da <Link href={yol(1800)}>30 dakika</Link>.
          </p>
        ),
      },
    ],
    sss: [{ question: "İlkokulda teneffüs kaç dakika?", answer: "Tekli eğitim yapan ilkokul ve ortaokullarda teneffüsler en az 15 dakika, bunlardan biri en az 20 dakikadır (2023 yönetmelik değişikliği)." }],
  },
  1200: {
    aile: "odak",
    giris: "20 dakika, tekli eğitim yapan ilkokul ve ortaokullarda en az bir teneffüsün süresidir. Pomodoro'da uzun mola olarak da sık seçilir.",
    bolumler: [
      {
        id: "teneffus",
        baslik: "Okulda 20 dakikalık uzun teneffüs",
        icerik: (
          <>
            <DersSureleri vurgu={1200} />
            {MEB_NOTU}
          </>
        ),
      },
      {
        id: "pomodoro",
        baslik: "Pomodoro turu ve 20 dakikalık uzun mola",
        icerik: (
          <>
            <p>Dört pomodorodan sonra 20 dakika mola verildiğinde bir tur tam 2 saat sürer:</p>
            <PomodoroProgrami />
          </>
        ),
      },
    ],
    sss: [{ question: "Uzun teneffüs kaç dakika?", answer: "Tekli eğitim yapan ilkokul ve ortaokullarda teneffüslerden biri en az 20 dakikadır." }],
  },
  1800: {
    aile: "spor",
    giris:
      "30 dakika, Dünya Sağlık Örgütü'nün yetişkinler için önerdiği haftalık en az 150 dakika orta yoğunlukta hareketin günlük karşılığıdır: haftada 5 gün, 30'ar dakika.",
    bolumler: [
      {
        id: "hareket",
        baslik: "Haftada 150 dakikayı günlere bölmek",
        icerik: (
          <>
            <p>DSÖ yetişkinlere haftada 150–300 dakika orta yoğunlukta (tempolu yürüyüş gibi) fiziksel aktivite önerir. 150 dakikanın bölünüşü:</p>
            <div className="conversion-table-wrap">
              <table className="conversion-table zm-tablo">
                <thead>
                  <tr>
                    <th scope="col">Haftada</th>
                    <th scope="col">Günde</th>
                    <th scope="col">Tempolu yürüyüşle (5 km/sa)</th>
                  </tr>
                </thead>
                <tbody>
                  {[3, 5, 7].map((g) => {
                    const dk = Math.round(150 / g);
                    return (
                      <tr key={g} className={g === 5 ? "is-vurgu" : undefined}>
                        <td>{g} gün</td>
                        <td>{g === 5 ? <strong>{dk} dakika</strong> : `${dk} dakika`}</td>
                        <td>{((5 * dk) / 60).toLocaleString("tr-TR", { maximumFractionDigits: 1 })} km</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ),
      },
    ],
    sss: [{ question: "Günde kaç dakika yürümek gerekir?", answer: "DSÖ yetişkinlere haftada en az 150 dakika orta yoğunlukta hareket önerir; haftada 5 gün 30 dakika bu hedefi karşılar." }],
  },
  2400: {
    aile: "odak",
    giris: "40 dakika, Türkiye'de ilkokul, ortaokul ve lisede bir ders saatinin süresidir. Ders çalışırken okul düzenini taklit etmek için de kullanılır.",
    bolumler: [
      {
        id: "ders",
        baslik: "Ders saati ve teneffüsler",
        icerik: (
          <>
            <DersSureleri vurgu={2400} />
            {MEB_NOTU}
          </>
        ),
      },
      {
        id: "plan",
        baslik: "Okul düzeniyle ders çalışmak",
        icerik: (
          <p>
            40 dakika çalışıp <Link href={yol(600)}>10 dakika</Link> mola vermek, okuldaki ders ve teneffüs ritmini evde tekrarlar. Üç ders
            ve iki mola 2 saat 20 dakika eder; sınav haftası için iyi bir başlangıçtır.
          </p>
        ),
      },
    ],
    sss: [{ question: "Okulda bir ders kaç dakika?", answer: "MEB yönetmeliklerine göre ilkokul, ortaokul ve lisede bir ders saati 40 dakikadır." }],
  },
  2700: {
    aile: "spor",
    giris: "45 dakika, futbolda bir devrenin süresidir. AYT'yi dört teste eşit böldüğünüzde her teste düşen süre de 45 dakikadır.",
    bolumler: [
      {
        id: "futbol",
        baslik: "Futbolda devre süresi",
        icerik: (
          <>
            <p>
              Oyun kurallarına göre maç ikişer 45 dakikalık iki devreden oluşur; devre arası 15 dakikayı geçemez. Hakem her devrenin sonuna
              kaybedilen süre kadar uzatma ekler.
            </p>
            <MacAkisi />
          </>
        ),
      },
      {
        id: "ayt",
        baslik: "Sınavda 45 dakikalık bölümler",
        icerik: (
          <p>
            AYT 160 soru ve <Link href={yol(10800)}>180 dakikadır</Link>; dört teste eşit bölündüğünde her test 45 dakikaya düşer.
          </p>
        ),
      },
    ],
    sss: [{ question: "Futbolda bir devre kaç dakika?", answer: "45 dakika; iki devre 90 dakikadır, devre arası en çok 15 dakikadır. Hakem kaybedilen süre kadar uzatma ekler." }],
  },
  3000: {
    aile: "odak",
    giris: "50 dakika, 50/10 çalışma düzeninin çalışma süresidir: 50 dakika odaklanma ve 10 dakika mola ile her dilim tam 1 saat eder.",
    bolumler: [
      {
        id: "elli-on",
        baslik: "50/10 düzeniyle bir çalışma günü",
        icerik: (
          <div className="conversion-table-wrap">
            <table className="conversion-table zm-tablo">
              <thead>
                <tr>
                  <th scope="col">Dilim</th>
                  <th scope="col">Çalışma</th>
                  <th scope="col">Mola</th>
                </tr>
              </thead>
              <tbody>
                {[0, 1, 2, 3].map((i) => {
                  const bas = 9 * 60 + i * 60;
                  return (
                    <tr key={i} className="is-vurgu">
                      <td>{i + 1}. dilim</td>
                      <td>
                        {saat(bas)}–{saat(bas + 50)}
                      </td>
                      <td>
                        <Link href={yol(600)}>
                          {saat(bas + 50)}–{saat(bas + 60)}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ),
      },
      {
        id: "pomodoro",
        baslik: "Pomodoro ile farkı",
        icerik: (
          <p>
            <Link href={yol(1500)}>25/5 Pomodoro</Link> kısa ve sık molalar verir; 50/10 aynı oranı (beşe bir) daha uzun bloklarla korur. Derin
            odak gerektiren işlerde ve okulda olduğu gibi saat başı düzende çalışmak isteyenlerde tercih edilir.
          </p>
        ),
      },
    ],
    sss: [{ question: "50/10 çalışma yöntemi nedir?", answer: "50 dakika tek bir işe odaklanıp 10 dakika mola vermektir; her dilim 1 saat sürer." }],
  },
  5400: {
    aile: "spor",
    giris: "90 dakika, bir futbol maçının uzatmalar hariç oyun süresidir: iki devre, 45'er dakika.",
    bolumler: [
      {
        id: "mac",
        baslik: "90 dakikalık maçın akışı",
        icerik: (
          <>
            <p>
              Devre arası en çok 15 dakika olduğundan, 90 dakikalık oyun uzatmalarla birlikte genellikle 105–115 dakikada biter. 20:00&apos;de
              başlayan bir maçta:
            </p>
            <MacAkisi />
            <p>
              Tek devre için <Link href={yol(2700)}>45 dakika zamanlayıcı</Link>.
            </p>
          </>
        ),
      },
    ],
    sss: [{ question: "Futbol maçı kaç dakika?", answer: "Oyun süresi 90 dakikadır (2 × 45). Devre arası ve uzatmalarla maç genellikle 105–115 dakika sürer." }],
  },
  7200: {
    aile: "sinav",
    giris: "2 saat (120 dakika), YKS'nin yabancı dil testi YDT'nin süresidir. İki saatlik deneme sınavı ya da uzun bir çalışma bloğu için kullanılır.",
    bolumler: [
      {
        id: "sinavlar",
        baslik: "YDT ve diğer merkezî sınavlar",
        icerik: (
          <>
            <p>YDT&apos;de 80 soru 120 dakikada çözülür; soru başına ortalama 1 dakika 30 saniye düşer.</p>
            <SinavTablosu vurgu={7200} />
            <p>
              <small>Süreler 2026 YKS (ÖSYM) ve LGS (MEB) uygulamasına göredir; her yıl sınav kılavuzundan kontrol edin.</small>
            </p>
          </>
        ),
      },
    ],
    sss: [{ question: "YDT kaç dakika?", answer: "2026 YKS'de YDT 80 soru ve 120 dakikadır (2 saat)." }],
  },
  28800: {
    aile: "uzun",
    giris: "8 saat, bir iş gününün en yaygın süresidir. Uyku için yetişkinlere önerilen 7–9 saatin de ortasına denk gelir.",
    bolumler: [
      {
        id: "is-kanunu",
        baslik: "İş Kanunu'na göre çalışma süresi",
        icerik: (
          <>
            <p>
              4857 sayılı İş Kanunu&apos;nun 63. maddesine göre haftalık çalışma süresi en çok 45 saattir ve aksi kararlaştırılmadıkça
              çalışılan günlere eşit bölünür. Taraflar farklı dağıtım yapabilir ama günlük çalışma 11 saati aşamaz.
            </p>
            <div className="conversion-table-wrap">
              <table className="conversion-table zm-tablo">
                <thead>
                  <tr>
                    <th scope="col">Haftada çalışılan gün</th>
                    <th scope="col">45 saatin günlük karşılığı</th>
                  </tr>
                </thead>
                <tbody>
                  {[5, 6].map((g) => (
                    <tr key={g}>
                      <td>{g} gün</td>
                      <td>{(45 / g).toLocaleString("tr-TR", { maximumFractionDigits: 1 })} saat</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Mesai ve fazla çalışma hesabı için <Link href="/saat-hesaplama">saat hesaplama</Link>.
            </p>
          </>
        ),
      },
      {
        id: "uyku",
        baslik: "8 saat uyku",
        icerik: (
          <p>
            ABD Ulusal Uyku Vakfı (2015) yetişkinler için gecede 7–9 saat uyku önerir. Kalkış saatinize göre yatış saati için{" "}
            <Link href="/uyku-hesaplama">uyku hesaplama</Link>.
          </p>
        ),
      },
    ],
    sss: [{ question: "Haftalık çalışma süresi kaç saat?", answer: "4857 sayılı İş Kanunu'na göre en çok 45 saattir; günlük çalışma 11 saati aşamaz." }],
  },
  86400: {
    aile: "uzun",
    giris: "24 saat, bir güneş gününün, yani Güneş'in gökyüzünde aynı noktaya iki kez gelmesi arasında geçen ortalama sürenin uzunluğudur.",
    bolumler: [
      {
        id: "gun",
        baslik: "Bir gün tam 24 saat mi?",
        icerik: (
          <>
            <p>
              Dünya yıldızlara göre kendi ekseni etrafındaki dönüşünü yaklaşık 23 saat 56 dakika 4 saniyede tamamlar (yıldız günü). Dünya bu
              sırada Güneş&apos;in çevresinde de ilerlediği için Güneş&apos;i yeniden aynı noktada görmek yaklaşık 4 dakika daha sürer; saatlerimizin
              esas aldığı 24 saatlik güneş günü budur.
            </p>
            <div className="conversion-table-wrap">
              <table className="conversion-table zm-tablo">
                <tbody>
                  <tr className="is-vurgu">
                    <th scope="row">Güneş günü</th>
                    <td>
                      <strong>24 sa 0 dk 0 sn</strong>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Yıldız günü</th>
                    <td>23 sa 56 dk 4 sn</td>
                  </tr>
                  <tr>
                    <th scope="row">Fark</th>
                    <td>yaklaşık 3 dk 56 sn</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Gün doğumu ve batımına göre gündüzün uzunluğu yıl içinde değişir; <Link href="/en-uzun-gun-ve-en-kisa-gun">en uzun ve en kısa
              gün</Link> sayfasına bakabilirsiniz.
            </p>
          </>
        ),
      },
    ],
    sss: [{ question: "Dünya kendi etrafında kaç saatte döner?", answer: "Yıldızlara göre yaklaşık 23 saat 56 dakika 4 saniyede; Güneş'e göre (güneş günü) 24 saatte." }],
  },
};

export function zamanlayiciIcerigi(saniye: number): ZamanlayiciIcerik | null {
  return ICERIK[saniye] ?? null;
}
