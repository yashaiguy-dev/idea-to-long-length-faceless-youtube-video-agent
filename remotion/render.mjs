import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";

const outputDir = process.argv[2];
const filmPreset = process.argv[3] || "clean_modern";
const outputFile = process.argv[4] || path.join(outputDir, "final.mp4");

if (!outputDir) {
  console.error("Usage: node render.mjs <outputDir> [filmPreset] [outputFile]");
  process.exit(1);
}

const entry = path.join(import.meta.dirname, "src", "index.tsx");

async function main() {
  console.log(`Bundling Remotion project...`);
  const bundled = await bundle({ entryPoint: entry });

  const inputProps = { outputDir: path.resolve(outputDir), filmPreset };

  console.log(`Selecting composition...`);
  const composition = await selectComposition({
    serveUrl: bundled,
    id: "ViralBrollVideo",
    inputProps,
  });

  console.log(`Rendering ${composition.durationInFrames} frames at ${composition.fps}fps...`);
  await renderMedia({
    composition,
    serveUrl: bundled,
    codec: "h264",
    outputLocation: outputFile,
    inputProps,
  });

  console.log(`Done: ${outputFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
