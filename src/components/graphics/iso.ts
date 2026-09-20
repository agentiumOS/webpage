/** Minimal isometric projection helpers for authored SVG sculptures. */

const COS30 = Math.cos(Math.PI / 6);
const SIN30 = 0.5;

export type Iso = { ox: number; oy: number; s: number };

export function project(iso: Iso, x: number, y: number, z: number): [number, number] {
  return [iso.ox + (x - y) * COS30 * iso.s, iso.oy + (x + y) * SIN30 * iso.s - z * iso.s];
}

function pts(iso: Iso, points: [number, number, number][]): string {
  return points
    .map(([x, y, z]) => project(iso, x, y, z).map((n) => n.toFixed(1)).join(","))
    .join(" ");
}

export type BoxFaces = { top: string; left: string; right: string };

/** Box with min corner (x, y, z) and size (w along x, d along y, h along z). */
export function box(
  iso: Iso,
  x: number,
  y: number,
  z: number,
  w: number,
  d: number,
  h: number,
): BoxFaces {
  return {
    top: pts(iso, [
      [x, y, z + h],
      [x + w, y, z + h],
      [x + w, y + d, z + h],
      [x, y + d, z + h],
    ]),
    // face at y + d (appears lower-left)
    left: pts(iso, [
      [x, y + d, z],
      [x + w, y + d, z],
      [x + w, y + d, z + h],
      [x, y + d, z + h],
    ]),
    // face at x + w (appears lower-right)
    right: pts(iso, [
      [x + w, y, z],
      [x + w, y + d, z],
      [x + w, y + d, z + h],
      [x + w, y, z + h],
    ]),
  };
}

export const IVORY = { top: "#F4F2EA", left: "#E5E3D9", right: "#D3D1C6", edge: "#C9C7BC" };
export const GRAPHITE = { top: "#333A34", left: "#272C28", right: "#1B1F1C", edge: "#40473F" };
export const CITRON = { top: "#DDF57E", left: "#C9E65A", right: "#B4D33E", edge: "#A8C736" };
