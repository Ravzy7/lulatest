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

test.describe('Negative Login Tests', () => {

  test('Confirm error message displays for incorrect username', async ({ page, baseURL }) => {
    await page.goto(baseURL as string);

    // Enter incorrect username and password
    await page.fill('input[id="user-name"]', 'incorrectUsername');
    await page.fill('input[id="password"]', 'incorrectPassword');
    
    // Click the login button
    await page.click('input[type="submit"].submit-button[data-test="login-button"]');

    // Verify the error message
    const errorMessage = await page.textContent('div.error-message-container.error h3[data-test="error"]');
    if (errorMessage) {
        expect(errorMessage.trim()).toContain('Epic sadface:');
    } else {
        throw new Error("Error message not found!");
    }
  });

  test('Users can click the X icon to dismiss the error message', async ({ page, baseURL }) => {
    await page.goto(baseURL as string);

    // Enter incorrect username and password
    await page.fill('input[id="user-name"]', 'incorrectUsername');
    await page.fill('input[id="password"]', 'incorrectPassword');
    
    // Click the login button
    await page.click('input[type="submit"].submit-button[data-test="login-button"]');

    // Click the X icon (SVG button) to close the error message
    await page.click('div.error-message-container.error h3[data-test="error"] button.error-button');

    // Assert that the error message container is no longer visible
    const isVisible = await page.isVisible('div.error-message-container.error h3[data-test="error"]');
    expect(isVisible).toBe(false);
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
