import type { Metadata, Viewport } from "next";
import { Faculty_Glyphic, Lexend, Martian_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MotionProvider } from "@/components/interactive/reveal";
import { IS_PRODUCTION_ORIGIN, SITE_ORIGIN } from "@/lib/site-config";

const faculty = Faculty_Glyphic({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-faculty",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const lexend = Lexend({
  weight: ["400", "500", "600"],
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
    default: "Agentium — Everything you need to make agents in TypeScript",
    template: "%s — Agentium",
  },
  description:
    "Build agent applications with models, tools, memory, teams, workflows, and runtime integrations in one TypeScript framework.",
  applicationName: "Agentium",
  robots: IS_PRODUCTION_ORIGIN ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Agentium",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f5ef",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${faculty.variable} ${lexend.variable} ${martian.variable} h-full antialiased`}
    >
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
      </body>
    </html>
  );
}
