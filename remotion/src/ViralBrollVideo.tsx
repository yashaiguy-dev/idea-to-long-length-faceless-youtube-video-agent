import { AbsoluteFill, Audio, CalculateMetadataFunction, Sequence, staticFile } from "remotion";
import { SceneImage } from "./components/SceneImage";
import { CaptionOverlay } from "./components/CaptionOverlay";
import { FilmGrain } from "./components/FilmGrain";
import { TransitionEffect } from "./components/TransitionEffect";
import { SceneData, ViralBrollProps, WordTimestamp } from "./types";

const FPS = 30;

function resolveAsset(src: string): string {
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  const clean = src.replace(/^file:\/\/\/?/, "");
  if (clean.startsWith("/") || /^[A-Za-z]:[/\\]/.test(clean)) {
    return `file:///${clean.replace(/\\/g, "/")}`;
  }
  return staticFile(clean);
}

function loadJSON(outputDir: string, filename: string): unknown {
  const fs = require("fs");
  const path = require("path");
  const fullPath = path.join(outputDir, filename);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

export const calculateViralBrollMetadata: CalculateMetadataFunction<ViralBrollProps> = async ({
  props,
}) => {
  const scenes = loadJSON(props.outputDir, "scenes.json") as { scenes: SceneData[] };
  const totalSeconds = scenes.scenes.reduce((sum, s) => sum + s.duration, 0);

  return {
    durationInFrames: Math.max(1, Math.ceil(totalSeconds * FPS)),
    fps: FPS,
    width: 1920,
    height: 1080,
  };
};

export const ViralBrollVideo: React.FC<ViralBrollProps> = ({ outputDir, filmPreset }) => {
  const scenesData = loadJSON(outputDir, "scenes.json") as { scenes: SceneData[] };
  const words = loadJSON(outputDir, "words.json") as WordTimestamp[];

  const scenes = scenesData.scenes;
  let currentFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <FilmGrain preset={filmPreset}>
        {scenes.map((scene, i) => {
          const durationFrames = Math.round(scene.duration * FPS);
          const fromFrame = currentFrame;
          currentFrame += durationFrames;

          const imagePath = resolveAsset(
            `${outputDir}/images/scene_${String(i + 1).padStart(3, "0")}.png`,
          );

          return (
            <Sequence key={i} from={fromFrame} durationInFrames={durationFrames}>
              <SceneImage src={imagePath} kenBurns={scene.ken_burns} />
              <TransitionEffect type={scene.transition} />
            </Sequence>
          );
        })}
      </FilmGrain>

      <Audio src={resolveAsset(`${outputDir}/narration.mp3`)} />

      <CaptionOverlay words={words} />
    </AbsoluteFill>
  );
};
