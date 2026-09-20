import type { Metadata, Viewport } from "next";
import { Faculty_Glyphic, Lexend, Martian_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MotionProvider } from "@/components/interactive/reveal";
import { Analytics } from "@/components/analytics/analytics";
import { POSITIONING, SITE_NAME, routeManifest } from "@/content/route-manifest";
import { IS_INDEXABLE, SITE_ORIGIN } from "@/lib/site-config";

const faculty = Faculty_Glyphic({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-faculty",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const lexend = Lexend({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const martian = Martian_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-martian",
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: routeManifest["/"].title,
    template: `%s — ${SITE_NAME}`,
  },
  description: POSITIONING,
  applicationName: SITE_NAME,
  robots: IS_INDEXABLE
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f6fc",
  width: "device-width",
  initialScale: 1,
};

/**
 * Adds a `js` class before first paint so reveal animations can start hidden
 * only when JavaScript is available. Without JS every section renders visible.
 */
const JS_FLAG = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${faculty.variable} ${lexend.variable} ${martian.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-[8px] focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas focus:type-ui"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
