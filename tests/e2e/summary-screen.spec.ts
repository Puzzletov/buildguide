import { expect, test } from "@playwright/test";

test("user can skip tools and reach the summary screen", async ({ page }) => {
  await page.goto("/");
  await page.click('[data-testid="goal-card-aitools"]');

  await page.click('[data-testid="knob-cost-low"]');
  await page.click('[data-testid="knob-speed-fast"]');
  await page.click('[data-testid="knob-quality-high"]');
  await page.click('[data-testid="pri-continue"]');

  await page.click('[data-testid="car-summary"]');
  await expect(page.locator('#summary-grid')).toBeVisible();
});

