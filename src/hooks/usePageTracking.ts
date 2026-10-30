import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

type DataLayerEntry = Record<string, unknown>;

export function usePageTracking() {
  const location = useLocation();
  const isInitial = useRef(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }

    const dl = window.dataLayer;
    if (!dl) return;

    const entry: DataLayerEntry = {
      event: "pageview",
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    };

    dl.push(entry);
  }, [location]);
}
