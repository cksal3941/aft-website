"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { networkNodes } from "@/content/globalNetwork";

// 09 · FROM SEOUL TO THE WORLD.
// Vector world map (react-simple-maps). The topojson is bundled locally
// (public/data), so there's no map API or runtime key.
//
// Two marker modes:
//   • `countries` given → a pulsing flag pinned at each country's lng/lat
//     (used to show the global youth community across many countries).
//   • otherwise → the founding-node radar pings driven by `networkNodes`.
const GEO_URL = "/data/countries-110m.json";

type FlagMarker = {
  flag: string;
  name: string;
  lng: number;
  lat: number;
  student: { name?: string; photo: string };
};

// Reusable radar-ping rings drawn behind a marker.
function PingRings({ r = 10 }: { r?: number }) {
  const base = {
    r,
    fill: "var(--color-accent)",
    opacity: 0.4,
    transformBox: "fill-box" as const,
    transformOrigin: "center",
    animationDuration: "1.8s",
  };
  return (
    <>
      <circle className="animate-ping" style={base} />
      <circle className="animate-ping" style={{ ...base, animationDelay: "0.9s" }} />
    </>
  );
}

export function WorldMap({
  seoulLabel,
  countries,
}: {
  seoulLabel: string;
  countries?: FlagMarker[];
}) {
  return (
    <div
      className="w-full rounded-sm"
      style={{ aspectRatio: "800 / 300" }}
    >
      <ComposableMap
        projection="geoEquirectangular"
        // Tight vertical frame (~55°N → ~52°S): crops the empty Arctic Ocean off
        // the top and the empty Southern Ocean off the bottom, so the map band is
        // shorter (less dead space) and the markers sit larger. The land itself is
        // clipped to the box (see #map-clip). center lat pairs with height=300.
        projectionConfig={{ scale: 160, center: [14, 1.3] }}
        width={800}
        height={300}
        // overflow visible so the always-on face cards can float above the map's
        // top edge without being clipped. The land is clipped separately so it
        // can't spill sideways over the text next to the map.
        style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
      >
        <defs>
          {/* Clip the land to the map box → no horizontal/bottom spill. */}
          <clipPath id="map-clip">
            <rect x={0} y={0} width={800} height={300} />
          </clipPath>
        </defs>

        <g clipPath="url(#map-clip)">
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: "#96a3b8",
                      stroke: "#ffffff",
                      strokeWidth: 0.4,
                      outline: "none",
                    },
                    hover: {
                      fill: "#96a3b8",
                      stroke: "#ffffff",
                      strokeWidth: 0.4,
                      outline: "none",
                    },
                    pressed: { fill: "#96a3b8", outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
        </g>

        {/* Circular crop for the face photos (shared by every marker; the
            clip is evaluated in each marker's local space). */}
        <defs>
          <clipPath id="face-clip">
            <circle cx={0} cy={-54} r={23} />
          </clipPath>
        </defs>

        {/* Flag pins — one per origin country. The student's face + name sit
            above each pin, the country name below. Always visible (no hover). */}
        {countries?.map((c) => {
          // Rough pill width from the name (CJK glyphs are ~1.7× a latin one).
          const name = c.student.name;
          const pillW = name
            ? [...name].reduce(
                (w, ch) => w + (/[　-鿿가-힯]/.test(ch) ? 13 : 8),
                0,
              ) + 20
            : 0;
          return (
            <Marker key={c.flag} coordinates={[c.lng, c.lat]}>
              <PingRings r={11} />

              {/* Student face above the pin — only when a photo exists. */}
              {c.student.photo && (
                <>
                  {/* white ring behind the photo */}
                  <circle
                    cx={0}
                    cy={-54}
                    r={25}
                    fill="#ffffff"
                    stroke="var(--color-accent)"
                    strokeWidth={2.5}
                  />
                  <image
                    // encodeURI so non-ASCII (Korean) filenames resolve.
                    href={encodeURI(c.student.photo)}
                    x={-23}
                    y={-77}
                    width={46}
                    height={46}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#face-clip)"
                  />
                </>
              )}

              {/* Student name → a filled green "name tag" pill, so it reads as a
                  person and never blurs into the country label below the flag. */}
              {name && (
                <g>
                  <rect
                    x={-pillW / 2}
                    y={-28}
                    width={pillW}
                    height={18}
                    rx={9}
                    fill="var(--color-accent)"
                  />
                  <text
                    y={-15}
                    textAnchor="middle"
                    style={{
                      fill: "#ffffff",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {name}
                  </text>
                </g>
              )}

              <image
                href={`/images/flags/${c.flag}.svg`}
                x={-13}
                y={-8}
                width={26}
                height={17}
                preserveAspectRatio="xMidYMid slice"
              />
              {/* Country name → plain outlined green text below the flag. */}
              <text
                y={31}
                textAnchor="middle"
                style={{
                  fill: "var(--color-accent-hover)",
                  fontSize: 16,
                  fontWeight: 800,
                  letterSpacing: "0.02em",
                  paintOrder: "stroke",
                  stroke: "#ffffff",
                  strokeWidth: 3,
                  strokeLinejoin: "round",
                }}
              >
                {c.name}
              </text>
            </Marker>
          );
        })}

        {/* Founding-node pings (only when no country flags are supplied). */}
        {!countries &&
          networkNodes.map((node) => (
            <Marker
              key={`${node.country}-${node.city}`}
              coordinates={[node.lng, node.lat]}
            >
              <PingRings r={7} />
              <circle
                r={5}
                style={{
                  fill: "var(--color-accent)",
                  stroke: "#ffffff",
                  strokeWidth: 1.6,
                }}
              />
              <text
                y={30}
                textAnchor="middle"
                style={{
                  fill: "var(--color-accent-hover)",
                  fontSize: 16,
                  fontWeight: 800,
                  letterSpacing: "0.02em",
                  paintOrder: "stroke",
                  stroke: "#ffffff",
                  strokeWidth: 3,
                  strokeLinejoin: "round",
                }}
              >
                {node.founded ? seoulLabel : node.country}
              </text>
            </Marker>
          ))}
      </ComposableMap>
    </div>
  );
}
