"use client";

import { useReportWebVitals } from "next/web-vitals";
import { track } from "@/lib/analytics";

type Metric = Parameters<Parameters<typeof useReportWebVitals>[0]>[0];

// Stable reference so the hook never reports a metric twice.
function report(metric: Metric) {
  // CLS is a unitless score; GA4 metrics are integers, so scale it.
  const scale = metric.name === "CLS" ? 1000 : 1;
  track("web_vitals", {
    metric_name: metric.name,
    metric_value: Math.round(metric.value * scale),
    metric_delta: Math.round(metric.delta * scale),
    metric_rating: metric.rating,
    metric_id: metric.id,
    navigation_type: metric.navigationType ?? "",
  });
}

export function WebVitals() {
  useReportWebVitals(report);
  return null;
}
