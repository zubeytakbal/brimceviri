import type { ReactNode } from "react";
import { calculateBmi } from "../converter/bmiCalculator";
import { calculateBrickNeeds } from "../converter/brickCalculator";
import { calculateDateDifference } from "../converter/dateCalculator";
import { calculateElectricityConsumption } from "../converter/electricityConsumptionCalculator";
import { calculateLaminateNeeds } from "../converter/laminateCalculator";
import { calculateLengthComparisons } from "../converter/lengthComparison";
import { getMovingBoxEstimate, homeTypeOrder, type HomeType } from "../converter/movingBoxCalculator";
import { calculateNaturalGasCost } from "../converter/naturalGasCalculator";
import { calculatePregnancy } from "../converter/pregnancyCalculator";
import { calculateSleepTimes } from "../converter/sleepCalculator";
import { calculateTileNeeds } from "../converter/tileCalculator";
import { calculateVat } from "../converter/vatCalculator";
import { calculateWeightComparisons } from "../converter/weightComparison";

// Uzbek standalone tool pages: worked examples, tables computed with the same functions as the
// calculators, interpretation notes and common mistakes. Keyed by the Uzbek slug.

const n = (v: number, d = 2) => v.toLocaleString("uz-UZ", { maximumFractionDigits: d });

const UZ_MONTHS = [
  "yanvar", "fevral", "mart", "aprel", "may", "iyun",
  "iyul", "avgust", "sentyabr", "oktyabr", "noyabr", "dekabr",
];

function uzDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${y}-yil ${d}-${UZ_MONTHS[m - 1]}`;
}

function addDays(iso: string, days: number) {
  const date = new Date(`${iso}T00:00:00`);
  date.setDate(date.getDate() + days);
  const pad = (v: number) => String(v).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function Table({ head, rows }: { head: string[]; rows: Array<Array<string | number>> }) {
  return (
    <div className="conversion-table-wrap">
      <table className="conversion-table">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---- Yosh ----
const AGE_EXAMPLE = calculateDateDifference({ startDate: "1990-05-17", endDate: "2026-03-08" })!;
const AGE_SPANS: Array<[string, string, string]> = [
  ["Kabisa yilidagi fevralni o'z ichiga olgan bir yil", "2023-03-01", "2024-03-01"],
  ["Oddiy bir yil", "2024-03-01", "2025-03-01"],
  ["18 yoshga to'lish", "2008-09-01", "2026-09-01"],
  ["Mustaqillik kunidan 35 yil", "1991-09-01", "2026-09-01"],
  ["Qisqa oraliq: 15-yanvardan 10-martgacha", "2026-01-15", "2026-03-10"],
];

// ---- QQS ----
const VAT_RATE = 12;
const VAT_GROSS_EXAMPLE = calculateVat({ amount: 8_400_000, ratePercent: VAT_RATE, direction: "inclusive-to-exclusive" })!;
const VAT_NET_EXAMPLE = calculateVat({ amount: 2_500_000, ratePercent: VAT_RATE, direction: "exclusive-to-inclusive" })!;
const VAT_ROWS = [10_000, 50_000, 100_000, 560_000, 1_000_000, 5_000_000];

// ---- BMI ----
const BMI_MALE = calculateBmi({ heightCm: 172, weightKg: 78, age: 35, gender: "male", activityLevel: "moderate" })!;
const BMI_FEMALE = calculateBmi({ heightCm: 160, weightKg: 62, age: 28, gender: "female", activityLevel: "light" })!;
const BMI_HEIGHTS = [150, 155, 160, 165, 170, 175, 180, 185, 190];

// ---- Fayans ----
const BATH_WALL = 2 * (2 + 1.7) * 2.5 - 0.7 * 2;
const TILE_EXAMPLE = calculateTileNeeds({ area: BATH_WALL, tileWidthCm: 25, tileHeightCm: 40, wastePercent: 10 })!;
const TILE_BOX_M2 = 1.5;
const TILE_SIZES: Array<[number, number]> = [
  [20, 20],
  [25, 40],
  [30, 60],
  [60, 60],
  [60, 120],
];

// ---- G'isht ----
const BRICK_WALL = 6 * 2.8 - 1.5 * 1.5 - 0.9 * 2.1;
const BRICK_EXAMPLE = calculateBrickNeeds({ wallArea: BRICK_WALL, brickWidthCm: 25, brickHeightCm: 6.5, jointMm: 10, wastePercent: 5 })!;
const BRICK_SIZES: Array<[string, number, number]> = [
  ["Yakka g'isht, 250 × 120 × 65 mm (ko'rinadigan yuzi 25 × 6,5 sm)", 25, 6.5],
  ["Qalinlashtirilgan g'isht, 250 × 120 × 88 mm (25 × 8,8 sm)", 25, 8.8],
  ["Hisoblagichdagi standart qiymat (19 × 13,5 sm)", 19, 13.5],
  ["Blok, 390 × 190 × 188 mm (39 × 19 sm)", 39, 19],
];
const brickPerM2 = (w: number, h: number) => 1 / ((w / 100 + 0.01) * (h / 100 + 0.01));

// ---- Homiladorlik ----
const LMP = "2026-02-10";
const PREG_EXAMPLE = calculatePregnancy({ lastPeriodDate: LMP, referenceDate: "2026-06-15" })!;
const PREG_MILESTONES: Array<[string, number]> = [
  ["1-trimestrning oxiri (12 hafta 6 kun)", 90],
  ["20 hafta — homiladorlikning yarmi", 140],
  ["3-trimestr boshlanishi (27 hafta)", 189],
  ["37 hafta — muddatiga yetgan homiladorlik boshlanadi", 259],
  ["40 hafta — taxminiy tug'ilish sanasi", 280],
  ["42 hafta — muddatidan o'tgan homiladorlik chegarasi", 294],
];

// ---- Uzunlik / og'irlik solishtirish ----
const LENGTH_LABELS: Record<string, string> = {
  "insan-boyu": "inson bo'yi (1,7 m)",
  zurafa: "jirafa (5,5 m)",
  "sehir-otobusu": "shahar avtobusi (12 m)",
  "mavi-balina": "ko'k kit (25 m)",
  "futbol-sahasi": "futbol maydoni (105 m)",
  "eyfel-kulesi": "Eyfel minorasi (330 m)",
  "bogaz-koprusu": "Istanbuldagi 15-iyul Shahidlar ko'prigi (1560 m)",
};
const LENGTH_EXAMPLES: Array<[string, number]> = [
  ["Olimpiya basseyni uzunligi", 50],
  ["Toshkent teleminorasi balandligi", 375],
  ["Stadion yugurish yo'lagining bir aylanasi", 400],
  ["1 kilometr", 1000],
  ["Marafon masofasi", 42195],
];
const LENGTH_50 = calculateLengthComparisons(50)!;

const WEIGHT_LABELS: Record<string, string> = {
  kedi: "uy mushugi (4 kg)",
  insan: "voyaga yetgan inson (70 kg)",
  motosiklet: "mototsikl (200 kg)",
  at: "minish oti (500 kg)",
  otomobil: "yengil avtomobil (1 500 kg)",
  fil: "Afrika fili (6 000 kg)",
  "mavi-balina": "ko'k kit (150 000 kg)",
};
const WEIGHT_EXAMPLES: Array<[string, number]> = [
  ["Yangi tug'ilgan chaqaloq (taxminan)", 3.5],
  ["Bir qop un", 50],
  ["1 tonna yuk", 1000],
  ["Katta yuk mashinasidagi 20 tonna yuk", 20000],
];
const WEIGHT_1000 = calculateWeightComparisons(1000)!;

// ---- Elektr ----
const KWH_PRICE = 1000;
const AC_EXAMPLE = calculateElectricityConsumption({ powerWatt: 1000, hoursPerDay: 8, daysPerMonth: 30, kwhPrice: KWH_PRICE })!;
const APPLIANCES: Array<[string, number, number, number]> = [
  ["LED lampa", 10, 6, 30],
  ["Televizor", 100, 4, 30],
  ["Elektr choynak (kuniga 15 daqiqa)", 2000, 0.25, 30],
  ["Kir yuvish mashinasi (oyiga 12 marta)", 2000, 1, 12],
  ["Konditsioner", 1000, 8, 30],
  ["Moyli elektr isitgich", 2000, 6, 30],
];

// ---- Tabiiy gaz ----
const GAS_PRICE = 1500;
const GAS_EXAMPLE = calculateNaturalGasCost({ consumptionM3: 4763 - 4512, pricePerM3: GAS_PRICE })!;
const GAS_ROWS = [50, 100, 200, 300, 500];

// ---- Uyqu ----
const SLEEP_EXAMPLE = calculateSleepTimes({ mode: "wake-to-bedtime", timeOfDay: "06:30" })!;
const SLEEP_LATE = calculateSleepTimes({ mode: "bedtime-to-wake", timeOfDay: "23:30" })!;
const WAKE_TIMES = ["05:30", "06:00", "06:30", "07:00", "07:30", "08:00"];
const sleepAt = (wake: string, cycles: number) =>
  calculateSleepTimes({ mode: "wake-to-bedtime", timeOfDay: wake })!.options.find((o) => o.cycles === cycles)!.time;

// ---- Laminat ----
const LAM_PACK = 8 * 1.38 * 0.193;
const LAM_EXAMPLE = calculateLaminateNeeds({ area: 3.5 * 4.2, packageAreaM2: LAM_PACK, wastePercent: 10 })!;
const LAM_ROOMS: Array<[string, number, number]> = [
  ["Bolalar xonasi", 3, 3.4],
  ["Yotoqxona", 3.5, 4.2],
  ["Oshxona", 3, 3.8],
  ["Mehmonxona", 4.2, 5.6],
  ["Dahliz (koridor)", 1.4, 5],
];
const lamPacks = (area: number, waste: number) =>
  calculateLaminateNeeds({ area, packageAreaM2: LAM_PACK, wastePercent: waste })!.requiredPackageCount;

// ---- Ko'chish ----
const MOVING_LABELS: Record<HomeType, string> = {
  studio: "Studiya (bitta xona)",
  "1+1": "2 xonali (yotoqxona + mehmonxona)",
  "2+1": "3 xonali",
  "3+1": "4 xonali",
  "4+1": "5 xonali",
  "5+1": "6 xonali va undan katta",
};
const MOVING_EXAMPLE = getMovingBoxEstimate("2+1");
const VAN_BODY = 3 * 1.9 * 1.8;

export const UZBEK_TOOL_GUIDES: Record<string, ReactNode> = {
  "yosh-hisoblash": (
    <>
      <h2>Hisoblash misoli: 1990-yil 17-mayda tug&apos;ilgan odam</h2>
      <p>
        {`Maqsad sana sifatida 2026-yil 8-martni olaylik. 1990-yil 17-maydan 2026-yil 17-fevralgacha roppa-rosa ${AGE_EXAMPLE.years} yil ${AGE_EXAMPLE.months} oy o'tadi. 17-fevraldan 8-martgacha esa yana ${AGE_EXAMPLE.days} kun bor: 2026-yilning fevrali 28 kunlik, shuning uchun fevralda 11 kun, martda 8 kun qoladi. Demak natija — ${AGE_EXAMPLE.years} yil ${AGE_EXAMPLE.months} oy ${AGE_EXAMPLE.days} kun. Hisoblagich ham xuddi shu tartibda ishlaydi: avval yillar va oylar ayiriladi, kunlar yetmay qolsa, maqsad sanadan oldingi oyning kun soni qo'shib olinadi.`}
      </p>
      <p>
        {`Shu misolda jami ${n(AGE_EXAMPLE.totalDays, 0)} kun, ya'ni taxminan ${n(AGE_EXAMPLE.totalWeeks, 1)} hafta o'tgan. Keyingi tug'ilgan kun ${uzDate(AGE_EXAMPLE.nextAnniversaryDate)}, unga ${AGE_EXAMPLE.daysUntilNextAnniversary} kun qolgan.`}
      </p>

      <h2>Bir xil muddat, har xil kun soni</h2>
      <Table
        head={["Oraliq", "Boshlanish", "Tugash", "Yil, oy, kun", "Jami kun", "Jami hafta"]}
        rows={AGE_SPANS.map(([label, start, end]) => {
          const r = calculateDateDifference({ startDate: start, endDate: end })!;
          return [label, uzDate(start), uzDate(end), `${r.years} yil ${r.months} oy ${r.days} kun`, n(r.totalDays, 0), n(r.totalWeeks, 1)];
        })}
      />
      <p>
        {`Birinchi ikki qatorda ikkalasi ham "1 yil", lekin kun soni 366 va 365. Farqni 2024-yilning 29-fevrali beradi. Shu sababli kun yoki hafta bilan o'lchanadigan muddatlarda (masalan, kafolat yoki ta'til muddati) yil-oy-kun ko'rinishiga emas, jami kun soniga qarash kerak.`}
      </p>

      <h2>Natijani o&apos;qishda e&apos;tibor beriladigan joylar</h2>
      <ul>
        <li>
          {`"35 yil 9 oy" natijasi odam 35 yoshga to'lib, 36 yoshga qadam qo'yganini bildiradi. Anketa va hujjatlarda odatda to'lgan yosh, ya'ni 35 yoziladi.`}
        </li>
        <li>
          {`"Jami oy" ustuni taxminiy: to'liq oylarga qolgan kunlarning 30 ga bo'linganini qo'shadi. Oylar 28 kundan 31 kungacha bo'lgani uchun aniq muddat kerak bo'lsa, yil-oy-kun qiymatidan foydalaning.`}
        </li>
        <li>
          {`Sanani kiritishda kun va oyni almashtirib qo'ymang: 05.03 bir joyda 5-mart, boshqa joyda 3-may deb o'qiladi. Kiritgandan keyin maydonda ko'rsatilgan sanani tekshirib oling.`}
        </li>
        <li>
          {`29-fevralda tug'ilganlar uchun kabisa bo'lmagan yillarda hisoblagich keyingi tug'ilgan kunni 1-mart deb ko'rsatadi.`}
        </li>
        <li>
          {`Soat va vaqt mintaqasi hisobga olinmaydi, kunlar to'liq sanalar bo'yicha sanaladi. Pensiya, ish staji yoki ta'lim muassasasiga qabul kabi rasmiy hisob-kitoblarda tegishli tashkilotning o'z qoidalari amal qiladi.`}
        </li>
      </ul>
    </>
  ),

  "qqs-hisoblash": (
    <>
      <h2>O&apos;zbekistonda QQS stavkasi va formulalar</h2>
      <p>
        {`O'zbekistonda qo'shilgan qiymat solig'ining umumiy stavkasi 2023-yil 1-yanvardan buyon ${VAT_RATE} foiz (undan oldin 15 foiz edi). Hisoblagich shu stavkani standart qilib oladi, kerak bo'lsa boshqa stavkani qo'lda kiritish mumkin. Eksport kabi ayrim operatsiyalarga 0 foiz stavka qo'llaniladi, ba'zi tovar va xizmatlar esa QQSdan ozod. Stavka qonun bilan o'zgarishi mumkin, shuning uchun muhim hujjatlardan oldin amaldagi stavkani Soliq kodeksi va soliq.uz saytidan tekshiring.`}
      </p>
      <ul>
        <li>{`QQS qo'shish: QQS = sof summa × 0,12; jami summa = sof summa × 1,12.`}</li>
        <li>{`QQSni ajratib olish: sof summa = jami summa ÷ 1,12; QQS = jami summa × 12 ÷ 112.`}</li>
      </ul>

      <h2>Ikki misol</h2>
      <p>
        {`Do'kondagi noutbuk narxi QQS bilan ${n(8_400_000)} so'm. Sof narx ${n(8_400_000)} ÷ 1,12 = ${n(VAT_GROSS_EXAMPLE.baseAmount)} so'm, ichidagi QQS esa ${n(VAT_GROSS_EXAMPLE.vatAmount)} so'm. Tekshirish: ${n(VAT_GROSS_EXAMPLE.baseAmount)} + ${n(VAT_GROSS_EXAMPLE.vatAmount)} = ${n(VAT_GROSS_EXAMPLE.totalAmount)} so'm.`}
      </p>
      <p>
        {`Xizmat ko'rsatuvchi QQS to'lovchisi bo'lib, ishni ${n(2_500_000)} so'mdan (QQSsiz) baholadi. Hisob-fakturaga ${n(VAT_NET_EXAMPLE.vatAmount)} so'm QQS qo'shiladi va mijoz jami ${n(VAT_NET_EXAMPLE.totalAmount)} so'm to'laydi.`}
      </p>

      <h2>QQS bilan narx ichidagi soliq ulushi</h2>
      <Table
        head={["Jami summa (QQS bilan)", "Sof summa", `QQS (${VAT_RATE}%)`]}
        rows={VAT_ROWS.map((gross) => {
          const r = calculateVat({ amount: gross, ratePercent: VAT_RATE, direction: "inclusive-to-exclusive" })!;
          return [`${n(gross)} so'm`, `${n(r.baseAmount)} so'm`, `${n(r.vatAmount)} so'm`];
        })}
      />
      <p>
        {`Jadvaldan ko'rinadiki, QQS bilan narxning taxminan 10,71 foizi soliqqa to'g'ri keladi (12 ÷ 112). 12 foiz faqat sof summaga nisbatan hisoblanadi.`}
      </p>

      <h2>Ko&apos;p uchraydigan xatolar</h2>
      <ul>
        <li>
          {`Jami summadan to'g'ridan-to'g'ri 12 foizni ayirish. ${n(8_400_000)} × 0,88 = ${n(8_400_000 * 0.88)} so'm chiqadi, to'g'ri sof narx esa ${n(VAT_GROSS_EXAMPLE.baseAmount)} so'm; farq ${n(VAT_GROSS_EXAMPLE.baseAmount - 8_400_000 * 0.88)} so'm.`}
        </li>
        <li>
          {`Har bir sotuvchi QQS qo'shadi deb o'ylash. Aylanmadan olinadigan soliq to'lovchisi bo'lgan kichik korxona yoki yakka tartibdagi tadbirkor QQS to'lovchisi bo'lmasligi mumkin; bunday holda narxga QQS qo'shilmaydi.`}
        </li>
        <li>
          {`Ko'p qatorli hisob-fakturada har bir qatorni alohida yaxlitlab, keyin jamlash. Bu jami summada bir necha so'mlik farq beradi; qaysi usul qo'llanishini buxgalteriya hisobi qoidalari belgilaydi.`}
        </li>
      </ul>
      <p>
        {`Hisoblagich soliq maslahati emas, arifmetik yordamchi. Soliq majburiyatlari bo'yicha savollarda Davlat soliq qo'mitasi yoki buxgalterga murojaat qiling.`}
      </p>
    </>
  ),

  "bmi-hisoblash": (
    <>
      <h2>Formulalar va hisoblash misoli</h2>
      <p>
        {`BMI = vazn (kg) ÷ bo'y (m)². Asosiy almashinuv (dam olish holatida sarflanadigan energiya) Mifflin–St Jeor formulasi bilan hisoblanadi: erkaklar uchun 10 × vazn + 6,25 × bo'y (sm) − 5 × yosh + 5, ayollar uchun oxirida +5 o'rniga −161. Kunlik ehtiyoj asosiy almashinuvni faollik koeffitsientiga (1,2 dan 1,9 gacha) ko'paytirib topiladi.`}
      </p>
      <p>
        {`Misol: 35 yoshli erkak, bo'yi 172 sm, vazni 78 kg, haftasiga 3–5 kun mashq qiladi. 1,72² = 2,9584, demak BMI = 78 ÷ 2,9584 = ${n(BMI_MALE.bmi, 1)}, bu "ortiqcha vazn" oralig'iga tushadi. Asosiy almashinuv 780 + 1 075 − 175 + 5 = ${n(BMI_MALE.basalMetabolicRate, 0)} kkal, kunlik ehtiyoj ${n(BMI_MALE.basalMetabolicRate, 0)} × 1,55 ≈ ${n(BMI_MALE.dailyCalorieNeed, 0)} kkal.`}
      </p>
      <p>
        {`Ikkinchi misol: 28 yoshli ayol, 160 sm, 62 kg, haftasiga 1–3 kun mashq. BMI = ${n(BMI_FEMALE.bmi, 1)} (normal), asosiy almashinuv ${n(BMI_FEMALE.basalMetabolicRate, 0)} kkal, kunlik ehtiyoj ${n(BMI_FEMALE.basalMetabolicRate, 0)} × 1,375 ≈ ${n(BMI_FEMALE.dailyCalorieNeed, 0)} kkal.`}
      </p>

      <h2>Bo&apos;yga qarab vazn oraliqlari</h2>
      <Table
        head={["Bo'y", "Normal (18,5–24,9)", "Ortiqcha vazn (25–29,9)", "Semizlik (30 va undan yuqori)"]}
        rows={BMI_HEIGHTS.map((h) => {
          const m2 = (h / 100) ** 2;
          return [`${h} sm`, `${n(18.5 * m2, 1)}–${n(25 * m2, 1)} kg`, `${n(25 * m2, 1)}–${n(30 * m2, 1)} kg`, `${n(30 * m2, 1)} kg dan`];
        })}
      />
      <p>
        {`Chegaralar Jahon sog'liqni saqlash tashkiloti (JSST) voyaga yetganlar uchun belgilagan toifalarga mos: 18,5 dan past — vazn yetishmovchiligi, 18,5–24,9 — normal, 25–29,9 — ortiqcha vazn, 30 va undan yuqori — semizlik. JSST ekspertlar maslahati (2004) Osiyo aholisida qandli diabet va yurak-qon tomir kasalliklari xavfi pastroq BMI qiymatlarida oshishi mumkinligini qayd etgan; shuning uchun 23–25 oralig'idagi natijani ham e'tiborsiz qoldirmaslik kerak.`}
      </p>

      <h2>Cheklovlar: bu skrining, tashxis emas</h2>
      <ul>
        <li>{`BMI yog' va mushak massasini ajratmaydi: sportchi yoki og'ir jismoniy mehnat qiluvchida u ortiqcha vazn ko'rsatishi mumkin.`}</li>
        <li>{`Hisoblagich 18 yoshdan kattalar uchun. Bolalar va o'smirlarda BMI yosh va jinsga qarab JSST o'sish jadvallari bo'yicha baholanadi.`}</li>
        <li>{`Homiladorlik davrida va keksa yoshda natija boshqacha talqin qilinadi.`}</li>
        <li>{`Kaloriya ehtiyoji o'rtacha odam uchun taxmin; haqiqiy sarf bir necha yuz kkal farq qilishi mumkin.`}</li>
      </ul>
      <p>
        {`Natija sizni xavotirga solsa yoki tez vazn yo'qotish yoki ortishi kuzatilsa, shifokorga murojaat qiling. Manbalar: JSST, "Obesity and overweight" ma'lumotnomasi; WHO Expert Consultation, The Lancet, 2004; Mifflin M. D. va boshq., American Journal of Clinical Nutrition, 1990.`}
      </p>
    </>
  ),

  "fayans-hisoblash": (
    <>
      <h2>Hisoblash misoli: hammom devorlari</h2>
      <p>
        {`Hammom 2,0 × 1,7 m, kafel shiftgacha, ya'ni 2,5 m balandlikkacha qoplanadi. Devorlar perimetri 2 × (2,0 + 1,7) = 7,4 m, maydoni 7,4 × 2,5 = 18,5 m². Eshik (0,7 × 2,0 = 1,4 m²) ayirilsa, ${n(BATH_WALL)} m² qoladi. 25 × 40 sm kafelning bitta donasi ${n(TILE_EXAMPLE.tileAreaM2, 3)} m². 10 foiz zaxira bilan ${n(TILE_EXAMPLE.requiredAreaWithWaste)} m² kerak, bu ${n(TILE_EXAMPLE.requiredAreaWithWaste)} ÷ ${n(TILE_EXAMPLE.tileAreaM2, 3)} = ${TILE_EXAMPLE.requiredTileCount} dona. Qutida ${n(TILE_BOX_M2)} m² bo'lsa, ${n(TILE_EXAMPLE.requiredAreaWithWaste)} ÷ ${n(TILE_BOX_M2)} = ${n(TILE_EXAMPLE.requiredAreaWithWaste / TILE_BOX_M2)}, ya'ni ${Math.ceil(TILE_EXAMPLE.requiredAreaWithWaste / TILE_BOX_M2)} quti olinadi.`}
      </p>
      <p>
        {`Hisoblagich maydonni m² da, kafel o'lchamini sm da so'raydi. Vanna yoki dush kabinasi orqasidagi qoplanmaydigan joylarni hisobdan chiqarish mumkin, lekin keyinchalik almashtirish uchun bir-ikki dona kafel ortib qolgani yaxshi.`}
      </p>

      <h2>10 m² uchun kerakli kafel soni</h2>
      <Table
        head={["Kafel o'lchami", "Bir dona maydoni", "10% zaxira bilan", "15% zaxira bilan (diagonal)"]}
        rows={TILE_SIZES.map(([w, h]) => {
          const a = calculateTileNeeds({ area: 10, tileWidthCm: w, tileHeightCm: h, wastePercent: 10 })!;
          const b = calculateTileNeeds({ area: 10, tileWidthCm: w, tileHeightCm: h, wastePercent: 15 })!;
          return [`${w} × ${h} sm`, `${n(a.tileAreaM2, 3)} m²`, `${a.requiredTileCount} dona`, `${b.requiredTileCount} dona`];
        })}
      />
      <p>
        {`Kafel kattalashgan sari dona soni kamayadi, lekin kesishda yo'qotiladigan bo'lak kattalashadi. Kichik xonada 60 × 120 sm kafel uchun zaxirani 15 foizdan kam olmaslik ma'qul.`}
      </p>

      <h2>Xarid qilishdan oldin</h2>
      <ul>
        <li>{`Zaxira foizi: oddiy to'g'ri terishda 10 foiz, diagonal yoki "archa" usulida, ko'p burchakli xonada 15 foiz va undan ko'p.`}</li>
        <li>{`Choklar: hisoblagich kafellar orasidagi chok kengligini hisobga olmaydi. 2–3 mm chok natijani biroz kamaytiradi, shuning uchun hisob xavfsiz tomonga og'adi.`}</li>
        <li>{`Bir partiyadan oling: qutidagi partiya (ton va kalibr) belgisi bir xil bo'lishi kerak, aks holda rang farqi devorda ko'rinib qoladi.`}</li>
        <li>{`Pol va devor alohida: pol kafeli devor kafelidan qalinroq va mustahkamroq bo'ladi, ularni bitta hisobda qo'shmang.`}</li>
        <li>{`Yelim va chok to'ldirgich sarfi kafel o'lchami va taroqli shpatel tishiga bog'liq; miqdorni qop ustidagi ishlab chiqaruvchi jadvalidan oling.`}</li>
      </ul>
    </>
  ),

  "gisht-hisoblash": (
    <>
      <h2>Hisoblagich qanday ishlaydi</h2>
      <p>
        {`G'ishtning devorda ko'rinadigan yuziga (uzunlik × balandlik) har tomondan bitta chok qalinligi qo'shiladi va bitta g'isht egallaydigan haqiqiy maydon topiladi. Devor maydoni zaxira bilan ko'paytirilib, shu maydonga bo'linadi va yuqoriga yaxlitlanadi. Hisoblagichdagi 19 × 13,5 sm standart qiymat Turkiyada keng tarqalgan teshikli g'isht o'lchami. MDH davlatlarida, jumladan O'zbekistonda, ko'p ishlatiladigan GOST 530 bo'yicha yakka g'isht 250 × 120 × 65 mm; uni yotqizib tersangiz, uzunligiga 25 sm, balandligiga 6,5 sm kiritasiz.`}
      </p>

      <h2>Misol: derazali va eshikli devor</h2>
      <p>
        {`Devor 6 m uzunlikda, 2,8 m balandlikda: 16,8 m². Undan 1,5 × 1,5 m deraza (2,25 m²) va 0,9 × 2,1 m eshik (1,89 m²) ayiriladi, ${n(BRICK_WALL)} m² qoladi. Yakka g'isht va 10 mm chok bilan bitta g'isht (0,25 + 0,01) × (0,065 + 0,01) = ${n(BRICK_EXAMPLE.brickUnitAreaM2, 4)} m² egallaydi. 5 foiz zaxira bilan ${n(BRICK_EXAMPLE.requiredAreaWithWaste, 3)} m² ÷ ${n(BRICK_EXAMPLE.brickUnitAreaM2, 4)} = ${BRICK_EXAMPLE.requiredBrickCount} dona. Bu yarim g'isht (120 mm) qalinlikdagi devor uchun. Devor bir g'isht (250 mm) qalinlikda bo'lsa, natija taxminan ikki barobar, ya'ni ${BRICK_EXAMPLE.requiredBrickCount * 2} dona bo'ladi.`}
      </p>

      <h2>1 m² va 10 m² devor uchun g&apos;isht soni</h2>
      <Table
        head={["G'isht turi", "1 m² da (chok 10 mm)", "10 m², 5% zaxira bilan"]}
        rows={BRICK_SIZES.map(([label, w, h]) => {
          const r = calculateBrickNeeds({ wallArea: 10, brickWidthCm: w, brickHeightCm: h, jointMm: 10, wastePercent: 5 })!;
          return [label, n(brickPerM2(w, h), 1), `${r.requiredBrickCount} dona`];
        })}
      />
      <p>
        {`Jadval faqat bitta qatlam uchun. Yakka g'isht bilan 1 m² devorga yarim g'isht qalinlikda taxminan ${n(brickPerM2(25, 6.5), 0)}, bir g'isht qalinlikda ${n(2 * brickPerM2(25, 6.5), 0)}, bir yarim g'isht qalinlikda ${n(3 * brickPerM2(25, 6.5), 0)} dona kerak bo'ladi.`}
      </p>

      <h2>Ko&apos;p uchraydigan xatolar</h2>
      <ul>
        <li>{`G'ishtning ustki yuzini (25 × 12 sm) kiritish. Natija ko'rinadigan yuzga qarab hisoblanadi; yotqizib terishda bu 25 × 6,5 sm.`}</li>
        <li>{`Chokni santimetrda kiritish. Maydon millimetrda: 1 sm emas, 10 mm.`}</li>
        <li>{`Devor qalinligini unutish: hisoblagich bitta qatlamni hisoblaydi, qalin devor uchun natijani qatlamlar soniga ko'paytiring.`}</li>
        <li>{`Deraza va eshik o'rinlarini ayirmaslik yoki, aksincha, burchaklar va kesiladigan joylar uchun zaxira qoldirmaslik. Tashish va kesishda sinadigan g'isht uchun 5–7 foiz zaxira odatiy.`}</li>
      </ul>
      <p>
        {`Natija dastlabki xarid rejasi uchun. Qorishma miqdori, armatura va yuk ko'taruvchi devor konstruksiyasi loyiha va qurilish me'yorlari bo'yicha mutaxassis tomonidan aniqlanadi.`}
      </p>
    </>
  ),

  "homiladorlik-haftasi-hisoblash": (
    <>
      <h2>Hisoblash qoidasi va misol</h2>
      <p>
        {`Homiladorlik muddati so'nggi hayzning birinchi kunidan (SHBK) hisoblanadi, urug'lanish kunidan emas. Taxminiy tug'ilish sanasi SHBK ga 280 kun (40 hafta) qo'shib topiladi; bu Negele qoidasiga asoslangan va 28 kunlik muntazam sikl hamda 14-kunda ovulyatsiya bo'lishini nazarda tutadi.`}
      </p>
      <p>
        {`Misol: SHBK ${uzDate(LMP)}, bugungi sana 2026-yil 15-iyun deb olaylik. Oradagi kunlar: fevralda 18, martda 31, aprelda 30, mayda 31, iyunda 15 — jami ${PREG_EXAMPLE.totalDays} kun. ${PREG_EXAMPLE.totalDays} ÷ 7 = ${PREG_EXAMPLE.weeks} hafta va ${PREG_EXAMPLE.days} kun qoldiq, ya'ni homiladorlik ${PREG_EXAMPLE.weeks} hafta ${PREG_EXAMPLE.days} kunlik va ${PREG_EXAMPLE.trimester}-trimestrda. Taxminiy tug'ilish sanasi ${uzDate(PREG_EXAMPLE.dueDate)}, unga ${PREG_EXAMPLE.daysUntilDueDate} kun qolgan.`}
      </p>

      <h2>Shu misol uchun muhim sanalar</h2>
      <Table
        head={["Bosqich", "SHBK dan kun", "Sana"]}
        rows={PREG_MILESTONES.map(([label, days]) => [label, days, uzDate(addDays(LMP, days))])}
      />
      <p>
        {`Hisoblagich 0–12 haftani 1-trimestr, 13–26 haftani 2-trimestr, 27-haftadan keyingisini 3-trimestr deb oladi. Ayrim manbalarda chegaralar bir haftaga farq qiladi. JSST ta'rifiga ko'ra 37 to'liq haftadan oldingi tug'ruq muddatidan oldingi hisoblanadi, 42 hafta va undan keyingisi esa muddatidan o'tgan homiladorlik.`}
      </p>

      <h2>Natija qachon noaniq bo&apos;ladi</h2>
      <ul>
        <li>{`Sikl muntazam bo'lmasa yoki 28 kundan ancha uzun yoki qisqa bo'lsa, ovulyatsiya boshqa kunga to'g'ri keladi va sana siljiydi.`}</li>
        <li>{`SHBK aniq esda bo'lmasa, emizish davrida yoki gormonal kontratseptivni to'xtatgandan keyin homilador bo'linsa.`}</li>
        <li>{`EKO (sun'iy urug'lantirish) holatida muddat embrion ko'chirilgan sanadan hisoblanadi.`}</li>
      </ul>
      <p>
        {`Amaliyotda muddat birinchi trimestrdagi ultratovush tekshiruvida homilaning o'lchamiga qarab aniqlashtiriladi va shifokor shu sanani asos qilib oladi (ACOG, Committee Opinion No. 700, 2017). Taxminiy sana — tug'ruq aynan shu kuni bo'ladi degani emas, ko'pincha u bir-ikki hafta oldin yoki keyin sodir bo'ladi.`}
      </p>
      <p>
        {`Bu hisoblagich ma'lumot uchun, tibbiy kuzatuv o'rnini bosmaydi. Homiladorlik gumon qilinsa yoki tasdiqlansa, oilaviy poliklinika yoki ayollar maslahatxonasida ro'yxatdan o'ting; qon ketishi, kuchli og'riq yoki homila harakati kamayishi kabi holatlarda zudlik bilan tibbiy yordamga murojaat qiling.`}
      </p>
    </>
  ),

  "uzunlik-solishtirish": (
    <>
      <h2>Solishtirish qanday hisoblanadi</h2>
      <p>
        {`Kiritilgan qiymat metrga aylantiriladi va har bir ma'lumotnoma narsaga bo'linadi: nisbat = qiymat ÷ narsaning uzunligi. Ro'yxat nisbati 1 ga eng yaqin narsadan boshlanadi. Yaqinlik ko'paytma bo'yicha o'lchanadi: 2 marta katta va 2 marta kichik narsa bir xil uzoqlikda hisoblanadi.`}
      </p>
      <p>
        {`Misol: 50 m. 50 ÷ 25 = ${n(LENGTH_50[0].ratio)}, demak 50 m ikkita ko'k kit uzunligiga teng. 50 ÷ 105 = ${n(LENGTH_50[1].ratio)}, ya'ni futbol maydonining yarmidan sal kamroq. Ikkala nisbat ham 1 dan taxminan ikki barobar uzoqda, lekin ko'k kitniki biroz yaqinroq, shuning uchun u birinchi chiqadi. 50 ÷ 12 ≈ 4,17 — to'rtta shahar avtobusidan biroz uzun.`}
      </p>

      <h2>Tanish masofalar qanday solishtiriladi</h2>
      <Table
        head={["Masofa", "Qiymat", "Eng yaqin ma'lumotnoma", "Nisbat"]}
        rows={LENGTH_EXAMPLES.map(([label, meters]) => {
          const top = calculateLengthComparisons(meters)![0];
          return [label, `${n(meters)} m`, LENGTH_LABELS[top.id], `${n(top.ratio)} marta`];
        })}
      />
      <p>
        {`Toshkent teleminorasi (375 m) Eyfel minorasidan taxminan 45 m baland. Marafon masofasi (42,195 km) esa Istanbuldagi ko'prikdan 27 baravar uzun. Kilometrlab o'lchanadigan masofalar uchun ma'lumotnomalar kam, shuning uchun bunday qiymatlarda nisbat katta chiqadi.`}
      </p>

      <h2>Natijani to&apos;g&apos;ri tushunish</h2>
      <ul>
        <li>{`Qiymatlar o'rtacha va yaxlitlangan: jirafa bo'yi 4,3–5,7 m oralig'ida bo'ladi, sahifada 5,5 m olingan. Ko'k kit uchun 25 m, futbol maydoni uchun FIFA tavsiya etgan 105 m ishlatiladi.`}</li>
        <li>{`Eyfel minorasi va teleminora uchun balandlik, avtobus va ko'prik uchun uzunlik olingan. Solishtirish faqat o'lchamni tasavvur qilish uchun, yo'nalishning ahamiyati yo'q.`}</li>
        <li>{`Birlikni tekshiring: 300 sm va 300 m orasida 100 baravar farq bor. Natija kutilganidan juda katta yoki kichik chiqsa, avval birlik tanlovini ko'ring.`}</li>
        <li>{`Aniq birlik aylantirish kerak bo'lsa (masalan, futni metrga), solishtirish emas, uzunlik konvertoridan foydalaning.`}</li>
      </ul>
    </>
  ),

  "ogirlik-solishtirish": (
    <>
      <h2>Solishtirish qanday ishlaydi</h2>
      <p>
        {`Kiritilgan og'irlik kilogrammga aylantiriladi (1 g = 0,001 kg, 1 t = 1 000 kg) va har bir ma'lumotnoma narsaga bo'linadi. Ro'yxat nisbati 1 ga eng yaqin narsadan boshlanadi. Masalan, 1 tonna: 1 000 ÷ 1 500 = ${n(WEIGHT_1000[0].ratio)}, ya'ni yengil avtomobilning uchdan ikki qismi; 1 000 ÷ 500 = ${n(WEIGHT_1000[1].ratio, 0)}, ya'ni ikkita minish oti. Avtomobil birinchi chiqadi, chunki 0,67 nisbati 1 ga 2 dan yaqinroq.`}
      </p>

      <h2>Kundalik og&apos;irliklar misolida</h2>
      <Table
        head={["Narsa", "Og'irlik", "Eng yaqin ma'lumotnoma", "Nisbat"]}
        rows={WEIGHT_EXAMPLES.map(([label, kg]) => {
          const top = calculateWeightComparisons(kg)![0];
          return [label, `${n(kg)} kg`, WEIGHT_LABELS[top.id], `${n(top.ratio)} marta`];
        })}
      />
      <p>
        {`Bir qop un (50 kg) o'rtacha odam og'irligining qariyb 71 foizi. Yuk mashinasidagi 20 tonna yuk uchta Afrika filidan og'irroq yoki yengil avtomobillar bilan hisoblaganda 13 dan ortiq mashinaga teng. Ko'k kit (150 tonna) bilan solishtirganda esa bu yuk uning atigi 13 foizini tashkil qiladi.`}
      </p>

      <h2>Ma&apos;lumotnoma qiymatlari haqida</h2>
      <ul>
        <li>{`Uy mushugi 4 kg, voyaga yetgan inson 70 kg, mototsikl 200 kg, minish oti 500 kg, yengil avtomobil 1 500 kg, Afrika fili 6 tonna, ko'k kit 150 tonna. Bular yaxlitlangan o'rtacha qiymatlar; haqiqiy hayvon yoki mashina ancha yengil yoki og'ir bo'lishi mumkin.`}</li>
        <li>{`Tonna deganda metrik tonna (1 000 kg) tushuniladi. Ingliz tilidagi manbalarda uchraydigan AQSH "short ton" (907 kg) va britan "long ton" (1 016 kg) boshqa qiymatlar.`}</li>
        <li>{`Kundalik nutqda "og'irlik" deymiz, lekin kilogramm massa birligi. Tarozida ko'rgan kilogramm ham aynan massa, shuning uchun solishtirishga ta'siri yo'q.`}</li>
        <li>{`Yuk tashish, ko'tarish moslamasi yoki ko'prik yuklamasi kabi xavfsizlikka oid hisoblarda bu sahifadan emas, hujjatdagi aniq massa va me'yorlardan foydalaning.`}</li>
      </ul>
    </>
  ),

  "elektr-tuketimi-hisoblash": (
    <>
      <h2>Formula va hisoblash misoli</h2>
      <p>
        {`Kunlik sarf (kVt·soat) = quvvat (Vt) × kuniga ishlash soati ÷ 1 000. Oylik sarf kunlik sarfni oyda ishlatilgan kunlar soniga, yillik sarf esa oylik sarfni 12 ga ko'paytirib topiladi. Narx kiritilsa, har bir qiymat 1 kVt·soat narxiga ko'paytiriladi.`}
      </p>
      <p>
        {`Misol: quvvati 1 000 Vt bo'lgan konditsioner yozda kuniga 8 soat ishlaydi. Kunlik sarf 1 000 × 8 ÷ 1 000 = ${n(AC_EXAMPLE.dailyKwh)} kVt·soat, 30 kunda ${n(AC_EXAMPLE.monthlyKwh)} kVt·soat. Misol uchun 1 kVt·soat narxini ${n(KWH_PRICE)} so'm deb olsak, oylik xarajat ${n(AC_EXAMPLE.monthlyCost!)} so'm bo'ladi. Bu raqam faqat namuna: amaldagi tarif va oylik sarf hajmiga bog'liq pog'onalarni hisob-varaqingizdan yoki elektr ta'minoti tashkilotidan tekshiring.`}
      </p>

      <h2>Uy jihozlari bo&apos;yicha namuna jadval</h2>
      <Table
        head={["Jihoz", "Quvvat", "Kuniga", "Oyda kun", "Oylik sarf", `Xarajat (${n(KWH_PRICE)} so'm/kVt·soat)`]}
        rows={APPLIANCES.map(([label, w, h, d]) => {
          const r = calculateElectricityConsumption({ powerWatt: w, hoursPerDay: h, daysPerMonth: d, kwhPrice: KWH_PRICE })!;
          return [label, `${n(w)} Vt`, `${n(h)} soat`, d, `${n(r.monthlyKwh, 1)} kVt·soat`, `${n(r.monthlyCost!, 0)} so'm`];
        })}
      />
      <p>
        {`Quvvatlar va ishlash vaqti namuna sifatida olingan. Jadvaldan ko'rinadiki, hisobga eng ko'p ta'sir qiladigani isitish va sovutish jihozlari: bitta moyli isitgich o'nlab LED lampadan ko'proq elektr sarflaydi.`}
      </p>

      <h2>Natija haqiqiy hisobdan farq qilishining sabablari</h2>
      <ul>
        <li>{`Yorliqdagi quvvat — maksimal qiymat. Konditsioner, muzlatgich va isitgich termostat bilan yonib-o'chib ishlaydi, o'rtacha sarf yorliqdagidan kam bo'ladi. Muzlatgich uchun yorliqdagi yillik kVt·soat qiymatini 12 ga bo'lib olish aniqroq.`}</li>
        <li>{`Mavsumiy jihozlar: hisoblagich yillik sarfni oylik sarf × 12 deb oladi. Konditsionerni faqat 3 oy ishlatsangiz, yillik sarf ${n(AC_EXAMPLE.yearlyKwh)} emas, ${n(AC_EXAMPLE.monthlyKwh * 3)} kVt·soat bo'ladi.`}</li>
        <li>{`Vt va kVt ni adashtirish: quvvat maydoni vattda, shuning uchun 2 kVt jihoz uchun 2 000 yoziladi. 2 yozilsa, natija 1 000 baravar kam chiqadi.`}</li>
        <li>{`Kutish rejimi: televizor, router, zaryadlagichlar o'chiq ko'ringanda ham oz-ozdan tok oladi; ular jamlanib oyiga bir necha kVt·soat bo'lishi mumkin.`}</li>
      </ul>
    </>
  ),

  "tabiiy-gaz-sarfi-hisoblash": (
    <>
      <h2>Sarfni hisoblagich ko&apos;rsatkichidan topish</h2>
      <p>
        {`Gaz hisoblagichi jami o'tgan hajmni kub metrda ko'rsatadi, shuning uchun oylik sarf — joriy va oldingi ko'rsatkich orasidagi farq. Masalan, oldingi oy oxirida 04512, bu oy oxirida 04763 yozilgan bo'lsa, sarf 4 763 − 4 512 = ${n(4763 - 4512)} m³.`}
      </p>
      <p>
        {`Misol uchun 1 m³ narxini ${n(GAS_PRICE)} so'm deb olsak, xarajat ${n(4763 - 4512)} × ${n(GAS_PRICE)} = ${n(GAS_EXAMPLE.totalCost)} so'm. Bu narx faqat hisoblash namunasi; amaldagi tarif va ijtimoiy me'yor chegaralarini gaz ta'minoti tashkilotining hisob-varag'idan oling. Energiya ekvivalenti ${n(4763 - 4512)} × 10,55 = ${n(GAS_EXAMPLE.approximateKwh, 1)} kVt·soat.`}
      </p>

      <h2>Sarf, energiya va xarajat jadvali</h2>
      <Table
        head={["Sarf", "Taxminiy energiya", `Xarajat (${n(GAS_PRICE)} so'm/m³)`, "Xarajat (2 000 so'm/m³)"]}
        rows={GAS_ROWS.map((m3) => {
          const a = calculateNaturalGasCost({ consumptionM3: m3, pricePerM3: GAS_PRICE })!;
          const b = calculateNaturalGasCost({ consumptionM3: m3, pricePerM3: 2000 })!;
          return [`${m3} m³`, `${n(a.approximateKwh, 0)} kVt·soat`, `${n(a.totalCost, 0)} so'm`, `${n(b.totalCost, 0)} so'm`];
        })}
      />
      <p>
        {`Ikkala narx ustuni ham namuna. Jadval narx o'zgarganda xarajat qanday o'sishini ko'rsatish uchun: sarf bir xil qolsa, xarajat narxga to'g'ri proporsional.`}
      </p>

      <h2>kVt·soat qiymati nimani bildiradi</h2>
      <p>
        {`Hisoblagich 1 m³ tabiiy gazni taxminan 10,55 kVt·soat issiqlik energiyasi deb oladi. Haqiqiy issiqlik qiymati gaz tarkibiga qarab o'zgaradi. Bundan tashqari, qozon yoki pech gazdagi energiyaning hammasini uyga bermaydi: foydali ish koeffitsienti 90 foiz bo'lgan qozonda ${n(4763 - 4512)} m³ dan taxminan ${n(GAS_EXAMPLE.approximateKwh * 0.9, 0)} kVt·soat foydali issiqlik olinadi. Gazli isitishni elektr isitgich yoki issiqlik nasosi bilan solishtirganda shu farqni hisobga oling.`}
      </p>

      <h2>Ko&apos;p uchraydigan xatolar</h2>
      <ul>
        <li>{`Hisoblagichdagi jami ko'rsatkichni oylik sarf deb kiritish.`}</li>
        <li>{`Qish va yozni bitta o'rtacha bilan hisoblash: isitish mavsumida sarf ovqat pishirish va issiq suv uchun ketadigan yozgi sarfdan bir necha baravar ko'p bo'ladi.`}</li>
        <li>{`Pog'onali tarifni bitta narx bilan hisoblash: me'yordan ortiq qismi boshqa narxda bo'lsa, ikki qismni alohida hisoblab qo'shing.`}</li>
      </ul>
    </>
  ),

  "uyqu-hisoblash": (
    <>
      <h2>Hisoblagich qaysi taxminlardan foydalanadi</h2>
      <p>
        {`Kechasi uyqu bir necha sikldan iborat bo'lib, har bir sikl yengil uyqu, chuqur uyqu va tush ko'riladigan (REM) bosqichlardan o'tadi. Hisoblagich bitta siklni 90 daqiqa, uxlab qolish vaqtini 15 daqiqa deb oladi va 3, 4, 5, 6 sikl uchun vaqtlarni ko'rsatadi. 5 va 6 sikl (7,5 va 9 soat) tavsiya etilgan variant sifatida belgilanadi.`}
      </p>
      <p>
        {`Misol: ertalab 06:30 da turishingiz kerak. 6 sikl 9 soat, ya'ni 540 daqiqa; unga 15 daqiqa qo'shib, 06:30 dan 555 daqiqa orqaga sanaymiz va ${SLEEP_EXAMPLE.options[3].time} chiqadi. 5 sikl uchun ${SLEEP_EXAMPLE.options[2].time}, 4 sikl uchun ${SLEEP_EXAMPLE.options[1].time}, 3 sikl uchun ${SLEEP_EXAMPLE.options[0].time}. Aksincha, 23:30 da yotsangiz, 5 sikldan keyin ${SLEEP_LATE.options[2].time} da, 6 sikldan keyin ${SLEEP_LATE.options[3].time} da uyg'onish qulay bo'ladi.`}
      </p>

      <h2>Turish vaqtiga qarab yotish vaqtlari</h2>
      <Table
        head={["Turish vaqti", "6 sikl (9 soat)", "5 sikl (7,5 soat)", "4 sikl (6 soat)"]}
        rows={WAKE_TIMES.map((wake) => [wake, sleepAt(wake, 6), sleepAt(wake, 5), sleepAt(wake, 4)])}
      />
      <p>
        {`Jadvaldagi vaqtlar to'shakka yotish vaqti; ularga uxlab qolish uchun 15 daqiqa allaqachon kiritilgan. 4 sikl (6 soat) vaqti yetmagan kunlar uchun, doimiy rejim sifatida tavsiya etilmaydi.`}
      </p>

      <h2>Cheklovlar va sog&apos;liq haqida eslatma</h2>
      <ul>
        <li>{`90 daqiqa o'rtacha qiymat. Odamlarda sikl taxminan 70 dan 120 daqiqagacha davom etadi va tun davomida o'zgaradi, shuning uchun hisoblangan vaqtni ±15 daqiqa oraliq deb qabul qiling.`}</li>
        <li>{`Uxlab qolish uchun 15 daqiqa ham taxmin. Odatda ancha tez yoki sekin uxlab qolsangiz, vaqtni shunga qarab suring.`}</li>
        <li>{`Muhimi sikllar emas, umumiy uyqu davomiyligi va muntazamligi. Amerika uyqu tibbiyoti akademiyasi va Uyqu tadqiqotlari jamiyati kattalarga muntazam ravishda kechasi kamida 7 soat uxlashni tavsiya qiladi (Watson va boshq., SLEEP, 2015). Bolalar va o'smirlarga bundan ko'proq uyqu kerak.`}</li>
        <li>{`Dam olish kunlari turish vaqtini 1–2 soatga surish dushanba kuni uyg'onishni qiyinlashtiradi; har kuni bir vaqtda turish foydaliroq.`}</li>
      </ul>
      <p>
        {`Hisoblagich rejalashtirish uchun, tibbiy tekshiruv o'rnini bosmaydi. Haftalab davom etadigan uyqusizlik, kuchli xurrak va uyqudagi nafas to'xtashlari yoki kunduzi tinmay uyqu bosishi kuzatilsa, shifokorga murojaat qiling.`}
      </p>
    </>
  ),

  "laminat-hisoblash": (
    <>
      <h2>Hisoblash misoli: 3,5 × 4,2 m yotoqxona</h2>
      <p>
        {`Pol maydoni 3,5 × 4,2 = ${n(3.5 * 4.2)} m². Paket ichidagi maydon qadoqda yozilgan bo'ladi; yozilmagan bo'lsa, taxtacha o'lchamidan topiladi. Masalan, paketda 1 380 × 193 mm o'lchamli 8 ta taxtacha bo'lsa: 1,38 × 0,193 × 8 = ${n(LAM_PACK, 3)} m². 10 foiz zaxira bilan ${n(LAM_EXAMPLE.requiredAreaWithWaste)} m² kerak, ${n(LAM_EXAMPLE.requiredAreaWithWaste)} ÷ ${n(LAM_PACK, 3)} = ${n(LAM_EXAMPLE.requiredAreaWithWaste / LAM_PACK)}, yuqoriga yaxlitlanib ${LAM_EXAMPLE.requiredPackageCount} paket olinadi.`}
      </p>
      <p>
        {`Plintus uchun xona perimetri hisoblanadi: 2 × (3,5 + 4,2) = 15,4 m. 0,9 m eshik o'rni ayirilsa, 14,5 m qoladi. Plintus ma'lum uzunlikdagi bo'laklarda sotiladi; kerakli bo'lak sonini shu uzunlikka bo'lib toping va kesish uchun bittasini ortiqcha oling.`}
      </p>

      <h2>Xonalar bo&apos;yicha paket soni</h2>
      <Table
        head={["Xona", "O'lcham", "Maydon", "Paket (10% zaxira)", "Paket (15% zaxira, diagonal)", "Plintus"]}
        rows={LAM_ROOMS.map(([label, a, b]) => [
          label,
          `${n(a)} × ${n(b)} m`,
          `${n(a * b)} m²`,
          lamPacks(a * b, 10),
          lamPacks(a * b, 15),
          `${n(2 * (a + b) - 0.9, 1)} m`,
        ])}
      />
      <p>
        {`Jadval paketda ${n(LAM_PACK, 3)} m² bo'lishini nazarda tutadi. Boshqa mahsulot uchun qadoqdagi qiymatni hisoblagichga kiriting: bir xil xona uchun paket soni bir-ikki taga farq qilishi mumkin.`}
      </p>

      <h2>Yotqizishdan oldin bilish kerak bo&apos;lgan narsalar</h2>
      <ul>
        <li>{`Bir nechta xonani yotqizsangiz, har birini alohida hisoblab yaxlitlamang. Maydonlarni qo'shib, keyin paketga bo'ling: kesilgan bo'laklar boshqa xonada ishlatiladi va bir-ikki paket tejaladi.`}</li>
        <li>{`O'rnatilgan shkaf yoki oshxona mebeli ostiga laminat yotqizilmasa, shu maydonni ayiring.`}</li>
        <li>{`Bir partiyadan oling: turli partiyadagi paketlarda rang tusi farq qilishi mumkin.`}</li>
        <li>{`Taglik (podlojka) ham pol maydoni bo'yicha olinadi, lekin rulon yoki list holida sotiladi; uning m² qiymati alohida hisoblanadi.`}</li>
        <li>{`Devor yonida qoldiriladigan kengayish oralig'i va paketlarni yotqizishdan oldin xonada qancha saqlash kerakligi ishlab chiqaruvchining yo'riqnomasida ko'rsatiladi.`}</li>
      </ul>
    </>
  ),

  "kochish-qutisi-hisoblash": (
    <>
      <h2>Raqamlar qayerdan olingan</h2>
      <p>
        {`Hisoblagich formula bilan emas, ko'chirish xizmatlari foydalanadigan o'rtacha ma'lumotnoma jadvali bilan ishlaydi. Har bir uy turi uchun kichik qutilar (kitob, idish-tovoq, og'ir buyumlar) va katta qutilar (kiyim, ko'rpa-to'shak, yengil buyumlar) soni hamda mebel bilan birga kerak bo'ladigan taxminiy kuzov hajmi berilgan.`}
      </p>
      <Table
        head={["Uy turi", "Kichik quti", "Katta quti", "Jami quti", "Taxminiy hajm", "10,3 m³ kuzov bilan qatnov"]}
        rows={homeTypeOrder.map((type) => {
          const e = getMovingBoxEstimate(type);
          return [MOVING_LABELS[type], e.smallBoxCount, e.largeBoxCount, e.smallBoxCount + e.largeBoxCount, `${e.truckVolumeM3} m³`, Math.ceil(e.truckVolumeM3 / VAN_BODY)];
        })}
      />

      <h2>Misol: 3 xonali kvartira</h2>
      <p>
        {`3 xonali kvartira (ikki yotoqxona va mehmonxona) uchun jadval ${MOVING_EXAMPLE.smallBoxCount} ta kichik va ${MOVING_EXAMPLE.largeBoxCount} ta katta quti, jami ${MOVING_EXAMPLE.smallBoxCount + MOVING_EXAMPLE.largeBoxCount} quti va taxminan ${MOVING_EXAMPLE.truckVolumeM3} m³ hajm beradi. Furgon kuzovining ichki o'lchami 3 × 1,9 × 1,8 m bo'lsa, hajmi ${n(VAN_BODY)} m³. ${MOVING_EXAMPLE.truckVolumeM3} ÷ ${n(VAN_BODY)} = ${n(MOVING_EXAMPLE.truckVolumeM3 / VAN_BODY)}, ya'ni kamida ${Math.ceil(MOVING_EXAMPLE.truckVolumeM3 / VAN_BODY)} qatnov kerak. Mebel orasida bo'sh joy qolishi tufayli kuzov hech qachon 100 foiz to'lmaydi, shuning uchun hisob chegarada bo'lsa, kattaroq mashina yoki qo'shimcha qatnovni oldindan kelishib oling.`}
      </p>

      <h2>Hisobni o&apos;z uyingizga moslash</h2>
      <ul>
        <li>{`Buyum ko'p bo'lsa (katta kutubxona, ko'p idish-tovoq, sandiq va ko'rpa-to'shak zaxirasi), bir pog'ona katta uy turini tanlang; kam bo'lsa, bir pog'ona kichigini.`}</li>
        <li>{`Kitob va idishni katta qutiga solmang: katta quti to'la kitob bilan ko'tarib bo'lmaydigan darajada og'irlashadi va tubi yirtiladi. Og'ir narsa kichik qutiga, yengil narsa katta qutiga.`}</li>
        <li>{`Hajm mebelni ham o'z ichiga oladi. Pianino, katta muzlatgich yoki burchak divan kabi yirik buyumlar bo'lsa, ularni ko'chirish xizmatiga alohida aytib qo'ying.`}</li>
        <li>{`Qutilarga xona nomi va "ehtiyot bo'ling" kabi belgilar yozing; yangi uyda qaysi quti qayerga borishini oldindan rejalashtirsangiz, yuk tushirish tezlashadi.`}</li>
        <li>{`Bu taxminiy rejalashtirish vositasi: aniq narx va mashina hajmini ko'chirish xizmati uyni ko'rib chiqib aytadi.`}</li>
      </ul>
    </>
  ),
};
