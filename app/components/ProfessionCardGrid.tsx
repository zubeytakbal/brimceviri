"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { DecorativeIcon, type SiteIconName } from "./siteIcons";
import type { ProfessionCard } from "../converter/professionCards";
import {
  clearProfessionPreference,
  getProfessionPreferenceServerSnapshot,
  getProfessionPreferenceSnapshot,
  setProfessionPreference,
  subscribeToProfessionPreference,
} from "../converter/professionPreference";

function CardIcon({ name }: { name: SiteIconName }) {
  return (
    <span className="home-category-icon-box" aria-hidden="true">
      <DecorativeIcon name={name} size={48} className="home-category-icon-svg" />
    </span>
  );
}

export default function ProfessionCardGrid({
  professions,
}: {
  professions: ProfessionCard[];
}) {
  const selectedId = useSyncExternalStore(
    subscribeToProfessionPreference,
    getProfessionPreferenceSnapshot,
    getProfessionPreferenceServerSnapshot
  );

  return (
    <div className="directory-home-category-grid">
      {professions.map((profession) => {
        const isSelected = selectedId === profession.id;

        return (
          <article className="directory-home-card" key={profession.id}>
            <Link
              className="directory-card-stretch"
              href={profession.href}
              aria-label={`${profession.title} - ${profession.description}`}
            />

            <button
              type="button"
              className={`profession-pin-button${isSelected ? " is-active" : ""}`}
              aria-pressed={isSelected}
              aria-label={
                isSelected
                  ? `${profession.title} seçimini kaldır`
                  : `${profession.title} benim mesleğim`
              }
              onClick={() =>
                isSelected
                  ? clearProfessionPreference()
                  : setProfessionPreference(profession.id)
              }
            >
              {isSelected ? "★" : "☆"}
            </button>

            <div className="directory-card-body directory-card-body-icon">
              <CardIcon name={profession.iconName} />
              <h3 className="home-category-title">{profession.title}</h3>
            </div>
          </article>
        );
      })}
    </div>
  );
}
