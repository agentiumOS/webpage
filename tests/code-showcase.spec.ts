import { expect, test } from "@playwright/test";

test("code examples rotate, pause while reading, and keep their explanation in sync", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.clock.install();
  await page.goto("/");
  const section = page.locator("#code");
  await section.scrollIntoViewIfNeeded();
  await expect(section.getByRole("button", { name: "Pause code examples" })).toBeVisible();
  await page.mouse.move(0, 0);
  await page.clock.runFor(4_100);
  await expect(section.getByRole("tab", { name: "Tool", exact: true })).toHaveAttribute("aria-selected", "true");
  await expect(section.locator("h2")).toContainText("Your functions.");

  await section.locator("h2").hover();
  await page.clock.runFor(8_100);
  await expect(section.getByRole("tab", { name: "Tool", exact: true })).toHaveAttribute("aria-selected", "true");
  await page.mouse.move(0, 0);
  await page.clock.runFor(4_100);
  await expect(section.getByRole("tab", { name: "Voice", exact: true })).toHaveAttribute("aria-selected", "true");
  await expect(section.locator("h2")).toContainText("In real time.");

  await section.getByRole("tab", { name: "Harness", exact: true }).click();
  await page.mouse.move(0, 0);
  await page.clock.runFor(8_100);
  await expect(section.getByRole("tab", { name: "Harness", exact: true })).toHaveAttribute("aria-selected", "true");
  await expect(section.locator("h2")).toContainText("A workspace.");
  await section.locator("h2").click();
  await page.mouse.move(0, 0);
  await page.clock.runFor(4_100);
  await expect(section.getByRole("tab", { name: "Costs", exact: true })).toHaveAttribute("aria-selected", "true");
  await expect(section.getByRole("tab", { name: "Costs", exact: true })).toBeInViewport({ ratio: 1 });
  await page.clock.runFor(4_100);
  await expect(section.getByRole("tab", { name: "Agent", exact: true })).toHaveAttribute("aria-selected", "true");

  await section.getByRole("button", { name: "Pause code examples" }).click();
  await section.locator("h2").click();
  await page.mouse.move(0, 0);
  await page.clock.runFor(8_100);
  await expect(section.getByRole("tab", { name: "Agent", exact: true })).toHaveAttribute("aria-selected", "true");
  await expect(section.getByRole("button", { name: "Play code examples" })).toHaveAttribute("aria-pressed", "true");
});

test("reduced motion keeps six examples manual, with no notes below the panel", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.clock.install();
  await page.goto("/");
  const section = page.locator("#code");
  await section.scrollIntoViewIfNeeded();
  await expect(section.getByRole("tab")).toHaveCount(6);
  await page.clock.runFor(8_100);
  await expect(section.getByRole("tab", { name: "Agent", exact: true })).toHaveAttribute("aria-selected", "true");
  await section.getByRole("tab", { name: "Voice", exact: true }).click();
  await expect(section.getByRole("tabpanel")).toContainText("GoogleLiveProvider");
  await expect(section.getByRole("link", { name: "Explore voice" })).toHaveAttribute("href", /\/voice\/google$/);
  await expect(section.locator("dl")).toHaveCount(0);
  await expect(section.getByRole("button", { name: "Pause code examples" })).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
