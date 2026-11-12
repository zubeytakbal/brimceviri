// Bu dosya scripts/generateSiteNav.ts tarafindan uretilir; elle duzenlemeyin.
import type { SiteNavData } from "./siteNavBuild";

export const SITE_NAV_DATA: SiteNavData = {
 "locales": {
  "tr": {
   "topLevelLinks": [
    {
     "href": "/",
     "label": "Ana Sayfa"
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
      }
     ],
     "footer": [
      {
       "href": "/tum-birimler",
       "label": "Tüm dönüşümler →"
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
       "href": "/altin-hesaplama",
       "label": "Altın Hesaplama"
      },
      {
       "href": "/uyku-hesaplama",
       "label": "Uyku Hesaplama"
      },
      {
       "href": "/yakit-tuketimi-hesaplama",
       "label": "Yakıt Tüketimi Hesaplama"
      },
      {
       "href": "/elektrik-tuketimi-hesaplama",
       "label": "Elektrik Tüketimi"
      },
      {
       "href": "/beton-hesaplama",
       "label": "Beton Hesaplama"
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
       "href": "/tarla-donum-hesaplama",
       "label": "Tarla Dönüm Hesaplama"
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
     "id": "engineering",
     "label": "Mühendislik",
     "links": [
      {
       "href": "/muhendislik-hesaplayicilari/elektrik-hesaplari",
       "label": "Elektrik Hesapları (kW-Amper, Kablo Kesiti)"
      },
      {
       "href": "/malzeme-ozellikleri",
       "label": "Malzeme Özellikleri"
      },
      {
       "href": "/malzeme-agirligi-hesaplama",
       "label": "Malzeme Ağırlığı"
      },
      {
       "href": "/demir-agirlik-hesaplama",
       "label": "İnşaat Demiri Ağırlığı"
      },
      {
       "href": "/kiris-hesaplama",
       "label": "Kiriş Hesabı"
      },
      {
       "href": "/kva-kw-hesaplama",
       "label": "kVA kW Hesaplama"
      },
      {
       "href": "/kompanzasyon-hesaplama",
       "label": "Kompanzasyon Hesabı"
      },
      {
       "href": "/boru-capi-hesaplama",
       "label": "Boru Çapı ve Debi"
      },
      {
       "href": "/civata-torku-hesaplama",
       "label": "Cıvata Torku"
      },
      {
       "href": "/u-degeri-hesaplama",
       "label": "U Değeri"
      }
     ],
     "footer": [
      {
       "href": "/muhendislik-hesaplayicilari",
       "label": "Tüm mühendislik hesaplayıcıları →"
      }
     ]
    },
    {
     "id": "geo",
     "label": "Dünya ve Coğrafya",
     "links": [
      {
       "href": "/koordinat-donusturucu",
       "label": "Koordinat Dönüştürücü"
      },
      {
       "href": "/kible-yonu-hesaplama",
       "label": "Kıble Yönü"
      },
      {
       "href": "/harita-olcegi-hesaplama",
       "label": "Harita Ölçeği"
      }
     ]
    },
    {
     "id": "time",
     "label": "Tarih & Saat",
     "links": [
      {
       "href": "/saat-dilimi-cevirici",
       "label": "Saat Dilimi Çevirici"
      },
      {
       "href": "/iki-tarih-arasi-gun-hesaplama",
       "label": "İki Tarih Arası Gün"
      },
      {
       "href": "/kacinci-hafta",
       "label": "Yılın Kaçıncı Haftası"
      }
     ],
     "footer": []
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
     "href": "/kategoriler/alkol-derecesi",
     "label": "Alkol Derecesi Dönüşümleri (Proof)"
    },
    {
     "href": "/kategoriler/vida-hatvesi",
     "label": "Vida Hatvesi Dönüşümleri (TPI - mm)"
    },
    {
     "href": "/kategoriler/hali-dugum-sikligi",
     "label": "Halı Düğüm Sıklığı Dönüşümleri"
    },
    {
     "href": "/kategoriler/yagis-miktari",
     "label": "Yağış Miktarı Dönüşümleri"
    },
    {
     "href": "/kategoriler/dekar-basina-verim",
     "label": "Dekar Başına Verim Dönüşümleri"
    },
    {
     "href": "/kategoriler/dekar-basina-doz",
     "label": "Dekar Başına Doz Dönüşümleri"
    },
    {
     "href": "/kategoriler/alana-gore-fiyat",
     "label": "Alana Göre Fiyat Dönüşümleri"
    },
    {
     "href": "/kategoriler/elektrik-iletkenligi",
     "label": "Elektrik İletkenliği Dönüşümleri"
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
     "href": "/",
     "label": "Birim Rehberi"
    },
    {
     "href": "/tum-birimler",
     "label": "Tüm Dönüşümler"
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
     ]
    },
    {
     "id": "time",
     "label": "Date & Time",
     "links": [
      {
       "href": "/en/time-zone-converter",
       "label": "Time Zone Converter"
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
       "href": "/de/altersrechner",
       "label": "Altersrechner"
      },
      {
       "href": "/de/kalenderwoche",
       "label": "Aktuelle Kalenderwoche"
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
       "href": "/de/zeitzonenrechner",
       "label": "Zeitzonenrechner"
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
  }
 ]
};
