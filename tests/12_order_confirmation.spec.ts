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

// Login before each test case
test.beforeEach(async ({ page, baseURL }) => {
  // Navigate to the desired page
  await page.goto(baseURL as string);

  // Log in (if required)
  await page.fill('input[id="user-name"]', process.env.USERNAME1 as string);
  await page.fill('input[id="password"]', process.env.PASSWORD as string);
  await page.click('input[type="submit"].submit-button[data-test="login-button"]');
});

test('User can place an order for Sauce Lab Onesie and validate order confirmation', async ({ page }) => {
  // Find and click the "Add to cart" button for Sauce Lab Onesie
  const addToCartButton = await page.locator('button[data-test="add-to-cart-sauce-labs-onesie"]');
  await addToCartButton.click();

  // Click the shopping cart icon to proceed to checkout
  const cartIcon = await page.locator('a.shopping_cart_link');
  await cartIcon.click();

  // Proceed to checkout
  const checkoutButton = await page.locator('button[data-test="checkout"]');
  await checkoutButton.click();

  // Fill in payment information (assuming there's a form with payment details)
  await page.fill('input[data-test="firstName"]', 'Son');
  await page.fill('input[data-test="lastName"]', 'Goku');
  await page.fill('input[data-test="postalCode"]', '12345');

  // Continue to confirm the order
  const continueButton = await page.locator('input[type="submit"][data-test="continue"]');
  await continueButton.click();

  // Confirm the order details (e.g., SauceCard #31337)
  const paymentInfoDiv = await page.locator('.summary_info');

  // Extract payment information text
  const paymentInfoText = await paymentInfoDiv.textContent();

  // Assert that the payment information contains "Payment Information" and "SauceCard #31337"
  expect(paymentInfoText).toContain('Payment Information');
  expect(paymentInfoText).toContain('SauceCard #31337');
});

test('Icon: Green tick icon displays on confirmation page', async ({ page }) => {
  // Navigate to the confirmation page
  await page.goto('https://www.saucedemo.com/checkout-complete.html');

  // Check if the green tick icon is visible
  const tickIcon = await page.locator('img.pony_express');
  expect(await tickIcon.isVisible()).toBe(true);
});

test('Text: Your order has been dispatched on confirmation page', async ({ page }) => {
  // Navigate to the confirmation page
  await page.goto('https://www.saucedemo.com/checkout-complete.html');

  // Verify the confirmation text
  const confirmationText = await page.locator('div.complete-text');
  const textContent = await confirmationText.textContent();

  if (textContent !== null) {
    const trimmedText = textContent.trim();
    expect(trimmedText).toContain('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
  } else {
    // Handle the case where textContent is null (e.g., log an error or fail the test)
    console.error('The confirmation text is null.');
  }
});

test('Button: Back Home button is active and user can click on it', async ({ page }) => {
  // Navigate to the confirmation page
  await page.goto('https://www.saucedemo.com/checkout-complete.html');

  // Check if the "Back Home" button is enabled
  const backHomeButton = await page.locator('button[data-test="back-to-products"]');
  expect(await backHomeButton.isEnabled()).toBe(true);

  // Clicking the "Back Home" button should take the user back to the root home page
  await backHomeButton.click();

  // Wait for navigation to complete
  await page.waitForURL('https://www.saucedemo.com/inventory.html');

  // Get the final URL after clicking the button
  const finalURL = page.url();

  // Assert that the user has landed on the expected URL
  expect(finalURL).toBe('https://www.saucedemo.com/inventory.html');
});
