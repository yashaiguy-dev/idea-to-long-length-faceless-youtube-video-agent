import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FilmPreset } from "../types";

const FILM_PRESETS: Record<string, FilmPreset> = {
  clean_modern: { filter: "contrast(1.04) saturate(1.05)", grain: 0, vignette: 0 },
  vintage_film: { filter: "contrast(1.08) saturate(0.85) brightness(0.95) sepia(0.15)", grain: 0.12, vignette: 0.5 },
  bw_documentary: { filter: "grayscale(1) contrast(1.15) brightness(0.92)", grain: 0.18, vignette: 0.6 },
  dark_cinematic: { filter: "contrast(1.12) saturate(0.7) brightness(0.88)", grain: 0.08, vignette: 0.4 },
  sepia_archival: { filter: "sepia(0.6) contrast(1.05) brightness(0.9)", grain: 0.22, vignette: 0.7 },
  none: { filter: "none", grain: 0, vignette: 0 },
};

interface FilmGrainProps {
  preset: string;
  children: React.ReactNode;
}

export const FilmGrain: React.FC<FilmGrainProps> = ({ preset, children }) => {
  const frame = useCurrentFrame();
  const config = FILM_PRESETS[preset] ?? FILM_PRESETS.none;

  const grainSeed = Math.floor(frame / 2);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ filter: config.filter }}>
        {children}
      </AbsoluteFill>

      {config.vignette > 0 && (
        <AbsoluteFill
          style={{
            background: `radial-gradient(circle at center, transparent 45%, rgba(0,0,0,${config.vignette}) 100%)`,
            pointerEvents: "none",
          }}
        />
      )}

      {config.grain > 0 && (
        <AbsoluteFill
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='${grainSeed}' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            opacity: config.grain,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
