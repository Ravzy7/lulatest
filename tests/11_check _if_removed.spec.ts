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

test.describe('Shopping Cart Operations', () => {

  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL as string);
    await page.fill('input[id="user-name"]', process.env.USERNAME1 as string);
    await page.fill('input[id="password"]', process.env.PASSWORD as string);
    await page.click('input[type="submit"].submit-button[data-test="login-button"]');
    // Uncomment the next line if required
    // await page.waitForNavigation();
  });

  test('Confirm that clicking the remove button removes the item from the basket', async ({ page }) => {
    // Navigate to the shopping cart (if necessary)
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('a.shopping_cart_link');
    
    // Click the "Remove" button for Sauce Labs Backpack
    const removeButton = await page.locator('button[data-test="remove-sauce-labs-backpack"]');
    await removeButton.click();
    
    // Assert that the item is no longer present in the cart
    const isRemoved = await removeButton.isHidden();
    expect(isRemoved).toBe(true);

    // Alternatively, if the product has a specific locator when added to the cart, you can check its absence:
    // const itemInCart = await page.locator('locator-for-sauce-labs-backpack-in-cart');
    // expect(await itemInCart.isVisible()).toBe(false);
  });

  test('Ensure there is no badge on the shopping cart after removing the item', async ({ page }) => {
    // Navigate to the shopping cart
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('a.shopping_cart_link');
    
    // Click the "Remove" button for Sauce Labs Backpack
    const removeButton = await page.locator('button[data-test="remove-sauce-labs-backpack"]');
    await removeButton.click();
    
    // Check for the absence of the badge on the shopping cart link
    const cartBadge = await page.locator('.shopping_cart_badge');
    const isBadgeVisible = await cartBadge.isVisible();
    expect(isBadgeVisible).toBe(false);
  });

  test('Ensure the removed_cart_item element is empty', async ({ page }) => {
    // Add an item to the cart
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
  
    // Navigate to the shopping cart
    await page.click('a.shopping_cart_link');
  
    // Remove the item from the cart
    const removeButton = await page.locator('button[data-test="remove-sauce-labs-backpack"]');
    await removeButton.click();
  
    // Check the content of the 'removed_cart_item' element
    const removedCartItem = await page.locator('.removed_cart_item');
    const innerContent = await removedCartItem.textContent();
  
    // Assert that it's empty or null
    expect(innerContent?.trim() || '').toBe('');
  });
  
  

});
