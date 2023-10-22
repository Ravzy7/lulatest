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

test.describe('Hamburger Menu Tests', () => {

  test('Login, click the hamburger bar and logout', async ({ page, baseURL }) => {
    // Navigate to the desired page
    await page.goto(baseURL as string);

    // Login steps
    await page.fill('input[id="user-name"]', process.env.USERNAME1 as string);
    await page.fill('input[id="password"]', process.env.PASSWORD as string);
    await page.click('input[type="submit"].submit-button[data-test="login-button"]');

    // Wait for login to complete, you might need to adjust this based on your application's behavior
    //await page.waitForNavigation();

    // Click the hamburger menu button
    await page.click('#react-burger-menu-btn');
    
    // It's good to have a slight delay or wait for animation/transitions if any
    await page.waitForTimeout(500);  // waiting for 500ms; adjust as needed

    // Click the "Logout" option from the menu
    await page.click('#logout_sidebar_link');
    
    // Additional assertions can be added here to confirm successful logout 
    // e.g., checking for the presence of the login button or absence of the logout link
    
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
