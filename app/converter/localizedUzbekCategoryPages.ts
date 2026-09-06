// O'zbekcha kategoriya sahifalari -- yangi i18n tizimiga ulanish uchun
// mustaqil, yangi fayl (mavjud tr/en/de fayllariga tegmaydi).
// Naqadar aniqligini tekshirish uchun: bu tarjima Claude tomonidan
// yozilgan, ideal holatda native speaker tomonidan bir marta
// ko'rib chiqilishi tavsiya etiladi, ayniqsa texnik atamalar uchun.

export type LocalizedUzbekCategoryFact = {
  label: string;
  value: string;
};

export type LocalizedUzbekCategorySection = {
  title: string;
  paragraphs: string[];
};

export type LocalizedUzbekCategoryPage = {
  locale: "uz";
  slug: string;
  sourceSlug: string;
  category: string;
  title: string;
  description: string;
  introduction: string[];
  facts: LocalizedUzbekCategoryFact[];
  sections: LocalizedUzbekCategorySection[];
};

export const uzbekCategoryPages: LocalizedUzbekCategoryPage[] = [
  {
    locale: "uz",
    slug: "uzunlik",
    sourceSlug: "uzunluk",
    category: "uzunluk",
    title: "Uzunlik Birliklarini O'zgartirish",
    description:
      "Metr, kilometr, santimetr, mil va fut o'rtasida bepul va tez uzunlik o'lchovlarini o'zgartiring; jadval va formulalarni ko'ring.",
    introduction: [
      "Uzunlik -- ikki nuqta orasidagi masofani ifodalovchi asosiy fizik miqdor. Qurilish, sayohat, sport va fanning ko'p sohalarida qo'llaniladi.",
      "Metr -- uzunlikning xalqaro SI asosiy birligi, fut va mil kabi birliklar esa AQSH va Buyuk Britaniyada keng qo'llaniladi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Uzunlik" },
      { label: "SI birligi", value: "Metr" },
      { label: "SI belgisi", value: "m" },
      { label: "Odatiy qo'llanilishi", value: "Masofa, o'lcham, qurilish" },
    ],
    sections: [
      {
        title: "Uzunlik nima?",
        paragraphs: [
          "Uzunlik ikki nuqta orasidagi masofani o'lchaydi. Xona o'lchamlaridan tortib, geografik masofalargacha har joyda ishlatiladi.",
          "Metr 1983-yildan beri yorug'likning vakuumda ma'lum vaqt ichida bosib o'tgan masofasi asosida aniq belgilangan.",
        ],
      },
      {
        title: "Metr, kilometr va fut",
        paragraphs: [
          "Metr -- asosiy SI birligi. Kilometr 1000 metrga, santimetr esa metrning yuzdan biriga teng.",
          "Fut va mil AQSH va Buyuk Britaniyada qurilish va yo'l masofalarini o'lchashda hali ham keng qo'llaniladi.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "yuza",
    sourceSlug: "alan",
    category: "alan",
    title: "Yuza (Maydon) Birliklarini O'zgartirish",
    description:
      "Kvadrat metr, gektar va kvadrat fut o'rtasida yuza o'lchovlarini o'zgartiring; yer, bino va qurilish hisob-kitoblari uchun.",
    introduction: [
      "Yuza -- bir sirtning ikki o'lchovli kattaligini bildiradi. Yer uchastkalari, xonalar va qurilish loyihalarida qo'llaniladi.",
      "Kvadrat metr -- SI asosidagi yuza birligi, gektar esa qishloq xo'jaligi va yer boshqaruvida keng tarqalgan kattaroq birlik.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Yuza" },
      { label: "SI birligi", value: "Kvadrat metr" },
      { label: "SI belgisi", value: "m²" },
      { label: "Odatiy qo'llanilishi", value: "Yer, bino va xona o'lchamlari" },
    ],
    sections: [
      {
        title: "Yuza nima?",
        paragraphs: [
          "Yuza sirtning ikki o'lchovli kattaligini ifodalaydi -- xonalar, uchastkalar, panellar va boshqa o'lchanadigan yuzalar uchun ishlatiladi.",
          "Yuza uzunlikning uzunlikka ko'paytmasidan hosil bo'lgani uchun, birlik o'zgartirilganda o'lchov koeffitsienti ham kvadratga ko'tariladi.",
        ],
      },
      {
        title: "Kvadrat metr, gektar va kvadrat fut",
        paragraphs: [
          "Kvadrat metr -- asosiy SI yuza birligi. Gektar qishloq xo'jaligi va yer boshqaruvida keng qo'llaniladigan kattaroq metrik birlik.",
          "Kvadrat fut AQSH va Buyuk Britaniyada qurilish amaliyotida keng tarqalgan.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "hajm",
    sourceSlug: "hacim",
    category: "hacim",
    title: "Hajm Birliklarini O'zgartirish",
    description:
      "Litr, mililitr va kub metr o'rtasida hajm o'lchovlarini o'zgartiring; fan, saqlash va suyuqlik hisob-kitoblari uchun.",
    introduction: [
      "Hajm bir modda yoki ob'ekt egallagan uch o'lchovli fazoni ifodalaydi.",
      "Kub metr -- hajmning SI asosidagi birligi, litr va mililitr esa kundalik hayotda, laboratoriya ishlarida va idish hisob-kitoblarida keng qo'llaniladi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Hajm" },
      { label: "SI birligi", value: "Kub metr" },
      { label: "Keng tarqalgan metrik birlik", value: "Litr" },
      { label: "Odatiy qo'llanilishi", value: "Idishlar, suyuqliklar, jarayon hajmlari" },
    ],
    sections: [
      {
        title: "Hajm nima?",
        paragraphs: [
          "Hajm -- moddaning yoki ob'ektning egallagan uch o'lchovli fazosi. Idishlar, shishalar, xonalar va kanallar uchun ishlatiladi.",
          "1 kub metr = 1000 litr, 1 litr = 1000 mililitr.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "massa",
    sourceSlug: "kutle",
    category: "kutle",
    title: "Massa (Og'irlik) Birliklarini O'zgartirish",
    description:
      "Kilogramm, gramm va funt o'rtasida massa o'lchovlarini o'zgartiring; oshxona, tibbiyot va savdo hisob-kitoblari uchun.",
    introduction: [
      "Massa -- bir jismdagi moddaning miqdorini ifodalaydi va kundalik hayotda ko'pincha \"og'irlik\" deb ataladi.",
      "Kilogramm -- massaning SI asosiy birligi, funt va unsiya esa AQSH va Buyuk Britaniyada keng qo'llaniladi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Massa" },
      { label: "SI birligi", value: "Kilogramm" },
      { label: "SI belgisi", value: "kg" },
      { label: "Odatiy qo'llanilishi", value: "Oshxona, tibbiyot, savdo" },
    ],
    sections: [
      {
        title: "Massa nima?",
        paragraphs: [
          "Massa bir jismdagi moddaning miqdorini o'lchaydi. Kundalik nutqda \"og'irlik\" bilan almashtirilib ishlatiladi, garchi fizik jihatdan farqli bo'lsa ham.",
          "Kilogramm -- hozirgi kunda fizik konstanta (Plank doimiysi) orqali aniq belgilangan yagona SI asosiy birligi.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "harorat",
    sourceSlug: "sicaklik",
    category: "sicaklik",
    title: "Harorat Birliklarini O'zgartirish",
    description:
      "Selsiy, Farengeyt va Kelvin o'rtasida haroratni o'zgartiring; formulalar va misol qiymatlarni ko'ring.",
    introduction: [
      "Harorat bir jismning issiqlik darajasini ifodalaydi.",
      "Selsiy ko'pchilik dunyoda kundalik hayotda, Farengeyt esa AQSHda ishlatiladi; Kelvin fanda va muhandislikda SI asosiy birligi hisoblanadi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Harorat" },
      { label: "SI birligi", value: "Kelvin" },
      { label: "Kundalik birlik", value: "Selsiy" },
      { label: "Odatiy qo'llanilishi", value: "Ob-havo, tibbiyot, oshpazlik" },
    ],
    sections: [
      {
        title: "Harorat birliklari nima uchun chiziqli emas?",
        paragraphs: [
          "Boshqa ko'pchilik birliklardan farqli o'laroq, harorat o'lchovlari oddiy ko'paytirish bilan emas, balki har biri o'z nol nuqtasiga ega bo'lgan formulalar bilan o'zgartiriladi.",
          "Masalan: °F = °C × 9/5 + 32, Kelvin = °C + 273,15.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "vaqt",
    sourceSlug: "zaman",
    category: "zaman",
    title: "Vaqt Birliklarini O'zgartirish",
    description:
      "Soniya, daqiqa va soat o'rtasida vaqt o'lchovlarini bir sahifada o'zgartiring.",
    introduction: [
      "Vaqt -- voqealar ketma-ketligini va davomiyligini ifodalovchi asosiy fizik miqdor.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Vaqt" },
      { label: "SI birligi", value: "Soniya" },
      { label: "SI belgisi", value: "s" },
    ],
    sections: [
      {
        title: "Soniya, daqiqa va soat",
        paragraphs: [
          "1 daqiqa = 60 soniya, 1 soat = 60 daqiqa = 3600 soniya.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "tezlik",
    sourceSlug: "hiz",
    category: "hiz",
    title: "Tezlik Birliklarini O'zgartirish",
    description:
      "Km/soat, m/s va mil/soat o'rtasida tezlikni o'zgartiring; muhandislik va kundalik hisob-kitoblar uchun.",
    introduction: [
      "Tezlik -- bir jismning vaqt birligida bosib o'tgan masofasini ifodalaydi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Tezlik" },
      { label: "SI birligi", value: "Metr/soniya" },
      { label: "Kundalik birlik", value: "Km/soat" },
    ],
    sections: [
      {
        title: "Km/soat va m/s",
        paragraphs: [
          "1 m/s = 3,6 km/soat. Bu koeffitsient tezlik birliklari orasida eng ko'p ishlatiladigan o'zgartirishlardan biridir.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "bosim",
    sourceSlug: "basinc",
    category: "basinc",
    title: "Bosim Birliklarini O'zgartirish va Hisoblash",
    description:
      "Paskal, bar, PSI va atmosfera o'rtasida bosimni o'zgartiring; muhandislik formulalari va misollari bilan.",
    introduction: [
      "Bosim -- yuza birligiga tushayotgan kuchni ifodalaydi, muhandislik va meteorologiyada muhim rol o'ynaydi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Bosim" },
      { label: "SI birligi", value: "Paskal" },
      { label: "SI belgisi", value: "Pa" },
    ],
    sections: [
      {
        title: "Bosim qanday hisoblanadi?",
        paragraphs: [
          "Bosim formula bilan aniqlanadi: P = F / A (kuch / yuza).",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "energiya",
    sourceSlug: "enerji",
    category: "enerji",
    title: "Energiya Birliklarini O'zgartirish",
    description:
      "Joul, kilovatt-soat, kaloriya va BTU o'rtasida energiya birliklarini o'zgartiring.",
    introduction: [
      "Energiya -- ish bajarish yoki issiqlik hosil qilish miqdorini ifodalaydi, quvvatdan (energiyaning o'tish tezligidan) farqli tushuncha.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Energiya" },
      { label: "SI birligi", value: "Joul" },
      { label: "Keng tarqalgan birlik", value: "Kilovatt-soat" },
    ],
    sections: [
      {
        title: "Joul va kilovatt-soat",
        paragraphs: [
          "Joul -- SI asosidagi energiya birligi. Kilovatt-soat esa elektr hisoblarida keng qo'llaniladi.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "malumot-hajmi",
    sourceSlug: "veri",
    category: "veri",
    title: "Ma'lumot Hajmi Birliklarini O'zgartirish",
    description:
      "Bayt, kilobayt, megabayt, gigabayt va terabayt o'rtasida o'zgartiring; 1000 va 1024 asosidagi hisoblash farqini ko'ring.",
    introduction: [
      "Ma'lumot hajmi raqamli xotira va saqlash sig'imini ifodalaydi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Ma'lumot hajmi" },
      { label: "Asosiy birlik", value: "Bayt" },
    ],
    sections: [
      {
        title: "1000 yoki 1024?",
        paragraphs: [
          "Ishlab chiqaruvchilar odatda 1000 asosidan (kilobayt = 1000 bayt), operatsion tizimlar esa ko'pincha 1024 asosidan (kibibayt) foydalanadi -- bu farq saqlash sig'imi haqidagi chalkashliklarning asosiy sababi.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "elektr",
    sourceSlug: "elektrik",
    category: "elektrik",
    title: "Elektr Birliklarini O'zgartirish",
    description:
      "Volt, kilovolt, amper va milliamper o'rtasida asosiy elektr birliklarini o'zgartiring.",
    introduction: [
      "Elektr kuchlanishi, toki va qarshiligi elektronika va elektr muhandisligining asosini tashkil qiladi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Kuchlanish va tok" },
      { label: "SI birliklari", value: "Volt, Amper" },
    ],
    sections: [
      {
        title: "Volt va amper",
        paragraphs: [
          "Volt -- elektr kuchlanishi, amper esa elektr tokining SI birligidir.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "oltin-karati",
    sourceSlug: "altin-ayar",
    category: "altin_ayar",
    title: "Oltin Karati (Sinov) Birliklarini O'zgartirish",
    description:
      "24, 22, 18 va 14 karatli oltin o'rtasida sof oltin miqdoriga qarab gramm hisobini o'zgartiring.",
    introduction: [
      "Oltin karati (ba'zan \"proba\" deb ham ataladi) qotishmadagi sof oltin ulushini bildiradi.",
      "24 karat -- 100% sof oltin, 18 karat esa 75% oltin va 25% boshqa metallardan iborat qotishmani anglatadi.",
    ],
    facts: [
      { label: "24 karat", value: "999/1000 sof oltin" },
      { label: "18 karat", value: "750/1000 sof oltin" },
      { label: "14 karat", value: "585/1000 sof oltin" },
    ],
    sections: [
      {
        title: "Karat nima?",
        paragraphs: [
          "Karat tizimi 24 qismga bo'lingan bo'lib, har bir karat qotishmadagi 1/24 ulush sof oltinni bildiradi. Zargarlik buyumlarida qattiqlik va narx uchun muhim ko'rsatkich.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "sarf",
    sourceSlug: "debi",
    category: "debi",
    title: "Sarf Birliklarini O'zgartirish",
    description:
      "Kub metr/soat va litr/daqiqa o'rtasida sarf birliklarini o'zgartiring; oqim miqdorini tez ko'ring.",
    introduction: [
      "Sarf -- ma'lum vaqt ichida o'tgan suyuqlik yoki gaz miqdorini bildiradi. Suv ta'minoti, quvurlar va sanoat jarayonlarida qo'llaniladi.",
      "Kub metr/soat va litr/daqiqa amaliy sarf birliklari sifatida keng tarqalgan.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Sarf" },
      { label: "Amaliy birlik", value: "Kub metr/soat" },
      { label: "Boshqa birlik", value: "Litr/daqiqa" },
      { label: "Qo'llanilishi", value: "Suv ta'minoti, quvurlar, sanoat" },
    ],
    sections: [
      {
        title: "Sarf nima?",
        paragraphs: [
          "Sarf bir vaqt oralig'ida quvur yoki kanaldan o'tgan suyuqlik yoki gaz hajmini bildiradi.",
          "Nasos va shamollatish tizimlarini loyihalashda muhim ko'rsatkich hisoblanadi.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "zichlik",
    sourceSlug: "yogunluk",
    category: "yogunluk",
    title: "Zichlik Birliklarini O'zgartirish",
    description:
      "Kilogram/kub metr va gram/kub santimetr o'rtasida zichlik o'zgartiring; suv va boshqa materiallar uchun.",
    introduction: [
      "Zichlik -- moddaning massasi va hajmi orasidagi nisbatni bildiradi, muhim material xususiyati.",
      "Kilogram/kub metr SI birligi, gram/kub santimetr esa laboratoriya namunalari uchun amaliy birlik.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Zichlik" },
      { label: "SI birligi", value: "Kilogram/kub metr" },
      { label: "SI belgisi", value: "kg/m³" },
      { label: "Qo'llanilishi", value: "Materialshunoslik, muhandislik" },
    ],
    sections: [
      {
        title: "Zichlik nima?",
        paragraphs: [
          "Zichlik ma'lum hajmdagi moddada qancha massa borligini bildiradi.",
          "Suv 4°C da 1000 kg/m³ (yoki 1 g/cm³) zichlikka ega bo'lib, amaliy taqqoslash qiymati sifatida ishlatiladi.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "kuch",
    sourceSlug: "kuvvet",
    category: "kuvvet",
    title: "Kuch Birliklarini O'zgartirish",
    description:
      "Nyuton va kilogram-kuch o'rtasida kuch birliklarini o'zgartiring; kuch formulasi va muhandislik qo'llanmalarini ko'ring.",
    introduction: [
      "Kuch -- jismning harakati yoki shaklini o'zgartira oladigan ta'sirni bildiradi.",
      "SI da Nyuton asosiy birlik, eski texnik hujjatlarda kilogram-kuch ham uchraydi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Kuch" },
      { label: "SI birligi", value: "Nyuton" },
      { label: "SI belgisi", value: "N" },
      { label: "Qo'llanilishi", value: "Fizika, muhandislik" },
    ],
    sections: [
      {
        title: "Kuch nima?",
        paragraphs: [
          "Nyutonning ikkinchi qonuniga ko'ra kuch massa va tezlanish ko'paytmasiga teng.",
          "Statika, dinamika va deyarli barcha muhandislik hisoblarida asosiy tushuncha.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "tork",
    sourceSlug: "tork",
    category: "tork",
    title: "Tork Birliklarini O'zgartirish",
    description:
      "Nyuton-metr va funt-fut o'rtasida tork o'zgartiring; motor torki va murvat torki misollarini ko'ring.",
    introduction: [
      "Tork -- jismni o'q atrofida aylantiradigan kuch ta'sirini bildiradi.",
      "SI da Nyuton-metr asosiy birlik, angliya-amerika tizimida funt-fut ishlatiladi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Tork" },
      { label: "SI birligi", value: "Nyuton-metr" },
      { label: "SI belgisi", value: "N·m" },
      { label: "Qo'llanilishi", value: "Avtomobil texnikasi, murvat ulanishlari" },
    ],
    sections: [
      {
        title: "Tork nima?",
        paragraphs: [
          "Tork kuch va aylanish o'qigacha bo'lgan perpendikulyar masofa ko'paytmasidir.",
          "Motor quvvati va murvat ulanishlarini to'g'ri sozlashda muhim rol o'ynaydi.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "burchak",
    sourceSlug: "aci",
    category: "aci",
    title: "Burchak Birliklarini O'zgartirish",
    description:
      "Daraja, radian va grad o'rtasida burchak o'zgartiring; trigonometriya va navigatsiya misollarini ko'ring.",
    introduction: [
      "Burchak ikki chiziq yoki tekislik orasidagi aylanishni bildiradi.",
      "SI da radian asosiy birlik, kundalik hayotda esa daraja ko'proq ishlatiladi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Tekis burchak" },
      { label: "SI birligi", value: "Radian" },
      { label: "Keng tarqalgan birlik", value: "Daraja" },
      { label: "Qo'llanilishi", value: "Geometriya, navigatsiya" },
    ],
    sections: [
      {
        title: "Burchak nima?",
        paragraphs: [
          "Burchak umumiy nuqtadan chiqadigan ikki nur orasidagi aylanishni o'lchaydi.",
          "To'liq aylana 360 darajaga yoki 2π radianga teng.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "chastota",
    sourceSlug: "frekans",
    category: "frekans",
    title: "Chastota Birliklarini O'zgartirish",
    description:
      "Gerts, kilogerts, megagerts va gigagerts o'rtasida chastota o'zgartiring; elektronika va radio misollarini ko'ring.",
    introduction: [
      "Chastota -- bir soniyada takrorlangan tebranishlar sonini bildiradi.",
      "SI da Gerts asosiy birlik, yuqori chastotalar uchun kilogerts, megagerts va gigagerts ishlatiladi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Chastota" },
      { label: "SI birligi", value: "Gerts" },
      { label: "SI belgisi", value: "Hz" },
      { label: "Qo'llanilishi", value: "Elektronika, radio, protsessor" },
    ],
    sections: [
      {
        title: "Chastota nima?",
        paragraphs: [
          "Chastota davriy jarayonning bir soniyada necha marta takrorlanishini bildiradi.",
          "Radio chastotalari kilogerts-megagerts oralig'ida, protsessor tezligi esa gigagerts darajasida bo'ladi.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "hajmiy-sarf",
    sourceSlug: "debi_hacimsel",
    category: "debi_hacimsel",
    title: "Hajmiy Sarf Birliklarini O'zgartirish",
    description:
      "Kub metr/soniya, CFM va GPM o'rtasida hajmiy sarf o'zgartiring; shamollatish va nasos misollarini ko'ring.",
    introduction: [
      "Hajmiy sarf -- ma'lum vaqt ichida bir kesim orqali o'tgan suyuqlik yoki gaz hajmini bildiradi.",
      "SI da kub metr/soniya asosiy birlik, CFM va GPM esa AQSH sanoatida keng tarqalgan.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Hajmiy sarf" },
      { label: "SI birligi", value: "Kub metr/soniya" },
      { label: "SI belgisi", value: "m³/s" },
      { label: "Qo'llanilishi", value: "Shamollatish, nasos tizimlari" },
    ],
    sections: [
      {
        title: "Hajmiy sarf nima?",
        paragraphs: [
          "Hajmiy sarf quvur yoki kanaldan o'tgan hajmni vaqt birligida o'lchaydi.",
          "CFM va GPM AQSH klimat va nasos texnikasida standart birliklardir.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "massaviy-sarf",
    sourceSlug: "debi_kutlesel",
    category: "debi_kutlesel",
    title: "Massaviy Sarf Birliklarini O'zgartirish",
    description:
      "Kilogram/soniya va kilogram/soat o'rtasida massaviy sarf o'zgartiring; sanoat jarayoni misollarini ko'ring.",
    introduction: [
      "Massaviy sarf -- ma'lum vaqt ichida jarayondan o'tgan massani bildiradi.",
      "SI da kilogram/soniya asosiy birlik, ishlab chiqarishda esa kilogram/soat ko'proq ishlatiladi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Massaviy sarf" },
      { label: "SI birligi", value: "Kilogram/soniya" },
      { label: "SI belgisi", value: "kg/s" },
      { label: "Qo'llanilishi", value: "Kimyoviy texnologiya, ishlab chiqarish" },
    ],
    sections: [
      {
        title: "Massaviy sarf nima?",
        paragraphs: [
          "Massaviy sarf jarayondan o'tgan massani vaqt birligida ifodalaydi.",
          "Moddalar balansini hisoblashda muhim ko'rsatkich hisoblanadi.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "magnit-maydoni",
    sourceSlug: "manyetik_alan",
    category: "manyetik_alan",
    title: "Magnit Maydoni Birliklarini O'zgartirish",
    description:
      "Amper/metr va ersted o'rtasida magnit maydoni kuchini o'zgartiring; elektromagnit hisoblar uchun.",
    introduction: [
      "Magnit maydoni kuchi -- ma'lum nuqtadagi magnit maydonining intensivligini bildiradi.",
      "SI da amper/metr asosiy birlik, ersted esa eski CGS tizimidan qolgan birlik.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Magnit maydoni kuchi" },
      { label: "SI birligi", value: "Amper/metr" },
      { label: "SI belgisi", value: "A/m" },
      { label: "Qo'llanilishi", value: "Elektr muhandisligi, motorlar" },
    ],
    sections: [
      {
        title: "Magnit maydoni nima?",
        paragraphs: [
          "Magnit maydoni kuchi berilgan nuqtada magnit ta'sirining kuchliligini bildiradi.",
          "Elektromotor va transformatorlarni loyihalashda muhim rol o'ynaydi.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "magnit-oqimi",
    sourceSlug: "manyetik_aki",
    category: "manyetik_aki",
    title: "Magnit Oqimi Birliklarini O'zgartirish",
    description:
      "Veber va milliveber o'rtasida magnit oqimini o'zgartiring; transformator hisoblari uchun.",
    introduction: [
      "Magnit oqimi -- ma'lum yuzadan o'tgan magnit maydoni miqdorini bildiradi.",
      "SI da Veber asosiy birlik hisoblanadi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Magnit oqimi" },
      { label: "SI birligi", value: "Veber" },
      { label: "SI belgisi", value: "Wb" },
      { label: "Qo'llanilishi", value: "Transformator, elektromagnit induksiya" },
    ],
    sections: [
      {
        title: "Magnit oqimi nima?",
        paragraphs: [
          "Magnit oqimi berilgan yuzadan o'tuvchi magnit maydon chiziqlari sonini bildiradi.",
          "Transformator va generatorlarni tushunishda muhim tushuncha.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "kinematik-qovushqoqlik",
    sourceSlug: "viskozite_kinematik",
    category: "viskozite_kinematik",
    title: "Kinematik Qovushqoqlik Birliklarini O'zgartirish",
    description:
      "Kub metr/soniya va santistok (cSt) o'rtasida kinematik qovushqoqlikni o'zgartiring; motor moyi tasnifi uchun.",
    introduction: [
      "Kinematik qovushqoqlik -- suyuqlikning zichlikka nisbatan oqim qarshiligini bildiradi.",
      "SI da kvadrat metr/soniya asosiy birlik, sanoatda santistok ko'proq ishlatiladi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Kinematik qovushqoqlik" },
      { label: "SI birligi", value: "Kvadrat metr/soniya" },
      { label: "SI belgisi", value: "m²/s" },
      { label: "Qo'llanilishi", value: "Motor moyi, suyuqlik tasnifi" },
    ],
    sections: [
      {
        title: "Kinematik qovushqoqlik nima?",
        paragraphs: [
          "Kinematik qovushqoqlik dinamik qovushqoqlikning zichlikka bo'linishidan hosil bo'ladi.",
          "Santistok motor moylarini tasniflashda sanoat standarti hisoblanadi.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "issiqlik-otkazuvchanligi",
    sourceSlug: "isil_iletkenlik",
    category: "isil_iletkenlik",
    title: "Issiqlik O'tkazuvchanligi Birliklarini O'zgartirish",
    description:
      "Vatt/metr-Kelvin va BTU/soat-fut-°F o'rtasida issiqlik o'tkazuvchanligini o'zgartiring; izolyatsiya tanlash uchun.",
    introduction: [
      "Issiqlik o'tkazuvchanligi -- material issiqlikni qanchalik yaxshi o'tkazishini bildiradi.",
      "SI da vatt/metr-Kelvin asosiy birlik, AQSHda BTU/soat-fut-°F ishlatiladi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Issiqlik o'tkazuvchanligi" },
      { label: "SI birligi", value: "Vatt/metr-Kelvin" },
      { label: "SI belgisi", value: "W/(m·K)" },
      { label: "Qo'llanilishi", value: "Qurilish, izolyatsiya materiallari" },
    ],
    sections: [
      {
        title: "Issiqlik o'tkazuvchanligi nima?",
        paragraphs: [
          "Bu ko'rsatkich material orqali issiqlik qanchalik samarali o'tishini bildiradi.",
          "Past qiymatli materiallar yaxshi izolyator, yuqori qiymatli materiallar esa yaxshi issiqlik o'tkazgich hisoblanadi.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "issiqlik-oqimi-zichligi",
    sourceSlug: "isi_akisi",
    category: "isi_akisi",
    title: "Issiqlik Oqimi Zichligi Birliklarini O'zgartirish",
    description:
      "Vatt/kvadrat metr va kilovatt/kvadrat metr o'rtasida issiqlik oqimi zichligini o'zgartiring; yuza issiqlik o'tkazish hisoblari uchun.",
    introduction: [
      "Issiqlik oqimi zichligi -- yuza birligidan o'tgan issiqlik quvvatini bildiradi.",
      "SI da vatt/kvadrat metr asosiy birlik hisoblanadi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Issiqlik oqimi zichligi" },
      { label: "SI birligi", value: "Vatt/kvadrat metr" },
      { label: "SI belgisi", value: "W/m²" },
      { label: "Qo'llanilishi", value: "Bino fizikasi, quyosh panellari" },
    ],
    sections: [
      {
        title: "Issiqlik oqimi zichligi nima?",
        paragraphs: [
          "Bu ko'rsatkich ma'lum yuzadan qancha issiqlik quvvati o'tishini bildiradi.",
          "Binolarning energetik samaradorligini baholashda muhim rol o'ynaydi.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "solishtirma-issiqlik-sigimi",
    sourceSlug: "ozgul_isi",
    category: "ozgul_isi",
    title: "Solishtirma Issiqlik Sig'imi Birliklarini O'zgartirish",
    description:
      "Joul/kilogram-Kelvin va kaloriya/gram-Kelvin o'rtasida solishtirma issiqlik sig'imini o'zgartiring; material qizish hisoblari uchun.",
    introduction: [
      "Solishtirma issiqlik sig'imi -- bir kilogramm moddani bir Kelvinga isitish uchun kerakli energiyani bildiradi.",
      "SI da joul/kilogram-Kelvin asosiy birlik hisoblanadi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Solishtirma issiqlik sig'imi" },
      { label: "SI birligi", value: "Joul/kilogram-Kelvin" },
      { label: "SI belgisi", value: "J/(kg·K)" },
      { label: "Qo'llanilishi", value: "Materialshunoslik, termodinamika" },
    ],
    sections: [
      {
        title: "Solishtirma issiqlik sig'imi nima?",
        paragraphs: [
          "Bu ko'rsatkich moddaning issiqlikni qanchalik yaxshi saqlashini bildiradi.",
          "Issiqlik saqlagichlar va sovutish tizimlarini loyihalashda muhim.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "tezlanish",
    sourceSlug: "ivme",
    category: "ivme",
    title: "Tezlanish Birliklarini O'zgartirish",
    description:
      "Metr/soniya kvadrat va yer tortishish tezlanishi (g) o'rtasida tezlanishni o'zgartiring; avtomobil va fizika hisoblari uchun.",
    introduction: [
      "Tezlanish -- jismning tezligi vaqt birligida qanday o'zgarishini bildiradi.",
      "SI da metr/soniya kvadrat asosiy birlik, yer tortishish tezlanishi (g) esa amaliy taqqoslash qiymati.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Tezlanish" },
      { label: "SI birligi", value: "Metr/soniya kvadrat" },
      { label: "SI belgisi", value: "m/s²" },
      { label: "Qo'llanilishi", value: "Avtomobil texnikasi, fizika" },
    ],
    sections: [
      {
        title: "Tezlanish nima?",
        paragraphs: [
          "Tezlanish jism tezligining vaqt birligida qanday o'zgarishini bildiradi.",
          "Yer tortishish tezlanishi (9,80665 m/s²) amaliy taqqoslash qiymati sifatida ishlatiladi.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "burchak-tezligi",
    sourceSlug: "acisal_hiz",
    category: "acisal_hiz",
    title: "Burchak Tezligi Birliklarini O'zgartirish",
    description:
      "Aylanish/daqiqa (RPM), radian/soniya va daraja/soniya o'rtasida burchak tezligini o'zgartiring; motor aylanish hisoblari uchun.",
    introduction: [
      "Burchak tezligi -- jismning o'q atrofida qanchalik tez aylanishini bildiradi.",
      "SI da radian/soniya asosiy birlik, kundalik hayotda RPM ko'proq ishlatiladi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Burchak tezligi" },
      { label: "SI birligi", value: "Radian/soniya" },
      { label: "SI belgisi", value: "rad/s" },
      { label: "Qo'llanilishi", value: "Motorlar, aylanuvchi mashinalar" },
    ],
    sections: [
      {
        title: "Burchak tezligi nima?",
        paragraphs: [
          "Burchak tezligi aylanuvchi jismning burchagi vaqt birligida qanday o'zgarishini bildiradi.",
          "RPM motor va disk aylanish tezligini ifodalashda eng keng tarqalgan birlik.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "quvvat",
    sourceSlug: "guc",
    category: "guc",
    title: "Quvvat Birliklarini O'zgartirish",
    description:
      "Vatt, kilovatt, megavatt va ot kuchi o'rtasida quvvatni o'zgartiring; motor va generator quvvati hisoblari uchun.",
    introduction: [
      "Quvvat -- vaqt birligida bajarilgan ish yoki uzatilgan energiyani bildiradi.",
      "SI da Vatt asosiy birlik, avtomobil texnikasida ot kuchi ham ishlatiladi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Quvvat" },
      { label: "SI birligi", value: "Vatt" },
      { label: "SI belgisi", value: "W" },
      { label: "Qo'llanilishi", value: "Motorlar, elektr qurilmalari" },
    ],
    sections: [
      {
        title: "Quvvat nima?",
        paragraphs: [
          "Quvvat vaqt birligida bajarilgan ish yoki uzatilgan energiya miqdorini bildiradi.",
          "Ot kuchi Yevropa avtomobil texnikasida kilovatt bilan bir qatorda ishlatiladi.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "impuls",
    sourceSlug: "momentum",
    category: "momentum",
    title: "Impuls Birliklarini O'zgartirish",
    description:
      "Kilogram-metr/soniya va nyuton-soniya o'rtasida impulsni o'zgartiring; to'qnashuv hisoblari uchun.",
    introduction: [
      "Impuls -- jismning massasi va tezligi ko'paytmasi bo'lgan harakat miqdorini bildiradi.",
      "SI da kilogram-metr/soniya asosiy birlik, nyuton-soniya esa unga teng ekvivalent birlik.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Impuls" },
      { label: "SI birligi", value: "Kilogram-metr/soniya" },
      { label: "SI belgisi", value: "kg·m/s" },
      { label: "Qo'llanilishi", value: "To'qnashuv va zarba hisoblari" },
    ],
    sections: [
      {
        title: "Impuls nima?",
        paragraphs: [
          "Impuls klassik mexanikaning muhim tushunchasi bo'lib, jismning harakat miqdorini ifodalaydi.",
          "Impulsning saqlanish qonuni to'qnashuv va zarbalarni tahlil qilishning asosidir.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "qovushqoqlik-dinamik",
    sourceSlug: "viskozite_dinamik",
    category: "viskozite_dinamik",
    title: "Dinamik Qovushqoqlik Birliklarini O'zgartirish",
    description:
      "Paskal-soniya va santipoise o'rtasida dinamik qovushqoqlikni o'zgartiring; Reynolds soni hisoblari uchun.",
    introduction: [
      "Dinamik qovushqoqlik -- suyuqlikning ichki oqim qarshiligini bildiradi.",
      "SI da Paskal-soniya asosiy birlik, sanoatda santipoise ko'proq ishlatiladi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Dinamik qovushqoqlik" },
      { label: "SI birligi", value: "Paskal-soniya" },
      { label: "SI belgisi", value: "Pa·s" },
      { label: "Qo'llanilishi", value: "Reynolds soni, quvur hisoblari" },
    ],
    sections: [
      {
        title: "Dinamik qovushqoqlik nima?",
        paragraphs: [
          "Dinamik qovushqoqlik suyuqlikning siljish harakatiga qarshiligini o'lchaydi.",
          "Santipoise 20°C dagi suvning qovushqoqligiga taxminan teng bo'lib, amaliy taqqoslash qiymati.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "qarshilik",
    sourceSlug: "elektrik_direnc",
    category: "elektrik_direnc",
    title: "Qarshilik Birliklarini O'zgartirish",
    description:
      "Om, kiloom va megaom o'rtasida elektr qarshiligini o'zgartiring; sxema loyihalash uchun.",
    introduction: [
      "Elektr qarshiligi -- element tok oqimiga qanchalik qarshilik ko'rsatishini bildiradi.",
      "SI da Om asosiy birlik hisoblanadi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Elektr qarshiligi" },
      { label: "SI birligi", value: "Om" },
      { label: "SI belgisi", value: "Ω" },
      { label: "Qo'llanilishi", value: "Sxema loyihalash, Om qonuni" },
    ],
    sections: [
      {
        title: "Elektr qarshiligi nima?",
        paragraphs: [
          "Om qonuniga ko'ra qarshilik kuchlanish va tok orasidagi nisbatni belgilaydi.",
          "Kiloom va megaom kattaroq qarshilik qiymatlari uchun ishlatiladi.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "sigim",
    sourceSlug: "kapasitans",
    category: "kapasitans",
    title: "Sig'im Birliklarini O'zgartirish",
    description:
      "Farad, millifarad, mikrofarad, nanofarad va pikofarad o'rtasida sig'imni o'zgartiring; kondensator qiymatlari uchun.",
    introduction: [
      "Sig'im -- elementning elektr zaryadini saqlash qobiliyatini bildiradi.",
      "SI da Farad asosiy birlik, amaliyotda kichikroq birliklar ko'proq ishlatiladi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Sig'im" },
      { label: "SI birligi", value: "Farad" },
      { label: "SI belgisi", value: "F" },
      { label: "Qo'llanilishi", value: "Kondensator, sxema loyihalash" },
    ],
    sections: [
      {
        title: "Sig'im nima?",
        paragraphs: [
          "Sig'im kondensator ma'lum kuchlanishda qancha zaryad saqlay olishini bildiradi.",
          "Mikrofarad kundalik kondensatorlar uchun, nanofarad va pikofarad esa yuqori chastotali sxemalar uchun ishlatiladi.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "induktivlik",
    sourceSlug: "enduktans",
    category: "enduktans",
    title: "Induktivlik Birliklarini O'zgartirish",
    description:
      "Genri, milligenri va mikrogenri o'rtasida induktivlikni o'zgartiring; g'altak va transformator loyihalash uchun.",
    introduction: [
      "Induktivlik -- g'altakning tok o'zgarishiga qarshi kuchlanish hosil qilish qobiliyatini bildiradi.",
      "SI da Genri asosiy birlik hisoblanadi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Induktivlik" },
      { label: "SI birligi", value: "Genri" },
      { label: "SI belgisi", value: "H" },
      { label: "Qo'llanilishi", value: "G'altak, transformator loyihalash" },
    ],
    sections: [
      {
        title: "Induktivlik nima?",
        paragraphs: [
          "Induktivlik g'altak orqali o'tayotgan tok o'zgarishiga qanchalik qarshilik ko'rsatishini bildiradi.",
          "Transformator va motorlarni loyihalashda muhim ko'rsatkich.",
        ],
      },
    ],
  },
  {
    locale: "uz",
    slug: "elektr-zaryadi",
    sourceSlug: "elektrik_yuk",
    category: "elektrik_yuk",
    title: "Elektr Zaryadi Birliklarini O'zgartirish",
    description:
      "Kulon, millikulon, mikrokulon va nanokulon o'rtasida elektr zaryadini o'zgartiring; batareya sig'imi hisoblari uchun.",
    introduction: [
      "Elektr zaryadi -- materiyaning elektr ta'sirlarini vujudga keltiruvchi asosiy xususiyatini bildiradi.",
      "SI da Kulon asosiy birlik hisoblanadi.",
    ],
    facts: [
      { label: "Fizik miqdor", value: "Elektr zaryadi" },
      { label: "SI birligi", value: "Kulon" },
      { label: "SI belgisi", value: "C" },
      { label: "Qo'llanilishi", value: "Batareya sig'imi, elektrostatika" },
    ],
    sections: [
      {
        title: "Elektr zaryadi nima?",
        paragraphs: [
          "Elektr zaryadi elektr kuchlar va maydonlarni vujudga keltiruvchi fundamental fizik xususiyatdir.",
          "Millikulon va mikrokulon batareya va kondensatorlardagi kichikroq zaryad qiymatlari uchun ishlatiladi.",
        ],
      },
    ],
  },
];

export function findUzbekCategoryPageByTurkishSlug(sourceSlug: string) {
  return uzbekCategoryPages.find((page) => page.sourceSlug === sourceSlug);
}
