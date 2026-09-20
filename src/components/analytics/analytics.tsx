import { GoogleAnalytics } from "@next/third-parties/google";
import { GA_DEBUG_MODE, GA_MEASUREMENT_ID } from "@/lib/site-config";
import { ClickTracker } from "./click-tracker";
import { SectionObserver } from "./section-observer";
import { WebVitals } from "./web-vitals";

/**
 * Loads GA4 (gtag.js via @next/third-parties, after hydration) and the
 * site-wide event collectors. The tag itself is only rendered when a
 * measurement ID is configured, so local builds and forks send no data; the
 * collectors still run and push to `window.dataLayer`, which keeps the event
 * layer testable without a network.
 *
 * Page views: rely on GA4 Enhanced Measurement ("Page changes based on
 * browser history events") for client-side navigations. Do not send manual
 * page_view events as well.
 */
export function Analytics() {
  return (
    <>
      {GA_MEASUREMENT_ID ? <GoogleAnalytics gaId={GA_MEASUREMENT_ID} debugMode={GA_DEBUG_MODE} /> : null}
      <ClickTracker />
      <SectionObserver />
      <WebVitals />
    </>
  );
}
