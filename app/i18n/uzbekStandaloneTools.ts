export type UzbekStandaloneToolComponentKey =
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
  | "sleepCalculator"
  | "fuelConsumptionCalculator"
  | "laminateCalculator"
  | "wallpaperCalculator"
  | "movingBoxCalculator"
  | "naturalGasCalculator"
  | "evChargingCalculator";

export type UzbekStandaloneTool = {
  slug: string;
  uzbekPath: string;
  turkishPath: string;
  title: string;
  description: string;
  intro: string;
  component: UzbekStandaloneToolComponentKey;
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
    | "sleepCalculator"
    | "fuelConsumptionCalculator"
    | "laminateCalculator"
    | "wallpaperCalculator"
    | "movingBoxCalculator"
    | "naturalGasCalculator"
    | "evChargingCalculator";
  cardDescription: string;
  articleSections: Array<{
    title: string;
    body: string;
  }>;
  priority: number;
};

export const uzbekStandaloneTools: UzbekStandaloneTool[] = [
  {
    slug: "boya-hisoblash",
    uzbekPath: "/uz/boya-hisoblash",
    turkishPath: "/boya-hesaplama",
    title: "Bo'yoq Hisoblagich",
    description:
      "Xona o'lchamlari, eshik va deraza soni hamda qatlamlar soniga qarab qancha bo'yoq kerakligini hisoblang.",
    intro:
      "Xonaning uzunligi, kengligi va balandligini kiriting — bo'yaladigan maydon va taxminan kerakli bo'yoq litri darhol chiqadi.",
    component: "paintCalculator",
    iconName: "paintCalculator",
    cardDescription: "Devor va shift maydonini hamda kerakli bo'yoq miqdorini hisoblaydi.",
    articleSections: [
      {
        title: "Bu vosita nimani hisoblaydi?",
        body: "Hisoblagich devor maydonidan eshik va derazalar maydonini ayiradi, so'ng natijani qo'llamoqchi bo'lgan qatlamlar soniga ko'paytiradi.",
      },
      {
        title: "Qachon foydali?",
        body: "Bo'yoq sotib olishdan oldin bu sahifa miqdorni tezroq baholashga va kam yoki ortiqcha xarid qilishning oldini olishga yordam beradi.",
      },
    ],
    priority: 0.7,
  },
  {
    slug: "yosh-hisoblash",
    uzbekPath: "/uz/yosh-hisoblash",
    turkishPath: "/yas-hesaplama",
    title: "Yosh Hisoblagich",
    description:
      "Ikki sana orasidagi farqni yil, oy va kun bo'yicha aniq hisoblang, jami qiymatlarni ham ko'ring.",
    intro:
      "Yoshni, ikki sana orasidagi muddatni yoki keyingi yil to'lish sanasigacha qolgan vaqtni hisoblash uchun foydali.",
    component: "dateCalculator",
    iconName: "dateCalculator",
    cardDescription: "Yosh yoki ikki sana orasidagi farqni va qo'shimcha jami qiymatlarni hisoblaydi.",
    articleSections: [
      {
        title: "Nega faqat kun soni ko'rsatilmaydi?",
        body: "Ko'p hollarda yil-oy-kun ko'rinishidagi taqsimot yagona umumiy kun sonidan ko'ra tushunarliroq va foydaliroqdir.",
      },
      {
        title: "Sahifada yana nima ko'rsatiladi?",
        body: "Aniq farq bilan birga, jami kun, hafta va oy soni, shuningdek keyingi yil to'lish sanasi ham ko'rinadi.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "qqs-hisoblash",
    uzbekPath: "/uz/qqs-hisoblash",
    turkishPath: "/kdv-hesaplama",
    title: "QQS Hisoblagich",
    description:
      "Sof summani, soliqni va jami summani har ikki yo'nalishda tezda hisoblang.",
    intro:
      "Hisoblash yo'nalishini va soliq stavkasini tanlang — soliqsiz narx yoki jami narx darhol aniq ko'rinadi.",
    component: "vatCalculator",
    iconName: "vatCalculator",
    cardDescription: "Soliqdan oldingi va keyingi narxni hamda soliq summasini hisoblaydi.",
    articleSections: [
      {
        title: "Qachon foydali?",
        body: "Hisob-kitoblar, hisob-fakturalar va kundalik narxlarda asosiy summani soliq summasidan tezda ajratib olmoqchi bo'lganingizda qo'l keladi.",
      },
      {
        title: "Sof va jami summa orasidagi farq nima?",
        body: "Sof summa — soliqdan oldingi narx; jami summa esa soliq qo'shilgandan keyingi yakuniy narx.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "bmi-hisoblash",
    uzbekPath: "/uz/bmi-hisoblash",
    turkishPath: "/bmi-hesaplama",
    title: "BMI Hisoblagich",
    description:
      "Tana vazn indeksingizni, asosiy almashinuv tezligingizni va taxminiy kunlik kaloriya ehtiyojingizni hisoblang.",
    intro:
      "Bo'y, vazn, yosh, jins va faollik darajangizga asoslanib tez va foydali natija olasiz.",
    component: "bmiCalculator",
    iconName: "bmiCalculator",
    cardDescription: "BMI va taxminiy kunlik kaloriya ehtiyojini hisoblaydi.",
    articleSections: [
      {
        title: "BMI nimani anglatadi?",
        body: "Bu vazn va bo'yni bog'lovchi tezkor ko'rsatkich bo'lib, dastlabki tasavvur hosil qilish uchun foydali, biroq mutaxassis tibbiy baholashning o'rnini bosmaydi.",
      },
      {
        title: "Nega faollik darajasi ko'rsatiladi?",
        body: "Chunki kunlik energiya sarfi faqat vazn va bo'yga bog'liq emas — qancha harakat qilishingiz ham unga ta'sir qiladi.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "fayans-hisoblash",
    uzbekPath: "/uz/fayans-hisoblash",
    turkishPath: "/fayans-hesaplama",
    title: "Fayans Hisoblagich",
    description:
      "Maydon va kafel o'lchamlariga, shuningdek zaxira foiziga qarab kerakli kafel sonini hisoblang.",
    intro:
      "O'rnatiladigan maydonni, kafel o'lchamlarini va zaxira foizini kiriting — taxminan qancha kafel sotib olish kerakligini bilib olasiz.",
    component: "tileCalculator",
    iconName: "tileCalculator",
    cardDescription: "Zaxirani hisobga olgan holda kerakli kafel miqdorini hisoblaydi.",
    articleSections: [
      {
        title: "Nega zaxira foizi kerak?",
        body: "Burchaklar va chetlar atrofida kafelni kesish odatda materialning bir qismini isrof qiladi, shuning uchun hisobga real zaxira chegarasini kiritish maqsadga muvofiq.",
      },
      {
        title: "Natijadan qanday foydalaniladi?",
        body: "Chiqqan sonni ta'minotchingizdagi qutidagi dona soniga solishtirib, taxminan nechta quti kerakligini bilib olishingiz mumkin.",
      },
    ],
    priority: 0.7,
  },
  {
    slug: "gisht-hisoblash",
    uzbekPath: "/uz/gisht-hisoblash",
    turkishPath: "/tugla-hesaplama",
    title: "G'isht Hisoblagich",
    description:
      "Berilgan devor maydoni uchun, choklar qalinligi va zaxira foizini hisobga olgan holda kerakli g'isht sonini hisoblang.",
    intro:
      "Bu vosita material sotib olishdan yoki ta'minotchi takliflarini solishtirishdan oldin tezkor dastlabki baholash uchun mos keladi.",
    component: "brickCalculator",
    iconName: "brickCalculator",
    cardDescription: "Choklar va zaxirani hisobga olgan holda taxminiy g'isht ehtiyojini hisoblaydi.",
    articleSections: [
      {
        title: "Yakuniy songa nima ta'sir qiladi?",
        body: "G'isht o'lchamlari, g'ishtlar orasidagi chok qalinligi va tanlangan xavfsizlik chegarasi kerakli miqdorni sezilarli darajada o'zgartiradi.",
      },
      {
        title: "Natija yakuniymi?",
        body: "Natija dastlabki rejalashtirish uchun mos, ammo haqiqiy qurilish qurilish usuli, joy sharoiti va devor turiga qarab farq qilishi mumkin.",
      },
    ],
    priority: 0.7,
  },
  {
    slug: "homiladorlik-haftasi-hisoblash",
    uzbekPath: "/uz/homiladorlik-haftasi-hisoblash",
    turkishPath: "/gebelik-haftasi-hesaplama",
    title: "Homiladorlik Haftasi Hisoblagich",
    description:
      "Hozirgi homiladorlik haftasini, kutilayotgan trimestrni va taxminiy tug'ilish sanasini hisoblang.",
    intro:
      "Hisoblagich so'nggi hayz kunining birinchi kunidan foydalanib tez va aniq taxmin beradi.",
    component: "pregnancyCalculator",
    iconName: "pregnancyCalculator",
    cardDescription: "Hozirgi homiladorlik haftasi, trimestr va taxminiy tug'ilish sanasini ko'rsatadi.",
    articleSections: [
      {
        title: "Hisoblash qanday amalga oshiriladi?",
        body: "Keng qo'llaniladigan tibbiy usul so'nggi hayz kunining birinchi kunidan boshlanadi va homiladorlik yoshi shu sanadan boshlab hisoblanadi.",
      },
      {
        title: "Bu vosita yetarlimi?",
        body: "Bu yaxshi boshlang'ich yo'l ko'rsatuvchi, ammo shifokorga tashrif buyurish yoki tasdiqlangan tibbiy kuzatuvning o'rnini bosmaydi.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "uzunlik-solishtirish",
    uzbekPath: "/uz/uzunlik-solishtirish",
    turkishPath: "/uzunluk-karsilastirma",
    title: "Uzunlik Solishtirish",
    description:
      "Har qanday uzunlikni tanish narsalar bilan solishtiring — inson bo'yi, jirafa, futbol maydoni yoki Eyfel minorasi kabi.",
    intro:
      "Bunday solishtirish raqamlarni tasavvur qilish va tushunishni ancha osonlashtiradi.",
    component: "lengthComparison",
    iconName: "length",
    cardDescription: "Uzunlik qiymatini tushunarli vizual solishtirishlarga aylantiradi.",
    articleSections: [
      {
        title: "Nega ma'lumotnoma bilan solishtirish foydali?",
        body: "Ko'p odamlar 25 metr yoki 330 metr kabi raqamlarni tanish biror narsaga bog'lamasdan tasavvur qilishga qiynaladi.",
      },
      {
        title: "Natijalar qanday tartiblangan?",
        body: "Kiritilgan qiymatga nisbat jihatidan eng yaqin ma'lumotnoma birinchi bo'lib chiqadi, undan keyin qolgan solishtirishlar keladi.",
      },
    ],
    priority: 0.6,
  },
  {
    slug: "ogirlik-solishtirish",
    uzbekPath: "/uz/ogirlik-solishtirish",
    turkishPath: "/agirlik-karsilastirma",
    title: "Og'irlik Solishtirish",
    description:
      "Og'irlikni tanish qiymatlar bilan solishtiring — mushuk, inson, avtomobil yoki ko'k kit kabi.",
    intro:
      "Bu yerdagi maqsad mutlaq ilmiy aniqlik emas, balki raqamlarni tushunish osonroq narsaga aylantirish.",
    component: "weightComparison",
    iconName: "mass",
    cardDescription: "Og'irlikni kundalik va katta miqyosdagi misollar bilan solishtiradi.",
    articleSections: [
      {
        title: "Bu sahifa qachon foydali?",
        body: "Mahsulotlar, yuklar yoki katta o'lchovlarning og'irligini o'qiganingizda, ma'lumotnoma bilan solishtirish haqiqiy miqyosni tezda tushunishga yordam beradi.",
      },
      {
        title: "Qiymatlar aniqmi?",
        body: "Qiymatlar taxminiy o'rtacha ko'rsatkichlar bo'lib, yakuniy ilmiy o'lchov emas, balki tasvirlash va tezkor solishtirish uchun mo'ljallangan.",
      },
    ],
    priority: 0.6,
  },
  {
    slug: "yugurish-tempi-hisoblash",
    uzbekPath: "/uz/yugurish-tempi-hisoblash",
    turkishPath: "/kosu-pace-hesaplama",
    title: "Yugurish Tempi Hisoblagich",
    description:
      "Tempni, masofani yoki vaqtni hisoblang va 5 km, 10 km, yarim marafon va marafon uchun taxminlarni ko'ring.",
    intro:
      "Mashg'ulot, poyga rejalashtirish va vaqt, masofa va temp o'rtasidagi bog'liqlikni tushunish uchun foydali.",
    component: "paceCalculator",
    iconName: "paceCalculator",
    cardDescription: "Yugurish tempi, vaqt va masofani, ma'lum poyga masofalari uchun taxminlar bilan hisoblaydi.",
    articleSections: [
      {
        title: "Nimalar hisoblanadi?",
        body: "Vaqt, masofa yoki tempning istalgan ikkitasini bilsangiz, vosita uchinchi qiymatni to'g'ridan-to'g'ri topib beradi.",
      },
      {
        title: "Poyga taxminlarini qanday tushunish kerak?",
        body: "Bular hozirgi tempingiz butun masofa davomida o'zgarmaydi degan taxminga asoslangan baholar, shuning uchun ularni kafolat emas, taxminiy ma'lumotnoma sifatida qabul qiling.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "klima-btu-hisoblash",
    uzbekPath: "/uz/klima-btu-hisoblash",
    turkishPath: "/klima-btu-hesaplama",
    title: "Klima BTU Hisoblagich",
    description:
      "Xona maydoni, odamlar soni va quyosh nuriga qarab to'g'ri konditsioner quvvatini hisoblang.",
    intro:
      "Bu sahifa to'g'ri konditsionerni tanlashdan oldin dastlabki baho olishga yordam beradi.",
    component: "acCapacityCalculator",
    iconName: "acCapacityCalculator",
    cardDescription: "Xona uchun to'g'ri konditsioner quvvatini BTU da baholaydi.",
    articleSections: [
      {
        title: "Nega faqat maydon yetarli emas?",
        body: "Chunki odamlar soni, xonaning quyosh nuriga chiqishi va u eng yuqori qavatda joylashganligi haqiqiy issiqlik yukini oshiradi.",
      },
      {
        title: "Bu yakuniy xarid qarorimi?",
        body: "Bu boshlash uchun ajoyib baho, lekin ishlab chiqaruvchining o'z ma'lumotlari va joyingizning aniq sharoitlari bilan solishtirib ko'rish ham foydali.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "elektr-tuketimi-hisoblash",
    uzbekPath: "/uz/elektr-tuketimi-hisoblash",
    turkishPath: "/elektrik-tuketimi-hesaplama",
    title: "Elektr Sarfi Hisoblagich",
    description:
      "kVt/soat narxingizdan foydalanib kunlik, oylik va yillik sarfni hamda taxminiy xarajatni hisoblang.",
    intro:
      "Turli qurilmalarni ishlatish hisobingizga qanday ta'sir qilishini tezda tushunishga yordam beradi.",
    component: "electricityConsumptionCalculator",
    iconName: "electricityConsumptionCalculator",
    cardDescription: "Elektr qurilmalari uchun sarf va taxminiy xarajatni ko'rsatadi.",
    articleSections: [
      {
        title: "Qachon foydali?",
        body: "Isitgichlar, konditsionerlar, uzoq vaqt ishlaydigan uy jihozlarini solishtirishda va ularning moliyaviy ta'sirini bilmoqchi bo'lganingizda qo'l keladi.",
      },
      {
        title: "Nega elektr narxi ixtiyoriy?",
        body: "Narxsiz ham sarfni bilishdan foyda olishingiz mumkin, keyin xarajatni baholash uchun o'z tarifingizni qo'shishingiz mumkin.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "uyqu-hisoblash",
    uzbekPath: "/uz/uyqu-hisoblash",
    turkishPath: "/uyku-hesaplama",
    title: "Uyqu Hisoblagich",
    description:
      "Taxminan 90 daqiqalik uyqu sikllariga asoslanib tavsiya etilgan uxlash yoki uyg'onish vaqtlarini hisoblang.",
    intro:
      "Sahifa bir nechta amaliy variantni ko'rsatadi va sog'lom, yetarli uyquga eng yaqin davomiylikni ajratib ko'rsatadi.",
    component: "sleepCalculator",
    iconName: "sleepCalculator",
    cardDescription: "Uyqu sikllariga asoslanib uxlash va uyg'onish vaqtlarini tavsiya qiladi.",
    articleSections: [
      {
        title: "Nega uyqu sikllari muhim?",
        body: "Sikl oxiriga yaqin uyg'onish odatda chuqur uyqu bosqichi o'rtasida uyg'onishdan osonroq.",
      },
      {
        title: "Tavsiya etilgan variant nimani anglatadi?",
        body: "Bu voyaga yetganlar uchun keng tan olingan sog'lom uyqu oralig'iga eng yaqin variant bo'lib, qat'iy qoida emas, amaliy ma'lumotnoma sifatida taklif qilinadi.",
      },
    ],
    priority: 0.75,
  },
  {
    slug: "yoqilgi-sarfi-hisoblash",
    uzbekPath: "/uz/yoqilgi-sarfi-hisoblash",
    turkishPath: "/yakit-tuketimi-hesaplama",
    title: "Yoqilg'i Sarfi Hisoblagich",
    description:
      "km/l, l/100km va mpg o'rtasida aylantiring, masofa va yoqilg'i narxidan sayohat xarajatini hisoblang.",
    intro:
      "Bilgan yoqilg'i sarfi ko'rsatkichingizni kiriting — u boshqa keng tarqalgan formatlarga aylantiriladi, shuningdek taxminiy sayohat xarajati chiqadi.",
    component: "fuelConsumptionCalculator",
    iconName: "fuelConsumptionCalculator",
    cardDescription: "km/l, l/100km va mpg o'rtasida aylantiradi va sayohat xarajatini baholaydi.",
    articleSections: [
      {
        title: "Nega bunchalik ko'p turli birlik bor?",
        body: "Yevropada odatda l/100km, AQSH va Angliyada mpg, ba'zi hududlarda km/l ishlatiladi — bu vosita ular orasida darhol o'tishga imkon beradi.",
      },
      {
        title: "Sayohat xarajati qanday hisoblanadi?",
        body: "Sarf ko'rsatkichingiz va bosib o'tmoqchi bo'lgan masofadan foydalanib, vosita qancha yoqilg'i kerakligini va uning taxminiy narxini baholaydi.",
      },
    ],
    priority: 0.7,
  },
  {
    slug: "laminat-hisoblash",
    uzbekPath: "/uz/laminat-hisoblash",
    turkishPath: "/parke-hesaplama",
    title: "Laminat Hisoblagich",
    description:
      "Qoplanadigan maydondan, zaxira foizini hisobga olgan holda, kerakli laminat paketlari sonini hisoblang.",
    intro:
      "Pol maydonini, bitta paket qoplaydigan maydonni va zaxira foizingizni kiriting — sotib olish kerak bo'lgan paket sonini bilib olasiz.",
    component: "laminateCalculator",
    iconName: "laminateCalculator",
    cardDescription: "Zaxirani hisobga olgan holda kerakli laminat paketlari sonini hisoblaydi.",
    articleSections: [
      {
        title: "Nega zaxira foizi kerak?",
        body: "Devorlar va burchaklar bo'ylab taxtalarni kesish materialning bir qismini isrof qiladi, shuning uchun real zaxira chegarasi o'rnatish o'rtasida yetishmovchilikning oldini oladi.",
      },
      {
        title: "Natijadan qanday foydalaniladi?",
        body: "Kerakli jami maydonni ta'minotchingizdagi bitta paket qamrovi bilan solishtirib, aynan nechta paket kerakligini bilib olasiz.",
      },
    ],
    priority: 0.7,
  },
  {
    slug: "devor-qogozi-hisoblash",
    uzbekPath: "/uz/devor-qogozi-hisoblash",
    turkishPath: "/duvar-kagidi-hesaplama",
    title: "Devor Qog'ozi Hisoblagich",
    description:
      "Xona o'lchamlari va rulon o'lchamidan, zaxira foizini hisobga olgan holda, kerakli devor qog'ozi rulonlari sonini hisoblang.",
    intro:
      "Devor kengliklaringizni, shift balandligini va rulon o'lchamlarini kiriting — sotib olish kerak bo'lgan rulon sonini bilib olasiz.",
    component: "wallpaperCalculator",
    iconName: "wallpaperCalculator",
    cardDescription: "Zaxirani hisobga olgan holda xona uchun kerakli devor qog'ozi rulonlarini hisoblaydi.",
    articleSections: [
      {
        title: "Bu vosita nimani hisoblaydi?",
        body: "Devor maydonlaringizni qo'shadi, bitta rulonning foydali maydoniga bo'ladi va naqsh moslashtirish hamda kesish uchun tanlagan zaxira foizini qo'shadi.",
      },
      {
        title: "Nega naqsh moslashtirish muhim?",
        body: "Takrorlanuvchi naqshli devor qog'ozlari odatda oddiy qog'ozdan ko'proq zaxira talab qiladi, chunki har bir tasma keyingisi bilan mos kelishi kerak.",
      },
    ],
    priority: 0.7,
  },
  {
    slug: "kochish-qutisi-hisoblash",
    uzbekPath: "/uz/kochish-qutisi-hisoblash",
    turkishPath: "/tasinma-kutusu-hesaplama",
    title: "Ko'chish Qutisi Hisoblagich",
    description:
      "Uyingiz kattaligiga qarab taxminiy ko'chish qutilari soni va yuk mashinasi hajmini ko'ring.",
    intro:
      "Uy turingizni tanlang — odatiy kichik va katta quti sonlarini, shuningdek taxminiy yuk mashinasi hajmini darhol ko'rasiz.",
    component: "movingBoxCalculator",
    iconName: "movingBoxCalculator",
    cardDescription: "Uy kattaligiga qarab ko'chish qutilari sonini va yuk mashinasi hajmini baholaydi.",
    articleSections: [
      {
        title: "Bu raqamlar qanchalik aniq?",
        body: "Bular shu kattalikdagi odatiy uy uchun sohada qo'llaniladigan o'rtacha baholardir — kutilganidan sezilarli darajada ko'p yoki kam buyumga ega uyga ko'proq yoki kamroq quti kerak bo'ladi.",
      },
      {
        title: "Yuk mashinasi hajmi nima uchun kerak?",
        body: "Bu ko'chish mashinasi yoki furgon o'lchamini tanlashdan oldin solishtirish uchun boshlang'ich nuqta beradi.",
      },
    ],
    priority: 0.65,
  },
  {
    slug: "tabiiy-gaz-sarfi-hisoblash",
    uzbekPath: "/uz/tabiiy-gaz-sarfi-hisoblash",
    turkishPath: "/dogalgaz-tuketimi-hesaplama",
    title: "Tabiiy Gaz Sarfi Hisoblagich",
    description:
      "Kub metrdagi tabiiy gaz sarfingizdan jami xarajat va taxminiy kVt/soat ekvivalentini hisoblang.",
    intro:
      "Sarfingiz va birlik narxingizni kiriting — jami xarajat va taxminiy energiya ekvivalenti kVt/soatda chiqadi.",
    component: "naturalGasCalculator",
    iconName: "naturalGasCalculator",
    cardDescription: "Tabiiy gaz xarajatini va uning taxminiy kVt/soat ekvivalentini hisoblaydi.",
    articleSections: [
      {
        title: "Nega kVt/soat qiymati taxminiy?",
        body: "Kub metr bilan kVt/soat orasidagi aniq aylantirish koeffitsienti yetkazib berilayotgan gazning issiqlik qiymatiga bog'liq bo'lib, hudud va ta'minotchiga qarab biroz farq qiladi.",
      },
      {
        title: "Bu qachon foydali?",
        body: "Gaz hisob-fakturasini boshqa energiya manbalari bilan solishtirishda yoki hisob-kitob davri tugashidan oldin xarajatni baholashda yordam beradi.",
      },
    ],
    priority: 0.65,
  },
  {
    slug: "elektromobil-zaryadlash-hisoblash",
    uzbekPath: "/uz/elektromobil-zaryadlash-hisoblash",
    turkishPath: "/elektrikli-arac-sarj-hesaplama",
    title: "Elektromobil Zaryadlash Hisoblagich",
    description:
      "Batareya sig'imi va zaryadlagich quvvatidan zaryadlash vaqtini hisoblang, yoki sarfdan haydash masofasini baholang.",
    intro:
      "Zaryadlash vaqtini rejalashtirish yoki to'liq zaryadning qancha masofaga yetishini baholash uchun zaryadlash-vaqti va masofa rejimlari o'rtasida almashtiring.",
    component: "evChargingCalculator",
    iconName: "evChargingCalculator",
    cardDescription: "Elektromobil zaryadlash vaqtini yoki taxminiy haydash masofasini hisoblaydi.",
    articleSections: [
      {
        title: "Zaryadlash samaradorligi nimani anglatadi?",
        body: "Zaryadlagichdan olingan energiyaning hammasi batareyaga yetib bormaydi — bir qismi aylantirish jarayonida issiqlik sifatida yo'qoladi, shuning uchun samaradorlik zaryadlash-vaqti baholashiga kiritiladi.",
      },
      {
        title: "Masofa qanday baholanadi?",
        body: "Masofa foydali batareya sig'imini avtomobilingizning har 100 km uchun haqiqiy sarfiga bo'lish orqali hisoblanadi va taxminiy haydash masofasini beradi.",
      },
    ],
    priority: 0.65,
  },
];

export function findUzbekStandaloneToolBySlug(slug: string) {
  return uzbekStandaloneTools.find((tool) => tool.slug === slug);
}

export function findUzbekStandaloneToolByTurkishPath(turkishPath: string) {
  return uzbekStandaloneTools.find((tool) => tool.turkishPath === turkishPath);
}
