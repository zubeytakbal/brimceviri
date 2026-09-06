"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { professionCards } from "../converter/professionCards";
import {
  clearProfessionPreference,
  getProfessionPreferenceServerSnapshot,
  getProfessionPreferenceSnapshot,
  subscribeToProfessionPreference,
} from "../converter/professionPreference";

export default function ProfessionPreferenceWidget() {
  const selectedId = useSyncExternalStore(
    subscribeToProfessionPreference,
    getProfessionPreferenceSnapshot,
    getProfessionPreferenceServerSnapshot
  );

  const profession = selectedId
    ? professionCards.find((item) => item.id === selectedId)
    : undefined;

  if (!profession) {
    return (
      <section className="recent-tools-section">
        <div className="recent-tools-heading-row">
          <h2>Bir meslek seç</h2>
        </div>
        <p className="profession-preference-hint">
          Belirli bir meslekte mi çalışıyorsun?{" "}
          <Link href="/meslekler">Mesleğe göre araçlar</Link> sayfasından
          kendi mesleğini işaretle, sana özel araçları burada öne
          çıkaralım.
        </p>
      </section>
    );
  }

  return (
    <section className="recent-tools-section">
      <div className="recent-tools-heading-row">
        <h2>Senin İçin: {profession.title}</h2>
        <button
          type="button"
          className="recent-tools-clear"
          onClick={() => clearProfessionPreference()}
        >
          Kaldır
        </button>
      </div>
      <p className="profession-preference-hint">{profession.description}</p>
      <ul className="recent-tools-list">
        <li>
          <Link href={profession.href}>{profession.title}</Link>
        </li>
      </ul>
    </section>
  );
}
