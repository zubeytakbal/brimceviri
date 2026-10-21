// Birden çok saat dilimi kullanan ülkelerin Türkçe saat sayfaları (/dunya-saatleri/<slug>).
// Her dilim bir IANA kimliğiyle temsil edilir; o anki fark ve yaz saati Intl ile hesaplanır, elle yazılmaz.
// sehirler: dilimin bilinen şehirleri (sitede sayfası olanlar otomatik bağlanır), bolgeler: eyalet/bölge adları.

export type UlkeDilimi = {
  ad: string;
  timeZone: string;
  sehirler: string[];
  bolgeler: string[];
  /** Dilime özgü kısa not (ör. "yaz saati uygulanmaz"). */
  not?: string;
};

export type UlkeSaatleri = {
  slug: string;
  /** Aramalarda kullanılan ad: "Amerika", "Rusya". */
  ad: string;
  /** Resmî/uzun ad: "Amerika Birleşik Devletleri". */
  tamAd: string;
  /** worldCities'teki countryTr değerleri: bu ülkenin şehir sayfaları ülke sayfasına bağlanır. */
  ulkeAdlari: string[];
  /** Kahraman alanındaki fotoğrafın şehri (sehirGorselleri anahtarı). */
  gorselSehir: string;
  bolgeEtiketi: string;
  dilimler: UlkeDilimi[];
  /** Saat düzenine dair istisnalar ve açıklamalar; sayfada paragraf olarak çıkar. */
  notlar: string[];
};

export const ulkeSaatleri: UlkeSaatleri[] = [
  {
    slug: "amerika",
    ad: "Amerika",
    tamAd: "Amerika Birleşik Devletleri",
    ulkeAdlari: ["ABD", "ABD (Hawaii)", "ABD (Alaska)"],
    gorselSehir: "new-york",
    bolgeEtiketi: "Eyaletler",
    dilimler: [
      {
        ad: "Doğu Saati (ET)",
        timeZone: "America/New_York",
        sehirler: ["New York", "Washington", "Miami", "Boston", "Atlanta"],
        bolgeler: ["New York", "Washington D.C.", "Florida (çoğu)", "Georgia", "Massachusetts", "Pensilvanya", "New Jersey", "Ohio", "Michigan (çoğu)", "Kuzey Karolina", "Güney Karolina", "Virginia", "Batı Virginia", "Maryland", "Delaware", "Connecticut", "Rhode Island", "Vermont", "New Hampshire", "Maine", "Indiana (çoğu)", "Kentucky (doğusu)", "Tennessee (doğusu)"],
      },
      {
        ad: "Merkez Saati (CT)",
        timeZone: "America/Chicago",
        sehirler: ["Şikago", "Houston", "Dallas", "New Orleans", "Minneapolis"],
        bolgeler: ["Illinois", "Teksas (çoğu)", "Louisiana", "Minnesota", "Wisconsin", "Iowa", "Missouri", "Arkansas", "Mississippi", "Alabama", "Oklahoma", "Kansas (çoğu)", "Nebraska (doğusu)", "Güney Dakota (doğusu)", "Kuzey Dakota (çoğu)", "Tennessee (batısı ve ortası)", "Kentucky (batısı)", "Florida (Panhandle'ın batısı)"],
      },
      {
        ad: "Dağ Saati (MT)",
        timeZone: "America/Denver",
        sehirler: ["Denver", "Salt Lake City", "Albuquerque", "El Paso"],
        bolgeler: ["Colorado", "Utah", "New Mexico", "Wyoming", "Montana", "Idaho (güneyi)", "Teksas (El Paso bölgesi)", "Kansas, Nebraska ve Dakotalar'ın batı ucu"],
      },
      {
        ad: "Arizona (MST)",
        timeZone: "America/Phoenix",
        sehirler: ["Phoenix", "Tucson"],
        bolgeler: ["Arizona (Navajo Ulusu hariç)"],
        not: "Yaz saati uygulanmaz: kışın Dağ, yazın Pasifik saatiyle aynıdır.",
      },
      {
        ad: "Pasifik Saati (PT)",
        timeZone: "America/Los_Angeles",
        sehirler: ["Los Angeles", "San Francisco", "Las Vegas", "Seattle", "San Diego"],
        bolgeler: ["Kaliforniya", "Washington eyaleti", "Oregon (çoğu)", "Nevada", "Idaho (kuzeyi)"],
      },
      {
        ad: "Alaska Saati (AKT)",
        timeZone: "America/Anchorage",
        sehirler: ["Anchorage", "Juneau", "Fairbanks"],
        bolgeler: ["Alaska (Aleut Adaları'nın batısı hariç)"],
      },
      {
        ad: "Hawaii Saati (HST)",
        timeZone: "Pacific/Honolulu",
        sehirler: ["Honolulu"],
        bolgeler: ["Hawaii"],
        not: "Yaz saati uygulanmaz.",
      },
    ],
    notlar: [
      "ABD'de yaz saati mart ayının ikinci pazar günü başlar, kasım ayının ilk pazar günü biter; değişiklik yerel saatle 02:00'de yapılır. Türkiye saat değiştirmediği için mart ayında ABD ile fark 1 saat azalır, kasımda yeniden 1 saat artar.",
      "Arizona (Navajo Ulusu hariç) ve Hawaii yaz saati uygulamaz. Bu yüzden Arizona yazın Pasifik, kışın Dağ saatiyle aynı saati gösterir.",
      "Bazı eyaletler iki saat dilimine bölünür: Teksas, Florida, Tennessee, Kentucky, Indiana, Michigan, Kansas, Nebraska, Güney ve Kuzey Dakota, Idaho ve Oregon'da eyaletin bir bölümü komşu dilimi kullanır.",
      "Porto Riko ve ABD Virjin Adaları Atlantik saatini (UTC−4), Guam ve Kuzey Mariana Adaları Chamorro saatini (UTC+10), Amerikan Samoası Samoa saatini (UTC−11) kullanır.",
    ],
  },
  {
    slug: "kanada",
    ad: "Kanada",
    tamAd: "Kanada",
    ulkeAdlari: ["Kanada"],
    gorselSehir: "toronto",
    bolgeEtiketi: "Eyalet ve bölgeler",
    dilimler: [
      {
        ad: "Newfoundland Saati (NT)",
        timeZone: "America/St_Johns",
        sehirler: ["St. John's"],
        bolgeler: ["Newfoundland adası", "Labrador'un güneydoğusu"],
        not: "Tam saat değil, yarım saat kaymalı bir dilim (UTC−3:30).",
      },
      {
        ad: "Atlantik Saati (AT)",
        timeZone: "America/Halifax",
        sehirler: ["Halifax", "Moncton", "Charlottetown"],
        bolgeler: ["Nova Scotia", "New Brunswick", "Prens Edward Adası", "Labrador (çoğu)"],
      },
      {
        ad: "Doğu Saati (ET)",
        timeZone: "America/Toronto",
        sehirler: ["Toronto", "Ottawa", "Montreal", "Quebec City"],
        bolgeler: ["Ontario (çoğu)", "Quebec (çoğu)", "Nunavut (doğusu)"],
      },
      {
        ad: "Merkez Saati (CT)",
        timeZone: "America/Winnipeg",
        sehirler: ["Winnipeg"],
        bolgeler: ["Manitoba", "Ontario'nun batı ucu", "Nunavut (ortası)"],
      },
      {
        ad: "Saskatchewan (CST)",
        timeZone: "America/Regina",
        sehirler: ["Regina", "Saskatoon"],
        bolgeler: ["Saskatchewan (çoğu)"],
        not: "Yaz saati uygulanmaz: yıl boyu UTC−6.",
      },
      {
        ad: "Dağ Saati (MT)",
        timeZone: "America/Edmonton",
        sehirler: ["Calgary", "Edmonton", "Yellowknife"],
        bolgeler: ["Alberta", "Kuzeybatı Toprakları", "Nunavut (batısı)", "British Columbia'nın doğu ucu"],
      },
      {
        ad: "Yukon (MST)",
        timeZone: "America/Whitehorse",
        sehirler: ["Whitehorse"],
        bolgeler: ["Yukon"],
        not: "2020'den beri saat değiştirilmez: yıl boyu UTC−7.",
      },
      {
        ad: "Pasifik Saati (PT)",
        timeZone: "America/Vancouver",
        sehirler: ["Vancouver", "Victoria", "Kelowna"],
        bolgeler: ["British Columbia (çoğu)"],
      },
    ],
    notlar: [
      "Kanada'da yaz saati ABD ile aynı günlerde değişir: mart ayının ikinci pazarı başlar, kasım ayının ilk pazarı biter.",
      "Saskatchewan'ın büyük bölümü ve Yukon saat değiştirmez. Newfoundland, dünyada yarım saat kaymalı dilim kullanan az sayıdaki yerden biridir.",
      "Toronto, Ottawa ve Montreal aynı saati gösterir; Vancouver bu şehirlerden 3 saat geridedir.",
    ],
  },
  {
    slug: "rusya",
    ad: "Rusya",
    tamAd: "Rusya Federasyonu",
    ulkeAdlari: ["Rusya"],
    gorselSehir: "moskova",
    bolgeEtiketi: "Bölgeler",
    dilimler: [
      { ad: "Kaliningrad Saati (MSK−1)", timeZone: "Europe/Kaliningrad", sehirler: ["Kaliningrad"], bolgeler: ["Kaliningrad Oblastı"] },
      {
        ad: "Moskova Saati (MSK)",
        timeZone: "Europe/Moscow",
        sehirler: ["Moskova", "St. Petersburg", "Kazan", "Soçi", "Nijni Novgorod", "Volgograd"],
        bolgeler: ["Avrupa Rusyası'nın çoğu", "Tataristan", "Krasnodar", "Rostov", "Volgograd"],
      },
      { ad: "Samara Saati (MSK+1)", timeZone: "Europe/Samara", sehirler: ["Samara", "İjevsk", "Saratov", "Astrahan", "Ulyanovsk"], bolgeler: ["Samara", "Udmurtya", "Saratov", "Astrahan", "Ulyanovsk"] },
      {
        ad: "Yekaterinburg Saati (MSK+2)",
        timeZone: "Asia/Yekaterinburg",
        sehirler: ["Yekaterinburg", "Çelyabinsk", "Ufa", "Perm", "Tümen"],
        bolgeler: ["Sverdlovsk", "Çelyabinsk", "Başkurdistan", "Perm", "Tümen", "Hantı-Mansi"],
      },
      { ad: "Omsk Saati (MSK+3)", timeZone: "Asia/Omsk", sehirler: ["Omsk"], bolgeler: ["Omsk Oblastı"] },
      {
        ad: "Krasnoyarsk Saati (MSK+4)",
        timeZone: "Asia/Krasnoyarsk",
        sehirler: ["Novosibirsk", "Krasnoyarsk", "Tomsk", "Kemerovo", "Barnaul"],
        bolgeler: ["Novosibirsk", "Krasnoyarsk", "Tomsk", "Kemerovo", "Altay", "Tıva", "Hakasya"],
      },
      { ad: "İrkutsk Saati (MSK+5)", timeZone: "Asia/Irkutsk", sehirler: ["İrkutsk", "Ulan-Ude"], bolgeler: ["İrkutsk", "Buryatya"] },
      { ad: "Yakutsk Saati (MSK+6)", timeZone: "Asia/Yakutsk", sehirler: ["Yakutsk", "Çita", "Blagoveşçensk"], bolgeler: ["Yakutistan'ın batısı", "Zabaykalsky", "Amur"] },
      { ad: "Vladivostok Saati (MSK+7)", timeZone: "Asia/Vladivostok", sehirler: ["Vladivostok", "Habarovsk"], bolgeler: ["Primorye", "Habarovsk", "Yahudi Özerk Bölgesi"] },
      { ad: "Magadan Saati (MSK+8)", timeZone: "Asia/Magadan", sehirler: ["Magadan", "Yujno-Sahalinsk"], bolgeler: ["Magadan", "Sahalin", "Yakutistan'ın doğusu"] },
      { ad: "Kamçatka Saati (MSK+9)", timeZone: "Asia/Kamchatka", sehirler: ["Petropavlovsk-Kamçatski", "Anadır"], bolgeler: ["Kamçatka", "Çukotka"] },
    ],
    notlar: [
      "Rusya 11 saat dilimiyle dünyada en çok saat dilimi kullanan tek parça ülkedir: Kaliningrad ile Kamçatka arasında 10 saat fark vardır.",
      "Rusya 2014'ten beri yaz saati uygulamaz; saatler yıl boyu sabittir. Bu yüzden Türkiye ile farklar da yıl boyu değişmez.",
      "Moskova saati Türkiye saatiyle aynıdır (UTC+3). Ülke içinde saatler genellikle Moskova'ya göre söylenir: \"MSK+4\" Moskova'dan 4 saat ileri demektir.",
    ],
  },
  {
    slug: "avustralya",
    ad: "Avustralya",
    tamAd: "Avustralya",
    ulkeAdlari: ["Avustralya"],
    gorselSehir: "sidney",
    bolgeEtiketi: "Eyalet ve bölgeler",
    dilimler: [
      { ad: "Batı Avustralya (AWST)", timeZone: "Australia/Perth", sehirler: ["Perth"], bolgeler: ["Batı Avustralya"], not: "Yaz saati uygulanmaz." },
      { ad: "Kuzey Toprakları (ACST)", timeZone: "Australia/Darwin", sehirler: ["Darwin", "Alice Springs"], bolgeler: ["Kuzey Toprakları"], not: "Yaz saati uygulanmaz; yıl boyu UTC+9:30." },
      { ad: "Güney Avustralya (ACST/ACDT)", timeZone: "Australia/Adelaide", sehirler: ["Adelaide"], bolgeler: ["Güney Avustralya", "Broken Hill (Yeni Güney Galler)"] },
      { ad: "Queensland (AEST)", timeZone: "Australia/Brisbane", sehirler: ["Brisbane", "Gold Coast", "Cairns"], bolgeler: ["Queensland"], not: "Yaz saati uygulanmaz." },
      {
        ad: "Doğu Avustralya (AEST/AEDT)",
        timeZone: "Australia/Sydney",
        sehirler: ["Sidney", "Melbourne", "Kanberra", "Hobart"],
        bolgeler: ["Yeni Güney Galler", "Victoria", "Avustralya Başkent Bölgesi", "Tazmanya"],
      },
    ],
    notlar: [
      "Avustralya güney yarım kürede olduğu için yaz saati ekim ayının ilk pazar günü başlar, nisan ayının ilk pazar günü biter; yani Türkiye'nin kışı Avustralya'nın yazıdır.",
      "Queensland, Kuzey Toprakları ve Batı Avustralya yaz saati uygulamaz. Bu yüzden yaz aylarında (ekim-nisan) ülkede beş ayrı saat görülür; kışın üç.",
      "Lord Howe Adası yarım saatlik yaz saati uygular (UTC+10:30 / +11); batıdaki küçük Eucla bölgesi resmî olmayan UTC+8:45 saatini kullanır.",
    ],
  },
  {
    slug: "brezilya",
    ad: "Brezilya",
    tamAd: "Brezilya Federatif Cumhuriyeti",
    ulkeAdlari: ["Brezilya"],
    gorselSehir: "rio-de-janeiro",
    bolgeEtiketi: "Eyaletler",
    dilimler: [
      { ad: "Fernando de Noronha (UTC−2)", timeZone: "America/Noronha", sehirler: ["Fernando de Noronha"], bolgeler: ["Atlantik'teki adalar"] },
      {
        ad: "Brasília Saati (BRT)",
        timeZone: "America/Sao_Paulo",
        sehirler: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belém"],
        bolgeler: ["Güney ve Güneydoğu eyaletleri", "Kuzeydoğu eyaletleri", "Federal Bölge", "Goiás", "Tocantins", "Pará", "Amapá"],
      },
      {
        ad: "Amazon Saati (AMT)",
        timeZone: "America/Manaus",
        sehirler: ["Manaus", "Cuiabá", "Campo Grande", "Porto Velho", "Boa Vista"],
        bolgeler: ["Amazonas (çoğu)", "Mato Grosso", "Mato Grosso do Sul", "Rondônia", "Roraima"],
      },
      { ad: "Acre Saati (ACT)", timeZone: "America/Rio_Branco", sehirler: ["Rio Branco"], bolgeler: ["Acre", "Amazonas'ın güneybatısı"] },
    ],
    notlar: [
      "Brezilya 2019'dan beri yaz saati uygulamaz; dört saat diliminin hepsi yıl boyu sabittir.",
      "Nüfusun büyük çoğunluğu Brasília saatini kullanır: São Paulo, Rio de Janeiro ve başkent Brasília aynı saati gösterir.",
    ],
  },
  {
    slug: "meksika",
    ad: "Meksika",
    tamAd: "Meksika Birleşik Devletleri",
    ulkeAdlari: ["Meksika"],
    gorselSehir: "meksiko",
    bolgeEtiketi: "Eyaletler",
    dilimler: [
      { ad: "Güneydoğu Saati (EST)", timeZone: "America/Cancun", sehirler: ["Cancún", "Playa del Carmen"], bolgeler: ["Quintana Roo"] },
      {
        ad: "Merkez Saati (CST)",
        timeZone: "America/Mexico_City",
        sehirler: ["Meksiko", "Guadalajara", "Monterrey", "Puebla"],
        bolgeler: ["Eyaletlerin büyük çoğunluğu", "Meksiko (CDMX)", "Jalisco", "Nuevo León", "Yucatán"],
      },
      {
        ad: "Pasifik Saati (MST)",
        timeZone: "America/Mazatlan",
        sehirler: ["Mazatlán", "Hermosillo", "La Paz (BCS)"],
        bolgeler: ["Sinaloa", "Sonora", "Baja California Sur", "Nayarit (çoğu)"],
      },
      { ad: "Kuzeybatı Saati (PST)", timeZone: "America/Tijuana", sehirler: ["Tijuana", "Mexicali", "Ensenada"], bolgeler: ["Baja California"], not: "ABD ile birlikte yaz saati uygular." },
    ],
    notlar: [
      "Meksika 2022'de yaz saatini kaldırdı; ülkenin büyük bölümünde saat yıl boyu sabittir.",
      "ABD sınırındaki Baja California ile Ciudad Juárez, Matamoros gibi bazı sınır şehirleri komşu ABD şehirleriyle uyum için yaz saati uygulamaya devam eder.",
    ],
  },
  {
    slug: "endonezya",
    ad: "Endonezya",
    tamAd: "Endonezya Cumhuriyeti",
    ulkeAdlari: ["Endonezya"],
    gorselSehir: "cakarta",
    bolgeEtiketi: "Adalar ve bölgeler",
    dilimler: [
      { ad: "Batı Endonezya Saati (WIB)", timeZone: "Asia/Jakarta", sehirler: ["Cakarta", "Surabaya", "Bandung", "Medan"], bolgeler: ["Sumatra", "Cava", "Batı ve Orta Kalimantan"] },
      { ad: "Orta Endonezya Saati (WITA)", timeZone: "Asia/Makassar", sehirler: ["Denpasar (Bali)", "Makassar", "Mataram (Lombok)"], bolgeler: ["Bali", "Nusa Tenggara", "Sulawesi", "Güney, Doğu ve Kuzey Kalimantan"] },
      { ad: "Doğu Endonezya Saati (WIT)", timeZone: "Asia/Jayapura", sehirler: ["Jayapura", "Ambon"], bolgeler: ["Maluku", "Papua"] },
    ],
    notlar: [
      "Endonezya yaz saati uygulamaz; üç saat dilimi yıl boyu sabittir.",
      "Bali, Cakarta'dan 1 saat ileridedir: Bali'ye giden yolcular WITA saatini kullanır.",
    ],
  },
];

export function ulkeSaatleriBul(slug: string) {
  return ulkeSaatleri.find((u) => u.slug === slug) ?? null;
}

/** Şehrin ülkesinin (birden çok saat dilimli) ülke sayfası. */
export function sehrinUlkeSayfasi(countryTr: string) {
  return ulkeSaatleri.find((u) => u.ulkeAdlari.includes(countryTr)) ?? null;
}
