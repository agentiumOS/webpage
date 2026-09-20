import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { cn } from "cn";
import { AssemblySculpture, RoutingSculpture } from "./sculptures";

export type ArtworkId = "jev" | "assembly";

const ASSETS: Record<
  ArtworkId,
  { file: string; width: number; height: number; Fallback: (p: { className?: string }) => React.JSX.Element }
> = {
  jev: { file: "jev-decisions.png", width: 1536, height: 1024, Fallback: RoutingSculpture },
  assembly: { file: "agentium-assembly.png", width: 1672, height: 941, Fallback: AssemblySculpture },
};

function hasRaster(file: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "images", file));
  } catch {
    return false;
  }
}

type Props = {
  id: ArtworkId;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Decorative artwork slot. Renders the optimized raster from `public/images/`
 * when the original PNG has been supplied; otherwise renders an authored SVG
 * sculpture in the same palette so the slot is never blank.
 * Both are decorative (`alt=""`): adjacent copy carries the meaning.
 */
export function Artwork({ id, className, sizes, priority = false }: Props) {
  const asset = ASSETS[id];
  if (hasRaster(asset.file)) {
    return (
      <Image
        src={`/images/${asset.file}`}
        width={asset.width}
        height={asset.height}
        alt=""
        sizes={sizes}
        priority={priority}
        decoding={priority ? "auto" : "async"}
        className={cn("h-full w-full object-contain", className)}
      />
    );
  }
  const Fallback = asset.Fallback;
  return <Fallback className={cn("h-full w-full", className)} />;
}
