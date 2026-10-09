// أدلة موسعة لصفحات الأدوات العربية في /ar/[slug]. كل الأرقام في الأمثلة والجداول
// تُحسب هنا من دوال الحاسبات نفسها، فلا تختلف عما تعرضه الأداة أعلى الصفحة.
import type { FaqItem } from "../converter/faqSchema";
import { convert } from "../converter/convert";
import { calculatePaintNeeds, DOOR_AREA_M2, WINDOW_AREA_M2 } from "../converter/paintCalculator";
import { calculateTileNeeds } from "../converter/tileCalculator";
import { calculateBrickNeeds } from "../converter/brickCalculator";
import { calculateDateDifference } from "../converter/dateCalculator";
import { calculateVat } from "../converter/vatCalculator";
import { activityMultipliers, calculateBmi } from "../converter/bmiCalculator";
import { calculatePregnancy } from "../converter/pregnancyCalculator";
import { calculateLengthComparisons, lengthReferenceObjects } from "../converter/lengthComparison";
import { calculateWeightComparisons, weightReferenceObjects } from "../converter/weightComparison";
import { calculatePaceFromDistanceDuration } from "../converter/paceCalculator";
import { calculateAcCapacity, STANDARD_BTU_SIZES } from "../converter/acCapacityCalculator";
import { calculateElectricityConsumption } from "../converter/electricityConsumptionCalculator";
import { calculateSleepTimes } from "../converter/sleepCalculator";

export type ArabicGuideBlock =
  | { type: "paragraph"; text: string }
  | { type: "steps"; items: string[] }
  | { type: "list"; items: Array<{ term: string; text: string }> }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "notice"; text: string };

export type ArabicGuideSection = {
  title: string;
  blocks: ArabicGuideBlock[];
};

export type ArabicToolGuide = {
  sections: ArabicGuideSection[];
  faq?: FaqItem[];
  sources?: Array<{ label: string; url: string }>;
};

const n = (value: number, maximumFractionDigits = 2) =>
  new Intl.NumberFormat("ar-u-nu-latn", { maximumFractionDigits }).format(value);
const sig = (value: number) =>
  new Intl.NumberFormat("ar-u-nu-latn", { maximumSignificantDigits: 3 }).format(value);

const dateFormat = new Intl.DateTimeFormat("ar-u-nu-latn", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const formatIsoDate = (iso: string) => dateFormat.format(new Date(`${iso}T00:00:00Z`));
const addDays = (iso: string, days: number) => {
  const date = new Date(`${iso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
};

const clock = (totalSeconds: number) => {
  const seconds = Math.round(totalSeconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss}`;
};

// ---------------------------------------------------------------- الطلاء
const paintBase = { length: 4, width: 3.5, height: 2.7, doorCount: 1, windowCount: 1, coats: 2 as const, coverage: 10 };
const paintWalls = calculatePaintNeeds({ ...paintBase, includeCeiling: false })!;
const paintWithCeiling = calculatePaintNeeds({ ...paintBase, includeCeiling: true })!;
const paintFaq = calculatePaintNeeds({ ...paintBase, length: 4, width: 4, height: 3, includeCeiling: false })!;
const canText = (cans: Array<{ size: number; count: number }>) =>
  cans.map((can) => `${can.count} × ${n(can.size)} لتر`).join(" + ");
const paintRooms: Array<[string, number, number, number]> = [
  ["غرفة نوم صغيرة", 3, 3, 1],
  ["غرفة نوم رئيسية", 4.5, 4, 2],
  ["غرفة معيشة", 5, 4, 2],
  ["مجلس", 6, 4.5, 3],
  ["صالة واسعة", 7, 5, 3],
];
const windowsText = (count: number) =>
  count === 1 ? "نافذة واحدة" : count === 2 ? "نافذتان" : `${count} نوافذ`;
const paintRows = paintRooms.map(([name, length, width, windows]) => {
  const base = { length, width, height: 3, doorCount: 1, windowCount: windows, coats: 2 as const, coverage: 10 };
  const walls = calculatePaintNeeds({ ...base, includeCeiling: false })!;
  const all = calculatePaintNeeds({ ...base, includeCeiling: true })!;
  return [
    name,
    `${n(length)} × ${n(width)} م، ${windowsText(windows)}`,
    `${n(walls.netWallArea)} م²`,
    `${n(walls.litersNeeded)} لتر`,
    `${n(all.litersNeeded)} لتر`,
    canText(all.suggestedCans),
  ];
});

// ---------------------------------------------------------------- البلاط
const tileMain = calculateTileNeeds({ area: 20, tileWidthCm: 60, tileHeightCm: 60, wastePercent: 10 })!;
const tilesPerBox = 4;
const tileBoxes = Math.ceil(tileMain.requiredTileCount / tilesPerBox);
const bathArea = 2.4 * 1.8;
const tileBath = calculateTileNeeds({ area: bathArea, tileWidthCm: 30, tileHeightCm: 30, wastePercent: 15 })!;
const tileSizes: Array<[number, number]> = [
  [30, 30],
  [40, 40],
  [45, 45],
  [60, 60],
  [80, 80],
  [60, 120],
  [20, 120],
];
const tileRows = tileSizes.map(([w, h]) => {
  const straight = calculateTileNeeds({ area: 20, tileWidthCm: w, tileHeightCm: h, wastePercent: 10 })!;
  const diagonal = calculateTileNeeds({ area: 20, tileWidthCm: w, tileHeightCm: h, wastePercent: 15 })!;
  return [`${w} × ${h} سم`, `${n(straight.tileAreaM2, 4)} م²`, n(straight.requiredTileCount), n(diagonal.requiredTileCount)];
});

// ---------------------------------------------------------------- الطوب
const brickWallGross = 6 * 3;
const brickDoor = 1 * 2.1;
const brickWallNet = brickWallGross - brickDoor;
const brickBlock = calculateBrickNeeds({ wallArea: brickWallNet, brickWidthCm: 40, brickHeightCm: 20, jointMm: 10, wastePercent: 5 })!;
const brickDefault = calculateBrickNeeds({ wallArea: 20, brickWidthCm: 19, brickHeightCm: 13.5, jointMm: 10, wastePercent: 5 })!;
const brickTypes: Array<[string, number, number]> = [
  ["بلوك إسمنتي 40 × 20 سم", 40, 20],
  ["طوب أحمر بالطول (وجه 25 × 6 سم)", 25, 6],
  ["طوب أحمر بالعرض (وجه 12 × 6 سم)", 12, 6],
  ["طوب مفرغ 19 × 13.5 سم", 19, 13.5],
];
const brickRows = brickTypes.map(([name, w, h]) => {
  const noWaste = calculateBrickNeeds({ wallArea: 1, brickWidthCm: w, brickHeightCm: h, jointMm: 10, wastePercent: 0 })!;
  const tenM2 = calculateBrickNeeds({ wallArea: 10, brickWidthCm: w, brickHeightCm: h, jointMm: 10, wastePercent: 5 })!;
  return [name, `${n(noWaste.brickUnitAreaM2, 4)} م²`, n(1 / noWaste.brickUnitAreaM2, 1), n(tenM2.requiredBrickCount)];
});

// ---------------------------------------------------------------- العمر
const ageMain = calculateDateDifference({ startDate: "1990-03-15", endDate: "2026-10-09" })!;
const ageLeap = calculateDateDifference({ startDate: "2000-02-29", endDate: "2026-10-09" })!;
const GREGORIAN_YEAR_DAYS = 365.2425;
const HIJRI_YEAR_DAYS = 354.367;
const ageRows = [7, 18, 30, 40, 60, 65].map((years) => {
  const days = years * GREGORIAN_YEAR_DAYS;
  return [n(years), n(Math.round(days)), n(Math.round(days / 7)), n(days / HIJRI_YEAR_DAYS, 1)];
});

// ---------------------------------------------------------------- الضريبة
const vatSaudi = calculateVat({ amount: 1000, ratePercent: 15, direction: "exclusive-to-inclusive" })!;
const vatShelf = calculateVat({ amount: 230, ratePercent: 15, direction: "inclusive-to-exclusive" })!;
const vatUae = calculateVat({ amount: 525, ratePercent: 5, direction: "inclusive-to-exclusive" })!;
const vatRows = [100, 250, 1000, 4999, 20000].map((amount) => {
  const s = calculateVat({ amount, ratePercent: 15, direction: "exclusive-to-inclusive" })!;
  const u = calculateVat({ amount, ratePercent: 5, direction: "exclusive-to-inclusive" })!;
  return [n(amount), n(s.vatAmount), n(s.totalAmount), n(u.vatAmount), n(u.totalAmount)];
});

// ---------------------------------------------------------------- BMI
const bmiMan = calculateBmi({ heightCm: 170, weightKg: 70, age: 30, gender: "male", activityLevel: "moderate" })!;
const bmiWoman = calculateBmi({ heightCm: 160, weightKg: 68, age: 35, gender: "female", activityLevel: "light" })!;
const bmiRows = [150, 155, 160, 165, 170, 175, 180, 185, 190].map((cm) => {
  const m2 = (cm / 100) ** 2;
  return [`${cm} سم`, `${n(18.5 * m2, 1)} – ${n(24.9 * m2, 1)} كجم`, `${n(25 * m2, 1)} – ${n(29.9 * m2, 1)} كجم`, `${n(30 * m2, 1)} كجم فأكثر`];
});

// ---------------------------------------------------------------- الحمل
const pregnancyExample = calculatePregnancy({ lastPeriodDate: "2026-03-01", referenceDate: "2026-06-15" })!;
const pregnancyRows = ["2026-01-10", "2026-03-01", "2026-05-20", "2026-08-05", "2026-10-15"].map((lmp) => [
  formatIsoDate(lmp),
  formatIsoDate(addDays(lmp, 13 * 7)),
  formatIsoDate(addDays(lmp, 27 * 7)),
  formatIsoDate(addDays(lmp, 37 * 7)),
  formatIsoDate(addDays(lmp, 280)),
]);

// ---------------------------------------------------------------- مقارنة الأطوال
const lengthLabels: Record<string, string> = {
  "insan-boyu": "إنسان بالغ (متوسط الطول)",
  zurafa: "زرافة بالغة",
  "sehir-otobusu": "حافلة مدينة عادية",
  "mavi-balina": "حوت أزرق بالغ",
  "futbol-sahasi": "ملعب كرة قدم (الطول)",
  "eyfel-kulesi": "برج إيفل مع الهوائي",
  "bogaz-koprusu": "جسر شهداء 15 يوليو في إسطنبول",
};
const length50 = calculateLengthComparisons(50)!;
const ratioOf = (rows: Array<{ id: string; ratio: number }>, id: string) => rows.find((row) => row.id === id)!.ratio;
const BURJ_KHALIFA_M = 828;
const lengthBurj = calculateLengthComparisons(BURJ_KHALIFA_M)!;
const lengthRows = lengthReferenceObjects.map((ref) => [
  lengthLabels[ref.id] ?? ref.label,
  `${n(ref.meters)} م`,
  n(100 / ref.meters, 2),
  n(1000 / ref.meters, 1),
]);

// ---------------------------------------------------------------- مقارنة الأوزان
const weightLabels: Record<string, string> = {
  kedi: "قطة منزلية",
  insan: "إنسان بالغ",
  motosiklet: "دراجة نارية متوسطة",
  at: "حصان ركوب",
  otomobil: "سيارة ركاب",
  fil: "فيل إفريقي بالغ",
  "mavi-balina": "حوت أزرق بالغ",
};
const weightSuv = calculateWeightComparisons(2500)!;
const weightBag = calculateWeightComparisons(23)!;
const SHORT_TON_KG = convert("kutle", 2000, "lb", "kg");
const ELEVATOR_KG = 630;
const ELEVATOR_KG_PER_PERSON = 75;
const averageAdultKg = weightReferenceObjects.find((ref) => ref.id === "insan")!.kg;
const weightRows = weightReferenceObjects.map((ref) => [
  weightLabels[ref.id] ?? ref.label,
  `${n(ref.kg)} كجم`,
  sig(1000 / ref.kg),
  sig(23 / ref.kg),
]);

// ---------------------------------------------------------------- الجري
const paceMain = calculatePaceFromDistanceDuration(10, 50 * 60)!;
const HALF_MARATHON_KM = 21.0975;
const MARATHON_KM = 42.195;
const raceTime = (km: number) => paceMain.raceEstimates.find((race) => race.distanceKm === km)!.durationSeconds;
const RIEGEL_EXPONENT = 1.06;
const riegelMarathon = 50 * 60 * (MARATHON_KM / 10) ** RIEGEL_EXPONENT;
const MILE_KM = convert("uzunluk", 1, "mi", "km");
const paceRows = [240, 270, 300, 330, 360, 390, 420].map((pace) => {
  const result = calculatePaceFromDistanceDuration(1, pace)!;
  const time = (km: number) => clock(result.raceEstimates.find((race) => race.distanceKm === km)!.durationSeconds);
  return [`${clock(pace)} د/كم`, `${n(result.speedKmh, 1)} كم/س`, time(5), time(10), time(HALF_MARATHON_KM), time(MARATHON_KM)];
});

// ---------------------------------------------------------------- المكيف
const acMain = calculateAcCapacity({ areaM2: 20, occupantCount: 2, isSunny: true, isTopFloor: true })!;
const BTU_PER_TON = 12000;
const kwToBtu = convert("guc", 1, "kW", "BTU/h");
const tonToKw = convert("guc", BTU_PER_TON, "BTU/h", "kW");
const maxBtu = STANDARD_BTU_SIZES[STANDARD_BTU_SIZES.length - 1];
const acRows = [10, 15, 20, 25, 30, 40].map((area) => {
  const plain = calculateAcCapacity({ areaM2: area, occupantCount: 2, isSunny: false, isTopFloor: false })!;
  const hot = calculateAcCapacity({ areaM2: area, occupantCount: 2, isSunny: true, isTopFloor: true })!;
  const size = (r: typeof plain) =>
    r.totalBtu > maxBtu ? `أكثر من ${n(maxBtu)} (جهازان)` : `${n(r.suggestedCapacity)} (${n(r.suggestedCapacity / BTU_PER_TON)} طن)`;
  return [`${area} م²`, n(plain.totalBtu), size(plain), n(hot.totalBtu), size(hot)];
});

// ---------------------------------------------------------------- الكهرباء
const ILLUSTRATIVE_PRICE = 0.2;
const elecMain = calculateElectricityConsumption({ powerWatt: 1500, hoursPerDay: 2, daysPerMonth: 30, kwhPrice: ILLUSTRATIVE_PRICE })!;
const elecAc = calculateElectricityConsumption({ powerWatt: 1800, hoursPerDay: 10, daysPerMonth: 30, kwhPrice: ILLUSTRATIVE_PRICE })!;
const appliances: Array<[string, number, number, number]> = [
  ["مكيف سبليت (قدرة كهربائية 1,800 واط)", 1800, 10, 30],
  ["سخان ماء كهربائي", 2000, 1.5, 30],
  ["ثلاجة (متوسط سحب فعلي على مدار اليوم)", 100, 24, 30],
  ["غسالة ملابس", 500, 1, 12],
  ["تلفاز", 100, 5, 30],
  ["مصباح LED", 10, 6, 30],
];
const elecRows = appliances.map(([name, w, h, d]) => {
  const r = calculateElectricityConsumption({ powerWatt: w, hoursPerDay: h, daysPerMonth: d, kwhPrice: ILLUSTRATIVE_PRICE })!;
  return [name, `${n(w)} واط × ${n(h)} س × ${d} يومًا`, `${n(r.monthlyKwh, 1)} kWh`, n(r.monthlyCost ?? 0)];
});

// ---------------------------------------------------------------- النوم
const sleepAt = (wake: string) => calculateSleepTimes({ mode: "wake-to-bedtime", timeOfDay: wake })!.options;
const sleepPick = (wake: string, cycles: number) => sleepAt(wake).find((option) => option.cycles === cycles)!.time;
const sleepNow = calculateSleepTimes({ mode: "bedtime-to-wake", timeOfDay: "23:00" })!.options;
const sleepNowPick = (cycles: number) => sleepNow.find((option) => option.cycles === cycles)!.time;
const sleepRows = ["04:30", "05:30", "06:00", "06:30", "07:00", "07:30"].map((wake) => [
  wake,
  sleepPick(wake, 6),
  sleepPick(wake, 5),
  sleepPick(wake, 4),
]);

export const arabicToolGuides: Record<string, ArabicToolGuide> = {
  "paint-calculator": {
    sections: [
      {
        title: "كيف تحسب الأداة كمية الطلاء؟",
        blocks: [
          {
            type: "paragraph",
            text: `تبدأ الحاسبة بمساحة الجدران كاملة: محيط الغرفة مضروبًا في ارتفاعها، أي 2 × (الطول + العرض) × الارتفاع. بعد ذلك تطرح مساحة ثابتة لكل فتحة: ${n(DOOR_AREA_M2)} م² لكل باب و${n(WINDOW_AREA_M2)} م² لكل نافذة. إذا فعّلت خيار السقف أضيفت مساحته (الطول × العرض). يُضرب المجموع في عدد الطبقات ثم يُقسم على معدل التغطية المكتوب على العبوة بوحدة م² لكل لتر، فيظهر عدد اللترات. وفي النهاية تقترح الأداة عبوات من المقاسات الشائعة 15 و7.5 و2.5 لتر، فتبدأ بالأكبر وتكمل الباقي بالأصغر.`,
          },
          {
            type: "list",
            items: [
              { term: "الطول والعرض", text: "أبعاد أرضية الغرفة من الداخل بالمتر، تُقاس من جدار إلى جدار." },
              { term: "الارتفاع", text: "من مستوى البلاط إلى السقف. في كثير من الفلل والشقق الحديثة يقارب 3 أمتار، وفي بعض الشقق أقل من ذلك." },
              { term: "عدد الطبقات", text: "طبقتان هما المعتاد عند تغيير اللون أو على جدار جديد، وطبقة واحدة تكفي غالبًا لتجديد اللون نفسه." },
              { term: "معدل التغطية", text: "يختلف حسب نوع الدهان وسطح الجدار. اقرأه من العبوة أو النشرة الفنية للمنتج، ولا تعتمد على رقم عام." },
            ],
          },
        ],
      },
      {
        title: "مثال محلول: غرفة 4 × 3.5 م",
        blocks: [
          {
            type: "steps",
            items: [
              `مساحة الجدران الإجمالية: 2 × (4 + 3.5) × 2.7 = ${n(paintWalls.grossWallArea)} م².`,
              `باب واحد ونافذة واحدة: ${n(DOOR_AREA_M2)} + ${n(WINDOW_AREA_M2)} = ${n(paintWalls.openingsArea)} م²، فتصبح المساحة الصافية ${n(paintWalls.netWallArea)} م².`,
              `طبقتان: ${n(paintWalls.netWallArea)} × 2 = ${n(paintWalls.totalPaintedArea)} م² من الدهان الفعلي.`,
              `بمعدل تغطية 10 م²/لتر: ${n(paintWalls.totalPaintedArea)} ÷ 10 = ${n(paintWalls.litersNeeded)} لتر، أي ${canText(paintWalls.suggestedCans)}.`,
              `مع السقف تُضاف ${n(paintWithCeiling.ceilingArea)} م²، فيصبح الحساب ${n(paintWithCeiling.totalArea)} × 2 ÷ 10 = ${n(paintWithCeiling.litersNeeded)} لتر، والعبوات المقترحة ${canText(paintWithCeiling.suggestedCans)}.`,
            ],
          },
          {
            type: "paragraph",
            text: "لاحظ أن السقف وحده رفع الكمية بأكثر من الثلث في هذه الغرفة. لذلك إذا كان السقف سيُطلى بدهان مختلف، فشغّل الحاسبة مرتين: مرة للجدران دون السقف، ومرة بأبعاد السقف بمعدل تغطية دهان السقف.",
          },
        ],
      },
      {
        title: "كمية الطلاء حسب حجم الغرفة",
        blocks: [
          {
            type: "table",
            headers: ["الغرفة", "الأبعاد والفتحات", "صافي الجدران", "الجدران فقط", "مع السقف", "العبوات (مع السقف)"],
            rows: paintRows,
          },
          {
            type: "paragraph",
            text: "افترض الجدول ارتفاع 3 أمتار وبابًا واحدًا لكل غرفة وطبقتين ومعدل تغطية 10 م² لكل لتر. إذا كان دهانك يغطي 12 م² للتر مثلًا فاقسم مساحة الطلاء على 12 بدل 10، أو أدخل الرقم الصحيح في الحاسبة مباشرة.",
          },
        ],
      },
      {
        title: "أخطاء شائعة قبل الشراء",
        blocks: [
          {
            type: "list",
            items: [
              { term: "نسيان الضرب في عدد الطبقات", text: "معدل التغطية على العبوة يخص طبقة واحدة، فالجدار الذي يحتاج طبقتين يستهلك ضعف الكمية." },
              { term: "الجدار الجديد يمتص أكثر", text: "اللياسة الحديثة والأسطح المسامية تشرب الدهان، والأساس (البرايمر) يُحسب وحده بمعدل تغطيته الخاص." },
              { term: "الفتحات الكبيرة", text: "الأداة تفترض بابًا ونافذة بمقاس عادي. النافذة الواسعة بمساحة 3 م² تقارب نافذتين في الحساب، فأدخلها كذلك." },
              { term: "الألوان الداكنة", text: "الانتقال من لون داكن إلى فاتح قد يحتاج طبقة ثالثة، فاختر طبقتين في الحاسبة واحتفظ بهامش إضافي." },
              { term: "اختلاف دفعات الإنتاج", text: "اشترِ الكمية كلها من دفعة واحدة إن أمكن؛ قد يختلف اللون قليلًا بين دفعة وأخرى ويظهر الفرق على الجدار نفسه." },
            ],
          },
        ],
      },
    ],
    faq: [
      {
        question: "كم لترًا تحتاج غرفة 4 × 4 م بارتفاع 3 أمتار؟",
        answer: `بباب ونافذة وطبقتين ومعدل تغطية 10 م²/لتر، تبلغ مساحة الجدران الصافية ${n(paintFaq.netWallArea)} م² ويلزم نحو ${n(paintFaq.litersNeeded)} لتر للجدران دون السقف.`,
      },
      {
        question: "هل تشمل النتيجة الأبواب الخشبية والإطارات؟",
        answer: "لا. الحاسبة تطرح مساحة الأبواب والنوافذ من الجدار، أما طلاء الخشب والمعادن فيكون عادة بنوع مختلف من الدهان ويُحسب على حدة.",
      },
    ],
  },

  "tile-calculator": {
    sections: [
      {
        title: "طريقة الحساب وما تفترضه الأداة",
        blocks: [
          {
            type: "paragraph",
            text: "تحسب الأداة مساحة البلاطة الواحدة بالمتر المربع (العرض بالسنتيمتر ÷ 100 × الطول بالسنتيمتر ÷ 100)، ثم تزيد المساحة المطلوبة بنسبة الهدر التي تختارها، وتقسم الناتج على مساحة البلاطة وتقرّبه إلى أعلى عدد صحيح. لا تحسب الأداة عرض فواصل الترويب، وهي عادة بضعة مليمترات، فيكون العدد الناتج أكبر قليلًا من الحاجة الفعلية، وهذا في صالحك عند الشراء.",
          },
          {
            type: "list",
            items: [
              { term: "المساحة", text: "للأرضيات: الطول × العرض. للجدران: العرض × الارتفاع مطروحًا منه الأبواب والنوافذ. قسّم الغرف غير المنتظمة إلى مستطيلات واجمع مساحاتها." },
              { term: "أبعاد البلاطة", text: "بالسنتيمتر كما هي مكتوبة على الصندوق، مثل 60 × 60 أو 60 × 120." },
              { term: "نسبة الهدر", text: "يعتمد كثير من المبلطين نحو 10% للتركيب المستقيم في الغرف العادية، و15% أو أكثر للتركيب المائل أو للغرف الصغيرة كثيرة الزوايا." },
            ],
          },
        ],
      },
      {
        title: "مثال محلول: أرضية 20 م² ببلاط 60 × 60",
        blocks: [
          {
            type: "steps",
            items: [
              `مساحة البلاطة: 0.6 × 0.6 = ${n(tileMain.tileAreaM2)} م².`,
              `المساحة مع هدر 10%: 20 × 1.10 = ${n(tileMain.requiredAreaWithWaste)} م².`,
              `عدد البلاط: ${n(tileMain.requiredAreaWithWaste)} ÷ ${n(tileMain.tileAreaM2)} = ${n(tileMain.requiredAreaWithWaste / tileMain.tileAreaM2)}، ويُقرّب إلى ${n(tileMain.requiredTileCount)} بلاطة.`,
              `إذا كان الصندوق يحتوي ${tilesPerBox} بلاطات فالمطلوب ${n(tileMain.requiredTileCount)} ÷ ${tilesPerBox} = ${n(tileMain.requiredTileCount / tilesPerBox)}، أي ${tileBoxes} صندوقًا.`,
            ],
          },
          {
            type: "paragraph",
            text: `مثال أصغر: أرضية حمام 2.4 × 1.8 م مساحتها ${n(bathArea)} م². ببلاط 30 × 30 وهدر 15% بسبب القص حول المرحاض والمصرف تحتاج ${n(tileBath.requiredTileCount)} بلاطة. عدد القطع في الصندوق يختلف من مصنع لآخر، فاقرأه من الملصق قبل حساب الصناديق.`,
          },
        ],
      },
      {
        title: "عدد البلاط لمساحة 20 م² حسب المقاس",
        blocks: [
          {
            type: "table",
            headers: ["المقاس", "مساحة البلاطة", "تركيب مستقيم (هدر 10%)", "تركيب مائل (هدر 15%)"],
            rows: tileRows,
          },
          {
            type: "paragraph",
            text: "كلما كبرت البلاطة قلّ عددها، لكن القطع الكبيرة في غرفة صغيرة تعني أن جزءًا أكبر من كل بلاطة مقصوصة يذهب هدرًا، لذلك لا تخفض نسبة الهدر مع المقاسات الكبيرة.",
          },
        ],
      },
      {
        title: "ملاحظات قبل الطلب",
        blocks: [
          {
            type: "list",
            items: [
              { term: "الوزرة (النعلات)", text: "تُحسب بالمتر الطولي من محيط الغرفة مطروحًا منه عرض الأبواب، وليست ضمن مساحة الأرضية." },
              { term: "رقم الدفعة والدرجة", text: "يختلف لون البلاط ومقاسه الفعلي قليلًا بين دفعات الإنتاج، فاطلب الكمية كلها من دفعة واحدة." },
              { term: "قطع احتياطية", text: "احتفظ ببضع بلاطات بعد التركيب؛ قد تحتاجها لإصلاح بلاطة مكسورة بعد سنوات حين يصعب إيجاد الموديل نفسه." },
              { term: "خلط الوحدات", text: "المساحة بالمتر المربع وأبعاد البلاطة بالسنتيمتر. إدخال 0.6 بدل 60 يعطي نتيجة خاطئة تمامًا." },
            ],
          },
        ],
      },
    ],
  },

  "brick-calculator": {
    sections: [
      {
        title: "كيف يُحسب عدد الطوب؟",
        blocks: [
          {
            type: "paragraph",
            text: "تضيف الأداة سماكة الفاصل (المونة) إلى طول وجه الطوبة وارتفاعه، لأن كل طوبة في الجدار تشغل مساحتها مع نصيبها من الفاصل. ثم تقسم مساحة الجدار مضافًا إليها نسبة الهدر على هذه المساحة وتقرّب الناتج إلى أعلى. الحساب يخص وجه الجدار فقط: لا يدخل فيه سمك الجدار ولا كمية الإسمنت والرمل، ولا تُطرح الفتحات تلقائيًا.",
          },
          {
            type: "list",
            items: [
              { term: "مساحة الجدار", text: "الطول × الارتفاع بالمتر، مطروحًا منه مساحة الأبواب والنوافذ قبل الإدخال." },
              { term: "أبعاد الطوبة", text: "طول الوجه الظاهر وارتفاعه بالسنتيمتر حسب طريقة الرص: الطوبة الحمراء المبنية بالطول يظهر منها وجه 25 × 6 سم مثلًا." },
              { term: "سماكة الفاصل", text: "بالمليمتر، وتكون غالبًا بين 10 و15 مم في البناء العادي." },
              { term: "نسبة الهدر", text: "للكسر أثناء النقل والقص عند الزوايا وفتحات الأبواب، و5% نقطة بداية شائعة." },
            ],
          },
        ],
      },
      {
        title: "مثال محلول: جدار بلوك بطول 6 م",
        blocks: [
          {
            type: "steps",
            items: [
              `مساحة الجدار: 6 × 3 = ${n(brickWallGross)} م²، وفيه باب 1 × 2.1 م، فتكون المساحة الصافية ${n(brickWallGross)} − ${n(brickDoor)} = ${n(brickWallNet)} م².`,
              `بلوك 40 × 20 سم مع فاصل 10 مم يشغل 0.41 × 0.21 = ${n(brickBlock.brickUnitAreaM2, 4)} م².`,
              `مع هدر 5%: ${n(brickWallNet)} × 1.05 = ${n(brickBlock.requiredAreaWithWaste, 3)} م².`,
              `العدد: ${n(brickBlock.requiredAreaWithWaste, 3)} ÷ ${n(brickBlock.brickUnitAreaM2, 4)} = ${n(brickBlock.requiredAreaWithWaste / brickBlock.brickUnitAreaM2, 1)}، أي ${n(brickBlock.requiredBrickCount)} بلوكة.`,
            ],
          },
          {
            type: "paragraph",
            text: `القيم الافتراضية في الأداة (جدار 20 م² وطوب 19 × 13.5 سم وفاصل 10 مم وهدر 5%) تعطي ${n(brickDefault.requiredBrickCount)} طوبة، لأن الطوبة الواحدة مع فاصلها تغطي ${n(brickDefault.brickUnitAreaM2, 4)} م² فقط.`,
          },
        ],
      },
      {
        title: "عدد الطوب لكل متر مربع",
        blocks: [
          {
            type: "table",
            headers: ["النوع والوجه الظاهر", "المساحة مع فاصل 10 مم", "عدد القطع في 1 م²", "جدار 10 م² (هدر 5%)"],
            rows: brickRows,
          },
          {
            type: "paragraph",
            text: "الطوبة نفسها قد تحتاج ضعف العدد تقريبًا إذا بُنيت بالعرض بدل الطول، لأن وجهها الظاهر يصغر. والجدار المزدوج (طبقتان من الطوب) يحتاج ضعف ما في الجدول.",
          },
        ],
      },
      {
        title: "أخطاء تغيّر النتيجة",
        blocks: [
          {
            type: "list",
            items: [
              { term: "المقاس الاسمي والمقاس الفعلي", text: "بعض المصانع تذكر مقاسًا اسميًا يشمل الفاصل مسبقًا. إذا كان البلوك الفعلي 39 × 19 سم فأدخل هذا المقاس مع فاصل 10 مم، لا 40 × 20." },
              { term: "نسيان طرح الفتحات", text: "باب ونافذتان في جدار واحد قد تتجاوز مساحتها 4 م²، أي عشرات البلوكات الزائدة." },
              { term: "فاصل أسمك من المتوقع", text: "رفع الفاصل من 10 إلى 15 مم يقلل العدد قليلًا لكنه يزيد المونة؛ اتفق مع المقاول على السماكة قبل الطلب." },
            ],
          },
        ],
      },
    ],
  },

  "age-calculator": {
    sections: [
      {
        title: "كيف تحسب الأداة العمر بالسنوات والأشهر والأيام؟",
        blocks: [
          {
            type: "paragraph",
            text: "تطرح الحاسبة السنة من السنة والشهر من الشهر واليوم من اليوم. إذا كان يوم التاريخ المستهدف أصغر من يوم الميلاد، تستعير أيام الشهر السابق للتاريخ المستهدف وتنقص شهرًا، وإذا صار الشهر سالبًا تنقص سنة وتضيف 12 شهرًا. أما مجموع الأيام فيُحسب مباشرة من الفرق بين التاريخين، فيشمل السنوات الكبيسة تلقائيًا. مجموع الأسابيع هو الأيام ÷ 7، ومجموع الأشهر تقريبي يعدّ بقية الأيام على أساس 30 يومًا للشهر.",
          },
          {
            type: "paragraph",
            text: "الحساب كله بالتقويم الميلادي. إذا كانت أوراقك الرسمية بالتاريخ الهجري فاستخدم حاسبة العمر بالهجري، لأن السنة الهجرية أقصر بنحو 11 يومًا، فيكون العمر الهجري أكبر من الميلادي.",
          },
        ],
      },
      {
        title: "مثال محلول",
        blocks: [
          {
            type: "steps",
            items: [
              `تاريخ الميلاد ${formatIsoDate("1990-03-15")} والتاريخ المستهدف ${formatIsoDate("2026-10-09")}.`,
              `من 15 مارس 1990 إلى 15 سبتمبر 2026 مضت ${ageMain.years} سنة و${ageMain.months} أشهر كاملة.`,
              `من 15 سبتمبر إلى 9 أكتوبر ${ageMain.days} يومًا (15 يومًا حتى نهاية سبتمبر ثم 9 أيام من أكتوبر)، فالنتيجة ${ageMain.years} سنة و${ageMain.months} أشهر و${ageMain.days} يومًا.`,
              `مجموع الأيام ${n(ageMain.totalDays)} يومًا، أي نحو ${n(ageMain.totalWeeks, 0)} أسبوعًا.`,
              `الذكرى التالية في ${formatIsoDate(ageMain.nextAnniversaryDate)}، بعد ${ageMain.daysUntilNextAnniversary} يومًا.`,
            ],
          },
          {
            type: "paragraph",
            text: `حالة خاصة: من وُلد في 29 فبراير 2000 يبلغ عمره في ${formatIsoDate("2026-10-09")}: ${ageLeap.years} سنة و${ageLeap.months} أشهر و${ageLeap.days} أيام. وفي السنوات غير الكبيسة تعرض الأداة ذكرى الميلاد في 1 مارس (التالية ${formatIsoDate(ageLeap.nextAnniversaryDate)}). بعض الجهات تعتمد 28 فبراير بدلًا من ذلك، فارجع إلى نظام الجهة إذا كان الموعد يترتب عليه أثر قانوني.`,
          },
        ],
      },
      {
        title: "العمر بالأيام والأسابيع والسنوات الهجرية التقريبية",
        blocks: [
          {
            type: "table",
            headers: ["العمر بالسنوات الميلادية", "الأيام تقريبًا", "الأسابيع تقريبًا", "ما يقابله بالسنوات الهجرية"],
            rows: ageRows,
          },
          {
            type: "paragraph",
            text: `القيم تقريبية: استُخدم متوسط السنة الميلادية ${n(GREGORIAN_YEAR_DAYS, 4)} يومًا ومتوسط السنة الهجرية ${n(HIJRI_YEAR_DAYS, 3)} يومًا. للحصول على العدد الدقيق لشخص بعينه أدخل التاريخين في الحاسبة.`,
          },
        ],
      },
      {
        title: "متى تتغير النتيجة دون أن تنتبه؟",
        blocks: [
          {
            type: "list",
            items: [
              { term: "تاريخ الاحتساب ليس اليوم", text: "شروط القبول في المدارس أو التقاعد تُحسب غالبًا حتى تاريخ محدد. ضع ذلك التاريخ في حقل التاريخ المستهدف بدل تاريخ اليوم." },
              { term: "ترتيب اليوم والشهر", text: "يعرض بعض المتصفحات التاريخ بصيغة شهر/يوم. تأكد أن 03/04 تعني 3 أبريل لا 4 مارس قبل قراءة النتيجة." },
              { term: "الخلط بين التقويمين", text: "إدخال تاريخ ميلاد هجري في حقل ميلادي يعطي فرقًا بمئات السنين. حوّل التاريخ أولًا بمحول التاريخ الهجري." },
            ],
          },
        ],
      },
    ],
  },

  "vat-calculator": {
    sections: [
      {
        title: "الصيغ المستخدمة في الاتجاهين",
        blocks: [
          {
            type: "paragraph",
            text: "عند الانتقال من الصافي إلى الإجمالي: الضريبة = الصافي × النسبة، والإجمالي = الصافي × (1 + النسبة). وعند استخراج الضريبة من سعر يشملها: الصافي = الإجمالي ÷ (1 + النسبة)، والضريبة = الإجمالي − الصافي. لذلك فإن الضريبة داخل سعر شامل بنسبة 15% تساوي 15 ÷ 115 من السعر، أي نحو 13.04% منه، وبنسبة 5% تساوي 5 ÷ 105، أي نحو 4.76%.",
          },
          {
            type: "paragraph",
            text: "النسب الأساسية المعمول بها وقت إعداد هذه الصفحة: 15% في السعودية منذ يوليو 2020، و5% في الإمارات منذ بداية 2018، و5% في سلطنة عُمان منذ أبريل 2021، و10% في البحرين منذ بداية 2022، و14% في مصر. بعض السلع والخدمات معفاة أو تخضع لنسبة صفرية حسب نظام كل دولة، ويمكنك إدخال أي نسبة أخرى في خانة النسبة المخصصة.",
          },
        ],
      },
      {
        title: "أمثلة بالريال والدرهم",
        blocks: [
          {
            type: "steps",
            items: [
              `فاتورة خدمة في السعودية بمبلغ صافٍ 1,000 ريال: الضريبة ${n(vatSaudi.vatAmount)} ريالًا، والإجمالي ${n(vatSaudi.totalAmount)} ريالًا.`,
              `سعر رف شامل للضريبة 230 ريالًا: الصافي 230 ÷ 1.15 = ${n(vatShelf.baseAmount)} ريال، والضريبة ${n(vatShelf.vatAmount)} ريالًا.`,
              `الخطأ الشائع هنا حساب 15% من 230 مباشرة، فيظهر ${n(230 * 0.15)} ريالًا بدل ${n(vatShelf.vatAmount)}، أي زيادة ${n(230 * 0.15 - vatShelf.vatAmount)} ريال في كل فاتورة.`,
              `في الإمارات، سعر شامل 525 درهمًا يعني صافيًا قدره ${n(vatUae.baseAmount)} درهم وضريبة ${n(vatUae.vatAmount)} درهمًا.`,
            ],
          },
        ],
      },
      {
        title: "جدول سريع: 15% و5%",
        blocks: [
          {
            type: "table",
            headers: ["المبلغ الصافي", "ضريبة 15%", "الإجمالي بـ 15%", "ضريبة 5%", "الإجمالي بـ 5%"],
            rows: vatRows,
          },
        ],
      },
      {
        title: "التقريب والفواتير",
        blocks: [
          {
            type: "list",
            items: [
              { term: "منزلتان عشريتان", text: "تقرّب الفواتير عادة إلى الهللة أو الفلس. إذا قرّبت ضريبة كل بند على حدة ثم جمعتها، قد يختلف المجموع بهللة أو اثنتين عن تقريب ضريبة الإجمالي مرة واحدة." },
              { term: "الخصم قبل الضريبة", text: "إذا كان هناك خصم تجاري فيُطرح من الصافي أولًا ثم تُحسب الضريبة على المبلغ بعد الخصم." },
              { term: "السعر المعروض للمستهلك", text: "في الدول التي تطبق الضريبة يُعرض السعر للمستهلك عادة شاملًا لها، فاستخدم اتجاه «من الإجمالي إلى الصافي» عند تحليل سعر رأيته في متجر." },
            ],
          },
          {
            type: "notice",
            text: "هذه الحاسبة للتقدير والتحقق السريع من الأرقام، وليست استشارة ضريبية. للتسجيل والإقرارات والحالات الخاصة ارجع إلى هيئة الضرائب في بلدك.",
          },
        ],
      },
    ],
    sources: [
      { label: "هيئة الزكاة والضريبة والجمارك (السعودية)", url: "https://zatca.gov.sa" },
      { label: "الهيئة الاتحادية للضرائب (الإمارات)", url: "https://tax.gov.ae" },
    ],
  },

  "bmi-calculator": {
    sections: [
      {
        title: "ماذا تحسب الأداة بالضبط؟",
        blocks: [
          {
            type: "paragraph",
            text: "مؤشر كتلة الجسم هو الوزن بالكيلوغرام مقسومًا على مربع الطول بالمتر. وتصنّف منظمة الصحة العالمية البالغين كالتالي: أقل من 18.5 نقص في الوزن، ومن 18.5 إلى أقل من 25 وزن طبيعي، ومن 25 إلى أقل من 30 زيادة في الوزن، و30 فأكثر سمنة. إلى جانب المؤشر تحسب الأداة معدل الأيض الأساسي بمعادلة ميفلين-سانت جيور: 10 × الوزن + 6.25 × الطول بالسنتيمتر − 5 × العمر، ثم يضاف 5 للرجال ويُطرح 161 للنساء. يُضرب الناتج في معامل النشاط (من 1.2 للخامل إلى 1.9 للنشاط المرتفع جدًا) لتقدير السعرات اليومية.",
          },
        ],
      },
      {
        title: "مثالان محلولان",
        blocks: [
          {
            type: "steps",
            items: [
              `رجل طوله 170 سم ووزنه 70 كجم: 70 ÷ (1.7 × 1.7) = 70 ÷ 2.89 = ${n(bmiMan.bmi, 1)}، أي ضمن الوزن الطبيعي.`,
              `عمره 30 سنة: 10 × 70 + 6.25 × 170 − 5 × 30 + 5 = ${n(bmiMan.basalMetabolicRate, 1)} سعرة يوميًا في الراحة.`,
              `بنشاط متوسط (المعامل ${n(activityMultipliers.moderate)}): ${n(bmiMan.basalMetabolicRate, 1)} × ${n(activityMultipliers.moderate)} ≈ ${n(bmiMan.dailyCalorieNeed, 0)} سعرة يوميًا للحفاظ على الوزن.`,
              `امرأة طولها 160 سم ووزنها 68 كجم وعمرها 35 سنة بنشاط خفيف: المؤشر ${n(bmiWoman.bmi, 1)} (زيادة وزن)، والأيض الأساسي ${n(bmiWoman.basalMetabolicRate)} سعرة، والاحتياج اليومي نحو ${n(bmiWoman.dailyCalorieNeed, 0)} سعرة.`,
            ],
          },
        ],
      },
      {
        title: "نطاقات الوزن حسب الطول",
        blocks: [
          {
            type: "table",
            headers: ["الطول", "وزن طبيعي (18.5 – 24.9)", "زيادة وزن (25 – 29.9)", "سمنة (30 فأكثر)"],
            rows: bmiRows,
          },
          {
            type: "paragraph",
            text: `حُسب كل نطاق بضرب حدود المؤشر في مربع الطول بالمتر. فمن طوله 175 سم مثلًا يقع وزنه الطبيعي تقريبًا بين ${n(18.5 * 1.75 ** 2, 1)} و${n(24.9 * 1.75 ** 2, 1)} كجم.`,
          },
        ],
      },
      {
        title: "حدود المؤشر ومتى لا يصلح",
        blocks: [
          {
            type: "list",
            items: [
              { term: "الأطفال والمراهقون", text: "لا تنطبق عليهم حدود البالغين؛ يُقيَّم المؤشر لمن هم دون 19 سنة بمنحنيات النمو حسب العمر والجنس." },
              { term: "الرياضيون وأصحاب الكتلة العضلية", text: "العضلات أثقل من الدهون، فقد يظهر مؤشر مرتفع لشخص نسبة الدهون لديه منخفضة." },
              { term: "الحمل وكبار السن", text: "يتغير الوزن وتكوين الجسم في هاتين الحالتين، فلا يُقرأ المؤشر وحده." },
              { term: "توزع الدهون", text: "المؤشر لا يميز دهون البطن، ومحيط الخصر يضيف معلومة لا يعطيها المؤشر." },
              { term: "السعرات تقدير", text: "معادلة الأيض متوسط إحصائي، وقد يختلف الاحتياج الفعلي من شخص لآخر بمئات السعرات." },
            ],
          },
          {
            type: "notice",
            text: "مؤشر كتلة الجسم أداة فحص أولي على مستوى السكان، وليس تشخيصًا لحالتك الصحية. إذا كانت نتيجتك خارج النطاق الطبيعي أو كنت تخطط لتغيير كبير في الوزن أو النظام الغذائي، فناقش ذلك مع طبيب أو أخصائي تغذية.",
          },
        ],
      },
    ],
    sources: [
      { label: "منظمة الصحة العالمية: صحيفة وقائع السمنة وزيادة الوزن", url: "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight" },
      { label: "منظمة الصحة العالمية (أوروبا): تصنيف مؤشر كتلة الجسم للبالغين", url: "https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations" },
      { label: "Mifflin وآخرون (1990): معادلة جديدة لتقدير الإنفاق الطاقي في الراحة", url: "https://pubmed.ncbi.nlm.nih.gov/2305711/" },
    ],
  },

  "pregnancy-week-calculator": {
    sections: [
      {
        title: "قاعدة الحساب",
        blocks: [
          {
            type: "paragraph",
            text: "تستخدم الحاسبة قاعدة نيغلي المعتمدة في العيادات: موعد الولادة المتوقع = أول يوم من آخر دورة شهرية + 280 يومًا، أي 40 أسبوعًا. ويُعدّ عمر الحمل من ذلك اليوم لا من يوم الإخصاب، ولذلك يسبق الإخصاب الفعلي بنحو أسبوعين في الدورة المنتظمة. عدد الأيام منذ آخر دورة يُقسم على 7 فيظهر الأسبوع واليوم. وتقسم الأداة الحمل إلى ثلاثة أثلاث: الأول حتى نهاية الأسبوع 12، والثاني من الأسبوع 13 إلى 26، والثالث من الأسبوع 27 حتى الولادة.",
          },
        ],
      },
      {
        title: "مثال محلول",
        blocks: [
          {
            type: "steps",
            items: [
              `أول يوم من آخر دورة: ${formatIsoDate("2026-03-01")}، وتاريخ اليوم ${formatIsoDate("2026-06-15")}.`,
              `عدد الأيام المنقضية: ${pregnancyExample.totalDays}، و${pregnancyExample.totalDays} ÷ 7 = ${pregnancyExample.weeks} أسبوعًا ويوم واحد.`,
              `الأسبوع ${pregnancyExample.weeks} يقع في الثلث الثاني.`,
              `موعد الولادة المتوقع: ${formatIsoDate("2026-03-01")} + 280 يومًا = ${formatIsoDate(pregnancyExample.dueDate)}، والمتبقي ${pregnancyExample.daysUntilDueDate} يومًا.`,
            ],
          },
        ],
      },
      {
        title: "مواعيد مهمة حسب تاريخ آخر دورة",
        blocks: [
          {
            type: "table",
            headers: ["أول يوم من آخر دورة", "بداية الأسبوع 13", "بداية الأسبوع 27", "بداية الأسبوع 37", "الموعد المتوقع (40 أسبوعًا)"],
            rows: pregnancyRows,
          },
          {
            type: "paragraph",
            text: "تعرّف منظمة الصحة العالمية الولادة قبل إتمام 37 أسبوعًا بأنها ولادة مبكرة، والموعد المتوقع نقطة في منتصف فترة طبيعية وليس يومًا محددًا؛ نسبة قليلة فقط من الأطفال يولدون في اليوم المحسوب نفسه.",
          },
        ],
      },
      {
        title: "متى يكون التقدير أقل دقة؟",
        blocks: [
          {
            type: "list",
            items: [
              { term: "الدورة غير المنتظمة", text: "القاعدة تفترض دورة طولها نحو 28 يومًا. إذا كانت دورتك أطول أو أقصر بكثير فقد يتأخر الموعد الحقيقي أو يتقدم." },
              { term: "عدم تذكر التاريخ", text: "التخمين في تاريخ آخر دورة ينقل الخطأ إلى كل الأرقام. سونار الثلث الأول أدق طريقة لتحديد عمر الحمل." },
              { term: "أطفال الأنابيب", text: "يُحسب العمر من تاريخ نقل الأجنة وعمرها، لا من آخر دورة، فاعتمدي التاريخ الذي يحدده المركز." },
              { term: "تعديل الطبيب للموعد", text: "إذا اختلف موعد السونار المبكر عن موعد آخر دورة بفارق معتبر، يعتمد الطبيب عادة تاريخ السونار، فاستخدميه بدل نتيجة هذه الأداة." },
            ],
          },
          {
            type: "notice",
            text: "هذه الحاسبة تعطي تقديرًا تقويميًا فقط ولا تشخّص الحمل ولا تقيّم صحته. توصي منظمة الصحة العالمية بثماني زيارات متابعة على الأقل خلال الحمل. وعند النزيف أو الألم الشديد أو قلة حركة الجنين أو الصداع الشديد راجعي الطوارئ فورًا دون انتظار أي موعد محسوب.",
          },
        ],
      },
    ],
    sources: [
      { label: "الكلية الأمريكية لأطباء النساء والتوليد (ACOG): طرق تقدير موعد الولادة", url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date" },
      { label: "منظمة الصحة العالمية: توصيات الرعاية أثناء الحمل (2016)", url: "https://www.who.int/publications/i/item/9789241549912" },
    ],
  },

  "length-comparison": {
    sections: [
      {
        title: "المراجع التي تقارن بها الأداة",
        blocks: [
          {
            type: "paragraph",
            text: "تقسم الأداة القيمة التي تدخلها على طول كل مرجع، فتعرف كم مرة يتسع فيها هذا المرجع. ثم ترتب النتائج بحسب القرب: المرجع الذي تكون النسبة معه أقرب إلى 1 يظهر أولًا، مع معاملة الضعف والنصف بالقدر نفسه من البعد. القيم متوسطات مدورة للتوضيح، فطول الزرافة مثلًا يختلف بين الذكور والإناث.",
          },
          {
            type: "table",
            headers: ["المرجع", "الطول المعتمد", "كم مرة في 100 م", "كم مرة في 1 كم"],
            rows: lengthRows,
          },
        ],
      },
      {
        title: "مثالان بالأرقام",
        blocks: [
          {
            type: "steps",
            items: [
              `مسبح أولمبي طوله 50 مترًا: النسبة إلى الحوت الأزرق ${n(ratioOf(length50, "mavi-balina"))}، وإلى الحافلة ${n(ratioOf(length50, "sehir-otobusu"))}، وإلى ملعب كرة القدم ${n(ratioOf(length50, "futbol-sahasi"))}. أي إن المسبح يعادل حوتين مصفوفين، وأقل قليلًا من نصف ملعب، ولذلك تعرض الأداة الحوت الأزرق أولًا.`,
              `برج خليفة بارتفاع ${n(BURJ_KHALIFA_M)} مترًا ليس ضمن المراجع، لكن يمكنك إدخال ارتفاعه: النسبة إلى برج إيفل ${n(ratioOf(lengthBurj, "eyfel-kulesi"))}، وإلى ملعب كرة القدم ${n(ratioOf(lengthBurj, "futbol-sahasi"))}، وإلى طول الإنسان نحو ${n(ratioOf(lengthBurj, "insan-boyu"), 0)}. فلو وُضعت أبراج إيفل فوق بعضها لاحتجنا إلى برجين ونصف تقريبًا لنصل إلى قمته.`,
            ],
          },
          {
            type: "paragraph",
            text: "جسر شهداء 15 يوليو هو أول جسر معلق على مضيق البوسفور في إسطنبول، ويبلغ طوله الإجمالي 1,560 مترًا، وهو مرجع مناسب للمسافات التي تقارب كيلومترًا ونصف.",
          },
        ],
      },
      {
        title: "استخدامات وأخطاء شائعة",
        blocks: [
          {
            type: "list",
            items: [
              { term: "في الشرح والتعليم", text: "عبارة «طول ملعبين» أسهل على طالب أو قارئ تقرير من «210 أمتار»." },
              { term: "الوحدة الخاطئة", text: "اختر سم أو م أو كم قبل الإدخال؛ 50 سم و50 م يعطيان مقارنات مختلفة تمامًا." },
              { term: "النسبة ليست فرقًا", text: "النتيجة 2.5 تعني أن القيمة تساوي المرجع مرتين ونصفًا، لا أنها أطول منه بمترين ونصف." },
              { term: "الطول والارتفاع", text: "المقارنة خطية فقط؛ لا تقول شيئًا عن الحجم أو الوزن، فحافلتان بالطول ليستا حافلتين بالحجم إن اختلف العرض." },
            ],
          },
        ],
      },
    ],
  },

  "weight-comparison": {
    sections: [
      {
        title: "كيف تعمل المقارنة؟",
        blocks: [
          {
            type: "paragraph",
            text: "تحوّل الأداة القيمة إلى كيلوغرام، ثم تقسمها على وزن كل مرجع، وترتب المراجع بحيث يأتي أولًا ما تكون النسبة معه أقرب إلى 1. الطن المقصود هنا هو الطن المتري، أي 1,000 كجم، وليس الطن الأمريكي القصير الذي يساوي " +
              `${n(SHORT_TON_KG)} كجم. والأوزان المرجعية متوسطات مدورة، فوزن السيارة مثلًا يتراوح كثيرًا بين سيارة صغيرة وسيارة دفع رباعي.`,
          },
          {
            type: "table",
            headers: ["المرجع", "الوزن المعتمد", "كم منه في 1 طن", "حقيبة سفر 23 كجم تعادل"],
            rows: weightRows,
          },
        ],
      },
      {
        title: "أمثلة محلولة",
        blocks: [
          {
            type: "steps",
            items: [
              `سيارة دفع رباعي كبيرة بوزن 2,500 كجم تقريبًا: تساوي ${n(ratioOf(weightSuv, "otomobil"))} سيارة ركاب متوسطة، و${n(ratioOf(weightSuv, "at"))} أحصنة، و${n(ratioOf(weightSuv, "fil"))} من وزن فيل إفريقي.`,
              `حقيبة سفر بوزن 23 كجم، وهو حد شائع للأمتعة المسجلة على الدرجة السياحية: تعادل ${n(ratioOf(weightBag, "kedi"))} قطط، أو ${n(ratioOf(weightBag, "insan"))} من وزن إنسان بالغ.`,
              `حوت أزرق بالغ (150 طنًا) يعادل وزن ${n(150000 / 1500)} سيارة ركاب أو ${n(150000 / 6000)} فيلًا.`,
            ],
          },
        ],
      },
      {
        title: "مقارنة الحمولة في الحياة اليومية",
        blocks: [
          {
            type: "paragraph",
            text: `لوحة المصعد التي تقول ${n(ELEVATOR_KG)} كجم تعني بحسب متوسط الأداة (${n(averageAdultKg)} كجم للشخص) نحو ${n(ELEVATOR_KG / averageAdultKg, 1)} أشخاص، لكن اللوحة نفسها تحدد عادة ${Math.floor(ELEVATOR_KG / ELEVATOR_KG_PER_PERSON)} أشخاص فقط، لأن معايير المصاعد الأوروبية تحسب ${n(ELEVATOR_KG_PER_PERSON)} كجم للشخص الواحد. هذا الفرق مثال جيد على أن المتوسط يصلح للتخيل، أما حدود الأمان فتُقرأ من اللوحة لا من المقارنة.`,
          },
          {
            type: "paragraph",
            text: "وبالطريقة نفسها يمكنك تقدير وزن شحنة قبل حجز سيارة نقل، أو فهم الفرق بين حمولة شاحنة صغيرة وكبيرة: أدخل الوزن المكتوب في بوليصة الشحن أو مواصفات المركبة، وانظر إلى أي مرجع يقترب، ثم ارجع إلى الرقم الأصلي عند اتخاذ القرار.",
          },
        ],
      },
      {
        title: "ملاحظات لفهم الأرقام",
        blocks: [
          {
            type: "list",
            items: [
              { term: "الكتلة والوزن", text: "الكيلوغرام وحدة كتلة، ونسميه وزنًا في الكلام اليومي. على سطح القمر يقل الثقل لكن الكتلة والمقارنة هنا تبقى كما هي." },
              { term: "الغرام والكيلوغرام", text: "إدخال 500 بوحدة كجم بدل غرام يحول نصف كيلو من الأرز إلى وزن حصان." },
              { term: "متوسطات لا مواصفات", text: "لا تستخدم هذه المراجع لحساب حمولة رافعة أو سيارة؛ ارجع إلى الحمولة المكتوبة في مواصفات الجهاز أو المركبة." },
            ],
          },
        ],
      },
    ],
  },

  "running-pace-calculator": {
    sections: [
      {
        title: "العلاقة بين الوتيرة والسرعة والزمن",
        blocks: [
          {
            type: "paragraph",
            text: "الوتيرة هي الزمن اللازم لقطع كيلومتر واحد، وتُحسب بقسمة الزمن الكلي على المسافة. والسرعة بالكيلومتر في الساعة هي 60 ÷ الوتيرة بالدقائق. والزمن = المسافة × الوتيرة، والمسافة = الزمن ÷ الوتيرة. تقديرات السباقات في الأداة تضرب وتيرتك الحالية في مسافات 5 و10 و21.0975 و42.195 كم، أي تفترض أنك ستحافظ على الوتيرة نفسها حتى النهاية.",
          },
        ],
      },
      {
        title: "مثال محلول: 10 كم في 50 دقيقة",
        blocks: [
          {
            type: "steps",
            items: [
              `الوتيرة: 50 دقيقة ÷ 10 كم = ${clock(paceMain.paceSecondsPerKm)} دقيقة لكل كيلومتر.`,
              `السرعة: 60 ÷ 5 = ${n(paceMain.speedKmh)} كم في الساعة.`,
              `بالوتيرة نفسها: 5 كم في ${clock(raceTime(5))}، ونصف الماراثون في ${clock(raceTime(HALF_MARATHON_KM))}، والماراثون في ${clock(raceTime(MARATHON_KM))}.`,
              `للمقارنة، صيغة ريغل الشائعة (الزمن الجديد = الزمن المعروف × (المسافة الجديدة ÷ المسافة المعروفة) ^ ${n(RIEGEL_EXPONENT)}) تتوقع للماراثون نحو ${clock(riegelMarathon)}، لأن الوتيرة تتباطأ عادة في المسافات الطويلة.`,
              `بالميل: ${clock(paceMain.paceSecondsPerKm)} د/كم × ${n(MILE_KM, 3)} = ${clock(paceMain.paceSecondsPerKm * MILE_KM)} دقيقة لكل ميل.`,
            ],
          },
        ],
      },
      {
        title: "جدول الوتيرة وأزمنة السباقات",
        blocks: [
          {
            type: "table",
            headers: ["الوتيرة", "السرعة", "5 كم", "10 كم", "نصف ماراثون", "ماراثون"],
            rows: paceRows,
          },
          {
            type: "paragraph",
            text: "الأزمنة في الجدول بوتيرة ثابتة، وهي سقف متفائل للمسافات الطويلة. استخدمها لتحديد وتيرة التدريب، وتوقع زمنًا أبطأ في السباق الأطول ما لم تكن قد تدربت عليه.",
          },
        ],
      },
      {
        title: "ما الذي يجعل النتيجة تختلف على أرض الواقع؟",
        blocks: [
          {
            type: "list",
            items: [
              { term: "الحرارة والرطوبة", text: "في صيف الخليج ترتفع الحرارة والرطوبة حتى في الصباح الباكر، فتتباطأ الوتيرة عند الجهد نفسه. قارن تمارين الصيف ببعضها لا بتمارين الشتاء." },
              { term: "دقة GPS", text: "الساعات والهواتف قد تخطئ بعشرات الأمتار في الكيلومتر بين المباني العالية، فتظهر الوتيرة أسرع أو أبطأ من الحقيقة." },
              { term: "جهاز المشي", text: "الجري على السير الكهربائي بلا مقاومة هواء أسهل قليلًا، ولا تتطابق الوتيرة عليه دائمًا مع الطريق." },
              { term: "الخلط بين الوتيرة والسرعة", text: "وتيرة 6:00 د/كم أبطأ من 5:00، بينما سرعة 12 كم/س أسرع من 10. الرقم الأصغر في الوتيرة يعني جريًا أسرع." },
            ],
          },
        ],
      },
    ],
  },

  "ac-btu-calculator": {
    sections: [
      {
        title: "المعادلة التي تعتمدها الحاسبة",
        blocks: [
          {
            type: "paragraph",
            text: `الحمل الأساسي = مساحة الغرفة × 600 BTU/h لكل متر مربع، ويضاف 600 BTU/h لكل شخص. إذا كانت الغرفة معرضة للشمس معظم اليوم يزيد المجموع 10%، وإذا كانت في الطابق الأخير تحت السطح يزيد 10% أخرى. بعد ذلك تختار الأداة أقرب سعة تجارية لا تقل عن الحمل من بين ${STANDARD_BTU_SIZES.map((size) => n(size)).join(" و")} BTU/h. وإذا تجاوز الحمل ${n(maxBtu)} تعرض الأداة أكبر مقاس، وهذا يعني عمليًا الحاجة إلى جهازين أو نظام مركزي.`,
          },
          {
            type: "paragraph",
            text: `في أسواق الخليج تُباع المكيفات غالبًا بالطن: طن التبريد يساوي ${n(BTU_PER_TON)} BTU/h، أي نحو ${n(tonToKw)} كيلوواط من التبريد، والكيلوواط الواحد يساوي ${n(kwToBtu, 0)} BTU/h. فجهاز 18,000 هو «طن ونصف»، و24,000 هو «طنان».`,
          },
        ],
      },
      {
        title: "مثال محلول: غرفة 20 م² تحت السطح",
        blocks: [
          {
            type: "steps",
            items: [
              `المساحة: 20 × 600 = ${n(acMain.baseBtu)} BTU/h.`,
              `شخصان: 2 × 600 = ${n(acMain.occupantBtu)} BTU/h، والمجموع ${n(acMain.baseBtu + acMain.occupantBtu)}.`,
              `شمس مباشرة وطابق أخير: زيادة 20%، أي ${n(acMain.adjustmentBtu)} BTU/h، فيصبح الحمل ${n(acMain.totalBtu)} BTU/h.`,
              `أقرب سعة أعلى: ${n(acMain.suggestedCapacity)} BTU/h، أي مكيف ${n(acMain.suggestedCapacity / BTU_PER_TON)} طن.`,
            ],
          },
        ],
      },
      {
        title: "السعة المقترحة حسب المساحة (شخصان)",
        blocks: [
          {
            type: "table",
            headers: ["المساحة", "الحمل دون إضافات", "السعة المقترحة", "الحمل مع شمس وطابق أخير", "السعة المقترحة"],
            rows: acRows,
          },
        ],
      },
      {
        title: "قبل أن تشتري",
        blocks: [
          {
            type: "list",
            items: [
              { term: "الحرارة الخارجية الشديدة", text: "تُختبر السعة الاسمية لكثير من الأجهزة عند 35 °م في الخارج (ظروف T1)، وتنخفض السعة الفعلية حين تتجاوز الحرارة ذلك بكثير كما يحدث في الصيف الخليجي. الأجهزة المصنفة T3 مصممة للمناخ الحار." },
              { term: "التكبير الزائد ليس أفضل", text: "المكيف الأكبر من اللازم يبرد الهواء بسرعة ثم يتوقف، فلا يسحب الرطوبة جيدًا وتبقى الغرفة باردة ورطبة." },
              { term: "ما لا تراه المعادلة", text: "الواجهات الزجاجية الكبيرة، والمطابخ، والأسقف العالية، وضعف العزل كلها ترفع الحمل. في هذه الحالات اطلب حساب أحمال من فني مختص." },
              { term: "السعة والاستهلاك", text: "BTU/h قدرة تبريد لا استهلاك كهرباء. الاستهلاك يعتمد على كفاءة الجهاز، فقارن معامل الكفاءة على ملصق الطاقة." },
            ],
          },
        ],
      },
    ],
  },

  "electricity-consumption-calculator": {
    sections: [
      {
        title: "من الواط إلى الفاتورة",
        blocks: [
          {
            type: "paragraph",
            text: "الاستهلاك اليومي بالكيلوواط ساعة = قدرة الجهاز بالواط × ساعات التشغيل ÷ 1000. يُضرب الناتج في أيام الاستخدام في الشهر للحصول على الاستهلاك الشهري، ثم في 12 للاستهلاك السنوي. وإذا أدخلت سعر الكيلوواط ساعة تضرب الأداة الاستهلاك فيه لتقدير التكلفة. لا تفترض الأداة سعرًا افتراضيًا لأن التعرفة تختلف بين الدول وبين السكني والتجاري وبين شرائح الاستهلاك.",
          },
        ],
      },
      {
        title: "مثال محلول بسعر توضيحي",
        blocks: [
          {
            type: "steps",
            items: [
              `مدفأة أو مكواة بخار بقدرة 1,500 واط تعمل ساعتين يوميًا: 1,500 × 2 ÷ 1000 = ${n(elecMain.dailyKwh)} kWh في اليوم.`,
              `30 يومًا: ${n(elecMain.dailyKwh)} × 30 = ${n(elecMain.monthlyKwh)} kWh في الشهر، و${n(elecMain.yearlyKwh)} kWh في السنة.`,
              `بسعر توضيحي ${n(ILLUSTRATIVE_PRICE)} لكل kWh (ليس تعرفة بلد بعينه): ${n(elecMain.monthlyCost ?? 0)} شهريًا و${n(elecMain.yearlyCost ?? 0)} سنويًا بعملتك.`,
              `مكيف يسحب نحو 1,800 واط ويعمل 10 ساعات يوميًا يستهلك ${n(elecAc.dailyKwh)} kWh يوميًا و${n(elecAc.monthlyKwh)} kWh شهريًا، أي ${n(elecAc.monthlyKwh / elecMain.monthlyKwh)} أضعاف المثال السابق.`,
            ],
          },
        ],
      },
      {
        title: "استهلاك تقريبي لأجهزة منزلية",
        blocks: [
          {
            type: "table",
            headers: ["الجهاز", "القدرة والاستخدام المفترض", "الاستهلاك الشهري", `التكلفة بسعر توضيحي ${n(ILLUSTRATIVE_PRICE)}`],
            rows: elecRows,
          },
          {
            type: "paragraph",
            text: "القدرات في الجدول أمثلة للتوضيح وليست مواصفات أجهزة محددة. اقرأ القدرة من لوحة البيانات على جهازك، وتذكر أن الثلاجة والمكيف لا يعملان بكامل قدرتهما طوال الوقت لأن الضاغط يتوقف ويعمل حسب الحرارة.",
          },
        ],
      },
      {
        title: "كيف تختار سعر الكيلوواط ساعة؟",
        blocks: [
          {
            type: "list",
            items: [
              { term: "الشرائح", text: "تعتمد كثير من شركات الكهرباء في المنطقة تسعيرًا بالشرائح، فيرتفع سعر الكيلوواط ساعة كلما زاد الاستهلاك الشهري. لتقدير أثر جهاز إضافي استخدم سعر الشريحة التي تصل إليها فاتورتك عادة." },
              { term: "متوسط من الفاتورة", text: "اقسم مبلغ الاستهلاك في فاتورتك (دون الرسوم الثابتة والضريبة) على عدد الكيلوواط ساعة المستهلكة لتحصل على متوسط سعر واقعي." },
              { term: "الواط والكيلوواط", text: "جهاز 2 كيلوواط يُدخل 2000 واط. إدخال 2 فقط يجعل الاستهلاك أصغر بألف مرة." },
              { term: "وضع الاستعداد", text: "أجهزة التلفاز والشواحن تستهلك قليلًا وهي مطفأة. أدخلها بقدرة الاستعداد و24 ساعة إذا أردت معرفة أثرها." },
            ],
          },
        ],
      },
    ],
  },

  "sleep-calculator": {
    sections: [
      {
        title: "الافتراضات وراء الأوقات المقترحة",
        blocks: [
          {
            type: "paragraph",
            text: "تفترض الحاسبة أنك تحتاج نحو 15 دقيقة لتغفو، وأن النوم يمر بدورات متتالية متوسط كل منها 90 دقيقة. فإذا اخترت وقت الاستيقاظ، تطرح من هذا الوقت 15 دقيقة ثم 3 أو 4 أو 5 أو 6 دورات، أي 4.5 أو 6 أو 7.5 أو 9 ساعات نوم. وتبرز خياري 5 و6 دورات لأنهما الأقرب إلى ما يُوصى به للبالغين. أما إذا ضغطت «إذا نمت الآن» فتضيف الأوقات نفسها إلى الساعة الحالية.",
          },
          {
            type: "paragraph",
            text: "طول الدورة ليس ثابتًا عند كل الناس، ويتراوح عادة بين 70 و120 دقيقة ويتغير خلال الليلة نفسها، لذلك تعامل مع الأوقات كنقطة بداية ثم عدّلها بربع ساعة حسب شعورك عند الاستيقاظ.",
          },
        ],
      },
      {
        title: "مثالان من الحياة اليومية",
        blocks: [
          {
            type: "steps",
            items: [
              `تريد الاستيقاظ في 06:00 للدوام: خمس دورات تعني النوم في ${sleepPick("06:00", 5)} (7.5 ساعات)، وست دورات تعني ${sleepPick("06:00", 6)}. أما النوم في ${sleepPick("06:00", 4)} فيعطي 6 ساعات فقط.`,
              `تستيقظ لصلاة الفجر في 04:30: خمس دورات تتطلب النوم في ${sleepPick("04:30", 5)}، وإذا نمت في ${sleepPick("04:30", 4)} فلن تحصل إلا على 6 ساعات، ويعوض بعض الناس ذلك بقيلولة قصيرة في النهار.`,
              `إذا ذهبت إلى السرير في 23:00 فأوقات الاستيقاظ المقترحة: ${sleepNowPick(4)} أو ${sleepNowPick(5)} أو ${sleepNowPick(6)}.`,
            ],
          },
        ],
      },
      {
        title: "أوقات النوم حسب وقت الاستيقاظ",
        blocks: [
          {
            type: "table",
            headers: ["وقت الاستيقاظ", "6 دورات (9 س)", "5 دورات (7.5 س)", "4 دورات (6 س)"],
            rows: sleepRows,
          },
          {
            type: "paragraph",
            text: "كل وقت في الجدول يشمل ربع ساعة للغفو. توصي الأكاديمية الأمريكية لطب النوم وجمعية أبحاث النوم بأن ينام البالغ 7 ساعات أو أكثر بانتظام، فخيار 4 دورات مناسب لليلة استثنائية لا كعادة يومية.",
          },
        ],
      },
      {
        title: "حدود الحاسبة",
        blocks: [
          {
            type: "list",
            items: [
              { term: "مدة النوم أهم من التوقيت الدقيق", text: "الاستيقاظ في نهاية دورة قد يقلل الخمول، لكنه لا يعوض قلة الساعات." },
              { term: "الانتظام", text: "تغيير موعد النوم كثيرًا بين أيام العمل والعطلة يربك الساعة البيولوجية أكثر من فرق ربع ساعة في التوقيت." },
              { term: "العمر", text: "الأطفال والمراهقون يحتاجون ساعات أكثر من البالغين، وهذه الأوقات مصممة للبالغين." },
            ],
          },
          {
            type: "notice",
            text: "الحاسبة أداة تنظيم للوقت، وليست تقييمًا لاضطرابات النوم. الشخير العالي مع توقف التنفس، أو النعاس الشديد في النهار رغم النوم الكافي، أو الأرق الذي يستمر أسابيع، أسباب لمراجعة الطبيب.",
          },
        ],
      },
    ],
    sources: [
      { label: "Watson وآخرون (2015): بيان الأكاديمية الأمريكية لطب النوم وجمعية أبحاث النوم حول مدة النوم الموصى بها للبالغين", url: "https://pubmed.ncbi.nlm.nih.gov/26039963/" },
    ],
  },
};

export function findArabicToolGuide(slug: string): ArabicToolGuide | undefined {
  return arabicToolGuides[slug];
}
