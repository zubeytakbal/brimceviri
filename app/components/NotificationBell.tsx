"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Bell, X } from "@phosphor-icons/react";
import {
  getSeenNotificationIdsServerSnapshot,
  getSeenNotificationIdsSnapshot,
  markNotificationSeen,
  subscribeToSeenNotifications,
} from "../converter/notificationDismissal";
import { useNotificationSlot } from "./NotificationSlotProvider";
import type { SiteNotification } from "../converter/siteNotifications";

function formatDate(date: string): string {
  try {
    return new Date(`${date}T00:00:00`).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return date;
  }
}

export default function NotificationBell({
  notifications,
}: {
  notifications: SiteNotification[];
}) {
  const seenIds = useSyncExternalStore(
    subscribeToSeenNotifications,
    getSeenNotificationIdsSnapshot,
    getSeenNotificationIdsServerSnapshot,
  );

  // manualOverride null oldugu surece panel, gorulmemis bildirim varsa
  // kendiliginden acik sayilir (turetilmis durum, effect gerekmez);
  // kullanici bir kere acar/kapatirsa o andan sonra tercihi geceli olur.
  const [manualOverride, setManualOverride] = useState<boolean | null>(null);

  const unseenCount = notifications.filter((item) => !seenIds.includes(item.id)).length;
  const isOpen = manualOverride ?? unseenCount > 0;

  // Zil butonu, SiteHeader'in kaydettigi slot elemanina (Context uzerinden,
  // ref callback ile doldurulur) portal ile tasinir -- boylece gercek ust
  // menunun (beyaz serit) icinde, sayfayla birlikte kayarak durur.
  // Ref callback'ler commit sonrasi (hydration bittikten sonra) calistigi
  // icin sunucu ve ilk istemci render'i her zaman ayni kalir (slot=null),
  // document.getElementById gibi bir kontrolde oldugu gibi hydration
  // uyumsuzlugu olusmaz.
  const { slotElement } = useNotificationSlot();

  if (notifications.length === 0) {
    return null;
  }

  const bellButton = (
    <button
      type="button"
      className="notification-bell-button"
      onClick={() => setManualOverride(!isOpen)}
      aria-label="Bildirimler"
    >
      <Bell size={22} weight="fill" />
      {unseenCount > 0 && <span className="notification-bell-badge">{unseenCount}</span>}
    </button>
  );

  return (
    <>
      {slotElement ? createPortal(bellButton, slotElement) : null}

      {isOpen && (
        <div
          className="notification-overlay"
          role="presentation"
          onClick={() => setManualOverride(false)}
        >
          <div
            className="notification-panel"
            role="dialog"
            aria-label="Site bildirimleri"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="notification-panel-head">
              <h2>Bildirimler</h2>
              <button
                type="button"
                className="notification-panel-close"
                onClick={() => setManualOverride(false)}
                aria-label="Kapat"
              >
                <X size={18} />
              </button>
            </div>

            <ul className="notification-panel-list">
              {notifications.map((item) => {
                const isUnseen = !seenIds.includes(item.id);
                return (
                  <li key={item.id} className={isUnseen ? "is-unseen" : undefined}>
                    <div className="notification-item-head">
                      {isUnseen && <span className="notification-item-dot" aria-hidden="true" />}
                      <strong>{item.title}</strong>
                      <button
                        type="button"
                        className="notification-item-dismiss"
                        onClick={() => markNotificationSeen(item.id)}
                        aria-label="Bu bildirimi gördüm olarak işaretle"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <p>{item.message}</p>
                    <div className="notification-item-foot">
                      {item.href && (
                        <Link href={item.href} onClick={() => setManualOverride(false)}>
                          Aç →
                        </Link>
                      )}
                      <span>{formatDate(item.date)}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
