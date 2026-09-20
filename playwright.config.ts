import { defineConfig, devices } from "@playwright/test";

const PORT = 3411;
const BASE_URL = `http://localhost:${PORT}`;

/**
 * SEO / accessibility / structured-data regression suite.
 * Runs against a production build so the checked HTML matches what is deployed.
 * `VERCEL_ENV=production` makes the build emit indexable metadata and
 * production-origin canonicals; nothing is sent to GA because no measurement
 * ID is set.
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `pnpm build && pnpm exec next start -p ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
    env: {
      ...process.env,
      VERCEL_ENV: "production",
      NEXT_PUBLIC_GA_MEASUREMENT_ID: "",
    },
  },
});
