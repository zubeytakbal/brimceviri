export type ArabicStandaloneToolComponentKey =
  | "paintCalculator"
  | "tileCalculator"
  | "brickCalculator"
  | "dateCalculator"
  | "vatCalculator"
  | "bmiCalculator"
  | "pregnancyCalculator"
  | "lengthComparison"
  | "weightComparison"
  | "paceCalculator"
  | "acCapacityCalculator"
  | "electricityConsumptionCalculator"
  | "sleepCalculator";

export type ArabicStandaloneTool = {
  slug: string;
  arabicPath: string;
  turkishPath: string;
  title: string;
  description: string;
  intro: string;
  component: ArabicStandaloneToolComponentKey;
  iconName:
    | "paintCalculator"
    | "tileCalculator"
    | "brickCalculator"
    | "dateCalculator"
    | "vatCalculator"
    | "bmiCalculator"
    | "pregnancyCalculator"
    | "length"
    | "mass"
    | "paceCalculator"
    | "acCapacityCalculator"
    | "electricityConsumptionCalculator"
    | "sleepCalculator";
  cardDescription: string;
  articleSections: Array<{
    title: string;
    body: string;
  }>;
  priority: number;
};

export const arabicStandaloneTools: ArabicStandaloneTool[] = [
  {
    slug: "paint-calculator",
    arabicPath: "/ar/paint-calculator",
    turkishPath: "/boya-hesaplama",
    title: "حاسبة الطلاء",
    description: "احسب كمية الطلاء المناسبة من أبعاد الغرفة وعدد الأبواب والنوافذ وعدد الطبقات.",
    intro: "أدخل طول الغرفة وعرضها وارتفاعها لتحصل مباشرة على المساحة القابلة للطلاء واللترات التقريبية المطلوبة.",
    component: "paintCalculator",
    iconName: "paintCalculator",
    cardDescription: "تحسب مساحة الجدران والسقف وكمية الطلاء المتوقعة.",
    articleSections: [
      {
        title: "ماذا تحسب هذه الأداة؟",
        body: "تطرح الحاسبة مساحة الأبواب والنوافذ من مساحة الجدران ثم تضرب الناتج في عدد طبقات الطلاء المطلوب تنفيذه.",
      },
      {
        title: "متى تكون مفيدة؟",
        body: "قبل شراء الطلاء تساعدك هذه الصفحة على تقدير الكمية بشكل أسرع وتجنب شراء عبوات أقل أو أكثر من الحاجة.",
      },
    ],
    priority: 0.7,
  },
  {
    slug: "tile-calculator",
    arabicPath: "/ar/tile-calculator",
    turkishPath: "/fayans-hesaplama",
    title: "حاسبة البلاط",
    description: "احسب عدد البلاط المطلوب مع نسبة الهدر اعتمادًا على المساحة وأبعاد البلاطة.",
    intro: "أدخل مساحة التركيب وأبعاد البلاط ونسبة الهدر لتحصل على عدد تقريبي مناسب للشراء.",
    component: "tileCalculator",
    iconName: "tileCalculator",
    cardDescription: "تحسب كمية البلاط المناسبة مع أخذ الهدر في الاعتبار.",
    articleSections: [
      {
        title: "لماذا نضيف نسبة هدر؟",
        body: "عند القص حول الزوايا والحواف تضيع أجزاء من البلاط غالبًا، لذلك من الأفضل تضمين هامش هدر واقعي في الحساب.",
      },
      {
        title: "كيف تستفيد من النتيجة؟",
        body: "يمكنك مقارنة العدد الناتج مع عدد القطع في كل صندوق لدى المورد لمعرفة عدد العلب المطلوب تقريبًا.",
      },
    ],
    priority: 0.7,
  },
  {
    slug: "brick-calculator",
    arabicPath: "/ar/brick-calculator",
    turkishPath: "/tugla-hesaplama",
    title: "حاسبة الطوب",
    description: "احسب عدد الطوب المطلوب مع سماكة الفواصل ونسبة الهدر لمساحة جدار محددة.",
    intro: "هذه الأداة مناسبة للتقدير الأولي السريع قبل شراء المواد أو مقارنة العروض.",
    component: "brickCalculator",
    iconName: "brickCalculator",
    cardDescription: "تحسب احتياج الطوب التقريبي مع الفواصل والهدر.",
    articleSections: [
      {
        title: "ما الذي يؤثر في العدد النهائي؟",
        body: "أبعاد الطوبة وسماكة الفاصل بين الطوب ونسبة الاحتياط كلها تغيّر العدد المطلوب بشكل واضح.",
      },
      {
        title: "هل النتيجة نهائية؟",
        body: "النتيجة مناسبة للتخطيط الأولي، لكن التنفيذ الفعلي قد يختلف حسب طريقة البناء والموقع ونوع الجدار.",
      },
    ],
    priority: 0.7,
  },
  {
    slug: "age-calculator",
    arabicPath: "/ar/age-calculator",
    turkishPath: "/yas-hesaplama",
    title: "حاسبة العمر",
    description: "احسب الفرق بين تاريخين بدقة بالسنوات والأشهر والأيام مع المجاميع الكلية.",
    intro: "مفيدة لحساب العمر أو المدة بين تاريخين أو معرفة الوقت المتبقي حتى الذكرى السنوية التالية.",
    component: "dateCalculator",
    iconName: "dateCalculator",
    cardDescription: "تحسب العمر أو الفرق بين تاريخين مع مجاميع إضافية.",
    articleSections: [
      {
        title: "لماذا لا نعرض عدد الأيام فقط؟",
        body: "في كثير من الحالات تكون صيغة السنوات والأشهر والأيام أوضح وأكثر فائدة من مجرد عدد الأيام الإجمالي.",
      },
      {
        title: "ما الذي تعرضه الصفحة أيضًا؟",
        body: "إلى جانب الفرق الدقيق، سترى مجموع الأيام والأسابيع والأشهر إضافة إلى تاريخ الذكرى التالية.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "vat-calculator",
    arabicPath: "/ar/vat-calculator",
    turkishPath: "/kdv-hesaplama",
    title: "حاسبة ضريبة القيمة المضافة",
    description: "احسب الصافي والضريبة والإجمالي بسرعة في الاتجاهين.",
    intro: "اختر اتجاه الحساب ونسبة الضريبة لمعرفة صافي السعر أو الإجمالي بشكل واضح.",
    component: "vatCalculator",
    iconName: "vatCalculator",
    cardDescription: "تحسب السعر قبل الضريبة وبعدها وقيمة الضريبة نفسها.",
    articleSections: [
      {
        title: "متى تستخدمها؟",
        body: "تفيد في العروض والفواتير والأسعار اليومية عندما تريد فصل المبلغ الأساسي عن قيمة الضريبة بسرعة.",
      },
      {
        title: "ما الفرق بين الصافي والإجمالي؟",
        body: "الصافي هو السعر قبل الضريبة، أما الإجمالي فهو السعر النهائي بعد إضافة الضريبة.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "bmi-calculator",
    arabicPath: "/ar/bmi-calculator",
    turkishPath: "/bmi-hesaplama",
    title: "حاسبة BMI",
    description: "احسب مؤشر كتلة الجسم ومعدل الأيض الأساسي والاحتياج اليومي التقريبي من السعرات.",
    intro: "باستخدام الطول والوزن والعمر والجنس ومستوى النشاط تحصل على قراءة سريعة ومفيدة.",
    component: "bmiCalculator",
    iconName: "bmiCalculator",
    cardDescription: "تحسب BMI والاحتياج اليومي التقريبي من السعرات.",
    articleSections: [
      {
        title: "ماذا يعني BMI؟",
        body: "هو مؤشر سريع يربط الوزن بالطول، ويساعد على تكوين تصور أولي لكنه لا يغني عن التقييم الصحي المتخصص.",
      },
      {
        title: "لماذا يظهر عامل النشاط؟",
        body: "لأن استهلاك الطاقة اليومي لا يعتمد على الوزن والطول فقط، بل يتأثر أيضًا بمقدار الحركة والنشاط.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "pregnancy-week-calculator",
    arabicPath: "/ar/pregnancy-week-calculator",
    turkishPath: "/gebelik-haftasi-hesaplama",
    title: "حاسبة أسابيع الحمل",
    description: "احسبي أسبوع الحمل الحالي والثُلث المتوقع وموعد الولادة التقريبي.",
    intro: "تعتمد الحاسبة على أول يوم من آخر دورة شهرية لتقديم تقدير سريع واضح.",
    component: "pregnancyCalculator",
    iconName: "pregnancyCalculator",
    cardDescription: "تعرض أسبوع الحمل والثلث الحالي وموعد الولادة التقريبي.",
    articleSections: [
      {
        title: "كيف يتم الحساب؟",
        body: "الطريقة الطبية الشائعة تبدأ من أول يوم في آخر دورة شهرية، ثم يُحسب عمر الحمل المتوقع انطلاقًا من هذا التاريخ.",
      },
      {
        title: "هل تكفي هذه الأداة وحدها؟",
        body: "هي أداة إرشادية جيدة كبداية، لكنها لا تغني عن مراجعة الطبيب أو المتابعة الطبية المعتمدة.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "length-comparison",
    arabicPath: "/ar/length-comparison",
    turkishPath: "/uzunluk-karsilastirma",
    title: "مقارنة الأطوال",
    description: "قارن أي طول مع مراجع مألوفة مثل طول الإنسان أو الزرافة أو ملعب كرة القدم أو برج إيفل.",
    intro: "هذا النوع من المقارنة يجعل الأرقام أسهل في التخيل والفهم.",
    component: "lengthComparison",
    iconName: "length",
    cardDescription: "تحول قيمة الطول إلى مقارنات بصرية مفهومة.",
    articleSections: [
      {
        title: "لماذا المقارنة المرجعية مفيدة؟",
        body: "لأن كثيرًا من الناس يصعب عليهم تصور أرقام مثل 25 مترًا أو 330 مترًا دون ربطها بأشياء مألوفة.",
      },
      {
        title: "كيف يتم ترتيب النتائج؟",
        body: "يظهر أولًا المرجع الأقرب في النسبة إلى القيمة التي أدخلتها، ثم تتبعه بقية المقارنات.",
      },
    ],
    priority: 0.6,
  },
  {
    slug: "weight-comparison",
    arabicPath: "/ar/weight-comparison",
    turkishPath: "/agirlik-karsilastirma",
    title: "مقارنة الأوزان",
    description: "قارن الوزن بقيم مألوفة مثل القطة أو الإنسان أو السيارة أو الحوت الأزرق.",
    intro: "الهدف هنا ليس الدقة العلمية المطلقة، بل تحويل الأرقام إلى شيء أسهل في الفهم.",
    component: "weightComparison",
    iconName: "mass",
    cardDescription: "يقارن الوزن مع أمثلة يومية وكبيرة الحجم.",
    articleSections: [
      {
        title: "متى تكون هذه الصفحة مفيدة؟",
        body: "عند قراءة أوزان المنتجات أو الأحمال أو القياسات الكبيرة، تساعد المقارنة المرجعية على فهم الحجم الحقيقي بسرعة.",
      },
      {
        title: "هل القيم دقيقة تمامًا؟",
        body: "القيم تقريبية ومتوسطة، والغرض منها التوضيح والمقارنة السريعة لا القياس العلمي النهائي.",
      },
    ],
    priority: 0.6,
  },
  {
    slug: "running-pace-calculator",
    arabicPath: "/ar/running-pace-calculator",
    turkishPath: "/kosu-pace-hesaplama",
    title: "حاسبة وتيرة الجري",
    description: "احسب الوتيرة أو المسافة أو الزمن، وشاهد تقديرات سباقات 5K و10K ونصف الماراثون والماراثون.",
    intro: "مفيدة للتدريب والتخطيط للسباقات وفهم العلاقة بين الزمن والمسافة والوتيرة.",
    component: "paceCalculator",
    iconName: "paceCalculator",
    cardDescription: "تحسب وتيرة الجري والزمن والمسافة مع تقديرات لسباقات معروفة.",
    articleSections: [
      {
        title: "ما الذي يمكن حسابه؟",
        body: "إذا كان لديك قيمتان من الزمن أو المسافة أو الوتيرة، يمكن استخدام الأداة لإيجاد القيمة الثالثة مباشرة.",
      },
      {
        title: "كيف نقرأ تقديرات السباق؟",
        body: "هي تقديرات مبنية على افتراض أن الوتيرة الحالية ستبقى ثابتة على كامل المسافة، لذلك تعد مرجعًا تقريبيًا لا وعدًا نهائيًا.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "ac-btu-calculator",
    arabicPath: "/ar/ac-btu-calculator",
    turkishPath: "/klima-btu-hesaplama",
    title: "حاسبة BTU للمكيف",
    description: "احسب السعة المناسبة للمكيف اعتمادًا على مساحة الغرفة وعدد الأشخاص والتعرض للشمس.",
    intro: "تساعدك هذه الصفحة في الحصول على تقدير أولي قبل اختيار جهاز التكييف المناسب.",
    component: "acCapacityCalculator",
    iconName: "acCapacityCalculator",
    cardDescription: "تقدّر سعة التكييف المناسبة للغرفة بوحدة BTU.",
    articleSections: [
      {
        title: "لماذا لا تكفي المساحة وحدها؟",
        body: "لأن عدد الأشخاص وتعرض الغرفة للشمس وكونها في الطابق الأخير كلها ترفع الحمل الحراري الفعلي.",
      },
      {
        title: "هل هذه نتيجة نهائية للشراء؟",
        body: "هي نتيجة تقديرية ممتازة كبداية، لكن من الأفضل مقارنتها أيضًا ببيانات الشركة المصنعة وظروف المكان.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "electricity-consumption-calculator",
    arabicPath: "/ar/electricity-consumption-calculator",
    turkishPath: "/elektrik-tuketimi-hesaplama",
    title: "حاسبة استهلاك الكهرباء",
    description: "احسب الاستهلاك اليومي والشهري والسنوي وتقدير التكلفة باستخدام سعر الكيلوواط ساعة.",
    intro: "تساعدك على فهم أثر تشغيل الأجهزة المختلفة على الفاتورة بشكل أسرع.",
    component: "electricityConsumptionCalculator",
    iconName: "electricityConsumptionCalculator",
    cardDescription: "تعرض الاستهلاك والتكلفة التقريبية للأجهزة الكهربائية.",
    articleSections: [
      {
        title: "متى تكون مفيدة؟",
        body: "عند مقارنة المدافئ أو المكيفات أو الأجهزة المنزلية أو أي جهاز يعمل لساعات طويلة وتريد معرفة أثره المالي.",
      },
      {
        title: "لماذا سعر الكهرباء اختياري؟",
        body: "يمكنك الاستفادة من معرفة الاستهلاك حتى دون السعر، ثم إضافة التعرفة لاحقًا للحصول على تقدير التكلفة.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "sleep-calculator",
    arabicPath: "/ar/sleep-calculator",
    turkishPath: "/uyku-hesaplama",
    title: "حاسبة النوم",
    description: "احسب أوقات النوم أو الاستيقاظ المقترحة بناءً على دورات نوم مدتها نحو 90 دقيقة.",
    intro: "تعرض الصفحة عدة خيارات عملية وتبرز المدد الأقرب للنوم الكافي.",
    component: "sleepCalculator",
    iconName: "sleepCalculator",
    cardDescription: "تقترح أوقات النوم والاستيقاظ بناءً على دورات النوم.",
    articleSections: [
      {
        title: "لماذا دورات النوم مهمة؟",
        body: "الاستيقاظ قرب نهاية الدورة يكون غالبًا أسهل من الاستيقاظ في منتصف مرحلة نوم عميق.",
      },
      {
        title: "ماذا يعني الخيار الموصى به؟",
        body: "هو الخيار الأقرب إلى النطاق الشائع للنوم الصحي للبالغين، ويُعرض كمرجع عملي وليس قاعدة صارمة.",
      },
    ],
    priority: 0.75,
  },
];

export function findArabicStandaloneToolBySlug(slug: string) {
  return arabicStandaloneTools.find((tool) => tool.slug === slug);
}

export function findArabicStandaloneToolByTurkishPath(turkishPath: string) {
  return arabicStandaloneTools.find((tool) => tool.turkishPath === turkishPath);
}
