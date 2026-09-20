import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
};

/**
 * Shared Open Graph card. Rendered at build time per route via the
 * `opengraph-image.tsx` file convention. Uses Satori's built-in font so no
 * font files need to ship with the repo.
 */
export function renderOgImage({ eyebrow, title, description }: Props) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #f3f6fc 0%, #e8edf6 100%)",
          color: "#121826",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#121826",
              color: "#f3f6fc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 600,
            }}
          >
            A
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.5 }}>Agentium</div>
          <div
            style={{
              marginLeft: 12,
              fontSize: 20,
              color: "#5a6578",
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.08, letterSpacing: -2, maxWidth: 1000 }}>
            {title}
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.4, color: "#5a6578", maxWidth: 980 }}>{description}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 20px",
              borderRadius: 12,
              background: "#121826",
              color: "#f3f6fc",
              fontSize: 22,
              fontFamily: "monospace",
            }}
          >
            <span style={{ color: "#2f6bff" }}>$</span>
            npm install @agentium/core
          </div>
          <div style={{ fontSize: 22, color: "#5a6578" }}>agentium.in</div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
