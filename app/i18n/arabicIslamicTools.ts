// الأدوات الإسلامية بالعربية: تُستخدم في الصفحة الجامعة والروابط والبحث وخريطة الموقع.
import { ARABIC_ISLAMIC_HUB, ARABIC_ISLAMIC_PATHS, ISLAMIC_TOOL_PATHS } from "./islamicToolPaths";

export const ARABIC_ISLAMIC_TOOLS = [
  { href: ISLAMIC_TOOL_PATHS.zakat.ar, label: "حاسبة الزكاة", text: "زكاة المال والذهب بالعيار (21 و18 و24) والفضة، وحول زكاة الراتب والمدخرات." },
  { href: ARABIC_ISLAMIC_PATHS.iddah, label: "حاسبة العدة", text: "متى تنتهي عدة الوفاة والطلاق والحامل بالتاريخ الهجري والميلادي." },
  { href: ARABIC_ISLAMIC_PATHS.aqiqah, label: "حساب يوم العقيقة", text: "اليوم السابع والرابع عشر والحادي والعشرون من الولادة، مع طريقة المالكية." },
  { href: ISLAMIC_TOOL_PATHS.qasr.ar, label: "حاسبة قصر الصلاة للمسافر", text: "هل تقصر الصلاة؟ مسافة القصر ومدة الإقامة عند الجمهور والحنفية." },
  { href: "/ar/prayer-times-calculator", label: "مواقيت الصلاة واتجاه القبلة", text: "أوقات الصلاة واتجاه القبلة لموقعك بطرق الحساب المختلفة." },
  { href: "/ar/hijri-date-converter", label: "تحويل التاريخ هجري ميلادي", text: "تحويل أي تاريخ بين الهجري والميلادي." },
  { href: "/ar/hijri-age-calculator", label: "حساب العمر بالهجري", text: "عمرك بالهجري والميلادي وعيد ميلادك الهجري القادم." },
  { href: "/ar/occasions", label: "المناسبات الإسلامية", text: "متى رمضان والعيدان ويوم عرفة؟ وكم باقي؟" },
];

/** الصفحات الجديدة التي تُضاف إلى خريطة الموقع (الزكاة ومواقيت الصلاة وغيرها مضافة من قبل). */
export const ARABIC_ISLAMIC_SITEMAP = [ARABIC_ISLAMIC_HUB, ARABIC_ISLAMIC_PATHS.iddah, ARABIC_ISLAMIC_PATHS.aqiqah, ISLAMIC_TOOL_PATHS.qasr.ar];
