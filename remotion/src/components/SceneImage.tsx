import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { KenBurnsConfig } from "../types";

const KEN_BURNS_PRESETS: Record<string, KenBurnsConfig> = {
  pan_right: { startX: 0, endX: -3, startY: 0, endY: 0, startScale: 1.05, endScale: 1.05 },
  pan_left: { startX: 0, endX: 3, startY: 0, endY: 0, startScale: 1.05, endScale: 1.05 },
  zoom_in: { startX: 0, endX: 0, startY: 0, endY: 0, startScale: 1.0, endScale: 1.08 },
  zoom_out: { startX: 0, endX: 0, startY: 0, endY: 0, startScale: 1.08, endScale: 1.0 },
  pan_up: { startX: 0, endX: 0, startY: 0, endY: 3, startScale: 1.05, endScale: 1.05 },
  zoom_in_pan_right: { startX: 0, endX: -2, startY: 0, endY: 0, startScale: 1.0, endScale: 1.06 },
};

interface SceneImageProps {
  src: string;
  kenBurns: string;
  fadeInFrames?: number;
  fadeOutFrames?: number;
}

export const SceneImage: React.FC<SceneImageProps> = ({
  src,
  kenBurns,
  fadeInFrames = 8,
  fadeOutFrames = 8,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const config = KEN_BURNS_PRESETS[kenBurns] ?? KEN_BURNS_PRESETS.zoom_in;

  const translateX = interpolate(frame, [0, durationInFrames], [config.startX, config.endX], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(frame, [0, durationInFrames], [config.startY, config.endY], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [0, durationInFrames], [config.startScale, config.endScale], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeIn = interpolate(frame, [0, fadeInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOutStart = Math.max(fadeInFrames, durationInFrames - fadeOutFrames);
  const fadeOut = interpolate(frame, [fadeOutStart, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", opacity }}>
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `translate(${translateX}%, ${translateY}%) scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
};
