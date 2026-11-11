// Adet ve yumurtlama hesaplayıcısının her dildeki sayfa metni ve hreflang grubu.
import type { FaqItem } from "../converter/faqSchema";
import type { CycleLang } from "../components/CycleCalculator";

export const CYCLE_PATHS: Record<CycleLang, string> = {
  tr: "/yumurtlama-hesaplama",
  en: "/en/ovulation-calculator",
  de: "/de/eisprungrechner",
};

export function cycleAlternates() {
  return { ...CYCLE_PATHS, "x-default": CYCLE_PATHS.en };
}

type Content = {
  locale: string;
  home: { href: string; label: string };
  crumb: string;
  title: string;
  seoTitle: string;
  description: string;
  intro: string;
  howTitle: string;
  how: string[];
  tableTitle: string;
  tableHead: [string, string, string];
  dayWord: (n: string) => string;
  faqTitle: string;
  faq: FaqItem[];
  tocTitle: string;
  relatedTitle: string;
  related: Array<{ href: string; label: string }>;
};

export const CYCLE_TABLE = [21, 24, 26, 28, 30, 32, 35];

export const CYCLE_CONTENT: Record<CycleLang, Content> = {
  tr: {
    locale: "tr_TR",
    home: { href: "/", label: "Ana Sayfa" },
    crumb: "Yumurtlama Hesaplama",
    title: "Yumurtlama ve Adet Takvimi Hesaplama",
    seoTitle: "Yumurtlama Hesaplama: Adet Takvimi ve Doğurgan Günler",
    description: "Son adet tarihini ve döngü uzunluğunu gir: yumurtlama günü, doğurgan dönem, sonraki adet tarihi, gebelik testi günü ve renkli adet takvimi.",
    intro: "",
    howTitle: "Yumurtlama günü nasıl hesaplanır?",
    how: [
      "Yumurtlama, bir sonraki adetten yaklaşık 14 gün önce olur. Bu yüzden döngü uzunluğundan 14 çıkarılır: 28 günlük döngüde 14. gün, 32 günlük döngüde 18. gün.",
      "Sperm 5 güne kadar canlı kalabildiği için doğurgan dönem yumurtlamadan 5 gün önce başlar ve yumurtlamadan 1 gün sonra biter.",
      "Yumurtlamadan sonraki evre (luteal faz) çoğu kadında 12–14 gün sürer; bazal ateş ya da ovülasyon testiyle kendi luteal fazınızı biliyorsanız 10–16 arasında girebilirsiniz. Araç ayrıca bugün yumurtlamadan sonraki kaçıncı günde (DPO) olduğunuzu ve tutunma aralığını gösterir.",
    ],
    tableTitle: "Döngü uzunluğuna göre yumurtlama günü",
    tableHead: ["Döngü", "Yumurtlama", "Doğurgan dönem"],
    dayWord: (n) => `${n}. gün`,
    faqTitle: "Sık sorulan sorular",
    faq: [
      { question: "Adetten kaç gün sonra yumurtlama olur?", answer: "28 günlük düzenli döngüde adetin ilk gününden itibaren yaklaşık 14. gün. Döngü daha uzunsa yumurtlama da o kadar geç olur: döngü uzunluğu − 14." },
      { question: "Doğurgan dönem kaç gün sürer?", answer: "Yaklaşık 6–7 gün: yumurtlamadan önceki 5 gün, yumurtlama günü ve sonraki gün. Gebe kalma şansı yumurtlamadan 1–2 gün önce en yüksektir." },
      { question: "Gebelik testi ne zaman yapılır?", answer: "En güvenilir sonuç adetin geciktiği ilk gün ya da sonrasında alınır; bu yaklaşık yumurtlamadan 14 gün sonradır." },
      { question: "Düzensiz adette bu hesap doğru mu?", answer: "Takvim yöntemi düzenli döngüler için tahmindir. Döngüleriniz her ay çok değişiyorsa ovülasyon testi ya da doktor takibi daha güvenilirdir." },
    ],
    tocTitle: "İçindekiler",
    relatedTitle: "İlgili araçlar",
    related: [
      { href: "/gebelik-haftasi-hesaplama", label: "Gebelik haftası hesaplama" },
      { href: "/hayiz-hesaplama", label: "Hayız ve temizlik günleri hesaplama" },
      { href: "/iki-tarih-arasi-gun-hesaplama", label: "İki tarih arası gün hesaplama" },
    ],
  },
  en: {
    locale: "en_US",
    home: { href: "/en", label: "Home" },
    crumb: "Ovulation Calculator",
    title: "Ovulation and Period Calculator",
    seoTitle: "Ovulation Calculator: Fertile Window and Next Period",
    description: "Enter the first day of your last period and your cycle length: ovulation day, fertile window, next period, when to take a pregnancy test and a color-coded calendar.",
    intro: "Enter the first day of your last period, your cycle length and how long your period lasts to see your ovulation day, your most fertile days, your next period and a color-coded calendar.",
    howTitle: "How is ovulation calculated?",
    how: [
      "Ovulation happens about 14 days before your next period, so subtract 14 from your cycle length: day 14 of a 28-day cycle, day 18 of a 32-day cycle.",
      "Sperm can live for up to 5 days, so the fertile window starts 5 days before ovulation and ends the day after it.",
      "The phase after ovulation (luteal phase) lasts 12–14 days for most women; if you know yours from temperature charting or ovulation tests, enter 10–16. The calculator also shows how many days past ovulation (DPO) you are today and your implantation window.",
    ],
    tableTitle: "Ovulation day by cycle length",
    tableHead: ["Cycle", "Ovulation", "Fertile window"],
    dayWord: (n) => `day ${n}`,
    faqTitle: "Frequently asked questions",
    faq: [
      { question: "How many days after my period do I ovulate?", answer: "In a regular 28-day cycle, around day 14 counted from the first day of your period. In longer cycles ovulation comes later: cycle length minus 14." },
      { question: "How long is the fertile window?", answer: "About 6 days: the 5 days before ovulation and ovulation day, plus the following day. The chance of pregnancy is highest 1–2 days before ovulation." },
      { question: "How many days past ovulation should I test?", answer: "For the most reliable result, test on the day your period is due or later, which is about 14 days past ovulation." },
      { question: "Does this work with irregular periods?", answer: "The calendar method is an estimate for regular cycles. If your cycle length changes a lot from month to month, ovulation tests or tracking with your doctor are more reliable." },
    ],
    tocTitle: "Contents",
    relatedTitle: "Related tools",
    related: [
      { href: "/en/pregnancy-week-calculator", label: "Pregnancy week calculator" },
      { href: "/en/age-calculator", label: "Age calculator" },
    ],
  },
  de: {
    locale: "de_DE",
    home: { href: "/de", label: "Startseite" },
    crumb: "Eisprungrechner",
    title: "Eisprungrechner und Zykluskalender",
    seoTitle: "Eisprungrechner: Fruchtbare Tage und nächste Periode",
    description: "Ersten Tag der letzten Periode und Zykluslänge eingeben: Eisprung, fruchtbare Tage, nächste Periode, wann der Schwangerschaftstest sinnvoll ist und farbiger Zykluskalender.",
    intro: "Geben Sie den ersten Tag Ihrer letzten Periode, die Zykluslänge und die Periodendauer ein und sehen Sie Eisprung, fruchtbare Tage, nächste Periode und einen farbigen Kalender.",
    howTitle: "Wie wird der Eisprung berechnet?",
    how: [
      "Der Eisprung findet etwa 14 Tage vor der nächsten Periode statt. Man zieht also 14 von der Zykluslänge ab: Tag 14 bei 28 Tagen, Tag 18 bei 32 Tagen.",
      "Spermien überleben bis zu 5 Tage, daher beginnen die fruchtbaren Tage 5 Tage vor dem Eisprung und enden einen Tag danach.",
      "Die Lutealphase nach dem Eisprung dauert bei den meisten Frauen 12–14 Tage. Wenn Sie Ihre aus der Basaltemperatur oder Ovulationstests kennen (z. B. eine kurze Lutealphase), geben Sie 10–16 Tage ein. Der Rechner zeigt außerdem, bei ES+ wie vielen Tagen Sie heute sind, und das Zeitfenster der Einnistung.",
    ],
    tableTitle: "Eisprung nach Zykluslänge",
    tableHead: ["Zyklus", "Eisprung", "Fruchtbare Tage"],
    dayWord: (n) => `Tag ${n}`,
    faqTitle: "Häufige Fragen",
    faq: [
      { question: "Wann habe ich meinen Eisprung?", answer: "Bei einem regelmäßigen 28-Tage-Zyklus etwa an Tag 14, gezählt ab dem ersten Tag der Periode. Bei längeren Zyklen später: Zykluslänge minus 14." },
      { question: "Wie viele fruchtbare Tage gibt es?", answer: "Etwa 6: die 5 Tage vor dem Eisprung und der Tag des Eisprungs, dazu der Folgetag. Am höchsten ist die Chance 1–2 Tage vor dem Eisprung." },
      { question: "Ab wann ist ein Schwangerschaftstest sinnvoll?", answer: "Am zuverlässigsten ab dem Tag, an dem die Periode fällig wäre, also etwa 14 Tage nach dem Eisprung." },
      { question: "Funktioniert der Rechner bei unregelmäßigem Zyklus?", answer: "Die Kalendermethode ist eine Schätzung für regelmäßige Zyklen. Schwankt Ihr Zyklus stark, sind Ovulationstests oder ärztliche Zyklusbeobachtung zuverlässiger." },
    ],
    tocTitle: "Inhalt",
    relatedTitle: "Passende Rechner",
    related: [{ href: "/de/schwangerschaftswochen-rechner", label: "Schwangerschaftswochen-Rechner" }],
  },
};
