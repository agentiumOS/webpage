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

export const IVORY = { top: "#F4F7FD", left: "#E4EAF4", right: "#D0D7E4", edge: "#C2CAD8" };
export const GRAPHITE = { top: "#2A3140", left: "#222836", right: "#161B26", edge: "#3D4658" };
export const CITRON = { top: "#5B8CFF", left: "#3D72F5", right: "#2A5AE0", edge: "#1E4AD4" };
