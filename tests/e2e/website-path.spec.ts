import { expect, test } from "@playwright/test";

test("user can complete the website path with Framer", async ({ page }) => {
  await page.goto("/");
  await page.click('[data-testid="goal-card-website"]');

  await page.click('[data-testid="knob-cost-free"]');
  await page.click('[data-testid="knob-speed-fast"]');
  await page.click('[data-testid="knob-quality-medium"]');
  await page.click('[data-testid="pri-continue"]');

  await expect(page.locator('[data-testid="tool-name"]')).toContainText("Framer");
  await page.click('[data-testid="car-choose"]');

  while (await page.locator('[data-testid="steps-next-btn"]').isVisible()) {
    const text = await page.locator('[data-testid="steps-next-btn"]').innerText();
    await page.click('[data-testid="steps-next-btn"]');
    if (text.includes("I\'m done")) {
      break;
    }
  }

  await expect(page.locator('[data-testid="done-title"]')).toBeVisible();
});

