import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

interface TransitionEffectProps {
  type: "dissolve" | "white_flash" | "fade_black";
  durationFrames?: number;
}

export const TransitionEffect: React.FC<TransitionEffectProps> = ({
  type,
  durationFrames = 8,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  if (type === "white_flash") {
    const flashStart = durationInFrames - durationFrames;
    const flashOpacity = interpolate(
      frame,
      [flashStart, flashStart + Math.floor(durationFrames / 2), flashStart + durationFrames],
      [0, 1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
    return (
      <AbsoluteFill
        style={{ backgroundColor: "#FFFFFF", opacity: flashOpacity, pointerEvents: "none" }}
      />
    );
  }

  if (type === "fade_black") {
    const fadeStart = durationInFrames - durationFrames;
    const fadeOpacity = interpolate(frame, [fadeStart, durationInFrames], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return (
      <AbsoluteFill
        style={{ backgroundColor: "#000000", opacity: fadeOpacity, pointerEvents: "none" }}
      />
    );
  }

  return null;
};
