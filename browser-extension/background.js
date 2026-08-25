const MENU_ID = "birimceviri-convert-selection";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MENU_ID,
    title: 'BirimCeviri ile çevir: "%s"',
    contexts: ["selection"],
  });
});

function parseSelection(selectionText) {
  const match = selectionText
    .trim()
    .match(/(-?\d[\d.,]*)\s*([a-zA-ZğüşöçıİĞÜŞÖÇµ°²³/]+)?/);

  if (!match) {
    return null;
  }

  const rawNumber = match[1];
  const unitToken = match[2] ? match[2].trim() : null;

  const value = rawNumber.includes(",")
    ? parseFloat(rawNumber.replace(/\./g, "").replace(",", "."))
    : parseFloat(rawNumber);

  if (!Number.isFinite(value)) {
    return null;
  }

  return { value, unitToken };
}

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId !== MENU_ID || !info.selectionText) {
    return;
  }

  const parsed = parseSelection(info.selectionText);

  await chrome.storage.session.set({
    pendingConversion: parsed
      ? { ...parsed, receivedAt: Date.now() }
      : null,
  });

  if (chrome.action.openPopup) {
    try {
      await chrome.action.openPopup();
    } catch {
      // Bazi taraycilarda openPopup kullanici jesti disinda basarisiz
      // olabilir; kullanici simgeye tiklayinca zaten pendingConversion
      // okunacagi icin sessizce gecilir.
    }
  }
});
