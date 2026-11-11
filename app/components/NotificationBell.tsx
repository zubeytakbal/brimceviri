"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Link from "@/app/components/SiteLink";
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

type NotificationLocale = "tr" | "en" | "de";

const notificationCopy = {
  tr: {
    ariaLabel: "Bildirimler",
    panelLabel: "Site bildirimleri",
    title: "Bildirimler",
    closeLabel: "Kapat",
    markSeenLabel: "Bu bildirimi gördüm olarak işaretle",
    openLabel: "Aç →",
    empty: "Şu anda yeni bildirim yok.",
    dateLocale: "tr-TR",
  },
  en: {
    ariaLabel: "Notifications",
    panelLabel: "Site notifications",
    title: "Notifications",
    closeLabel: "Close",
    markSeenLabel: "Mark this notification as seen",
    openLabel: "Open \u2192",
    empty: "There are no new notifications right now.",
    dateLocale: "en-US",
  },
  de: {
    ariaLabel: "Benachrichtigungen",
    panelLabel: "Website-Benachrichtigungen",
    title: "Benachrichtigungen",
    closeLabel: "Schließen",
    markSeenLabel: "Diese Benachrichtigung als gelesen markieren",
    openLabel: "Öffnen →",
    empty: "Derzeit gibt es keine neuen Benachrichtigungen.",
    dateLocale: "de-DE",
  },
} as const;

function formatDate(date: string, locale: NotificationLocale): string {
  try {
    return new Date(`${date}T00:00:00`).toLocaleDateString(
      notificationCopy[locale].dateLocale,
      {
      day: "numeric",
      month: "long",
      year: "numeric",
      },
    );
  } catch {
    return date;
  }
}

export default function NotificationBell({
  notifications,
  locale = "tr",
  showWhenEmpty = false,
  renderInline = false,
}: {
  notifications: SiteNotification[];
  locale?: NotificationLocale;
  showWhenEmpty?: boolean;
  renderInline?: boolean;
}) {
  const copy = notificationCopy[locale];
  const seenIds = useSyncExternalStore(
    subscribeToSeenNotifications,
    getSeenNotificationIdsSnapshot,
    getSeenNotificationIdsServerSnapshot,
  );

  // Panel yalnizca zile tiklaninca acilir. Kendiliginden acilan panel,
  // aramadan gelen ziyaretcinin sayfayi gormesini engelliyordu ve kapatmak
  // bildirimi "goruldu" yapmadigi icin her ziyarette tekrar aciliyordu.
  // Gorulmemis bildirim sayisi zilin uzerindeki rozette gorunur.
  const [isOpen, setIsOpen] = useState(false);

  const unseenCount = notifications.filter((item) => !seenIds.includes(item.id)).length;

  // Zil butonu, SiteHeader'in kaydettigi slot elemanina (Context uzerinden,
  // ref callback ile doldurulur) portal ile tasinir -- boylece gercek ust
  // menunun (beyaz serit) icinde, sayfayla birlikte kayarak durur.
  // Ref callback'ler commit sonrasi (hydration bittikten sonra) calistigi
  // icin sunucu ve ilk istemci render'i her zaman ayni kalir (slot=null),
  // document.getElementById gibi bir kontrolde oldugu gibi hydration
  // uyumsuzlugu olusmaz.
  const { slotElement } = useNotificationSlot();

  if (notifications.length === 0 && !showWhenEmpty) {
    return null;
  }

  const bellButton = (
    <button
      type="button"
      className="notification-bell-button"
      onClick={() => setIsOpen(!isOpen)}
      aria-label={copy.ariaLabel}
    >
      <Bell size={22} weight="fill" />
      {unseenCount > 0 && <span className="notification-bell-badge">{unseenCount}</span>}
    </button>
  );

  return (
    <>
      {renderInline
        ? bellButton
        : slotElement
          ? createPortal(bellButton, slotElement)
          : null}

      {isOpen && (
        <div
          className="notification-overlay"
          role="presentation"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="notification-panel"
            role="dialog"
            aria-label={copy.panelLabel}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="notification-panel-head">
              <h2>{copy.title}</h2>
              <button
                type="button"
                className="notification-panel-close"
                onClick={() => setIsOpen(false)}
                aria-label={copy.closeLabel}
              >
                <X size={18} />
              </button>
            </div>

            <ul className="notification-panel-list">
              {notifications.length === 0 ? (
                <li>
                  <p>{copy.empty}</p>
                </li>
              ) : notifications.map((item) => {
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
                        aria-label={copy.markSeenLabel}
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <p>{item.message}</p>
                    <div className="notification-item-foot">
                      {item.href && (
                        <Link href={item.href} onClick={() => setIsOpen(false)}>
                          {copy.openLabel}
                        </Link>
                      )}
                      <span>{formatDate(item.date, locale)}</span>
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
