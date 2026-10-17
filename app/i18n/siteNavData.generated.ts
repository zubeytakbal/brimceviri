// Bu dosya scripts/generateSiteNav.ts tarafindan uretilir; elle duzenlemeyin.
import type { SiteNavData } from "./siteNavBuild";

export const SITE_NAV_DATA: SiteNavData = {
 "locales": {
  "tr": {
   "topLevelLinks": [
    {
     "href": "/",
     "label": "Ana Sayfa"
    },
    {
     "href": "/dosya-araclari",
     "label": "Dosya Araçları"
    },
    {
     "href": "/meslekler",
     "label": "Mesleklere Göre"
    }
   ],
   "menuGroups": [
    {
     "id": "conversions",
     "label": "Dönüşümler",
     "links": [
      {
       "href": "/kategoriler/uzunluk",
       "label": "Uzunluk"
      },
      {
       "href": "/kategoriler/alan",
       "label": "Alan"
      },
      {
       "href": "/kategoriler/hacim",
       "label": "Hacim"
      },
      {
       "href": "/kategoriler/kutle",
       "label": "Kütle"
      },
      {
       "href": "/kategoriler/sicaklik",
       "label": "Sıcaklık"
      },
      {
       "href": "/kategoriler/zaman",
       "label": "Zaman"
      },
      {
       "href": "/kategoriler/hiz",
       "label": "Hız"
      },
      {
       "href": "/kategoriler/basinc",
       "label": "Basınç"
      },
      {
       "href": "/kategoriler/enerji",
       "label": "Enerji ve Güç"
      },
      {
       "href": "/kategoriler/veri",
       "label": "Veri Depolama"
      },
      {
       "href": "/kategoriler/elektrik",
       "label": "Elektrik"
      },
      {
       "href": "/kategoriler/altin-ayar",
       "label": "Altın Ayar"
      },
      {
       "href": "/mutfak-olculeri-cevirici",
       "label": "Mutfak Ölçüleri"
      },
      {
       "href": "/ayakkabi-numarasi-cevirme",
       "label": "Ayakkabı Numarası"
      },
      {
       "href": "/doviz-cevirici",
       "label": "Döviz Çevirici"
      }
     ],
     "footer": [
      {
       "href": "/tum-birimler",
       "label": "Tüm dönüşümler →"
      },
      {
       "href": "/birimler",
       "label": "Birim rehberi →"
      }
     ]
    },
    {
     "id": "calculators",
     "label": "Hesaplamalar",
     "links": [
      {
       "href": "/yas-hesaplama",
       "label": "Yaş Hesaplama"
      },
      {
       "href": "/kredi-hesaplama",
       "label": "Kredi Hesaplama"
      },
      {
       "href": "/kdv-hesaplama",
       "label": "KDV Hesaplama"
      },
      {
       "href": "/brutten-nete-maas-hesaplama",
       "label": "Brütten Nete Maaş"
      },
      {
       "href": "/kidem-tazminati-hesaplama",
       "label": "Kıdem ve İhbar Tazminatı"
      },
      {
       "href": "/altin-hesaplama",
       "label": "Altın Hesaplama"
      },
      {
       "href": "/bmi-hesaplama",
       "label": "BMI (Vücut Kitle İndeksi)"
      },
      {
       "href": "/uyku-hesaplama",
       "label": "Uyku Hesaplama"
      },
      {
       "href": "/gebelik-haftasi-hesaplama",
       "label": "Gebelik Haftası Hesaplama"
      },
      {
       "href": "/yakit-tuketimi-hesaplama",
       "label": "Yakıt Tüketimi Hesaplama"
      },
      {
       "href": "/boya-hesaplama",
       "label": "Boya Hesaplama"
      },
      {
       "href": "/fayans-hesaplama",
       "label": "Fayans Hesaplama"
      },
      {
       "href": "/elektrik-tuketimi-hesaplama",
       "label": "Elektrik Tüketimi"
      },
      {
       "href": "/muhendislik-hesaplayicilari",
       "label": "Mühendislik Hesaplayıcıları"
      },
      {
       "href": "/bilim-hesaplayicilari",
       "label": "Bilim Hesaplayıcıları"
      }
     ],
     "footer": [
      {
       "href": "/hesaplayicilar",
       "label": "Tüm hesaplamalar →"
      }
     ]
    },
    {
     "id": "time",
     "label": "Tarih & Saat",
     "links": [
      {
       "href": "/saat-ve-tarih",
       "label": "Saat ve Tarih (Ana Sayfa)"
      },
      {
       "href": "/dunya-saatleri",
       "label": "Dünya Saatleri"
      },
      {
       "href": "/saat-dilimi-cevirici",
       "label": "Saat Dilimi Çevirici"
      },
      {
       "href": "/online-saat",
       "label": "Online Saat"
      },
      {
       "href": "/zamanlayici",
       "label": "Online Zamanlayıcı"
      },
      {
       "href": "/kronometre",
       "label": "Kronometre"
      },
      {
       "href": "/online-alarm-kur",
       "label": "Online Alarm Kur"
      },
      {
       "href": "/iki-tarih-arasi-gun-hesaplama",
       "label": "İki Tarih Arası Gün"
      },
      {
       "href": "/kacinci-hafta",
       "label": "Yılın Kaçıncı Haftası"
      },
      {
       "href": "/takvim",
       "label": "Türkiye Takvimi"
      },
      {
       "href": "/resmi-tatiller",
       "label": "Resmî Tatiller"
      },
      {
       "href": "/geri-sayim",
       "label": "Geri Sayım (Kaç Gün Kaldı)"
      },
      {
       "href": "/pomodoro",
       "label": "Pomodoro Zamanlayıcı"
      }
     ],
     "footer": [
      {
       "href": "/saat-ve-tarih",
       "label": "Tüm tarih ve saat araçları →"
      },
      {
       "href": "/dini-araclar",
       "label": "Dini araçlar →"
      }
     ]
    }
   ],
   "headerCopy": {
    "navAriaLabel": "Ana menü",
    "menuLabel": "Menü",
    "conversionsLabel": "Dönüşümler"
   },
   "categoryFooterLinks": [
    {
     "href": "/kategoriler/alan",
     "label": "Alan Dönüşümleri"
    },
    {
     "href": "/kategoriler/hacim",
     "label": "Hacim Dönüşümleri"
    },
    {
     "href": "/kategoriler/uzunluk",
     "label": "Uzunluk Dönüşümleri"
    },
    {
     "href": "/kategoriler/kutle",
     "label": "Kütle Dönüşümleri"
    },
    {
     "href": "/kategoriler/sicaklik",
     "label": "Sıcaklık Dönüşümleri"
    },
    {
     "href": "/kategoriler/zaman",
     "label": "Zaman Dönüşümleri"
    },
    {
     "href": "/kategoriler/hiz",
     "label": "Hız Dönüşümleri"
    },
    {
     "href": "/kategoriler/basinc",
     "label": "Basınç Dönüşümleri ve Hesaplamaları"
    },
    {
     "href": "/kategoriler/enerji",
     "label": "Enerji Dönüşümleri"
    },
    {
     "href": "/kategoriler/debi",
     "label": "Debi Dönüşümleri"
    },
    {
     "href": "/kategoriler/elektrik",
     "label": "Elektrik Birimi Dönüşümleri"
    },
    {
     "href": "/kategoriler/yogunluk",
     "label": "Yoğunluk Dönüşümleri"
    },
    {
     "href": "/kategoriler/kuvvet",
     "label": "Kuvvet Dönüşümleri"
    },
    {
     "href": "/kategoriler/tork",
     "label": "Tork Dönüşümleri"
    },
    {
     "href": "/kategoriler/aci",
     "label": "Açı Dönüşümleri"
    },
    {
     "href": "/kategoriler/frekans",
     "label": "Frekans Dönüşümleri"
    },
    {
     "href": "/kategoriler/hacimsel-debi",
     "label": "Hacimsel Debi Dönüşümleri"
    },
    {
     "href": "/kategoriler/kutlesel-debi",
     "label": "Kütlesel Debi Dönüşümleri"
    },
    {
     "href": "/kategoriler/manyetik-alan",
     "label": "Manyetik Alan Dönüşümleri"
    },
    {
     "href": "/kategoriler/manyetik-aki",
     "label": "Manyetik Akı Dönüşümleri"
    },
    {
     "href": "/kategoriler/kinematik-viskozite",
     "label": "Kinematik Viskozite Dönüşümleri"
    },
    {
     "href": "/kategoriler/isil-iletkenlik",
     "label": "Isıl İletkenlik Dönüşümleri"
    },
    {
     "href": "/kategoriler/isi-akisi",
     "label": "Isı Akısı Dönüşümleri"
    },
    {
     "href": "/kategoriler/ozgul-isi",
     "label": "Özgül Isı Dönüşümleri"
    },
    {
     "href": "/kategoriler/ivme",
     "label": "İvme Dönüşümleri"
    },
    {
     "href": "/kategoriler/acisal-hiz",
     "label": "Açısal Hız Dönüşümleri"
    },
    {
     "href": "/kategoriler/guc",
     "label": "Güç Dönüşümleri"
    },
    {
     "href": "/kategoriler/momentum",
     "label": "Momentum Dönüşümleri"
    },
    {
     "href": "/kategoriler/viskozite",
     "label": "Viskozite Dönüşümleri"
    },
    {
     "href": "/kategoriler/veri",
     "label": "Veri Depolama Dönüşümleri"
    },
    {
     "href": "/kategoriler/direnc",
     "label": "Direnç Dönüşümleri"
    },
    {
     "href": "/kategoriler/kapasitans",
     "label": "Kapasitans Dönüşümleri"
    },
    {
     "href": "/kategoriler/enduktans",
     "label": "Endüktans Dönüşümleri"
    },
    {
     "href": "/kategoriler/elektrik-yuku",
     "label": "Elektrik Yükü Dönüşümleri"
    },
    {
     "href": "/kategoriler/altin-ayar",
     "label": "Altın Ayar Dönüşümleri"
    },
    {
     "href": "/kategoriler/gumus-ayar",
     "label": "Gümüş Ayar Dönüşümleri"
    },
    {
     "href": "/kategoriler/kan-sekeri",
     "label": "Kan Şekeri (Glukoz) Birim Dönüşümleri"
    },
    {
     "href": "/kategoriler/vitamin-d",
     "label": "Vitamin D Birim Dönüşümleri"
    },
    {
     "href": "/kategoriler/konsantrasyon",
     "label": "Konsantrasyon Dönüşümleri"
    },
    {
     "href": "/kategoriler/radyasyon-dozu",
     "label": "Radyasyon Dozu Dönüşümleri"
    },
    {
     "href": "/kategoriler/aydinlatma-siddeti",
     "label": "Aydınlatma Şiddeti Dönüşümleri"
    },
    {
     "href": "/kategoriler/sogurulan-doz",
     "label": "Soğurulan Doz Dönüşümleri"
    },
    {
     "href": "/kategoriler/doz-hizi",
     "label": "Radyasyon Doz Hızı Dönüşümleri"
    },
    {
     "href": "/kategoriler/radyoaktivite",
     "label": "Radyoaktivite Dönüşümleri"
    },
    {
     "href": "/kategoriler/isinlama",
     "label": "Işınlama (Röntgen) Dönüşümleri"
    },
    {
     "href": "/kategoriler/su-sertligi",
     "label": "Su Sertliği Dönüşümleri"
    },
    {
     "href": "/kategoriler/gramaj",
     "label": "Kumaş Gramajı Dönüşümleri"
    },
    {
     "href": "/kategoriler/yakit-verimliligi",
     "label": "Yakıt Tüketimi Birim Dönüşümleri"
    },
    {
     "href": "/kategoriler/tempo",
     "label": "Koşu Temposu Dönüşümleri"
    },
    {
     "href": "/kategoriler/iplik-numarasi",
     "label": "İplik Numarası Dönüşümleri"
    }
   ],
   "footerLinks": [
    {
     "href": "/",
     "label": "Ana Sayfa"
    },
    {
     "href": "/birimler",
     "label": "Birim Rehberi"
    },
    {
     "href": "/tum-birimler",
     "label": "Tüm Dönüşümler"
    },
    {
     "href": "/meslekler",
     "label": "Mesleklere Göre"
    },
    {
     "href": "/hakkimizda",
     "label": "Hakkımızda"
    },
    {
     "href": "/iletisim",
     "label": "İletişim"
    },
    {
     "href": "/gizlilik",
     "label": "Gizlilik"
    },
    {
     "href": "/kullanim-kosullari",
     "label": "Kullanım Koşulları"
    }
   ],
   "footerCopy": {
    "navAriaLabel": "Alt menü",
    "pagesHeading": "Sayfalar",
    "languagesHeading": "Diller",
    "categoriesHeading": "Kategoriler",
    "description": "Teknik dönüşüm araçları, mühendislik hesaplayıcıları ve birim rehberleri pratik başvuru amacıyla hazırlanmıştır.",
    "disclaimer": "Kritik mühendislik, sağlık veya güvenlik kararlarında sonuçları profesyonel kaynaklarla doğrulayın.",
    "browserProcessingNote": "Hesaplayıcı girişleri bu sitedeki hesaplama akışlarında tarayıcı içinde işlenir."
   }
  },
  "en": {
   "topLevelLinks": [
    {
     "href": "/en",
     "label": "Home"
    },
    {
     "href": "/en/other-conversions",
     "label": "Other Tools"
    }
   ],
   "menuGroups": [
    {
     "id": "conversions",
     "label": "Conversions",
     "links": [
      {
       "href": "/en/categories/length",
       "label": "Length"
      },
      {
       "href": "/en/categories/mass",
       "label": "Mass"
      },
      {
       "href": "/en/categories/volume",
       "label": "Volume"
      },
      {
       "href": "/en/categories/temperature",
       "label": "Temperature"
      },
      {
       "href": "/en/categories/time",
       "label": "Time"
      },
      {
       "href": "/en/categories/area",
       "label": "Area"
      },
      {
       "href": "/en/categories/speed",
       "label": "Speed"
      },
      {
       "href": "/en/categories/data-storage",
       "label": "Data Storage"
      },
      {
       "href": "/en/categories/electricity",
       "label": "Electricity"
      },
      {
       "href": "/en/categories/pressure",
       "label": "Pressure"
      },
      {
       "href": "/en/categories/energy",
       "label": "Energy and Power"
      },
      {
       "href": "/en/categories/gold-karat",
       "label": "Gold Purity"
      },
      {
       "href": "/en/categories/density",
       "label": "Density"
      },
      {
       "href": "/en/categories/force",
       "label": "Force"
      },
      {
       "href": "/en/categories/flow-rate",
       "label": "Flow Rate"
      },
      {
       "href": "/en/categories/torque",
       "label": "Torque"
      },
      {
       "href": "/en/categories/momentum",
       "label": "Momentum"
      },
      {
       "href": "/en/categories/viscosity",
       "label": "Viscosity"
      },
      {
       "href": "/en/shoe-size-converter",
       "label": "Shoe Size"
      },
      {
       "href": "/en/kitchen-measurement-converter",
       "label": "Kitchen Measures"
      },
      {
       "href": "/en/recipe-converter",
       "label": "Recipe Converter"
      }
     ],
     "footer": [
      {
       "href": "/en/all-conversions",
       "label": "All conversions →"
      },
      {
       "href": "/en/units",
       "label": "Unit guide →"
      }
     ]
    },
    {
     "id": "calculators",
     "label": "Calculators",
     "links": [
      {
       "href": "/en/engineering-calculators",
       "label": "Engineering Calculators"
      },
      {
       "href": "/en/everyday-calculators",
       "label": "Everyday Calculators"
      },
      {
       "href": "/en/decision-savings-calculators",
       "label": "Decision & Savings Calculators"
      },
      {
       "href": "/en/business-calculators",
       "label": "Business Calculators"
      },
      {
       "href": "/en/finance-calculators",
       "label": "Finance Calculators"
      },
      {
       "href": "/en/data-computing-calculators",
       "label": "Data & Computing Calculators"
      },
      {
       "href": "/en/fitness-calculators",
       "label": "Fitness Calculators"
      },
      {
       "href": "/en/chemistry-calculators",
       "label": "Chemistry Calculators"
      },
      {
       "href": "/en/science-calculators",
       "label": "Science Calculators"
      }
     ],
     "footer": [
      {
       "href": "/en/christian-tools",
       "label": "Christian calendar tools →"
      }
     ]
    },
    {
     "id": "time",
     "label": "Clock & Calendar",
     "links": [
      {
       "href": "/en/time-and-date",
       "label": "Time and Date (overview)"
      },
      {
       "href": "/en/online-clock",
       "label": "Online Clock"
      },
      {
       "href": "/en/alarm-clock",
       "label": "Alarm Clock"
      },
      {
       "href": "/en/timer",
       "label": "Timer"
      },
      {
       "href": "/en/stopwatch",
       "label": "Stopwatch"
      },
      {
       "href": "/en/pomodoro-timer",
       "label": "Pomodoro Timer"
      },
      {
       "href": "/en/world-clock",
       "label": "World Clock"
      },
      {
       "href": "/en/time-zone-converter",
       "label": "Time Zone Converter"
      },
      {
       "href": "/en/countdown",
       "label": "Countdown"
      },
      {
       "href": "/en/days-between-dates",
       "label": "Days Between Dates"
      },
      {
       "href": "/en/date-calculator",
       "label": "Date Calculator"
      },
      {
       "href": "/en/age-calculator",
       "label": "Age Calculator"
      },
      {
       "href": "/en/week-number",
       "label": "Week Number"
      },
      {
       "href": "/en/business-day-calculator",
       "label": "Business Days"
      },
      {
       "href": "/en/federal-holidays",
       "label": "US Federal Holidays"
      }
     ],
     "footer": [
      {
       "href": "/en/time-and-date",
       "label": "All clock and calendar tools →"
      }
     ]
    }
   ],
   "headerCopy": {
    "navAriaLabel": "Main navigation",
    "menuLabel": "Menu",
    "conversionsLabel": "Conversions"
   },
   "categoryFooterLinks": [
    {
     "href": "/en/categories/area",
     "label": "Area Units and Conversions"
    },
    {
     "href": "/en/categories/volume",
     "label": "Volume Units and Conversions"
    },
    {
     "href": "/en/categories/length",
     "label": "Length Units and Conversions"
    },
    {
     "href": "/en/categories/mass",
     "label": "Mass Units and Conversions"
    },
    {
     "href": "/en/categories/temperature",
     "label": "Temperature Units and Conversions"
    },
    {
     "href": "/en/categories/time",
     "label": "Time Units and Conversions"
    },
    {
     "href": "/en/categories/speed",
     "label": "Speed Units and Conversions"
    },
    {
     "href": "/en/categories/pressure",
     "label": "Pressure Conversions"
    },
    {
     "href": "/en/categories/energy",
     "label": "Energy Conversions"
    },
    {
     "href": "/en/categories/angle",
     "label": "Angle Conversions"
    },
    {
     "href": "/en/categories/frequency",
     "label": "Frequency Conversions"
    },
    {
     "href": "/en/categories/volumetric-flow-rate",
     "label": "Volumetric Flow Rate Conversions"
    },
    {
     "href": "/en/categories/mass-flow-rate",
     "label": "Mass Flow Rate Conversions"
    },
    {
     "href": "/en/categories/magnetic-field",
     "label": "Magnetic Field Conversions"
    },
    {
     "href": "/en/categories/magnetic-flux",
     "label": "Magnetic Flux Conversions"
    },
    {
     "href": "/en/categories/kinematic-viscosity",
     "label": "Kinematic Viscosity Conversions"
    },
    {
     "href": "/en/categories/thermal-conductivity",
     "label": "Thermal Conductivity Conversions"
    },
    {
     "href": "/en/categories/heat-flux",
     "label": "Heat Flux Conversions"
    },
    {
     "href": "/en/categories/specific-heat",
     "label": "Specific Heat Conversions"
    },
    {
     "href": "/en/categories/acceleration",
     "label": "Acceleration Conversions"
    },
    {
     "href": "/en/categories/angular-velocity",
     "label": "Angular Velocity Conversions"
    },
    {
     "href": "/en/categories/power",
     "label": "Power Conversions"
    },
    {
     "href": "/en/categories/flow-rate",
     "label": "Flow Rate Conversions"
    },
    {
     "href": "/en/categories/electricity",
     "label": "Electrical Unit Conversions"
    },
    {
     "href": "/en/categories/density",
     "label": "Density Conversions"
    },
    {
     "href": "/en/categories/force",
     "label": "Force Conversions"
    },
    {
     "href": "/en/categories/torque",
     "label": "Torque Conversions"
    },
    {
     "href": "/en/categories/momentum",
     "label": "Momentum Conversions"
    },
    {
     "href": "/en/categories/viscosity",
     "label": "Viscosity Conversions"
    },
    {
     "href": "/en/categories/data-storage",
     "label": "Data Storage Conversions"
    },
    {
     "href": "/en/categories/resistance",
     "label": "Resistance Conversions"
    },
    {
     "href": "/en/categories/capacitance",
     "label": "Capacitance Conversions"
    },
    {
     "href": "/en/categories/inductance",
     "label": "Inductance Conversions"
    },
    {
     "href": "/en/categories/electric-charge",
     "label": "Electric Charge Conversions"
    },
    {
     "href": "/en/categories/gold-karat",
     "label": "Gold Karat Conversions"
    },
    {
     "href": "/en/categories/silver-purity",
     "label": "Silver Purity Conversions"
    },
    {
     "href": "/en/categories/blood-glucose",
     "label": "Blood Glucose Unit Conversion"
    },
    {
     "href": "/en/categories/vitamin-d",
     "label": "Vitamin D Unit Conversion"
    }
   ],
   "footerLinks": [
    {
     "href": "/en",
     "label": "Home"
    },
    {
     "href": "/en/units",
     "label": "Unit Guide"
    },
    {
     "href": "/en/all-conversions",
     "label": "All Conversions"
    },
    {
     "href": "/en/engineering-calculators",
     "label": "Engineering Calculators"
    },
    {
     "href": "/en/about",
     "label": "About"
    },
    {
     "href": "/en/contact",
     "label": "Contact"
    },
    {
     "href": "/en/privacy",
     "label": "Privacy"
    },
    {
     "href": "/en/terms",
     "label": "Terms"
    }
   ],
   "footerCopy": {
    "navAriaLabel": "Footer navigation",
    "pagesHeading": "Pages",
    "languagesHeading": "Languages",
    "categoriesHeading": "Categories",
    "description": "Technical conversion tools, engineering calculators and unit guides prepared for practical reference.",
    "disclaimer": "For engineering, health or safety decisions, verify critical values with professional sources.",
    "browserProcessingNote": "Calculator inputs are processed in the browser for calculation flows on this site."
   }
  },
  "de": {
   "topLevelLinks": [
    {
     "href": "/de",
     "label": "Startseite"
    }
   ],
   "menuGroups": [
    {
     "id": "conversions",
     "label": "Umrechnungen",
     "links": [
      {
       "href": "/de/kategorien/laenge",
       "label": "Länge"
      },
      {
       "href": "/de/kategorien/flaeche",
       "label": "Fläche"
      },
      {
       "href": "/de/kategorien/volumen",
       "label": "Volumen"
      },
      {
       "href": "/de/kategorien/masse",
       "label": "Masse"
      },
      {
       "href": "/de/kategorien/temperatur",
       "label": "Temperatur"
      },
      {
       "href": "/de/kategorien/zeit",
       "label": "Zeit"
      },
      {
       "href": "/de/kategorien/geschwindigkeit",
       "label": "Geschwindigkeit"
      },
      {
       "href": "/de/kategorien/druck",
       "label": "Druck"
      },
      {
       "href": "/de/kategorien/energie",
       "label": "Energie und Leistung"
      },
      {
       "href": "/de/kategorien/datenspeicher",
       "label": "Datenspeicher"
      },
      {
       "href": "/de/kategorien/elektrizitaet",
       "label": "Elektrik"
      },
      {
       "href": "/de/kategorien/goldkarat",
       "label": "Goldkarat"
      },
      {
       "href": "/de/kuechenmass-umrechner",
       "label": "Küchenmaße"
      },
      {
       "href": "/de/schuhgroessen-umrechner",
       "label": "Schuhgrößen"
      },
      {
       "href": "/de/waehrungsrechner",
       "label": "Währungsrechner"
      }
     ],
     "footer": [
      {
       "href": "/de/alle-umrechnungen",
       "label": "Alle Umrechnungen →"
      },
      {
       "href": "/de/einheiten",
       "label": "Einheitenleitfaden →"
      }
     ]
    },
    {
     "id": "calculators",
     "label": "Rechner",
     "links": [
      {
       "href": "/de/brutto-netto-rechner",
       "label": "Brutto-Netto-Rechner"
      },
      {
       "href": "/de/mehrwertsteuer-rechner",
       "label": "Mehrwertsteuer-Rechner"
      },
      {
       "href": "/de/zinseszinsrechner",
       "label": "Zinseszinsrechner"
      },
      {
       "href": "/de/kreditrechner",
       "label": "Kreditrechner"
      },
      {
       "href": "/de/tilgungsrechner",
       "label": "Tilgungsrechner (Baufinanzierung)"
      },
      {
       "href": "/de/prozentrechner",
       "label": "Prozentrechner"
      },
      {
       "href": "/de/dreisatz-rechner",
       "label": "Dreisatz-Rechner"
      },
      {
       "href": "/de/bruchrechner",
       "label": "Bruchrechner"
      },
      {
       "href": "/de/notenrechner",
       "label": "Notenrechner"
      },
      {
       "href": "/de/bmi-rechner",
       "label": "BMI-Rechner"
      },
      {
       "href": "/de/grunderwerbsteuer-rechner",
       "label": "Grunderwerbsteuer-Rechner"
      },
      {
       "href": "/de/pendlerpauschale-rechner",
       "label": "Pendlerpauschale-Rechner"
      },
      {
       "href": "/de/urlaubsrechner",
       "label": "Urlaubsrechner"
      },
      {
       "href": "/de/stromkostenrechner",
       "label": "Stromkostenrechner (Abschlag, Tarifvergleich)"
      },
      {
       "href": "/de/mathe-rechner",
       "label": "Mathe-Rechner (Übersicht)"
      }
     ],
     "footer": [
      {
       "href": "/de/rechner",
       "label": "Alle Rechner →"
      }
     ]
    },
    {
     "id": "time",
     "label": "Kalender & Uhr",
     "links": [
      {
       "href": "/de/uhrzeit-und-datum",
       "label": "Uhrzeit und Datum (Übersicht)"
      },
      {
       "href": "/de/kalender",
       "label": "Kalender mit Feiertagen"
      },
      {
       "href": "/de/altersrechner",
       "label": "Altersrechner"
      },
      {
       "href": "/de/kalenderwoche",
       "label": "Aktuelle Kalenderwoche"
      },
      {
       "href": "/de/feiertage",
       "label": "Feiertage Deutschland"
      },
      {
       "href": "/de/brueckentage",
       "label": "Brückentage-Rechner"
      },
      {
       "href": "/de/tagerechner",
       "label": "Tagerechner"
      },
      {
       "href": "/de/arbeitstage-rechner",
       "label": "Arbeitstage-Rechner"
      },
      {
       "href": "/de/countdown",
       "label": "Countdown (Tage bis …)"
      },
      {
       "href": "/de/online-uhr",
       "label": "Online-Uhr"
      },
      {
       "href": "/de/weltuhr",
       "label": "Weltuhr"
      },
      {
       "href": "/de/zeitzonenrechner",
       "label": "Zeitzonenrechner"
      },
      {
       "href": "/de/timer",
       "label": "Timer"
      },
      {
       "href": "/de/wecker",
       "label": "Wecker"
      },
      {
       "href": "/de/stoppuhr",
       "label": "Stoppuhr"
      }
     ],
     "footer": [
      {
       "href": "/de/uhrzeit-und-datum",
       "label": "Alle Kalender- und Uhr-Tools →"
      }
     ]
    }
   ],
   "headerCopy": {
    "navAriaLabel": "Hauptnavigation",
    "menuLabel": "Menü",
    "conversionsLabel": "Kategorien"
   },
   "categoryFooterLinks": [
    {
     "href": "/de/kategorien/beschleunigung",
     "label": "Beschleunigungseinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/winkelgeschwindigkeit",
     "label": "Winkelgeschwindigkeitseinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/leistung",
     "label": "Leistungseinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/impuls",
     "label": "Impulseinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/viskositaet",
     "label": "Viskositätseinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/datenspeicher",
     "label": "Datenspeicher-Einheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/elektrischer-widerstand",
     "label": "Widerstandseinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/kapazitaet",
     "label": "Kapazitätseinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/induktivitaet",
     "label": "Induktivitätseinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/elektrische-ladung",
     "label": "Elektrische-Ladungseinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/goldkarat",
     "label": "Goldkarat-Umrechnungen"
    },
    {
     "href": "/de/kategorien/dichte",
     "label": "Dichteeinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/kraft",
     "label": "Krafteinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/drehmoment",
     "label": "Drehmomenteinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/winkel",
     "label": "Winkeleinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/frequenz",
     "label": "Frequenzeinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/volumenstrom",
     "label": "Volumenstromeinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/massenstrom",
     "label": "Massenstromeinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/magnetfeldstaerke",
     "label": "Magnetfeldstärke-Einheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/magnetischer-fluss",
     "label": "Magnetischer-Fluss-Einheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/kinematische-viskositaet",
     "label": "Kinematische-Viskositätseinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/waermeleitfaehigkeit",
     "label": "Wärmeleitfähigkeitseinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/waermestromdichte",
     "label": "Wärmestromdichteeinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/spezifische-waermekapazitaet",
     "label": "Spezifische-Wärmekapazitätseinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/flaeche",
     "label": "Flächeneinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/volumen",
     "label": "Volumeneinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/laenge",
     "label": "Längeneinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/masse",
     "label": "Masseneinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/temperatur",
     "label": "Temperatureinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/zeit",
     "label": "Zeiteinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/geschwindigkeit",
     "label": "Geschwindigkeitseinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/druck",
     "label": "Druckeinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/energie",
     "label": "Energieeinheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/durchfluss",
     "label": "Volumenstrom-Einheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/elektrizitaet",
     "label": "Elektrische Einheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/silberreinheit",
     "label": "Silberreinheit-Einheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/blutzucker",
     "label": "Blutzucker-Einheiten und Umrechnungen"
    },
    {
     "href": "/de/kategorien/vitamin-d",
     "label": "Vitamin-D-Einheiten und Umrechnungen"
    }
   ],
   "footerLinks": [
    {
     "href": "/de",
     "label": "Startseite"
    },
    {
     "href": "/de/einheiten",
     "label": "Einheitenleitfaden"
    },
    {
     "href": "/de/alle-umrechnungen",
     "label": "Alle Umrechnungen"
    },
    {
     "href": "/de/ingenieurrechner",
     "label": "Ingenieurrechner"
    },
    {
     "href": "/de/uber-uns",
     "label": "Über uns"
    },
    {
     "href": "/de/kontakt",
     "label": "Kontakt"
    },
    {
     "href": "/de/datenschutz",
     "label": "Datenschutz"
    },
    {
     "href": "/de/nutzungsbedingungen",
     "label": "Nutzungsbedingungen"
    }
   ],
   "footerCopy": {
    "navAriaLabel": "Fußnavigation",
    "pagesHeading": "Seiten",
    "languagesHeading": "Sprachen",
    "categoriesHeading": "Kategorien",
    "description": "Technische Umrechnungstools und Einheitenleitfaden für den schnellen praktischen Einsatz.",
    "disclaimer": "Prüfen Sie kritische Werte bei technischen, gesundheitlichen oder sicherheitsrelevanten Entscheidungen immer mit fachlichen Quellen.",
    "browserProcessingNote": "Eingegebene Werte werden für die Rechenabläufe direkt im Browser verarbeitet."
   }
  },
  "ar": {
   "topLevelLinks": [
    {
     "href": "/ar",
     "label": "الرئيسية"
    },
    {
     "href": "/ar/engineering-calculators",
     "label": "الحاسبات"
    },
    {
     "href": "/ar",
     "label": "دليل الوحدات"
    },
    {
     "href": "/ar/all-conversions",
     "label": "كل التحويلات"
    }
   ],
   "menuGroups": [
    {
     "id": "conversions",
     "label": "الأدوات",
     "links": [
      {
       "href": "/ar/categories/length",
       "label": "الطول"
      },
      {
       "href": "/ar/categories/area",
       "label": "المساحة"
      },
      {
       "href": "/ar/categories/volume",
       "label": "الحجم"
      },
      {
       "href": "/ar/categories/mass",
       "label": "الكتلة"
      },
      {
       "href": "/ar/categories/temperature",
       "label": "الحرارة"
      },
      {
       "href": "/ar/categories/time",
       "label": "الزمن"
      },
      {
       "href": "/ar/categories/speed",
       "label": "السرعة"
      },
      {
       "href": "/ar/categories/pressure",
       "label": "الضغط"
      },
      {
       "href": "/ar/categories/energy",
       "label": "الطاقة والقدرة"
      },
      {
       "href": "/ar/categories/data-storage",
       "label": "تخزين البيانات"
      },
      {
       "href": "/ar/categories/electricity",
       "label": "الكهرباء"
      },
      {
       "href": "/ar/categories/density",
       "label": "الكثافة"
      },
      {
       "href": "/ar/categories/force",
       "label": "القوة"
      },
      {
       "href": "/ar/categories/flow-rate",
       "label": "معدل التدفق"
      },
      {
       "href": "/ar/categories/torque",
       "label": "عزم الدوران"
      },
      {
       "href": "/ar/categories/momentum",
       "label": "الزخم"
      },
      {
       "href": "/ar/categories/viscosity",
       "label": "اللزوجة"
      },
      {
       "href": "/ar/categories/resistance",
       "label": "المقاومة"
      },
      {
       "href": "/ar/categories/capacitance",
       "label": "السعة"
      },
      {
       "href": "/ar/categories/inductance",
       "label": "المحاثة"
      },
      {
       "href": "/ar/categories/electric-charge",
       "label": "الشحنة الكهربائية"
      },
      {
       "href": "/ar/categories/gold-karat",
       "label": "عيار الذهب"
      },
      {
       "href": "/ar/categories/silver-purity",
       "label": "عيار الفضة"
      },
      {
       "href": "/ar/shoe-size-converter",
       "label": "مقاسات الأحذية"
      },
      {
       "href": "/ar/kitchen-measurement-converter",
       "label": "مقاييس المطبخ"
      },
      {
       "href": "/ar/recipe-converter",
       "label": "محول الوصفات"
      }
     ]
    }
   ],
   "headerCopy": {
    "navAriaLabel": "التنقل الرئيسي",
    "menuLabel": "القائمة",
    "conversionsLabel": "الأدوات"
   },
   "categoryFooterLinks": [
    {
     "href": "/ar/categories/area",
     "label": "المساحة"
    },
    {
     "href": "/ar/categories/volume",
     "label": "الحجم"
    },
    {
     "href": "/ar/categories/length",
     "label": "الطول"
    },
    {
     "href": "/ar/categories/mass",
     "label": "الكتلة"
    },
    {
     "href": "/ar/categories/temperature",
     "label": "الحرارة"
    },
    {
     "href": "/ar/categories/time",
     "label": "الزمن"
    },
    {
     "href": "/ar/categories/speed",
     "label": "السرعة"
    },
    {
     "href": "/ar/categories/pressure",
     "label": "الضغط"
    },
    {
     "href": "/ar/categories/energy",
     "label": "الطاقة والقدرة"
    },
    {
     "href": "/ar/categories/angle",
     "label": "تحويلات الزاوية"
    },
    {
     "href": "/ar/categories/frequency",
     "label": "تحويلات التردد"
    },
    {
     "href": "/ar/categories/volumetric-flow-rate",
     "label": "تحويلات معدل التدفق الحجمي"
    },
    {
     "href": "/ar/categories/mass-flow-rate",
     "label": "تحويلات معدل التدفق الكتلي"
    },
    {
     "href": "/ar/categories/magnetic-field",
     "label": "تحويلات المجال المغناطيسي"
    },
    {
     "href": "/ar/categories/magnetic-flux",
     "label": "تحويلات التدفق المغناطيسي"
    },
    {
     "href": "/ar/categories/kinematic-viscosity",
     "label": "تحويلات اللزوجة الحركية"
    },
    {
     "href": "/ar/categories/thermal-conductivity",
     "label": "تحويلات الموصلية الحرارية"
    },
    {
     "href": "/ar/categories/heat-flux",
     "label": "تحويلات التدفق الحراري"
    },
    {
     "href": "/ar/categories/specific-heat",
     "label": "تحويلات الحرارة النوعية"
    },
    {
     "href": "/ar/categories/acceleration",
     "label": "تحويلات التسارع"
    },
    {
     "href": "/ar/categories/angular-velocity",
     "label": "تحويلات السرعة الزاوية"
    },
    {
     "href": "/ar/categories/power",
     "label": "تحويلات القدرة"
    },
    {
     "href": "/ar/categories/flow-rate",
     "label": "معدل التدفق"
    },
    {
     "href": "/ar/categories/electricity",
     "label": "الكهرباء"
    },
    {
     "href": "/ar/categories/density",
     "label": "الكثافة"
    },
    {
     "href": "/ar/categories/force",
     "label": "القوة"
    },
    {
     "href": "/ar/categories/torque",
     "label": "عزم الدوران"
    },
    {
     "href": "/ar/categories/momentum",
     "label": "الزخم"
    },
    {
     "href": "/ar/categories/viscosity",
     "label": "اللزوجة"
    },
    {
     "href": "/ar/categories/data-storage",
     "label": "تخزين البيانات"
    },
    {
     "href": "/ar/categories/resistance",
     "label": "المقاومة"
    },
    {
     "href": "/ar/categories/capacitance",
     "label": "السعة"
    },
    {
     "href": "/ar/categories/inductance",
     "label": "المحاثة"
    },
    {
     "href": "/ar/categories/electric-charge",
     "label": "الشحنة الكهربائية"
    },
    {
     "href": "/ar/categories/gold-karat",
     "label": "عيار الذهب"
    },
    {
     "href": "/ar/categories/silver-purity",
     "label": "عيار الفضة"
    },
    {
     "href": "/ar/categories/blood-glucose",
     "label": "تحويلات سكر الدم"
    },
    {
     "href": "/ar/categories/vitamin-d",
     "label": "تحويلات فيتامين د"
    }
   ],
   "footerLinks": [
    {
     "href": "/ar",
     "label": "الرئيسية"
    },
    {
     "href": "/ar",
     "label": "دليل الوحدات"
    },
    {
     "href": "/ar/all-conversions",
     "label": "كل التحويلات"
    },
    {
     "href": "/ar/engineering-calculators",
     "label": "الحاسبات"
    },
    {
     "href": "/ar/about",
     "label": "من نحن"
    },
    {
     "href": "/ar/contact",
     "label": "اتصل بنا"
    },
    {
     "href": "/ar/privacy",
     "label": "الخصوصية"
    },
    {
     "href": "/ar/terms",
     "label": "الشروط"
    }
   ],
   "footerCopy": {
    "navAriaLabel": "تنقل التذييل",
    "pagesHeading": "الصفحات",
    "languagesHeading": "اللغات",
    "categoriesHeading": "الأدوات",
    "description": "نسخة عربية تتوسع تدريجيًا لأدوات التحويل والحسابات العملية دون كسر بنية الموقع.",
    "disclaimer": "في القرارات الهندسية أو الصحية أو المتعلقة بالسلامة، يُفضّل دائمًا التحقق من النتائج عبر مصادر متخصصة.",
    "browserProcessingNote": "تُعالج مدخلات الحاسبات داخل المتصفح أثناء تنفيذ عمليات الحساب في هذا الموقع."
   }
  },
  "uz": {
   "topLevelLinks": [
    {
     "href": "/uz",
     "label": "Bosh sahifa"
    },
    {
     "href": "/uz#engineering-calculators",
     "label": "Kalkulyatorlar"
    },
    {
     "href": "/uz",
     "label": "Birliklar"
    },
    {
     "href": "/uz/turkumlar",
     "label": "Turkumlar"
    },
    {
     "href": "/uz/turkumlar#boshqa-kalkulyator-markazlari",
     "label": "Kasblar"
    }
   ],
   "menuGroups": [
    {
     "id": "conversions",
     "label": "O'zgartirishlar",
     "links": [
      {
       "href": "/uz/turkumlar/uzunlik",
       "label": "Uzunlik"
      },
      {
       "href": "/uz/turkumlar/yuza",
       "label": "Yuza"
      },
      {
       "href": "/uz/turkumlar/hajm",
       "label": "Hajm"
      },
      {
       "href": "/uz/turkumlar/massa",
       "label": "Massa"
      },
      {
       "href": "/uz/turkumlar/harorat",
       "label": "Harorat"
      },
      {
       "href": "/uz/turkumlar/vaqt",
       "label": "Vaqt"
      },
      {
       "href": "/uz/turkumlar/tezlik",
       "label": "Tezlik"
      },
      {
       "href": "/uz/turkumlar/bosim",
       "label": "Bosim"
      },
      {
       "href": "/uz/turkumlar/energiya",
       "label": "Energiya"
      },
      {
       "href": "/uz/turkumlar/malumot-hajmi",
       "label": "Ma'lumot Hajmi"
      },
      {
       "href": "/uz/turkumlar/elektr",
       "label": "Elektr"
      },
      {
       "href": "/uz/turkumlar/zichlik",
       "label": "Zichlik"
      },
      {
       "href": "/uz/turkumlar/kuch",
       "label": "Kuch"
      },
      {
       "href": "/uz/turkumlar/sarf",
       "label": "Sarf"
      },
      {
       "href": "/uz/turkumlar/tork",
       "label": "Tork"
      },
      {
       "href": "/uz/turkumlar/impuls",
       "label": "Impuls"
      },
      {
       "href": "/uz/turkumlar/qovushqoqlik-dinamik",
       "label": "Qovushqoqlik"
      },
      {
       "href": "/uz/turkumlar/qarshilik",
       "label": "Qarshilik"
      },
      {
       "href": "/uz/turkumlar/sigim",
       "label": "Sig'im"
      },
      {
       "href": "/uz/turkumlar/induktivlik",
       "label": "Induktivlik"
      },
      {
       "href": "/uz/turkumlar/elektr-zaryadi",
       "label": "Elektr Zaryadi"
      },
      {
       "href": "/uz/turkumlar/oltin-karati",
       "label": "Oltin Karati"
      },
      {
       "href": "/uz/turkumlar/kumush-sofligi",
       "label": "Kumush Sofligi (Proba)"
      }
     ]
    }
   ],
   "headerCopy": {
    "navAriaLabel": "Asosiy navigatsiya",
    "menuLabel": "Menyu",
    "conversionsLabel": "O'zgartirishlar"
   },
   "categoryFooterLinks": [
    {
     "href": "/uz/turkumlar/uzunlik",
     "label": "Uzunlik Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/yuza",
     "label": "Yuza (Maydon) Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/hajm",
     "label": "Hajm Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/massa",
     "label": "Massa (Og'irlik) Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/harorat",
     "label": "Harorat Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/vaqt",
     "label": "Vaqt Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/tezlik",
     "label": "Tezlik Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/bosim",
     "label": "Bosim Birliklarini O'zgartirish va Hisoblash"
    },
    {
     "href": "/uz/turkumlar/energiya",
     "label": "Energiya Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/malumot-hajmi",
     "label": "Ma'lumot Hajmi Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/elektr",
     "label": "Elektr Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/oltin-karati",
     "label": "Oltin Karati (Sinov) Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/sarf",
     "label": "Sarf Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/zichlik",
     "label": "Zichlik Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/kuch",
     "label": "Kuch Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/tork",
     "label": "Tork Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/burchak",
     "label": "Burchak Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/chastota",
     "label": "Chastota Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/hajmiy-sarf",
     "label": "Hajmiy Sarf Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/massaviy-sarf",
     "label": "Massaviy Sarf Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/magnit-maydoni",
     "label": "Magnit Maydoni Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/magnit-oqimi",
     "label": "Magnit Oqimi Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/kinematik-qovushqoqlik",
     "label": "Kinematik Qovushqoqlik Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/issiqlik-otkazuvchanligi",
     "label": "Issiqlik O'tkazuvchanligi Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/issiqlik-oqimi-zichligi",
     "label": "Issiqlik Oqimi Zichligi Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/solishtirma-issiqlik-sigimi",
     "label": "Solishtirma Issiqlik Sig'imi Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/tezlanish",
     "label": "Tezlanish Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/burchak-tezligi",
     "label": "Burchak Tezligi Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/quvvat",
     "label": "Quvvat Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/impuls",
     "label": "Impuls Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/qovushqoqlik-dinamik",
     "label": "Dinamik Qovushqoqlik Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/qarshilik",
     "label": "Qarshilik Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/sigim",
     "label": "Sig'im Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/induktivlik",
     "label": "Induktivlik Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/elektr-zaryadi",
     "label": "Elektr Zaryadi Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/kumush-sofligi",
     "label": "Kumush Sofligi (Proba) Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/qon-shakari",
     "label": "Qon Shakari Birliklarini O'zgartirish"
    },
    {
     "href": "/uz/turkumlar/vitamin-d",
     "label": "D Vitamini Birliklarini O'zgartirish"
    }
   ],
   "footerLinks": [
    {
     "href": "/uz",
     "label": "Bosh sahifa"
    }
   ],
   "footerCopy": {
    "navAriaLabel": "Pastki navigatsiya",
    "pagesHeading": "Sahifalar",
    "languagesHeading": "Tillar",
    "categoriesHeading": "Turkumlar",
    "description": "Amaliy foydalanish uchun tayyorlangan texnik o'zgartirish vositalari va birlik qo'llanmalari.",
    "disclaimer": "Muhandislik, sog'liq yoki xavfsizlik bilan bog'liq muhim qarorlarda natijalarni professional manbalar bilan tekshiring.",
    "browserProcessingNote": "Kalkulyator kiritmalari ushbu saytdagi hisoblash jarayonlarida brauzer ichida qayta ishlanadi."
   }
  },
  "bn": {
   "topLevelLinks": [
    {
     "href": "/bn",
     "label": "হোম"
    },
    {
     "href": "/bn",
     "label": "ক্যালকুলেটর"
    },
    {
     "href": "/bn",
     "label": "একক গাইড"
    },
    {
     "href": "/bn",
     "label": "সব রূপান্তর"
    }
   ],
   "menuGroups": [
    {
     "id": "conversions",
     "label": "রূপান্তর",
     "links": [
      {
       "href": "/bn/categories/doirghyo",
       "label": "দৈর্ঘ্য"
      },
      {
       "href": "/bn/categories/khetrofol",
       "label": "ক্ষেত্রফল"
      },
      {
       "href": "/bn/categories/ayoton",
       "label": "আয়তন"
      },
      {
       "href": "/bn/categories/bhor",
       "label": "ভর"
      },
      {
       "href": "/bn/categories/tapomatra",
       "label": "তাপমাত্রা"
      },
      {
       "href": "/bn/categories/somoy",
       "label": "সময়"
      },
      {
       "href": "/bn/categories/goti",
       "label": "গতি"
      },
      {
       "href": "/bn/categories/chap",
       "label": "চাপ"
      },
      {
       "href": "/bn/categories/shokti",
       "label": "শক্তি"
      },
      {
       "href": "/bn/categories/data-storage",
       "label": "ডেটা স্টোরেজ"
      },
      {
       "href": "/bn/categories/bidyut",
       "label": "বিদ্যুৎ"
      },
      {
       "href": "/bn/categories/ghonotto",
       "label": "ঘনত্ব"
      },
      {
       "href": "/bn/categories/bol",
       "label": "বল"
      },
      {
       "href": "/bn/categories/probaho-har",
       "label": "প্রবাহ হার"
      },
      {
       "href": "/bn/categories/torke",
       "label": "টর্ক"
      },
      {
       "href": "/bn/categories/vorobeg",
       "label": "ভরবেগ"
      },
      {
       "href": "/bn/categories/sandrota-gotisheel",
       "label": "সান্দ্রতা"
      },
      {
       "href": "/bn/categories/rodh",
       "label": "রোধ"
      },
      {
       "href": "/bn/categories/dharokotto",
       "label": "ধারকত্ব"
      },
      {
       "href": "/bn/categories/abesh",
       "label": "আবেশ"
      },
      {
       "href": "/bn/categories/tarit-adhan",
       "label": "তড়িৎ আধান"
      },
      {
       "href": "/bn/categories/sonar-ayar",
       "label": "স্বর্ণের ক্যারেট"
      },
      {
       "href": "/bn/categories/rupar-man",
       "label": "রূপার মান"
      },
      {
       "href": "/bn",
       "label": "জুতার মাপ"
      },
      {
       "href": "/bn",
       "label": "রান্নাঘর পরিমাপ"
      },
      {
       "href": "/bn",
       "label": "রেসিপি রূপান্তরকারী"
      }
     ]
    }
   ],
   "headerCopy": {
    "navAriaLabel": "প্রধান নেভিগেশন",
    "menuLabel": "মেনু",
    "conversionsLabel": "রূপান্তর"
   },
   "categoryFooterLinks": [
    {
     "href": "/bn/categories/doirghyo",
     "label": "দৈর্ঘ্যের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/khetrofol",
     "label": "ক্ষেত্রফলের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/ayoton",
     "label": "আয়তনের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/bhor",
     "label": "ভরের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/tapomatra",
     "label": "তাপমাত্রার একক রূপান্তর"
    },
    {
     "href": "/bn/categories/somoy",
     "label": "সময়ের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/goti",
     "label": "গতির একক রূপান্তর"
    },
    {
     "href": "/bn/categories/chap",
     "label": "চাপের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/shokti",
     "label": "শক্তির একক রূপান্তর"
    },
    {
     "href": "/bn/categories/data-storage",
     "label": "ডেটা স্টোরেজ একক রূপান্তর"
    },
    {
     "href": "/bn/categories/bidyut",
     "label": "বিদ্যুৎ একক রূপান্তর"
    },
    {
     "href": "/bn/categories/sonar-ayar",
     "label": "স্বর্ণের ক্যারেট রূপান্তর"
    },
    {
     "href": "/bn/categories/probaho-har",
     "label": "প্রবাহ হারের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/ghonotto",
     "label": "ঘনত্বের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/bol",
     "label": "বলের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/torke",
     "label": "টর্কের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/kon",
     "label": "কোণের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/kompangko",
     "label": "কম্পাঙ্কের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/ayotonik-probaho-har",
     "label": "আয়তনিক প্রবাহ হারের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/bhorer-probaho-har",
     "label": "ভরের প্রবাহ হারের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/coumbok-khetro",
     "label": "চৌম্বক ক্ষেত্র প্রাবল্যের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/coumbok-flux",
     "label": "চৌম্বক ফ্লাক্সের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/gotio-sandrota",
     "label": "গতীয় সান্দ্রতার একক রূপান্তর"
    },
    {
     "href": "/bn/categories/tap-poriboita",
     "label": "তাপ পরিবাহিতার একক রূপান্তর"
    },
    {
     "href": "/bn/categories/tap-probaho-ghonotto",
     "label": "তাপ প্রবাহ ঘনত্বের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/apekkhik-tap",
     "label": "আপেক্ষিক তাপ ধারণক্ষমতার একক রূপান্তর"
    },
    {
     "href": "/bn/categories/toron",
     "label": "ত্বরণের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/kounik-bega",
     "label": "কৌণিক বেগের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/khomota",
     "label": "ক্ষমতার একক রূপান্তর"
    },
    {
     "href": "/bn/categories/vorobeg",
     "label": "ভরবেগের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/sandrota-gotisheel",
     "label": "সান্দ্রতার একক রূপান্তর"
    },
    {
     "href": "/bn/categories/rodh",
     "label": "রোধের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/dharokotto",
     "label": "ধারকত্বের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/abesh",
     "label": "আবেশের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/tarit-adhan",
     "label": "তড়িৎ আধানের একক রূপান্তর"
    },
    {
     "href": "/bn/categories/rupar-man",
     "label": "রূপার মান রূপান্তর"
    },
    {
     "href": "/bn/categories/rokter-sorkara",
     "label": "রক্তের শর্করা (গ্লুকোজ) একক রূপান্তর"
    },
    {
     "href": "/bn/categories/vitamin-di",
     "label": "ভিটামিন ডি একক রূপান্তর"
    }
   ],
   "footerLinks": [
    {
     "href": "/bn",
     "label": "হোম"
    }
   ],
   "footerCopy": {
    "navAriaLabel": "ফুটার নেভিগেশন",
    "pagesHeading": "পৃষ্ঠাসমূহ",
    "languagesHeading": "ভাষাসমূহ",
    "categoriesHeading": "বিভাগসমূহ",
    "description": "ব্যবহারিক রেফারেন্সের জন্য তৈরি প্রযুক্তিগত রূপান্তর টুল এবং একক গাইড।",
    "disclaimer": "গুরুত্বপূর্ণ প্রকৌশল, স্বাস্থ্য বা নিরাপত্তা সংক্রান্ত সিদ্ধান্তে ফলাফল পেশাদার সূত্র দিয়ে যাচাই করুন।",
    "browserProcessingNote": "এই সাইটের হিসাব প্রবাহে ক্যালকুলেটরের ইনপুট ব্রাউজারেই প্রক্রিয়া করা হয়।"
   }
  },
  "fr": {
   "topLevelLinks": [
    {
     "href": "/fr",
     "label": "Accueil"
    },
    {
     "href": "/fr",
     "label": "Calculatrices"
    },
    {
     "href": "/fr",
     "label": "Guides d'unites"
    },
    {
     "href": "/fr",
     "label": "Toutes les conversions"
    }
   ],
   "menuGroups": [
    {
     "id": "conversions",
     "label": "Conversions",
     "links": [
      {
       "href": "/fr/categories/longueur",
       "label": "Longueur"
      },
      {
       "href": "/fr/categories/surface",
       "label": "Aire"
      },
      {
       "href": "/fr/categories/volume",
       "label": "Volume"
      },
      {
       "href": "/fr/categories/masse",
       "label": "Masse"
      },
      {
       "href": "/fr/categories/temperature",
       "label": "Temperature"
      },
      {
       "href": "/fr/categories/temps",
       "label": "Temps"
      },
      {
       "href": "/fr/categories/vitesse",
       "label": "Vitesse"
      },
      {
       "href": "/fr/categories/pression",
       "label": "Pression"
      },
      {
       "href": "/fr/categories/energie",
       "label": "Energie et Puissance"
      },
      {
       "href": "/fr/categories/stockage-de-donnees",
       "label": "Stockage de Donnees"
      },
      {
       "href": "/fr/categories/electricite",
       "label": "Electricite"
      },
      {
       "href": "/fr/categories/carat-or",
       "label": "Carat d'Or"
      },
      {
       "href": "/fr/categories/carat-argent",
       "label": "Titre de l'Argent"
      },
      {
       "href": "/fr",
       "label": "Pointures"
      },
      {
       "href": "/fr",
       "label": "Mesures de Cuisine"
      },
      {
       "href": "/fr",
       "label": "Convertisseur de Recettes"
      }
     ]
    }
   ],
   "headerCopy": {
    "navAriaLabel": "Navigation principale",
    "menuLabel": "Menu",
    "conversionsLabel": "Conversions"
   },
   "categoryFooterLinks": [
    {
     "href": "/fr/categories/longueur",
     "label": "Conversion des unités de longueur"
    },
    {
     "href": "/fr/categories/surface",
     "label": "Conversion des unités de surface"
    },
    {
     "href": "/fr/categories/volume",
     "label": "Conversion des unités de volume"
    },
    {
     "href": "/fr/categories/masse",
     "label": "Conversion des unités de masse"
    },
    {
     "href": "/fr/categories/temperature",
     "label": "Conversion des unités de température"
    },
    {
     "href": "/fr/categories/temps",
     "label": "Conversion des unités de temps"
    },
    {
     "href": "/fr/categories/vitesse",
     "label": "Conversion des unités de vitesse"
    },
    {
     "href": "/fr/categories/pression",
     "label": "Conversion des unités de pression"
    },
    {
     "href": "/fr/categories/energie",
     "label": "Conversion des unités d’énergie"
    },
    {
     "href": "/fr/categories/stockage-de-donnees",
     "label": "Conversion des unités de stockage de données"
    },
    {
     "href": "/fr/categories/electricite",
     "label": "Conversion des unités électriques"
    },
    {
     "href": "/fr/categories/carat-or",
     "label": "Conversion des carats d’or"
    },
    {
     "href": "/fr/categories/carat-argent",
     "label": "Conversion des titres d’argent"
    }
   ],
   "footerLinks": [
    {
     "href": "/fr",
     "label": "Accueil"
    }
   ],
   "footerCopy": {
    "navAriaLabel": "Navigation du pied de page",
    "pagesHeading": "Pages",
    "languagesHeading": "Langues",
    "categoriesHeading": "Categories",
    "description": "Outils de conversion technique et guides d'unites concus pour un usage pratique.",
    "disclaimer": "Pour les decisions importantes en ingenierie, sante ou securite, verifiez les resultats avec des sources professionnelles.",
    "browserProcessingNote": "Dans les flux de calcul de ce site, les entrees des calculatrices sont traitees directement dans le navigateur."
   }
  },
  "es": {
   "topLevelLinks": [
    {
     "href": "/es",
     "label": "Inicio"
    },
    {
     "href": "/es",
     "label": "Calculadoras"
    },
    {
     "href": "/es",
     "label": "Guía de Unidades"
    },
    {
     "href": "/es",
     "label": "Todas las Conversiones"
    }
   ],
   "menuGroups": [
    {
     "id": "conversions",
     "label": "Conversiones",
     "links": [
      {
       "href": "/es/categorias/longitud",
       "label": "Longitud"
      },
      {
       "href": "/es/categorias/superficie",
       "label": "Superficie"
      },
      {
       "href": "/es/categorias/volumen",
       "label": "Volumen"
      },
      {
       "href": "/es/categorias/masa",
       "label": "Masa"
      },
      {
       "href": "/es/categorias/temperatura",
       "label": "Temperatura"
      },
      {
       "href": "/es/categorias/tiempo",
       "label": "Tiempo"
      },
      {
       "href": "/es/categorias/velocidad",
       "label": "Velocidad"
      },
      {
       "href": "/es/categorias/presion",
       "label": "Presión"
      },
      {
       "href": "/es/categorias/energia",
       "label": "Energía y Potencia"
      },
      {
       "href": "/es/categorias/almacenamiento-de-datos",
       "label": "Almacenamiento de Datos"
      },
      {
       "href": "/es/categorias/electricidad",
       "label": "Electricidad"
      },
      {
       "href": "/es/categorias/densidad",
       "label": "Densidad"
      },
      {
       "href": "/es/categorias/fuerza",
       "label": "Fuerza"
      },
      {
       "href": "/es/categorias/caudal",
       "label": "Caudal"
      },
      {
       "href": "/es/categorias/par-de-torsion",
       "label": "Par"
      },
      {
       "href": "/es/categorias/momento-lineal",
       "label": "Momento"
      },
      {
       "href": "/es/categorias/viscosidad-dinamica",
       "label": "Viscosidad"
      },
      {
       "href": "/es/categorias/resistencia-electrica",
       "label": "Resistencia"
      },
      {
       "href": "/es/categorias/capacitancia",
       "label": "Capacitancia"
      },
      {
       "href": "/es/categorias/inductancia",
       "label": "Inductancia"
      },
      {
       "href": "/es/categorias/carga-electrica",
       "label": "Carga Eléctrica"
      },
      {
       "href": "/es/categorias/quilate-de-oro",
       "label": "Quilate de Oro"
      },
      {
       "href": "/es/categorias/ley-de-la-plata",
       "label": "Ley de la Plata"
      },
      {
       "href": "/es",
       "label": "Tallas de Calzado"
      },
      {
       "href": "/es",
       "label": "Medidas de Cocina"
      },
      {
       "href": "/es",
       "label": "Conversor de Recetas"
      }
     ]
    }
   ],
   "headerCopy": {
    "navAriaLabel": "Navegación principal",
    "menuLabel": "Menú",
    "conversionsLabel": "Conversiones"
   },
   "categoryFooterLinks": [
    {
     "href": "/es/categorias/longitud",
     "label": "Conversión de unidades de longitud"
    },
    {
     "href": "/es/categorias/superficie",
     "label": "Conversión de unidades de superficie"
    },
    {
     "href": "/es/categorias/volumen",
     "label": "Conversión de unidades de volumen"
    },
    {
     "href": "/es/categorias/masa",
     "label": "Conversión de unidades de masa"
    },
    {
     "href": "/es/categorias/temperatura",
     "label": "Conversión de unidades de temperatura"
    },
    {
     "href": "/es/categorias/tiempo",
     "label": "Conversión de unidades de tiempo"
    },
    {
     "href": "/es/categorias/velocidad",
     "label": "Conversión de unidades de velocidad"
    },
    {
     "href": "/es/categorias/presion",
     "label": "Conversión de unidades de presión"
    },
    {
     "href": "/es/categorias/energia",
     "label": "Conversión de unidades de energía"
    },
    {
     "href": "/es/categorias/almacenamiento-de-datos",
     "label": "Conversión de unidades de almacenamiento de datos"
    },
    {
     "href": "/es/categorias/electricidad",
     "label": "Conversión de unidades eléctricas"
    },
    {
     "href": "/es/categorias/quilate-de-oro",
     "label": "Conversión de quilates de oro"
    },
    {
     "href": "/es/categorias/ley-de-la-plata",
     "label": "Conversión de leyes de la plata"
    },
    {
     "href": "/es/categorias/potencia",
     "label": "Conversión de unidades de potencia"
    },
    {
     "href": "/es/categorias/fuerza",
     "label": "Conversión de unidades de fuerza"
    },
    {
     "href": "/es/categorias/densidad",
     "label": "Conversión de unidades de densidad"
    },
    {
     "href": "/es/categorias/aceleracion",
     "label": "Conversión de unidades de aceleración"
    },
    {
     "href": "/es/categorias/velocidad-angular",
     "label": "Conversión de unidades de velocidad angular"
    },
    {
     "href": "/es/categorias/angulo",
     "label": "Conversión de unidades de ángulo"
    },
    {
     "href": "/es/categorias/frecuencia",
     "label": "Conversión de unidades de frecuencia"
    },
    {
     "href": "/es/categorias/par-de-torsion",
     "label": "Conversión de unidades de par de torsión"
    },
    {
     "href": "/es/categorias/momento-lineal",
     "label": "Conversión de unidades de momento lineal"
    },
    {
     "href": "/es/categorias/viscosidad-dinamica",
     "label": "Conversión de unidades de viscosidad dinámica"
    },
    {
     "href": "/es/categorias/viscosidad-cinematica",
     "label": "Conversión de unidades de viscosidad cinemática"
    },
    {
     "href": "/es/categorias/caudal",
     "label": "Conversión de unidades de caudal"
    },
    {
     "href": "/es/categorias/caudal-volumetrico",
     "label": "Conversión de unidades de caudal volumétrico"
    },
    {
     "href": "/es/categorias/caudal-masico",
     "label": "Conversión de unidades de caudal másico"
    },
    {
     "href": "/es/categorias/resistencia-electrica",
     "label": "Conversión de unidades de resistencia eléctrica"
    },
    {
     "href": "/es/categorias/capacitancia",
     "label": "Conversión de unidades de capacitancia"
    },
    {
     "href": "/es/categorias/inductancia",
     "label": "Conversión de unidades de inductancia"
    },
    {
     "href": "/es/categorias/carga-electrica",
     "label": "Conversión de unidades de carga eléctrica"
    },
    {
     "href": "/es/categorias/campo-magnetico",
     "label": "Conversión de unidades de campo magnético"
    },
    {
     "href": "/es/categorias/flujo-magnetico",
     "label": "Conversión de unidades de flujo magnético"
    },
    {
     "href": "/es/categorias/conductividad-termica",
     "label": "Conversión de unidades de conductividad térmica"
    },
    {
     "href": "/es/categorias/flujo-termico",
     "label": "Conversión de unidades de flujo térmico"
    },
    {
     "href": "/es/categorias/calor-especifico",
     "label": "Conversión de unidades de calor específico"
    },
    {
     "href": "/es/categorias/glucemia",
     "label": "Conversión de unidades de glucosa en sangre"
    },
    {
     "href": "/es/categorias/vitamina-d",
     "label": "Conversión de unidades de vitamina D"
    }
   ],
   "footerLinks": [
    {
     "href": "/es",
     "label": "Inicio"
    }
   ],
   "footerCopy": {
    "navAriaLabel": "Navegación del pie de pagina",
    "pagesHeading": "Paginas",
    "languagesHeading": "Idiomas",
    "categoriesHeading": "Categorías",
    "description": "Herramientas de conversión técnica y guías de unidades preparadas para un uso practico.",
    "disclaimer": "Para decisiones importantes de ingeniería, salud o seguridad, verifique los resultados con fuentes profesionales.",
    "browserProcessingNote": "En los flujos de calculo de este sitio, los datos introducidos en las calculadoras se procesan directamente en el navegador."
   }
  },
  "pt": {
   "topLevelLinks": [
    {
     "href": "/pt",
     "label": "Inicio"
    },
    {
     "href": "/pt",
     "label": "Calculadoras"
    },
    {
     "href": "/pt",
     "label": "Guia de Unidades"
    },
    {
     "href": "/pt",
     "label": "Todas as Conversões"
    }
   ],
   "menuGroups": [
    {
     "id": "conversions",
     "label": "Conversões",
     "links": [
      {
       "href": "/pt/categorias/comprimento",
       "label": "Comprimento"
      },
      {
       "href": "/pt/categorias/area",
       "label": "Área"
      },
      {
       "href": "/pt/categorias/volume",
       "label": "Volume"
      },
      {
       "href": "/pt/categorias/massa",
       "label": "Massa"
      },
      {
       "href": "/pt/categorias/temperatura",
       "label": "Temperatura"
      },
      {
       "href": "/pt/categorias/tempo",
       "label": "Tempo"
      },
      {
       "href": "/pt/categorias/velocidade",
       "label": "Velocidade"
      },
      {
       "href": "/pt/categorias/pressao",
       "label": "Pressão"
      },
      {
       "href": "/pt/categorias/energia",
       "label": "Energia e Potência"
      },
      {
       "href": "/pt/categorias/armazenamento-de-dados",
       "label": "Armazenamento de Dados"
      },
      {
       "href": "/pt/categorias/eletricidade",
       "label": "Eletricidade"
      },
      {
       "href": "/pt/categorias/quilate-de-ouro",
       "label": "Quilate de Ouro"
      },
      {
       "href": "/pt/categorias/teor-de-prata",
       "label": "Teor de Prata"
      },
      {
       "href": "/pt",
       "label": "Numeração de Calçados"
      },
      {
       "href": "/pt",
       "label": "Medidas de Cozinha"
      },
      {
       "href": "/pt",
       "label": "Conversor de Receitas"
      }
     ]
    }
   ],
   "headerCopy": {
    "navAriaLabel": "Navegação principal",
    "menuLabel": "Menu",
    "conversionsLabel": "Conversões"
   },
   "categoryFooterLinks": [
    {
     "href": "/pt/categorias/comprimento",
     "label": "Conversão de unidades de comprimento"
    },
    {
     "href": "/pt/categorias/area",
     "label": "Conversão de unidades de área"
    },
    {
     "href": "/pt/categorias/volume",
     "label": "Conversão de unidades de volume"
    },
    {
     "href": "/pt/categorias/massa",
     "label": "Conversão de unidades de massa"
    },
    {
     "href": "/pt/categorias/temperatura",
     "label": "Conversão de unidades de temperatura"
    },
    {
     "href": "/pt/categorias/tempo",
     "label": "Conversão de unidades de tempo"
    },
    {
     "href": "/pt/categorias/velocidade",
     "label": "Conversão de unidades de velocidade"
    },
    {
     "href": "/pt/categorias/pressao",
     "label": "Conversão de unidades de pressão"
    },
    {
     "href": "/pt/categorias/energia",
     "label": "Conversão de unidades de energia"
    },
    {
     "href": "/pt/categorias/armazenamento-de-dados",
     "label": "Conversão de unidades de armazenamento de dados"
    },
    {
     "href": "/pt/categorias/eletricidade",
     "label": "Conversão de unidades elétricas"
    },
    {
     "href": "/pt/categorias/quilate-de-ouro",
     "label": "Conversão de quilates de ouro"
    },
    {
     "href": "/pt/categorias/teor-de-prata",
     "label": "Conversão de teor de prata"
    }
   ],
   "footerLinks": [
    {
     "href": "/pt",
     "label": "Inicio"
    }
   ],
   "footerCopy": {
    "navAriaLabel": "Navegação do rodapé",
    "pagesHeading": "Páginas",
    "languagesHeading": "Idiomas",
    "categoriesHeading": "Categorias",
    "description": "Ferramentas de conversão técnica e guias de unidades preparados para uso prático.",
    "disclaimer": "Para decisões importantes de engenharia, saúde ou segurança, verifique os resultados com fontes profissionais.",
    "browserProcessingNote": "Nos fluxos de cálculo deste site, os dados inseridos nas calculadoras são processados diretamente no navegador."
   }
  },
  "it": {
   "topLevelLinks": [
    {
     "href": "/it",
     "label": "Home"
    },
    {
     "href": "/it",
     "label": "Calcolatrici"
    },
    {
     "href": "/it",
     "label": "Guida alle Unita"
    },
    {
     "href": "/it",
     "label": "Tutte le Conversioni"
    }
   ],
   "menuGroups": [
    {
     "id": "conversions",
     "label": "Conversioni",
     "links": [
      {
       "href": "/it/categorie/lunghezza",
       "label": "Lunghezza"
      },
      {
       "href": "/it/categorie/area",
       "label": "Area"
      },
      {
       "href": "/it/categorie/volume",
       "label": "Volume"
      },
      {
       "href": "/it/categorie/massa",
       "label": "Massa"
      },
      {
       "href": "/it/categorie/temperatura",
       "label": "Temperatura"
      },
      {
       "href": "/it/categorie/tempo",
       "label": "Tempo"
      },
      {
       "href": "/it/categorie/velocita",
       "label": "Velocita"
      },
      {
       "href": "/it/categorie/pressione",
       "label": "Pressione"
      },
      {
       "href": "/it/categorie/energia",
       "label": "Energia e Potenza"
      },
      {
       "href": "/it/categorie/archiviazione-dati",
       "label": "Archiviazione Dati"
      },
      {
       "href": "/it/categorie/elettricita",
       "label": "Elettricita"
      },
      {
       "href": "/it/categorie/caratura-oro",
       "label": "Caratura dell'Oro"
      },
      {
       "href": "/it/categorie/titolo-argento",
       "label": "Titolo dell'Argento"
      },
      {
       "href": "/it",
       "label": "Numeri di Scarpe"
      },
      {
       "href": "/it",
       "label": "Misure di Cucina"
      },
      {
       "href": "/it",
       "label": "Convertitore di Ricette"
      }
     ]
    }
   ],
   "headerCopy": {
    "navAriaLabel": "Navigazione principale",
    "menuLabel": "Menu",
    "conversionsLabel": "Conversioni"
   },
   "categoryFooterLinks": [
    {
     "href": "/it/categorie/lunghezza",
     "label": "Conversione delle unità di lunghezza"
    },
    {
     "href": "/it/categorie/area",
     "label": "Conversione delle unità di area"
    },
    {
     "href": "/it/categorie/volume",
     "label": "Conversione delle unità di volume"
    },
    {
     "href": "/it/categorie/massa",
     "label": "Conversione delle unità di massa"
    },
    {
     "href": "/it/categorie/temperatura",
     "label": "Conversione delle unità di temperatura"
    },
    {
     "href": "/it/categorie/tempo",
     "label": "Conversione delle unità di tempo"
    },
    {
     "href": "/it/categorie/velocita",
     "label": "Conversione delle unità di velocità"
    },
    {
     "href": "/it/categorie/pressione",
     "label": "Conversione delle unità di pressione"
    },
    {
     "href": "/it/categorie/energia",
     "label": "Conversione delle unità di energia"
    },
    {
     "href": "/it/categorie/archiviazione-dati",
     "label": "Conversione delle unità di archiviazione dati"
    },
    {
     "href": "/it/categorie/elettricita",
     "label": "Conversione delle unità elettriche"
    },
    {
     "href": "/it/categorie/caratura-oro",
     "label": "Conversione della caratura dell'oro"
    },
    {
     "href": "/it/categorie/titolo-argento",
     "label": "Conversione del titolo dell'argento"
    }
   ],
   "footerLinks": [
    {
     "href": "/it",
     "label": "Home"
    }
   ],
   "footerCopy": {
    "navAriaLabel": "Navigazione del footer",
    "pagesHeading": "Pagine",
    "languagesHeading": "Lingue",
    "categoriesHeading": "Categorie",
    "description": "Strumenti di conversione tecnica e guide alle unita preparati per un uso pratico.",
    "disclaimer": "Per decisioni importanti di ingegneria, salute o sicurezza, verifica i risultati con fonti professionali.",
    "browserProcessingNote": "Nei flussi di calcolo di questo sito, i dati inseriti nelle calcolatrici vengono elaborati direttamente nel browser."
   }
  },
  "nl": {
   "topLevelLinks": [
    {
     "href": "/nl",
     "label": "Home"
    },
    {
     "href": "/nl",
     "label": "Rekentools"
    },
    {
     "href": "/nl",
     "label": "Eenhedengids"
    },
    {
     "href": "/nl",
     "label": "Alle Omrekeningen"
    }
   ],
   "menuGroups": [
    {
     "id": "conversions",
     "label": "Omrekeningen",
     "links": [
      {
       "href": "/nl/categorieen/lengte",
       "label": "Lengte"
      },
      {
       "href": "/nl/categorieen/oppervlakte",
       "label": "Oppervlakte"
      },
      {
       "href": "/nl/categorieen/volume",
       "label": "Volume"
      },
      {
       "href": "/nl/categorieen/massa",
       "label": "Massa"
      },
      {
       "href": "/nl/categorieen/temperatuur",
       "label": "Temperatuur"
      },
      {
       "href": "/nl/categorieen/tijd",
       "label": "Tijd"
      },
      {
       "href": "/nl/categorieen/snelheid",
       "label": "Snelheid"
      },
      {
       "href": "/nl/categorieen/druk",
       "label": "Druk"
      },
      {
       "href": "/nl/categorieen/energie",
       "label": "Energie en Vermogen"
      },
      {
       "href": "/nl/categorieen/data-opslag",
       "label": "Data-opslag"
      },
      {
       "href": "/nl/categorieen/elektriciteit",
       "label": "Elektriciteit"
      },
      {
       "href": "/nl/categorieen/goudkaraat",
       "label": "Goudkaraat"
      },
      {
       "href": "/nl/categorieen/zilvergehalte",
       "label": "Zilvergehalte"
      },
      {
       "href": "/nl/schoenmaten-omrekenen",
       "label": "Schoenmaten"
      },
      {
       "href": "/nl/keukenmaten-omrekenen",
       "label": "Keukenmaten"
      },
      {
       "href": "/nl/recepten-omrekenen",
       "label": "Receptomrekenaar"
      }
     ]
    }
   ],
   "headerCopy": {
    "navAriaLabel": "Hoofdnavigatie",
    "menuLabel": "Menu",
    "conversionsLabel": "Omrekeningen"
   },
   "categoryFooterLinks": [
    {
     "href": "/nl/categorieen/lengte",
     "label": "Omrekenen van lengte-eenheden"
    },
    {
     "href": "/nl/categorieen/oppervlakte",
     "label": "Omrekenen van oppervlakte-eenheden"
    },
    {
     "href": "/nl/categorieen/volume",
     "label": "Omrekenen van volume-eenheden"
    },
    {
     "href": "/nl/categorieen/massa",
     "label": "Omrekenen van massa-eenheden"
    },
    {
     "href": "/nl/categorieen/temperatuur",
     "label": "Omrekenen van temperatuureenheden"
    },
    {
     "href": "/nl/categorieen/tijd",
     "label": "Omrekenen van tijdseenheden"
    },
    {
     "href": "/nl/categorieen/snelheid",
     "label": "Omrekenen van snelheidseenheden"
    },
    {
     "href": "/nl/categorieen/druk",
     "label": "Omrekenen van drukeenheden"
    },
    {
     "href": "/nl/categorieen/energie",
     "label": "Omrekenen van energie-eenheden"
    },
    {
     "href": "/nl/categorieen/data-opslag",
     "label": "Omrekenen van data-opslageenheden"
    },
    {
     "href": "/nl/categorieen/elektriciteit",
     "label": "Omrekenen van elektrische eenheden"
    },
    {
     "href": "/nl/categorieen/goudkaraat",
     "label": "Omrekenen van goudkaraat"
    },
    {
     "href": "/nl/categorieen/zilvergehalte",
     "label": "Omrekenen van zilvergehalte"
    }
   ],
   "footerLinks": [
    {
     "href": "/nl",
     "label": "Home"
    }
   ],
   "footerCopy": {
    "navAriaLabel": "Footernavigatie",
    "pagesHeading": "Pagina's",
    "languagesHeading": "Talen",
    "categoriesHeading": "Categorieën",
    "description": "Technische omrekentools en eenhedengidsen voorbereid voor praktisch gebruik.",
    "disclaimer": "Controleer resultaten voor belangrijke technische, medische of veiligheidsbeslissingen met professionele bronnen.",
    "browserProcessingNote": "Bij de rekenfuncties op deze site worden de ingevoerde gegevens rechtstreeks in de browser verwerkt."
   }
  },
  "ru": {
   "topLevelLinks": [
    {
     "href": "/ru",
     "label": "Главная"
    },
    {
     "href": "/ru/unit-guides",
     "label": "Единицы"
    },
    {
     "href": "/ru/categories",
     "label": "Все переводы"
    }
   ],
   "menuGroups": [
    {
     "id": "conversions",
     "label": "Конвертеры",
     "links": []
    }
   ],
   "headerCopy": {
    "navAriaLabel": "Основная навигация",
    "menuLabel": "Меню",
    "conversionsLabel": "Конвертеры"
   },
   "categoryFooterLinks": [],
   "footerLinks": [
    {
     "href": "/ru",
     "label": "Главная"
    },
    {
     "href": "/ru/categories",
     "label": "Все переводы"
    }
   ],
   "footerCopy": {
    "navAriaLabel": "Навигация в подвале",
    "pagesHeading": "Страницы",
    "languagesHeading": "Языки",
    "categoriesHeading": "Категории",
    "description": "Точные конвертеры величин и справочные материалы для практических задач.",
    "disclaimer": "Для важных инженерных, медицинских и безопасностных решений проверяйте критические значения по профессиональным источникам.",
    "browserProcessingNote": "Введённые в калькуляторы данные обрабатываются в браузере."
   }
  },
  "sv": {
   "topLevelLinks": [
    {
     "href": "/sv",
     "label": "Hem"
    },
    {
     "href": "/sv",
     "label": "Räknare"
    },
    {
     "href": "/sv",
     "label": "Enhetsguide"
    },
    {
     "href": "/sv",
     "label": "Alla Omvandlingar"
    }
   ],
   "menuGroups": [
    {
     "id": "conversions",
     "label": "Omvandlingar",
     "links": [
      {
       "href": "/sv/kategorier/langd",
       "label": "Längd"
      },
      {
       "href": "/sv/kategorier/area",
       "label": "Area"
      },
      {
       "href": "/sv/kategorier/volym",
       "label": "Volym"
      },
      {
       "href": "/sv/kategorier/massa",
       "label": "Massa"
      },
      {
       "href": "/sv/kategorier/temperatur",
       "label": "Temperatur"
      },
      {
       "href": "/sv/kategorier/tid",
       "label": "Tid"
      },
      {
       "href": "/sv/kategorier/hastighet",
       "label": "Hastighet"
      },
      {
       "href": "/sv/kategorier/tryck",
       "label": "Tryck"
      },
      {
       "href": "/sv/kategorier/energi",
       "label": "Energi och Effekt"
      },
      {
       "href": "/sv/kategorier/datalagring",
       "label": "Datalagring"
      },
      {
       "href": "/sv/kategorier/elektricitet",
       "label": "Elektricitet"
      },
      {
       "href": "/sv/kategorier/guldkarat",
       "label": "Guldkarat"
      },
      {
       "href": "/sv/kategorier/silverhalt",
       "label": "Silverhalt"
      },
      {
       "href": "/sv/skostorlekar",
       "label": "Skostorlekar"
      },
      {
       "href": "/sv/koksmatt-omvandlare",
       "label": "Kokmått"
      },
      {
       "href": "/sv/receptomvandlare",
       "label": "Receptomvandlare"
      }
     ]
    }
   ],
   "headerCopy": {
    "navAriaLabel": "Huvudnavigering",
    "menuLabel": "Meny",
    "conversionsLabel": "Omvandlingar"
   },
   "categoryFooterLinks": [
    {
     "href": "/sv/kategorier/langd",
     "label": "Omvandla längdenheter"
    },
    {
     "href": "/sv/kategorier/area",
     "label": "Omvandla areaenheter"
    },
    {
     "href": "/sv/kategorier/volym",
     "label": "Omvandla volymenheter"
    },
    {
     "href": "/sv/kategorier/massa",
     "label": "Omvandla massaenheter"
    },
    {
     "href": "/sv/kategorier/temperatur",
     "label": "Omvandla temperaturenheter"
    },
    {
     "href": "/sv/kategorier/tid",
     "label": "Omvandla tidsenheter"
    },
    {
     "href": "/sv/kategorier/hastighet",
     "label": "Omvandla hastighetsenheter"
    },
    {
     "href": "/sv/kategorier/tryck",
     "label": "Omvandla tryckenheter"
    },
    {
     "href": "/sv/kategorier/energi",
     "label": "Omvandla energienheter"
    },
    {
     "href": "/sv/kategorier/datalagring",
     "label": "Omvandla datalagringsenheter"
    },
    {
     "href": "/sv/kategorier/elektricitet",
     "label": "Omvandla elektriska enheter"
    },
    {
     "href": "/sv/kategorier/guldkarat",
     "label": "Omvandla guldkarat"
    },
    {
     "href": "/sv/kategorier/silverhalt",
     "label": "Omvandla silverhalt"
    }
   ],
   "footerLinks": [
    {
     "href": "/sv",
     "label": "Hem"
    }
   ],
   "footerCopy": {
    "navAriaLabel": "Sidfotsnavigering",
    "pagesHeading": "Sidor",
    "languagesHeading": "Språk",
    "categoriesHeading": "Kategorier",
    "description": "Tekniska omvandlingsverktyg och enhetsguider förberedda för praktiskt bruk.",
    "disclaimer": "För viktiga tekniska, medicinska eller säkerhetsrelaterade beslut, kontrollera resultaten med professionella källor.",
    "browserProcessingNote": "I räknefunktionerna på denna sida behandlas inmatade uppgifter direkt i webbläsaren."
   }
  },
  "no": {
   "topLevelLinks": [
    {
     "href": "/no",
     "label": "Hjem"
    },
    {
     "href": "/no",
     "label": "Kalkulatorer"
    },
    {
     "href": "/no",
     "label": "Enhetsguide"
    },
    {
     "href": "/no",
     "label": "Alle Omregninger"
    }
   ],
   "menuGroups": [
    {
     "id": "conversions",
     "label": "Omregninger",
     "links": [
      {
       "href": "/no/kategorier/lengde",
       "label": "Lengde"
      },
      {
       "href": "/no/kategorier/areal",
       "label": "Areal"
      },
      {
       "href": "/no/kategorier/volum",
       "label": "Volum"
      },
      {
       "href": "/no/kategorier/masse",
       "label": "Masse"
      },
      {
       "href": "/no/kategorier/temperatur",
       "label": "Temperatur"
      },
      {
       "href": "/no/kategorier/tid",
       "label": "Tid"
      },
      {
       "href": "/no/kategorier/hastighet",
       "label": "Hastighet"
      },
      {
       "href": "/no/kategorier/trykk",
       "label": "Trykk"
      },
      {
       "href": "/no/kategorier/energi",
       "label": "Energi og Effekt"
      },
      {
       "href": "/no/kategorier/datalagring",
       "label": "Datalagring"
      },
      {
       "href": "/no/kategorier/elektrisitet",
       "label": "Elektrisitet"
      },
      {
       "href": "/no/kategorier/gullkarat",
       "label": "Gullkarat"
      },
      {
       "href": "/no/kategorier/solvinnhold",
       "label": "Sølvinnhold"
      },
      {
       "href": "/no/skostorrelser",
       "label": "Skostørrelser"
      },
      {
       "href": "/no/kjokkenmal-omregner",
       "label": "Kjøkkenmål"
      },
      {
       "href": "/no/oppskriftomregner",
       "label": "Oppskriftomregner"
      }
     ]
    }
   ],
   "headerCopy": {
    "navAriaLabel": "Hovednavigasjon",
    "menuLabel": "Meny",
    "conversionsLabel": "Omregninger"
   },
   "categoryFooterLinks": [
    {
     "href": "/no/kategorier/lengde",
     "label": "Omregn lengdeenheter"
    },
    {
     "href": "/no/kategorier/areal",
     "label": "Omregn arealenheter"
    },
    {
     "href": "/no/kategorier/volum",
     "label": "Omregn volumenheter"
    },
    {
     "href": "/no/kategorier/masse",
     "label": "Omregn masseenheter"
    },
    {
     "href": "/no/kategorier/temperatur",
     "label": "Omregn temperaturenheter"
    },
    {
     "href": "/no/kategorier/tid",
     "label": "Omregn tidsenheter"
    },
    {
     "href": "/no/kategorier/hastighet",
     "label": "Omregn hastighetsenheter"
    },
    {
     "href": "/no/kategorier/trykk",
     "label": "Omregn trykkenheter"
    },
    {
     "href": "/no/kategorier/energi",
     "label": "Omregn energienheter"
    },
    {
     "href": "/no/kategorier/datalagring",
     "label": "Omregn datalagringsenheter"
    },
    {
     "href": "/no/kategorier/elektrisitet",
     "label": "Omregn elektriske enheter"
    },
    {
     "href": "/no/kategorier/gullkarat",
     "label": "Omregn gullkarat"
    },
    {
     "href": "/no/kategorier/solvinnhold",
     "label": "Omregn sølvinnhold"
    }
   ],
   "footerLinks": [
    {
     "href": "/no",
     "label": "Hjem"
    }
   ],
   "footerCopy": {
    "navAriaLabel": "Bunntekstnavigering",
    "pagesHeading": "Sider",
    "languagesHeading": "Språk",
    "categoriesHeading": "Kategorier",
    "description": "Tekniske omregningsverktøy og enhetsguider forberedt for praktisk bruk.",
    "disclaimer": "For viktige tekniske, medisinske eller sikkerhetsrelaterte beslutninger, kontroller resultatene med profesjonelle kilder.",
    "browserProcessingNote": "I regnefunksjonene på denne siden behandles innsendte data direkte i nettleseren."
   }
  },
  "da": {
   "topLevelLinks": [
    {
     "href": "/da",
     "label": "Hjem"
    },
    {
     "href": "/da",
     "label": "Beregnere"
    },
    {
     "href": "/da",
     "label": "Enhedsguide"
    },
    {
     "href": "/da",
     "label": "Alle Omregninger"
    }
   ],
   "menuGroups": [
    {
     "id": "conversions",
     "label": "Omregninger",
     "links": [
      {
       "href": "/da/kategorier/laengde",
       "label": "Længde"
      },
      {
       "href": "/da/kategorier/areal",
       "label": "Areal"
      },
      {
       "href": "/da/kategorier/rumfang",
       "label": "Rumfang"
      },
      {
       "href": "/da/kategorier/masse",
       "label": "Masse"
      },
      {
       "href": "/da/kategorier/temperatur",
       "label": "Temperatur"
      },
      {
       "href": "/da/kategorier/tid",
       "label": "Tid"
      },
      {
       "href": "/da/kategorier/hastighed",
       "label": "Hastighed"
      },
      {
       "href": "/da/kategorier/tryk",
       "label": "Tryk"
      },
      {
       "href": "/da/kategorier/energi",
       "label": "Energi og Effekt"
      },
      {
       "href": "/da/kategorier/datalagring",
       "label": "Datalagring"
      },
      {
       "href": "/da/kategorier/elektricitet",
       "label": "Elektricitet"
      },
      {
       "href": "/da/kategorier/guldkarat",
       "label": "Guldkarat"
      },
      {
       "href": "/da/kategorier/solvindhold",
       "label": "Sølvindhold"
      },
      {
       "href": "/da/skostorrelser",
       "label": "Skostørrelser"
      },
      {
       "href": "/da/kokkenmal-omregner",
       "label": "Køkkenmål"
      },
      {
       "href": "/da/opskriftomregner",
       "label": "Opskriftomregner"
      }
     ]
    }
   ],
   "headerCopy": {
    "navAriaLabel": "Hovednavigation",
    "menuLabel": "Menu",
    "conversionsLabel": "Omregninger"
   },
   "categoryFooterLinks": [
    {
     "href": "/da/kategorier/laengde",
     "label": "Omregn længdeenheder"
    },
    {
     "href": "/da/kategorier/areal",
     "label": "Omregn arealenheder"
    },
    {
     "href": "/da/kategorier/rumfang",
     "label": "Omregn rumfangsenheder"
    },
    {
     "href": "/da/kategorier/masse",
     "label": "Omregn masseenheder"
    },
    {
     "href": "/da/kategorier/temperatur",
     "label": "Omregn temperaturenheder"
    },
    {
     "href": "/da/kategorier/tid",
     "label": "Omregn tidsenheder"
    },
    {
     "href": "/da/kategorier/hastighed",
     "label": "Omregn hastighedsenheder"
    },
    {
     "href": "/da/kategorier/tryk",
     "label": "Omregn trykenheder"
    },
    {
     "href": "/da/kategorier/energi",
     "label": "Omregn energienheder"
    },
    {
     "href": "/da/kategorier/datalagring",
     "label": "Omregn datalagringsenheder"
    },
    {
     "href": "/da/kategorier/elektricitet",
     "label": "Omregn elektriske enheder"
    },
    {
     "href": "/da/kategorier/guldkarat",
     "label": "Omregn guldkarat"
    },
    {
     "href": "/da/kategorier/solvindhold",
     "label": "Omregn sølvindhold"
    }
   ],
   "footerLinks": [
    {
     "href": "/da",
     "label": "Hjem"
    }
   ],
   "footerCopy": {
    "navAriaLabel": "Bundtekstnavigation",
    "pagesHeading": "Sider",
    "languagesHeading": "Sprog",
    "categoriesHeading": "Kategorier",
    "description": "Tekniske omregningsværktøjer og enhedsguider forberedt til praktisk brug.",
    "disclaimer": "For vigtige tekniske, medicinske eller sikkerhedsrelaterede beslutninger bør resultaterne kontrolleres med professionelle kilder.",
    "browserProcessingNote": "I beregningsfunktionerne på denne side behandles indtastede data direkte i browseren."
   }
  }
 },
 "footerLanguageLinks": [
  {
   "locale": "tr",
   "href": "/",
   "label": "Türkçe"
  },
  {
   "locale": "en",
   "href": "/en",
   "label": "English"
  },
  {
   "locale": "de",
   "href": "/de",
   "label": "Deutsch"
  },
  {
   "locale": "ar",
   "href": "/ar",
   "label": "العربية"
  },
  {
   "locale": "uz",
   "href": "/uz",
   "label": "O'zbekcha"
  },
  {
   "locale": "bn",
   "href": "/bn",
   "label": "বাংলা"
  },
  {
   "locale": "fr",
   "href": "/fr",
   "label": "Français"
  },
  {
   "locale": "es",
   "href": "/es",
   "label": "Español"
  },
  {
   "locale": "pt",
   "href": "/pt",
   "label": "Português"
  },
  {
   "locale": "it",
   "href": "/it",
   "label": "Italiano"
  },
  {
   "locale": "nl",
   "href": "/nl",
   "label": "Nederlands"
  },
  {
   "locale": "sv",
   "href": "/sv",
   "label": "Svenska"
  },
  {
   "locale": "no",
   "href": "/no",
   "label": "Norsk"
  },
  {
   "locale": "da",
   "href": "/da",
   "label": "Dansk"
  }
 ]
};
