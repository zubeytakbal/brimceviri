// Dunya saati sehirleri. en/tr: URL slug'lari; inTr: Turkce bulunma hali ("New York'ta").
// countryWide: ulkenin tamami tek saat dilimi kullaniyorsa true.
export type WorldRegion = "turkey" | "europe" | "middle-east" | "asia" | "africa" | "americas" | "oceania";

export type WorldCity = {
  en: string;
  tr: string;
  nameTr: string;
  nameEn: string;
  countryTr: string;
  countryEn: string;
  timeZone: string;
  lat: number;
  lon: number;
  region: WorldRegion;
  inTr: string;
  countryWide: boolean;
};

export const worldCities: WorldCity[] = [
  { en: "istanbul", tr: "istanbul", nameTr: "İstanbul", nameEn: "Istanbul", countryTr: "Türkiye", countryEn: "Türkiye", timeZone: "Europe/Istanbul", lat: 41.01, lon: 28.98, region: "turkey", inTr: "İstanbul'da", countryWide: true },
  { en: "ankara", tr: "ankara", nameTr: "Ankara", nameEn: "Ankara", countryTr: "Türkiye", countryEn: "Türkiye", timeZone: "Europe/Istanbul", lat: 39.93, lon: 32.86, region: "turkey", inTr: "Ankara'da", countryWide: true },
  { en: "izmir", tr: "izmir", nameTr: "İzmir", nameEn: "Izmir", countryTr: "Türkiye", countryEn: "Türkiye", timeZone: "Europe/Istanbul", lat: 38.42, lon: 27.14, region: "turkey", inTr: "İzmir'de", countryWide: true },
  { en: "london", tr: "londra", nameTr: "Londra", nameEn: "London", countryTr: "İngiltere", countryEn: "United Kingdom", timeZone: "Europe/London", lat: 51.51, lon: -0.13, region: "europe", inTr: "Londra'da", countryWide: true },
  { en: "paris", tr: "paris", nameTr: "Paris", nameEn: "Paris", countryTr: "Fransa", countryEn: "France", timeZone: "Europe/Paris", lat: 48.86, lon: 2.35, region: "europe", inTr: "Paris'te", countryWide: true },
  { en: "berlin", tr: "berlin", nameTr: "Berlin", nameEn: "Berlin", countryTr: "Almanya", countryEn: "Germany", timeZone: "Europe/Berlin", lat: 52.52, lon: 13.40, region: "europe", inTr: "Berlin'de", countryWide: true },
  { en: "amsterdam", tr: "amsterdam", nameTr: "Amsterdam", nameEn: "Amsterdam", countryTr: "Hollanda", countryEn: "Netherlands", timeZone: "Europe/Amsterdam", lat: 52.37, lon: 4.90, region: "europe", inTr: "Amsterdam'da", countryWide: true },
  { en: "brussels", tr: "bruksel", nameTr: "Brüksel", nameEn: "Brussels", countryTr: "Belçika", countryEn: "Belgium", timeZone: "Europe/Brussels", lat: 50.85, lon: 4.35, region: "europe", inTr: "Brüksel'de", countryWide: true },
  { en: "madrid", tr: "madrid", nameTr: "Madrid", nameEn: "Madrid", countryTr: "İspanya", countryEn: "Spain", timeZone: "Europe/Madrid", lat: 40.42, lon: -3.70, region: "europe", inTr: "Madrid'de", countryWide: false },
  { en: "barcelona", tr: "barselona", nameTr: "Barselona", nameEn: "Barcelona", countryTr: "İspanya", countryEn: "Spain", timeZone: "Europe/Madrid", lat: 41.39, lon: 2.17, region: "europe", inTr: "Barselona'da", countryWide: false },
  { en: "rome", tr: "roma", nameTr: "Roma", nameEn: "Rome", countryTr: "İtalya", countryEn: "Italy", timeZone: "Europe/Rome", lat: 41.90, lon: 12.50, region: "europe", inTr: "Roma'da", countryWide: true },
  { en: "milan", tr: "milano", nameTr: "Milano", nameEn: "Milan", countryTr: "İtalya", countryEn: "Italy", timeZone: "Europe/Rome", lat: 45.46, lon: 9.19, region: "europe", inTr: "Milano'da", countryWide: true },
  { en: "vienna", tr: "viyana", nameTr: "Viyana", nameEn: "Vienna", countryTr: "Avusturya", countryEn: "Austria", timeZone: "Europe/Vienna", lat: 48.21, lon: 16.37, region: "europe", inTr: "Viyana'da", countryWide: true },
  { en: "zurich", tr: "zurih", nameTr: "Zürih", nameEn: "Zurich", countryTr: "İsviçre", countryEn: "Switzerland", timeZone: "Europe/Zurich", lat: 47.38, lon: 8.54, region: "europe", inTr: "Zürih'te", countryWide: true },
  { en: "stockholm", tr: "stokholm", nameTr: "Stokholm", nameEn: "Stockholm", countryTr: "İsveç", countryEn: "Sweden", timeZone: "Europe/Stockholm", lat: 59.33, lon: 18.07, region: "europe", inTr: "Stokholm'de", countryWide: true },
  { en: "oslo", tr: "oslo", nameTr: "Oslo", nameEn: "Oslo", countryTr: "Norveç", countryEn: "Norway", timeZone: "Europe/Oslo", lat: 59.91, lon: 10.75, region: "europe", inTr: "Oslo'da", countryWide: true },
  { en: "copenhagen", tr: "kopenhag", nameTr: "Kopenhag", nameEn: "Copenhagen", countryTr: "Danimarka", countryEn: "Denmark", timeZone: "Europe/Copenhagen", lat: 55.68, lon: 12.57, region: "europe", inTr: "Kopenhag'da", countryWide: true },
  { en: "helsinki", tr: "helsinki", nameTr: "Helsinki", nameEn: "Helsinki", countryTr: "Finlandiya", countryEn: "Finland", timeZone: "Europe/Helsinki", lat: 60.17, lon: 24.94, region: "europe", inTr: "Helsinki'de", countryWide: true },
  { en: "dublin", tr: "dublin", nameTr: "Dublin", nameEn: "Dublin", countryTr: "İrlanda", countryEn: "Ireland", timeZone: "Europe/Dublin", lat: 53.35, lon: -6.26, region: "europe", inTr: "Dublin'de", countryWide: true },
  { en: "lisbon", tr: "lizbon", nameTr: "Lizbon", nameEn: "Lisbon", countryTr: "Portekiz", countryEn: "Portugal", timeZone: "Europe/Lisbon", lat: 38.72, lon: -9.14, region: "europe", inTr: "Lizbon'da", countryWide: false },
  { en: "athens", tr: "atina", nameTr: "Atina", nameEn: "Athens", countryTr: "Yunanistan", countryEn: "Greece", timeZone: "Europe/Athens", lat: 37.98, lon: 23.73, region: "europe", inTr: "Atina'da", countryWide: true },
  { en: "warsaw", tr: "varsova", nameTr: "Varşova", nameEn: "Warsaw", countryTr: "Polonya", countryEn: "Poland", timeZone: "Europe/Warsaw", lat: 52.23, lon: 21.01, region: "europe", inTr: "Varşova'da", countryWide: true },
  { en: "prague", tr: "prag", nameTr: "Prag", nameEn: "Prague", countryTr: "Çekya", countryEn: "Czechia", timeZone: "Europe/Prague", lat: 50.08, lon: 14.44, region: "europe", inTr: "Prag'da", countryWide: true },
  { en: "budapest", tr: "budapeste", nameTr: "Budapeşte", nameEn: "Budapest", countryTr: "Macaristan", countryEn: "Hungary", timeZone: "Europe/Budapest", lat: 47.50, lon: 19.04, region: "europe", inTr: "Budapeşte'de", countryWide: true },
  { en: "bucharest", tr: "bukres", nameTr: "Bükreş", nameEn: "Bucharest", countryTr: "Romanya", countryEn: "Romania", timeZone: "Europe/Bucharest", lat: 44.43, lon: 26.10, region: "europe", inTr: "Bükreş'te", countryWide: true },
  { en: "sofia", tr: "sofya", nameTr: "Sofya", nameEn: "Sofia", countryTr: "Bulgaristan", countryEn: "Bulgaria", timeZone: "Europe/Sofia", lat: 42.70, lon: 23.32, region: "europe", inTr: "Sofya'da", countryWide: true },
  { en: "belgrade", tr: "belgrad", nameTr: "Belgrad", nameEn: "Belgrade", countryTr: "Sırbistan", countryEn: "Serbia", timeZone: "Europe/Belgrade", lat: 44.79, lon: 20.45, region: "europe", inTr: "Belgrad'da", countryWide: true },
  { en: "kyiv", tr: "kiev", nameTr: "Kiev", nameEn: "Kyiv", countryTr: "Ukrayna", countryEn: "Ukraine", timeZone: "Europe/Kyiv", lat: 50.45, lon: 30.52, region: "europe", inTr: "Kiev'de", countryWide: true },
  { en: "moscow", tr: "moskova", nameTr: "Moskova", nameEn: "Moscow", countryTr: "Rusya", countryEn: "Russia", timeZone: "Europe/Moscow", lat: 55.76, lon: 37.62, region: "europe", inTr: "Moskova'da", countryWide: false },
  { en: "baku", tr: "baku", nameTr: "Bakü", nameEn: "Baku", countryTr: "Azerbaycan", countryEn: "Azerbaijan", timeZone: "Asia/Baku", lat: 40.41, lon: 49.87, region: "asia", inTr: "Bakü'de", countryWide: true },
  { en: "tbilisi", tr: "tiflis", nameTr: "Tiflis", nameEn: "Tbilisi", countryTr: "Gürcistan", countryEn: "Georgia", timeZone: "Asia/Tbilisi", lat: 41.72, lon: 44.79, region: "asia", inTr: "Tiflis'te", countryWide: true },
  { en: "dubai", tr: "dubai", nameTr: "Dubai", nameEn: "Dubai", countryTr: "Birleşik Arap Emirlikleri", countryEn: "United Arab Emirates", timeZone: "Asia/Dubai", lat: 25.20, lon: 55.27, region: "middle-east", inTr: "Dubai'de", countryWide: true },
  { en: "riyadh", tr: "riyad", nameTr: "Riyad", nameEn: "Riyadh", countryTr: "Suudi Arabistan", countryEn: "Saudi Arabia", timeZone: "Asia/Riyadh", lat: 24.71, lon: 46.68, region: "middle-east", inTr: "Riyad'da", countryWide: true },
  { en: "mecca", tr: "mekke", nameTr: "Mekke", nameEn: "Mecca", countryTr: "Suudi Arabistan", countryEn: "Saudi Arabia", timeZone: "Asia/Riyadh", lat: 21.39, lon: 39.86, region: "middle-east", inTr: "Mekke'de", countryWide: true },
  { en: "doha", tr: "doha", nameTr: "Doha", nameEn: "Doha", countryTr: "Katar", countryEn: "Qatar", timeZone: "Asia/Qatar", lat: 25.29, lon: 51.53, region: "middle-east", inTr: "Doha'da", countryWide: true },
  { en: "kuwait-city", tr: "kuveyt", nameTr: "Kuveyt", nameEn: "Kuwait City", countryTr: "Kuveyt", countryEn: "Kuwait", timeZone: "Asia/Kuwait", lat: 29.38, lon: 47.99, region: "middle-east", inTr: "Kuveyt'te", countryWide: true },
  { en: "baghdad", tr: "bagdat", nameTr: "Bağdat", nameEn: "Baghdad", countryTr: "Irak", countryEn: "Iraq", timeZone: "Asia/Baghdad", lat: 33.32, lon: 44.36, region: "middle-east", inTr: "Bağdat'ta", countryWide: true },
  { en: "tehran", tr: "tahran", nameTr: "Tahran", nameEn: "Tehran", countryTr: "İran", countryEn: "Iran", timeZone: "Asia/Tehran", lat: 35.69, lon: 51.39, region: "middle-east", inTr: "Tahran'da", countryWide: true },
  { en: "amman", tr: "amman", nameTr: "Amman", nameEn: "Amman", countryTr: "Ürdün", countryEn: "Jordan", timeZone: "Asia/Amman", lat: 31.95, lon: 35.93, region: "middle-east", inTr: "Amman'da", countryWide: true },
  { en: "beirut", tr: "beyrut", nameTr: "Beyrut", nameEn: "Beirut", countryTr: "Lübnan", countryEn: "Lebanon", timeZone: "Asia/Beirut", lat: 33.89, lon: 35.50, region: "middle-east", inTr: "Beyrut'ta", countryWide: true },
  { en: "cairo", tr: "kahire", nameTr: "Kahire", nameEn: "Cairo", countryTr: "Mısır", countryEn: "Egypt", timeZone: "Africa/Cairo", lat: 30.04, lon: 31.24, region: "africa", inTr: "Kahire'de", countryWide: true },
  { en: "tokyo", tr: "tokyo", nameTr: "Tokyo", nameEn: "Tokyo", countryTr: "Japonya", countryEn: "Japan", timeZone: "Asia/Tokyo", lat: 35.68, lon: 139.69, region: "asia", inTr: "Tokyo'da", countryWide: true },
  { en: "seoul", tr: "seul", nameTr: "Seul", nameEn: "Seoul", countryTr: "Güney Kore", countryEn: "South Korea", timeZone: "Asia/Seoul", lat: 37.57, lon: 126.98, region: "asia", inTr: "Seul'de", countryWide: true },
  { en: "beijing", tr: "pekin", nameTr: "Pekin", nameEn: "Beijing", countryTr: "Çin", countryEn: "China", timeZone: "Asia/Shanghai", lat: 39.90, lon: 116.41, region: "asia", inTr: "Pekin'de", countryWide: true },
  { en: "shanghai", tr: "sanghay", nameTr: "Şanghay", nameEn: "Shanghai", countryTr: "Çin", countryEn: "China", timeZone: "Asia/Shanghai", lat: 31.23, lon: 121.47, region: "asia", inTr: "Şanghay'da", countryWide: true },
  { en: "hong-kong", tr: "hong-kong", nameTr: "Hong Kong", nameEn: "Hong Kong", countryTr: "Hong Kong (Çin)", countryEn: "Hong Kong (China)", timeZone: "Asia/Hong_Kong", lat: 22.32, lon: 114.17, region: "asia", inTr: "Hong Kong'da", countryWide: true },
  { en: "singapore", tr: "singapur", nameTr: "Singapur", nameEn: "Singapore", countryTr: "Singapur", countryEn: "Singapore", timeZone: "Asia/Singapore", lat: 1.35, lon: 103.82, region: "asia", inTr: "Singapur'da", countryWide: true },
  { en: "bangkok", tr: "bangkok", nameTr: "Bangkok", nameEn: "Bangkok", countryTr: "Tayland", countryEn: "Thailand", timeZone: "Asia/Bangkok", lat: 13.76, lon: 100.50, region: "asia", inTr: "Bangkok'ta", countryWide: true },
  { en: "jakarta", tr: "cakarta", nameTr: "Cakarta", nameEn: "Jakarta", countryTr: "Endonezya", countryEn: "Indonesia", timeZone: "Asia/Jakarta", lat: -6.21, lon: 106.85, region: "asia", inTr: "Cakarta'da", countryWide: false },
  { en: "manila", tr: "manila", nameTr: "Manila", nameEn: "Manila", countryTr: "Filipinler", countryEn: "Philippines", timeZone: "Asia/Manila", lat: 14.60, lon: 120.98, region: "asia", inTr: "Manila'da", countryWide: true },
  { en: "kuala-lumpur", tr: "kuala-lumpur", nameTr: "Kuala Lumpur", nameEn: "Kuala Lumpur", countryTr: "Malezya", countryEn: "Malaysia", timeZone: "Asia/Kuala_Lumpur", lat: 3.14, lon: 101.69, region: "asia", inTr: "Kuala Lumpur'da", countryWide: true },
  { en: "new-delhi", tr: "yeni-delhi", nameTr: "Yeni Delhi", nameEn: "New Delhi", countryTr: "Hindistan", countryEn: "India", timeZone: "Asia/Kolkata", lat: 28.61, lon: 77.21, region: "asia", inTr: "Yeni Delhi'de", countryWide: true },
  { en: "mumbai", tr: "mumbai", nameTr: "Mumbai", nameEn: "Mumbai", countryTr: "Hindistan", countryEn: "India", timeZone: "Asia/Kolkata", lat: 19.08, lon: 72.88, region: "asia", inTr: "Mumbai'de", countryWide: true },
  { en: "karachi", tr: "karaci", nameTr: "Karaçi", nameEn: "Karachi", countryTr: "Pakistan", countryEn: "Pakistan", timeZone: "Asia/Karachi", lat: 24.86, lon: 67.01, region: "asia", inTr: "Karaçi'de", countryWide: true },
  { en: "islamabad", tr: "islamabad", nameTr: "İslamabad", nameEn: "Islamabad", countryTr: "Pakistan", countryEn: "Pakistan", timeZone: "Asia/Karachi", lat: 33.68, lon: 73.05, region: "asia", inTr: "İslamabad'da", countryWide: true },
  { en: "dhaka", tr: "dakka", nameTr: "Dakka", nameEn: "Dhaka", countryTr: "Bangladeş", countryEn: "Bangladesh", timeZone: "Asia/Dhaka", lat: 23.81, lon: 90.41, region: "asia", inTr: "Dakka'da", countryWide: true },
  { en: "kathmandu", tr: "katmandu", nameTr: "Katmandu", nameEn: "Kathmandu", countryTr: "Nepal", countryEn: "Nepal", timeZone: "Asia/Kathmandu", lat: 27.72, lon: 85.32, region: "asia", inTr: "Katmandu'da", countryWide: true },
  { en: "tashkent", tr: "taskent", nameTr: "Taşkent", nameEn: "Tashkent", countryTr: "Özbekistan", countryEn: "Uzbekistan", timeZone: "Asia/Tashkent", lat: 41.30, lon: 69.24, region: "asia", inTr: "Taşkent'te", countryWide: true },
  { en: "almaty", tr: "almati", nameTr: "Almatı", nameEn: "Almaty", countryTr: "Kazakistan", countryEn: "Kazakhstan", timeZone: "Asia/Almaty", lat: 43.24, lon: 76.95, region: "asia", inTr: "Almatı'da", countryWide: true },
  { en: "astana", tr: "astana", nameTr: "Astana", nameEn: "Astana", countryTr: "Kazakistan", countryEn: "Kazakhstan", timeZone: "Asia/Almaty", lat: 51.17, lon: 71.45, region: "asia", inTr: "Astana'da", countryWide: true },
  { en: "bishkek", tr: "biskek", nameTr: "Bişkek", nameEn: "Bishkek", countryTr: "Kırgızistan", countryEn: "Kyrgyzstan", timeZone: "Asia/Bishkek", lat: 42.87, lon: 74.59, region: "asia", inTr: "Bişkek'te", countryWide: true },
  { en: "ashgabat", tr: "askabat", nameTr: "Aşkabat", nameEn: "Ashgabat", countryTr: "Türkmenistan", countryEn: "Turkmenistan", timeZone: "Asia/Ashgabat", lat: 37.96, lon: 58.33, region: "asia", inTr: "Aşkabat'ta", countryWide: true },
  { en: "kabul", tr: "kabil", nameTr: "Kabil", nameEn: "Kabul", countryTr: "Afganistan", countryEn: "Afghanistan", timeZone: "Asia/Kabul", lat: 34.56, lon: 69.21, region: "asia", inTr: "Kabil'de", countryWide: true },
  { en: "taipei", tr: "taipei", nameTr: "Taipei", nameEn: "Taipei", countryTr: "Tayvan", countryEn: "Taiwan", timeZone: "Asia/Taipei", lat: 25.03, lon: 121.57, region: "asia", inTr: "Taipei'de", countryWide: true },
  { en: "sydney", tr: "sidney", nameTr: "Sidney", nameEn: "Sydney", countryTr: "Avustralya", countryEn: "Australia", timeZone: "Australia/Sydney", lat: -33.87, lon: 151.21, region: "oceania", inTr: "Sidney'de", countryWide: false },
  { en: "melbourne", tr: "melbourne", nameTr: "Melbourne", nameEn: "Melbourne", countryTr: "Avustralya", countryEn: "Australia", timeZone: "Australia/Melbourne", lat: -37.81, lon: 144.96, region: "oceania", inTr: "Melbourne'de", countryWide: false },
  { en: "perth", tr: "perth", nameTr: "Perth", nameEn: "Perth", countryTr: "Avustralya", countryEn: "Australia", timeZone: "Australia/Perth", lat: -31.95, lon: 115.86, region: "oceania", inTr: "Perth'te", countryWide: false },
  { en: "auckland", tr: "auckland", nameTr: "Auckland", nameEn: "Auckland", countryTr: "Yeni Zelanda", countryEn: "New Zealand", timeZone: "Pacific/Auckland", lat: -36.85, lon: 174.76, region: "oceania", inTr: "Auckland'da", countryWide: false },
  { en: "lagos", tr: "lagos", nameTr: "Lagos", nameEn: "Lagos", countryTr: "Nijerya", countryEn: "Nigeria", timeZone: "Africa/Lagos", lat: 6.52, lon: 3.38, region: "africa", inTr: "Lagos'ta", countryWide: true },
  { en: "nairobi", tr: "nairobi", nameTr: "Nairobi", nameEn: "Nairobi", countryTr: "Kenya", countryEn: "Kenya", timeZone: "Africa/Nairobi", lat: -1.29, lon: 36.82, region: "africa", inTr: "Nairobi'de", countryWide: true },
  { en: "johannesburg", tr: "johannesburg", nameTr: "Johannesburg", nameEn: "Johannesburg", countryTr: "Güney Afrika", countryEn: "South Africa", timeZone: "Africa/Johannesburg", lat: -26.20, lon: 28.05, region: "africa", inTr: "Johannesburg'da", countryWide: true },
  { en: "casablanca", tr: "kazablanka", nameTr: "Kazablanka", nameEn: "Casablanca", countryTr: "Fas", countryEn: "Morocco", timeZone: "Africa/Casablanca", lat: 33.57, lon: -7.59, region: "africa", inTr: "Kazablanka'da", countryWide: true },
  { en: "tunis", tr: "tunus", nameTr: "Tunus", nameEn: "Tunis", countryTr: "Tunus", countryEn: "Tunisia", timeZone: "Africa/Tunis", lat: 36.81, lon: 10.18, region: "africa", inTr: "Tunus'ta", countryWide: true },
  { en: "algiers", tr: "cezayir", nameTr: "Cezayir", nameEn: "Algiers", countryTr: "Cezayir", countryEn: "Algeria", timeZone: "Africa/Algiers", lat: 36.75, lon: 3.06, region: "africa", inTr: "Cezayir'de", countryWide: true },
  { en: "addis-ababa", tr: "addis-ababa", nameTr: "Addis Ababa", nameEn: "Addis Ababa", countryTr: "Etiyopya", countryEn: "Ethiopia", timeZone: "Africa/Addis_Ababa", lat: 9.03, lon: 38.74, region: "africa", inTr: "Addis Ababa'da", countryWide: true },
  { en: "new-york", tr: "new-york", nameTr: "New York", nameEn: "New York", countryTr: "ABD", countryEn: "United States", timeZone: "America/New_York", lat: 40.71, lon: -74.01, region: "americas", inTr: "New York'ta", countryWide: false },
  { en: "washington", tr: "washington", nameTr: "Washington", nameEn: "Washington, D.C.", countryTr: "ABD", countryEn: "United States", timeZone: "America/New_York", lat: 38.91, lon: -77.04, region: "americas", inTr: "Washington'da", countryWide: false },
  { en: "los-angeles", tr: "los-angeles", nameTr: "Los Angeles", nameEn: "Los Angeles", countryTr: "ABD", countryEn: "United States", timeZone: "America/Los_Angeles", lat: 34.05, lon: -118.24, region: "americas", inTr: "Los Angeles'ta", countryWide: false },
  { en: "chicago", tr: "sikago", nameTr: "Şikago", nameEn: "Chicago", countryTr: "ABD", countryEn: "United States", timeZone: "America/Chicago", lat: 41.88, lon: -87.63, region: "americas", inTr: "Şikago'da", countryWide: false },
  { en: "houston", tr: "houston", nameTr: "Houston", nameEn: "Houston", countryTr: "ABD", countryEn: "United States", timeZone: "America/Chicago", lat: 29.76, lon: -95.37, region: "americas", inTr: "Houston'da", countryWide: false },
  { en: "miami", tr: "miami", nameTr: "Miami", nameEn: "Miami", countryTr: "ABD", countryEn: "United States", timeZone: "America/New_York", lat: 25.76, lon: -80.19, region: "americas", inTr: "Miami'de", countryWide: false },
  { en: "san-francisco", tr: "san-francisco", nameTr: "San Francisco", nameEn: "San Francisco", countryTr: "ABD", countryEn: "United States", timeZone: "America/Los_Angeles", lat: 37.77, lon: -122.42, region: "americas", inTr: "San Francisco'da", countryWide: false },
  { en: "las-vegas", tr: "las-vegas", nameTr: "Las Vegas", nameEn: "Las Vegas", countryTr: "ABD", countryEn: "United States", timeZone: "America/Los_Angeles", lat: 36.17, lon: -115.14, region: "americas", inTr: "Las Vegas'ta", countryWide: false },
  { en: "toronto", tr: "toronto", nameTr: "Toronto", nameEn: "Toronto", countryTr: "Kanada", countryEn: "Canada", timeZone: "America/Toronto", lat: 43.65, lon: -79.38, region: "americas", inTr: "Toronto'da", countryWide: false },
  { en: "vancouver", tr: "vancouver", nameTr: "Vancouver", nameEn: "Vancouver", countryTr: "Kanada", countryEn: "Canada", timeZone: "America/Vancouver", lat: 49.28, lon: -123.12, region: "americas", inTr: "Vancouver'da", countryWide: false },
  { en: "montreal", tr: "montreal", nameTr: "Montreal", nameEn: "Montreal", countryTr: "Kanada", countryEn: "Canada", timeZone: "America/Toronto", lat: 45.50, lon: -73.57, region: "americas", inTr: "Montreal'de", countryWide: false },
  { en: "mexico-city", tr: "meksiko", nameTr: "Meksiko", nameEn: "Mexico City", countryTr: "Meksika", countryEn: "Mexico", timeZone: "America/Mexico_City", lat: 19.43, lon: -99.13, region: "americas", inTr: "Meksiko'da", countryWide: false },
  { en: "sao-paulo", tr: "sao-paulo", nameTr: "São Paulo", nameEn: "São Paulo", countryTr: "Brezilya", countryEn: "Brazil", timeZone: "America/Sao_Paulo", lat: -23.55, lon: -46.63, region: "americas", inTr: "São Paulo'da", countryWide: false },
  { en: "rio-de-janeiro", tr: "rio-de-janeiro", nameTr: "Rio de Janeiro", nameEn: "Rio de Janeiro", countryTr: "Brezilya", countryEn: "Brazil", timeZone: "America/Sao_Paulo", lat: -22.91, lon: -43.17, region: "americas", inTr: "Rio de Janeiro'da", countryWide: false },
  { en: "buenos-aires", tr: "buenos-aires", nameTr: "Buenos Aires", nameEn: "Buenos Aires", countryTr: "Arjantin", countryEn: "Argentina", timeZone: "America/Argentina/Buenos_Aires", lat: -34.60, lon: -58.38, region: "americas", inTr: "Buenos Aires'te", countryWide: true },
  { en: "santiago", tr: "santiago", nameTr: "Santiago", nameEn: "Santiago", countryTr: "Şili", countryEn: "Chile", timeZone: "America/Santiago", lat: -33.45, lon: -70.67, region: "americas", inTr: "Santiago'da", countryWide: false },
  { en: "lima", tr: "lima", nameTr: "Lima", nameEn: "Lima", countryTr: "Peru", countryEn: "Peru", timeZone: "America/Lima", lat: -12.05, lon: -77.04, region: "americas", inTr: "Lima'da", countryWide: true },
  { en: "bogota", tr: "bogota", nameTr: "Bogota", nameEn: "Bogotá", countryTr: "Kolombiya", countryEn: "Colombia", timeZone: "America/Bogota", lat: 4.71, lon: -74.07, region: "americas", inTr: "Bogota'da", countryWide: true },
  { en: "caracas", tr: "karakas", nameTr: "Karakas", nameEn: "Caracas", countryTr: "Venezuela", countryEn: "Venezuela", timeZone: "America/Caracas", lat: 10.48, lon: -66.90, region: "americas", inTr: "Karakas'ta", countryWide: true },
  { en: "havana", tr: "havana", nameTr: "Havana", nameEn: "Havana", countryTr: "Küba", countryEn: "Cuba", timeZone: "America/Havana", lat: 23.11, lon: -82.37, region: "americas", inTr: "Havana'da", countryWide: true },
  { en: "honolulu", tr: "honolulu", nameTr: "Honolulu", nameEn: "Honolulu", countryTr: "ABD (Hawaii)", countryEn: "United States (Hawaii)", timeZone: "Pacific/Honolulu", lat: 21.31, lon: -157.86, region: "oceania", inTr: "Honolulu'da", countryWide: false },
  { en: "anchorage", tr: "anchorage", nameTr: "Anchorage", nameEn: "Anchorage", countryTr: "ABD (Alaska)", countryEn: "United States (Alaska)", timeZone: "America/Anchorage", lat: 61.22, lon: -149.90, region: "americas", inTr: "Anchorage'da", countryWide: false },
];

export const worldRegions: WorldRegion[] = ["turkey", "europe", "middle-east", "asia", "africa", "americas", "oceania"];

export const regionNames: Record<WorldRegion, { tr: string; en: string }> = {
  turkey: { tr: "Türkiye", en: "Türkiye" },
  europe: { tr: "Avrupa", en: "Europe" },
  "middle-east": { tr: "Orta Doğu", en: "Middle East" },
  asia: { tr: "Asya", en: "Asia" },
  africa: { tr: "Afrika", en: "Africa" },
  americas: { tr: "Amerika", en: "Americas" },
  oceania: { tr: "Okyanusya ve Pasifik", en: "Oceania & Pacific" },
};

export function findCityByTrSlug(slug: string) {
  return worldCities.find((city) => city.tr === slug) ?? null;
}

export function findCityByEnSlug(slug: string) {
  return worldCities.find((city) => city.en === slug) ?? null;
}

/** Karsilastirma tablolarinda kullanilan buyuk sehirler. */
export const referenceCitySlugs = ["istanbul", "london", "new-york", "los-angeles", "dubai", "moscow", "tokyo", "sydney"];
