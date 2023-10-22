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

  test.beforeEach(async ({ page, baseURL }) => {
    // Move the login steps to a beforeEach hook if every test requires user to be logged in
    await page.goto(baseURL as string);
    await page.fill('input[id="user-name"]', process.env.USERNAME2 as string);
    await page.fill('input[id="password"]', process.env.PASSWORD as string);
    await page.click('input[type="submit"].submit-button[data-test="login-button"]');
    // Uncomment the next line if the page requires to wait for navigation after login
    // await page.waitForNavigation();
  });

  test('User can add Sauce Labs Backpack to cart', async ({ page }) => {
    // Click "Add to cart" button for Sauce Labs Backpack
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    // Additional assertions can be added here if needed
  });

  test('Check if "Remove" button exists after clicking "Add to cart" button', async ({ page }) => {
    // Find and click the "Add to cart" button
    const addToCartButton = await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await addToCartButton.click();

    // Wait for the "Remove" button to appear
    const removeButton = await page.locator('button[data-test="remove-sauce-labs-backpack"]');

    // Check if the "Remove" button exists
    expect(await removeButton.isVisible()).toBe(true);
  });

  test('User can click on the shopping cart element', async ({ page }) => {
    //Add item to cart
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    // Click on the shopping cart link
    await page.click('a.shopping_cart_link');
    
    // Additional assertions can be added here if needed, 
    // e.g., to check if the shopping cart page was loaded correctly
    const removeButton = await page.locator('button[data-test="remove-sauce-labs-backpack"]');
    expect(await removeButton.isVisible()).toBe(true);
  });


  
});
