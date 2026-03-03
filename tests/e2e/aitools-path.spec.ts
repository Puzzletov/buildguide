import { expect, test } from "@playwright/test";

test("back navigation works through the flow", async ({ page }) => {
  await page.goto("/");
  await page.click('[data-testid="goal-card-testing"]');
  await page.click('[data-testid="knob-cost-free"]');
  await page.click('[data-testid="knob-speed-fast"]');
  await page.click('[data-testid="knob-quality-high"]');
  await page.click('[data-testid="pri-continue"]');

  await page.click('[data-testid="back-link"]');
  await expect(page.locator('[data-testid="pri-continue"]')).toBeVisible();

  await page.click('[data-testid="back-link"]');
  await expect(page.locator('[data-testid="goal-card-website"]')).toBeVisible();
});

