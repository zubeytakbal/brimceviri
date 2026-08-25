import { API_BASE } from "./config.js";

const categoryEl = document.getElementById("category");
const fromUnitEl = document.getElementById("fromUnit");
const toUnitEl = document.getElementById("toUnit");
const valueEl = document.getElementById("value");
const resultEl = document.getElementById("result");

let categories = [];

function optionsHtml(units) {
  return units
    .map(
      (unit) =>
        `<option value="${unit.symbol}">${unit.symbol} — ${unit.name}</option>`
    )
    .join("");
}

function populateUnits(categoryKey, preferredFrom, preferredTo) {
  const entry = categories.find((item) => item.category === categoryKey);
  const units = entry ? entry.units : [];

  fromUnitEl.innerHTML = optionsHtml(units);
  toUnitEl.innerHTML = optionsHtml(units);

  if (preferredFrom && units.some((unit) => unit.symbol === preferredFrom)) {
    fromUnitEl.value = preferredFrom;
  }

  if (preferredTo && units.some((unit) => unit.symbol === preferredTo)) {
    toUnitEl.value = preferredTo;
  } else if (units.length > 1) {
    toUnitEl.value = units[1].symbol;
  }
}

function findCategoryForUnitToken(unitToken) {
  if (!unitToken) {
    return null;
  }

  const normalized = unitToken.toLowerCase();

  for (const entry of categories) {
    const match = entry.units.find(
      (unit) => unit.symbol.toLowerCase() === normalized
    );

    if (match) {
      return { category: entry.category, symbol: match.symbol };
    }
  }

  return null;
}

async function runConversion() {
  const category = categoryEl.value;
  const from = fromUnitEl.value;
  const to = toUnitEl.value;
  const value = valueEl.value;

  if (!category || !from || !to || !value.trim()) {
    return;
  }

  const url = `${API_BASE}/api/v1/convert?category=${encodeURIComponent(
    category
  )}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(
    to
  )}&value=${encodeURIComponent(value)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      resultEl.textContent = data.error ?? "Bir hata oluştu.";
      resultEl.classList.add("is-error");
      return;
    }

    resultEl.textContent = `${data.value} ${data.from} = ${data.result} ${data.to}`;
    resultEl.classList.remove("is-error");
  } catch {
    resultEl.textContent = "API'ye bağlanılamadı.";
    resultEl.classList.add("is-error");
  }
}

async function applyPendingConversion() {
  const { pendingConversion } = await chrome.storage.session.get(
    "pendingConversion"
  );

  if (!pendingConversion) {
    return;
  }

  await chrome.storage.session.remove("pendingConversion");

  if (Number.isFinite(pendingConversion.value)) {
    valueEl.value = String(pendingConversion.value);
  }

  const matched = findCategoryForUnitToken(pendingConversion.unitToken);

  if (matched) {
    categoryEl.value = matched.category;
    populateUnits(matched.category, matched.symbol);
  }
}

async function init() {
  resultEl.textContent = "Kategoriler yükleniyor…";

  try {
    const response = await fetch(`${API_BASE}/api/v1/categories`);
    const data = await response.json();
    categories = data.categories;
  } catch {
    resultEl.textContent = "API'ye bağlanılamadı.";
    resultEl.classList.add("is-error");
    return;
  }

  categoryEl.innerHTML = categories
    .map((entry) => `<option value="${entry.category}">${entry.category}</option>`)
    .join("");

  if (categories[0]) {
    categoryEl.value = categories[0].category;
    populateUnits(categories[0].category);
  }

  await applyPendingConversion();
  await runConversion();

  categoryEl.addEventListener("change", () => {
    populateUnits(categoryEl.value);
    runConversion();
  });

  fromUnitEl.addEventListener("change", runConversion);
  toUnitEl.addEventListener("change", runConversion);
  valueEl.addEventListener("input", runConversion);
}

init();
