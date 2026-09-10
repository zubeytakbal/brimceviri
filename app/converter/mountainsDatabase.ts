// Dunyanin 8.000 metre uzeri 14 zirvesi (eight-thousanders). Hepsi
// Himalaya/Karakoram sıradaglarinda, Wikipedia'nin (Wikidata kaynakli)
// infobox verilerinden alinmis, capraz kontrol edilmis degerler. Kis
// tirmanisi yillari birden fazla dagcilik kaynagiyla (AAC, Planetmountain,
// Explorersweb) capraz dogrulanmistir. Gorseller Wikimedia Commons'tan,
// her birinin lisansi ve fotografcisi ayri ayri kontrol edilmistir --
// Gasherbrum II icin uygun lisansli bir gorsel bulunamadi, resimsiz birakildi.
export type MountainImage = {
  url: string;
  photographer: string;
  license: string;
  licenseUrl?: string;
};

export type MountainEntry = {
  id: string;
  nameTr: string;
  elevationM: number;
  prominenceM: number;
  rangeTr: string;
  countriesTr: string[];
  firstAscentYear: number;
  firstWinterAscentYear: number;
  image?: MountainImage;
};

export const mountainsDatabase: MountainEntry[] = [
  {
    id: "everest",
    nameTr: "Everest",
    elevationM: 8849,
    prominenceM: 8849,
    rangeTr: "Himalaya",
    countriesTr: ["Nepal", "Çin"],
    firstAscentYear: 1953,
    firstWinterAscentYear: 1980,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/1/15/Mt._Everest_from_Gokyo_Ri_November_5%2C_2012.jpg",
      photographer: "Rdevany",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    },
  },
  {
    id: "k2",
    nameTr: "K2",
    elevationM: 8611,
    prominenceM: 4020,
    rangeTr: "Karakoram",
    countriesTr: ["Pakistan", "Çin"],
    firstAscentYear: 1954,
    firstWinterAscentYear: 2021,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Chogori.jpg/1280px-Chogori.jpg",
      photographer: "Zacharie Grossen",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
  },
  {
    id: "kangchenjunga",
    nameTr: "Kangchenjunga",
    elevationM: 8586,
    prominenceM: 3922,
    rangeTr: "Himalaya",
    countriesTr: ["Nepal", "Hindistan"],
    firstAscentYear: 1955,
    firstWinterAscentYear: 1986,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Kangchenjunga_PangPema.JPG/1280px-Kangchenjunga_PangPema.JPG",
      photographer: "Tomabarker",
      license: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    },
  },
  {
    id: "lhotse",
    nameTr: "Lhotse",
    elevationM: 8516,
    prominenceM: 610,
    rangeTr: "Himalaya",
    countriesTr: ["Nepal", "Çin"],
    firstAscentYear: 1956,
    firstWinterAscentYear: 1988,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/7/72/Lhotse-fromChukhungRi.jpg",
      photographer: "Uwe Gille",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    },
  },
  {
    id: "makalu",
    nameTr: "Makalu",
    elevationM: 8485,
    prominenceM: 2378,
    rangeTr: "Himalaya",
    countriesTr: ["Nepal", "Çin"],
    firstAscentYear: 1955,
    firstWinterAscentYear: 2009,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/1/19/Makalu.jpg",
      photographer: "Ben Tubby",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    },
  },
  {
    id: "cho-oyu",
    nameTr: "Cho Oyu",
    elevationM: 8188,
    prominenceM: 2340,
    rangeTr: "Himalaya",
    countriesTr: ["Nepal", "Çin"],
    firstAscentYear: 1954,
    firstWinterAscentYear: 1985,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Chooyu.jpg",
      photographer: "Robstar06",
      license: "Kamu Malı (Public Domain)",
    },
  },
  {
    id: "dhaulagiri",
    nameTr: "Dhaulagiri",
    elevationM: 8167,
    prominenceM: 3357,
    rangeTr: "Himalaya",
    countriesTr: ["Nepal"],
    firstAscentYear: 1960,
    firstWinterAscentYear: 1985,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/9/91/Dhaulagiri_-_view_from_aircraft.jpg",
      photographer: "Sergey Ashmarin",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    },
  },
  {
    id: "manaslu",
    nameTr: "Manaslu",
    elevationM: 8163,
    prominenceM: 3092,
    rangeTr: "Himalaya",
    countriesTr: ["Nepal"],
    firstAscentYear: 1956,
    firstWinterAscentYear: 1984,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Sunrise%2C_Manaslu.jpg",
      photographer: "Ben Tubby",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    },
  },
  {
    id: "nanga-parbat",
    nameTr: "Nanga Parbat",
    elevationM: 8125,
    prominenceM: 4608,
    rangeTr: "Karakoram",
    countriesTr: ["Pakistan"],
    firstAscentYear: 1953,
    firstWinterAscentYear: 2016,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/3/35/Fairy_Meadows_and_the_view_of_Nanga_Parbat.jpg",
      photographer: "Imran Khakwani",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
  },
  {
    id: "annapurna",
    nameTr: "Annapurna",
    elevationM: 8091,
    prominenceM: 2984,
    rangeTr: "Himalaya",
    countriesTr: ["Nepal"],
    firstAscentYear: 1950,
    firstWinterAscentYear: 1987,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/South_Face_of_Annapurna_I_%28Main%29.jpg/1280px-South_Face_of_Annapurna_I_%28Main%29.jpg",
      photographer: "PrajwalMohan",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
  },
  {
    id: "gasherbrum-1",
    nameTr: "Gasherbrum I",
    elevationM: 8080,
    prominenceM: 2155,
    rangeTr: "Karakoram",
    countriesTr: ["Pakistan", "Çin"],
    firstAscentYear: 1958,
    firstWinterAscentYear: 2012,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/6/6f/HiddenPeak.jpg",
      photographer: "Dr. Olaf Rieck",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    },
  },
  {
    id: "broad-peak",
    nameTr: "Broad Peak",
    elevationM: 8051,
    prominenceM: 1701,
    rangeTr: "Karakoram",
    countriesTr: ["Pakistan", "Çin"],
    firstAscentYear: 1957,
    firstWinterAscentYear: 2013,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/5/5b/7_15_BroadPeak.jpg",
      photographer: "Kogo",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    },
  },
  {
    id: "gasherbrum-2",
    nameTr: "Gasherbrum II",
    elevationM: 8034,
    prominenceM: 1524,
    rangeTr: "Karakoram",
    countriesTr: ["Pakistan", "Çin"],
    firstAscentYear: 1956,
    firstWinterAscentYear: 2011,
  },
  {
    id: "shishapangma",
    nameTr: "Shishapangma",
    elevationM: 8027,
    prominenceM: 2897,
    rangeTr: "Himalaya",
    countriesTr: ["Çin"],
    firstAscentYear: 1964,
    firstWinterAscentYear: 2005,
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/9/98/8%2C013m_Shishapangma_Tibet_China_%E8%A5%BF%E8%97%8F_%E5%B8%8C%E5%A4%8F%E9%82%A6%E9%A9%AC%E5%B3%B0_-_panoramio.jpg",
      photographer: "Hiroki Ogawa",
      license: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    },
  },
];
