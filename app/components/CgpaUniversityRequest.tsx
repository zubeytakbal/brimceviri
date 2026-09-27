"use client";

// "Universiten listede yok mu?" formu: istek sayilir, resmi formulu
// dogrulanan universite listeye eklenir.
import { useState } from "react";
import Link from "@/app/components/SiteLink";

export default function CgpaUniversityRequest() {
  const [name, setName] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "recorded" | "listed" | "invalid" | "limited" | "error">("idle");
  const [listedSlug, setListedSlug] = useState<string | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (name.trim().length < 2) {
      setState("invalid");
      return;
    }
    setState("sending");
    try {
      const response = await fetch("/api/cgpa-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ university: name }),
      });
      const data = (await response.json().catch(() => ({}))) as { status?: string; slug?: string; error?: string };
      if (data.status === "already_listed" && data.slug) {
        setListedSlug(data.slug);
        setState("listed");
      } else if (data.status === "recorded") {
        setState("recorded");
        setName("");
      } else if (response.status === 429) {
        setState("limited");
      } else if (data.error === "invalid_name") {
        setState("invalid");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  return (
    <form className="cgpa-request" onSubmit={submit}>
      <label className="category-general-converter-field">
        <span>University name</span>
        <input
          type="text"
          value={name}
          maxLength={120}
          placeholder="e.g. University of Mumbai"
          onChange={(event) => {
            setName(event.target.value);
            if (state !== "sending") setState("idle");
          }}
        />
      </label>
      <button type="submit" className="engineering-target-button" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Request my university"}
      </button>
      <p aria-live="polite" className="cgpa-source-check-result">
        {state === "recorded" && "Thank you — request recorded. We add a university once its official CGPA-to-percentage rule is confirmed."}
        {state === "listed" && listedSlug && (
          <>
            Good news: it is already listed.{" "}
            <Link href={`/en/cgpa-to-percentage/${listedSlug}`}>Open its CGPA calculator</Link>.
          </>
        )}
        {state === "invalid" && "Please enter the university name (letters only, no links)."}
        {state === "limited" && "You have sent several requests today. Please try again tomorrow."}
        {state === "error" && "The request could not be sent right now. Please try again later."}
        {state === "idle" && "We only list formulas confirmed in an official document, so the most requested universities are checked first."}
      </p>
    </form>
  );
}
