import { expect, test } from "@playwright/test";

for (const route of ["/", "/jev"]) {
  test(`${route} SVG definitions are unique and local references resolve`, async ({ page }) => {
    await page.goto(route);
    const graphics = await page.evaluate(() => {
      const definitions = Array.from(document.querySelectorAll("svg [id]"), (el) => el.id);
      const duplicates = definitions.filter((id, index) => definitions.indexOf(id) !== index);
      const unresolved: string[] = [];
      for (const el of document.querySelectorAll("svg, svg *")) {
        for (const attribute of el.attributes) {
          for (const match of attribute.value.matchAll(/url\(["']?#([^\s)"']+)["']?\)/g)) {
            if (!document.getElementById(match[1])) unresolved.push(match[1]);
          }
        }
      }
      return { definitions: definitions.length, duplicates, unresolved };
    });
    expect(graphics.definitions).toBeGreaterThan(0);
    expect(graphics.duplicates).toEqual([]);
    expect(graphics.unresolved).toEqual([]);
  });
}

test("the illustrated approval gate preserves approve, reset, and deny behavior", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const approval = page.locator("#flow-04");
  await approval.getByRole("button", { name: "Approve example", exact: true }).click();
  await expect(approval.getByText("Example approved", { exact: true })).toBeVisible();
  await approval.getByRole("button", { name: "Reset example", exact: true }).click();
  await approval.getByRole("button", { name: "Deny example", exact: true }).click();
  await expect(approval.getByText("Example denied", { exact: true })).toBeVisible();
});
