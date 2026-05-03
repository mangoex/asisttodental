"use client";

export type MetaEventName =
  | "PageView"
  | "Lead"
  | "Contact"
  | "InitiateCheckout"
  | "ViewContent";

type MetaEventPayload = {
  eventName: MetaEventName;
  eventId?: string;
  customData?: Record<string, unknown>;
  sourceUrl?: string;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function createEventId(eventName: MetaEventName) {
  return `${eventName}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function sendServerEvent(payload: MetaEventPayload) {
  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/meta", blob);
    return;
  }

  void fetch("/api/meta", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

export function trackMetaEvent(
  eventName: MetaEventName,
  customData: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;

  const eventId = createEventId(eventName);

  window.fbq?.("track", eventName, customData, { eventID: eventId });
  sendServerEvent({
    eventName,
    eventId,
    customData,
    sourceUrl: window.location.href,
  });
}
