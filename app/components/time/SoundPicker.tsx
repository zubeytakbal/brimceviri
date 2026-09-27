"use client";

import { useRef } from "react";
import { TIME_SOUND_IDS, type TimeSoundId } from "./timeSounds";
import type { TimeToolsCopy } from "./timeToolsCopy";
import { useCustomSound } from "./useCustomSound";

// Ses secimi: hazir sesler + "Kendi muzigin" (cihazdan ses dosyasi).
export default function SoundPicker({ value, onChange, copy }: { value: TimeSoundId; onChange: (id: TimeSoundId) => void; copy: TimeToolsCopy }) {
  const custom = useCustomSound();
  const input = useRef<HTMLInputElement>(null);

  return (
    <div className="sound-picker">
      <select
        value={value}
        onChange={(event) => {
          const next = event.target.value as TimeSoundId;
          if (next === "custom" && !custom.name) input.current?.click();
          onChange(next);
        }}
        aria-label={copy.alarm.sound}
      >
        {TIME_SOUND_IDS.map((id) => (
          <option key={id} value={id}>
            {copy.sounds[id]}
          </option>
        ))}
        <option value="custom">🎵 {custom.name ? `${copy.sounds.custom}: ${custom.name}` : copy.sounds.custom}</option>
      </select>
      <input
        ref={input}
        type="file"
        accept="audio/*"
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void custom.choose(file).then(() => onChange("custom"));
          event.target.value = "";
        }}
      />
      {value === "custom" && (
        <div className="sound-picker-custom">
          <button type="button" onClick={() => input.current?.click()}>
            {custom.name ? copy.customSound.change : copy.customSound.pick}
          </button>
          {custom.name && (
            <button
              type="button"
              onClick={() => {
                void custom.clear();
                onChange("classic");
              }}
            >
              {copy.customSound.remove}
            </button>
          )}
          <small>{custom.error ? copy.customSound.errors[custom.error] : copy.customSound.note}</small>
        </div>
      )}
    </div>
  );
}
