// Turkiye'nin 81 ili: plaka, ad, il merkezi koordinati, cografi bolge ve rakim.
// Koordinatlar: GeoNames (CC BY 4.0, cities.json paketi) il merkezi noktalari. Rakim: turkishProvinceElevations.
export type TurkeyRegion = "Marmara" | "Ege" | "Akdeniz" | "İç Anadolu" | "Karadeniz" | "Doğu Anadolu" | "Güneydoğu Anadolu";

export type TurkeyProvince = {
  plate: number;
  /** URL kimligi (il-rakimlari ile ayni) */
  id: string;
  name: string;
  /** Il merkezi ilce adi il adindan farkliysa (Kocaeli -> İzmit) */
  center: string | null;
  lat: number;
  lon: number;
  region: TurkeyRegion;
  elevationM: number;
};

export const turkeyProvinces: TurkeyProvince[] = [
  { plate: 1, id: "adana", name: "Adana", center: null, lat: 36.9862, lon: 35.3253, region: "Akdeniz", elevationM: 23 },
  { plate: 2, id: "adiyaman", name: "Adıyaman", center: null, lat: 37.7644, lon: 38.2763, region: "Güneydoğu Anadolu", elevationM: 669 },
  { plate: 3, id: "afyon", name: "Afyonkarahisar", center: null, lat: 38.7567, lon: 30.5433, region: "Ege", elevationM: 1021 },
  { plate: 4, id: "agri", name: "Ağrı", center: null, lat: 39.7147, lon: 43.0401, region: "Doğu Anadolu", elevationM: 1640 },
  { plate: 5, id: "amasya", name: "Amasya", center: null, lat: 40.6533, lon: 35.8331, region: "Karadeniz", elevationM: 392 },
  { plate: 6, id: "ankara", name: "Ankara", center: null, lat: 39.9199, lon: 32.8543, region: "İç Anadolu", elevationM: 850 },
  { plate: 7, id: "antalya", name: "Antalya", center: null, lat: 36.9081, lon: 30.6956, region: "Akdeniz", elevationM: 39 },
  { plate: 8, id: "artvin", name: "Artvin", center: null, lat: 41.1816, lon: 41.8217, region: "Karadeniz", elevationM: 520 },
  { plate: 9, id: "aydin", name: "Aydın", center: null, lat: 37.845, lon: 27.8396, region: "Ege", elevationM: 64 },
  { plate: 10, id: "balikesir", name: "Balıkesir", center: null, lat: 39.6492, lon: 27.8861, region: "Marmara", elevationM: 139 },
  { plate: 11, id: "bilecik", name: "Bilecik", center: null, lat: 40.1419, lon: 29.9793, region: "Marmara", elevationM: 500 },
  { plate: 12, id: "bingol", name: "Bingöl", center: null, lat: 38.8847, lon: 40.4939, region: "Doğu Anadolu", elevationM: 1151 },
  { plate: 13, id: "bitlis", name: "Bitlis", center: null, lat: 38.4012, lon: 42.1078, region: "Doğu Anadolu", elevationM: 1500 },
  { plate: 14, id: "bolu", name: "Bolu", center: null, lat: 40.7358, lon: 31.6061, region: "Karadeniz", elevationM: 725 },
  { plate: 15, id: "burdur", name: "Burdur", center: null, lat: 37.7203, lon: 30.2908, region: "Akdeniz", elevationM: 950 },
  { plate: 16, id: "bursa", name: "Bursa", center: null, lat: 40.1956, lon: 29.0601, region: "Marmara", elevationM: 155 },
  { plate: 17, id: "canakkale", name: "Çanakkale", center: null, lat: 40.1555, lon: 26.4127, region: "Marmara", elevationM: 3 },
  { plate: 18, id: "cankiri", name: "Çankırı", center: null, lat: 40.5999, lon: 33.6153, region: "İç Anadolu", elevationM: 723 },
  { plate: 19, id: "corum", name: "Çorum", center: null, lat: 40.5489, lon: 34.9533, region: "Karadeniz", elevationM: 801 },
  { plate: 20, id: "denizli", name: "Denizli", center: null, lat: 37.7742, lon: 29.0875, region: "Ege", elevationM: 354 },
  { plate: 21, id: "diyarbakir", name: "Diyarbakır", center: null, lat: 37.9136, lon: 40.2172, region: "Güneydoğu Anadolu", elevationM: 670 },
  { plate: 22, id: "edirne", name: "Edirne", center: null, lat: 41.6772, lon: 26.556, region: "Marmara", elevationM: 42 },
  { plate: 23, id: "elazig", name: "Elazığ", center: null, lat: 38.6743, lon: 39.2232, region: "Doğu Anadolu", elevationM: 1067 },
  { plate: 24, id: "erzincan", name: "Erzincan", center: null, lat: 39.7392, lon: 39.4901, region: "Doğu Anadolu", elevationM: 1214 },
  { plate: 25, id: "erzurum", name: "Erzurum", center: null, lat: 39.9086, lon: 41.2769, region: "Doğu Anadolu", elevationM: 1890 },
  { plate: 26, id: "eskisehir", name: "Eskişehir", center: null, lat: 39.7767, lon: 30.5206, region: "İç Anadolu", elevationM: 782 },
  { plate: 27, id: "gaziantep", name: "Gaziantep", center: null, lat: 37.0594, lon: 37.3825, region: "Güneydoğu Anadolu", elevationM: 843 },
  { plate: 28, id: "giresun", name: "Giresun", center: null, lat: 40.917, lon: 38.3874, region: "Karadeniz", elevationM: 5 },
  { plate: 29, id: "gumushane", name: "Gümüşhane", center: null, lat: 40.46, lon: 39.4718, region: "Karadeniz", elevationM: 1153 },
  { plate: 30, id: "hakkari", name: "Hakkari", center: null, lat: 37.5744, lon: 43.7408, region: "Doğu Anadolu", elevationM: 1748 },
  { plate: 31, id: "hatay", name: "Hatay", center: "Antakya", lat: 36.2066, lon: 36.1572, region: "Akdeniz", elevationM: 85 },
  { plate: 32, id: "isparta", name: "Isparta", center: null, lat: 37.7644, lon: 30.5522, region: "Akdeniz", elevationM: 1035 },
  { plate: 33, id: "mersin", name: "Mersin", center: null, lat: 36.812, lon: 34.6389, region: "Akdeniz", elevationM: 6 },
  { plate: 34, id: "istanbul", name: "İstanbul", center: null, lat: 41.0138, lon: 28.9497, region: "Marmara", elevationM: 120 },
  { plate: 35, id: "izmir", name: "İzmir", center: null, lat: 38.4127, lon: 27.1384, region: "Ege", elevationM: 2 },
  { plate: 36, id: "kars", name: "Kars", center: null, lat: 40.5983, lon: 43.0855, region: "Doğu Anadolu", elevationM: 1768 },
  { plate: 37, id: "kastamonu", name: "Kastamonu", center: null, lat: 41.3781, lon: 33.7753, region: "Karadeniz", elevationM: 798 },
  { plate: 38, id: "kayseri", name: "Kayseri", center: null, lat: 38.7322, lon: 35.4853, region: "İç Anadolu", elevationM: 1071 },
  { plate: 39, id: "kirklareli", name: "Kırklareli", center: null, lat: 41.7351, lon: 27.2252, region: "Marmara", elevationM: 209 },
  { plate: 40, id: "kirsehir", name: "Kırşehir", center: null, lat: 39.1458, lon: 34.1639, region: "İç Anadolu", elevationM: 978 },
  { plate: 41, id: "kocaeli", name: "Kocaeli", center: "İzmit", lat: 40.765, lon: 29.9293, region: "Marmara", elevationM: 3 },
  { plate: 42, id: "konya", name: "Konya", center: null, lat: 37.8713, lon: 32.4846, region: "İç Anadolu", elevationM: 1016 },
  { plate: 43, id: "kutahya", name: "Kütahya", center: null, lat: 39.4242, lon: 29.9833, region: "Ege", elevationM: 950 },
  { plate: 44, id: "malatya", name: "Malatya", center: null, lat: 38.3502, lon: 38.3167, region: "Doğu Anadolu", elevationM: 964 },
  { plate: 45, id: "manisa", name: "Manisa", center: null, lat: 38.612, lon: 27.4265, region: "Ege", elevationM: 74 },
  { plate: 46, id: "kahramanmaras", name: "Kahramanmaraş", center: null, lat: 37.5847, lon: 36.9264, region: "Akdeniz", elevationM: 568 },
  { plate: 47, id: "mardin", name: "Mardin", center: null, lat: 37.3131, lon: 40.7436, region: "Güneydoğu Anadolu", elevationM: 938 },
  { plate: 48, id: "mugla", name: "Muğla", center: null, lat: 37.2181, lon: 28.3665, region: "Ege", elevationM: 625 },
  { plate: 49, id: "mus", name: "Muş", center: null, lat: 38.7316, lon: 41.4848, region: "Doğu Anadolu", elevationM: 1404 },
  { plate: 50, id: "nevsehir", name: "Nevşehir", center: null, lat: 38.625, lon: 34.7122, region: "İç Anadolu", elevationM: 1250 },
  { plate: 51, id: "nigde", name: "Niğde", center: null, lat: 37.9658, lon: 34.6793, region: "İç Anadolu", elevationM: 1229 },
  { plate: 52, id: "ordu", name: "Ordu", center: null, lat: 40.9778, lon: 37.8905, region: "Karadeniz", elevationM: 3 },
  { plate: 53, id: "rize", name: "Rize", center: null, lat: 41.0208, lon: 40.5219, region: "Karadeniz", elevationM: 6 },
  { plate: 54, id: "sakarya", name: "Sakarya", center: "Adapazarı", lat: 40.7806, lon: 30.4033, region: "Marmara", elevationM: 31 },
  { plate: 55, id: "samsun", name: "Samsun", center: null, lat: 41.2798, lon: 36.3361, region: "Karadeniz", elevationM: 4 },
  { plate: 56, id: "siirt", name: "Siirt", center: null, lat: 37.9293, lon: 41.9413, region: "Güneydoğu Anadolu", elevationM: 902 },
  { plate: 57, id: "sinop", name: "Sinop", center: null, lat: 42.0268, lon: 35.1625, region: "Karadeniz", elevationM: 17 },
  { plate: 58, id: "sivas", name: "Sivas", center: null, lat: 39.7483, lon: 37.0161, region: "İç Anadolu", elevationM: 1285 },
  { plate: 59, id: "tekirdag", name: "Tekirdağ", center: null, lat: 40.9781, lon: 27.511, region: "Marmara", elevationM: 10 },
  { plate: 60, id: "tokat", name: "Tokat", center: null, lat: 40.3139, lon: 36.5544, region: "Karadeniz", elevationM: 640 },
  { plate: 61, id: "trabzon", name: "Trabzon", center: null, lat: 41.005, lon: 39.7269, region: "Karadeniz", elevationM: 10 },
  { plate: 62, id: "tunceli", name: "Tunceli", center: null, lat: 39.0992, lon: 39.5435, region: "Doğu Anadolu", elevationM: 914 },
  { plate: 63, id: "sanliurfa", name: "Şanlıurfa", center: null, lat: 37.1671, lon: 38.7939, region: "Güneydoğu Anadolu", elevationM: 518 },
  { plate: 64, id: "usak", name: "Uşak", center: null, lat: 38.6735, lon: 29.4058, region: "Ege", elevationM: 906 },
  { plate: 65, id: "van", name: "Van", center: null, lat: 38.4946, lon: 43.3832, region: "Doğu Anadolu", elevationM: 1727 },
  { plate: 66, id: "yozgat", name: "Yozgat", center: null, lat: 39.82, lon: 34.8044, region: "İç Anadolu", elevationM: 1301 },
  { plate: 67, id: "zonguldak", name: "Zonguldak", center: null, lat: 41.4514, lon: 31.7931, region: "Karadeniz", elevationM: 10 },
  { plate: 68, id: "aksaray", name: "Aksaray", center: null, lat: 38.3725, lon: 34.0254, region: "İç Anadolu", elevationM: 975 },
  { plate: 69, id: "bayburt", name: "Bayburt", center: null, lat: 40.2563, lon: 40.2229, region: "Karadeniz", elevationM: 1556 },
  { plate: 70, id: "karaman", name: "Karaman", center: null, lat: 37.1811, lon: 33.215, region: "İç Anadolu", elevationM: 1038 },
  { plate: 71, id: "kirikkale", name: "Kırıkkale", center: null, lat: 39.8453, lon: 33.5064, region: "İç Anadolu", elevationM: 700 },
  { plate: 72, id: "batman", name: "Batman", center: null, lat: 37.8874, lon: 41.1322, region: "Güneydoğu Anadolu", elevationM: 525 },
  { plate: 73, id: "sirnak", name: "Şırnak", center: null, lat: 37.5139, lon: 42.4543, region: "Güneydoğu Anadolu", elevationM: 1350 },
  { plate: 74, id: "bartin", name: "Bartın", center: null, lat: 41.6358, lon: 32.3375, region: "Karadeniz", elevationM: 19 },
  { plate: 75, id: "ardahan", name: "Ardahan", center: null, lat: 41.1087, lon: 42.7022, region: "Doğu Anadolu", elevationM: 1870 },
  { plate: 76, id: "igdir", name: "Iğdır", center: null, lat: 39.9237, lon: 44.045, region: "Doğu Anadolu", elevationM: 860 },
  { plate: 77, id: "yalova", name: "Yalova", center: null, lat: 40.655, lon: 29.2769, region: "Marmara", elevationM: 5 },
  { plate: 78, id: "karabuk", name: "Karabük", center: null, lat: 41.2049, lon: 32.6277, region: "Karadeniz", elevationM: 258 },
  { plate: 79, id: "kilis", name: "Kilis", center: null, lat: 36.7161, lon: 37.115, region: "Güneydoğu Anadolu", elevationM: 640 },
  { plate: 80, id: "osmaniye", name: "Osmaniye", center: null, lat: 37.0742, lon: 36.2478, region: "Akdeniz", elevationM: 150 },
  { plate: 81, id: "duzce", name: "Düzce", center: null, lat: 40.8389, lon: 31.1639, region: "Karadeniz", elevationM: 146 }
];

export const TURKEY_REGIONS: TurkeyRegion[] = ["Marmara", "Ege", "Akdeniz", "İç Anadolu", "Karadeniz", "Doğu Anadolu", "Güneydoğu Anadolu"];

export function findProvince(id: string) {
  return turkeyProvinces.find((p) => p.id === id) ?? null;
}

export function provinceByPlate(plate: number) {
  return turkeyProvinces[plate - 1];
}
