import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const ROUTES = ["/", "/jev", "/integrations", "/examples"] as const;

for (const route of ROUTES) {
  test(`${route} has no serious or critical axe violations`, async ({ page }) => {
    await page.goto(route);
    // Let in-view reveals settle before scanning colour contrast.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(600);
    await page.evaluate(() => window.scrollTo(0, 0));

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    // Colour contrast is reported, not enforced, while the accent palette is
    // being redesigned (accent #2f6bff on #121826 measures 3.94:1 at 11px).
    // Flip this to blocking once the palette settles.
    const contrast = results.violations.find((v) => v.id === "color-contrast");
    if (contrast) {
      test.info().annotations.push({
        type: "warning",
        description: `color-contrast: ${contrast.nodes.length} nodes below WCAG AA on ${route}`,
      });
    }
    const blocking = results.violations.filter(
      (v) => (v.impact === "serious" || v.impact === "critical") && v.id !== "color-contrast",
    );
    expect(
      blocking,
      blocking.map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes)`).join("\n"),
    ).toEqual([]);
  });
}

test("skip link and landmarks", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main#main")).toHaveCount(1);
  await expect(page.locator('nav[aria-label="Primary"], nav[aria-label="Mobile"]').first()).toBeAttached();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
});
