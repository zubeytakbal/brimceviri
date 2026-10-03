// Adet ve yumurtlama hesaplayıcısının her dildeki sayfa metni ve hreflang grubu.
import type { FaqItem } from "../converter/faqSchema";
import type { CycleLang } from "../components/CycleCalculator";

export const CYCLE_PATHS: Record<CycleLang, string> = {
  tr: "/yumurtlama-hesaplama",
  en: "/en/ovulation-calculator",
  de: "/de/eisprungrechner",
  es: "/es/calculadora-de-ovulacion",
  pt: "/pt/calculadora-periodo-fertil",
  bn: "/bn/ovulation-calculator",
  uz: "/uz/ovulyatsiya-hisoblash",
};

export function cycleAlternates() {
  const { uz, ...rest } = CYCLE_PATHS;
  return { ...rest, "uz-UZ": uz, "x-default": CYCLE_PATHS.en };
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
    intro: "Son adetinin ilk gününü, döngü uzunluğunu ve adet süresini gir; yumurtlama gününü, gebe kalma şansının en yüksek olduğu günleri, sonraki adetini ve renkli takvimi gör.",
    howTitle: "Yumurtlama günü nasıl hesaplanır?",
    how: [
      "Yumurtlama, bir sonraki adetten yaklaşık 14 gün önce olur. Bu yüzden döngü uzunluğundan 14 çıkarılır: 28 günlük döngüde 14. gün, 32 günlük döngüde 18. gün.",
      "Sperm 5 güne kadar canlı kalabildiği için doğurgan dönem yumurtlamadan 5 gün önce başlar ve yumurtlamadan 1 gün sonra biter.",
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
  es: {
    locale: "es_ES",
    home: { href: "/es", label: "Inicio" },
    crumb: "Calculadora de ovulación",
    title: "Calculadora de ovulación y días fértiles",
    seoTitle: "Calculadora de ovulación: días fértiles y próxima regla",
    description: "Escribe el primer día de tu última regla y la duración de tu ciclo: día de ovulación, días fértiles, próxima regla, cuándo hacer la prueba de embarazo y calendario en colores.",
    intro: "Introduce el primer día de tu última regla, la duración del ciclo y cuántos días te dura la regla para ver tu día de ovulación, tus días fértiles, tu próxima regla y un calendario en colores.",
    howTitle: "¿Cómo se calcula la ovulación?",
    how: [
      "La ovulación ocurre unos 14 días antes de la siguiente regla, así que se restan 14 a la duración del ciclo: día 14 en un ciclo de 28 días, día 18 en uno de 32.",
      "Los espermatozoides viven hasta 5 días, por eso los días fértiles empiezan 5 días antes de la ovulación y terminan el día siguiente.",
    ],
    tableTitle: "Día de ovulación según la duración del ciclo",
    tableHead: ["Ciclo", "Ovulación", "Días fértiles"],
    dayWord: (n) => `día ${n}`,
    faqTitle: "Preguntas frecuentes",
    faq: [
      { question: "¿Cuántos días después de la regla se ovula?", answer: "En un ciclo regular de 28 días, alrededor del día 14 contando desde el primer día de la regla. En ciclos más largos, más tarde: duración del ciclo menos 14." },
      { question: "¿Cuántos días fértiles tiene una mujer?", answer: "Unos 6: los 5 días antes de la ovulación y el día de la ovulación, más el día siguiente. La probabilidad es mayor 1–2 días antes de ovular." },
      { question: "¿Cuándo hacerse la prueba de embarazo?", answer: "El resultado más fiable se obtiene desde el día en que debería bajar la regla, unos 14 días después de la ovulación." },
      { question: "¿Sirve si mi regla es irregular?", answer: "El método del calendario es una estimación para ciclos regulares. Si tu ciclo cambia mucho cada mes, los test de ovulación o el seguimiento médico son más fiables." },
    ],
    tocTitle: "Contenido",
    relatedTitle: "Herramientas relacionadas",
    related: [{ href: "/es", label: "Todas las calculadoras" }],
  },
  pt: {
    locale: "pt_BR",
    home: { href: "/pt", label: "Início" },
    crumb: "Calculadora de período fértil",
    title: "Calculadora de período fértil e ovulação",
    seoTitle: "Calculadora de período fértil: ovulação e próxima menstruação",
    description: "Informe o primeiro dia da última menstruação e a duração do ciclo: dia da ovulação, período fértil, próxima menstruação, quando fazer o teste de gravidez e calendário colorido.",
    intro: "Informe o primeiro dia da sua última menstruação, a duração do ciclo e quantos dias ela dura para ver o dia da ovulação, o período fértil, a próxima menstruação e um calendário colorido.",
    howTitle: "Como calcular o período fértil?",
    how: [
      "A ovulação acontece cerca de 14 dias antes da próxima menstruação, então subtraia 14 da duração do ciclo: dia 14 num ciclo de 28 dias, dia 18 num ciclo de 32 dias.",
      "Os espermatozoides vivem até 5 dias, por isso o período fértil começa 5 dias antes da ovulação e termina no dia seguinte a ela.",
    ],
    tableTitle: "Dia da ovulação pela duração do ciclo",
    tableHead: ["Ciclo", "Ovulação", "Período fértil"],
    dayWord: (n) => `${n}º dia`,
    faqTitle: "Perguntas frequentes",
    faq: [
      { question: "Quantos dias depois da menstruação é o período fértil?", answer: "Num ciclo regular de 28 dias, a ovulação é por volta do 14º dia contado do primeiro dia da menstruação, e o período fértil vai do 9º ao 15º dia." },
      { question: "Quantos dias dura o período fértil?", answer: "Cerca de 6 dias: os 5 dias antes da ovulação e o dia da ovulação, mais o dia seguinte. A chance é maior 1–2 dias antes da ovulação." },
      { question: "Quando fazer o teste de gravidez?", answer: "O resultado mais confiável vem a partir do dia em que a menstruação deveria descer, cerca de 14 dias depois da ovulação." },
      { question: "A tabelinha funciona com ciclo irregular?", answer: "É uma estimativa para ciclos regulares. Se o seu ciclo muda muito de um mês para outro, testes de ovulação ou acompanhamento médico são mais confiáveis." },
    ],
    tocTitle: "Conteúdo",
    relatedTitle: "Ferramentas relacionadas",
    related: [{ href: "/pt", label: "Todas as calculadoras" }],
  },
  bn: {
    locale: "bn_BD",
    home: { href: "/bn", label: "হোম" },
    crumb: "ওভুলেশন ক্যালকুলেটর",
    title: "ওভুলেশন ও মাসিক ক্যালকুলেটর",
    seoTitle: "ওভুলেশন ক্যালকুলেটর: উর্বর সময় ও পরবর্তী মাসিকের তারিখ",
    description: "শেষ মাসিকের প্রথম দিন ও চক্রের দৈর্ঘ্য দিন: ওভুলেশনের দিন, উর্বর সময়, পরবর্তী মাসিক, প্রেগনেন্সি টেস্টের দিন এবং রঙিন ক্যালেন্ডার।",
    intro: "শেষ মাসিকের প্রথম দিন, চক্র কত দিনের এবং মাসিক কত দিন থাকে লিখুন; ওভুলেশনের দিন, গর্ভধারণের সম্ভাবনা বেশি এমন দিন, পরবর্তী মাসিক ও রঙিন ক্যালেন্ডার দেখুন।",
    howTitle: "ওভুলেশন কিভাবে হিসাব করা হয়?",
    how: [
      "পরবর্তী মাসিকের প্রায় ১৪ দিন আগে ওভুলেশন হয়। তাই চক্রের দৈর্ঘ্য থেকে ১৪ বাদ দিন: ২৮ দিনের চক্রে ১৪তম দিন, ৩২ দিনের চক্রে ১৮তম দিন।",
      "শুক্রাণু ৫ দিন পর্যন্ত বাঁচে, তাই উর্বর সময় ওভুলেশনের ৫ দিন আগে শুরু হয়ে ওভুলেশনের পরের দিন শেষ হয়।",
    ],
    tableTitle: "চক্রের দৈর্ঘ্য অনুযায়ী ওভুলেশনের দিন",
    tableHead: ["চক্র", "ওভুলেশন", "উর্বর সময়"],
    dayWord: (n) => `${n}তম দিন`,
    faqTitle: "সাধারণ প্রশ্ন",
    faq: [
      { question: "মাসিকের কত দিন পর ওভুলেশন হয়?", answer: "নিয়মিত ২৮ দিনের চক্রে মাসিকের প্রথম দিন থেকে গুনে প্রায় ১৪তম দিনে। চক্র লম্বা হলে ওভুলেশনও দেরিতে হয়: চক্রের দৈর্ঘ্য − ১৪।" },
      { question: "ওভুলেশন কত দিন থাকে?", answer: "ডিম্বাণু প্রায় ১২–২৪ ঘণ্টা বাঁচে, কিন্তু উর্বর সময় প্রায় ৬ দিন: ওভুলেশনের আগের ৫ দিন, ওভুলেশনের দিন ও পরের দিন।" },
      { question: "কত দিন মাসিক না হলে প্রেগনেন্সি টেস্ট করব?", answer: "যে দিন মাসিক হওয়ার কথা সেদিন বা তার পর টেস্ট করলে ফল সবচেয়ে নির্ভরযোগ্য হয়, অর্থাৎ ওভুলেশনের প্রায় ১৪ দিন পর।" },
      { question: "অনিয়মিত মাসিকে এই হিসাব কি ঠিক?", answer: "ক্যালেন্ডার পদ্ধতি নিয়মিত চক্রের জন্য আনুমানিক। প্রতি মাসে চক্র অনেক বদলালে ওভুলেশন টেস্ট বা ডাক্তারের পরামর্শ বেশি নির্ভরযোগ্য।" },
    ],
    tocTitle: "সূচিপত্র",
    relatedTitle: "আরও টুল",
    related: [{ href: "/bn/islamic-tools", label: "ইসলামিক টুলস" }],
  },
  uz: {
    locale: "uz_UZ",
    home: { href: "/uz", label: "Bosh sahifa" },
    crumb: "Ovulyatsiya hisoblash",
    title: "Ovulyatsiya va hayz kalendari hisoblash",
    seoTitle: "Ovulyatsiya hisoblash: unumdor kunlar va keyingi hayz",
    description: "Oxirgi hayzning birinchi kuni va sikl davomiyligini kiriting: ovulyatsiya kuni, unumdor kunlar, keyingi hayz, homiladorlik testi kuni va rangli kalendar.",
    intro: "Oxirgi hayzning birinchi kuni, sikl davomiyligi va hayz necha kun davom etishini kiriting: ovulyatsiya kuni, homilador bo'lish ehtimoli eng yuqori kunlar, keyingi hayz va rangli kalendarni ko'ring.",
    howTitle: "Ovulyatsiya qanday hisoblanadi?",
    how: [
      "Ovulyatsiya keyingi hayzdan taxminan 14 kun oldin bo'ladi, shuning uchun sikl davomiyligidan 14 ayiriladi: 28 kunlik siklda 14-kun, 32 kunlik siklda 18-kun.",
      "Spermatozoidlar 5 kungacha yashaydi, shuning uchun unumdor kunlar ovulyatsiyadan 5 kun oldin boshlanib, ovulyatsiyadan keyingi kuni tugaydi.",
    ],
    tableTitle: "Sikl davomiyligi bo'yicha ovulyatsiya kuni",
    tableHead: ["Sikl", "Ovulyatsiya", "Unumdor kunlar"],
    dayWord: (n) => `${n}-kun`,
    faqTitle: "Ko'p beriladigan savollar",
    faq: [
      { question: "Hayzdan necha kun keyin ovulyatsiya bo'ladi?", answer: "Muntazam 28 kunlik siklda hayzning birinchi kunidan hisoblaganda taxminan 14-kunda. Sikl uzunroq bo'lsa, kechroq: sikl davomiyligi minus 14." },
      { question: "Ovulyatsiya necha kun davom etadi?", answer: "Tuxum hujayra 12–24 soat yashaydi, ammo unumdor davr taxminan 6 kun: ovulyatsiyadan oldingi 5 kun, ovulyatsiya kuni va keyingi kun." },
      { question: "Homiladorlik testini qachon qilish kerak?", answer: "Eng ishonchli natija hayz kelishi kerak bo'lgan kundan boshlab olinadi, ya'ni ovulyatsiyadan taxminan 14 kun keyin." },
      { question: "Hayz notekis bo'lsa hisob to'g'rimi?", answer: "Kalendar usuli muntazam sikllar uchun taxmin. Sikl har oy ko'p o'zgarsa, ovulyatsiya testlari yoki shifokor kuzatuvi ishonchliroq." },
    ],
    tocTitle: "Mundarija",
    relatedTitle: "Boshqa vositalar",
    related: [{ href: "/uz/qazo-namoz-hisoblash", label: "Qazo namozlarni hisoblash" }],
  },
};
