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

test.describe('Positive Login Tests', () => {

  test('User can login successfully and reach inventory page', async ({ page, baseURL }) => {
    await page.goto(baseURL as string);

    // Enter username and password from .env file
    await page.fill('input[id="user-name"]', process.env.USERNAME2 as string);
    await page.fill('input[id="password"]', process.env.PASSWORD as string);
    
    // Click the login button
    await page.click('input[type="submit"].submit-button[data-test="login-button"]');

    // Wait for the navigation to complete and verify the URL
   // await page.waitForNavigation();
    expect(page.url()).toBe(`${baseURL}inventory.html`);
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
