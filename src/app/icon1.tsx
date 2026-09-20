import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 112,
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 340,
            fontWeight: 600,
            color: "#f3f6fc",
            lineHeight: 1,
            marginTop: -12,
          }}
        >
          A
        </div>
        <div
          style={{
            position: "absolute",
            top: 84,
            right: 84,
            width: 88,
            height: 88,
            borderRadius: 44,
            background: "#2f6bff",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
