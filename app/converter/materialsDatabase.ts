// Malzeme yogunluk veritabani -- gercekten Turkce'de arama karsiligi
// olan, birbirinden farkli 105 madde. Ana kaynak: densitycalculator.net
// (232 maddelik kapsamli muhendislik tablosu), buradan uzman-only alasim/
// plastik kodlari (orn. Hastelloy, FR-4, Zamak) cikarilip gunluk hayatta
// ve okulda gercekten aranan maddelere daraltildi. Degerler ~20C/oda
// sicakliginda, yaygin kabul goren muhendislik referans degerleridir.

export type MaterialCategory =
  | "metal"
  | "sivi"
  | "gaz"
  | "plastik"
  | "yapi-malzemesi"
  | "ahsap"
  | "gida";

export const materialCategoryLabels: Record<MaterialCategory, string> = {
  metal: "Metaller",
  sivi: "Sıvılar ve Kimyasallar",
  gaz: "Gazlar",
  plastik: "Plastikler",
  "yapi-malzemesi": "Yapı Malzemeleri",
  ahsap: "Ahşap Türleri",
  gida: "Gıda ve Mutfak Malzemeleri",
};

export type MaterialDensityEntry = {
  id: string;
  nameTr: string;
  category: MaterialCategory;
  densityKgM3: number;
  // Bazi malzemelerin ek ozellikleri (viskozite, iletkenlik vb.) urune,
  // sicakliga veya konsantrasyona gore buyuk olcude degisir. Bu
  // durumlarda tek bir "kesin" deger yerine, degeri aralikla birlikte
  // acikca belirten bir uyari notu tutulur.
  variabilityNote?: string;
};

export const materialsDatabase: MaterialDensityEntry[] = [
  // ---- Gazlar ----
  { id: "hidrojen", nameTr: "Hidrojen", category: "gaz", densityKgM3: 0.0899 },
  { id: "helyum", nameTr: "Helyum", category: "gaz", densityKgM3: 0.1786 },
  { id: "metan", nameTr: "Metan", category: "gaz", densityKgM3: 0.656 },
  { id: "amonyak-gaz", nameTr: "Amonyak (Gaz)", category: "gaz", densityKgM3: 0.73 },
  { id: "neon", nameTr: "Neon", category: "gaz", densityKgM3: 0.9 },
  { id: "hava", nameTr: "Hava", category: "gaz", densityKgM3: 1.225 },
  { id: "azot", nameTr: "Azot (Nitrojen)", category: "gaz", densityKgM3: 1.251 },
  { id: "oksijen", nameTr: "Oksijen", category: "gaz", densityKgM3: 1.429 },
  { id: "argon", nameTr: "Argon", category: "gaz", densityKgM3: 1.784 },
  { id: "propan", nameTr: "Propan", category: "gaz", densityKgM3: 1.882 },
  { id: "karbondioksit", nameTr: "Karbondioksit", category: "gaz", densityKgM3: 1.977 },
  { id: "butan", nameTr: "Bütan", category: "gaz", densityKgM3: 2.48 },
  { id: "klor", nameTr: "Klor", category: "gaz", densityKgM3: 3.214 },

  // ---- Sıvılar ve Kimyasallar ----
  { id: "benzin", nameTr: "Benzin", category: "sivi", densityKgM3: 740 },
  { id: "aseton", nameTr: "Aseton", category: "sivi", densityKgM3: 784 },
  { id: "etanol", nameTr: "Etanol (Etil Alkol)", category: "sivi", densityKgM3: 789 },
  { id: "gazyagi", nameTr: "Gazyağı (Kerosen)", category: "sivi", densityKgM3: 810 },
  { id: "dizel", nameTr: "Dizel", category: "sivi", densityKgM3: 832 },
  { id: "motor-yagi", nameTr: "Motor Yağı", category: "sivi", densityKgM3: 870 },
  { id: "benzen", nameTr: "Benzen", category: "sivi", densityKgM3: 876 },
  { id: "zeytinyagi", nameTr: "Zeytinyağı", category: "sivi", densityKgM3: 918 },
  { id: "bitkisel-yag", nameTr: "Bitkisel Yağ", category: "sivi", densityKgM3: 920 },
  { id: "hindistan-cevizi-yagi", nameTr: "Hindistan Cevizi Yağı", category: "sivi", densityKgM3: 924 },
  { id: "su", nameTr: "Su", category: "sivi", densityKgM3: 1000 },
  { id: "deniz-suyu", nameTr: "Deniz Suyu", category: "sivi", densityKgM3: 1025 },
  { id: "fren-hidroligi", nameTr: "Fren Hidroliği", category: "sivi", densityKgM3: 1050 },
  { id: "antifriz", nameTr: "Antifriz", category: "sivi", densityKgM3: 1110 },
  { id: "gliserin", nameTr: "Gliserin", category: "sivi", densityKgM3: 1260 },
  { id: "civa", nameTr: "Cıva", category: "sivi", densityKgM3: 13530 },

  // ---- Gıda ve Mutfak Malzemeleri ----
  { id: "un", nameTr: "Un", category: "gida", densityKgM3: 593 },
  { id: "tereyagi", nameTr: "Tereyağı", category: "gida", densityKgM3: 911 },
  { id: "buz", nameTr: "Buz", category: "gida", densityKgM3: 917 },
  { id: "sarap", nameTr: "Şarap", category: "gida", densityKgM3: 990 },
  {
    id: "bira",
    nameTr: "Bira",
    category: "gida",
    densityKgM3: 1010,
    variabilityNote:
      "Viskozitesi sıcaklığa duyarlıdır; 2-90°C aralığında yaklaşık 1-4 mPa·s arasında değişebilir.",
  },
  { id: "sirke", nameTr: "Sirke", category: "gida", densityKgM3: 1010 },
  { id: "yogurt", nameTr: "Yoğurt", category: "gida", densityKgM3: 1030 },
  { id: "sut", nameTr: "Süt", category: "gida", densityKgM3: 1030 },
  {
    id: "portakal-suyu",
    nameTr: "Portakal Suyu",
    category: "gida",
    densityKgM3: 1045,
    variabilityNote:
      "Viskozitesi konsantrasyona (°Brix) ve sıcaklığa çok duyarlıdır; yaklaşık 2-15 mPa·s arasında olabilir.",
  },
  { id: "elma-suyu", nameTr: "Elma Suyu", category: "gida", densityKgM3: 1048 },
  { id: "kan", nameTr: "Kan", category: "gida", densityKgM3: 1060 },
  { id: "seker", nameTr: "Toz Şeker", category: "gida", densityKgM3: 845 },
  { id: "pirinc-tahil", nameTr: "Pirinç (Tahıl)", category: "gida", densityKgM3: 850 },
  { id: "tuz", nameTr: "Sofra Tuzu", category: "gida", densityKgM3: 1217 },
  {
    id: "pekmez",
    nameTr: "Pekmez",
    category: "gida",
    densityKgM3: 1400,
    variabilityNote:
      "Viskozitesi su içeriğine ve sıcaklığa çok duyarlidir; oda sıcaklığında yaklaşık 1.000-5.000 mPa·s arasında olabilir.",
  },
  {
    id: "bal",
    nameTr: "Bal",
    category: "gida",
    densityKgM3: 1420,
    variabilityNote:
      "Viskozitesi nem oranına ve sıcaklığa çok duyarlidir; oda sıcaklığında yaklaşık 2.000-10.000 mPa·s arasında olabilir.",
  },

  // ---- Plastikler ----
  {
    id: "polipropilen",
    nameTr: "Polipropilen (PP)",
    category: "plastik",
    densityKgM3: 905,
    variabilityNote:
      "Isıl iletkenliği sıcaklığa duyarlıdır; yaklaşık 0,1-0,3 W/(m·K) arasında olabilir.",
  },
  { id: "ldpe", nameTr: "Alçak Yoğunluklu Polietilen (LDPE)", category: "plastik", densityKgM3: 920 },
  { id: "hdpe", nameTr: "Yüksek Yoğunluklu Polietilen (HDPE)", category: "plastik", densityKgM3: 950 },
  { id: "naylon", nameTr: "Naylon", category: "plastik", densityKgM3: 1150 },
  { id: "akrilik", nameTr: "Akrilik (Pleksiglas)", category: "plastik", densityKgM3: 1180 },
  { id: "polikarbonat", nameTr: "Polikarbonat", category: "plastik", densityKgM3: 1210 },
  { id: "polistiren", nameTr: "Polistiren (PS)", category: "plastik", densityKgM3: 1050 },
  { id: "abs", nameTr: "ABS Plastik", category: "plastik", densityKgM3: 1040 },
  { id: "pet", nameTr: "PET Plastik", category: "plastik", densityKgM3: 1380 },
  { id: "pvc", nameTr: "PVC", category: "plastik", densityKgM3: 1380 },
  { id: "teflon", nameTr: "Teflon (PTFE)", category: "plastik", densityKgM3: 2200 },

  // ---- Ahşap Türleri ----
  { id: "balsa", nameTr: "Balsa", category: "ahsap", densityKgM3: 160 },
  { id: "sedir", nameTr: "Sedir", category: "ahsap", densityKgM3: 380 },
  { id: "kavak", nameTr: "Kavak", category: "ahsap", densityKgM3: 410 },
  { id: "cam-agaci", nameTr: "Ahşap (Çam)", category: "ahsap", densityKgM3: 500 },
  { id: "maun", nameTr: "Maun", category: "ahsap", densityKgM3: 600 },
  { id: "ceviz-agaci", nameTr: "Ceviz Ağacı", category: "ahsap", densityKgM3: 610 },
  { id: "tik", nameTr: "Tik", category: "ahsap", densityKgM3: 650 },
  { id: "hus", nameTr: "Huş", category: "ahsap", densityKgM3: 670 },
  { id: "kayin", nameTr: "Kayın", category: "ahsap", densityKgM3: 720 },
  { id: "mese-agaci", nameTr: "Ahşap (Meşe)", category: "ahsap", densityKgM3: 750 },

  // ---- Yapı Malzemeleri ----
  { id: "cimento-tozu", nameTr: "Çimento Tozu", category: "yapi-malzemesi", densityKgM3: 1440 },
  { id: "kum", nameTr: "Kum", category: "yapi-malzemesi", densityKgM3: 1600 },
  { id: "cakil", nameTr: "Çakıl", category: "yapi-malzemesi", densityKgM3: 1680 },
  { id: "tugla", nameTr: "Tuğla", category: "yapi-malzemesi", densityKgM3: 1800 },
  { id: "alci", nameTr: "Alçı", category: "yapi-malzemesi", densityKgM3: 2320 },
  { id: "asfalt", nameTr: "Asfalt", category: "yapi-malzemesi", densityKgM3: 2320 },
  { id: "kumtasi", nameTr: "Kumtaşı", category: "yapi-malzemesi", densityKgM3: 2320 },
  { id: "beton", nameTr: "Beton", category: "yapi-malzemesi", densityKgM3: 2400 },
  { id: "cam", nameTr: "Cam", category: "yapi-malzemesi", densityKgM3: 2500 },
  { id: "kirectasi", nameTr: "Kireçtaşı", category: "yapi-malzemesi", densityKgM3: 2600 },
  { id: "mermer", nameTr: "Mermer", category: "yapi-malzemesi", densityKgM3: 2710 },
  { id: "granit", nameTr: "Granit", category: "yapi-malzemesi", densityKgM3: 2750 },
  { id: "bazalt", nameTr: "Bazalt", category: "yapi-malzemesi", densityKgM3: 3000 },

  // ---- Metaller ----
  { id: "magnezyum", nameTr: "Magnezyum", category: "metal", densityKgM3: 1740 },
  { id: "aluminyum", nameTr: "Alüminyum", category: "metal", densityKgM3: 2700 },
  { id: "titanyum", nameTr: "Titanyum", category: "metal", densityKgM3: 4500 },
  { id: "vanadyum", nameTr: "Vanadyum", category: "metal", densityKgM3: 6110 },
  { id: "antimon", nameTr: "Antimon", category: "metal", densityKgM3: 6690 },
  { id: "cinko", nameTr: "Çinko", category: "metal", densityKgM3: 7140 },
  { id: "krom", nameTr: "Krom", category: "metal", densityKgM3: 7190 },
  { id: "dokme-demir", nameTr: "Dökme Demir", category: "metal", densityKgM3: 7200 },
  { id: "kalay", nameTr: "Kalay", category: "metal", densityKgM3: 7310 },
  { id: "celik", nameTr: "Çelik", category: "metal", densityKgM3: 7850 },
  { id: "demir", nameTr: "Demir", category: "metal", densityKgM3: 7870 },
  { id: "paslanmaz-celik", nameTr: "Paslanmaz Çelik", category: "metal", densityKgM3: 8000 },
  { id: "pirinc-alasim", nameTr: "Pirinç (Alaşım)", category: "metal", densityKgM3: 8500 },
  { id: "kadmiyum", nameTr: "Kadmiyum", category: "metal", densityKgM3: 8650 },
  { id: "niyobyum", nameTr: "Niyobyum", category: "metal", densityKgM3: 8570 },
  { id: "bronz", nameTr: "Bronz", category: "metal", densityKgM3: 8800 },
  { id: "kobalt", nameTr: "Kobalt", category: "metal", densityKgM3: 8900 },
  { id: "nikel", nameTr: "Nikel", category: "metal", densityKgM3: 8908 },
  { id: "bakir", nameTr: "Bakır", category: "metal", densityKgM3: 8960 },
  { id: "bizmut", nameTr: "Bizmut", category: "metal", densityKgM3: 9780 },
  { id: "molibden", nameTr: "Molibden", category: "metal", densityKgM3: 10220 },
  { id: "gumus", nameTr: "Gümüş", category: "metal", densityKgM3: 10490 },
  { id: "kursun", nameTr: "Kurşun", category: "metal", densityKgM3: 11340 },
  { id: "paladyum", nameTr: "Paladyum", category: "metal", densityKgM3: 12020 },
  { id: "tungsten", nameTr: "Tungsten", category: "metal", densityKgM3: 19250 },
  { id: "altin", nameTr: "Altın", category: "metal", densityKgM3: 19320 },
  { id: "uranyum", nameTr: "Uranyum", category: "metal", densityKgM3: 19050 },
  { id: "platin", nameTr: "Platin", category: "metal", densityKgM3: 21450 },
];

export function findMaterialById(id: string): MaterialDensityEntry | undefined {
  return materialsDatabase.find((material) => material.id === id);
}
