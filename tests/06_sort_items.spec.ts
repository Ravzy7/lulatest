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

test.describe('Product Sorting Tests', () => {

  test('User can log in and sort products by "Price (low to high)"', async ({ page, baseURL }) => {
    // Navigate to the desired page
    await page.goto(baseURL as string);
    
    // Login steps
    await page.fill('input[id="user-name"]', process.env.USERNAME1 as string);
    await page.fill('input[id="password"]', process.env.PASSWORD as string);
    await page.click('input[type="submit"].submit-button[data-test="login-button"]');
    
    // Select "Price (low to high)" from the dropdown
    await page.selectOption('select[data-test="product_sort_container"]', 'lohi');

    // Additional verification can be added here if needed, 
    // e.g., to check if the products are indeed sorted in the desired order
  });

//   test('Page response status should be 200', async ({ page, baseURL }) => {
//     const response = await page.goto(baseURL as string);
    
//     const responseStatus = response.status();
//     expect(responseStatus).toBe(200);
//   });

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
