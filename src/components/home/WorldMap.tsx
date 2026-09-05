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

type FlagMarker = { flag: string; name: string; lng: number; lat: number };

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
      className="w-full overflow-hidden rounded-sm"
      style={{ aspectRatio: "800 / 340" }}
    >
      <ComposableMap
        projection="geoEquirectangular"
        projectionConfig={{ scale: 160, center: [14, 0] }}
        width={800}
        height={350}
        style={{ width: "100%", height: "auto", display: "block" }}
      >
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

        {/* Flag pins — one per origin country, pulsing on its coordinate. */}
        {countries?.map((c) => (
          <Marker key={c.flag} coordinates={[c.lng, c.lat]}>
            <PingRings r={11} />
            <image
              href={`/images/flags/${c.flag}.svg`}
              x={-12}
              y={-8}
              width={24}
              height={16}
              preserveAspectRatio="xMidYMid slice"
            />
            <text
              y={30}
              textAnchor="middle"
              style={{
                fill: "var(--color-accent-hover)",
                fontSize: 15,
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
        ))}

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
