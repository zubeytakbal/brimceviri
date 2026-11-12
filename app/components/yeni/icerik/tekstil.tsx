// /tekstil sayfasinin icerigi: iplik numarasi, kumas gramaji ve hali dugum sikligi tek sayfada.
// Sayilar cevirici ile ayni fonksiyondan (convert) uretilir.
import Link from "@/app/components/SiteLink";
import { convert } from "../../../converter/convert";
import { formatSayi } from "../sayi";
import type { BirlesikIcerik } from "./tipler";

// "yaklaşık" denen yerlerde yuvarlanmis deger.
const y = (kategori: string, deger: number, kimden: string, kime: string, basamak = 1) =>
  formatSayi(Number(convert(kategori, deger, kimden, kime).toFixed(basamak)));

export const tekstilIcerigi: BirlesikIcerik = {
  baslik: "Tekstil Birimleri: İplik Numarası (Ne, Nm, tex, denye), Kumaş Gramajı ve Halı Düğüm Sıklığı",
  aciklama:
    "İplik numarasını Ne, Nm, tex, dtex ve denye arasında, kumaş gramajını g/m², oz/yd² ve momme arasında, halı düğüm sıklığını düğüm/m², düğüm/dm² ve KPSI arasında çevirin. Penye 30/1 kaç tex, 12 oz denim kaç gram gibi örneklerle.",
  h1: "Tekstil Birimleri Çevirici",
  ozet: (
    <>
      Tekstilde inceliği ve ağırlığı anlatan üç ölçü vardır: ipliğin numarası, kumaşın metrekare ağırlığı (gramaj) ve
      halının düğüm sıklığı. Her birinin Avrupa, İngiliz ve Amerikan kökenli ayrı birimleri olduğu için tedarikçi
      kataloglarında aynı ürün farklı sayılarla karşınıza çıkar. Aşağıdaki çeviriciler bu sayıları birbirine çevirir.
    </>
  ),
  giris: [],
  parcalar: [
    {
      id: "iplik",
      kategori: "iplik-numarasi",
      sekme: "İplik numarası",
      baslik: "İplik numarası: Ne, Nm, tex, dtex, denye",
      govde: (
        <>
          <p>
            İplik inceliği iki ters mantıkla yazılır. <strong>Ağırlık sistemlerinde</strong> (tex, desiteks, denye)
            belli uzunluktaki ipliğin gram cinsinden ağırlığı verilir: 1 tex, 1.000 metresi 1 gram gelen iplik; 1 denye
            ise 9.000 metresi 1 gram gelen ipliktir. Sayı büyüdükçe iplik kalınlaşır. <strong>Uzunluk
            sistemlerinde</strong> (Nm, Ne) ise bir gramdan ya da bir pounddan kaç metre ya da kaç çile iplik çıktığı
            verilir; sayı büyüdükçe iplik incelir.
          </p>
          <p>
            Pamuk ipliğinde Türkiye&apos;de en çok İngiliz numarası (Ne) kullanılır. Tişörtlerde sık kullanılan 30/1
            penye iplik yaklaşık {y("iplik_numarasi", 30, "Ne", "tex")} tex ya da Nm{" "}
            {y("iplik_numarasi", 30, "Ne", "Nm", 0)} eder. Bölü işaretinden sonraki sayı kat sayısıdır: 20/2 iki kat
            Ne 20 ipliğin bükülmesiyle elde edilir ve toplam kalınlığı yaklaşık Ne 10 ipliğe eşittir. Sentetik
            filamentlerde (polyester, naylon) ise denye ve desiteks kullanılır: 150 denye polyester yaklaşık{" "}
            {y("iplik_numarasi", 150, "den", "dtex", 0)} dtex&apos;tir.
          </p>
          <p>
            Akılda tutulacak üç eşitlik: denye = 9 × tex, Nm × tex = 1.000 ve Ne × tex ≈ 590,5. Yün iplikte kamgarn
            numarası (Nek), keten iplikte lea numarası (Nl) da aynı uzunluk mantığıyla çalışır. Uluslararası ISO 1144
            standardı bütün iplikler için tex sistemini önerir.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "Ne", deger: 30 },
        gruplar: [
          { ad: "Uzunluk sistemi", birimler: ["Ne", "Nm"] },
          { ad: "Ağırlık sistemi", birimler: ["tex", "dtex", "den"] },
          { ad: "Yün ve keten", birimler: ["Nek", "Nl"] },
        ],
      },
      tablo: {
        baslik: "Sık kullanılan pamuk iplik numaraları",
        birimler: ["Ne", "Nm", "tex", "den"],
        degerler: [10, 16, 20, 24, 30, 36, 40, 50, 60, 80],
      },
    },
    {
      id: "gramaj",
      kategori: "gramaj",
      sekme: "Kumaş gramajı",
      baslik: "Kumaş gramajı: g/m², oz/yd², momme",
      govde: (
        <>
          <p>
            Gramaj, kumaşın bir metrekaresinin gram cinsinden ağırlığıdır (g/m², İngilizce kısaltmasıyla GSM). Aynı
            ölçü kâğıtta da kullanılır: fotokopi kâğıdı genellikle 80 g/m²&apos;dir. Kumaşta gramaj kalınlık ve
            dökümlülük hakkında fikir verir: ince yazlık tişört kumaşları düşük, sweatshirt kumaşları yüksek gramajlıdır.
          </p>
          <p>
            Kot (denim) kumaşı Amerikan usulüyle yardakare başına ons ile satılır: 12 oz denim yaklaşık{" "}
            {y("gramaj", 12, "oz/yd²", "g/m²", 0)} g/m², 14 oz denim yaklaşık {y("gramaj", 14, "oz/yd²", "g/m²", 0)}{" "}
            g/m² eder. İpekte ise Japon kökenli momme birimi kullanılır: 1 momme yaklaşık{" "}
            {y("gramaj", 1, "mm (momme)", "g/m²", 2)} g/m², 19 momme ipek yaklaşık{" "}
            {y("gramaj", 19, "mm (momme)", "g/m²", 0)} g/m²&apos;dir.
          </p>
          <p>
            Dikkat: Toptan kumaş satışında &quot;metre ağırlığı&quot; (g/mt) da kullanılır. Bu, bir metre topun
            ağırlığıdır ve kumaşın enine bağlıdır: 180 g/m² gramajlı ve 1,5 m enindeki kumaşın bir metresi 180 × 1,5 =
            270 gram gelir. Metre ağırlığını gramaja çevirmek için en (metre cinsinden) ile bölün.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "g/m²", deger: 180 },
        gruplar: [
          { ad: "Metrik", birimler: ["g/m²", "kg/m²"] },
          { ad: "Amerikan ve İngiliz", birimler: ["oz/yd²", "oz/ft²"] },
          { ad: "İpek", birimler: ["mm (momme)"] },
        ],
      },
      tablo: {
        baslik: "Gramaj karşılık tablosu",
        birimler: ["g/m²", "oz/yd²", "mm (momme)"],
        degerler: [80, 120, 140, 160, 180, 200, 250, 300, 400],
      },
    },
    {
      id: "hali",
      kategori: "hali-dugum-sikligi",
      sekme: "Halı düğüm sıklığı",
      baslik: "Halı düğüm sıklığı: düğüm/m², düğüm/dm², KPSI",
      govde: (
        <>
          <p>
            El dokuması halının inceliği, belli bir alandaki düğüm sayısıyla ölçülür. Türkiye&apos;de sıklık çoğu zaman
            desimetrekare (10 × 10 cm) üzerinden &quot;40 × 40&quot; gibi yazılır: enine 40, boyuna 40 düğüm, yani
            desimetrekarede 1.600 düğüm. Bu da metrekarede{" "}
            {formatSayi(convert("hali_dugum", 1600, "düğüm/dm²", "düğüm/m²"))} düğüm eder. Sayı büyüdükçe desen
            daha ince işlenebilir ve dokuma süresi uzar.
          </p>
          <p>
            İran halıları ve yabancı açık artırma kataloglarında sıklık inçkare başına düğüm (KPSI) ile verilir: 1 KPSI
            yaklaşık {y("hali_dugum", 1, "KPSI", "düğüm/dm²")} düğüm/dm²&apos;dir. Yani 40 × 40 sıklığındaki bir halı
            yaklaşık {y("hali_dugum", 1600, "düğüm/dm²", "KPSI", 0)} KPSI eder. En ince ipek halılarda santimetrekareye
            100 düğüme, yani metrekareye 1 milyon düğüme varan sıklıklar görülür.
          </p>
          <p>
            Makine halısı ilanlarındaki &quot;sıklık&quot; değeri de çoğu zaman metrekaredeki ilmek sayısıdır. Ancak
            sıklık tek başına kaliteyi göstermez; hav yüksekliği, iplik cinsi (yün, ipek, polipropilen) ve dokuma
            tekniği de en az onun kadar önemlidir.
          </p>
        </>
      ),
      cevirici: {
        baslangic: { birim: "düğüm/dm²", deger: 1600 },
        gruplar: [
          { ad: "Metrik", birimler: ["düğüm/m²", "düğüm/dm²", "düğüm/cm²"] },
          { ad: "İnç ve fit", birimler: ["KPSI", "düğüm/ft²"] },
        ],
      },
      tablo: {
        baslik: "Halı düğüm sıklığı karşılık tablosu",
        birimler: ["düğüm/dm²", "düğüm/m²", "KPSI"],
        degerler: [900, 1600, 2500, 3600, 4900, 6400, 10000],
      },
    },
  ],
  bolumler: [],
  ilgili: [
    { href: "/uzunluk", ad: "Uzunluk çevirici" },
    { href: "/alan", ad: "Alan çevirici" },
    { href: "/kutle", ad: "Kütle çevirici" },
  ],
  sss: [
    {
      question: "30/1 penye iplik kaç tex?",
      answer: `Ne 30 yaklaşık ${y("iplik_numarasi", 30, "Ne", "tex")} tex, Nm ${y("iplik_numarasi", 30, "Ne", "Nm", 0)} ve ${y("iplik_numarasi", 30, "Ne", "den", 0)} denye eder. "/1" tek katlı iplik demektir.`,
    },
    {
      question: "Denye ile tex arasındaki fark nedir?",
      answer: "İkisi de ağırlık sistemidir. Tex 1.000 metrenin, denye 9.000 metrenin gram ağırlığıdır. Bu yüzden denye değeri tex değerinin 9 katıdır.",
    },
    {
      question: "Ne numarası büyüdükçe iplik kalınlaşır mı?",
      answer: "Hayır, incelir. Ne ve Nm uzunluk sistemleridir; aynı ağırlıktan daha fazla uzunluk çıkması daha ince iplik demektir. Tex ve denyede ise büyük sayı kalın ipliktir.",
    },
    {
      question: "12 oz denim kaç g/m²?",
      answer: `12 oz/yd² yaklaşık ${y("gramaj", 12, "oz/yd²", "g/m²", 0)} g/m² eder. 1 oz/yd² yaklaşık ${y("gramaj", 1, "oz/yd²", "g/m²")} g/m²'dir.`,
    },
    {
      question: "Gramaj ile metre ağırlığı aynı mı?",
      answer: "Hayır. Gramaj metrekarenin ağırlığıdır (g/m²); metre ağırlığı ise kumaşın eniyle birlikte bir metrenin ağırlığıdır. Metre ağırlığını en (m) ile bölerseniz gramajı bulursunuz.",
    },
    {
      question: "Halıda 40 × 40 sıklık ne demek?",
      answer: `Desimetrekarede enine 40, boyuna 40 düğüm vardır: 1.600 düğüm/dm², yani ${formatSayi(convert("hali_dugum", 1600, "düğüm/dm²", "düğüm/m²"))} düğüm/m².`,
    },
  ],
  kaynaklar: [
    { ad: "ISO 1144:2016, Textiles — Universal system for designating linear density (Tex System)", href: "https://www.iso.org/standard/70774.html" },
    { ad: "ISO 3801, Textiles — Woven fabrics — Determination of mass per unit length and mass per unit area" },
    { ad: "NIST, Inch-pound ve SI birimleri arasında dönüşüm faktörleri (SP 811)", href: "https://www.nist.gov/pml/special-publication-811" },
  ],
  guncelleme: "2026-11-12",
};
