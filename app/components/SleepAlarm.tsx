"use client";

// Uyku hesaplayicisindaki "Bu saate alarm kur": tarayici sekmesi acik
// kaldigi surece calan basit alarm (Web Audio bip sesi). Telefonlarda ekran
// kilitlenince tarayici uyuyabilir; bu yuzden kullaniciya acikca soylenir.
import { useEffect, useRef, useState } from "react";

type AlarmCopy = {
  setFor: (time: string) => string;
  active: (time: string) => string;
  cancel: string;
  ringing: (time: string) => string;
  stop: string;
};

export const alarmCopy: Record<string, AlarmCopy> = {
  tr: {
    setFor: (time) => `⏰ ${time} için alarm kur`,
    active: (time) => `Alarm ${time} için kuruldu. Bu sekmeyi açık tutun; telefonda ekran kilitlenirse alarm çalmayabilir, yedek olarak telefonunuzun alarmını da kurun.`,
    cancel: "Alarmı iptal et",
    ringing: (time) => `⏰ Günaydın! Saat ${time}`,
    stop: "Durdur",
  },
  en: {
    setFor: (time) => `⏰ Set an alarm for ${time}`,
    active: (time) => `Alarm set for ${time}. Keep this tab open; on a phone the browser may sleep when the screen locks, so set your phone's alarm too.`,
    cancel: "Cancel alarm",
    ringing: (time) => `⏰ Good morning! It's ${time}`,
    stop: "Stop",
  },
  de: {
    setFor: (time) => `⏰ Wecker auf ${time} Uhr stellen`,
    active: (time) => `Wecker auf ${time} Uhr gestellt. Lass diesen Tab geöffnet; auf dem Handy kann der Browser bei gesperrtem Bildschirm pausieren – stell zur Sicherheit auch den Handywecker.`,
    cancel: "Wecker abbrechen",
    ringing: (time) => `⏰ Guten Morgen! Es ist ${time} Uhr`,
    stop: "Stopp",
  },
  fr: {
    setFor: (time) => `⏰ Régler une alarme à ${time}`,
    active: (time) => `Alarme réglée à ${time}. Gardez cet onglet ouvert ; sur un téléphone, le navigateur peut se mettre en veille quand l'écran est verrouillé, réglez aussi l'alarme du téléphone.`,
    cancel: "Annuler l'alarme",
    ringing: (time) => `⏰ Bonjour ! Il est ${time}`,
    stop: "Arrêter",
  },
  es: {
    setFor: (time) => `⏰ Poner alarma a las ${time}`,
    active: (time) => `Alarma puesta a las ${time}. Mantén esta pestaña abierta; en el móvil el navegador puede suspenderse al bloquear la pantalla, así que pon también la alarma del teléfono.`,
    cancel: "Cancelar alarma",
    ringing: (time) => `⏰ ¡Buenos días! Son las ${time}`,
    stop: "Detener",
  },
  pt: {
    setFor: (time) => `⏰ Definir alarme para ${time}`,
    active: (time) => `Alarme definido para ${time}. Mantenha esta aba aberta; no celular o navegador pode pausar com a tela bloqueada, então defina também o alarme do telefone.`,
    cancel: "Cancelar alarme",
    ringing: (time) => `⏰ Bom dia! São ${time}`,
    stop: "Parar",
  },
  it: {
    setFor: (time) => `⏰ Imposta la sveglia alle ${time}`,
    active: (time) => `Sveglia impostata alle ${time}. Tieni aperta questa scheda; sul telefono il browser può sospendersi a schermo bloccato, quindi imposta anche la sveglia del telefono.`,
    cancel: "Annulla sveglia",
    ringing: (time) => `⏰ Buongiorno! Sono le ${time}`,
    stop: "Ferma",
  },
  nl: {
    setFor: (time) => `⏰ Wekker zetten op ${time}`,
    active: (time) => `Wekker gezet op ${time}. Houd dit tabblad open; op een telefoon kan de browser pauzeren als het scherm vergrendeld is, zet dus ook de wekker van je telefoon.`,
    cancel: "Wekker annuleren",
    ringing: (time) => `⏰ Goedemorgen! Het is ${time}`,
    stop: "Stop",
  },
  sv: {
    setFor: (time) => `⏰ Ställ larm på ${time}`,
    active: (time) => `Larmet är ställt på ${time}. Håll fliken öppen; på mobilen kan webbläsaren pausa när skärmen låses, så ställ även mobilens larm.`,
    cancel: "Avbryt larm",
    ringing: (time) => `⏰ God morgon! Klockan är ${time}`,
    stop: "Stoppa",
  },
  no: {
    setFor: (time) => `⏰ Still alarm på ${time}`,
    active: (time) => `Alarmen er stilt på ${time}. Hold fanen åpen; på mobil kan nettleseren pause når skjermen låses, så still også mobilens alarm.`,
    cancel: "Avbryt alarm",
    ringing: (time) => `⏰ God morgen! Klokken er ${time}`,
    stop: "Stopp",
  },
  da: {
    setFor: (time) => `⏰ Sæt alarm til ${time}`,
    active: (time) => `Alarmen er sat til ${time}. Hold fanen åben; på mobilen kan browseren gå i dvale, når skærmen låses, så sæt også telefonens alarm.`,
    cancel: "Annuller alarm",
    ringing: (time) => `⏰ Godmorgen! Klokken er ${time}`,
    stop: "Stop",
  },
  ar: {
    setFor: (time) => `⏰ اضبط منبهًا على ${time}`,
    active: (time) => `تم ضبط المنبه على ${time}. أبقِ هذه الصفحة مفتوحة؛ قد يتوقف المتصفح على الهاتف عند قفل الشاشة، لذا اضبط منبه الهاتف أيضًا.`,
    cancel: "إلغاء المنبه",
    ringing: (time) => `⏰ صباح الخير! الساعة ${time}`,
    stop: "إيقاف",
  },
  uz: {
    setFor: (time) => `⏰ ${time} ga budilnik qo'yish`,
    active: (time) => `Budilnik ${time} ga qo'yildi. Bu oynani yopmang; telefonda ekran qulflansa brauzer to'xtab qolishi mumkin, shuning uchun telefon budilnigini ham qo'ying.`,
    cancel: "Budilnikni bekor qilish",
    ringing: (time) => `⏰ Xayrli tong! Soat ${time}`,
    stop: "To'xtatish",
  },
  bn: {
    setFor: (time) => `⏰ ${time}-এ অ্যালার্ম দিন`,
    active: (time) => `${time}-এ অ্যালার্ম দেওয়া হয়েছে। এই ট্যাবটি খোলা রাখুন; ফোনে স্ক্রিন লক হলে ব্রাউজার থেমে যেতে পারে, তাই ফোনের অ্যালার্মও দিন।`,
    cancel: "অ্যালার্ম বাতিল করুন",
    ringing: (time) => `⏰ সুপ্রভাত! এখন ${time}`,
    stop: "থামান",
  },
};

function nextOccurrence(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const target = new Date();
  target.setHours(hours, minutes, 0, 0);
  if (target.getTime() <= Date.now()) target.setDate(target.getDate() + 1);
  return target.getTime();
}

export function useBrowserAlarm() {
  const [alarm, setAlarm] = useState<{ time: string; at: number } | null>(null);
  const [ringing, setRinging] = useState<string | null>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const beepTimer = useRef<number | null>(null);

  const stopSound = () => {
    if (beepTimer.current !== null) window.clearInterval(beepTimer.current);
    beepTimer.current = null;
  };

  const beep = () => {
    const context = audioRef.current;
    if (!context) return;
    void context.resume();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 880;
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.4, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.45);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.5);
  };

  useEffect(() => {
    if (!alarm) return;
    const check = window.setInterval(() => {
      if (Date.now() >= alarm.at) {
        window.clearInterval(check);
        setAlarm(null);
        setRinging(alarm.time);
        beep();
        beepTimer.current = window.setInterval(beep, 1000);
        // En fazla 5 dakika calar.
        window.setTimeout(stopSound, 5 * 60 * 1000);
      }
    }, 1000);
    return () => window.clearInterval(check);
  }, [alarm]);

  useEffect(() => stopSound, []);

  return {
    alarm,
    ringing,
    set(time: string) {
      // AudioContext kullanici tiklamasi sirasinda olusturulur ki sonra ses calabilsin.
      if (!audioRef.current) {
        const AudioContextClass =
          window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) audioRef.current = new AudioContextClass();
      }
      void audioRef.current?.resume();
      setRinging(null);
      setAlarm({ time, at: nextOccurrence(time) });
    },
    cancel() {
      setAlarm(null);
    },
    stop() {
      stopSound();
      setRinging(null);
    },
  };
}

export function AlarmStatus({
  copy,
  alarm,
  ringing,
  onCancel,
  onStop,
}: {
  copy: AlarmCopy;
  alarm: { time: string } | null;
  ringing: string | null;
  onCancel: () => void;
  onStop: () => void;
}) {
  if (ringing) {
    return (
      <div className="sleep-alarm-status is-ringing" role="alert">
        <strong>{copy.ringing(ringing)}</strong>
        <button type="button" onClick={onStop}>
          {copy.stop}
        </button>
      </div>
    );
  }
  if (!alarm) return null;
  return (
    <div className="sleep-alarm-status" role="status">
      <span>{copy.active(alarm.time)}</span>
      <button type="button" onClick={onCancel}>
        {copy.cancel}
      </button>
    </div>
  );
}
