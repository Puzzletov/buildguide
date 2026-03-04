import { expect, test } from "@playwright/test";

test("user can follow the IDE path to a setup guide", async ({ page }) => {
  await page.goto("/");
  await page.click('[data-testid="goal-card-ide"]');

  await page.getByRole("button", { name: "Cursor" }).click();
  await page.getByRole("button", { name: "Continue" }).first().click();

  await page.getByRole("button", { name: "Claude Code" }).click();
  await page.getByRole("button", { name: "Continue" }).first().click();

  await page.click('[data-testid="goal-card-website"]');
  await expect(page.locator('[data-testid="steps-next-btn"]')).toBeVisible();
});
