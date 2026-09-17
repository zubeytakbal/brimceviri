import type { MaterialCategory } from "./materialsDatabase";

export const materialCategoryLabelsUz: Record<MaterialCategory, string> = {
  metal: "Metallar",
  sivi: "Suyuqliklar va Kimyoviy Moddalar",
  gaz: "Gazlar",
  plastik: "Plastmassalar",
  "yapi-malzemesi": "Qurilish Materiallari",
  ahsap: "Yog'och Turlari",
  gida: "Oziq-ovqat va Oshxona Materiallari",
};

export const materialNamesUz: Record<string, string> = {
  // Gazlar
  hidrojen: "Vodorod",
  helyum: "Geliy",
  metan: "Metan",
  "amonyak-gaz": "Ammiak (Gaz)",
  neon: "Neon",
  hava: "Havo",
  azot: "Azot",
  oksijen: "Kislorod",
  argon: "Argon",
  propan: "Propan",
  karbondioksit: "Karbonat Angidrid",
  butan: "Butan",
  klor: "Xlor",

  // Suyuqliklar va Kimyoviy Moddalar
  benzin: "Benzin",
  aseton: "Aseton",
  etanol: "Etanol (Etil Spirt)",
  gazyagi: "Kerosin",
  dizel: "Dizel",
  "motor-yagi": "Motor Moyi",
  benzen: "Benzol",
  zeytinyagi: "Zaytun Moyi",
  "bitkisel-yag": "O'simlik Moyi",
  "hindistan-cevizi-yagi": "Kokos Yog'i",
  su: "Suv",
  "deniz-suyu": "Dengiz Suvi",
  "fren-hidroligi": "Tormoz Suyuqligi",
  antifriz: "Antifriz",
  gliserin: "Glitserin",
  civa: "Simob",

  // Oziq-ovqat va Oshxona Materiallari
  un: "Un",
  tereyagi: "Sariyog'",
  buz: "Muz",
  sarap: "Vino",
  bira: "Pivo",
  sirke: "Sirka",
  yogurt: "Qatiq",
  sut: "Sut",
  "portakal-suyu": "Apelsin Sharbati",
  "elma-suyu": "Olma Sharbati",
  kan: "Qon",
  seker: "Shakar (Kukun)",
  "pirinc-tahil": "Guruch (Don)",
  tuz: "Osh Tuzi",
  pekmez: "Pekmez",
  bal: "Asal",

  // Plastmassalar
  polipropilen: "Polipropilen (PP)",
  ldpe: "Past Zichlikdagi Polietilen (LDPE)",
  hdpe: "Yuqori Zichlikdagi Polietilen (HDPE)",
  naylon: "Neylon",
  akrilik: "Akril (Pleksiglas)",
  polikarbonat: "Polikarbonat",
  polistiren: "Polistirol (PS)",
  abs: "ABS Plastik",
  pet: "PET Plastik",
  pvc: "PVC",
  teflon: "Teflon (PTFE)",

  // Yog'och Turlari
  balsa: "Balza",
  sedir: "Kedr",
  kavak: "Terak",
  "cam-agaci": "Yog'och (Qarag'ay)",
  maun: "Mahogani",
  "ceviz-agaci": "Yong'oq Yog'ochi",
  tik: "Tik Yog'ochi",
  hus: "Qayin Yog'ochi",
  kayin: "Buk Yog'ochi",
  "mese-agaci": "Yog'och (Eman)",

  // Qurilish Materiallari
  "cimento-tozu": "Sement Kukuni",
  kum: "Qum",
  cakil: "Shag'al",
  tugla: "G'isht",
  alci: "Gips",
  asfalt: "Asfalt",
  kumtasi: "Qumtosh",
  beton: "Beton",
  cam: "Shisha",
  kirectasi: "Ohaktosh",
  mermer: "Mramor",
  granit: "Granit",
  bazalt: "Bazalt",

  // Metallar
  magnezyum: "Magniy",
  aluminyum: "Alyuminiy",
  titanyum: "Titan",
  vanadyum: "Vanadiy",
  antimon: "Surma",
  cinko: "Rux",
  krom: "Xrom",
  "dokme-demir": "Cho'yan",
  kalay: "Qalay",
  celik: "Po'lat",
  demir: "Temir",
  "paslanmaz-celik": "Zanglamaydigan Po'lat",
  "pirinc-alasim": "Latun (Qotishma)",
  kadmiyum: "Kadmiy",
  niyobyum: "Niobiy",
  bronz: "Bronza",
  kobalt: "Kobalt",
  nikel: "Nikel",
  bakir: "Mis",
  bizmut: "Vismut",
  molibden: "Molibden",
  gumus: "Kumush",
  kursun: "Qo'rg'oshin",
  paladyum: "Palladiy",
  tungsten: "Volfram",
  altin: "Oltin",
  uranyum: "Uran",
  platin: "Platina",
};

export const materialVariabilityNotesUz: Record<string, string> = {
  dizel:
    "Qovushqoqlik qiymati haroratga va yoqilg'i standartiga qarab o'zgaradi; berilgan qiymat odatiy taxminiy ma'lumotnomadir.",
  "motor-yagi":
    "Qovushqoqlik moyning SAE darajasiga (5W-30, 10W-40 kabi) va haroratga qarab katta darajada o'zgaradi; berilgan qiymat 40°C dagi odatiy ko'p darajali moy uchun taxminiy ma'lumotnomadir.",
  "fren-hidroligi":
    "Qovushqoqlik DOT sinfiga (DOT3, DOT4, DOT5 kabi) qarab o'zgaradi; berilgan qiymat odatiy DOT3/4 tormoz suyuqligi uchun taxminiy ma'lumotnomadir.",
  antifriz:
    "Qovushqoqlik suv bilan aralashma nisbatiga va haroratga qarab o'zgaradi; berilgan qiymat odatiy 50% aralashma uchun taxminiy ma'lumotnomadir.",
  bira: "Qovushqoqligi haroratga sezgir; 2-90°C oralig'ida taxminan 1-4 mPa·s orasida o'zgarishi mumkin.",
  "portakal-suyu":
    "Qovushqoqligi konsentratsiyaga (°Brix) va haroratga juda sezgir; taxminan 2-15 mPa·s orasida bo'lishi mumkin.",
  pekmez:
    "Qovushqoqligi suv miqdoriga va haroratga juda sezgir; xona haroratida taxminan 1.000-5.000 mPa·s orasida bo'lishi mumkin.",
  bal: "Qovushqoqligi namlik nisbatiga va haroratga juda sezgir; xona haroratida taxminan 2.000-10.000 mPa·s orasida bo'lishi mumkin.",
  polipropilen:
    "Issiqlik o'tkazuvchanligi haroratga sezgir; taxminan 0,1-0,3 W/(m·K) orasida bo'lishi mumkin.",
  ldpe: "Issiqlik o'tkazuvchanligi va elastisiya moduli qiymatlari ishlab chiqarish usuliga va qo'shimchalarga qarab o'zgarishi mumkin; berilgan qiymatlar umumiy ma'lumotnoma sifatidadir.",
  polistiren:
    "Issiqlik o'tkazuvchanligi va elastisiya moduli qiymatlari qattiq (umumiy maqsadli) polistirol uchundir; kengaytirilgan (EPS) yoki ekstruziyalangan (XPS) ko'pik shakllari juda farqli (ancha past) issiqlik o'tkazuvchanligiga ega.",
  maun: "Yog'ochning elastisiya moduli namlik nisbatiga, o'sish sharoitlariga va tola yo'nalishiga qarab sezilarli darajada o'zgarishi mumkin; berilgan qiymat tola yo'nalishi bo'yicha odatiy o'rtacha qiymatdir.",
  "ceviz-agaci":
    "Yog'ochning elastisiya moduli namlik nisbatiga, o'sish sharoitlariga va tola yo'nalishiga qarab sezilarli darajada o'zgarishi mumkin; berilgan qiymat tola yo'nalishi bo'yicha odatiy o'rtacha qiymatdir.",
  tik: "Yog'ochning elastisiya moduli namlik nisbatiga, o'sish sharoitlariga va tola yo'nalishiga qarab sezilarli darajada o'zgarishi mumkin; berilgan qiymat tola yo'nalishi bo'yicha odatiy o'rtacha qiymatdir.",
  hus: "Yog'ochning elastisiya moduli namlik nisbatiga, o'sish sharoitlariga va tola yo'nalishiga qarab sezilarli darajada o'zgarishi mumkin; berilgan qiymat tola yo'nalishi bo'yicha odatiy o'rtacha qiymatdir.",
  kayin:
    "Yog'ochning elastisiya moduli namlik nisbatiga, o'sish sharoitlariga va tola yo'nalishiga qarab sezilarli darajada o'zgarishi mumkin; berilgan qiymat tola yo'nalishi bo'yicha odatiy o'rtacha qiymatdir.",
  "cimento-tozu":
    "Bo'shashgan kukunning issiqlik o'tkazuvchanligi joylashish zichligiga va namlikka qarab o'zgarishi mumkin; berilgan qiymat quruq, bo'shashgan kukun uchun taxminiy ma'lumotnomadir.",
};
