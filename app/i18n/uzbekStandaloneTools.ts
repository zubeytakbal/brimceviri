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
      {
        title: "Hisoblangan misol",
        body: "1990-yil 15-martda tug'ilgan odam 2026-yil 9-oktyabrda 36 yosh 6 oy 24 kunlik bo'ladi, ya'ni 13 357 kun. Avval to'liq yillar, keyin to'liq oylar, so'ng qolgan kunlar hisoblanadi.",
      },
      {
        title: "Kabisa yillari",
        body: "Kabisa yillaridagi qo'shimcha kunlar avtomatik hisobga olinadi. 29-fevralda tug'ilganlar kabisa bo'lmagan yillarda 28-fevral o'tgach yangi yoshga to'ladi.",
      },
      {
        title: "Ikki sana orasidagi muddat",
        body: "Kalkulyator istalgan ikki sana orasidagi muddatni ham hisoblaydi: 2026-yil 1-sentyabrdan 2027-yil 30-iyungacha 9 oy 29 kun (302 kun). Shartnoma yoki o'qish muddatini hisoblashda qulay.",
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
      {
        title: "O'zbekistonda QQS stavkasi",
        body: "2023-yil 1-yanvardan boshlab O'zbekistonda qo'shilgan qiymat solig'ining umumiy stavkasi 12% (avval 15% edi). Ayrim tovar va xizmatlar soliqdan ozod qilingan bo'lishi mumkin, aniq holatlar uchun Soliq qo'mitasi ma'lumotlariga qarang.",
      },
      {
        title: "QQS ichidagi narxdan soliqni ajratish",
        body: "Foizni to'g'ridan-to'g'ri ayirib bo'lmaydi. QQS bilan 1 120 000 so'mlik narxda soliqsiz narx 1 120 000 ÷ 1,12 = 1 000 000 so'm, QQS esa 120 000 so'm. 1 120 000 dan 12% ni ayirish 985 600 so'm beradi, bu xato.",
      },
      {
        title: "Qo'shish misoli",
        body: "QQSsiz 2 500 000 so'mlik hisob-faktura: soliq 2 500 000 × 0,12 = 300 000 so'm, jami 2 800 000 so'm.",
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
      {
        title: "JSST tasnifi (kattalar uchun)",
        body: "18,5 dan past: vazn yetishmasligi. 18,5–24,9: normal vazn. 25–29,9: ortiqcha vazn. 30 va undan yuqori: semizlik. Bolalar va o'smirlar uchun yosh va jinsga qarab o'sish jadvallari ishlatiladi.",
      },
      {
        title: "Hisoblangan misol",
        body: "Vazn 70 kg, bo'y 1,75 m: indeks = 70 ÷ (1,75 × 1,75) ≈ 22,9, normal oraliqda. 1,70 m bo'y uchun normal vazn taxminan 53,5 dan 72 kg gacha.",
      },
      {
        title: "Indeksning chegaralari",
        body: "Indeks mushak va yog'ni ajratmaydi, sportchilarda yuqori chiqishi mumkin, homilador ayollar uchun mos emas. Sog'liq bo'yicha xulosa uchun shifokorga murojaat qiling.",
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
      {
        title: "Kvadrat metrda nechta plitka?",
        body: "60 × 60 sm: taxminan 2,78 dona. 30 × 60 sm: 5,56 dona. 45 × 45 sm: 4,94 dona. 20 × 20 sm: 25 dona. Son = 1 ÷ bitta plitka maydoni (m²).",
      },
      {
        title: "Hisoblangan misol",
        body: "4 × 5 m pol maydoni 20 m². 10% chiqindi bilan 22 m². 60 × 60 sm plitka 0,36 m², shuning uchun 22 ÷ 0,36 = 61,1, ya'ni yuqoriga yaxlitlab 62 dona. Qutidagi plitkalar soniga bo'lib, qutilar sonini toping.",
      },
      {
        title: "Chiqindini qachon oshirish kerak?",
        body: "Diagonal (45°) yotqizishda, noto'g'ri shakldagi xonalarda yoki naqshli plitkada chiqindini 15% va undan ko'proq oling. Plitkani bitta partiyadan sotib oling, chunki partiyalar orasida rang tusi farq qilishi mumkin.",
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
      {
        title: "Hisoblangan misol: oddiy g'isht",
        body: "250 × 120 × 65 mm o'lchamli g'isht yarim g'isht qalinlikdagi devorda 25 × 6,5 sm yuzasi bilan yotadi. 1 sm qorishma bilan bitta g'isht devorda (0,26 × 0,075) m² joy egallaydi, ya'ni 1 m² ga taxminan 51 dona. 4 × 3 m devor (12 m²) uchun 12 × 51,3 ≈ 616 dona, 5% chiqindi bilan taxminan 647 dona kerak.",
      },
      {
        title: "Nega qorishma qalinligi hisobga olinadi?",
        body: "Har bir g'isht devorda o'z yuzasi va choklarning yarmini egallaydi. Qorishmani hisobga olmaslik kerakli sonni ortiqcha ko'rsatadi, ayniqsa mayda g'ishtlarda.",
      },
      {
        title: "Kalkulyator nimani hisoblamaydi?",
        body: "Qorishma miqdori, beton ustunlar va to'sinlar hisobga olinmaydi. Hisoblashdan oldin eshik va deraza maydonini devor maydonidan ayiring.",
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
      {
        title: "Tug'ish sanasi qanday hisoblanadi?",
        body: "Oxirgi hayz kunining birinchi kuniga 280 kun (40 hafta) qo'shiladi. Masalan, oxirgi hayz 2026-yil 1-yanvarda boshlangan bo'lsa, taxminiy sana 2026-yil 8-oktyabr. 37 va 42 haftalar orasidagi tug'ilish o'z vaqtida hisoblanadi.",
      },
      {
        title: "Uch trimestr",
        body: "Birinchi trimestr 13-hafta oxirigacha, ikkinchisi 14-haftadan 27-hafta oxirigacha, uchinchisi 28-haftadan tug'ilishgacha.",
      },
      {
        title: "Sana qachon o'zgaradi?",
        body: "Erta ultratovush tekshiruvi o'lchovi hayz bo'yicha hisobdan sezilarli farq qilsa, shifokor taxminiy sanani o'zgartirishi mumkin. Birinchi trimestrdagi tekshiruv homiladorlik muddatini aniqlashda eng aniq usul hisoblanadi.",
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
      {
        title: "Ishlatiladigan solishtirma qiymatlar",
        body: "Katta yoshli odam bo'yi 1,7 m, jirafa 5,5 m, shahar avtobusi 12 m, ko'k kit 25 m, futbol maydoni 105 m (FIFA tavsiya qilgan uzunlik), antennasi bilan Eyfel minorasi 330 m va Istanbuldagi 15-iyul shahidlari ko'prigi 1 560 m.",
      },
      {
        title: "Hisoblangan misol",
        body: "50 m lik suzish havzasi taxminan 29 ta odam bo'yiga (50 ÷ 1,7 ≈ 29,4), ikkita ko'k kitga yoki yarim futbol maydonidan sal kamroqqa teng. 2 km masofa taxminan 6 ta ustma-ust Eyfel minorasiga teng.",
      },
      {
        title: "Nisbatlarni o'qish",
        body: "1 dan kichik nisbat sizning qiymatingiz solishtirma ob'ektdan qisqa ekanini bildiradi: 0,5 yarmi demakdir. Juda kichik uzunliklar uchun avval uzunlik konvertori bilan tanish birlikka o'tkazing.",
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
      {
        title: "Ishlatiladigan solishtirma qiymatlar",
        body: "Uy mushugi 4 kg, katta yoshli odam 70 kg, mototsikl 200 kg, minish oti 500 kg, yengil avtomobil 1 500 kg, katta yoshli Afrika fili 6 000 kg va katta ko'k kit 150 000 kg. Bular o'rtacha taxminiy qiymatlar, haqiqiy vaznlar ancha farq qiladi.",
      },
      {
        title: "Hisoblangan misol",
        body: "1 tonna (1 000 kg) yuk taxminan 14 ta kattaga (1 000 ÷ 70 ≈ 14,3), ikkita otga yoki yengil avtomobilning uchdan ikki qismiga teng. 40 tonnalik yuk mashinasi taxminan 27 ta avtomobil yoki ko'k kitning chorak qismiga teng.",
      },
      {
        title: "Massa, kuch emas",
        body: "Qiymatlar kilogrammdagi massadir. Oyda tarozi taxminan oltidan bir kuchni ko'rsatadi, lekin odamning massasi baribir 70 kg bo'lib qoladi.",
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
      {
        title: "Formula",
        body: "Iste'mol (kVt·soat) = quvvat (Vt) × ishlash soati ÷ 1 000. Narx = iste'mol × hisobingizdagi 1 kVt·soat narxi.",
      },
      {
        title: "Oylik misollar (30 kun)",
        body: "1,5 kVt konditsioner kuniga 8 soat: 1,5 × 8 × 30 = 360 kVt·soat. 10 Vt LED lampa kuniga 6 soat: 10 × 6 × 30 ÷ 1 000 = 1,8 kVt·soat. 2 000 Vt suv isitgich kuniga 2 soat: 120 kVt·soat.",
      },
      {
        title: "Nega hisob farq qiladi?",
        body: "Qurilmadagi quvvat eng yuqori qiymat; muzlatgich va konditsioner uzilib-uzilib ishlaydi, shuning uchun haqiqiy iste'mol to'liq quvvat bo'yicha hisobdan kam bo'ladi. Ba'zi tariflar iste'mol hajmiga qarab bosqichma-bosqich narxlanadi.",
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
      {
        title: "Hisob qanday ishlaydi?",
        body: "Kalkulyator uyqu sikli taxminan 90 daqiqa va uxlab qolish uchun 15 daqiqa kerak deb hisoblaydi, keyin to'liq sikl tugaydigan vaqtlarni taklif qiladi, shunda siz yengilroq uyqu bosqichida uyg'onasiz.",
      },
      {
        title: "Hisoblangan misol",
        body: "Ertalab 6:30 da turish uchun 5 sikl (7,5 soat) bilan kechki 22:45 da, 6 sikl (9 soat) bilan 21:15 da yoting. 7:00 da turish uchun: 23:15 yoki 21:45.",
      },
      {
        title: "Eslatma",
        body: "Uyqu sikli odamdan odamga va kechadan kechaga farq qiladi, shuning uchun vaqtlar taxminiy. Ko'pchilik kattalarga 7–9 soat uyqu kerak; uyqusizlik yoki kunduzgi uyquchanlik davom etsa, shifokorga murojaat qiling.",
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
      {
        title: "Hisoblangan misol: 3,6 × 4,2 m xona",
        body: "Xona maydoni 15,12 m². 10% chiqindi bilan 16,63 m². Qadoqda 2,22 m² bo'lsa: 16,63 ÷ 2,22 = 7,49, yuqoriga yaxlitlab 8 qadoq. Plintus uchun perimetr 2 × (3,6 + 4,2) = 15,6 m, 0,9 m eshikni ayirsak 14,7 m.",
      },
      {
        title: "Diagonal yotqizish",
        body: "Diagonal yoki «archa» usulida kesish chiqindisi ko'payadi, shuning uchun chiqindi odatda 15% va undan yuqori olinadi.",
      },
      {
        title: "Yotqizishdan oldin",
        body: "Bir xil partiya raqamidagi qadoqlarni oling, chunki partiyalar orasida tus farqi bo'lishi mumkin. Devor bo'yidagi kengayish oralig'i va qadoqlarni xonada qancha ushlab turish kerakligi ishlab chiqaruvchiga bog'liq, qadoqdagi ko'rsatmaga amal qiling.",
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
      {
        title: "Hisoblangan misol: 2+1 xonadon",
        body: "Jadvalga ko'ra 2+1 uy uchun taxminan 28 ta kichik va 18 ta katta, jami 46 ta quti va 18 m³ mashina hajmi kerak. Kitoblar ko'p bo'lsa, kichik qutilar sonini oshiring: kitoblar katta qutiga solinsa, ko'tarib bo'lmaydigan darajada og'irlashadi.",
      },
      {
        title: "Qaysi narsa qaysi qutiga?",
        body: "Kichik quti: kitob, idish-tovoq, asboblar kabi kichik, lekin og'ir narsalar. Katta quti: yostiq, ko'rpa, kiyim kabi yengil, lekin hajmli narsalar. Mebel va maishiy texnika quti soniga kirmaydi, lekin mashina hajmida hisobga olingan.",
      },
      {
        title: "Qadoqlash tartibi",
        body: "Mavsumdan tashqari kiyim va kitoblarni bir necha kun oldin qadoqlang. Ko'chish kuni kerak bo'ladigan narsalarni (hujjatlar, zaryadlagichlar, dorilar) alohida sumkada saqlang. Har bir qutiga xona nomini yozing.",
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
      {
        title: "Kub metrdan kilovatt-soatga",
        body: "Kalkulyator 1 m³ tabiiy gaz uchun taxminan 10,55 kVt·soat issiqlik qiymatidan foydalanadi. Haqiqiy qiymat gaz tarkibiga qarab o'zgaradi. Misol: oyiga 120 m³ sarf ≈ 1 266 kVt·soat energiya.",
      },
      {
        title: "Qishki sarf misoli",
        body: "Agar uy qishda kuniga 6 m³ gaz sarflasa, 30 kunda 180 m³ bo'ladi. Narxni hisoblash uchun bu miqdorni o'z tarifingizdagi 1 m³ narxiga ko'paytiring.",
      },
      {
        title: "Sarfni kamaytirish",
        body: "Termostatni 1 °C pastga tushirish, eshik va derazalardagi tirqishlarni yopish va radiatorlar orqasiga issiqlik qaytaruvchi qatlam qo'yish qishki gaz sarfini kamaytiradi. Natija uyning izolyatsiyasiga bog'liq.",
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
