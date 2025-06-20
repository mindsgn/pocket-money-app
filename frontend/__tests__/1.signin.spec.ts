import { test, expect, defineConfig } from '@playwright/test'
import random from "random-name" 

export default defineConfig({
  timeout: 120_000,
});

const generateRandom = () => {
  return {
    name: random.first(),
    surname: random.last (),
    email: random.last(),
    place: random.place()
  }
};

const user = generateRandom();

test('should navigate to the sign in page and sign in', async ({ page }) => {
  await page.waitForTimeout(1000);
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  await page.getByTitle("btn-signin").click();
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL('http://localhost:3000/signin');
  
  await page.waitForTimeout(1000);
  await page.getByTitle("input-email").fill(`${user.name}.${user.surname}@abakcus.xyz`);;
  await page.waitForTimeout(1000);
  await page.getByTitle("btn-submit").click();
  await page.waitForTimeout(3000);
  await page.getByTitle("input-verify").fill("111111");;
  await page.waitForTimeout(1000);
  await page.getByTitle("button-verify").click();
  await page.waitForTimeout(10000);
  
  /*
  await expect(page).toHaveURL('http://localhost:3000/onboarding?profileCompleted=false&tokenCompleted=false&businessCompleted=false');
  await page.waitForTimeout(10000);
  await page.getByTitle("input-name").fill(`${user.name} ${user.surname}`);
  await page.getByTitle("button-submit-name").click();
  await page.waitForTimeout(10000);

  await page.getByTitle("input-business-name").fill(`${user.name}'s Coffee Shop`);
  await page.getByTitle("input-business-address").fill(`${user.place}`);
  await page.getByTitle("input-business-description").fill(`${user.name}'s Coffee Shop on ${user.place}`);
  await page.getByTitle("button-submit-business").click();
  await page.waitForTimeout(10000);
  */
});
