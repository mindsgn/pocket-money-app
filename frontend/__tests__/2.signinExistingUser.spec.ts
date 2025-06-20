import { test, expect } from '@playwright/test'

let email = "seni.tembe@gmail.com";

test('should should onboard user', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  await page.getByTitle("btn-signin").click();
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL('http://localhost:3000/signin');
  const input = await page.getByTitle("input-email");
  await input.fill(email);
  await page.waitForTimeout(1000);
  await page.getByTitle("btn-submit").click();
  await page.waitForTimeout(3000);
  const verifyInput = await page.getByTitle("input-verify");
  await verifyInput.fill("111111");
  await page.waitForTimeout(1000);
  await page.getByTitle("button-verify").click();
  await page.waitForTimeout(10000);
  await expect(page).toHaveURL('http://localhost:3000/dashboard/contests');
});
