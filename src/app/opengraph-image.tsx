import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0F0F0F",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          position: "relative",
          fontFamily: "monospace",
        }}
      >
        {/* Dot grid simulation — row of faint dots */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, #ffffff08 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            display: "flex",
          }}
        />

        {/* Orange accent line top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 80,
            right: 80,
            height: "2px",
            background: "#FF6B00",
            display: "flex",
          }}
        />

        {/* Top: logo badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              background: "#0F0F0F",
              border: "1px solid #2a2a2a",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: "#F0F0F0" }}>
              MC<span style={{ color: "#FF6B00" }}>.</span>
            </span>
          </div>
          <span
            style={{
              fontSize: 12,
              letterSpacing: "0.3em",
              color: "#FF6B00",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Portfolio
          </span>
        </div>

        {/* Center: name */}
        <div style={{ display: "flex", flexDirection: "column", zIndex: 1 }}>
          <span
            style={{
              fontSize: 110,
              fontWeight: 900,
              color: "#F0F0F0",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            MANAS
          </span>
          <span
            style={{
              fontSize: 110,
              fontWeight: 900,
              color: "transparent",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              WebkitTextStroke: "1.5px #FF6B00",
            }}
          >
            CHANDRA
          </span>
        </div>

        {/* Bottom: tagline + label */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            zIndex: 1,
          }}
        >
          <span style={{ fontSize: 18, color: "#888", maxWidth: 520, lineHeight: 1.5 }}>
            Building intelligent web experiences at the intersection of design and engineering.
          </span>
          <span
            style={{
              fontSize: 13,
              letterSpacing: "0.2em",
              color: "#444",
              textTransform: "uppercase",
            }}
          >
            Full-Stack Developer · Mumbai
          </span>
        </div>

        {/* Orange accent line bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 80,
            right: 80,
            height: "1px",
            background: "#222",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
