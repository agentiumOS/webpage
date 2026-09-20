import { expect, test } from "@playwright/test";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Every docs URL referenced from the content model must resolve. Runs against
 * the live docs host, so it is skipped when the network is unavailable
 * (set DOCS_LINK_CHECK=1 in CI to enforce).
 */
const DOCS_ORIGIN = "https://docs.agentium.in";

function collectDocsPaths(): string[] {
  const dir = join(process.cwd(), "src", "content");
  const paths = new Set<string>();
  for (const file of readdirSync(dir)) {
    if (!file.endsWith(".ts")) continue;
    const source = readFileSync(join(dir, file), "utf8");
    for (const match of source.matchAll(/docs\("([^"]+)"\)/g)) paths.add(match[1]);
  }
  return [...paths].sort();
}

test.describe("documentation links", () => {
  test.skip(!process.env.DOCS_LINK_CHECK, "Set DOCS_LINK_CHECK=1 to verify live docs URLs");

  test("all docs() references resolve with HTTP 200", async ({ request }) => {
    const paths = collectDocsPaths();
    expect(paths.length).toBeGreaterThan(30);
    const sitemap = await (await request.get(`${DOCS_ORIGIN}/sitemap.xml`)).text();
    const failures: string[] = [];
    for (const path of paths) {
      const url = `${DOCS_ORIGIN}${path}`;
      const inSitemap = path === "/" || sitemap.includes(`<loc>${url}</loc>`);
      if (inSitemap) continue;
      const res = await request.get(url, { maxRedirects: 0 });
      if (res.status() !== 200) failures.push(`${path} -> ${res.status()}`);
    }
    expect(failures, failures.join("\n")).toEqual([]);
  });
});
