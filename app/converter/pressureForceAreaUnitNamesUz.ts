// Bosim/kuch/yuza birliklari uchun o'zbekcha nomlar va odatiy qo'llanish
// tavsiflari, engineeringUnits.ts'dagi enName qiymatiga qarab bog'langan
// (belgi maxsus belgilar - masalan mikro belgisi - o'z ichiga olishi
// mumkinligi uchun symbol emas, enName kalit sifatida ishlatiladi).

export const pressureUnitNamesUz: Record<string, { name: string; use: string }> = {
  Nanopascal: {
    name: "Nanopaskal",
    use: "Juda kichik differensial bosimlar va tajriba o'lchovlari",
  },
  Micropascal: {
    name: "Mikropaskal",
    use: "Akustika va aniq sensor qo'llanmalari",
  },
  Millipascal: {
    name: "Millipaskal",
    use: "Juda kichik bosim farqlari va laboratoriya asboblari",
  },
  Pascal: {
    name: "Paskal",
    use: "Asosiy SI bosim birligi va ilmiy hisob-kitoblar",
  },
  Hectopascal: {
    name: "Gektopaskal",
    use: "Meteorologiya va atmosfera bosimi hisobotlari",
  },
  Kilopascal: {
    name: "Kilopaskal",
    use: "Qurilish, HVAC va umumiy muhandislik o'lchovlari",
  },
  Megapascal: {
    name: "Megapaskal",
    use: "Material mustahkamligi va yuqori bosimli tizimlar",
  },
  Gigapascal: {
    name: "Gigapaskal",
    use: "Elastiklik moduli va ilg'or materiallar muhandisligi",
  },
  Terapascal: {
    name: "Terapaskal",
    use: "Nazariy material modellari va o'ta qattiqlik hisoblari",
  },
  Millibar: {
    name: "Millibar",
    use: "Eski meteorologiya va jarayon ko'rsatkichlari",
  },
  Bar: {
    name: "Bar",
    use: "Kompressor, gidravlika, pnevmatika va sanoat",
  },
  "Standard atmosphere": {
    name: "Standart atmosfera",
    use: "Ma'lumotnoma atmosfera bosimi va laboratoriya ishlari",
  },
  "Technical atmosphere": {
    name: "Texnik atmosfera",
    use: "Eski texnik hujjatlar va ba'zi mexanik jadvallar",
  },
  "Kilogram-force per square centimeter": {
    name: "Kilogram-kuch/kvadrat santimetr",
    use: "Nasos, qozon va analog ko'rsatkichlarda eski qo'llanish",
  },
  Torr: {
    name: "Torr",
    use: "Vakuum texnologiyasi va laboratoriya bosimlari",
  },
  "Millimeter of mercury": {
    name: "Simob ustuni millimetri",
    use: "Tibbiy o'lchovlar va manometr o'qishlari",
  },
  "Millimeter of water column": {
    name: "Suv ustuni millimetri",
    use: "Past differensial bosim va ventilyatsiya tizimlari",
  },
  "Centimeter of water column": {
    name: "Suv ustuni santimetri",
    use: "Nafas olish asboblari va past bosimli qo'llanmalar",
  },
  "Pound-force per square inch": {
    name: "Funt-kuch/dyuymkvadrat",
    use: "Shina, gidravlika va Anglo-Amerika uskunalari",
  },
  "Kilopound-force per square inch": {
    name: "Kilofunt-kuch/dyuymkvadrat",
    use: "Material mustahkamligi va qurilish muhandisligi",
  },
  "Pound-force per square foot": {
    name: "Funt-kuch/futkvadrat",
    use: "Qurilish yuklari va HVAC differensial bosimlari",
  },
  "Inch of mercury": {
    name: "Simob ustuni dyuymi",
    use: "Barometrlar, aviatsiya va dvigatel vakuumi",
  },
  "Inch of water column": {
    name: "Suv ustuni dyuymi",
    use: "Gaz liniyalari va past bosimli havo tizimlari",
  },
};

export const forceUnitNamesUz: Record<string, { name: string; use: string }> = {
  Nanonewton: {
    name: "Nanonyuton",
    use: "Nanomiqyosdagi kuchlar va sirt o'zaro ta'sirlari",
  },
  Micronewton: {
    name: "Mikronyuton",
    use: "Mikromexanika va aniq sensor ishlari",
  },
  Millinewton: {
    name: "Millinyuton",
    use: "Laboratoriya asboblari va kichik aktuatorlar",
  },
  Newton: {
    name: "Nyuton",
    use: "Asosiy SI kuch birligi va umumiy muhandislik",
  },
  Kilonewton: {
    name: "Kilonyuton",
    use: "Qurilish elementlari, presslar va yuk ko'taruvchi tizimlar",
  },
  Meganewton: {
    name: "Meganyuton",
    use: "Katta gidravlik presslar va og'ir infratuzilma yuklari",
  },
  Giganewton: {
    name: "Giganyuton",
    use: "Juda katta strukturaviy yuklar va nazariy solishtirishlar",
  },
  Dyne: {
    name: "Din",
    use: "CGS tizimi va eski ilmiy manbalar",
  },
  "Gram-force": {
    name: "Gramm-kuch",
    use: "Kichik mexanik o'lchovlar va eski kataloglar",
  },
  "Kilogram-force": {
    name: "Kilogram-kuch",
    use: "Press yuklari va eski mexanik jadvallar",
  },
  "Ounce-force": {
    name: "Unsiya-kuch",
    use: "Kichik prujinalar va yengil yuk o'lchovlari",
  },
  "Pound-force": {
    name: "Funt-kuch",
    use: "Mashina qismlari, tortish sinovlari va Anglo tizimlar",
  },
  Kip: {
    name: "Kip",
    use: "Po'lat konstruksiyalar va AQSH strukturaviy muhandisligi",
  },
  "Short ton-force": {
    name: "Qisqa tonna-kuch",
    use: "Og'ir uskunalar va AQSH sanoat yuklari",
  },
};

export const areaUnitNamesUz: Record<string, { name: string; use: string }> = {
  "Square micrometer": {
    name: "Kvadrat mikrometr",
    use: "Mikrosirtlar va yupqa parda qo'llanmalari",
  },
  "Square millimeter": {
    name: "Kvadrat millimetr",
    use: "Kesim yuzalari, bolt va kabel hisoblari",
  },
  "Square centimeter": {
    name: "Kvadrat santimetr",
    use: "Kichik kontakt yuzalari va laboratoriya namunalari",
  },
  "Square decimeter": {
    name: "Kvadrat detsimetr",
    use: "Qoplama va yuza maydoni hisoblari",
  },
  "Square meter": {
    name: "Kvadrat metr",
    use: "Asosiy SI maydon birligi va umumiy hisob-kitoblar",
  },
  Hectare: {
    name: "Gektar",
    use: "Yer, qishloq xo'jaligi va katta ochiq maydonlar",
  },
  "Square kilometer": {
    name: "Kvadrat kilometr",
    use: "Geografik hududlar va katta yuzalar",
  },
  "Square inch": {
    name: "Kvadrat dyuym",
    use: "Kichik mashina qismlari va psi asosidagi hisoblar",
  },
  "Square foot": {
    name: "Kvadrat fut",
    use: "Arxitektura maydonlari va yengil qurilish",
  },
  "Square yard": {
    name: "Kvadrat yard",
    use: "To'qimachilik va ochiq maydon qoplama o'lchovlari",
  },
  Acre: {
    name: "Akr",
    use: "Yer va ko'chmas mulk o'lchovlari",
  },
};
