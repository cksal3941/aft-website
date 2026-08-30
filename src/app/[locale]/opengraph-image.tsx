import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";

// Branded link-share card (KakaoTalk / Slack / social). Applies to all
// [locale] routes as the default OG image. Kept English-only on purpose:
// next/og (satori) ships no Korean glyphs, so Hangul would render as tofu.
export const alt = "AFT — Arts For Tomorrow";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// satori's built-in font is single-weight, so fontWeight has no visible effect.
// Load real Inter weights (only the glyphs we use) so AFT can render heavy.
const FONT_TEXT =
  "AFT ARTS FOR TOMORROW YOUNG ARTISTS. GLOBAL IMPACT. Founded in Seoul. Built the World.";

async function loadInter(weight: number): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&text=${encodeURIComponent(
    FONT_TEXT
  )}`;
  const css = await (await fetch(url)).text();
  const src = css.match(/src: url\((.+?)\) format\(/);
  if (!src) throw new Error("Inter font could not be loaded");
  return (await fetch(src[1])).arrayBuffer();
}

export default async function OpengraphImage() {
  // Same globe image used in the home support section, embedded as a data URI
  // so it resolves during server-side image generation (dev + build).
  const bg = readFileSync(
    join(process.cwd(), "public/images/support-earth-2.jpg")
  );
  const bgData = `data:image/jpeg;base64,${bg.toString("base64")}`;

  const [interBlack, interMedium] = await Promise.all([
    loadInter(900),
    loadInter(600),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          fontFamily: "Inter",
          color: "white",
        }}
      >
        {/* Background photo */}
        <img
          src={bgData}
          width={size.width}
          height={size.height}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Black transparent overlay (darker toward the bottom for legibility) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 80px",
          }}
        >
          {/* Wordmark */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 20 }}>
            <div
              style={{
                fontSize: 68,
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: -2,
              }}
            >
              AFT
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: 4,
                paddingBottom: 6,
                color: "white",
              }}
            >
              ARTS FOR TOMORROW
            </div>
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 100,
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: -3,
              }}
            >
              YOUNG ARTISTS.
            </div>
            <div
              style={{
                fontSize: 100,
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: -3,
              }}
            >
              GLOBAL IMPACT.
            </div>
          </div>

          {/* Footer tagline */}
          <div
            style={{
              fontSize: 30,
              fontWeight: 600,
              color: "rgba(255,255,255,0.82)",
            }}
          >
            Founded in Seoul. Built for the World.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interBlack, weight: 900, style: "normal" },
        { name: "Inter", data: interMedium, weight: 600, style: "normal" },
      ],
    }
  );
}
