// "Faydali buldum" oylamasinda ayni ziyaretcinin ayni sayfaya birden
// fazla oy vermesini (sunucu tarafi hesap sistemi olmadigi icin)
// tarayici localStorage'i ile engeller -- kusursuz degil ama hesapsiz
// bir site icin makul bir denge, recentTools.ts ile ayni desen.

const STORAGE_KEY = "birimceviri:page-votes";

function readVotes(): Record<string, "up" | "down"> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function getVoteForPage(pageId: string): "up" | "down" | null {
  return readVotes()[pageId] ?? null;
}

export function recordVoteForPage(pageId: string, vote: "up" | "down") {
  if (typeof window === "undefined") return;
  try {
    const votes = readVotes();
    votes[pageId] = vote;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
  } catch {
    // localStorage kullanilamiyor -- sessizce yoksay
  }
}
