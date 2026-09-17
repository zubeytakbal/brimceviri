import type { SiteIconName } from "../../components/siteIcons";

type UzbekStaticCard = readonly [
  id: string,
  title: string,
  iconName: SiteIconName,
  href?: string,
];

export type UzbekStaticCardGroup = {
  id?: string;
  title: string;
  cards: readonly UzbekStaticCard[];
};

// Bu katalog faqat kategori indeksidagi kartalar içindir. Kartlar sayfaya
// bağlanmaz; ilgili araçlar Özbekistan için ayrı araştırılıp eklenecektir.
export const uzbekStaticCardGroups: readonly UzbekStaticCardGroup[] = [
  {
    title: "Muhandislik hisoblagichlari",
    cards: [
      ["muhendislik-basinc-kuvvet-alan", "Bosim, kuch va yuza", "pressureForceArea", "/uz/bosim-kuch-maydon-hisoblash"],
      ["muhendislik-hidrostatik-basinc", "Gidrostatik bosim", "hydrostaticPressure", "/uz/gidrostatik-bosim-hisoblash"],
      ["muhendislik-isi-enerjisi", "Issiqlik energiyasi", "energy", "/uz/issiqlik-energiyasi-hisoblash"],
      ["muhendislik-isi-iletimi", "Issiqlik o‘tkazilishi", "temperature", "/uz/issiqlik-otkazuvchanligi-hisoblash"],
      ["muhendislik-reynolds-sayisi", "Reynolds soni", "speed", "/uz/reynolds-soni-hisoblash"],
      ["muhendislik-ohm-yasasi", "Om qonuni", "resistance", "/uz/om-qonuni-hisoblash"],
      ["muhendislik-kw-amper", "kVt dan Amperga aylantirish", "energy", "/uz/kvt-dan-amperga-aylantirgich"],
      ["muhendislik-amper-kw", "Amperdan kVt ga aylantirish", "energy", "/uz/amperdan-kvt-ga-aylantirgich"],
      ["muhendislik-merkezi", "Boshqa muhandislik hisoblagichlari", "materialsHubCalculator", "/uz/muhandislik-hisoblagichlari"],
    ],
  },
  {
    title: "Tejamkorlik va qaror qabul qilish kalkulyatorlari",
    cards: [
      ["elektrikli-arac-karsilastirma", "Elektr avtomobilmi yoki benzinli avtomobilmi?", "evVsIceComparisonCalculator", "/uz/elektromobil-benzinli-solishtirish"],
      ["lpg-donusum-amortisman", "LPG o‘rnatish xarajati qoplanishini hisoblash", "lpgConversionPaybackCalculator", "/uz/lpg-ornatish-qoplanishi-hisoblash"],
      ["yalitim-amortisman", "Issiqlik izolyatsiyasi qoplanishini hisoblash", "insulationPaybackCalculator", "/uz/izolyatsiya-qoplanishi-hisoblash"],
      ["led-tasarruf", "LED chiroq tejamkorligini hisoblash", "ledSavingsCalculator", "/uz/led-tejamkorligi-hisoblash"],
      ["kombi-klima-karsilastirma", "Qozonmi yoki konditsionermi?", "heatingCostComparisonCalculator", "/uz/qozon-konditsioner-solishtirish"],
      ["isi-pompasi-kombi-karsilastirma", "Issiqlik nasosimi yoki qozonmi?", "heatPumpVsBoilerCalculator", "/uz/issiqlik-nasosi-qozon-solishtirish"],
      ["uzaktan-calisma-ofis-karsilastirma", "Masofadan ishlashmi yoki ofismi?", "remoteWorkVsOfficeCostCalculator", "/uz/masofadan-ish-ofis-solishtirish"],
      ["gunes-paneli-amortisman", "Quyosh paneli qoplanishini hisoblash", "solarPanelPaybackCalculator", "/uz/quyosh-paneli-qoplanishi-hisoblash"],
      ["doviz-cevirici", "Valyuta konvertori", "currencyConverterCalculator", "/uz/valyuta-aylantirgich"],
    ],
  },
  {
    title: "Uy, energiya va transport kalkulyatorlari",
    cards: [
      ["ehliyet-sinifi-bulma", "Qaysi haydovchilik guvohnomasi toifasi kerak?", "licenseClassFinderCalculator", "/uz/haydovchilik-toifasi-topish"],
      ["ehliyet-yenileme-suresi-hesaplama", "Haydovchilik guvohnomasini yangilash muddatini hisoblash", "licenseRenewalCalculator", "/uz/haydovchilik-guvohnomasi-yangilash-muddati-hisoblash"],
      ["yakit-tuketimi", "Yoqilg‘i sarfini hisoblash", "fuelConsumptionCalculator", "/uz/yoqilgi-sarfi-hisoblash"],
      ["tasinma-kutusu", "Ko‘chish qutilari sonini hisoblash", "movingBoxCalculator", "/uz/kochish-qutisi-hisoblash"],
      ["dogalgaz-tuketimi", "Tabiiy gaz sarfini hisoblash", "naturalGasCalculator", "/uz/tabiiy-gaz-sarfi-hisoblash"],
      ["elektrikli-arac-sarj", "Elektr avtomobilni zaryadlashni hisoblash", "evChargingCalculator", "/uz/elektromobil-zaryadlash-hisoblash"],
      ["klima-btu", "Konditsioner BTU quvvatini hisoblash", "acCapacityCalculator", "/uz/klima-btu-hisoblash"],
      ["elektrik-tuketimi", "Elektr energiyasi sarfini hisoblash", "electricityConsumptionCalculator", "/uz/elektr-tuketimi-hisoblash"],
      ["cbm", "CBM va hajmiy og‘irlikni hisoblash", "cbmCalculator", "/uz/cbm-hisoblash"],
      ["seyahat-priz-voltaj", "Sayohat rozetkasi va kuchlanish mosligini hisoblash", "travelPlugVoltageCalculator", "/uz/sayohat-rozetka-voltaj-hisoblash"],
    ],
  },
  {
    title: "Muhandislik ma’lumotnoma vositalari",
    cards: [
      ["malzeme-ozellikleri", "Material xususiyatlari", "materialsHubCalculator", "/uz/material-xossalari"],
      ["hafriyat", "Qazish va tuproq ishlari hisoblash", "excavationCalculator", "/uz/hafriyat-hisoblash"],
      ["boru-capi", "Quvur diametri, sarf va oqim tezligini hisoblash", "pipeFlowCalculator", "/uz/quvur-diametri-sarfi-hisoblash"],
      ["basinc-kaybi", "Bosim yo‘qotilishini hisoblash", "pressureLossCalculator", "/uz/bosim-yoqotilishi-hisoblash"],
      ["kaynak-amperaji", "Payvandlash tok kuchini hisoblash", "weldingCurrentCalculator", "/uz/payvandlash-amperaji-hisoblash"],
      ["kaynak-isi-girdisi", "Payvandlash issiqlik kiritishini hisoblash", "heatInputCalculator", "/uz/payvandlash-issiqlik-kiritishi-hisoblash"],
      ["kesme-hizi-devir", "Kesish tezligi va aylanishlar sonini hisoblash", "cuttingSpeedCalculator", "/uz/kesish-tezligi-aylanish-hisoblash"],
      ["superheat-subcooling", "Superheat va subcooling hisoblash", "superheatSubcoolingCalculator", "/uz/superheat-subcooling-hisoblash"],
      ["anten-uzunlugu", "Antenna uzunligini hisoblash", "antennaCalculator", "/uz/anten-uzunligi-hisoblash"],
      ["malzeme-agirligi", "Material og‘irligi va zichligi", "materialWeightCalculator", "/uz/material-ogirligi-hisoblash"],
      ["awg-mm2", "AWG – mm² konvertori", "awgConverter", "/uz/awg-mm2-aylantirgich"],
      ["isil-genlesme", "Issiqlik kengayishini hisoblash", "thermalExpansionCalculator", "/uz/issiqlik-kengayishi-hisoblash"],
      ["elastik-uzama", "Elastik cho‘zilishni hisoblash", "elongationCalculator", "/uz/elastik-chozilish-hisoblash"],
      ["civata-torku", "Bolt momentini hisoblash", "boltTorqueCalculator", "/uz/bolt-torki-hisoblash"],
      ["erime-kaynama-noktasi", "Elementlarning erish va qaynash nuqtasi konvertori", "elementMeltingBoilingCalculator", "/uz/erish-qaynash-nuqtasi-aylantirgich"],
      ["sertlik-donusum", "Qattiqlik birliklarini aylantirish", "hardnessConversionCalculator", "/uz/qattiqlik-aylantirish-hisoblash"],
      ["boru-capi-donusum", "Quvur nominal diametrini aylantirish", "pipeNominalSizeCalculator", "/uz/quvur-diametri-aylantirish-hisoblash"],
    ],
  },
  {
    title: "Qurilish va qurilish materiallari kalkulyatorlari",
    cards: [
      ["mantolama", "Issiqlik izolyatsiyasini hisoblash", "insulationCalculator", "/uz/mantolama-hisoblash"],
      ["boya", "Bo‘yoq miqdorini hisoblash", "paintCalculator", "/uz/boya-hisoblash"],
      ["fayans", "Plitka miqdorini hisoblash", "tileCalculator", "/uz/fayans-hisoblash"],
      ["tugla", "G‘isht miqdorini hisoblash", "brickCalculator", "/uz/gisht-hisoblash"],
      ["beton", "Beton hajmini hisoblash", "concreteCalculator", "/uz/beton-hisoblash"],
      ["siva", "Suvoq miqdorini hisoblash", "plasterCalculator", "/uz/suvoq-hisoblash"],
      ["merdiven", "Zina o‘lchamlarini hisoblash", "stairCalculator", "/uz/zinapoya-hisoblash"],
      ["parke", "Laminat qoplama miqdorini hisoblash", "laminateCalculator", "/uz/laminat-hisoblash"],
      ["duvar-kagidi", "Devor qog‘ozi miqdorini hisoblash", "wallpaperCalculator", "/uz/devor-qogozi-hisoblash"],
      ["emsal-kaks", "Qurilish koeffitsiyentini hisoblash", "zoningCalculator", "/uz/qurilish-zichligi-koeffitsiyenti-hisoblash"],
      ["kereste", "Yog‘och kub metrini hisoblash", "keresteCalculator", "/uz/yogoch-hajmi-hisoblash"],
      ["beton-markasi-sinfi", "Beton markasi va sinfini aylantirish", "concreteMarkaClassCalculator", "/uz/beton-markasi-sinfi-aylantirgich"],
    ],
  },
  {
    title: "Tibbiy baholash vositalari",
    cards: [
      ["vucut-yuzey-alani", "Tana yuzasi maydonini hisoblash", "bsaCalculator", "/uz/tana-yuzasi-maydoni-hisoblash"],
      ["kreatinin-klirensi", "Kreatinin klirensini hisoblash", "creatinineClearanceCalculator", "/uz/kreatinin-klirensi-hisoblash"],
      ["iv-damla-hizi", "IV tomchi tezligini hisoblash", "ivDripRateCalculator", "/uz/iv-tomchi-tezligi-hisoblash"],
      ["gks", "Glazgo koma shkalasini hisoblash", "gcsCalculator", "/uz/glazgo-koma-shkalasi-hisoblash"],
      ["apgar", "APGAR ballini hisoblash", "apgarCalculator", "/uz/apgar-balli-hisoblash"],
      ["cha2ds2", "CHA2DS2-VASc ballini hisoblash", "cha2ds2Calculator", "/uz/cha2ds2-vasc-balli-hisoblash"],
      ["wells", "Wells ballini hisoblash", "wellsScoreCalculator", "/uz/wells-balli-hisoblash"],
      ["qsofa", "qSOFA hisoblash", "qsofaCalculator", "/uz/qsofa-hisoblash"],
      ["sofa", "SOFA hisoblash", "sofaCalculator", "/uz/sofa-balli-hisoblash"],
      ["meld", "MELD hisoblash", "meldCalculator", "/uz/meld-balli-hisoblash"],
      ["morse", "Morse yiqilish shkalasini hisoblash", "morseFallScaleCalculator", "/uz/morse-yiqilish-shkalasi-hisoblash"],
      ["braden", "Braden shkalasini hisoblash", "bradenScaleCalculator", "/uz/braden-shkalasi-hisoblash"],
    ],
  },
  {
    title: "Aviatsiya kalkulyatorlari",
    cards: [
      ["seyir-suresi", "Parvoz vaqtini hisoblash", "transitTimeCalculator", "/uz/seyr-vaqti-hisoblash"],
      ["yogunluk-irtifasi", "Zichlik balandligini hisoblash", "densityAltitudeCalculator", "/uz/zichlik-balandligi-hisoblash"],
      ["yan-ruzgar", "Yon shamol komponentini hisoblash", "crosswindCalculator", "/uz/yon-shamol-hisoblash"],
      ["inis-orani", "Pasayish tezligini hisoblash", "descentRateCalculator", "/uz/pasayish-tezligi-hisoblash"],
      ["agirlik-denge", "Og‘irlik va muvozanatni hisoblash", "weightBalanceCalculator", "/uz/ogirlik-muvozanat-hisoblash"],
      ["buyuk-daire", "Katta doira masofasini hisoblash", "greatCircleCalculator", "/uz/katta-doira-masofasi-hisoblash"],
    ],
  },
  {
    title: "Sog‘liq va fitnes kalkulyatorlari",
    cards: [
      ["vucut-yag-orani", "Tana yog‘i foizini hisoblash", "bodyFatCalculator", "/uz/tana-yogi-foizi-hisoblash"],
      ["ideal-kilo", "Ideal vaznni hisoblash", "idealWeightCalculator", "/uz/ideal-vazn-hisoblash"],
      ["bmi", "BMI hisoblash", "bmiCalculator", "/uz/bmi-hisoblash"],
      ["gebelik", "Homiladorlik haftasini hisoblash", "pregnancyCalculator", "/uz/homiladorlik-haftasi-hisoblash"],
      ["uyku", "Uyqu vaqtini hisoblash", "sleepCalculator", "/uz/uyqu-hisoblash"],
      ["1rm", "1RM hisoblash", "oneRepMaxCalculator", "/uz/1rm-hisoblash"],
      ["kosu-pace", "Yugurish tempini hisoblash", "paceCalculator", "/uz/yugurish-tempi-hisoblash"],
    ],
  },
  {
    title: "Qishloq xo‘jaligi va veterinariya kalkulyatorlari",
    cards: [
      ["gubre-ihtiyaci", "O‘g‘it ehtiyojini hisoblash", "fertilizerCalculator", "/uz/ogit-ehtiyoji-hisoblash"],
      ["gubre-seyreltme", "O‘g‘it suyultirishni hisoblash", "fertilizerDilutionCalculator", "/uz/ogit-suyultirish-hisoblash"],
      ["tohum-miktari", "Urug‘ miqdorini hisoblash", "seedRateCalculator", "/uz/urugi-miqdori-hisoblash"],
      ["sulama-suresi", "Sug‘orish vaqtini hisoblash", "irrigationCalculator", "/uz/sugorish-vaqti-hisoblash"],
      ["veteriner-doz", "Veterinariya dori dozasi va hajmini hisoblash", "vetDoseCalculator", "/uz/veterinar-dori-dozasi-hisoblash"],
    ],
  },
  {
    title: "Bar va oshxona kalkulyatorlari",
    cards: [
      ["alkol-seyreltme", "Alkogol suyultirishni hisoblash", "alcoholDilutionCalculator", "/uz/alkogol-suyultirish-hisoblash"],
      ["kokteyl-olcusu", "Kokteyl hajmi konvertori", "barVolumeCalculator", "/uz/kokteyl-olchovi-aylantirgich"],
      ["abv-standart-icki", "ABV va standart ichimlikni hisoblash", "abvCalculator", "/uz/abv-standart-ichimlik-hisoblash"],
    ],
  },
  {
    title: "Hovuz va suv tizimlari",
    cards: [
      ["havuz-hacmi", "Hovuz hajmini hisoblash", "poolVolumeCalculator", "/uz/hovuz-hajmi-hisoblash"],
      ["klor-dozaji", "Xlor dozasini hisoblash", "chlorineDoseCalculator", "/uz/xlor-dozasi-hisoblash"],
    ],
  },
  {
    title: "Fotografiya kalkulyatorlari",
    cards: [
      ["pozlama-esdegeri", "Ekspozitsiya ekvivalentini hisoblash", "exposureCalculator", "/uz/pozlama-esdegeri-hisoblash"],
      ["odak-uzakligi-esdegeri", "Fokus masofasi ekvivalentini hisoblash", "focalLengthCalculator", "/uz/odak-uzunligi-esdegeri-hisoblash"],
    ],
  },
  {
    title: "Elektronika, dasturlash va media vositalari",
    cards: [
      ["unix-zaman-damgasi", "Unix vaqt tamg‘asi konvertori", "unixTimestampCalculator", "/uz/unix-vaqt-tamgasi-aylantirgich"],
      ["renk-kodu", "Rang kodi konvertori", "colorCodeCalculator", "/uz/rang-kodi-aylantirgich"],
      ["piksel-cm-dpi", "Piksel, sm va DPI hisoblash", "pixelCalculator", "/uz/piksel-sm-dpi-hisoblash"],
      ["bpm-ms", "BPM – ms hisoblash", "bpmCalculator", "/uz/bpm-ms-hisoblash"],
      ["psu-guc", "PSU quvvat manbasini hisoblash", "psuCalculator", "/uz/psu-quvvat-hisoblash"],
      ["video-bit-hizi", "Video bit tezligi va fayl hajmini hisoblash", "videoBitrateCalculator", "/uz/video-bit-tezligi-hisoblash"],
      ["sosyal-medya-gorsel-boyutlari", "Ijtimoiy media tasvir o‘lchamlari", "socialMediaSizeCalculator", "/uz/ijtimoiy-media-tasvir-olchamlari-hisoblash"],
      ["ping-gecikme-hesaplama", "Ping va kechikishni hisoblash", "theoreticalLatencyCalculator", "/uz/ping-kechikish-hisoblash"],
    ],
  },
  {
    title: "Moliya, ta’lim va kundalik hayot vositalari",
    cards: [
      ["has-hesaplama", "Sof oltin va kumushni hisoblash", "hasCalculator", "/uz/sof-oltin-hisoblash"],
      ["emlak-komisyonu", "Ko‘chmas mulk komissiyasini hisoblash", "commissionCalculator", "/uz/kochmas-mulk-komissiyasi-hisoblash"],
      ["amortisman", "Amortizatsiyani hisoblash", "amortismanCalculator", "/uz/amortizatsiya-hisoblash"],
      ["devamsizlik", "Davomatni hisoblash", "attendanceCalculator", "/uz/davomat-hisoblash"],
      ["yas", "Yoshni hisoblash", "dateCalculator", "/uz/yosh-hisoblash"],
      ["kdv", "QQS hisoblash", "vatCalculator", "/uz/qqs-hisoblash"],
      ["harf-notu", "Harf bahosini hisoblash", "letterGradeCalculator", "/uz/harf-bahosi-hisoblash"],
      ["reklam-metrikleri", "Reklama metrikalarini hisoblash", "adMetricsCalculator", "/uz/reklama-korsatkichlari-hisoblash"],
      ["raqamni-sozga", "Raqamni so'zga aylantirish", "numberToWordsCalculator", "/uz/raqamni-sozga-aylantirish"],
      ["ielts-cefr", "IELTS - CEFR darajasini aylantirish", "ieltsCefrCalculator", "/uz/ielts-cefr-aylantirgich"],
      ["hijriy-milodiy", "Hijriy-milodiy sana aylantirgich", "hijriCalendarCalculator", "/uz/hijriy-milodiy-sana-aylantirgich"],
      ["ish-haqi-kalkulyatori", "Yalpi va sof ish haqini hisoblash", "salaryCalculator", "/uz/ish-haqi-kalkulyatori"],
    ],
  },
  {
    title: "O‘lchov konvertorlari va taqqoslashlar",
    cards: [
      ["yuzuk", "Uzuk o‘lchami konvertori", "ringSize", "/uz/uzuk-olcami-aylantirgich"],
      ["lastik-ebati", "Shina o‘lchamini hisoblash", "tireSizeCalculator", "/uz/shina-olchami-hisoblash"],
      ["beden-olcusu", "Kiyim o‘lchami konvertori", "clothingSizeCalculator", "/uz/kiyim-olchami-aylantirgich"],
      ["birim-felaketleri", "Birlik aylantirishdagi xatolar", "unitDisaster", "/uz/birlik-aylantirish-fojialari"],
      ["uzunluk-karsilastirma", "Uzunliklarni taqqoslash", "length", "/uz/uzunlik-solishtirish"],
      ["agirlik-karsilastirma", "Og‘irliklarni taqqoslash", "mass", "/uz/ogirlik-solishtirish"],
    ],
  },
  {
    id: "boshqa-kalkulyator-markazlari",
    title: "Boshqa kalkulyator markazlari",
    cards: [
      ["son-xossalari", "Son xossalari (kvadrat, bo'luvchilar, tub son)", "mathCalculator", "/uz/sonlar"],
      ["sayi-tabani", "Son tizimi aylantirgich", "numberBaseCalculator", "/uz/son-tizimi-cevirgich"],
      ["dunyanin-en-yuksek-daglari", "Dunyoning eng baland tog‘lari", "mountainsHubCalculator", "/uz/dunyoning-eng-baland-toglari"],
      ["il-rakimlari", "Viloyatlar balandligi", "mountainsHubCalculator", "/uz/viloyatlar-balandligi"],
      ["il-rakimi-karsilastirma", "Viloyatlar balandligini taqqoslash", "mountainsHubCalculator", "/uz/viloyat-balandligini-solishtirish"],
    ],
  },
];
