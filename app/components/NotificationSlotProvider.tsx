"use client";

// SiteHeader (ust menu) ve sayfa icerigi (children) layout.tsx altinda
// kardes agaclardir, dogrudan Context akisi olmaz -- bu yuzden ikisinin
// ortak atasi olan bu Provider, header'daki bos slot div'ini (ref
// callback ile, hicbir useEffect/setState-in-effect sorunu olmadan)
// kaydedip sayfa icindeki NotificationBell'e portal hedefi olarak
// sunar. Ref callback'ler commit sonrasi (hydration bittikten sonra)
// calistigi icin sunucu/istemci ilk render'i her zaman ayni kalir
// (slotElement = null), hydration uyumsuzlugu olusmaz.

import { createContext, useContext, useState, type ReactNode } from "react";

const NotificationSlotContext = createContext<{
  slotElement: HTMLElement | null;
  setSlotElement: (node: HTMLElement | null) => void;
}>({
  slotElement: null,
  setSlotElement: () => {},
});

export function NotificationSlotProvider({ children }: { children: ReactNode }) {
  const [slotElement, setSlotElement] = useState<HTMLElement | null>(null);

  return (
    <NotificationSlotContext.Provider value={{ slotElement, setSlotElement }}>
      {children}
    </NotificationSlotContext.Provider>
  );
}

export function useNotificationSlot() {
  return useContext(NotificationSlotContext);
}
