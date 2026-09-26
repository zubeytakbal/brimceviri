"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  activityMultipliers,
  calculateBmi,
  type ActivityLevel,
  type BmiCalculatorInput,
  type BmiCategory,
  type Gender,
} from "../converter/bmiCalculator";

type BmiCopy = {
  labels: {
    height: string;
    weight: string;
    age: string;
    gender: string;
    activity: string;
  };
  genders: Record<Gender, string>;
  categories: Record<BmiCategory, string>;
  activities: Record<ActivityLevel, string>;
  emptyState: string;
  resultLabels: {
    bmi: string;
    bmr: string;
    calories: string;
    multiplier: string;
  };
};

const copyByLocale: Record<Exclude<Locale, "ru">, BmiCopy> = {
  tr: {
    labels: {
      height: "Boy (cm)",
      weight: "Kilo (kg)",
      age: "Yaş",
      gender: "Cinsiyet",
      activity: "Aktivite Seviyesi",
    },
    genders: {
      male: "Erkek",
      female: "Kadın",
    },
    categories: {
      underweight: "Zayıf",
      normal: "Normal",
      overweight: "Fazla Kilolu",
      obese: "Obez",
    },
    activities: {
      sedentary: "Hareketsiz (masa başı, egzersiz yok)",
      light: "Az hareketli (haftada 1-3 gün egzersiz)",
      moderate: "Orta hareketli (haftada 3-5 gün egzersiz)",
      active: "Hareketli (haftada 6-7 gün egzersiz)",
      "very-active": "Çok hareketli (günde 2 kez egzersiz / fiziksel iş)",
    },
    emptyState: "Geçerli değerler girerek sonucu görebilirsin.",
    resultLabels: {
      bmi: "BMI",
      bmr: "Bazal Metabolizma Hızı",
      calories: "Günlük Kalori İhtiyacı",
      multiplier: "Aktivite Katsayısı",
    },
  },
  en: {
    labels: {
      height: "Height (cm)",
      weight: "Weight (kg)",
      age: "Age",
      gender: "Gender",
      activity: "Activity Level",
    },
    genders: {
      male: "Male",
      female: "Female",
    },
    categories: {
      underweight: "Underweight",
      normal: "Normal",
      overweight: "Overweight",
      obese: "Obese",
    },
    activities: {
      sedentary: "Sedentary (desk job, no exercise)",
      light: "Lightly active (exercise 1-3 days/week)",
      moderate: "Moderately active (exercise 3-5 days/week)",
      active: "Active (exercise 6-7 days/week)",
      "very-active": "Very active (twice-daily training / physical work)",
    },
    emptyState: "Enter valid values to see the result.",
    resultLabels: {
      bmi: "BMI",
      bmr: "Basal Metabolic Rate",
      calories: "Daily Calorie Need",
      multiplier: "Activity Multiplier",
    },
  },
  // fr: bu hesaplayıcı için Fransızca rota yok; tip güvenliği icin
  // Ingilizce kopya yeniden kullanildi.
  fr: {
    labels: {
      height: "Taille (cm)",
      weight: "Poids (kg)",
      age: "Âge",
      gender: "Sexe",
      activity: "Niveau d'activité",
    },
    genders: {
      male: "Homme",
      female: "Femme",
    },
    categories: {
      underweight: "Insuffisance pondérale",
      normal: "Normal",
      overweight: "Surpoids",
      obese: "Obésité",
    },
    activities: {
      sedentary: "Sédentaire (travail de bureau, pas d'exercice)",
      light: "Légèrement actif (exercice 1 à 3 jours/semaine)",
      moderate: "Modérément actif (exercice 3 à 5 jours/semaine)",
      active: "Actif (exercice 6 à 7 jours/semaine)",
      "very-active": "Très actif (entraînement biquotidien / travail physique)",
    },
    emptyState: "Saisissez des valeurs valides pour voir le résultat.",
    resultLabels: {
      bmi: "IMC",
      bmr: "Métabolisme de base",
      calories: "Besoin calorique journalier",
      multiplier: "Coefficient d'activité",
    },
  },
  es: {
    labels: {
      height: "Altura (cm)",
      weight: "Peso (kg)",
      age: "Edad",
      gender: "Sexo",
      activity: "Nivel de actividad",
    },
    genders: {
      male: "Hombre",
      female: "Mujer",
    },
    categories: {
      underweight: "Bajo peso",
      normal: "Normal",
      overweight: "Sobrepeso",
      obese: "Obesidad",
    },
    activities: {
      sedentary: "Sedentario (trabajo de oficina, sin ejercicio)",
      light: "Ligeramente activo (ejercicio 1-3 días/semana)",
      moderate: "Moderadamente activo (ejercicio 3-5 días/semana)",
      active: "Activo (ejercicio 6-7 días/semana)",
      "very-active": "Muy activo (entrenamiento dos veces al día / trabajo físico)",
    },
    emptyState: "Introduce valores válidos para ver el resultado.",
    resultLabels: {
      bmi: "IMC",
      bmr: "Tasa metabólica basal",
      calories: "Necesidad calórica diaria",
      multiplier: "Factor de actividad",
    },
  },
  "es-419": {
    labels: {
      height: "Estatura (cm)",
      weight: "Peso (kg)",
      age: "Edad",
      gender: "Sexo",
      activity: "Nivel de actividad",
    },
    genders: {
      male: "Hombre",
      female: "Mujer",
    },
    categories: {
      underweight: "Bajo peso",
      normal: "Normal",
      overweight: "Sobrepeso",
      obese: "Obesidad",
    },
    activities: {
      sedentary: "Sedentario (trabajo de oficina, sin ejercicio)",
      light: "Ligeramente activo (ejercicio 1-3 días/semana)",
      moderate: "Moderadamente activo (ejercicio 3-5 días/semana)",
      active: "Activo (ejercicio 6-7 días/semana)",
      "very-active": "Muy activo (entrenamiento dos veces al día / trabajo físico)",
    },
    emptyState: "Ingresa valores válidos para ver el resultado.",
    resultLabels: {
      bmi: "IMC",
      bmr: "Tasa metabólica basal",
      calories: "Necesidad calórica diaria",
      multiplier: "Factor de actividad",
    },
  },
  pt: {
    labels: {
      height: "Altura (cm)",
      weight: "Peso (kg)",
      age: "Idade",
      gender: "Sexo",
      activity: "Nível de atividade",
    },
    genders: {
      male: "Masculino",
      female: "Feminino",
    },
    categories: {
      underweight: "Abaixo do peso",
      normal: "Normal",
      overweight: "Sobrepeso",
      obese: "Obesidade",
    },
    activities: {
      sedentary: "Sedentário (trabalho de escritório, sem exercícios)",
      light: "Levemente ativo (exercícios 1 a 3 dias/semana)",
      moderate: "Moderadamente ativo (exercícios 3 a 5 dias/semana)",
      active: "Ativo (exercícios 6 a 7 dias/semana)",
      "very-active": "Muito ativo (treino duas vezes ao dia / trabalho físico)",
    },
    emptyState: "Digite valores válidos para ver o resultado.",
    resultLabels: {
      bmi: "IMC",
      bmr: "Taxa metabólica basal",
      calories: "Necessidade calórica diária",
      multiplier: "Fator de atividade",
    },
  },
  it: {
    labels: {
      height: "Altezza (cm)",
      weight: "Peso (kg)",
      age: "Età",
      gender: "Sesso",
      activity: "Livello di attività",
    },
    genders: {
      male: "Uomo",
      female: "Donna",
    },
    categories: {
      underweight: "Sottopeso",
      normal: "Normopeso",
      overweight: "Sovrappeso",
      obese: "Obesità",
    },
    activities: {
      sedentary: "Sedentario (lavoro d'ufficio, nessun esercizio)",
      light: "Leggermente attivo (esercizio 1-3 giorni/settimana)",
      moderate: "Moderatamente attivo (esercizio 3-5 giorni/settimana)",
      active: "Attivo (esercizio 6-7 giorni/settimana)",
      "very-active": "Molto attivo (allenamento due volte al giorno / lavoro fisico)",
    },
    emptyState: "Inserisci valori validi per vedere il risultato.",
    resultLabels: {
      bmi: "IMC",
      bmr: "Metabolismo basale",
      calories: "Fabbisogno calorico giornaliero",
      multiplier: "Fattore di attività",
    },
  },
  nl: {
    labels: {
      height: "Lengte (cm)",
      weight: "Gewicht (kg)",
      age: "Leeftijd",
      gender: "Geslacht",
      activity: "Activiteitsniveau",
    },
    genders: {
      male: "Man",
      female: "Vrouw",
    },
    categories: {
      underweight: "Ondergewicht",
      normal: "Normaal",
      overweight: "Overgewicht",
      obese: "Obesitas",
    },
    activities: {
      sedentary: "Zittend (kantoorwerk, geen sport)",
      light: "Licht actief (1-3 dagen per week sport)",
      moderate: "Matig actief (3-5 dagen per week sport)",
      active: "Actief (6-7 dagen per week sport)",
      "very-active": "Zeer actief (twee keer per dag training / lichamelijk werk)",
    },
    emptyState: "Voer geldige waarden in om het resultaat te zien.",
    resultLabels: {
      bmi: "BMI",
      bmr: "Basaal metabolisme",
      calories: "Dagelijkse caloriebehoefte",
      multiplier: "Activiteitsfactor",
    },
  },
  sv: {
    labels: {
      height: "Längd (cm)",
      weight: "Vikt (kg)",
      age: "Ålder",
      gender: "Kön",
      activity: "Aktivitetsnivå",
    },
    genders: {
      male: "Man",
      female: "Kvinna",
    },
    categories: {
      underweight: "Undervikt",
      normal: "Normalvikt",
      overweight: "Övervikt",
      obese: "Fetma",
    },
    activities: {
      sedentary: "Stillasittande (kontorsarbete, ingen träning)",
      light: "Lätt aktiv (träning 1–3 dagar/vecka)",
      moderate: "Måttligt aktiv (träning 3–5 dagar/vecka)",
      active: "Aktiv (träning 6–7 dagar/vecka)",
      "very-active": "Mycket aktiv (träning två gånger om dagen / fysiskt arbete)",
    },
    emptyState: "Ange giltiga värden för att se resultatet.",
    resultLabels: {
      bmi: "BMI",
      bmr: "Basalomsättning",
      calories: "Dagligt kaloribehov",
      multiplier: "Aktivitetsfaktor",
    },
  },
  no: {
    labels: {
      height: "Høyde (cm)",
      weight: "Vekt (kg)",
      age: "Alder",
      gender: "Kjønn",
      activity: "Aktivitetsnivå",
    },
    genders: {
      male: "Måle",
      female: "Kvinne",
    },
    categories: {
      underweight: "Undervekt",
      normal: "Normalvekt",
      overweight: "Overvekt",
      obese: "Fedme",
    },
    activities: {
      sedentary: "Stillesittende (kontorarbeid, ingen trening)",
      light: "Lett aktiv (trening 1–3 dager/uke)",
      moderate: "Moderat aktiv (trening 3–5 dager/uke)",
      active: "Aktiv (trening 6–7 dager/uke)",
      "very-active": "Svært aktiv (trening to ganger daglig / fysisk arbeid)",
    },
    emptyState: "Angi gyldige verdier for å se resultatet.",
    resultLabels: {
      bmi: "KMI",
      bmr: "Basalforbrenning",
      calories: "Daglig kaloribehov",
      multiplier: "Aktivitetsfaktor",
    },
  },
  da: {
    labels: {
      height: "Højde (cm)",
      weight: "Vægt (kg)",
      age: "Alder",
      gender: "Køn",
      activity: "Aktivitetsniveau",
    },
    genders: {
      male: "Måle",
      female: "Kvinde",
    },
    categories: {
      underweight: "Undervægt",
      normal: "Normalvægt",
      overweight: "Overvægt",
      obese: "Svær overvægt",
    },
    activities: {
      sedentary: "Stillesiddende (kontorarbejde, ingen motion)",
      light: "Let aktiv (motion 1–3 dage/uge)",
      moderate: "Moderat aktiv (motion 3–5 dage/uge)",
      active: "Aktiv (motion 6–7 dage/uge)",
      "very-active": "Meget aktiv (træning to gange dagligt / fysisk arbejde)",
    },
    emptyState: "Indtast gyldige værdier for at se resultatet.",
    resultLabels: {
      bmi: "BMI",
      bmr: "Basalstofskifte",
      calories: "Dagligt kaloriebehov",
      multiplier: "Aktivitetsfaktor",
    },
  },
  de: {
    labels: {
      height: "Größe (cm)",
      weight: "Gewicht (kg)",
      age: "Alter",
      gender: "Geschlecht",
      activity: "Aktivitätsniveau",
    },
    genders: {
      male: "Männlich",
      female: "Weiblich",
    },
    categories: {
      underweight: "Untergewicht",
      normal: "Normalgewicht",
      overweight: "Übergewicht",
      obese: "Adipositas",
    },
    activities: {
      sedentary: "Sitzend (Büro, kaum Bewegung)",
      light: "Leicht aktiv (Training 1-3 Tage/Woche)",
      moderate: "Mittel aktiv (Training 3-5 Tage/Woche)",
      active: "Aktiv (Training 6-7 Tage/Woche)",
      "very-active": "Sehr aktiv (2 Trainings pro Tag / körperliche Arbeit)",
    },
    emptyState: "Geben Sie gültige Werte ein, um das Ergebnis zu sehen.",
    resultLabels: {
      bmi: "BMI",
      bmr: "Grundumsatz",
      calories: "Täglicher Kalorienbedarf",
      multiplier: "Aktivitätsfaktor",
    },
  },
  ar: {
    labels: {
      height: "الطول (سم)",
      weight: "الوزن (كجم)",
      age: "العمر",
      gender: "الجنس",
      activity: "مستوى النشاط",
    },
    genders: {
      male: "ذكر",
      female: "أنثى",
    },
    categories: {
      underweight: "نحافة",
      normal: "طبيعي",
      overweight: "زيادة وزن",
      obese: "سمنة",
    },
    activities: {
      sedentary: "خامل (عمل مكتبي دون تمارين)",
      light: "نشاط خفيف (تمارين 1-3 أيام أسبوعيًا)",
      moderate: "نشاط متوسط (تمارين 3-5 أيام أسبوعيًا)",
      active: "نشاط مرتفع (تمارين 6-7 أيام أسبوعيًا)",
      "very-active": "نشاط مرتفع جدًا (تمرين مرتين يوميًا أو عمل بدني)",
    },
    emptyState: "أدخل قيمًا صحيحة لعرض النتيجة.",
    resultLabels: {
      bmi: "BMI",
      bmr: "معدل الأيض الأساسي",
      calories: "الاحتياج اليومي من السعرات",
      multiplier: "معامل النشاط",
    },
  },
uz: {
    labels: {
      height: "Bo'y (sm)",
      weight: "Vazn (kg)",
      age: "Yosh",
      gender: "Jins",
      activity: "Faollik Darajasi",
    },
    genders: {
      male: "Erkak",
      female: "Ayol",
    },
    categories: {
      underweight: "Vazn yetishmovchiligi",
      normal: "Normal",
      overweight: "Ortiqcha vazn",
      obese: "Semizlik",
    },
    activities: {
      sedentary: "Harakatsiz (ofis ishi, mashq yo'q)",
      light: "Kam faol (haftasiga 1-3 kun mashq)",
      moderate: "O'rtacha faol (haftasiga 3-5 kun mashq)",
      active: "Faol (haftasiga 6-7 kun mashq)",
      "very-active": "Juda faol (kuniga ikki mashq / jismoniy mehnat)",
    },
    emptyState: "Natijani ko'rish uchun to'g'ri qiymatlar kiriting.",
    resultLabels: {
      bmi: "BMI",
      bmr: "Asosiy Almashinuv Tezligi",
      calories: "Kunlik Kaloriya Ehtiyoji",
      multiplier: "Faollik Koeffitsienti",
    },
  },
bn: {
    labels: {
      height: "উচ্চতা (সেমি)",
      weight: "ওজন (কেজি)",
      age: "বয়স",
      gender: "লিঙ্গ",
      activity: "কার্যকলাপের মাত্রা",
    },
    genders: {
      male: "পুরুষ",
      female: "নারী",
    },
    categories: {
      underweight: "কম ওজন",
      normal: "স্বাভাবিক",
      overweight: "অতিরিক্ত ওজন",
      obese: "স্থূল",
    },
    activities: {
      sedentary: "নিষ্ক্রিয় (ডেস্ক জব, ব্যায়াম নেই)",
      light: "সামান্য সক্রিয় (সপ্তাহে ১-৩ দিন ব্যায়াম)",
      moderate: "মাঝারি সক্রিয় (সপ্তাহে ৩-৫ দিন ব্যায়াম)",
      active: "সক্রিয় (সপ্তাহে ৬-৭ দিন ব্যায়াম)",
      "very-active": "অত্যন্ত সক্রিয় (দিনে দুইবার প্রশিক্ষণ / শারীরিক পরিশ্রমের কাজ)",
    },
    emptyState: "ফলাফল দেখতে সঠিক মান লিখুন।",
    resultLabels: {
      bmi: "বিএমআই",
      bmr: "মৌলিক বিপাকীয় হার",
      calories: "দৈনিক ক্যালরি চাহিদা",
      multiplier: "কার্যকলাপ গুণক",
    },
  },
};

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, locale: Locale, digits = 1) {
  return formatLocalizedNumber(value, locale, { maximumFractionDigits: digits });
}

export default function BmiCalculator({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const copy = copyByLocale[locale === "ru" ? "en" : locale];
  const [heightCm, setHeightCm] = useState("170");
  const [weightKg, setWeightKg] = useState("70");
  const [age, setAge] = useState("30");
  const [gender, setGender] = useState<Gender>("male");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");

  const input: BmiCalculatorInput = useMemo(
    () => ({
      heightCm: parseNumericValue(heightCm),
      weightKg: parseNumericValue(weightKg),
      age: parseNumericValue(age),
      gender,
      activityLevel,
    }),
    [heightCm, weightKg, age, gender, activityLevel]
  );

  const result = useMemo(() => calculateBmi(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>{copy.labels.height}</span>
          <input
            inputMode="decimal"
            type="text"
            value={heightCm}
            onChange={(event) => setHeightCm(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.weight}</span>
          <input
            inputMode="decimal"
            type="text"
            value={weightKg}
            onChange={(event) => setWeightKg(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.age}</span>
          <input
            inputMode="numeric"
            type="text"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.gender}</span>
          <select
            value={gender}
            onChange={(event) => setGender(event.target.value as Gender)}
          >
            <option value="male">{copy.genders.male}</option>
            <option value="female">{copy.genders.female}</option>
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.activity}</span>
          <select
            value={activityLevel}
            onChange={(event) =>
              setActivityLevel(event.target.value as ActivityLevel)
            }
          >
            {(Object.keys(copy.activities) as ActivityLevel[]).map((level) => (
              <option key={level} value={level}>
                {copy.activities[level]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <>
            <p className="paint-calculator-liters">
              {copy.resultLabels.bmi}: <strong>{formatNumber(result.bmi, locale, 1)}</strong> -{" "}
              {copy.categories[result.category]}
            </p>

            <div className="paint-calculator-result-grid">
              <div>
                <span>{copy.resultLabels.bmr}</span>
                <strong>{formatNumber(result.basalMetabolicRate, locale, 0)} kcal</strong>
              </div>
              <div>
                <span>{copy.resultLabels.calories}</span>
                <strong>{formatNumber(result.dailyCalorieNeed, locale, 0)} kcal</strong>
              </div>
              <div>
                <span>{copy.resultLabels.multiplier}</span>
                <strong>{formatNumber(activityMultipliers[activityLevel], locale, 2)}</strong>
              </div>
            </div>
          </>
        )}
      </div>

      {locale === "en" && (
        <p className="calculator-usage-hint">
          <strong>Important:</strong> This tool uses adult BMI categories and is
          intended for adults age 20 and older. BMI is a screening measure, not
          a diagnosis or a direct measure of body fat; discuss a result that
          concerns you with a qualified health-care professional.
        </p>
      )}
    </div>
  );
}
