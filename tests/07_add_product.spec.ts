import { test as baseTest, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const test = baseTest.extend<{
  baseURL: string;
}>({
  baseURL: async ({}, use) => {
    await use(process.env.BASE_URL);
  },
});

test.describe('Product Adding Tests', () => {

  test('User can add Sauce Labs Backpack to cart', async ({ page, baseURL }) => {
    // Assuming the user needs to be logged in to see the inventory
    await page.goto(baseURL as string);
    await page.fill('input[id="user-name"]', process.env.USERNAME1 as string);
    await page.fill('input[id="password"]', process.env.PASSWORD as string);
    await page.click('input[type="submit"].submit-button[data-test="login-button"]');
    //await page.waitForNavigation();

    // Click "Add to cart" button for Sauce Labs Backpack
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');

    // Additional assertions can be added here if needed,
    // e.g., to check if the item was indeed added to the cart
  });

  test('Page response status should be 200', async ({ page, baseURL }) => {
    const response = await page.goto(baseURL as string, { waitUntil: 'domcontentloaded' });

    // Check if the response object is not null before accessing its status
    if (response) {
      const responseStatus = response.status();
      expect(responseStatus).toBe(200);
    } else {
      throw new Error('Page did not load successfully');
    }
  });

});
