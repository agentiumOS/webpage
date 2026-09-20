import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iOS applies its own mask, so no rounded corners here. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#121826",
          position: "relative",
        }}
      >
        <div style={{ fontSize: 120, fontWeight: 600, color: "#f3f6fc", lineHeight: 1, marginTop: -4 }}>
          A
        </div>
        <div
          style={{
            position: "absolute",
            top: 28,
            right: 28,
            width: 32,
            height: 32,
            borderRadius: 16,
            background: "#2f6bff",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
