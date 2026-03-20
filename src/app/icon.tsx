import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0F0F0F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
          border: "1px solid #2a2a2a",
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            fontWeight: 700,
            color: "#F0F0F0",
            letterSpacing: "0.05em",
            lineHeight: 1,
          }}
        >
          MC
          <span style={{ color: "#FF6B00" }}>.</span>
        </span>
      </div>
    ),
    { ...size }
  );
}
