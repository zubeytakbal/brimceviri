// حاسبات فقهية للصفحات العربية: العدة، يوم العقيقة، قصر الصلاة، حول الزكاة.
// الأشهر الهجرية حسب تقويم أم القرى. كل النتائج تقريبية وتُعرض مع الخلاف الفقهي.
import { gregorianToHijri, hijriToGregorian, type YMD } from "./time/calendars";
import { addDaysYmd, diffDays } from "./time/dateMath";
import { hijriShahrTul } from "./time/hijriAge";

/** يضيف أشهرًا هجرية إلى تاريخ ميلادي (اليوم 30 يُثبَّت على آخر الشهر إن كان 29 يومًا). */
export function addHijriMonthsTo(date: YMD, n: number): YMD {
  const h = gregorianToHijri(date);
  const total = h.year * 12 + (h.month - 1) + n;
  const year = Math.floor(total / 12);
  const month = (total % 12) + 1;
  return hijriToGregorian({ year, month, day: Math.min(h.day, hijriShahrTul(year, month)) })!;
}

/* ---------------- العدة ---------------- */

export type IddaNaw = "wafat" | "haml" | "ayisa" | "hayd";
/** القرء: الحيض (الحنفية والحنابلة) أو الطهر (المالكية والشافعية). */
export type Qur = "hayd" | "tuhr";

/** عدة الوفاة: أربعة أشهر هجرية وعشرة أيام، أو 130 يومًا لمن يعدّ الأشهر بالأيام. */
export function iddatWafat(mawt: YMD) {
  return { bilAhilla: addDaysYmd(addHijriMonthsTo(mawt, 4), 10), bilAyyam: addDaysYmd(mawt, 130) };
}

/** عدة الآيسة والصغيرة: ثلاثة أشهر هجرية، أو 90 يومًا. */
export function iddatAshhur(talaq: YMD) {
  return { bilAhilla: addHijriMonthsTo(talaq, 3), bilAyyam: addDaysYmd(talaq, 90) };
}

/**
 * عدة ذات الحيض: ثلاثة قروء، تقدير من موعد آخر حيضة وطول الدورة.
 * - القرء حيض: تنتهي بانتهاء الحيضة الثالثة التي تبدأ بعد الطلاق.
 * - القرء طهر: الطلاق في طهر يُحسب بقية الطهر قرءًا، فتنتهي ببداية الحيضة الثالثة
 *   بعد الطلاق؛ وإن وقع الطلاق في الحيض فببداية الحيضة الرابعة.
 */
export function iddatQuru(talaq: YMD, akhirHayd: YMD, dawra: number, muddatHayd: number, qur: Qur) {
  if (!(dawra >= 15 && dawra <= 90) || !(muddatHayd >= 1 && muddatHayd <= 15) || muddatHayd >= dawra) return null;
  if (diffDays(akhirHayd, talaq) < 0) return null;
  const k0 = Math.floor(diffDays(akhirHayd, talaq) / dawra);
  const bidayatHali = addDaysYmd(akhirHayd, k0 * dawra);
  const fiHayd = diffDays(bidayatHali, talaq) < muddatHayd;
  // بدايات الحيض التي تأتي بعد يوم الطلاق
  const badaya = [1, 2, 3, 4].map((i) => addDaysYmd(akhirHayd, (k0 + i) * dawra));
  const nihaya = qur === "hayd" ? addDaysYmd(badaya[2], muddatHayd) : fiHayd ? badaya[3] : badaya[2];
  return { nihaya, fiHayd, badaya: badaya.slice(0, qur === "tuhr" && fiHayd ? 4 : 3), ayyam: diffDays(talaq, nihaya) };
}

/* ---------------- العقيقة ---------------- */

/**
 * أيام العقيقة السابع والرابع عشر والحادي والعشرون.
 * الجمهور يعدّون يوم الولادة من السبعة؛ المالكية لا يعدّونه إن وُلد بعد الفجر.
 */
export function ayyamAqiqa(wilada: YMD, yawmWiladaMahsub: boolean) {
  const bidaya = yawmWiladaMahsub ? wilada : addDaysYmd(wilada, 1);
  return [7, 14, 21].map((n) => ({ n, tarikh: addDaysYmd(bidaya, n - 1) }));
}

/* ---------------- قصر الصلاة ---------------- */

/** مسافة القصر التقريبية (أربعة برد) المعتمدة في فتاوى كثيرة. */
export const MASAFAT_QASR_KM = 80;
export type MadhhabIqama = "jumhur" | "hanafi";
/** نية الإقامة التي ينقطع بها حكم السفر: أكثر من أربعة أيام عند الجمهور، 15 يومًا فأكثر عند الحنفية. */
export const IQAMA: Record<MadhhabIqama, { ayyam: number; yanqati: (n: number) => boolean }> = {
  jumhur: { ayyam: 4, yanqati: (n) => n > 4 },
  hanafi: { ayyam: 15, yanqati: (n) => n >= 15 },
};

export function hukmQasr(km: number, iqama: number | null, madhhab: MadhhabIqama) {
  if (!(km >= 0)) return null;
  const masafa = km >= MASAFAT_QASR_KM;
  // iqama === null: لا يدري متى تنقضي حاجته، فيقصر ما دام مسافرًا
  const iqamaTawila = iqama !== null && iqama >= 0 && IQAMA[madhhab].yanqati(iqama);
  return { masafa, iqamaTawila, yaqsur: masafa && !iqamaTawila };
}

/* ---------------- حول الزكاة ---------------- */

export const NISAB_DHAHAB_G = 85;
export const NISAB_FIDDA_G = 595;
export const RUBU_USHR = 0.025;
/** نسبة الزكاة لمن يحسب بالسنة الميلادية: 2.5% × 365.25 ÷ 354.37 ≈ 2.577%. */
export const NISBA_MILADIYA = 0.02577;

export type HawlZakat = { hawl: YMD; nisab: number; balagha: boolean; zakat: number };

/** يحول الحول بعد سنة هجرية من يوم بلوغ النصاب؛ تُزكّى كل المدخرات يومها بنسبة 2.5%. */
export function hawlZakat(bulugh: YMD, rasid: number, siarGram: number, nisab: "dhahab" | "fidda", miladi: boolean): HawlZakat | null {
  if (!(rasid >= 0) || !(siarGram > 0)) return null;
  const hawl = miladi ? { ...bulugh, year: bulugh.year + 1, day: bulugh.month === 2 && bulugh.day === 29 ? 28 : bulugh.day } : addHijriMonthsTo(bulugh, 12);
  const qimatNisab = (nisab === "dhahab" ? NISAB_DHAHAB_G : NISAB_FIDDA_G) * siarGram;
  const balagha = rasid >= qimatNisab;
  return { hawl, nisab: qimatNisab, balagha, zakat: balagha ? rasid * (miladi ? NISBA_MILADIYA : RUBU_USHR) : 0 };
}
