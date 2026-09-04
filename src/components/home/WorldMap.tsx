"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { networkNodes } from "@/content/globalNetwork";

// 09 · FROM SEOUL TO THE WORLD.
// Vector world map (react-simple-maps). Markers are driven by `networkNodes`
// (the same source as the network table), so every real node's lng/lat places
// its marker — no hand-tuned pixels. The topojson is bundled locally
// (public/data), so there's no map API or runtime key.
const GEO_URL = "/data/countries-110m.json";

export function WorldMap({ seoulLabel }: { seoulLabel: string }) {
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
        {networkNodes.map((node) => (
          <Marker
            key={`${node.country}-${node.city}`}
            coordinates={[node.lng, node.lat]}
          >
            {/* two staggered pulsing rings for a clearly visible radar ping */}
            <circle
              r={7}
              className="animate-ping"
              style={{
                fill: "var(--color-accent)",
                opacity: 0.55,
                transformBox: "fill-box",
                transformOrigin: "center",
                animationDuration: "1.8s",
              }}
            />
            <circle
              r={7}
              className="animate-ping"
              style={{
                fill: "var(--color-accent)",
                opacity: 0.55,
                transformBox: "fill-box",
                transformOrigin: "center",
                animationDuration: "1.8s",
                animationDelay: "0.9s",
              }}
            />
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
