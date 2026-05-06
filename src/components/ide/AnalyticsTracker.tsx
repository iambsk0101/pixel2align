import { useEffect, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { trackPageView, trackFileView } from "@/utils/analytics.functions";
import { useIde } from "./IdeContext";

function getSessionId(): string {
  try {
    let s = sessionStorage.getItem("p2a-sid");
    if (!s) {
      s = crypto.randomUUID();
      sessionStorage.setItem("p2a-sid", s);
    }
    return s;
  } catch {
    return "anon";
  }
}

export function AnalyticsTracker() {
  const ide = useIde();
  const trackPV = useServerFn(trackPageView);
  const trackFV = useServerFn(trackFileView);
  const sentInitial = useRef(false);
  const lastFile = useRef<string | null>(null);

  useEffect(() => {
    if (sentInitial.current) return;
    sentInitial.current = true;
    trackPV({
      data: {
        path: window.location.pathname,
        referrer: document.referrer || undefined,
        sessionId: getSessionId(),
        userAgent: navigator.userAgent.slice(0, 500),
      },
    }).catch(() => {});
  }, [trackPV]);

  useEffect(() => {
    if (!ide.activeTab) return;
    if (lastFile.current === ide.activeTab) return;
    lastFile.current = ide.activeTab;
    trackFV({ data: { fileId: ide.activeTab, sessionId: getSessionId() } }).catch(() => {});
  }, [ide.activeTab, trackFV]);

  return null;
}
