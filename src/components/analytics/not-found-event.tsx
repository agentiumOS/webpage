"use client";

import * as React from "react";
import { track } from "@/lib/analytics";

/** Reports a 404 view with the requested path and referrer. */
export function NotFoundEvent() {
  React.useEffect(() => {
    track("page_not_found", {
      page_path: window.location.pathname + window.location.search,
      referrer: document.referrer,
    });
  }, []);
  return null;
}
